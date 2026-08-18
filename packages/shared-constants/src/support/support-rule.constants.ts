/**
 * সাপোর্ট রুল সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রুল আইডি প্রিফিক্স
 */
export const RULE_ID_PREFIX = 'RUL';

/**
 * রুল নম্বর ফরম্যাট
 */
export const RULE_NUMBER_FORMAT = 'RUL-{category}-{sequence}';

/**
 * ডিফল্ট রুল প্রায়োরিটি
 */
export const DEFAULT_RULE_PRIORITY = 100;

/**
 * রুল এক্সিকিউশন অর্ডার
 */
export const RULE_EXECUTION_ORDER = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
  PRIORITY_BASED: 'priority_based',
  CATEGORY_BASED: 'category_based',
} as const;

/**
 * ম্যাক্সিমাম রুল পার টিকেট
 */
export const MAX_RULES_PER_TICKET = 50;

/**
 * রুল ইভ্যালুয়েশন টাইমআউট (মিলিসেকেন্ডে)
 */
export const RULE_EVALUATION_TIMEOUT = 5000;

/**
 * রুল আর্কাইভ পিরিয়ড (দিনে)
 */
export const RULE_ARCHIVE_PERIOD = 365;

/**
 * রুল টেস্টিং মোড
 */
export const RULE_TESTING_MODE = {
  DISABLED: 'disabled',
  ENABLED: 'enabled',
  DRY_RUN: 'dry_run',
} as const;

/**
 * রুল টাইপ
 */
export const RULE_TYPE = {
  ASSIGNMENT: 'assignment',
  ESCALATION: 'escalation',
  NOTIFICATION: 'notification',
  PRIORITY: 'priority',
  STATUS: 'status',
  CATEGORY: 'category',
  TAG: 'tag',
  SLACK: 'slack',
  EMAIL: 'email',
  AUTO_RESPONSE: 'auto_response',
  WORKFLOW: 'workflow',
  VALIDATION: 'validation',
} as const;

/**
 * রুল টাইপের ডিসপ্লে নাম
 */
export const RULE_TYPE_DISPLAY_NAMES = {
  [RULE_TYPE.ASSIGNMENT]: 'অ্যাসাইনমেন্ট',
  [RULE_TYPE.ESCALATION]: 'এস্কেলেশন',
  [RULE_TYPE.NOTIFICATION]: 'নোটিফিকেশন',
  [RULE_TYPE.PRIORITY]: 'প্রায়োরিটি',
  [RULE_TYPE.STATUS]: 'স্ট্যাটাস',
  [RULE_TYPE.CATEGORY]: 'ক্যাটাগরি',
  [RULE_TYPE.TAG]: 'ট্যাগ',
  [RULE_TYPE.SLACK]: 'স্ল্যাক',
  [RULE_TYPE.EMAIL]: 'ইমেইল',
  [RULE_TYPE.AUTO_RESPONSE]: 'অটো-রেসপন্স',
  [RULE_TYPE.WORKFLOW]: 'ওয়ার্কফ্লো',
  [RULE_TYPE.VALIDATION]: 'ভ্যালিডেশন',
} as const;

/**
 * রুল স্ট্যাটাস
 */
export const RULE_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TESTING: 'testing',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

/**
 * রুল স্ট্যাটাসের ডিসপ্লে নাম
 */
export const RULE_STATUS_DISPLAY_NAMES = {
  [RULE_STATUS.DRAFT]: 'খসড়া',
  [RULE_STATUS.ACTIVE]: 'সক্রিয়',
  [RULE_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [RULE_STATUS.TESTING]: 'পরীক্ষামূলক',
  [RULE_STATUS.ARCHIVED]: 'আর্কাইভড',
  [RULE_STATUS.DEPRECATED]: 'অব্যবহৃত',
} as const;

/**
 * রুল স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const RULE_STATUS_COLORS = {
  [RULE_STATUS.DRAFT]: '#95a5a6',
  [RULE_STATUS.ACTIVE]: '#2ecc71',
  [RULE_STATUS.INACTIVE]: '#e74c3c',
  [RULE_STATUS.TESTING]: '#f39c12',
  [RULE_STATUS.ARCHIVED]: '#7f8c8d',
  [RULE_STATUS.DEPRECATED]: '#c0392b',
} as const;

/**
 * রুল কন্ডিশন অপারেটর
 */
export const RULE_CONDITION_OPERATORS = {
  EQUALS: 'equals',
  NOT_EQUALS: 'not_equals',
  CONTAINS: 'contains',
  NOT_CONTAINS: 'not_contains',
  STARTS_WITH: 'starts_with',
  ENDS_WITH: 'ends_with',
  GREATER_THAN: 'greater_than',
  LESS_THAN: 'less_than',
  GREATER_THAN_OR_EQUAL: 'greater_than_or_equal',
  LESS_THAN_OR_EQUAL: 'less_than_or_equal',
  IN: 'in',
  NOT_IN: 'not_in',
  BETWEEN: 'between',
  IS_EMPTY: 'is_empty',
  IS_NOT_EMPTY: 'is_not_empty',
  MATCHES_REGEX: 'matches_regex',
} as const;

/**
 * রুল অ্যাকশন টাইপ
 */
export const RULE_ACTION_TYPES = {
  ASSIGN_TO: 'assign_to',
  ESCALATE_TO: 'escalate_to',
  SET_PRIORITY: 'set_priority',
  SET_STATUS: 'set_status',
  SET_CATEGORY: 'set_category',
  ADD_TAG: 'add_tag',
  REMOVE_TAG: 'remove_tag',
  SEND_NOTIFICATION: 'send_notification',
  SEND_EMAIL: 'send_email',
  SEND_SLACK: 'send_slack',
  SEND_SMS: 'send_sms',
  CREATE_TICKET: 'create_ticket',
  UPDATE_TICKET: 'update_ticket',
  CLOSE_TICKET: 'close_ticket',
  COMMENT_TICKET: 'comment_ticket',
  MERGE_TICKET: 'merge_ticket',
  SPLIT_TICKET: 'split_ticket',
} as const;

/**
 * রুল ডিফল্ট সেটিংস
 */
export const RULE_DEFAULT_SETTINGS = {
  defaultPriority: DEFAULT_RULE_PRIORITY,
  executionOrder: RULE_EXECUTION_ORDER.PRIORITY_BASED,
  maxRulesPerTicket: MAX_RULES_PER_TICKET,
  evaluationTimeout: RULE_EVALUATION_TIMEOUT,
  archivePeriod: RULE_ARCHIVE_PERIOD,
  testingMode: RULE_TESTING_MODE.DISABLED,
} as const;

/**
 * রুল ভ্যালিডেশন রুলস
 */
export const RULE_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  description: {
    minLength: 0,
    maxLength: 500,
    required: false,
  },
  conditions: {
    minConditions: 1,
    maxConditions: 20,
  },
  actions: {
    minActions: 1,
    maxActions: 10,
  },
  priority: {
    min: 1,
    max: 1000,
  },
} as const;

export type RuleIdPrefix = typeof RULE_ID_PREFIX;
export type RuleExecutionOrder = (typeof RULE_EXECUTION_ORDER)[keyof typeof RULE_EXECUTION_ORDER];
export type RuleTestingMode = (typeof RULE_TESTING_MODE)[keyof typeof RULE_TESTING_MODE];
export type RuleType = (typeof RULE_TYPE)[keyof typeof RULE_TYPE];
export type RuleStatus = (typeof RULE_STATUS)[keyof typeof RULE_STATUS];
export type RuleConditionOperator =
  (typeof RULE_CONDITION_OPERATORS)[keyof typeof RULE_CONDITION_OPERATORS];
export type RuleActionType = (typeof RULE_ACTION_TYPES)[keyof typeof RULE_ACTION_TYPES];

export interface RuleDefaultSettings {
  defaultPriority: number;
  executionOrder: RuleExecutionOrder;
  maxRulesPerTicket: number;
  evaluationTimeout: number;
  archivePeriod: number;
  testingMode: RuleTestingMode;
}

export interface RuleValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  conditions: {
    minConditions: number;
    maxConditions: number;
  };
  actions: {
    minActions: number;
    maxActions: number;
  };
  priority: {
    min: number;
    max: number;
  };
}

export interface RuleCondition {
  id: string;
  field: string;
  operator: RuleConditionOperator;
  value: string | number | boolean | string[] | number[];
  metadata?: Record<string, unknown>;
}

export interface RuleAction {
  id: string;
  type: RuleActionType;
  params: Record<string, unknown>;
  order: number;
  metadata?: Record<string, unknown>;
}

export interface Rule {
  id: string;
  name: string;
  description?: string;
  type: RuleType;
  status: RuleStatus;
  priority: number;
  conditions: RuleCondition[];
  actions: RuleAction[];
  isActive: boolean;
  isSystem: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface RuleExecution {
  id: string;
  ruleId: string;
  ticketId: string;
  triggeredAt: Date;
  triggeredBy: string;
  conditionsMet: boolean;
  actionsExecuted: boolean;
  executionTime: number;
  result: string;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface RuleAnalytics {
  ruleId: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutedAt?: Date;
  period: string;
}

/**
 * রুল কনফিগারেশন
 */
export const RULE_CONFIG = {
  idPrefix: RULE_ID_PREFIX,
  numberFormat: RULE_NUMBER_FORMAT,
  defaultSettings: RULE_DEFAULT_SETTINGS,
  validationRules: RULE_VALIDATION_RULES,
  types: RULE_TYPE,
  statuses: RULE_STATUS,
  operators: RULE_CONDITION_OPERATORS,
  actionTypes: RULE_ACTION_TYPES,
  executionOrders: RULE_EXECUTION_ORDER,
  testingModes: RULE_TESTING_MODE,
  statusColors: RULE_STATUS_COLORS,
} as const;

/**
 * রুল ইভেন্ট টাইপ
 */
export const RULE_EVENT_TYPES = {
  CREATED: 'rule_created',
  UPDATED: 'rule_updated',
  ACTIVATED: 'rule_activated',
  DEACTIVATED: 'rule_deactivated',
  DELETED: 'rule_deleted',
  EXECUTED: 'rule_executed',
  FAILED: 'rule_failed',
  TESTED: 'rule_tested',
} as const;

export type RuleEventType = (typeof RULE_EVENT_TYPES)[keyof typeof RULE_EVENT_TYPES];

/**
 * রুল মেট্রিক্স
 */
export const RULE_METRICS = {
  TOTAL_RULES: 'total_rules',
  ACTIVE_RULES: 'active_rules',
  TOTAL_EXECUTIONS: 'total_executions',
  SUCCESS_RATE: 'success_rate',
  AVG_EXECUTION_TIME: 'avg_execution_time',
  RULES_BY_TYPE: 'rules_by_type',
} as const;

export type RuleMetric = (typeof RULE_METRICS)[keyof typeof RULE_METRICS];
