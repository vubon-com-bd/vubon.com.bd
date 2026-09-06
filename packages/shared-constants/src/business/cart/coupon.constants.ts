/**
 * Coupon Constants (EXTENDS common/status, common/types)
 * @module shared-constants/business/cart/coupon.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';

export const COUPON = {
  // Base from common
  STATUS: STATUS,
  TYPES: TYPES,

  // Coupon specific
  MAX_COUPON_CODE_LENGTH: 20,
  MIN_COUPON_CODE_LENGTH: 4,
  MAX_COUPON_DESCRIPTION_LENGTH: 255,
  COUPON_CACHE_TTL: 3600,
  DEFAULT_COUPON_STATUS: 'active',

  // Coupon type
  COUPON_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    FREE_SHIPPING: 'free_shipping',
    BUY_X_GET_Y: 'buy_x_get_y',
    BUNDLE: 'bundle',
    VOLUME: 'volume',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    WELCOME: 'welcome',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    SEASONAL: 'seasonal',
    FLASH_SALE: 'flash_sale',
    CUSTOM: 'custom',
  } as const,

  // Coupon status
  COUPON_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DRAFT: 'draft',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    USED: 'used',
    EXHAUSTED: 'exhausted',
  } as const,

  // Coupon scope
  COUPON_SCOPE: {
    ALL_PRODUCTS: 'all_products',
    SPECIFIC_CATEGORIES: 'specific_categories',
    SPECIFIC_BRANDS: 'specific_brands',
    SPECIFIC_PRODUCTS: 'specific_products',
    EXCLUDE_CATEGORIES: 'exclude_categories',
    EXCLUDE_BRANDS: 'exclude_brands',
    EXCLUDE_PRODUCTS: 'exclude_products',
  } as const,

  // Coupon discount
  COUPON_DISCOUNT: {
    MAX_DISCOUNT_AMOUNT: 999999.99,
    MIN_DISCOUNT_AMOUNT: 0,
    MAX_PERCENTAGE: 90,
    MIN_PERCENTAGE: 0,
  } as const,

  // Coupon usage
  COUPON_USAGE: {
    SINGLE_USE: 'single_use',
    MULTI_USE: 'multi_use',
    UNLIMITED: 'unlimited',
    PER_USER: 'per_user',
    PER_ORDER: 'per_order',
    ONCE_PER_USER: 'once_per_user',
  } as const,

  // Coupon validation
  COUPON_VALIDATION: {
    MIN_ORDER_AMOUNT: 'min_order_amount',
    MAX_ORDER_AMOUNT: 'max_order_amount',
    USER_LIMIT: 'user_limit',
    TOTAL_LIMIT: 'total_limit',
    DATE_RANGE: 'date_range',
    USER_GROUP: 'user_group',
    FIRST_ORDER_ONLY: 'first_order_only',
    CUSTOMER_ONLY: 'customer_only',
    VERIFIED_ONLY: 'verified_only',
    NEW_USER_ONLY: 'new_user_only',
    EXISTING_USER_ONLY: 'existing_user_only',
  } as const,
} as const;

export type CouponType = (typeof COUPON.COUPON_TYPE)[keyof typeof COUPON.COUPON_TYPE];
export type CouponStatus = (typeof COUPON.COUPON_STATUS)[keyof typeof COUPON.COUPON_STATUS];
export type CouponScope = (typeof COUPON.COUPON_SCOPE)[keyof typeof COUPON.COUPON_SCOPE];
export type CouponUsage = (typeof COUPON.COUPON_USAGE)[keyof typeof COUPON.COUPON_USAGE];
export type CouponValidation =
  (typeof COUPON.COUPON_VALIDATION)[keyof typeof COUPON.COUPON_VALIDATION];

export const COUPON_STATUS_LABELS: Record<CouponStatus, string> = {
  [COUPON.COUPON_STATUS.ACTIVE]: 'Active',
  [COUPON.COUPON_STATUS.INACTIVE]: 'Inactive',
  [COUPON.COUPON_STATUS.PENDING]: 'Pending',
  [COUPON.COUPON_STATUS.DRAFT]: 'Draft',
  [COUPON.COUPON_STATUS.EXPIRED]: 'Expired',
  [COUPON.COUPON_STATUS.CANCELLED]: 'Cancelled',
  [COUPON.COUPON_STATUS.USED]: 'Used',
  [COUPON.COUPON_STATUS.EXHAUSTED]: 'Exhausted',
};

export const COUPON_STATUS_COLORS: Record<CouponStatus, string> = {
  [COUPON.COUPON_STATUS.ACTIVE]: '#22c55e',
  [COUPON.COUPON_STATUS.INACTIVE]: '#9ca3af',
  [COUPON.COUPON_STATUS.PENDING]: '#eab308',
  [COUPON.COUPON_STATUS.DRAFT]: '#60a5fa',
  [COUPON.COUPON_STATUS.EXPIRED]: '#9ca3af',
  [COUPON.COUPON_STATUS.CANCELLED]: '#dc2626',
  [COUPON.COUPON_STATUS.USED]: '#6b7280',
  [COUPON.COUPON_STATUS.EXHAUSTED]: '#6b7280',
};
