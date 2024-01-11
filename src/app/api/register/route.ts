import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '../../../../prisma/client'
import bcrypt from 'bcrypt'

const schema = z.object({
  username: z.string(),
  password: z.string().min(8)
})

export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { username: body.username }
  })

  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      hashedPassword
    }
  })

  return NextResponse.json({ success: true })
}
