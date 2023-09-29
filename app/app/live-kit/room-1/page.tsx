import React from 'react'
import Room1 from './Room1'
import { auth } from '@clerk/nextjs'

export default function page() {
  const { userId } = auth()
  if (!userId) return <div>Not signed in</div>
  return <Room1 uid={userId} />
}
