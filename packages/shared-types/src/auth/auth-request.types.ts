/**
 * Auth Request Types
 * Type definitions for authentication requests based on shared-constants
 * @module AuthRequestTypes
 */

import { Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth
// ============================================================
import {
  // Auth Session
  AuthSessionType,
  // Auth Token
  AuthTokenType,
  // Auth Verification
  AuthVerificationType,
  AuthVerificationChannel,
  // Auth Password
  AuthPasswordStrength,
} from '@vubon/shared-constants';

// ============================================================
// Auth Request Types
// ============================================================

/**
 * Login request
 */
export interface AuthLoginRequest {
  /** Email or username */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Username */
  username?: string;
  /** Password */
  password: string;
  /** Remember me flag */
  rememberMe?: boolean;
  /** Session type */
  sessionType?: AuthSessionType;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Registration request
 */
export interface AuthRegisterRequest {
  /** Email */
  email: string;
  /** Phone number */
  phone?: string;
  /** Password */
  password: string;
  /** Confirm password */
  confirmPassword: string;
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Accept terms */
  acceptTerms: boolean;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Refresh token request
 */
export interface AuthRefreshTokenRequest {
  /** Refresh token */
  refreshToken: string;
  /** Access token (optional) */
  accessToken?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Logout request
 */
export interface AuthLogoutRequest {
  /** Session ID */
  sessionId?: ID;
  /** All sessions */
  allSessions?: boolean;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Password reset request
 */
export interface AuthPasswordResetRequest {
  /** Email or phone */
  identifier: string;
  /** Reset method */
  method: 'email' | 'phone' | 'both';
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Password change request
 */
export interface AuthPasswordChangeRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
  /** Confirm new password */
  confirmNewPassword: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Email verification request
 */
export interface AuthEmailVerificationRequest {
  /** User ID */
  userId: ID;
  /** Verification code */
  code?: string;
  /** Verification token */
  token?: string;
  /** Channel */
  channel?: AuthVerificationChannel;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Phone verification request
 */
export interface AuthPhoneVerificationRequest {
  /** User ID */
  userId: ID;
  /** Phone number */
  phone: string;
  /** Verification code */
  code?: string;
  /** Verification token */
  token?: string;
  /** Channel */
  channel?: AuthVerificationChannel;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * 2FA verification request
 */
export interface Auth2FAVerificationRequest {
  /** User ID */
  userId: ID;
  /** 2FA code */
  code: string;
  /** 2FA token */
  token?: string;
  /** 2FA method */
  method?: string;
  /** Trust this device */
  trustDevice?: boolean;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Social login request
 */
export interface AuthSocialLoginRequest {
  /** Social provider */
  provider: string;
  /** Access token from social provider */
  accessToken: string;
  /** Provider user ID */
  providerUserId: string;
  /** Email */
  email?: string;
  /** Name */
  name?: string;
  /** Avatar URL */
  avatar?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * SSO login request
 */
export interface AuthSSOLoginRequest {
  /** SSO provider */
  provider: string;
  /** SAML response or OIDC code */
  assertion: string;
  /** Relay state */
  relayState?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * OAuth login request
 */
export interface AuthOAuthLoginRequest {
  /** OAuth provider */
  provider: string;
  /** Authorization code */
  code: string;
  /** Redirect URI */
  redirectUri: string;
  /** State */
  state?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Magic link request
 */
export interface AuthMagicLinkRequest {
  /** Email or phone */
  identifier: string;
  /** Redirect URL */
  redirectUrl?: string;
  /** Token expiry (minutes) */
  expiryMinutes?: number;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Device verification request
 */
export interface AuthDeviceVerificationRequest {
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** Verification code */
  code: string;
  /** Trust this device */
  trustDevice?: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Biometric authentication request
 */
export interface AuthBiometricRequest {
  /** User ID */
  userId: ID;
  /** Biometric challenge */
  challenge: string;
  /** Biometric signature */
  signature: string;
  /** Biometric type */
  biometricType: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * MFA setup request
 */
export interface AuthMFASetupRequest {
  /** User ID */
  userId: ID;
  /** MFA method */
  method: string;
  /** Phone number (for SMS) */
  phone?: string;
  /** Email (for email OTP) */
  email?: string;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * MFA verification request
 */
export interface AuthMFAVerificationRequest {
  /** User ID */
  userId: ID;
  /** MFA code */
  code: string;
  /** MFA method */
  method: string;
  /** Trust this device */
  trustDevice?: boolean;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Request Validation Types
// ============================================================

/**
 * Request validation result
 */
export interface AuthRequestValidationResult {
  isValid: boolean;
  errors?: AuthRequestValidationError[];
  warnings?: string[];
}

/**
 * Request validation error
 */
export interface AuthRequestValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

/**
 * Request rate limit info
 */
export interface AuthRequestRateLimit {
  limit: number;
  remaining: number;
  resetAt: Date;
  retryAfter?: number;
}

/**
 * Request metadata with security context
 */
export interface AuthRequestSecurityContext {
  ipAddress: string;
  userAgent: string;
  deviceInfo?: DeviceInfo;
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  isSuspicious: boolean;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  AuthSessionType,
  AuthTokenType,
  AuthVerificationType,
  AuthVerificationChannel,
  AuthPasswordStrength,
};
