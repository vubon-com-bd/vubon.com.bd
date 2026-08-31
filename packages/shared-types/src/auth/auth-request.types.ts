/**
 * Authentication Request Types
 * Types for all authentication-related requests
 */

import type {
  AuthType,
  AuthProvider,
  AuthVerificationType,
  AuthVerificationMethod,
} from '@vubon/shared-constants';
import { AUTH_VERIFICATION_TYPES, AUTH_VERIFICATION_METHODS } from '@vubon/shared-constants';
import type { ID, Email, PhoneNumber } from '../common/core-primitives.types';

// OAuth request types re-exported from auth-oauth.types
export type { AuthOAuthAuthorizeRequest, AuthOAuthTokenRequest } from './auth-oauth.types';

// SSO request types re-exported from auth-sso.types
export type { AuthSsoAuthRequest, AuthSsoCallbackRequest } from './auth-sso.types';

// Social request types re-exported from auth-social.types
export type { AuthSocialLoginRequest, AuthSocialLinkRequest } from './auth-social.types';

// ============================================================
// AUTH REQUEST (বেস)
// ============================================================

/**
 * Base authentication request
 */
export interface AuthBaseRequest {
  /** Authentication type */
  authType?: AuthType;
  /** Device ID */
  deviceId?: ID;
  /** Session ID */
  sessionId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}

// ============================================================
// LOGIN REQUESTS
// ============================================================

/**
 * Login request
 */
export interface AuthLoginRequest {
  /** Email or username */
  identifier: string;
  /** Password */
  password: string;
  /** Remember me flag */
  remember?: boolean;
  /** Device ID */
  deviceId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}

/**
 * OAuth login request
 */
export interface AuthOAuthLoginRequest {
  /** OAuth provider */
  provider: AuthProvider;
  /** Authorization code */
  code: string;
  /** Redirect URI */
  redirectUri?: string;
  /** State parameter */
  state?: string;
  /** Device ID */
  deviceId?: ID;
}

/**
 * SSO login request
 */
export interface AuthSsoLoginRequest {
  /** SSO provider */
  provider: string;
  /** SSO token */
  token: string;
  /** Relay state */
  relayState?: string;
  /** Device ID */
  deviceId?: ID;
}

/**
 * Magic link login request
 */
export interface AuthMagicLinkLoginRequest {
  /** Email address */
  email: Email;
  /** Magic link token */
  token: string;
  /** Device ID */
  deviceId?: ID;
}

// ============================================================
// REGISTER REQUEST
// ============================================================

/**
 * Registration request
 */
export interface AuthRegisterRequest {
  /** Email address */
  email: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Username */
  username?: string;
  /** Password */
  password: string;
  /** Full name */
  name: string;
  /** Device ID */
  deviceId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
  /** Whether to accept terms */
  acceptTerms?: boolean;
}

/**
 * OAuth registration request
 */
export interface AuthOAuthRegisterRequest {
  /** OAuth provider */
  provider: AuthProvider;
  /** Authorization code */
  code: string;
  /** Redirect URI */
  redirectUri?: string;
  /** Additional user data */
  userData?: {
    email?: Email;
    name?: string;
    [key: string]: unknown;
  };
  /** Device ID */
  deviceId?: ID;
}

// ============================================================
// TOKEN REQUESTS
// ============================================================

/**
 * Refresh token request
 */
export interface AuthRefreshTokenRequest {
  /** Refresh token */
  refreshToken: string;
  /** Device ID */
  deviceId?: ID;
  /** Session ID */
  sessionId?: ID;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}

/**
 * Verify token request
 */
export interface AuthVerifyTokenRequest {
  /** Token to verify */
  token: string;
  /** Expected token type */
  expectedType?: string;
  /** Expected user ID */
  expectedUserId?: ID;
}

/**
 * Revoke token request
 */
export interface AuthRevokeTokenRequest {
  /** Token to revoke */
  token: string;
  /** Token type hint */
  tokenTypeHint?: 'access_token' | 'refresh_token';
}

// ============================================================
// PASSWORD REQUESTS
// ============================================================

/**
 * Forgot password request
 */
export interface AuthForgotPasswordRequest {
  /** Email address */
  email: Email;
  /** Reset method */
  method?: 'email' | 'sms';
}

/**
 * Reset password request
 */
export interface AuthResetPasswordRequest {
  /** Reset token */
  token: string;
  /** New password */
  newPassword: string;
  /** Confirm password */
  confirmPassword: string;
}

/**
 * Change password request
 */
export interface AuthChangePasswordRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
  /** Confirm password */
  confirmPassword: string;
}

// ============================================================
// MFA/2FA REQUESTS
// ============================================================

/**
 * Enable 2FA request
 */
export interface AuthEnable2faRequest {
  /** 2FA method */
  method: 'totp' | 'sms' | 'email';
  /** Phone number (for SMS) */
  phoneNumber?: PhoneNumber;
  /** Email (for email) */
  email?: Email;
}

/**
 * Verify 2FA request
 */
export interface AuthVerify2faRequest {
  /** 2FA method */
  method: 'totp' | 'sms' | 'email';
  /** Verification code */
  code: string;
  /** TOTP secret (for TOTP setup) */
  totpSecret?: string;
}

/**
 * Disable 2FA request
 */
export interface AuthDisable2faRequest {
  /** Verification code */
  code: string;
}

// ============================================================
// VERIFICATION REQUESTS
// ============================================================

/**
 * Send verification request
 */
export interface AuthSendVerificationRequest {
  /** Verification type */
  type: AuthVerificationType;
  /** Target (email or phone) */
  target: string;
  /** Resend flag */
  resend?: boolean;
  /** Verification method */
  method?: AuthVerificationMethod;
}

/**
 * Verify OTP code request
 */
export interface AuthVerifyOtpRequest {
  /** Verification type */
  type: AuthVerificationType;
  /** Verification code */
  code: string;
  /** Verification session ID */
  sessionId?: ID;
}

// ============================================================
// SESSION REQUESTS
// ============================================================

/**
 * Terminate session request
 */
export interface AuthTerminateSessionRequest {
  /** Session ID */
  sessionId: ID;
}

/**
 * Terminate all sessions request
 */
export interface AuthTerminateAllSessionsRequest {
  /** Exclude current session */
  excludeCurrent?: boolean;
}

// ============================================================
// VALIDATION FUNCTIONS
// ============================================================

/**
 * Check if verification type is valid
 */
export function isValidVerificationType(type: string): type is AuthVerificationType {
  return Object.values(AUTH_VERIFICATION_TYPES).includes(type as AuthVerificationType);
}

/**
 * Check if verification method is valid
 */
export function isValidVerificationMethod(method: string): method is AuthVerificationMethod {
  return Object.values(AUTH_VERIFICATION_METHODS).includes(method as AuthVerificationMethod);
}

/**
 * Create base request with common fields
 */
export function createAuthBaseRequest(overrides?: Partial<AuthBaseRequest>): AuthBaseRequest {
  return {
    authType: 'session',
    ...overrides,
  };
}

/**
 * Validate login request
 */
export function validateAuthLoginRequest(request: AuthLoginRequest): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.identifier || request.identifier.trim().length === 0) {
    errors.push('Identifier is required');
  }

  if (!request.password || request.password.length === 0) {
    errors.push('Password is required');
  }

  if (request.password && request.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate registration request
 */
export function validateAuthRegisterRequest(request: AuthRegisterRequest): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.email || !request.email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!request.password || request.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!request.name || request.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (request.password && request.password.length > 100) {
    errors.push('Password must be less than 100 characters');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate reset password request
 */
export function validateAuthResetPasswordRequest(request: AuthResetPasswordRequest): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.token || request.token.trim().length === 0) {
    errors.push('Reset token is required');
  }

  if (!request.newPassword || request.newPassword.length < 8) {
    errors.push('New password must be at least 8 characters');
  }

  if (request.newPassword !== request.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
