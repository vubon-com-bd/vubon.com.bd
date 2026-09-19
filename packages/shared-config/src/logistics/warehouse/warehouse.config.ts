/**
 * Warehouse configuration
 * @module shared-config/logistics/warehouse
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { TIMEZONE } from '@vubon/shared-constants/common';

export const WAREHOUSE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('WAREHOUSE_ENABLED', true),
  maxWarehouses: getOptionalEnvInt('WAREHOUSE_MAX', 100),
  defaultCapacityM3: getOptionalEnvInt('WAREHOUSE_CAPACITY_M3', 100000),
  defaultCapacityKg: getOptionalEnvInt('WAREHOUSE_CAPACITY_KG', 1000000),
  lowCapacityThresholdPercent: getOptionalEnvInt('WAREHOUSE_LOW_CAPACITY_PCT', 80),
  fullCapacityThresholdPercent: getOptionalEnvInt('WAREHOUSE_FULL_CAPACITY_PCT', 95),
  operatingHoursStart: getOptionalEnvInt('WAREHOUSE_OPEN_HOUR', 6),
  operatingHoursEnd: getOptionalEnvInt('WAREHOUSE_CLOSE_HOUR', 22),
  timezone: TIMEZONE.ASIA_DHAKA,
  requireAddress: getOptionalEnvBool('WAREHOUSE_REQUIRE_ADDRESS', true),
  requireContact: getOptionalEnvBool('WAREHOUSE_REQUIRE_CONTACT', true),
});
