// Shared types for authentication
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type UserRole = 'user' | 'admin' | 'super_admin';
