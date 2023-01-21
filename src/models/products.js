import mongoose from 'mongoose'
import { string } from 'yup'

const filesSchema = new mongoose.Schema({
    name: String,
    path: String,
})

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '"title" field is required']
    },

    category: {
        type: String,
        required: [true, '"category" field is required']
    },

    contactEmail: {
        type: String,
        required: [true, '"email" field is required']
    },

    contactName: {
        type: String,
        required: [true, '"contactName" field is required']
    },

    contactPhone: {
        type: Number,
        required: [true, '"contactPhone" field is required']
    },

    description: {
        type: String,
        required: [true, '"description" field is required']
    },

    price: {
        type: Number,
        required: [true, '"title" field is required']
    },

    files: {
        type: [filesSchema],
        default: undefined,
    },

    user: {
        id: String,
        name: String,
        email: String,
        phone: String,
        image: String,
    }
})

export default mongoose.models.products || mongoose.model('products', schema)