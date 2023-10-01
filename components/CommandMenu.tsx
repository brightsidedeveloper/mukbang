'use client'

import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import useHydrated from '@/hooks/useHydrated'

export default function CommandMenu() {
  const { signOut } = useClerk()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  if (useHydrated())
    return (
      <>
        <button onClick={() => setOpen(true)}>
          <span className='hidden sm:inline'>ctrl + k</span>
          <span className='sm:hidden'>cmd</span>
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Pages'>
              <CommandItem
                onSelect={() => {
                  router.push('/app')
                  setOpen(false)
                }}
              >
                Home
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push('/app/account')
                  setOpen(false)
                }}
              >
                My Account
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push('/app/image-upload')
                  setOpen(false)
                }}
              >
                Image Upload
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push('/app/live-kit')
                  setOpen(false)
                }}
              >
                Live Kit
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading='Rooms'>
              <CommandItem
                onSelect={() => {
                  router.push('/app/live-kit/room-1')
                  setOpen(false)
                }}
              >
                Room 1
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push('/app/live-kit/room-2')
                  setOpen(false)
                }}
              >
                Room 2
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading='Settings'>
              <CommandItem
                onSelect={() => {
                  signOut()
                  setOpen(false)
                }}
              >
                Logout
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
}
