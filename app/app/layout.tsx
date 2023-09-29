import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full '>
      <header className='sticky top-0 p-6 flex justify-between items-center bg-slate-200 dark:bg-slate-800'>
        <Link href='/app'>Back Home</Link>
        <SignOutButton>
          <LogOutIcon className='cursor-pointer' />
        </SignOutButton>
      </header>
      <main className='h-full p-8'>{children}</main>
    </div>
  )
}
