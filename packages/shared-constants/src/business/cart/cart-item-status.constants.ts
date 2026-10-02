/**
 * Cart Item Status Constants
 * @module shared-constants/business/cart
 */
export const CART_ITEM_STATUS = {
  ACTIVE: 'active',
  OUT_OF_STOCK: 'out_of_stock',
  UNAVAILABLE: 'unavailable',
  REMOVED: 'removed',
  SAVED: 'saved',
} as const;

export type CartItemStatusType = (typeof CART_ITEM_STATUS)[keyof typeof CART_ITEM_STATUS];
