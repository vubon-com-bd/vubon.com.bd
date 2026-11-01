/**
 * Shipping method configuration
 * @module shared-config/logistics/shipping-method
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';
import { CURRENCY } from '@vubon/shared-constants/common';

export const SHIPPING_METHOD_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SHIPPING_METHOD_ENABLED', true),
  maxActiveMethods: getOptionalEnvInt('SHIPPING_METHOD_MAX_ACTIVE', 50),
  minDeliveryDays: getOptionalEnvInt('SHIPPING_METHOD_MIN_DAYS', 0),
  maxDeliveryDays: getOptionalEnvInt('SHIPPING_METHOD_MAX_DAYS', 30),
  maxWeightKg: getOptionalEnvInt('SHIPPING_METHOD_MAX_WEIGHT_KG', 500),
  freeShippingThreshold: getOptionalEnvInt('SHIPPING_METHOD_FREE_THRESHOLD', 1000),
  codEnabled: getOptionalEnvBool('SHIPPING_METHOD_COD_ENABLED', true),
  trackingEnabled: getOptionalEnvBool('SHIPPING_METHOD_TRACKING_ENABLED', true),
  currency: CURRENCY.BDT,
});
