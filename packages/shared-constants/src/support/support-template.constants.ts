/**
 * সাপোর্ট টেমপ্লেট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * টেমপ্লেট আইডি প্রিফিক্স
 */
export const TEMPLATE_ID_PREFIX = 'TPL';

/**
 * টেমপ্লেট নম্বর ফরম্যাট
 */
export const TEMPLATE_NUMBER_FORMAT = 'TPL-{category}-{sequence}';

/**
 * ডিফল্ট টেমপ্লেট ক্যাটাগরি
 */
export const DEFAULT_TEMPLATE_CATEGORY = 'general';

/**
 * টেমপ্লেট ভার্সনিং রুলস
 */
export const TEMPLATE_VERSIONING_RULES = {
  ENABLED: true,
  MAX_VERSIONS: 50,
  AUTO_SAVE: true,
  VERSION_FORMAT: 'v{major}.{minor}.{patch}',
} as const;

/**
 * টেমপ্লেট পাবলিশিং রুলস
 */
export const TEMPLATE_PUBLISHING_RULES = {
  REQUIRES_APPROVAL: true,
  AUTO_PUBLISH: false,
  PUBLISH_WINDOW: 7, // days
  UNPUBLISH_ON_UPDATE: false,
} as const;

/**
 * টেমপ্লেট ইউসেজ লিমিট
 */
export const TEMPLATE_USAGE_LIMIT = 10000;

/**
 * টেমপ্লেট আর্কাইভ পিরিয়ড (দিনে)
 */
export const TEMPLATE_ARCHIVE_PERIOD = 180;

/**
 * টেমপ্লেট পারমিশন মডেল
 */
export const TEMPLATE_PERMISSION_MODEL = {
  LEVELS: {
    VIEW: 'view',
    EDIT: 'edit',
    PUBLISH: 'publish',
    DELETE: 'delete',
    ADMIN: 'admin',
  },
  DEFAULT_LEVEL: 'view',
} as const;

/**
 * টেমপ্লেট টাইপ
 */
export const TEMPLATE_TYPE = {
  EMAIL: 'email',
  RESPONSE: 'response',
  TICKET: 'ticket',
  SURVEY: 'survey',
  NOTIFICATION: 'notification',
  AUTOMATION: 'automation',
  REPORT: 'report',
  FORM: 'form',
  ARTICLE: 'article',
  WORKFLOW: 'workflow',
} as const;

/**
 * টেমপ্লেট টাইপের ডিসপ্লে নাম
 */
export const TEMPLATE_TYPE_DISPLAY_NAMES = {
  [TEMPLATE_TYPE.EMAIL]: 'ইমেইল টেমপ্লেট',
  [TEMPLATE_TYPE.RESPONSE]: 'রেসপন্স টেমপ্লেট',
  [TEMPLATE_TYPE.TICKET]: 'টিকেট টেমপ্লেট',
  [TEMPLATE_TYPE.SURVEY]: 'জরিপ টেমপ্লেট',
  [TEMPLATE_TYPE.NOTIFICATION]: 'নোটিফিকেশন টেমপ্লেট',
  [TEMPLATE_TYPE.AUTOMATION]: 'অটোমেশন টেমপ্লেট',
  [TEMPLATE_TYPE.REPORT]: 'রিপোর্ট টেমপ্লেট',
  [TEMPLATE_TYPE.FORM]: 'ফর্ম টেমপ্লেট',
  [TEMPLATE_TYPE.ARTICLE]: 'আর্টিকেল টেমপ্লেট',
  [TEMPLATE_TYPE.WORKFLOW]: 'ওয়ার্কফ্লো টেমপ্লেট',
} as const;

/**
 * টেমপ্লেট স্ট্যাটাস
 */
export const TEMPLATE_STATUS = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  REVIEWED: 'reviewed',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

/**
 * টেমপ্লেট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const TEMPLATE_STATUS_DISPLAY_NAMES = {
  [TEMPLATE_STATUS.DRAFT]: 'খসড়া',
  [TEMPLATE_STATUS.PENDING_REVIEW]: 'পর্যালোচনার অপেক্ষায়',
  [TEMPLATE_STATUS.REVIEWED]: 'পর্যালোচিত',
  [TEMPLATE_STATUS.PUBLISHED]: 'প্রকাশিত',
  [TEMPLATE_STATUS.ARCHIVED]: 'আর্কাইভড',
  [TEMPLATE_STATUS.DEPRECATED]: 'অব্যবহৃত',
} as const;

/**
 * টেমপ্লেট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const TEMPLATE_STATUS_COLORS = {
  [TEMPLATE_STATUS.DRAFT]: '#95a5a6',
  [TEMPLATE_STATUS.PENDING_REVIEW]: '#f39c12',
  [TEMPLATE_STATUS.REVIEWED]: '#3498db',
  [TEMPLATE_STATUS.PUBLISHED]: '#2ecc71',
  [TEMPLATE_STATUS.ARCHIVED]: '#7f8c8d',
  [TEMPLATE_STATUS.DEPRECATED]: '#c0392b',
} as const;

/**
 * টেমপ্লেট ডিফল্ট সেটিংস
 */
export const TEMPLATE_DEFAULT_SETTINGS = {
  defaultCategory: DEFAULT_TEMPLATE_CATEGORY,
  versioning: TEMPLATE_VERSIONING_RULES,
  publishing: TEMPLATE_PUBLISHING_RULES,
  usageLimit: TEMPLATE_USAGE_LIMIT,
  archivePeriod: TEMPLATE_ARCHIVE_PERIOD,
  permissionModel: TEMPLATE_PERMISSION_MODEL,
} as const;

/**
 * টেমপ্লেট ভ্যালিডেশন রুলস
 */
export const TEMPLATE_VALIDATION_RULES = {
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
  content: {
    minLength: 1,
    maxLength: 100000,
    required: true,
  },
  variables: {
    maxVariables: 50,
    maxVariableLength: 50,
  },
} as const;

export type TemplateIdPrefix = typeof TEMPLATE_ID_PREFIX;
export type TemplateType = (typeof TEMPLATE_TYPE)[keyof typeof TEMPLATE_TYPE];
export type TemplateStatus = (typeof TEMPLATE_STATUS)[keyof typeof TEMPLATE_STATUS];
export type TemplatePermissionLevel =
  (typeof TEMPLATE_PERMISSION_MODEL.LEVELS)[keyof typeof TEMPLATE_PERMISSION_MODEL.LEVELS];

export interface TemplateVersioningRules {
  ENABLED: boolean;
  MAX_VERSIONS: number;
  AUTO_SAVE: boolean;
  VERSION_FORMAT: string;
}

export interface TemplatePublishingRules {
  REQUIRES_APPROVAL: boolean;
  AUTO_PUBLISH: boolean;
  PUBLISH_WINDOW: number;
  UNPUBLISH_ON_UPDATE: boolean;
}

export interface TemplatePermissionModel {
  LEVELS: {
    VIEW: string;
    EDIT: string;
    PUBLISH: string;
    DELETE: string;
    ADMIN: string;
  };
  DEFAULT_LEVEL: string;
}

export interface TemplateDefaultSettings {
  defaultCategory: string;
  versioning: TemplateVersioningRules;
  publishing: TemplatePublishingRules;
  usageLimit: number;
  archivePeriod: number;
  permissionModel: TemplatePermissionModel;
}

export interface TemplateValidationRules {
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
  content: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  variables: {
    maxVariables: number;
    maxVariableLength: number;
  };
}

export interface TemplateVariable {
  name: string;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'email' | 'phone' | 'url';
  defaultValue?: unknown;
  required: boolean;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
}

export interface TemplateVersion {
  id: string;
  templateId: string;
  version: string;
  content: string;
  variables: TemplateVariable[];
  changelog?: string;
  createdBy: string;
  createdAt: Date;
  isCurrent: boolean;
  metadata?: Record<string, unknown>;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  type: TemplateType;
  status: TemplateStatus;
  category: string;
  content: string;
  variables: TemplateVariable[];
  tags: string[];
  usageCount: number;
  version: string;
  isSystem: boolean;
  isPublic: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  archivedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface TemplatePermission {
  templateId: string;
  userId?: string;
  roleId?: string;
  level: TemplatePermissionLevel;
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
}

export interface TemplateAnalytics {
  templateId: string;
  totalUsage: number;
  lastUsedAt?: Date;
  usageByType: Record<string, number>;
  averageRating?: number;
  period: string;
}

/**
 * টেমপ্লেট কনফিগারেশন
 */
export const TEMPLATE_CONFIG = {
  idPrefix: TEMPLATE_ID_PREFIX,
  numberFormat: TEMPLATE_NUMBER_FORMAT,
  defaultSettings: TEMPLATE_DEFAULT_SETTINGS,
  validationRules: TEMPLATE_VALIDATION_RULES,
  types: TEMPLATE_TYPE,
  statuses: TEMPLATE_STATUS,
  permissionModel: TEMPLATE_PERMISSION_MODEL,
  statusColors: TEMPLATE_STATUS_COLORS,
} as const;

/**
 * টেমপ্লেট ইভেন্ট টাইপ
 */
export const TEMPLATE_EVENT_TYPES = {
  CREATED: 'template_created',
  UPDATED: 'template_updated',
  REVIEWED: 'template_reviewed',
  PUBLISHED: 'template_published',
  ARCHIVED: 'template_archived',
  DEPRECATED: 'template_deprecated',
  USED: 'template_used',
  VERSIONED: 'template_versioned',
} as const;

export type TemplateEventType = (typeof TEMPLATE_EVENT_TYPES)[keyof typeof TEMPLATE_EVENT_TYPES];

/**
 * টেমপ্লেট মেট্রিক্স
 */
export const TEMPLATE_METRICS = {
  TOTAL_TEMPLATES: 'total_templates',
  PUBLISHED_TEMPLATES: 'published_templates',
  DRAFT_TEMPLATES: 'draft_templates',
  TOTAL_USAGE: 'total_usage',
  AVG_USAGE: 'avg_usage',
  TEMPLATES_BY_TYPE: 'templates_by_type',
} as const;

export type TemplateMetric = (typeof TEMPLATE_METRICS)[keyof typeof TEMPLATE_METRICS];
