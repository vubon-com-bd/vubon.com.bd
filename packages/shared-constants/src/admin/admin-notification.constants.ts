/**
 * অ্যাডমিন নোটিফিকেশন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// নোটিফিকেশন আইডি প্রিফিক্স
export const NOTIFICATION_ID_PREFIX = 'NOT';

// নোটিফিকেশন ম্যাক্স সাইজ (কেবি)
export const NOTIFICATION_MAX_SIZE = 10;

// নোটিফিকেশন রিটেনশন ডে (দিনে)
export const NOTIFICATION_RETENTION_DAYS = 30;

// নোটিফিকেশন ডেলিভারি মেথড
export const NOTIFICATION_DELIVERY_METHODS = {
  IN_APP: 'in_app',
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
} as const;

// নোটিফিকেশন প্রায়োরিটি লেভেল
export const NOTIFICATION_PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// ডিফল্ট নোটিফিকেশন সেটিংস
export const DEFAULT_NOTIFICATION_SETTINGS = {
  inApp: true,
  email: true,
  sms: false,
  push: true,
  sound: true,
  badge: true,
  showPreview: true,
  groupByType: true,
} as const;

// নোটিফিকেশন টেমপ্লেট পাথ
export const NOTIFICATION_TEMPLATE_PATH = 'templates/notifications';

// নোটিফিকেশন ব্যাচ সাইজ
export const NOTIFICATION_BATCH_SIZE = 100;

// নোটিফিকেশন ক্যাশ টাইমআউট (সেকেন্ডে)
export const NOTIFICATION_CACHE_TIMEOUT = 300; // ৫ মিনিট

// নোটিফিকেশন রেট লিমিট (প্রতি মিনিটে)
export const NOTIFICATION_RATE_LIMIT = 50;

// নোটিফিকেশন ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const NOTIFICATION_CLEANUP_SCHEDULE = '0 2 * * *'; // প্রতিদিন রাত ২টায়

// নোটিফিকেশন আর্কাইভ শিডিউল (ক্রন এক্সপ্রেশন)
export const NOTIFICATION_ARCHIVE_SCHEDULE = '0 3 * * 0'; // প্রতি রবিবার রাত ৩টায়

// নোটিফিকেশন এনক্রিপশন সেটিংস
export const NOTIFICATION_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// নোটিফিকেশন মনিটরিং সেটিংস
export const NOTIFICATION_MONITORING = {
  enabled: true,
  alertThreshold: 100, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// নোটিফিকেশন অডিট ট্রেইল
export const NOTIFICATION_AUDIT_TRAIL = {
  enabled: true,
  logCreate: true,
  logSend: true,
  logDeliver: true,
  logRead: true,
  logDismiss: true,
} as const;

// নোটিফিকেশন ডেলিভারি রিট্রাই সেটিংস
export const NOTIFICATION_DELIVERY_RETRY = {
  maxAttempts: 3,
  initialDelay: 60, // সেকেন্ড
  backoffMultiplier: 2,
} as const;

// নোটিফিকেশন প্রায়োরিটি কালার
export const NOTIFICATION_PRIORITY_COLORS = {
  LOW: '#94A3B8',
  MEDIUM: '#3B82F6',
  HIGH: '#F59E0B',
  URGENT: '#EF4444',
} as const;

// নোটিফিকেশন প্রায়োরিটি আইকন
export const NOTIFICATION_PRIORITY_ICONS = {
  LOW: 'ℹ️',
  MEDIUM: '📌',
  HIGH: '⚠️',
  URGENT: '🚨',
} as const;

// নোটিফিকেশন টেমপ্লেট ফরম্যাট
export const NOTIFICATION_TEMPLATE_FORMATS = {
  TEXT: 'text',
  HTML: 'html',
  MARKDOWN: 'markdown',
} as const;
