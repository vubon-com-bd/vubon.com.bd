// ============================================
// নোটিফিকেশন প্রায়োরিটি সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. নোটিফিকেশন প্রায়োরিটি লেভেল
// ============================================

/**
 * নোটিফিকেশন প্রায়োরিটি
 * নোটিফিকেশনের গুরুত্ব ও জরুরিতা নির্দেশ করে
 */
export type NotificationPriority =
  | typeof NOTIFICATION_PRIORITY_LOW
  | typeof NOTIFICATION_PRIORITY_MEDIUM
  | typeof NOTIFICATION_PRIORITY_HIGH
  | typeof NOTIFICATION_PRIORITY_URGENT
  | typeof NOTIFICATION_PRIORITY_CRITICAL
  | typeof NOTIFICATION_PRIORITY_INFO
  | typeof NOTIFICATION_PRIORITY_WARNING
  | typeof NOTIFICATION_PRIORITY_ERROR
  | typeof NOTIFICATION_PRIORITY_DEBUG
  | typeof NOTIFICATION_PRIORITY_TRACE
  | typeof NOTIFICATION_PRIORITY_VERBOSE;

/**
 * লো প্রায়োরিটি
 * @description কম গুরুত্বপূর্ণ নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_LOW = 'LOW';

/**
 * মিডিয়াম প্রায়োরিটি
 * @description মাঝারি গুরুত্বের নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_MEDIUM = 'MEDIUM';

/**
 * হাই প্রায়োরিটি
 * @description উচ্চ গুরুত্বের নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_HIGH = 'HIGH';

/**
 * আর্জেন্ট প্রায়োরিটি
 * @description জরুরি নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_URGENT = 'URGENT';

/**
 * ক্রিটিকাল প্রায়োরিটি
 * @description অত্যন্ত গুরুত্বপূর্ণ নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_CRITICAL = 'CRITICAL';

/**
 * ইনফো প্রায়োরিটি
 * @description তথ্যমূলক নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_INFO = 'INFO';

/**
 * ওয়ার্নিং প্রায়োরিটি
 * @description সতর্কীকরণ নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_WARNING = 'WARNING';

/**
 * এরর প্রায়োরিটি
 * @description ত্রুটি সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_ERROR = 'ERROR';

/**
 * ডিবাগ প্রায়োরিটি
 * @description ডিবাগিংয়ের জন্য নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_DEBUG = 'DEBUG';

/**
 * ট্রেস প্রায়োরিটি
 * @description ট্রেসিংয়ের জন্য নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_TRACE = 'TRACE';

/**
 * ভার্বোজ প্রায়োরিটি
 * @description বিস্তারিত তথ্যসমৃদ্ধ নোটিফিকেশন
 */
export const NOTIFICATION_PRIORITY_VERBOSE = 'VERBOSE';

// ============================================
// ২. প্রায়োরিটি লেভেল (সংখ্যাসূচক মান)
// ============================================

/**
 * প্রায়োরিটি লেভেল
 * সংখ্যাসূচক মান (০ = সর্বনিম্ন, ১০ = সর্বোচ্চ)
 */
export const NOTIFICATION_PRIORITY_LEVELS: Record<NotificationPriority, number> = {
  [NOTIFICATION_PRIORITY_VERBOSE]: 0,
  [NOTIFICATION_PRIORITY_TRACE]: 1,
  [NOTIFICATION_PRIORITY_DEBUG]: 2,
  [NOTIFICATION_PRIORITY_INFO]: 3,
  [NOTIFICATION_PRIORITY_LOW]: 4,
  [NOTIFICATION_PRIORITY_MEDIUM]: 5,
  [NOTIFICATION_PRIORITY_WARNING]: 6,
  [NOTIFICATION_PRIORITY_HIGH]: 7,
  [NOTIFICATION_PRIORITY_ERROR]: 8,
  [NOTIFICATION_PRIORITY_URGENT]: 9,
  [NOTIFICATION_PRIORITY_CRITICAL]: 10,
};

// ============================================
// ৩. প্রায়োরিটি লেবেল
// ============================================

/**
 * নোটিফিকেশন প্রায়োরিটি লেবেল
 * প্রতিটি প্রায়োরিটির জন্য মানব-পাঠযোগ্য লেবেল
 */
export const NOTIFICATION_PRIORITY_LABELS: Record<NotificationPriority, string> = {
  [NOTIFICATION_PRIORITY_LOW]: 'নিম্ন',
  [NOTIFICATION_PRIORITY_MEDIUM]: 'মাঝারি',
  [NOTIFICATION_PRIORITY_HIGH]: 'উচ্চ',
  [NOTIFICATION_PRIORITY_URGENT]: 'জরুরি',
  [NOTIFICATION_PRIORITY_CRITICAL]: 'অত্যন্ত জরুরি',
  [NOTIFICATION_PRIORITY_INFO]: 'তথ্য',
  [NOTIFICATION_PRIORITY_WARNING]: 'সতর্কীকরণ',
  [NOTIFICATION_PRIORITY_ERROR]: 'ত্রুটি',
  [NOTIFICATION_PRIORITY_DEBUG]: 'ডিবাগ',
  [NOTIFICATION_PRIORITY_TRACE]: 'ট্রেস',
  [NOTIFICATION_PRIORITY_VERBOSE]: 'বিস্তারিত',
};

// ============================================
// ৪. প্রায়োরিটি আইকন
// ============================================

/**
 * নোটিফিকেশন প্রায়োরিটি আইকন
 * প্রতিটি প্রায়োরিটির জন্য আইকন নাম
 */
export const NOTIFICATION_PRIORITY_ICONS: Record<NotificationPriority, string> = {
  [NOTIFICATION_PRIORITY_LOW]: 'low-priority',
  [NOTIFICATION_PRIORITY_MEDIUM]: 'medium-priority',
  [NOTIFICATION_PRIORITY_HIGH]: 'high-priority',
  [NOTIFICATION_PRIORITY_URGENT]: 'urgent',
  [NOTIFICATION_PRIORITY_CRITICAL]: 'critical',
  [NOTIFICATION_PRIORITY_INFO]: 'info',
  [NOTIFICATION_PRIORITY_WARNING]: 'warning',
  [NOTIFICATION_PRIORITY_ERROR]: 'error',
  [NOTIFICATION_PRIORITY_DEBUG]: 'bug-report',
  [NOTIFICATION_PRIORITY_TRACE]: 'track-changes',
  [NOTIFICATION_PRIORITY_VERBOSE]: 'description',
};

// ============================================
// ৫. প্রায়োরিটি কালার
// ============================================

/**
 * নোটিফিকেশন প্রায়োরিটি কালার
 * প্রতিটি প্রায়োরিটির জন্য কালার কোড
 */
export const NOTIFICATION_PRIORITY_COLORS: Record<NotificationPriority, string> = {
  [NOTIFICATION_PRIORITY_LOW]: '#8BC34A', // Light Green
  [NOTIFICATION_PRIORITY_MEDIUM]: '#FFC107', // Amber
  [NOTIFICATION_PRIORITY_HIGH]: '#FF9800', // Orange
  [NOTIFICATION_PRIORITY_URGENT]: '#FF5722', // Deep Orange
  [NOTIFICATION_PRIORITY_CRITICAL]: '#D32F2F', // Dark Red
  [NOTIFICATION_PRIORITY_INFO]: '#2196F3', // Blue
  [NOTIFICATION_PRIORITY_WARNING]: '#FF6F00', // Dark Amber
  [NOTIFICATION_PRIORITY_ERROR]: '#C62828', // Dark Red
  [NOTIFICATION_PRIORITY_DEBUG]: '#00BCD4', // Cyan
  [NOTIFICATION_PRIORITY_TRACE]: '#9C27B0', // Purple
  [NOTIFICATION_PRIORITY_VERBOSE]: '#607D8B', // Blue Grey
};

// ============================================
// ৬. প্রায়োরিটি গ্রুপ
// ============================================

/**
 * প্রায়োরিটি গ্রুপ
 */
export type NotificationPriorityGroup =
  | typeof NOTIFICATION_PRIORITY_GROUP_LOW
  | typeof NOTIFICATION_PRIORITY_GROUP_MEDIUM
  | typeof NOTIFICATION_PRIORITY_GROUP_HIGH
  | typeof NOTIFICATION_PRIORITY_GROUP_CRITICAL;

/**
 * লো গ্রুপ
 * @description নিম্ন গুরুত্বের প্রায়োরিটি
 */
export const NOTIFICATION_PRIORITY_GROUP_LOW = 'LOW';

/**
 * মিডিয়াম গ্রুপ
 * @description মাঝারি গুরুত্বের প্রায়োরিটি
 */
export const NOTIFICATION_PRIORITY_GROUP_MEDIUM = 'MEDIUM';

/**
 * হাই গ্রুপ
 * @description উচ্চ গুরুত্বের প্রায়োরিটি
 */
export const NOTIFICATION_PRIORITY_GROUP_HIGH = 'HIGH';

/**
 * ক্রিটিকাল গ্রুপ
 * @description অত্যন্ত গুরুত্বপূর্ণ প্রায়োরিটি
 */
export const NOTIFICATION_PRIORITY_GROUP_CRITICAL = 'CRITICAL';

// ============================================
// ৭. প্রায়োরিটি থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * প্রায়োরিটি থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_PRIORITY_TO_GROUP: Record<
  NotificationPriority,
  NotificationPriorityGroup
> = {
  [NOTIFICATION_PRIORITY_VERBOSE]: NOTIFICATION_PRIORITY_GROUP_LOW,
  [NOTIFICATION_PRIORITY_TRACE]: NOTIFICATION_PRIORITY_GROUP_LOW,
  [NOTIFICATION_PRIORITY_DEBUG]: NOTIFICATION_PRIORITY_GROUP_LOW,
  [NOTIFICATION_PRIORITY_INFO]: NOTIFICATION_PRIORITY_GROUP_LOW,
  [NOTIFICATION_PRIORITY_LOW]: NOTIFICATION_PRIORITY_GROUP_LOW,
  [NOTIFICATION_PRIORITY_MEDIUM]: NOTIFICATION_PRIORITY_GROUP_MEDIUM,
  [NOTIFICATION_PRIORITY_WARNING]: NOTIFICATION_PRIORITY_GROUP_MEDIUM,
  [NOTIFICATION_PRIORITY_HIGH]: NOTIFICATION_PRIORITY_GROUP_HIGH,
  [NOTIFICATION_PRIORITY_ERROR]: NOTIFICATION_PRIORITY_GROUP_HIGH,
  [NOTIFICATION_PRIORITY_URGENT]: NOTIFICATION_PRIORITY_GROUP_CRITICAL,
  [NOTIFICATION_PRIORITY_CRITICAL]: NOTIFICATION_PRIORITY_GROUP_CRITICAL,
};

// ============================================
// ৮. প্রায়োরিটি টাইমআউট (মিলিসেকেন্ডে)
// ============================================

/**
 * প্রায়োরিটি অনুযায়ী ডিফল্ট টাইমআউট
 * উচ্চ প্রায়োরিটির জন্য কম টাইমআউট
 */
export const NOTIFICATION_PRIORITY_TIMEOUTS: Record<NotificationPriority, number> = {
  [NOTIFICATION_PRIORITY_VERBOSE]: 30000, // 30 সেকেন্ড
  [NOTIFICATION_PRIORITY_TRACE]: 25000, // 25 সেকেন্ড
  [NOTIFICATION_PRIORITY_DEBUG]: 20000, // 20 সেকেন্ড
  [NOTIFICATION_PRIORITY_INFO]: 15000, // 15 সেকেন্ড
  [NOTIFICATION_PRIORITY_LOW]: 10000, // 10 সেকেন্ড
  [NOTIFICATION_PRIORITY_MEDIUM]: 8000, // 8 সেকেন্ড
  [NOTIFICATION_PRIORITY_WARNING]: 6000, // 6 সেকেন্ড
  [NOTIFICATION_PRIORITY_HIGH]: 5000, // 5 সেকেন্ড
  [NOTIFICATION_PRIORITY_ERROR]: 4000, // 4 সেকেন্ড
  [NOTIFICATION_PRIORITY_URGENT]: 3000, // 3 সেকেন্ড
  [NOTIFICATION_PRIORITY_CRITICAL]: 2000, // 2 সেকেন্ড
};

// ============================================
// ৯. প্রায়োরিটি রেট্রাই লিমিট
// ============================================

/**
 * প্রায়োরিটি অনুযায়ী রেট্রাই লিমিট
 * উচ্চ প্রায়োরিটির জন্য বেশি রেট্রাই
 */
export const NOTIFICATION_PRIORITY_RETRY_LIMITS: Record<NotificationPriority, number> = {
  [NOTIFICATION_PRIORITY_VERBOSE]: 1,
  [NOTIFICATION_PRIORITY_TRACE]: 1,
  [NOTIFICATION_PRIORITY_DEBUG]: 2,
  [NOTIFICATION_PRIORITY_INFO]: 2,
  [NOTIFICATION_PRIORITY_LOW]: 3,
  [NOTIFICATION_PRIORITY_MEDIUM]: 4,
  [NOTIFICATION_PRIORITY_WARNING]: 4,
  [NOTIFICATION_PRIORITY_HIGH]: 5,
  [NOTIFICATION_PRIORITY_ERROR]: 5,
  [NOTIFICATION_PRIORITY_URGENT]: 6,
  [NOTIFICATION_PRIORITY_CRITICAL]: 7,
};

// ============================================
// ১০. প্রায়োরিটি কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন প্রায়োরিটি কনফিগারেশন
 */
export interface NotificationPriorityConfig {
  /** প্রায়োরিটির নাম */
  priority: NotificationPriority;
  /** প্রায়োরিটির লেবেল */
  label: string;
  /** প্রায়োরিটির আইকন */
  icon: string;
  /** প্রায়োরিটির কালার */
  color: string;
  /** প্রায়োরিটির লেভেল (০-১০) */
  level: number;
  /** প্রায়োরিটির গ্রুপ */
  group: NotificationPriorityGroup;
  /** ডিফল্ট টাইমআউট (মিলিসেকেন্ডে) */
  timeout: number;
  /** ডিফল্ট রেট্রাই লিমিট */
  retryLimit: number;
}

/**
 * সব নোটিফিকেশন প্রায়োরিটির কনফিগারেশন
 */
export const NOTIFICATION_PRIORITY_CONFIGS: NotificationPriorityConfig[] = [
  {
    priority: NOTIFICATION_PRIORITY_VERBOSE,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_VERBOSE],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_VERBOSE],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_VERBOSE],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_VERBOSE],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_VERBOSE],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_VERBOSE],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_VERBOSE],
  },
  {
    priority: NOTIFICATION_PRIORITY_TRACE,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_TRACE],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_TRACE],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_TRACE],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_TRACE],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_TRACE],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_TRACE],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_TRACE],
  },
  {
    priority: NOTIFICATION_PRIORITY_DEBUG,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_DEBUG],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_DEBUG],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_DEBUG],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_DEBUG],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_DEBUG],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_DEBUG],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_DEBUG],
  },
  {
    priority: NOTIFICATION_PRIORITY_INFO,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_INFO],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_INFO],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_INFO],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_INFO],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_INFO],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_INFO],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_INFO],
  },
  {
    priority: NOTIFICATION_PRIORITY_LOW,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_LOW],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_LOW],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_LOW],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_LOW],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_LOW],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_LOW],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_LOW],
  },
  {
    priority: NOTIFICATION_PRIORITY_MEDIUM,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_MEDIUM],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_MEDIUM],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_MEDIUM],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_MEDIUM],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_MEDIUM],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_MEDIUM],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_MEDIUM],
  },
  {
    priority: NOTIFICATION_PRIORITY_WARNING,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_WARNING],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_WARNING],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_WARNING],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_WARNING],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_WARNING],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_WARNING],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_WARNING],
  },
  {
    priority: NOTIFICATION_PRIORITY_HIGH,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_HIGH],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_HIGH],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_HIGH],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_HIGH],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_HIGH],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_HIGH],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_HIGH],
  },
  {
    priority: NOTIFICATION_PRIORITY_ERROR,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_ERROR],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_ERROR],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_ERROR],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_ERROR],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_ERROR],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_ERROR],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_ERROR],
  },
  {
    priority: NOTIFICATION_PRIORITY_URGENT,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_URGENT],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_URGENT],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_URGENT],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_URGENT],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_URGENT],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_URGENT],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_URGENT],
  },
  {
    priority: NOTIFICATION_PRIORITY_CRITICAL,
    label: NOTIFICATION_PRIORITY_LABELS[NOTIFICATION_PRIORITY_CRITICAL],
    icon: NOTIFICATION_PRIORITY_ICONS[NOTIFICATION_PRIORITY_CRITICAL],
    color: NOTIFICATION_PRIORITY_COLORS[NOTIFICATION_PRIORITY_CRITICAL],
    level: NOTIFICATION_PRIORITY_LEVELS[NOTIFICATION_PRIORITY_CRITICAL],
    group: NOTIFICATION_PRIORITY_TO_GROUP[NOTIFICATION_PRIORITY_CRITICAL],
    timeout: NOTIFICATION_PRIORITY_TIMEOUTS[NOTIFICATION_PRIORITY_CRITICAL],
    retryLimit: NOTIFICATION_PRIORITY_RETRY_LIMITS[NOTIFICATION_PRIORITY_CRITICAL],
  },
];
