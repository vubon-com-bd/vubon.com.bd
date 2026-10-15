/**
 * CartCoupon Redis Keys
 * @module cart-service/infrastructure/persistence/redis/keys
 */
const NS = 'cart:coupon';

export const CartCouponKeys = {
  byId: (id: string): string => `${NS}:by-id:${id}`,
  byCart: (cartId: string): string => `${NS}:by-cart:${cartId}`,
  byCode: (code: string): string => `${NS}:by-code:${code}`,
  byCartCode: (cartId: string, code: string): string =>
    `${NS}:cart-code:${cartId}:${code}`,
  activeByCart: (cartId: string): string => `${NS}:active:${cartId}`,
} as const;

export const CartVoucherKeys = {
  byId: (id: string): string => `cart:voucher:by-id:${id}`,
  byCart: (cartId: string): string => `cart:voucher:by-cart:${cartId}`,
  byCode: (code: string): string => `cart:voucher:by-code:${code}`,
  byCartCode: (cartId: string, code: string): string =>
    `cart:voucher:cart-code:${cartId}:${code}`,
} as const;

export const CartTaxKeys = {
  byId: (id: string): string => `cart:tax:by-id:${id}`,
  byCart: (cartId: string): string => `cart:tax:by-cart:${cartId}`,
} as const;

export const CartShippingKeys = {
  byId: (id: string): string => `cart:shipping:by-id:${id}`,
  byCart: (cartId: string): string => `cart:shipping:by-cart:${cartId}`,
} as const;
