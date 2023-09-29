import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <div className='flex justify-center flex-wrap gap-10 mt-20'>
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className='relative w-96 h-96'></Skeleton>
      ))}
    </div>
  )
}
