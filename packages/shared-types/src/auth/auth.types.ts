/**
 * Auth Types
 * Type definitions for authentication based on shared-constants
 * @module AuthTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth
// ============================================================
import {
  // Auth Session
  AUTH_SESSION,
  ACTIVE_SESSION_STATUSES,
  INACTIVE_SESSION_STATUSES,
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  isSessionActive,
  isSessionInactive,
  getSessionStatusLabel,
  getSessionTypeLabel,
  isSessionExpired,
  getRemainingSessionTime,
  shouldExtendSession,
  // Auth Token
  AUTH_TOKEN,
  BEARER_TOKEN_TYPES,
  SINGLE_USE_TOKEN_TYPES,
  VALID_TOKEN_STATUSES,
  INVALID_TOKEN_STATUSES,
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  isTokenValid,
  isTokenInvalid,
  isBearerToken,
  isSingleUseToken,
  getTokenExpiry,
  getTokenTypeLabel,
  getTokenStatusLabel,
  getAlgorithmLabel,
  getDefaultAlgorithm,
  isTokenExpired,
  getTokenRemainingTime,
  // Auth Verification
  AUTH_VERIFICATION,
  AUTH_IDENTITY_VERIFICATION_TYPES,
  AUTH_DOCUMENT_VERIFICATION_TYPES,
  AUTH_CONTACT_VERIFICATION_TYPES,
  AUTH_COMPLETED_VERIFICATION_STATUSES,
  AUTH_IN_PROGRESS_VERIFICATION_STATUSES,
  AUTH_FAILED_VERIFICATION_STATUSES,
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  isAuthVerificationComplete,
  isAuthVerificationInProgress,
  isAuthVerificationFailed,
  isAuthIdentityVerification,
  isAuthDocumentVerification,
  isAuthContactVerification,
  getAuthVerificationExpiry,
  getAuthVerificationTypeLabel,
  getAuthVerificationStatusLabel,
  getAuthVerificationChannelLabel,
  getAuthVerificationLevel,
  // Auth Password
  AUTH_PASSWORD,
  REQUIRED_CHARACTERS,
  AuthPasswordStrength,
  AuthPasswordError,
  getPasswordMinLengthValue,
  getPasswordMaxLengthValue,
  getPasswordStrengthValue,
  validatePassword,
  isPasswordValidValue,
  isPasswordCommon,
  isPasswordExpired,
  isPasswordTooNew,
  getPasswordRemainingDays,
  getPasswordErrorMessage,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from '@vubon/shared-constants';

// ============================================================
// Auth Types
// ============================================================

/**
 * Authentication session interface
 */
export interface AuthSession extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  token: string;
  type: AuthSessionType;
  status: AuthSessionStatus;
  expiresAt: Date;
  lastActivityAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  isActive: boolean;
  isInactive: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Authentication token interface
 */
export interface AuthToken extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  token: string;
  type: AuthTokenType;
  status: AuthTokenStatus;
  algorithm: AuthTokenAlgorithm;
  claims: AuthTokenClaim[];
  expiresAt: Date;
  issuedAt: Date;
  isBearer: boolean;
  isSingleUse: boolean;
  isValid: boolean;
  isInvalid: boolean;
  isExpired: boolean;
  metadata?: Metadata;
}

/**
 * Authentication verification interface
 */
export interface AuthVerification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: AuthVerificationType;
  status: AuthVerificationStatus;
  channel: AuthVerificationChannel;
  level: AuthVerificationLevel;
  code?: string;
  token?: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  isComplete: boolean;
  isInProgress: boolean;
  isFailed: boolean;
  isIdentity: boolean;
  isDocument: boolean;
  isContact: boolean;
  metadata?: Metadata;
}

/**
 * Authentication password interface
 */
export interface AuthPassword extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  hash: string;
  salt: string;
  strength: AuthPasswordStrength;
  isActive: boolean;
  isExpired: boolean;
  isCommon: boolean;
  expiresAt?: Date;
  lastChangedAt: Date;
  metadata?: Metadata;
}

/**
 * Authentication credentials interface
 */
export interface AuthCredentials {
  email?: string;
  phone?: string;
  username?: string;
  password: string;
  rememberMe?: boolean;
  metadata?: Metadata;
}

/**
 * Authentication response interface
 */
export interface AuthResponse {
  user: {
    id: ID;
    email?: string;
    phone?: string;
    name?: string;
    roles: string[];
    permissions: string[];
  };
  tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  };
  session: AuthSession;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Session
  AUTH_SESSION,
  ACTIVE_SESSION_STATUSES,
  INACTIVE_SESSION_STATUSES,
  AuthSessionStatus,
  AuthSessionType,
  AuthSessionEvent,
  AuthSessionKey,
  isSessionActive,
  isSessionInactive,
  getSessionStatusLabel,
  getSessionTypeLabel,
  isSessionExpired,
  getRemainingSessionTime,
  shouldExtendSession,
  // Token
  AUTH_TOKEN,
  BEARER_TOKEN_TYPES,
  SINGLE_USE_TOKEN_TYPES,
  VALID_TOKEN_STATUSES,
  INVALID_TOKEN_STATUSES,
  AuthTokenType,
  AuthTokenStatus,
  AuthTokenAlgorithm,
  AuthTokenClaim,
  AuthTokenEvent,
  isTokenValid,
  isTokenInvalid,
  isBearerToken,
  isSingleUseToken,
  getTokenExpiry,
  getTokenTypeLabel,
  getTokenStatusLabel,
  getAlgorithmLabel,
  getDefaultAlgorithm,
  isTokenExpired,
  getTokenRemainingTime,
  // Verification
  AUTH_VERIFICATION,
  AUTH_IDENTITY_VERIFICATION_TYPES,
  AUTH_DOCUMENT_VERIFICATION_TYPES,
  AUTH_CONTACT_VERIFICATION_TYPES,
  AUTH_COMPLETED_VERIFICATION_STATUSES,
  AUTH_IN_PROGRESS_VERIFICATION_STATUSES,
  AUTH_FAILED_VERIFICATION_STATUSES,
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  isAuthVerificationComplete,
  isAuthVerificationInProgress,
  isAuthVerificationFailed,
  isAuthIdentityVerification,
  isAuthDocumentVerification,
  isAuthContactVerification,
  getAuthVerificationExpiry,
  getAuthVerificationTypeLabel,
  getAuthVerificationStatusLabel,
  getAuthVerificationChannelLabel,
  getAuthVerificationLevel,
  // Password
  AUTH_PASSWORD,
  REQUIRED_CHARACTERS,
  AuthPasswordStrength,
  AuthPasswordError,
  getPasswordMinLengthValue,
  getPasswordMaxLengthValue,
  getPasswordStrengthValue,
  validatePassword,
  isPasswordValidValue,
  isPasswordCommon,
  isPasswordExpired,
  isPasswordTooNew,
  getPasswordRemainingDays,
  getPasswordErrorMessage,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
};
