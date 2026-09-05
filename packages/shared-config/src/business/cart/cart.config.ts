/**
 * Cart Config
 * কার্ট কনফিগারেশন
 */

import { CART } from '@vubon/shared-constants';

export interface CartConfig {
  enabled: boolean;
  maxItems: number;
  minItems: number;
  maxQuantityPerItem: number;
  minQuantityPerItem: number;
  minOrderAmount: number;
  maxOrderAmount: number;
  currency: string;
  tax: {
    defaultRate: number;
    included: boolean;
    enabled: boolean;
  };
  shipping: {
    enabled: boolean;
    defaultRate: number;
    freeThreshold: number;
  };
  coupon: {
    enabled: boolean;
    maxPerCart: number;
  };
  promotion: {
    enabled: boolean;
    maxPerCart: number;
  };
  session: {
    timeout: number;
    extendOnActivity: boolean;
  };
  abandoned: {
    threshold: number;
    recoveryEnabled: boolean;
    recoveryEmailDelay: number;
    maxRecoveryAttempts: number;
    recoveryWindow: number;
  };
  guest: {
    enabled: boolean;
    sessionTimeout: number;
  };
  saveForLater: {
    enabled: boolean;
    maxItems: number;
  };
  validation: {
    requireStockCheck: boolean;
    requirePriceCheck: boolean;
    allowOutOfStock: boolean;
    allowPriceChange: boolean;
  };
  cache: {
    ttl: number;
    keyPrefix: string;
  };
  status: Record<string, string>;
  types: Record<string, string>;
  itemStatus: Record<string, string>;
  source: Record<string, string>;
  userRoles: Record<string, string>;
  defaults: {
    maxItems: number;
    minItems: number;
    maxQuantityPerItem: number;
    minQuantityPerItem: number;
    abandonedTimeout: number;
    sessionTimeout: number;
  };
}

export const cartConfig: CartConfig = {
  enabled: true,
  maxItems: 50,
  minItems: 0,
  maxQuantityPerItem: 99,
  minQuantityPerItem: 1,
  minOrderAmount: 0,
  maxOrderAmount: 999999,
  currency: 'BDT',

  tax: {
    defaultRate: 15,
    included: true,
    enabled: true,
  },

  shipping: {
    enabled: true,
    defaultRate: 60,
    freeThreshold: 1000,
  },

  coupon: {
    enabled: true,
    maxPerCart: 10,
  },

  promotion: {
    enabled: true,
    maxPerCart: 5,
  },

  session: {
    timeout: CART.DEFAULTS.SESSION_TIMEOUT,
    extendOnActivity: true,
  },

  abandoned: {
    threshold: CART.DEFAULTS.ABANDONED_TIMEOUT,
    recoveryEnabled: true,
    recoveryEmailDelay: 3600,
    maxRecoveryAttempts: 3,
    recoveryWindow: 259200,
  },

  guest: {
    enabled: true,
    sessionTimeout: 86400,
  },

  saveForLater: {
    enabled: true,
    maxItems: 100,
  },

  validation: {
    requireStockCheck: true,
    requirePriceCheck: true,
    allowOutOfStock: false,
    allowPriceChange: false,
  },

  cache: {
    ttl: 3600,
    keyPrefix: 'cart:',
  },

  status: {
    active: CART.STATUS.ACTIVE,
    abandoned: CART.STATUS.ABANDONED,
    checked_out: CART.STATUS.CHECKED_OUT,
    converted: CART.STATUS.CONVERTED,
    expired: CART.STATUS.EXPIRED,
    deleted: CART.STATUS.DELETED,
  },

  types: {
    regular: CART.TYPES.REGULAR,
    wishlist: CART.TYPES.WISHLIST,
    saved: CART.TYPES.SAVED,
    compare: CART.TYPES.COMPARE,
  },

  itemStatus: {
    active: CART.ITEM_STATUS.ACTIVE,
    removed: CART.ITEM_STATUS.REMOVED,
    out_of_stock: CART.ITEM_STATUS.OUT_OF_STOCK,
    price_changed: CART.ITEM_STATUS.PRICE_CHANGED,
    unavailable: CART.ITEM_STATUS.UNAVAILABLE,
  },

  source: {
    web: CART.SOURCE.WEB,
    mobile: CART.SOURCE.MOBILE,
    api: CART.SOURCE.API,
    pos: CART.SOURCE.POS,
    marketplace: CART.SOURCE.MARKETPLACE,
  },

  userRoles: {
    customer: CART.USER_ROLES.CUSTOMER,
    guest: CART.USER_ROLES.GUEST,
    vendor: CART.USER_ROLES.VENDOR,
    admin: CART.USER_ROLES.ADMIN,
  },

  defaults: {
    maxItems: CART.DEFAULTS.MAX_ITEMS,
    minItems: CART.DEFAULTS.MIN_ITEMS,
    maxQuantityPerItem: CART.DEFAULTS.MAX_QUANTITY_PER_ITEM,
    minQuantityPerItem: CART.DEFAULTS.MIN_QUANTITY_PER_ITEM,
    abandonedTimeout: CART.DEFAULTS.ABANDONED_TIMEOUT,
    sessionTimeout: CART.DEFAULTS.SESSION_TIMEOUT,
  },
} as const;

export type CartConfigType = typeof cartConfig;
