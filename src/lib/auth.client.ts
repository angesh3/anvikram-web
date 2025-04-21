import Cookies from 'js-cookie';
import type { Session } from '@/types/auth';

const TOKEN_NAME = 'session_token';
const GUEST_TOKEN_NAME = 'guest_token';

export function clearClientSession(): void {
  console.log('Clearing client-side cookies');
  
  // Clear all auth cookies on the client side with the most permissive options
  Cookies.remove(TOKEN_NAME, { 
    path: '/',
    domain: window.location.hostname,
    secure: false
  });
  
  Cookies.remove(GUEST_TOKEN_NAME, { 
    path: '/',
    domain: window.location.hostname,
    secure: false
  });
  
  // For localhost or IP address, also try without domain
  if (window.location.hostname === 'localhost' || /^(\d{1,3}\.){3}\d{1,3}$/.test(window.location.hostname)) {
    Cookies.remove(TOKEN_NAME, { path: '/' });
    Cookies.remove(GUEST_TOKEN_NAME, { path: '/' });
  }
  
  console.log('Client cookies cleared');
}

export function getClientSession(): Session | null {
  const token = Cookies.get(TOKEN_NAME);
  if (!token) return null;

  try {
    // Decode the JWT without verification (for client-side display only)
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    
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
  } catch {
    return null;
  }
} 