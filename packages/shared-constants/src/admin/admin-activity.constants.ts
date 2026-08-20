/**
 * অ্যাডমিন অ্যাক্টিভিটি সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// অ্যাক্টিভিটি আইডি প্রিফিক্স
export const ACTIVITY_ID_PREFIX = 'ACT';

// অ্যাক্টিভিটির ম্যাক্স ডুরেশন (মিনিটে)
export const ACTIVITY_MAX_DURATION = 120; // ২ ঘন্টা

// অ্যাক্টিভিটি লগ রিটেনশন ডে (দিনে)
export const ACTIVITY_LOG_RETENTION_DAYS = 90; // ৩ মাস

// ডিফল্ট অ্যাক্টিভিটি পেজিনেশন
export const DEFAULT_ACTIVITY_PAGINATION = {
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
} as const;

// অ্যাক্টিভিটি রিপোর্ট ফরম্যাট
export const ACTIVITY_REPORT_FORMATS = {
  PDF: 'pdf',
  CSV: 'csv',
  EXCEL: 'xlsx',
  JSON: 'json',
} as const;

// অ্যাক্টিভিটি এক্সপোর্ট লিমিট
export const ACTIVITY_EXPORT_LIMIT = 10000; // সর্বোচ্চ ১০,০০০ রেকর্ড

// অ্যাক্টিভিটি স্টোরেজ পাথ
export const ACTIVITY_STORAGE_PATH = 'logs/activities';

// অ্যাক্টিভিটি ব্যাচ সাইজ
export const ACTIVITY_BATCH_SIZE = 1000;

// অ্যাক্টিভিটি ক্যাশ টাইমআউট (সেকেন্ডে)
export const ACTIVITY_CACHE_TIMEOUT = 300; // ৫ মিনিট

// অ্যাক্টিভিটি রেট লিমিট (প্রতি মিনিটে)
export const ACTIVITY_RATE_LIMIT = 1000;

// অ্যাক্টিভিটি ম্যাক্স ফাইল সাইজ (এমবিতে)
export const ACTIVITY_MAX_FILE_SIZE = 50; // ৫০ এমবি

// অ্যাক্টিভিটি ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const ACTIVITY_CLEANUP_SCHEDULE = '0 2 * * *'; // প্রতিদিন রাত ২টায়

// অ্যাক্টিভিটি আর্কাইভ শিডিউল (ক্রন এক্সপ্রেশন)
export const ACTIVITY_ARCHIVE_SCHEDULE = '0 3 * * 0'; // প্রতি রবিবার রাত ৩টায়

// অ্যাক্টিভিটি লগ লেভেল
export const ACTIVITY_LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
} as const;

// অ্যাক্টিভিটি লগ ফরম্যাট
export const ACTIVITY_LOG_FORMAT = {
  timestamp: 'ISO',
  includeIP: true,
  includeUserAgent: true,
  includeSessionId: true,
  includeRequestId: true,
} as const;

// অ্যাক্টিভিটি এনক্রিপশন সেটিংস
export const ACTIVITY_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// অ্যাক্টিভিটি মনিটরিং সেটিংস
export const ACTIVITY_MONITORING = {
  enabled: true,
  alertThreshold: 1000, // প্রতি মিনিটে
  criticalThreshold: 5000, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;
