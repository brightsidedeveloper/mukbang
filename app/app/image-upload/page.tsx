import React from 'react'
import ImageUpload from './ImageUpload'
import { auth } from '@clerk/nextjs'
import ImageModel from '@/lib/models/images.model'
import { connectToDB } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

export default async function page() {
  const getImages = async () => {
    'use server'
    try {
      connectToDB()
      const images = await ImageModel.find()
      return images
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const uploadImage = async (url: string) => {
    'use server'
    const user = auth()
    const name = user.user?.firstName ?? undefined
    try {
      connectToDB()
      await ImageModel.create({ url, uid: user.userId, name })
    } catch (error) {
      console.log(error)
    }
    revalidatePath('/app/image-upload')
  }

  const images = await getImages()

  return (
    <div className='flex flex-col items-center gap-10 justify-center'>
      <ImageUpload uploadImage={uploadImage} />
      <div className='flex flex-col gap-10'>
        {images.map(({ url }: { url: string }) => (
          <Image key={url} src={url} alt='Image' width={500} height={500} />
        ))}
      </div>
    </div>
  )
}
