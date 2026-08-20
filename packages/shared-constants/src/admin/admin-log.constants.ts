/**
 * অ্যাডমিন লগ সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// লগ আইডি প্রিফিক্স
export const LOG_ID_PREFIX = 'LOG';

// লগ রিটেনশন পিরিয়ড (দিনে)
export const LOG_RETENTION_PERIOD = 30; // ৩০ দিন

// লগ সাইজ লিমিট (এমবিতে)
export const LOG_SIZE_LIMIT = 100; // ১০০ এমবি

// ডিফল্ট লগ লেভেল
export const DEFAULT_LOG_LEVEL = 'info';

// লগ ফরম্যাট
export const LOG_FORMAT = {
  timestamp: 'ISO',
  includeLevel: true,
  includeContext: true,
  includeMetadata: true,
  includeTrace: true,
} as const;

// লগ স্টোরেজ পাথ
export const LOG_STORAGE_PATH = 'logs/system';

// লগ আর্কাইভ ইন্টারভাল (দিনে)
export const LOG_ARCHIVE_INTERVAL = 7; // ৭ দিন

// লগ ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const LOG_CLEANUP_SCHEDULE = '0 1 * * *'; // প্রতিদিন রাত ১টায়

// লগ ব্যাচ সাইজ
export const LOG_BATCH_SIZE = 500;

// লগ ক্যাশ টাইমআউট (সেকেন্ডে)
export const LOG_CACHE_TIMEOUT = 60; // ১ মিনিট

// লগ রেট লিমিট (প্রতি সেকেন্ডে)
export const LOG_RATE_LIMIT = 100;

// লগ ম্যাক্স ফাইল সাইজ (এমবিতে)
export const LOG_MAX_FILE_SIZE = 50;

// লগ কম্প্রেশন ফরম্যাট
export const LOG_COMPRESSION_FORMAT = 'gzip';

// লগ এনক্রিপশন সেটিংস
export const LOG_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// লগ মনিটরিং সেটিংস
export const LOG_MONITORING = {
  enabled: true,
  alertThreshold: 1000, // প্রতি মিনিটে
  errorThreshold: 100, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// লগ আর্কাইভ সেটিংস
export const LOG_ARCHIVE_SETTINGS = {
  enabled: true,
  interval: 7, // দিন
  retention: 90, // দিন
  compress: true,
  encrypt: true,
} as const;

// লগ রোটেশন সেটিংস
export const LOG_ROTATION = {
  maxSize: 50, // এমবি
  maxFiles: 10,
  compress: true,
  interval: 'daily',
} as const;

// লগ লেভেল কালার
export const LOG_LEVEL_COLORS = {
  DEBUG: '#94A3B8',
  INFO: '#3B82F6',
  WARN: '#F59E0B',
  ERROR: '#EF4444',
  FATAL: '#DC2626',
} as const;

// লগ লেভেল আইকন
export const LOG_LEVEL_ICONS = {
  DEBUG: '🐛',
  INFO: 'ℹ️',
  WARN: '⚠️',
  ERROR: '❌',
  FATAL: '💀',
} as const;

// লগ এক্সপোর্ট ফরম্যাট
export const LOG_EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
  TEXT: 'txt',
  HTML: 'html',
} as const;

// লগ সার্চ সেটিংস
export const LOG_SEARCH_SETTINGS = {
  maxResults: 10000,
  maxDuration: 60, // সেকেন্ড
  allowRegex: true,
  allowWildcard: true,
} as const;
