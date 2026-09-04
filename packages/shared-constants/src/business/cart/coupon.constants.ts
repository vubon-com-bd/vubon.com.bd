/**
 * Coupon Constants
 * কুপন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PRODUCT } from '../product/product.constants';

export const COUPON = {
  // Coupon status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    EXPIRED: 'expired',
    USED: 'used',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Coupon types
  TYPES: {
    DISCOUNT: 'discount',
    FREE_SHIPPING: 'free_shipping',
    BUY_GET: 'buy_get',
    GIFT: 'gift',
    VOUCHER: 'voucher',
  },

  // Discount types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
    BUNDLE: 'bundle',
  },

  // Coupon application
  APPLICATION: {
    ALL_PRODUCTS: 'all_products',
    SPECIFIC_PRODUCTS: 'specific_products',
    SPECIFIC_CATEGORIES: 'specific_categories',
    SPECIFIC_BRANDS: 'specific_brands',
    FIRST_ORDER: 'first_order',
    MINIMUM_ORDER: 'minimum_order',
  },

  // Product types (from PRODUCT)
  PRODUCT_TYPES: {
    PHYSICAL: PRODUCT.TYPES.PHYSICAL,
    DIGITAL: PRODUCT.TYPES.DIGITAL,
    SERVICE: PRODUCT.TYPES.SERVICE,
    SUBSCRIPTION: PRODUCT.TYPES.SUBSCRIPTION,
  },

  // Default values
  DEFAULTS: {
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    USAGE_LIMIT_PER_USER: 1,
    USAGE_LIMIT_TOTAL: 100,
    MIN_PRODUCT_QUANTITY: 1,
    MAX_PRODUCT_QUANTITY: 10,
  },
} as const;

export type CouponStatus = (typeof COUPON.STATUS)[keyof typeof COUPON.STATUS];
export type CouponType = (typeof COUPON.TYPES)[keyof typeof COUPON.TYPES];
export type CouponDiscountType = (typeof COUPON.DISCOUNT_TYPES)[keyof typeof COUPON.DISCOUNT_TYPES];
export type CouponApplication = (typeof COUPON.APPLICATION)[keyof typeof COUPON.APPLICATION];
