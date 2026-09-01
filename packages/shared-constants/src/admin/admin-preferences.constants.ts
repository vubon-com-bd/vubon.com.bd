/**
 * Admin Preferences Constants
 * User preferences and personalization definitions
 */

/**
 * Preference categories
 */
export const PREFERENCE_CATEGORY = {
  DISPLAY: 'display',
  NOTIFICATION: 'notification',
  LANGUAGE: 'language',
  TIME: 'time',
  ACCESSIBILITY: 'accessibility',
  PRIVACY: 'privacy',
  WORKFLOW: 'workflow',
  SHORTCUTS: 'shortcuts',
  WIDGETS: 'widgets',
} as const;

/**
 * Display preferences
 */
export const DISPLAY_PREFERENCES = {
  THEME: 'theme',
  LAYOUT: 'layout',
  SIDEBAR: 'sidebar',
  NAVBAR: 'navbar',
  FONT_SIZE: 'font_size',
  COLOR_SCHEME: 'color_scheme',
  ANIMATION: 'animation',
  DENSITY: 'density',
} as const;

/**
 * Theme types
 */
export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
  AUTO: 'auto',
  CUSTOM: 'custom',
} as const;

/**
 * Layout types
 */
export const LAYOUT_TYPE = {
  DEFAULT: 'default',
  COMPACT: 'compact',
  FLUID: 'fluid',
  BOXED: 'boxed',
} as const;

/**
 * Font sizes
 */
export const FONT_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extra_large',
} as const;

/**
 * Density types
 */
export const DENSITY_TYPE = {
  COMFORTABLE: 'comfortable',
  COMPACT: 'compact',
  COZY: 'cozy',
} as const;

/**
 * Notification preferences
 */
export const NOTIFICATION_PREFERENCES = {
  EMAIL: 'email',
  PUSH: 'push',
  IN_APP: 'in_app',
  SMS: 'sms',
  DIGEST: 'digest',
  FREQUENCY: 'frequency',
  SOUND: 'sound',
  DESKTOP: 'desktop',
} as const;

/**
 * Notification frequency
 */
export const NOTIFICATION_FREQUENCY = {
  REAL_TIME: 'real_time',
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  NONE: 'none',
} as const;

/**
 * Language preferences
 */
export const LANGUAGE_PREFERENCES = {
  PRIMARY: 'primary_language',
  SECONDARY: 'secondary_language',
  FALLBACK: 'fallback_language',
  DATE_LOCALE: 'date_locale',
  NUMBER_FORMAT: 'number_format',
} as const;

/**
 * Time preferences
 */
export const TIME_PREFERENCES = {
  TIMEZONE: 'timezone',
  DATE_FORMAT: 'date_format',
  TIME_FORMAT: 'time_format',
  WEEK_START: 'week_start',
  WORKING_HOURS: 'working_hours',
} as const;

/**
 * Accessibility preferences
 */
export const ACCESSIBILITY_PREFERENCES = {
  HIGH_CONTRAST: 'high_contrast',
  SCREEN_READER: 'screen_reader',
  REDUCED_MOTION: 'reduced_motion',
  LARGE_TEXT: 'large_text',
  COLORBLIND_MODE: 'colorblind_mode',
  KEYBOARD_NAVIGATION: 'keyboard_navigation',
} as const;

/**
 * Privacy preferences
 */
export const PRIVACY_PREFERENCES = {
  SHOW_EMAIL: 'show_email',
  SHOW_PHONE: 'show_phone',
  SHOW_ONLINE: 'show_online',
  SHOW_LAST_SEEN: 'show_last_seen',
  ACCEPT_COOKIES: 'accept_cookies',
  TRACKING: 'tracking',
} as const;

/**
 * Workflow preferences
 */
export const WORKFLOW_PREFERENCES = {
  AUTO_SAVE: 'auto_save',
  CONFIRM_ACTIONS: 'confirm_actions',
  DRAFT_AUTO_SAVE: 'draft_auto_save',
  BULK_ACTIONS: 'bulk_actions',
  VIEW_PERSISTENCE: 'view_persistence',
} as const;

/**
 * Get preference category label
 */
export function getPreferenceCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    [PREFERENCE_CATEGORY.DISPLAY]: 'Display',
    [PREFERENCE_CATEGORY.NOTIFICATION]: 'Notifications',
    [PREFERENCE_CATEGORY.LANGUAGE]: 'Language',
    [PREFERENCE_CATEGORY.TIME]: 'Time & Region',
    [PREFERENCE_CATEGORY.ACCESSIBILITY]: 'Accessibility',
    [PREFERENCE_CATEGORY.PRIVACY]: 'Privacy',
    [PREFERENCE_CATEGORY.WORKFLOW]: 'Workflow',
    [PREFERENCE_CATEGORY.SHORTCUTS]: 'Shortcuts',
    [PREFERENCE_CATEGORY.WIDGETS]: 'Widgets',
  };
  return labels[category] || category;
}

/**
 * Get theme label
 */
export function getThemeLabel(theme: string): string {
  const labels: Record<string, string> = {
    [THEME_TYPE.LIGHT]: 'Light',
    [THEME_TYPE.DARK]: 'Dark',
    [THEME_TYPE.SYSTEM]: 'System Default',
    [THEME_TYPE.AUTO]: 'Auto',
    [THEME_TYPE.CUSTOM]: 'Custom',
  };
  return labels[theme] || theme;
}

/**
 * Get layout label
 */
export function getLayoutLabel(layout: string): string {
  const labels: Record<string, string> = {
    [LAYOUT_TYPE.DEFAULT]: 'Default',
    [LAYOUT_TYPE.COMPACT]: 'Compact',
    [LAYOUT_TYPE.FLUID]: 'Fluid',
    [LAYOUT_TYPE.BOXED]: 'Boxed',
  };
  return labels[layout] || layout;
}

/**
 * Get font size label
 */
export function getFontSizeLabel(size: string): string {
  const labels: Record<string, string> = {
    [FONT_SIZE.SMALL]: 'Small',
    [FONT_SIZE.MEDIUM]: 'Medium',
    [FONT_SIZE.LARGE]: 'Large',
    [FONT_SIZE.EXTRA_LARGE]: 'Extra Large',
  };
  return labels[size] || size;
}

/**
 * Get density label
 */
export function getDensityLabel(density: string): string {
  const labels: Record<string, string> = {
    [DENSITY_TYPE.COMFORTABLE]: 'Comfortable',
    [DENSITY_TYPE.COMPACT]: 'Compact',
    [DENSITY_TYPE.COZY]: 'Cozy',
  };
  return labels[density] || density;
}

/**
 * Get notification frequency label
 */
export function getNotificationFrequencyLabel(frequency: string): string {
  const labels: Record<string, string> = {
    [NOTIFICATION_FREQUENCY.REAL_TIME]: 'Real Time',
    [NOTIFICATION_FREQUENCY.HOURLY]: 'Hourly',
    [NOTIFICATION_FREQUENCY.DAILY]: 'Daily',
    [NOTIFICATION_FREQUENCY.WEEKLY]: 'Weekly',
    [NOTIFICATION_FREQUENCY.NONE]: 'None',
  };
  return labels[frequency] || frequency;
}
