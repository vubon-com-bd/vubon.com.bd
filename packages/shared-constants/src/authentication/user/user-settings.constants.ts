// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Default notification settings
 */
export const USER_SETTINGS_DEFAULT_NOTIFICATION = {
  email: true,
  push: true,
  sms: false,
  marketing: false,
  order_updates: true,
  promotional: false,
} as const;

/**
 * Default privacy settings
 */
export const USER_SETTINGS_DEFAULT_PRIVACY = {
  profile_visibility: 'public',
  email_visibility: 'private',
  phone_visibility: 'private',
  activity_visibility: 'friends_only',
  searchable: true,
} as const;

/**
 * Maximum recent activities to store
 */
export const USER_SETTINGS_MAX_RECENT_ACTIVITIES = 50;

/**
 * Default language
 */
export const USER_SETTINGS_DEFAULT_LANGUAGE = 'en';

/**
 * Default timezone
 */
export const USER_SETTINGS_DEFAULT_TIMEZONE = 'Asia/Dhaka';

/**
 * User settings configuration
 */
export const USER_SETTINGS_CONFIG = {
  DEFAULT_NOTIFICATION: USER_SETTINGS_DEFAULT_NOTIFICATION,
  DEFAULT_PRIVACY: USER_SETTINGS_DEFAULT_PRIVACY,
  MAX_RECENT_ACTIVITIES: USER_SETTINGS_MAX_RECENT_ACTIVITIES,
  DEFAULT_LANGUAGE: USER_SETTINGS_DEFAULT_LANGUAGE,
  DEFAULT_TIMEZONE: USER_SETTINGS_DEFAULT_TIMEZONE,
} as const;

/**
 * Type for notification settings
 */
export type UserSettingsNotification = typeof USER_SETTINGS_DEFAULT_NOTIFICATION;

/**
 * Type for privacy settings
 */
export type UserSettingsPrivacy = typeof USER_SETTINGS_DEFAULT_PRIVACY;

/**
 * Type for user settings configuration
 */
export type UserSettingsConfig = typeof USER_SETTINGS_CONFIG;
