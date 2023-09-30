import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <div>
      <div className='flex gap-4 flex-wrap'>
        <Skeleton className='w-32 h-10' />
        <Skeleton className='w-28 h-10' />
      </div>
    </div>
  )
}
