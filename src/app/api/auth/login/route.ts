import { NextResponse } from 'next/server';
import { createSession } from '@/lib/auth.server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // In a real application, validate against database
    if (username === 'admin' && password === 'Admin123!') {
      await createSession(username, username, 'admin');
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 