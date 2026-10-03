import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { ORDER_TRACKING } from '@vubon/shared-constants/business/order';

export const TRACKING_CONFIG = Object.freeze({
  REFRESH_INTERVAL_SECONDS: getOptionalEnvInt(
    'ORDER_TRACKING_REFRESH_INTERVAL',
    ORDER_TRACKING.REFRESH_INTERVAL_SECONDS,
  ),
  HISTORY_RETENTION_DAYS: getOptionalEnvInt(
    'ORDER_TRACKING_RETENTION_DAYS',
    ORDER_TRACKING.HISTORY_RETENTION_DAYS,
  ),
  NOTIFY_ON_UPDATE: getOptionalEnvBool(
    'ORDER_TRACKING_NOTIFY_ON_UPDATE',
    ORDER_TRACKING.NOTIFY_ON_UPDATE,
  ),
  TRACK_LOCATION: getOptionalEnvBool(
    'ORDER_TRACKING_LOCATION',
    ORDER_TRACKING.TRACK_LOCATION,
  ),
  TRACK_BY_PHONE: getOptionalEnvBool(
    'ORDER_TRACKING_BY_PHONE',
    ORDER_TRACKING.TRACK_BY_PHONE,
  ),
});

export type TrackingConfigType = typeof TRACKING_CONFIG;
