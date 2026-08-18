/**
 * চ্যাটবট কনটেক্সট ম্যানেজমেন্ট সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * কনটেক্সট আইডি প্রিফিক্স
 */
export const CONTEXT_ID_PREFIX = 'CTX';

/**
 * কনটেক্সট নম্বর ফরম্যাট
 */
export const CONTEXT_NUMBER_FORMAT = 'CTX-{sessionId}-{sequence}';

/**
 * কনটেক্সট লাইফটাইম (মিনিটে)
 */
export const CONTEXT_LIFETIME = 30;

/**
 * কনটেক্সট স্টোরেজ টাইমআউট (মিনিটে)
 */
export const CONTEXT_STORAGE_TIMEOUT = 60;

/**
 * ম্যাক্সিমাম কনটেক্সট ভেরিয়েবল
 */
export const MAX_CONTEXT_VARIABLES = 50;

/**
 * ডিফল্ট কনটেক্সট টাইমআউট (মিনিটে)
 */
export const DEFAULT_CONTEXT_TIMEOUT = 15;

/**
 * কনটেক্সট মার্জ স্ট্র্যাটেজি
 */
export const CONTEXT_MERGE_STRATEGIES = {
  OVERWRITE: 'overwrite',
  MERGE: 'merge',
  KEEP_EXISTING: 'keep_existing',
  APPEND: 'append',
  DEEP_MERGE: 'deep_merge',
} as const;

/**
 * কনটেক্সট টাইপ
 */
export const CONTEXT_TYPE = {
  SESSION: 'session',
  USER: 'user',
  CONVERSATION: 'conversation',
  TEMPORARY: 'temporary',
  PERSISTENT: 'persistent',
  GLOBAL: 'global',
} as const;

/**
 * কনটেক্সট টাইপের ডিসপ্লে নাম
 */
export const CONTEXT_TYPE_DISPLAY_NAMES = {
  [CONTEXT_TYPE.SESSION]: 'সেশন',
  [CONTEXT_TYPE.USER]: 'ব্যবহারকারী',
  [CONTEXT_TYPE.CONVERSATION]: 'কথোপকথন',
  [CONTEXT_TYPE.TEMPORARY]: 'অস্থায়ী',
  [CONTEXT_TYPE.PERSISTENT]: 'স্থায়ী',
  [CONTEXT_TYPE.GLOBAL]: 'গ্লোবাল',
} as const;

/**
 * কনটেক্সট স্টোরেজ টাইপ
 */
export const CONTEXT_STORAGE_TYPE = {
  MEMORY: 'memory',
  REDIS: 'redis',
  DATABASE: 'database',
  FILE: 'file',
  CACHE: 'cache',
} as const;

/**
 * কনটেক্সট স্টোরেজ টাইপের ডিসপ্লে নাম
 */
export const CONTEXT_STORAGE_TYPE_DISPLAY_NAMES = {
  [CONTEXT_STORAGE_TYPE.MEMORY]: 'মেমোরি',
  [CONTEXT_STORAGE_TYPE.REDIS]: 'রেডিস',
  [CONTEXT_STORAGE_TYPE.DATABASE]: 'ডেটাবেস',
  [CONTEXT_STORAGE_TYPE.FILE]: 'ফাইল',
  [CONTEXT_STORAGE_TYPE.CACHE]: 'ক্যাশে',
} as const;

/**
 * কনটেক্সট স্ট্যাটাস
 */
export const CONTEXT_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  LOCKED: 'locked',
} as const;

/**
 * কনটেক্সট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const CONTEXT_STATUS_DISPLAY_NAMES = {
  [CONTEXT_STATUS.ACTIVE]: 'সক্রিয়',
  [CONTEXT_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [CONTEXT_STATUS.ARCHIVED]: 'আর্কাইভড',
  [CONTEXT_STATUS.DELETED]: 'মুছে ফেলা',
  [CONTEXT_STATUS.LOCKED]: 'লকড',
} as const;

/**
 * কনটেক্সট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const CONTEXT_STATUS_COLORS = {
  [CONTEXT_STATUS.ACTIVE]: '#2ecc71',
  [CONTEXT_STATUS.EXPIRED]: '#e74c3c',
  [CONTEXT_STATUS.ARCHIVED]: '#95a5a6',
  [CONTEXT_STATUS.DELETED]: '#7f8c8d',
  [CONTEXT_STATUS.LOCKED]: '#f39c12',
} as const;

/**
 * কনটেক্সট ডিফল্ট সেটিংস
 */
export const CONTEXT_DEFAULT_SETTINGS = {
  lifetime: CONTEXT_LIFETIME,
  storageTimeout: CONTEXT_STORAGE_TIMEOUT,
  maxVariables: MAX_CONTEXT_VARIABLES,
  defaultTimeout: DEFAULT_CONTEXT_TIMEOUT,
  mergeStrategy: CONTEXT_MERGE_STRATEGIES.MERGE,
  defaultType: CONTEXT_TYPE.SESSION,
  defaultStorage: CONTEXT_STORAGE_TYPE.MEMORY,
} as const;

/**
 * কনটেক্সট ভ্যালিডেশন রুলস
 */
export const CONTEXT_VALIDATION_RULES = {
  key: {
    minLength: 1,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9_\\-.]+$',
    required: true,
  },
  value: {
    maxSize: 10000,
    required: true,
  },
  variables: {
    maxCount: MAX_CONTEXT_VARIABLES,
    maxKeyLength: 100,
    maxValueSize: 10000,
  },
} as const;

/**
 * কনটেক্সট ইভেন্ট টাইপ
 */
export const CONTEXT_EVENT_TYPES = {
  CREATED: 'context_created',
  UPDATED: 'context_updated',
  EXPIRED: 'context_expired',
  ARCHIVED: 'context_archived',
  DELETED: 'context_deleted',
  LOCKED: 'context_locked',
  UNLOCKED: 'context_unlocked',
  MERGED: 'context_merged',
  CLEARED: 'context_cleared',
} as const;

/**
 * কনটেক্সট মেট্রিক্স
 */
export const CONTEXT_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  AVG_VARIABLES: 'avg_variables',
  AVG_LIFETIME: 'avg_lifetime',
  STORAGE_SIZE: 'storage_size',
} as const;

export type ContextIdPrefix = typeof CONTEXT_ID_PREFIX;
export type ContextMergeStrategy =
  (typeof CONTEXT_MERGE_STRATEGIES)[keyof typeof CONTEXT_MERGE_STRATEGIES];
export type ContextType = (typeof CONTEXT_TYPE)[keyof typeof CONTEXT_TYPE];
export type ContextStorageType = (typeof CONTEXT_STORAGE_TYPE)[keyof typeof CONTEXT_STORAGE_TYPE];
export type ContextStatus = (typeof CONTEXT_STATUS)[keyof typeof CONTEXT_STATUS];
export type ContextEventType = (typeof CONTEXT_EVENT_TYPES)[keyof typeof CONTEXT_EVENT_TYPES];
export type ContextMetric = (typeof CONTEXT_METRICS)[keyof typeof CONTEXT_METRICS];

export interface ContextDefaultSettings {
  lifetime: number;
  storageTimeout: number;
  maxVariables: number;
  defaultTimeout: number;
  mergeStrategy: ContextMergeStrategy;
  defaultType: ContextType;
  defaultStorage: ContextStorageType;
}

export interface ContextValidationRules {
  key: {
    minLength: number;
    maxLength: number;
    pattern: string;
    required: boolean;
  };
  value: {
    maxSize: number;
    required: boolean;
  };
  variables: {
    maxCount: number;
    maxKeyLength: number;
    maxValueSize: number;
  };
}

export interface ContextVariable {
  key: string;
  value: unknown;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface Context {
  id: string;
  sessionId: string;
  userId?: string;
  type: ContextType;
  status: ContextStatus;
  storageType: ContextStorageType;
  variables: Record<string, ContextVariable>;
  metadata?: Record<string, unknown>;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date;
}

export interface ContextHistory {
  id: string;
  contextId: string;
  action: ContextEventType;
  changes: Record<string, unknown>;
  performedBy: string;
  createdAt: Date;
}

export interface ContextAnalytics {
  totalContexts: number;
  activeContexts: number;
  expiredContexts: number;
  archivedContexts: number;
  avgVariables: number;
  avgLifetime: number;
  storageSize: number;
  period: string;
}

/**
 * কনটেক্সট কনফিগারেশন
 */
export const CONTEXT_CONFIG = {
  idPrefix: CONTEXT_ID_PREFIX,
  numberFormat: CONTEXT_NUMBER_FORMAT,
  defaultSettings: CONTEXT_DEFAULT_SETTINGS,
  validationRules: CONTEXT_VALIDATION_RULES,
  mergeStrategies: CONTEXT_MERGE_STRATEGIES,
  types: CONTEXT_TYPE,
  storageTypes: CONTEXT_STORAGE_TYPE,
  statuses: CONTEXT_STATUS,
  eventTypes: CONTEXT_EVENT_TYPES,
  metrics: CONTEXT_METRICS,
  statusColors: CONTEXT_STATUS_COLORS,
} as const;

/**
 * কনটেক্সট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const CONTEXT_STATUS_TRANSITIONS = {
  [CONTEXT_STATUS.ACTIVE]: ['expired', 'archived', 'locked', 'deleted'],
  [CONTEXT_STATUS.EXPIRED]: ['archived', 'deleted'],
  [CONTEXT_STATUS.ARCHIVED]: ['deleted'],
  [CONTEXT_STATUS.DELETED]: [],
  [CONTEXT_STATUS.LOCKED]: ['active', 'expired'],
} as const;

/**
 * কনটেক্সট মার্জ স্ট্র্যাটেজি বিবরণ
 */
export const CONTEXT_MERGE_STRATEGY_DESCRIPTIONS = {
  [CONTEXT_MERGE_STRATEGIES.OVERWRITE]: 'বিদ্যমান মানগুলি সম্পূর্ণরূপে প্রতিস্থাপন করে',
  [CONTEXT_MERGE_STRATEGIES.MERGE]: 'বিদ্যমান মানগুলির সাথে নতুন মানগুলি মার্জ করে',
  [CONTEXT_MERGE_STRATEGIES.KEEP_EXISTING]: 'বিদ্যমান মানগুলি রাখে, নতুন মানগুলি উপেক্ষা করে',
  [CONTEXT_MERGE_STRATEGIES.APPEND]: 'তালিকা বা অ্যারে মানের সাথে নতুন মান যুক্ত করে',
  [CONTEXT_MERGE_STRATEGIES.DEEP_MERGE]: 'নেস্টেড অবজেক্টের গভীর মার্জ করে',
} as const;

/**
 * কনটেক্সট স্টোরেজ টাইপের ডিফল্ট সেটিংস
 */
export const CONTEXT_STORAGE_TYPE_SETTINGS = {
  [CONTEXT_STORAGE_TYPE.MEMORY]: {
    maxSize: 1000,
    ttl: 3600,
    persistent: false,
  },
  [CONTEXT_STORAGE_TYPE.REDIS]: {
    maxSize: 10000,
    ttl: 86400,
    persistent: true,
  },
  [CONTEXT_STORAGE_TYPE.DATABASE]: {
    maxSize: 100000,
    ttl: 2592000,
    persistent: true,
  },
  [CONTEXT_STORAGE_TYPE.FILE]: {
    maxSize: 10000,
    ttl: 604800,
    persistent: true,
  },
  [CONTEXT_STORAGE_TYPE.CACHE]: {
    maxSize: 5000,
    ttl: 1800,
    persistent: false,
  },
} as const;

export type ContextStorageTypeSettings = typeof CONTEXT_STORAGE_TYPE_SETTINGS;
export type ContextMergeStrategyDescription = typeof CONTEXT_MERGE_STRATEGY_DESCRIPTIONS;
