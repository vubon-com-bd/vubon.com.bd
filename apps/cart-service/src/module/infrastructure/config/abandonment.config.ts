/**
 * Cart Abandonment Configuration
 * @module cart-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const ABANDONMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ABANDONED_CART_ENABLED', true),
  thresholdHours: getOptionalEnvInt('ABANDONED_CART_THRESHOLD_HOURS', 24),
  minItemCount: getOptionalEnvInt('ABANDONED_CART_MIN_ITEMS', 1),
  minCartValue: getOptionalEnvInt('ABANDONED_CART_MIN_VALUE', 0),
  scanIntervalMs: getOptionalEnvInt('ABANDONED_CART_SCAN_INTERVAL_MS', 3600000),
  retentionDays: getOptionalEnvInt('ABANDONED_CART_RETENTION_DAYS', 30),
});
