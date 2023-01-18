import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongooseAdapter } from "@choutkamartin/mongoose-adapter"
import axios from "axios"

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
        name: 'credentials',
        async authorize(credentials, req) {
            const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, credentials)
            console.log(res.data)

            const user = res.data

            if (user) {
                return user
            } else {
                throw '/auth/signin?i=1'
            }
          }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],

  pages: {
    signIn: `/auth/signin`,
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },

  adapter: MongooseAdapter(process.env.MONGODB_URI),

}
export default NextAuth(authOptions)