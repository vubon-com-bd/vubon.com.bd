/**
 * Report schedule configuration
 * @module shared-config/platform/reporting
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REPORT_SCHEDULE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REPORT_SCHEDULE_ENABLED', true),
  maxActiveSchedules: getOptionalEnvInt('REPORT_MAX_ACTIVE_SCHEDULES', 1000),
  minIntervalMinutes: getOptionalEnvInt('REPORT_MIN_INTERVAL_MINUTES', 60),
  maxFutureDays: getOptionalEnvInt('REPORT_MAX_FUTURE_DAYS', 365),
  timezone: 'Asia/Dhaka',
  defaultSendHour: getOptionalEnvInt('REPORT_DEFAULT_SEND_HOUR', 9),
  retryAttempts: getOptionalEnvInt('REPORT_RETRY_ATTEMPTS', 3),
  notifyOnFailure: getOptionalEnvBool('REPORT_NOTIFY_ON_FAILURE', true),
});
