import { NextResponse } from 'next/server';
import { validateCredentials } from '@/lib/auth';
import { createSession } from '@/lib/auth.server';

// Mark this route as dynamic to handle cookies
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    if (!email || !password) {
      console.log('Login error: Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await validateCredentials(email, password);
    if (!user) {
      console.log('Login error: Invalid credentials');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('User authenticated successfully:', user.email, user.role);
    
    // Create session with user info (this will set the cookie)
    const token = await createSession(user);
    console.log('Session created with token length:', token ? token.length : 0);
    
    const response = NextResponse.json(
      { success: true, user: { email: user.email, role: user.role } },
      { status: 200 }
    );
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 