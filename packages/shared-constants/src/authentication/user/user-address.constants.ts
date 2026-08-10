// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum address length
 */
export const USER_ADDRESS_MAX_LENGTH = 500;

/**
 * Maximum phone number length
 */
export const USER_ADDRESS_MAX_PHONE_LENGTH = 20;

/**
 * Maximum zip code length
 */
export const USER_ADDRESS_MAX_ZIP_LENGTH = 10;

/**
 * Maximum number of addresses per user
 */
export const USER_ADDRESS_MAX_PER_USER = 5;

/**
 * Default address type
 */
export const USER_ADDRESS_DEFAULT_TYPE = 'shipping';

/**
 * Address types
 */
export const USER_ADDRESS_TYPES = ['shipping', 'billing', 'both'] as const;

/**
 * User address configuration
 */
export const USER_ADDRESS_CONFIG = {
  MAX_LENGTH: USER_ADDRESS_MAX_LENGTH,
  MAX_PHONE_LENGTH: USER_ADDRESS_MAX_PHONE_LENGTH,
  MAX_ZIP_LENGTH: USER_ADDRESS_MAX_ZIP_LENGTH,
  MAX_PER_USER: USER_ADDRESS_MAX_PER_USER,
  DEFAULT_TYPE: USER_ADDRESS_DEFAULT_TYPE,
  TYPES: USER_ADDRESS_TYPES,
} as const;

/**
 * Type for address type
 */
export type UserAddressType = (typeof USER_ADDRESS_TYPES)[number];

/**
 * Type for user address configuration
 */
export type UserAddressConfig = typeof USER_ADDRESS_CONFIG;
