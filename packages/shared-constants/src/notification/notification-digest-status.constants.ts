// ============================================
// ডাইজেস্ট নোটিফিকেশন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডাইজেস্ট স্ট্যাটাস
// ============================================

/**
 * ডাইজেস্ট নোটিফিকেশন স্ট্যাটাস
 * ডাইজেস্টের বর্তমান অবস্থা নির্দেশ করে
 */
export type NotificationDigestStatus =
  | typeof NOTIFICATION_DIGEST_STATUS_PENDING
  | typeof NOTIFICATION_DIGEST_STATUS_PROCESSING
  | typeof NOTIFICATION_DIGEST_STATUS_COMPLETED
  | typeof NOTIFICATION_DIGEST_STATUS_FAILED
  | typeof NOTIFICATION_DIGEST_STATUS_PARTIAL
  | typeof NOTIFICATION_DIGEST_STATUS_CANCELLED
  | typeof NOTIFICATION_DIGEST_STATUS_SCHEDULED
  | typeof NOTIFICATION_DIGEST_STATUS_QUEUED
  | typeof NOTIFICATION_DIGEST_STATUS_GENERATING
  | typeof NOTIFICATION_DIGEST_STATUS_SENT
  | typeof NOTIFICATION_DIGEST_STATUS_DELIVERED
  | typeof NOTIFICATION_DIGEST_STATUS_EXPIRED
  | typeof NOTIFICATION_DIGEST_STATUS_ARCHIVED;

/**
 * পেন্ডিং স্ট্যাটাস
 * @description ডাইজেস্ট প্রক্রিয়াকরণের অপেক্ষায়
 */
export const NOTIFICATION_DIGEST_STATUS_PENDING = 'PENDING';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description ডাইজেস্ট প্রক্রিয়াকরণ চলছে
 */
export const NOTIFICATION_DIGEST_STATUS_PROCESSING = 'PROCESSING';

/**
 * কমপ্লিটেড স্ট্যাটাস
 * @description ডাইজেস্ট সম্পন্ন হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_COMPLETED = 'COMPLETED';

/**
 * ফেইলড স্ট্যাটাস
 * @description ডাইজেস্ট ব্যর্থ হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_FAILED = 'FAILED';

/**
 * পার্শিয়াল স্ট্যাটাস
 * @description ডাইজেস্ট আংশিকভাবে সফল হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_PARTIAL = 'PARTIAL';

/**
 * ক্যান্সেলড স্ট্যাটাস
 * @description ডাইজেস্ট বাতিল করা হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_CANCELLED = 'CANCELLED';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description ডাইজেস্ট নির্ধারিত সময়ে তৈরি হবে
 */
export const NOTIFICATION_DIGEST_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * কিউড স্ট্যাটাস
 * @description ডাইজেস্ট সারিবদ্ধ করা হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_QUEUED = 'QUEUED';

/**
 * জেনারেটিং স্ট্যাটাস
 * @description ডাইজেস্ট তৈরি হচ্ছে
 */
export const NOTIFICATION_DIGEST_STATUS_GENERATING = 'GENERATING';

/**
 * সেন্ট স্ট্যাটাস
 * @description ডাইজেস্ট পাঠানো হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 * @description ডাইজেস্ট প্রাপকের কাছে পৌঁছেছে
 */
export const NOTIFICATION_DIGEST_STATUS_DELIVERED = 'DELIVERED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description ডাইজেস্টের মেয়াদ শেষ
 */
export const NOTIFICATION_DIGEST_STATUS_EXPIRED = 'EXPIRED';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description ডাইজেস্ট আর্কাইভ করা হয়েছে
 */
export const NOTIFICATION_DIGEST_STATUS_ARCHIVED = 'ARCHIVED';

// ============================================
// ২. ডাইজেস্ট স্ট্যাটাস গ্রুপ
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস গ্রুপ
 */
export type NotificationDigestStatusGroup =
  | typeof NOTIFICATION_DIGEST_STATUS_GROUP_PENDING
  | typeof NOTIFICATION_DIGEST_STATUS_GROUP_ACTIVE
  | typeof NOTIFICATION_DIGEST_STATUS_GROUP_COMPLETED
  | typeof NOTIFICATION_DIGEST_STATUS_GROUP_FAILED
  | typeof NOTIFICATION_DIGEST_STATUS_GROUP_TERMINAL;

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const NOTIFICATION_DIGEST_STATUS_GROUP_PENDING = 'PENDING';

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_DIGEST_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * কমপ্লিটেড গ্রুপ
 * @description সম্পন্ন স্ট্যাটাস
 */
export const NOTIFICATION_DIGEST_STATUS_GROUP_COMPLETED = 'COMPLETED';

/**
 * ফেইলড গ্রুপ
 * @description ব্যর্থ স্ট্যাটাস
 */
export const NOTIFICATION_DIGEST_STATUS_GROUP_FAILED = 'FAILED';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const NOTIFICATION_DIGEST_STATUS_GROUP_TERMINAL = 'TERMINAL';

// ============================================
// ৩. ডাইজেস্ট স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_DIGEST_STATUS_TO_GROUP: Record<
  NotificationDigestStatus,
  NotificationDigestStatusGroup
> = {
  [NOTIFICATION_DIGEST_STATUS_PENDING]: NOTIFICATION_DIGEST_STATUS_GROUP_PENDING,
  [NOTIFICATION_DIGEST_STATUS_PROCESSING]: NOTIFICATION_DIGEST_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_DIGEST_STATUS_COMPLETED]: NOTIFICATION_DIGEST_STATUS_GROUP_COMPLETED,
  [NOTIFICATION_DIGEST_STATUS_FAILED]: NOTIFICATION_DIGEST_STATUS_GROUP_FAILED,
  [NOTIFICATION_DIGEST_STATUS_PARTIAL]: NOTIFICATION_DIGEST_STATUS_GROUP_FAILED,
  [NOTIFICATION_DIGEST_STATUS_CANCELLED]: NOTIFICATION_DIGEST_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DIGEST_STATUS_SCHEDULED]: NOTIFICATION_DIGEST_STATUS_GROUP_PENDING,
  [NOTIFICATION_DIGEST_STATUS_QUEUED]: NOTIFICATION_DIGEST_STATUS_GROUP_PENDING,
  [NOTIFICATION_DIGEST_STATUS_GENERATING]: NOTIFICATION_DIGEST_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_DIGEST_STATUS_SENT]: NOTIFICATION_DIGEST_STATUS_GROUP_COMPLETED,
  [NOTIFICATION_DIGEST_STATUS_DELIVERED]: NOTIFICATION_DIGEST_STATUS_GROUP_COMPLETED,
  [NOTIFICATION_DIGEST_STATUS_EXPIRED]: NOTIFICATION_DIGEST_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DIGEST_STATUS_ARCHIVED]: NOTIFICATION_DIGEST_STATUS_GROUP_TERMINAL,
};

// ============================================
// ৪. ডাইজেস্ট স্ট্যাটাস লেবেল
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_DIGEST_STATUS_LABELS: Record<NotificationDigestStatus, string> = {
  [NOTIFICATION_DIGEST_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_DIGEST_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [NOTIFICATION_DIGEST_STATUS_COMPLETED]: 'সম্পন্ন',
  [NOTIFICATION_DIGEST_STATUS_FAILED]: 'ব্যর্থ',
  [NOTIFICATION_DIGEST_STATUS_PARTIAL]: 'আংশিক',
  [NOTIFICATION_DIGEST_STATUS_CANCELLED]: 'বাতিল',
  [NOTIFICATION_DIGEST_STATUS_SCHEDULED]: 'নির্ধারিত',
  [NOTIFICATION_DIGEST_STATUS_QUEUED]: 'সারিবদ্ধ',
  [NOTIFICATION_DIGEST_STATUS_GENERATING]: 'তৈরি হচ্ছে',
  [NOTIFICATION_DIGEST_STATUS_SENT]: 'পাঠানো হয়েছে',
  [NOTIFICATION_DIGEST_STATUS_DELIVERED]: 'পৌঁছেছে',
  [NOTIFICATION_DIGEST_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [NOTIFICATION_DIGEST_STATUS_ARCHIVED]: 'আর্কাইভ',
};

// ============================================
// ৫. ডাইজেস্ট স্ট্যাটাস আইকন
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস আইকন
 */
export const NOTIFICATION_DIGEST_STATUS_ICONS: Record<NotificationDigestStatus, string> = {
  [NOTIFICATION_DIGEST_STATUS_PENDING]: 'pending',
  [NOTIFICATION_DIGEST_STATUS_PROCESSING]: 'processing',
  [NOTIFICATION_DIGEST_STATUS_COMPLETED]: 'done_all',
  [NOTIFICATION_DIGEST_STATUS_FAILED]: 'error',
  [NOTIFICATION_DIGEST_STATUS_PARTIAL]: 'partial',
  [NOTIFICATION_DIGEST_STATUS_CANCELLED]: 'block',
  [NOTIFICATION_DIGEST_STATUS_SCHEDULED]: 'schedule',
  [NOTIFICATION_DIGEST_STATUS_QUEUED]: 'queue',
  [NOTIFICATION_DIGEST_STATUS_GENERATING]: 'build',
  [NOTIFICATION_DIGEST_STATUS_SENT]: 'send',
  [NOTIFICATION_DIGEST_STATUS_DELIVERED]: 'check_circle',
  [NOTIFICATION_DIGEST_STATUS_EXPIRED]: 'timer',
  [NOTIFICATION_DIGEST_STATUS_ARCHIVED]: 'archive',
};

// ============================================
// ৬. ডাইজেস্ট স্ট্যাটাস কালার
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস কালার
 */
export const NOTIFICATION_DIGEST_STATUS_COLORS: Record<NotificationDigestStatus, string> = {
  [NOTIFICATION_DIGEST_STATUS_PENDING]: '#FFC107', // Amber
  [NOTIFICATION_DIGEST_STATUS_PROCESSING]: '#2196F3', // Blue
  [NOTIFICATION_DIGEST_STATUS_COMPLETED]: '#4CAF50', // Green
  [NOTIFICATION_DIGEST_STATUS_FAILED]: '#F44336', // Red
  [NOTIFICATION_DIGEST_STATUS_PARTIAL]: '#FFAB00', // Yellow
  [NOTIFICATION_DIGEST_STATUS_CANCELLED]: '#757575', // Dark Grey
  [NOTIFICATION_DIGEST_STATUS_SCHEDULED]: '#FF9800', // Orange
  [NOTIFICATION_DIGEST_STATUS_QUEUED]: '#FF6F00', // Dark Amber
  [NOTIFICATION_DIGEST_STATUS_GENERATING]: '#00BCD4', // Cyan
  [NOTIFICATION_DIGEST_STATUS_SENT]: '#8BC34A', // Light Green
  [NOTIFICATION_DIGEST_STATUS_DELIVERED]: '#4CAF50', // Green
  [NOTIFICATION_DIGEST_STATUS_EXPIRED]: '#795548', // Brown
  [NOTIFICATION_DIGEST_STATUS_ARCHIVED]: '#607D8B', // Blue Grey
};

// ============================================
// ৭. টার্মিনাল ডাইজেস্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল ডাইজেস্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const NOTIFICATION_DIGEST_TERMINAL_STATUSES: NotificationDigestStatus[] = [
  NOTIFICATION_DIGEST_STATUS_COMPLETED,
  NOTIFICATION_DIGEST_STATUS_FAILED,
  NOTIFICATION_DIGEST_STATUS_CANCELLED,
  NOTIFICATION_DIGEST_STATUS_EXPIRED,
  NOTIFICATION_DIGEST_STATUS_ARCHIVED,
];

// ============================================
// ৮. অ্যাক্টিভ ডাইজেস্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ ডাইজেস্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও চলমান
 */
export const NOTIFICATION_DIGEST_ACTIVE_STATUSES: NotificationDigestStatus[] = [
  NOTIFICATION_DIGEST_STATUS_PROCESSING,
  NOTIFICATION_DIGEST_STATUS_GENERATING,
  NOTIFICATION_DIGEST_STATUS_QUEUED,
];

// ============================================
// ৯. পেন্ডিং ডাইজেস্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * পেন্ডিং ডাইজেস্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো অপেক্ষমান
 */
export const NOTIFICATION_DIGEST_PENDING_STATUSES: NotificationDigestStatus[] = [
  NOTIFICATION_DIGEST_STATUS_PENDING,
  NOTIFICATION_DIGEST_STATUS_SCHEDULED,
];

// ============================================
// ১০. ডাইজেস্ট স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * ডাইজেস্ট স্ট্যাটাস কনফিগারেশন
 */
export interface NotificationDigestStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: NotificationDigestStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: NotificationDigestStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** পেন্ডিং স্ট্যাটাস কিনা */
  isPending: boolean;
}

/**
 * সব ডাইজেস্ট স্ট্যাটাসের কনফিগারেশন
 */
export const NOTIFICATION_DIGEST_STATUS_CONFIGS: NotificationDigestStatusConfig[] = [
  {
    status: NOTIFICATION_DIGEST_STATUS_PENDING,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_PENDING],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_PENDING],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_PENDING],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_PENDING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_PROCESSING,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_PROCESSING],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_PROCESSING],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_PROCESSING],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_PROCESSING],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_COMPLETED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_COMPLETED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_COMPLETED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_COMPLETED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_COMPLETED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_FAILED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_FAILED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_FAILED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_FAILED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_FAILED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_PARTIAL,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_PARTIAL],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_PARTIAL],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_PARTIAL],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_PARTIAL],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_CANCELLED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_CANCELLED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_CANCELLED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_CANCELLED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_CANCELLED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_SCHEDULED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_SCHEDULED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_SCHEDULED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_SCHEDULED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_SCHEDULED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_QUEUED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_QUEUED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_QUEUED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_QUEUED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_QUEUED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_GENERATING,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_GENERATING],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_GENERATING],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_GENERATING],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_GENERATING],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_SENT,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_SENT],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_SENT],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_SENT],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_SENT],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_DELIVERED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_DELIVERED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_DELIVERED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_DELIVERED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_DELIVERED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_EXPIRED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_EXPIRED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_EXPIRED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_EXPIRED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DIGEST_STATUS_ARCHIVED,
    label: NOTIFICATION_DIGEST_STATUS_LABELS[NOTIFICATION_DIGEST_STATUS_ARCHIVED],
    icon: NOTIFICATION_DIGEST_STATUS_ICONS[NOTIFICATION_DIGEST_STATUS_ARCHIVED],
    color: NOTIFICATION_DIGEST_STATUS_COLORS[NOTIFICATION_DIGEST_STATUS_ARCHIVED],
    group: NOTIFICATION_DIGEST_STATUS_TO_GROUP[NOTIFICATION_DIGEST_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
];
