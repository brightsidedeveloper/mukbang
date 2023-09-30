import React from 'react'
import Room2 from './Room2'
import { auth } from '@clerk/nextjs'

export default function page() {
  const { userId } = auth()
  if (!userId) return <div>Not signed in</div>
  return <Room2 uid={userId} />
}
