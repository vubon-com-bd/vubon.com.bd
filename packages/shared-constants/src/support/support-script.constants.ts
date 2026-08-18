/**
 * সাপোর্ট স্ক্রিপ্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * স্ক্রিপ্ট আইডি প্রিফিক্স
 */
export const SCRIPT_ID_PREFIX = 'SCR';

/**
 * স্ক্রিপ্ট নম্বর ফরম্যাট
 */
export const SCRIPT_NUMBER_FORMAT = 'SCR-{category}-{sequence}';

/**
 * ডিফল্ট স্ক্রিপ্ট ভার্সন
 */
export const DEFAULT_SCRIPT_VERSION = '1.0.0';

/**
 * স্ক্রিপ্ট এক্সিকিউশন টাইমআউট (সেকেন্ডে)
 */
export const SCRIPT_EXECUTION_TIMEOUT = 300;

/**
 * স্ক্রিপ্ট রানটাইম এনভায়রনমেন্ট
 */
export const SCRIPT_RUNTIME_ENVIRONMENTS = {
  NODE: 'node',
  PYTHON: 'python',
  SHELL: 'shell',
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript',
  GO: 'go',
  RUBY: 'ruby',
  PHP: 'php',
} as const;

/**
 * স্ক্রিপ্ট ডিপেন্ডেন্সি রেজোলিউশন রুলস
 */
export const SCRIPT_DEPENDENCY_RESOLUTION = {
  AUTO_INSTALL: 'auto_install',
  MANUAL_INSTALL: 'manual_install',
  VERSION_LOCK: 'version_lock',
  COMPATIBILITY_CHECK: 'compatibility_check',
} as const;

/**
 * স্ক্রিপ্ট লগিং লেভেল
 */
export const SCRIPT_LOGGING_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  SILENT: 'silent',
} as const;

/**
 * স্ক্রিপ্ট ব্যাকআপ পিরিয়ড (দিনে)
 */
export const SCRIPT_BACKUP_PERIOD = 30;

/**
 * স্ক্রিপ্ট টাইপ
 */
export const SCRIPT_TYPE = {
  TICKET: 'ticket',
  AUTOMATION: 'automation',
  REPORT: 'report',
  INTEGRATION: 'integration',
  MIGRATION: 'migration',
  DATA: 'data',
  UTILITY: 'utility',
  MAINTENANCE: 'maintenance',
  SECURITY: 'security',
  TESTING: 'testing',
} as const;

/**
 * স্ক্রিপ্ট স্ট্যাটাস
 */
export const SCRIPT_STATUS = {
  DRAFT: 'draft',
  TESTING: 'testing',
  APPROVED: 'approved',
  PUBLISHED: 'published',
  DEPRECATED: 'deprecated',
  ARCHIVED: 'archived',
} as const;

/**
 * স্ক্রিপ্ট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SCRIPT_STATUS_DISPLAY_NAMES = {
  [SCRIPT_STATUS.DRAFT]: 'খসড়া',
  [SCRIPT_STATUS.TESTING]: 'পরীক্ষামূলক',
  [SCRIPT_STATUS.APPROVED]: 'অনুমোদিত',
  [SCRIPT_STATUS.PUBLISHED]: 'প্রকাশিত',
  [SCRIPT_STATUS.DEPRECATED]: 'অব্যবহৃত',
  [SCRIPT_STATUS.ARCHIVED]: 'আর্কাইভড',
} as const;

/**
 * স্ক্রিপ্ট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SCRIPT_STATUS_COLORS = {
  [SCRIPT_STATUS.DRAFT]: '#95a5a6',
  [SCRIPT_STATUS.TESTING]: '#f39c12',
  [SCRIPT_STATUS.APPROVED]: '#3498db',
  [SCRIPT_STATUS.PUBLISHED]: '#2ecc71',
  [SCRIPT_STATUS.DEPRECATED]: '#c0392b',
  [SCRIPT_STATUS.ARCHIVED]: '#7f8c8d',
} as const;

/**
 * স্ক্রিপ্ট ডিফল্ট সেটিংস
 */
export const SCRIPT_DEFAULT_SETTINGS = {
  defaultVersion: DEFAULT_SCRIPT_VERSION,
  executionTimeout: SCRIPT_EXECUTION_TIMEOUT,
  runtimeEnvironment: SCRIPT_RUNTIME_ENVIRONMENTS.NODE,
  dependencyResolution: SCRIPT_DEPENDENCY_RESOLUTION.AUTO_INSTALL,
  loggingLevel: SCRIPT_LOGGING_LEVELS.INFO,
  backupPeriod: SCRIPT_BACKUP_PERIOD,
} as const;

/**
 * স্ক্রিপ্ট ভ্যালিডেশন রুলস
 */
export const SCRIPT_VALIDATION_RULES = {
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
  code: {
    minLength: 1,
    maxLength: 100000,
    required: true,
  },
  version: {
    pattern: '^\\d+\\.\\d+\\.\\d+$',
    required: true,
  },
} as const;

export type ScriptIdPrefix = typeof SCRIPT_ID_PREFIX;
export type ScriptRuntimeEnvironment =
  (typeof SCRIPT_RUNTIME_ENVIRONMENTS)[keyof typeof SCRIPT_RUNTIME_ENVIRONMENTS];
export type ScriptDependencyResolution =
  (typeof SCRIPT_DEPENDENCY_RESOLUTION)[keyof typeof SCRIPT_DEPENDENCY_RESOLUTION];
export type ScriptLoggingLevel = (typeof SCRIPT_LOGGING_LEVELS)[keyof typeof SCRIPT_LOGGING_LEVELS];
export type ScriptType = (typeof SCRIPT_TYPE)[keyof typeof SCRIPT_TYPE];
export type ScriptStatus = (typeof SCRIPT_STATUS)[keyof typeof SCRIPT_STATUS];

export interface ScriptDefaultSettings {
  defaultVersion: string;
  executionTimeout: number;
  runtimeEnvironment: ScriptRuntimeEnvironment;
  dependencyResolution: ScriptDependencyResolution;
  loggingLevel: ScriptLoggingLevel;
  backupPeriod: number;
}

export interface ScriptValidationRules {
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
  code: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  version: {
    pattern: string;
    required: boolean;
  };
}

export interface ScriptDependency {
  name: string;
  version: string;
  type: 'runtime' | 'dev' | 'peer';
  optional: boolean;
}

export interface ScriptParameter {
  name: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  required: boolean;
  defaultValue?: unknown;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}

export interface Script {
  id: string;
  name: string;
  description?: string;
  type: ScriptType;
  status: ScriptStatus;
  version: string;
  code: string;
  runtime: ScriptRuntimeEnvironment;
  dependencies: ScriptDependency[];
  parameters: ScriptParameter[];
  tags: string[];
  isSystem: boolean;
  isPublic: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ScriptExecution {
  id: string;
  scriptId: string;
  parameters: Record<string, unknown>;
  startedAt: Date;
  completedAt?: Date;
  status: ScriptStatus;
  logs: string[];
  result: string;
  error?: string;
  executionTime: number;
  metadata?: Record<string, unknown>;
}

export interface ScriptAnalytics {
  scriptId: string;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutedAt?: Date;
  period: string;
}

/**
 * স্ক্রিপ্ট কনফিগারেশন
 */
export const SCRIPT_CONFIG = {
  idPrefix: SCRIPT_ID_PREFIX,
  numberFormat: SCRIPT_NUMBER_FORMAT,
  defaultSettings: SCRIPT_DEFAULT_SETTINGS,
  validationRules: SCRIPT_VALIDATION_RULES,
  types: SCRIPT_TYPE,
  statuses: SCRIPT_STATUS,
  runtimeEnvironments: SCRIPT_RUNTIME_ENVIRONMENTS,
  dependencyResolution: SCRIPT_DEPENDENCY_RESOLUTION,
  loggingLevels: SCRIPT_LOGGING_LEVELS,
  statusColors: SCRIPT_STATUS_COLORS,
} as const;

/**
 * স্ক্রিপ্ট ইভেন্ট টাইপ
 */
export const SCRIPT_EVENT_TYPES = {
  CREATED: 'script_created',
  UPDATED: 'script_updated',
  EXECUTED: 'script_executed',
  APPROVED: 'script_approved',
  PUBLISHED: 'script_published',
  DEPRECATED: 'script_deprecated',
  ARCHIVED: 'script_archived',
  FAILED: 'script_failed',
} as const;

export type ScriptEventType = (typeof SCRIPT_EVENT_TYPES)[keyof typeof SCRIPT_EVENT_TYPES];

/**
 * স্ক্রিপ্ট মেট্রিক্স
 */
export const SCRIPT_METRICS = {
  TOTAL_SCRIPTS: 'total_scripts',
  PUBLISHED_SCRIPTS: 'published_scripts',
  TOTAL_EXECUTIONS: 'total_executions',
  SUCCESS_RATE: 'success_rate',
  AVG_EXECUTION_TIME: 'avg_execution_time',
  SCRIPTS_BY_TYPE: 'scripts_by_type',
} as const;

export type ScriptMetric = (typeof SCRIPT_METRICS)[keyof typeof SCRIPT_METRICS];
