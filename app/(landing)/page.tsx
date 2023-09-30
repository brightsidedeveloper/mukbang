import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import HomeThemer from './HomeThemer'

export default function page() {
  return (
    <div>
      <nav className='p-6 flex justify-between items-center border-b-[1px] shadow-md border-muted-background/30 bg-background/90'>
        <h1 className='text-3xl'>Mukbang!</h1>
        <ThemeToggle />
        <HomeThemer />
      </nav>
      <div className='h-full mt-20 flex flex-col items-center gap-10 justify-center pt-10'>
        <h1 className='text-3xl md:text-5xl  xl:text-7xl text-center'>
          Welcome to Mukbang!
        </h1>
        {/* Sign in and sign up buttons */}
        <div className='flex  gap-4'>
          <Button>
            <Link href='/sign-in'>Sign in</Link>
          </Button>
          <Button>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
