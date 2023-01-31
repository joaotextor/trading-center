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
            const res = await axios.post(`/api/auth/signin`, credentials)

            // const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, credentials)

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

  callbacks: {
    async jwt({token, user, account, profile}) {

      if (user) {
        if (user.id) {
          token.uid = user.id
        } else if (user._id) {
          token.uid = user._id
        }
      }

      return Promise.resolve(token) 
    },

    async session({session, user, token}) {

      session.userId = token.uid
      return session
    }
  },

  adapter: MongooseAdapter(process.env.MONGODB_URI),

}
export default NextAuth(authOptions)