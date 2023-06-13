import path from 'path'
import fs from 'fs'

import dbConnect from "../utils/dbConnect"
import ProductsModel from '../models/products'
import formidable from 'formidable-serverless'

import S3 from 'aws-sdk/clients/s3'
import AWS from 'aws-sdk'

const form = new formidable.IncomingForm({
  multiples: true,
  keepExtensions: true,
})

AWS.config.update({
  apiVersions: {
    s3: '2006-03-01',
  },
  region: 'sa-east-1',
})

const s3 = new S3({
  apiVersion: 'latest',
  region: 'sa-east-1',
  accessKeyId: process.env.ACCESS_KEY_AWS,
  secretAccessKey: process.env.SECRET_KEY_AWS,
})

async function uploadFile(filesToUpload, filesToSaveOnDb, incomingFiles) {

  if (incomingFiles == undefined) return 0
  
  incomingFiles = incomingFiles || 0

  for(let file of filesToUpload) {
    try {
      const timestamp = Date.now()
      const random = Math.floor(Math.random() * 999999999) + 1
      
      const extension = path.extname(file.name)

      const Key = `${timestamp}_${random}${extension}`

      const fileToUpload = fs.readFileSync(file.path)

      const uploadedImage = await s3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key,
        Body: fileToUpload,
      }).promise()

      const uploadedFileLink = uploadedImage.Location
      
      filesToSaveOnDb.push({
        name: Key,
        path: uploadedFileLink,
      })
    }
    catch (error) {
      console.log(`Error: ${error}`)
    }
  }
}

const product = {
    // get: async (req, res) => {
    //     await dbConnect()
    //     const products = await ProductsModel.find()
    //     res.status(200).json({ success: true, products})
    // },

    post: async (req, res) => {

      await dbConnect()
      
      form.parse(req, async (error, fields, data) => {
        
        if (error) {
          return res.status(500).json({ success: false })
        }
        // console.log(`Data: ${JSON.stringify(data)}`)

        const { files: incomingFiles } = data

        const filesToUpload = incomingFiles instanceof Array
          ? incomingFiles
          : [incomingFiles]

        // console.log(`Files to Upload: ${JSON.stringify(filesToUpload)}`)

        let filesToSaveOnDb = []

        async function saveFilesOnDb() {
          await uploadFile(filesToUpload, filesToSaveOnDb, 0)
          const {
            title,
            category,
            userId,
            contactImage,
            description,
            price,
            contactName,
            contactEmail,
            contactPhone,
            location,
            publishDate,
          } = fields
  
          const product = new ProductsModel({
            title,
            category,
            userId,
            contactImage,
            description,
            price,
            contactName,
            contactEmail,
            contactPhone,
            files: filesToSaveOnDb,
            location,
            publishDate,
          })
  
          const register = await product.save()
  
          if (register) {
            res.status(201).json({ success: true })
          } else {
            res.status(500).json({ success: false})
          }
        }
        saveFilesOnDb()
      })
    },

    put: async (req, res) => {

      await dbConnect()

      form.parse(req, async (error, fields, data) => {

        const {
          productId,
          title,
          category,
          description,
          price,
          contactName,
          contactEmail,
          contactPhone,
          location,
          filesToRemove
        } = fields

        const product = await ProductsModel.findById(productId)


        // Transform back the comma separated string into an Array
        let filesToRemoveArr = []
        if (filesToRemove.length != 0) {
          filesToRemoveArr = filesToRemove.split(',')
        }

        if (error) {
          return res.status(500).json({ success: false })
        }

          const { files: incomingFiles } = data

          const filesToSave = product.files.filter(f => !filesToRemoveArr.includes( f.name ))

          let filesToSaveOnDb = [
            ...filesToSave
          ]

          let filesToUpload

          if (incomingFiles != undefined) {
            filesToUpload = incomingFiles instanceof Array
                ? incomingFiles
                : [incomingFiles]
          }

          async function saveFilesOnDb() {
            await uploadFile(filesToUpload, filesToSaveOnDb, incomingFiles)

            product.title = title
            product.category = category
            product.description = description
            product.price = price
            product.contactName = contactName
            product.contactEmail = contactEmail
            product.contactPhone = contactPhone
            product.location = location
            product.publishDate = Date.now()
            product.files = filesToSaveOnDb
    
            const register = await product.save()

            if (register) {
              if (filesToRemoveArr.length != 0) {
                let filesToDeleteFromS3 = []
                filesToRemoveArr.forEach(file => {
                  filesToDeleteFromS3.push({"Key": file})
                })
                s3.deleteObjects({
                  Bucket: process.env.BUCKET_NAME,
                  Delete: {
                    Objects: filesToDeleteFromS3,
                    Quiet: false
                  }
                }, (err, data) => {
                  if (err) console.log(err, err.stack)
                })
              }
              res.status(201).json({ success: true })
            } else {
              res.status(500).json({ success: false})
            }
  
          }

          saveFilesOnDb()

      })
    },

    delete: async (req, res) => {
      await dbConnect()

      const id = req.body.id
      
      const deleted = await ProductsModel.findOneAndRemove({_id: id})

      try {
          deleted.files.map(file => {
          const deletedFile = fs.rm(file.path, {}, () => {})
          return deletedFile
        })
      }
      
      catch {
        console.log('An error has occurred')
      }


      if (deleted) {
        return res.status(200).json({success: true})
      } else {
        return res.status(500).json({success: false})
      }

    }
}

export { product }