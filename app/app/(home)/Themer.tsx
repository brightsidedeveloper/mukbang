'use client'

import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Themer() {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [theme, setTheme] = useState(false)
  useEffect(() => {
    if (theme) {
      document.body.classList.add('theme-red')
      document.body.classList.remove('theme-blue')
    } else {
      document.body.classList.add('theme-blue')
      document.body.classList.remove('theme-red')
    }

    if (resolvedTheme === 'dark') {
      router.push(pathname + `?theme=dark-${theme ? 'red' : 'blue'}`)
    } else {
      router.push(pathname)
    }
  }, [theme, pathname, router, resolvedTheme])

  return <Switch checked={theme} onCheckedChange={setTheme} />
}
