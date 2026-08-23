/**
 * Flash Sale Rule Constants
 * Configuration for flash sale rules and conditions
 */

export const FLASH_SALE_RULE = {
  // Rule Types
  TYPES: {
    ELIGIBILITY: 'eligibility',
    VALIDATION: 'validation',
    DISCOUNT: 'discount',
    QUANTITY: 'quantity',
    TIMING: 'timing',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    USER: 'user',
    PRODUCT: 'product',
    CATEGORY: 'category',
    BUNDLE: 'bundle',
    COUPON: 'coupon',
  },

  // Rule Categories
  CATEGORIES: {
    PRE_SALE: 'pre_sale',
    DURING_SALE: 'during_sale',
    POST_SALE: 'post_sale',
    ALWAYS: 'always',
  },

  // Rule Priorities
  PRIORITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Rule Operators
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
    MATCHES: 'matches',
    IS_TRUE: 'is_true',
    IS_FALSE: 'is_false',
    IS_EMPTY: 'is_empty',
    IS_NOT_EMPTY: 'is_not_empty',
  },

  // Rule Conditions
  CONDITIONS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    XOR: 'xor',
    NAND: 'nand',
    NOR: 'nor',
  },

  // Rule Actions
  ACTIONS: {
    ALLOW: 'allow',
    BLOCK: 'block',
    APPLY_DISCOUNT: 'apply_discount',
    APPLY_SURCHARGE: 'apply_surcharge',
    LIMIT_QUANTITY: 'limit_quantity',
    SET_PRICE: 'set_price',
    REQUIRE_APPROVAL: 'require_approval',
    SEND_NOTIFICATION: 'send_notification',
    LOG_EVENT: 'log_event',
    REDIRECT: 'redirect',
  },

  // Rule Effects
  EFFECTS: {
    DISABLE: 'disable',
    ENABLE: 'enable',
    MODIFY: 'modify',
    OVERRIDE: 'override',
    SKIP: 'skip',
    TERMINATE: 'terminate',
  },

  // Rule Defaults
  DEFAULTS: {
    PRIORITY: 'medium',
    OPERATOR: 'equals',
    CONDITION: 'and',
    ACTION: 'allow',
    EFFECT: 'enable',
    MAX_RULES_PER_SALE: 50,
    MAX_CONDITIONS: 10,
  },

  // Rule Limits
  LIMITS: {
    MAX_RULES: 100,
    MAX_CONDITIONS: 20,
    MAX_ACTIONS: 10,
    MAX_NESTING: 5,
    MAX_RULE_LENGTH: 1000,
  },

  // Rule Validation
  VALIDATION: {
    MIN_RULES: 1,
    MAX_RULES: 100,
    MIN_CONDITIONS: 1,
    MAX_CONDITIONS: 20,
  },
} as const;

// Rule Types
export type FlashSaleRuleType = (typeof FLASH_SALE_RULE.TYPES)[keyof typeof FLASH_SALE_RULE.TYPES];

// Rule Categories
export type FlashSaleRuleCategory =
  (typeof FLASH_SALE_RULE.CATEGORIES)[keyof typeof FLASH_SALE_RULE.CATEGORIES];

// Rule Priorities
export type FlashSaleRulePriority =
  (typeof FLASH_SALE_RULE.PRIORITIES)[keyof typeof FLASH_SALE_RULE.PRIORITIES];

// Rule Operators
export type FlashSaleRuleOperator =
  (typeof FLASH_SALE_RULE.OPERATORS)[keyof typeof FLASH_SALE_RULE.OPERATORS];

// Rule Conditions
export type FlashSaleRuleCondition =
  (typeof FLASH_SALE_RULE.CONDITIONS)[keyof typeof FLASH_SALE_RULE.CONDITIONS];

// Rule Actions
export type FlashSaleRuleAction =
  (typeof FLASH_SALE_RULE.ACTIONS)[keyof typeof FLASH_SALE_RULE.ACTIONS];

// Rule Effects
export type FlashSaleRuleEffect =
  (typeof FLASH_SALE_RULE.EFFECTS)[keyof typeof FLASH_SALE_RULE.EFFECTS];

// Utility Functions
export function flashsalesRuleGetTypeLabel(type: FlashSaleRuleType): string {
  const labels: Record<FlashSaleRuleType, string> = {
    [FLASH_SALE_RULE.TYPES.ELIGIBILITY]: 'Eligibility Rule',
    [FLASH_SALE_RULE.TYPES.VALIDATION]: 'Validation Rule',
    [FLASH_SALE_RULE.TYPES.DISCOUNT]: 'Discount Rule',
    [FLASH_SALE_RULE.TYPES.QUANTITY]: 'Quantity Rule',
    [FLASH_SALE_RULE.TYPES.TIMING]: 'Timing Rule',
    [FLASH_SALE_RULE.TYPES.PAYMENT]: 'Payment Rule',
    [FLASH_SALE_RULE.TYPES.SHIPPING]: 'Shipping Rule',
    [FLASH_SALE_RULE.TYPES.USER]: 'User Rule',
    [FLASH_SALE_RULE.TYPES.PRODUCT]: 'Product Rule',
    [FLASH_SALE_RULE.TYPES.CATEGORY]: 'Category Rule',
    [FLASH_SALE_RULE.TYPES.BUNDLE]: 'Bundle Rule',
    [FLASH_SALE_RULE.TYPES.COUPON]: 'Coupon Rule',
  };
  return labels[type] || 'Unknown Rule Type';
}

export function flashsalesRuleGetCategoryLabel(category: FlashSaleRuleCategory): string {
  const labels: Record<FlashSaleRuleCategory, string> = {
    [FLASH_SALE_RULE.CATEGORIES.PRE_SALE]: 'Pre-Sale Rule',
    [FLASH_SALE_RULE.CATEGORIES.DURING_SALE]: 'During Sale Rule',
    [FLASH_SALE_RULE.CATEGORIES.POST_SALE]: 'Post-Sale Rule',
    [FLASH_SALE_RULE.CATEGORIES.ALWAYS]: 'Always Active Rule',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesRuleGetPriorityLabel(priority: FlashSaleRulePriority): string {
  const labels: Record<FlashSaleRulePriority, string> = {
    [FLASH_SALE_RULE.PRIORITIES.LOW]: 'Low Priority',
    [FLASH_SALE_RULE.PRIORITIES.MEDIUM]: 'Medium Priority',
    [FLASH_SALE_RULE.PRIORITIES.HIGH]: 'High Priority',
    [FLASH_SALE_RULE.PRIORITIES.CRITICAL]: 'Critical Priority',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesRuleGetOperatorLabel(operator: FlashSaleRuleOperator): string {
  const labels: Record<FlashSaleRuleOperator, string> = {
    [FLASH_SALE_RULE.OPERATORS.EQUALS]: 'Equals',
    [FLASH_SALE_RULE.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [FLASH_SALE_RULE.OPERATORS.GREATER_THAN]: 'Greater Than',
    [FLASH_SALE_RULE.OPERATORS.GREATER_THAN_OR_EQUAL]: 'Greater Than or Equal',
    [FLASH_SALE_RULE.OPERATORS.LESS_THAN]: 'Less Than',
    [FLASH_SALE_RULE.OPERATORS.LESS_THAN_OR_EQUAL]: 'Less Than or Equal',
    [FLASH_SALE_RULE.OPERATORS.BETWEEN]: 'Between',
    [FLASH_SALE_RULE.OPERATORS.IN]: 'In',
    [FLASH_SALE_RULE.OPERATORS.NOT_IN]: 'Not In',
    [FLASH_SALE_RULE.OPERATORS.CONTAINS]: 'Contains',
    [FLASH_SALE_RULE.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [FLASH_SALE_RULE.OPERATORS.STARTS_WITH]: 'Starts With',
    [FLASH_SALE_RULE.OPERATORS.ENDS_WITH]: 'Ends With',
    [FLASH_SALE_RULE.OPERATORS.MATCHES]: 'Matches Pattern',
    [FLASH_SALE_RULE.OPERATORS.IS_TRUE]: 'Is True',
    [FLASH_SALE_RULE.OPERATORS.IS_FALSE]: 'Is False',
    [FLASH_SALE_RULE.OPERATORS.IS_EMPTY]: 'Is Empty',
    [FLASH_SALE_RULE.OPERATORS.IS_NOT_EMPTY]: 'Is Not Empty',
  };
  return labels[operator] || 'Unknown Operator';
}

export function flashsalesRuleGetConditionLabel(condition: FlashSaleRuleCondition): string {
  const labels: Record<FlashSaleRuleCondition, string> = {
    [FLASH_SALE_RULE.CONDITIONS.AND]: 'AND',
    [FLASH_SALE_RULE.CONDITIONS.OR]: 'OR',
    [FLASH_SALE_RULE.CONDITIONS.NOT]: 'NOT',
    [FLASH_SALE_RULE.CONDITIONS.XOR]: 'XOR',
    [FLASH_SALE_RULE.CONDITIONS.NAND]: 'NAND',
    [FLASH_SALE_RULE.CONDITIONS.NOR]: 'NOR',
  };
  return labels[condition] || 'Unknown Condition';
}

export function flashsalesRuleGetActionLabel(action: FlashSaleRuleAction): string {
  const labels: Record<FlashSaleRuleAction, string> = {
    [FLASH_SALE_RULE.ACTIONS.ALLOW]: 'Allow',
    [FLASH_SALE_RULE.ACTIONS.BLOCK]: 'Block',
    [FLASH_SALE_RULE.ACTIONS.APPLY_DISCOUNT]: 'Apply Discount',
    [FLASH_SALE_RULE.ACTIONS.APPLY_SURCHARGE]: 'Apply Surcharge',
    [FLASH_SALE_RULE.ACTIONS.LIMIT_QUANTITY]: 'Limit Quantity',
    [FLASH_SALE_RULE.ACTIONS.SET_PRICE]: 'Set Price',
    [FLASH_SALE_RULE.ACTIONS.REQUIRE_APPROVAL]: 'Require Approval',
    [FLASH_SALE_RULE.ACTIONS.SEND_NOTIFICATION]: 'Send Notification',
    [FLASH_SALE_RULE.ACTIONS.LOG_EVENT]: 'Log Event',
    [FLASH_SALE_RULE.ACTIONS.REDIRECT]: 'Redirect',
  };
  return labels[action] || 'Unknown Action';
}

export function flashsalesRuleGetEffectLabel(effect: FlashSaleRuleEffect): string {
  const labels: Record<FlashSaleRuleEffect, string> = {
    [FLASH_SALE_RULE.EFFECTS.DISABLE]: 'Disable',
    [FLASH_SALE_RULE.EFFECTS.ENABLE]: 'Enable',
    [FLASH_SALE_RULE.EFFECTS.MODIFY]: 'Modify',
    [FLASH_SALE_RULE.EFFECTS.OVERRIDE]: 'Override',
    [FLASH_SALE_RULE.EFFECTS.SKIP]: 'Skip',
    [FLASH_SALE_RULE.EFFECTS.TERMINATE]: 'Terminate',
  };
  return labels[effect] || 'Unknown Effect';
}

export function flashsalesRuleIsValidType(type: string): type is FlashSaleRuleType {
  return Object.values(FLASH_SALE_RULE.TYPES).includes(type as FlashSaleRuleType);
}

export function flashsalesRuleIsValidPriority(priority: string): priority is FlashSaleRulePriority {
  return Object.values(FLASH_SALE_RULE.PRIORITIES).includes(priority as FlashSaleRulePriority);
}

export function flashsalesRuleIsValidOperator(operator: string): operator is FlashSaleRuleOperator {
  return Object.values(FLASH_SALE_RULE.OPERATORS).includes(operator as FlashSaleRuleOperator);
}

export function flashsalesRuleIsValidAction(action: string): action is FlashSaleRuleAction {
  return Object.values(FLASH_SALE_RULE.ACTIONS).includes(action as FlashSaleRuleAction);
}

export function flashsalesRuleIsHighPriority(priority: FlashSaleRulePriority): boolean {
  const highPriorities: FlashSaleRulePriority[] = [
    FLASH_SALE_RULE.PRIORITIES.HIGH,
    FLASH_SALE_RULE.PRIORITIES.CRITICAL,
  ];
  return highPriorities.includes(priority);
}

export function flashsalesRuleIsLowPriority(priority: FlashSaleRulePriority): boolean {
  const lowPriorities: FlashSaleRulePriority[] = [
    FLASH_SALE_RULE.PRIORITIES.LOW,
    FLASH_SALE_RULE.PRIORITIES.MEDIUM,
  ];
  return lowPriorities.includes(priority);
}

export function flashsalesRuleGetDefaultPriority(): FlashSaleRulePriority {
  return FLASH_SALE_RULE.DEFAULTS.PRIORITY as FlashSaleRulePriority;
}

export function flashsalesRuleGetDefaultOperator(): FlashSaleRuleOperator {
  return FLASH_SALE_RULE.DEFAULTS.OPERATOR as FlashSaleRuleOperator;
}

export function flashsalesRuleGetDefaultCondition(): FlashSaleRuleCondition {
  return FLASH_SALE_RULE.DEFAULTS.CONDITION as FlashSaleRuleCondition;
}

export function flashsalesRuleGetMaxRules(): number {
  return FLASH_SALE_RULE.LIMITS.MAX_RULES;
}

export function flashsalesRuleGetMaxConditions(): number {
  return FLASH_SALE_RULE.LIMITS.MAX_CONDITIONS;
}

export function flashsalesRuleGetMaxActions(): number {
  return FLASH_SALE_RULE.LIMITS.MAX_ACTIONS;
}

export function flashsalesRuleGetMaxNesting(): number {
  return FLASH_SALE_RULE.LIMITS.MAX_NESTING;
}
