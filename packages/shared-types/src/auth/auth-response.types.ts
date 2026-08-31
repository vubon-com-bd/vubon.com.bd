/**
 * Authentication Response Types
 * Types for all authentication-related responses
 */

import type { AuthStatus, AuthRole } from '@vubon/shared-constants';
import { AUTHENTICATED_STATUSES } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';
import type { ApiError } from '../common/api.types';
import type { AuthToken } from './auth.types';

// Re-export social response types from auth-social.types to avoid duplication
export type { AuthSocialLoginResponse } from './auth-social.types';

// Re-export SSO response types from auth-sso.types to avoid duplication
export type { AuthSsoAuthResponse } from './auth-sso.types';

// Re-export OAuth response types from auth-oauth.types to avoid duplication
export type { AuthOAuthTokenResponse, AuthOAuthErrorResponse } from './auth-oauth.types';

// ============================================================
// AUTH RESPONSE (বেস)
// ============================================================

/**
 * Base authentication response
 */
export interface AuthBaseResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** HTTP status code */
  statusCode: number;
  /** Human-readable message */
  message: string;
  /** Timestamp of the response */
  timestamp: Timestamp;
  /** Error details (if any) */
  errors?: ApiError[];
}

// ============================================================
// LOGIN RESPONSES
// ============================================================

/**
 * Login response
 */
export interface AuthLoginResponse extends AuthBaseResponse {
  /** User ID */
  userId: ID;
  /** Authentication tokens */
  tokens: AuthToken;
  /** User role */
  role: AuthRole;
  /** Authentication status */
  authStatus: AuthStatus;
  /** Whether 2FA is required */
  twoFactorRequired?: boolean;
  /** 2FA session ID (if required) */
  twoFactorSessionId?: ID;
}

/**
 * OAuth login response
 */
export interface AuthOAuthLoginResponse extends AuthBaseResponse {
  /** User ID */
  userId: ID;
  /** Authentication tokens */
  tokens: AuthToken;
  /** OAuth provider used */
  provider: string;
  /** Whether new account was created */
  isNewAccount: boolean;
}

/**
 * SSO login response
 */
export interface AuthSsoLoginResponse extends AuthBaseResponse {
  /** User ID */
  userId: ID;
  /** Authentication tokens */
  tokens: AuthToken;
  /** SSO provider used */
  provider: string;
  /** SSO session ID */
  ssoSessionId: ID;
}

// ============================================================
// REGISTER RESPONSES
// ============================================================

/**
 * Registration response
 */
export interface AuthRegisterResponse extends AuthBaseResponse {
  /** User ID */
  userId: ID;
  /** Authentication tokens */
  tokens: AuthToken;
  /** Whether verification is required */
  verificationRequired: boolean;
  /** Verification type */
  verificationType?: 'email' | 'phone';
}

// ============================================================
// TOKEN RESPONSES
// ============================================================

/**
 * Refresh token response
 */
export interface AuthRefreshTokenResponse extends AuthBaseResponse {
  /** New authentication tokens */
  tokens: AuthToken;
}

/**
 * Verify token response
 */
export interface AuthVerifyTokenResponse extends AuthBaseResponse {
  /** Whether the token is valid */
  isValid: boolean;
  /** Token status */
  status: string;
  /** Token payload (if valid) */
  payload?: Record<string, unknown>;
}

// ============================================================
// PASSWORD RESPONSES
// ============================================================

/**
 * Forgot password response
 */
export interface AuthForgotPasswordResponse extends AuthBaseResponse {
  /** Whether reset email was sent */
  emailSent: boolean;
  /** Reset token (if applicable) */
  resetToken?: string;
}

/**
 * Reset password response
 */
export interface AuthResetPasswordResponse extends AuthBaseResponse {
  /** Whether password was reset successfully */
  resetSuccess: boolean;
}

/**
 * Change password response
 */
export interface AuthChangePasswordResponse extends AuthBaseResponse {
  /** Whether password was changed successfully */
  changedSuccess: boolean;
}

// ============================================================
// MFA/2FA RESPONSES
// ============================================================

/**
 * Enable 2FA response
 */
export interface AuthEnable2faResponse extends AuthBaseResponse {
  /** 2FA method enabled */
  method: 'totp' | 'sms' | 'email';
  /** TOTP secret (for TOTP) */
  totpSecret?: string;
  /** TOTP QR code URL (for TOTP) */
  totpQrUrl?: string;
  /** Backup codes */
  backupCodes?: string[];
}

/**
 * Verify 2FA response
 */
export interface AuthVerify2faResponse extends AuthBaseResponse {
  /** Whether verification was successful */
  verified: boolean;
  /** Authentication tokens (if login flow) */
  tokens?: AuthToken;
}

/**
 * Disable 2FA response
 */
export interface AuthDisable2faResponse extends AuthBaseResponse {
  /** Whether 2FA was disabled successfully */
  disabled: boolean;
}

// ============================================================
// VERIFICATION RESPONSES
// ============================================================

/**
 * Send verification response
 */
export interface AuthSendVerificationResponse extends AuthBaseResponse {
  /** Whether verification was sent */
  sent: boolean;
  /** Verification method */
  method: 'email' | 'sms';
  /** Resend cooldown in seconds */
  resendCooldown: number;
}

/**
 * Verify code response
 */
export interface AuthVerifyCodeResponse extends AuthBaseResponse {
  /** Whether verification was successful */
  verified: boolean;
  /** Verification status */
  status: string;
}

// ============================================================
// SESSION RESPONSES
// ============================================================

/**
 * Terminate session response
 */
export interface AuthTerminateSessionResponse extends AuthBaseResponse {
  /** Whether session was terminated */
  terminated: boolean;
}

/**
 * Session list response
 */
export interface AuthSessionListResponse extends AuthBaseResponse {
  /** Active sessions */
  sessions: Array<{
    id: ID;
    device: string;
    lastActive: Timestamp;
    ipAddress: string;
  }>;
  /** Total sessions */
  total: number;
}

// ============================================================
// API RESPONSE WRAPPER
// ============================================================

/**
 * API response wrapper for auth endpoints
 */
export interface AuthApiResponse<T> {
  /** HTTP status code */
  status: number;
  /** Response data */
  data: T;
  /** Human-readable message */
  message: string;
  /** ISO timestamp of the response */
  timestamp: string;
  /** Request path (optional) */
  path?: string;
  /** Validation or business errors (optional) */
  errors?: ApiError[];
  /** Auth-specific metadata */
  authMeta?: {
    /** Authentication status */
    status: AuthStatus;
    /** Whether authentication is required */
    requiresAuth: boolean;
    /** User ID (if authenticated) */
    userId?: ID;
    /** Session ID (if applicable) */
    sessionId?: ID;
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Create success response
 */
export function createAuthSuccessResponse<T extends AuthBaseResponse>(
  data: Partial<T>,
  message: string = 'Success'
): T {
  return {
    success: true,
    statusCode: 200,
    message,
    timestamp: new Date(),
    ...data,
  } as T;
}

/**
 * Create error response
 */
export function createAuthErrorResponse(
  message: string,
  statusCode: number = 400,
  errors?: ApiError[]
): AuthBaseResponse {
  return {
    success: false,
    statusCode,
    message,
    timestamp: new Date(),
    errors,
  };
}

/**
 * Check if response is successful
 */
export function isAuthResponseSuccess(response: AuthBaseResponse): boolean {
  return response.success;
}

/**
 * Get error message from response
 */
export function getAuthResponseErrorMessage(response: AuthBaseResponse): string {
  if (response.errors && response.errors.length > 0) {
    return response.errors[0].message;
  }
  return response.message;
}

/**
 * Create auth API response
 */
export function createAuthApiResponse<T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
  authMeta?: AuthApiResponse<T>['authMeta']
): AuthApiResponse<T> {
  return {
    status: statusCode,
    data,
    message,
    timestamp: new Date().toISOString(),
    authMeta,
  };
}

/**
 * Check if user is authenticated based on status
 */
export function isAuthResponseAuthenticated(status: AuthStatus): boolean {
  return AUTHENTICATED_STATUSES.includes(status);
}
