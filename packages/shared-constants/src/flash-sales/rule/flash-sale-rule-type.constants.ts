/**
 * Flash Sale Rule Type Constants
 * Types and classifications of flash sale rules
 */

export const FLASH_SALE_RULE_TYPE = {
  // Rule Categories
  CATEGORIES: {
    BUSINESS: 'business',
    TECHNICAL: 'technical',
    OPERATIONAL: 'operational',
    COMPLIANCE: 'compliance',
    CUSTOM: 'custom',
  },

  // Rule Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  },

  // Rule Scope
  SCOPE: {
    GLOBAL: 'global',
    SALE_LEVEL: 'sale_level',
    PRODUCT_LEVEL: 'product_level',
    USER_LEVEL: 'user_level',
    CATEGORY_LEVEL: 'category_level',
  },

  // Rule Frequency
  FREQUENCY: {
    ALWAYS: 'always',
    ONE_TIME: 'one_time',
    PER_SALE: 'per_sale',
    PER_USER: 'per_user',
    PER_PRODUCT: 'per_product',
  },

  // Rule Trigger
  TRIGGER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    EVENT_BASED: 'event_based',
    TIME_BASED: 'time_based',
    CONDITION_BASED: 'condition_based',
  },

  // Rule Execution
  EXECUTION: {
    SYNCHRONOUS: 'synchronous',
    ASYNCHRONOUS: 'asynchronous',
    SCHEDULED: 'scheduled',
    DEFERRED: 'deferred',
  },

  // Rule Validation
  VALIDATION: {
    NONE: 'none',
    BASIC: 'basic',
    STRICT: 'strict',
    COMPREHENSIVE: 'comprehensive',
  },
} as const;

// Rule Categories
export type FlashSaleRuleTypeCategory =
  (typeof FLASH_SALE_RULE_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_RULE_TYPE.CATEGORIES];

// Rule Complexity
export type FlashSaleRuleTypeComplexity =
  (typeof FLASH_SALE_RULE_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_RULE_TYPE.COMPLEXITY];

// Rule Scope
export type FlashSaleRuleTypeScope =
  (typeof FLASH_SALE_RULE_TYPE.SCOPE)[keyof typeof FLASH_SALE_RULE_TYPE.SCOPE];

// Rule Frequency
export type FlashSaleRuleTypeFrequency =
  (typeof FLASH_SALE_RULE_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_RULE_TYPE.FREQUENCY];

// Rule Trigger
export type FlashSaleRuleTypeTrigger =
  (typeof FLASH_SALE_RULE_TYPE.TRIGGER)[keyof typeof FLASH_SALE_RULE_TYPE.TRIGGER];

// Rule Execution
export type FlashSaleRuleTypeExecution =
  (typeof FLASH_SALE_RULE_TYPE.EXECUTION)[keyof typeof FLASH_SALE_RULE_TYPE.EXECUTION];

// Rule Validation
export type FlashSaleRuleTypeValidation =
  (typeof FLASH_SALE_RULE_TYPE.VALIDATION)[keyof typeof FLASH_SALE_RULE_TYPE.VALIDATION];

// Utility Functions
export function flashsalesRuleTypeGetCategoryLabel(category: FlashSaleRuleTypeCategory): string {
  const labels: Record<FlashSaleRuleTypeCategory, string> = {
    [FLASH_SALE_RULE_TYPE.CATEGORIES.BUSINESS]: 'Business Rule',
    [FLASH_SALE_RULE_TYPE.CATEGORIES.TECHNICAL]: 'Technical Rule',
    [FLASH_SALE_RULE_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Rule',
    [FLASH_SALE_RULE_TYPE.CATEGORIES.COMPLIANCE]: 'Compliance Rule',
    [FLASH_SALE_RULE_TYPE.CATEGORIES.CUSTOM]: 'Custom Rule',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesRuleTypeGetComplexityLabel(
  complexity: FlashSaleRuleTypeComplexity
): string {
  const labels: Record<FlashSaleRuleTypeComplexity, string> = {
    [FLASH_SALE_RULE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [FLASH_SALE_RULE_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_RULE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [FLASH_SALE_RULE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesRuleTypeGetScopeLabel(scope: FlashSaleRuleTypeScope): string {
  const labels: Record<FlashSaleRuleTypeScope, string> = {
    [FLASH_SALE_RULE_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_RULE_TYPE.SCOPE.SALE_LEVEL]: 'Sale Level',
    [FLASH_SALE_RULE_TYPE.SCOPE.PRODUCT_LEVEL]: 'Product Level',
    [FLASH_SALE_RULE_TYPE.SCOPE.USER_LEVEL]: 'User Level',
    [FLASH_SALE_RULE_TYPE.SCOPE.CATEGORY_LEVEL]: 'Category Level',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesRuleTypeGetFrequencyLabel(frequency: FlashSaleRuleTypeFrequency): string {
  const labels: Record<FlashSaleRuleTypeFrequency, string> = {
    [FLASH_SALE_RULE_TYPE.FREQUENCY.ALWAYS]: 'Always',
    [FLASH_SALE_RULE_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [FLASH_SALE_RULE_TYPE.FREQUENCY.PER_SALE]: 'Per Sale',
    [FLASH_SALE_RULE_TYPE.FREQUENCY.PER_USER]: 'Per User',
    [FLASH_SALE_RULE_TYPE.FREQUENCY.PER_PRODUCT]: 'Per Product',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesRuleTypeGetTriggerLabel(trigger: FlashSaleRuleTypeTrigger): string {
  const labels: Record<FlashSaleRuleTypeTrigger, string> = {
    [FLASH_SALE_RULE_TYPE.TRIGGER.MANUAL]: 'Manual',
    [FLASH_SALE_RULE_TYPE.TRIGGER.AUTOMATIC]: 'Automatic',
    [FLASH_SALE_RULE_TYPE.TRIGGER.EVENT_BASED]: 'Event Based',
    [FLASH_SALE_RULE_TYPE.TRIGGER.TIME_BASED]: 'Time Based',
    [FLASH_SALE_RULE_TYPE.TRIGGER.CONDITION_BASED]: 'Condition Based',
  };
  return labels[trigger] || 'Unknown Trigger';
}

export function flashsalesRuleTypeGetExecutionLabel(execution: FlashSaleRuleTypeExecution): string {
  const labels: Record<FlashSaleRuleTypeExecution, string> = {
    [FLASH_SALE_RULE_TYPE.EXECUTION.SYNCHRONOUS]: 'Synchronous',
    [FLASH_SALE_RULE_TYPE.EXECUTION.ASYNCHRONOUS]: 'Asynchronous',
    [FLASH_SALE_RULE_TYPE.EXECUTION.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_RULE_TYPE.EXECUTION.DEFERRED]: 'Deferred',
  };
  return labels[execution] || 'Unknown Execution';
}

export function flashsalesRuleTypeGetValidationLabel(
  validation: FlashSaleRuleTypeValidation
): string {
  const labels: Record<FlashSaleRuleTypeValidation, string> = {
    [FLASH_SALE_RULE_TYPE.VALIDATION.NONE]: 'None',
    [FLASH_SALE_RULE_TYPE.VALIDATION.BASIC]: 'Basic',
    [FLASH_SALE_RULE_TYPE.VALIDATION.STRICT]: 'Strict',
    [FLASH_SALE_RULE_TYPE.VALIDATION.COMPREHENSIVE]: 'Comprehensive',
  };
  return labels[validation] || 'Unknown Validation';
}

export function flashsalesRuleTypeIsValidCategory(
  category: string
): category is FlashSaleRuleTypeCategory {
  return Object.values(FLASH_SALE_RULE_TYPE.CATEGORIES).includes(
    category as FlashSaleRuleTypeCategory
  );
}

export function flashsalesRuleTypeIsValidScope(scope: string): scope is FlashSaleRuleTypeScope {
  return Object.values(FLASH_SALE_RULE_TYPE.SCOPE).includes(scope as FlashSaleRuleTypeScope);
}

export function flashsalesRuleTypeIsValidTrigger(
  trigger: string
): trigger is FlashSaleRuleTypeTrigger {
  return Object.values(FLASH_SALE_RULE_TYPE.TRIGGER).includes(trigger as FlashSaleRuleTypeTrigger);
}

export function flashsalesRuleTypeIsComplex(complexity: FlashSaleRuleTypeComplexity): boolean {
  const complexTypes: FlashSaleRuleTypeComplexity[] = [
    FLASH_SALE_RULE_TYPE.COMPLEXITY.COMPLEX,
    FLASH_SALE_RULE_TYPE.COMPLEXITY.ADVANCED,
  ];
  return complexTypes.includes(complexity);
}

export function flashsalesRuleTypeIsSimple(complexity: FlashSaleRuleTypeComplexity): boolean {
  const simpleTypes: FlashSaleRuleTypeComplexity[] = [
    FLASH_SALE_RULE_TYPE.COMPLEXITY.SIMPLE,
    FLASH_SALE_RULE_TYPE.COMPLEXITY.STANDARD,
  ];
  return simpleTypes.includes(complexity);
}
