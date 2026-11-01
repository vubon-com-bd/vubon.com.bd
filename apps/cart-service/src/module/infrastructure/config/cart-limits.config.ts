/**
 * Cart Limits Configuration
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_LIMITS_CONFIG = Object.freeze({
  maxItems: getOptionalEnvInt('CART_MAX_ITEMS', 100),
  maxQuantityPerItem: getOptionalEnvInt('CART_MAX_QTY_PER_ITEM', 999),
  minQuantityPerItem: getOptionalEnvInt('CART_MIN_QTY_PER_ITEM', 1),
  maxCoupons: getOptionalEnvInt('CART_MAX_COUPONS', 1),
  maxVouchers: getOptionalEnvInt('CART_MAX_VOUCHERS', 1),
  maxTotal: getOptionalEnvInt('CART_MAX_TOTAL', 1000000),
  maxNoteLength: getOptionalEnvInt('CART_MAX_NOTE_LENGTH', 500),
});
