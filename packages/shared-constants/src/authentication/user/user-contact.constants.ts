// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum phone number length
 */
export const USER_CONTACT_MAX_PHONE_LENGTH = 20;

/**
 * Maximum email length
 */
export const USER_CONTACT_MAX_EMAIL_LENGTH = 255;

/**
 * Maximum number of contacts per user
 */
export const USER_CONTACT_MAX_PER_USER = 10;

/**
 * Default contact type
 */
export const USER_CONTACT_DEFAULT_TYPE = 'personal';

/**
 * Contact types
 */
export const USER_CONTACT_TYPES = ['personal', 'work', 'emergency', 'billing', 'shipping'] as const;

/**
 * User contact configuration
 */
export const USER_CONTACT_CONFIG = {
  MAX_PHONE_LENGTH: USER_CONTACT_MAX_PHONE_LENGTH,
  MAX_EMAIL_LENGTH: USER_CONTACT_MAX_EMAIL_LENGTH,
  MAX_PER_USER: USER_CONTACT_MAX_PER_USER,
  DEFAULT_TYPE: USER_CONTACT_DEFAULT_TYPE,
  TYPES: USER_CONTACT_TYPES,
} as const;

/**
 * Type for contact type
 */
export type UserContactType = (typeof USER_CONTACT_TYPES)[number];

/**
 * Type for user contact configuration
 */
export type UserContactConfig = typeof USER_CONTACT_CONFIG;
