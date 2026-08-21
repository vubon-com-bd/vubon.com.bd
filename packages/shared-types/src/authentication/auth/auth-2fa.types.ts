/**
 * Authentication Two-Factor Authentication (2FA) Types Module
 * Two-factor authentication types for authentication system
 * Handles TOTP, SMS, Email, Authenticator apps, and backup codes
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Email, Timestamp, Token } from './core-primitives.types';

// Import 2FA constants from shared-constants
const {
  TWO_FA_ENABLED_DEFAULT,
  TWO_FA_CODE_LENGTH,
  TWO_FA_CODE_EXPIRY,
  TWO_FA_MAX_ATTEMPTS,
  TWO_FA_RETRY_DELAY,
  TWO_FA_CONFIG,
  TWO_FA_TYPE,
  TWO_FA_STATUS,
} = authentication;

/**
 * Two Factor Type
 * Types of 2FA methods (re-exported from shared-constants)
 */
export type TwoFaType = (typeof TWO_FA_TYPE)[keyof typeof TWO_FA_TYPE];

/**
 * Two Factor Status
 * Status of 2FA setup (re-exported from shared-constants)
 */
export type TwoFaStatus = (typeof TWO_FA_STATUS)[keyof typeof TWO_FA_STATUS];

/**
 * Two Factor Configuration
 * 2FA configuration settings
 */
export interface TwoFactorConfig {
  userId: UserId;
  method: TwoFaType;
  enabled: boolean;
  primary: boolean;
  configuredAt: Timestamp;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Setup Request
 * Request to setup 2FA
 */
export interface TwoFactorSetupRequest {
  userId: UserId;
  method: TwoFaType;
  phoneNumber?: string;
  email?: Email;
  deviceName?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Setup Response
 * Response after 2FA setup
 */
export interface TwoFactorSetupResponse {
  success: boolean;
  data?: {
    setupId: string;
    method: TwoFaType;
    secret?: string;
    qrCode?: string;
    qrCodeDataURL?: string;
    backupCodes?: string[];
    recoveryCodes?: string[];
    setupToken: Token;
    expiresAt: Timestamp;
    status: TwoFaStatus;
    provisioningUri?: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two Factor Verification Request
 * Request to verify 2FA
 */
export interface TwoFactorVerificationRequest {
  userId: UserId;
  method: TwoFaType;
  code: string;
  deviceId?: string;
  rememberDevice?: boolean;
  backupCode?: string;
  setupId?: string;
}

/**
 * Two Factor Verification Response
 * Response after 2FA verification
 */
export interface TwoFactorVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    method: TwoFaType;
    verifiedAt: Timestamp;
    deviceRemembered: boolean;
    backupCodesRemaining?: number;
    recoveryCodesRemaining?: number;
    sessionId?: string;
    token?: Token;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two Factor Disable Request
 * Request to disable 2FA
 */
export interface TwoFactorDisableRequest {
  userId: UserId;
  method?: TwoFaType;
  code?: string;
  reason: string;
  adminUserId?: UserId;
}

/**
 * Two Factor Disable Response
 * Response after 2FA disable
 */
export interface TwoFactorDisableResponse {
  success: boolean;
  data?: {
    disabled: boolean;
    method: TwoFaType;
    disabledAt: Timestamp;
    allMethodsDisabled: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two Factor Reset Request
 * Request to reset 2FA
 */
export interface TwoFactorResetRequest {
  userId: UserId;
  reason: string;
  force: boolean;
  adminUserId?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Reset Response
 * Response after 2FA reset
 */
export interface TwoFactorResetResponse {
  success: boolean;
  data?: {
    reset: boolean;
    resetAt: Timestamp;
    oldMethodsRemoved: number;
    newSetupRequired: boolean;
    backupCodesGenerated?: string[];
    recoveryCodesGenerated?: string[];
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Two Factor Backup Codes
 * Backup codes for 2FA
 */
export interface TwoFactorBackupCodes {
  userId: UserId;
  codes: string[];
  generatedAt: Timestamp;
  expiresAt?: Timestamp;
  usedCount: number;
  maxUses: number;
  remainingCodes: number;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Recovery Codes
 * Recovery codes for 2FA
 */
export interface TwoFactorRecoveryCodes {
  userId: UserId;
  codes: string[];
  generatedAt: Timestamp;
  expiresAt?: Timestamp;
  usedCount: number;
  maxUses: number;
  remainingCodes: number;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Device
 * Device registered for 2FA
 */
export interface TwoFactorDevice {
  deviceId: string;
  userId: UserId;
  deviceName: string;
  deviceType: string;
  method: TwoFaType;
  trusted: boolean;
  registeredAt: Timestamp;
  lastUsedAt?: Timestamp;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Session
 * 2FA verification session
 */
export interface TwoFactorSession {
  sessionId: string;
  userId: UserId;
  method: TwoFaType;
  status: TwoFaStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  completedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Two Factor Audit Log
 * Audit log for 2FA operations
 */
export interface TwoFactorAuditLog {
  id: string;
  userId: UserId;
  operation: 'setup' | 'verify' | 'reset' | 'disable' | 'enable' | 'update';
  method: TwoFaType;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Two Factor Statistics
 * Statistical data about 2FA
 */
export interface TwoFactorStatistics {
  totalUsers: number;
  enabledUsers: number;
  disabledUsers: number;
  pendingUsers: number;
  byMethod: Record<TwoFaType, number>;
  byStatus: Record<TwoFaStatus, number>;
  successRate: number;
  failureRate: number;
  averageVerificationTime: number;
  recoveryRate: number;
  timestamp: Timestamp;
}

/**
 * Two Factor Policy
 * 2FA policy settings
 */
export interface TwoFactorPolicy {
  required: boolean;
  enforced: boolean;
  allowedMethods: TwoFaType[];
  defaultMethod: TwoFaType;
  maxAttempts: number;
  lockoutDuration: number;
  backupCodesCount: number;
  recoveryCodesCount: number;
  codeLength: number;
  codeExpirySeconds: number;
  requireForRoles: string[];
  exemptForRoles: string[];
  rememberDevice: boolean;
  rememberDeviceDuration: number;
}

/**
 * Two Factor Filter
 * Filter criteria for 2FA queries
 */
export interface TwoFactorFilter {
  userId?: UserId[];
  method?: TwoFaType[];
  status?: TwoFaStatus[];
  deviceId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  trusted?: boolean;
}

/**
 * Two Factor Response Builder
 * Helper for building 2FA responses
 */
export interface TwoFactorResponseBuilder {
  setupSuccess(response: TwoFactorSetupResponse): TwoFactorSetupResponse;
  verifySuccess(response: TwoFactorVerificationResponse): TwoFactorVerificationResponse;
  resetSuccess(response: TwoFactorResetResponse): TwoFactorResetResponse;
  disableSuccess(response: TwoFactorDisableResponse): TwoFactorDisableResponse;
  error(code: string, message: string, details?: Record<string, unknown>): TwoFactorErrorResponse;
}

/**
 * Two Factor Error Response
 * Error response for 2FA operations
 */
export interface TwoFactorErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Two Factor Constants
 * 2FA-related constants (re-exported from shared-constants)
 */
export const TWO_FACTOR_TYPES = TWO_FA_TYPE;
export const TWO_FACTOR_STATUSES = TWO_FA_STATUS;
export const TWO_FACTOR_CONFIG_DEFAULT = TWO_FA_CONFIG;

/**
 * Default Two Factor Configuration
 */
export const DEFAULT_TWO_FACTOR_CONFIG = {
  enabledDefault: TWO_FA_ENABLED_DEFAULT,
  codeLength: TWO_FA_CODE_LENGTH,
  codeExpiry: TWO_FA_CODE_EXPIRY,
  maxAttempts: TWO_FA_MAX_ATTEMPTS,
  retryDelay: TWO_FA_RETRY_DELAY,
} as const;

/**
 * Two Factor Webhook
 * Webhook payload for 2FA events
 */
export interface TwoFactorWebhook {
  event: string;
  userId: UserId;
  method: TwoFaType;
  status: TwoFaStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Two Factor Recovery Status
 * Status of 2FA recovery
 */
export interface TwoFactorRecoveryStatus {
  userId: UserId;
  recoveryAvailable: boolean;
  recoveryMethod: TwoFaType;
  recoveryAttempts: number;
  maxRecoveryAttempts: number;
  lastRecoveryAt?: Timestamp;
  recoveryLockedUntil?: Timestamp;
  backupCodesRemaining: number;
  recoveryCodesRemaining: number;
}

/**
 * Two Factor Challenge
 * 2FA challenge for verification
 */
export interface TwoFactorChallenge {
  challengeId: string;
  userId: UserId;
  method: TwoFaType;
  challenge: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  used: boolean;
  metadata?: Record<string, unknown>;
}
