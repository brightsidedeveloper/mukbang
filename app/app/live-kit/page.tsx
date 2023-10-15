import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function page() {
  return (
    <div className='flex gap-4 flex-wrap'>
      <Button>
        <Link href='/app/live-kit/room-1'>Room 1</Link>
      </Button>
      <Button>
        <Link href='/app/live-kit/room-2'>Room 2</Link>
      </Button>
      <Button>
        <Link href='/app/live-kit/room-3'>Room 3</Link>
      </Button>
    </div>
  )
}

// export async function generateMetadata({
//   searchParams: { theme },
// }: {
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   return {
//     themeColor:
//       theme === 'dark-blue'
//         ? '#020817'
//         : theme === 'dark-red'
//         ? '#0c0a09'
//         : '#FFFFFF',
//   }
// }
