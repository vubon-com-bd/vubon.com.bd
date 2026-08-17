// ============================================
// রিপোর্ট স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. রিপোর্ট স্ট্যাটাস
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস
 * রিপোর্টের বর্তমান অবস্থা নির্দেশ করে
 */
export type NotificationReportStatus =
  | typeof NOTIFICATION_REPORT_STATUS_PENDING
  | typeof NOTIFICATION_REPORT_STATUS_PROCESSING
  | typeof NOTIFICATION_REPORT_STATUS_COMPLETED
  | typeof NOTIFICATION_REPORT_STATUS_FAILED
  | typeof NOTIFICATION_REPORT_STATUS_EXPIRED
  | typeof NOTIFICATION_REPORT_STATUS_CANCELLED
  | typeof NOTIFICATION_REPORT_STATUS_QUEUED
  | typeof NOTIFICATION_REPORT_STATUS_PARTIAL
  | typeof NOTIFICATION_REPORT_STATUS_GENERATING
  | typeof NOTIFICATION_REPORT_STATUS_SENT
  | typeof NOTIFICATION_REPORT_STATUS_ARCHIVED
  | typeof NOTIFICATION_REPORT_STATUS_SCHEDULED
  | typeof NOTIFICATION_REPORT_STATUS_RETRYING
  | typeof NOTIFICATION_REPORT_STATUS_TIMEOUT
  | typeof NOTIFICATION_REPORT_STATUS_DRAFT;

/**
 * পেন্ডিং স্ট্যাটাস
 * @description রিপোর্ট জেনারেশনের অপেক্ষায়
 */
export const NOTIFICATION_REPORT_STATUS_PENDING = 'PENDING';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description রিপোর্ট প্রক্রিয়াকরণ চলছে
 */
export const NOTIFICATION_REPORT_STATUS_PROCESSING = 'PROCESSING';

/**
 * কমপ্লিটেড স্ট্যাটাস
 * @description রিপোর্ট সম্পন্ন হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_COMPLETED = 'COMPLETED';

/**
 * ফেইলড স্ট্যাটাস
 * @description রিপোর্ট ব্যর্থ হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description রিপোর্টের মেয়াদ শেষ
 */
export const NOTIFICATION_REPORT_STATUS_EXPIRED = 'EXPIRED';

/**
 * ক্যান্সেলড স্ট্যাটাস
 * @description রিপোর্ট বাতিল করা হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_CANCELLED = 'CANCELLED';

/**
 * কিউড স্ট্যাটাস
 * @description রিপোর্ট সারিবদ্ধ করা হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_QUEUED = 'QUEUED';

/**
 * পার্শিয়াল স্ট্যাটাস
 * @description রিপোর্ট আংশিকভাবে সম্পন্ন হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_PARTIAL = 'PARTIAL';

/**
 * জেনারেটিং স্ট্যাটাস
 * @description রিপোর্ট তৈরি হচ্ছে
 */
export const NOTIFICATION_REPORT_STATUS_GENERATING = 'GENERATING';

/**
 * সেন্ট স্ট্যাটাস
 * @description রিপোর্ট পাঠানো হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_SENT = 'SENT';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description রিপোর্ট আর্কাইভ করা হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description রিপোর্ট নির্ধারিত সময়ে জেনারেট হবে
 */
export const NOTIFICATION_REPORT_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * রিট্রাইং স্ট্যাটাস
 * @description রিপোর্ট পুনরায় চেষ্টা করছে
 */
export const NOTIFICATION_REPORT_STATUS_RETRYING = 'RETRYING';

/**
 * টাইমআউট স্ট্যাটাস
 * @description রিপোর্ট টাইমআউট হয়েছে
 */
export const NOTIFICATION_REPORT_STATUS_TIMEOUT = 'TIMEOUT';

/**
 * ড্রাফট স্ট্যাটাস
 * @description রিপোর্ট খসড়া হিসেবে সংরক্ষিত
 */
export const NOTIFICATION_REPORT_STATUS_DRAFT = 'DRAFT';

// ============================================
// ২. রিপোর্ট স্ট্যাটাস গ্রুপ
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস গ্রুপ
 */
export type NotificationReportStatusGroup =
  | typeof NOTIFICATION_REPORT_STATUS_GROUP_PENDING
  | typeof NOTIFICATION_REPORT_STATUS_GROUP_ACTIVE
  | typeof NOTIFICATION_REPORT_STATUS_GROUP_COMPLETED
  | typeof NOTIFICATION_REPORT_STATUS_GROUP_FAILED
  | typeof NOTIFICATION_REPORT_STATUS_GROUP_TERMINAL;

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const NOTIFICATION_REPORT_STATUS_GROUP_PENDING = 'PENDING';

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_REPORT_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * কমপ্লিটেড গ্রুপ
 * @description সম্পন্ন স্ট্যাটাস
 */
export const NOTIFICATION_REPORT_STATUS_GROUP_COMPLETED = 'COMPLETED';

/**
 * ফেইলড গ্রুপ
 * @description ব্যর্থ স্ট্যাটাস
 */
export const NOTIFICATION_REPORT_STATUS_GROUP_FAILED = 'FAILED';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const NOTIFICATION_REPORT_STATUS_GROUP_TERMINAL = 'TERMINAL';

// ============================================
// ৩. রিপোর্ট স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_REPORT_STATUS_TO_GROUP: Record<
  NotificationReportStatus,
  NotificationReportStatusGroup
> = {
  [NOTIFICATION_REPORT_STATUS_PENDING]: NOTIFICATION_REPORT_STATUS_GROUP_PENDING,
  [NOTIFICATION_REPORT_STATUS_PROCESSING]: NOTIFICATION_REPORT_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_REPORT_STATUS_COMPLETED]: NOTIFICATION_REPORT_STATUS_GROUP_COMPLETED,
  [NOTIFICATION_REPORT_STATUS_FAILED]: NOTIFICATION_REPORT_STATUS_GROUP_FAILED,
  [NOTIFICATION_REPORT_STATUS_EXPIRED]: NOTIFICATION_REPORT_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_REPORT_STATUS_CANCELLED]: NOTIFICATION_REPORT_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_REPORT_STATUS_QUEUED]: NOTIFICATION_REPORT_STATUS_GROUP_PENDING,
  [NOTIFICATION_REPORT_STATUS_PARTIAL]: NOTIFICATION_REPORT_STATUS_GROUP_FAILED,
  [NOTIFICATION_REPORT_STATUS_GENERATING]: NOTIFICATION_REPORT_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_REPORT_STATUS_SENT]: NOTIFICATION_REPORT_STATUS_GROUP_COMPLETED,
  [NOTIFICATION_REPORT_STATUS_ARCHIVED]: NOTIFICATION_REPORT_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_REPORT_STATUS_SCHEDULED]: NOTIFICATION_REPORT_STATUS_GROUP_PENDING,
  [NOTIFICATION_REPORT_STATUS_RETRYING]: NOTIFICATION_REPORT_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_REPORT_STATUS_TIMEOUT]: NOTIFICATION_REPORT_STATUS_GROUP_FAILED,
  [NOTIFICATION_REPORT_STATUS_DRAFT]: NOTIFICATION_REPORT_STATUS_GROUP_PENDING,
};

// ============================================
// ৪. রিপোর্ট স্ট্যাটাস লেবেল
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_REPORT_STATUS_LABELS: Record<NotificationReportStatus, string> = {
  [NOTIFICATION_REPORT_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_REPORT_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [NOTIFICATION_REPORT_STATUS_COMPLETED]: 'সম্পন্ন',
  [NOTIFICATION_REPORT_STATUS_FAILED]: 'ব্যর্থ',
  [NOTIFICATION_REPORT_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [NOTIFICATION_REPORT_STATUS_CANCELLED]: 'বাতিল',
  [NOTIFICATION_REPORT_STATUS_QUEUED]: 'সারিবদ্ধ',
  [NOTIFICATION_REPORT_STATUS_PARTIAL]: 'আংশিক',
  [NOTIFICATION_REPORT_STATUS_GENERATING]: 'তৈরি হচ্ছে',
  [NOTIFICATION_REPORT_STATUS_SENT]: 'পাঠানো হয়েছে',
  [NOTIFICATION_REPORT_STATUS_ARCHIVED]: 'আর্কাইভ',
  [NOTIFICATION_REPORT_STATUS_SCHEDULED]: 'নির্ধারিত',
  [NOTIFICATION_REPORT_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
  [NOTIFICATION_REPORT_STATUS_TIMEOUT]: 'টাইমআউট',
  [NOTIFICATION_REPORT_STATUS_DRAFT]: 'খসড়া',
};

// ============================================
// ৫. রিপোর্ট স্ট্যাটাস আইকন
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস আইকন
 */
export const NOTIFICATION_REPORT_STATUS_ICONS: Record<NotificationReportStatus, string> = {
  [NOTIFICATION_REPORT_STATUS_PENDING]: 'pending',
  [NOTIFICATION_REPORT_STATUS_PROCESSING]: 'processing',
  [NOTIFICATION_REPORT_STATUS_COMPLETED]: 'done_all',
  [NOTIFICATION_REPORT_STATUS_FAILED]: 'error',
  [NOTIFICATION_REPORT_STATUS_EXPIRED]: 'timer_off',
  [NOTIFICATION_REPORT_STATUS_CANCELLED]: 'block',
  [NOTIFICATION_REPORT_STATUS_QUEUED]: 'queue',
  [NOTIFICATION_REPORT_STATUS_PARTIAL]: 'partial',
  [NOTIFICATION_REPORT_STATUS_GENERATING]: 'build',
  [NOTIFICATION_REPORT_STATUS_SENT]: 'send',
  [NOTIFICATION_REPORT_STATUS_ARCHIVED]: 'archive',
  [NOTIFICATION_REPORT_STATUS_SCHEDULED]: 'schedule',
  [NOTIFICATION_REPORT_STATUS_RETRYING]: 'retry',
  [NOTIFICATION_REPORT_STATUS_TIMEOUT]: 'hourglass_empty',
  [NOTIFICATION_REPORT_STATUS_DRAFT]: 'draft',
};

// ============================================
// ৬. রিপোর্ট স্ট্যাটাস কালার
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস কালার
 */
export const NOTIFICATION_REPORT_STATUS_COLORS: Record<NotificationReportStatus, string> = {
  [NOTIFICATION_REPORT_STATUS_PENDING]: '#FFC107', // Amber
  [NOTIFICATION_REPORT_STATUS_PROCESSING]: '#2196F3', // Blue
  [NOTIFICATION_REPORT_STATUS_COMPLETED]: '#4CAF50', // Green
  [NOTIFICATION_REPORT_STATUS_FAILED]: '#F44336', // Red
  [NOTIFICATION_REPORT_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [NOTIFICATION_REPORT_STATUS_CANCELLED]: '#757575', // Dark Grey
  [NOTIFICATION_REPORT_STATUS_QUEUED]: '#FF9800', // Orange
  [NOTIFICATION_REPORT_STATUS_PARTIAL]: '#FFAB00', // Yellow
  [NOTIFICATION_REPORT_STATUS_GENERATING]: '#00BCD4', // Cyan
  [NOTIFICATION_REPORT_STATUS_SENT]: '#8BC34A', // Light Green
  [NOTIFICATION_REPORT_STATUS_ARCHIVED]: '#607D8B', // Blue Grey
  [NOTIFICATION_REPORT_STATUS_SCHEDULED]: '#3F51B5', // Indigo
  [NOTIFICATION_REPORT_STATUS_RETRYING]: '#FF6F00', // Dark Amber
  [NOTIFICATION_REPORT_STATUS_TIMEOUT]: '#D32F2F', // Dark Red
  [NOTIFICATION_REPORT_STATUS_DRAFT]: '#9E9E9E', // Grey
};

// ============================================
// ৭. টার্মিনাল রিপোর্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল রিপোর্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const NOTIFICATION_REPORT_TERMINAL_STATUSES: NotificationReportStatus[] = [
  NOTIFICATION_REPORT_STATUS_COMPLETED,
  NOTIFICATION_REPORT_STATUS_FAILED,
  NOTIFICATION_REPORT_STATUS_EXPIRED,
  NOTIFICATION_REPORT_STATUS_CANCELLED,
  NOTIFICATION_REPORT_STATUS_ARCHIVED,
  NOTIFICATION_REPORT_STATUS_TIMEOUT,
];

// ============================================
// ৮. অ্যাক্টিভ রিপোর্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ রিপোর্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও চলমান
 */
export const NOTIFICATION_REPORT_ACTIVE_STATUSES: NotificationReportStatus[] = [
  NOTIFICATION_REPORT_STATUS_PROCESSING,
  NOTIFICATION_REPORT_STATUS_GENERATING,
  NOTIFICATION_REPORT_STATUS_RETRYING,
];

// ============================================
// ৯. পেন্ডিং রিপোর্ট স্ট্যাটাসসমূহ
// ============================================

/**
 * পেন্ডিং রিপোর্ট স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো অপেক্ষমান
 */
export const NOTIFICATION_REPORT_PENDING_STATUSES: NotificationReportStatus[] = [
  NOTIFICATION_REPORT_STATUS_PENDING,
  NOTIFICATION_REPORT_STATUS_QUEUED,
  NOTIFICATION_REPORT_STATUS_SCHEDULED,
  NOTIFICATION_REPORT_STATUS_DRAFT,
];

// ============================================
// ১০. রিপোর্ট স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * রিপোর্ট স্ট্যাটাস কনফিগারেশন
 */
export interface NotificationReportStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: NotificationReportStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: NotificationReportStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** পেন্ডিং স্ট্যাটাস কিনা */
  isPending: boolean;
}

/**
 * সব রিপোর্ট স্ট্যাটাসের কনফিগারেশন
 */
export const NOTIFICATION_REPORT_STATUS_CONFIGS: NotificationReportStatusConfig[] = [
  {
    status: NOTIFICATION_REPORT_STATUS_PENDING,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_PENDING],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_PENDING],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_PENDING],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_PENDING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_PROCESSING,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_PROCESSING],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_PROCESSING],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_PROCESSING],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_PROCESSING],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_COMPLETED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_COMPLETED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_COMPLETED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_COMPLETED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_COMPLETED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_FAILED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_FAILED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_FAILED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_FAILED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_FAILED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_EXPIRED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_EXPIRED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_EXPIRED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_EXPIRED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_CANCELLED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_CANCELLED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_CANCELLED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_CANCELLED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_CANCELLED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_QUEUED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_QUEUED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_QUEUED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_QUEUED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_QUEUED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_PARTIAL,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_PARTIAL],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_PARTIAL],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_PARTIAL],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_PARTIAL],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_GENERATING,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_GENERATING],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_GENERATING],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_GENERATING],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_GENERATING],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_SENT,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_SENT],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_SENT],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_SENT],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_SENT],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_ARCHIVED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_ARCHIVED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_ARCHIVED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_ARCHIVED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_SCHEDULED,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_SCHEDULED],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_SCHEDULED],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_SCHEDULED],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_SCHEDULED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_RETRYING,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_RETRYING],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_RETRYING],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_RETRYING],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_RETRYING],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_TIMEOUT,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_TIMEOUT],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_TIMEOUT],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_TIMEOUT],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_TIMEOUT],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_REPORT_STATUS_DRAFT,
    label: NOTIFICATION_REPORT_STATUS_LABELS[NOTIFICATION_REPORT_STATUS_DRAFT],
    icon: NOTIFICATION_REPORT_STATUS_ICONS[NOTIFICATION_REPORT_STATUS_DRAFT],
    color: NOTIFICATION_REPORT_STATUS_COLORS[NOTIFICATION_REPORT_STATUS_DRAFT],
    group: NOTIFICATION_REPORT_STATUS_TO_GROUP[NOTIFICATION_REPORT_STATUS_DRAFT],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
];
