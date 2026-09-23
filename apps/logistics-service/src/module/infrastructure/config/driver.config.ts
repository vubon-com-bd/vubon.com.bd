import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DRIVER_CONFIG = Object.freeze({
  maxDrivers: getOptionalEnvInt('DRIVER_MAX', 1000),
  licenseExpiryReminderDays: getOptionalEnvInt('DRIVER_LICENSE_REMINDER_DAYS', 30),
});
