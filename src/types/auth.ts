export type UserRole = 'admin' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface Session {
  user: User;
  expires: string;
}

export interface GuestSession {
  role: 'guest';
  token: string;
  expires: string;
} 