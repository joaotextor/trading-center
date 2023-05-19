import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '"name" field is required']
    },

    email: {
        type: String,
        required: [true, '"email" field is required']
    },

    password: {
        type: String,
        required: [true, '"password" field is required']
    },
})

export default mongoose.models.users || mongoose.model('users', schema)