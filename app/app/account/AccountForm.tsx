'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { storage } from '@/lib/firebase'
import { User } from '@/lib/models/user.model'
import { cn } from '@/lib/utils'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface AccountFormProps {
  user?: User
  updateUser: (name: string, imageURL?: string) => Promise<void>
}

export default function AccountForm({ user, updateUser }: AccountFormProps) {
  const [username, setUsername] = useState(user?.name || '')
  const [newImage, setNewImage] = useState<any>(null)
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null)
  const [profilePicture, setProfilePicture] = useState(
    user?.imageURL || 'https://picsum.photos/200'
  )
  const [loading, setLoading] = useState(false)
  const canNotSubmit = !username || user?.name === username

  const onSubmit = async () => {
    if (!username) return toast.error('Please enter a username')
    if (username.length > 15) return toast.error('Username is too long')
    setLoading(true)
    if (newImage) {
      const storageRef = ref(storage, 'pfp/' + newImage.name)
      const uploadTask = uploadBytesResumable(storageRef, newImage)
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateUser(username, downloadURL)
            setNewImage(null)
            setNewImageUrl(null)
            setProfilePicture(downloadURL)
            setLoading(false)
            toast.success('Successfully updated your profile!')
          })
        }
      )
    } else {
      await updateUser(username)
      setLoading(false)
      toast.success('Successfully updated your profile!')
    }
  }

  return (
    <Card className='max-w-[30rem]'>
      <CardHeader>
        <CardTitle>
          {user ? 'Edit Your Profile' : 'Create Your Profile'}
        </CardTitle>
        <CardDescription>
          This is how other users in the app will know who they are interacting
          with!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-4'>
          <Label>Profile Picture</Label>
          <div className='flex gap-4 items-center mb-4'>
            <div className='relative w-full max-w-[5rem] h-20'>
              <Image
                src={newImageUrl ? newImageUrl : profilePicture}
                alt='pfp'
                fill
                className='object-cover shadow-lg rounded-full'
              />
            </div>
            <Input
              type='file'
              accept='image/*'
              onChange={e => {
                setNewImage(e.target.files?.[0])
                setNewImageUrl(
                  e.target.files?.[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null
                )
              }}
              className='cursor-pointer'
            />
          </div>
          <Label>Username*</Label>
          <Input
            placeholder='Enter a username'
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={loading}
          className={cn(
            'ml-auto',
            canNotSubmit && 'grayscale-[.5] opacity-75 pointer-events-none'
          )}
          onClick={onSubmit}
        >
          {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Save'}
        </Button>
      </CardFooter>
    </Card>
  )
}
