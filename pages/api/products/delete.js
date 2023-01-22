import nextConnect from 'next-connect'

import { product } from '../../../src/controllers/product'
 
const route = nextConnect()

route.delete(product.delete)

export default route