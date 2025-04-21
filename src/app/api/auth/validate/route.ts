import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth.server';

// Mark this route as dynamic to handle cookies and headers
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    // Return the session with user info
    return NextResponse.json({
      success: true,
      user: session,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
    });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 