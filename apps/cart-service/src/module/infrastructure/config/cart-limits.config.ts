/**
 * Cart Limits Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from './_helpers.js';

export const CART_LIMITS_CONFIG = Object.freeze({
  MAX_ITEMS: getOptionalEnvInt('CART_MAX_ITEMS', 100),
  MAX_QUANTITY_PER_ITEM: getOptionalEnvInt('CART_MAX_QTY_PER_ITEM', 999),
  MIN_QUANTITY_PER_ITEM: getOptionalEnvInt('CART_MIN_QTY_PER_ITEM', 1),
  MAX_COUPONS_PER_CART: getOptionalEnvInt('CART_MAX_COUPONS', 1),
  MAX_VOUCHERS_PER_CART: getOptionalEnvInt('CART_MAX_VOUCHERS', 1),
  MAX_SAVED_ITEMS: getOptionalEnvInt('CART_MAX_SAVED_ITEMS', 100),
} as const);

export type CartLimitsConfig = typeof CART_LIMITS_CONFIG;
