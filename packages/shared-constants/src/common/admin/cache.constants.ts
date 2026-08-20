/**
 * ক্যাশিং সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ক্যাশ টাইপ
export const CACHE_TYPES = {
  MEMORY: 'memory',
  REDIS: 'redis',
  FILE: 'file',
  DATABASE: 'database',
} as const;

// ডিফল্ট ক্যাশ টাইমআউট (সেকেন্ডে)
export const DEFAULT_CACHE_TIMEOUT = 3600; // ১ ঘন্টা

// ক্যাশ ক্লিনআপ ইন্টারভাল (মিনিটে)
export const CACHE_CLEANUP_INTERVAL = 60; // ১ ঘন্টা

// ক্যাশ ম্যাক্স সাইজ (এমবিতে)
export const CACHE_MAX_SIZE = 100;

// ক্যাশ কী প্রিফিক্স
export const CACHE_KEY_PREFIX = 'app_cache:';

// ক্যাশ ট্যাগ লিস্ট
export const CACHE_TAGS = {
  USER: 'user',
  ADMIN: 'admin',
  SETTINGS: 'settings',
  REPORT: 'report',
  NOTIFICATION: 'notification',
  SESSION: 'session',
  PERMISSION: 'permission',
  ROLE: 'role',
  DEPARTMENT: 'department',
  TEAM: 'team',
  ACTIVITY: 'activity',
  AUDIT: 'audit',
  LOG: 'log',
  PREFERENCE: 'preference',
  VERIFICATION: 'verification',
  BIOMETRIC: 'biometric',
  DEVICE: 'device',
} as const;

// ক্যাশ রিড রাইট স্ট্র্যাটেজি
export const CACHE_STRATEGIES = {
  CACHE_ASIDE: 'cache_aside',
  READ_THROUGH: 'read_through',
  WRITE_THROUGH: 'write_through',
  WRITE_BEHIND: 'write_behind',
  REFRESH_AHEAD: 'refresh_ahead',
} as const;

// ক্যাশ ইভিকশন পলিসি
export const CACHE_EVICTION_POLICIES = {
  LRU: 'lru', // Least Recently Used
  LFU: 'lfu', // Least Frequently Used
  TTL: 'ttl', // Time To Live
  FIFO: 'fifo', // First In First Out
  RANDOM: 'random', // Random
} as const;

// ক্যাশ ব্যাচ সাইজ
export const CACHE_BATCH_SIZE = 100;

// ক্যাশ রেট লিমিট (প্রতি মিনিটে)
export const CACHE_RATE_LIMIT = 1000;

// ক্যাশ রিট্রাই লিমিট
export const CACHE_RETRY_LIMIT = 3;

// ক্যাশ রিট্রাই ডেলে (মিলিসেকেন্ডে)
export const CACHE_RETRY_DELAY = 100;

// ক্যাশ কম্প্রেশন থ্রেশহোল্ড (কেবি)
export const CACHE_COMPRESSION_THRESHOLD = 10;

// ক্যাশ ডিফল্ট টিটিএল (সেকেন্ডে)
export const CACHE_DEFAULT_TTL = {
  SHORT: 60, // ১ মিনিট
  MEDIUM: 600, // ১০ মিনিট
  LONG: 3600, // ১ ঘন্টা
  EXTRA_LONG: 86400, // ২৪ ঘন্টা
} as const;

// ক্যাশ কী প্যাটার্ন
export const CACHE_KEY_PATTERNS = {
  USER: 'user:{id}',
  ADMIN: 'admin:{id}',
  SESSION: 'session:{id}',
  SETTINGS: 'settings:{category}',
  PERMISSION: 'permission:{id}',
  ROLE: 'role:{id}',
  DEPARTMENT: 'department:{id}',
  TEAM: 'team:{id}',
} as const;

// ক্যাশ মনিটরিং সেটিংস
export const CACHE_MONITORING = {
  enabled: true,
  alertThreshold: 80, // ৮০% মেমোরি ব্যবহার
  notificationEmail: 'admin@vubon.com',
} as const;

// ক্যাশ এনক্রিপশন সেটিংস
export const CACHE_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// ক্যাশ রিড-থ্রু সেটিংস
export const CACHE_READ_THROUGH = {
  enabled: true,
  timeout: 5000, // মিলিসেকেন্ড
  retryCount: 2,
} as const;

// ক্যাশ রাইট-বিহাইন্ড সেটিংস
export const CACHE_WRITE_BEHIND = {
  enabled: false,
  flushInterval: 60, // সেকেন্ড
  batchSize: 100,
  maxRetries: 3,
} as const;
