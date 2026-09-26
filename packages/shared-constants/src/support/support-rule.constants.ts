export const SUPPORT_RULE_TYPE = {
  ASSIGNMENT: 'assignment',
  ESCALATION: 'escalation',
  PRIORITY: 'priority',
  AUTO_RESPONSE: 'auto_response',
  TAGGING: 'tagging',
  ROUTING: 'routing',
  SLA: 'sla',
  NOTIFICATION: 'notification',
  CLOSURE: 'closure',
} as const;

export const SUPPORT_RULE_CONDITION = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  CONTAINS: 'contains',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  IN: 'in',
  NOT_IN: 'not_in',
  EXISTS: 'exists',
  MATCHES: 'matches',
} as const;

export const SUPPORT_RULE_ACTION = {
  ASSIGN: 'assign',
  ESCALATE: 'escalate',
  SET_PRIORITY: 'set_priority',
  SET_TAG: 'set_tag',
  SET_CATEGORY: 'set_category',
  SEND_RESPONSE: 'send_response',
  NOTIFY: 'notify',
  CLOSE: 'close',
  REOPEN: 'reopen',
  MERGE: 'merge',
  SPLIT: 'split',
} as const;

export const SUPPORT_RULE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export const SUPPORT_RULE = {
  TYPE: SUPPORT_RULE_TYPE,
  CONDITION: SUPPORT_RULE_CONDITION,
  ACTION: SUPPORT_RULE_ACTION,
  STATUS: SUPPORT_RULE_STATUS,
  MAX_RULES: 500,
  MAX_CONDITIONS_PER_RULE: 20,
  MAX_ACTIONS_PER_RULE: 10,
  MAX_NESTED_DEPTH: 3,
  PRIORITY_MIN: 1,
  PRIORITY_MAX: 100,
  EVALUATION_TIMEOUT_MS: 1000,
  STOP_ON_MATCH: true,
} as const;

export type SupportRuleTypeType = (typeof SUPPORT_RULE_TYPE)[keyof typeof SUPPORT_RULE_TYPE];
export type SupportRuleConditionType =
  (typeof SUPPORT_RULE_CONDITION)[keyof typeof SUPPORT_RULE_CONDITION];
export type SupportRuleActionType = (typeof SUPPORT_RULE_ACTION)[keyof typeof SUPPORT_RULE_ACTION];
export type SupportRuleStatusType = (typeof SUPPORT_RULE_STATUS)[keyof typeof SUPPORT_RULE_STATUS];
