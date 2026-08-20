/**
 * অ্যাডমিন প্রিফারেন্সের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// প্রিফারেন্স স্ট্যাটাস
export const PREFERENCE_STATUS = {
  APPLIED: 'applied',
  PENDING: 'pending',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
} as const;

// স্ট্যাটাসের কালার কোড
export const PREFERENCE_STATUS_COLORS = {
  APPLIED: '#22C55E', // সবুজ
  PENDING: '#F59E0B', // কমলা
  REJECTED: '#EF4444', // লাল
  ARCHIVED: '#6B7280', // গাঢ় ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const PREFERENCE_STATUS_ICONS = {
  APPLIED: '✅',
  PENDING: '⏳',
  REJECTED: '❌',
  ARCHIVED: '📦',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const PREFERENCE_STATUS_DESCRIPTIONS = {
  APPLIED: 'Preference has been applied successfully',
  PENDING: 'Preference is pending approval',
  REJECTED: 'Preference has been rejected',
  ARCHIVED: 'Preference has been archived',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const PREFERENCE_STATUS_TRANSITIONS = {
  APPLIED: ['archived'],
  PENDING: ['applied', 'rejected', 'archived'],
  REJECTED: ['pending', 'archived'],
  ARCHIVED: ['applied'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const PREFERENCE_STATUS_PRIORITY = {
  APPLIED: 1,
  PENDING: 2,
  REJECTED: 3,
  ARCHIVED: 4,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const PREFERENCE_STATUS_LABELS_BN = {
  APPLIED: 'প্রয়োগকৃত',
  PENDING: 'মুলতুবি',
  REJECTED: 'প্রত্যাখ্যাত',
  ARCHIVED: 'আর্কাইভকৃত',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const PREFERENCE_STATUS_LABELS_EN = {
  APPLIED: 'Applied',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  ARCHIVED: 'Archived',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const PREFERENCE_STATUS_CSS_CLASSES = {
  APPLIED: 'status-applied',
  PENDING: 'status-pending',
  REJECTED: 'status-rejected',
  ARCHIVED: 'status-archived',
} as const;

// স্ট্যাটাস গ্রুপ
export const PREFERENCE_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['applied', 'pending'],
  INACTIVE_STATUSES: ['rejected', 'archived'],
  POSITIVE_STATUSES: ['applied'],
  NEGATIVE_STATUSES: ['rejected'],
  ACTIONABLE_STATUSES: ['pending'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const PREFERENCE_STATUS_EMOJIS = {
  APPLIED: '✔️',
  PENDING: '🕐',
  REJECTED: '✖️',
  ARCHIVED: '🗂️',
} as const;

// স্ট্যাটাস অ্যাকশন
export const PREFERENCE_STATUS_ACTIONS = {
  APPLIED: ['archive'],
  PENDING: ['apply', 'reject', 'archive'],
  REJECTED: ['review', 'archive'],
  ARCHIVED: ['restore'],
} as const;

// স্ট্যাটাস টাইমআউট (দিনে)
export const PREFERENCE_STATUS_TIMEOUT = {
  APPLIED: 0,
  PENDING: 7, // ৭ দিন
  REJECTED: 0,
  ARCHIVED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const PREFERENCE_STATUS_VALIDATION = {
  APPLIED: {
    canUpdate: true,
    canDelete: false,
    canArchive: true,
    canRestore: false,
    isActive: true,
  },
  PENDING: {
    canUpdate: false,
    canDelete: true,
    canArchive: true,
    canRestore: false,
    isActive: false,
  },
  REJECTED: {
    canUpdate: false,
    canDelete: true,
    canArchive: true,
    canRestore: false,
    isActive: false,
  },
  ARCHIVED: {
    canUpdate: false,
    canDelete: true,
    canArchive: false,
    canRestore: true,
    isActive: false,
  },
} as const;

// ডিফল্ট প্রিফারেন্স স্ট্যাটাস
export const DEFAULT_PREFERENCE_STATUS = 'applied';

// প্রিফারেন্স স্ট্যাটাস চেক ইন্টারভাল (ঘন্টায়)
export const PREFERENCE_STATUS_CHECK_INTERVAL = 24;

// প্রিফারেন্স স্ট্যাটাস ক্লিনআপ ইন্টারভাল (দিনে)
export const PREFERENCE_STATUS_CLEANUP_INTERVAL = 30;

// প্রিফারেন্স রিজেক্ট রিজন
export const PREFERENCE_REJECT_REASONS = {
  INVALID_CONFIG: 'invalid_config',
  SECURITY_ISSUE: 'security_issue',
  DUPLICATE: 'duplicate',
  POLICY_VIOLATION: 'policy_violation',
  USER_REQUEST: 'user_request',
} as const;

// প্রিফারেন্স আর্কাইভ রিজন
export const PREFERENCE_ARCHIVE_REASONS = {
  OBSOLETE: 'obsolete',
  DEPRECATED: 'deprecated',
  USER_REQUEST: 'user_request',
  ADMIN_ACTION: 'admin_action',
} as const;

// প্রিফারেন্স রিভিউ টাইমআউট (দিনে)
export const PREFERENCE_REVIEW_TIMEOUT = 14;

// প্রিফারেন্স ট্রানজিশন টাইম (মিলিসেকেন্ডে)
export const PREFERENCE_TRANSITION_TIME = 500;
