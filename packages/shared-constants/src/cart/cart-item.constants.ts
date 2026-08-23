/**
 * Cart Item Constants
 * Cart item configuration and settings
 */

export const CART_ITEM = {
  // Item Types
  TYPES: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    BUNDLE: 'bundle',
    DIGITAL: 'digital',
    SERVICE: 'service',
    SUBSCRIPTION: 'subscription',
    GIFT: 'gift',
    CUSTOM: 'custom',
  } as const,

  // Item Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    OUT_OF_STOCK: 'out_of_stock',
    BACKORDER: 'backorder',
    PRE_ORDER: 'pre_order',
    DISCONTINUED: 'discontinued',
    REMOVED: 'removed',
    ARCHIVED: 'archived',
  } as const,

  // Item Discount Types
  DISCOUNT_TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
    CUSTOM: 'custom',
  } as const,

  // Item Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_STATUS: 'active',
    DEFAULT_QUANTITY: 1,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    DEFAULT_WEIGHT: 0,
    DEFAULT_WIDTH: 0,
    DEFAULT_HEIGHT: 0,
    DEFAULT_LENGTH: 0,
    DEFAULT_TAX_RATE: 0,
    DEFAULT_DISCOUNT: 0,
  } as const,

  // Item Limits
  LIMITS: {
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    MAX_ITEMS_PER_CART: 50,
    MAX_WEIGHT: 1000,
    MAX_DIMENSION: 1000,
    MAX_DISCOUNT: 100,
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
  } as const,

  // Item Errors
  ERRORS: {
    ITEM_NOT_FOUND: 'item_not_found',
    INSUFFICIENT_STOCK: 'insufficient_stock',
    INVALID_QUANTITY: 'invalid_quantity',
    INVALID_PRICE: 'invalid_price',
    ITEM_LIMIT_EXCEEDED: 'item_limit_exceeded',
    OUT_OF_STOCK: 'out_of_stock',
    DISCONTINUED: 'discontinued',
    NOT_AVAILABLE: 'not_available',
  } as const,
} as const;

// Item Types
export type CartItemType = (typeof CART_ITEM.TYPES)[keyof typeof CART_ITEM.TYPES];

// Item Statuses
export type CartItemStatus = (typeof CART_ITEM.STATUSES)[keyof typeof CART_ITEM.STATUSES];

// Item Discount Types
export type CartItemDiscountType =
  (typeof CART_ITEM.DISCOUNT_TYPES)[keyof typeof CART_ITEM.DISCOUNT_TYPES];

// Item Defaults
export type CartItemDefault = (typeof CART_ITEM.DEFAULTS)[keyof typeof CART_ITEM.DEFAULTS];

// Item Limits
export type CartItemLimit = (typeof CART_ITEM.LIMITS)[keyof typeof CART_ITEM.LIMITS];

// Item Errors
export type CartItemError = (typeof CART_ITEM.ERRORS)[keyof typeof CART_ITEM.ERRORS];

// Utility Functions
export function cartitemGetTypeLabel(type: CartItemType): string {
  const labels: Record<CartItemType, string> = {
    [CART_ITEM.TYPES.PRODUCT]: 'Product',
    [CART_ITEM.TYPES.VARIANT]: 'Variant',
    [CART_ITEM.TYPES.BUNDLE]: 'Bundle',
    [CART_ITEM.TYPES.DIGITAL]: 'Digital',
    [CART_ITEM.TYPES.SERVICE]: 'Service',
    [CART_ITEM.TYPES.SUBSCRIPTION]: 'Subscription',
    [CART_ITEM.TYPES.GIFT]: 'Gift',
    [CART_ITEM.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Item Type';
}

export function cartitemGetStatusLabel(status: CartItemStatus): string {
  const labels: Record<CartItemStatus, string> = {
    [CART_ITEM.STATUSES.ACTIVE]: 'Active',
    [CART_ITEM.STATUSES.INACTIVE]: 'Inactive',
    [CART_ITEM.STATUSES.OUT_OF_STOCK]: 'Out of Stock',
    [CART_ITEM.STATUSES.BACKORDER]: 'Backorder',
    [CART_ITEM.STATUSES.PRE_ORDER]: 'Pre-Order',
    [CART_ITEM.STATUSES.DISCONTINUED]: 'Discontinued',
    [CART_ITEM.STATUSES.REMOVED]: 'Removed',
    [CART_ITEM.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function cartitemGetDiscountTypeLabel(discountType: CartItemDiscountType): string {
  const labels: Record<CartItemDiscountType, string> = {
    [CART_ITEM.DISCOUNT_TYPES.PERCENTAGE]: 'Percentage',
    [CART_ITEM.DISCOUNT_TYPES.FIXED]: 'Fixed',
    [CART_ITEM.DISCOUNT_TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [CART_ITEM.DISCOUNT_TYPES.TIERED]: 'Tiered',
    [CART_ITEM.DISCOUNT_TYPES.VOLUME]: 'Volume',
    [CART_ITEM.DISCOUNT_TYPES.BUNDLE]: 'Bundle',
    [CART_ITEM.DISCOUNT_TYPES.CUSTOM]: 'Custom',
  };
  return labels[discountType] || 'Unknown Discount Type';
}

export function cartitemGetErrorLabel(error: CartItemError): string {
  const labels: Record<CartItemError, string> = {
    [CART_ITEM.ERRORS.ITEM_NOT_FOUND]: 'Item Not Found',
    [CART_ITEM.ERRORS.INSUFFICIENT_STOCK]: 'Insufficient Stock',
    [CART_ITEM.ERRORS.INVALID_QUANTITY]: 'Invalid Quantity',
    [CART_ITEM.ERRORS.INVALID_PRICE]: 'Invalid Price',
    [CART_ITEM.ERRORS.ITEM_LIMIT_EXCEEDED]: 'Item Limit Exceeded',
    [CART_ITEM.ERRORS.OUT_OF_STOCK]: 'Out of Stock',
    [CART_ITEM.ERRORS.DISCONTINUED]: 'Discontinued',
    [CART_ITEM.ERRORS.NOT_AVAILABLE]: 'Not Available',
  };
  return labels[error] || 'Unknown Error';
}

export function cartitemIsAvailable(status: CartItemStatus): boolean {
  const availableStatuses: CartItemStatus[] = [
    CART_ITEM.STATUSES.ACTIVE,
    CART_ITEM.STATUSES.BACKORDER,
    CART_ITEM.STATUSES.PRE_ORDER,
  ];
  return availableStatuses.includes(status);
}

export function cartitemIsInStock(status: CartItemStatus): boolean {
  return status === CART_ITEM.STATUSES.ACTIVE;
}

export function cartitemGetDefaultQuantity(): number {
  return CART_ITEM.DEFAULTS.DEFAULT_QUANTITY;
}

export function cartitemGetMaxQuantity(): number {
  return CART_ITEM.LIMITS.MAX_QUANTITY;
}
