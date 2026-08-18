/**
 * সাপোর্ট সিস্টেমের মৌলিক কনফিগারেশন কনস্ট্যান্টসমূহ
 */

/**
 * সাপোর্ট সিস্টেমের নাম
 */
export const SUPPORT_SYSTEM_NAME = 'Vubon Support System';

/**
 * সাপোর্ট সিস্টেমের ডিফল্ট টাইমজোন
 */
export const DEFAULT_TIMEZONE = 'Asia/Dhaka';

/**
 * সাপোর্ট সিস্টেমের ডিফল্ট ল্যাঙ্গুয়েজ
 */
export const DEFAULT_LANGUAGE = 'bn-BD';

/**
 * প্রতি দিনে সর্বোচ্চ টিকেট সংখ্যা
 */
export const MAX_TICKETS_PER_DAY = 50;

/**
 * সাপোর্ট ইমেইল ঠিকানা
 */
export const SUPPORT_EMAIL = 'support@vubon.com';

/**
 * সাপোর্ট ফোন নম্বর
 */
export const SUPPORT_PHONE = '+8801234567890';

/**
 * সাপোর্ট হাওয়ার্স (ব্যবসায়িক সময়)
 */
export const SUPPORT_HOURS = {
  start: '09:00',
  end: '18:00',
  timezone: 'Asia/Dhaka',
} as const;

/**
 * সাপোর্ট সিস্টেমের ভার্সন
 */
export const SUPPORT_SYSTEM_VERSION = '1.0.0';

/**
 * সাপোর্ট টিকেটের প্রকারভেদ
 */
export const SUPPORT_TICKET_TYPES = {
  GENERAL: 'general',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  FEATURE_REQUEST: 'feature_request',
  COMPLAINT: 'complaint',
} as const;

/**
 * সাপোর্ট টিকেটের স্ট্যাটাস
 */
export const SUPPORT_TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REOPENED: 'reopened',
} as const;

/**
 * সাপোর্ট টিকেটের প্রায়োরিটি লেভেল
 */
export const SUPPORT_TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * সাপোর্ট চ্যানেলসমূহ
 */
export const SUPPORT_CHANNELS = {
  EMAIL: 'email',
  PHONE: 'phone',
  CHAT: 'chat',
  SOCIAL: 'social',
  TICKET: 'ticket',
} as const;

/**
 * সাপোর্ট রেসপন্স টাইম (মিনিটে)
 */
export const SUPPORT_RESPONSE_TIME = {
  LOW: 120, // 2 ঘন্টা
  MEDIUM: 60, // 1 ঘন্টা
  HIGH: 30, // 30 মিনিট
  CRITICAL: 15, // 15 মিনিট
} as const;

/**
 * সাপোর্ট টিকেটের ক্যাটাগরি
 */
export const SUPPORT_CATEGORIES = {
  ACCOUNT: 'account',
  PAYMENT: 'payment',
  SERVICE: 'service',
  TECHNICAL: 'technical',
  FEEDBACK: 'feedback',
  OTHER: 'other',
} as const;

/**
 * সাপোর্ট টিকেটের জন্য ডিফল্ট সেটিংস
 */
export const SUPPORT_DEFAULT_SETTINGS = {
  maxAttachments: 5,
  maxFileSizeMB: 10,
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  autoCloseDays: 7,
  reminderHours: 24,
} as const;

/**
 * সাপোর্ট মেসেজ টাইপ
 */
export const SUPPORT_MESSAGE_TYPES = {
  USER: 'user',
  AGENT: 'agent',
  SYSTEM: 'system',
  BOT: 'bot',
} as const;

/**
 * সাপোর্ট নোটিফিকেশন টাইপ
 */
export const SUPPORT_NOTIFICATION_TYPES = {
  TICKET_CREATED: 'ticket_created',
  TICKET_UPDATED: 'ticket_updated',
  TICKET_RESOLVED: 'ticket_resolved',
  TICKET_CLOSED: 'ticket_closed',
  TICKET_REOPENED: 'ticket_reopened',
  NEW_MESSAGE: 'new_message',
  ASSIGNED: 'assigned',
  ESCALATED: 'escalated',
} as const;

/**
 * সাপোর্ট ফিল্টার অপশন
 */
export const SUPPORT_FILTER_OPTIONS = {
  STATUS: 'status',
  PRIORITY: 'priority',
  CATEGORY: 'category',
  ASSIGNEE: 'assignee',
  DATE_RANGE: 'date_range',
  SEARCH: 'search',
} as const;

/**
 * সাপোর্ট সর্ট অপশন
 */
export const SUPPORT_SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  PRIORITY: 'priority',
  STATUS: 'status',
  SUBJECT: 'subject',
} as const;

export type SupportTicketType = (typeof SUPPORT_TICKET_TYPES)[keyof typeof SUPPORT_TICKET_TYPES];

export type SupportTicketStatus =
  (typeof SUPPORT_TICKET_STATUS)[keyof typeof SUPPORT_TICKET_STATUS];

export type SupportTicketPriority =
  (typeof SUPPORT_TICKET_PRIORITY)[keyof typeof SUPPORT_TICKET_PRIORITY];

export type SupportChannel = (typeof SUPPORT_CHANNELS)[keyof typeof SUPPORT_CHANNELS];

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[keyof typeof SUPPORT_CATEGORIES];

export type SupportMessageType = (typeof SUPPORT_MESSAGE_TYPES)[keyof typeof SUPPORT_MESSAGE_TYPES];

export type SupportNotificationType =
  (typeof SUPPORT_NOTIFICATION_TYPES)[keyof typeof SUPPORT_NOTIFICATION_TYPES];

export type SupportFilterOption =
  (typeof SUPPORT_FILTER_OPTIONS)[keyof typeof SUPPORT_FILTER_OPTIONS];

export type SupportSortOption = (typeof SUPPORT_SORT_OPTIONS)[keyof typeof SUPPORT_SORT_OPTIONS];

export interface SupportHours {
  start: string;
  end: string;
  timezone: string;
}

export interface SupportDefaultSettings {
  maxAttachments: number;
  maxFileSizeMB: number;
  allowedFileTypes: string[];
  autoCloseDays: number;
  reminderHours: number;
}
