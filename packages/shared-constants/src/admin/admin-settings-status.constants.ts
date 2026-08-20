/**
 * অ্যাডমিন সেটিংসের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// সেটিংস স্ট্যাটাস
export const SETTINGS_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING_REVIEW: 'pending_review',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
} as const;

// স্ট্যাটাসের কালার কোড
export const SETTINGS_STATUS_COLORS = {
  ACTIVE: '#22C55E', // সবুজ
  INACTIVE: '#94A3B8', // ধূসর
  PENDING_REVIEW: '#F59E0B', // কমলা
  REJECTED: '#EF4444', // লাল
  ARCHIVED: '#6B7280', // গাঢ় ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const SETTINGS_STATUS_ICONS = {
  ACTIVE: '✅',
  INACTIVE: '⭕',
  PENDING_REVIEW: '🔄',
  REJECTED: '❌',
  ARCHIVED: '📦',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const SETTINGS_STATUS_DESCRIPTIONS = {
  ACTIVE: 'Setting is active and in use',
  INACTIVE: 'Setting is inactive and not in use',
  PENDING_REVIEW: 'Setting is pending review',
  REJECTED: 'Setting has been rejected',
  ARCHIVED: 'Setting has been archived',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const SETTINGS_STATUS_TRANSITIONS = {
  ACTIVE: ['inactive', 'pending_review', 'archived'],
  INACTIVE: ['active', 'pending_review', 'archived'],
  PENDING_REVIEW: ['active', 'inactive', 'rejected', 'archived'],
  REJECTED: ['pending_review', 'archived'],
  ARCHIVED: ['active', 'inactive'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const SETTINGS_STATUS_PRIORITY = {
  ACTIVE: 1,
  INACTIVE: 4,
  PENDING_REVIEW: 2,
  REJECTED: 5,
  ARCHIVED: 3,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const SETTINGS_STATUS_LABELS_BN = {
  ACTIVE: 'সক্রিয়',
  INACTIVE: 'নিষ্ক্রিয়',
  PENDING_REVIEW: 'রিভিউ চলমান',
  REJECTED: 'প্রত্যাখ্যাত',
  ARCHIVED: 'আর্কাইভকৃত',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const SETTINGS_STATUS_LABELS_EN = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING_REVIEW: 'Pending Review',
  REJECTED: 'Rejected',
  ARCHIVED: 'Archived',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const SETTINGS_STATUS_CSS_CLASSES = {
  ACTIVE: 'status-active',
  INACTIVE: 'status-inactive',
  PENDING_REVIEW: 'status-pending',
  REJECTED: 'status-rejected',
  ARCHIVED: 'status-archived',
} as const;

// স্ট্যাটাস গ্রুপ
export const SETTINGS_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['active', 'pending_review'],
  INACTIVE_STATUSES: ['inactive', 'rejected', 'archived'],
  POSITIVE_STATUSES: ['active'],
  NEGATIVE_STATUSES: ['rejected'],
  ACTIONABLE_STATUSES: ['pending_review', 'inactive'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const SETTINGS_STATUS_EMOJIS = {
  ACTIVE: '✔️',
  INACTIVE: '⏸️',
  PENDING_REVIEW: '🔄',
  REJECTED: '✖️',
  ARCHIVED: '🗂️',
} as const;

// স্ট্যাটাস অ্যাকশন
export const SETTINGS_STATUS_ACTIONS = {
  ACTIVE: ['deactivate', 'pending', 'archive'],
  INACTIVE: ['activate', 'pending', 'archive'],
  PENDING_REVIEW: ['approve', 'reject', 'archive'],
  REJECTED: ['review', 'archive'],
  ARCHIVED: ['restore', 'delete'],
} as const;

// স্ট্যাটাস টাইমআউট (দিনে)
export const SETTINGS_STATUS_TIMEOUT = {
  ACTIVE: 0,
  INACTIVE: 0,
  PENDING_REVIEW: 14, // ১৪ দিন
  REJECTED: 0,
  ARCHIVED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const SETTINGS_STATUS_VALIDATION = {
  ACTIVE: {
    canUpdate: true,
    canDelete: false,
    canArchive: true,
    canRestore: false,
    isEditable: true,
  },
  INACTIVE: {
    canUpdate: true,
    canDelete: true,
    canArchive: true,
    canRestore: false,
    isEditable: true,
  },
  PENDING_REVIEW: {
    canUpdate: false,
    canDelete: false,
    canArchive: true,
    canRestore: false,
    isEditable: false,
  },
  REJECTED: {
    canUpdate: false,
    canDelete: true,
    canArchive: true,
    canRestore: false,
    isEditable: false,
  },
  ARCHIVED: {
    canUpdate: false,
    canDelete: true,
    canArchive: false,
    canRestore: true,
    isEditable: false,
  },
} as const;

// ডিফল্ট সেটিংস স্ট্যাটাস
export const DEFAULT_SETTINGS_STATUS = 'active';

// সেটিংস স্ট্যাটাস চেক ইন্টারভাল (ঘন্টায়)
export const SETTINGS_STATUS_CHECK_INTERVAL = 24;

// সেটিংস স্ট্যাটাস ক্লিনআপ ইন্টারভাল (দিনে)
export const SETTINGS_STATUS_CLEANUP_INTERVAL = 30;

// সেটিংস রিভিউ টাইমআউট (দিনে)
export const SETTINGS_REVIEW_TIMEOUT = 14;

// সেটিংস আর্কাইভ রিজন
export const SETTINGS_ARCHIVE_REASONS = {
  OBSOLETE: 'obsolete',
  DEPRECATED: 'deprecated',
  REPLACED: 'replaced',
  USER_REQUEST: 'user_request',
  ADMIN_ACTION: 'admin_action',
} as const;

// সেটিংস রিজেক্ট রিজন
export const SETTINGS_REJECT_REASONS = {
  INVALID_VALUE: 'invalid_value',
  SECURITY_ISSUE: 'security_issue',
  DUPLICATE: 'duplicate',
  POLICY_VIOLATION: 'policy_violation',
  USER_REQUEST: 'user_request',
} as const;
