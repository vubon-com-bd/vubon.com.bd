/**
 * Schedule Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SCHEDULE_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SCHEDULE_ENABLED', true),
  maxActiveSchedules: getOptionalEnvInt('SCHEDULE_MAX_ACTIVE', 10000),
  minIntervalMinutes: getOptionalEnvInt('SCHEDULE_MIN_INTERVAL_MIN', 1),
  maxFutureDays: getOptionalEnvInt('SCHEDULE_MAX_FUTURE_DAYS', 365),
  checkIntervalSeconds: getOptionalEnvInt('SCHEDULE_CHECK_INTERVAL', 60),
  timezoneDefault: 'Asia/Dhaka',
});
