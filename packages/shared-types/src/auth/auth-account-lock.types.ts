/**
 * Authentication Account Lock Types
 * Types for account locking and security policies
 */

import type { AuthLoginAttemptReason, AuthLoginAttemptStatus } from '@vubon/shared-constants';
import { AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// ACCOUNT LOCK STATUS
// ============================================================

/**
 * Account lock status
 */
export type AuthAccountLockStatus = 'locked' | 'unlocked' | 'suspended' | 'permanently_locked';

/**
 * Account lock reason
 * Extends login attempt reasons with lock-specific reasons
 */
export type AuthAccountLockReason =
  | AuthLoginAttemptReason
  | 'admin_action'
  | 'security_policy'
  | 'suspicious_activity'
  | 'password_expired'
  | 'mfa_required';

// ============================================================
// ACCOUNT LOCK RECORD
// ============================================================

/**
 * Account lock record
 */
export interface AuthAccountLock {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Lock status */
  status: AuthAccountLockStatus;
  /** Reason for lock */
  reason: AuthAccountLockReason;
  /** When the lock was applied */
  lockedAt: Timestamp;
  /** When the lock will expire (if temporary) */
  expiresAt?: Timestamp;
  /** Who performed the lock (system, admin ID, etc.) */
  lockedBy?: ID | 'system';
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Number of failed attempts that led to lock */
  failedAttempts: number;
  /** Whether lock is active */
  isActive: boolean;
  /** Related login attempt status that triggered the lock */
  triggerStatus?: AuthLoginAttemptStatus;
}

// ============================================================
// ACCOUNT LOCK REQUEST
// ============================================================

/**
 * Request to lock an account
 */
export interface AuthAccountLockRequest {
  /** User ID to lock */
  userId: ID;
  /** Reason for locking */
  reason: AuthAccountLockReason;
  /** Duration in seconds (optional, default from config) */
  duration?: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Login attempt status that triggered this lock */
  triggerStatus?: AuthLoginAttemptStatus;
}

/**
 * Request to unlock an account
 */
export interface AuthAccountUnlockRequest {
  /** User ID to unlock */
  userId: ID;
  /** Reason for unlocking */
  reason?: string;
  /** Admin ID who performed the unlock */
  unlockedBy?: ID;
}

// ============================================================
// ACCOUNT LOCK RESPONSE
// ============================================================

/**
 * Response for account lock operations
 */
export interface AuthAccountLockResponse {
  /** Whether operation was successful */
  success: boolean;
  /** Lock record if successful */
  lock?: AuthAccountLock;
  /** Error message if failed */
  error?: string;
  /** Remaining lock time in seconds */
  remainingSeconds?: number;
  /** Current status of the account */
  status?: AuthAccountLockStatus;
  /** Login attempt status */
  attemptStatus?: AuthLoginAttemptStatus;
}

// ============================================================
// ACCOUNT LOCK FILTER
// ============================================================

/**
 * Filter for querying account locks
 */
export interface AuthAccountLockFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by lock status */
  status?: AuthAccountLockStatus;
  /** Filter by reason */
  reason?: AuthAccountLockReason;
  /** Filter by active locks only */
  activeOnly?: boolean;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Filter by trigger status */
  triggerStatus?: AuthLoginAttemptStatus;
}

// ============================================================
// ACCOUNT LOCK CONFIG
// ============================================================

/**
 * Account lock configuration
 */
export interface AuthAccountLockConfig {
  /** Maximum failed attempts before lock */
  maxFailedAttempts: number;
  /** Lockout duration in seconds */
  lockoutDuration: number;
  /** Whether to lock on suspicious activity */
  lockOnSuspicious: boolean;
  /** Whether to notify user on lock */
  notifyOnLock: boolean;
  /** Whether to allow admin override */
  allowAdminOverride: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if account lock status is active
 */
export function isAuthAccountLockActive(status: AuthAccountLockStatus): boolean {
  return status === 'locked' || status === 'suspended';
}

/**
 * Check if account lock is permanent
 */
export function isAuthAccountLockPermanent(status: AuthAccountLockStatus): boolean {
  return status === 'permanently_locked';
}

/**
 * Check if account lock can be manually removed
 */
export function canAuthAccountLockBeManuallyRemoved(status: AuthAccountLockStatus): boolean {
  return status === 'locked' || status === 'suspended';
}

/**
 * Get human-readable label for lock status
 */
export function getAuthAccountLockStatusLabel(status: AuthAccountLockStatus): string {
  const labels: Record<AuthAccountLockStatus, string> = {
    locked: 'Locked',
    unlocked: 'Unlocked',
    suspended: 'Suspended',
    permanently_locked: 'Permanently Locked',
  };
  return labels[status] || 'Unknown';
}

/**
 * Map login attempt status to lock status
 */
export function mapAuthLoginAttemptStatusToLockStatus(
  status: AuthLoginAttemptStatus
): AuthAccountLockStatus | null {
  // Use the imported constant values
  const mapping: Record<string, AuthAccountLockStatus> = {
    [AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS]: 'unlocked',
    [AUTH_LOGIN_ATTEMPT_STATUS.FAILED]: 'locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED]: 'locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.LOCKED]: 'locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED]: 'locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.CANCELLED]: 'unlocked',
    [AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT]: 'locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS]: 'suspended',
  };
  return mapping[status] || null;
}

/**
 * Check if login attempt status should trigger lock
 */
export function shouldAuthLoginAttemptTriggerLock(status: AuthLoginAttemptStatus): boolean {
  const triggerStatuses: AuthLoginAttemptStatus[] = [
    AUTH_LOGIN_ATTEMPT_STATUS.FAILED,
    AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED,
    AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS,
    AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT,
  ];
  return triggerStatuses.includes(status);
}
