/**
 * Cart Constants
 * Core cart configuration and settings
 */

export const CART = {
  // Cart Types
  TYPES: {
    REGULAR: 'regular',
    GUEST: 'guest',
    REGISTERED: 'registered',
    WHOLESALE: 'wholesale',
    CORPORATE: 'corporate',
    BULK: 'bulk',
    CUSTOM: 'custom',
  } as const,

  // Cart Categories
  CATEGORIES: {
    STANDARD: 'standard',
    PROMOTIONAL: 'promotional',
    SEASONAL: 'seasonal',
    FLASH_SALE: 'flash_sale',
    PRE_ORDER: 'pre_order',
    BACKORDER: 'backorder',
    CUSTOM: 'custom',
  } as const,

  // Cart Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ABANDONED: 'abandoned',
    CONVERTED: 'converted',
    EXPIRED: 'expired',
    MERGED: 'merged',
    SPLIT: 'split',
    SUSPENDED: 'suspended',
    RECOVERED: 'recovered',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Cart Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NORMAL: 'normal',
  } as const,

  // Cart Sessions
  SESSIONS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    TERMINATED: 'terminated',
    TIMEOUT: 'timeout',
  } as const,

  // Cart Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'regular',
    DEFAULT_CATEGORY: 'standard',
    DEFAULT_STATUS: 'active',
    DEFAULT_PRIORITY: 'normal',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_LOCALE: 'bn_BD',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_EXPIRY_DAYS: 30,
    DEFAULT_MAX_ITEMS: 50,
    DEFAULT_MIN_ORDER: 0,
    DEFAULT_MAX_ORDER: 1000000,
    DEFAULT_SESSION_TIMEOUT: 3600,
    DEFAULT_REMINDER_INTERVAL: 86400,
    MAX_CARTS_PER_USER: 10,
  } as const,

  // Cart Limits
  LIMITS: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 50,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 1000000,
    MAX_CARTS_PER_USER: 10,
    MAX_CART_HISTORY: 100,
    MAX_ABANDONED_DAYS: 90,
    DEFAULT_EXPIRY_HOURS: 24,
  } as const,

  // Cart Errors
  ERRORS: {
    CART_NOT_FOUND: 'cart_not_found',
    CART_EXPIRED: 'cart_expired',
    CART_FULL: 'cart_full',
    ITEM_LIMIT_EXCEEDED: 'item_limit_exceeded',
    QUANTITY_LIMIT_EXCEEDED: 'quantity_limit_exceeded',
    ORDER_LIMIT_EXCEEDED: 'order_limit_exceeded',
    INVALID_ITEM: 'invalid_item',
    INVALID_QUANTITY: 'invalid_quantity',
    INVALID_TYPE: 'invalid_type',
    PERMISSION_DENIED: 'permission_denied',
    MERGE_FAILED: 'merge_failed',
    CONVERSION_FAILED: 'conversion_failed',
    RECOVERY_FAILED: 'recovery_failed',
  } as const,
} as const;

// Cart Types
export type CartType = (typeof CART.TYPES)[keyof typeof CART.TYPES];

// Cart Categories
export type CartCategory = (typeof CART.CATEGORIES)[keyof typeof CART.CATEGORIES];

// Cart Statuses
export type CartStatus = (typeof CART.STATUSES)[keyof typeof CART.STATUSES];

// Cart Priorities
export type CartPriority = (typeof CART.PRIORITIES)[keyof typeof CART.PRIORITIES];

// Cart Sessions
export type CartSession = (typeof CART.SESSIONS)[keyof typeof CART.SESSIONS];

// Cart Defaults
export type CartDefault = (typeof CART.DEFAULTS)[keyof typeof CART.DEFAULTS];

// Cart Limits
export type CartLimit = (typeof CART.LIMITS)[keyof typeof CART.LIMITS];

// Cart Errors
export type CartError = (typeof CART.ERRORS)[keyof typeof CART.ERRORS];

// Utility Functions
export function cartGetTypeLabel(type: CartType): string {
  const labels: Record<CartType, string> = {
    [CART.TYPES.REGULAR]: 'Regular',
    [CART.TYPES.GUEST]: 'Guest',
    [CART.TYPES.REGISTERED]: 'Registered',
    [CART.TYPES.WHOLESALE]: 'Wholesale',
    [CART.TYPES.CORPORATE]: 'Corporate',
    [CART.TYPES.BULK]: 'Bulk',
    [CART.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Cart Type';
}

export function cartGetCategoryLabel(category: CartCategory): string {
  const labels: Record<CartCategory, string> = {
    [CART.CATEGORIES.STANDARD]: 'Standard',
    [CART.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [CART.CATEGORIES.SEASONAL]: 'Seasonal',
    [CART.CATEGORIES.FLASH_SALE]: 'Flash Sale',
    [CART.CATEGORIES.PRE_ORDER]: 'Pre-Order',
    [CART.CATEGORIES.BACKORDER]: 'Backorder',
    [CART.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function cartGetStatusLabel(status: CartStatus): string {
  const labels: Record<CartStatus, string> = {
    [CART.STATUSES.ACTIVE]: 'Active',
    [CART.STATUSES.INACTIVE]: 'Inactive',
    [CART.STATUSES.ABANDONED]: 'Abandoned',
    [CART.STATUSES.CONVERTED]: 'Converted',
    [CART.STATUSES.EXPIRED]: 'Expired',
    [CART.STATUSES.MERGED]: 'Merged',
    [CART.STATUSES.SPLIT]: 'Split',
    [CART.STATUSES.SUSPENDED]: 'Suspended',
    [CART.STATUSES.RECOVERED]: 'Recovered',
    [CART.STATUSES.CANCELLED]: 'Cancelled',
    [CART.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function cartGetPriorityLabel(priority: CartPriority): string {
  const labels: Record<CartPriority, string> = {
    [CART.PRIORITIES.HIGH]: 'High',
    [CART.PRIORITIES.MEDIUM]: 'Medium',
    [CART.PRIORITIES.LOW]: 'Low',
    [CART.PRIORITIES.NORMAL]: 'Normal',
  };
  return labels[priority] || 'Unknown Priority';
}

export function cartGetErrorLabel(error: CartError): string {
  const labels: Record<CartError, string> = {
    [CART.ERRORS.CART_NOT_FOUND]: 'Cart Not Found',
    [CART.ERRORS.CART_EXPIRED]: 'Cart Expired',
    [CART.ERRORS.CART_FULL]: 'Cart Full',
    [CART.ERRORS.ITEM_LIMIT_EXCEEDED]: 'Item Limit Exceeded',
    [CART.ERRORS.QUANTITY_LIMIT_EXCEEDED]: 'Quantity Limit Exceeded',
    [CART.ERRORS.ORDER_LIMIT_EXCEEDED]: 'Order Limit Exceeded',
    [CART.ERRORS.INVALID_ITEM]: 'Invalid Item',
    [CART.ERRORS.INVALID_QUANTITY]: 'Invalid Quantity',
    [CART.ERRORS.INVALID_TYPE]: 'Invalid Type',
    [CART.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [CART.ERRORS.MERGE_FAILED]: 'Merge Failed',
    [CART.ERRORS.CONVERSION_FAILED]: 'Conversion Failed',
    [CART.ERRORS.RECOVERY_FAILED]: 'Recovery Failed',
  };
  return labels[error] || 'Unknown Error';
}

export function cartIsActive(status: CartStatus): boolean {
  const activeStatuses: CartStatus[] = [CART.STATUSES.ACTIVE, CART.STATUSES.RECOVERED];
  return activeStatuses.includes(status);
}

export function cartIsAbandoned(status: CartStatus): boolean {
  return status === CART.STATUSES.ABANDONED;
}

export function cartIsConverted(status: CartStatus): boolean {
  return status === CART.STATUSES.CONVERTED;
}

export function cartIsEditable(status: CartStatus): boolean {
  const editableStatuses: CartStatus[] = [
    CART.STATUSES.ACTIVE,
    CART.STATUSES.ABANDONED,
    CART.STATUSES.RECOVERED,
  ];
  return editableStatuses.includes(status);
}

export function cartGetDefaultExpiryHours(): number {
  return CART.LIMITS.DEFAULT_EXPIRY_HOURS;
}

export function cartGetDefaultMaxItems(): number {
  return CART.DEFAULTS.DEFAULT_MAX_ITEMS;
}

export function cartGetDefaultCurrency(): string {
  return CART.DEFAULTS.DEFAULT_CURRENCY;
}
