export const TICKET_STATUS = {
  OPEN: 'open',
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  WAITING_CUSTOMER: 'waiting_customer',
  WAITING_AGENT: 'waiting_agent',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
  CANCELLED: 'cancelled',
} as const;

export const TICKET_PRIORITY = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;

export const TICKET_PRIORITY_WEIGHT = {
  low: 1,
  normal: 2,
  high: 3,
  urgent: 4,
  critical: 5,
} as const;

export const TICKET_TYPE = {
  QUESTION: 'question',
  INCIDENT: 'incident',
  PROBLEM: 'problem',
  FEATURE_REQUEST: 'feature_request',
  BUG_REPORT: 'bug_report',
  COMPLAINT: 'complaint',
  REFUND: 'refund',
  RETURN: 'return',
  ORDER_ISSUE: 'order_issue',
  PAYMENT_ISSUE: 'payment_issue',
  ACCOUNT_ISSUE: 'account_issue',
  OTHER: 'other',
} as const;

export const TICKET_CHANNEL = {
  WEB: 'web',
  EMAIL: 'email',
  PHONE: 'phone',
  CHAT: 'chat',
  SOCIAL: 'social',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  MESSENGER: 'messenger',
  IN_APP: 'in_app',
  API: 'api',
} as const;

export const TICKET_CATEGORY = {
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  PRODUCT: 'product',
  ACCOUNT: 'account',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  GENERAL: 'general',
  OTHER: 'other',
} as const;

export const TICKET = {
  STATUS: TICKET_STATUS,
  PRIORITY: TICKET_PRIORITY,
  PRIORITY_WEIGHT: TICKET_PRIORITY_WEIGHT,
  TYPE: TICKET_TYPE,
  CHANNEL: TICKET_CHANNEL,
  CATEGORY: TICKET_CATEGORY,
  SUBJECT_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 10000,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 10,
  MAX_TAGS: 20,
  MAX_WATCHERS: 10,
  AUTO_CLOSE_DAYS: 7,
  REOPEN_WINDOW_DAYS: 14,
  MAX_OPEN_PER_USER: 20,
} as const;

export type TicketStatusType = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];
export type TicketPriorityType = (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY];
export type TicketTypeType = (typeof TICKET_TYPE)[keyof typeof TICKET_TYPE];
export type TicketChannelType = (typeof TICKET_CHANNEL)[keyof typeof TICKET_CHANNEL];
export type TicketCategoryType = (typeof TICKET_CATEGORY)[keyof typeof TICKET_CATEGORY];
