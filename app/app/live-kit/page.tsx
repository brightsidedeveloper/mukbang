import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div className='flex gap-4 flex-wrap'>
      <Button>
        <Link href='/app/live-kit/room-1'>Room 1</Link>
      </Button>
    </div>
  )
}
