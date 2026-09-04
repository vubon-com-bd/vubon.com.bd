/**
 * Product Deal Constants
 * প্রোডাক্ট ডিল সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PRODUCT } from '../product/product.constants';

export const PRODUCT_DEAL = {
  // Product deal status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    EXPIRED: 'expired',
    SOLD_OUT: 'sold_out',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
  },

  // Product deal types
  TYPES: {
    SINGLE: 'single',
    BUNDLE: 'bundle',
    VARIANT: 'variant',
    CUSTOM: 'custom',
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
    MAX_QUANTITY: 999,
    MIN_DISCOUNT: 1,
    MAX_DISCOUNT: 90,
  },
} as const;

export type ProductDealStatus = (typeof PRODUCT_DEAL.STATUS)[keyof typeof PRODUCT_DEAL.STATUS];
export type ProductDealType = (typeof PRODUCT_DEAL.TYPES)[keyof typeof PRODUCT_DEAL.TYPES];
