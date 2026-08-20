/**
 * অ্যাডমিন ডিভাইস সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

// ডিভাইস আইডি প্রিফিক্স
export const DEVICE_ID_PREFIX = 'DEV';

// ডিভাইস ট্রাস্ট ডিউরেশন (দিনে) - ৯০ দিন
export const DEVICE_TRUST_DURATION = 90;

// ডিভাইস ম্যাক্স কাউন্ট (প্রতি ইউজার)
export const DEVICE_MAX_COUNT = 10;

// ডিভাইস ফিঙ্গারপ্রিন্ট টাইপ
export const DEVICE_FINGERPRINT_TYPES = {
  BROWSER: 'browser',
  OS: 'os',
  SCREEN: 'screen',
  HARDWARE: 'hardware',
  NETWORK: 'network',
} as const;

// ডিভাইস ব্রাউজার সাপোর্ট
export const DEVICE_BROWSER_SUPPORT = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  BRAVE: 'brave',
  VIVALDI: 'vivaldi',
} as const;

// ডিভাইস ওএস সাপোর্ট
export const DEVICE_OS_SUPPORT = {
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  ANDROID: 'android',
  IOS: 'ios',
  CHROME_OS: 'chrome_os',
} as const;

// ডিভাইস অনুমোদনের পদ্ধতি
export const DEVICE_APPROVAL_METHODS = {
  EMAIL: 'email',
  SMS: 'sms',
  AUTHENTICATOR: 'authenticator',
  ADMIN_APPROVAL: 'admin_approval',
} as const;

// ডিভাইস ব্ল্যাকলিস্ট নিয়ম
export const DEVICE_BLACKLIST_RULES = {
  INVALID_FINGERPRINT: 'invalid_fingerprint',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  MULTIPLE_FAILED_ATTEMPTS: 'multiple_failed_attempts',
  UNKNOWN_LOCATION: 'unknown_location',
  KNOWN_VULNERABILITY: 'known_vulnerability',
} as const;

// ডিভাইস ট্রাস্ট লেভেল
export const DEVICE_TRUST_LEVEL = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  UNKNOWN: 'unknown',
} as const;

// ডিভাইস ট্রাস্ট স্কোর (০-১০০)
export const DEVICE_TRUST_SCORE = {
  HIGH_MIN: 80,
  MEDIUM_MIN: 50,
  LOW_MIN: 20,
  UNKNOWN_MAX: 19,
} as const;

// ডিভাইস ভেরিফিকেশন টাইমআউট (মিনিটে)
export const DEVICE_VERIFICATION_TIMEOUT = 15;

// ডিভাইস রি-ভেরিফিকেশন ইন্টারভাল (দিনে)
export const DEVICE_REVERIFICATION_INTERVAL = 30;

// ডিভাইস কুকি সেটিংস
export const DEVICE_COOKIE_SETTINGS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 90 * 24 * 60 * 60, // ৯০ দিন
} as const;

// ডিভাইস সেশন ক্লিনআপ ইন্টারভাল (ঘন্টায়)
export const DEVICE_SESSION_CLEANUP_INTERVAL = 24;

// ডিভাইস মনিটরিং ইন্টারভাল (মিনিটে)
export const DEVICE_MONITORING_INTERVAL = 30;

// ডিভাইস অডিট ট্রেইল
export const DEVICE_AUDIT_TRAIL = {
  enabled: true,
  logRegistration: true,
  logVerification: true,
  logBlocking: true,
  logTrustChanges: true,
} as const;

// ডিভাইস বিহেভিয়ার অ্যানালাইসিস
export const DEVICE_BEHAVIOR_ANALYSIS = {
  enabled: true,
  anomalyThreshold: 0.7,
  learningPeriod: 14, // দিন
  alertOnAnomaly: true,
} as const;

// ডিভাইস মাল্টি-ফ্যাক্টর সেটিংস
export const DEVICE_MFA_SETTINGS = {
  requireForNewDevice: true,
  allowTrustedDeviceSkip: true,
  maxTrustedDevices: 5,
  mfaMethods: ['totp', 'sms', 'email'],
} as const;
