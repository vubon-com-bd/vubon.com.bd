/**
 * Vehicle configuration
 * @module shared-config/logistics/vehicle
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const VEHICLE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VEHICLE_ENABLED', true),
  maxActive: getOptionalEnvInt('VEHICLE_MAX_ACTIVE', 5000),
  maxWeightKg: getOptionalEnvInt('VEHICLE_MAX_WEIGHT_KG', 20000),
  maintenanceIntervalDays: getOptionalEnvInt('VEHICLE_MAINTENANCE_DAYS', 90),
  insuranceWarningDays: getOptionalEnvInt('VEHICLE_INSURANCE_WARNING_DAYS', 30),
  requireInsurance: getOptionalEnvBool('VEHICLE_REQUIRE_INSURANCE', true),
  requireRegistration: getOptionalEnvBool('VEHICLE_REQUIRE_REGISTRATION', true),
});
