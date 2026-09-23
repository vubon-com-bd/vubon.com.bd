import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const VEHICLE_CONFIG = Object.freeze({
  maxVehicles: getOptionalEnvInt('VEHICLE_MAX', 500),
  maintenanceIntervalDays: getOptionalEnvInt('VEHICLE_MAINTENANCE_INTERVAL', 90),
});
