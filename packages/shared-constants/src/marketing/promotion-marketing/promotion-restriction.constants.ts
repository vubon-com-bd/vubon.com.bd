/**
 * Promotion Restriction Constants
 * Restriction configurations for promotions
 */

export const MARKETINGPROMOTION_RESTRICTION = {
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
    NAND: 'nand',
    NOR: 'nor',
    XNOR: 'xnor',
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
    DEFAULT_MAXIMUM_QUANTITY: 100,
  } as const,
} as const;

// Restriction Types
export type MarketingPromotionRestrictionType =
  (typeof MARKETINGPROMOTION_RESTRICTION.TYPES)[keyof typeof MARKETINGPROMOTION_RESTRICTION.TYPES];

// Restriction Operators
export type MarketingPromotionRestrictionOperator =
  (typeof MARKETINGPROMOTION_RESTRICTION.OPERATORS)[keyof typeof MARKETINGPROMOTION_RESTRICTION.OPERATORS];

// Restriction Conditions
export type MarketingPromotionRestrictionCondition =
  (typeof MARKETINGPROMOTION_RESTRICTION.CONDITIONS)[keyof typeof MARKETINGPROMOTION_RESTRICTION.CONDITIONS];

// Restriction Priorities
export type MarketingPromotionRestrictionPriority =
  (typeof MARKETINGPROMOTION_RESTRICTION.PRIORITIES)[keyof typeof MARKETINGPROMOTION_RESTRICTION.PRIORITIES];

// Restriction Actions
export type MarketingPromotionRestrictionAction =
  (typeof MARKETINGPROMOTION_RESTRICTION.ACTIONS)[keyof typeof MARKETINGPROMOTION_RESTRICTION.ACTIONS];

// Restriction Defaults
export type MarketingPromotionRestrictionDefault =
  (typeof MARKETINGPROMOTION_RESTRICTION.DEFAULTS)[keyof typeof MARKETINGPROMOTION_RESTRICTION.DEFAULTS];

// Utility Functions
export function marketingpromotionGetRestrictionTypeLabel(
  restrictionType: MarketingPromotionRestrictionType
): string {
  const labels: Record<MarketingPromotionRestrictionType, string> = {
    [MARKETINGPROMOTION_RESTRICTION.TYPES.MINIMUM_ORDER]: 'Minimum Order',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.MAXIMUM_ORDER]: 'Maximum Order',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.CATEGORY]: 'Category',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.PRODUCT]: 'Product',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.BRAND]: 'Brand',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.VENDOR]: 'Vendor',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.CUSTOMER_SEGMENT]: 'Customer Segment',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.LOCATION]: 'Location',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.DEVICE]: 'Device',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.CHANNEL]: 'Channel',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.PAYMENT_METHOD]: 'Payment Method',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.DELIVERY_METHOD]: 'Delivery Method',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.TIME]: 'Time',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.DAY_OF_WEEK]: 'Day of Week',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.DATE_RANGE]: 'Date Range',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.FIRST_ORDER]: 'First Order',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.ORDER_COUNT]: 'Order Count',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.CUSTOMER_TIER]: 'Customer Tier',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.BUNDLE]: 'Bundle',
    [MARKETINGPROMOTION_RESTRICTION.TYPES.COMPANION]: 'Companion',
  };
  return labels[restrictionType] || 'Unknown Restriction';
}

export function marketingpromotionGetRestrictionOperatorLabel(
  operator: MarketingPromotionRestrictionOperator
): string {
  const labels: Record<MarketingPromotionRestrictionOperator, string> = {
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.EQUALS]: 'Equals',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.GREATER_THAN]: 'Greater Than',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.GREATER_THAN_OR_EQUALS]: 'Greater Than or Equals',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.LESS_THAN]: 'Less Than',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.LESS_THAN_OR_EQUALS]: 'Less Than or Equals',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.BETWEEN]: 'Between',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.IN]: 'In',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.NOT_IN]: 'Not In',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.CONTAINS]: 'Contains',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.STARTS_WITH]: 'Starts With',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.ENDS_WITH]: 'Ends With',
    [MARKETINGPROMOTION_RESTRICTION.OPERATORS.REGEX]: 'Regex',
  };
  return labels[operator] || 'Unknown Operator';
}

export function marketingpromotionGetRestrictionConditionLabel(
  condition: MarketingPromotionRestrictionCondition
): string {
  const labels: Record<MarketingPromotionRestrictionCondition, string> = {
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.AND]: 'And',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.OR]: 'Or',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.NOT]: 'Not',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.XOR]: 'Xor',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.NAND]: 'Nand',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.NOR]: 'Nor',
    [MARKETINGPROMOTION_RESTRICTION.CONDITIONS.XNOR]: 'Xnor',
  };
  return labels[condition] || 'Unknown Condition';
}

export function marketingpromotionGetRestrictionActionLabel(
  action: MarketingPromotionRestrictionAction
): string {
  const labels: Record<MarketingPromotionRestrictionAction, string> = {
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.ALLOW]: 'Allow',
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.BLOCK]: 'Block',
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.WARN]: 'Warn',
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.MODIFY]: 'Modify',
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.ESCALATE]: 'Escalate',
    [MARKETINGPROMOTION_RESTRICTION.ACTIONS.BYPASS]: 'Bypass',
  };
  return labels[action] || 'Unknown Action';
}

export function marketingpromotionIsOrderRestriction(
  restrictionType: MarketingPromotionRestrictionType
): boolean {
  const orderRestrictions: MarketingPromotionRestrictionType[] = [
    MARKETINGPROMOTION_RESTRICTION.TYPES.MINIMUM_ORDER,
    MARKETINGPROMOTION_RESTRICTION.TYPES.MAXIMUM_ORDER,
  ];
  return orderRestrictions.includes(restrictionType);
}

export function marketingpromotionIsProductRestriction(
  restrictionType: MarketingPromotionRestrictionType
): boolean {
  const productRestrictions: MarketingPromotionRestrictionType[] = [
    MARKETINGPROMOTION_RESTRICTION.TYPES.CATEGORY,
    MARKETINGPROMOTION_RESTRICTION.TYPES.PRODUCT,
    MARKETINGPROMOTION_RESTRICTION.TYPES.BRAND,
    MARKETINGPROMOTION_RESTRICTION.TYPES.VENDOR,
  ];
  return productRestrictions.includes(restrictionType);
}

export function marketingpromotionIsCustomerRestriction(
  restrictionType: MarketingPromotionRestrictionType
): boolean {
  const customerRestrictions: MarketingPromotionRestrictionType[] = [
    MARKETINGPROMOTION_RESTRICTION.TYPES.CUSTOMER_SEGMENT,
    MARKETINGPROMOTION_RESTRICTION.TYPES.FIRST_ORDER,
    MARKETINGPROMOTION_RESTRICTION.TYPES.ORDER_COUNT,
    MARKETINGPROMOTION_RESTRICTION.TYPES.CUSTOMER_TIER,
  ];
  return customerRestrictions.includes(restrictionType);
}

export function marketingpromotionIsTimeRestriction(
  restrictionType: MarketingPromotionRestrictionType
): boolean {
  const timeRestrictions: MarketingPromotionRestrictionType[] = [
    MARKETINGPROMOTION_RESTRICTION.TYPES.TIME,
    MARKETINGPROMOTION_RESTRICTION.TYPES.DAY_OF_WEEK,
    MARKETINGPROMOTION_RESTRICTION.TYPES.DATE_RANGE,
  ];
  return timeRestrictions.includes(restrictionType);
}

export function marketingpromotionGetDefaultOperator(): MarketingPromotionRestrictionOperator {
  return MARKETINGPROMOTION_RESTRICTION.DEFAULTS.DEFAULT_OPERATOR;
}

export function marketingpromotionGetDefaultCondition(): MarketingPromotionRestrictionCondition {
  return MARKETINGPROMOTION_RESTRICTION.DEFAULTS.DEFAULT_CONDITION;
}

export function marketingpromotionGetDefaultPriority(): number {
  return MARKETINGPROMOTION_RESTRICTION.DEFAULTS.DEFAULT_PRIORITY;
}
