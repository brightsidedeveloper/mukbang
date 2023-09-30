'use client'

import { cn } from '@/lib/utils'
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
  const [themeState, setTheme] = useState<string | null>(
    localStorage.getItem('custom-theme') || null
  )

  useEffect(() => {
    document.body.classList.forEach(i => {
      if (/theme-[^ ]+/g.test(i)) document.body.classList.remove(i)
    })
    if (!themeState) return localStorage.removeItem('custom-theme')
    localStorage.setItem('custom-theme', themeState || '')
    document.body.classList.add('theme-' + themeState)
  }, [themeState])

  return (
    <div className='grid grid-cols-3 sm:grid-cols-6 gap-1 gap-x-3 sm:gap-2 '>
      {themes.map(({ theme, color, border }) => (
        <button
          key={theme}
          onClick={() => setTheme(curr => (curr === theme ? null : theme))}
          className={cn(
            'w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center transition-all rounded-full border sm:border-2 p-0.5',
            theme === themeState && border
          )}
        >
          <div className={cn('w-full h-full rounded-full', color)}></div>
        </button>
      ))}
    </div>
  )
}
