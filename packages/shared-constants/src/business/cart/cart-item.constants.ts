/**
 * Cart Item Constants (EXTENDS common/status)
 * @module shared-constants/business/cart/cart-item.constants
 */

import { STATUS } from '../../common/status.constants';

export const CART_ITEM = {
  // Base status from common
  STATUS: STATUS,

  // Cart item specific
  MAX_QUANTITY: 999,
  MIN_QUANTITY: 1,
  DEFAULT_QUANTITY: 1,
  MAX_ITEMS_PER_CART: 50,
  ITEM_CACHE_TTL: 3600,

  // Cart item status
  CART_ITEM_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    REMOVED: 'removed',
    MOVED_TO_SAVED: 'moved_to_saved',
    CONVERTED: 'converted',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
  } as const,

  // Cart item type
  CART_ITEM_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',
    BUNDLE: 'bundle',
    KIT: 'kit',
    DIGITAL: 'digital',
    CUSTOM: 'custom',
  } as const,

  // Cart item discount type
  CART_ITEM_DISCOUNT: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUNDLE: 'bundle',
    BOGO: 'bogo',
  } as const,

  // Cart item validation
  CART_ITEM_VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    MIN_QUANTITY: 'min_quantity',
    MAX_QUANTITY: 'max_quantity',
    STOCK_AVAILABLE: 'stock_available',
    PRICE_VALID: 'price_valid',
    CUSTOM: 'custom',
  } as const,
} as const;

export type CartItemStatus =
  (typeof CART_ITEM.CART_ITEM_STATUS)[keyof typeof CART_ITEM.CART_ITEM_STATUS];
export type CartItemType = (typeof CART_ITEM.CART_ITEM_TYPE)[keyof typeof CART_ITEM.CART_ITEM_TYPE];
export type CartItemDiscount =
  (typeof CART_ITEM.CART_ITEM_DISCOUNT)[keyof typeof CART_ITEM.CART_ITEM_DISCOUNT];
export type CartItemValidation =
  (typeof CART_ITEM.CART_ITEM_VALIDATION)[keyof typeof CART_ITEM.CART_ITEM_VALIDATION];

export const CART_ITEM_STATUS_LABELS: Record<CartItemStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  removed: 'Removed',
  moved_to_saved: 'Moved to Saved',
  converted: 'Converted',
  out_of_stock: 'Out of Stock',
  discontinued: 'Discontinued',
};

export const CART_ITEM_STATUS_COLORS: Record<CartItemStatus, string> = {
  active: '#22c55e',
  inactive: '#9ca3af',
  pending: '#eab308',
  removed: '#ef4444',
  moved_to_saved: '#60a5fa',
  converted: '#22c55e',
  out_of_stock: '#ef4444',
  discontinued: '#6b7280',
};
