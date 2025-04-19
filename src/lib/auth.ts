import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
import type { User, Session, UserRole } from '@/types/auth';
import { supabase } from './supabase';

const TOKEN_NAME = 'session';
const GUEST_TOKEN_NAME = 'guest-token';
const TOKEN_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default_secret_replace_in_production'
);
const TOKEN_EXPIRY = '24h';
const GUEST_TOKEN_EXPIRY = '7d'; // Guest tokens last longer

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

interface JWTPayload {
  id: string;
  email: string;
  role: UserRole;
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
  const isBrowser = typeof globalThis !== 'undefined' && 'window' in globalThis;
  if (isBrowser) {
    // Store the guest token before clearing
    const guestToken = Cookies.get(GUEST_TOKEN_NAME);
    
    // Clear all auth cookies
    Cookies.remove(TOKEN_NAME);
    Cookies.remove(GUEST_TOKEN_NAME);
    
    // If there was a guest token and we're logging out, restore it
    if (guestToken) {
      Cookies.set(GUEST_TOKEN_NAME, guestToken, { 
        expires: 7, // 7 days
        sameSite: 'lax'
      });
    }
  }
}

// Helper function to check if we're on the client side
const isClient = typeof globalThis !== 'undefined' && 'window' in globalThis;

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
        role: payload.user.role || 'guest'
      },
      expires: payload.exp ? new Date(payload.exp * 1000).toISOString() : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  } catch {
    return null;
  }
}

export async function validateCredentials(email: string, password: string): Promise<User | null> {
  // Demo credentials for testing
  if (email === 'admin@example.com' && password === 'admin123') {
    return {
      id: '1',
      email: 'admin@example.com',
      role: 'admin'
    };
  }

  // Your email for testing
  if (email === 'angeshvikram@gmail.com' && password === 'AngeshVikram@2024') {
    return {
      id: '2',
      email: 'angeshvikram@gmail.com',
      role: 'admin'
    };
  }

  return null;
}

export async function createGuestToken(): Promise<string> {
  const guestId = nanoid();
  const token = await new SignJWT({
    id: guestId,
    email: `guest-${guestId}@temporary.com`,
    role: 'guest' as UserRole
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(GUEST_TOKEN_EXPIRY)
    .sign(TOKEN_SECRET);

  cookies().set(GUEST_TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
  });

  return token;
}

export async function createSession(user: User): Promise<string | null> {
  try {
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      role: user.role
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(TOKEN_SECRET);

    // Set the admin session token
    cookies().set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    // Remove any existing guest token when setting an admin session
    cookies().delete(GUEST_TOKEN_NAME);

    return token;
  } catch (error) {
    console.error('Error creating session:', error);
    return null;
  }
}

export async function getSession(req?: Request): Promise<Session | null> {
  try {
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;

    if (!token) {
      // Try to get guest token if no regular token exists
      const guestToken = cookieStore.get(GUEST_TOKEN_NAME)?.value;
      if (guestToken) {
        const verified = await jwtVerify(guestToken, TOKEN_SECRET);
        const payload = verified.payload as JWTPayload;
        return {
          user: {
            id: payload.id,
            email: payload.email,
            role: 'guest'
          },
          expires: payload.exp ? new Date(payload.exp * 1000).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
      }
      return null;
    }

    // Verify the token
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
    console.error('Error getting session:', error);
    return null;
  }
}

export async function validateSession(session: Session | null): Promise<boolean> {
  if (!session) return false;

  // Allow guest sessions for GET requests only (this should be checked in middleware)
  if (session.user.role === 'guest') {
    return true;
  }

  // For regular users, ensure they have a valid session and exist in database
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error || !user) {
      return false;
    }

    const expiryDate = new Date(session.expires);
    return expiryDate > new Date();
  } catch (error) {
    console.error('Error validating session:', error);
    return false;
  }
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }

  return session;
}

export async function signUp(email: string, password: string, role: UserRole = 'guest'): Promise<User | null> {
  try {
    // First create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError || !authData.user) {
      console.error('Error creating user in Supabase Auth:', authError);
      return null;
    }

    // Then create the user in our users table with the role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (userError || !userData) {
      console.error('Error creating user in users table:', userError);
      // Clean up the auth user since we couldn't create the database entry
      await supabase.auth.admin.deleteUser(authData.user.id);
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role
    };
  } catch (error) {
    console.error('Error in signUp:', error);
    return null;
  }
} 