/**
 * টিকেট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট আইডি প্রিফিক্স
 */
export const TICKET_ID_PREFIX = 'TKT';

/**
 * টিকেট নম্বর ফরম্যাট
 */
export const TICKET_NUMBER_FORMAT = 'TKT-{year}{month}{day}-{sequence}';

/**
 * ডিফল্ট টিকেট সাবজেক্ট
 */
export const DEFAULT_TICKET_SUBJECT = 'সাপোর্ট রিকোয়েস্ট';

/**
 * ডিফল্ট টিকেট ডেসক্রিপশন
 */
export const DEFAULT_TICKET_DESCRIPTION = 'আমি সাপোর্ট টিমের সাহায্য চাই';

/**
 * টিকেট সাবজেক্টের মিনিমাম লেন্থ
 */
export const TICKET_SUBJECT_MIN_LENGTH = 10;

/**
 * টিকেট সাবজেক্টের ম্যাক্সিমাম লেন্থ
 */
export const TICKET_SUBJECT_MAX_LENGTH = 100;

/**
 * টিকেট ডেসক্রিপশনের মিনিমাম লেন্থ
 */
export const TICKET_DESCRIPTION_MIN_LENGTH = 20;

/**
 * টিকেট ডেসক্রিপশনের ম্যাক্সিমাম লেন্থ
 */
export const TICKET_DESCRIPTION_MAX_LENGTH = 1000;

/**
 * টিকেট নম্বর জেনারেশন রুলস
 */
export const TICKET_NUMBER_RULES = {
  prefix: 'TKT',
  separator: '-',
  dateFormat: 'YYYYMMDD',
  sequenceLength: 4,
  minSequence: 1,
  maxSequence: 9999,
} as const;

/**
 * টিকেট হেডার ফরম্যাট
 */
export const TICKET_HEADER_FORMAT = `
═══════════════════════════════════════
  টিকেট নম্বর: {ticketNumber}
  স্ট্যাটাস: {status}
  প্রায়োরিটি: {priority}
  তৈরি: {createdAt}
═══════════════════════════════════════
`;

/**
 * টিকেট রেসপন্স ফরম্যাট
 */
export const TICKET_RESPONSE_FORMAT = `
─────────────────────────────────────
  উত্তর দিয়েছেন: {agentName}
  সময়: {responseTime}
─────────────────────────────────────
  {message}
─────────────────────────────────────
`;

/**
 * টিকেট টেমপ্লেট টাইপ
 */
export const TICKET_TEMPLATE_TYPES = {
  GENERAL: 'general',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  FEEDBACK: 'feedback',
  COMPLAINT: 'complaint',
} as const;

/**
 * টিকেট রেজোলিউশন টাইপ
 */
export const TICKET_RESOLUTION_TYPES = {
  SOLVED: 'solved',
  UNRESOLVED: 'unresolved',
  PARTIAL: 'partial',
  ESCALATED: 'escalated',
  CANCELLED: 'cancelled',
} as const;

/**
 * টিকেট অ্যাকশন টাইপ
 */
export const TICKET_ACTION_TYPES = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  ASSIGN: 'assign',
  REASSIGN: 'reassign',
  ESCALATE: 'escalate',
  RESOLVE: 'resolve',
  REOPEN: 'reopen',
  CLOSE: 'close',
  COMMENT: 'comment',
  ATTACH: 'attach',
} as const;

/**
 * টিকেট ইভেন্ট টাইপ
 */
export const TICKET_EVENT_TYPES = {
  CREATED: 'ticket.created',
  UPDATED: 'ticket.updated',
  ASSIGNED: 'ticket.assigned',
  ESCALATED: 'ticket.escalated',
  RESOLVED: 'ticket.resolved',
  REOPENED: 'ticket.reopened',
  CLOSED: 'ticket.closed',
  COMMENTED: 'ticket.commented',
} as const;

/**
 * টিকেট মেটাডেটা ফিল্ড
 */
export const TICKET_METADATA_FIELDS = {
  SOURCE: 'source',
  CHANNEL: 'channel',
  BROWSER: 'browser',
  OS: 'os',
  IP: 'ip',
  USER_AGENT: 'userAgent',
  REFERRER: 'referrer',
} as const;

/**
 * টিকেট সার্চ ফিল্ডস
 */
export const TICKET_SEARCH_FIELDS = {
  TICKET_NUMBER: 'ticketNumber',
  SUBJECT: 'subject',
  DESCRIPTION: 'description',
  STATUS: 'status',
  PRIORITY: 'priority',
  CATEGORY: 'category',
  ASSIGNEE: 'assignee',
  CREATOR: 'creator',
} as const;

/**
 * টিকেট ফিল্টার টাইপ
 */
export const TICKET_FILTER_TYPES = {
  ALL: 'all',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  UNASSIGNED: 'unassigned',
  MY_TICKETS: 'my_tickets',
} as const;

/**
 * টিকেট স্ট্যাটিস্টিক টাইপ
 */
export const TICKET_STATISTIC_TYPES = {
  TOTAL: 'total',
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  AVERAGE_RESPONSE_TIME: 'average_response_time',
  AVERAGE_RESOLUTION_TIME: 'average_resolution_time',
} as const;

/**
 * টিকেট ভ্যালিডেশন রুলস
 */
export const TICKET_VALIDATION_RULES = {
  subject: {
    minLength: TICKET_SUBJECT_MIN_LENGTH,
    maxLength: TICKET_SUBJECT_MAX_LENGTH,
    required: true,
  },
  description: {
    minLength: TICKET_DESCRIPTION_MIN_LENGTH,
    maxLength: TICKET_DESCRIPTION_MAX_LENGTH,
    required: true,
  },
  attachments: {
    maxFiles: 5,
    maxSizeMB: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
  },
} as const;

/**
 * টিকেট ডিফল্ট ভ্যালু
 */
export const TICKET_DEFAULT_VALUES = {
  status: 'open',
  priority: 'medium',
  category: 'general',
  source: 'web',
  channel: 'ticket',
  language: 'bn',
  timezone: 'Asia/Dhaka',
} as const;

/**
 * টিকেট টাইমলাইন ইভেন্ট
 */
export const TICKET_TIMELINE_EVENTS = {
  CREATED: 'Ticket created',
  UPDATED: 'Ticket updated',
  STATUS_CHANGED: 'Status changed',
  PRIORITY_CHANGED: 'Priority changed',
  ASSIGNED: 'Assigned to agent',
  UNASSIGNED: 'Unassigned from agent',
  COMMENT_ADDED: 'Comment added',
  ATTACHMENT_ADDED: 'Attachment added',
  ATTACHMENT_REMOVED: 'Attachment removed',
  ESCALATED: 'Ticket escalated',
  RESOLVED: 'Ticket resolved',
  REOPENED: 'Ticket reopened',
  CLOSED: 'Ticket closed',
} as const;

export type TicketTemplateType = (typeof TICKET_TEMPLATE_TYPES)[keyof typeof TICKET_TEMPLATE_TYPES];

export type TicketResolutionType =
  (typeof TICKET_RESOLUTION_TYPES)[keyof typeof TICKET_RESOLUTION_TYPES];

export type TicketActionType = (typeof TICKET_ACTION_TYPES)[keyof typeof TICKET_ACTION_TYPES];

export type TicketEventType = (typeof TICKET_EVENT_TYPES)[keyof typeof TICKET_EVENT_TYPES];

export type TicketMetadataField =
  (typeof TICKET_METADATA_FIELDS)[keyof typeof TICKET_METADATA_FIELDS];

export type TicketSearchField = (typeof TICKET_SEARCH_FIELDS)[keyof typeof TICKET_SEARCH_FIELDS];

export type TicketFilterType = (typeof TICKET_FILTER_TYPES)[keyof typeof TICKET_FILTER_TYPES];

export type TicketStatisticType =
  (typeof TICKET_STATISTIC_TYPES)[keyof typeof TICKET_STATISTIC_TYPES];

export type TicketValidationRules = typeof TICKET_VALIDATION_RULES;

export type TicketDefaultValues = typeof TICKET_DEFAULT_VALUES;

export type TicketTimelineEvent =
  (typeof TICKET_TIMELINE_EVENTS)[keyof typeof TICKET_TIMELINE_EVENTS];

export interface TicketNumberRules {
  prefix: string;
  separator: string;
  dateFormat: string;
  sequenceLength: number;
  minSequence: number;
  maxSequence: number;
}

export interface TicketHeaderFormat {
  ticketNumber: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface TicketResponseFormat {
  agentName: string;
  responseTime: string;
  message: string;
}

export interface TicketAttachment {
  id: string;
  filename: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: Date;
}

export interface TicketComment {
  id: string;
  content: string;
  author: string;
  authorType: 'user' | 'agent' | 'system';
  createdAt: Date;
  updatedAt: Date;
  attachments?: TicketAttachment[];
}

export interface TicketTimeline {
  id: string;
  event: TicketTimelineEvent;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  createdBy: string;
}
