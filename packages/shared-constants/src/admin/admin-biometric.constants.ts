/**
 * অ্যাডমিন বায়োমেট্রিক অথেন্টিকেশন সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// বায়োমেট্রিক আইডি প্রিফিক্স
export const BIOMETRIC_ID_PREFIX = 'BIO';

// বায়োমেট্রিক ডেটা এনক্রিপশন মেথড
export const BIOMETRIC_ENCRYPTION_METHOD = 'aes-256-gcm';

// বায়োমেট্রিক স্টোরেজ পদ্ধতি
export const BIOMETRIC_STORAGE_METHODS = {
  DATABASE: 'database',
  SECURE_ENCLAVE: 'secure_enclave',
  TPM: 'tpm',
  HSM: 'hsm',
} as const;

// বায়োমেট্রিক ম্যাক্স ডিভাইস
export const BIOMETRIC_MAX_DEVICES = 5;

// বায়োমেট্রিক সেশন টাইমআউট (মিনিটে)
export const BIOMETRIC_SESSION_TIMEOUT = 15;

// বায়োমেট্রিক রিট্রাই লিমিট
export const BIOMETRIC_RETRY_LIMIT = 3;

// বায়োমেট্রিক ডেটা রিটেনশন পিরিয়ড (দিনে)
export const BIOMETRIC_DATA_RETENTION = 365;

// বায়োমেট্রিক ডিভাইস সাপোর্ট লিস্ট
export const BIOMETRIC_DEVICE_SUPPORT = {
  IOS: [
    'iphone_5s',
    'iphone_6',
    'iphone_7',
    'iphone_8',
    'iphone_x',
    'iphone_11',
    'iphone_12',
    'iphone_13',
    'iphone_14',
  ],
  ANDROID: [
    'android_6',
    'android_7',
    'android_8',
    'android_9',
    'android_10',
    'android_11',
    'android_12',
  ],
  WINDOWS: ['windows_10', 'windows_11'],
  MACOS: ['macos_big_sur', 'macos_monterey', 'macos_ventura'],
} as const;

// বায়োমেট্রিক ব্যাচ সাইজ
export const BIOMETRIC_BATCH_SIZE = 50;

// বায়োমেট্রিক ক্যাশ টাইমআউট (সেকেন্ডে)
export const BIOMETRIC_CACHE_TIMEOUT = 300;

// বায়োমেট্রিক রেট লিমিট (প্রতি মিনিটে)
export const BIOMETRIC_RATE_LIMIT = 5;

// বায়োমেট্রিক ম্যাক্স ফাইল সাইজ (এমবিতে)
export const BIOMETRIC_MAX_FILE_SIZE = 10;

// বায়োমেট্রিক ক্লিনআপ শিডিউল (ক্রন এক্সপ্রেশন)
export const BIOMETRIC_CLEANUP_SCHEDULE = '0 3 * * 0'; // প্রতি রবিবার রাত ৩টায়

// বায়োমেট্রিক এনক্রিপশন সেটিংস
export const BIOMETRIC_ENCRYPTION = {
  enabled: true,
  algorithm: 'aes-256-gcm',
  keyRotation: 30, // দিন
  saltRounds: 12,
} as const;

// বায়োমেট্রিক মনিটরিং সেটিংস
export const BIOMETRIC_MONITORING = {
  enabled: true,
  alertThreshold: 10, // প্রতি মিনিটে
  notificationEmail: 'admin@vubon.com',
} as const;

// বায়োমেট্রিক অডিট ট্রেইল
export const BIOMETRIC_AUDIT_TRAIL = {
  enabled: true,
  logSetup: true,
  logVerification: true,
  logFailure: true,
  logDisable: true,
} as const;

// বায়োমেট্রিক সিকিউরিটি সেটিংস
export const BIOMETRIC_SECURITY_SETTINGS = {
  requireLiveness: true,
  requireAntiSpoofing: true,
  matchThreshold: 0.8,
  maxFailedAttempts: 3,
  lockoutDuration: 30, // মিনিট
} as const;

// বায়োমেট্রিক স্টোরেজ সেটিংস
export const BIOMETRIC_STORAGE_SETTINGS = {
  encryptData: true,
  hashData: true,
  storeMetadata: true,
  backupEnabled: true,
  backupInterval: 7, // দিন
} as const;
