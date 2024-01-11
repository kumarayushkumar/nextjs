'use client'

import { trpc } from '@/utils/trpc'

export default function About() {
  const hello = trpc.hello.useQuery("test")
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>{hello.data}</h1>
    </div>
  )
}
