/**
 * Discount Constants
 * @module shared-constants/common/discount.constants
 */

export const DISCOUNT = {
  // Discount types
  TYPE: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUNDLE: 'bundle',
    BOGO: 'bogo', // Buy One Get One
    FREE_SHIPPING: 'free_shipping',
    VOLUME: 'volume',
    LOYALTY: 'loyalty',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    SEASONAL: 'seasonal',
    FLASH_SALE: 'flash_sale',
    FIRST_ORDER: 'first_order',
    REFERRAL: 'referral',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',
    EARLY_BIRD: 'early_bird',
    LATE_BIRD: 'late_bird',
  } as const,

  // Discount scope
  SCOPE: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    CART: 'cart',
    ORDER: 'order',
    SHIPPING: 'shipping',
    USER: 'user',
    USER_GROUP: 'user_group',
    GLOBAL: 'global',
  } as const,

  // Discount status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
    USED: 'used',
    CANCELLED: 'cancelled',
  } as const,

  // Usage limits
  LIMIT: {
    UNLIMITED: -1,
    DEFAULT_MAX_PER_USER: 1,
    DEFAULT_MAX_TOTAL: 1000,
  } as const,

  // Coupon properties
  COUPON: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 20,
    ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    PREFIX: 'CPN',
  } as const,

  // Voucher properties
  VOUCHER: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 16,
    ALLOWED_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    PREFIX: 'VCH',
  } as const,

  // Min/max values
  MIN: {
    PERCENTAGE: 0,
    FIXED_AMOUNT: 0,
  } as const,

  MAX: {
    PERCENTAGE: 100,
  } as const,

  // Stacking rules
  STACKING: {
    ALLOW_STACK: 'allow',
    PREVENT_STACK: 'prevent',
    STACK_WITH: 'stack_with',
  } as const,

  // Applicability
  APPLICABLE_TO: {
    ALL: 'all',
    SPECIFIC: 'specific',
    EXCLUDE: 'exclude',
  } as const,

  // Default values
  DEFAULT: {
    TYPE: 'percentage',
    VALUE: 0,
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: null,
    USAGE_LIMIT_PER_USER: 1,
    USAGE_LIMIT_TOTAL: null,
    STACKABLE: false,
  },
} as const;

export type DiscountType = (typeof DISCOUNT.TYPE)[keyof typeof DISCOUNT.TYPE];
export type DiscountScope = (typeof DISCOUNT.SCOPE)[keyof typeof DISCOUNT.SCOPE];
export type DiscountStatus = (typeof DISCOUNT.STATUS)[keyof typeof DISCOUNT.STATUS];
export type DiscountStacking = (typeof DISCOUNT.STACKING)[keyof typeof DISCOUNT.STACKING];
export type DiscountApplicability =
  (typeof DISCOUNT.APPLICABLE_TO)[keyof typeof DISCOUNT.APPLICABLE_TO];
