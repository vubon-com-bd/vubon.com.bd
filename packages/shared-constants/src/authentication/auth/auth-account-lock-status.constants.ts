// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Account lock status enum
 */
export const ACCOUNT_LOCK_STATUS = {
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  PERMANENTLY_LOCKED: 'permanently_locked',
  PENDING_UNLOCK: 'pending_unlock',
  SUSPENDED: 'suspended',
} as const;

/**
 * Account is locked
 */
export const ACCOUNT_LOCK_STATUS_LOCKED = ACCOUNT_LOCK_STATUS.LOCKED;

/**
 * Account is unlocked
 */
export const ACCOUNT_LOCK_STATUS_UNLOCKED = ACCOUNT_LOCK_STATUS.UNLOCKED;

/**
 * Account is permanently locked
 */
export const ACCOUNT_LOCK_STATUS_PERMANENTLY_LOCKED = ACCOUNT_LOCK_STATUS.PERMANENTLY_LOCKED;

/**
 * Account is pending unlock
 */
export const ACCOUNT_LOCK_STATUS_PENDING_UNLOCK = ACCOUNT_LOCK_STATUS.PENDING_UNLOCK;

/**
 * Account is suspended
 */
export const ACCOUNT_LOCK_STATUS_SUSPENDED = ACCOUNT_LOCK_STATUS.SUSPENDED;

/**
 * Type for account lock status
 */
export type AccountLockStatus = (typeof ACCOUNT_LOCK_STATUS)[keyof typeof ACCOUNT_LOCK_STATUS];
