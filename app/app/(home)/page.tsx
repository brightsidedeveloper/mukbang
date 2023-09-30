import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function page() {
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-5xl'>Home</h2>
      <div className='flex gap-4 flex-wrap'>
        <Button>
          <Link href='/app/image-upload'>Image Upload</Link>
        </Button>
        <Button>
          <Link href='/app/live-kit'>Live Kit</Link>
        </Button>
      </div>
    </div>
  )
}
