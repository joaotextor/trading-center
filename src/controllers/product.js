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

      const form = new formidable.IncomingForm()

      form.parse(req, (error, fields, data) => {
        console.log('Chegou em form.parse')
        res.status(200)
      })
        // const {
        //     title,
        //     category,
        //     contactEmail,
        //     contactName,
        //     contactPhone,
        //     description,
        //     files,
        //     price,
        //     user,
        //   } = req.body
          
          
          
        //   const product = new ProductsModel({
        //     title,
        //     category,
        //     contactEmail,
        //     contactName,
        //     contactPhone,
        //     description,
        //     files,
        //     price,
        //     user,
        //   })
          
        //   product.save()
          
        //   res.status(201).json({ success: true })
    }
}

export { product }