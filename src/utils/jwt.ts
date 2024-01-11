import jwt, { Jwt } from 'jsonwebtoken'

export type Token = {
  username: string
}

export const createAccessToken = (payload: Token) => {
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: 60 * 60 * 60 })
}

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET!)
  return decoded
}
