/**
 * Auth Response Types
 * Type definitions for authentication responses based on shared-constants
 * @module AuthResponseTypes
 */

import { Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth
// ============================================================
import {
  // Auth Session
  AuthSessionType,
  AuthSessionStatus,
  // Auth Token
  AuthTokenType,
  AuthTokenStatus,
  // Auth Verification
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationChannel,
  AuthVerificationLevel,
  // Auth Password
  AuthPasswordStrength,
  // Auth Account Lock
  AuthAccountLockStatus,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockLevel,
} from '@vubon/shared-constants';

// ============================================================
// Auth Response Types
// ============================================================

/**
 * Login response
 */
export interface AuthLoginResponse {
  /** User information */
  user: AuthUserInfo;
  /** Token information */
  tokens: AuthTokenInfo;
  /** Session information */
  session: AuthSessionInfo;
  /** Security context */
  security?: AuthSecurityContext;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Registration response
 */
export interface AuthRegisterResponse {
  /** User information */
  user: AuthUserInfo;
  /** Verification required */
  verificationRequired: boolean;
  /** Verification details */
  verificationDetails?: AuthVerificationInfo;
  /** Token information */
  tokens?: AuthTokenInfo;
  /** Session information */
  session?: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Refresh token response
 */
export interface AuthRefreshTokenResponse {
  /** New access token */
  accessToken: string;
  /** New refresh token (if rotated) */
  refreshToken?: string;
  /** Expires in (seconds) */
  expiresIn: number;
  /** Token type */
  tokenType: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Logout response
 */
export interface AuthLogoutResponse {
  /** Success status */
  success: boolean;
  /** Message */
  message?: string;
  /** Sessions affected */
  sessionsAffected?: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Password reset response
 */
export interface AuthPasswordResetResponse {
  /** Success status */
  success: boolean;
  /** Message */
  message?: string;
  /** Reset token (if applicable) */
  resetToken?: string;
  /** Expires in (seconds) */
  expiresIn?: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Password change response
 */
export interface AuthPasswordChangeResponse {
  /** Success status */
  success: boolean;
  /** Message */
  message?: string;
  /** Password strength */
  strength?: AuthPasswordStrength;
  /** Requires re-login */
  requiresReLogin?: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Verification response
 */
export interface AuthVerificationResponse {
  /** Success status */
  success: boolean;
  /** Verification type */
  type: AuthVerificationType;
  /** Verification status */
  status: AuthVerificationStatus;
  /** Message */
  message?: string;
  /** Verified at */
  verifiedAt?: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * 2FA verification response
 */
export interface Auth2FAVerificationResponse {
  /** Success status */
  success: boolean;
  /** Requires additional verification */
  requiresAdditionalVerification: boolean;
  /** Trust device */
  trustDevice?: boolean;
  /** Token information */
  tokens?: AuthTokenInfo;
  /** Session information */
  session?: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Social login response
 */
export interface AuthSocialLoginResponse {
  /** User information */
  user: AuthUserInfo;
  /** Social provider */
  provider: string;
  /** Provider user ID */
  providerUserId: string;
  /** Is new user */
  isNewUser: boolean;
  /** Token information */
  tokens: AuthTokenInfo;
  /** Session information */
  session: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * SSO login response
 */
export interface AuthSSOLoginResponse {
  /** User information */
  user: AuthUserInfo;
  /** SSO provider */
  provider: string;
  /** SAML or OIDC attributes */
  attributes?: Record<string, unknown>;
  /** Token information */
  tokens: AuthTokenInfo;
  /** Session information */
  session: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * OAuth login response
 */
export interface AuthOAuthLoginResponse {
  /** User information */
  user: AuthUserInfo;
  /** OAuth provider */
  provider: string;
  /** Provider user ID */
  providerUserId: string;
  /** Token information */
  tokens: AuthTokenInfo;
  /** Session information */
  session: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Magic link response
 */
export interface AuthMagicLinkResponse {
  /** Success status */
  success: boolean;
  /** Message */
  message?: string;
  /** Magic link token */
  token?: string;
  /** Expires in (seconds) */
  expiresIn?: number;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * MFA setup response
 */
export interface AuthMFASetupResponse {
  /** Success status */
  success: boolean;
  /** MFA method */
  method: string;
  /** Secret key (for TOTP) */
  secret?: string;
  /** QR code URL (for TOTP) */
  qrCodeUrl?: string;
  /** Backup codes */
  backupCodes?: string[];
  /** Message */
  message?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * MFA verification response
 */
export interface AuthMFAVerificationResponse {
  /** Success status */
  success: boolean;
  /** Verified */
  verified: boolean;
  /** Trust device */
  trustDevice?: boolean;
  /** Token information */
  tokens?: AuthTokenInfo;
  /** Session information */
  session?: AuthSessionInfo;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Response Component Types
// ============================================================

/**
 * User information
 */
export interface AuthUserInfo {
  /** User ID */
  id: ID;
  /** Email */
  email?: string;
  /** Phone number */
  phone?: string;
  /** Username */
  username?: string;
  /** Full name */
  name?: string;
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Avatar URL */
  avatar?: string;
  /** Roles */
  roles: string[];
  /** Permissions */
  permissions: string[];
  /** Email verified */
  emailVerified: boolean;
  /** Phone verified */
  phoneVerified: boolean;
  /** Is active */
  isActive: boolean;
  /** Is locked */
  isLocked: boolean;
  /** Last login at */
  lastLoginAt?: Date;
}

/**
 * Token information
 */
export interface AuthTokenInfo {
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken?: string;
  /** Token type */
  tokenType: string;
  /** Expires in (seconds) */
  expiresIn: number;
  /** Issued at */
  issuedAt: Date;
  /** Expires at */
  expiresAt: Date;
}

/**
 * Session information
 */
export interface AuthSessionInfo {
  /** Session ID */
  id: ID;
  /** Session type */
  type: AuthSessionType;
  /** Session status */
  status: AuthSessionStatus;
  /** Expires at */
  expiresAt: Date;
  /** Last activity at */
  lastActivityAt: Date;
  /** Is active */
  isActive: boolean;
  /** Device info */
  deviceInfo?: DeviceInfo;
  /** IP address */
  ipAddress?: string;
  /** Location */
  location?: string;
}

/**
 * Verification information
 */
export interface AuthVerificationInfo {
  /** Verification type */
  type: AuthVerificationType;
  /** Verification status */
  status: AuthVerificationStatus;
  /** Verification channel */
  channel: AuthVerificationChannel;
  /** Verification level */
  level: AuthVerificationLevel;
  /** Expires at */
  expiresAt: Date;
  /** Is complete */
  isComplete: boolean;
  /** Is in progress */
  isInProgress: boolean;
  /** Is failed */
  isFailed: boolean;
}

/**
 * Security context
 */
export interface AuthSecurityContext {
  /** Risk level */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** Is suspicious */
  isSuspicious: boolean;
  /** Device trust level */
  deviceTrustLevel?: 'unknown' | 'low' | 'medium' | 'high';
  /** Account lock status */
  accountLockStatus?: AuthAccountLockStatus;
  /** Account lock reason */
  accountLockReason?: AuthAccountLockReason;
  /** Account lock type */
  accountLockType?: AuthAccountLockType;
  /** Account lock level */
  accountLockLevel?: AuthAccountLockLevel;
  /** Failed login attempts */
  failedLoginAttempts?: number;
  /** Remaining attempts */
  remainingAttempts?: number;
  /** Locked until */
  lockedUntil?: Date;
}

// ============================================================
// Error Response Types
// ============================================================

/**
 * Authentication error response
 */
export interface AuthErrorResponse {
  /** Success status (always false) */
  success: false;
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: AuthErrorDetail[];
  /** Timestamp */
  timestamp: Date;
  /** Request ID */
  requestId?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Authentication error detail
 */
export interface AuthErrorDetail {
  /** Field name */
  field?: string;
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Value */
  value?: unknown;
}

/**
 * Authentication error codes
 */
export type AuthErrorCode =
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_ACCOUNT_LOCKED'
  | 'AUTH_ACCOUNT_INACTIVE'
  | 'AUTH_ACCOUNT_NOT_VERIFIED'
  | 'AUTH_ACCOUNT_EXPIRED'
  | 'AUTH_INVALID_TOKEN'
  | 'AUTH_TOKEN_EXPIRED'
  | 'AUTH_TOKEN_REVOKED'
  | 'AUTH_INVALID_REFRESH_TOKEN'
  | 'AUTH_INVALID_SESSION'
  | 'AUTH_SESSION_EXPIRED'
  | 'AUTH_INVALID_2FA_CODE'
  | 'AUTH_2FA_REQUIRED'
  | 'AUTH_INVALID_VERIFICATION_CODE'
  | 'AUTH_VERIFICATION_EXPIRED'
  | 'AUTH_INVALID_PASSWORD'
  | 'AUTH_PASSWORD_WEAK'
  | 'AUTH_PASSWORD_TOO_COMMON'
  | 'AUTH_PASSWORD_ALREADY_USED'
  | 'AUTH_RATE_LIMIT_EXCEEDED'
  | 'AUTH_IP_BLOCKED'
  | 'AUTH_DEVICE_NOT_TRUSTED'
  | 'AUTH_SOCIAL_PROVIDER_ERROR'
  | 'AUTH_SSO_ERROR'
  | 'AUTH_OAUTH_ERROR'
  | 'AUTH_MAGIC_LINK_INVALID'
  | 'AUTH_MAGIC_LINK_EXPIRED';

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Types from constants
  AuthSessionType,
  AuthSessionStatus,
  AuthTokenType,
  AuthTokenStatus,
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationChannel,
  AuthVerificationLevel,
  AuthPasswordStrength,
  AuthAccountLockStatus,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockLevel,
};
