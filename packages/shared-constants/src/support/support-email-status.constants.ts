/**
 * সাপোর্ট ইমেইলের বিভিন্ন ডেলিভারি স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ইমেইল ডেলিভারি স্ট্যাটাস
 */
export const EMAIL_STATUS = {
  QUEUED: 'queued',
  SENT: 'sent',
  DELIVERED: 'delivered',
  OPENED: 'opened',
  CLICKED: 'clicked',
  BOUNCED: 'bounced',
  SPAM: 'spam',
  BLOCKED: 'blocked',
  FAILED: 'failed',
  RETRY: 'retry',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  PROCESSING: 'processing',
  SCHEDULED: 'scheduled',
  REJECTED: 'rejected',
} as const;

/**
 * ইমেইল ডেলিভারি স্ট্যাটাসের ডিসপ্লে নাম
 */
export const EMAIL_STATUS_DISPLAY_NAMES = {
  [EMAIL_STATUS.QUEUED]: 'কিউতে',
  [EMAIL_STATUS.SENT]: 'প্রেরিত',
  [EMAIL_STATUS.DELIVERED]: 'প্রাপ্ত',
  [EMAIL_STATUS.OPENED]: 'খোলা',
  [EMAIL_STATUS.CLICKED]: 'ক্লিক করা',
  [EMAIL_STATUS.BOUNCED]: 'ফিরে আসা',
  [EMAIL_STATUS.SPAM]: 'স্প্যাম',
  [EMAIL_STATUS.BLOCKED]: 'ব্লকড',
  [EMAIL_STATUS.FAILED]: 'ব্যর্থ',
  [EMAIL_STATUS.RETRY]: 'পুনরায় চেষ্টা',
  [EMAIL_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [EMAIL_STATUS.CANCELLED]: 'বাতিল',
  [EMAIL_STATUS.PROCESSING]: 'প্রক্রিয়াকরণ',
  [EMAIL_STATUS.SCHEDULED]: 'নির্ধারিত',
  [EMAIL_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
} as const;

/**
 * ইমেইল ডেলিভারি স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const EMAIL_STATUS_COLORS = {
  [EMAIL_STATUS.QUEUED]: '#95a5a6',
  [EMAIL_STATUS.SENT]: '#3498db',
  [EMAIL_STATUS.DELIVERED]: '#2ecc71',
  [EMAIL_STATUS.OPENED]: '#27ae60',
  [EMAIL_STATUS.CLICKED]: '#1abc9c',
  [EMAIL_STATUS.BOUNCED]: '#e67e22',
  [EMAIL_STATUS.SPAM]: '#e74c3c',
  [EMAIL_STATUS.BLOCKED]: '#c0392b',
  [EMAIL_STATUS.FAILED]: '#e74c3c',
  [EMAIL_STATUS.RETRY]: '#f39c12',
  [EMAIL_STATUS.EXPIRED]: '#95a5a6',
  [EMAIL_STATUS.CANCELLED]: '#7f8c8d',
  [EMAIL_STATUS.PROCESSING]: '#3498db',
  [EMAIL_STATUS.SCHEDULED]: '#9b59b6',
  [EMAIL_STATUS.REJECTED]: '#e74c3c',
} as const;

/**
 * ইমেইল স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const EMAIL_STATUS_ICONS = {
  [EMAIL_STATUS.QUEUED]: 'clock',
  [EMAIL_STATUS.SENT]: 'send',
  [EMAIL_STATUS.DELIVERED]: 'check-circle',
  [EMAIL_STATUS.OPENED]: 'eye',
  [EMAIL_STATUS.CLICKED]: 'mouse-pointer',
  [EMAIL_STATUS.BOUNCED]: 'rotate-ccw',
  [EMAIL_STATUS.SPAM]: 'alert-octagon',
  [EMAIL_STATUS.BLOCKED]: 'slash',
  [EMAIL_STATUS.FAILED]: 'x-circle',
  [EMAIL_STATUS.RETRY]: 'refresh-cw',
  [EMAIL_STATUS.EXPIRED]: 'clock',
  [EMAIL_STATUS.CANCELLED]: 'x-circle',
  [EMAIL_STATUS.PROCESSING]: 'loader',
  [EMAIL_STATUS.SCHEDULED]: 'calendar',
  [EMAIL_STATUS.REJECTED]: 'x-octagon',
} as const;

/**
 * ইমেইল স্ট্যাটাসের ক্যাটাগরি
 */
export const EMAIL_STATUS_CATEGORIES = {
  [EMAIL_STATUS.QUEUED]: 'pending',
  [EMAIL_STATUS.SENT]: 'progress',
  [EMAIL_STATUS.DELIVERED]: 'success',
  [EMAIL_STATUS.OPENED]: 'success',
  [EMAIL_STATUS.CLICKED]: 'success',
  [EMAIL_STATUS.BOUNCED]: 'warning',
  [EMAIL_STATUS.SPAM]: 'error',
  [EMAIL_STATUS.BLOCKED]: 'error',
  [EMAIL_STATUS.FAILED]: 'error',
  [EMAIL_STATUS.RETRY]: 'pending',
  [EMAIL_STATUS.EXPIRED]: 'inactive',
  [EMAIL_STATUS.CANCELLED]: 'inactive',
  [EMAIL_STATUS.PROCESSING]: 'progress',
  [EMAIL_STATUS.SCHEDULED]: 'pending',
  [EMAIL_STATUS.REJECTED]: 'error',
} as const;

/**
 * ইমেইল স্ট্যাটাস গ্রুপ
 */
export const EMAIL_STATUS_GROUPS = {
  PENDING: ['queued', 'scheduled', 'retry'],
  PROGRESS: ['processing', 'sent'],
  SUCCESS: ['delivered', 'opened', 'clicked'],
  WARNING: ['bounced'],
  ERROR: ['failed', 'blocked', 'spam', 'rejected'],
  INACTIVE: ['expired', 'cancelled'],
} as const;

/**
 * ইমেইল স্ট্যাটাস ট্রানজিশন রুলস
 */
export const EMAIL_STATUS_TRANSITIONS = {
  [EMAIL_STATUS.QUEUED]: ['processing', 'sent', 'cancelled'],
  [EMAIL_STATUS.SCHEDULED]: ['queued', 'cancelled'],
  [EMAIL_STATUS.PROCESSING]: ['sent', 'failed'],
  [EMAIL_STATUS.SENT]: ['delivered', 'bounced', 'failed', 'blocked'],
  [EMAIL_STATUS.DELIVERED]: ['opened', 'clicked', 'expired'],
  [EMAIL_STATUS.OPENED]: ['clicked'],
  [EMAIL_STATUS.CLICKED]: [],
  [EMAIL_STATUS.BOUNCED]: ['retry', 'failed'],
  [EMAIL_STATUS.RETRY]: ['sent', 'failed', 'expired'],
  [EMAIL_STATUS.FAILED]: ['retry', 'cancelled'],
  [EMAIL_STATUS.BLOCKED]: ['cancelled'],
  [EMAIL_STATUS.SPAM]: ['cancelled'],
  [EMAIL_STATUS.REJECTED]: ['cancelled'],
  [EMAIL_STATUS.EXPIRED]: ['cancelled'],
  [EMAIL_STATUS.CANCELLED]: [],
} as const;

/**
 * ইমেইল স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const EMAIL_STATUS_DEFAULT_ACTIONS = {
  [EMAIL_STATUS.QUEUED]: 'ইমেইল প্রেরণের জন্য কিউতে রয়েছে',
  [EMAIL_STATUS.SCHEDULED]: 'ইমেইল নির্ধারিত সময়ে প্রেরণ করা হবে',
  [EMAIL_STATUS.PROCESSING]: 'ইমেইল প্রক্রিয়াকরণ হচ্ছে',
  [EMAIL_STATUS.SENT]: 'ইমেইল প্রেরিত হয়েছে',
  [EMAIL_STATUS.DELIVERED]: 'ইমেইল প্রাপ্ত হয়েছে',
  [EMAIL_STATUS.OPENED]: 'ইমেইল খোলা হয়েছে',
  [EMAIL_STATUS.CLICKED]: 'ইমেইলের লিংকে ক্লিক করা হয়েছে',
  [EMAIL_STATUS.BOUNCED]: 'ইমেইল ফিরে এসেছে, ঠিকানা যাচাই করুন',
  [EMAIL_STATUS.RETRY]: 'ইমেইল পুনরায় প্রেরণের চেষ্টা চলছে',
  [EMAIL_STATUS.FAILED]: 'ইমেইল প্রেরণ ব্যর্থ হয়েছে',
  [EMAIL_STATUS.BLOCKED]: 'ইমেইল ব্লক করা হয়েছে',
  [EMAIL_STATUS.SPAM]: 'ইমেইল স্প্যাম হিসেবে চিহ্নিত',
  [EMAIL_STATUS.REJECTED]: 'ইমেইল প্রত্যাখ্যাত হয়েছে',
  [EMAIL_STATUS.EXPIRED]: 'ইমেইলের মেয়াদ শেষ হয়েছে',
  [EMAIL_STATUS.CANCELLED]: 'ইমেইল বাতিল করা হয়েছে',
} as const;

/**
 * ইমেইল স্ট্যাটাস টাইমআউট (ঘন্টায়)
 */
export const EMAIL_STATUS_TIME_LIMITS = {
  [EMAIL_STATUS.QUEUED]: 1,
  [EMAIL_STATUS.SCHEDULED]: 0,
  [EMAIL_STATUS.PROCESSING]: 0.5,
  [EMAIL_STATUS.SENT]: 0,
  [EMAIL_STATUS.DELIVERED]: 0,
  [EMAIL_STATUS.OPENED]: 0,
  [EMAIL_STATUS.CLICKED]: 0,
  [EMAIL_STATUS.BOUNCED]: 0,
  [EMAIL_STATUS.RETRY]: 0.5,
  [EMAIL_STATUS.FAILED]: 0,
  [EMAIL_STATUS.BLOCKED]: 0,
  [EMAIL_STATUS.SPAM]: 0,
  [EMAIL_STATUS.REJECTED]: 0,
  [EMAIL_STATUS.EXPIRED]: 0,
  [EMAIL_STATUS.CANCELLED]: 0,
} as const;

export type EmailStatus = (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS];
export type EmailStatusDisplayNames = typeof EMAIL_STATUS_DISPLAY_NAMES;
export type EmailStatusColors = typeof EMAIL_STATUS_COLORS;
export type EmailStatusIcons = typeof EMAIL_STATUS_ICONS;
export type EmailStatusCategories = typeof EMAIL_STATUS_CATEGORIES;
export type EmailStatusGroups = typeof EMAIL_STATUS_GROUPS;
export type EmailStatusTransitions = typeof EMAIL_STATUS_TRANSITIONS;
export type EmailStatusDefaultActions = typeof EMAIL_STATUS_DEFAULT_ACTIONS;
export type EmailStatusTimeLimits = typeof EMAIL_STATUS_TIME_LIMITS;

export interface EmailStatusConfig {
  status: EmailStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'pending' | 'progress' | 'success' | 'warning' | 'error' | 'inactive';
  defaultAction: string;
  timeLimitHours: number;
}

/**
 * ইমেইল স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const EMAIL_STATUS_CONFIGS: Record<EmailStatus, EmailStatusConfig> = {
  [EMAIL_STATUS.QUEUED]: {
    status: EMAIL_STATUS.QUEUED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.QUEUED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.QUEUED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.QUEUED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.QUEUED] as 'pending',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.QUEUED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.QUEUED],
  },
  [EMAIL_STATUS.SENT]: {
    status: EMAIL_STATUS.SENT,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.SENT],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.SENT],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.SENT],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.SENT] as 'progress',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.SENT],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.SENT],
  },
  [EMAIL_STATUS.DELIVERED]: {
    status: EMAIL_STATUS.DELIVERED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.DELIVERED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.DELIVERED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.DELIVERED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.DELIVERED] as 'success',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.DELIVERED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.DELIVERED],
  },
  [EMAIL_STATUS.OPENED]: {
    status: EMAIL_STATUS.OPENED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.OPENED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.OPENED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.OPENED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.OPENED] as 'success',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.OPENED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.OPENED],
  },
  [EMAIL_STATUS.CLICKED]: {
    status: EMAIL_STATUS.CLICKED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.CLICKED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.CLICKED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.CLICKED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.CLICKED] as 'success',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.CLICKED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.CLICKED],
  },
  [EMAIL_STATUS.BOUNCED]: {
    status: EMAIL_STATUS.BOUNCED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.BOUNCED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.BOUNCED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.BOUNCED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.BOUNCED] as 'warning',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.BOUNCED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.BOUNCED],
  },
  [EMAIL_STATUS.SPAM]: {
    status: EMAIL_STATUS.SPAM,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.SPAM],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.SPAM],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.SPAM],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.SPAM] as 'error',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.SPAM],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.SPAM],
  },
  [EMAIL_STATUS.BLOCKED]: {
    status: EMAIL_STATUS.BLOCKED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.BLOCKED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.BLOCKED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.BLOCKED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.BLOCKED] as 'error',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.BLOCKED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.BLOCKED],
  },
  [EMAIL_STATUS.FAILED]: {
    status: EMAIL_STATUS.FAILED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.FAILED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.FAILED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.FAILED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.FAILED] as 'error',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.FAILED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.FAILED],
  },
  [EMAIL_STATUS.RETRY]: {
    status: EMAIL_STATUS.RETRY,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.RETRY],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.RETRY],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.RETRY],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.RETRY] as 'pending',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.RETRY],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.RETRY],
  },
  [EMAIL_STATUS.EXPIRED]: {
    status: EMAIL_STATUS.EXPIRED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.EXPIRED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.EXPIRED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.EXPIRED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.EXPIRED] as 'inactive',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.EXPIRED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.EXPIRED],
  },
  [EMAIL_STATUS.CANCELLED]: {
    status: EMAIL_STATUS.CANCELLED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.CANCELLED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.CANCELLED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.CANCELLED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.CANCELLED] as 'inactive',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.CANCELLED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.CANCELLED],
  },
  [EMAIL_STATUS.PROCESSING]: {
    status: EMAIL_STATUS.PROCESSING,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.PROCESSING],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.PROCESSING],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.PROCESSING],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.PROCESSING] as 'progress',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.PROCESSING],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.PROCESSING],
  },
  [EMAIL_STATUS.SCHEDULED]: {
    status: EMAIL_STATUS.SCHEDULED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.SCHEDULED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.SCHEDULED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.SCHEDULED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.SCHEDULED] as 'pending',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.SCHEDULED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.SCHEDULED],
  },
  [EMAIL_STATUS.REJECTED]: {
    status: EMAIL_STATUS.REJECTED,
    displayName: EMAIL_STATUS_DISPLAY_NAMES[EMAIL_STATUS.REJECTED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS.REJECTED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS.REJECTED],
    category: EMAIL_STATUS_CATEGORIES[EMAIL_STATUS.REJECTED] as 'error',
    defaultAction: EMAIL_STATUS_DEFAULT_ACTIONS[EMAIL_STATUS.REJECTED],
    timeLimitHours: EMAIL_STATUS_TIME_LIMITS[EMAIL_STATUS.REJECTED],
  },
};

/**
 * ইমেইল স্ট্যাটাস কনফিগারেশন
 */
export const EMAIL_STATUS_CONFIG = {
  statuses: EMAIL_STATUS,
  displayNames: EMAIL_STATUS_DISPLAY_NAMES,
  colors: EMAIL_STATUS_COLORS,
  icons: EMAIL_STATUS_ICONS,
  categories: EMAIL_STATUS_CATEGORIES,
  groups: EMAIL_STATUS_GROUPS,
  transitions: EMAIL_STATUS_TRANSITIONS,
  defaultActions: EMAIL_STATUS_DEFAULT_ACTIONS,
  timeLimits: EMAIL_STATUS_TIME_LIMITS,
  configs: EMAIL_STATUS_CONFIGS,
} as const;
