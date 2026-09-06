/**
 * Saved For Later Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/saved-for-later.constants
 */

import { STATUS } from '../../common/status.constants';

export const SAVED_FOR_LATER = {
  // Base status from common
  STATUS: STATUS,

  // Saved for later specific
  MAX_SAVED_ITEMS: 100,
  SAVED_ITEMS_CACHE_TTL: 86400, // 24 hours
  SAVED_ITEMS_EXPIRY_DAYS: 90,

  // Saved item status
  SAVED_ITEM_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MOVED_TO_CART: 'moved_to_cart',
    REMOVED: 'removed',
    OUT_OF_STOCK: 'out_of_stock',
    PRICE_CHANGED: 'price_changed',
    DISCONTINUED: 'discontinued',
    EXPIRED: 'expired',
  } as const,

  // Saved item type
  SAVED_ITEM_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    BUNDLE: 'bundle',
    KIT: 'kit',
    SERVICE: 'service',
  } as const,

  // Saved item reason
  SAVED_ITEM_REASON: {
    LATER_PURCHASE: 'later_purchase',
    COMPARE: 'compare',
    WISHLIST: 'wishlist',
    GIFT: 'gift',
    BACK_IN_STOCK: 'back_in_stock',
    PRICE_DROP: 'price_drop',
    RESEARCH: 'research',
    CUSTOM: 'custom',
  } as const,
} as const;

export type SavedItemStatus =
  (typeof SAVED_FOR_LATER.SAVED_ITEM_STATUS)[keyof typeof SAVED_FOR_LATER.SAVED_ITEM_STATUS];
export type SavedItemType =
  (typeof SAVED_FOR_LATER.SAVED_ITEM_TYPE)[keyof typeof SAVED_FOR_LATER.SAVED_ITEM_TYPE];
export type SavedItemReason =
  (typeof SAVED_FOR_LATER.SAVED_ITEM_REASON)[keyof typeof SAVED_FOR_LATER.SAVED_ITEM_REASON];

export const SAVED_ITEM_STATUS_LABELS: Record<SavedItemStatus, string> = {
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.ACTIVE]: 'Active',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.INACTIVE]: 'Inactive',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.MOVED_TO_CART]: 'Moved to Cart',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.REMOVED]: 'Removed',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.OUT_OF_STOCK]: 'Out of Stock',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.PRICE_CHANGED]: 'Price Changed',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.DISCONTINUED]: 'Discontinued',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.EXPIRED]: 'Expired',
};

export const SAVED_ITEM_STATUS_COLORS: Record<SavedItemStatus, string> = {
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.ACTIVE]: '#22c55e',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.INACTIVE]: '#9ca3af',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.MOVED_TO_CART]: '#60a5fa',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.REMOVED]: '#ef4444',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.OUT_OF_STOCK]: '#ef4444',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.PRICE_CHANGED]: '#f59e0b',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.DISCONTINUED]: '#6b7280',
  [SAVED_FOR_LATER.SAVED_ITEM_STATUS.EXPIRED]: '#9ca3af',
};
