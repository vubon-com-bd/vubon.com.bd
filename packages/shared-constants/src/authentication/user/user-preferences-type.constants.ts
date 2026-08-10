// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User preferences type enum
 */
export const USER_PREFERENCES_TYPE = {
  THEME: 'theme',
  NOTIFICATION: 'notification',
  LANGUAGE: 'language',
  CURRENCY: 'currency',
  UNIT: 'unit',
  TIMEZONE: 'timezone',
  DISPLAY: 'display',
} as const;

/**
 * Theme preference type
 */
export const USER_PREFERENCES_TYPE_THEME = USER_PREFERENCES_TYPE.THEME;

/**
 * Notification preference type
 */
export const USER_PREFERENCES_TYPE_NOTIFICATION = USER_PREFERENCES_TYPE.NOTIFICATION;

/**
 * Language preference type
 */
export const USER_PREFERENCES_TYPE_LANGUAGE = USER_PREFERENCES_TYPE.LANGUAGE;

/**
 * Currency preference type
 */
export const USER_PREFERENCES_TYPE_CURRENCY = USER_PREFERENCES_TYPE.CURRENCY;

/**
 * Unit preference type
 */
export const USER_PREFERENCES_TYPE_UNIT = USER_PREFERENCES_TYPE.UNIT;

/**
 * Timezone preference type
 */
export const USER_PREFERENCES_TYPE_TIMEZONE = USER_PREFERENCES_TYPE.TIMEZONE;

/**
 * Display preference type
 */
export const USER_PREFERENCES_TYPE_DISPLAY = USER_PREFERENCES_TYPE.DISPLAY;

/**
 * Type for user preferences type
 */
export type UserPreferencesType =
  (typeof USER_PREFERENCES_TYPE)[keyof typeof USER_PREFERENCES_TYPE];
