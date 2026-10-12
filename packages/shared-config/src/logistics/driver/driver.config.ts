/**
 * Driver configuration
 * @module shared-config/logistics/driver
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const DRIVER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('DRIVER_ENABLED', true),
  maxActive: getOptionalEnvInt('DRIVER_MAX_ACTIVE', 10000),
  minAge: getOptionalEnvInt('DRIVER_MIN_AGE', 18),
  maxAge: getOptionalEnvInt('DRIVER_MAX_AGE', 70),
  maxWorkingHoursPerDay: getOptionalEnvInt('DRIVER_MAX_HOURS', 10),
  maxDeliveriesPerDay: getOptionalEnvInt('DRIVER_MAX_DELIVERIES', 50),
  minRating: Number(getOptionalEnvInt('DRIVER_MIN_RATING', 3)),
  licenseExpiryWarningDays: getOptionalEnvInt('DRIVER_LICENSE_WARNING_DAYS', 30),
  maxCashLimit: getOptionalEnvInt('DRIVER_MAX_CASH_LIMIT', 50000),
});
