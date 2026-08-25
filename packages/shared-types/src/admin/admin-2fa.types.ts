/**
 * Admin 2FA Types
 * Type definitions for admin two-factor authentication based on shared-constants
 * @module Admin2FATypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin 2FA
// ============================================================
import {
  // Core 2FA Constants
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  // Core 2FA Types
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
  // Core 2FA Functions
  get2faAdminMethodLabel,
  get2faAdminMethodIcon,
  get2faAdminStatusLabel,
  get2faAdminStatusColor,
  get2faAdminSecurityLevelLabel,
  get2faAdminSecurityLevelPriority,
  get2faAdminVerificationTypeLabel,
  get2faAdminChannelLabel,
  is2faAdminEnabled,
  is2faAdminDisabled,
  is2faAdminExpired,
  is2faAdminLocked,
  get2faAdminTimeout,
  get2faAdminSecurityLevel,
  get2faAdminChannels,
} from '@vubon/shared-constants';

// ============================================================
// Admin 2FA Extended Types
// ============================================================

/**
 * Admin 2FA with additional metadata
 */
export interface Admin2FAExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  method: Admin2FAMethod;
  status: Admin2FAStatus;
  securityLevel: Admin2FASecurityLevel;
  verificationType: Admin2FAVerificationType;
  timeout: Admin2FATimeout;
  recovery: Admin2FARecovery;
  channel: Admin2FAChannel;
  algorithm: Admin2FAAlgorithm;
  tokenFormat: Admin2FATokenFormat;
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
  isEnabled: boolean;
  isDisabled: boolean;
  isExpired: boolean;
  isLocked: boolean;
  lastVerifiedAt?: Date;
  lastFailedAt?: Date;
  failedAttempts: number;
  maxFailedAttempts: number;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin 2FA filter
 */
export interface Admin2FAFilter {
  adminIds?: ID[];
  methods?: Admin2FAMethod[];
  statuses?: Admin2FAStatus[];
  securityLevels?: Admin2FASecurityLevel[];
  verificationTypes?: Admin2FAVerificationType[];
  channels?: Admin2FAChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isEnabled?: boolean;
  isDisabled?: boolean;
  isExpired?: boolean;
  isLocked?: boolean;
  searchTerm?: string;
}

/**
 * Admin 2FA statistics
 */
export interface Admin2FAStatistics {
  adminId: ID;
  total2FA: number;
  enabled2FA: number;
  disabled2FA: number;
  expired2FA: number;
  locked2FA: number;
  byMethod: Record<Admin2FAMethod, number>;
  byStatus: Record<Admin2FAStatus, number>;
  bySecurityLevel: Record<Admin2FASecurityLevel, number>;
  byVerificationType: Record<Admin2FAVerificationType, number>;
  byChannel: Record<Admin2FAChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  enablementRate: number;
  averageFailedAttempts: number;
  mostFrequentMethod: Admin2FAMethod;
  mostFrequentSecurityLevel: Admin2FASecurityLevel;
  mostFrequentChannel: Admin2FAChannel;
}

/**
 * Admin 2FA summary
 */
export interface Admin2FASummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  enabled: number;
  disabled: number;
  expired: number;
  locked: number;
  byMethod: Record<Admin2FAMethod, number>;
  byStatus: Record<Admin2FAStatus, number>;
  bySecurityLevel: Record<Admin2FASecurityLevel, number>;
  byVerificationType: Record<Admin2FAVerificationType, number>;
  byChannel: Record<Admin2FAChannel, number>;
  twoFATrend: {
    date: Date;
    total: number;
    enabled: number;
    disabled: number;
  }[];
  topMethods: {
    method: Admin2FAMethod;
    count: number;
    label: string;
  }[];
  topSecurityLevels: {
    level: Admin2FASecurityLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Admin 2FA configuration
 */
export interface Admin2FAConfiguration {
  enabled: boolean;
  defaultMethod: Admin2FAMethod;
  defaultSecurityLevel: Admin2FASecurityLevel;
  defaultVerificationType: Admin2FAVerificationType;
  defaultChannel: Admin2FAChannel;
  defaultAlgorithm: Admin2FAAlgorithm;
  defaultTokenFormat: Admin2FATokenFormat;
  defaultTimeout: Admin2FATimeout;
  defaultRecovery: Admin2FARecovery;
  maxFailedAttempts: number;
  lockDurationMinutes: number;
  codeLength: number;
  codeExpirySeconds: number;
  backupCodesCount: number;
  recoveryCodesCount: number;
  requireMFAForAll: boolean;
  allowMethodChange: boolean;
  notificationOnEnable: boolean;
  notificationOnDisable: boolean;
  notificationOnLock: boolean;
  alertConfig?: Admin2FAAlertConfig;
}

/**
 * Admin 2FA alert configuration
 */
export interface Admin2FAAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  lockAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Admin 2FA history
 */
export interface Admin2FAHistory extends BaseEntity, Timestamp {
  id: ID;
  twoFAId: ID;
  adminId: ID;
  action: 'enable' | 'disable' | 'verify' | 'fail' | 'lock' | 'unlock' | 'update' | 'reset';
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
 * Admin 2FA verification attempt
 */
export interface Admin2FAVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  twoFAId: ID;
  adminId: ID;
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
 * Admin 2FA recovery
 */
export interface Admin2FARecoveryProcess extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  twoFAId: ID;
  recoveryCode: string;
  backupCode?: string;
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'used';
  usedAt?: Date;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Metadata;
}

/**
 * Admin 2FA device
 */
export interface Admin2FADevice extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  twoFAId: ID;
  deviceInfo: DeviceInfo;
  isTrusted: boolean;
  trustLevel: 'unknown' | 'low' | 'medium' | 'high';
  verifiedAt?: Date;
  expiresAt?: Date;
  lastUsedAt?: Date;
  metadata?: Metadata;
}

/**
 * Admin 2FA backup
 */
export interface Admin2FABackup extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  twoFAId: ID;
  type: 'backup_codes' | 'recovery_codes' | 'emergency_codes';
  codes: string[];
  usedCodes: string[];
  generatedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin 2FA export
 */
export interface Admin2FAExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: Admin2FAFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin 2FA audit
 */
export interface Admin2FAAudit extends BaseEntity, Timestamp {
  id: ID;
  twoFAId: ID;
  adminId: ID;
  action: 'enable' | 'disable' | 'verify' | 'fail' | 'lock' | 'unlock' | 'update' | 'reset';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Constants
  ADMIN_2FA,
  ADMIN_2FA_METHOD_LABELS,
  ADMIN_2FA_METHOD_ICONS,
  ADMIN_2FA_STATUS_LABELS,
  ADMIN_2FA_STATUS_COLORS,
  ADMIN_2FA_SECURITY_LEVEL_LABELS,
  ADMIN_2FA_SECURITY_LEVEL_PRIORITY,
  ADMIN_2FA_VERIFICATION_TYPE_LABELS,
  ADMIN_2FA_CHANNEL_LABELS,
  // Core Types
  Admin2FAMethod,
  Admin2FAStatus,
  Admin2FASecurityLevel,
  Admin2FAVerificationType,
  Admin2FATimeout,
  Admin2FARecovery,
  Admin2FAChannel,
  Admin2FAAlgorithm,
  Admin2FATokenFormat,
  // Core Functions
  get2faAdminMethodLabel,
  get2faAdminMethodIcon,
  get2faAdminStatusLabel,
  get2faAdminStatusColor,
  get2faAdminSecurityLevelLabel,
  get2faAdminSecurityLevelPriority,
  get2faAdminVerificationTypeLabel,
  get2faAdminChannelLabel,
  is2faAdminEnabled,
  is2faAdminDisabled,
  is2faAdminExpired,
  is2faAdminLocked,
  get2faAdminTimeout,
  get2faAdminSecurityLevel,
  get2faAdminChannels,
};
