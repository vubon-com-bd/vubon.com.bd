/**
 * Tracking Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const TRACKING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_TRACKING_ENABLED', true),
  refreshIntervalSeconds: getOptionalEnvInt('ORDER_SERVICE_TRACKING_REFRESH_SEC', 300),
  historyRetentionDays: getOptionalEnvInt('ORDER_SERVICE_TRACKING_HISTORY_RETENTION_DAYS', 365),
  notifyOnUpdate: getOptionalEnvBool('ORDER_SERVICE_TRACKING_NOTIFY', true),
  trackLocation: getOptionalEnvBool('ORDER_SERVICE_TRACKING_TRACK_LOCATION', true),
  trackByPhone: getOptionalEnvBool('ORDER_SERVICE_TRACKING_TRACK_BY_PHONE', true),
});

export type TrackingConfig = typeof TRACKING_CONFIG;
