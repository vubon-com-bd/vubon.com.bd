export const NOTIFICATION_RULE_TYPE = {
  TRIGGER: 'trigger',
  FILTER: 'filter',
  THROTTLE: 'throttle',
  QUIET_HOURS: 'quiet_hours',
  ESCALATION: 'escalation',
  SUPPRESSION: 'suppression',
} as const;

export const NOTIFICATION_RULE_CONDITION = {
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

export const NOTIFICATION_RULE_ACTION = {
  SEND: 'send',
  SKIP: 'skip',
  DELAY: 'delay',
  ESCALATE: 'escalate',
  SUPPRESS: 'suppress',
  REDIRECT: 'redirect',
  AGGREGATE: 'aggregate',
} as const;

export const NOTIFICATION_RULE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const;

export const NOTIFICATION_RULE = {
  MAX_RULES: 500,
  MAX_CONDITIONS_PER_RULE: 20,
  MAX_ACTIONS_PER_RULE: 10,
  MAX_NESTED_DEPTH: 3,
  PRIORITY_MIN: 1,
  PRIORITY_MAX: 100,
  EVALUATION_TIMEOUT_MS: 1000,
  QUIET_HOURS_DEFAULT_START: 22,
  QUIET_HOURS_DEFAULT_END: 8,
} as const;

export type NotificationRuleTypeType =
  (typeof NOTIFICATION_RULE_TYPE)[keyof typeof NOTIFICATION_RULE_TYPE];
export type NotificationRuleConditionType =
  (typeof NOTIFICATION_RULE_CONDITION)[keyof typeof NOTIFICATION_RULE_CONDITION];
export type NotificationRuleActionType =
  (typeof NOTIFICATION_RULE_ACTION)[keyof typeof NOTIFICATION_RULE_ACTION];
export type NotificationRuleStatusType =
  (typeof NOTIFICATION_RULE_STATUS)[keyof typeof NOTIFICATION_RULE_STATUS];
