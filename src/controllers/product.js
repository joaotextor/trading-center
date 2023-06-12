import path from 'path'
import fs from 'fs'

import dbConnect from "../utils/dbConnect"
import ProductsModel from '../models/products'
import formidable from 'formidable-serverless'

import S3 from 'aws-sdk/clients/s3'
import AWS from 'aws-sdk'

const product = {
    // get: async (req, res) => {
    //     await dbConnect()
    //     const products = await ProductsModel.find()
    //     res.status(200).json({ success: true, products})
    // },

    post: async (req, res) => {
      await dbConnect()

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
      
      form.parse(req, async (error, fields, data) => {
        
        if (error) {
          return res.status(500).json({ success: false })
        }
        // console.log(`Data: ${JSON.stringify(data)}`)

        const { files } = data

        const filesToUpload = files instanceof Array
          ? files
          : [files]

        // console.log(`Files to Upload: ${JSON.stringify(filesToUpload)}`)

        let filesToSaveOnDb = []

        async function uploadFile(filesToUpload) {
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

        async function saveFilesOnDb() {
          await uploadFile(filesToUpload)
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

      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
      })

      const s3 = new S3({
        apiVersion: 'latest',
        region: 'sa-east-1',
      })

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
        const filesToRemoveArr = filesToRemove.split(',')

        if (error) {
          return res.status(500).json({ success: false })
        }

          const { files } = data

          const filesToSave = product.files.filter(f => !filesToRemoveArr.includes( f.path ))

          if (files != undefined) {
            const filesToUpload = files instanceof Array
              ? files
              : [files]

              let filesToSaveOnDb = [
                ...filesToSave
              ]

              async function uploadFile(filesToUpload) {
                for (let file of filesToUpload) {
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

              async function saveFilesOnDb() {
                await uploadFile(filesToUpload)
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
                  // filesToRemoveArr.forEach(file => {
                  //   fs.rm(file, {}, () => {})
                  // })
                  console.log(filesToRemoveArr)
                  res.status(201).json({ success: true })
                } else {
                  res.status(500).json({ success: false})
                }
      
              }
              saveFilesOnDb()
        }

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