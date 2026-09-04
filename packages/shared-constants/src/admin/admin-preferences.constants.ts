/**
 * Admin Preferences Constants
 * অ্যাডমিন প্রেফারেন্স সম্পর্কিত কনস্ট্যান্টস
 */

export const ADMIN_PREFERENCES = {
  // Theme preferences
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },

  // Layout preferences
  LAYOUTS: {
    SIDEBAR: 'sidebar',
    TOP: 'top',
    BOTTOM: 'bottom',
    COMPACT: 'compact',
  },

  // Navigation preferences
  NAVIGATIONS: {
    SIDEBAR: 'sidebar',
    TOP: 'top',
    BOTTOM: 'bottom',
  },

  // Display preferences
  DISPLAY: {
    COMPACT: false,
    ANIMATIONS: true,
    SOUND: true,
    REDUCED_MOTION: false,
    HIGH_CONTRAST: false,
  },

  // Language preferences
  LANGUAGES: {
    BN: 'bn',
    EN: 'en',
  },

  // Default values
  DEFAULTS: {
    THEME: 'light',
    LAYOUT: 'sidebar',
    NAVIGATION: 'sidebar',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    DATE_FORMAT: 'DD-MM-YYYY',
    TIME_FORMAT: '24h',
    ITEMS_PER_PAGE: 25,
  },
} as const;

export type AdminTheme = (typeof ADMIN_PREFERENCES.THEMES)[keyof typeof ADMIN_PREFERENCES.THEMES];
export type AdminLayout =
  (typeof ADMIN_PREFERENCES.LAYOUTS)[keyof typeof ADMIN_PREFERENCES.LAYOUTS];
export type AdminNavigation =
  (typeof ADMIN_PREFERENCES.NAVIGATIONS)[keyof typeof ADMIN_PREFERENCES.NAVIGATIONS];
export type AdminLanguage =
  (typeof ADMIN_PREFERENCES.LANGUAGES)[keyof typeof ADMIN_PREFERENCES.LANGUAGES];
