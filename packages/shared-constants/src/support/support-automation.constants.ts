/**
 * সাপোর্ট অটোমেশন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * অটোমেশন আইডি প্রিফিক্স
 */
export const AUTOMATION_ID_PREFIX = 'AUTO';

/**
 * অটোমেশন নম্বর ফরম্যাট
 */
export const AUTOMATION_NUMBER_FORMAT = 'AUTO-{type}-{sequence}';

/**
 * ডিফল্ট অটোমেশন ফ্রিকোয়েন্সি (মিনিটে)
 */
export const DEFAULT_AUTOMATION_FREQUENCY = 15;

/**
 * অটোমেশন টাইমআউট (মিনিটে)
 */
export const AUTOMATION_TIMEOUT = 5;

/**
 * অটোমেশন রেট লিমিট (প্রতি মিনিটে)
 */
export const AUTOMATION_RATE_LIMIT = 100;

/**
 * অটোমেশন ব্ল্যাকলিস্ট পিরিয়ড (মিনিটে)
 */
export const AUTOMATION_BLACKLIST_PERIOD = 60;

/**
 * অটোমেশন লগ রিটেনশন পিরিয়ড (দিনে)
 */
export const AUTOMATION_LOG_RETENTION_PERIOD = 90;

/**
 * অটোমেশন ড্রাই রান মোড
 */
export const AUTOMATION_DRY_RUN_MODE = {
  DISABLED: 'disabled',
  ENABLED: 'enabled',
  SELECTIVE: 'selective',
} as const;

/**
 * অটোমেশন টাইপ
 */
export const AUTOMATION_TYPE = {
  TICKET: 'ticket',
  RULE: 'rule',
  WORKFLOW: 'workflow',
  EMAIL: 'email',
  NOTIFICATION: 'notification',
  SLA: 'sla',
  ESCALATION: 'escalation',
  ASSIGNMENT: 'assignment',
  ROUTING: 'routing',
  RESPONSE: 'response',
  FOLLOW_UP: 'follow_up',
  REMINDER: 'reminder',
  CLEANUP: 'cleanup',
  REPORT: 'report',
  BACKUP: 'backup',
} as const;

/**
 * অটোমেশন টাইপের ডিসপ্লে নাম
 */
export const AUTOMATION_TYPE_DISPLAY_NAMES = {
  [AUTOMATION_TYPE.TICKET]: 'টিকেট অটোমেশন',
  [AUTOMATION_TYPE.RULE]: 'রুল অটোমেশন',
  [AUTOMATION_TYPE.WORKFLOW]: 'ওয়ার্কফ্লো অটোমেশন',
  [AUTOMATION_TYPE.EMAIL]: 'ইমেইল অটোমেশন',
  [AUTOMATION_TYPE.NOTIFICATION]: 'নোটিফিকেশন অটোমেশন',
  [AUTOMATION_TYPE.SLA]: 'এসএলএ অটোমেশন',
  [AUTOMATION_TYPE.ESCALATION]: 'এস্কেলেশন অটোমেশন',
  [AUTOMATION_TYPE.ASSIGNMENT]: 'অ্যাসাইনমেন্ট অটোমেশন',
  [AUTOMATION_TYPE.ROUTING]: 'রাউটিং অটোমেশন',
  [AUTOMATION_TYPE.RESPONSE]: 'রেসপন্স অটোমেশন',
  [AUTOMATION_TYPE.FOLLOW_UP]: 'ফলো-আপ অটোমেশন',
  [AUTOMATION_TYPE.REMINDER]: 'রিমাইন্ডার অটোমেশন',
  [AUTOMATION_TYPE.CLEANUP]: 'ক্লিনআপ অটোমেশন',
  [AUTOMATION_TYPE.REPORT]: 'রিপোর্ট অটোমেশন',
  [AUTOMATION_TYPE.BACKUP]: 'ব্যাকআপ অটোমেশন',
} as const;

/**
 * অটোমেশন স্ট্যাটাস
 */
export const AUTOMATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PAUSED: 'paused',
  FAILED: 'failed',
  COMPLETED: 'completed',
  RUNNING: 'running',
  SCHEDULED: 'scheduled',
} as const;

/**
 * অটোমেশন স্ট্যাটাসের ডিসপ্লে নাম
 */
export const AUTOMATION_STATUS_DISPLAY_NAMES = {
  [AUTOMATION_STATUS.ACTIVE]: 'সক্রিয়',
  [AUTOMATION_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [AUTOMATION_STATUS.PAUSED]: 'বিরতিপ্রাপ্ত',
  [AUTOMATION_STATUS.FAILED]: 'ব্যর্থ',
  [AUTOMATION_STATUS.COMPLETED]: 'সমাপ্ত',
  [AUTOMATION_STATUS.RUNNING]: 'চলমান',
  [AUTOMATION_STATUS.SCHEDULED]: 'নির্ধারিত',
} as const;

/**
 * অটোমেশন স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const AUTOMATION_STATUS_COLORS = {
  [AUTOMATION_STATUS.ACTIVE]: '#2ecc71',
  [AUTOMATION_STATUS.INACTIVE]: '#95a5a6',
  [AUTOMATION_STATUS.PAUSED]: '#f39c12',
  [AUTOMATION_STATUS.FAILED]: '#e74c3c',
  [AUTOMATION_STATUS.COMPLETED]: '#27ae60',
  [AUTOMATION_STATUS.RUNNING]: '#3498db',
  [AUTOMATION_STATUS.SCHEDULED]: '#9b59b6',
} as const;

/**
 * অটোমেশন ফ্রিকোয়েন্সি ইউনিট
 */
export const AUTOMATION_FREQUENCY_UNITS = {
  MINUTES: 'minutes',
  HOURS: 'hours',
  DAYS: 'days',
  WEEKS: 'weeks',
  MONTHS: 'months',
  CUSTOM: 'custom',
} as const;

/**
 * অটোমেশন ট্রিগার টাইপ
 */
export const AUTOMATION_TRIGGER_TYPES = {
  SCHEDULED: 'scheduled',
  EVENT: 'event',
  CONDITION: 'condition',
  MANUAL: 'manual',
  WEBHOOK: 'webhook',
  API: 'api',
} as const;

/**
 * অটোমেশন অ্যাকশন টাইপ
 */
export const AUTOMATION_ACTION_TYPES = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  NOTIFY: 'notify',
  ESCALATE: 'escalate',
  ASSIGN: 'assign',
  ROUTE: 'route',
  RESPOND: 'respond',
  EXECUTE: 'execute',
  WAIT: 'wait',
  CONDITION: 'condition',
  LOOP: 'loop',
} as const;

/**
 * অটোমেশন ডিফল্ট সেটিংস
 */
export const AUTOMATION_DEFAULT_SETTINGS = {
  defaultFrequency: DEFAULT_AUTOMATION_FREQUENCY,
  timeout: AUTOMATION_TIMEOUT,
  rateLimit: AUTOMATION_RATE_LIMIT,
  blacklistPeriod: AUTOMATION_BLACKLIST_PERIOD,
  logRetentionPeriod: AUTOMATION_LOG_RETENTION_PERIOD,
  dryRunMode: AUTOMATION_DRY_RUN_MODE.DISABLED,
} as const;

/**
 * অটোমেশন ভ্যালিডেশন রুলস
 */
export const AUTOMATION_VALIDATION_RULES = {
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
  frequency: {
    min: 1,
    max: 1440,
  },
  actions: {
    minActions: 1,
    maxActions: 50,
  },
} as const;

export type AutomationIdPrefix = typeof AUTOMATION_ID_PREFIX;
export type AutomationDryRunMode =
  (typeof AUTOMATION_DRY_RUN_MODE)[keyof typeof AUTOMATION_DRY_RUN_MODE];
export type AutomationType = (typeof AUTOMATION_TYPE)[keyof typeof AUTOMATION_TYPE];
export type AutomationStatus = (typeof AUTOMATION_STATUS)[keyof typeof AUTOMATION_STATUS];
export type AutomationFrequencyUnit =
  (typeof AUTOMATION_FREQUENCY_UNITS)[keyof typeof AUTOMATION_FREQUENCY_UNITS];
export type AutomationTriggerType =
  (typeof AUTOMATION_TRIGGER_TYPES)[keyof typeof AUTOMATION_TRIGGER_TYPES];
export type AutomationActionType =
  (typeof AUTOMATION_ACTION_TYPES)[keyof typeof AUTOMATION_ACTION_TYPES];

export interface AutomationDefaultSettings {
  defaultFrequency: number;
  timeout: number;
  rateLimit: number;
  blacklistPeriod: number;
  logRetentionPeriod: number;
  dryRunMode: AutomationDryRunMode;
}

export interface AutomationValidationRules {
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
  frequency: {
    min: number;
    max: number;
  };
  actions: {
    minActions: number;
    maxActions: number;
  };
}

export interface AutomationSchedule {
  frequency: number;
  unit: AutomationFrequencyUnit;
  startTime?: string;
  endTime?: string;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  timezone?: string;
}

export interface AutomationTrigger {
  type: AutomationTriggerType;
  event?: string;
  condition?: string;
  webhookUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface AutomationAction {
  id: string;
  type: AutomationActionType;
  params: Record<string, unknown>;
  order: number;
  condition?: string;
  metadata?: Record<string, unknown>;
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  type: AutomationType;
  status: AutomationStatus;
  schedule: AutomationSchedule;
  trigger: AutomationTrigger;
  actions: AutomationAction[];
  isActive: boolean;
  isSystem: boolean;
  lastRunAt?: Date;
  nextRunAt?: Date;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface AutomationExecution {
  id: string;
  automationId: string;
  startedAt: Date;
  completedAt?: Date;
  status: AutomationStatus;
  result: string;
  actionsExecuted: number;
  actionsSucceeded: number;
  actionsFailed: number;
  error?: string;
  metadata?: Record<string, unknown>;
}

export interface AutomationAnalytics {
  automationId: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutedAt?: Date;
  successRate: number;
  period: string;
}

/**
 * অটোমেশন কনফিগারেশন
 */
export const AUTOMATION_CONFIG = {
  idPrefix: AUTOMATION_ID_PREFIX,
  numberFormat: AUTOMATION_NUMBER_FORMAT,
  defaultSettings: AUTOMATION_DEFAULT_SETTINGS,
  validationRules: AUTOMATION_VALIDATION_RULES,
  types: AUTOMATION_TYPE,
  statuses: AUTOMATION_STATUS,
  frequencyUnits: AUTOMATION_FREQUENCY_UNITS,
  triggerTypes: AUTOMATION_TRIGGER_TYPES,
  actionTypes: AUTOMATION_ACTION_TYPES,
  dryRunModes: AUTOMATION_DRY_RUN_MODE,
  statusColors: AUTOMATION_STATUS_COLORS,
} as const;

/**
 * অটোমেশন ইভেন্ট টাইপ
 */
export const AUTOMATION_EVENT_TYPES = {
  CREATED: 'automation_created',
  UPDATED: 'automation_updated',
  ACTIVATED: 'automation_activated',
  DEACTIVATED: 'automation_deactivated',
  PAUSED: 'automation_paused',
  RESUMED: 'automation_resumed',
  EXECUTED: 'automation_executed',
  FAILED: 'automation_failed',
  COMPLETED: 'automation_completed',
} as const;

export type AutomationEventType =
  (typeof AUTOMATION_EVENT_TYPES)[keyof typeof AUTOMATION_EVENT_TYPES];

/**
 * অটোমেশন মেট্রিক্স
 */
export const AUTOMATION_METRICS = {
  TOTAL_AUTOMATIONS: 'total_automations',
  ACTIVE_AUTOMATIONS: 'active_automations',
  TOTAL_EXECUTIONS: 'total_executions',
  SUCCESS_RATE: 'success_rate',
  AVG_EXECUTION_TIME: 'avg_execution_time',
  AUTOMATIONS_BY_TYPE: 'automations_by_type',
} as const;

export type AutomationMetric = (typeof AUTOMATION_METRICS)[keyof typeof AUTOMATION_METRICS];
