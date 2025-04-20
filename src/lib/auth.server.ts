import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import type { User, UserRole } from '@/types/auth';

interface JWTPayload {
  id: string;
  email: string;
  role: string;
  exp?: number;
}

const TOKEN_NAME = 'session_token';
const GUEST_TOKEN_NAME = 'guest_token';

// Get JWT secret from environment
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function createSession(user: User) {
  try {
    const secret = await getJwtSecret();
    const token = await new SignJWT({ 
      id: user.id,
      email: user.email,
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .setJti(nanoid())
      .sign(secret);

    const cookieStore = cookies();
    cookieStore.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    // Remove guest token if it exists when creating an admin session
    if (user.role === 'admin') {
      cookieStore.delete(GUEST_TOKEN_NAME);
    }

    return token;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
}

export async function validateSession(token: string): Promise<User | null> {
  try {
    const secret = await getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    
    const role = payload.role as UserRole;
    const user: User = {
      id: payload.id,
      email: payload.email,
      role
    };

    return user;
  } catch (error) {
    console.error('Error validating session:', error);
    return null;
  }
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    
    if (!token) {
      return null;
    }

    return validateSession(token);
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export function clearServerSession(): void {
  cookies().delete(TOKEN_NAME);
} 