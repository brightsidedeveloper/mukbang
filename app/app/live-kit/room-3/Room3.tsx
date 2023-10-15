'use client'

import '@livekit/components-styles'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { useEffect, useState } from 'react'

export default function Room3({ uid }) {
  const room = 'room-3'
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
    <LiveKitRoom
      token={token}
      video
      audio
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{ height: '80vh' }}
    >
      <VideoConference />
    </LiveKitRoom>
  )
}
