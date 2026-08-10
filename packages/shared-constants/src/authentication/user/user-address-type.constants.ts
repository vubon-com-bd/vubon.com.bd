// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User address type enum
 */
export const USER_ADDRESS_TYPE = {
  HOME: 'home',
  WORK: 'work',
  BILLING: 'billing',
  SHIPPING: 'shipping',
  OTHER: 'other',
} as const;

/**
 * Home address type
 */
export const USER_ADDRESS_TYPE_HOME = USER_ADDRESS_TYPE.HOME;

/**
 * Work address type
 */
export const USER_ADDRESS_TYPE_WORK = USER_ADDRESS_TYPE.WORK;

/**
 * Billing address type
 */
export const USER_ADDRESS_TYPE_BILLING = USER_ADDRESS_TYPE.BILLING;

/**
 * Shipping/Delivery address type
 */
export const USER_ADDRESS_TYPE_SHIPPING = USER_ADDRESS_TYPE.SHIPPING;

/**
 * Other address type
 */
export const USER_ADDRESS_TYPE_OTHER = USER_ADDRESS_TYPE.OTHER;

/**
 * Type for user address type
 */
export type UserAddressTypeEnum = (typeof USER_ADDRESS_TYPE)[keyof typeof USER_ADDRESS_TYPE];
