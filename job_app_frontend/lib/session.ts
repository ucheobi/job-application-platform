import 'server-only'

import { cookies } from 'next/headers'
 
export async function createSession(sessionToken: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const cookieStore = await cookies() 

  if (!sessionToken) {
    return null
  }

  cookieStore.set('user', sessionToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}