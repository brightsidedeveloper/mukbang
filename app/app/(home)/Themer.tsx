'use client'

import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'

export default function Themer() {
  const [theme, setTheme] = useState(false)
  useEffect(() => {
    if (theme) {
      document.body.classList.add('theme-red')
      document.body.classList.remove('theme-blue')
    } else {
      document.body.classList.add('theme-blue')
      document.body.classList.remove('theme-red')
    }
  }, [theme])

  return <Switch checked={theme} onCheckedChange={setTheme} />
}
