/**
 * Cart Configuration
 * @module cart-service/infrastructure/config
 */
import {
  getOptionalEnv,
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const CART_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CART_ENABLED', true),
  dbMode: getOptionalEnv('DB_MODE', 'prisma') as 'prisma' | 'memory' | 'redis',
  defaultCurrency: getOptionalEnv('CART_DEFAULT_CURRENCY', 'BDT'),
  allowGuestCart: getOptionalEnvBool('CART_ALLOW_GUEST', true),
  autoMergeOnLogin: getOptionalEnvBool('CART_AUTO_MERGE', true),
  reserveStockOnAdd: getOptionalEnvBool('CART_RESERVE_STOCK', false),
  maxItems: getOptionalEnvInt('CART_MAX_ITEMS', 100),
  maxQuantityPerItem: getOptionalEnvInt('CART_MAX_QTY_PER_ITEM', 999),
  maxCouponsPerCart: getOptionalEnvInt('CART_MAX_COUPONS', 1),
  maxVouchersPerCart: getOptionalEnvInt('CART_MAX_VOUCHERS', 1),
});
