import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const token = request.cookies.get('user')
 
  // If the user is authenticated, continue as normal
  if (token) {
    return NextResponse.next()  
  }
 
  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/account/auth', request.url))
}
 
export const config = {
  matcher: '/dashboard/:path*',
}
