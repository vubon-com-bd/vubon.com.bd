export const FLASH_SALE_COUPON_TYPE = {
  PERCENTAGE: 'percentage',
  FIXED: 'fixed',
  FREE_SHIPPING: 'free_shipping',
  CASHBACK: 'cashback',
} as const;

export const FLASH_SALE_COUPON = {
  MAX_COUPONS_PER_SALE: 10,
  MAX_USES_PER_COUPON: 10000,
  MAX_USES_PER_USER: 1,
  MIN_ORDER_AMOUNT: 0,
  MAX_DISCOUNT_AMOUNT: 100000,
  STACKABLE: false,
  COMBINE_WITH_DEAL: false,
  EXPIRY_HOURS: 24,
} as const;

export type FlashSaleCouponTypeType =
  (typeof FLASH_SALE_COUPON_TYPE)[keyof typeof FLASH_SALE_COUPON_TYPE];
