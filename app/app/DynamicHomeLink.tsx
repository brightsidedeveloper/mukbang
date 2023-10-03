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
        <ChevronLeft /> <span>Back </span>
        <span className='hidden sm:block'>Home</span>
      </Link>
    )
  return (
    <>
      <h2 className='hidden sm:block text-2xl font-bold'>Mukbang!</h2>
      <h2 className='sm:hidden text-2xl font-bold'>Bang!</h2>
    </>
  )
}
