// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User verification type enum
 */
export const USER_VERIFICATION_TYPE = {
  EMAIL: 'email',
  PHONE: 'phone',
  IDENTITY: 'identity',
  ADDRESS: 'address',
  AGE: 'age',
  TWO_FA: 'two_fa',
} as const;

/**
 * Email verification type
 */
export const USER_VERIFICATION_TYPE_EMAIL = USER_VERIFICATION_TYPE.EMAIL;

/**
 * Phone number verification type
 */
export const USER_VERIFICATION_TYPE_PHONE = USER_VERIFICATION_TYPE.PHONE;

/**
 * Identity verification type
 */
export const USER_VERIFICATION_TYPE_IDENTITY = USER_VERIFICATION_TYPE.IDENTITY;

/**
 * Address verification type
 */
export const USER_VERIFICATION_TYPE_ADDRESS = USER_VERIFICATION_TYPE.ADDRESS;

/**
 * Age verification type
 */
export const USER_VERIFICATION_TYPE_AGE = USER_VERIFICATION_TYPE.AGE;

/**
 * Two-Factor Authentication verification type
 */
export const USER_VERIFICATION_TYPE_TWO_FA = USER_VERIFICATION_TYPE.TWO_FA;

/**
 * Type for user verification type
 */
export type UserVerificationType =
  (typeof USER_VERIFICATION_TYPE)[keyof typeof USER_VERIFICATION_TYPE];
