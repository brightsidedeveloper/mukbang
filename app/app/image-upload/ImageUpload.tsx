'use client'

import { Button } from '@/components/ui/button'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  uploadImage: (url: string) => Promise<void>
}

export default function ImageUpload({ uploadImage }: ImageUploadProps) {
  const [image, setImage] = useState<any>(null)
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
          if (inputRef.current) inputRef.current.value = ''
        })
      }
    )
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      {' '}
      {image && (
        <>
          <Image
            src={URL.createObjectURL(image)}
            alt='asdf'
            width={500}
            height={500}
          />
          <Button onClick={upload}>Upload</Button>
        </>
      )}
      {uploadPercent > 0 && <p>Uploading {uploadPercent}%</p>}
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={e => setImage(e.target.files?.[0])}
      />
    </div>
  )
}
