import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSession } from '@/lib/auth.server';

const PUBLIC_PATHS = [
  '/_next',
  '/public',
  '/api/auth/login',
  '/api/auth/guest',
  '/api/auth/validate',
  '/login',
  '/favicon.ico',
  '/assets',
  '/blog',
  '/api/blog'
];

export async function middleware(request: NextRequest) {
  // Skip middleware for public assets and auth-related API routes
  if (PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the session token from the cookie
  const sessionToken = request.cookies.get('session')?.value;
  const guestToken = request.cookies.get('guest-token')?.value;
  const session = sessionToken ? await validateSession(sessionToken) : null;
  
  // Handle API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Guest users can only access GET methods
    if (session?.user?.role === 'guest' && request.method !== 'GET') {
      return new NextResponse(
        JSON.stringify({ error: 'Guest users can only perform GET operations' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // For non-guest users, ensure they're authenticated for protected routes
    if (!session && !guestToken && !request.nextUrl.pathname.startsWith('/api/public')) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return NextResponse.next();
  }

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.role !== 'admin') {
      const url = new URL('/login', request.url);
      url.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
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