/**
 * Support Rule Constants
 * Configuration for support rules
 */

export const SUPPORT_RULE = {
  // Rule Types
  TYPES: {
    ASSIGNMENT: 'assignment',
    ESCALATION: 'escalation',
    PRIORITY: 'priority',
    CATEGORIZATION: 'categorization',
    ROUTING: 'routing',
    SLA: 'sla',
    NOTIFICATION: 'notification',
    VALIDATION: 'validation',
    TRANSFER: 'transfer',
    AUTOMATION: 'automation',
  } as const,

  // Rule Statuses
  STATUS: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
    EXPIRED: 'expired',
  } as const,

  // Rule Priorities
  PRIORITY: {
    CRITICAL: 100,
    HIGH: 80,
    MEDIUM: 50,
    LOW: 30,
    BACKGROUND: 10,
  } as const,

  // Rule Conditions
  CONDITIONS: {
    EQUALS: 'equals',
    NOT_EQUALS: 'not_equals',
    GREATER_THAN: 'greater_than',
    LESS_THAN: 'less_than',
    GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
    LESS_THAN_OR_EQUAL: 'less_than_or_equal',
    CONTAINS: 'contains',
    NOT_CONTAINS: 'not_contains',
    STARTS_WITH: 'starts_with',
    ENDS_WITH: 'ends_with',
    IN: 'in',
    NOT_IN: 'not_in',
    BETWEEN: 'between',
    EXISTS: 'exists',
    NOT_EXISTS: 'not_exists',
    REGEX: 'regex',
  } as const,

  // Rule Logic
  LOGIC: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    XOR: 'xor',
    NAND: 'nand',
    NOR: 'nor',
  } as const,

  // Rule Actions
  ACTIONS: {
    ASSIGN: 'assign',
    ESCALATE: 'escalate',
    REASSIGN: 'reassign',
    NOTIFY: 'notify',
    UPDATE_STATUS: 'update_status',
    UPDATE_PRIORITY: 'update_priority',
    UPDATE_CATEGORY: 'update_category',
    ADD_TAG: 'add_tag',
    REMOVE_TAG: 'remove_tag',
    SEND_EMAIL: 'send_email',
    CREATE_TICKET: 'create_ticket',
    CLOSE_TICKET: 'close_ticket',
    MERGE_TICKET: 'merge_ticket',
  } as const,

  // Rule Evaluation
  EVALUATION: {
    SYNC: 'sync',
    ASYNC: 'async',
    BATCH: 'batch',
  } as const,
} as const;

// Rule Types
export type SupportRuleType = (typeof SUPPORT_RULE.TYPES)[keyof typeof SUPPORT_RULE.TYPES];

// Rule Statuses
export type SupportRuleStatus = (typeof SUPPORT_RULE.STATUS)[keyof typeof SUPPORT_RULE.STATUS];

// Rule Priorities
export type SupportRulePriority =
  (typeof SUPPORT_RULE.PRIORITY)[keyof typeof SUPPORT_RULE.PRIORITY];

// Rule Conditions
export type SupportRuleCondition =
  (typeof SUPPORT_RULE.CONDITIONS)[keyof typeof SUPPORT_RULE.CONDITIONS];

// Rule Logic
export type SupportRuleLogic = (typeof SUPPORT_RULE.LOGIC)[keyof typeof SUPPORT_RULE.LOGIC];

// Rule Actions
export type SupportRuleAction = (typeof SUPPORT_RULE.ACTIONS)[keyof typeof SUPPORT_RULE.ACTIONS];

// Rule Evaluation
export type SupportRuleEvaluation =
  (typeof SUPPORT_RULE.EVALUATION)[keyof typeof SUPPORT_RULE.EVALUATION];

// Utility Functions
export function supportRuleGetTypeLabel(type: SupportRuleType): string {
  const labels: Record<SupportRuleType, string> = {
    [SUPPORT_RULE.TYPES.ASSIGNMENT]: 'Assignment Rule',
    [SUPPORT_RULE.TYPES.ESCALATION]: 'Escalation Rule',
    [SUPPORT_RULE.TYPES.PRIORITY]: 'Priority Rule',
    [SUPPORT_RULE.TYPES.CATEGORIZATION]: 'Categorization Rule',
    [SUPPORT_RULE.TYPES.ROUTING]: 'Routing Rule',
    [SUPPORT_RULE.TYPES.SLA]: 'SLA Rule',
    [SUPPORT_RULE.TYPES.NOTIFICATION]: 'Notification Rule',
    [SUPPORT_RULE.TYPES.VALIDATION]: 'Validation Rule',
    [SUPPORT_RULE.TYPES.TRANSFER]: 'Transfer Rule',
    [SUPPORT_RULE.TYPES.AUTOMATION]: 'Automation Rule',
  };
  return labels[type] || 'Unknown';
}

export function supportRuleGetStatusLabel(status: SupportRuleStatus): string {
  const labels: Record<SupportRuleStatus, string> = {
    [SUPPORT_RULE.STATUS.DRAFT]: 'Draft',
    [SUPPORT_RULE.STATUS.ACTIVE]: 'Active',
    [SUPPORT_RULE.STATUS.PAUSED]: 'Paused',
    [SUPPORT_RULE.STATUS.ARCHIVED]: 'Archived',
    [SUPPORT_RULE.STATUS.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown';
}

export function supportRuleGetPriorityLabel(priority: SupportRulePriority): string {
  const labels: Record<SupportRulePriority, string> = {
    [SUPPORT_RULE.PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_RULE.PRIORITY.HIGH]: 'High',
    [SUPPORT_RULE.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_RULE.PRIORITY.LOW]: 'Low',
    [SUPPORT_RULE.PRIORITY.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function supportRuleGetConditionLabel(condition: SupportRuleCondition): string {
  const labels: Record<SupportRuleCondition, string> = {
    [SUPPORT_RULE.CONDITIONS.EQUALS]: 'Equals',
    [SUPPORT_RULE.CONDITIONS.NOT_EQUALS]: 'Not Equals',
    [SUPPORT_RULE.CONDITIONS.GREATER_THAN]: 'Greater Than',
    [SUPPORT_RULE.CONDITIONS.LESS_THAN]: 'Less Than',
    [SUPPORT_RULE.CONDITIONS.GREATER_THAN_OR_EQUAL]: 'Greater Than Or Equal',
    [SUPPORT_RULE.CONDITIONS.LESS_THAN_OR_EQUAL]: 'Less Than Or Equal',
    [SUPPORT_RULE.CONDITIONS.CONTAINS]: 'Contains',
    [SUPPORT_RULE.CONDITIONS.NOT_CONTAINS]: 'Not Contains',
    [SUPPORT_RULE.CONDITIONS.STARTS_WITH]: 'Starts With',
    [SUPPORT_RULE.CONDITIONS.ENDS_WITH]: 'Ends With',
    [SUPPORT_RULE.CONDITIONS.IN]: 'In',
    [SUPPORT_RULE.CONDITIONS.NOT_IN]: 'Not In',
    [SUPPORT_RULE.CONDITIONS.BETWEEN]: 'Between',
    [SUPPORT_RULE.CONDITIONS.EXISTS]: 'Exists',
    [SUPPORT_RULE.CONDITIONS.NOT_EXISTS]: 'Not Exists',
    [SUPPORT_RULE.CONDITIONS.REGEX]: 'Regex',
  };
  return labels[condition] || 'Unknown';
}

export function supportRuleIsActive(status: SupportRuleStatus): boolean {
  return status === SUPPORT_RULE.STATUS.ACTIVE;
}

export function supportRuleIsDraft(status: SupportRuleStatus): boolean {
  return status === SUPPORT_RULE.STATUS.DRAFT;
}

export function supportRuleGetActionLabel(action: SupportRuleAction): string {
  const labels: Record<SupportRuleAction, string> = {
    [SUPPORT_RULE.ACTIONS.ASSIGN]: 'Assign',
    [SUPPORT_RULE.ACTIONS.ESCALATE]: 'Escalate',
    [SUPPORT_RULE.ACTIONS.REASSIGN]: 'Reassign',
    [SUPPORT_RULE.ACTIONS.NOTIFY]: 'Notify',
    [SUPPORT_RULE.ACTIONS.UPDATE_STATUS]: 'Update Status',
    [SUPPORT_RULE.ACTIONS.UPDATE_PRIORITY]: 'Update Priority',
    [SUPPORT_RULE.ACTIONS.UPDATE_CATEGORY]: 'Update Category',
    [SUPPORT_RULE.ACTIONS.ADD_TAG]: 'Add Tag',
    [SUPPORT_RULE.ACTIONS.REMOVE_TAG]: 'Remove Tag',
    [SUPPORT_RULE.ACTIONS.SEND_EMAIL]: 'Send Email',
    [SUPPORT_RULE.ACTIONS.CREATE_TICKET]: 'Create Ticket',
    [SUPPORT_RULE.ACTIONS.CLOSE_TICKET]: 'Close Ticket',
    [SUPPORT_RULE.ACTIONS.MERGE_TICKET]: 'Merge Ticket',
  };
  return labels[action] || 'Unknown';
}
