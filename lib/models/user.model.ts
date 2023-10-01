import mongoose from 'mongoose'

export interface User {
  clerkId: string
  name: string
  imageURL?: string
}

const userSchema = new mongoose.Schema({
  clerkId: {
    required: true,
    type: String,
    unique: true,
  },
  name: {
    required: true,
    type: String,
    unique: true,
  },
  imageURL: {
    type: String,
  },
})

const UserModel =
  mongoose.models.UserModel || mongoose.model('UserModel', userSchema)

export default UserModel
