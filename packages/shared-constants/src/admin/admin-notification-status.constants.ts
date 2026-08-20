/**
 * অ্যাডমিন নোটিফিকেশনের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// নোটিফিকেশন স্ট্যাটাস
export const NOTIFICATION_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  DISMISSED: 'dismissed',
  FAILED: 'failed',
  PENDING: 'pending',
} as const;

// স্ট্যাটাসের কালার কোড
export const NOTIFICATION_STATUS_COLORS = {
  SENT: '#3B82F6', // নীল
  DELIVERED: '#22C55E', // সবুজ
  READ: '#06B6D4', // সায়ান
  DISMISSED: '#94A3B8', // ধূসর
  FAILED: '#EF4444', // লাল
  PENDING: '#F59E0B', // কমলা
} as const;

// স্ট্যাটাসের আইকন
export const NOTIFICATION_STATUS_ICONS = {
  SENT: '📤',
  DELIVERED: '📬',
  READ: '📖',
  DISMISSED: '🗑️',
  FAILED: '💥',
  PENDING: '⏳',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const NOTIFICATION_STATUS_DESCRIPTIONS = {
  SENT: 'Notification has been sent',
  DELIVERED: 'Notification has been delivered',
  READ: 'Notification has been read',
  DISMISSED: 'Notification has been dismissed',
  FAILED: 'Notification delivery has failed',
  PENDING: 'Notification is pending delivery',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const NOTIFICATION_STATUS_TRANSITIONS = {
  SENT: ['delivered', 'failed'],
  DELIVERED: ['read', 'dismissed'],
  READ: ['dismissed'],
  DISMISSED: [],
  FAILED: ['pending', 'sent'],
  PENDING: ['sent', 'delivered', 'failed'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const NOTIFICATION_STATUS_PRIORITY = {
  SENT: 3,
  DELIVERED: 2,
  READ: 4,
  DISMISSED: 5,
  FAILED: 1,
  PENDING: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const NOTIFICATION_STATUS_LABELS_BN = {
  SENT: 'প্রেরিত',
  DELIVERED: 'প্রদানকৃত',
  READ: 'পঠিত',
  DISMISSED: 'বাদ দেওয়া',
  FAILED: 'ব্যর্থ',
  PENDING: 'মুলতুবি',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const NOTIFICATION_STATUS_LABELS_EN = {
  SENT: 'Sent',
  DELIVERED: 'Delivered',
  READ: 'Read',
  DISMISSED: 'Dismissed',
  FAILED: 'Failed',
  PENDING: 'Pending',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const NOTIFICATION_STATUS_CSS_CLASSES = {
  SENT: 'status-sent',
  DELIVERED: 'status-delivered',
  READ: 'status-read',
  DISMISSED: 'status-dismissed',
  FAILED: 'status-failed',
  PENDING: 'status-pending',
} as const;

// স্ট্যাটাস গ্রুপ
export const NOTIFICATION_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['sent', 'delivered', 'pending'],
  TERMINAL_STATUSES: ['read', 'dismissed', 'failed'],
  POSITIVE_STATUSES: ['sent', 'delivered', 'read'],
  NEGATIVE_STATUSES: ['failed'],
  ACTIONABLE_STATUSES: ['pending', 'failed'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const NOTIFICATION_STATUS_EMOJIS = {
  SENT: '✉️',
  DELIVERED: '📨',
  READ: '👀',
  DISMISSED: '🗑️',
  FAILED: '💔',
  PENDING: '⏰',
} as const;

// স্ট্যাটাস অ্যাকশন
export const NOTIFICATION_STATUS_ACTIONS = {
  SENT: ['deliver', 'fail'],
  DELIVERED: ['read', 'dismiss'],
  READ: ['dismiss'],
  DISMISSED: [],
  FAILED: ['retry'],
  PENDING: ['send', 'deliver', 'fail'],
} as const;

// স্ট্যাটাস টাইমআউট (ঘন্টায়)
export const NOTIFICATION_STATUS_TIMEOUT = {
  SENT: 24,
  DELIVERED: 48,
  READ: 0,
  DISMISSED: 0,
  FAILED: 0,
  PENDING: 12,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const NOTIFICATION_STATUS_VALIDATION = {
  SENT: {
    canDeliver: true,
    canFail: true,
    canRead: false,
    canDismiss: false,
    isActive: true,
  },
  DELIVERED: {
    canDeliver: false,
    canFail: false,
    canRead: true,
    canDismiss: true,
    isActive: true,
  },
  READ: {
    canDeliver: false,
    canFail: false,
    canRead: false,
    canDismiss: true,
    isActive: false,
  },
  DISMISSED: {
    canDeliver: false,
    canFail: false,
    canRead: false,
    canDismiss: false,
    isActive: false,
  },
  FAILED: {
    canDeliver: false,
    canFail: false,
    canRead: false,
    canDismiss: false,
    isActive: false,
  },
  PENDING: {
    canDeliver: false,
    canFail: false,
    canRead: false,
    canDismiss: false,
    isActive: true,
  },
} as const;

// ডিফল্ট নোটিফিকেশন স্ট্যাটাস
export const DEFAULT_NOTIFICATION_STATUS = 'pending';

// নোটিফিকেশন স্ট্যাটাস চেক ইন্টারভাল (মিনিটে)
export const NOTIFICATION_STATUS_CHECK_INTERVAL = 5;

// নোটিফিকেশন স্ট্যাটাস ক্লিনআপ ইন্টারভাল (ঘন্টায়)
export const NOTIFICATION_STATUS_CLEANUP_INTERVAL = 24;

// নোটিফিকেশন ফেইল রিজন
export const NOTIFICATION_FAIL_REASONS = {
  INVALID_EMAIL: 'invalid_email',
  INVALID_PHONE: 'invalid_phone',
  SERVICE_UNAVAILABLE: 'service_unavailable',
  RATE_LIMIT: 'rate_limit',
  BLOCKED: 'blocked',
  UNSUBSCRIBED: 'unsubscribed',
} as const;

// নোটিফিকেশন ডিসমিস রিজন
export const NOTIFICATION_DISMISS_REASONS = {
  USER_ACTION: 'user_action',
  AUTO_DISMISS: 'auto_dismiss',
  ADMIN_ACTION: 'admin_action',
} as const;
