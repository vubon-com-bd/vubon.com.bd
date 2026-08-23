/**
 * Deal Restriction Constants
 * Restrictions and conditions for deals
 */

export const DEAL_RESTRICTION = {
  // Restriction Types
  TYPES: {
    MINIMUM_ORDER: 'minimum_order',
    MAXIMUM_ORDER: 'maximum_order',
    MINIMUM_QUANTITY: 'minimum_quantity',
    MAXIMUM_QUANTITY: 'maximum_quantity',
    PER_USER_LIMIT: 'per_user_limit',
    PER_ORDER_LIMIT: 'per_order_limit',
    FIRST_TIME_BUYER: 'first_time_buyer',
    VIP_ONLY: 'vip_only',
    MEMBERS_ONLY: 'members_only',
    PREVIOUS_PURCHASE: 'previous_purchase',
    CART_VALUE: 'cart_value',
    TIME_BASED: 'time_based',
    LOCATION: 'location',
    DEVICE: 'device',
    PAYMENT_METHOD: 'payment_method',
  },

  // Condition Types
  CONDITIONS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    ALL: 'all',
    ANY: 'any',
  },

  // Comparison Operators
  OPERATORS: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
    LESS_THAN: 'less_than',
    LESS_THAN_OR_EQUAL: 'less_than_or_equal',
    BETWEEN: 'between',
    IN: 'in',
    NOT_IN: 'not_in',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
  },

  // Validation Rules
  VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    CONDITIONAL: 'conditional',
  },
} as const;

// Restriction Types
export type DealRestrictionType =
  (typeof DEAL_RESTRICTION.TYPES)[keyof typeof DEAL_RESTRICTION.TYPES];

// Condition Types
export type DealRestrictionCondition =
  (typeof DEAL_RESTRICTION.CONDITIONS)[keyof typeof DEAL_RESTRICTION.CONDITIONS];

// Comparison Operators
export type DealRestrictionOperator =
  (typeof DEAL_RESTRICTION.OPERATORS)[keyof typeof DEAL_RESTRICTION.OPERATORS];

// Validation Rules
export type DealRestrictionValidation =
  (typeof DEAL_RESTRICTION.VALIDATION)[keyof typeof DEAL_RESTRICTION.VALIDATION];

// Utility Functions
export function flashsalesDealRestrictionGetTypeLabel(type: DealRestrictionType): string {
  const labels: Record<DealRestrictionType, string> = {
    [DEAL_RESTRICTION.TYPES.MINIMUM_ORDER]: 'Minimum Order Amount',
    [DEAL_RESTRICTION.TYPES.MAXIMUM_ORDER]: 'Maximum Order Amount',
    [DEAL_RESTRICTION.TYPES.MINIMUM_QUANTITY]: 'Minimum Quantity',
    [DEAL_RESTRICTION.TYPES.MAXIMUM_QUANTITY]: 'Maximum Quantity',
    [DEAL_RESTRICTION.TYPES.PER_USER_LIMIT]: 'Per User Limit',
    [DEAL_RESTRICTION.TYPES.PER_ORDER_LIMIT]: 'Per Order Limit',
    [DEAL_RESTRICTION.TYPES.FIRST_TIME_BUYER]: 'First Time Buyer Only',
    [DEAL_RESTRICTION.TYPES.VIP_ONLY]: 'VIP Only',
    [DEAL_RESTRICTION.TYPES.MEMBERS_ONLY]: 'Members Only',
    [DEAL_RESTRICTION.TYPES.PREVIOUS_PURCHASE]: 'Previous Purchase Required',
    [DEAL_RESTRICTION.TYPES.CART_VALUE]: 'Cart Value',
    [DEAL_RESTRICTION.TYPES.TIME_BASED]: 'Time Based',
    [DEAL_RESTRICTION.TYPES.LOCATION]: 'Location Based',
    [DEAL_RESTRICTION.TYPES.DEVICE]: 'Device Based',
    [DEAL_RESTRICTION.TYPES.PAYMENT_METHOD]: 'Payment Method Based',
  };
  return labels[type] || 'Unknown Restriction';
}

export function flashsalesDealRestrictionGetConditionLabel(
  condition: DealRestrictionCondition
): string {
  const labels: Record<DealRestrictionCondition, string> = {
    [DEAL_RESTRICTION.CONDITIONS.AND]: 'AND',
    [DEAL_RESTRICTION.CONDITIONS.OR]: 'OR',
    [DEAL_RESTRICTION.CONDITIONS.NOT]: 'NOT',
    [DEAL_RESTRICTION.CONDITIONS.ALL]: 'ALL',
    [DEAL_RESTRICTION.CONDITIONS.ANY]: 'ANY',
  };
  return labels[condition] || 'Unknown Condition';
}

export function flashsalesDealRestrictionGetOperatorLabel(
  operator: DealRestrictionOperator
): string {
  const labels: Record<DealRestrictionOperator, string> = {
    [DEAL_RESTRICTION.OPERATORS.EQUALS]: 'Equals',
    [DEAL_RESTRICTION.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [DEAL_RESTRICTION.OPERATORS.GREATER_THAN]: 'Greater Than',
    [DEAL_RESTRICTION.OPERATORS.GREATER_THAN_OR_EQUAL]: 'Greater Than or Equal',
    [DEAL_RESTRICTION.OPERATORS.LESS_THAN]: 'Less Than',
    [DEAL_RESTRICTION.OPERATORS.LESS_THAN_OR_EQUAL]: 'Less Than or Equal',
    [DEAL_RESTRICTION.OPERATORS.BETWEEN]: 'Between',
    [DEAL_RESTRICTION.OPERATORS.IN]: 'In',
    [DEAL_RESTRICTION.OPERATORS.NOT_IN]: 'Not In',
    [DEAL_RESTRICTION.OPERATORS.CONTAINS]: 'Contains',
    [DEAL_RESTRICTION.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [DEAL_RESTRICTION.OPERATORS.STARTS_WITH]: 'Starts With',
    [DEAL_RESTRICTION.OPERATORS.ENDS_WITH]: 'Ends With',
  };
  return labels[operator] || 'Unknown Operator';
}

export function flashsalesDealRestrictionGetValidationLabel(
  validation: DealRestrictionValidation
): string {
  const labels: Record<DealRestrictionValidation, string> = {
    [DEAL_RESTRICTION.VALIDATION.REQUIRED]: 'Required',
    [DEAL_RESTRICTION.VALIDATION.OPTIONAL]: 'Optional',
    [DEAL_RESTRICTION.VALIDATION.CONDITIONAL]: 'Conditional',
  };
  return labels[validation] || 'Unknown Validation';
}

export function flashsalesDealRestrictionIsValidType(type: string): type is DealRestrictionType {
  return Object.values(DEAL_RESTRICTION.TYPES).includes(type as DealRestrictionType);
}

export function flashsalesDealRestrictionIsValidOperator(
  operator: string
): operator is DealRestrictionOperator {
  return Object.values(DEAL_RESTRICTION.OPERATORS).includes(operator as DealRestrictionOperator);
}
