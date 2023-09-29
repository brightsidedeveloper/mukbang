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
  const [checked, setChecked] = useState(false)
  const { send, chatMessages } = useChat()

  useEffect(() => {
    if (chatMessages.length === 0) return
    setChecked(chatMessages[chatMessages.length - 1].message === 'on')
  }, [chatMessages])

  if (!send) return null
  const toggle = (state: boolean) => {
    setChecked(state)
    send(state ? 'off' : 'on')
  }

  return <Switch checked={checked} onCheckedChange={toggle} />
}
