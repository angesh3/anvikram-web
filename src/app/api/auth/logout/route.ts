import { NextResponse } from 'next/server';
import { clearServerSession } from '@/lib/auth.server';
import { cookies } from 'next/headers';

// Mark this route as dynamic to handle cookies
export const dynamic = 'force-dynamic';

export async function POST() {
  console.log('Logout API called');
  
  try {
    // Log cookie information for debugging
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('session_token');
    console.log('Session token exists at logout:', !!sessionToken);
    
    // Clear all session cookies using the server-side function
    clearServerSession();
    
    // Create response with appropriate headers
    const response = NextResponse.json({ success: true });
    
    // Set cookie clearing headers explicitly in the response
    response.headers.set('Set-Cookie', `session_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Expires=${new Date(0).toUTCString()}`);
    
    console.log('Logout successful');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
} 