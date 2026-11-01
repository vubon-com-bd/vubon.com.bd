/**
 * Tracking configuration
 * @module shared-config/logistics/tracking
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const TRACKING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TRACKING_ENABLED', true),
  refreshIntervalMinutes: getOptionalEnvInt('TRACKING_REFRESH_INTERVAL_MIN', 30),
  maxEvents: getOptionalEnvInt('TRACKING_MAX_EVENTS', 500),
  retentionDays: getOptionalEnvInt('TRACKING_RETENTION_DAYS', 730),
  notifyOnUpdate: getOptionalEnvBool('TRACKING_NOTIFY_ON_UPDATE', true),
  notifyOnDelivered: getOptionalEnvBool('TRACKING_NOTIFY_DELIVERED', true),
  notifyOnException: getOptionalEnvBool('TRACKING_NOTIFY_EXCEPTION', true),
  publicEnabled: getOptionalEnvBool('TRACKING_PUBLIC_ENABLED', true),
});
