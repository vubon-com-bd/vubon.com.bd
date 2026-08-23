/**
 * Cart Promotion Constants
 * Cart promotion configuration and settings
 */

export const CART_PROMOTION = {
  // Promotion Types
  TYPES: {
    AUTO: 'auto',
    CODE: 'code',
    BUNDLE: 'bundle',
    TIERED: 'tiered',
    VOLUME: 'volume',
    FLASH_SALE: 'flash_sale',
    SEASONAL: 'seasonal',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    CUSTOM: 'custom',
  } as const,

  // Promotion Categories
  CATEGORIES: {
    DISCOUNT: 'discount',
    SHIPPING: 'shipping',
    GIFT: 'gift',
    BUNDLE: 'bundle',
    LOYALTY: 'loyalty',
    REFERRAL: 'referral',
    FLASH_SALE: 'flash_sale',
    SEASONAL: 'seasonal',
    CUSTOM: 'custom',
  } as const,

  // Promotion Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DRAFT: 'draft',
  } as const,

  // Promotion Triggers
  TRIGGERS: {
    CART_TOTAL: 'cart_total',
    ITEM_COUNT: 'item_count',
    CATEGORY: 'category',
    PRODUCT: 'product',
    BRAND: 'brand',
    VENDOR: 'vendor',
    CUSTOMER: 'customer',
    LOCATION: 'location',
    DEVICE: 'device',
    TIME: 'time',
    DATE: 'date',
    CUSTOM: 'custom',
  } as const,

  // Promotion Actions
  ACTIONS: {
    PERCENTAGE_DISCOUNT: 'percentage_discount',
    FIXED_DISCOUNT: 'fixed_discount',
    FREE_SHIPPING: 'free_shipping',
    FREE_GIFT: 'free_gift',
    BUNDLE_DISCOUNT: 'bundle_discount',
    TIERED_DISCOUNT: 'tiered_discount',
    VOLUME_DISCOUNT: 'volume_discount',
    BUY_X_GET_Y: 'buy_x_get_y',
    GIFT_CARD: 'gift_card',
    CUSTOM: 'custom',
  } as const,

  // Promotion Priorities
  PRIORITIES: {
    HIGHEST: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    LOWEST: 0,
  } as const,

  // Promotion Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'auto',
    DEFAULT_CATEGORY: 'discount',
    DEFAULT_STATUS: 'active',
    DEFAULT_PRIORITY: 50,
    DEFAULT_TRIGGER: 'cart_total',
    DEFAULT_ACTION: 'percentage_discount',
    DEFAULT_MINIMUM_ORDER: 0,
    DEFAULT_MAXIMUM_ORDER: 0,
    DEFAULT_MINIMUM_QUANTITY: 1,
    DEFAULT_MAXIMUM_QUANTITY: 999,
    DEFAULT_DISCOUNT: 10,
    DEFAULT_MAX_USES: 100,
    DEFAULT_MAX_USES_PER_USER: 1,
    DEFAULT_STACKABLE: false,
    DEFAULT_COMBINABLE: false,
  } as const,

  // Promotion Limits
  LIMITS: {
    MAX_PROMOTIONS_PER_CART: 10,
    MAX_PROMOTIONS_PER_ORDER: 5,
    MAX_PROMOTIONS_PER_USER: 100,
    MAX_DISCOUNT: 100,
    MIN_DISCOUNT: 1,
    MAX_STACKABLE: 5,
  } as const,

  // Promotion Errors
  ERRORS: {
    PROMOTION_NOT_FOUND: 'promotion_not_found',
    PROMOTION_EXPIRED: 'promotion_expired',
    PROMOTION_INACTIVE: 'promotion_inactive',
    PROMOTION_LIMIT_EXCEEDED: 'promotion_limit_exceeded',
    MIN_ORDER_NOT_MET: 'min_order_not_met',
    MAX_ORDER_EXCEEDED: 'max_order_exceeded',
    MIN_QUANTITY_NOT_MET: 'min_quantity_not_met',
    MAX_QUANTITY_EXCEEDED: 'max_quantity_exceeded',
    NOT_STACKABLE: 'not_stackable',
    NOT_COMBINABLE: 'not_combinable',
    INVALID_TRIGGER: 'invalid_trigger',
    INVALID_ACTION: 'invalid_action',
    PERMISSION_DENIED: 'permission_denied',
  } as const,
} as const;

// Promotion Types
export type CartPromotionType = (typeof CART_PROMOTION.TYPES)[keyof typeof CART_PROMOTION.TYPES];

// Promotion Categories
export type CartPromotionCategory =
  (typeof CART_PROMOTION.CATEGORIES)[keyof typeof CART_PROMOTION.CATEGORIES];

// Promotion Statuses
export type CartPromotionStatus =
  (typeof CART_PROMOTION.STATUSES)[keyof typeof CART_PROMOTION.STATUSES];

// Promotion Triggers
export type CartPromotionTrigger =
  (typeof CART_PROMOTION.TRIGGERS)[keyof typeof CART_PROMOTION.TRIGGERS];

// Promotion Actions
export type CartPromotionAction =
  (typeof CART_PROMOTION.ACTIONS)[keyof typeof CART_PROMOTION.ACTIONS];

// Promotion Priorities
export type CartPromotionPriority =
  (typeof CART_PROMOTION.PRIORITIES)[keyof typeof CART_PROMOTION.PRIORITIES];

// Promotion Defaults
export type CartPromotionDefault =
  (typeof CART_PROMOTION.DEFAULTS)[keyof typeof CART_PROMOTION.DEFAULTS];

// Promotion Limits
export type CartPromotionLimit = (typeof CART_PROMOTION.LIMITS)[keyof typeof CART_PROMOTION.LIMITS];

// Promotion Errors
export type CartPromotionError = (typeof CART_PROMOTION.ERRORS)[keyof typeof CART_PROMOTION.ERRORS];

// Utility Functions
export function cartpromotionGetTypeLabel(type: CartPromotionType): string {
  const labels: Record<CartPromotionType, string> = {
    [CART_PROMOTION.TYPES.AUTO]: 'Auto',
    [CART_PROMOTION.TYPES.CODE]: 'Code',
    [CART_PROMOTION.TYPES.BUNDLE]: 'Bundle',
    [CART_PROMOTION.TYPES.TIERED]: 'Tiered',
    [CART_PROMOTION.TYPES.VOLUME]: 'Volume',
    [CART_PROMOTION.TYPES.FLASH_SALE]: 'Flash Sale',
    [CART_PROMOTION.TYPES.SEASONAL]: 'Seasonal',
    [CART_PROMOTION.TYPES.LOYALTY]: 'Loyalty',
    [CART_PROMOTION.TYPES.REFERRAL]: 'Referral',
    [CART_PROMOTION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Promotion Type';
}

export function cartpromotionGetCategoryLabel(category: CartPromotionCategory): string {
  const labels: Record<CartPromotionCategory, string> = {
    [CART_PROMOTION.CATEGORIES.DISCOUNT]: 'Discount',
    [CART_PROMOTION.CATEGORIES.SHIPPING]: 'Shipping',
    [CART_PROMOTION.CATEGORIES.GIFT]: 'Gift',
    [CART_PROMOTION.CATEGORIES.BUNDLE]: 'Bundle',
    [CART_PROMOTION.CATEGORIES.LOYALTY]: 'Loyalty',
    [CART_PROMOTION.CATEGORIES.REFERRAL]: 'Referral',
    [CART_PROMOTION.CATEGORIES.FLASH_SALE]: 'Flash Sale',
    [CART_PROMOTION.CATEGORIES.SEASONAL]: 'Seasonal',
    [CART_PROMOTION.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function cartpromotionGetStatusLabel(status: CartPromotionStatus): string {
  const labels: Record<CartPromotionStatus, string> = {
    [CART_PROMOTION.STATUSES.ACTIVE]: 'Active',
    [CART_PROMOTION.STATUSES.INACTIVE]: 'Inactive',
    [CART_PROMOTION.STATUSES.EXPIRED]: 'Expired',
    [CART_PROMOTION.STATUSES.CANCELLED]: 'Cancelled',
    [CART_PROMOTION.STATUSES.ARCHIVED]: 'Archived',
    [CART_PROMOTION.STATUSES.PENDING]: 'Pending',
    [CART_PROMOTION.STATUSES.APPROVED]: 'Approved',
    [CART_PROMOTION.STATUSES.REJECTED]: 'Rejected',
    [CART_PROMOTION.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function cartpromotionGetTriggerLabel(trigger: CartPromotionTrigger): string {
  const labels: Record<CartPromotionTrigger, string> = {
    [CART_PROMOTION.TRIGGERS.CART_TOTAL]: 'Cart Total',
    [CART_PROMOTION.TRIGGERS.ITEM_COUNT]: 'Item Count',
    [CART_PROMOTION.TRIGGERS.CATEGORY]: 'Category',
    [CART_PROMOTION.TRIGGERS.PRODUCT]: 'Product',
    [CART_PROMOTION.TRIGGERS.BRAND]: 'Brand',
    [CART_PROMOTION.TRIGGERS.VENDOR]: 'Vendor',
    [CART_PROMOTION.TRIGGERS.CUSTOMER]: 'Customer',
    [CART_PROMOTION.TRIGGERS.LOCATION]: 'Location',
    [CART_PROMOTION.TRIGGERS.DEVICE]: 'Device',
    [CART_PROMOTION.TRIGGERS.TIME]: 'Time',
    [CART_PROMOTION.TRIGGERS.DATE]: 'Date',
    [CART_PROMOTION.TRIGGERS.CUSTOM]: 'Custom',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function cartpromotionGetActionLabel(action: CartPromotionAction): string {
  const labels: Record<CartPromotionAction, string> = {
    [CART_PROMOTION.ACTIONS.PERCENTAGE_DISCOUNT]: 'Percentage Discount',
    [CART_PROMOTION.ACTIONS.FIXED_DISCOUNT]: 'Fixed Discount',
    [CART_PROMOTION.ACTIONS.FREE_SHIPPING]: 'Free Shipping',
    [CART_PROMOTION.ACTIONS.FREE_GIFT]: 'Free Gift',
    [CART_PROMOTION.ACTIONS.BUNDLE_DISCOUNT]: 'Bundle Discount',
    [CART_PROMOTION.ACTIONS.TIERED_DISCOUNT]: 'Tiered Discount',
    [CART_PROMOTION.ACTIONS.VOLUME_DISCOUNT]: 'Volume Discount',
    [CART_PROMOTION.ACTIONS.BUY_X_GET_Y]: 'Buy X Get Y',
    [CART_PROMOTION.ACTIONS.GIFT_CARD]: 'Gift Card',
    [CART_PROMOTION.ACTIONS.CUSTOM]: 'Custom',
  };
  return labels[action] || 'Unknown Action';
}

export function cartpromotionGetErrorLabel(error: CartPromotionError): string {
  const labels: Record<CartPromotionError, string> = {
    [CART_PROMOTION.ERRORS.PROMOTION_NOT_FOUND]: 'Promotion Not Found',
    [CART_PROMOTION.ERRORS.PROMOTION_EXPIRED]: 'Promotion Expired',
    [CART_PROMOTION.ERRORS.PROMOTION_INACTIVE]: 'Promotion Inactive',
    [CART_PROMOTION.ERRORS.PROMOTION_LIMIT_EXCEEDED]: 'Promotion Limit Exceeded',
    [CART_PROMOTION.ERRORS.MIN_ORDER_NOT_MET]: 'Minimum Order Not Met',
    [CART_PROMOTION.ERRORS.MAX_ORDER_EXCEEDED]: 'Maximum Order Exceeded',
    [CART_PROMOTION.ERRORS.MIN_QUANTITY_NOT_MET]: 'Minimum Quantity Not Met',
    [CART_PROMOTION.ERRORS.MAX_QUANTITY_EXCEEDED]: 'Maximum Quantity Exceeded',
    [CART_PROMOTION.ERRORS.NOT_STACKABLE]: 'Not Stackable',
    [CART_PROMOTION.ERRORS.NOT_COMBINABLE]: 'Not Combinable',
    [CART_PROMOTION.ERRORS.INVALID_TRIGGER]: 'Invalid Trigger',
    [CART_PROMOTION.ERRORS.INVALID_ACTION]: 'Invalid Action',
    [CART_PROMOTION.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
  };
  return labels[error] || 'Unknown Error';
}

export function cartpromotionIsActive(status: CartPromotionStatus): boolean {
  const activeStatuses: CartPromotionStatus[] = [
    CART_PROMOTION.STATUSES.ACTIVE,
    CART_PROMOTION.STATUSES.APPROVED,
  ];
  return activeStatuses.includes(status);
}

export function cartpromotionIsAutoType(type: CartPromotionType): boolean {
  return type === CART_PROMOTION.TYPES.AUTO;
}

export function cartpromotionIsCodeType(type: CartPromotionType): boolean {
  return type === CART_PROMOTION.TYPES.CODE;
}

export function cartpromotionIsFlashSale(type: CartPromotionType): boolean {
  return type === CART_PROMOTION.TYPES.FLASH_SALE;
}
