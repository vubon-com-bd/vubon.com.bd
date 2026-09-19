/**
 * Shipping rate configuration
 * @module shared-config/logistics/shipping
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { CURRENCY } from '@vubon/shared-constants/common';

export const SHIPPING_RATE_CONFIG = Object.freeze({
  currency: getOptionalEnv('SHIPPING_RATE_CURRENCY', CURRENCY.BDT),
  rateType: getOptionalEnv('SHIPPING_RATE_TYPE', 'flat'), // flat | weight | price | quantity | distance | tiered
  baseRate: getOptionalEnvInt('SHIPPING_BASE_RATE', 60),
  perKgRate: getOptionalEnvInt('SHIPPING_PER_KG_RATE', 20),
  perKmRate: getOptionalEnvInt('SHIPPING_PER_KM_RATE', 10),
  maxWeightKg: getOptionalEnvInt('SHIPPING_MAX_WEIGHT_KG', 500),
  maxDimensionsCm: getOptionalEnvInt('SHIPPING_MAX_DIMENSIONS_CM', 300),
  volumetricDivisor: getOptionalEnvInt('SHIPPING_VOLUMETRIC_DIVISOR', 5000),
  zoneMultiplierEnabled: getOptionalEnvBool('SHIPPING_ZONE_MULTIPLIER', true),
  remoteZoneMultiplier: getOptionalEnvInt('SHIPPING_REMOTE_MULTIPLIER', 2),
});
