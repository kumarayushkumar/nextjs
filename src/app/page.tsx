'use client'

import { trpc } from '@/utils/trpc'

export default function Home() {
  // const mutation = trpc.login.useMutation()
  const mutation = trpc.admin.sec.useMutation()
  const handleSubmit = () => {
    mutation.mutate()
  }
  // if (!mutation.data) {
  //   return <div>Loading...</div>
  // }
  return (
    <div>
      <button onClick={handleSubmit}>Btn</button>
      {/* <p>{mutation}</p> */}
    </div>
  )
}
