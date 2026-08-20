/**
 * অ্যাডমিন অ্যাক্টিভিটির স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// অ্যাক্টিভিটি স্ট্যাটাস
export const ACTIVITY_STATUS = {
  STARTED: 'started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  TIMEOUT: 'timeout',
} as const;

// স্ট্যাটাসের কালার কোড
export const ACTIVITY_STATUS_COLORS = {
  STARTED: '#3B82F6', // নীল
  IN_PROGRESS: '#F59E0B', // কমলা
  COMPLETED: '#22C55E', // সবুজ
  FAILED: '#EF4444', // লাল
  CANCELLED: '#94A3B8', // ধূসর
  TIMEOUT: '#8B5CF6', // বেগুনি
} as const;

// স্ট্যাটাসের আইকন
export const ACTIVITY_STATUS_ICONS = {
  STARTED: '🚀',
  IN_PROGRESS: '⏳',
  COMPLETED: '✅',
  FAILED: '❌',
  CANCELLED: '🚫',
  TIMEOUT: '⏰',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const ACTIVITY_STATUS_DESCRIPTIONS = {
  STARTED: 'Activity has been initiated',
  IN_PROGRESS: 'Activity is currently being processed',
  COMPLETED: 'Activity has been successfully completed',
  FAILED: 'Activity has failed due to an error',
  CANCELLED: 'Activity was cancelled by user',
  TIMEOUT: 'Activity has timed out',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const ACTIVITY_STATUS_TRANSITIONS = {
  STARTED: ['in_progress', 'cancelled', 'failed', 'timeout'],
  IN_PROGRESS: ['completed', 'failed', 'cancelled', 'timeout'],
  COMPLETED: [],
  FAILED: [],
  CANCELLED: [],
  TIMEOUT: [],
} as const;

// ডিফল্ট স্ট্যাটাস
export const DEFAULT_ACTIVITY_STATUS = 'started';

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const ACTIVITY_STATUS_PRIORITY = {
  STARTED: 3,
  IN_PROGRESS: 2,
  COMPLETED: 5,
  FAILED: 1,
  CANCELLED: 4,
  TIMEOUT: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const ACTIVITY_STATUS_LABELS_BN = {
  STARTED: 'শুরু হয়েছে',
  IN_PROGRESS: 'চলমান',
  COMPLETED: 'সম্পন্ন',
  FAILED: 'ব্যর্থ',
  CANCELLED: 'বাতিল',
  TIMEOUT: 'টাইমআউট',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const ACTIVITY_STATUS_LABELS_EN = {
  STARTED: 'Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  TIMEOUT: 'Timeout',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const ACTIVITY_STATUS_CSS_CLASSES = {
  STARTED: 'status-started',
  IN_PROGRESS: 'status-in-progress',
  COMPLETED: 'status-completed',
  FAILED: 'status-failed',
  CANCELLED: 'status-cancelled',
  TIMEOUT: 'status-timeout',
} as const;

// স্ট্যাটাস গ্রুপ
export const ACTIVITY_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['started', 'in_progress'],
  TERMINAL_STATUSES: ['completed', 'failed', 'cancelled', 'timeout'],
  SUCCESS_STATUSES: ['completed'],
  FAILURE_STATUSES: ['failed', 'cancelled', 'timeout'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const ACTIVITY_STATUS_EMOJIS = {
  STARTED: '▶️',
  IN_PROGRESS: '🔄',
  COMPLETED: '✅',
  FAILED: '💥',
  CANCELLED: '⛔',
  TIMEOUT: '⌛',
} as const;

// স্ট্যাটাস অ্যাকশন
export const ACTIVITY_STATUS_ACTIONS = {
  STARTED: ['progress', 'cancel', 'fail'],
  IN_PROGRESS: ['complete', 'cancel', 'fail'],
  COMPLETED: [],
  FAILED: ['retry'],
  CANCELLED: ['restart'],
  TIMEOUT: ['retry'],
} as const;

// স্ট্যাটাস টাইমআউট (সেকেন্ডে)
export const ACTIVITY_STATUS_TIMEOUT = {
  STARTED: 300, // ৫ মিনিট
  IN_PROGRESS: 600, // ১০ মিনিট
  COMPLETED: 0,
  FAILED: 0,
  CANCELLED: 0,
  TIMEOUT: 0,
} as const;

// ডিফল্ট স্ট্যাটাস ট্রানজিশন টাইম (মিলিসেকেন্ডে)
export const DEFAULT_STATUS_TRANSITION_TIME = 1000;

// স্ট্যাটাস ভ্যালিডেশন
export const ACTIVITY_STATUS_VALIDATION = {
  STARTED: {
    canRetry: false,
    canCancel: true,
    canComplete: false,
    requiresAction: true,
  },
  IN_PROGRESS: {
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
  CANCELLED: {
    canRetry: true,
    canCancel: false,
    canComplete: false,
    requiresAction: false,
  },
  TIMEOUT: {
    canRetry: true,
    canCancel: false,
    canComplete: false,
    requiresAction: true,
  },
} as const;
