import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'

export default function page() {
  return (
    <div>
      Home
      <SignOutButton>
        <LogOutIcon className='cursor-pointer' />
      </SignOutButton>
    </div>
  )
}
