/**
 * Notification Rule Constants
 * Core notification rule configuration and settings
 */

export const NOTIFICATIONRULE = {
  // Rule Types
  TYPES: {
    INCLUSION: 'inclusion',
    EXCLUSION: 'exclusion',
    PRIORITY: 'priority',
    ROUTING: 'routing',
    FILTER: 'filter',
    TRANSFORM: 'transform',
    CUSTOM: 'custom',
  } as const,

  // Rule Categories
  CATEGORIES: {
    USER: 'user',
    CONTENT: 'content',
    CHANNEL: 'channel',
    TIME: 'time',
    LOCATION: 'location',
    DEVICE: 'device',
    BEHAVIOR: 'behavior',
    PREFERENCE: 'preference',
    CUSTOM: 'custom',
  } as const,

  // Rule Operators
  OPERATORS: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    GREATER_THAN_OR_EQUALS: 'greater_than_or_equals',
    LESS_THAN_OR_EQUALS: 'less_than_or_equals',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    IN: 'in',
    NOT_IN: 'not_in',
    BETWEEN: 'between',
    IS_NULL: 'is_null',
    IS_NOT_NULL: 'is_not_null',
    IS_TRUE: 'is_true',
    IS_FALSE: 'is_false',
    REGEX: 'regex',
    CUSTOM: 'custom',
  } as const,

  // Rule Conditions
  CONDITIONS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    XOR: 'xor',
    NAND: 'nand',
    NOR: 'nor',
    XNOR: 'xnor',
  } as const,

  // Rule Priorities
  PRIORITIES: {
    CRITICAL: 100,
    HIGH: 75,
    MEDIUM: 50,
    LOW: 25,
    BACKGROUND: 0,
  } as const,

  // Rule Effects
  EFFECTS: {
    ALLOW: 'allow',
    BLOCK: 'block',
    MODIFY: 'modify',
    ROUTE: 'route',
    DELAY: 'delay',
    PRIORITIZE: 'prioritize',
    DEPRIORITIZE: 'deprioritize',
    TRANSFORM: 'transform',
    SKIP: 'skip',
    CUSTOM: 'custom',
  } as const,

  // Rule Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'filter',
    DEFAULT_CATEGORY: 'user',
    DEFAULT_OPERATOR: 'equals',
    DEFAULT_CONDITION: 'and',
    DEFAULT_PRIORITY: 50,
    DEFAULT_EFFECT: 'allow',
    MAX_RULES_PER_NOTIFICATION: 10,
    MAX_CONDITIONS_PER_RULE: 20,
    DEFAULT_ENABLED: true,
    DEFAULT_STOP_ON_MATCH: false,
  } as const,

  // Rule Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_CONDITIONS: 20,
    MAX_RULES_PER_USER: 100,
    MAX_RULES_PER_NOTIFICATION: 10,
    MAX_NESTED_CONDITIONS: 5,
  } as const,

  // Rule Errors
  ERRORS: {
    INVALID_CONDITION: 'invalid_condition',
    INVALID_OPERATOR: 'invalid_operator',
    INVALID_EFFECT: 'invalid_effect',
    CIRCULAR_DEPENDENCY: 'circular_dependency',
    MAX_RULES_EXCEEDED: 'max_rules_exceeded',
    MAX_CONDITIONS_EXCEEDED: 'max_conditions_exceeded',
    EVALUATION_FAILED: 'evaluation_failed',
    APPLICATION_FAILED: 'application_failed',
  } as const,
} as const;

// Rule Types
export type NotificationRuleType =
  (typeof NOTIFICATIONRULE.TYPES)[keyof typeof NOTIFICATIONRULE.TYPES];

// Rule Categories
export type NotificationRuleCategory =
  (typeof NOTIFICATIONRULE.CATEGORIES)[keyof typeof NOTIFICATIONRULE.CATEGORIES];

// Rule Operators
export type NotificationRuleOperator =
  (typeof NOTIFICATIONRULE.OPERATORS)[keyof typeof NOTIFICATIONRULE.OPERATORS];

// Rule Conditions
export type NotificationRuleCondition =
  (typeof NOTIFICATIONRULE.CONDITIONS)[keyof typeof NOTIFICATIONRULE.CONDITIONS];

// Rule Priorities
export type NotificationRulePriority =
  (typeof NOTIFICATIONRULE.PRIORITIES)[keyof typeof NOTIFICATIONRULE.PRIORITIES];

// Rule Effects
export type NotificationRuleEffect =
  (typeof NOTIFICATIONRULE.EFFECTS)[keyof typeof NOTIFICATIONRULE.EFFECTS];

// Rule Defaults
export type NotificationRuleDefault =
  (typeof NOTIFICATIONRULE.DEFAULTS)[keyof typeof NOTIFICATIONRULE.DEFAULTS];

// Rule Limits
export type NotificationRuleLimit =
  (typeof NOTIFICATIONRULE.LIMITS)[keyof typeof NOTIFICATIONRULE.LIMITS];

// Rule Errors
export type NotificationRuleError =
  (typeof NOTIFICATIONRULE.ERRORS)[keyof typeof NOTIFICATIONRULE.ERRORS];

// Utility Functions
export function notificationruleGetTypeLabel(type: NotificationRuleType): string {
  const labels: Record<NotificationRuleType, string> = {
    [NOTIFICATIONRULE.TYPES.INCLUSION]: 'Inclusion',
    [NOTIFICATIONRULE.TYPES.EXCLUSION]: 'Exclusion',
    [NOTIFICATIONRULE.TYPES.PRIORITY]: 'Priority',
    [NOTIFICATIONRULE.TYPES.ROUTING]: 'Routing',
    [NOTIFICATIONRULE.TYPES.FILTER]: 'Filter',
    [NOTIFICATIONRULE.TYPES.TRANSFORM]: 'Transform',
    [NOTIFICATIONRULE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Rule Type';
}

export function notificationruleGetCategoryLabel(category: NotificationRuleCategory): string {
  const labels: Record<NotificationRuleCategory, string> = {
    [NOTIFICATIONRULE.CATEGORIES.USER]: 'User',
    [NOTIFICATIONRULE.CATEGORIES.CONTENT]: 'Content',
    [NOTIFICATIONRULE.CATEGORIES.CHANNEL]: 'Channel',
    [NOTIFICATIONRULE.CATEGORIES.TIME]: 'Time',
    [NOTIFICATIONRULE.CATEGORIES.LOCATION]: 'Location',
    [NOTIFICATIONRULE.CATEGORIES.DEVICE]: 'Device',
    [NOTIFICATIONRULE.CATEGORIES.BEHAVIOR]: 'Behavior',
    [NOTIFICATIONRULE.CATEGORIES.PREFERENCE]: 'Preference',
    [NOTIFICATIONRULE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationruleGetOperatorLabel(operator: NotificationRuleOperator): string {
  const labels: Record<NotificationRuleOperator, string> = {
    [NOTIFICATIONRULE.OPERATORS.EQUALS]: 'Equals',
    [NOTIFICATIONRULE.OPERATORS.NOT_EQUALS]: 'Not Equals',
    [NOTIFICATIONRULE.OPERATORS.GREATER_THAN]: 'Greater Than',
    [NOTIFICATIONRULE.OPERATORS.LESS_THAN]: 'Less Than',
    [NOTIFICATIONRULE.OPERATORS.GREATER_THAN_OR_EQUALS]: 'Greater Than or Equals',
    [NOTIFICATIONRULE.OPERATORS.LESS_THAN_OR_EQUALS]: 'Less Than or Equals',
    [NOTIFICATIONRULE.OPERATORS.CONTAINS]: 'Contains',
    [NOTIFICATIONRULE.OPERATORS.NOT_CONTAINS]: 'Not Contains',
    [NOTIFICATIONRULE.OPERATORS.STARTS_WITH]: 'Starts With',
    [NOTIFICATIONRULE.OPERATORS.ENDS_WITH]: 'Ends With',
    [NOTIFICATIONRULE.OPERATORS.IN]: 'In',
    [NOTIFICATIONRULE.OPERATORS.NOT_IN]: 'Not In',
    [NOTIFICATIONRULE.OPERATORS.BETWEEN]: 'Between',
    [NOTIFICATIONRULE.OPERATORS.IS_NULL]: 'Is Null',
    [NOTIFICATIONRULE.OPERATORS.IS_NOT_NULL]: 'Is Not Null',
    [NOTIFICATIONRULE.OPERATORS.IS_TRUE]: 'Is True',
    [NOTIFICATIONRULE.OPERATORS.IS_FALSE]: 'Is False',
    [NOTIFICATIONRULE.OPERATORS.REGEX]: 'Regex',
    [NOTIFICATIONRULE.OPERATORS.CUSTOM]: 'Custom',
  };
  return labels[operator] || 'Unknown Operator';
}

export function notificationruleGetConditionLabel(condition: NotificationRuleCondition): string {
  const labels: Record<NotificationRuleCondition, string> = {
    [NOTIFICATIONRULE.CONDITIONS.AND]: 'And',
    [NOTIFICATIONRULE.CONDITIONS.OR]: 'Or',
    [NOTIFICATIONRULE.CONDITIONS.NOT]: 'Not',
    [NOTIFICATIONRULE.CONDITIONS.XOR]: 'Xor',
    [NOTIFICATIONRULE.CONDITIONS.NAND]: 'Nand',
    [NOTIFICATIONRULE.CONDITIONS.NOR]: 'Nor',
    [NOTIFICATIONRULE.CONDITIONS.XNOR]: 'Xnor',
  };
  return labels[condition] || 'Unknown Condition';
}

export function notificationruleGetEffectLabel(effect: NotificationRuleEffect): string {
  const labels: Record<NotificationRuleEffect, string> = {
    [NOTIFICATIONRULE.EFFECTS.ALLOW]: 'Allow',
    [NOTIFICATIONRULE.EFFECTS.BLOCK]: 'Block',
    [NOTIFICATIONRULE.EFFECTS.MODIFY]: 'Modify',
    [NOTIFICATIONRULE.EFFECTS.ROUTE]: 'Route',
    [NOTIFICATIONRULE.EFFECTS.DELAY]: 'Delay',
    [NOTIFICATIONRULE.EFFECTS.PRIORITIZE]: 'Prioritize',
    [NOTIFICATIONRULE.EFFECTS.DEPRIORITIZE]: 'Deprioritize',
    [NOTIFICATIONRULE.EFFECTS.TRANSFORM]: 'Transform',
    [NOTIFICATIONRULE.EFFECTS.SKIP]: 'Skip',
    [NOTIFICATIONRULE.EFFECTS.CUSTOM]: 'Custom',
  };
  return labels[effect] || 'Unknown Effect';
}

export function notificationruleGetErrorLabel(error: NotificationRuleError): string {
  const labels: Record<NotificationRuleError, string> = {
    [NOTIFICATIONRULE.ERRORS.INVALID_CONDITION]: 'Invalid Condition',
    [NOTIFICATIONRULE.ERRORS.INVALID_OPERATOR]: 'Invalid Operator',
    [NOTIFICATIONRULE.ERRORS.INVALID_EFFECT]: 'Invalid Effect',
    [NOTIFICATIONRULE.ERRORS.CIRCULAR_DEPENDENCY]: 'Circular Dependency',
    [NOTIFICATIONRULE.ERRORS.MAX_RULES_EXCEEDED]: 'Max Rules Exceeded',
    [NOTIFICATIONRULE.ERRORS.MAX_CONDITIONS_EXCEEDED]: 'Max Conditions Exceeded',
    [NOTIFICATIONRULE.ERRORS.EVALUATION_FAILED]: 'Evaluation Failed',
    [NOTIFICATIONRULE.ERRORS.APPLICATION_FAILED]: 'Application Failed',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationruleIsInclusion(type: NotificationRuleType): boolean {
  return type === NOTIFICATIONRULE.TYPES.INCLUSION;
}

export function notificationruleIsExclusion(type: NotificationRuleType): boolean {
  return type === NOTIFICATIONRULE.TYPES.EXCLUSION;
}

export function notificationruleIsFilter(type: NotificationRuleType): boolean {
  return type === NOTIFICATIONRULE.TYPES.FILTER;
}

export function notificationruleIsPriority(type: NotificationRuleType): boolean {
  return type === NOTIFICATIONRULE.TYPES.PRIORITY;
}

export function notificationruleGetDefaultPriority(): number {
  return NOTIFICATIONRULE.DEFAULTS.DEFAULT_PRIORITY;
}

export function notificationruleGetMaxRulesPerNotification(): number {
  return NOTIFICATIONRULE.DEFAULTS.MAX_RULES_PER_NOTIFICATION;
}
