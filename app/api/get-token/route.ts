import { getUser } from '@/lib/actions/user.actions'
import { AccessToken } from 'livekit-server-sdk'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get('room')
  const uid = req.nextUrl.searchParams.get('uid')
  if (!room) {
    return NextResponse.json(
      { error: 'Missing "room" query parameter' },
      { status: 400 }
    )
  } else if (!uid) {
    return NextResponse.json(
      { error: 'Missing "uid" query parameter' },
      { status: 400 }
    )
  }

  const apiKey = process.env.LIVEKIT_API_KEY
  const apiSecret = process.env.LIVEKIT_API_SECRET
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

  if (!apiKey || !apiSecret || !wsUrl) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const user = await getUser()

  const imageURL = user?.imageURL || 'https://picsum.photos/200'
  const name = user?.name || 'Anonymous'

  const at = new AccessToken(apiKey, apiSecret, {
    identity: uid,
    name,
    metadata: JSON.stringify({ imageURL }),
  })

  at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })

  return NextResponse.json({ token: at.toJwt() })
}
