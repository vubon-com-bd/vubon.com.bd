import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_LIMITS_CONFIG = Object.freeze({
  maxItemsPerCart: getOptionalEnvInt('CART_MAX_ITEMS_PER_CART', 100),
  maxQuantityPerItem: getOptionalEnvInt('CART_MAX_QUANTITY_PER_ITEM', 999),
  maxSavedItemsPerUser: getOptionalEnvInt('CART_MAX_SAVED_ITEMS', 200),
  maxCouponsPerCart: getOptionalEnvInt('CART_MAX_COUPONS', 3),
  maxVouchersPerCart: getOptionalEnvInt('CART_MAX_VOUCHERS', 1),
} as const);
