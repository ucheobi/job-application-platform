import { NextResponse, NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if the user is authenticated
  const isAuthenticated = authenticate(request)
 
  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()  
  }
 
  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL('/account/auth', request.url))
}
 
export const config = {
  matcher: '/dashboard/:path*',
}

function authenticate(request: NextRequest) {
  // Check if the user is authenticated
  const user = request.cookies.get('user')
  return !!user
}
