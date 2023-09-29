'use client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function DyanmicHomeLink() {
  const pathname = usePathname()
  if (pathname.length > 5)
    return (
      <Link href='/app' className='flex gap-1 items-center'>
        <ChevronLeft /> Back Home
      </Link>
    )
  return <h2 className='text-2xl font-bold'>Mukbang!</h2>
}
