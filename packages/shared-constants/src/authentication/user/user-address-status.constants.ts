// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User address status enum
 */
export const USER_ADDRESS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
  PENDING_VERIFICATION: 'pending_verification',
  VERIFIED: 'verified',
} as const;

/**
 * Address is active
 */
export const USER_ADDRESS_STATUS_ACTIVE = USER_ADDRESS_STATUS.ACTIVE;

/**
 * Address is inactive
 */
export const USER_ADDRESS_STATUS_INACTIVE = USER_ADDRESS_STATUS.INACTIVE;

/**
 * Address has been deleted
 */
export const USER_ADDRESS_STATUS_DELETED = USER_ADDRESS_STATUS.DELETED;

/**
 * Address is pending verification
 */
export const USER_ADDRESS_STATUS_PENDING_VERIFICATION = USER_ADDRESS_STATUS.PENDING_VERIFICATION;

/**
 * Address has been verified
 */
export const USER_ADDRESS_STATUS_VERIFIED = USER_ADDRESS_STATUS.VERIFIED;

/**
 * Type for user address status
 */
export type UserAddressStatus = (typeof USER_ADDRESS_STATUS)[keyof typeof USER_ADDRESS_STATUS];
