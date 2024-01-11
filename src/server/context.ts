import * as trpcNext from '@trpc/server/adapters/next'
import { verifyToken } from '@/utils/jwt'

export async function createContext({
  req,
  res
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const decoded = verifyToken(req.headers.authorization.split(' ')[1])
      return decoded
    }
    return null
  }
  const user = await getUserFromHeader()

  return {
    user
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
