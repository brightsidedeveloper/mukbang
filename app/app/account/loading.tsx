import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-5xl'>My Account</h2>
      <Skeleton className='w-[480px] h-[420px]' />
    </div>
  )
}
