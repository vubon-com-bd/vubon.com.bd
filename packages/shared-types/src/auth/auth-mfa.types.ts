/**
 * Auth MFA Types
 * Type definitions for Multi-Factor Authentication based on shared-constants
 * @module AuthMFATypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth mfa
// ============================================================
import {
  // Core MFA Constants
  AUTH_MFA,
  AUTH_MFA_LEVEL,
  AUTHMFA_METHODS_LIST,
  AUTHMFA_REQUIRED_METHODS,
  AUTHMFA_OPTIONAL_METHODS,
  // Core MFA Types
  AuthMFAConfig,
  AuthMFAMethod,
  AuthMFALevel,
  AuthMFAEvent,
  AuthMFADefaults,
  // MFA Status Types
  AuthMFAStatus,
  // MFA Type Types
  AuthMFAType,
  // Core MFA Functions
  isAuthmfaMethod,
  isAuthmfaRequiredMethod,
  isAuthmfaOptionalMethod,
  getAuthmfaMethodLabel,
  getAuthmfaMethodSecurityLevel,
  getAuthmfaLevelLabel,
  getAuthmfaMethodIcon,
  getAuthmfaTOTPConfig,
  getAuthmfaSMSConfig,
  getAuthmfaEmailConfig,
  getAuthmfaBackupCodeConfig,
  getAuthmfaBiometricConfig,
  getAuthmfaBackupCodesCount,
  getAuthmfaBackupCodeLength,
  getAuthmfaTOTPPeriod,
  getAuthmfaTOTPDigits,
  getAuthmfaTOTPWindow,
  getAuthmfaCodeExpiry,
  getAuthmfaMaxAttempts,
} from '@vubon/shared-constants';

// ============================================================
// Auth MFA Extended Types
// ============================================================

/**
 * Auth MFA with additional metadata
 */
export interface AuthMFAExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  method: AuthMFAMethod;
  level: AuthMFALevel;
  status: AuthMFAStatus;
  type: AuthMFAType;
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
  isActive: boolean;
  isRequired: boolean;
  isOptional: boolean;
  isBackupCodeStatus: boolean;
  lastVerifiedAt?: Date;
  lastFailedAt?: Date;
  failedAttempts: number;
  maxFailedAttempts: number;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth MFA filter
 */
export interface AuthMFAFilter {
  userIds?: ID[];
  methods?: AuthMFAMethod[];
  levels?: AuthMFALevel[];
  statuses?: AuthMFAStatus[];
  types?: AuthMFAType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isRequired?: boolean;
  isOptional?: boolean;
  searchTerm?: string;
}

/**
 * Auth MFA statistics
 */
export interface AuthMFAStatistics {
  userId: ID;
  totalMFA: number;
  activeMFA: number;
  inactiveMFA: number;
  pendingMFA: number;
  failedMFA: number;
  blockedMFA: number;
  byMethod: Record<AuthMFAMethod, number>;
  byLevel: Record<AuthMFALevel, number>;
  byStatus: Record<AuthMFAStatus, number>;
  byType: Record<AuthMFAType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  enablementRate: number;
  averageFailedAttempts: number;
  mostFrequentMethod: AuthMFAMethod;
  mostFrequentLevel: AuthMFALevel;
  mostFrequentType: AuthMFAType;
}

/**
 * Auth MFA summary
 */
export interface AuthMFASummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  pending: number;
  failed: number;
  blocked: number;
  byMethod: Record<AuthMFAMethod, number>;
  byLevel: Record<AuthMFALevel, number>;
  byStatus: Record<AuthMFAStatus, number>;
  byType: Record<AuthMFAType, number>;
  mfaTrend: {
    date: Date;
    total: number;
    active: number;
    failed: number;
  }[];
  topMethods: {
    method: AuthMFAMethod;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: AuthMFALevel;
    count: number;
    label: string;
  }[];
}

/**
 * Auth MFA configuration
 */
export interface AuthMFAConfiguration {
  enabled: boolean;
  defaultLevel: AuthMFALevel;
  defaultMethods: AuthMFAMethod[];
  requiredMethods: AuthMFAMethod[];
  optionalMethods: AuthMFAMethod[];
  backupCodesCount: number;
  backupCodeLength: number;
  totpPeriod: number;
  totpDigits: number;
  totpWindow: number;
  codeExpirySeconds: number;
  maxAttempts: number;
  blockDurationMinutes: number;
  allowMethodChange: boolean;
  requireMFAForAll: boolean;
  notificationOnEnable: boolean;
  notificationOnDisable: boolean;
  notificationOnBlock: boolean;
  alertConfig?: AuthMFAAlertConfig;
}

/**
 * Auth MFA alert configuration
 */
export interface AuthMFAAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  blockAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Auth MFA history
 */
export interface AuthMFAHistory extends BaseEntity, Timestamp {
  id: ID;
  mfaId: ID;
  userId: ID;
  action: 'enable' | 'disable' | 'verify' | 'fail' | 'block' | 'unblock' | 'update' | 'reset';
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
 * Auth MFA verification attempt
 */
export interface AuthMFAVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  mfaId: ID;
  userId: ID;
  method: AuthMFAMethod;
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
 * Auth MFA setup
 */
export interface AuthMFASetup extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  method: AuthMFAMethod;
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
 * Auth MFA backup code
 */
export interface AuthMFABackupCode extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  mfaId: ID;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth MFA device
 */
export interface AuthMFADevice extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  mfaId: ID;
  deviceInfo: DeviceInfo;
  isTrusted: boolean;
  trustLevel: 'unknown' | 'low' | 'medium' | 'high';
  verifiedAt?: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth MFA export
 */
export interface AuthMFAExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthMFAFilter;
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
  AUTH_MFA,
  AUTH_MFA_LEVEL,
  AUTHMFA_METHODS_LIST,
  AUTHMFA_REQUIRED_METHODS,
  AUTHMFA_OPTIONAL_METHODS,
  // Core Types
  AuthMFAConfig,
  AuthMFAMethod,
  AuthMFALevel,
  AuthMFAEvent,
  AuthMFADefaults,
  AuthMFAStatus,
  AuthMFAType,
  // Core Functions
  isAuthmfaMethod,
  isAuthmfaRequiredMethod,
  isAuthmfaOptionalMethod,
  getAuthmfaMethodLabel,
  getAuthmfaMethodSecurityLevel,
  getAuthmfaLevelLabel,
  getAuthmfaMethodIcon,
  getAuthmfaTOTPConfig,
  getAuthmfaSMSConfig,
  getAuthmfaEmailConfig,
  getAuthmfaBackupCodeConfig,
  getAuthmfaBiometricConfig,
  getAuthmfaBackupCodesCount,
  getAuthmfaBackupCodeLength,
  getAuthmfaTOTPPeriod,
  getAuthmfaTOTPDigits,
  getAuthmfaTOTPWindow,
  getAuthmfaCodeExpiry,
  getAuthmfaMaxAttempts,
};
