import { AuthPublic } from './auth.types';
import { AuthSessionPublic } from './auth-session.types';

/**
 * Auth response interface
 *
 * ⚠️ SECURITY: Uses AuthSessionPublic (no raw token) — never AuthSession.
 * Tokens are delivered as top-level accessToken/refreshToken fields.
 */
export interface AuthResponse {
  user: AuthPublic;
  session: AuthSessionPublic;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthPublic;
  session: AuthSessionPublic;
}

/**
 * Register response interface
 */
export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
  verificationRequired: boolean;
}
