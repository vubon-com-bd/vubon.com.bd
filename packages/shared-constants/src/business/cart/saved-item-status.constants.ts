/**
 * Saved Item Status Constants
 * @module shared-constants/business/cart
 */
export const SAVED_ITEM_STATUS = {
  ACTIVE: 'active',
  MOVED_TO_CART: 'moved_to_cart',
  REMOVED: 'removed',
  OUT_OF_STOCK: 'out_of_stock',
  UNAVAILABLE: 'unavailable',
} as const;

export type SavedItemStatusType = (typeof SAVED_ITEM_STATUS)[keyof typeof SAVED_ITEM_STATUS];
