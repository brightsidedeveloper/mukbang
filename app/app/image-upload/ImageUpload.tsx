'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  uploadImage: (url: string) => Promise<void>
}

export default function ImageUpload({ uploadImage }: ImageUploadProps) {
  const [image, setImage] = useState<any>(null)
  const [imageUrl, setImageUrl] = useState<any>(null)
  const [uploadPercent, setUploadPercent] = useState(0)

  const upload = async () => {
    if (!image) return
    const storageRef = ref(storage, 'images/' + image.name)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      snapshot => {
        setUploadPercent(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      error => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
          await uploadImage(downloadURL)
          setUploadPercent(0)
          setImage(null)
          setImageUrl(null)
          if (inputRef.current) inputRef.current.value = ''
        })
      }
    )
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='flex flex-col gap-5'>
      {image && (
        <>
          <Image src={imageUrl} alt='asdf' width={500} height={500} />
          <Button onClick={upload}>Upload</Button>
          <Progress value={uploadPercent} />
        </>
      )}
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={e => {
          setImage(e.target.files?.[0])
          setImageUrl(
            e.target.files?.[0]
              ? URL.createObjectURL(e.target.files?.[0])
              : null
          )
        }}
      />
    </div>
  )
}
