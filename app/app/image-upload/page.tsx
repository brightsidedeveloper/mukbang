import React from 'react'
import ImageUpload from './ImageUpload'
import { auth } from '@clerk/nextjs'
import ImageModel from '@/lib/models/images.model'
import { connectToDB } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

export async function generateMetadata({
  searchParams: { theme },
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return {
    themeColor:
      theme === 'dark-blue'
        ? '#020817'
        : theme === 'dark-blue'
        ? '#0c0a09'
        : '#FFFFFF',
  }
}

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
      <div className='flex justify-center flex-wrap gap-10'>
        {images.reverse().map(({ url }: { url: string }) => (
          <div key={url} className='relative w-96 h-96'>
            <Image
              src={url}
              alt='Image'
              fill
              className='absolute object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}
