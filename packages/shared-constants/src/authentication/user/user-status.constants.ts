// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User status enum
 */
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
  BANNED: 'banned',
  PENDING: 'pending',
  DEACTIVATED: 'deactivated',
  ARCHIVED: 'archived',
} as const;

/**
 * User is active (normal state)
 */
export const USER_STATUS_ACTIVE = USER_STATUS.ACTIVE;

/**
 * User is inactive (account created but not verified)
 */
export const USER_STATUS_INACTIVE = USER_STATUS.INACTIVE;

/**
 * User is suspended (for rule violation)
 */
export const USER_STATUS_SUSPENDED = USER_STATUS.SUSPENDED;

/**
 * User has been deleted
 */
export const USER_STATUS_DELETED = USER_STATUS.DELETED;

/**
 * User is banned (permanently)
 */
export const USER_STATUS_BANNED = USER_STATUS.BANNED;

/**
 * User is pending (awaiting approval)
 */
export const USER_STATUS_PENDING = USER_STATUS.PENDING;

/**
 * User has been deactivated (by user themselves)
 */
export const USER_STATUS_DEACTIVATED = USER_STATUS.DEACTIVATED;

/**
 * User has been archived
 */
export const USER_STATUS_ARCHIVED = USER_STATUS.ARCHIVED;

/**
 * Type for user status
 */
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
