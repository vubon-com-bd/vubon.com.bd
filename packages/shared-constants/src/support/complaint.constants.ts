/**
 * কমপ্লেইন্ট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * কমপ্লেইন্ট আইডি প্রিফিক্স
 */
export const COMPLAINT_ID_PREFIX = 'CMP';

/**
 * কমপ্লেইন্ট নম্বর ফরম্যাট
 */
export const COMPLAINT_NUMBER_FORMAT = 'CMP-{year}{month}{day}-{sequence}';

/**
 * কমপ্লেইন্ট রেজোলিউশন টাইমলাইন (ঘন্টায়)
 */
export const COMPLAINT_RESOLUTION_TIMELINE = {
  URGENT: 24,
  HIGH: 48,
  MEDIUM: 72,
  LOW: 120,
} as const;

/**
 * ডিফল্ট কমপ্লেইন্ট ক্যাটাগরি
 */
export const DEFAULT_COMPLAINT_CATEGORY = 'general';

/**
 * কমপ্লেইন্ট এসকেলেশন রুলস
 */
export const COMPLAINT_ESCALATION_RULES = {
  LEVEL_1: {
    name: 'প্রথম স্তর',
    responseTime: 24,
    role: 'support_agent',
  },
  LEVEL_2: {
    name: 'দ্বিতীয় স্তর',
    responseTime: 12,
    role: 'support_lead',
  },
  LEVEL_3: {
    name: 'তৃতীয় স্তর',
    responseTime: 6,
    role: 'support_manager',
  },
  LEVEL_4: {
    name: 'চতুর্থ স্তর',
    responseTime: 3,
    role: 'support_director',
  },
  LEVEL_5: {
    name: 'পঞ্চম স্তর',
    responseTime: 1,
    role: 'cto',
  },
} as const;

/**
 * কমপ্লেইন্ট ডকুমেন্টেশন রিকোয়ারমেন্ট
 */
export const COMPLAINT_DOCUMENTATION_REQUIREMENTS = {
  REQUIRED_FIELDS: ['title', 'description', 'category', 'priority'],
  OPTIONAL_FIELDS: ['attachments', 'tags', 'reference_number'],
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 25,
  ALLOWED_ATTACHMENT_TYPES: [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
} as const;

/**
 * কমপ্লেইন্ট আর্কাইভ পিরিয়ড (দিনে)
 */
export const COMPLAINT_ARCHIVE_PERIOD = 365;

/**
 * কমপ্লেইন্ট ক্যাটাগরি
 */
export const COMPLAINT_CATEGORY = {
  GENERAL: 'general',
  PRODUCT: 'product',
  SERVICE: 'service',
  BILLING: 'billing',
  DELIVERY: 'delivery',
  TECHNICAL: 'technical',
  SUPPORT: 'support',
  QUALITY: 'quality',
  WARRANTY: 'warranty',
  SAFETY: 'safety',
  PRIVACY: 'privacy',
  SECURITY: 'security',
  EMPLOYEE: 'employee',
  FACILITY: 'facility',
  OTHER: 'other',
} as const;

/**
 * কমপ্লেইন্ট ক্যাটাগরির ডিসপ্লে নাম
 */
export const COMPLAINT_CATEGORY_DISPLAY_NAMES = {
  [COMPLAINT_CATEGORY.GENERAL]: 'সাধারণ',
  [COMPLAINT_CATEGORY.PRODUCT]: 'পণ্য',
  [COMPLAINT_CATEGORY.SERVICE]: 'সার্ভিস',
  [COMPLAINT_CATEGORY.BILLING]: 'বিলিং',
  [COMPLAINT_CATEGORY.DELIVERY]: 'ডেলিভারি',
  [COMPLAINT_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত',
  [COMPLAINT_CATEGORY.SUPPORT]: 'সাপোর্ট',
  [COMPLAINT_CATEGORY.QUALITY]: 'মান',
  [COMPLAINT_CATEGORY.WARRANTY]: 'ওয়ারেন্টি',
  [COMPLAINT_CATEGORY.SAFETY]: 'সুরক্ষা',
  [COMPLAINT_CATEGORY.PRIVACY]: 'প্রাইভেসি',
  [COMPLAINT_CATEGORY.SECURITY]: 'সিকিউরিটি',
  [COMPLAINT_CATEGORY.EMPLOYEE]: 'কর্মচারী',
  [COMPLAINT_CATEGORY.FACILITY]: 'সুবিধা',
  [COMPLAINT_CATEGORY.OTHER]: 'অন্যান্য',
} as const;

/**
 * কমপ্লেইন্ট ক্যাটাগরির আইকন
 */
export const COMPLAINT_CATEGORY_ICONS = {
  [COMPLAINT_CATEGORY.GENERAL]: 'help-circle',
  [COMPLAINT_CATEGORY.PRODUCT]: 'package',
  [COMPLAINT_CATEGORY.SERVICE]: 'briefcase',
  [COMPLAINT_CATEGORY.BILLING]: 'credit-card',
  [COMPLAINT_CATEGORY.DELIVERY]: 'truck',
  [COMPLAINT_CATEGORY.TECHNICAL]: 'cpu',
  [COMPLAINT_CATEGORY.SUPPORT]: 'headphones',
  [COMPLAINT_CATEGORY.QUALITY]: 'check-circle',
  [COMPLAINT_CATEGORY.WARRANTY]: 'shield',
  [COMPLAINT_CATEGORY.SAFETY]: 'alert-triangle',
  [COMPLAINT_CATEGORY.PRIVACY]: 'eye-off',
  [COMPLAINT_CATEGORY.SECURITY]: 'lock',
  [COMPLAINT_CATEGORY.EMPLOYEE]: 'user',
  [COMPLAINT_CATEGORY.FACILITY]: 'home',
  [COMPLAINT_CATEGORY.OTHER]: 'more-horizontal',
} as const;

/**
 * কমপ্লেইন্ট ক্যাটাগরির রঙ
 */
export const COMPLAINT_CATEGORY_COLORS = {
  [COMPLAINT_CATEGORY.GENERAL]: '#95a5a6',
  [COMPLAINT_CATEGORY.PRODUCT]: '#e67e22',
  [COMPLAINT_CATEGORY.SERVICE]: '#1abc9c',
  [COMPLAINT_CATEGORY.BILLING]: '#2ecc71',
  [COMPLAINT_CATEGORY.DELIVERY]: '#f39c12',
  [COMPLAINT_CATEGORY.TECHNICAL]: '#3498db',
  [COMPLAINT_CATEGORY.SUPPORT]: '#9b59b6',
  [COMPLAINT_CATEGORY.QUALITY]: '#27ae60',
  [COMPLAINT_CATEGORY.WARRANTY]: '#2c3e50',
  [COMPLAINT_CATEGORY.SAFETY]: '#e74c3c',
  [COMPLAINT_CATEGORY.PRIVACY]: '#7f8c8d',
  [COMPLAINT_CATEGORY.SECURITY]: '#c0392b',
  [COMPLAINT_CATEGORY.EMPLOYEE]: '#8e44ad',
  [COMPLAINT_CATEGORY.FACILITY]: '#34495e',
  [COMPLAINT_CATEGORY.OTHER]: '#95a5a6',
} as const;

/**
 * কমপ্লেইন্ট প্রায়োরিটি
 */
export const COMPLAINT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

/**
 * কমপ্লেইন্ট প্রায়োরিটির ডিসপ্লে নাম
 */
export const COMPLAINT_PRIORITY_DISPLAY_NAMES = {
  [COMPLAINT_PRIORITY.LOW]: 'নিম্ন',
  [COMPLAINT_PRIORITY.MEDIUM]: 'মাঝারি',
  [COMPLAINT_PRIORITY.HIGH]: 'উচ্চ',
  [COMPLAINT_PRIORITY.URGENT]: 'জরুরি',
  [COMPLAINT_PRIORITY.CRITICAL]: 'জটিল',
} as const;

/**
 * কমপ্লেইন্ট প্রায়োরিটির রঙ
 */
export const COMPLAINT_PRIORITY_COLORS = {
  [COMPLAINT_PRIORITY.LOW]: '#3498db',
  [COMPLAINT_PRIORITY.MEDIUM]: '#f39c12',
  [COMPLAINT_PRIORITY.HIGH]: '#e67e22',
  [COMPLAINT_PRIORITY.URGENT]: '#e74c3c',
  [COMPLAINT_PRIORITY.CRITICAL]: '#c0392b',
} as const;

/**
 * কমপ্লেইন্ট স্ট্যাটাস
 */
export const COMPLAINT_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  ACKNOWLEDGED: 'acknowledged',
  IN_PROGRESS: 'in_progress',
  ESCALATED: 'escalated',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REJECTED: 'rejected',
  REOPENED: 'reopened',
} as const;

/**
 * কমপ্লেইন্ট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const COMPLAINT_STATUS_DISPLAY_NAMES = {
  [COMPLAINT_STATUS.SUBMITTED]: 'জমা দেওয়া',
  [COMPLAINT_STATUS.UNDER_REVIEW]: 'পর্যালোচনাধীন',
  [COMPLAINT_STATUS.ACKNOWLEDGED]: 'স্বীকৃত',
  [COMPLAINT_STATUS.IN_PROGRESS]: 'প্রক্রিয়াধীন',
  [COMPLAINT_STATUS.ESCALATED]: 'এস্কেলেটেড',
  [COMPLAINT_STATUS.RESOLVED]: 'সমাধানকৃত',
  [COMPLAINT_STATUS.CLOSED]: 'বন্ধ',
  [COMPLAINT_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
  [COMPLAINT_STATUS.REOPENED]: 'পুনরায় খোলা',
} as const;

/**
 * কমপ্লেইন্ট স্ট্যাটাসের রঙ
 */
export const COMPLAINT_STATUS_COLORS = {
  [COMPLAINT_STATUS.SUBMITTED]: '#95a5a6',
  [COMPLAINT_STATUS.UNDER_REVIEW]: '#3498db',
  [COMPLAINT_STATUS.ACKNOWLEDGED]: '#9b59b6',
  [COMPLAINT_STATUS.IN_PROGRESS]: '#f39c12',
  [COMPLAINT_STATUS.ESCALATED]: '#e67e22',
  [COMPLAINT_STATUS.RESOLVED]: '#2ecc71',
  [COMPLAINT_STATUS.CLOSED]: '#7f8c8d',
  [COMPLAINT_STATUS.REJECTED]: '#e74c3c',
  [COMPLAINT_STATUS.REOPENED]: '#e74c3c',
} as const;

/**
 * কমপ্লেইন্ট স্ট্যাটাস ট্রানজিশন
 */
export const COMPLAINT_STATUS_TRANSITIONS = {
  [COMPLAINT_STATUS.SUBMITTED]: ['under_review', 'rejected'],
  [COMPLAINT_STATUS.UNDER_REVIEW]: ['acknowledged', 'rejected'],
  [COMPLAINT_STATUS.ACKNOWLEDGED]: ['in_progress', 'escalated'],
  [COMPLAINT_STATUS.IN_PROGRESS]: ['resolved', 'escalated'],
  [COMPLAINT_STATUS.ESCALATED]: ['in_progress', 'resolved'],
  [COMPLAINT_STATUS.RESOLVED]: ['closed', 'reopened'],
  [COMPLAINT_STATUS.CLOSED]: ['reopened'],
  [COMPLAINT_STATUS.REJECTED]: ['reopened'],
  [COMPLAINT_STATUS.REOPENED]: ['in_progress', 'resolved', 'closed'],
} as const;

/**
 * কমপ্লেইন্ট ডিফল্ট সেটিংস
 */
export const COMPLAINT_DEFAULT_SETTINGS = {
  defaultCategory: DEFAULT_COMPLAINT_CATEGORY,
  resolutionTimeline: COMPLAINT_RESOLUTION_TIMELINE,
  escalationRules: COMPLAINT_ESCALATION_RULES,
  documentationRequirements: COMPLAINT_DOCUMENTATION_REQUIREMENTS,
  archivePeriod: COMPLAINT_ARCHIVE_PERIOD,
} as const;

/**
 * কমপ্লেইন্ট ভ্যালিডেশন রুলস
 */
export const COMPLAINT_VALIDATION_RULES = {
  title: {
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  description: {
    minLength: 10,
    maxLength: 10000,
    required: true,
  },
  category: {
    required: true,
  },
  priority: {
    required: true,
  },
  attachments: {
    maxFiles: COMPLAINT_DOCUMENTATION_REQUIREMENTS.MAX_ATTACHMENTS,
    maxSizeMB: COMPLAINT_DOCUMENTATION_REQUIREMENTS.MAX_ATTACHMENT_SIZE_MB,
    allowedTypes: COMPLAINT_DOCUMENTATION_REQUIREMENTS.ALLOWED_ATTACHMENT_TYPES,
  },
} as const;

/**
 * কমপ্লেইন্ট ইভেন্ট টাইপ
 */
export const COMPLAINT_EVENT_TYPES = {
  CREATED: 'complaint_created',
  UPDATED: 'complaint_updated',
  REVIEWED: 'complaint_reviewed',
  ACKNOWLEDGED: 'complaint_acknowledged',
  ESCALATED: 'complaint_escalated',
  RESOLVED: 'complaint_resolved',
  CLOSED: 'complaint_closed',
  REJECTED: 'complaint_rejected',
  REOPENED: 'complaint_reopened',
  COMMENTED: 'complaint_commented',
  ATTACHED: 'complaint_attached',
} as const;

/**
 * কমপ্লেইন্ট মেট্রিক্স
 */
export const COMPLAINT_METRICS = {
  TOTAL: 'total',
  OPEN: 'open',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  ESCALATED: 'escalated',
  AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
  RESPONSE_TIME: 'response_time',
  SATISFACTION_RATE: 'satisfaction_rate',
} as const;

export type ComplaintIdPrefix = typeof COMPLAINT_ID_PREFIX;
export type ComplaintCategory = (typeof COMPLAINT_CATEGORY)[keyof typeof COMPLAINT_CATEGORY];
export type ComplaintPriority = (typeof COMPLAINT_PRIORITY)[keyof typeof COMPLAINT_PRIORITY];
export type ComplaintStatus = (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];
export type ComplaintEventType = (typeof COMPLAINT_EVENT_TYPES)[keyof typeof COMPLAINT_EVENT_TYPES];
export type ComplaintMetric = (typeof COMPLAINT_METRICS)[keyof typeof COMPLAINT_METRICS];

export interface ComplaintResolutionTimeline {
  URGENT: number;
  HIGH: number;
  MEDIUM: number;
  LOW: number;
}

export interface EscalationLevel {
  name: string;
  responseTime: number;
  role: string;
}

export interface EscalationRule {
  LEVEL_1: EscalationLevel;
  LEVEL_2: EscalationLevel;
  LEVEL_3: EscalationLevel;
  LEVEL_4: EscalationLevel;
  LEVEL_5: EscalationLevel;
}

export interface ComplaintDocumentationRequirements {
  REQUIRED_FIELDS: string[];
  OPTIONAL_FIELDS: string[];
  MAX_ATTACHMENTS: number;
  MAX_ATTACHMENT_SIZE_MB: number;
  ALLOWED_ATTACHMENT_TYPES: string[];
}

export interface ComplaintDefaultSettings {
  defaultCategory: string;
  resolutionTimeline: ComplaintResolutionTimeline;
  escalationRules: EscalationRule;
  documentationRequirements: ComplaintDocumentationRequirements;
  archivePeriod: number;
}

export interface ComplaintValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  category: {
    required: boolean;
  };
  priority: {
    required: boolean;
  };
  attachments: {
    maxFiles: number;
    maxSizeMB: number;
    allowedTypes: string[];
  };
}

export interface ComplaintMetadata {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  userId?: string;
  email: string;
  phone?: string;
  orderNumber?: string;
  attachments?: string[];
  assignedTo?: string;
  escalatedLevel?: number;
  resolution?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface ComplaintComment {
  id: string;
  complaintId: string;
  content: string;
  author: string;
  authorType: 'user' | 'agent' | 'system';
  createdAt: Date;
  updatedAt: Date;
}

export interface ComplaintEscalationHistory {
  id: string;
  complaintId: string;
  fromLevel: number;
  toLevel: number;
  reason: string;
  escalatedBy: string;
  createdAt: Date;
}

export interface ComplaintAnalytics {
  total: number;
  byCategory: Record<ComplaintCategory, number>;
  byStatus: Record<ComplaintStatus, number>;
  byPriority: Record<ComplaintPriority, number>;
  averageResolutionTime: number;
  responseTimeAvg: number;
  satisfactionRate: number;
  period: string;
}

/**
 * কমপ্লেইন্ট ক্যাটাগরি কনফিগারেশন
 */
export const COMPLAINT_CATEGORY_CONFIGS: Record<
  ComplaintCategory,
  {
    category: ComplaintCategory;
    displayName: string;
    icon: string;
    color: string;
  }
> = {
  [COMPLAINT_CATEGORY.GENERAL]: {
    category: COMPLAINT_CATEGORY.GENERAL,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.GENERAL],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.GENERAL],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.GENERAL],
  },
  [COMPLAINT_CATEGORY.PRODUCT]: {
    category: COMPLAINT_CATEGORY.PRODUCT,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.PRODUCT],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.PRODUCT],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.PRODUCT],
  },
  [COMPLAINT_CATEGORY.SERVICE]: {
    category: COMPLAINT_CATEGORY.SERVICE,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.SERVICE],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.SERVICE],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.SERVICE],
  },
  [COMPLAINT_CATEGORY.BILLING]: {
    category: COMPLAINT_CATEGORY.BILLING,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.BILLING],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.BILLING],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.BILLING],
  },
  [COMPLAINT_CATEGORY.DELIVERY]: {
    category: COMPLAINT_CATEGORY.DELIVERY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.DELIVERY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.DELIVERY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.DELIVERY],
  },
  [COMPLAINT_CATEGORY.TECHNICAL]: {
    category: COMPLAINT_CATEGORY.TECHNICAL,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.TECHNICAL],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.TECHNICAL],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.TECHNICAL],
  },
  [COMPLAINT_CATEGORY.SUPPORT]: {
    category: COMPLAINT_CATEGORY.SUPPORT,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.SUPPORT],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.SUPPORT],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.SUPPORT],
  },
  [COMPLAINT_CATEGORY.QUALITY]: {
    category: COMPLAINT_CATEGORY.QUALITY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.QUALITY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.QUALITY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.QUALITY],
  },
  [COMPLAINT_CATEGORY.WARRANTY]: {
    category: COMPLAINT_CATEGORY.WARRANTY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.WARRANTY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.WARRANTY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.WARRANTY],
  },
  [COMPLAINT_CATEGORY.SAFETY]: {
    category: COMPLAINT_CATEGORY.SAFETY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.SAFETY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.SAFETY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.SAFETY],
  },
  [COMPLAINT_CATEGORY.PRIVACY]: {
    category: COMPLAINT_CATEGORY.PRIVACY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.PRIVACY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.PRIVACY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.PRIVACY],
  },
  [COMPLAINT_CATEGORY.SECURITY]: {
    category: COMPLAINT_CATEGORY.SECURITY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.SECURITY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.SECURITY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.SECURITY],
  },
  [COMPLAINT_CATEGORY.EMPLOYEE]: {
    category: COMPLAINT_CATEGORY.EMPLOYEE,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.EMPLOYEE],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.EMPLOYEE],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.EMPLOYEE],
  },
  [COMPLAINT_CATEGORY.FACILITY]: {
    category: COMPLAINT_CATEGORY.FACILITY,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.FACILITY],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.FACILITY],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.FACILITY],
  },
  [COMPLAINT_CATEGORY.OTHER]: {
    category: COMPLAINT_CATEGORY.OTHER,
    displayName: COMPLAINT_CATEGORY_DISPLAY_NAMES[COMPLAINT_CATEGORY.OTHER],
    icon: COMPLAINT_CATEGORY_ICONS[COMPLAINT_CATEGORY.OTHER],
    color: COMPLAINT_CATEGORY_COLORS[COMPLAINT_CATEGORY.OTHER],
  },
};

/**
 * কমপ্লেইন্ট কনফিগারেশন
 */
export const COMPLAINT_CONFIG = {
  idPrefix: COMPLAINT_ID_PREFIX,
  numberFormat: COMPLAINT_NUMBER_FORMAT,
  defaultSettings: COMPLAINT_DEFAULT_SETTINGS,
  validationRules: COMPLAINT_VALIDATION_RULES,
  categories: COMPLAINT_CATEGORY_CONFIGS,
  priorities: COMPLAINT_PRIORITY,
  statuses: COMPLAINT_STATUS,
  statusColors: COMPLAINT_STATUS_COLORS,
} as const;
