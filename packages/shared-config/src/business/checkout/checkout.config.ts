/**
 * Checkout Config
 * চেকআউট কনফিগারেশন
 */

import { CHECKOUT } from '@vubon/shared-constants';

export interface CheckoutConfig {
  enabled: boolean;
  steps: {
    cart: { required: boolean; order: number };
    login: { required: boolean; order: number };
    shipping: { required: boolean; order: number };
    billing: { required: boolean; order: number };
    payment: { required: boolean; order: number };
    review: { required: boolean; order: number };
    confirmation: { required: boolean; order: number };
  };
  timeout: number;
  maxAttempts: number;
  minOrderAmount: number;
  maxOrderAmount: number;
  currency: string;
  guestCheckout: boolean;
  requireLogin: boolean;
  requireAddress: boolean;
  requirePayment: boolean;
  status: Record<string, string>;
  types: Record<string, string>;
  source: Record<string, string>;
  cartTypes: Record<string, string>;
  defaults: {
    timeout: number;
    maxAttempts: number;
    minOrderAmount: number;
    maxOrderAmount: number;
  };
}

export const checkoutConfig: CheckoutConfig = {
  enabled: true,

  steps: {
    cart: { required: true, order: 1 },
    login: { required: false, order: 2 },
    shipping: { required: true, order: 3 },
    billing: { required: false, order: 4 },
    payment: { required: true, order: 5 },
    review: { required: true, order: 6 },
    confirmation: { required: true, order: 7 },
  },

  timeout: 1800, // 30 minutes
  maxAttempts: 3,
  minOrderAmount: 0,
  maxOrderAmount: 999999,
  currency: 'BDT',
  guestCheckout: true,
  requireLogin: false,
  requireAddress: true,
  requirePayment: true,

  status: {
    initiated: CHECKOUT.STATUS.INITIATED,
    in_progress: CHECKOUT.STATUS.IN_PROGRESS,
    completed: CHECKOUT.STATUS.COMPLETED,
    failed: CHECKOUT.STATUS.FAILED,
    cancelled: CHECKOUT.STATUS.CANCELLED,
    pending: CHECKOUT.STATUS.PENDING,
    expired: CHECKOUT.STATUS.EXPIRED,
  },

  types: {
    guest: CHECKOUT.TYPES.GUEST,
    registered: CHECKOUT.TYPES.REGISTERED,
    express: CHECKOUT.TYPES.EXPRESS,
    bulk: CHECKOUT.TYPES.BULK,
  },

  source: {
    web: CHECKOUT.SOURCE.WEB,
    mobile: CHECKOUT.SOURCE.MOBILE,
    api: CHECKOUT.SOURCE.API,
    pos: CHECKOUT.SOURCE.POS,
    marketplace: CHECKOUT.SOURCE.MARKETPLACE,
  },

  cartTypes: {
    regular: CHECKOUT.CART_TYPES.REGULAR,
    wishlist: CHECKOUT.CART_TYPES.WISHLIST,
    saved: CHECKOUT.CART_TYPES.SAVED,
  },

  defaults: {
    timeout: CHECKOUT.DEFAULTS.TIMEOUT,
    maxAttempts: CHECKOUT.DEFAULTS.MAX_ATTEMPTS,
    minOrderAmount: CHECKOUT.DEFAULTS.MIN_ORDER_AMOUNT,
    maxOrderAmount: CHECKOUT.DEFAULTS.MAX_ORDER_AMOUNT,
  },
} as const;

export type CheckoutConfigType = typeof checkoutConfig;
