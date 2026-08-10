// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User preferences status enum
 */
export const USER_PREFERENCES_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

/**
 * Preferences are active
 */
export const USER_PREFERENCES_STATUS_ACTIVE = USER_PREFERENCES_STATUS.ACTIVE;

/**
 * Preferences are inactive
 */
export const USER_PREFERENCES_STATUS_INACTIVE = USER_PREFERENCES_STATUS.INACTIVE;

/**
 * Preferences are using default values
 */
export const USER_PREFERENCES_STATUS_DEFAULT = USER_PREFERENCES_STATUS.DEFAULT;

/**
 * Preferences are customized by user
 */
export const USER_PREFERENCES_STATUS_CUSTOM = USER_PREFERENCES_STATUS.CUSTOM;

/**
 * Type for user preferences status
 */
export type UserPreferencesStatus =
  (typeof USER_PREFERENCES_STATUS)[keyof typeof USER_PREFERENCES_STATUS];
