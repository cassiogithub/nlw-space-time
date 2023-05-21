import { NextRequest, NextResponse } from 'next/server'

const SIGNIN_URL: string = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
const EXPIRES_COOKIE_IN_SECONDS: number = 60

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(SIGNIN_URL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly max-age=${EXPIRES_COOKIE_IN_SECONDS}`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
