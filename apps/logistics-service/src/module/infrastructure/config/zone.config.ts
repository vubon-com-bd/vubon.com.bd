import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const ZONE_CONFIG = Object.freeze({
  maxZones: getOptionalEnvInt('ZONE_MAX', 100),
  maxDistrictsPerZone: getOptionalEnvInt('ZONE_MAX_DISTRICTS', 200),
});
