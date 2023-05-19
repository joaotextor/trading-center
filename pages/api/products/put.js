import nextConnect from 'next-connect'

import { product } from '../../../src/controllers/product'
 
const route = nextConnect()

route.put(product.put)

export default route

export const config = {
    api: {
        bodyParser: false
    }
}