// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User activity status enum
 */
export const USER_ACTIVITY_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  CANCELLED: 'cancelled',
  TIMEOUT: 'timeout',
  BLOCKED: 'blocked',
} as const;

/**
 * Activity completed successfully
 */
export const USER_ACTIVITY_STATUS_SUCCESS = USER_ACTIVITY_STATUS.SUCCESS;

/**
 * Activity failed
 */
export const USER_ACTIVITY_STATUS_FAILED = USER_ACTIVITY_STATUS.FAILED;

/**
 * Activity is pending
 */
export const USER_ACTIVITY_STATUS_PENDING = USER_ACTIVITY_STATUS.PENDING;

/**
 * Activity is in progress
 */
export const USER_ACTIVITY_STATUS_IN_PROGRESS = USER_ACTIVITY_STATUS.IN_PROGRESS;

/**
 * Activity was cancelled
 */
export const USER_ACTIVITY_STATUS_CANCELLED = USER_ACTIVITY_STATUS.CANCELLED;

/**
 * Activity timed out
 */
export const USER_ACTIVITY_STATUS_TIMEOUT = USER_ACTIVITY_STATUS.TIMEOUT;

/**
 * Activity was blocked
 */
export const USER_ACTIVITY_STATUS_BLOCKED = USER_ACTIVITY_STATUS.BLOCKED;

/**
 * Type for user activity status
 */
export type UserActivityStatus = (typeof USER_ACTIVITY_STATUS)[keyof typeof USER_ACTIVITY_STATUS];
