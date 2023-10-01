import { auth } from '@clerk/nextjs'
import AccountForm from './AccountForm'
import UserModel from '@/lib/models/user.model'
import { connectToDB } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { getUser } from '@/lib/actions/user.actions'

export default async function page() {
  const updateUser = async (name: string, imageURL?: string) => {
    'use server'
    try {
      const clerkUser = auth()
      connectToDB()
      const user = await UserModel.findOne({ clerkId: clerkUser.userId })
      if (!user) {
        await UserModel.create({
          clerkId: clerkUser.userId,
          name,
          imageURL,
        })
      } else {
        user.name = name
        if (imageURL) user.imageURL = imageURL
        await user.save()
      }
      revalidatePath('/app/account')
    } catch (error) {
      console.log(error)
    }
  }

  const user = await getUser()

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-5xl'>My Account</h2>
      <AccountForm user={user} updateUser={updateUser} />
    </div>
  )
}
