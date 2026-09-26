import { getOptionalEnvInt, getOptionalEnv } from '@vubon/shared-config/common';

export const QUIET_HOURS_CONFIG = Object.freeze({
  enabled: true,
  startHour: getOptionalEnvInt('QUIET_HOURS_START', 22),
  endHour: getOptionalEnvInt('QUIET_HOURS_END', 8),
  timezone: getOptionalEnv('QUIET_HOURS_TZ', 'Asia/Dhaka'),
});
