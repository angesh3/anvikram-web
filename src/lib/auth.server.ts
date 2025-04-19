import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import type { Session, User, UserRole } from '@/types/auth';

const TOKEN_NAME = 'session';
const TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_replace_in_production'
);

interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
  exp?: number;
  iat?: number;
  jti?: string;
}

export async function createSession(user: User): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(TOKEN_SECRET);

  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return token;
}

export async function getSession(): Promise<Session | null> {
  const token = cookies().get(TOKEN_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, TOKEN_SECRET);
    const payload = verified.payload as JWTPayload;

    if (!payload.id || !payload.email || !payload.role) {
      return null;
    }

    return {
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role
      },
      expires: payload.exp ? new Date(payload.exp * 1000).toISOString() : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function validateSession(token: string): Promise<Session | null> {
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, TOKEN_SECRET);
    const payload = verified.payload as JWTPayload;

    if (!payload.id || !payload.email || !payload.role) {
      return null;
    }

    return {
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role
      },
      expires: payload.exp ? new Date(payload.exp * 1000).toISOString() : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export function clearServerSession(): void {
  cookies().delete(TOKEN_NAME);
} 