/**
 * Auth Account Lock Types
 * Type definitions for authentication account lock based on shared-constants
 * @module AuthAccountLockTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth account-lock
// ============================================================
import {
  // Core Account Lock Constants
  AUTH_ACCOUNT_LOCK,
  AUTHLOCK_REASONS_LIST,
  AUTHLOCK_TYPES_LIST,
  AUTHLOCK_TEMPORARY_TYPES,
  AUTHLOCK_PERMANENT_TYPES,
  AUTHLOCK_ADMIN_TYPES,
  AUTHLOCK_SYSTEM_TYPES,
  AUTHLOCK_SECURITY_REASONS,
  AUTHLOCK_POLICY_REASONS,
  // Core Account Lock Types
  AuthAccountLockConfig,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockEvent,
  AuthAccountLockLevel,
  AuthAccountLockDefaults,
  // Core Account Lock Status Types
  AuthAccountLockStatus,
  // Core Account Lock Functions
  isAuthlockReason,
  isAuthlockType,
  isAuthlockTemporary,
  isAuthlockPermanent,
  isAuthlockAdmin,
  isAuthlockSystem,
  isAuthlockSecurity,
  isAuthlockPolicy,
  getAuthlockReasonLabel,
  getAuthlockTypeLabel,
  getAuthlockTypeIcon,
  getAuthlockLevel,
  getAuthlockLevelLabel,
  getAuthlockLevelColor,
  getAuthlockDurationMinutes,
  getAuthlockMaxAttempts,
  getAuthlockFailedAttempts,
  isAuthlockExpiredCheck,
  getAuthlockRemainingMinutes,
  shouldAuthlockAutoUnlock,
  getAuthlockLevelFromAttempts,
} from '@vubon/shared-constants';

// ============================================================
// Auth Account Lock Extended Types
// ============================================================

/**
 * Auth account lock with additional metadata
 */
export interface AuthAccountLockExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  reason: AuthAccountLockReason;
  type: AuthAccountLockType;
  level: AuthAccountLockLevel;
  status: AuthAccountLockStatus;
  isTemporary: boolean;
  isPermanent: boolean;
  isAdmin: boolean;
  isSystem: boolean;
  isSecurity: boolean;
  isPolicy: boolean;
  isLocked: boolean;
  isUnlocked: boolean;
  isPending: boolean;
  isExpired: boolean;
  isSecurityIssue: boolean;
  isRecovery: boolean;
  lockedAt: Date;
  unlockedAt?: Date;
  expiresAt?: Date;
  durationMinutes?: number;
  maxAttempts: number;
  failedAttempts: number;
  metadata?: Metadata;
}

/**
 * Auth account lock filter
 */
export interface AuthAccountLockFilter {
  userIds?: ID[];
  reasons?: AuthAccountLockReason[];
  types?: AuthAccountLockType[];
  levels?: AuthAccountLockLevel[];
  statuses?: AuthAccountLockStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isLocked?: boolean;
  isUnlocked?: boolean;
  isPending?: boolean;
  isExpired?: boolean;
  isTemporary?: boolean;
  isPermanent?: boolean;
  isAdmin?: boolean;
  isSystem?: boolean;
  isSecurity?: boolean;
  isPolicy?: boolean;
  isSecurityIssue?: boolean;
  isRecovery?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  searchTerm?: string;
}

/**
 * Auth account lock statistics
 */
export interface AuthAccountLockStatistics {
  userId: ID;
  totalLocks: number;
  lockedAccounts: number;
  unlockedAccounts: number;
  pendingLocks: number;
  expiredLocks: number;
  temporaryLocks: number;
  permanentLocks: number;
  byReason: Record<AuthAccountLockReason, number>;
  byType: Record<AuthAccountLockType, number>;
  byLevel: Record<AuthAccountLockLevel, number>;
  byStatus: Record<AuthAccountLockStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageLockDuration: number;
  lockRate: number;
  unlockRate: number;
  mostFrequentReason: AuthAccountLockReason;
  mostFrequentType: AuthAccountLockType;
  mostFrequentLevel: AuthAccountLockLevel;
}

/**
 * Auth account lock summary
 */
export interface AuthAccountLockSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  locked: number;
  unlocked: number;
  pending: number;
  expired: number;
  temporary: number;
  permanent: number;
  byReason: Record<AuthAccountLockReason, number>;
  byType: Record<AuthAccountLockType, number>;
  byLevel: Record<AuthAccountLockLevel, number>;
  byStatus: Record<AuthAccountLockStatus, number>;
  lockTrend: {
    date: Date;
    total: number;
    locked: number;
    unlocked: number;
  }[];
  topReasons: {
    reason: AuthAccountLockReason;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: AuthAccountLockType;
    count: number;
    label: string;
  }[];
}

/**
 * Auth account lock configuration
 */
export interface AuthAccountLockConfiguration {
  enabled: boolean;
  defaultLevel: AuthAccountLockLevel;
  defaultDurationMinutes: number;
  maxAttempts: number;
  failedAttemptsThreshold: number;
  autoUnlockEnabled: boolean;
  autoUnlockDelayMinutes: number;
  allowAdminOverride: boolean;
  allowSystemOverride: boolean;
  notificationOnLock: boolean;
  notificationOnUnlock: boolean;
  notificationOnAttempt: boolean;
  alertConfig?: AuthAccountLockAlertConfig;
}

/**
 * Auth account lock alert configuration
 */
export interface AuthAccountLockAlertConfig {
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
 * Auth account lock history
 */
export interface AuthAccountLockHistory extends BaseEntity, Timestamp {
  id: ID;
  lockId: ID;
  userId: ID;
  action: 'lock' | 'unlock' | 'expire' | 'override' | 'extend';
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
 * Auth account lock attempt
 */
export interface AuthAccountLockAttempt extends BaseEntity, Timestamp {
  id: ID;
  lockId: ID;
  userId: ID;
  attemptNumber: number;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth account lock override
 */
export interface AuthAccountLockOverride extends BaseEntity, Timestamp {
  id: ID;
  lockId: ID;
  userId: ID;
  overriddenBy: ID;
  reason: string;
  action: 'unlock' | 'extend' | 'permanent';
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Auth account lock export
 */
export interface AuthAccountLockExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthAccountLockFilter;
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
  AUTH_ACCOUNT_LOCK,
  AUTHLOCK_REASONS_LIST,
  AUTHLOCK_TYPES_LIST,
  AUTHLOCK_TEMPORARY_TYPES,
  AUTHLOCK_PERMANENT_TYPES,
  AUTHLOCK_ADMIN_TYPES,
  AUTHLOCK_SYSTEM_TYPES,
  AUTHLOCK_SECURITY_REASONS,
  AUTHLOCK_POLICY_REASONS,
  // Core Types
  AuthAccountLockConfig,
  AuthAccountLockReason,
  AuthAccountLockType,
  AuthAccountLockEvent,
  AuthAccountLockLevel,
  AuthAccountLockDefaults,
  AuthAccountLockStatus,
  // Core Functions
  isAuthlockReason,
  isAuthlockType,
  isAuthlockTemporary,
  isAuthlockPermanent,
  isAuthlockAdmin,
  isAuthlockSystem,
  isAuthlockSecurity,
  isAuthlockPolicy,
  getAuthlockReasonLabel,
  getAuthlockTypeLabel,
  getAuthlockTypeIcon,
  getAuthlockLevel,
  getAuthlockLevelLabel,
  getAuthlockLevelColor,
  getAuthlockDurationMinutes,
  getAuthlockMaxAttempts,
  getAuthlockFailedAttempts,
  isAuthlockExpiredCheck,
  getAuthlockRemainingMinutes,
  shouldAuthlockAutoUnlock,
  getAuthlockLevelFromAttempts,
};
