// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User type enum
 */
export const USER_TYPE = {
  PERSONAL: 'personal',
  BUSINESS: 'business',
  ADMIN: 'admin',
  ENTERPRISE: 'enterprise',
  GOVERNMENT: 'government',
  NGO: 'ngo',
} as const;

/**
 * Personal user type
 */
export const USER_TYPE_PERSONAL = USER_TYPE.PERSONAL;

/**
 * Business account type
 */
export const USER_TYPE_BUSINESS = USER_TYPE.BUSINESS;

/**
 * Administrator type
 */
export const USER_TYPE_ADMIN = USER_TYPE.ADMIN;

/**
 * Enterprise account type
 */
export const USER_TYPE_ENTERPRISE = USER_TYPE.ENTERPRISE;

/**
 * Government account type
 */
export const USER_TYPE_GOVERNMENT = USER_TYPE.GOVERNMENT;

/**
 * NGO account type
 */
export const USER_TYPE_NGO = USER_TYPE.NGO;

/**
 * Type for user type
 */
export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];
