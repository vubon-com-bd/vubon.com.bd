import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const WAREHOUSE_CONFIG = Object.freeze({
  maxLocationsPerWarehouse: getOptionalEnvInt('WAREHOUSE_MAX_LOCATIONS', 500),
  defaultCapacity: getOptionalEnvInt('WAREHOUSE_DEFAULT_CAPACITY', 1000),
});
