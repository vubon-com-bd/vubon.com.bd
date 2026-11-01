/**
 * Notification i18n — Language Support
 * @module shared-constants/platform/notification/i18n
 */

export const NOTIFICATION_LOCALE = {
  EN: 'en',
  BN: 'bn',
} as const;

export type NotificationLocale =
  (typeof NOTIFICATION_LOCALE)[keyof typeof NOTIFICATION_LOCALE];

export const DEFAULT_NOTIFICATION_LOCALE = NOTIFICATION_LOCALE.EN;

export const SUPPORTED_LOCALES: readonly string[] = Object.values(NOTIFICATION_LOCALE);
