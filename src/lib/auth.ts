import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import { NextRequest } from 'next/server';

const TOKEN_NAME = 'session';
const TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_replace_in_production'
);
const TOKEN_EXPIRY = '24h';

// Password requirements
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;
export const PASSWORD_REQUIREMENTS = {
  minLength: PASSWORD_MIN_LENGTH,
  maxLength: PASSWORD_MAX_LENGTH,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

export interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
}

export interface Session {
  user: User;
  id?: string;
}

interface JWTSessionPayload extends Session {
  exp?: number;
  iat?: number;
  jti?: string;
}

// Client-side functions
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Password must be less than ${PASSWORD_MAX_LENGTH} characters long`);
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    Cookies.remove('session');
  }
}

// Helper function to check if we're on the client side
const isClient = typeof window !== 'undefined';

export function getClientSession(): Session | null {
  if (!isClient) return null;
  
  const token = Cookies.get('session');
  if (!token) return null;

  try {
    // Decode the JWT without verification (for client-side display only)
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    
    if (!payload.user?.email || !payload.id || !payload.user?.id) {
      return null;
    }

    return {
      user: {
        id: payload.id,
        email: payload.user.email,
      },
    };
  } catch {
    return null;
  }
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  // Mock implementation - replace with actual database validation
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      id: '1',
      email: 'admin@example.com',
    };
  }
  return null;
}

export async function createSession(userId: string): Promise<string> {
  const user: User = { id: userId };
  
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(TOKEN_SECRET);

  const cookieStore = cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  return token;
}

export async function validateSession(token: string): Promise<Session | null> {
  try {
    const verified = await jwtVerify(token, TOKEN_SECRET);
    const payload = verified.payload as JWTSessionPayload;
    
    if (!payload.user?.id) {
      return null;
    }

    return { user: payload.user };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME);

  if (!token?.value) {
    return null;
  }

  return validateSession(token.value);
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }

  return session;
} 