// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User contact type enum
 */
export const USER_CONTACT_TYPE = {
  PHONE: 'phone',
  EMAIL: 'email',
  SOCIAL: 'social',
  FAX: 'fax',
  WEBSITE: 'website',
} as const;

/**
 * Phone contact type
 */
export const USER_CONTACT_TYPE_PHONE = USER_CONTACT_TYPE.PHONE;

/**
 * Email contact type
 */
export const USER_CONTACT_TYPE_EMAIL = USER_CONTACT_TYPE.EMAIL;

/**
 * Social media contact type
 */
export const USER_CONTACT_TYPE_SOCIAL = USER_CONTACT_TYPE.SOCIAL;

/**
 * Fax contact type
 */
export const USER_CONTACT_TYPE_FAX = USER_CONTACT_TYPE.FAX;

/**
 * Website contact type
 */
export const USER_CONTACT_TYPE_WEBSITE = USER_CONTACT_TYPE.WEBSITE;

/**
 * Type for user contact type
 */
export type UserContactTypeEnum = (typeof USER_CONTACT_TYPE)[keyof typeof USER_CONTACT_TYPE];
