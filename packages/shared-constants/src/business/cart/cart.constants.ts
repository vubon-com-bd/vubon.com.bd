/**
 * Cart Main Constants
 * @module shared-constants/business/cart/cart.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { SESSION } from '../../common/session.constants';
import { DEVICE } from '../../common/device.constants';
import { CURRENCY } from '../../common/currency.constants';
import { TAX } from '../../common/tax.constants';
import { DISCOUNT } from '../../common/discount.constants';

export const CART = {
  // Cart status from common
  STATUS: STATUS,

  // Cart types from common
  TYPES: TYPES,

  // Cart verification from common
  VERIFICATION: VERIFICATION,

  // Cart session from common
  SESSION: SESSION,

  // Cart device from common
  DEVICE: DEVICE,

  // Cart currency from common
  CURRENCY: CURRENCY,

  // Cart tax from common
  TAX: TAX,

  // Cart discount from common
  DISCOUNT: DISCOUNT,

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

  // Cart status values
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
