import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import type { Session } from './auth';

const TOKEN_NAME = 'session';
const TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_replace_in_production'
);
const TOKEN_EXPIRY = '24h';

interface JWTPayload {
  id: string;
  user: {
    id: string;
    email: string;
    role?: string;
  };
  [key: string]: unknown;
}

export async function createSession(userId: string, email: string, role: string) {
  const token = await new SignJWT({ 
    user: {
      id: userId,
      email,
      role
    }
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(TOKEN_SECRET);

  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 86400 // 24 hours
  });

  return token;
}

export async function validateSession(token: string): Promise<Session | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, TOKEN_SECRET);
    const jwtPayload = payload as JWTPayload;
    
    if (!jwtPayload.user?.email || !jwtPayload.user?.id) {
      return null;
    }

    return {
      user: {
        id: jwtPayload.user.id,
        email: jwtPayload.user.email,
        role: jwtPayload.user.role
      }
    };
  } catch (err) {
    console.error('Session validation error:', err);
    return null;
  }
}

export async function getServerSession(): Promise<Session | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  return validateSession(token);
}

export function clearServerSession(): void {
  cookies().delete(TOKEN_NAME);
} 