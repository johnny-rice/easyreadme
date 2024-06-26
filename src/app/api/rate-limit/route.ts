import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

import { RATE_LIMIT } from '@/constants'
import { addGeneration } from '@/services/kv-generation'

export async function POST(req: Request) {
  try {
    if (
      process.env.NODE_ENV !== 'development' &&
      process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN
    ) {
      const ip = req.headers.get('x-forwarded-for')
      const ratelimit = new Ratelimit({
        redis: kv,
        // rate limit to 8 templates per day
        limiter: Ratelimit.slidingWindow(RATE_LIMIT, '1 d')
      })

      const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)

      if (!success) {
        return NextResponse.json(
          {
            msg: 'You have reached your request limit for the day.'
          },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString()
            }
          }
        )
      } else {
        // increase number of generations
        await addGeneration()
      }
    }

    return NextResponse.json({ msg: '' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        msg: 'An error has ocurred'
      },
      {
        status: 500
      }
    )
  }
}
