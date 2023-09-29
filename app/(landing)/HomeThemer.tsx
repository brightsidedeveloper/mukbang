'use client'

import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomeThemer() {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  useEffect(() => {
    if (resolvedTheme === 'dark') {
      router.push(pathname + `?theme=${resolvedTheme}`)
    } else {
      router.push(pathname)
    }
  }, [pathname, router, resolvedTheme])
  return null
}
