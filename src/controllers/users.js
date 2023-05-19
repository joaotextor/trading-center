import dbConnect from "../utils/dbConnect"
import UsersModel from '../../src/models/users'
import { crypto } from "../utils/password"

const user = {
    get: async (req, res) => {
        await dbConnect()
        const users = await UsersModel.find()
        res.status(200).json({ success: true, users})
    },

    post: async (req, res) => {
        const {
            name,
            email,
            password,
          } = req.body
          
          await dbConnect()
          
          const passwordCrypto = await crypto(password)
          
          const user = new UsersModel({
            name,
            email,
            password: passwordCrypto,
          })
          
          user.save()
          
          res.status(201).json({ success: true })
    }
}

export { user }