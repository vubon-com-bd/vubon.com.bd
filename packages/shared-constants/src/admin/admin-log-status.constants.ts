/**
 * অ্যাডমিন লগের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// লগ স্ট্যাটাস
export const LOG_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

// স্ট্যাটাসের কালার কোড
export const LOG_STATUS_COLORS = {
  PENDING: '#F59E0B', // কমলা
  PROCESSING: '#3B82F6', // নীল
  COMPLETED: '#22C55E', // সবুজ
  FAILED: '#EF4444', // লাল
  ARCHIVED: '#94A3B8', // ধূসর
  DELETED: '#6B7280', // গাঢ় ধূসর
} as const;

// স্ট্যাটাসের আইকন
export const LOG_STATUS_ICONS = {
  PENDING: '⏳',
  PROCESSING: '🔄',
  COMPLETED: '✅',
  FAILED: '❌',
  ARCHIVED: '📦',
  DELETED: '🗑️',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const LOG_STATUS_DESCRIPTIONS = {
  PENDING: 'Log entry is pending processing',
  PROCESSING: 'Log entry is being processed',
  COMPLETED: 'Log entry has been successfully processed',
  FAILED: 'Log entry processing has failed',
  ARCHIVED: 'Log entry has been archived',
  DELETED: 'Log entry has been deleted',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const LOG_STATUS_TRANSITIONS = {
  PENDING: ['processing', 'failed', 'deleted'],
  PROCESSING: ['completed', 'failed', 'deleted'],
  COMPLETED: ['archived', 'deleted'],
  FAILED: ['pending', 'deleted'],
  ARCHIVED: ['deleted'],
  DELETED: [],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const LOG_STATUS_PRIORITY = {
  PENDING: 2,
  PROCESSING: 1,
  COMPLETED: 4,
  FAILED: 3,
  ARCHIVED: 5,
  DELETED: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const LOG_STATUS_LABELS_BN = {
  PENDING: 'মুলতুবি',
  PROCESSING: 'প্রসেসিং',
  COMPLETED: 'সম্পন্ন',
  FAILED: 'ব্যর্থ',
  ARCHIVED: 'আর্কাইভ',
  DELETED: 'মুছে ফেলা',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const LOG_STATUS_LABELS_EN = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  ARCHIVED: 'Archived',
  DELETED: 'Deleted',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const LOG_STATUS_CSS_CLASSES = {
  PENDING: 'status-pending',
  PROCESSING: 'status-processing',
  COMPLETED: 'status-completed',
  FAILED: 'status-failed',
  ARCHIVED: 'status-archived',
  DELETED: 'status-deleted',
} as const;

// স্ট্যাটাস গ্রুপ
export const LOG_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['pending', 'processing'],
  TERMINAL_STATUSES: ['completed', 'failed', 'archived', 'deleted'],
  SUCCESS_STATUSES: ['completed'],
  FAILURE_STATUSES: ['failed'],
  STORAGE_STATUSES: ['archived', 'deleted'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const LOG_STATUS_EMOJIS = {
  PENDING: '⏰',
  PROCESSING: '⚙️',
  COMPLETED: '✔️',
  FAILED: '💔',
  ARCHIVED: '🗂️',
  DELETED: '🧹',
} as const;

// স্ট্যাটাস অ্যাকশন
export const LOG_STATUS_ACTIONS = {
  PENDING: ['process', 'fail', 'delete'],
  PROCESSING: ['complete', 'fail', 'delete'],
  COMPLETED: ['archive', 'delete'],
  FAILED: ['retry', 'delete'],
  ARCHIVED: ['restore', 'delete'],
  DELETED: [],
} as const;

// স্ট্যাটাস টাইমআউট (মিনিটে)
export const LOG_STATUS_TIMEOUT = {
  PENDING: 60,
  PROCESSING: 30,
  COMPLETED: 0,
  FAILED: 0,
  ARCHIVED: 0,
  DELETED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const LOG_STATUS_VALIDATION = {
  PENDING: {
    canRetry: false,
    canCancel: true,
    canComplete: false,
    requiresAction: true,
  },
  PROCESSING: {
    canRetry: false,
    canCancel: true,
    canComplete: true,
    requiresAction: true,
  },
  COMPLETED: {
    canRetry: false,
    canCancel: false,
    canComplete: false,
    requiresAction: false,
  },
  FAILED: {
    canRetry: true,
    canCancel: false,
    canComplete: false,
    requiresAction: true,
  },
  ARCHIVED: {
    canRetry: false,
    canCancel: false,
    canComplete: false,
    requiresAction: false,
  },
  DELETED: {
    canRetry: false,
    canCancel: false,
    canComplete: false,
    requiresAction: false,
  },
} as const;

// ডিফল্ট লগ স্ট্যাটাস
export const DEFAULT_LOG_STATUS = 'pending';

// লগ আর্কাইভ স্ট্যাটাস ট্রানজিশন টাইম (মিলিসেকেন্ডে)
export const LOG_ARCHIVE_TRANSITION_TIME = 1000;

// লগ ডিলিট স্ট্যাটাস ট্রানজিশন টাইম (মিলিসেকেন্ডে)
export const LOG_DELETE_TRANSITION_TIME = 500;
