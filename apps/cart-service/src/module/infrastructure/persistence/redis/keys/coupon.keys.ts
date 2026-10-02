/**
 * Coupon Redis keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
export const COUPON_KEYS = {
  cartCoupon: (cartId: string): string => `cart:${cartId}:coupon`,
  validation: (code: string): string => `coupon:validation:${code}`,
} as const;

export const VOUCHER_KEYS = {
  cartVoucher: (cartId: string): string => `cart:${cartId}:voucher`,
  balance: (code: string): string => `voucher:balance:${code}`,
} as const;
