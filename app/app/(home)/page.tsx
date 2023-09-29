import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div>
      Home
      <br />
      <br />
      <br />
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
