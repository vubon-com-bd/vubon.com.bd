/**
 * Preferences API endpoint paths.
 * @module shared-api/endpoints/preferences
 */

export const PREFERENCES_ENDPOINTS = {
  GET: '/preferences',
  UPDATE: '/preferences',
  RESET: '/preferences/reset',
  THEME: '/preferences/theme',
  LANGUAGE: '/preferences/language',
  TIMEZONE: '/preferences/timezone',
  CURRENCY: '/preferences/currency',
  NOTIFICATIONS: '/preferences/notifications',
  PRIVACY: '/preferences/privacy',
} as const;
