/**
 * কনভারসেশন সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * কনভারসেশন আইডি প্রিফিক্স
 */
export const CONVERSATION_ID_PREFIX = 'CONV';

/**
 * কনভারসেশন নম্বর ফরম্যাট
 */
export const CONVERSATION_NUMBER_FORMAT = 'CONV-{year}{month}{day}-{sequence}';

/**
 * প্রতি কনভারসেশনে সর্বোচ্চ মেসেজ সংখ্যা
 */
export const MAX_MESSAGES_PER_CONVERSATION = 500;

/**
 * কনভারসেশন টাইমআউট (মিনিটে)
 */
export const CONVERSATION_TIMEOUT = 30;

/**
 * কনভারসেশন আর্কাইভ পিরিয়ড (দিনে)
 */
export const CONVERSATION_ARCHIVE_PERIOD = 90;

/**
 * ডিফল্ট কনভারসেশন টাইটেল
 */
export const DEFAULT_CONVERSATION_TITLE = 'নতুন কথোপকথন';

/**
 * কনভারসেশন মেটাডেটা ফরম্যাট
 */
export const CONVERSATION_METADATA_FORMAT = {
  version: '1.0.0',
  fields: ['createdAt', 'updatedAt', 'status', 'type', 'priority', 'assignedTo'],
} as const;

/**
 * কনভারসেশন টাইপ
 */
export const CONVERSATION_TYPE = {
  TICKET: 'ticket',
  CHAT: 'chat',
  EMAIL: 'email',
  PHONE: 'phone',
  SOCIAL: 'social',
  INTERNAL: 'internal',
} as const;

/**
 * কনভারসেশন স্ট্যাটাস
 */
export const CONVERSATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  LOCKED: 'locked',
} as const;

/**
 * মেসেজ টাইপ
 */
export const MESSAGE_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system',
  NOTIFICATION: 'notification',
  TEMPLATE: 'template',
} as const;

/**
 * মেসেজ ডিরেকশন
 */
export const MESSAGE_DIRECTION = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
  INTERNAL: 'internal',
} as const;

/**
 * মেসেজ স্ট্যাটাস
 */
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  PENDING: 'pending',
} as const;

/**
 * কনভারসেশন প্রায়োরিটি
 */
export const CONVERSATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * কনভারসেশন ক্যাটাগরি
 */
export const CONVERSATION_CATEGORY = {
  GENERAL: 'general',
  SUPPORT: 'support',
  SALES: 'sales',
  BILLING: 'billing',
  TECHNICAL: 'technical',
  COMPLAINT: 'complaint',
} as const;

/**
 * কনভারসেশন রেটিং স্কেল
 */
export const CONVERSATION_RATING = {
  POOR: 1,
  FAIR: 2,
  GOOD: 3,
  VERY_GOOD: 4,
  EXCELLENT: 5,
} as const;

/**
 * কনভারসেশন টাইমলাইন ইভেন্ট
 */
export const CONVERSATION_TIMELINE_EVENTS = {
  CREATED: 'conversation_created',
  UPDATED: 'conversation_updated',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  STATUS_CHANGED: 'status_changed',
  ASSIGNED: 'assigned',
  REASSIGNED: 'reassigned',
  ARCHIVED: 'archived',
  RESTORED: 'restored',
  DELETED: 'deleted',
  LOCKED: 'locked',
  UNLOCKED: 'unlocked',
  PRIORITY_CHANGED: 'priority_changed',
  CATEGORY_CHANGED: 'category_changed',
} as const;

/**
 * কনভারসেশন ফিল্টার অপশন
 */
export const CONVERSATION_FILTER_OPTIONS = {
  STATUS: 'status',
  TYPE: 'type',
  PRIORITY: 'priority',
  CATEGORY: 'category',
  ASSIGNEE: 'assignee',
  DATE_RANGE: 'date_range',
  SEARCH: 'search',
  UNREAD: 'unread',
} as const;

/**
 * কনভারসেশন সর্ট অপশন
 */
export const CONVERSATION_SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  PRIORITY: 'priority',
  STATUS: 'status',
  SUBJECT: 'subject',
  LAST_MESSAGE: 'lastMessage',
} as const;

/**
 * কনভারসেশন ভ্যালিডেশন রুলস
 */
export const CONVERSATION_VALIDATION_RULES = {
  title: {
    minLength: 3,
    maxLength: 100,
    required: true,
  },
  message: {
    minLength: 1,
    maxLength: 10000,
    required: true,
  },
  attachments: {
    maxFiles: 10,
    maxSizeMB: 25,
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
} as const;

/**
 * কনভারসেশন ডিফল্ট ভ্যালু
 */
export const CONVERSATION_DEFAULT_VALUES = {
  status: CONVERSATION_STATUS.ACTIVE,
  type: CONVERSATION_TYPE.TICKET,
  priority: CONVERSATION_PRIORITY.MEDIUM,
  category: CONVERSATION_CATEGORY.GENERAL,
  title: DEFAULT_CONVERSATION_TITLE,
} as const;

/**
 * কনভারসেশন মেট্রিক্স
 */
export const CONVERSATION_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  UNREAD: 'unread',
  AVERAGE_RESPONSE_TIME: 'average_response_time',
  AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
} as const;

export type ConversationType = (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];
export type ConversationStatus = (typeof CONVERSATION_STATUS)[keyof typeof CONVERSATION_STATUS];
export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];
export type MessageDirection = (typeof MESSAGE_DIRECTION)[keyof typeof MESSAGE_DIRECTION];
export type MessageStatus = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];
export type ConversationPriority =
  (typeof CONVERSATION_PRIORITY)[keyof typeof CONVERSATION_PRIORITY];
export type ConversationCategory =
  (typeof CONVERSATION_CATEGORY)[keyof typeof CONVERSATION_CATEGORY];
export type ConversationRating = (typeof CONVERSATION_RATING)[keyof typeof CONVERSATION_RATING];
export type ConversationTimelineEvent =
  (typeof CONVERSATION_TIMELINE_EVENTS)[keyof typeof CONVERSATION_TIMELINE_EVENTS];
export type ConversationFilterOption =
  (typeof CONVERSATION_FILTER_OPTIONS)[keyof typeof CONVERSATION_FILTER_OPTIONS];
export type ConversationSortOption =
  (typeof CONVERSATION_SORT_OPTIONS)[keyof typeof CONVERSATION_SORT_OPTIONS];
export type ConversationMetric = (typeof CONVERSATION_METRICS)[keyof typeof CONVERSATION_METRICS];

export interface ConversationMetadataFormat {
  version: string;
  fields: string[];
}

export interface ConversationValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  message: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  attachments: {
    maxFiles: number;
    maxSizeMB: number;
    allowedTypes: string[];
  };
}

export interface ConversationDefaultValues {
  status: ConversationStatus;
  type: ConversationType;
  priority: ConversationPriority;
  category: ConversationCategory;
  title: string;
}

export interface ConversationMetadata {
  id: string;
  title: string;
  type: ConversationType;
  status: ConversationStatus;
  priority: ConversationPriority;
  category: ConversationCategory;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  tags?: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  type: MessageType;
  direction: MessageDirection;
  status: MessageStatus;
  content: string;
  sender: string;
  senderType: 'user' | 'agent' | 'system';
  attachments?: string[];
  readAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationTimeline {
  id: string;
  conversationId: string;
  event: ConversationTimelineEvent;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  createdBy: string;
}

export interface ConversationFilter {
  status?: ConversationStatus;
  type?: ConversationType;
  priority?: ConversationPriority;
  category?: ConversationCategory;
  assignee?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
  unread?: boolean;
}

export interface ConversationSort {
  field: ConversationSortOption;
  order: 'asc' | 'desc';
}

/**
 * কনভারসেশন কনফিগারেশন
 */
export const CONVERSATION_CONFIG = {
  idPrefix: CONVERSATION_ID_PREFIX,
  numberFormat: CONVERSATION_NUMBER_FORMAT,
  maxMessages: MAX_MESSAGES_PER_CONVERSATION,
  timeout: CONVERSATION_TIMEOUT,
  archivePeriod: CONVERSATION_ARCHIVE_PERIOD,
  defaultTitle: DEFAULT_CONVERSATION_TITLE,
  metadata: CONVERSATION_METADATA_FORMAT,
  validation: CONVERSATION_VALIDATION_RULES,
  defaults: CONVERSATION_DEFAULT_VALUES,
} as const;

/**
 * কনভারসেশন স্ট্যাটাস ট্রানজিশন রুলস
 */
export const CONVERSATION_STATUS_TRANSITIONS = {
  [CONVERSATION_STATUS.ACTIVE]: [
    CONVERSATION_STATUS.INACTIVE,
    CONVERSATION_STATUS.ARCHIVED,
    CONVERSATION_STATUS.LOCKED,
  ],
  [CONVERSATION_STATUS.INACTIVE]: [
    CONVERSATION_STATUS.ACTIVE,
    CONVERSATION_STATUS.ARCHIVED,
    CONVERSATION_STATUS.DELETED,
  ],
  [CONVERSATION_STATUS.ARCHIVED]: [CONVERSATION_STATUS.ACTIVE, CONVERSATION_STATUS.DELETED],
  [CONVERSATION_STATUS.DELETED]: [],
  [CONVERSATION_STATUS.LOCKED]: [CONVERSATION_STATUS.ACTIVE],
} as const;

/**
 * কনভারসেশন টাইপের ডিফল্ট সেটিংস
 */
export const CONVERSATION_TYPE_DEFAULTS = {
  [CONVERSATION_TYPE.TICKET]: {
    priority: CONVERSATION_PRIORITY.MEDIUM,
    category: CONVERSATION_CATEGORY.SUPPORT,
    timeout: CONVERSATION_TIMEOUT,
  },
  [CONVERSATION_TYPE.CHAT]: {
    priority: CONVERSATION_PRIORITY.LOW,
    category: CONVERSATION_CATEGORY.GENERAL,
    timeout: 15,
  },
  [CONVERSATION_TYPE.EMAIL]: {
    priority: CONVERSATION_PRIORITY.MEDIUM,
    category: CONVERSATION_CATEGORY.GENERAL,
    timeout: 60,
  },
  [CONVERSATION_TYPE.PHONE]: {
    priority: CONVERSATION_PRIORITY.HIGH,
    category: CONVERSATION_CATEGORY.SUPPORT,
    timeout: 10,
  },
  [CONVERSATION_TYPE.SOCIAL]: {
    priority: CONVERSATION_PRIORITY.LOW,
    category: CONVERSATION_CATEGORY.GENERAL,
    timeout: 45,
  },
  [CONVERSATION_TYPE.INTERNAL]: {
    priority: CONVERSATION_PRIORITY.MEDIUM,
    category: CONVERSATION_CATEGORY.GENERAL,
    timeout: 120,
  },
} as const;

/**
 * মেসেজ টাইপের ডিফল্ট সেটিংস
 */
export const MESSAGE_TYPE_DEFAULTS = {
  [MESSAGE_TYPE.TEXT]: {
    maxLength: CONVERSATION_VALIDATION_RULES.message.maxLength,
    allowAttachments: true,
  },
  [MESSAGE_TYPE.IMAGE]: {
    maxLength: 0,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.FILE]: {
    maxLength: 0,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.SYSTEM]: {
    maxLength: 1000,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.NOTIFICATION]: {
    maxLength: 500,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.TEMPLATE]: {
    maxLength: 5000,
    allowAttachments: true,
  },
} as const;

/**
 * কনভারসেশন এনালিটিক্স ইভেন্ট
 */
export const CONVERSATION_ANALYTICS_EVENTS = {
  VIEW: 'conversation_view',
  SEARCH: 'conversation_search',
  FILTER: 'conversation_filter',
  EXPORT: 'conversation_export',
  PRINT: 'conversation_print',
} as const;

export type ConversationAnalyticsEvent =
  (typeof CONVERSATION_ANALYTICS_EVENTS)[keyof typeof CONVERSATION_ANALYTICS_EVENTS];

/**
 * কনভারসেশন রিপোর্ট টাইপ
 */
export const CONVERSATION_REPORT_TYPES = {
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  METRICS: 'metrics',
  SATISFACTION: 'satisfaction',
  PERFORMANCE: 'performance',
} as const;

export type ConversationReportType =
  (typeof CONVERSATION_REPORT_TYPES)[keyof typeof CONVERSATION_REPORT_TYPES];
