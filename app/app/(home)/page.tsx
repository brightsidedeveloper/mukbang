import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function generateMetadata({
  searchParams: { theme },
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return {
    themeColor:
      theme === 'dark-blue'
        ? '#020817'
        : theme === 'dark-red'
        ? '#0c0a09'
        : '#FFFFFF',
  }
}
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
