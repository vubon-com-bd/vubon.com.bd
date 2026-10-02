/**
 * Reminder Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from './_helpers.js';
import { ABANDONED_CART } from '@vubon/shared-constants/business/cart';

export const REMINDER_CONFIG = Object.freeze({
  FIRST_HOURS: getOptionalEnvInt('REMINDER_FIRST_HOURS', ABANDONED_CART.FIRST_REMINDER_HOURS),
  SECOND_HOURS: getOptionalEnvInt('REMINDER_SECOND_HOURS', ABANDONED_CART.SECOND_REMINDER_HOURS),
  THIRD_HOURS: getOptionalEnvInt('REMINDER_THIRD_HOURS', ABANDONED_CART.THIRD_REMINDER_HOURS),
  FINAL_HOURS: getOptionalEnvInt('REMINDER_FINAL_HOURS', ABANDONED_CART.FINAL_REMINDER_HOURS),
  EMAIL_ENABLED: getOptionalEnvBool('REMINDER_EMAIL_ENABLED', true),
  SMS_ENABLED: getOptionalEnvBool('REMINDER_SMS_ENABLED', false),
  PUSH_ENABLED: getOptionalEnvBool('REMINDER_PUSH_ENABLED', true),
} as const);

export type ReminderConfig = typeof REMINDER_CONFIG;
