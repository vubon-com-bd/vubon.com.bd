export const USER_SETTINGS = {
  THEME_LIGHT: 'light',
  THEME_DARK: 'dark',
  THEME_SYSTEM: 'system',
} as const;

export const USER_SETTINGS_KEY = {
  THEME: 'theme',
  LANGUAGE: 'language',
  TIMEZONE: 'timezone',
  CURRENCY: 'currency',
  DATE_FORMAT: 'date_format',
  TIME_FORMAT: 'time_format',
  NOTIFICATIONS: 'notifications',
  EMAIL_VERIFIED: 'email_verified',
  PHONE_VERIFIED: 'phone_verified',
  TWO_FACTOR: 'two_factor',
} as const;

export type UserSettingsKeyType = (typeof USER_SETTINGS_KEY)[keyof typeof USER_SETTINGS_KEY];
