/**
 * মেসেজ সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * মেসেজ আইডি প্রিফিক্স
 */
export const MESSAGE_ID_PREFIX = 'MSG';

/**
 * মেসেজ নম্বর ফরম্যাট
 */
export const MESSAGE_NUMBER_FORMAT = 'MSG-{timestamp}-{sequence}';

/**
 * মেসেজের ম্যাক্সিমাম লেন্থ (অক্ষরে)
 */
export const MAX_MESSAGE_LENGTH = 10000;

/**
 * মেসেজের মিনিমাম লেন্থ (অক্ষরে)
 */
export const MIN_MESSAGE_LENGTH = 1;

/**
 * সাপোর্টেড মেসেজ ফরম্যাট
 */
export const SUPPORTED_MESSAGE_FORMATS = {
  TEXT: 'text',
  HTML: 'html',
  MARKDOWN: 'markdown',
  JSON: 'json',
  XML: 'xml',
  PLAIN: 'plain',
} as const;

/**
 * মেসেজ এনক্রিপশন টাইপ
 */
export const MESSAGE_ENCRYPTION_TYPES = {
  NONE: 'none',
  AES_256: 'aes_256',
  RSA: 'rsa',
  TLS: 'tls',
  END_TO_END: 'end_to_end',
} as const;

/**
 * ডিফল্ট মেসেজ টাইমআউট (মিনিটে)
 */
export const DEFAULT_MESSAGE_TIMEOUT = 30;

/**
 * মেসেজ এডিট টাইম উইন্ডো (মিনিটে)
 */
export const MESSAGE_EDIT_TIME_WINDOW = 5;

/**
 * মেসেজ ডিলিট পলিসি
 */
export const MESSAGE_DELETE_POLICY = {
  SOFT_DELETE: 'soft_delete',
  HARD_DELETE: 'hard_delete',
  ARCHIVE: 'archive',
  PERMANENT_DELETE: 'permanent_delete',
} as const;

/**
 * মেসেজ টাইপ
 */
export const MESSAGE_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  SYSTEM: 'system',
  NOTIFICATION: 'notification',
  TEMPLATE: 'template',
  RICH_TEXT: 'rich_text',
  CODE: 'code',
  QUOTE: 'quote',
} as const;

/**
 * মেসেজ ডিরেকশন
 */
export const MESSAGE_DIRECTION = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
  INTERNAL: 'internal',
  SYSTEM: 'system',
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
  REJECTED: 'rejected',
  RECEIVED: 'received',
} as const;

/**
 * মেসেজ প্রায়োরিটি
 */
export const MESSAGE_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * মেসেজ ক্যাটাগরি
 */
export const MESSAGE_CATEGORY = {
  GENERAL: 'general',
  SUPPORT: 'support',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  NOTIFICATION: 'notification',
  SYSTEM: 'system',
} as const;

/**
 * মেসেজ ফরম্যাটিং অপশন
 */
export const MESSAGE_FORMATTING_OPTIONS = {
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  CODE: 'code',
  QUOTE: 'quote',
  LINK: 'link',
  IMAGE: 'image',
  LIST: 'list',
  TABLE: 'table',
  HEADING: 'heading',
} as const;

/**
 * মেসেজ সংযুক্তি ফাইলের সীমা
 */
export const MESSAGE_ATTACHMENT_LIMITS = {
  MAX_FILES: 10,
  MAX_SIZE_MB: 25,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/csv',
    'application/zip',
    'application/x-zip-compressed',
    'application/json',
    'application/xml',
  ],
} as const;

/**
 * মেসেজ ভ্যালিডেশন রুলস
 */
export const MESSAGE_VALIDATION_RULES = {
  content: {
    minLength: MIN_MESSAGE_LENGTH,
    maxLength: MAX_MESSAGE_LENGTH,
    required: true,
  },
  subject: {
    minLength: 0,
    maxLength: 200,
    required: false,
  },
  attachments: {
    maxFiles: MESSAGE_ATTACHMENT_LIMITS.MAX_FILES,
    maxSizeMB: MESSAGE_ATTACHMENT_LIMITS.MAX_SIZE_MB,
    allowedTypes: MESSAGE_ATTACHMENT_LIMITS.ALLOWED_TYPES,
  },
} as const;

/**
 * মেসেজ ডিফল্ট ভ্যালু
 */
export const MESSAGE_DEFAULT_VALUES = {
  type: MESSAGE_TYPE.TEXT,
  status: MESSAGE_STATUS.PENDING,
  priority: MESSAGE_PRIORITY.NORMAL,
  category: MESSAGE_CATEGORY.GENERAL,
  encryption: MESSAGE_ENCRYPTION_TYPES.NONE,
  format: SUPPORTED_MESSAGE_FORMATS.TEXT,
  timeoutMinutes: DEFAULT_MESSAGE_TIMEOUT,
} as const;

/**
 * মেসেজ টাইমলাইন ইভেন্ট
 */
export const MESSAGE_TIMELINE_EVENTS = {
  CREATED: 'message_created',
  SENT: 'message_sent',
  DELIVERED: 'message_delivered',
  READ: 'message_read',
  EDITED: 'message_edited',
  DELETED: 'message_deleted',
  FAILED: 'message_failed',
  REJECTED: 'message_rejected',
  RECEIVED: 'message_received',
  FORWARDED: 'message_forwarded',
  COPIED: 'message_copied',
  ARCHIVED: 'message_archived',
  RESTORED: 'message_restored',
} as const;

/**
 * মেসেজ ফিল্টার অপশন
 */
export const MESSAGE_FILTER_OPTIONS = {
  TYPE: 'type',
  STATUS: 'status',
  PRIORITY: 'priority',
  CATEGORY: 'category',
  DIRECTION: 'direction',
  DATE_RANGE: 'date_range',
  SEARCH: 'search',
  HAS_ATTACHMENTS: 'has_attachments',
  READ: 'read',
} as const;

/**
 * মেসেজ সর্ট অপশন
 */
export const MESSAGE_SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  SENT_AT: 'sentAt',
  DELIVERED_AT: 'deliveredAt',
  READ_AT: 'readAt',
  PRIORITY: 'priority',
  STATUS: 'status',
  TYPE: 'type',
} as const;

/**
 * মেসেজ রেটিং স্কেল
 */
export const MESSAGE_RATING = {
  POOR: 1,
  FAIR: 2,
  GOOD: 3,
  VERY_GOOD: 4,
  EXCELLENT: 5,
} as const;

/**
 * মেসেজ টেমপ্লেট টাইপ
 */
export const MESSAGE_TEMPLATE_TYPES = {
  WELCOME: 'welcome',
  NOTIFICATION: 'notification',
  REMINDER: 'reminder',
  FOLLOW_UP: 'follow_up',
  RESPONSE: 'response',
  ACKNOWLEDGMENT: 'acknowledgment',
  RESOLUTION: 'resolution',
  SURVEY: 'survey',
  ESCALATION: 'escalation',
  TRANSFER: 'transfer',
} as const;

/**
 * মেসেজ মেট্রিক্স
 */
export const MESSAGE_METRICS = {
  TOTAL: 'total',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  RESPONSE_TIME: 'response_time',
  RESOLUTION_TIME: 'resolution_time',
  AVERAGE_LENGTH: 'average_length',
  ATTACHMENT_COUNT: 'attachment_count',
} as const;

export type MessageIdPrefix = typeof MESSAGE_ID_PREFIX;
export type MessageFormat =
  (typeof SUPPORTED_MESSAGE_FORMATS)[keyof typeof SUPPORTED_MESSAGE_FORMATS];
export type MessageEncryptionType =
  (typeof MESSAGE_ENCRYPTION_TYPES)[keyof typeof MESSAGE_ENCRYPTION_TYPES];
export type MessageDeletePolicy =
  (typeof MESSAGE_DELETE_POLICY)[keyof typeof MESSAGE_DELETE_POLICY];
export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];
export type MessageDirection = (typeof MESSAGE_DIRECTION)[keyof typeof MESSAGE_DIRECTION];
export type MessageStatus = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];
export type MessagePriority = (typeof MESSAGE_PRIORITY)[keyof typeof MESSAGE_PRIORITY];
export type MessageCategory = (typeof MESSAGE_CATEGORY)[keyof typeof MESSAGE_CATEGORY];
export type MessageFormattingOption =
  (typeof MESSAGE_FORMATTING_OPTIONS)[keyof typeof MESSAGE_FORMATTING_OPTIONS];
export type MessageTimelineEvent =
  (typeof MESSAGE_TIMELINE_EVENTS)[keyof typeof MESSAGE_TIMELINE_EVENTS];
export type MessageFilterOption =
  (typeof MESSAGE_FILTER_OPTIONS)[keyof typeof MESSAGE_FILTER_OPTIONS];
export type MessageSortOption = (typeof MESSAGE_SORT_OPTIONS)[keyof typeof MESSAGE_SORT_OPTIONS];
export type MessageRating = (typeof MESSAGE_RATING)[keyof typeof MESSAGE_RATING];
export type MessageTemplateType =
  (typeof MESSAGE_TEMPLATE_TYPES)[keyof typeof MESSAGE_TEMPLATE_TYPES];
export type MessageMetric = (typeof MESSAGE_METRICS)[keyof typeof MESSAGE_METRICS];

export interface MessageAttachmentLimits {
  maxFiles: number;
  maxSizeMB: number;
  allowedTypes: string[];
}

export interface MessageValidationRules {
  content: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  subject: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  attachments: MessageAttachmentLimits;
}

export interface MessageDefaultValues {
  type: MessageType;
  status: MessageStatus;
  priority: MessagePriority;
  category: MessageCategory;
  encryption: MessageEncryptionType;
  format: MessageFormat;
  timeoutMinutes: number;
}

export interface MessageMetadata {
  id: string;
  conversationId: string;
  type: MessageType;
  direction: MessageDirection;
  status: MessageStatus;
  priority: MessagePriority;
  category: MessageCategory;
  content: string;
  subject?: string;
  format: MessageFormat;
  encryption: MessageEncryptionType;
  attachments?: string[];
  metadata?: Record<string, unknown>;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageAttachment {
  id: string;
  messageId: string;
  filename: string;
  size: number;
  mimeType: string;
  url: string;
  metadata?: Record<string, unknown>;
  uploadedAt: Date;
}

export interface MessageTimeline {
  id: string;
  messageId: string;
  event: MessageTimelineEvent;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface MessageFilter {
  type?: MessageType;
  status?: MessageStatus;
  priority?: MessagePriority;
  category?: MessageCategory;
  direction?: MessageDirection;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
  hasAttachments?: boolean;
  read?: boolean;
}

export interface MessageSort {
  field: MessageSortOption;
  order: 'asc' | 'desc';
}

/**
 * মেসেজ কনফিগারেশন
 */
export const MESSAGE_CONFIG = {
  idPrefix: MESSAGE_ID_PREFIX,
  numberFormat: MESSAGE_NUMBER_FORMAT,
  maxLength: MAX_MESSAGE_LENGTH,
  minLength: MIN_MESSAGE_LENGTH,
  supportedFormats: SUPPORTED_MESSAGE_FORMATS,
  encryptionTypes: MESSAGE_ENCRYPTION_TYPES,
  defaultTimeout: DEFAULT_MESSAGE_TIMEOUT,
  editTimeWindow: MESSAGE_EDIT_TIME_WINDOW,
  deletePolicy: MESSAGE_DELETE_POLICY,
  attachmentLimits: MESSAGE_ATTACHMENT_LIMITS,
  validation: MESSAGE_VALIDATION_RULES,
  defaults: MESSAGE_DEFAULT_VALUES,
} as const;

/**
 * মেসেজ স্ট্যাটাস ট্রানজিশন রুলস
 */
export const MESSAGE_STATUS_TRANSITIONS = {
  [MESSAGE_STATUS.PENDING]: [MESSAGE_STATUS.SENT, MESSAGE_STATUS.FAILED],
  [MESSAGE_STATUS.SENT]: [MESSAGE_STATUS.DELIVERED, MESSAGE_STATUS.FAILED],
  [MESSAGE_STATUS.DELIVERED]: [MESSAGE_STATUS.READ, MESSAGE_STATUS.FAILED],
  [MESSAGE_STATUS.READ]: [MESSAGE_STATUS.RECEIVED],
  [MESSAGE_STATUS.FAILED]: [MESSAGE_STATUS.PENDING, MESSAGE_STATUS.REJECTED],
  [MESSAGE_STATUS.REJECTED]: [],
  [MESSAGE_STATUS.RECEIVED]: [],
} as const;

/**
 * মেসেজ টাইপের ডিফল্ট সেটিংস
 */
export const MESSAGE_TYPE_DEFAULTS = {
  [MESSAGE_TYPE.TEXT]: {
    maxLength: MAX_MESSAGE_LENGTH,
    allowFormatting: true,
    allowAttachments: true,
  },
  [MESSAGE_TYPE.IMAGE]: {
    maxLength: 0,
    allowFormatting: false,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.VIDEO]: {
    maxLength: 0,
    allowFormatting: false,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.AUDIO]: {
    maxLength: 0,
    allowFormatting: false,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.FILE]: {
    maxLength: 0,
    allowFormatting: false,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.SYSTEM]: {
    maxLength: 1000,
    allowFormatting: false,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.NOTIFICATION]: {
    maxLength: 500,
    allowFormatting: true,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.TEMPLATE]: {
    maxLength: 5000,
    allowFormatting: true,
    allowAttachments: true,
  },
  [MESSAGE_TYPE.RICH_TEXT]: {
    maxLength: MAX_MESSAGE_LENGTH,
    allowFormatting: true,
    allowAttachments: true,
  },
  [MESSAGE_TYPE.CODE]: {
    maxLength: 5000,
    allowFormatting: true,
    allowAttachments: false,
  },
  [MESSAGE_TYPE.QUOTE]: {
    maxLength: 1000,
    allowFormatting: true,
    allowAttachments: false,
  },
} as const;

/**
 * মেসেজ অ্যানালিটিক্স ইভেন্ট
 */
export const MESSAGE_ANALYTICS_EVENTS = {
  VIEW: 'message_view',
  SEARCH: 'message_search',
  FILTER: 'message_filter',
  EXPORT: 'message_export',
  PRINT: 'message_print',
  FORWARD: 'message_forward',
  COPY: 'message_copy',
} as const;

export type MessageAnalyticsEvent =
  (typeof MESSAGE_ANALYTICS_EVENTS)[keyof typeof MESSAGE_ANALYTICS_EVENTS];

/**
 * মেসেজ রিপোর্ট টাইপ
 */
export const MESSAGE_REPORT_TYPES = {
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  METRICS: 'metrics',
  PERFORMANCE: 'performance',
  USAGE: 'usage',
} as const;

export type MessageReportType = (typeof MESSAGE_REPORT_TYPES)[keyof typeof MESSAGE_REPORT_TYPES];

export type MessageTypeDefaults = typeof MESSAGE_TYPE_DEFAULTS;
