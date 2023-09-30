import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <div className='h-full flex flex-col gap-20 justify-center items-center'>
      <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
      <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
      <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
    </div>
  )
}
