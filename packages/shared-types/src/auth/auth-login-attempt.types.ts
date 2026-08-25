/**
 * Auth Login Attempt Types
 * Type definitions for authentication login attempts based on shared-constants
 * @module AuthLoginAttemptTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, DeviceInfo } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth login-attempt
// ============================================================
import {
  // Core Login Attempt Constants
  AUTH_LOGIN_ATTEMPT,
  ATTEMPT_TYPES,
  ATTEMPT_REASONS,
  ATTEMPT_EVENTS,
  ATTEMPT_LEVELS,
  ATTEMPT_CONFIG,
  ATTEMPT_DEFAULTS,
  AUTHLOGIN_ATTEMPT_TYPES_LIST,
  AUTHLOGIN_SUCCESS_TYPES,
  AUTHLOGIN_FAILED_TYPES,
  AUTHLOGIN_BLOCKED_TYPES,
  AUTHLOGIN_REASONS_LIST,
  AUTHLOGIN_SECURITY_REASONS,
  AUTHLOGIN_CREDENTIAL_REASONS,
  AUTHLOGIN_TOKEN_REASONS,
  AUTHLOGIN_MFA_REASONS,
  // Core Login Attempt Types
  AuthLoginAttemptConfig,
  AuthLoginAttemptType,
  AuthLoginAttemptReason,
  AuthLoginAttemptEvent,
  AuthLoginAttemptLevel,
  AuthLoginAttemptDefaults,
  // Core Login Attempt Status Types
  AuthLoginAttemptStatus,
  // Core Login Attempt Functions
  isAuthloginAttemptType,
  isAuthloginSuccess,
  isAuthloginFailed,
  isAuthloginBlocked,
  isAuthloginReason,
  isAuthloginSecurity,
  isAuthloginCredential,
  isAuthloginToken,
  isAuthloginMFA,
  getAuthloginAttemptTypeLabel,
  getAuthloginAttemptTypeIcon,
  getAuthloginAttemptReasonLabel,
  getAuthloginAttemptLevel,
  getAuthloginAttemptLevelLabel,
  getAuthloginAttemptLevelColor,
  getAuthloginMaxAttempts,
  getAuthloginMaxFailedAttempts,
  getAuthloginResetAfterMinutes,
  getAuthloginBlockDurationMinutes,
  getAuthloginCaptchaAfterAttempts,
  shouldAuthloginRequireCaptcha,
  getAuthloginLevelFromAttempts,
  isAuthloginAccountBlocked,
  getAuthloginRemainingAttempts,
  shouldAuthloginResetAttempts,
} from '@vubon/shared-constants';

// ============================================================
// Auth Login Attempt Extended Types
// ============================================================

/**
 * Auth login attempt with additional metadata
 */
export interface AuthLoginAttemptExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: AuthLoginAttemptType;
  status: AuthLoginAttemptStatus;
  reason: AuthLoginAttemptReason;
  level: AuthLoginAttemptLevel;
  isSuccess: boolean;
  isFailed: boolean;
  isBlocked: boolean;
  isPending: boolean;
  isSecurityIssue: boolean;
  isVerification: boolean;
  isMFA: boolean;
  isCredential: boolean;
  isToken: boolean;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  location?: string;
  attemptNumber: number;
  failedAttempts: number;
  remainingAttempts: number;
  isAccountBlocked: boolean;
  blockDurationMinutes?: number;
  blockedUntil?: Date;
  requiresCaptcha: boolean;
  metadata?: Metadata;
}

/**
 * Auth login attempt filter
 */
export interface AuthLoginAttemptFilter {
  userIds?: ID[];
  types?: AuthLoginAttemptType[];
  statuses?: AuthLoginAttemptStatus[];
  reasons?: AuthLoginAttemptReason[];
  levels?: AuthLoginAttemptLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSuccess?: boolean;
  isFailed?: boolean;
  isBlocked?: boolean;
  isPending?: boolean;
  isSecurityIssue?: boolean;
  isVerification?: boolean;
  isMFA?: boolean;
  isCredential?: boolean;
  isToken?: boolean;
  ipAddress?: string;
  requiresCaptcha?: boolean;
  isAccountBlocked?: boolean;
  searchTerm?: string;
}

/**
 * Auth login attempt statistics
 */
export interface AuthLoginAttemptStatistics {
  userId: ID;
  totalAttempts: number;
  successAttempts: number;
  failedAttempts: number;
  blockedAttempts: number;
  pendingAttempts: number;
  securityIssueAttempts: number;
  byType: Record<AuthLoginAttemptType, number>;
  byStatus: Record<AuthLoginAttemptStatus, number>;
  byReason: Record<AuthLoginAttemptReason, number>;
  byLevel: Record<AuthLoginAttemptLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  successRate: number;
  failureRate: number;
  blockRate: number;
  averageAttemptsPerLogin: number;
  mostFrequentType: AuthLoginAttemptType;
  mostFrequentReason: AuthLoginAttemptReason;
  mostFrequentLevel: AuthLoginAttemptLevel;
  captchaTriggeredCount: number;
  accountBlockedCount: number;
}

/**
 * Auth login attempt summary
 */
export interface AuthLoginAttemptSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  success: number;
  failed: number;
  blocked: number;
  pending: number;
  securityIssue: number;
  byType: Record<AuthLoginAttemptType, number>;
  byStatus: Record<AuthLoginAttemptStatus, number>;
  byReason: Record<AuthLoginAttemptReason, number>;
  byLevel: Record<AuthLoginAttemptLevel, number>;
  attemptTrend: {
    date: Date;
    total: number;
    success: number;
    failed: number;
    blocked: number;
  }[];
  topTypes: {
    type: AuthLoginAttemptType;
    count: number;
    label: string;
  }[];
  topReasons: {
    reason: AuthLoginAttemptReason;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: AuthLoginAttemptLevel;
    count: number;
    label: string;
  }[];
}

/**
 * Auth login attempt configuration
 */
export interface AuthLoginAttemptConfiguration {
  enabled: boolean;
  maxAttempts: number;
  maxFailedAttempts: number;
  resetAfterMinutes: number;
  blockDurationMinutes: number;
  captchaAfterAttempts: number;
  requireCaptcha: boolean;
  trackIP: boolean;
  trackDevice: boolean;
  trackLocation: boolean;
  notificationOnFailed: boolean;
  notificationOnBlock: boolean;
  notificationOnSuccess: boolean;
  alertConfig?: AuthLoginAttemptAlertConfig;
}

/**
 * Auth login attempt alert configuration
 */
export interface AuthLoginAttemptAlertConfig {
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
 * Auth login attempt history
 */
export interface AuthLoginAttemptHistory extends BaseEntity, Timestamp {
  id: ID;
  attemptId: ID;
  userId: ID;
  action: 'attempt' | 'success' | 'fail' | 'block' | 'unblock' | 'reset';
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
 * Auth login attempt device
 */
export interface AuthLoginAttemptDevice extends BaseEntity, Timestamp {
  id: ID;
  attemptId: ID;
  userId: ID;
  deviceInfo: DeviceInfo;
  isTrusted: boolean;
  trustLevel: 'unknown' | 'low' | 'medium' | 'high';
  firstSeen: Date;
  lastSeen: Date;
  metadata?: Metadata;
}

/**
 * Auth login attempt location
 */
export interface AuthLoginAttemptLocation extends BaseEntity, Timestamp {
  id: ID;
  attemptId: ID;
  userId: ID;
  ipAddress: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  isSuspicious: boolean;
  metadata?: Metadata;
}

/**
 * Auth login attempt export
 */
export interface AuthLoginAttemptExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthLoginAttemptFilter;
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
  AUTH_LOGIN_ATTEMPT,
  ATTEMPT_TYPES,
  ATTEMPT_REASONS,
  ATTEMPT_EVENTS,
  ATTEMPT_LEVELS,
  ATTEMPT_CONFIG,
  ATTEMPT_DEFAULTS,
  AUTHLOGIN_ATTEMPT_TYPES_LIST,
  AUTHLOGIN_SUCCESS_TYPES,
  AUTHLOGIN_FAILED_TYPES,
  AUTHLOGIN_BLOCKED_TYPES,
  AUTHLOGIN_REASONS_LIST,
  AUTHLOGIN_SECURITY_REASONS,
  AUTHLOGIN_CREDENTIAL_REASONS,
  AUTHLOGIN_TOKEN_REASONS,
  AUTHLOGIN_MFA_REASONS,
  // Core Types
  AuthLoginAttemptConfig,
  AuthLoginAttemptType,
  AuthLoginAttemptReason,
  AuthLoginAttemptEvent,
  AuthLoginAttemptLevel,
  AuthLoginAttemptDefaults,
  AuthLoginAttemptStatus,
  // Core Functions
  isAuthloginAttemptType,
  isAuthloginSuccess,
  isAuthloginFailed,
  isAuthloginBlocked,
  isAuthloginReason,
  isAuthloginSecurity,
  isAuthloginCredential,
  isAuthloginToken,
  isAuthloginMFA,
  getAuthloginAttemptTypeLabel,
  getAuthloginAttemptTypeIcon,
  getAuthloginAttemptReasonLabel,
  getAuthloginAttemptLevel,
  getAuthloginAttemptLevelLabel,
  getAuthloginAttemptLevelColor,
  getAuthloginMaxAttempts,
  getAuthloginMaxFailedAttempts,
  getAuthloginResetAfterMinutes,
  getAuthloginBlockDurationMinutes,
  getAuthloginCaptchaAfterAttempts,
  shouldAuthloginRequireCaptcha,
  getAuthloginLevelFromAttempts,
  isAuthloginAccountBlocked,
  getAuthloginRemainingAttempts,
  shouldAuthloginResetAttempts,
};
