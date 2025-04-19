import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';
import { jwtVerify, SignJWT } from 'jose';

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

interface LoginAttempt {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
}

const loginAttempts = new Map<string, LoginAttempt>();

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const TOKEN_EXPIRY = '24h';

export interface Session {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

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

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string, email: string, role: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours
  
  const token = await new SignJWT({ userId, email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(exp)
    .sign(SECRET_KEY);
  
  Cookies.set('session', token, { expires: 1, secure: true, sameSite: 'strict' });
  return token;
}

export async function validateSession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      userId: String(payload.userId),
      email: String(payload.email),
      role: String(payload.role),
      exp: Number(payload.exp)
    };
  } catch (error) {
    console.error('Session validation failed:', error);
    return null;
  }
}

export function clearSession(): void {
  Cookies.remove('session');
}

export async function getSession(): Promise<Session | null> {
  const token = Cookies.get('session');
  if (!token) return null;
  return validateSession(token);
}

export function isSessionExpired(session: Session | null): boolean {
  if (!session) return true;
  return Date.now() >= session.exp * 1000;
}

export async function logActivity(userId: string, action: string): Promise<void> {
  try {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] User ${userId}: ${action}`);
    // Here you would typically save this to a database
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}

export function trackFailedLogin(email: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: now };
  
  // Reset if last attempt was more than 15 minutes ago
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    attempts.count = 1;
    attempts.lockedUntil = undefined;
  } else {
    attempts.count++;
    if (attempts.count >= 5) {
      attempts.lockedUntil = now + 15 * 60 * 1000; // Lock for 15 minutes
    }
  }
  
  attempts.lastAttempt = now;
  loginAttempts.set(email, attempts);
  
  return attempts.count >= 5;
}

export function resetLoginAttempts(email: string): void {
  loginAttempts.delete(email);
} 