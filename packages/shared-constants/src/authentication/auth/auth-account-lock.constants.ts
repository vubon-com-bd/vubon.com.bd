// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum number of failed login attempts before account lock
 */
export const ACCOUNT_LOCK_MAX_ATTEMPTS = 5;

/**
 * Account lock duration in minutes (30 minutes)
 */
export const ACCOUNT_LOCK_DURATION = 30;

/**
 * Time after which the attempt counter resets in minutes (15 minutes)
 */
export const ACCOUNT_LOCK_RESET_TIME = 15;

/**
 * Number of times account needs to be locked before permanent lock (3 times)
 */
export const ACCOUNT_LOCK_PERMANENT_THRESHOLD = 3;

/**
 * Whether to send notification when account is locked
 */
export const ACCOUNT_LOCK_NOTIFICATION = true;

/**
 * Account lock reasons enum
 */
export const ACCOUNT_LOCK_REASON = {
  TOO_MANY_ATTEMPTS: 'too_many_attempts',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  ADMIN_ACTION: 'admin_action',
  SECURITY_POLICY: 'security_policy',
  PERMANENT_LOCK: 'permanent_lock',
} as const;

/**
 * Too many attempts reason
 */
export const ACCOUNT_LOCK_REASON_TOO_MANY_ATTEMPTS = ACCOUNT_LOCK_REASON.TOO_MANY_ATTEMPTS;

/**
 * Suspicious activity reason
 */
export const ACCOUNT_LOCK_REASON_SUSPICIOUS_ACTIVITY = ACCOUNT_LOCK_REASON.SUSPICIOUS_ACTIVITY;

/**
 * Admin action reason
 */
export const ACCOUNT_LOCK_REASON_ADMIN_ACTION = ACCOUNT_LOCK_REASON.ADMIN_ACTION;

/**
 * Security policy reason
 */
export const ACCOUNT_LOCK_REASON_SECURITY_POLICY = ACCOUNT_LOCK_REASON.SECURITY_POLICY;

/**
 * Permanent lock reason
 */
export const ACCOUNT_LOCK_REASON_PERMANENT_LOCK = ACCOUNT_LOCK_REASON.PERMANENT_LOCK;

/**
 * Account lock configuration
 */
export const ACCOUNT_LOCK_CONFIG = {
  MAX_ATTEMPTS: ACCOUNT_LOCK_MAX_ATTEMPTS,
  LOCK_DURATION: ACCOUNT_LOCK_DURATION,
  RESET_TIME: ACCOUNT_LOCK_RESET_TIME,
  PERMANENT_THRESHOLD: ACCOUNT_LOCK_PERMANENT_THRESHOLD,
  NOTIFICATION: ACCOUNT_LOCK_NOTIFICATION,
} as const;

/**
 * Type for account lock reason
 */
export type AccountLockReason = (typeof ACCOUNT_LOCK_REASON)[keyof typeof ACCOUNT_LOCK_REASON];

/**
 * Type for account lock configuration
 */
export type AccountLockConfig = typeof ACCOUNT_LOCK_CONFIG;
