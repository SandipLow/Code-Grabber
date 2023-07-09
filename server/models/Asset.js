import { Schema, models, model } from 'mongoose'

const AssetSchema = new Schema({
    user : {
        type: String,
        default: "*",
    },
    imgUrl: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
})

const Asset = models.assets || model('assets', AssetSchema);
export default Asset;