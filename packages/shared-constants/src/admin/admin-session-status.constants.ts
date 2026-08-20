/**
 * অ্যাডমিন সেশানের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// সেশান স্ট্যাটাস
export const SESSION_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
  REVOKED: 'revoked',
  PENDING: 'pending',
} as const;

// স্ট্যাটাসের কালার কোড
export const SESSION_STATUS_COLORS = {
  ACTIVE: '#22C55E', // সবুজ
  EXPIRED: '#94A3B8', // ধূসর
  TERMINATED: '#EF4444', // লাল
  REVOKED: '#DC2626', // গাঢ় লাল
  PENDING: '#F59E0B', // কমলা
} as const;

// স্ট্যাটাসের আইকন
export const SESSION_STATUS_ICONS = {
  ACTIVE: '🟢',
  EXPIRED: '⏰',
  TERMINATED: '🚫',
  REVOKED: '🔒',
  PENDING: '⏳',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const SESSION_STATUS_DESCRIPTIONS = {
  ACTIVE: 'Session is currently active',
  EXPIRED: 'Session has expired due to timeout',
  TERMINATED: 'Session was terminated by user',
  REVOKED: 'Session was revoked by admin',
  PENDING: 'Session is pending activation',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const SESSION_STATUS_TRANSITIONS = {
  ACTIVE: ['expired', 'terminated', 'revoked'],
  EXPIRED: ['terminated', 'revoked'],
  TERMINATED: ['revoked'],
  REVOKED: [],
  PENDING: ['active', 'expired', 'terminated', 'revoked'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const SESSION_STATUS_PRIORITY = {
  ACTIVE: 1,
  EXPIRED: 3,
  TERMINATED: 2,
  REVOKED: 4,
  PENDING: 5,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const SESSION_STATUS_LABELS_BN = {
  ACTIVE: 'সক্রিয়',
  EXPIRED: 'মেয়াদোত্তীর্ণ',
  TERMINATED: 'সমাপ্ত',
  REVOKED: 'বাতিল',
  PENDING: 'মুলতুবি',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const SESSION_STATUS_LABELS_EN = {
  ACTIVE: 'Active',
  EXPIRED: 'Expired',
  TERMINATED: 'Terminated',
  REVOKED: 'Revoked',
  PENDING: 'Pending',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const SESSION_STATUS_CSS_CLASSES = {
  ACTIVE: 'status-active',
  EXPIRED: 'status-expired',
  TERMINATED: 'status-terminated',
  REVOKED: 'status-revoked',
  PENDING: 'status-pending',
} as const;

// স্ট্যাটাস গ্রুপ
export const SESSION_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'pending'],
  INACTIVE_STATUSES: ['expired', 'terminated', 'revoked'],
  TERMINAL_STATUSES: ['terminated', 'revoked'],
  USER_ACTION_STATUSES: ['terminated', 'pending'],
  SYSTEM_ACTION_STATUSES: ['expired', 'revoked'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const SESSION_STATUS_EMOJIS = {
  ACTIVE: '✅',
  EXPIRED: '⌛',
  TERMINATED: '❌',
  REVOKED: '🔐',
  PENDING: '🕐',
} as const;

// স্ট্যাটাস অ্যাকশন
export const SESSION_STATUS_ACTIONS = {
  ACTIVE: ['terminate', 'revoke'],
  EXPIRED: ['terminate', 'revoke'],
  TERMINATED: ['revoke'],
  REVOKED: [],
  PENDING: ['activate', 'terminate', 'revoke'],
} as const;

// স্ট্যাটাস টাইমআউট (মিনিটে)
export const SESSION_STATUS_TIMEOUT = {
  ACTIVE: 0,
  EXPIRED: 0,
  TERMINATED: 0,
  REVOKED: 0,
  PENDING: 60, // ১ ঘন্টা
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const SESSION_STATUS_VALIDATION = {
  ACTIVE: {
    canTerminate: true,
    canRevoke: true,
    canRenew: true,
    isActive: true,
  },
  EXPIRED: {
    canTerminate: true,
    canRevoke: true,
    canRenew: false,
    isActive: false,
  },
  TERMINATED: {
    canTerminate: false,
    canRevoke: true,
    canRenew: false,
    isActive: false,
  },
  REVOKED: {
    canTerminate: false,
    canRevoke: false,
    canRenew: false,
    isActive: false,
  },
  PENDING: {
    canTerminate: true,
    canRevoke: true,
    canRenew: false,
    isActive: false,
  },
} as const;

// ডিফল্ট সেশান স্ট্যাটাস
export const DEFAULT_SESSION_STATUS = 'pending';

// সেশান এক্সপায়ারি চেক ইন্টারভাল (মিনিটে)
export const SESSION_EXPIRY_CHECK_INTERVAL = 5;

// সেশান ক্লিনআপ এজ (ঘন্টায়)
export const SESSION_CLEANUP_AGE = 24;

// সেশান রিভোকেশন রিজন
export const SESSION_REVOCATION_REASONS = {
  ADMIN_ACTION: 'admin_action',
  SECURITY_BREACH: 'security_breach',
  PASSWORD_CHANGE: 'password_change',
  USER_REQUEST: 'user_request',
  SYSTEM_AUTO: 'system_auto',
} as const;

// সেশান টার্মিনেশন রিজন
export const SESSION_TERMINATION_REASONS = {
  USER_LOGOUT: 'user_logout',
  TIMEOUT: 'timeout',
  INACTIVITY: 'inactivity',
  ADMIN_ACTION: 'admin_action',
  DEVICE_CHANGE: 'device_change',
} as const;
