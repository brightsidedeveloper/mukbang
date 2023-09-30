'use client'

import '@livekit/components-styles'
import { LiveKitRoom, useChat, Chat } from '@livekit/components-react'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export default function Room2({ uid }: { uid: string }) {
  const room = 'room-2'
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
    return <div></div>
  }

  return (
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}>
      <ChatRoom />
    </LiveKitRoom>
  )
}

function ChatRoom() {
  const { send, chatMessages } = useChat()
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    if (!send || !message) return
    send(message)
    setMessage('')
  }

  return (
    <>
      <div className='h-[90%] flex flex-col items-center gap-2  mb-54 overflow-y-auto'>
        {chatMessages.map(({ message }, i) => (
          <p key={i}>{message}</p>
        ))}
        <div ref={el => el?.scrollIntoView()}></div>
      </div>
      <div className='fixed bottom-0 bg-muted left-0 right-0 p-4 flex gap-4'>
        <Input
          value={message}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          onChange={e => setMessage(e.target.value)}
          className='w-full'
          placeholder='Type your message here'
        />
        <button onClick={sendMessage}>
          <Send />
        </button>
      </div>
    </>
  )
}
