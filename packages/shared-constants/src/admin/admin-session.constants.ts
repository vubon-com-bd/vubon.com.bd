/**
 * অ্যাডমিন সেশান সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// সেশান আইডি প্রিফিক্স
export const SESSION_ID_PREFIX = 'SES';

// সেশান ডিউরেশন (মিলিসেকেন্ডে) - ২৪ ঘন্টা
export const SESSION_DURATION = 24 * 60 * 60 * 1000;

// সেশান রিফ্রেশ টাইমআউট (মিলিসেকেন্ডে) - ১২ ঘন্টা
export const SESSION_REFRESH_TIMEOUT = 12 * 60 * 60 * 1000;

// সেশান ম্যাক্স কনকারেন্ট (একই সময়ে সর্বোচ্চ সেশান)
export const SESSION_MAX_CONCURRENT = 5;

// সেশান টাইমআউট ওয়ার্নিং (মিনিটে) - ৫ মিনিট আগে
export const SESSION_TIMEOUT_WARNING = 5;

// সেশান স্টোরেজ টাইপ
export const SESSION_STORAGE_TYPES = {
  REDIS: 'redis',
  MEMCACHED: 'memcached',
  DATABASE: 'database',
  FILE: 'file',
} as const;

// সেশান কুকি সেটিংস
export const SESSION_COOKIE_SETTINGS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
  domain: '.vubon.com',
} as const;

// সেশান রিমেম্বার মি ডিউরেশন (দিনে) - ৩০ দিন
export const SESSION_REMEMBER_ME_DURATION = 30;

// সেশান টাইমআউট (মিনিটে) - ৩০ মিনিট নিষ্ক্রিয়তা
export const SESSION_TIMEOUT = 30;

// সেশান এক্সটেনশন টাইম (মিনিটে) - ১৫ মিনিট
export const SESSION_EXTENSION_TIME = 15;

// সেশান ম্যাক্স ডিউরেশন (ঘন্টায়) - ২৪ ঘন্টা
export const SESSION_MAX_DURATION = 24;

// সেশান রোটেশন ইন্টারভাল (মিনিটে) - ১০ মিনিট
export const SESSION_ROTATION_INTERVAL = 10;

// সেশান এনক্রিপশন অ্যালগরিদম
export const SESSION_ENCRYPTION_ALGORITHM = 'aes-256-gcm';

// সেশান টোকেন লেন্থ (বাইটে)
export const SESSION_TOKEN_LENGTH = 32;

// সেশান রিফ্রেশ টোকেন লেন্থ (বাইটে)
export const SESSION_REFRESH_TOKEN_LENGTH = 64;

// সেশান ক্লিনআপ ইন্টারভাল (ঘন্টায়) - ৬ ঘন্টা
export const SESSION_CLEANUP_INTERVAL = 6;

// সেশান মনিটরিং ইন্টারভাল (মিনিটে) - ৫ মিনিট
export const SESSION_MONITORING_INTERVAL = 5;

// সেশান আইপি ট্র্যাকিং
export const SESSION_IP_TRACKING = {
  enabled: true,
  maxIPChanges: 3,
  timeWindow: 60, // মিনিট
} as const;

// সেশান ডিভাইস ট্র্যাকিং
export const SESSION_DEVICE_TRACKING = {
  enabled: true,
  maxDevices: 5,
  allowUnknown: false,
} as const;

// সেশান লোকেশন ট্র্যাকিং
export const SESSION_LOCATION_TRACKING = {
  enabled: true,
  maxDistance: 500, // কিলোমিটার
  allowVPN: false,
} as const;

// সেশান অ্যাক্টিভিটি টাইমআউট
export const SESSION_ACTIVITY_TIMEOUT = {
  ADMIN: 15, // মিনিট
  SUPER_ADMIN: 10, // মিনিট
  DEFAULT: 30, // মিনিট
} as const;

// সেশান বিহেভিয়ার অ্যানালাইসিস
export const SESSION_BEHAVIOR_ANALYSIS = {
  enabled: true,
  anomalyThreshold: 0.8,
  learningPeriod: 7, // দিন
  alertOnAnomaly: true,
} as const;

// সেশান অডিট ট্রেইল
export const SESSION_AUDIT_TRAIL = {
  enabled: true,
  logLogin: true,
  logLogout: true,
  logActivity: true,
  logIPChanges: true,
  logDeviceChanges: true,
} as const;
