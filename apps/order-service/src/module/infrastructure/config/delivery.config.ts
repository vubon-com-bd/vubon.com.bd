/**
 * Delivery Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
  getOptionalEnv,
} from '@vubon/shared-config/common';

export const DELIVERY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_DELIVERY_ENABLED', true),
  defaultProvider: getOptionalEnv('ORDER_SERVICE_DELIVERY_PROVIDER', 'internal'),
  retryMaxAttempts: getOptionalEnvInt('ORDER_SERVICE_DELIVERY_RETRY_ATTEMPTS', 3),
  retryBackoffMs: getOptionalEnvInt('ORDER_SERVICE_DELIVERY_RETRY_BACKOFF_MS', 5000),
  rescheduleWindowHours: getOptionalEnvInt('ORDER_SERVICE_DELIVERY_RESCHEDULE_HOURS', 24),
  trackingRefreshSeconds: getOptionalEnvInt('ORDER_SERVICE_DELIVERY_TRACKING_REFRESH_SEC', 300),
  notifOnUpdate: getOptionalEnvBool('ORDER_SERVICE_DELIVERY_NOTIF_UPDATE', true),
});

export type DeliveryConfig = typeof DELIVERY_CONFIG;
