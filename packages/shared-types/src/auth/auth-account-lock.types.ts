/**
 * Authentication Account Lock Types
 * Account locking, suspension, and restriction data types
 */

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Account Lock Status
 * Status of account lock
 */
export const ACCOUNT_LOCK_STATUS = {
  /** Account is not locked */
  UNLOCKED: 'unlocked',
  /** Account is temporarily locked */
  TEMPORARY: 'temporary',
  /** Account is permanently locked */
  PERMANENT: 'permanent',
  /** Account is locked due to suspicious activity */
  SUSPICIOUS: 'suspicious',
} as const;

export type AccountLockStatus = (typeof ACCOUNT_LOCK_STATUS)[keyof typeof ACCOUNT_LOCK_STATUS];

/**
 * Account Lock Reason
 * Reasons for account lock
 */
export const ACCOUNT_LOCK_REASONS = {
  /** Too many failed login attempts */
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
  /** Suspicious login detected */
  SUSPICIOUS_LOGIN: 'suspicious_login',
  /** Admin action */
  ADMIN_ACTION: 'admin_action',
  /** Security breach detected */
  SECURITY_BREACH: 'security_breach',
  /** User request */
  USER_REQUEST: 'user_request',
  /** Password expired */
  PASSWORD_EXPIRED: 'password_expired',
  /** Account inactivity */
  INACTIVITY: 'inactivity',
  /** Violation of terms */
  TERMS_VIOLATION: 'terms_violation',
  /** Fraud detection */
  FRAUD_DETECTED: 'fraud_detected',
} as const;

export type AccountLockReason = (typeof ACCOUNT_LOCK_REASONS)[keyof typeof ACCOUNT_LOCK_REASONS];

/**
 * Account Lock Data
 * Complete account lock information
 */
export interface AccountLockData {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Lock status */
  status: AccountLockStatus;
  /** Lock reason */
  reason: AccountLockReason;
  /** Detailed reason message */
  reasonMessage?: string;
  /** When account was locked */
  lockedAt: Timestamp;
  /** When account will be unlocked (if temporary) */
  unlockedAt?: Timestamp;
  /** Who performed the lock (admin ID or system) */
  lockedBy?: ID | 'system';
  /** Number of failed attempts */
  failedAttempts: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Is account locked */
  isLocked: boolean;
}

/**
 * Account Lock Request
 * Request to lock an account
 */
export interface AccountLockRequest {
  /** User ID */
  userId: ID;
  /** Lock reason */
  reason: AccountLockReason;
  /** Detailed reason message */
  reasonMessage?: string;
  /** Lock duration in seconds (for temporary lock) */
  duration?: number;
  /** Admin ID (if locked by admin) */
  lockedBy?: ID;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Account Unlock Request
 * Request to unlock an account
 */
export interface AccountUnlockRequest {
  /** User ID */
  userId: ID;
  /** Unlock reason */
  reason?: string;
  /** Admin ID (if unlocked by admin) */
  unlockedBy?: ID;
  /** Reset failed attempts counter */
  resetAttempts?: boolean;
}

/**
 * Account Lock Result
 * Result of account lock operation
 */
export interface AccountLockResult {
  /** Is lock successful */
  success: boolean;
  /** Lock data (if successful) */
  lockData?: AccountLockData;
  /** User data (if available) */
  user?: AuthUser;
  /** Message */
  message: string;
  /** Remaining lock time in seconds */
  remainingTime?: number;
}

/**
 * Account Unlock Result
 * Result of account unlock operation
 */
export interface AccountUnlockResult {
  /** Is unlock successful */
  success: boolean;
  /** New lock status */
  status: AccountLockStatus;
  /** User data (if available) */
  user?: AuthUser;
  /** Message */
  message: string;
}

/**
 * Account Lock Status Check
 * Check account lock status
 */
export interface AccountLockStatusCheck {
  /** User ID */
  userId: ID;
  /** Is account locked */
  isLocked: boolean;
  /** Lock status */
  status: AccountLockStatus;
  /** Lock reason (if locked) */
  reason?: AccountLockReason;
  /** When account was locked (if locked) */
  lockedAt?: Timestamp;
  /** When account will be unlocked (if temporary) */
  unlockedAt?: Timestamp;
  /** Remaining lock time in seconds */
  remainingTime?: number;
  /** Failed attempts count */
  failedAttempts: number;
  /** Max attempts allowed */
  maxAttempts: number;
}

/**
 * Account Lock Statistics
 * Account lock statistics
 */
export interface AccountLockStatistics {
  /** Total accounts locked */
  totalLocked: number;
  /** Temporary locks */
  temporaryLocks: number;
  /** Permanent locks */
  permanentLocks: number;
  /** Suspicious locks */
  suspiciousLocks: number;
  /** Lock by reason */
  byReason: Record<AccountLockReason, number>;
  /** Average lock duration in seconds */
  averageDuration: number;
  /** Lock rate (per day) */
  lockRate: number;
  /** Unlock rate (per day) */
  unlockRate: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Account Lock History
 * History of account locks and unlocks
 */
export interface AccountLockHistory {
  /** Lock ID */
  lockId: ID;
  /** User ID */
  userId: ID;
  /** Action performed */
  action: 'lock' | 'unlock';
  /** Lock status after action */
  status: AccountLockStatus;
  /** Reason for action */
  reason: string;
  /** Who performed the action */
  performedBy: ID | 'system' | 'user';
  /** When action was performed */
  performedAt: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Account Lock Configuration
 * Configuration for account locking
 */
export interface AccountLockConfig {
  /** Maximum failed login attempts */
  maxFailedAttempts: number;
  /** Default lock duration in seconds */
  defaultLockDuration: number;
  /** Maximum lock duration in seconds */
  maxLockDuration: number;
  /** Time window for failed attempts in seconds */
  failedAttemptsWindow: number;
  /** Reset failed attempts after successful login */
  resetAttemptsOnLogin: boolean;
  /** Notify user on lock */
  notifyOnLock: boolean;
  /** Notify user on unlock */
  notifyOnUnlock: boolean;
  /** Allow admin override */
  allowAdminOverride: boolean;
}

/**
 * Account Lock Event
 * Event emitted when account lock state changes
 */
export interface AccountLockEvent {
  /** Event type */
  type: 'locked' | 'unlocked' | 'attempt_failed';
  /** User ID */
  userId: ID;
  /** Lock status (if locked) */
  status?: AccountLockStatus;
  /** Reason (if locked) */
  reason?: AccountLockReason;
  /** Timestamp of event */
  timestamp: Timestamp;
  /** Additional data */
  data?: Record<string, unknown>;
}
