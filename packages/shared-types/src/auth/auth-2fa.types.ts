/**
 * Auth 2FA Types
 * Type definitions for Two-Factor Authentication based on shared-constants
 * @module Auth2FATypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth 2fa
// ============================================================
import {
  // Core 2FA Constants
  AUTH_2FA,
  AUTH_2FA_CONFIG,
  AUTH_2FA_TYPES,
  AUTH_2FA_EVENTS,
  // Core 2FA Types
  Auth2FAConfig,
  Auth2FAType,
  Auth2FAEvent,
  Auth2FADefaults,
  // Core 2FA Status Types
  Auth2FAStatus,
  // Core 2FA Functions
  getAuth2faTypeLabel,
  getAuth2faTypeIcon,
  getAuth2faTypeSecurityLevel,
  getAuth2faTOTPConfig,
  getAuth2faSMSConfig,
  getAuth2faEmailConfig,
  getAuth2faAuthenticatorConfig,
  getAuth2faBackupCodeConfig,
  getAuth2faRecoveryCodeConfig,
  getAuth2faCodeExpiry,
  getAuth2faMaxAttempts,
  getAuth2faLockoutDuration,
  getAuth2faRateLimitWindow,
  getAuth2faMaxRateLimitAttempts,
  getAuth2faTrustDuration,
  getAuth2faMaxTrustedDevices,
  generateAuth2faCode,
  generateAuth2faBackupCodes,
  generateAuth2faRecoveryCodes,
  isAuth2faCodeValid,
  isAuth2faCodeExpired,
  getAuth2faCodeRemainingTime,
} from '@vubon/shared-constants';

// ============================================================
// Auth 2FA Extended Types
// ============================================================

/**
 * Auth 2FA with additional metadata
 */
export interface Auth2FAExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: Auth2FAType;
  status: Auth2FAStatus;
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
  isActive: boolean;
  isPending: boolean;
  isInactive: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  isBackupCodeStatus: boolean;
  isRecoveryStatus: boolean;
  isPrimaryType: boolean;
  isCodeBased: boolean;
  isDeviceBased: boolean;
  isBiometric: boolean;
  isHardware: boolean;
  isPush: boolean;
  lastVerifiedAt?: Date;
  lastFailedAt?: Date;
  failedAttempts: number;
  maxFailedAttempts: number;
  expiresAt?: Date;
  trustedDevices: Auth2FATrustedDevice[];
  metadata?: Metadata;
}

/**
 * Auth 2FA trusted device
 */
export interface Auth2FATrustedDevice extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  twoFAId: ID;
  deviceInfo: DeviceInfo;
  trustLevel: 'low' | 'medium' | 'high';
  verifiedAt: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth 2FA filter
 */
export interface Auth2FAFilter {
  userIds?: ID[];
  types?: Auth2FAType[];
  statuses?: Auth2FAStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPending?: boolean;
  isInactive?: boolean;
  isFailed?: boolean;
  isBackupCodeStatus?: boolean;
  isRecoveryStatus?: boolean;
  isPrimaryType?: boolean;
  isCodeBased?: boolean;
  isDeviceBased?: boolean;
  isBiometric?: boolean;
  isHardware?: boolean;
  isPush?: boolean;
  searchTerm?: string;
}

/**
 * Auth 2FA statistics
 */
export interface Auth2FAStatistics {
  userId: ID;
  total2FA: number;
  active2FA: number;
  pending2FA: number;
  inactive2FA: number;
  failed2FA: number;
  backupCode2FA: number;
  recovery2FA: number;
  byType: Record<Auth2FAType, number>;
  byStatus: Record<Auth2FAStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  enablementRate: number;
  averageFailedAttempts: number;
  mostFrequentType: Auth2FAType;
  mostFrequentStatus: Auth2FAStatus;
  trustedDevicesCount: number;
}

/**
 * Auth 2FA summary
 */
export interface Auth2FASummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  pending: number;
  inactive: number;
  failed: number;
  backupCode: number;
  recovery: number;
  byType: Record<Auth2FAType, number>;
  byStatus: Record<Auth2FAStatus, number>;
  twoFATrend: {
    date: Date;
    total: number;
    active: number;
    failed: number;
  }[];
  topTypes: {
    type: Auth2FAType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: Auth2FAStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth 2FA configuration
 */
export interface Auth2FAConfiguration {
  enabled: boolean;
  defaultType: Auth2FAType;
  codeExpirySeconds: number;
  maxAttempts: number;
  lockoutDurationMinutes: number;
  rateLimitWindowSeconds: number;
  maxRateLimitAttempts: number;
  trustDurationDays: number;
  maxTrustedDevices: number;
  allowBackupCodes: boolean;
  allowRecoveryCodes: boolean;
  requireForAllUsers: boolean;
  allowTypeChange: boolean;
  notificationOnEnable: boolean;
  notificationOnDisable: boolean;
  notificationOnFailed: boolean;
  notificationOnLockout: boolean;
  alertConfig?: Auth2FAAlertConfig;
}

/**
 * Auth 2FA alert configuration
 */
export interface Auth2FAAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  lockoutAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Auth 2FA history
 */
export interface Auth2FAHistory extends BaseEntity, Timestamp {
  id: ID;
  twoFAId: ID;
  userId: ID;
  action: 'enable' | 'disable' | 'verify' | 'fail' | 'lockout' | 'unlock' | 'update' | 'reset';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Auth 2FA verification attempt
 */
export interface Auth2FAVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  twoFAId: ID;
  userId: ID;
  type: Auth2FAType;
  code?: string;
  token?: string;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Auth 2FA setup
 */
export interface Auth2FASetup extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: Auth2FAType;
  secret?: string;
  qrCodeUrl?: string;
  backupCodes: string[];
  recoveryCodes: string[];
  status: 'pending' | 'completed' | 'failed';
  completedAt?: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Auth 2FA backup code
 */
export interface Auth2FABackupCode extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  twoFAId: ID;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth 2FA recovery code
 */
export interface Auth2FARecoveryCode extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  twoFAId: ID;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth 2FA export
 */
export interface Auth2FAExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: Auth2FAFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  AUTH_2FA,
  AUTH_2FA_CONFIG,
  AUTH_2FA_TYPES,
  AUTH_2FA_EVENTS,
  // Core Types
  Auth2FAConfig,
  Auth2FAType,
  Auth2FAEvent,
  Auth2FADefaults,
  Auth2FAStatus,
  // Core Functions
  getAuth2faTypeLabel,
  getAuth2faTypeIcon,
  getAuth2faTypeSecurityLevel,
  getAuth2faTOTPConfig,
  getAuth2faSMSConfig,
  getAuth2faEmailConfig,
  getAuth2faAuthenticatorConfig,
  getAuth2faBackupCodeConfig,
  getAuth2faRecoveryCodeConfig,
  getAuth2faCodeExpiry,
  getAuth2faMaxAttempts,
  getAuth2faLockoutDuration,
  getAuth2faRateLimitWindow,
  getAuth2faMaxRateLimitAttempts,
  getAuth2faTrustDuration,
  getAuth2faMaxTrustedDevices,
  generateAuth2faCode,
  generateAuth2faBackupCodes,
  generateAuth2faRecoveryCodes,
  isAuth2faCodeValid,
  isAuth2faCodeExpired,
  getAuth2faCodeRemainingTime,
};
