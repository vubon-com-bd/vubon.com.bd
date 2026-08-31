/**
 * Authentication Login Attempt Types
 * Types for login attempt tracking, history, and analysis
 */

import type {
  AuthLoginAttemptStatus,
  AuthLoginAttemptReason,
  AuthSuspiciousIndicator,
} from '@vubon/shared-constants';
import { AUTH_LOGIN_ATTEMPT_STATUS } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// CUSTOM PRIMITIVE TYPES
// ============================================================

/**
 * IP address type
 */
export type AuthIPAddress = string;

/**
 * User agent type
 */
export type AuthUserAgent = string;

// ============================================================
// LOGIN ATTEMPT RECORD
// ============================================================

/**
 * Complete login attempt record
 */
export interface AuthLoginAttempt {
  /** Unique identifier */
  id: ID;
  /** User ID (if known) */
  userId?: ID;
  /** Email or username used for login */
  identifier: string;
  /** Attempt status */
  status: AuthLoginAttemptStatus;
  /** Reason for the attempt outcome */
  reason?: AuthLoginAttemptReason;
  /** IP address of the request */
  ipAddress: AuthIPAddress;
  /** User agent of the request */
  userAgent: AuthUserAgent;
  /** Device fingerprint */
  deviceFingerprint?: string;
  /** Location information */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Suspicious indicators detected */
  suspiciousIndicators?: AuthSuspiciousIndicator[];
  /** Whether the attempt was suspicious */
  isSuspicious: boolean;
  /** Timestamp of the attempt */
  attemptedAt: Timestamp;
  /** Response time in milliseconds */
  responseTime?: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// LOGIN ATTEMPT REQUEST
// ============================================================

/**
 * Request to record a login attempt
 */
export interface AuthLoginAttemptRequest {
  /** Email or username used for login */
  identifier: string;
  /** IP address of the request */
  ipAddress: AuthIPAddress;
  /** User agent of the request */
  userAgent: AuthUserAgent;
  /** Device fingerprint */
  deviceFingerprint?: string;
  /** Location information */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================
// LOGIN ATTEMPT RESPONSE
// ============================================================

/**
 * Response for login attempt operations
 */
export interface AuthLoginAttemptResponse {
  /** Whether the attempt was successful */
  success: boolean;
  /** Attempt status */
  status: AuthLoginAttemptStatus;
  /** Attempt record if created */
  attempt?: AuthLoginAttempt;
  /** Error message if failed */
  error?: string;
  /** Remaining lockout time in seconds */
  remainingLockoutSeconds?: number;
  /** Whether MFA is required */
  mfaRequired?: boolean;
}

// ============================================================
// LOGIN ATTEMPT FILTER
// ============================================================

/**
 * Filter for querying login attempts
 */
export interface AuthLoginAttemptFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by identifier (email/username) */
  identifier?: string;
  /** Filter by status */
  status?: AuthLoginAttemptStatus | AuthLoginAttemptStatus[];
  /** Filter by reason */
  reason?: AuthLoginAttemptReason | AuthLoginAttemptReason[];
  /** Filter by IP address */
  ipAddress?: AuthIPAddress;
  /** Filter by suspicious attempts only */
  suspiciousOnly?: boolean;
  /** Filter by date range */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Filter by successful attempts only */
  successfulOnly?: boolean;
  /** Filter by failed attempts only */
  failedOnly?: boolean;
}

// ============================================================
// LOGIN ATTEMPT STATISTICS
// ============================================================

/**
 * Login attempt statistics
 */
export interface AuthLoginAttemptStatistics {
  /** Total number of attempts */
  totalAttempts: number;
  /** Number of successful attempts */
  successfulAttempts: number;
  /** Number of failed attempts */
  failedAttempts: number;
  /** Number of suspicious attempts */
  suspiciousAttempts: number;
  /** Success rate (0-1) */
  successRate: number;
  /** Attempts by status */
  statusCounts: Record<AuthLoginAttemptStatus, number>;
  /** Attempts by reason */
  reasonCounts: Record<AuthLoginAttemptReason, number>;
  /** Attempts by hour (for trend analysis) */
  attemptsByHour: Record<number, number>;
  /** Unique IP addresses */
  uniqueIPs: number;
  /** Unique users */
  uniqueUsers: number;
  /** Time period covered */
  period: {
    start: Date;
    end: Date;
  };
}

// ============================================================
// LOGIN ATTEMPT SUMMARY
// ============================================================

/**
 * Summary of recent login attempts for a user
 */
export interface AuthUserLoginSummary {
  /** User ID */
  userId: ID;
  /** Total attempts */
  totalAttempts: number;
  /** Recent failed attempts count */
  recentFailedAttempts: number;
  /** Whether account is at risk of lockout */
  isAtRisk: boolean;
  /** Time until lockout reset (if applicable) */
  resetTimeRemaining?: number;
  /** Last attempt */
  lastAttempt?: AuthLoginAttempt;
  /** Recent attempts (limited) */
  recentAttempts: AuthLoginAttempt[];
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if login attempt was successful
 */
export function isAuthLoginAttemptSuccessful(status: AuthLoginAttemptStatus): boolean {
  return status === AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS;
}

/**
 * Check if login attempt was failed
 */
export function isAuthLoginAttemptFailed(status: AuthLoginAttemptStatus): boolean {
  const failedStatuses: AuthLoginAttemptStatus[] = [
    AUTH_LOGIN_ATTEMPT_STATUS.FAILED,
    AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED,
    AUTH_LOGIN_ATTEMPT_STATUS.LOCKED,
    AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT,
    AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS,
  ];
  return failedStatuses.includes(status);
}

/**
 * Check if login attempt requires MFA
 */
export function isAuthLoginAttemptMfaRequired(status: AuthLoginAttemptStatus): boolean {
  return status === AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED;
}

/**
 * Check if login attempt was blocked
 */
export function isAuthLoginAttemptBlocked(status: AuthLoginAttemptStatus): boolean {
  const blockedStatuses: AuthLoginAttemptStatus[] = [
    AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED,
    AUTH_LOGIN_ATTEMPT_STATUS.LOCKED,
  ];
  return blockedStatuses.includes(status);
}

/**
 * Check if login attempt was suspicious
 */
export function isAuthLoginAttemptSuspicious(status: AuthLoginAttemptStatus): boolean {
  return status === AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS;
}

/**
 * Get human-readable label for login attempt status
 */
export function getAuthLoginAttemptStatusLabel(status: AuthLoginAttemptStatus): string {
  const labels: Record<AuthLoginAttemptStatus, string> = {
    [AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS]: 'Successful',
    [AUTH_LOGIN_ATTEMPT_STATUS.FAILED]: 'Failed',
    [AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED]: 'Blocked',
    [AUTH_LOGIN_ATTEMPT_STATUS.LOCKED]: 'Locked',
    [AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED]: 'MFA Required',
    [AUTH_LOGIN_ATTEMPT_STATUS.CANCELLED]: 'Cancelled',
    [AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT]: 'Timed Out',
    [AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS]: 'Suspicious',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get severity level for login attempt status
 */
export function getAuthLoginAttemptSeverity(
  status: AuthLoginAttemptStatus
): 'info' | 'warning' | 'error' {
  const severityMap: Record<AuthLoginAttemptStatus, 'info' | 'warning' | 'error'> = {
    [AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS]: 'info',
    [AUTH_LOGIN_ATTEMPT_STATUS.FAILED]: 'warning',
    [AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED]: 'error',
    [AUTH_LOGIN_ATTEMPT_STATUS.LOCKED]: 'error',
    [AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED]: 'warning',
    [AUTH_LOGIN_ATTEMPT_STATUS.CANCELLED]: 'info',
    [AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT]: 'warning',
    [AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS]: 'error',
  };
  return severityMap[status] || 'info';
}

/**
 * Check if account should be locked based on failed attempts
 */
export function shouldAuthAccountBeLocked(
  failedAttempts: number,
  maxFailedAttempts: number = 5
): boolean {
  return failedAttempts >= maxFailedAttempts;
}

/**
 * Calculate remaining lockout time
 */
export function calculateAuthLockoutRemainingTime(
  lockedAt: Date,
  lockoutDurationSeconds: number = 900
): number {
  const now = Date.now();
  const elapsed = (now - lockedAt.getTime()) / 1000;
  const remaining = lockoutDurationSeconds - elapsed;
  return Math.max(0, Math.ceil(remaining));
}

/**
 * Format lockout remaining time for display
 */
export function formatAuthLockoutTime(seconds: number): string {
  if (seconds <= 0) return '0s';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Check if login attempt is within rate limit window
 */
export function isAuthAttemptWithinWindow(attemptedAt: Date, windowSeconds: number = 900): boolean {
  const now = Date.now();
  const age = (now - attemptedAt.getTime()) / 1000;
  return age <= windowSeconds;
}
