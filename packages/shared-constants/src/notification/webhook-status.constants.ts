// ============================================
// ওয়েবহুক স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ওয়েবহুক স্ট্যাটাস
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস
 * ওয়েবহুকের বর্তমান অবস্থা নির্দেশ করে
 */
export type WebhookStatus =
  | typeof WEBHOOK_STATUS_ACTIVE
  | typeof WEBHOOK_STATUS_INACTIVE
  | typeof WEBHOOK_STATUS_PENDING
  | typeof WEBHOOK_STATUS_VERIFIED
  | typeof WEBHOOK_STATUS_FAILED
  | typeof WEBHOOK_STATUS_EXPIRED
  | typeof WEBHOOK_STATUS_DELETED
  | typeof WEBHOOK_STATUS_SUSPENDED
  | typeof WEBHOOK_STATUS_CREATED
  | typeof WEBHOOK_STATUS_UPDATED
  | typeof WEBHOOK_STATUS_PROCESSING
  | typeof WEBHOOK_STATUS_COMPLETED
  | typeof WEBHOOK_STATUS_ERROR
  | typeof WEBHOOK_STATUS_RETRYING
  | typeof WEBHOOK_STATUS_TIMEOUT
  | typeof WEBHOOK_STATUS_REJECTED
  | typeof WEBHOOK_STATUS_ARCHIVED;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 * @description ওয়েবহুক সক্রিয় এবং কাজ করছে
 */
export const WEBHOOK_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 * @description ওয়েবহুক নিষ্ক্রিয়
 */
export const WEBHOOK_STATUS_INACTIVE = 'INACTIVE';

/**
 * পেন্ডিং স্ট্যাটাস
 * @description ওয়েবহুক যাচাইকরণের অপেক্ষায়
 */
export const WEBHOOK_STATUS_PENDING = 'PENDING';

/**
 * ভেরিফাইড স্ট্যাটাস
 * @description ওয়েবহুক যাচাই করা হয়েছে
 */
export const WEBHOOK_STATUS_VERIFIED = 'VERIFIED';

/**
 * ফেইলড স্ট্যাটাস
 * @description ওয়েবহুক যাচাইকরণ ব্যর্থ হয়েছে
 */
export const WEBHOOK_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description ওয়েবহুকের মেয়াদ শেষ
 */
export const WEBHOOK_STATUS_EXPIRED = 'EXPIRED';

/**
 * ডিলিটেড স্ট্যাটাস
 * @description ওয়েবহুক মুছে ফেলা হয়েছে
 */
export const WEBHOOK_STATUS_DELETED = 'DELETED';

/**
 * সাসপেন্ডেড স্ট্যাটাস
 * @description ওয়েবহুক স্থগিত করা হয়েছে
 */
export const WEBHOOK_STATUS_SUSPENDED = 'SUSPENDED';

/**
 * ক্রিয়েটেড স্ট্যাটাস
 * @description ওয়েবহুক তৈরি করা হয়েছে
 */
export const WEBHOOK_STATUS_CREATED = 'CREATED';

/**
 * আপডেটেড স্ট্যাটাস
 * @description ওয়েবহুক আপডেট করা হয়েছে
 */
export const WEBHOOK_STATUS_UPDATED = 'UPDATED';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description ওয়েবহুক প্রক্রিয়াকরণ চলছে
 */
export const WEBHOOK_STATUS_PROCESSING = 'PROCESSING';

/**
 * কমপ্লিটেড স্ট্যাটাস
 * @description ওয়েবহুক প্রক্রিয়াকরণ সম্পন্ন
 */
export const WEBHOOK_STATUS_COMPLETED = 'COMPLETED';

/**
 * এরর স্ট্যাটাস
 * @description ওয়েবহুক প্রক্রিয়াকরণে ত্রুটি
 */
export const WEBHOOK_STATUS_ERROR = 'ERROR';

/**
 * রিট্রাইং স্ট্যাটাস
 * @description ওয়েবহুক পুনরায় চেষ্টা করছে
 */
export const WEBHOOK_STATUS_RETRYING = 'RETRYING';

/**
 * টাইমআউট স্ট্যাটাস
 * @description ওয়েবহুক টাইমআউট হয়েছে
 */
export const WEBHOOK_STATUS_TIMEOUT = 'TIMEOUT';

/**
 * রিজেক্টেড স্ট্যাটাস
 * @description ওয়েবহুক প্রত্যাখ্যান করা হয়েছে
 */
export const WEBHOOK_STATUS_REJECTED = 'REJECTED';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description ওয়েবহুক আর্কাইভ করা হয়েছে
 */
export const WEBHOOK_STATUS_ARCHIVED = 'ARCHIVED';

// ============================================
// ২. ওয়েবহুক স্ট্যাটাস গ্রুপ
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস গ্রুপ
 */
export type WebhookStatusGroup =
  | typeof WEBHOOK_STATUS_GROUP_ACTIVE
  | typeof WEBHOOK_STATUS_GROUP_INACTIVE
  | typeof WEBHOOK_STATUS_GROUP_PENDING
  | typeof WEBHOOK_STATUS_GROUP_TERMINAL
  | typeof WEBHOOK_STATUS_GROUP_TRANSIENT;

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const WEBHOOK_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ গ্রুপ
 * @description নিষ্ক্রিয় স্ট্যাটাস
 */
export const WEBHOOK_STATUS_GROUP_INACTIVE = 'INACTIVE';

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const WEBHOOK_STATUS_GROUP_PENDING = 'PENDING';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const WEBHOOK_STATUS_GROUP_TERMINAL = 'TERMINAL';

/**
 * ট্রানজিয়েন্ট গ্রুপ
 * @description ক্ষণস্থায়ী অবস্থা
 */
export const WEBHOOK_STATUS_GROUP_TRANSIENT = 'TRANSIENT';

// ============================================
// ৩. ওয়েবহুক স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const WEBHOOK_STATUS_TO_GROUP: Record<WebhookStatus, WebhookStatusGroup> = {
  [WEBHOOK_STATUS_ACTIVE]: WEBHOOK_STATUS_GROUP_ACTIVE,
  [WEBHOOK_STATUS_INACTIVE]: WEBHOOK_STATUS_GROUP_INACTIVE,
  [WEBHOOK_STATUS_PENDING]: WEBHOOK_STATUS_GROUP_PENDING,
  [WEBHOOK_STATUS_VERIFIED]: WEBHOOK_STATUS_GROUP_ACTIVE,
  [WEBHOOK_STATUS_FAILED]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_EXPIRED]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_DELETED]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_SUSPENDED]: WEBHOOK_STATUS_GROUP_INACTIVE,
  [WEBHOOK_STATUS_CREATED]: WEBHOOK_STATUS_GROUP_PENDING,
  [WEBHOOK_STATUS_UPDATED]: WEBHOOK_STATUS_GROUP_TRANSIENT,
  [WEBHOOK_STATUS_PROCESSING]: WEBHOOK_STATUS_GROUP_PENDING,
  [WEBHOOK_STATUS_COMPLETED]: WEBHOOK_STATUS_GROUP_ACTIVE,
  [WEBHOOK_STATUS_ERROR]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_RETRYING]: WEBHOOK_STATUS_GROUP_PENDING,
  [WEBHOOK_STATUS_TIMEOUT]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_REJECTED]: WEBHOOK_STATUS_GROUP_TERMINAL,
  [WEBHOOK_STATUS_ARCHIVED]: WEBHOOK_STATUS_GROUP_TERMINAL,
};

// ============================================
// ৪. ওয়েবহুক স্ট্যাটাস লেবেল
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস লেবেল
 */
export const WEBHOOK_STATUS_LABELS: Record<WebhookStatus, string> = {
  [WEBHOOK_STATUS_ACTIVE]: 'সক্রিয়',
  [WEBHOOK_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [WEBHOOK_STATUS_PENDING]: 'অপেক্ষমান',
  [WEBHOOK_STATUS_VERIFIED]: 'যাচাই করা হয়েছে',
  [WEBHOOK_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [WEBHOOK_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [WEBHOOK_STATUS_DELETED]: 'মুছে ফেলা',
  [WEBHOOK_STATUS_SUSPENDED]: 'স্থগিত',
  [WEBHOOK_STATUS_CREATED]: 'তৈরি করা হয়েছে',
  [WEBHOOK_STATUS_UPDATED]: 'আপডেট করা হয়েছে',
  [WEBHOOK_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [WEBHOOK_STATUS_COMPLETED]: 'সম্পন্ন',
  [WEBHOOK_STATUS_ERROR]: 'ত্রুটি',
  [WEBHOOK_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
  [WEBHOOK_STATUS_TIMEOUT]: 'টাইমআউট',
  [WEBHOOK_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [WEBHOOK_STATUS_ARCHIVED]: 'আর্কাইভ',
};

// ============================================
// ৫. ওয়েবহুক স্ট্যাটাস আইকন
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস আইকন
 */
export const WEBHOOK_STATUS_ICONS: Record<WebhookStatus, string> = {
  [WEBHOOK_STATUS_ACTIVE]: 'check_circle',
  [WEBHOOK_STATUS_INACTIVE]: 'cancel',
  [WEBHOOK_STATUS_PENDING]: 'pending',
  [WEBHOOK_STATUS_VERIFIED]: 'verified',
  [WEBHOOK_STATUS_FAILED]: 'error',
  [WEBHOOK_STATUS_EXPIRED]: 'timer',
  [WEBHOOK_STATUS_DELETED]: 'delete',
  [WEBHOOK_STATUS_SUSPENDED]: 'pause_circle',
  [WEBHOOK_STATUS_CREATED]: 'add_circle',
  [WEBHOOK_STATUS_UPDATED]: 'update',
  [WEBHOOK_STATUS_PROCESSING]: 'processing',
  [WEBHOOK_STATUS_COMPLETED]: 'done_all',
  [WEBHOOK_STATUS_ERROR]: 'bug_report',
  [WEBHOOK_STATUS_RETRYING]: 'retry',
  [WEBHOOK_STATUS_TIMEOUT]: 'hourglass_empty',
  [WEBHOOK_STATUS_REJECTED]: 'block',
  [WEBHOOK_STATUS_ARCHIVED]: 'archive',
};

// ============================================
// ৬. ওয়েবহুক স্ট্যাটাস কালার
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস কালার
 */
export const WEBHOOK_STATUS_COLORS: Record<WebhookStatus, string> = {
  [WEBHOOK_STATUS_ACTIVE]: '#4CAF50', // Green
  [WEBHOOK_STATUS_INACTIVE]: '#9E9E9E', // Grey
  [WEBHOOK_STATUS_PENDING]: '#FFC107', // Amber
  [WEBHOOK_STATUS_VERIFIED]: '#2196F3', // Blue
  [WEBHOOK_STATUS_FAILED]: '#F44336', // Red
  [WEBHOOK_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [WEBHOOK_STATUS_DELETED]: '#757575', // Dark Grey
  [WEBHOOK_STATUS_SUSPENDED]: '#FF9800', // Orange
  [WEBHOOK_STATUS_CREATED]: '#8BC34A', // Light Green
  [WEBHOOK_STATUS_UPDATED]: '#00BCD4', // Cyan
  [WEBHOOK_STATUS_PROCESSING]: '#2196F3', // Blue
  [WEBHOOK_STATUS_COMPLETED]: '#4CAF50', // Green
  [WEBHOOK_STATUS_ERROR]: '#D32F2F', // Dark Red
  [WEBHOOK_STATUS_RETRYING]: '#FF6F00', // Dark Amber
  [WEBHOOK_STATUS_TIMEOUT]: '#795548', // Brown
  [WEBHOOK_STATUS_REJECTED]: '#C62828', // Dark Red
  [WEBHOOK_STATUS_ARCHIVED]: '#607D8B', // Blue Grey
};

// ============================================
// ৭. টার্মিনাল ওয়েবহুক স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল ওয়েবহুক স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const WEBHOOK_TERMINAL_STATUSES: WebhookStatus[] = [
  WEBHOOK_STATUS_FAILED,
  WEBHOOK_STATUS_EXPIRED,
  WEBHOOK_STATUS_DELETED,
  WEBHOOK_STATUS_ERROR,
  WEBHOOK_STATUS_TIMEOUT,
  WEBHOOK_STATUS_REJECTED,
  WEBHOOK_STATUS_ARCHIVED,
];

// ============================================
// ৮. অ্যাক্টিভ ওয়েবহুক স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ ওয়েবহুক স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো সক্রিয়
 */
export const WEBHOOK_ACTIVE_STATUSES: WebhookStatus[] = [
  WEBHOOK_STATUS_ACTIVE,
  WEBHOOK_STATUS_VERIFIED,
  WEBHOOK_STATUS_COMPLETED,
];

// ============================================
// ৯. পেন্ডিং ওয়েবহুক স্ট্যাটাসসমূহ
// ============================================

/**
 * পেন্ডিং ওয়েবহুক স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো অপেক্ষমান
 */
export const WEBHOOK_PENDING_STATUSES: WebhookStatus[] = [
  WEBHOOK_STATUS_PENDING,
  WEBHOOK_STATUS_CREATED,
  WEBHOOK_STATUS_PROCESSING,
  WEBHOOK_STATUS_RETRYING,
];

// ============================================
// ১০. ওয়েবহুক স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * ওয়েবহুক স্ট্যাটাস কনফিগারেশন
 */
export interface WebhookStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: WebhookStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: WebhookStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** পেন্ডিং স্ট্যাটাস কিনা */
  isPending: boolean;
}

/**
 * সব ওয়েবহুক স্ট্যাটাসের কনফিগারেশন
 */
export const WEBHOOK_STATUS_CONFIGS: WebhookStatusConfig[] = [
  {
    status: WEBHOOK_STATUS_ACTIVE,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_ACTIVE],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_ACTIVE],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_ACTIVE],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_ACTIVE],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_INACTIVE,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_INACTIVE],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_INACTIVE],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_INACTIVE],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_INACTIVE],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_PENDING,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_PENDING],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_PENDING],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_PENDING],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_PENDING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: WEBHOOK_STATUS_VERIFIED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_VERIFIED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_VERIFIED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_VERIFIED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_VERIFIED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_FAILED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_FAILED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_FAILED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_FAILED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_FAILED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_EXPIRED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_EXPIRED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_EXPIRED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_EXPIRED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_DELETED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_DELETED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_DELETED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_DELETED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_DELETED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_SUSPENDED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_SUSPENDED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_SUSPENDED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_SUSPENDED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_SUSPENDED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_CREATED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_CREATED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_CREATED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_CREATED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_CREATED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: WEBHOOK_STATUS_UPDATED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_UPDATED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_UPDATED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_UPDATED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_UPDATED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_PROCESSING,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_PROCESSING],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_PROCESSING],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_PROCESSING],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_PROCESSING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: WEBHOOK_STATUS_COMPLETED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_COMPLETED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_COMPLETED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_COMPLETED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_COMPLETED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_ERROR,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_ERROR],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_ERROR],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_ERROR],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_ERROR],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_RETRYING,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_RETRYING],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_RETRYING],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_RETRYING],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_RETRYING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: WEBHOOK_STATUS_TIMEOUT,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_TIMEOUT],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_TIMEOUT],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_TIMEOUT],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_TIMEOUT],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_REJECTED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_REJECTED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_REJECTED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_REJECTED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_REJECTED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: WEBHOOK_STATUS_ARCHIVED,
    label: WEBHOOK_STATUS_LABELS[WEBHOOK_STATUS_ARCHIVED],
    icon: WEBHOOK_STATUS_ICONS[WEBHOOK_STATUS_ARCHIVED],
    color: WEBHOOK_STATUS_COLORS[WEBHOOK_STATUS_ARCHIVED],
    group: WEBHOOK_STATUS_TO_GROUP[WEBHOOK_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
];
