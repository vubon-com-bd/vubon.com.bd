/**
 * Coupon Restriction Constants
 * Restriction definitions for coupons
 */

export const COUPON_RESTRICTION = {
  // Restriction Types
  TYPES: {
    MINIMUM_ORDER: 'minimum_order',
    MAXIMUM_ORDER: 'maximum_order',
    MINIMUM_QUANTITY: 'minimum_quantity',
    MAXIMUM_QUANTITY: 'maximum_quantity',
    CATEGORY: 'category',
    PRODUCT: 'product',
    BRAND: 'brand',
    VENDOR: 'vendor',
    CUSTOMER_SEGMENT: 'customer_segment',
    LOCATION: 'location',
    DEVICE: 'device',
    CHANNEL: 'channel',
    PAYMENT_METHOD: 'payment_method',
    DELIVERY_METHOD: 'delivery_method',
    TIME: 'time',
    DAY_OF_WEEK: 'day_of_week',
    DATE_RANGE: 'date_range',
    FIRST_ORDER: 'first_order',
    ORDER_COUNT: 'order_count',
    CUSTOMER_TIER: 'customer_tier',
    BUNDLE: 'bundle',
    COMPANION: 'companion',
    EXCLUDED_CATEGORIES: 'excluded_categories',
    EXCLUDED_PRODUCTS: 'excluded_products',
    EXCLUDED_BRANDS: 'excluded_brands',
    EXCLUDED_VENDORS: 'excluded_vendors',
  } as const,

  // Restriction Operators
  OPERATORS: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    GREATER_THAN_OR_EQUALS: 'greater_than_or_equals',
    LESS_THAN: 'less_than',
    LESS_THAN_OR_EQUALS: 'less_than_or_equals',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    REGEX: 'regex',
  } as const,

  // Restriction Conditions
  CONDITIONS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    XOR: 'xor',
  } as const,

  // Restriction Priorities
  PRIORITIES: {
    HIGHEST: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    LOWEST: 0,
  } as const,

  // Restriction Actions
  ACTIONS: {
    ALLOW: 'allow',
    BLOCK: 'block',
    WARN: 'warn',
    MODIFY: 'modify',
    ESCALATE: 'escalate',
    BYPASS: 'bypass',
  } as const,

  // Restriction Defaults
  DEFAULTS: {
    DEFAULT_OPERATOR: 'equals',
    DEFAULT_CONDITION: 'and',
    DEFAULT_PRIORITY: 50,
    DEFAULT_ACTION: 'allow',
    DEFAULT_MINIMUM_ORDER: 0,
    DEFAULT_MAXIMUM_ORDER: 0,
    DEFAULT_MINIMUM_QUANTITY: 1,
    DEFAULT_MAXIMUM_QUANTITY: 999,
  } as const,

  // Restriction Limits
  LIMITS: {
    MAX_RESTRICTIONS: 20,
    MAX_CONDITIONS: 10,
    MAX_NESTED_CONDITIONS: 3,
    MAX_PRIORITY: 100,
    MIN_PRIORITY: 0,
  } as const,
} as const;

// Restriction Types
export type CouponRestrictionType =
  (typeof COUPON_RESTRICTION.TYPES)[keyof typeof COUPON_RESTRICTION.TYPES];

// Restriction Operators
export type CouponRestrictionOperator =
  (typeof COUPON_RESTRICTION.OPERATORS)[keyof typeof COUPON_RESTRICTION.OPERATORS];

// Restriction Conditions
export type CouponRestrictionCondition =
  (typeof COUPON_RESTRICTION.CONDITIONS)[keyof typeof COUPON_RESTRICTION.CONDITIONS];

// Restriction Priorities
export type CouponRestrictionPriority =
  (typeof COUPON_RESTRICTION.PRIORITIES)[keyof typeof COUPON_RESTRICTION.PRIORITIES];

// Restriction Actions
export type CouponRestrictionAction =
  (typeof COUPON_RESTRICTION.ACTIONS)[keyof typeof COUPON_RESTRICTION.ACTIONS];

// Restriction Defaults
export type CouponRestrictionDefault =
  (typeof COUPON_RESTRICTION.DEFAULTS)[keyof typeof COUPON_RESTRICTION.DEFAULTS];

// Restriction Limits
export type CouponRestrictionLimit =
  (typeof COUPON_RESTRICTION.LIMITS)[keyof typeof COUPON_RESTRICTION.LIMITS];

// Utility Functions
export function couponrestrictionGetTypeLabel(restrictionType: CouponRestrictionType): string {
  const labels: Record<CouponRestrictionType, string> = {
    [COUPON_RESTRICTION.TYPES.MINIMUM_ORDER]: 'Minimum Order',
    [COUPON_RESTRICTION.TYPES.MAXIMUM_ORDER]: 'Maximum Order',
    [COUPON_RESTRICTION.TYPES.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [COUPON_RESTRICTION.TYPES.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [COUPON_RESTRICTION.TYPES.CATEGORY]: 'Category',
    [COUPON_RESTRICTION.TYPES.PRODUCT]: 'Product',
    [COUPON_RESTRICTION.TYPES.BRAND]: 'Brand',
    [COUPON_RESTRICTION.TYPES.VENDOR]: 'Vendor',
    [COUPON_RESTRICTION.TYPES.CUSTOMER_SEGMENT]: 'Customer Segment',
    [COUPON_RESTRICTION.TYPES.LOCATION]: 'Location',
    [COUPON_RESTRICTION.TYPES.DEVICE]: 'Device',
    [COUPON_RESTRICTION.TYPES.CHANNEL]: 'Channel',
    [COUPON_RESTRICTION.TYPES.PAYMENT_METHOD]: 'Payment Method',
    [COUPON_RESTRICTION.TYPES.DELIVERY_METHOD]: 'Delivery Method',
    [COUPON_RESTRICTION.TYPES.TIME]: 'Time',
    [COUPON_RESTRICTION.TYPES.DAY_OF_WEEK]: 'Day of Week',
    [COUPON_RESTRICTION.TYPES.DATE_RANGE]: 'Date Range',
    [COUPON_RESTRICTION.TYPES.FIRST_ORDER]: 'First Order',
    [COUPON_RESTRICTION.TYPES.ORDER_COUNT]: 'Order Count',
    [COUPON_RESTRICTION.TYPES.CUSTOMER_TIER]: 'Customer Tier',
    [COUPON_RESTRICTION.TYPES.BUNDLE]: 'Bundle',
    [COUPON_RESTRICTION.TYPES.COMPANION]: 'Companion',
    [COUPON_RESTRICTION.TYPES.EXCLUDED_CATEGORIES]: 'Excluded Categories',
    [COUPON_RESTRICTION.TYPES.EXCLUDED_PRODUCTS]: 'Excluded Products',
    [COUPON_RESTRICTION.TYPES.EXCLUDED_BRANDS]: 'Excluded Brands',
    [COUPON_RESTRICTION.TYPES.EXCLUDED_VENDORS]: 'Excluded Vendors',
  };
  return labels[restrictionType] || 'Unknown Restriction Type';
}

export function couponrestrictionGetOperatorLabel(operator: CouponRestrictionOperator): string {
  const labels: Record<CouponRestrictionOperator, string> = {
    [COUPON_RESTRICTION.OPERATORS.EQUALS]: 'Equals',
    [COUPON_RESTRICTION.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [COUPON_RESTRICTION.OPERATORS.GREATER_THAN]: 'Greater Than',
    [COUPON_RESTRICTION.OPERATORS.GREATER_THAN_OR_EQUALS]: 'Greater Than or Equals',
    [COUPON_RESTRICTION.OPERATORS.LESS_THAN]: 'Less Than',
    [COUPON_RESTRICTION.OPERATORS.LESS_THAN_OR_EQUALS]: 'Less Than or Equals',
    [COUPON_RESTRICTION.OPERATORS.BETWEEN]: 'Between',
    [COUPON_RESTRICTION.OPERATORS.IN]: 'In',
    [COUPON_RESTRICTION.OPERATORS.NOT_IN]: 'Not In',
    [COUPON_RESTRICTION.OPERATORS.CONTAINS]: 'Contains',
    [COUPON_RESTRICTION.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [COUPON_RESTRICTION.OPERATORS.STARTS_WITH]: 'Starts With',
    [COUPON_RESTRICTION.OPERATORS.ENDS_WITH]: 'Ends With',
    [COUPON_RESTRICTION.OPERATORS.REGEX]: 'Regex',
  };
  return labels[operator] || 'Unknown Operator';
}

export function couponrestrictionGetConditionLabel(condition: CouponRestrictionCondition): string {
  const labels: Record<CouponRestrictionCondition, string> = {
    [COUPON_RESTRICTION.CONDITIONS.AND]: 'And',
    [COUPON_RESTRICTION.CONDITIONS.OR]: 'Or',
    [COUPON_RESTRICTION.CONDITIONS.NOT]: 'Not',
    [COUPON_RESTRICTION.CONDITIONS.XOR]: 'Xor',
  };
  return labels[condition] || 'Unknown Condition';
}

export function couponrestrictionGetActionLabel(action: CouponRestrictionAction): string {
  const labels: Record<CouponRestrictionAction, string> = {
    [COUPON_RESTRICTION.ACTIONS.ALLOW]: 'Allow',
    [COUPON_RESTRICTION.ACTIONS.BLOCK]: 'Block',
    [COUPON_RESTRICTION.ACTIONS.WARN]: 'Warn',
    [COUPON_RESTRICTION.ACTIONS.MODIFY]: 'Modify',
    [COUPON_RESTRICTION.ACTIONS.ESCALATE]: 'Escalate',
    [COUPON_RESTRICTION.ACTIONS.BYPASS]: 'Bypass',
  };
  return labels[action] || 'Unknown Action';
}

export function couponrestrictionIsOrderRestriction(
  restrictionType: CouponRestrictionType
): boolean {
  const orderRestrictions: CouponRestrictionType[] = [
    COUPON_RESTRICTION.TYPES.MINIMUM_ORDER,
    COUPON_RESTRICTION.TYPES.MAXIMUM_ORDER,
    COUPON_RESTRICTION.TYPES.FIRST_ORDER,
    COUPON_RESTRICTION.TYPES.ORDER_COUNT,
  ];
  return orderRestrictions.includes(restrictionType);
}

export function couponrestrictionIsProductRestriction(
  restrictionType: CouponRestrictionType
): boolean {
  const productRestrictions: CouponRestrictionType[] = [
    COUPON_RESTRICTION.TYPES.CATEGORY,
    COUPON_RESTRICTION.TYPES.PRODUCT,
    COUPON_RESTRICTION.TYPES.BRAND,
    COUPON_RESTRICTION.TYPES.VENDOR,
    COUPON_RESTRICTION.TYPES.EXCLUDED_CATEGORIES,
    COUPON_RESTRICTION.TYPES.EXCLUDED_PRODUCTS,
    COUPON_RESTRICTION.TYPES.EXCLUDED_BRANDS,
    COUPON_RESTRICTION.TYPES.EXCLUDED_VENDORS,
  ];
  return productRestrictions.includes(restrictionType);
}

export function couponrestrictionIsCustomerRestriction(
  restrictionType: CouponRestrictionType
): boolean {
  const customerRestrictions: CouponRestrictionType[] = [
    COUPON_RESTRICTION.TYPES.CUSTOMER_SEGMENT,
    COUPON_RESTRICTION.TYPES.CUSTOMER_TIER,
    COUPON_RESTRICTION.TYPES.FIRST_ORDER,
    COUPON_RESTRICTION.TYPES.ORDER_COUNT,
  ];
  return customerRestrictions.includes(restrictionType);
}

export function couponrestrictionIsTimeRestriction(
  restrictionType: CouponRestrictionType
): boolean {
  const timeRestrictions: CouponRestrictionType[] = [
    COUPON_RESTRICTION.TYPES.TIME,
    COUPON_RESTRICTION.TYPES.DAY_OF_WEEK,
    COUPON_RESTRICTION.TYPES.DATE_RANGE,
  ];
  return timeRestrictions.includes(restrictionType);
}

export function couponrestrictionGetDefaultOperator(): CouponRestrictionOperator {
  return COUPON_RESTRICTION.DEFAULTS.DEFAULT_OPERATOR;
}

export function couponrestrictionGetDefaultPriority(): number {
  return COUPON_RESTRICTION.DEFAULTS.DEFAULT_PRIORITY;
}
