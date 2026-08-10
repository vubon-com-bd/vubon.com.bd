// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User settings status enum
 */
export const USER_SETTINGS_STATUS = {
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  DEFAULT: 'default',
  CUSTOM: 'custom',
  PENDING: 'pending',
} as const;

/**
 * Settings are enabled/active
 */
export const USER_SETTINGS_STATUS_ENABLED = USER_SETTINGS_STATUS.ENABLED;

/**
 * Settings are disabled/inactive
 */
export const USER_SETTINGS_STATUS_DISABLED = USER_SETTINGS_STATUS.DISABLED;

/**
 * Settings are using default values
 */
export const USER_SETTINGS_STATUS_DEFAULT = USER_SETTINGS_STATUS.DEFAULT;

/**
 * Settings are customized by user
 */
export const USER_SETTINGS_STATUS_CUSTOM = USER_SETTINGS_STATUS.CUSTOM;

/**
 * Settings are pending (awaiting confirmation)
 */
export const USER_SETTINGS_STATUS_PENDING = USER_SETTINGS_STATUS.PENDING;

/**
 * Type for user settings status
 */
export type UserSettingsStatus = (typeof USER_SETTINGS_STATUS)[keyof typeof USER_SETTINGS_STATUS];
