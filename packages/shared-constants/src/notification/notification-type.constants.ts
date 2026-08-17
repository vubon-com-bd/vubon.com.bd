// ============================================
// নোটিফিকেশন টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. নোটিফিকেশন টাইপ
// ============================================

/**
 * নোটিফিকেশন টাইপ
 * বিভিন্ন ধরনের নোটিফিকেশন ক্যাটাগরাইজ করার জন্য
 */
export type NotificationType =
  | typeof NOTIFICATION_TYPE_SYSTEM
  | typeof NOTIFICATION_TYPE_USER
  | typeof NOTIFICATION_TYPE_PROMOTIONAL
  | typeof NOTIFICATION_TYPE_TRANSACTIONAL
  | typeof NOTIFICATION_TYPE_MARKETING
  | typeof NOTIFICATION_TYPE_ALERT
  | typeof NOTIFICATION_TYPE_REMINDER
  | typeof NOTIFICATION_TYPE_UPDATE
  | typeof NOTIFICATION_TYPE_WARNING
  | typeof NOTIFICATION_TYPE_ERROR
  | typeof NOTIFICATION_TYPE_SUCCESS
  | typeof NOTIFICATION_TYPE_INFO
  | typeof NOTIFICATION_TYPE_CUSTOM;

/**
 * সিস্টেম নোটিফিকেশন
 * @description সিস্টেম-জেনারেটেড নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_SYSTEM = 'SYSTEM';

/**
 * ইউজার নোটিফিকেশন
 * @description ইউজার-জেনারেটেড নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_USER = 'USER';

/**
 * প্রমোশনাল নোটিফিকেশন
 * @description প্রচারমূলক নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_PROMOTIONAL = 'PROMOTIONAL';

/**
 * ট্রানজেকশনাল নোটিফিকেশন
 * @description লেনদেন সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_TRANSACTIONAL = 'TRANSACTIONAL';

/**
 * মার্কেটিং নোটিফিকেশন
 * @description মার্কেটিং সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_MARKETING = 'MARKETING';

/**
 * এলার্ট নোটিফিকেশন
 * @description জরুরি সতর্কতা নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_ALERT = 'ALERT';

/**
 * রিমাইন্ডার নোটিফিকেশন
 * @description মনে করিয়ে দেওয়ার নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_REMINDER = 'REMINDER';

/**
 * আপডেট নোটিফিকেশন
 * @description আপডেট সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_UPDATE = 'UPDATE';

/**
 * ওয়ার্নিং নোটিফিকেশন
 * @description সতর্কীকরণ নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_WARNING = 'WARNING';

/**
 * এরর নোটিফিকেশন
 * @description ত্রুটি সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_ERROR = 'ERROR';

/**
 * সাকসেস নোটিফিকেশন
 * @description সফলতা সংক্রান্ত নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_SUCCESS = 'SUCCESS';

/**
 * ইনফো নোটিফিকেশন
 * @description তথ্যমূলক নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_INFO = 'INFO';

/**
 * কাস্টম নোটিফিকেশন
 * @description কাস্টমাইজড নোটিফিকেশন
 */
export const NOTIFICATION_TYPE_CUSTOM = 'CUSTOM';

// ============================================
// ২. নোটিফিকেশন টাইপ গ্রুপ
// ============================================

/**
 * নোটিফিকেশন টাইপ গ্রুপ
 * টাইপগুলোর গ্রুপ ক্যাটাগরাইজেশন
 */
export type NotificationTypeGroup =
  | typeof NOTIFICATION_TYPE_GROUP_SYSTEM
  | typeof NOTIFICATION_TYPE_GROUP_USER
  | typeof NOTIFICATION_TYPE_GROUP_BUSINESS
  | typeof NOTIFICATION_TYPE_GROUP_STATUS;

/**
 * সিস্টেম গ্রুপ
 * @description সিস্টেম সংক্রান্ত টাইপসমূহ
 */
export const NOTIFICATION_TYPE_GROUP_SYSTEM = 'SYSTEM';

/**
 * ইউজার গ্রুপ
 * @description ইউজার সংক্রান্ত টাইপসমূহ
 */
export const NOTIFICATION_TYPE_GROUP_USER = 'USER';

/**
 * বিজনেস গ্রুপ
 * @description ব্যবসায়িক টাইপসমূহ
 */
export const NOTIFICATION_TYPE_GROUP_BUSINESS = 'BUSINESS';

/**
 * স্ট্যাটাস গ্রুপ
 * @description স্ট্যাটাস সংক্রান্ত টাইপসমূহ
 */
export const NOTIFICATION_TYPE_GROUP_STATUS = 'STATUS';

// ============================================
// ৩. টাইপ থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * নোটিফিকেশন টাইপ থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_TYPE_TO_GROUP: Record<NotificationType, NotificationTypeGroup> = {
  [NOTIFICATION_TYPE_SYSTEM]: NOTIFICATION_TYPE_GROUP_SYSTEM,
  [NOTIFICATION_TYPE_USER]: NOTIFICATION_TYPE_GROUP_USER,
  [NOTIFICATION_TYPE_PROMOTIONAL]: NOTIFICATION_TYPE_GROUP_BUSINESS,
  [NOTIFICATION_TYPE_TRANSACTIONAL]: NOTIFICATION_TYPE_GROUP_BUSINESS,
  [NOTIFICATION_TYPE_MARKETING]: NOTIFICATION_TYPE_GROUP_BUSINESS,
  [NOTIFICATION_TYPE_ALERT]: NOTIFICATION_TYPE_GROUP_SYSTEM,
  [NOTIFICATION_TYPE_REMINDER]: NOTIFICATION_TYPE_GROUP_USER,
  [NOTIFICATION_TYPE_UPDATE]: NOTIFICATION_TYPE_GROUP_SYSTEM,
  [NOTIFICATION_TYPE_WARNING]: NOTIFICATION_TYPE_GROUP_STATUS,
  [NOTIFICATION_TYPE_ERROR]: NOTIFICATION_TYPE_GROUP_STATUS,
  [NOTIFICATION_TYPE_SUCCESS]: NOTIFICATION_TYPE_GROUP_STATUS,
  [NOTIFICATION_TYPE_INFO]: NOTIFICATION_TYPE_GROUP_STATUS,
  [NOTIFICATION_TYPE_CUSTOM]: NOTIFICATION_TYPE_GROUP_USER,
};

// ============================================
// ৪. নোটিফিকেশন টাইপ লেবেল
// ============================================

/**
 * নোটিফিকেশন টাইপ লেবেল
 * প্রতিটি টাইপের জন্য মানব-পাঠযোগ্য লেবেল
 */
export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPE_SYSTEM]: 'সিস্টেম',
  [NOTIFICATION_TYPE_USER]: 'ব্যবহারকারী',
  [NOTIFICATION_TYPE_PROMOTIONAL]: 'প্রচারমূলক',
  [NOTIFICATION_TYPE_TRANSACTIONAL]: 'লেনদেন',
  [NOTIFICATION_TYPE_MARKETING]: 'মার্কেটিং',
  [NOTIFICATION_TYPE_ALERT]: 'সতর্কতা',
  [NOTIFICATION_TYPE_REMINDER]: 'মনে করিয়ে দিন',
  [NOTIFICATION_TYPE_UPDATE]: 'আপডেট',
  [NOTIFICATION_TYPE_WARNING]: 'সতর্কীকরণ',
  [NOTIFICATION_TYPE_ERROR]: 'ত্রুটি',
  [NOTIFICATION_TYPE_SUCCESS]: 'সফল',
  [NOTIFICATION_TYPE_INFO]: 'তথ্য',
  [NOTIFICATION_TYPE_CUSTOM]: 'কাস্টম',
};

// ============================================
// ৫. নোটিফিকেশন টাইপ আইকন
// ============================================

/**
 * নোটিফিকেশন টাইপ আইকন
 * প্রতিটি টাইপের জন্য আইকন নাম
 */
export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPE_SYSTEM]: 'system-update',
  [NOTIFICATION_TYPE_USER]: 'person',
  [NOTIFICATION_TYPE_PROMOTIONAL]: 'campaign',
  [NOTIFICATION_TYPE_TRANSACTIONAL]: 'receipt',
  [NOTIFICATION_TYPE_MARKETING]: 'marketing',
  [NOTIFICATION_TYPE_ALERT]: 'alert',
  [NOTIFICATION_TYPE_REMINDER]: 'reminder',
  [NOTIFICATION_TYPE_UPDATE]: 'update',
  [NOTIFICATION_TYPE_WARNING]: 'warning',
  [NOTIFICATION_TYPE_ERROR]: 'error',
  [NOTIFICATION_TYPE_SUCCESS]: 'success',
  [NOTIFICATION_TYPE_INFO]: 'info',
  [NOTIFICATION_TYPE_CUSTOM]: 'custom',
};

// ============================================
// ৬. নোটিফিকেশন টাইপ কালার
// ============================================

/**
 * নোটিফিকেশন টাইপ কালার
 * প্রতিটি টাইপের জন্য কালার কোড
 */
export const NOTIFICATION_TYPE_COLORS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPE_SYSTEM]: '#2196F3', // Blue
  [NOTIFICATION_TYPE_USER]: '#9C27B0', // Purple
  [NOTIFICATION_TYPE_PROMOTIONAL]: '#FF9800', // Orange
  [NOTIFICATION_TYPE_TRANSACTIONAL]: '#4CAF50', // Green
  [NOTIFICATION_TYPE_MARKETING]: '#E91E63', // Pink
  [NOTIFICATION_TYPE_ALERT]: '#F44336', // Red
  [NOTIFICATION_TYPE_REMINDER]: '#FFC107', // Amber
  [NOTIFICATION_TYPE_UPDATE]: '#00BCD4', // Cyan
  [NOTIFICATION_TYPE_WARNING]: '#FF5722', // Deep Orange
  [NOTIFICATION_TYPE_ERROR]: '#D32F2F', // Dark Red
  [NOTIFICATION_TYPE_SUCCESS]: '#388E3C', // Dark Green
  [NOTIFICATION_TYPE_INFO]: '#1976D2', // Dark Blue
  [NOTIFICATION_TYPE_CUSTOM]: '#607D8B', // Blue Grey
};

// ============================================
// ৭. নোটিফিকেশন টাইপ প্রায়োরিটি
// ============================================

/**
 * নোটিফিকেশন টাইপ প্রায়োরিটি
 * প্রতিটি টাইপের জন্য প্রায়োরিটি লেভেল (১-১০)
 */
export const NOTIFICATION_TYPE_PRIORITY: Record<NotificationType, number> = {
  [NOTIFICATION_TYPE_SYSTEM]: 8,
  [NOTIFICATION_TYPE_USER]: 5,
  [NOTIFICATION_TYPE_PROMOTIONAL]: 3,
  [NOTIFICATION_TYPE_TRANSACTIONAL]: 7,
  [NOTIFICATION_TYPE_MARKETING]: 4,
  [NOTIFICATION_TYPE_ALERT]: 10,
  [NOTIFICATION_TYPE_REMINDER]: 6,
  [NOTIFICATION_TYPE_UPDATE]: 7,
  [NOTIFICATION_TYPE_WARNING]: 9,
  [NOTIFICATION_TYPE_ERROR]: 10,
  [NOTIFICATION_TYPE_SUCCESS]: 5,
  [NOTIFICATION_TYPE_INFO]: 4,
  [NOTIFICATION_TYPE_CUSTOM]: 5,
};

// ============================================
// ৮. নোটিফিকেশন টাইপ ডিফল্ট এক্সপাইরি
// ============================================

/**
 * নোটিফিকেশন টাইপ ডিফল্ট এক্সপাইরি (মিলিসেকেন্ডে)
 * প্রতিটি টাইপের জন্য ডিফল্ট এক্সপাইরি সময়
 */
export const NOTIFICATION_TYPE_DEFAULT_EXPIRY: Record<NotificationType, number> = {
  [NOTIFICATION_TYPE_SYSTEM]: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
  [NOTIFICATION_TYPE_USER]: 30 * 24 * 60 * 60 * 1000, // ৩০ দিন
  [NOTIFICATION_TYPE_PROMOTIONAL]: 3 * 24 * 60 * 60 * 1000, // ৩ দিন
  [NOTIFICATION_TYPE_TRANSACTIONAL]: 90 * 24 * 60 * 60 * 1000, // ৯০ দিন
  [NOTIFICATION_TYPE_MARKETING]: 2 * 24 * 60 * 60 * 1000, // ২ দিন
  [NOTIFICATION_TYPE_ALERT]: 1 * 24 * 60 * 60 * 1000, // ১ দিন
  [NOTIFICATION_TYPE_REMINDER]: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
  [NOTIFICATION_TYPE_UPDATE]: 14 * 24 * 60 * 60 * 1000, // ১৪ দিন
  [NOTIFICATION_TYPE_WARNING]: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
  [NOTIFICATION_TYPE_ERROR]: 30 * 24 * 60 * 60 * 1000, // ৩০ দিন
  [NOTIFICATION_TYPE_SUCCESS]: 7 * 24 * 60 * 60 * 1000, // ৭ দিন
  [NOTIFICATION_TYPE_INFO]: 14 * 24 * 60 * 60 * 1000, // ১৪ দিন
  [NOTIFICATION_TYPE_CUSTOM]: 30 * 24 * 60 * 60 * 1000, // ৩০ দিন
};

// ============================================
// ৯. নোটিফিকেশন টাইপ কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন টাইপ কনফিগারেশন
 */
export interface NotificationTypeConfig {
  /** টাইপের নাম */
  type: NotificationType;
  /** টাইপের লেবেল */
  label: string;
  /** টাইপের আইকন */
  icon: string;
  /** টাইপের কালার */
  color: string;
  /** টাইপের প্রায়োরিটি */
  priority: number;
  /** টাইপের গ্রুপ */
  group: NotificationTypeGroup;
  /** ডিফল্ট এক্সপাইরি সময় (মিলিসেকেন্ডে) */
  defaultExpiry: number;
}

/**
 * সব নোটিফিকেশন টাইপের কনফিগারেশন
 */
export const NOTIFICATION_TYPE_CONFIGS: NotificationTypeConfig[] = [
  {
    type: NOTIFICATION_TYPE_SYSTEM,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_SYSTEM],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_SYSTEM],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_SYSTEM],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_SYSTEM],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_SYSTEM],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_SYSTEM],
  },
  {
    type: NOTIFICATION_TYPE_USER,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_USER],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_USER],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_USER],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_USER],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_USER],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_USER],
  },
  {
    type: NOTIFICATION_TYPE_PROMOTIONAL,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_PROMOTIONAL],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_PROMOTIONAL],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_PROMOTIONAL],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_PROMOTIONAL],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_PROMOTIONAL],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_PROMOTIONAL],
  },
  {
    type: NOTIFICATION_TYPE_TRANSACTIONAL,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_TRANSACTIONAL],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_TRANSACTIONAL],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_TRANSACTIONAL],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_TRANSACTIONAL],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_TRANSACTIONAL],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_TRANSACTIONAL],
  },
  {
    type: NOTIFICATION_TYPE_MARKETING,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_MARKETING],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_MARKETING],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_MARKETING],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_MARKETING],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_MARKETING],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_MARKETING],
  },
  {
    type: NOTIFICATION_TYPE_ALERT,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_ALERT],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_ALERT],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_ALERT],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_ALERT],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_ALERT],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_ALERT],
  },
  {
    type: NOTIFICATION_TYPE_REMINDER,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_REMINDER],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_REMINDER],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_REMINDER],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_REMINDER],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_REMINDER],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_REMINDER],
  },
  {
    type: NOTIFICATION_TYPE_UPDATE,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_UPDATE],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_UPDATE],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_UPDATE],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_UPDATE],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_UPDATE],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_UPDATE],
  },
  {
    type: NOTIFICATION_TYPE_WARNING,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_WARNING],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_WARNING],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_WARNING],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_WARNING],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_WARNING],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_WARNING],
  },
  {
    type: NOTIFICATION_TYPE_ERROR,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_ERROR],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_ERROR],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_ERROR],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_ERROR],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_ERROR],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_ERROR],
  },
  {
    type: NOTIFICATION_TYPE_SUCCESS,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_SUCCESS],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_SUCCESS],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_SUCCESS],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_SUCCESS],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_SUCCESS],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_SUCCESS],
  },
  {
    type: NOTIFICATION_TYPE_INFO,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_INFO],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_INFO],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_INFO],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_INFO],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_INFO],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_INFO],
  },
  {
    type: NOTIFICATION_TYPE_CUSTOM,
    label: NOTIFICATION_TYPE_LABELS[NOTIFICATION_TYPE_CUSTOM],
    icon: NOTIFICATION_TYPE_ICONS[NOTIFICATION_TYPE_CUSTOM],
    color: NOTIFICATION_TYPE_COLORS[NOTIFICATION_TYPE_CUSTOM],
    priority: NOTIFICATION_TYPE_PRIORITY[NOTIFICATION_TYPE_CUSTOM],
    group: NOTIFICATION_TYPE_TO_GROUP[NOTIFICATION_TYPE_CUSTOM],
    defaultExpiry: NOTIFICATION_TYPE_DEFAULT_EXPIRY[NOTIFICATION_TYPE_CUSTOM],
  },
];
