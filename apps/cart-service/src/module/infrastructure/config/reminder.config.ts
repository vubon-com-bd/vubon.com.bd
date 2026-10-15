/**
 * Cart Reminder Configuration
 * @module cart-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const REMINDER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ABANDONED_CART_REMINDER_ENABLED', true),
  maxReminders: getOptionalEnvInt('ABANDONED_CART_MAX_REMINDERS', 4),
  firstReminderHours: getOptionalEnvInt('ABANDONED_CART_FIRST_REMINDER_HOURS', 1),
  secondReminderHours: getOptionalEnvInt('ABANDONED_CART_SECOND_REMINDER_HOURS', 24),
  thirdReminderHours: getOptionalEnvInt('ABANDONED_CART_THIRD_REMINDER_HOURS', 72),
  finalReminderHours: getOptionalEnvInt('ABANDONED_CART_FINAL_REMINDER_HOURS', 168),
  recoveryDiscountPercent: getOptionalEnvInt('ABANDONED_CART_DISCOUNT', 10),
  trackEmailOpens: getOptionalEnvBool('ABANDONED_CART_TRACK_OPENS', true),
  trackLinkClicks: getOptionalEnvBool('ABANDONED_CART_TRACK_CLICKS', true),
});
