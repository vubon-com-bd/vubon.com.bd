// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Login attempt status enum
 */
export const LOGIN_ATTEMPT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
  SUSPICIOUS: 'suspicious',
  TIMEOUT: 'timeout',
  CANCELLED: 'cancelled',
} as const;

/**
 * Login attempt was successful
 */
export const LOGIN_ATTEMPT_STATUS_SUCCESS = LOGIN_ATTEMPT_STATUS.SUCCESS;

/**
 * Login attempt failed
 */
export const LOGIN_ATTEMPT_STATUS_FAILED = LOGIN_ATTEMPT_STATUS.FAILED;

/**
 * Login attempt was blocked
 */
export const LOGIN_ATTEMPT_STATUS_BLOCKED = LOGIN_ATTEMPT_STATUS.BLOCKED;

/**
 * Login attempt was marked as suspicious
 */
export const LOGIN_ATTEMPT_STATUS_SUSPICIOUS = LOGIN_ATTEMPT_STATUS.SUSPICIOUS;

/**
 * Login attempt timed out
 */
export const LOGIN_ATTEMPT_STATUS_TIMEOUT = LOGIN_ATTEMPT_STATUS.TIMEOUT;

/**
 * Login attempt was cancelled
 */
export const LOGIN_ATTEMPT_STATUS_CANCELLED = LOGIN_ATTEMPT_STATUS.CANCELLED;

/**
 * Type for login attempt status
 */
export type LoginAttemptStatus = (typeof LOGIN_ATTEMPT_STATUS)[keyof typeof LOGIN_ATTEMPT_STATUS];
