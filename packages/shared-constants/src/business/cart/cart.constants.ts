import { CART_STATUS } from './cart-status.constants.js';
import { COUPON, COUPON_LIMIT } from './coupon.constants.js';
import { COUPON_TYPE } from './coupon-type.constants.js';
import { COUPON_DISCOUNT_TYPE } from './coupon-discount-type.constants.js';
import { VOUCHER, VOUCHER_LIMIT } from './voucher.constants.js';
import { ABANDONED_CART } from './abandoned-cart.constants.js';

export const CART_TYPE = {
  GUEST: 'guest',
  USER: 'user',
  WISHLIST: 'wishlist',
  SAVED: 'saved',
  SUBSCRIPTION: 'subscription',
} as const;

export const CART_LIMIT = {
  MAX_ITEMS: 100,
  MAX_QUANTITY_PER_ITEM: 999,
  MIN_QUANTITY_PER_ITEM: 1,
  EXPIRY_HOURS: 720,
  GUEST_CART_EXPIRY_HOURS: 168,
  SESSION_TTL_SECONDS: 2592000,
  AUTO_MERGE_ON_LOGIN: true,
  ALLOW_GUEST_CHECKOUT: true,
  MAX_COUPONS_PER_CART: 1,
  MAX_VOUCHERS_PER_CART: 1,
} as const;

export const CART = {
  TYPE: CART_TYPE,
  STATUS: CART_STATUS,
  LIMIT: CART_LIMIT,
  COUPON: {
    STATUS: COUPON.STATUS,
    TYPE: COUPON_TYPE,
    DISCOUNT_TYPE: COUPON_DISCOUNT_TYPE,
    LIMIT: COUPON_LIMIT,
  },
  VOUCHER: {
    STATUS: VOUCHER.STATUS,
    TYPE: VOUCHER.TYPE,
    LIMIT: VOUCHER_LIMIT,
  },
  ABANDONED: ABANDONED_CART,
} as const;

export type CartType = typeof CART;
