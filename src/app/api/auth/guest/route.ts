import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

// Mark this route as dynamic to handle cookies
export const dynamic = 'force-dynamic';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_replace_in_production'
);

export async function GET() {
  try {
    // Create a guest token that expires in 24 hours
    const token = await new SignJWT({
      role: 'guest',
      id: nanoid(),
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .setJti(nanoid())
      .sign(JWT_SECRET);

    // Set the token in a cookie
    cookies().set('guest-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return NextResponse.json(
      { message: 'Guest access granted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating guest token:', error);
    return NextResponse.json(
      { error: 'Failed to create guest access' },
      { status: 500 }
    );
  }
} 