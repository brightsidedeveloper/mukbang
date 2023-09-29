import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function page() {
  return (
    <div>
      <nav className='p-6 flex justify-between items-center bg-neutral-200 dark:bg-neutral-800'>
        <h1 className='text-3xl'>Mukbang!</h1>
        <ThemeToggle />
      </nav>
      <div className='h-full mt-20 flex flex-col items-center gap-10 justify-center pt-10'>
        <h1 className='text-3xl md:text-5xl  xl:text-7xl text-center'>
          Welcome to Mukbang!
        </h1>
        {/* Sign in and sign up buttons */}
        <div className='flex  gap-4'>
          <Link
            href='/sign-in'
            className='bg-neutral-200 dark:bg-neutral-800 p-4 rounded-lg text-center'
          >
            Sign in
          </Link>
          <Link
            href='/sign-up'
            className='bg-neutral-200 dark:bg-neutral-800 p-4 rounded-lg text-center'
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
