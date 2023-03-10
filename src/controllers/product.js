import path from 'path'
import fs from 'fs'

import dbConnect from "../utils/dbConnect"
import ProductsModel from '../models/products'
import formidable from 'formidable-serverless'



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
        uploadDir: 'public/uploads',
        keepExtensions: true,
      })

      form.parse(req, async (error, fields, data) => {
        
        if (error) {
          return res.status(500).json({ success: false })
        }

        const { files } = data

        const filesToRename = files instanceof Array
          ? files
          : [files]

        const filesToSave = []

        filesToRename.forEach(file => {
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 999999999) + 1

          const extension = path.extname(file.name)
          const filename = `${timestamp}_${random}${extension}`

          const oldpath = path.join(__dirname, `../../../../../${file.path}`)
          const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)

          filesToSave.push({
            name: filename,
            path: newpath,
          })

          fs.rename(oldpath, newpath, (error) => {
            if (error) {
              return res.status(500).json({ success: false })
            }
          })
        })

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
          files: filesToSave,
          location,
          publishDate,
        })

        const register = await product.save()

        if (register) {
          res.status(201).json({ success: true })
        } else {
          res.status(500).json({ success: false})
        }

        })
    },

    put: async (req, res) => {

      await dbConnect()

      const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
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
          const filesToRename = files instanceof Array
            ? files
            : [files]
  
          filesToRename.forEach(file => {
            const timestamp = Date.now()
            const random = Math.floor(Math.random() * 999999999) + 1
  
            const extension = path.extname(file.name)
            const filename = `${timestamp}_${random}${extension}`
  
            const oldpath = path.join(__dirname, `../../../../../${file.path}`)
            const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)
  
            filesToSave.push({
              name: filename,
              path: newpath,
            })
  
            fs.rename(oldpath, newpath, (error) => {
              if (error) {
                return res.status(500).json({ success: false })
              }
            })
          })
        }

        product.title = title
        product.category = category
        product.description = description
        product.price = price
        product.contactName = contactName
        product.contactEmail = contactEmail
        product.contactPhone = contactPhone
        product.location = location
        product.publishDate = Date.now()
        product.files = filesToSave

        const register = await product.save()

        if (register) {
          filesToRemoveArr.forEach(file => {
            fs.rm(file, {}, () => {})
          })
          res.status(201).json({ success: true })
        } else {
          res.status(500).json({ success: false})
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