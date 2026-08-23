/**
 * Order Type Constants
 * Order type definitions for checkout
 */

export const ORDER_TYPE = {
  // Order Types
  TYPES: {
    STANDARD: 'standard',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    EXPRESS: 'express',
    BULK: 'bulk',
    WHOLESALE: 'wholesale',
    CORPORATE: 'corporate',
    GIFT: 'gift',
    SUBSCRIPTION: 'subscription',
    REPEAT: 'repeat',
    CUSTOM: 'custom',
  } as const,

  // Order Categories
  CATEGORIES: {
    RETAIL: 'retail',
    WHOLESALE: 'wholesale',
    CORPORATE: 'corporate',
    B2B: 'b2b',
    B2C: 'b2c',
    D2C: 'd2c',
  } as const,

  // Order Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Order Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'standard',
    DEFAULT_CATEGORY: 'retail',
    DEFAULT_PRIORITY: 'medium',
  } as const,
} as const;

// Order Types
export type OrderTypeType = (typeof ORDER_TYPE.TYPES)[keyof typeof ORDER_TYPE.TYPES];

// Order Categories
export type OrderCategory = (typeof ORDER_TYPE.CATEGORIES)[keyof typeof ORDER_TYPE.CATEGORIES];

// Order Priorities
export type OrderPriority = (typeof ORDER_TYPE.PRIORITIES)[keyof typeof ORDER_TYPE.PRIORITIES];

// Order Defaults
export type OrderTypeDefault = (typeof ORDER_TYPE.DEFAULTS)[keyof typeof ORDER_TYPE.DEFAULTS];

// Utility Functions
export function ordertypeGetTypeLabel(type: OrderTypeType): string {
  const labels: Record<OrderTypeType, string> = {
    [ORDER_TYPE.TYPES.STANDARD]: 'Standard Order',
    [ORDER_TYPE.TYPES.PRE_ORDER]: 'Pre-Order',
    [ORDER_TYPE.TYPES.BACK_ORDER]: 'Back Order',
    [ORDER_TYPE.TYPES.EXPRESS]: 'Express Order',
    [ORDER_TYPE.TYPES.BULK]: 'Bulk Order',
    [ORDER_TYPE.TYPES.WHOLESALE]: 'Wholesale Order',
    [ORDER_TYPE.TYPES.CORPORATE]: 'Corporate Order',
    [ORDER_TYPE.TYPES.GIFT]: 'Gift Order',
    [ORDER_TYPE.TYPES.SUBSCRIPTION]: 'Subscription Order',
    [ORDER_TYPE.TYPES.REPEAT]: 'Repeat Order',
    [ORDER_TYPE.TYPES.CUSTOM]: 'Custom Order',
  };
  return labels[type] || 'Unknown Order Type';
}

export function ordertypeGetCategoryLabel(category: OrderCategory): string {
  const labels: Record<OrderCategory, string> = {
    [ORDER_TYPE.CATEGORIES.RETAIL]: 'Retail',
    [ORDER_TYPE.CATEGORIES.WHOLESALE]: 'Wholesale',
    [ORDER_TYPE.CATEGORIES.CORPORATE]: 'Corporate',
    [ORDER_TYPE.CATEGORIES.B2B]: 'B2B',
    [ORDER_TYPE.CATEGORIES.B2C]: 'B2C',
    [ORDER_TYPE.CATEGORIES.D2C]: 'D2C',
  };
  return labels[category] || 'Unknown Category';
}

export function ordertypeGetPriorityLabel(priority: OrderPriority): string {
  const labels: Record<OrderPriority, string> = {
    [ORDER_TYPE.PRIORITIES.CRITICAL]: 'Critical',
    [ORDER_TYPE.PRIORITIES.HIGH]: 'High',
    [ORDER_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [ORDER_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown Priority';
}

export function ordertypeIsStandard(type: OrderTypeType): boolean {
  return type === ORDER_TYPE.TYPES.STANDARD;
}

export function ordertypeIsPreOrder(type: OrderTypeType): boolean {
  return type === ORDER_TYPE.TYPES.PRE_ORDER;
}

export function ordertypeIsWholesale(type: OrderTypeType): boolean {
  return type === ORDER_TYPE.TYPES.WHOLESALE || type === ORDER_TYPE.TYPES.BULK;
}

export function ordertypeIsSubscription(type: OrderTypeType): boolean {
  return type === ORDER_TYPE.TYPES.SUBSCRIPTION;
}

export function ordertypeGetDefaultType(): OrderTypeType {
  return ORDER_TYPE.DEFAULTS.DEFAULT_TYPE;
}

export function ordertypeGetDefaultPriority(): OrderPriority {
  return ORDER_TYPE.DEFAULTS.DEFAULT_PRIORITY;
}
