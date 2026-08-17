// ============================================
// ডিভাইস স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ডিভাইস স্ট্যাটাস
// ============================================

/**
 * ডিভাইস স্ট্যাটাস
 * ডিভাইসের বর্তমান অবস্থা নির্দেশ করে
 */
export type NotificationDeviceStatus =
  | typeof NOTIFICATION_DEVICE_STATUS_ACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_INACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_REGISTERED
  | typeof NOTIFICATION_DEVICE_STATUS_UNREGISTERED
  | typeof NOTIFICATION_DEVICE_STATUS_EXPIRED
  | typeof NOTIFICATION_DEVICE_STATUS_BLOCKED
  | typeof NOTIFICATION_DEVICE_STATUS_PENDING
  | typeof NOTIFICATION_DEVICE_STATUS_VERIFIED
  | typeof NOTIFICATION_DEVICE_STATUS_SUSPENDED
  | typeof NOTIFICATION_DEVICE_STATUS_REVOKED
  | typeof NOTIFICATION_DEVICE_STATUS_DELETED
  | typeof NOTIFICATION_DEVICE_STATUS_ARCHIVED
  | typeof NOTIFICATION_DEVICE_STATUS_MIGRATING
  | typeof NOTIFICATION_DEVICE_STATUS_DEPRECATED
  | typeof NOTIFICATION_DEVICE_STATUS_MAINTENANCE;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 * @description ডিভাইস সক্রিয় এবং ব্যবহারযোগ্য
 */
export const NOTIFICATION_DEVICE_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 * @description ডিভাইস নিষ্ক্রিয়
 */
export const NOTIFICATION_DEVICE_STATUS_INACTIVE = 'INACTIVE';

/**
 * রেজিস্টারড স্ট্যাটাস
 * @description ডিভাইস নিবন্ধিত
 */
export const NOTIFICATION_DEVICE_STATUS_REGISTERED = 'REGISTERED';

/**
 * আনরেজিস্টারড স্ট্যাটাস
 * @description ডিভাইস নিবন্ধিত নয়
 */
export const NOTIFICATION_DEVICE_STATUS_UNREGISTERED = 'UNREGISTERED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description ডিভাইসের মেয়াদ শেষ
 */
export const NOTIFICATION_DEVICE_STATUS_EXPIRED = 'EXPIRED';

/**
 * ব্লকড স্ট্যাটাস
 * @description ডিভাইস ব্লক করা হয়েছে
 */
export const NOTIFICATION_DEVICE_STATUS_BLOCKED = 'BLOCKED';

/**
 * পেন্ডিং স্ট্যাটাস
 * @description ডিভাইস যাচাইকরণের অপেক্ষায়
 */
export const NOTIFICATION_DEVICE_STATUS_PENDING = 'PENDING';

/**
 * ভেরিফাইড স্ট্যাটাস
 * @description ডিভাইস যাচাই করা হয়েছে
 */
export const NOTIFICATION_DEVICE_STATUS_VERIFIED = 'VERIFIED';

/**
 * সাসপেন্ডেড স্ট্যাটাস
 * @description ডিভাইস স্থগিত করা হয়েছে
 */
export const NOTIFICATION_DEVICE_STATUS_SUSPENDED = 'SUSPENDED';

/**
 * রিভোকড স্ট্যাটাস
 * @description ডিভাইসের অনুমোদন প্রত্যাহার
 */
export const NOTIFICATION_DEVICE_STATUS_REVOKED = 'REVOKED';

/**
 * ডিলিটেড স্ট্যাটাস
 * @description ডিভাইস মুছে ফেলা হয়েছে
 */
export const NOTIFICATION_DEVICE_STATUS_DELETED = 'DELETED';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description ডিভাইস আর্কাইভ করা হয়েছে
 */
export const NOTIFICATION_DEVICE_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * মাইগ্রেটিং স্ট্যাটাস
 * @description ডিভাইস মাইগ্রেশন চলছে
 */
export const NOTIFICATION_DEVICE_STATUS_MIGRATING = 'MIGRATING';

/**
 * ডিপ্রিকেটেড স্ট্যাটাস
 * @description ডিভাইস অপ্রচলিত
 */
export const NOTIFICATION_DEVICE_STATUS_DEPRECATED = 'DEPRECATED';

/**
 * মেইনটেন্যান্স স্ট্যাটাস
 * @description ডিভাইস রক্ষণাবেক্ষণে
 */
export const NOTIFICATION_DEVICE_STATUS_MAINTENANCE = 'MAINTENANCE';

// ============================================
// ২. ডিভাইস স্ট্যাটাস গ্রুপ
// ============================================

/**
 * ডিভাইস স্ট্যাটাস গ্রুপ
 */
export type NotificationDeviceStatusGroup =
  | typeof NOTIFICATION_DEVICE_STATUS_GROUP_ACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE
  | typeof NOTIFICATION_DEVICE_STATUS_GROUP_PENDING
  | typeof NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL
  | typeof NOTIFICATION_DEVICE_STATUS_GROUP_TRANSIENT;

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ গ্রুপ
 * @description নিষ্ক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE = 'INACTIVE';

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const NOTIFICATION_DEVICE_STATUS_GROUP_PENDING = 'PENDING';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL = 'TERMINAL';

/**
 * ট্রানজিয়েন্ট গ্রুপ
 * @description ক্ষণস্থায়ী অবস্থা
 */
export const NOTIFICATION_DEVICE_STATUS_GROUP_TRANSIENT = 'TRANSIENT';

// ============================================
// ৩. ডিভাইস স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ডিভাইস স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_DEVICE_STATUS_TO_GROUP: Record<
  NotificationDeviceStatus,
  NotificationDeviceStatusGroup
> = {
  [NOTIFICATION_DEVICE_STATUS_ACTIVE]: NOTIFICATION_DEVICE_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_DEVICE_STATUS_INACTIVE]: NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_DEVICE_STATUS_REGISTERED]: NOTIFICATION_DEVICE_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_DEVICE_STATUS_UNREGISTERED]: NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_DEVICE_STATUS_EXPIRED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_BLOCKED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_PENDING]: NOTIFICATION_DEVICE_STATUS_GROUP_PENDING,
  [NOTIFICATION_DEVICE_STATUS_VERIFIED]: NOTIFICATION_DEVICE_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_DEVICE_STATUS_SUSPENDED]: NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_DEVICE_STATUS_REVOKED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_DELETED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_ARCHIVED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_MIGRATING]: NOTIFICATION_DEVICE_STATUS_GROUP_TRANSIENT,
  [NOTIFICATION_DEVICE_STATUS_DEPRECATED]: NOTIFICATION_DEVICE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_DEVICE_STATUS_MAINTENANCE]: NOTIFICATION_DEVICE_STATUS_GROUP_INACTIVE,
};

// ============================================
// ৪. ডিভাইস স্ট্যাটাস লেবেল
// ============================================

/**
 * ডিভাইস স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_DEVICE_STATUS_LABELS: Record<NotificationDeviceStatus, string> = {
  [NOTIFICATION_DEVICE_STATUS_ACTIVE]: 'সক্রিয়',
  [NOTIFICATION_DEVICE_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [NOTIFICATION_DEVICE_STATUS_REGISTERED]: 'নিবন্ধিত',
  [NOTIFICATION_DEVICE_STATUS_UNREGISTERED]: 'নিবন্ধিত নয়',
  [NOTIFICATION_DEVICE_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [NOTIFICATION_DEVICE_STATUS_BLOCKED]: 'ব্লক',
  [NOTIFICATION_DEVICE_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_DEVICE_STATUS_VERIFIED]: 'যাচাইকৃত',
  [NOTIFICATION_DEVICE_STATUS_SUSPENDED]: 'স্থগিত',
  [NOTIFICATION_DEVICE_STATUS_REVOKED]: 'প্রত্যাহার',
  [NOTIFICATION_DEVICE_STATUS_DELETED]: 'মুছে ফেলা',
  [NOTIFICATION_DEVICE_STATUS_ARCHIVED]: 'আর্কাইভ',
  [NOTIFICATION_DEVICE_STATUS_MIGRATING]: 'মাইগ্রেটিং',
  [NOTIFICATION_DEVICE_STATUS_DEPRECATED]: 'অপ্রচলিত',
  [NOTIFICATION_DEVICE_STATUS_MAINTENANCE]: 'রক্ষণাবেক্ষণ',
};

// ============================================
// ৫. ডিভাইস স্ট্যাটাস আইকন
// ============================================

/**
 * ডিভাইস স্ট্যাটাস আইকন
 */
export const NOTIFICATION_DEVICE_STATUS_ICONS: Record<NotificationDeviceStatus, string> = {
  [NOTIFICATION_DEVICE_STATUS_ACTIVE]: 'check_circle',
  [NOTIFICATION_DEVICE_STATUS_INACTIVE]: 'cancel',
  [NOTIFICATION_DEVICE_STATUS_REGISTERED]: 'how_to_reg',
  [NOTIFICATION_DEVICE_STATUS_UNREGISTERED]: 'person_off',
  [NOTIFICATION_DEVICE_STATUS_EXPIRED]: 'timer_off',
  [NOTIFICATION_DEVICE_STATUS_BLOCKED]: 'block',
  [NOTIFICATION_DEVICE_STATUS_PENDING]: 'pending',
  [NOTIFICATION_DEVICE_STATUS_VERIFIED]: 'verified',
  [NOTIFICATION_DEVICE_STATUS_SUSPENDED]: 'pause_circle',
  [NOTIFICATION_DEVICE_STATUS_REVOKED]: 'gpp_bad',
  [NOTIFICATION_DEVICE_STATUS_DELETED]: 'delete',
  [NOTIFICATION_DEVICE_STATUS_ARCHIVED]: 'archive',
  [NOTIFICATION_DEVICE_STATUS_MIGRATING]: 'migration',
  [NOTIFICATION_DEVICE_STATUS_DEPRECATED]: 'warning',
  [NOTIFICATION_DEVICE_STATUS_MAINTENANCE]: 'build',
};

// ============================================
// ৬. ডিভাইস স্ট্যাটাস কালার
// ============================================

/**
 * ডিভাইস স্ট্যাটাস কালার
 */
export const NOTIFICATION_DEVICE_STATUS_COLORS: Record<NotificationDeviceStatus, string> = {
  [NOTIFICATION_DEVICE_STATUS_ACTIVE]: '#4CAF50', // Green
  [NOTIFICATION_DEVICE_STATUS_INACTIVE]: '#9E9E9E', // Grey
  [NOTIFICATION_DEVICE_STATUS_REGISTERED]: '#2196F3', // Blue
  [NOTIFICATION_DEVICE_STATUS_UNREGISTERED]: '#757575', // Dark Grey
  [NOTIFICATION_DEVICE_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [NOTIFICATION_DEVICE_STATUS_BLOCKED]: '#F44336', // Red
  [NOTIFICATION_DEVICE_STATUS_PENDING]: '#FFC107', // Amber
  [NOTIFICATION_DEVICE_STATUS_VERIFIED]: '#4CAF50', // Green
  [NOTIFICATION_DEVICE_STATUS_SUSPENDED]: '#FF9800', // Orange
  [NOTIFICATION_DEVICE_STATUS_REVOKED]: '#D32F2F', // Dark Red
  [NOTIFICATION_DEVICE_STATUS_DELETED]: '#757575', // Dark Grey
  [NOTIFICATION_DEVICE_STATUS_ARCHIVED]: '#607D8B', // Blue Grey
  [NOTIFICATION_DEVICE_STATUS_MIGRATING]: '#00BCD4', // Cyan
  [NOTIFICATION_DEVICE_STATUS_DEPRECATED]: '#FF5722', // Deep Orange
  [NOTIFICATION_DEVICE_STATUS_MAINTENANCE]: '#795548', // Brown
};

// ============================================
// ৭. টার্মিনাল ডিভাইস স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল ডিভাইস স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const NOTIFICATION_DEVICE_TERMINAL_STATUSES: NotificationDeviceStatus[] = [
  NOTIFICATION_DEVICE_STATUS_EXPIRED,
  NOTIFICATION_DEVICE_STATUS_BLOCKED,
  NOTIFICATION_DEVICE_STATUS_REVOKED,
  NOTIFICATION_DEVICE_STATUS_DELETED,
  NOTIFICATION_DEVICE_STATUS_ARCHIVED,
  NOTIFICATION_DEVICE_STATUS_DEPRECATED,
];

// ============================================
// ৮. অ্যাক্টিভ ডিভাইস স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ ডিভাইস স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো সক্রিয়
 */
export const NOTIFICATION_DEVICE_ACTIVE_STATUSES: NotificationDeviceStatus[] = [
  NOTIFICATION_DEVICE_STATUS_ACTIVE,
  NOTIFICATION_DEVICE_STATUS_REGISTERED,
  NOTIFICATION_DEVICE_STATUS_VERIFIED,
];

// ============================================
// ৯. পেন্ডিং ডিভাইস স্ট্যাটাসসমূহ
// ============================================

/**
 * পেন্ডিং ডিভাইস স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো অপেক্ষমান
 */
export const NOTIFICATION_DEVICE_PENDING_STATUSES: NotificationDeviceStatus[] = [
  NOTIFICATION_DEVICE_STATUS_PENDING,
  NOTIFICATION_DEVICE_STATUS_MIGRATING,
];

// ============================================
// ১০. ডিভাইস স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * ডিভাইস স্ট্যাটাস কনফিগারেশন
 */
export interface NotificationDeviceStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: NotificationDeviceStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: NotificationDeviceStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** পেন্ডিং স্ট্যাটাস কিনা */
  isPending: boolean;
}

/**
 * সব ডিভাইস স্ট্যাটাসের কনফিগারেশন
 */
export const NOTIFICATION_DEVICE_STATUS_CONFIGS: NotificationDeviceStatusConfig[] = [
  {
    status: NOTIFICATION_DEVICE_STATUS_ACTIVE,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_ACTIVE],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_ACTIVE],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_ACTIVE],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_ACTIVE],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_INACTIVE,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_INACTIVE],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_INACTIVE],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_INACTIVE],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_INACTIVE],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_REGISTERED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_REGISTERED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_REGISTERED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_REGISTERED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_REGISTERED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_UNREGISTERED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_UNREGISTERED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_UNREGISTERED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_UNREGISTERED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_UNREGISTERED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_EXPIRED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_EXPIRED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_EXPIRED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_EXPIRED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_BLOCKED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_BLOCKED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_BLOCKED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_BLOCKED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_BLOCKED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_PENDING,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_PENDING],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_PENDING],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_PENDING],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_PENDING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_VERIFIED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_VERIFIED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_VERIFIED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_VERIFIED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_VERIFIED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_SUSPENDED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_SUSPENDED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_SUSPENDED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_SUSPENDED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_SUSPENDED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_REVOKED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_REVOKED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_REVOKED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_REVOKED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_REVOKED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_DELETED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_DELETED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_DELETED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_DELETED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_DELETED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_ARCHIVED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_ARCHIVED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_ARCHIVED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_ARCHIVED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_MIGRATING,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_MIGRATING],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_MIGRATING],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_MIGRATING],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_MIGRATING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_DEPRECATED,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_DEPRECATED],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_DEPRECATED],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_DEPRECATED],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_DEPRECATED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_DEVICE_STATUS_MAINTENANCE,
    label: NOTIFICATION_DEVICE_STATUS_LABELS[NOTIFICATION_DEVICE_STATUS_MAINTENANCE],
    icon: NOTIFICATION_DEVICE_STATUS_ICONS[NOTIFICATION_DEVICE_STATUS_MAINTENANCE],
    color: NOTIFICATION_DEVICE_STATUS_COLORS[NOTIFICATION_DEVICE_STATUS_MAINTENANCE],
    group: NOTIFICATION_DEVICE_STATUS_TO_GROUP[NOTIFICATION_DEVICE_STATUS_MAINTENANCE],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
];
