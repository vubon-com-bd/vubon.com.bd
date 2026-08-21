import type { AuthCredentials, AuthUser, AuthTokens, AuthResponse } from './core-primitives.types';

/**
 * Request payload for user registration
 */
export interface RegisterRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

/**
 * Request payload for login (extends AuthCredentials)
 */
export interface LoginRequest extends AuthCredentials {
  rememberMe?: boolean;
}

/**
 * Request payload for forgot password (send reset link)
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Request payload for resetting password with token
 */
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Request payload for refreshing access token
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Request payload for logout
 */
export interface LogoutRequest {
  refreshToken: string;
}

/**
 * Response for refresh token operation (alias of AuthTokens)
 */
export type RefreshTokenResponse = AuthTokens;

/**
 * Response for password reset confirmation
 */
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Response for forgot password request
 */
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Registration response (alias of AuthResponse)
 */
export type RegisterResponse = AuthResponse;

/**
 * Login response (alias of AuthResponse)
 */
export type LoginResponse = AuthResponse;

/**
 * Status of the authentication flow
 */
export type AuthFlowStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/**
 * Authentication state for frontend store
 */
export interface AuthState {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  status: AuthFlowStatus;
  error: string | null;
  isInitialized: boolean;
}
