'use server'

import { auth } from '@clerk/nextjs'
import { connectToDB } from '../mongoose'
import UserModel from '../models/user.model'

export const getUser = async () => {
  try {
    const clerkUser = auth()
    connectToDB()
    const user = await UserModel.findOne({ clerkId: clerkUser.userId })
    user._id = JSON.stringify(user._id)
    if (user) return user
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}
