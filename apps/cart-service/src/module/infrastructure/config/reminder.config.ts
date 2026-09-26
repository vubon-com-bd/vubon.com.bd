import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const REMINDER_CONFIG = Object.freeze({
  firstReminderHours: getOptionalEnvInt('CART_REMINDER_1H', 1),
  secondReminderHours: getOptionalEnvInt('CART_REMINDER_24H', 24),
  thirdReminderHours: getOptionalEnvInt('CART_REMINDER_48H', 48),
  maxReminders: getOptionalEnvInt('CART_MAX_REMINDERS', 3),
  reminderBatchSize: getOptionalEnvInt('CART_REMINDER_BATCH', 200),
} as const);
