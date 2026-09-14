/**
 * Cart configuration
 * @module shared-config/business/cart
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CART_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CART_ENABLED', true),
  maxItems: getOptionalEnvInt('CART_MAX_ITEMS', 100),
  maxQuantityPerItem: getOptionalEnvInt('CART_MAX_QTY_PER_ITEM', 999),
  minQuantityPerItem: getOptionalEnvInt('CART_MIN_QTY_PER_ITEM', 1),
  expiryHours: getOptionalEnvInt('CART_EXPIRY_HOURS', 720),
  guestCartExpiryHours: getOptionalEnvInt('CART_GUEST_EXPIRY_HOURS', 168),
  allowGuestCart: getOptionalEnvBool('CART_ALLOW_GUEST', true),
  autoMergeOnLogin: getOptionalEnvBool('CART_AUTO_MERGE', true),
  maxCouponsPerCart: getOptionalEnvInt('CART_MAX_COUPONS', 1),
  reserveStockOnAdd: getOptionalEnvBool('CART_RESERVE_STOCK', false),
});
