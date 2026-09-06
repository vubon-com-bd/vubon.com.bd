/**
 * Cart Coupon Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/cart-coupon.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART_COUPON = {
  // Base status from common
  STATUS: STATUS,

  // Coupon specific
  MAX_COUPONS_PER_CART: 5,
  MAX_COUPON_CODE_LENGTH: 20,
  MIN_COUPON_CODE_LENGTH: 4,
  COUPON_CACHE_TTL: 3600,

  // Coupon type
  CART_COUPON_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_SHIPPING: 'free_shipping',
    BUY_X_GET_Y: 'buy_x_get_y',
    BUNDLE: 'bundle',
    VOLUME: 'volume',
  } as const,

  // Coupon status
  CART_COUPON_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    APPLIED: 'applied',
    REMOVED: 'removed',
    EXPIRED: 'expired',
    USED: 'used',
    CANCELLED: 'cancelled',
  } as const,

  // Coupon applicability
  CART_COUPON_APPLICABILITY: {
    ALL_PRODUCTS: 'all_products',
    SPECIFIC_CATEGORIES: 'specific_categories',
    SPECIFIC_BRANDS: 'specific_brands',
    SPECIFIC_PRODUCTS: 'specific_products',
    EXCLUDE_CATEGORIES: 'exclude_categories',
    EXCLUDE_BRANDS: 'exclude_brands',
    EXCLUDE_PRODUCTS: 'exclude_products',
  } as const,

  // Coupon validation
  CART_COUPON_VALIDATION: {
    MIN_ORDER_AMOUNT: 'min_order_amount',
    MAX_ORDER_AMOUNT: 'max_order_amount',
    USER_LIMIT: 'user_limit',
    TOTAL_LIMIT: 'total_limit',
    DATE_RANGE: 'date_range',
    USER_GROUP: 'user_group',
    FIRST_ORDER_ONLY: 'first_order_only',
    CUSTOMER_ONLY: 'customer_only',
  } as const,
} as const;

export type CartCouponType =
  (typeof CART_COUPON.CART_COUPON_TYPE)[keyof typeof CART_COUPON.CART_COUPON_TYPE];
export type CartCouponStatus =
  (typeof CART_COUPON.CART_COUPON_STATUS)[keyof typeof CART_COUPON.CART_COUPON_STATUS];
export type CartCouponApplicability =
  (typeof CART_COUPON.CART_COUPON_APPLICABILITY)[keyof typeof CART_COUPON.CART_COUPON_APPLICABILITY];
export type CartCouponValidation =
  (typeof CART_COUPON.CART_COUPON_VALIDATION)[keyof typeof CART_COUPON.CART_COUPON_VALIDATION];

export const CART_COUPON_STATUS_LABELS: Record<CartCouponStatus, string> = {
  [CART_COUPON.CART_COUPON_STATUS.ACTIVE]: 'Active',
  [CART_COUPON.CART_COUPON_STATUS.INACTIVE]: 'Inactive',
  [CART_COUPON.CART_COUPON_STATUS.PENDING]: 'Pending',
  [CART_COUPON.CART_COUPON_STATUS.APPLIED]: 'Applied',
  [CART_COUPON.CART_COUPON_STATUS.REMOVED]: 'Removed',
  [CART_COUPON.CART_COUPON_STATUS.EXPIRED]: 'Expired',
  [CART_COUPON.CART_COUPON_STATUS.USED]: 'Used',
  [CART_COUPON.CART_COUPON_STATUS.CANCELLED]: 'Cancelled',
};

export const CART_COUPON_STATUS_COLORS: Record<CartCouponStatus, string> = {
  [CART_COUPON.CART_COUPON_STATUS.ACTIVE]: '#22c55e',
  [CART_COUPON.CART_COUPON_STATUS.INACTIVE]: '#9ca3af',
  [CART_COUPON.CART_COUPON_STATUS.PENDING]: '#eab308',
  [CART_COUPON.CART_COUPON_STATUS.APPLIED]: '#22c55e',
  [CART_COUPON.CART_COUPON_STATUS.REMOVED]: '#ef4444',
  [CART_COUPON.CART_COUPON_STATUS.EXPIRED]: '#9ca3af',
  [CART_COUPON.CART_COUPON_STATUS.USED]: '#6b7280',
  [CART_COUPON.CART_COUPON_STATUS.CANCELLED]: '#dc2626',
};
