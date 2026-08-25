/**
 * Auth Recovery Code Types
 * Type definitions for authentication recovery codes based on shared-constants
 * @module AuthRecoveryCodeTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth recovery
// ============================================================
import {
  // Core Recovery Code Constants
  AUTH_RECOVERY_CODE,
  AUTHRECOVERY_CODE_TYPES_LIST,
  AUTHRECOVERY_SINGLE_USE_TYPES,
  AUTHRECOVERY_MULTI_USE_TYPES,
  AUTHRECOVERY_TEMPORARY_TYPES,
  AUTHRECOVERY_PERMANENT_TYPES,
  // Core Recovery Code Types
  AuthRecoveryCodeConfig,
  AuthRecoveryCodeType,
  AuthRecoveryCodeEvent,
  AuthRecoveryCodeDefaults,
  // Core Recovery Code Status Types
  AuthRecoveryCodeStatus,
  // Core Recovery Code Functions (রিনেম করা হয়েছে কনফ্লিক্ট এড়াতে)
  isAuthrecoveryCodeType,
  isAuthrecoverySingleUseType,
  isAuthrecoveryMultiUseType,
  isAuthrecoveryTemporaryType,
  isAuthrecoveryPermanentType,
  getAuthrecoveryCodeTypeLabel,
  getAuthrecoveryCodeTypeIcon,
  getAuthrecoveryCodeTypePriority,
  getAuthrecoveryCodeConfig,
  getAuthrecoveryCodeLength,
  getAuthrecoveryCodeCount,
  getAuthrecoveryCodeExpiryDays,
  getAuthrecoveryCodeMaxAttempts,
  getAuthrecoveryCodeLockoutDuration,
  getAuthrecoveryCodeResendCooldown,
  getAuthrecoveryCodeMaxGenerations,
  generateAuthrecoveryCode,
  generateAuthrecoveryCodes,
  isAuthrecoveryCodeValid,
  isAuthrecoveryCodeExpired,
  getAuthrecoveryCodeRemainingDays,
  getAuthrecoveryCodeStatus,
  getAuthrecoveryCodeStatusLabel,
  getAuthrecoveryCodeStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// Auth Recovery Code Extended Types
// ============================================================

/**
 * Auth recovery code with additional metadata
 */
export interface AuthRecoveryCodeExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  code: string;
  type: AuthRecoveryCodeType;
  status: AuthRecoveryCodeStatus;
  isSingleUse: boolean;
  isMultiUse: boolean;
  isTemporary: boolean;
  isPermanent: boolean;
  isActive: boolean;
  isInactive: boolean;
  isUsed: boolean;
  isFailed: boolean;
  isSecurityIssue: boolean;
  expiresAt?: Date;
  usedAt?: Date;
  attempts: number;
  maxAttempts: number;
  generatedAt: Date;
  generatedBy?: ID;
  metadata?: Metadata;
}

/**
 * Auth recovery code filter
 */
export interface AuthRecoveryCodeFilter {
  userIds?: ID[];
  types?: AuthRecoveryCodeType[];
  statuses?: AuthRecoveryCodeStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isInactive?: boolean;
  isUsed?: boolean;
  isFailed?: boolean;
  isSecurityIssue?: boolean;
  isSingleUse?: boolean;
  isMultiUse?: boolean;
  isTemporary?: boolean;
  isPermanent?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  searchTerm?: string;
}

/**
 * Auth recovery code statistics
 */
export interface AuthRecoveryCodeStatistics {
  userId: ID;
  totalCodes: number;
  activeCodes: number;
  inactiveCodes: number;
  usedCodes: number;
  failedCodes: number;
  securityIssueCodes: number;
  byType: Record<AuthRecoveryCodeType, number>;
  byStatus: Record<AuthRecoveryCodeStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageGenerationCount: number;
  usageRate: number;
  failureRate: number;
  mostFrequentType: AuthRecoveryCodeType;
  mostFrequentStatus: AuthRecoveryCodeStatus;
}

/**
 * Auth recovery code summary
 */
export interface AuthRecoveryCodeSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  inactive: number;
  used: number;
  failed: number;
  securityIssue: number;
  byType: Record<AuthRecoveryCodeType, number>;
  byStatus: Record<AuthRecoveryCodeStatus, number>;
  codeTrend: {
    date: Date;
    total: number;
    active: number;
    used: number;
  }[];
  topTypes: {
    type: AuthRecoveryCodeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AuthRecoveryCodeStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Auth recovery code configuration
 */
export interface AuthRecoveryCodeConfiguration {
  enabled: boolean;
  defaultType: AuthRecoveryCodeType;
  codeLength: number;
  codeCount: number;
  expiryDays: number;
  maxAttempts: number;
  lockoutDurationMinutes: number;
  resendCooldownMinutes: number;
  maxGenerationsPerUser: number;
  allowMultiUse: boolean;
  allowPermanent: boolean;
  requireMFAForGeneration: boolean;
  notificationOnGeneration: boolean;
  notificationOnUse: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AuthRecoveryCodeAlertConfig;
}

/**
 * Auth recovery code alert configuration
 */
export interface AuthRecoveryCodeAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  suspiciousActivityAlert: boolean;
  codeGenerationAlert: boolean;
  codeUsedAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Auth recovery code history
 */
export interface AuthRecoveryCodeHistory extends BaseEntity, Timestamp {
  id: ID;
  codeId: ID;
  userId: ID;
  action: 'generate' | 'use' | 'fail' | 'expire' | 'revoke' | 'renew';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth recovery code attempt
 */
export interface AuthRecoveryCodeAttempt extends BaseEntity, Timestamp {
  id: ID;
  codeId: ID;
  userId: ID;
  code: string;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth recovery code generation
 */
export interface AuthRecoveryCodeGeneration extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  count: number;
  codes: string[];
  type: AuthRecoveryCodeType;
  generatedBy?: ID;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth recovery code validation result (রিনেম করা হয়েছে)
 */
export interface AuthRecoveryCodeValidationResult extends BaseEntity, Timestamp {
  id: ID;
  codeId: ID;
  userId: ID;
  code: string;
  isValid: boolean;
  isExpired: boolean;
  remainingDays?: number;
  status: AuthRecoveryCodeStatus;
  errors?: string[];
  warnings?: string[];
  metadata?: Metadata;
}

/**
 * Auth recovery code export
 */
export interface AuthRecoveryCodeExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthRecoveryCodeFilter;
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
  AUTH_RECOVERY_CODE,
  AUTHRECOVERY_CODE_TYPES_LIST,
  AUTHRECOVERY_SINGLE_USE_TYPES,
  AUTHRECOVERY_MULTI_USE_TYPES,
  AUTHRECOVERY_TEMPORARY_TYPES,
  AUTHRECOVERY_PERMANENT_TYPES,
  // Core Types
  AuthRecoveryCodeConfig,
  AuthRecoveryCodeType,
  AuthRecoveryCodeEvent,
  AuthRecoveryCodeDefaults,
  AuthRecoveryCodeStatus,
  // Core Functions
  isAuthrecoveryCodeType,
  isAuthrecoverySingleUseType,
  isAuthrecoveryMultiUseType,
  isAuthrecoveryTemporaryType,
  isAuthrecoveryPermanentType,
  getAuthrecoveryCodeTypeLabel,
  getAuthrecoveryCodeTypeIcon,
  getAuthrecoveryCodeTypePriority,
  getAuthrecoveryCodeConfig,
  getAuthrecoveryCodeLength,
  getAuthrecoveryCodeCount,
  getAuthrecoveryCodeExpiryDays,
  getAuthrecoveryCodeMaxAttempts,
  getAuthrecoveryCodeLockoutDuration,
  getAuthrecoveryCodeResendCooldown,
  getAuthrecoveryCodeMaxGenerations,
  generateAuthrecoveryCode,
  generateAuthrecoveryCodes,
  isAuthrecoveryCodeValid,
  isAuthrecoveryCodeExpired,
  getAuthrecoveryCodeRemainingDays,
  getAuthrecoveryCodeStatus,
  getAuthrecoveryCodeStatusLabel,
  getAuthrecoveryCodeStatusColor,
};
