import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth.server';
import { cookies } from 'next/headers';

// Mark this route as dynamic to handle cookies and headers
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Log cookie information for debugging
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session_token');
    console.log('Session token exists:', !!sessionToken);
    
    const session = await getSession();
    console.log('Session result:', session ? 'Found' : 'Not found');
    
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