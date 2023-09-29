import { ThemeToggle } from '@/components/ThemeToggle'
import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import DyanmicHomeLink from './DynamicHomeLink'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <header className='sticky top-0 p-6 flex justify-between items-center bg-slate-200 dark:bg-slate-800'>
        <DyanmicHomeLink />
        <div className='flex gap-4 items-center'>
          <ThemeToggle />
          <SignOutButton>
            <LogOutIcon className='cursor-pointer' />
          </SignOutButton>
        </div>
      </header>
      <main className='p-8'>{children}</main>
    </div>
  )
}
