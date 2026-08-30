/**
 * Authentication Login Attempt Constants
 * Login attempt tracking, rate limiting, and security constants
 */

/**
 * Login Attempt Status
 * Status of a login attempt
 */
export const LOGIN_ATTEMPT_STATUS = {
  /** Login attempt was successful */
  SUCCESS: 'success',
  /** Login attempt failed */
  FAILED: 'failed',
  /** Login attempt was blocked */
  BLOCKED: 'blocked',
  /** Login attempt was locked due to too many failures */
  LOCKED: 'locked',
  /** Login attempt requires MFA */
  MFA_REQUIRED: 'mfa_required',
  /** Login attempt was cancelled by user */
  CANCELLED: 'cancelled',
  /** Login attempt timed out */
  TIMEOUT: 'timeout',
  /** Login attempt is suspicious */
  SUSPICIOUS: 'suspicious',
} as const;

export type LoginAttemptStatus = (typeof LOGIN_ATTEMPT_STATUS)[keyof typeof LOGIN_ATTEMPT_STATUS];

/**
 * Login Attempt Configuration
 * Default configuration values for login attempt tracking
 */
export const LOGIN_ATTEMPT_CONFIG = {
  /** Maximum failed login attempts before lockout */
  MAX_FAILED_ATTEMPTS: 5,
  /** Lockout duration in seconds (15 minutes) */
  LOCKOUT_DURATION: 900,
  /** Time window for counting attempts in seconds (15 minutes) */
  ATTEMPT_WINDOW: 900,
  /** Maximum concurrent login attempts per IP */
  MAX_CONCURRENT_PER_IP: 10,
  /** Maximum concurrent login attempts per user */
  MAX_CONCURRENT_PER_USER: 3,
  /** Time in seconds before resetting attempt count */
  ATTEMPT_RESET_TIME: 3600, // 1 hour
  /** Number of successful logins to trust an IP */
  TRUST_IP_AFTER_SUCCESSES: 3,
  /** Time in seconds to remember trusted IP (30 days) */
  TRUSTED_IP_EXPIRY: 2592000,
  /** Maximum login attempts per IP per day */
  MAX_ATTEMPTS_PER_IP_PER_DAY: 50,
  /** Maximum login attempts per user per day */
  MAX_ATTEMPTS_PER_USER_PER_DAY: 20,
  /** Maximum unique IPs per user per day */
  MAX_UNIQUE_IPS_PER_USER_PER_DAY: 5,
  /** Suspicious login threshold */
  SUSPICIOUS_THRESHOLD: 3,
} as const;

export type LoginAttemptConfig = (typeof LOGIN_ATTEMPT_CONFIG)[keyof typeof LOGIN_ATTEMPT_CONFIG];

/**
 * Login Attempt Error Messages
 * Error messages for login attempt failures
 */
export const LOGIN_ATTEMPT_ERRORS = {
  /** Account locked due to too many failed attempts */
  ACCOUNT_LOCKED: 'Account is locked due to too many failed login attempts. Please try again later',
  /** Too many login attempts for this IP */
  IP_LOCKED: 'Too many login attempts from this IP address. Please try again later',
  /** Too many login attempts for this user */
  USER_LOCKED: 'Too many login attempts for this account. Please try again later',
  /** Login attempt blocked by security rules */
  ATTEMPT_BLOCKED: 'Login attempt blocked due to security rules',
  /** Suspicious login attempt detected */
  SUSPICIOUS_DETECTED: 'Suspicious login attempt detected. Please verify your identity',
  /** Invalid credentials provided */
  INVALID_CREDENTIALS: 'Invalid email or password',
  /** Maximum concurrent logins exceeded */
  MAX_CONCURRENT_EXCEEDED: 'Maximum concurrent login attempts exceeded',
  /** Login attempt timed out */
  ATTEMPT_TIMEOUT: 'Login attempt timed out. Please try again',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded. Please wait before trying again',
  /** MFA required for login */
  MFA_REQUIRED: 'MFA verification is required to complete login',
  /** Device not recognized */
  DEVICE_NOT_RECOGNIZED: 'Device not recognized. Please verify your identity',
  /** Login from unusual location */
  UNUSUAL_LOCATION: 'Login attempt from unusual location detected',
} as const;

export type LoginAttemptError = (typeof LOGIN_ATTEMPT_ERRORS)[keyof typeof LOGIN_ATTEMPT_ERRORS];

/**
 * Login Attempt Success Messages
 * Success messages for login attempts
 */
export const LOGIN_ATTEMPT_SUCCESS = {
  SUCCESS: 'Login successful',
  MFA_VERIFIED: 'Login successful with MFA verification',
  IP_TRUSTED: 'IP address marked as trusted',
} as const;

export type LoginAttemptSuccess =
  (typeof LOGIN_ATTEMPT_SUCCESS)[keyof typeof LOGIN_ATTEMPT_SUCCESS];

/**
 * Login Attempt Status Messages
 * Human-readable messages for each login attempt status
 */
export const LOGIN_ATTEMPT_STATUS_MESSAGES: Record<LoginAttemptStatus, string> = {
  [LOGIN_ATTEMPT_STATUS.SUCCESS]: 'Login attempt was successful',
  [LOGIN_ATTEMPT_STATUS.FAILED]: 'Login attempt failed',
  [LOGIN_ATTEMPT_STATUS.BLOCKED]: 'Login attempt was blocked',
  [LOGIN_ATTEMPT_STATUS.LOCKED]: 'Account is locked due to failed attempts',
  [LOGIN_ATTEMPT_STATUS.MFA_REQUIRED]: 'MFA verification required',
  [LOGIN_ATTEMPT_STATUS.CANCELLED]: 'Login attempt was cancelled',
  [LOGIN_ATTEMPT_STATUS.TIMEOUT]: 'Login attempt timed out',
  [LOGIN_ATTEMPT_STATUS.SUSPICIOUS]: 'Suspicious login attempt detected',
} as const;

/**
 * Login Attempt Reasons
 * Reasons for login attempt failures
 */
export const LOGIN_ATTEMPT_REASONS = {
  /** Invalid credentials (wrong email/password) */
  INVALID_CREDENTIALS: 'invalid_credentials',
  /** Account does not exist */
  ACCOUNT_NOT_FOUND: 'account_not_found',
  /** Account is locked */
  ACCOUNT_LOCKED: 'account_locked',
  /** Account is inactive */
  ACCOUNT_INACTIVE: 'account_inactive',
  /** Account is blocked */
  ACCOUNT_BLOCKED: 'account_blocked',
  /** Account is suspended */
  ACCOUNT_SUSPENDED: 'account_suspended',
  /** IP is blocked */
  IP_BLOCKED: 'ip_blocked',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
  /** Suspicious activity detected */
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  /** Device not recognized */
  DEVICE_NOT_RECOGNIZED: 'device_not_recognized',
  /** Location mismatch */
  LOCATION_MISMATCH: 'location_mismatch',
  /** User agent mismatch */
  USER_AGENT_MISMATCH: 'user_agent_mismatch',
  /** MFA verification failed */
  MFA_FAILED: 'mfa_failed',
  /** Too many attempts */
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
  /** Concurrent session limit exceeded */
  CONCURRENT_SESSION_LIMIT: 'concurrent_session_limit',
} as const;

export type LoginAttemptReason = (typeof LOGIN_ATTEMPT_REASONS)[keyof typeof LOGIN_ATTEMPT_REASONS];

/**
 * Login Attempt Reason Messages
 * Human-readable messages for each reason
 */
export const LOGIN_ATTEMPT_REASON_MESSAGES: Record<LoginAttemptReason, string> = {
  [LOGIN_ATTEMPT_REASONS.INVALID_CREDENTIALS]: 'Invalid email or password',
  [LOGIN_ATTEMPT_REASONS.ACCOUNT_NOT_FOUND]: 'Account does not exist',
  [LOGIN_ATTEMPT_REASONS.ACCOUNT_LOCKED]: 'Account is locked',
  [LOGIN_ATTEMPT_REASONS.ACCOUNT_INACTIVE]: 'Account is inactive',
  [LOGIN_ATTEMPT_REASONS.ACCOUNT_BLOCKED]: 'Account is blocked',
  [LOGIN_ATTEMPT_REASONS.ACCOUNT_SUSPENDED]: 'Account is suspended',
  [LOGIN_ATTEMPT_REASONS.IP_BLOCKED]: 'IP address is blocked',
  [LOGIN_ATTEMPT_REASONS.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
  [LOGIN_ATTEMPT_REASONS.SUSPICIOUS_ACTIVITY]: 'Suspicious activity detected',
  [LOGIN_ATTEMPT_REASONS.DEVICE_NOT_RECOGNIZED]: 'Device not recognized',
  [LOGIN_ATTEMPT_REASONS.LOCATION_MISMATCH]: 'Location mismatch detected',
  [LOGIN_ATTEMPT_REASONS.USER_AGENT_MISMATCH]: 'User agent mismatch detected',
  [LOGIN_ATTEMPT_REASONS.MFA_FAILED]: 'MFA verification failed',
  [LOGIN_ATTEMPT_REASONS.TOO_MANY_ATTEMPTS]: 'Too many login attempts',
  [LOGIN_ATTEMPT_REASONS.CONCURRENT_SESSION_LIMIT]: 'Concurrent session limit exceeded',
} as const;

/**
 * Suspicious Login Indicators
 * Indicators that may flag a login as suspicious
 */
export const SUSPICIOUS_INDICATORS = {
  /** Login from new device */
  NEW_DEVICE: 'new_device',
  /** Login from new location */
  NEW_LOCATION: 'new_location',
  /** Login from new IP */
  NEW_IP: 'new_ip',
  /** Login at unusual time */
  UNUSUAL_TIME: 'unusual_time',
  /** Rapid login attempts */
  RAPID_ATTEMPTS: 'rapid_attempts',
  /** Failed attempts followed by success */
  FAILED_THEN_SUCCESS: 'failed_then_success',
  /** Login from multiple locations simultaneously */
  MULTIPLE_LOCATIONS: 'multiple_locations',
  /** Login with outdated user agent */
  OUTDATED_USER_AGENT: 'outdated_user_agent',
  /** Login with mismatched user agent */
  MISMATCHED_USER_AGENT: 'mismatched_user_agent',
} as const;

export type SuspiciousIndicator =
  (typeof SUSPICIOUS_INDICATORS)[keyof typeof SUSPICIOUS_INDICATORS];

/**
 * Successful Login Statuses
 * Statuses that indicate a successful login
 */
export const SUCCESSFUL_LOGIN_STATUSES: LoginAttemptStatus[] = [
  LOGIN_ATTEMPT_STATUS.SUCCESS,
  LOGIN_ATTEMPT_STATUS.MFA_REQUIRED,
] as const;

/**
 * Failed Login Statuses
 * Statuses that indicate a failed login
 */
export const FAILED_LOGIN_STATUSES: LoginAttemptStatus[] = [
  LOGIN_ATTEMPT_STATUS.FAILED,
  LOGIN_ATTEMPT_STATUS.BLOCKED,
  LOGIN_ATTEMPT_STATUS.LOCKED,
  LOGIN_ATTEMPT_STATUS.TIMEOUT,
  LOGIN_ATTEMPT_STATUS.SUSPICIOUS,
] as const;

/**
 * Helper function to check if login attempt status is valid
 */
export function isValidLoginAttemptStatus(status: string): status is LoginAttemptStatus {
  return Object.values(LOGIN_ATTEMPT_STATUS).includes(status as LoginAttemptStatus);
}

/**
 * Helper function to check if login attempt is successful
 */
export function isSuccessfulLoginAttempt(status: LoginAttemptStatus): boolean {
  return SUCCESSFUL_LOGIN_STATUSES.includes(status);
}

/**
 * Helper function to check if login attempt is failed
 */
export function isFailedLoginAttempt(status: LoginAttemptStatus): boolean {
  return FAILED_LOGIN_STATUSES.includes(status);
}

/**
 * Helper function to get login attempt status message
 */
export function getLoginAttemptStatusMessage(status: LoginAttemptStatus): string {
  return LOGIN_ATTEMPT_STATUS_MESSAGES[status] || 'Unknown login attempt status';
}

/**
 * Helper function to check if login attempt reason is valid
 */
export function isValidLoginAttemptReason(reason: string): reason is LoginAttemptReason {
  return Object.values(LOGIN_ATTEMPT_REASONS).includes(reason as LoginAttemptReason);
}

/**
 * Helper function to get login attempt reason message
 */
export function getLoginAttemptReasonMessage(reason: LoginAttemptReason): string {
  return LOGIN_ATTEMPT_REASON_MESSAGES[reason] || 'Unknown reason';
}

/**
 * Helper function to check if suspicious indicator is valid
 */
export function isValidSuspiciousIndicator(indicator: string): indicator is SuspiciousIndicator {
  return Object.values(SUSPICIOUS_INDICATORS).includes(indicator as SuspiciousIndicator);
}

/**
 * Helper function to check if account should be locked
 * Based on failed attempts and configuration
 */
export function shouldLockAccount(
  failedAttempts: number,
  config: typeof LOGIN_ATTEMPT_CONFIG
): boolean {
  return failedAttempts >= config.MAX_FAILED_ATTEMPTS;
}

/**
 * Helper function to check if lockout has expired
 */
export function isLockoutExpired(lockedAt: Date, config: typeof LOGIN_ATTEMPT_CONFIG): boolean {
  const now = Date.now();
  const lockoutAge = (now - lockedAt.getTime()) / 1000;
  return lockoutAge >= config.LOCKOUT_DURATION;
}

/**
 * Helper function to get time remaining for lockout in seconds
 */
export function getLockoutRemainingTime(
  lockedAt: Date,
  config: typeof LOGIN_ATTEMPT_CONFIG
): number {
  const now = Date.now();
  const lockoutAge = (now - lockedAt.getTime()) / 1000;
  const remaining = config.LOCKOUT_DURATION - lockoutAge;
  return Math.max(0, remaining);
}

/**
 * Helper function to format lockout remaining time
 */
export function formatLockoutRemainingTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Helper function to get suspicious indicators for a login
 * Returns an array of suspicious indicators based on the context
 */
export function getSuspiciousIndicators(params: {
  isNewDevice?: boolean;
  isNewLocation?: boolean;
  isNewIp?: boolean;
  isUnusualTime?: boolean;
  hasRapidAttempts?: boolean;
  hasFailedThenSuccess?: boolean;
  hasMultipleLocations?: boolean;
  hasOutdatedUserAgent?: boolean;
  hasMismatchedUserAgent?: boolean;
}): SuspiciousIndicator[] {
  const indicators: SuspiciousIndicator[] = [];

  if (params.isNewDevice) indicators.push(SUSPICIOUS_INDICATORS.NEW_DEVICE);
  if (params.isNewLocation) indicators.push(SUSPICIOUS_INDICATORS.NEW_LOCATION);
  if (params.isNewIp) indicators.push(SUSPICIOUS_INDICATORS.NEW_IP);
  if (params.isUnusualTime) indicators.push(SUSPICIOUS_INDICATORS.UNUSUAL_TIME);
  if (params.hasRapidAttempts) indicators.push(SUSPICIOUS_INDICATORS.RAPID_ATTEMPTS);
  if (params.hasFailedThenSuccess) indicators.push(SUSPICIOUS_INDICATORS.FAILED_THEN_SUCCESS);
  if (params.hasMultipleLocations) indicators.push(SUSPICIOUS_INDICATORS.MULTIPLE_LOCATIONS);
  if (params.hasOutdatedUserAgent) indicators.push(SUSPICIOUS_INDICATORS.OUTDATED_USER_AGENT);
  if (params.hasMismatchedUserAgent) indicators.push(SUSPICIOUS_INDICATORS.MISMATCHED_USER_AGENT);

  return indicators;
}

/**
 * Helper function to check if login is suspicious based on indicators
 */
export function isLoginSuspicious(indicators: SuspiciousIndicator[]): boolean {
  return indicators.length >= LOGIN_ATTEMPT_CONFIG.SUSPICIOUS_THRESHOLD;
}

/**
 * Helper function to check if login attempt is valid (not expired)
 */
export function isLoginAttemptValid(attemptedAt: Date, maxAge: number = 3600): boolean {
  const now = Date.now();
  const age = (now - attemptedAt.getTime()) / 1000;
  return age <= maxAge;
}
