import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor } from '@/lib/analytics';

// List of paths to exclude from tracking
const EXCLUDE_PATHS = [
  '/_next',
  '/public',
  '/api/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip tracking for excluded paths
  if (EXCLUDE_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  // Get IP address
  const ip = request.headers.get('x-forwarded-for') || 
            request.headers.get('x-real-ip') || 
            '127.0.0.1';
  
  // Get user agent
  const userAgent = request.headers.get('user-agent') || 'Unknown';
  
  // Get referrer
  const referrer = request.headers.get('referer');
  
  // Track the visitor asynchronously (don't wait for it to complete)
  trackVisitor(
    typeof ip === 'string' ? ip.split(',')[0].trim() : ip,
    userAgent,
    pathname,
    referrer
  ).catch(err => console.error('Error tracking visitor:', err));
  
  // Continue with the request
  return NextResponse.next();
}

// Configure the matcher to include all paths except those we want to exclude
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/track (our tracking API)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/track).*)',
  ],
}; 