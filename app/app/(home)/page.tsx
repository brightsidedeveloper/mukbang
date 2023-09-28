'use client'
import { Button } from '@/components/ui/button'
import { storage } from '@/lib/firebase'
import { SignOutButton } from '@clerk/nextjs'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { LogOutIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Page() {
  const [image, setImage] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<any>(null)

  const upload = async () => {
    if (!image) return
    const storageRef = ref(storage, 'images/' + image.name)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL)
          setUploadedImage(downloadURL)
        })
      }
    )
  }

  return (
    <div>
      Home
      <SignOutButton>
        <LogOutIcon className='cursor-pointer' />
      </SignOutButton>
      <br />
      <br />
      <br />
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
      {uploadedImage && (
        <Image src={uploadedImage} alt='asdf' width={500} height={500} />
      )}
      <input
        type='file'
        accept='image/*'
        onChange={e => setImage(e.target.files?.[0])}
      />
    </div>
  )
}
