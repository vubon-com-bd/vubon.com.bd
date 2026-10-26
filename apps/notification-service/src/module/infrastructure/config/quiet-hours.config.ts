/**
 * Quiet Hours Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const QUIET_HOURS_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('QUIET_HOURS_ENABLED', true),
  defaultStart: getOptionalEnvInt('QUIET_HOURS_DEFAULT_START', 22),
  defaultEnd: getOptionalEnvInt('QUIET_HOURS_DEFAULT_END', 8),
  bypassCritical: getOptionalEnvBool('QUIET_HOURS_BYPASS_CRITICAL', true),
  timezoneDefault: 'Asia/Dhaka',
});
