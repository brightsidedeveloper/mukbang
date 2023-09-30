'use client'

import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const themes = [
  { theme: 'red', color: 'bg-red-500', border: 'border-red-500' },
  { theme: 'blue', color: 'bg-blue-500', border: 'border-blue-500' },
  { theme: 'green', color: 'bg-green-500', border: 'border-green-500' },
  { theme: 'yellow', color: 'bg-yellow-500', border: 'border-yellow-500' },
  { theme: 'purple', color: 'bg-purple-500', border: 'border-purple-500' },
  { theme: 'rose', color: 'bg-rose-500', border: 'border-rose-500' },
]

export default function Themer() {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [themeState, setTheme] = useState<string | null>('red')
  useEffect(() => {
    document.body.classList.forEach(i => {
      if (/theme-[^ ]+/g.test(i)) document.body.classList.remove(i)
    })
    if (!themeState) return
    document.body.classList.add('theme-' + themeState)
  }, [themeState, pathname, router, resolvedTheme])

  return (
    <div className='grid grid-cols-6 gap-2 '>
      {themes.map(({ theme, color, border }) => (
        <button
          key={theme}
          onClick={() => setTheme(curr => (curr === theme ? null : theme))}
          className={cn(
            'w-6 h-6 flex items-center justify-center transition-all rounded-full border-2 p-0.5',
            theme === themeState && border
          )}
        >
          <div className='sr-only'>{theme}</div>
          <div className={cn('w-full h-full rounded-full', color)}></div>
        </button>
      ))}
    </div>
  )
}
