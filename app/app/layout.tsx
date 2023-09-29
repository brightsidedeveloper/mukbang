import { ThemeToggle } from '@/components/ThemeToggle'
import { SignOutButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import DyanmicHomeLink from './DynamicHomeLink'
import CommandMenu from '@/components/CommandMenu'

export async function generateMetaData({
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

export default function layout({
  children,
  searchParams,
}: {
  children: React.ReactNode
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('~~', searchParams)
  return (
    <div className='h-full'>
      <header className='sticky z-10 backdrop-blur top-0 px-6 h-16 flex justify-between items-center border-b-[1px] shadow-md border-muted-background/30 bg-background/90 '>
        <DyanmicHomeLink />
        <div className='flex gap-4 items-center'>
          <CommandMenu />
          <ThemeToggle />
          <SignOutButton>
            <LogOutIcon className='cursor-pointer' />
          </SignOutButton>
        </div>
      </header>
      <main className='p-8 main-height'>{children}</main>
    </div>
  )
}
