/**
 * Support Rule Type Constants
 * Types of support rules
 */

export const SUPPORT_RULE_TYPE = {
  // Rule Categories
  CATEGORIES: {
    ASSIGNMENT: 'assignment',
    ESCALATION: 'escalation',
    ROUTING: 'routing',
    SLA: 'sla',
    NOTIFICATION: 'notification',
    AUTOMATION: 'automation',
  } as const,

  // Rule Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
    CUSTOM: 'custom',
  } as const,

  // Rule Triggers
  TRIGGERS: {
    ON_CREATE: 'on_create',
    ON_UPDATE: 'on_update',
    ON_STATUS_CHANGE: 'on_status_change',
    ON_PRIORITY_CHANGE: 'on_priority_change',
    ON_ASSIGNMENT: 'on_assignment',
    ON_ESCALATION: 'on_escalation',
    ON_RESOLUTION: 'on_resolution',
    ON_CLOSURE: 'on_closure',
    SCHEDULED: 'scheduled',
    MANUAL: 'manual',
  } as const,

  // Rule Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Rule Performance
  PERFORMANCE: {
    FAST: 'fast',
    MEDIUM: 'medium',
    SLOW: 'slow',
  } as const,

  // Rule Categories (expanded)
  CATEGORY_TYPES: {
    ASSIGNMENT: {
      AUTOMATIC: 'automatic',
      MANUAL: 'manual',
      LOAD_BALANCING: 'load_balancing',
      SKILL_BASED: 'skill_based',
    },
    ESCALATION: {
      TIME_BASED: 'time_based',
      PRIORITY_BASED: 'priority_based',
      CATEGORY_BASED: 'category_based',
      CUSTOMER_BASED: 'customer_based',
    },
    SLA: {
      RESPONSE: 'response',
      RESOLUTION: 'resolution',
      UPTIME: 'uptime',
      QUALITY: 'quality',
    },
  } as const,
} as const;

// Rule Categories
export type SupportRuleCategory =
  (typeof SUPPORT_RULE_TYPE.CATEGORIES)[keyof typeof SUPPORT_RULE_TYPE.CATEGORIES];

// Rule Scopes
export type SupportRuleScope =
  (typeof SUPPORT_RULE_TYPE.SCOPES)[keyof typeof SUPPORT_RULE_TYPE.SCOPES];

// Rule Triggers
export type SupportRuleTrigger =
  (typeof SUPPORT_RULE_TYPE.TRIGGERS)[keyof typeof SUPPORT_RULE_TYPE.TRIGGERS];

// Rule Complexity
export type SupportRuleComplexity =
  (typeof SUPPORT_RULE_TYPE.COMPLEXITY)[keyof typeof SUPPORT_RULE_TYPE.COMPLEXITY];

// Rule Performance
export type SupportRulePerformance =
  (typeof SUPPORT_RULE_TYPE.PERFORMANCE)[keyof typeof SUPPORT_RULE_TYPE.PERFORMANCE];

// Utility Functions
export function supportRuleTypeGetCategoryLabel(category: SupportRuleCategory): string {
  const labels: Record<SupportRuleCategory, string> = {
    [SUPPORT_RULE_TYPE.CATEGORIES.ASSIGNMENT]: 'Assignment',
    [SUPPORT_RULE_TYPE.CATEGORIES.ESCALATION]: 'Escalation',
    [SUPPORT_RULE_TYPE.CATEGORIES.ROUTING]: 'Routing',
    [SUPPORT_RULE_TYPE.CATEGORIES.SLA]: 'SLA',
    [SUPPORT_RULE_TYPE.CATEGORIES.NOTIFICATION]: 'Notification',
    [SUPPORT_RULE_TYPE.CATEGORIES.AUTOMATION]: 'Automation',
  };
  return labels[category] || 'Unknown';
}

export function supportRuleTypeGetScopeLabel(scope: SupportRuleScope): string {
  const labels: Record<SupportRuleScope, string> = {
    [SUPPORT_RULE_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_RULE_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_RULE_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_RULE_TYPE.SCOPES.AGENT]: 'Agent',
    [SUPPORT_RULE_TYPE.SCOPES.CUSTOM]: 'Custom',
  };
  return labels[scope] || 'Unknown';
}

export function supportRuleTypeGetTriggerLabel(trigger: SupportRuleTrigger): string {
  const labels: Record<SupportRuleTrigger, string> = {
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_CREATE]: 'On Create',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_UPDATE]: 'On Update',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_STATUS_CHANGE]: 'On Status Change',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_PRIORITY_CHANGE]: 'On Priority Change',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_ASSIGNMENT]: 'On Assignment',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_ESCALATION]: 'On Escalation',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_RESOLUTION]: 'On Resolution',
    [SUPPORT_RULE_TYPE.TRIGGERS.ON_CLOSURE]: 'On Closure',
    [SUPPORT_RULE_TYPE.TRIGGERS.SCHEDULED]: 'Scheduled',
    [SUPPORT_RULE_TYPE.TRIGGERS.MANUAL]: 'Manual',
  };
  return labels[trigger] || 'Unknown';
}

export function supportRuleTypeGetComplexityLabel(complexity: SupportRuleComplexity): string {
  const labels: Record<SupportRuleComplexity, string> = {
    [SUPPORT_RULE_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SUPPORT_RULE_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [SUPPORT_RULE_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [SUPPORT_RULE_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown';
}
