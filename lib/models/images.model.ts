import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  uid: {
    required: true,
    type: String,
  },
  name: {
    default: 'anonymous',
    type: String,
  },
  url: {
    required: true,
    type: String,
  },
})

const ImageModel =
  mongoose.models.ImageModel || mongoose.model('ImageModel', imageSchema)

export default ImageModel
