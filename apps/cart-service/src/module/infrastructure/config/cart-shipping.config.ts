/**
 * Cart Shipping Configuration
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_SHIPPING_CONFIG = Object.freeze({
  defaultMethod: 'standard',
  freeAboveDefault: getOptionalEnvInt('CART_FREE_SHIPPING_ABOVE', 1000),
  maxEstimatedDays: getOptionalEnvInt('CART_MAX_ESTIMATED_DAYS', 90),
});

export const CART_TAX_CONFIG = Object.freeze({
  defaultRate: getOptionalEnvInt('CART_DEFAULT_TAX_RATE', 15),
  taxInclusive: false,
});
