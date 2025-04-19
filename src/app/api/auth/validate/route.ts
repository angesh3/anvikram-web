import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession } from '@/lib/auth.server';

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 });
    }

    const isValid = await validateSession(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 