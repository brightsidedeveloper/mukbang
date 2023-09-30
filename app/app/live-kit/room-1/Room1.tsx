'use client'

import '@livekit/components-styles'
import { LiveKitRoom, useChat } from '@livekit/components-react'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Skeleton } from '@/components/ui/skeleton'

export default function Room1({ uid }: { uid: string }) {
  const room = 'room-1'
  const name = uid
  const [token, setToken] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(`/api/get-token?room=${room}&username=${name}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [name])
  if (token === '') {
    return (
      <div className='h-full flex flex-col gap-20 justify-center items-center'>
        <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
        <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
        <Skeleton className='rounded-full w-[44px] h-[24px] scale-[2.5]' />
      </div>
    )
  }

  return (
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}>
      <SwitchRoom />
    </LiveKitRoom>
  )
}

function SwitchRoom() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const { send, chatMessages } = useChat()

  useEffect(() => {
    if (chatMessages.length === 0) return
    const lastIndex1 = chatMessages.reduce(
      (acc, current, index) => (current.message.includes('-1') ? index : acc),
      -1
    )
    console.log(lastIndex1)
    const lastIndex2 = chatMessages.reduce(
      (acc, current, index) => (current.message.includes('-2') ? index : acc),
      -1
    )
    const lastIndex3 = chatMessages.reduce(
      (acc, current, index) => (current.message.includes('-3') ? index : acc),
      -1
    )
    if (lastIndex1 > -1) {
      const lastMsg1 = chatMessages[lastIndex1].message
      setChecked1(curr =>
        lastMsg1 === 'on-1' ? true : lastMsg1 === 'off-1' ? false : curr
      )
    }
    if (lastIndex2 > -1) {
      const lastMsg2 = chatMessages[lastIndex2].message
      setChecked2(curr =>
        lastMsg2 === 'on-2' ? true : lastMsg2 === 'off-2' ? false : curr
      )
    }
    if (lastIndex3 > -1) {
      const lastMsg3 = chatMessages[lastIndex3].message
      setChecked3(curr =>
        lastMsg3 === 'on-3' ? true : lastMsg3 === 'off-3' ? false : curr
      )
    }
  }, [chatMessages])

  if (!send) return null
  const toggle1 = (state: boolean) => send(state ? 'on-1' : 'off-1')
  const toggle2 = (state: boolean) => send(state ? 'on-2' : 'off-2')
  const toggle3 = (state: boolean) => send(state ? 'on-3' : 'off-3')

  return (
    <div className='h-full flex flex-col gap-20 justify-center items-center'>
      <Switch
        className='scale-[2.5]'
        checked={checked1}
        onCheckedChange={toggle1}
      />
      <Switch
        className='scale-[2.5]'
        checked={checked2}
        onCheckedChange={toggle2}
      />
      <Switch
        className='scale-[2.5]'
        checked={checked3}
        onCheckedChange={toggle3}
      />
    </div>
  )
}
