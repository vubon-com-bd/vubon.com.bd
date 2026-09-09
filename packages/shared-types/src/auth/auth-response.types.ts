import { Auth } from './auth.types';
import { AuthSession } from './auth-session.types';
import { AuthToken } from './auth-token.types';

/**
 * Auth response interface
 */
export interface AuthResponse {
  user: Auth;
  session: AuthSession;
  token: AuthToken;
}

/**
 * Login response interface
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: Auth;
  session: AuthSession;
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
