/**
 * Deal Constants
 * ডিল সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PRODUCT } from '../product/product.constants';

export const DEAL = {
  // Deal status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Deal types
  TYPES: {
    SINGLE: 'single',
    BUNDLE: 'bundle',
    BUY_GET: 'buy_get',
    TIERED: 'tiered',
    BOGO: 'bogo', // Buy One Get One
  },

  // Deal discount types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUNDLE: 'bundle',
    BUY_X_GET_Y: 'buy_x_get_y',
  },

  // Product types (from PRODUCT)
  PRODUCT_TYPES: {
    PHYSICAL: PRODUCT.TYPES.PHYSICAL,
    DIGITAL: PRODUCT.TYPES.DIGITAL,
    SERVICE: PRODUCT.TYPES.SERVICE,
  },

  // Default values
  DEFAULTS: {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 10,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 90,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 999999,
  },
} as const;

export type DealStatus = (typeof DEAL.STATUS)[keyof typeof DEAL.STATUS];
export type DealType = (typeof DEAL.TYPES)[keyof typeof DEAL.TYPES];
export type DealDiscountType = (typeof DEAL.DISCOUNT_TYPES)[keyof typeof DEAL.DISCOUNT_TYPES];
