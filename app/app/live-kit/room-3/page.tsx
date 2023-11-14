import { auth } from "@clerk/nextjs"
import Room3 from "./Room3"

export default function page() {
  const { userId } = auth()
  if (!userId) return <div>Not signed in</div>
  return <Room3 uid={userId} />
}
