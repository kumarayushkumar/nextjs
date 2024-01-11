import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/../prisma/client'
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })
        if (!user) return null
        const passwordMatched = await bcrypt.compare(
          credentials.password,
          user?.hashedPassword!
        )
        return passwordMatched ? user : null
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
