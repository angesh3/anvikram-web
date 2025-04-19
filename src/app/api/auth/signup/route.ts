import { NextResponse } from 'next/server';
import { signUp } from '@/lib/auth';
import { validatePassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate password
    const { isValid, errors } = validatePassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password', details: errors },
        { status: 400 }
      );
    }

    // Create admin user
    const user = await signUp(email, password, 'admin');
    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 