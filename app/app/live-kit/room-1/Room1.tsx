'use client'

import '@livekit/components-styles'
import { LiveKitRoom, VideoConference, Chat } from '@livekit/components-react'
import { useEffect, useState } from 'react'

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
      <Chat />
    </LiveKitRoom>
  )
}

// function ChatRoom() {
//   const
// }
