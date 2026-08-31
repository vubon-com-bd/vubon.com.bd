/**
 * Authentication Login Attempt Schema
 * Zod schemas for login attempt tracking, history, and analysis
 */

import { z } from 'zod';
import {
  AUTH_LOGIN_ATTEMPT_STATUS,
  AUTH_LOGIN_ATTEMPT_REASONS,
  AUTH_SUSPICIOUS_INDICATORS,
  AUTH_LOGIN_ATTEMPT_CONFIG,
  AUTH_LOGIN_ATTEMPT_STATUS_MESSAGES,
  AUTH_LOGIN_ATTEMPT_REASON_MESSAGES,
  type AuthLoginAttemptStatus,
  type AuthLoginAttemptReason,
  type AuthSuspiciousIndicator,
} from '@vubon/shared-constants';
import { idSchema, timestampSchema, jsonObjectSchema } from '../common/core-primitives.schema';

// ============================================================
// AUTH LOGIN ATTEMPT STATUS SCHEMAS
// ============================================================

/**
 * Auth login attempt status schema
 */
export const authLoginAttemptStatusSchema = z.enum([
  AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS,
  AUTH_LOGIN_ATTEMPT_STATUS.FAILED,
  AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED,
  AUTH_LOGIN_ATTEMPT_STATUS.LOCKED,
  AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED,
  AUTH_LOGIN_ATTEMPT_STATUS.CANCELLED,
  AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT,
  AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS,
]);

/**
 * Auth login attempt reason schema
 */
export const authLoginAttemptReasonSchema = z.enum([
  AUTH_LOGIN_ATTEMPT_REASONS.INVALID_CREDENTIALS,
  AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_NOT_FOUND,
  AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_LOCKED,
  AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_INACTIVE,
  AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_BLOCKED,
  AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_SUSPENDED,
  AUTH_LOGIN_ATTEMPT_REASONS.IP_BLOCKED,
  AUTH_LOGIN_ATTEMPT_REASONS.RATE_LIMIT_EXCEEDED,
  AUTH_LOGIN_ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY,
  AUTH_LOGIN_ATTEMPT_REASONS.DEVICE_NOT_RECOGNIZED,
  AUTH_LOGIN_ATTEMPT_REASONS.LOCATION_MISMATCH,
  AUTH_LOGIN_ATTEMPT_REASONS.USER_AGENT_MISMATCH,
  AUTH_LOGIN_ATTEMPT_REASONS.MFA_FAILED,
  AUTH_LOGIN_ATTEMPT_REASONS.TOO_MANY_ATTEMPTS,
  AUTH_LOGIN_ATTEMPT_REASONS.CONCURRENT_SESSION_LIMIT,
]);

/**
 * Auth suspicious indicator schema
 */
export const authSuspiciousIndicatorSchema = z.enum([
  AUTH_SUSPICIOUS_INDICATORS.NEW_DEVICE,
  AUTH_SUSPICIOUS_INDICATORS.NEW_LOCATION,
  AUTH_SUSPICIOUS_INDICATORS.NEW_IP,
  AUTH_SUSPICIOUS_INDICATORS.UNUSUAL_TIME,
  AUTH_SUSPICIOUS_INDICATORS.RAPID_ATTEMPTS,
  AUTH_SUSPICIOUS_INDICATORS.FAILED_THEN_SUCCESS,
  AUTH_SUSPICIOUS_INDICATORS.MULTIPLE_LOCATIONS,
  AUTH_SUSPICIOUS_INDICATORS.OUTDATED_USER_AGENT,
  AUTH_SUSPICIOUS_INDICATORS.MISMATCHED_USER_AGENT,
]);

// ============================================================
// AUTH LOGIN ATTEMPT RECORD SCHEMA
// ============================================================

/**
 * Auth login attempt schema
 */
export const authLoginAttemptSchema = z.object({
  id: idSchema,
  userId: idSchema.optional(),
  identifier: z.string().min(1),
  status: authLoginAttemptStatusSchema,
  reason: authLoginAttemptReasonSchema.optional(),
  ipAddress: z.string().ip(),
  userAgent: z.string().min(1),
  deviceFingerprint: z.string().optional(),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  suspiciousIndicators: z.array(authSuspiciousIndicatorSchema).optional(),
  isSuspicious: z.boolean().default(false),
  attemptedAt: timestampSchema,
  responseTime: z.number().int().optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH LOGIN ATTEMPT REQUEST SCHEMA
// ============================================================

/**
 * Auth login attempt request schema
 */
export const authLoginAttemptRequestSchema = z.object({
  identifier: z.string().min(1),
  ipAddress: z.string().ip(),
  userAgent: z.string().min(1),
  deviceFingerprint: z.string().optional(),
  location: z
    .object({
      country: z.string().optional(),
      city: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// AUTH LOGIN ATTEMPT RESPONSE SCHEMA
// ============================================================

/**
 * Auth login attempt response schema
 */
export const authLoginAttemptResponseSchema = z.object({
  success: z.boolean(),
  status: authLoginAttemptStatusSchema,
  attempt: authLoginAttemptSchema.optional(),
  error: z.string().optional(),
  remainingLockoutSeconds: z.number().int().min(0).optional(),
  mfaRequired: z.boolean().optional(),
});

// ============================================================
// AUTH LOGIN ATTEMPT FILTER SCHEMA
// ============================================================

/**
 * Auth login attempt filter schema
 */
export const authLoginAttemptFilterSchema = z.object({
  userId: idSchema.optional(),
  identifier: z.string().optional(),
  status: z.union([authLoginAttemptStatusSchema, z.array(authLoginAttemptStatusSchema)]).optional(),
  reason: z.union([authLoginAttemptReasonSchema, z.array(authLoginAttemptReasonSchema)]).optional(),
  ipAddress: z.string().ip().optional(),
  suspiciousOnly: z.boolean().optional(),
  dateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  successfulOnly: z.boolean().optional(),
  failedOnly: z.boolean().optional(),
});

// ============================================================
// AUTH LOGIN ATTEMPT STATISTICS SCHEMA
// ============================================================

/**
 * Auth login attempt statistics schema
 */
export const authLoginAttemptStatisticsSchema = z.object({
  totalAttempts: z.number().int().min(0),
  successfulAttempts: z.number().int().min(0),
  failedAttempts: z.number().int().min(0),
  suspiciousAttempts: z.number().int().min(0),
  successRate: z.number().min(0).max(1),
  statusCounts: z.record(authLoginAttemptStatusSchema, z.number().int().min(0)),
  reasonCounts: z.record(authLoginAttemptReasonSchema, z.number().int().min(0)),
  attemptsByHour: z.record(z.number().int().min(0).max(23), z.number().int().min(0)),
  uniqueIPs: z.number().int().min(0),
  uniqueUsers: z.number().int().min(0),
  period: z.object({
    start: z.date(),
    end: z.date(),
  }),
});

// ============================================================
// AUTH USER LOGIN SUMMARY SCHEMA
// ============================================================

/**
 * Auth user login summary schema
 */
export const authUserLoginSummarySchema = z.object({
  userId: idSchema,
  totalAttempts: z.number().int().min(0),
  recentFailedAttempts: z.number().int().min(0),
  isAtRisk: z.boolean(),
  resetTimeRemaining: z.number().int().min(0).optional(),
  lastAttempt: authLoginAttemptSchema.optional(),
  recentAttempts: z.array(authLoginAttemptSchema),
});

// ============================================================
// TYPE INFERENCES (Zod থেকে টাইপ বের করা)
// ============================================================

export type AuthLoginAttempt = z.infer<typeof authLoginAttemptSchema>;
export type AuthLoginAttemptRequest = z.infer<typeof authLoginAttemptRequestSchema>;
export type AuthLoginAttemptResponse = z.infer<typeof authLoginAttemptResponseSchema>;
export type AuthLoginAttemptFilter = z.infer<typeof authLoginAttemptFilterSchema>;
export type AuthLoginAttemptStatistics = z.infer<typeof authLoginAttemptStatisticsSchema>;
export type AuthUserLoginSummary = z.infer<typeof authUserLoginSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if login attempt status is valid
 */
export function isValidAuthLoginAttemptStatus(status: string): status is AuthLoginAttemptStatus {
  return Object.values(AUTH_LOGIN_ATTEMPT_STATUS).includes(status as AuthLoginAttemptStatus);
}

/**
 * Check if login attempt reason is valid
 */
export function isValidAuthLoginAttemptReason(reason: string): reason is AuthLoginAttemptReason {
  return Object.values(AUTH_LOGIN_ATTEMPT_REASONS).includes(reason as AuthLoginAttemptReason);
}

/**
 * Check if suspicious indicator is valid
 */
export function isValidAuthSuspiciousIndicator(
  indicator: string
): indicator is AuthSuspiciousIndicator {
  return Object.values(AUTH_SUSPICIOUS_INDICATORS).includes(indicator as AuthSuspiciousIndicator);
}

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
 * Get login attempt status label
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
 * Get login attempt status message
 */
export function getAuthLoginAttemptStatusMessage(status: AuthLoginAttemptStatus): string {
  return AUTH_LOGIN_ATTEMPT_STATUS_MESSAGES[status] || 'Unknown login attempt status';
}

/**
 * Get login attempt reason message
 */
export function getAuthLoginAttemptReasonMessage(reason: AuthLoginAttemptReason): string {
  return AUTH_LOGIN_ATTEMPT_REASON_MESSAGES[reason] || 'Unknown reason';
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
  maxFailedAttempts: number = AUTH_LOGIN_ATTEMPT_CONFIG.MAX_FAILED_ATTEMPTS
): boolean {
  return failedAttempts >= maxFailedAttempts;
}

/**
 * Calculate remaining lockout time
 */
export function calculateAuthLockoutRemainingTime(
  lockedAt: Date,
  lockoutDurationSeconds: number = AUTH_LOGIN_ATTEMPT_CONFIG.LOCKOUT_DURATION
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
export function isAuthAttemptWithinWindow(
  attemptedAt: Date,
  windowSeconds: number = AUTH_LOGIN_ATTEMPT_CONFIG.ATTEMPT_WINDOW
): boolean {
  const now = Date.now();
  const age = (now - attemptedAt.getTime()) / 1000;
  return age <= windowSeconds;
}

/**
 * Check if login attempt is suspicious
 */
export function isAuthLoginSuspicious(indicators: AuthSuspiciousIndicator[]): boolean {
  return indicators.length >= AUTH_LOGIN_ATTEMPT_CONFIG.SUSPICIOUS_THRESHOLD;
}

/**
 * Get suspicious indicators from parameters
 */
export function getAuthSuspiciousIndicators(params: {
  isNewDevice?: boolean;
  isNewLocation?: boolean;
  isNewIp?: boolean;
  isUnusualTime?: boolean;
  hasRapidAttempts?: boolean;
  hasFailedThenSuccess?: boolean;
  hasMultipleLocations?: boolean;
  hasOutdatedUserAgent?: boolean;
  hasMismatchedUserAgent?: boolean;
}): AuthSuspiciousIndicator[] {
  const indicators: AuthSuspiciousIndicator[] = [];

  if (params.isNewDevice) indicators.push(AUTH_SUSPICIOUS_INDICATORS.NEW_DEVICE);
  if (params.isNewLocation) indicators.push(AUTH_SUSPICIOUS_INDICATORS.NEW_LOCATION);
  if (params.isNewIp) indicators.push(AUTH_SUSPICIOUS_INDICATORS.NEW_IP);
  if (params.isUnusualTime) indicators.push(AUTH_SUSPICIOUS_INDICATORS.UNUSUAL_TIME);
  if (params.hasRapidAttempts) indicators.push(AUTH_SUSPICIOUS_INDICATORS.RAPID_ATTEMPTS);
  if (params.hasFailedThenSuccess) indicators.push(AUTH_SUSPICIOUS_INDICATORS.FAILED_THEN_SUCCESS);
  if (params.hasMultipleLocations) indicators.push(AUTH_SUSPICIOUS_INDICATORS.MULTIPLE_LOCATIONS);
  if (params.hasOutdatedUserAgent) indicators.push(AUTH_SUSPICIOUS_INDICATORS.OUTDATED_USER_AGENT);
  if (params.hasMismatchedUserAgent)
    indicators.push(AUTH_SUSPICIOUS_INDICATORS.MISMATCHED_USER_AGENT);

  return indicators;
}

/**
 * Check if login attempt is valid (not too old)
 */
export function isAuthLoginAttemptValid(attemptedAt: Date, maxAge: number = 3600): boolean {
  const now = Date.now();
  const age = (now - attemptedAt.getTime()) / 1000;
  return age <= maxAge;
}
