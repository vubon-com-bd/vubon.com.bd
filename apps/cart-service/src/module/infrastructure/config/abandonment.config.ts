/**
 * Abandonment Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from './_helpers.js';
import { ABANDONED_CART } from '@vubon/shared-constants/business/cart';

export const ABANDONMENT_CONFIG = Object.freeze({
  THRESHOLD_HOURS: getOptionalEnvInt('ABANDONED_THRESHOLD_HOURS', ABANDONED_CART.THRESHOLD_HOURS),
  MAX_REMINDERS: getOptionalEnvInt('ABANDONED_MAX_REMINDERS', ABANDONED_CART.MAX_REMINDERS),
  DISCOUNT_PERCENTAGE: getOptionalEnvInt('ABANDONED_DISCOUNT_PERCENT', ABANDONED_CART.DISCOUNT_PERCENTAGE),
  EXPIRY_DAYS: getOptionalEnvInt('ABANDONED_EXPIRY_DAYS', ABANDONED_CART.EXPIRY_DAYS),
  TRACK_EMAIL_OPENS: getOptionalEnvBool('ABANDONED_TRACK_OPENS', true),
  TRACK_LINK_CLICKS: getOptionalEnvBool('ABANDONED_TRACK_CLICKS', true),
  ENABLED: getOptionalEnvBool('ABANDONED_ENABLED', true),
} as const);

export type AbandonmentConfig = typeof ABANDONMENT_CONFIG;
