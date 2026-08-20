/**
 * অ্যাডমিন ভেরিফিকেশন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// ভেরিফিকেশন আইডি প্রিফিক্স
export const VERIFICATION_ID_PREFIX = 'VER';

// ভেরিফিকেশন কোড লেন্থ
export const VERIFICATION_CODE_LENGTH = 6;

// ভেরিফিকেশন কোড এক্সপাইরি টাইম (মিনিটে)
export const VERIFICATION_CODE_EXPIRY_TIME = 10;

// ভেরিফিকেশন ম্যাক্স অ্যাটেম্পট
export const VERIFICATION_MAX_ATTEMPTS = 5;

// ভেরিফিকেশন রিসেন্ড টাইমআউট (সেকেন্ডে)
export const VERIFICATION_RESEND_TIMEOUT = 60;

// ভেরিফিকেশন মেথড টাইপ
export const VERIFICATION_METHOD_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  AUTHENTICATOR: 'authenticator',
  BACKUP_CODE: 'backup_code',
} as const;

// ভেরিফিকেশন স্টোরেজ পদ্ধতি
export const VERIFICATION_STORAGE_METHODS = {
  DATABASE: 'database',
  CACHE: 'cache',
  REDIS: 'redis',
  MEMCACHED: 'memcached',
} as const;

// ভেরিফিকেশন ব্যাচ সাইজ
export const VERIFICATION_BATCH_SIZE = 100;

// ভেরিফিকেশন ক্যাশ টাইমআউট (সেকেন্ডে)
export const VERIFICATION_CACHE_TIMEOUT = 600;

// ভেরিফিকেশন রেট লিমিট (প্রতি মিনিটে)
export const VERIFICATION_RATE_LIMIT = 3;

// ভেরিফিকেশন ম্যাক্স ফাইল সাইজ (এমবিতে)
export const VERIFICATION_MAX_FILE_SIZE = 10;

// ভেরিফিকেশন ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const VERIFICATION_CLEANUP_SCHEDULE = '0 2 * * *'; // প্রতিদিন রাত ২টায়

// ভেরিফিকেশন এনক্রিপশন সেটিংস
export const VERIFICATION_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
} as const;

// ভেরিফিকেশন মনিটরিং সেটিংস
export const VERIFICATION_MONITORING = {
  enabled: true,
  alertThreshold: 10, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// ভেরিফিকেশন কোড জেনারেশন সেটিংস
export const VERIFICATION_CODE_SETTINGS = {
  allowedCharacters: '0123456789',
  caseSensitive: false,
  preventReuse: true,
  maxAge: 10, // মিনিট
} as const;

// ভেরিফিকেশন টাইমআউট সেটিংস
export const VERIFICATION_TIMEOUT_SETTINGS = {
  maxTotalTime: 30, // মিনিট
  warningTime: 5, // মিনিট
  extendTime: 5, // মিনিট
} as const;

// ভেরিফিকেশন অডিট ট্রেইল
export const VERIFICATION_AUDIT_TRAIL = {
  enabled: true,
  logAttempts: true,
  logSuccess: true,
  logFailure: true,
  logResend: true,
} as const;

// ভেরিফিকেশন সিকিউরিটি সেটিংস
export const VERIFICATION_SECURITY_SETTINGS = {
  requireCaptcha: true,
  maxAttemptsPerIP: 10,
  blockDuration: 30, // মিনিট
  allowResend: true,
} as const;
