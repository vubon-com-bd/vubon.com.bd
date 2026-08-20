/**
 * অ্যাডমিন বায়োমেট্রিকের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// বায়োমেট্রিক স্ট্যাটাস
export const BIOMETRIC_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING_SETUP: 'pending_setup',
  PENDING_VERIFICATION: 'pending_verification',
  BLOCKED: 'blocked',
  EXPIRED: 'expired',
} as const;

// স্ট্যাটাসের কালার কোড
export const BIOMETRIC_STATUS_COLORS = {
  ACTIVE: '#22C55E', // সবুজ
  INACTIVE: '#94A3B8', // ধূসর
  PENDING_SETUP: '#F59E0B', // কমলা
  PENDING_VERIFICATION: '#3B82F6', // নীল
  BLOCKED: '#EF4444', // লাল
  EXPIRED: '#6B7280', // গাঢ় ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const BIOMETRIC_STATUS_ICONS = {
  ACTIVE: '✅',
  INACTIVE: '⭕',
  PENDING_SETUP: '🔧',
  PENDING_VERIFICATION: '🔄',
  BLOCKED: '🚫',
  EXPIRED: '⏰',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const BIOMETRIC_STATUS_DESCRIPTIONS = {
  ACTIVE: 'Biometric authentication is active',
  INACTIVE: 'Biometric authentication is inactive',
  PENDING_SETUP: 'Biometric setup in progress',
  PENDING_VERIFICATION: 'Biometric verification pending',
  BLOCKED: 'Biometric authentication is blocked',
  EXPIRED: 'Biometric authentication has expired',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const BIOMETRIC_STATUS_TRANSITIONS = {
  ACTIVE: ['inactive', 'blocked', 'expired'],
  INACTIVE: ['pending_setup', 'active'],
  PENDING_SETUP: ['active', 'inactive', 'pending_verification'],
  PENDING_VERIFICATION: ['active', 'inactive', 'blocked'],
  BLOCKED: ['inactive', 'pending_setup'],
  EXPIRED: ['inactive', 'pending_setup'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const BIOMETRIC_STATUS_PRIORITY = {
  ACTIVE: 1,
  INACTIVE: 5,
  PENDING_SETUP: 3,
  PENDING_VERIFICATION: 2,
  BLOCKED: 4,
  EXPIRED: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const BIOMETRIC_STATUS_LABELS_BN = {
  ACTIVE: 'সক্রিয়',
  INACTIVE: 'নিষ্ক্রিয়',
  PENDING_SETUP: 'সেটআপ চলমান',
  PENDING_VERIFICATION: 'যাচাইকরণ চলমান',
  BLOCKED: 'ব্লককৃত',
  EXPIRED: 'মেয়াদোত্তীর্ণ',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const BIOMETRIC_STATUS_LABELS_EN = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING_SETUP: 'Pending Setup',
  PENDING_VERIFICATION: 'Pending Verification',
  BLOCKED: 'Blocked',
  EXPIRED: 'Expired',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const BIOMETRIC_STATUS_CSS_CLASSES = {
  ACTIVE: 'status-active',
  INACTIVE: 'status-inactive',
  PENDING_SETUP: 'status-pending-setup',
  PENDING_VERIFICATION: 'status-pending-verification',
  BLOCKED: 'status-blocked',
  EXPIRED: 'status-expired',
} as const;

// স্ট্যাটাস গ্রুপ
export const BIOMETRIC_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'pending_setup', 'pending_verification'],
  INACTIVE_STATUSES: ['inactive', 'blocked', 'expired'],
  POSITIVE_STATUSES: ['active'],
  NEGATIVE_STATUSES: ['blocked', 'expired'],
  ACTIONABLE_STATUSES: ['pending_setup', 'pending_verification'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const BIOMETRIC_STATUS_EMOJIS = {
  ACTIVE: '✔️',
  INACTIVE: '✖️',
  PENDING_SETUP: '🔧',
  PENDING_VERIFICATION: '🔄',
  BLOCKED: '⛔',
  EXPIRED: '⌛',
} as const;

// স্ট্যাটাস অ্যাকশন
export const BIOMETRIC_STATUS_ACTIONS = {
  ACTIVE: ['deactivate', 'block', 'expire'],
  INACTIVE: ['setup', 'activate'],
  PENDING_SETUP: ['complete', 'cancel', 'verify'],
  PENDING_VERIFICATION: ['verify', 'cancel', 'block'],
  BLOCKED: ['unblock', 'expire'],
  EXPIRED: ['reactivate', 'inactivate'],
} as const;

// স্ট্যাটাস টাইমআউট (দিনে)
export const BIOMETRIC_STATUS_TIMEOUT = {
  ACTIVE: 0,
  INACTIVE: 0,
  PENDING_SETUP: 7, // ৭ দিন
  PENDING_VERIFICATION: 3, // ৩ দিন
  BLOCKED: 0,
  EXPIRED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const BIOMETRIC_STATUS_VALIDATION = {
  ACTIVE: {
    canAuthenticate: true,
    canSetup: false,
    canVerify: false,
    canBlock: true,
    canDeactivate: true,
  },
  INACTIVE: {
    canAuthenticate: false,
    canSetup: true,
    canVerify: false,
    canBlock: false,
    canDeactivate: false,
  },
  PENDING_SETUP: {
    canAuthenticate: false,
    canSetup: true,
    canVerify: false,
    canBlock: false,
    canDeactivate: true,
  },
  PENDING_VERIFICATION: {
    canAuthenticate: false,
    canSetup: false,
    canVerify: true,
    canBlock: true,
    canDeactivate: true,
  },
  BLOCKED: {
    canAuthenticate: false,
    canSetup: false,
    canVerify: false,
    canBlock: false,
    canDeactivate: true,
  },
  EXPIRED: {
    canAuthenticate: false,
    canSetup: true,
    canVerify: false,
    canBlock: false,
    canDeactivate: true,
  },
} as const;

// ডিফল্ট বায়োমেট্রিক স্ট্যাটাস
export const DEFAULT_BIOMETRIC_STATUS = 'inactive';

// বায়োমেট্রিক স্ট্যাটাস চেক ইন্টারভাল (দিনে)
export const BIOMETRIC_STATUS_CHECK_INTERVAL = 1;

// বায়োমেট্রিক স্ট্যাটাস ক্লিনআপ ইন্টারভাল (দিনে)
export const BIOMETRIC_STATUS_CLEANUP_INTERVAL = 7;

// বায়োমেট্রিক ব্লক রিজন
export const BIOMETRIC_BLOCK_REASONS = {
  MULTIPLE_FAILURES: 'multiple_failures',
  ADMIN_ACTION: 'admin_action',
  SECURITY_BREACH: 'security_breach',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  USER_REQUEST: 'user_request',
} as const;

// বায়োমেট্রিক এক্সপাইর রিজন
export const BIOMETRIC_EXPIRE_REASONS = {
  TIME_LIMIT: 'time_limit',
  DEVICE_CHANGE: 'device_change',
  SYSTEM_UPDATE: 'system_update',
  USER_REQUEST: 'user_request',
} as const;
