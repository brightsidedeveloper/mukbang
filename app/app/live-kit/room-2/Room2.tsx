'use client'

import '@livekit/components-styles'
import { LiveKitRoom, useChat, Chat } from '@livekit/components-react'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import Image from 'next/image'

export default function Room2({ uid }: { uid: string }) {
  const room = 'room-2'
  const [token, setToken] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(`/api/get-token?room=${room}&uid=${uid}`)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [uid])
  if (token === '') {
    return <div></div>
  }

  return (
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}>
      <ChatRoom uid={uid} />
    </LiveKitRoom>
  )
}

function ChatRoom({ uid }: { uid: string }) {
  const { send, chatMessages } = useChat()
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    if (!send || !message) return
    send(message)
    setMessage('')
  }

  console.log(chatMessages)

  return (
    <>
      <div className='h-[90%] flex flex-col items-center gap-2  mb-54 overflow-y-auto'>
        {chatMessages.map(({ message, from }, i) => {
          const isMe = uid === from?.identity
          const image = JSON.parse(from?.metadata || '{}').imageURL
          const name = from?.name
          return (
            <div key={i} className='flex gap-2 items-center'>
              <div className='relative w-12 h-12'>
                <Image
                  src={image}
                  alt={name ?? 'name'}
                  fill
                  className='object-cover rounded-full'
                />
              </div>
              <p key={i}>
                {isMe ? 'Me' : name}: {message}
              </p>
            </div>
          )
        })}
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
          <Send className='w-5 h-5 text-primary' />
        </button>
      </div>
    </>
  )
}
