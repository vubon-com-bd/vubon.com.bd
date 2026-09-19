/**
 * Order tracking configuration
 * @module shared-config/business/order
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ORDER_TRACKING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_TRACKING_ENABLED', true),
  refreshIntervalSeconds: getOptionalEnvInt('ORDER_TRACKING_REFRESH', 300),
  historyRetentionDays: getOptionalEnvInt('ORDER_TRACKING_RETENTION_DAYS', 365),
  notifyOnUpdate: getOptionalEnvBool('ORDER_TRACKING_NOTIFY', true),
  trackLocation: getOptionalEnvBool('ORDER_TRACKING_LOCATION', true),
  trackByPhone: getOptionalEnvBool('ORDER_TRACKING_BY_PHONE', true),
});
