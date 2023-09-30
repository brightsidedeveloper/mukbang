'use client'

import '@livekit/components-styles'
import { LiveKitRoom, useChat, Chat } from '@livekit/components-react'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'

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
    return <div>Getting token...</div>
  }

  return (
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}>
      <ChatRoom />
    </LiveKitRoom>
  )
}

function ChatRoom() {
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [checked3, setChecked3] = useState(false)
  const { send, chatMessages } = useChat()

  useEffect(() => {
    if (chatMessages.length === 0) return
    const lastMsg = chatMessages[chatMessages.length - 1].message
    setChecked1(curr =>
      lastMsg === 'on-1' ? true : lastMsg === 'off-1' ? false : curr
    )
    setChecked2(curr =>
      lastMsg === 'on-2' ? true : lastMsg === 'off-2' ? false : curr
    )
    setChecked3(curr =>
      lastMsg === 'on-3' ? true : lastMsg === 'off-3' ? false : curr
    )
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
