import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    // Get IP address
    const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              '127.0.0.1';
    
    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    
    // Get current path from the referrer header or query param
    const referrerHeader = request.headers.get('referer');
    const path = request.nextUrl.searchParams.get('path') || 
                (referrerHeader ? new URL(referrerHeader).pathname : '/');
    
    // Get original referrer if available
    const originalReferrer = request.headers.get('x-original-referrer') || null;
    
    // Track the visitor
    await trackVisitor(
      typeof ip === 'string' ? ip.split(',')[0].trim() : ip,
      userAgent,
      path,
      originalReferrer
    );
    
    // Return a 1x1 transparent GIF
    return new NextResponse(
      Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'),
      {
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
} 