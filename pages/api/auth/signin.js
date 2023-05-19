import nextConnect from 'next-connect'

import { authSignin } from '../../../src/controllers/auth/signin'
 
const route = nextConnect()

route.post(authSignin.post)

export default route
