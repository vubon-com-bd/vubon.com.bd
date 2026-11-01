/**
 * Zone configuration
 * @module shared-config/logistics/zone
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';
import { CURRENCY } from '@vubon/shared-constants/common';

export const ZONE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ZONE_ENABLED', true),
  maxZones: getOptionalEnvInt('ZONE_MAX', 5000),
  defaultShippingCost: getOptionalEnvInt('ZONE_DEFAULT_SHIPPING_COST', 60),
  maxShippingCost: getOptionalEnvInt('ZONE_MAX_SHIPPING_COST', 5000),
  freeDeliveryMinAmount: getOptionalEnvInt('ZONE_FREE_DELIVERY_MIN', 1000),
  codEnabled: getOptionalEnvBool('ZONE_COD_ENABLED', true),
  codMaxAmount: getOptionalEnvInt('ZONE_COD_MAX', 50000),
  codCharge: getOptionalEnvInt('ZONE_COD_CHARGE', 20),
  allowRemote: getOptionalEnvBool('ZONE_ALLOW_REMOTE', true),
  remoteSurcharge: getOptionalEnvInt('ZONE_REMOTE_SURCHARGE', 100),
  currency: CURRENCY.BDT,
});
