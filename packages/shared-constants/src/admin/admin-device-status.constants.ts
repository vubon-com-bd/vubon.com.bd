/**
 * অ্যাডমিন ডিভাইসের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ডিভাইস স্ট্যাটাস
export const DEVICE_STATUS = {
  TRUSTED: 'trusted',
  PENDING: 'pending',
  BLOCKED: 'blocked',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
} as const;

// স্ট্যাটাসের কালার কোড
export const DEVICE_STATUS_COLORS = {
  TRUSTED: '#22C55E', // সবুজ
  PENDING: '#F59E0B', // কমলা
  BLOCKED: '#EF4444', // লাল
  REVOKED: '#DC2626', // গাঢ় লাল
  EXPIRED: '#94A3B8', // ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const DEVICE_STATUS_ICONS = {
  TRUSTED: '✅',
  PENDING: '⏳',
  BLOCKED: '🚫',
  REVOKED: '🔒',
  EXPIRED: '⏰',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const DEVICE_STATUS_DESCRIPTIONS = {
  TRUSTED: 'Device is trusted and verified',
  PENDING: 'Device is pending verification',
  BLOCKED: 'Device is blocked and cannot access',
  REVOKED: 'Device trust has been revoked',
  EXPIRED: 'Device trust has expired',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const DEVICE_STATUS_TRANSITIONS = {
  TRUSTED: ['expired', 'revoked', 'blocked'],
  PENDING: ['trusted', 'blocked', 'revoked', 'expired'],
  BLOCKED: ['revoked', 'expired'],
  REVOKED: ['expired'],
  EXPIRED: ['blocked', 'revoked'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const DEVICE_STATUS_PRIORITY = {
  TRUSTED: 1,
  PENDING: 2,
  BLOCKED: 3,
  REVOKED: 4,
  EXPIRED: 5,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const DEVICE_STATUS_LABELS_BN = {
  TRUSTED: 'বিশ্বস্ত',
  PENDING: 'মুলতুবি',
  BLOCKED: 'ব্লককৃত',
  REVOKED: 'বাতিল',
  EXPIRED: 'মেয়াদোত্তীর্ণ',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const DEVICE_STATUS_LABELS_EN = {
  TRUSTED: 'Trusted',
  PENDING: 'Pending',
  BLOCKED: 'Blocked',
  REVOKED: 'Revoked',
  EXPIRED: 'Expired',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const DEVICE_STATUS_CSS_CLASSES = {
  TRUSTED: 'status-trusted',
  PENDING: 'status-pending',
  BLOCKED: 'status-blocked',
  REVOKED: 'status-revoked',
  EXPIRED: 'status-expired',
} as const;

// স্ট্যাটাস গ্রুপ
export const DEVICE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['trusted', 'pending'],
  INACTIVE_STATUSES: ['blocked', 'revoked', 'expired'],
  POSITIVE_STATUSES: ['trusted'],
  NEGATIVE_STATUSES: ['blocked', 'revoked', 'expired'],
  ACTIONABLE_STATUSES: ['pending', 'blocked'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const DEVICE_STATUS_EMOJIS = {
  TRUSTED: '✔️',
  PENDING: '🕐',
  BLOCKED: '⛔',
  REVOKED: '🔐',
  EXPIRED: '⌛',
} as const;

// স্ট্যাটাস অ্যাকশন
export const DEVICE_STATUS_ACTIONS = {
  TRUSTED: ['revoke', 'block', 'expire'],
  PENDING: ['trust', 'block', 'revoke', 'expire'],
  BLOCKED: ['revoke', 'expire'],
  REVOKED: ['expire', 'block'],
  EXPIRED: ['block', 'revoke'],
} as const;

// স্ট্যাটাস টাইমআউট (দিনে)
export const DEVICE_STATUS_TIMEOUT = {
  TRUSTED: 0,
  PENDING: 7, // ৭ দিন
  BLOCKED: 0,
  REVOKED: 0,
  EXPIRED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const DEVICE_STATUS_VALIDATION = {
  TRUSTED: {
    canAccess: true,
    canTrust: false,
    canBlock: true,
    canRevoke: true,
    requiresMFA: false,
  },
  PENDING: {
    canAccess: false,
    canTrust: true,
    canBlock: true,
    canRevoke: true,
    requiresMFA: true,
  },
  BLOCKED: {
    canAccess: false,
    canTrust: false,
    canBlock: false,
    canRevoke: true,
    requiresMFA: false,
  },
  REVOKED: {
    canAccess: false,
    canTrust: false,
    canBlock: true,
    canRevoke: false,
    requiresMFA: false,
  },
  EXPIRED: {
    canAccess: false,
    canTrust: false,
    canBlock: true,
    canRevoke: true,
    requiresMFA: false,
  },
} as const;

// ডিফল্ট ডিভাইস স্ট্যাটাস
export const DEFAULT_DEVICE_STATUS = 'pending';

// ডিভাইস ট্রাস্ট এক্সপায়ারি চেক ইন্টারভাল (দিনে)
export const DEVICE_TRUST_EXPIRY_CHECK_INTERVAL = 1;

// ডিভাইস ক্লিনআপ এজ (দিনে)
export const DEVICE_CLEANUP_AGE = 365;

// ডিভাইস ব্লক রিজন
export const DEVICE_BLOCK_REASONS = {
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  MULTIPLE_FAILED_ATTEMPTS: 'multiple_failed_attempts',
  ADMIN_ACTION: 'admin_action',
  SYSTEM_AUTO: 'system_auto',
  SECURITY_BREACH: 'security_breach',
} as const;

// ডিভাইস রিভোক রিজন
export const DEVICE_REVOKE_REASONS = {
  USER_REQUEST: 'user_request',
  ADMIN_ACTION: 'admin_action',
  SECURITY_BREACH: 'security_breach',
  PASSWORD_CHANGE: 'password_change',
  DEVICE_LOST: 'device_lost',
} as const;

// ডিভাইস ট্রাস্ট স্কোর থ্রেশহোল্ড
export const DEVICE_TRUST_SCORE_THRESHOLD = {
  TRUSTED: 80,
  PENDING: 50,
  BLOCKED: 20,
  REVOKED: 0,
  EXPIRED: 0,
} as const;
