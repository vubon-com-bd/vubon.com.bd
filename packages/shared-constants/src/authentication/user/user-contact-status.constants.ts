// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User contact status enum
 */
export const USER_CONTACT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  DELETED: 'deleted',
} as const;

/**
 * Contact is active
 */
export const USER_CONTACT_STATUS_ACTIVE = USER_CONTACT_STATUS.ACTIVE;

/**
 * Contact is inactive
 */
export const USER_CONTACT_STATUS_INACTIVE = USER_CONTACT_STATUS.INACTIVE;

/**
 * Contact has been verified
 */
export const USER_CONTACT_STATUS_VERIFIED = USER_CONTACT_STATUS.VERIFIED;

/**
 * Contact is not verified
 */
export const USER_CONTACT_STATUS_UNVERIFIED = USER_CONTACT_STATUS.UNVERIFIED;

/**
 * Contact has been deleted
 */
export const USER_CONTACT_STATUS_DELETED = USER_CONTACT_STATUS.DELETED;

/**
 * Type for user contact status
 */
export type UserContactStatus = (typeof USER_CONTACT_STATUS)[keyof typeof USER_CONTACT_STATUS];
