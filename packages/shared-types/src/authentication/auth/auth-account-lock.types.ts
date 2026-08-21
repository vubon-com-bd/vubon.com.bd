/**
 * Authentication Account Lock Types Module
 * Account lock and security types for authentication system
 * Handles account lockout, security policies, and threat detection
 */

import { UserId, Email, Timestamp, IPAddress } from './core-primitives.types';

/**
 * Lock Type
 * Types of account locks
 */
export type LockType =
  | 'temporary'
  | 'permanent'
  | 'suspension'
  | 'security_lock'
  | 'admin_lock'
  | 'policy_lock'
  | 'threat_lock'
  | 'idle_lock';

/**
 * Lock Status
 * Current status of account lock
 */
export type LockStatus =
  'active' | 'expired' | 'released' | 'pending' | 'escalated' | 'under_review';

/**
 * Lock Severity
 * Severity level of account lock
 */
export type LockSeverity = 'low' | 'medium' | 'high' | 'critical' | 'emergency';

/**
 * Lock Reason
 * Reasons for account lock
 */
export type LockReason =
  | 'failed_attempts'
  | 'suspicious_activity'
  | 'policy_violation'
  | 'security_breach'
  | 'admin_action'
  | 'idle_timeout'
  | 'mfa_failure'
  | 'ip_blacklist'
  | 'device_blacklist'
  | 'location_anomaly'
  | 'unusual_pattern'
  | 'manual_review'
  | 'legal_compliance'
  | 'account_compromise';

/**
 * Account Lock
 * Account lock information
 */
export interface AccountLock {
  id: string;
  userId: UserId;
  type: LockType;
  status: LockStatus;
  severity: LockSeverity;
  reason: LockReason;
  lockedAt: Timestamp;
  expiresAt?: Timestamp;
  releasedAt?: Timestamp;
  duration: number;
  attempts: number;
  maxAttempts: number;
  ipAddress?: IPAddress;
  deviceId?: string;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Lock Request
 * Request to lock an account
 */
export interface LockRequest {
  userId: UserId;
  type: LockType;
  reason: LockReason;
  severity: LockSeverity;
  duration?: number;
  ipAddress?: IPAddress;
  deviceId?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  adminId?: UserId;
  notes?: string;
}

/**
 * Lock Response
 * Response after locking an account
 */
export interface LockResponse {
  success: boolean;
  data?: {
    lockId: string;
    userId: UserId;
    type: LockType;
    status: LockStatus;
    lockedAt: Timestamp;
    expiresAt?: Timestamp;
    severity: LockSeverity;
    reason: LockReason;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Unlock Request
 * Request to unlock an account
 */
export interface UnlockRequest {
  userId: UserId;
  lockId?: string;
  reason: string;
  adminId?: UserId;
  notes?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Unlock Response
 * Response after unlocking an account
 */
export interface UnlockResponse {
  success: boolean;
  data?: {
    unlocked: boolean;
    lockId: string;
    userId: UserId;
    unlockedAt: Timestamp;
    reason: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Lock Status Request
 * Request to check lock status
 */
export interface LockStatusRequest {
  userId: UserId;
  ipAddress?: IPAddress;
  deviceId?: string;
}

/**
 * Lock Status Response
 * Response with lock status
 */
export interface LockStatusResponse {
  success: boolean;
  data?: {
    isLocked: boolean;
    lockId?: string;
    type?: LockType;
    reason?: LockReason;
    lockedAt?: Timestamp;
    expiresAt?: Timestamp;
    remainingTime?: number;
    attemptsUsed: number;
    maxAttempts: number;
    remainingAttempts: number;
    severity?: LockSeverity;
    status?: LockStatus;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Failed Attempt
 * Record of failed authentication attempt
 */
export interface FailedAttempt {
  id: string;
  userId: UserId;
  email: Email;
  ipAddress: IPAddress;
  deviceId?: string;
  userAgent?: string;
  location?: string;
  attemptedAt: Timestamp;
  reason: string;
  metadata?: Record<string, unknown>;
}

/**
 * Lock History
 * History of lock events
 */
export interface LockHistory {
  id: string;
  userId: UserId;
  action: 'lock' | 'unlock' | 'attempt' | 'escalate' | 'release';
  type: LockType;
  status: LockStatus;
  reason: LockReason;
  timestamp: Timestamp;
  ipAddress?: IPAddress;
  deviceId?: string;
  adminId?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Account Security Policy
 * Security policy for account protection
 */
export interface AccountSecurityPolicy {
  maxFailedAttempts: number;
  lockoutDuration: number;
  resetAttemptsAfter: number;
  enableIPLocking: boolean;
  enableDeviceLocking: boolean;
  enableLocationLocking: boolean;
  enableSuspiciousActivityDetection: boolean;
  suspiciousActivityThreshold: number;
  idleTimeoutMinutes: number;
  enforceLockAfterIdle: boolean;
  requireAdminUnlock: boolean;
  notificationOnLock: boolean;
  notificationOnUnlock: boolean;
  escalationThreshold: number;
  autoEscalation: boolean;
  severeLockDuration: number;
}

/**
 * Lock Statistics
 * Statistical data about account locks
 */
export interface LockStatistics {
  totalLocks: number;
  activeLocks: number;
  expiredLocks: number;
  releasedLocks: number;
  byType: Record<LockType, number>;
  bySeverity: Record<LockSeverity, number>;
  byReason: Record<LockReason, number>;
  byStatus: Record<LockStatus, number>;
  averageLockDuration: number;
  maxLockDuration: number;
  minLockDuration: number;
  totalAttempts: number;
  successfulUnlocks: number;
  failedUnlocks: number;
  timestamp: Timestamp;
}

/**
 * Lock Filter
 * Filter criteria for lock queries
 */
export interface LockFilter {
  userId?: UserId[];
  type?: LockType[];
  status?: LockStatus[];
  severity?: LockSeverity[];
  reason?: LockReason[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  ipAddress?: IPAddress[];
  deviceId?: string[];
}

/**
 * Lock Response Builder
 * Helper for building lock responses
 */
export interface LockResponseBuilder {
  lockSuccess(response: LockResponse): LockResponse;
  unlockSuccess(response: UnlockResponse): UnlockResponse;
  statusSuccess(response: LockStatusResponse): LockStatusResponse;
  error(code: string, message: string, details?: Record<string, unknown>): LockErrorResponse;
}

/**
 * Lock Error Response
 * Error response for lock operations
 */
export interface LockErrorResponse {
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
 * Lock Constants
 * Lock-related constants
 */
export const LOCK_TYPES = {
  TEMPORARY: 'temporary',
  PERMANENT: 'permanent',
  SUSPENSION: 'suspension',
  SECURITY_LOCK: 'security_lock',
  ADMIN_LOCK: 'admin_lock',
  POLICY_LOCK: 'policy_lock',
  THREAT_LOCK: 'threat_lock',
  IDLE_LOCK: 'idle_lock',
} as const;

export const LOCK_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  RELEASED: 'released',
  PENDING: 'pending',
  ESCALATED: 'escalated',
  UNDER_REVIEW: 'under_review',
} as const;

export const LOCK_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
  EMERGENCY: 'emergency',
} as const;

export const LOCK_REASONS = {
  FAILED_ATTEMPTS: 'failed_attempts',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  POLICY_VIOLATION: 'policy_violation',
  SECURITY_BREACH: 'security_breach',
  ADMIN_ACTION: 'admin_action',
  IDLE_TIMEOUT: 'idle_timeout',
  MFA_FAILURE: 'mfa_failure',
  IP_BLACKLIST: 'ip_blacklist',
  DEVICE_BLACKLIST: 'device_blacklist',
  LOCATION_ANOMALY: 'location_anomaly',
  UNUSUAL_PATTERN: 'unusual_pattern',
  MANUAL_REVIEW: 'manual_review',
  LEGAL_COMPLIANCE: 'legal_compliance',
  ACCOUNT_COMPROMISE: 'account_compromise',
} as const;

/**
 * Default Lock Configuration
 */
export const DEFAULT_LOCK_CONFIG = {
  maxFailedAttempts: 5,
  lockoutDuration: 900, // 15 minutes
  resetAttemptsAfter: 3600, // 1 hour
  enableIPLocking: true,
  enableDeviceLocking: true,
  enableLocationLocking: false,
  enableSuspiciousActivityDetection: true,
  suspiciousActivityThreshold: 10,
  idleTimeoutMinutes: 30,
  enforceLockAfterIdle: true,
  requireAdminUnlock: false,
  notificationOnLock: true,
  notificationOnUnlock: true,
  escalationThreshold: 3,
  autoEscalation: true,
  severeLockDuration: 86400, // 24 hours
} as const;

/**
 * Lock Webhook
 * Webhook payload for lock events
 */
export interface LockWebhook {
  event: string;
  userId: UserId;
  type: LockType;
  status: LockStatus;
  severity: LockSeverity;
  reason: LockReason;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Security Threat
 * Detected security threat
 */
export interface SecurityThreat {
  id: string;
  userId: UserId;
  type: string;
  severity: LockSeverity;
  description: string;
  detectedAt: Timestamp;
  ipAddress?: IPAddress;
  deviceId?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  actionTaken: string;
  resolved: boolean;
  resolvedAt?: Timestamp;
}

/**
 * Suspicious Activity
 * Detected suspicious activity
 */
export interface SuspiciousActivity {
  id: string;
  userId: UserId;
  activityType: string;
  description: string;
  detectedAt: Timestamp;
  ipAddress?: IPAddress;
  deviceId?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  riskScore: number;
  requiresReview: boolean;
  reviewed: boolean;
  reviewedAt?: Timestamp;
  reviewedBy?: UserId;
  actionTaken?: string;
}

/**
 * Account Lock Notification
 * Notification for account lock events
 */
export interface AccountLockNotification {
  id: string;
  userId: UserId;
  type: 'lock' | 'unlock' | 'attempt' | 'warning' | 'escalation';
  severity: LockSeverity;
  message: string;
  sentAt: Timestamp;
  sentVia: 'email' | 'sms' | 'push' | 'in_app';
  read: boolean;
  readAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Lock Escalation Request
 * Request to escalate a lock
 */
export interface LockEscalationRequest {
  userId: UserId;
  lockId: string;
  reason: string;
  adminId: UserId;
  newSeverity: LockSeverity;
  newDuration?: number;
  notes?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Lock Escalation Response
 * Response after lock escalation
 */
export interface LockEscalationResponse {
  success: boolean;
  data?: {
    escalated: boolean;
    lockId: string;
    userId: UserId;
    newSeverity: LockSeverity;
    newDuration: number;
    escalatedAt: Timestamp;
    reason: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Bulk Lock Request
 * Request to lock multiple accounts
 */
export interface BulkLockRequest {
  userIds: UserId[];
  type: LockType;
  reason: LockReason;
  severity: LockSeverity;
  duration?: number;
  adminId: UserId;
  notes?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Bulk Lock Response
 * Response after bulk lock
 */
export interface BulkLockResponse {
  success: boolean;
  data?: {
    locked: number;
    failed: number;
    total: number;
    lockIds: string[];
    failedUserIds: UserId[];
    reasons: Record<string, string>;
    timestamp: Timestamp;
  };
  error?: string;
}
