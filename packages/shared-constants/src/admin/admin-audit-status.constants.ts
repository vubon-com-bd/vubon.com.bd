/**
 * অ্যাডমিন অডিটের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অডিট স্ট্যাটাস
export const AUDIT_STATUS = {
  PENDING_REVIEW: 'pending_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  FLAGGED: 'flagged',
  INVESTIGATED: 'investigated',
  ARCHIVED: 'archived',
} as const;

// স্ট্যাটাসের কালার কোড
export const AUDIT_STATUS_COLORS = {
  PENDING_REVIEW: '#F59E0B', // কমলা
  APPROVED: '#22C55E', // সবুজ
  REJECTED: '#EF4444', // লাল
  FLAGGED: '#DC2626', // গাঢ় লাল
  INVESTIGATED: '#3B82F6', // নীল
  ARCHIVED: '#94A3B8', // ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const AUDIT_STATUS_ICONS = {
  PENDING_REVIEW: '⌛',
  APPROVED: '✅',
  REJECTED: '❌',
  FLAGGED: '⚠️',
  INVESTIGATED: '🔍',
  ARCHIVED: '📦',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const AUDIT_STATUS_DESCRIPTIONS = {
  PENDING_REVIEW: 'Audit entry is pending review',
  APPROVED: 'Audit entry has been approved',
  REJECTED: 'Audit entry has been rejected',
  FLAGGED: 'Audit entry has been flagged for investigation',
  INVESTIGATED: 'Audit entry has been investigated',
  ARCHIVED: 'Audit entry has been archived',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const AUDIT_STATUS_TRANSITIONS = {
  PENDING_REVIEW: ['approved', 'rejected', 'flagged', 'archived'],
  APPROVED: ['investigated', 'archived'],
  REJECTED: ['pending_review', 'archived'],
  FLAGGED: ['investigated', 'pending_review', 'archived'],
  INVESTIGATED: ['approved', 'rejected', 'archived'],
  ARCHIVED: [],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const AUDIT_STATUS_PRIORITY = {
  PENDING_REVIEW: 3,
  APPROVED: 5,
  REJECTED: 4,
  FLAGGED: 1,
  INVESTIGATED: 2,
  ARCHIVED: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const AUDIT_STATUS_LABELS_BN = {
  PENDING_REVIEW: 'রিভিউ অপেক্ষমান',
  APPROVED: 'অনুমোদিত',
  REJECTED: 'প্রত্যাখ্যাত',
  FLAGGED: 'চিহ্নিত',
  INVESTIGATED: 'তদন্তকৃত',
  ARCHIVED: 'আর্কাইভকৃত',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const AUDIT_STATUS_LABELS_EN = {
  PENDING_REVIEW: 'Pending Review',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  FLAGGED: 'Flagged',
  INVESTIGATED: 'Investigated',
  ARCHIVED: 'Archived',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const AUDIT_STATUS_CSS_CLASSES = {
  PENDING_REVIEW: 'status-pending',
  APPROVED: 'status-approved',
  REJECTED: 'status-rejected',
  FLAGGED: 'status-flagged',
  INVESTIGATED: 'status-investigated',
  ARCHIVED: 'status-archived',
} as const;

// স্ট্যাটাস গ্রুপ
export const AUDIT_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['pending_review', 'flagged', 'investigated'],
  TERMINAL_STATUSES: ['approved', 'rejected', 'archived'],
  POSITIVE_STATUSES: ['approved', 'investigated'],
  NEGATIVE_STATUSES: ['rejected', 'flagged'],
  STORAGE_STATUSES: ['archived'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const AUDIT_STATUS_EMOJIS = {
  PENDING_REVIEW: '🕒',
  APPROVED: '✔️',
  REJECTED: '✖️',
  FLAGGED: '🚩',
  INVESTIGATED: '🔬',
  ARCHIVED: '🗃️',
} as const;

// স্ট্যাটাস অ্যাকশন
export const AUDIT_STATUS_ACTIONS = {
  PENDING_REVIEW: ['approve', 'reject', 'flag', 'archive'],
  APPROVED: ['investigate', 'archive'],
  REJECTED: ['review', 'archive'],
  FLAGGED: ['investigate', 'review', 'archive'],
  INVESTIGATED: ['approve', 'reject', 'archive'],
  ARCHIVED: [],
} as const;

// স্ট্যাটাস টাইমআউট (ঘন্টায়)
export const AUDIT_STATUS_TIMEOUT = {
  PENDING_REVIEW: 48, // ৪৮ ঘন্টা
  APPROVED: 0,
  REJECTED: 0,
  FLAGGED: 24, // ২৪ ঘন্টা
  INVESTIGATED: 0,
  ARCHIVED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const AUDIT_STATUS_VALIDATION = {
  PENDING_REVIEW: {
    canReject: true,
    canApprove: true,
    canFlag: true,
    canArchive: true,
    requiresAction: true,
  },
  APPROVED: {
    canReject: false,
    canApprove: false,
    canFlag: false,
    canArchive: true,
    requiresAction: false,
  },
  REJECTED: {
    canReject: false,
    canApprove: false,
    canFlag: false,
    canArchive: true,
    requiresAction: false,
  },
  FLAGGED: {
    canReject: false,
    canApprove: false,
    canFlag: false,
    canArchive: true,
    requiresAction: true,
  },
  INVESTIGATED: {
    canReject: false,
    canApprove: false,
    canFlag: false,
    canArchive: true,
    requiresAction: false,
  },
  ARCHIVED: {
    canReject: false,
    canApprove: false,
    canFlag: false,
    canArchive: false,
    requiresAction: false,
  },
} as const;

// ডিফল্ট অডিট স্ট্যাটাস
export const DEFAULT_AUDIT_STATUS = 'pending_review';

// অডিট রিভিউ টাইমআউট (মিনিটে)
export const AUDIT_REVIEW_TIMEOUT = 30;

// অডিট ফ্ল্যাগ টাইমআউট (মিনিটে)
export const AUDIT_FLAG_TIMEOUT = 60;
