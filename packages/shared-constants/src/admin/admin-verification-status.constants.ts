/**
 * অ্যাডমিন ভেরিফিকেশনের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// ভেরিফিকেশন স্ট্যাটাস
export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
} as const;

// স্ট্যাটাসের কালার কোড
export const VERIFICATION_STATUS_COLORS = {
  PENDING: '#F59E0B', // কমলা
  VERIFIED: '#22C55E', // সবুজ
  REJECTED: '#EF4444', // লাল
  EXPIRED: '#94A3B8', // ধূসর
  CANCELLED: '#6B7280', // গাঢ় ধূসর
  FAILED: '#DC2626', // গাঢ় লাল
} as const;

// স্ট্যাটাসের আইকন
export const VERIFICATION_STATUS_ICONS = {
  PENDING: '⏳',
  VERIFIED: '✅',
  REJECTED: '❌',
  EXPIRED: '⏰',
  CANCELLED: '🚫',
  FAILED: '💥',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const VERIFICATION_STATUS_DESCRIPTIONS = {
  PENDING: 'Verification is pending review',
  VERIFIED: 'Verification has been completed successfully',
  REJECTED: 'Verification has been rejected',
  EXPIRED: 'Verification has expired',
  CANCELLED: 'Verification was cancelled by user',
  FAILED: 'Verification has failed due to an error',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const VERIFICATION_STATUS_TRANSITIONS = {
  PENDING: ['verified', 'rejected', 'expired', 'cancelled', 'failed'],
  VERIFIED: ['expired', 'cancelled'],
  REJECTED: ['pending', 'expired', 'cancelled'],
  EXPIRED: ['pending', 'cancelled'],
  CANCELLED: ['pending'],
  FAILED: ['pending', 'expired', 'cancelled'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const VERIFICATION_STATUS_PRIORITY = {
  PENDING: 2,
  VERIFIED: 5,
  REJECTED: 3,
  EXPIRED: 4,
  CANCELLED: 6,
  FAILED: 1,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const VERIFICATION_STATUS_LABELS_BN = {
  PENDING: 'মুলতুবি',
  VERIFIED: 'যাচাইকৃত',
  REJECTED: 'প্রত্যাখ্যাত',
  EXPIRED: 'মেয়াদোত্তীর্ণ',
  CANCELLED: 'বাতিল',
  FAILED: 'ব্যর্থ',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const VERIFICATION_STATUS_LABELS_EN = {
  PENDING: 'Pending',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected',
  EXPIRED: 'Expired',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const VERIFICATION_STATUS_CSS_CLASSES = {
  PENDING: 'status-pending',
  VERIFIED: 'status-verified',
  REJECTED: 'status-rejected',
  EXPIRED: 'status-expired',
  CANCELLED: 'status-cancelled',
  FAILED: 'status-failed',
} as const;

// স্ট্যাটাস গ্রুপ
export const VERIFICATION_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['pending', 'verified'],
  INACTIVE_STATUSES: ['rejected', 'expired', 'cancelled', 'failed'],
  POSITIVE_STATUSES: ['verified'],
  NEGATIVE_STATUSES: ['rejected', 'failed'],
  ACTIONABLE_STATUSES: ['pending', 'rejected', 'expired', 'failed'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const VERIFICATION_STATUS_EMOJIS = {
  PENDING: '🕐',
  VERIFIED: '✔️',
  REJECTED: '✖️',
  EXPIRED: '⌛',
  CANCELLED: '⛔',
  FAILED: '💔',
} as const;

// স্ট্যাটাস অ্যাকশন
export const VERIFICATION_STATUS_ACTIONS = {
  PENDING: ['verify', 'reject', 'expire', 'cancel', 'fail'],
  VERIFIED: ['expire', 'cancel'],
  REJECTED: ['retry', 'expire', 'cancel'],
  EXPIRED: ['retry', 'cancel'],
  CANCELLED: ['retry'],
  FAILED: ['retry', 'expire', 'cancel'],
} as const;

// স্ট্যাটাস টাইমআউট (ঘন্টায়)
export const VERIFICATION_STATUS_TIMEOUT = {
  PENDING: 48, // ৪৮ ঘন্টা
  VERIFIED: 0,
  REJECTED: 0,
  EXPIRED: 0,
  CANCELLED: 0,
  FAILED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const VERIFICATION_STATUS_VALIDATION = {
  PENDING: {
    canVerify: true,
    canReject: true,
    canCancel: true,
    canExpire: true,
    canFail: true,
  },
  VERIFIED: {
    canVerify: false,
    canReject: false,
    canCancel: true,
    canExpire: true,
    canFail: false,
  },
  REJECTED: {
    canVerify: false,
    canReject: false,
    canCancel: true,
    canExpire: true,
    canFail: false,
  },
  EXPIRED: {
    canVerify: false,
    canReject: false,
    canCancel: true,
    canExpire: false,
    canFail: false,
  },
  CANCELLED: {
    canVerify: false,
    canReject: false,
    canCancel: false,
    canExpire: false,
    canFail: false,
  },
  FAILED: {
    canVerify: false,
    canReject: false,
    canCancel: true,
    canExpire: true,
    canFail: false,
  },
} as const;

// ডিফল্ট ভেরিফিকেশন স্ট্যাটাস
export const DEFAULT_VERIFICATION_STATUS = 'pending';

// ভেরিফিকেশন রিট্রাই ম্যাক্স অ্যাটেম্পট
export const VERIFICATION_RETRY_MAX_ATTEMPTS = 3;

// ভেরিফিকেশন রিট্রাই টাইমআউট (ঘন্টায়)
export const VERIFICATION_RETRY_TIMEOUT = 24;

// ভেরিফিকেশন এক্সপাইরি চেক ইন্টারভাল (ঘন্টায়)
export const VERIFICATION_EXPIRY_CHECK_INTERVAL = 1;
