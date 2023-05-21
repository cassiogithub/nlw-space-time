import { NextRequest, NextResponse } from 'next/server'
import { api } from '../../../../lib/api'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerReponse = await api.post('/register', { code })
  const { token } = registerReponse.data
  const redirectUrl = new URL('/', request.url)

  const [SECONDS, MINUTES, HOURS, DAYS] = [60, 60, 24, 30]
  const cookieExpiresInSeconds = SECONDS * MINUTES * HOURS * DAYS

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
