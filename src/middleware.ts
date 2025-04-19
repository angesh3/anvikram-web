import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin/dashboard route
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Check if user is authenticated (in a real app, this would verify a JWT token)
    const isAuthenticated = request.cookies.get('isAdmin')?.value === 'true';

    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}; 