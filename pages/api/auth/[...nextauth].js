import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter"
import axios from "axios"

export const authOptions = {
  session: {
    jwt: true
  }, 

  providers: [
    CredentialsProvider({
        name: 'credentials',
        async authorize(credentials, req) {
            const res = await axios.post('http://127.0.0.1:3000/api/auth/signin', credentials)
            console.log(res.data)

            const user = res.data

            if (user) {
                return user
            } else {
                throw '/auth/signin?i=1'
            }
          }
    })
  ],

  session: {
    strategy: "jwt",
  }, 

  jwt: {
    secret: process.env.JWT_TOKEN
  },

  adapter: MongooseAdapter(process.env.MONGODB_URI),

}
export default NextAuth(authOptions)