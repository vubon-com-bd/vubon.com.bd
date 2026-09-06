/**
 * Cart Main Constants
 * @module shared-constants/business/cart/cart.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART = {
  // Cart status from common
  STATUS: STATUS,

  // Cart specific
  MAX_CART_ITEMS: 50,
  MAX_CART_QUANTITY_PER_ITEM: 999,
  MIN_CART_QUANTITY_PER_ITEM: 1,
  DEFAULT_CART_STATUS: 'active',
  CART_CACHE_TTL: 3600,
  CART_EXPIRY_DAYS: 30,
  MAX_SAVED_ITEMS: 100,
  MAX_CART_COUPONS: 5,
  MIN_ORDER_AMOUNT: 0,
  MAX_ORDER_AMOUNT: 99999999.99,

  // Cart type
  CART_TYPE: {
    REGULAR: 'regular',
    GUEST: 'guest',
    SUBSCRIPTION: 'subscription',
    QUOTE: 'quote',
    BULK: 'bulk',
  } as const,

  // Cart status values (unique names)
  CART_STATUS_VALUES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ABANDONED: 'abandoned',
    CONVERTED: 'converted',
    EXPIRED: 'expired',
    MERGED: 'merged',
    SPLIT: 'split',
  } as const,
} as const;

export type CartType = (typeof CART.CART_TYPE)[keyof typeof CART.CART_TYPE];
export type CartStatusValue =
  (typeof CART.CART_STATUS_VALUES)[keyof typeof CART.CART_STATUS_VALUES];
