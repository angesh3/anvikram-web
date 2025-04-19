import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all API routes to pass through
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get the pathname
  const path = request.nextUrl.pathname;

  // Check for session cookie
  const sessionCookie = request.cookies.get('session');
  const hasSession = !!sessionCookie?.value;

  // If trying to access admin routes (except login) without a session
  if (path.startsWith('/admin') && path !== '/admin/login' && !hasSession) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access login page with a valid session
  if (path === '/admin/login' && hasSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure the paths that should be handled by this middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/:path*',
    '/api/blog/:path*'
  ]
} 