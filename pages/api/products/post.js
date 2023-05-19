import nextConnect from 'next-connect'

import { product } from '../../../src/controllers/product'
 
const route = nextConnect()

route.post(product.post)

export default route

export const config = {
    api: {
        bodyParser: false
    }
}