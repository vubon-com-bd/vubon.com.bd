import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_CONFIG = Object.freeze({
  defaultCurrency: getOptionalEnv('CART_DEFAULT_CURRENCY', 'BDT'),
  defaultTimezone: getOptionalEnv('CART_TIMEZONE', 'Asia/Dhaka'),
  maxItemsPerCart: getOptionalEnvInt('CART_MAX_ITEMS', 100),
  maxQuantityPerItem: getOptionalEnvInt('CART_MAX_QUANTITY_PER_ITEM', 999),
  cartTtlSeconds: getOptionalEnvInt('CART_TTL_SECONDS', 86400 * 7),
} as const);
