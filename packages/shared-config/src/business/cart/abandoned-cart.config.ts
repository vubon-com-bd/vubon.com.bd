/**
 * Abandoned cart configuration
 * @module shared-config/business/cart
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ABANDONED_CART_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ABANDONED_CART_ENABLED', true),
  thresholdHours: getOptionalEnvInt('ABANDONED_CART_THRESHOLD_HOURS', 24),
  firstReminderHours: getOptionalEnvInt('ABANDONED_CART_FIRST_REMINDER_HOURS', 1),
  secondReminderHours: getOptionalEnvInt('ABANDONED_CART_SECOND_REMINDER_HOURS', 24),
  thirdReminderHours: getOptionalEnvInt('ABANDONED_CART_THIRD_REMINDER_HOURS', 72),
  finalReminderHours: getOptionalEnvInt('ABANDONED_CART_FINAL_REMINDER_HOURS', 168),
  maxReminders: getOptionalEnvInt('ABANDONED_CART_MAX_REMINDERS', 4),
  recoveryDiscountPercent: getOptionalEnvInt('ABANDONED_CART_DISCOUNT', 10),
  expiryDays: getOptionalEnvInt('ABANDONED_CART_EXPIRY_DAYS', 30),
  trackEmailOpens: getOptionalEnvBool('ABANDONED_CART_TRACK_OPENS', true),
  trackLinkClicks: getOptionalEnvBool('ABANDONED_CART_TRACK_CLICKS', true),
});
