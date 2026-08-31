/**
 * Authentication Login Attempt Constants
 * Login attempt tracking, rate limiting, and security constants
 */

// ============================================================
// AUTH LOGIN ATTEMPT STATUS
// ============================================================
export const AUTH_LOGIN_ATTEMPT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
  LOCKED: 'locked',
  MFA_REQUIRED: 'mfa_required',
  CANCELLED: 'cancelled',
  TIMEOUT: 'timeout',
  SUSPICIOUS: 'suspicious',
} as const;

export type AuthLoginAttemptStatus =
  (typeof AUTH_LOGIN_ATTEMPT_STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT_STATUS];

// ============================================================
// AUTH LOGIN ATTEMPT CONFIG
// ============================================================
export const AUTH_LOGIN_ATTEMPT_CONFIG = {
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900,
  ATTEMPT_WINDOW: 900,
  MAX_CONCURRENT_PER_IP: 10,
  MAX_CONCURRENT_PER_USER: 3,
  ATTEMPT_RESET_TIME: 3600,
  TRUST_IP_AFTER_SUCCESSES: 3,
  TRUSTED_IP_EXPIRY: 2592000,
  MAX_ATTEMPTS_PER_IP_PER_DAY: 50,
  MAX_ATTEMPTS_PER_USER_PER_DAY: 20,
  MAX_UNIQUE_IPS_PER_USER_PER_DAY: 5,
  SUSPICIOUS_THRESHOLD: 3,
} as const;

export type AuthLoginAttemptConfig =
  (typeof AUTH_LOGIN_ATTEMPT_CONFIG)[keyof typeof AUTH_LOGIN_ATTEMPT_CONFIG];

// ============================================================
// AUTH LOGIN ATTEMPT ERRORS
// ============================================================
export const AUTH_LOGIN_ATTEMPT_ERRORS = {
  ACCOUNT_LOCKED: 'Account is locked due to too many failed login attempts. Please try again later',
  IP_LOCKED: 'Too many login attempts from this IP address. Please try again later',
  USER_LOCKED: 'Too many login attempts for this account. Please try again later',
  ATTEMPT_BLOCKED: 'Login attempt blocked due to security rules',
  SUSPICIOUS_DETECTED: 'Suspicious login attempt detected. Please verify your identity',
  INVALID_CREDENTIALS: 'Invalid email or password',
  MAX_CONCURRENT_EXCEEDED: 'Maximum concurrent login attempts exceeded',
  ATTEMPT_TIMEOUT: 'Login attempt timed out. Please try again',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please wait before trying again',
  MFA_REQUIRED: 'MFA verification is required to complete login',
  DEVICE_NOT_RECOGNIZED: 'Device not recognized. Please verify your identity',
  UNUSUAL_LOCATION: 'Login attempt from unusual location detected',
} as const;

export type AuthLoginAttemptError =
  (typeof AUTH_LOGIN_ATTEMPT_ERRORS)[keyof typeof AUTH_LOGIN_ATTEMPT_ERRORS];

// ============================================================
// AUTH LOGIN ATTEMPT SUCCESS
// ============================================================
export const AUTH_LOGIN_ATTEMPT_SUCCESS = {
  SUCCESS: 'Login successful',
  MFA_VERIFIED: 'Login successful with MFA verification',
  IP_TRUSTED: 'IP address marked as trusted',
} as const;

export type AuthLoginAttemptSuccess =
  (typeof AUTH_LOGIN_ATTEMPT_SUCCESS)[keyof typeof AUTH_LOGIN_ATTEMPT_SUCCESS];

// ============================================================
// AUTH LOGIN ATTEMPT STATUS MESSAGES
// ============================================================
export const AUTH_LOGIN_ATTEMPT_STATUS_MESSAGES: Record<AuthLoginAttemptStatus, string> = {
  [AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS]: 'Login attempt was successful',
  [AUTH_LOGIN_ATTEMPT_STATUS.FAILED]: 'Login attempt failed',
  [AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED]: 'Login attempt was blocked',
  [AUTH_LOGIN_ATTEMPT_STATUS.LOCKED]: 'Account is locked due to failed attempts',
  [AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED]: 'MFA verification required',
  [AUTH_LOGIN_ATTEMPT_STATUS.CANCELLED]: 'Login attempt was cancelled',
  [AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT]: 'Login attempt timed out',
  [AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS]: 'Suspicious login attempt detected',
} as const;

// ============================================================
// AUTH LOGIN ATTEMPT REASONS
// ============================================================
export const AUTH_LOGIN_ATTEMPT_REASONS = {
  INVALID_CREDENTIALS: 'invalid_credentials',
  ACCOUNT_NOT_FOUND: 'account_not_found',
  ACCOUNT_LOCKED: 'account_locked',
  ACCOUNT_INACTIVE: 'account_inactive',
  ACCOUNT_BLOCKED: 'account_blocked',
  ACCOUNT_SUSPENDED: 'account_suspended',
  IP_BLOCKED: 'ip_blocked',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  DEVICE_NOT_RECOGNIZED: 'device_not_recognized',
  LOCATION_MISMATCH: 'location_mismatch',
  USER_AGENT_MISMATCH: 'user_agent_mismatch',
  MFA_FAILED: 'mfa_failed',
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
  CONCURRENT_SESSION_LIMIT: 'concurrent_session_limit',
} as const;

export type AuthLoginAttemptReason =
  (typeof AUTH_LOGIN_ATTEMPT_REASONS)[keyof typeof AUTH_LOGIN_ATTEMPT_REASONS];

// ============================================================
// AUTH LOGIN ATTEMPT REASON MESSAGES
// ============================================================
export const AUTH_LOGIN_ATTEMPT_REASON_MESSAGES: Record<AuthLoginAttemptReason, string> = {
  [AUTH_LOGIN_ATTEMPT_REASONS.INVALID_CREDENTIALS]: 'Invalid email or password',
  [AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_NOT_FOUND]: 'Account does not exist',
  [AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_LOCKED]: 'Account is locked',
  [AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_INACTIVE]: 'Account is inactive',
  [AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_BLOCKED]: 'Account is blocked',
  [AUTH_LOGIN_ATTEMPT_REASONS.ACCOUNT_SUSPENDED]: 'Account is suspended',
  [AUTH_LOGIN_ATTEMPT_REASONS.IP_BLOCKED]: 'IP address is blocked',
  [AUTH_LOGIN_ATTEMPT_REASONS.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [AUTH_LOGIN_ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY]: 'Suspicious activity detected',
  [AUTH_LOGIN_ATTEMPT_REASONS.DEVICE_NOT_RECOGNIZED]: 'Device not recognized',
  [AUTH_LOGIN_ATTEMPT_REASONS.LOCATION_MISMATCH]: 'Location mismatch detected',
  [AUTH_LOGIN_ATTEMPT_REASONS.USER_AGENT_MISMATCH]: 'User agent mismatch detected',
  [AUTH_LOGIN_ATTEMPT_REASONS.MFA_FAILED]: 'MFA verification failed',
  [AUTH_LOGIN_ATTEMPT_REASONS.TOO_MANY_ATTEMPTS]: 'Too many login attempts',
  [AUTH_LOGIN_ATTEMPT_REASONS.CONCURRENT_SESSION_LIMIT]: 'Concurrent session limit exceeded',
} as const;

// ============================================================
// AUTH SUSPICIOUS INDICATORS
// ============================================================
export const AUTH_SUSPICIOUS_INDICATORS = {
  NEW_DEVICE: 'new_device',
  NEW_LOCATION: 'new_location',
  NEW_IP: 'new_ip',
  UNUSUAL_TIME: 'unusual_time',
  RAPID_ATTEMPTS: 'rapid_attempts',
  FAILED_THEN_SUCCESS: 'failed_then_success',
  MULTIPLE_LOCATIONS: 'multiple_locations',
  OUTDATED_USER_AGENT: 'outdated_user_agent',
  MISMATCHED_USER_AGENT: 'mismatched_user_agent',
} as const;

export type AuthSuspiciousIndicator =
  (typeof AUTH_SUSPICIOUS_INDICATORS)[keyof typeof AUTH_SUSPICIOUS_INDICATORS];

// ============================================================
// SUCCESSFUL AUTH LOGIN STATUSES
// ============================================================
export const SUCCESSFUL_AUTH_LOGIN_STATUSES: AuthLoginAttemptStatus[] = [
  AUTH_LOGIN_ATTEMPT_STATUS.SUCCESS,
  AUTH_LOGIN_ATTEMPT_STATUS.MFA_REQUIRED,
] as const;

// ============================================================
// FAILED AUTH LOGIN STATUSES
// ============================================================
export const FAILED_AUTH_LOGIN_STATUSES: AuthLoginAttemptStatus[] = [
  AUTH_LOGIN_ATTEMPT_STATUS.FAILED,
  AUTH_LOGIN_ATTEMPT_STATUS.BLOCKED,
  AUTH_LOGIN_ATTEMPT_STATUS.LOCKED,
  AUTH_LOGIN_ATTEMPT_STATUS.TIMEOUT,
  AUTH_LOGIN_ATTEMPT_STATUS.SUSPICIOUS,
] as const;

// ============================================================
// AUTH LOGIN ATTEMPT MAIN OBJECT
// ============================================================
export const authLoginAttempt = {
  STATUS: AUTH_LOGIN_ATTEMPT_STATUS,
  CONFIG: AUTH_LOGIN_ATTEMPT_CONFIG,
  ERRORS: AUTH_LOGIN_ATTEMPT_ERRORS,
  SUCCESS: AUTH_LOGIN_ATTEMPT_SUCCESS,
  STATUS_MESSAGES: AUTH_LOGIN_ATTEMPT_STATUS_MESSAGES,
  REASONS: AUTH_LOGIN_ATTEMPT_REASONS,
  REASON_MESSAGES: AUTH_LOGIN_ATTEMPT_REASON_MESSAGES,
  SUSPICIOUS_INDICATORS: AUTH_SUSPICIOUS_INDICATORS,
  SUCCESSFUL_STATUSES: SUCCESSFUL_AUTH_LOGIN_STATUSES,
  FAILED_STATUSES: FAILED_AUTH_LOGIN_STATUSES,
} as const;

export type AuthLoginAttempt = typeof authLoginAttempt;

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function isValidAuthLoginAttemptStatus(status: string): status is AuthLoginAttemptStatus {
  return Object.values(AUTH_LOGIN_ATTEMPT_STATUS).includes(status as AuthLoginAttemptStatus);
}

export function isSuccessfulAuthLoginAttempt(status: AuthLoginAttemptStatus): boolean {
  return SUCCESSFUL_AUTH_LOGIN_STATUSES.includes(status);
}

export function isFailedAuthLoginAttempt(status: AuthLoginAttemptStatus): boolean {
  return FAILED_AUTH_LOGIN_STATUSES.includes(status);
}

export function getAuthLoginAttemptStatusMessage(status: AuthLoginAttemptStatus): string {
  return AUTH_LOGIN_ATTEMPT_STATUS_MESSAGES[status] || 'Unknown login attempt status';
}

export function isValidAuthLoginAttemptReason(reason: string): reason is AuthLoginAttemptReason {
  return Object.values(AUTH_LOGIN_ATTEMPT_REASONS).includes(reason as AuthLoginAttemptReason);
}

export function getAuthLoginAttemptReasonMessage(reason: AuthLoginAttemptReason): string {
  return AUTH_LOGIN_ATTEMPT_REASON_MESSAGES[reason] || 'Unknown reason';
}

export function isValidAuthSuspiciousIndicator(
  indicator: string
): indicator is AuthSuspiciousIndicator {
  return Object.values(AUTH_SUSPICIOUS_INDICATORS).includes(indicator as AuthSuspiciousIndicator);
}

export function shouldLockAuthAccount(
  failedAttempts: number,
  config: typeof AUTH_LOGIN_ATTEMPT_CONFIG
): boolean {
  return failedAttempts >= config.MAX_FAILED_ATTEMPTS;
}

export function isAuthLockoutExpired(
  lockedAt: Date,
  config: typeof AUTH_LOGIN_ATTEMPT_CONFIG
): boolean {
  const now = Date.now();
  const lockoutAge = (now - lockedAt.getTime()) / 1000;
  return lockoutAge >= config.LOCKOUT_DURATION;
}

export function getAuthLockoutRemainingTime(
  lockedAt: Date,
  config: typeof AUTH_LOGIN_ATTEMPT_CONFIG
): number {
  const now = Date.now();
  const lockoutAge = (now - lockedAt.getTime()) / 1000;
  const remaining = config.LOCKOUT_DURATION - lockoutAge;
  return Math.max(0, remaining);
}

export function formatAuthLockoutRemainingTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

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

export function isAuthLoginSuspicious(indicators: AuthSuspiciousIndicator[]): boolean {
  return indicators.length >= AUTH_LOGIN_ATTEMPT_CONFIG.SUSPICIOUS_THRESHOLD;
}

export function isAuthLoginAttemptValid(attemptedAt: Date, maxAge: number = 3600): boolean {
  const now = Date.now();
  const age = (now - attemptedAt.getTime()) / 1000;
  return age <= maxAge;
}
