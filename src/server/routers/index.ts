import { TRPCError } from '@trpc/server'
import { router, procedure } from '../trpc'
import { z } from 'zod'
import { createAccessToken } from '@/utils/jwt'

export const protectedProcedure = procedure.use(async function isAuthed(opts) {
  const { ctx } = opts
  // console.log('ctx', opts)
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return opts.next({
    ctx: {
      user: ctx.user
    }
  })
})

export const appRouter = router({
  hello: procedure
    .input(z.string().nullish())
    .query(opts => `hello ${opts.input ?? opts.ctx.user ?? 'world'}`),
  admin: router({
    sec: protectedProcedure.mutation(opts => {
      return {
        secret: 'sauce'
      }
    })
  }),
  login: procedure
    .input(
      z.object({
        username: z.string()
      })
    )
    .mutation(opts => {
      return {
        token: createAccessToken(opts.input)
      }
    })
})

// export const appRouter = router({
//   hello: procedure
//     .input(
//       z.object({
//         text: z.string()
//       })
//     )
//     .query(opts => {
//       return {
//         greeting: `hello ${opts.inputext}`
//       }
//     })
// })

// export type definition of API
export type AppRouter = typeof appRouter
