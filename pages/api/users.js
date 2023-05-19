import nextConnect from 'next-connect'

import { user } from '../../src/controllers/users'
 
const route = nextConnect()

route.get(user.get)

route.post(user.post)

export default route
