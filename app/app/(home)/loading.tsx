import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <div>
      <h2 className='text-5xl mb-5'>Home</h2>

      <div className='flex gap-4 flex-wrap'>
        <Skeleton className='w-32 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
    </div>
  )
}
