import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { REPORT_SETTINGS } from './report-settings.constants';

export const REPORT_PREFERENCES = {
  TYPES: {
    ...COMMON_TYPES,
    ...REPORT_SETTINGS.TYPES,
    THEME: 'theme',
    LANGUAGE: 'language',
    TIMEZONE: 'timezone',
    NOTIFICATIONS: 'notifications',
    DASHBOARD: 'dashboard',
  },
  REPORT_SETTINGS: { ...REPORT_SETTINGS },
  THEME_OPTIONS: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
    CUSTOM: 'custom',
  },
  LANGUAGE_OPTIONS: ['en', 'bn', 'ar', 'hi', 'ur'],
  NOTIFICATION_PREFERENCES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
  },
  DEFAULT_PREFERENCES: {
    THEME: 'light',
    LANGUAGE: 'en',
    TIMEZONE: 'Asia/Dhaka',
    NOTIFICATIONS: ['email', 'in_app'],
  },
} as const;
