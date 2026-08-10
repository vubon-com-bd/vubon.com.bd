// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default theme
 */
export const USER_PREFERENCES_DEFAULT_THEME = 'light';

/**
 * Default currency
 */
export const USER_PREFERENCES_DEFAULT_CURRENCY = 'BDT';

/**
 * Default unit system
 */
export const USER_PREFERENCES_DEFAULT_UNIT = 'metric';

/**
 * Default notification preferences
 */
export const USER_PREFERENCES_DEFAULT_NOTIFICATION = {
  email: true,
  push: true,
  sms: false,
  marketing: false,
  order_updates: true,
  promotional: false,
  newsletter: false,
} as const;

/**
 * Available themes list
 */
export const USER_PREFERENCES_AVAILABLE_THEMES = [
  'light',
  'dark',
  'system',
  'ocean',
  'forest',
  'sunset',
  'midnight',
] as const;

/**
 * User preferences configuration
 */
export const USER_PREFERENCES_CONFIG = {
  DEFAULT_THEME: USER_PREFERENCES_DEFAULT_THEME,
  DEFAULT_CURRENCY: USER_PREFERENCES_DEFAULT_CURRENCY,
  DEFAULT_UNIT: USER_PREFERENCES_DEFAULT_UNIT,
  DEFAULT_NOTIFICATION: USER_PREFERENCES_DEFAULT_NOTIFICATION,
  AVAILABLE_THEMES: USER_PREFERENCES_AVAILABLE_THEMES,
} as const;

/**
 * Type for available theme
 */
export type UserPreferencesAvailableTheme = (typeof USER_PREFERENCES_AVAILABLE_THEMES)[number];

/**
 * Type for notification preferences
 */
export type UserPreferencesNotification = typeof USER_PREFERENCES_DEFAULT_NOTIFICATION;

/**
 * Type for user preferences configuration
 */
export type UserPreferencesConfig = typeof USER_PREFERENCES_CONFIG;
