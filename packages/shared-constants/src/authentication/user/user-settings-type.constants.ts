// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User settings type enum
 */
export const USER_SETTINGS_TYPE = {
  NOTIFICATION: 'notification',
  PRIVACY: 'privacy',
  SECURITY: 'security',
  LANGUAGE: 'language',
  APPEARANCE: 'appearance',
  ACCESSIBILITY: 'accessibility',
} as const;

/**
 * Notification settings type
 */
export const USER_SETTINGS_TYPE_NOTIFICATION = USER_SETTINGS_TYPE.NOTIFICATION;

/**
 * Privacy settings type
 */
export const USER_SETTINGS_TYPE_PRIVACY = USER_SETTINGS_TYPE.PRIVACY;

/**
 * Security settings type
 */
export const USER_SETTINGS_TYPE_SECURITY = USER_SETTINGS_TYPE.SECURITY;

/**
 * Language settings type
 */
export const USER_SETTINGS_TYPE_LANGUAGE = USER_SETTINGS_TYPE.LANGUAGE;

/**
 * Appearance/Theme settings type
 */
export const USER_SETTINGS_TYPE_APPEARANCE = USER_SETTINGS_TYPE.APPEARANCE;

/**
 * Accessibility settings type
 */
export const USER_SETTINGS_TYPE_ACCESSIBILITY = USER_SETTINGS_TYPE.ACCESSIBILITY;

/**
 * Type for user settings type
 */
export type UserSettingsType = (typeof USER_SETTINGS_TYPE)[keyof typeof USER_SETTINGS_TYPE];
