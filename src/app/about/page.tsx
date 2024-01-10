'use client'

import { trpc } from '@/utils/trpc'

export default function About() {
  const hello = trpc.hello.useQuery({ text: 'client' })
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}
