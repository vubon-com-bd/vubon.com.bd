/**
 * Authentication Login Attempt Types
 * Login attempt tracking, monitoring, and analysis data types
 */

import type {
  LoginAttemptStatus,
  LoginAttemptReason,
  SuspiciousIndicator,
} from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';
import type { AuthDeviceInfo } from './auth.types';

/**
 * Login Attempt Data
 * Complete login attempt information
 */
export interface LoginAttemptData {
  /** Unique identifier */
  id: ID;
  /** User ID (if known) */
  userId?: ID;
  /** Email or username used for login */
  identifier: string;
  /** Login attempt status */
  status: LoginAttemptStatus;
  /** Reason for failure (if failed) */
  reason?: LoginAttemptReason;
  /** IP address of the request */
  ipAddress: string;
  /** User agent of the request */
  userAgent: string;
  /** Device information (if available) */
  device?: AuthDeviceInfo;
  /** Location information (if available) */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  /** When attempt was made */
  attemptedAt: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Login Attempt Request
 * Request to record a login attempt
 */
export interface LoginAttemptRequest {
  /** User ID (if known) */
  userId?: ID;
  /** Email or username */
  identifier: string;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Device information (optional) */
  device?: Partial<AuthDeviceInfo>;
  /** Location information (optional) */
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
}

/**
 * Login Attempt Result
 * Result of a login attempt
 */
export interface LoginAttemptResult {
  /** Is login successful */
  success: boolean;
  /** Attempt status */
  status: LoginAttemptStatus;
  /** Reason (if failed) */
  reason?: LoginAttemptReason;
  /** User data (if successful) */
  user?: AuthUser;
  /** Access token (if successful) */
  accessToken?: string;
  /** Refresh token (if successful) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** MFA required flag */
  mfaRequired?: boolean;
  /** Remaining lockout time in seconds */
  remainingLockout?: number;
  /** Suspicious indicators detected */
  suspiciousIndicators?: SuspiciousIndicator[];
  /** Message */
  message: string;
}

/**
 * Login Attempt Filter
 * Filter for querying login attempts
 */
export interface LoginAttemptFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by email/username */
  identifier?: string;
  /** Filter by status */
  status?: LoginAttemptStatus;
  /** Filter by IP address */
  ipAddress?: string;
  /** Start date for filter */
  startDate?: Date;
  /** End date for filter */
  endDate?: Date;
  /** Filter by successful attempts */
  isSuccess?: boolean;
  /** Filter by failed attempts */
  isFailed?: boolean;
}

/**
 * Login Attempt Statistics
 * Statistics for login attempts
 */
export interface LoginAttemptStatistics {
  /** Total attempts */
  totalAttempts: number;
  /** Successful attempts */
  successfulAttempts: number;
  /** Failed attempts */
  failedAttempts: number;
  /** Blocked attempts */
  blockedAttempts: number;
  /** Suspicious attempts */
  suspiciousAttempts: number;
  /** Success rate */
  successRate: number;
  /** Failed rate */
  failedRate: number;
  /** Top IPs with most attempts */
  topIps: Array<{
    ipAddress: string;
    attempts: number;
    successRate: number;
  }>;
  /** Attempts by status */
  byStatus: Record<LoginAttemptStatus, number>;
  /** Attempts by reason */
  byReason: Record<LoginAttemptReason, number>;
  /** Attempts by hour */
  byHour: Record<number, number>;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Login Attempt Summary
 * Summary of login attempts for a user
 */
export interface LoginAttemptSummary {
  /** User ID */
  userId: ID;
  /** Total attempts */
  totalAttempts: number;
  /** Recent attempts (last 24 hours) */
  recentAttempts: number;
  /** Failed attempts (last 24 hours) */
  recentFailedAttempts: number;
  /** Is account at risk */
  isAtRisk: boolean;
  /** Risk level (low, medium, high) */
  riskLevel: 'low' | 'medium' | 'high';
  /** Last successful attempt */
  lastSuccess?: Date;
  /** Last failed attempt */
  lastFailed?: Date;
  /** Suspicious indicators detected */
  suspiciousIndicators?: SuspiciousIndicator[];
}

/**
 * Login Attempt Action
 * Action to take based on login attempt
 */
export interface LoginAttemptAction {
  /** Action type */
  type: 'allow' | 'block' | 'challenge' | 'lockout' | 'mfa_required';
  /** Reason for action */
  reason: string;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Login Attempt Rate Limit
 * Rate limit information
 */
export interface LoginAttemptRateLimit {
  /** Current attempts */
  attempts: number;
  /** Maximum allowed attempts */
  maxAttempts: number;
  /** Time window in seconds */
  window: number;
  /** Remaining attempts */
  remaining: number;
  /** Reset time in seconds */
  resetIn: number;
  /** Is rate limited */
  isLimited: boolean;
  /** Configuration values used */
  config: {
    maxFailedAttempts: number;
    attemptWindow: number;
    maxConcurrentPerIp: number;
    maxConcurrentPerUser: number;
  };
}

/**
 * Login Attempt Security Check
 * Security check result for a login attempt
 */
export interface LoginAttemptSecurityCheck {
  /** Is login allowed */
  allowed: boolean;
  /** Security score (0-100) */
  securityScore: number;
  /** Is IP trusted */
  isIpTrusted: boolean;
  /** Is device trusted */
  isDeviceTrusted: boolean;
  /** Is location trusted */
  isLocationTrusted: boolean;
  /** Suspicious indicators found */
  suspiciousIndicators: SuspiciousIndicator[];
  /** Recommended action */
  recommendedAction: LoginAttemptAction;
  /** Risk assessment */
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
  /** Configuration values used */
  config: {
    suspiciousThreshold: number;
    maxFailedAttempts: number;
    lockoutDuration: number;
    attemptWindow: number;
  };
}

/**
 * Login Attempt Monitoring
 * Real-time monitoring data for login attempts
 */
export interface LoginAttemptMonitoring {
  /** Total attempts in the last minute */
  attemptsLastMinute: number;
  /** Failed attempts in the last minute */
  failedLastMinute: number;
  /** Unique IPs in the last minute */
  uniqueIpsLastMinute: number;
  /** Attempts by country */
  byCountry: Record<string, number>;
  /** Current attack detected */
  attackDetected: boolean;
  /** Attack type (if detected) */
  attackType?: 'bruteforce' | 'credential_stuffing' | 'distributed';
  /** Alert level */
  alertLevel: 'info' | 'warning' | 'critical';
  /** Threshold values used */
  thresholds: {
    maxAttemptsPerIpPerDay: number;
    maxAttemptsPerUserPerDay: number;
    maxUniqueIpsPerUserPerDay: number;
    suspiciousThreshold: number;
  };
}

/**
 * Login Attempt Configuration Values
 * All configuration values as a single interface
 */
export interface LoginAttemptConfigValues {
  maxFailedAttempts: number;
  lockoutDuration: number;
  attemptWindow: number;
  maxConcurrentPerIp: number;
  maxConcurrentPerUser: number;
  attemptResetTime: number;
  trustIpAfterSuccesses: number;
  trustedIpExpiry: number;
  maxAttemptsPerIpPerDay: number;
  maxAttemptsPerUserPerDay: number;
  maxUniqueIpsPerUserPerDay: number;
  suspiciousThreshold: number;
}
