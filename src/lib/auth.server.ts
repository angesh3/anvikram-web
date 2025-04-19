import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import type { Session } from './auth';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function createSession(userId: string, email: string, role: string) {
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET_KEY);

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 24 hours
  });

  return token;
}

export async function validateSession(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return !!(payload.userId && payload.email && payload.role);
  } catch {
    return false;
  }
}

export async function getServerSession(): Promise<Session | null> {
  const token = cookies().get('session')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string
    };
  } catch {
    return null;
  }
}

export function clearServerSession(): void {
  cookies().delete('session');
} 