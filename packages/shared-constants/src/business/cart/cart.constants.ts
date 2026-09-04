/**
 * Cart Constants - Base
 * কার্ট সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { USER_ROLES } from '../../user/user-role.constants';

export const CART = {
  // Cart status
  STATUS: {
    ACTIVE: 'active',
    ABANDONED: 'abandoned',
    CHECKED_OUT: 'checked_out',
    CONVERTED: 'converted',
    EXPIRED: 'expired',
    DELETED: STATUS.DELETED,
  },

  // Cart types
  TYPES: {
    REGULAR: 'regular',
    WISHLIST: 'wishlist',
    SAVED: 'saved',
    COMPARE: 'compare',
  },

  // Cart item status
  ITEM_STATUS: {
    ACTIVE: 'active',
    REMOVED: 'removed',
    OUT_OF_STOCK: 'out_of_stock',
    PRICE_CHANGED: 'price_changed',
    UNAVAILABLE: 'unavailable',
  },

  // Cart source
  SOURCE: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    POS: 'pos',
    MARKETPLACE: 'marketplace',
  },

  // User roles (from USER_ROLES)
  USER_ROLES: {
    CUSTOMER: USER_ROLES.USER,
    GUEST: USER_ROLES.GUEST,
    VENDOR: USER_ROLES.VENDOR,
    ADMIN: USER_ROLES.ADMIN,
  },

  // Default values
  DEFAULTS: {
    MAX_ITEMS: 100,
    MIN_ITEMS: 0,
    MAX_QUANTITY_PER_ITEM: 99,
    MIN_QUANTITY_PER_ITEM: 1,
    ABANDONED_TIMEOUT: 3600, // 1 hour
    SESSION_TIMEOUT: 86400, // 24 hours
  },
} as const;

export type CartStatus = (typeof CART.STATUS)[keyof typeof CART.STATUS];
export type CartType = (typeof CART.TYPES)[keyof typeof CART.TYPES];
export type CartItemStatus = (typeof CART.ITEM_STATUS)[keyof typeof CART.ITEM_STATUS];
export type CartSource = (typeof CART.SOURCE)[keyof typeof CART.SOURCE];
export type CartUserRole = (typeof CART.USER_ROLES)[keyof typeof CART.USER_ROLES];
