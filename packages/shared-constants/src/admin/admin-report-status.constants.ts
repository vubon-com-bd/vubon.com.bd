/**
 * অ্যাডমিন রিপোর্টের স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টসমূহ
 */

// রিপোর্ট স্ট্যাটাস
export const REPORT_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  DELIVERED: 'delivered',
} as const;

// স্ট্যাটাসের কালার কোড
export const REPORT_STATUS_COLORS = {
  PENDING: '#F59E0B', // কমলা
  GENERATING: '#3B82F6', // নীল
  COMPLETED: '#22C55E', // সবুজ
  FAILED: '#EF4444', // লাল
  CANCELLED: '#94A3B8', // ধূসর
  DELIVERED: '#8B5CF6', // বেগুনি
} as const;

// স্ট্যাটাসের আইকন
export const REPORT_STATUS_ICONS = {
  PENDING: '⏳',
  GENERATING: '🔄',
  COMPLETED: '✅',
  FAILED: '❌',
  CANCELLED: '🚫',
  DELIVERED: '📬',
} as const;

// স্ট্যাটাসের ডেসক্রিপশন
export const REPORT_STATUS_DESCRIPTIONS = {
  PENDING: 'Report is pending generation',
  GENERATING: 'Report is being generated',
  COMPLETED: 'Report has been generated successfully',
  FAILED: 'Report generation has failed',
  CANCELLED: 'Report generation was cancelled',
  DELIVERED: 'Report has been delivered',
} as const;

// স্ট্যাটাস ট্রানজিশন রুলস
export const REPORT_STATUS_TRANSITIONS = {
  PENDING: ['generating', 'cancelled', 'failed'],
  GENERATING: ['completed', 'failed', 'cancelled'],
  COMPLETED: ['delivered'],
  FAILED: ['pending', 'cancelled'],
  CANCELLED: ['pending'],
  DELIVERED: ['completed'],
} as const;

// স্ট্যাটাসের প্রায়োরিটি (১ = সর্বোচ্চ)
export const REPORT_STATUS_PRIORITY = {
  PENDING: 2,
  GENERATING: 1,
  COMPLETED: 4,
  FAILED: 3,
  CANCELLED: 5,
  DELIVERED: 6,
} as const;

// স্ট্যাটাসের লেবেল (বাংলা)
export const REPORT_STATUS_LABELS_BN = {
  PENDING: 'মুলতুবি',
  GENERATING: 'জেনারেটিং',
  COMPLETED: 'সম্পন্ন',
  FAILED: 'ব্যর্থ',
  CANCELLED: 'বাতিল',
  DELIVERED: 'প্রদানকৃত',
} as const;

// স্ট্যাটাসের লেবেল (ইংরেজি)
export const REPORT_STATUS_LABELS_EN = {
  PENDING: 'Pending',
  GENERATING: 'Generating',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
  DELIVERED: 'Delivered',
} as const;

// স্ট্যাটাসের CSS ক্লাস
export const REPORT_STATUS_CSS_CLASSES = {
  PENDING: 'status-pending',
  GENERATING: 'status-generating',
  COMPLETED: 'status-completed',
  FAILED: 'status-failed',
  CANCELLED: 'status-cancelled',
  DELIVERED: 'status-delivered',
} as const;

// স্ট্যাটাস গ্রুপ
export const REPORT_STATUS_GROUPS = {
  ACTIVE_STATUSES: ['pending', 'generating'],
  TERMINAL_STATUSES: ['completed', 'failed', 'cancelled', 'delivered'],
  POSITIVE_STATUSES: ['completed', 'delivered'],
  NEGATIVE_STATUSES: ['failed', 'cancelled'],
  ACTIONABLE_STATUSES: ['pending', 'failed'],
} as const;

// স্ট্যাটাসের জন্য ইমোজি
export const REPORT_STATUS_EMOJIS = {
  PENDING: '🕐',
  GENERATING: '⚙️',
  COMPLETED: '✔️',
  FAILED: '💥',
  CANCELLED: '⛔',
  DELIVERED: '📨',
} as const;

// স্ট্যাটাস অ্যাকশন
export const REPORT_STATUS_ACTIONS = {
  PENDING: ['generate', 'cancel', 'fail'],
  GENERATING: ['complete', 'fail', 'cancel'],
  COMPLETED: ['deliver'],
  FAILED: ['retry', 'cancel'],
  CANCELLED: ['retry'],
  DELIVERED: ['complete'],
} as const;

// স্ট্যাটাস টাইমআউট (মিনিটে)
export const REPORT_STATUS_TIMEOUT = {
  PENDING: 60,
  GENERATING: 30,
  COMPLETED: 0,
  FAILED: 0,
  CANCELLED: 0,
  DELIVERED: 0,
} as const;

// স্ট্যাটাস ভ্যালিডেশন
export const REPORT_STATUS_VALIDATION = {
  PENDING: {
    canGenerate: true,
    canCancel: true,
    canRetry: false,
    canDeliver: false,
    isActive: true,
  },
  GENERATING: {
    canGenerate: false,
    canCancel: true,
    canRetry: false,
    canDeliver: false,
    isActive: true,
  },
  COMPLETED: {
    canGenerate: false,
    canCancel: false,
    canRetry: false,
    canDeliver: true,
    isActive: false,
  },
  FAILED: {
    canGenerate: false,
    canCancel: true,
    canRetry: true,
    canDeliver: false,
    isActive: false,
  },
  CANCELLED: {
    canGenerate: false,
    canCancel: false,
    canRetry: true,
    canDeliver: false,
    isActive: false,
  },
  DELIVERED: {
    canGenerate: false,
    canCancel: false,
    canRetry: false,
    canDeliver: false,
    isActive: false,
  },
} as const;

// ডিফল্ট রিপোর্ট স্ট্যাটাস
export const DEFAULT_REPORT_STATUS = 'pending';

// রিপোর্ট স্ট্যাটাস চেক ইন্টারভাল (সেকেন্ডে)
export const REPORT_STATUS_CHECK_INTERVAL = 10;

// রিপোর্ট স্ট্যাটাস ক্লিনআপ ইন্টারভাল (ঘন্টায়)
export const REPORT_STATUS_CLEANUP_INTERVAL = 24;

// রিপোর্ট ফেইল রিজন
export const REPORT_FAIL_REASONS = {
  DATA_ERROR: 'data_error',
  TIMEOUT: 'timeout',
  SYSTEM_ERROR: 'system_error',
  OUT_OF_MEMORY: 'out_of_memory',
  INVALID_FORMAT: 'invalid_format',
  PERMISSION_DENIED: 'permission_denied',
} as const;

// রিপোর্ট ক্যান্সেল রিজন
export const REPORT_CANCEL_REASONS = {
  USER_ACTION: 'user_action',
  SCHEDULE_CHANGE: 'schedule_change',
  SYSTEM_SHUTDOWN: 'system_shutdown',
  DUPLICATE_REQUEST: 'duplicate_request',
} as const;

// রিপোর্ট ডেলিভারি মেথড
export const REPORT_DELIVERY_METHODS = {
  EMAIL: 'email',
  DOWNLOAD: 'download',
  API: 'api',
  FTP: 'ftp',
} as const;
