/**
 * Shipping base configuration
 * @module shared-config/logistics/shipping
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SHIPPING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SHIPPING_ENABLED', true),
  defaultMethod: getOptionalEnv('SHIPPING_DEFAULT_METHOD', 'standard'),
  defaultCost: getOptionalEnvInt('SHIPPING_DEFAULT_COST', 60),
  maxCost: getOptionalEnvInt('SHIPPING_MAX_COST', 5000),
  minDeliveryDays: getOptionalEnvInt('SHIPPING_MIN_DAYS', 1),
  maxDeliveryDays: getOptionalEnvInt('SHIPPING_MAX_DAYS', 15),
  codEnabled: getOptionalEnvBool('SHIPPING_COD_ENABLED', true),
  codCharge: getOptionalEnvInt('SHIPPING_COD_CHARGE', 20),
  codMaxAmount: getOptionalEnvInt('SHIPPING_COD_MAX_AMOUNT', 50000),
  allowPickup: getOptionalEnvBool('SHIPPING_ALLOW_PICKUP', true),
  allowCourier: getOptionalEnvBool('SHIPPING_ALLOW_COURIER', true),
  trackingRequired: getOptionalEnvBool('SHIPPING_TRACKING_REQUIRED', true),
  insuranceEnabled: getOptionalEnvBool('SHIPPING_INSURANCE_ENABLED', true),
  remoteSurcharge: getOptionalEnvInt('SHIPPING_REMOTE_SURCHARGE', 100),
});
