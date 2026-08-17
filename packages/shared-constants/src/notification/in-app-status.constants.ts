// ============================================
// ইন-অ্যাপ নোটিফিকেশন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ইন-অ্যাপ নোটিফিকেশন স্ট্যাটাস
// ============================================

/**
 * ইন-অ্যাপ নোটিফিকেশন স্ট্যাটাস
 * ইন-অ্যাপ নোটিফিকেশনের বর্তমান অবস্থা নির্দেশ করে
 */
export type InAppStatus =
  | typeof IN_APP_STATUS_PENDING
  | typeof IN_APP_STATUS_DISPLAYED
  | typeof IN_APP_STATUS_INTERACTED
  | typeof IN_APP_STATUS_DISMISSED
  | typeof IN_APP_STATUS_EXPIRED
  | typeof IN_APP_STATUS_READ
  | typeof IN_APP_STATUS_UNREAD
  | typeof IN_APP_STATUS_DELETED
  | typeof IN_APP_STATUS_ARCHIVED
  | typeof IN_APP_STATUS_QUEUED
  | typeof IN_APP_STATUS_PROCESSING
  | typeof IN_APP_STATUS_VIEWED
  | typeof IN_APP_STATUS_ACKNOWLEDGED
  | typeof IN_APP_STATUS_IGNORED
  | typeof IN_APP_STATUS_REPORTED
  | typeof IN_APP_STATUS_PARTIAL;

/**
 * পেন্ডিং স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন প্রদর্শনের অপেক্ষায়
 */
export const IN_APP_STATUS_PENDING = 'PENDING';

/**
 * ডিসপ্লেড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন প্রদর্শিত হয়েছে
 */
export const IN_APP_STATUS_DISPLAYED = 'DISPLAYED';

/**
 * ইন্টারঅ্যাকটেড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশনের সাথে ইন্টারঅ্যাকশন করা হয়েছে
 */
export const IN_APP_STATUS_INTERACTED = 'INTERACTED';

/**
 * ডিসমিসড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন বাদ দেওয়া হয়েছে
 */
export const IN_APP_STATUS_DISMISSED = 'DISMISSED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশনের মেয়াদ শেষ
 */
export const IN_APP_STATUS_EXPIRED = 'EXPIRED';

/**
 * রিড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন পড়া হয়েছে
 */
export const IN_APP_STATUS_READ = 'READ';

/**
 * আনরিড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন পড়া হয়নি
 */
export const IN_APP_STATUS_UNREAD = 'UNREAD';

/**
 * ডিলিটেড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন মুছে ফেলা হয়েছে
 */
export const IN_APP_STATUS_DELETED = 'DELETED';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন আর্কাইভ করা হয়েছে
 */
export const IN_APP_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * কিউড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন সারিবদ্ধ করা হয়েছে
 */
export const IN_APP_STATUS_QUEUED = 'QUEUED';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন প্রক্রিয়াকরণ চলছে
 */
export const IN_APP_STATUS_PROCESSING = 'PROCESSING';

/**
 * ভিউড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন দেখা হয়েছে
 */
export const IN_APP_STATUS_VIEWED = 'VIEWED';

/**
 * অ্যাকনোলজড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন স্বীকার করা হয়েছে
 */
export const IN_APP_STATUS_ACKNOWLEDGED = 'ACKNOWLEDGED';

/**
 * ইগনোরড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন উপেক্ষা করা হয়েছে
 */
export const IN_APP_STATUS_IGNORED = 'IGNORED';

/**
 * রিপোর্টেড স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন রিপোর্ট করা হয়েছে
 */
export const IN_APP_STATUS_REPORTED = 'REPORTED';

/**
 * পার্শিয়াল স্ট্যাটাস
 * @description ইন-অ্যাপ নোটিফিকেশন আংশিকভাবে সফল হয়েছে
 */
export const IN_APP_STATUS_PARTIAL = 'PARTIAL';

// ============================================
// ২. ইন-অ্যাপ স্ট্যাটাস গ্রুপ
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস গ্রুপ
 */
export type InAppStatusGroup =
  | typeof IN_APP_STATUS_GROUP_PENDING
  | typeof IN_APP_STATUS_GROUP_ACTIVE
  | typeof IN_APP_STATUS_GROUP_DISPLAYED
  | typeof IN_APP_STATUS_GROUP_INTERACTED
  | typeof IN_APP_STATUS_GROUP_TERMINAL
  | typeof IN_APP_STATUS_GROUP_USER;

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const IN_APP_STATUS_GROUP_PENDING = 'PENDING';

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const IN_APP_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * ডিসপ্লেড গ্রুপ
 * @description প্রদর্শিত হয়েছে
 */
export const IN_APP_STATUS_GROUP_DISPLAYED = 'DISPLAYED';

/**
 * ইন্টারঅ্যাকটেড গ্রুপ
 * @description ইন্টারঅ্যাকশন হয়েছে
 */
export const IN_APP_STATUS_GROUP_INTERACTED = 'INTERACTED';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const IN_APP_STATUS_GROUP_TERMINAL = 'TERMINAL';

/**
 * ইউজার গ্রুপ
 * @description ইউজার-নির্দিষ্ট স্ট্যাটাস
 */
export const IN_APP_STATUS_GROUP_USER = 'USER';

// ============================================
// ৩. ইন-অ্যাপ স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const IN_APP_STATUS_TO_GROUP: Record<InAppStatus, InAppStatusGroup> = {
  [IN_APP_STATUS_PENDING]: IN_APP_STATUS_GROUP_PENDING,
  [IN_APP_STATUS_DISPLAYED]: IN_APP_STATUS_GROUP_DISPLAYED,
  [IN_APP_STATUS_INTERACTED]: IN_APP_STATUS_GROUP_INTERACTED,
  [IN_APP_STATUS_DISMISSED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_EXPIRED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_READ]: IN_APP_STATUS_GROUP_USER,
  [IN_APP_STATUS_UNREAD]: IN_APP_STATUS_GROUP_USER,
  [IN_APP_STATUS_DELETED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_ARCHIVED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_QUEUED]: IN_APP_STATUS_GROUP_PENDING,
  [IN_APP_STATUS_PROCESSING]: IN_APP_STATUS_GROUP_ACTIVE,
  [IN_APP_STATUS_VIEWED]: IN_APP_STATUS_GROUP_USER,
  [IN_APP_STATUS_ACKNOWLEDGED]: IN_APP_STATUS_GROUP_INTERACTED,
  [IN_APP_STATUS_IGNORED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_REPORTED]: IN_APP_STATUS_GROUP_TERMINAL,
  [IN_APP_STATUS_PARTIAL]: IN_APP_STATUS_GROUP_ACTIVE,
};

// ============================================
// ৪. ইন-অ্যাপ স্ট্যাটাস লেবেল
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস লেবেল
 */
export const IN_APP_STATUS_LABELS: Record<InAppStatus, string> = {
  [IN_APP_STATUS_PENDING]: 'অপেক্ষমান',
  [IN_APP_STATUS_DISPLAYED]: 'প্রদর্শিত',
  [IN_APP_STATUS_INTERACTED]: 'ইন্টারঅ্যাক্ট',
  [IN_APP_STATUS_DISMISSED]: 'বাদ দেওয়া',
  [IN_APP_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [IN_APP_STATUS_READ]: 'পড়া হয়েছে',
  [IN_APP_STATUS_UNREAD]: 'পড়া হয়নি',
  [IN_APP_STATUS_DELETED]: 'মুছে ফেলা',
  [IN_APP_STATUS_ARCHIVED]: 'আর্কাইভ',
  [IN_APP_STATUS_QUEUED]: 'সারিবদ্ধ',
  [IN_APP_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [IN_APP_STATUS_VIEWED]: 'দেখা হয়েছে',
  [IN_APP_STATUS_ACKNOWLEDGED]: 'স্বীকার',
  [IN_APP_STATUS_IGNORED]: 'উপেক্ষা',
  [IN_APP_STATUS_REPORTED]: 'রিপোর্ট',
  [IN_APP_STATUS_PARTIAL]: 'আংশিক',
};

// ============================================
// ৫. ইন-অ্যাপ স্ট্যাটাস আইকন
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস আইকন
 */
export const IN_APP_STATUS_ICONS: Record<InAppStatus, string> = {
  [IN_APP_STATUS_PENDING]: 'pending',
  [IN_APP_STATUS_DISPLAYED]: 'visibility',
  [IN_APP_STATUS_INTERACTED]: 'touch_app',
  [IN_APP_STATUS_DISMISSED]: 'close',
  [IN_APP_STATUS_EXPIRED]: 'timer',
  [IN_APP_STATUS_READ]: 'mark_email_read',
  [IN_APP_STATUS_UNREAD]: 'mark_email_unread',
  [IN_APP_STATUS_DELETED]: 'delete',
  [IN_APP_STATUS_ARCHIVED]: 'archive',
  [IN_APP_STATUS_QUEUED]: 'queue',
  [IN_APP_STATUS_PROCESSING]: 'processing',
  [IN_APP_STATUS_VIEWED]: 'remove_red_eye',
  [IN_APP_STATUS_ACKNOWLEDGED]: 'check_circle',
  [IN_APP_STATUS_IGNORED]: 'block',
  [IN_APP_STATUS_REPORTED]: 'report',
  [IN_APP_STATUS_PARTIAL]: 'partial',
};

// ============================================
// ৬. ইন-অ্যাপ স্ট্যাটাস কালার
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস কালার
 */
export const IN_APP_STATUS_COLORS: Record<InAppStatus, string> = {
  [IN_APP_STATUS_PENDING]: '#FFC107', // Amber
  [IN_APP_STATUS_DISPLAYED]: '#2196F3', // Blue
  [IN_APP_STATUS_INTERACTED]: '#9C27B0', // Purple
  [IN_APP_STATUS_DISMISSED]: '#9E9E9E', // Grey
  [IN_APP_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [IN_APP_STATUS_READ]: '#4CAF50', // Green
  [IN_APP_STATUS_UNREAD]: '#F44336', // Red
  [IN_APP_STATUS_DELETED]: '#757575', // Dark Grey
  [IN_APP_STATUS_ARCHIVED]: '#795548', // Brown
  [IN_APP_STATUS_QUEUED]: '#FF9800', // Orange
  [IN_APP_STATUS_PROCESSING]: '#00BCD4', // Cyan
  [IN_APP_STATUS_VIEWED]: '#3F51B5', // Indigo
  [IN_APP_STATUS_ACKNOWLEDGED]: '#8BC34A', // Light Green
  [IN_APP_STATUS_IGNORED]: '#424242', // Dark Grey
  [IN_APP_STATUS_REPORTED]: '#D32F2F', // Dark Red
  [IN_APP_STATUS_PARTIAL]: '#FFAB00', // Yellow
};

// ============================================
// ৭. টার্মিনাল ইন-অ্যাপ স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল ইন-অ্যাপ স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const IN_APP_TERMINAL_STATUSES: InAppStatus[] = [
  IN_APP_STATUS_DISMISSED,
  IN_APP_STATUS_EXPIRED,
  IN_APP_STATUS_DELETED,
  IN_APP_STATUS_ARCHIVED,
  IN_APP_STATUS_IGNORED,
  IN_APP_STATUS_REPORTED,
];

// ============================================
// ৮. অ্যাক্টিভ ইন-অ্যাপ স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ ইন-অ্যাপ স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও সক্রিয় বা চলমান
 */
export const IN_APP_ACTIVE_STATUSES: InAppStatus[] = [
  IN_APP_STATUS_PENDING,
  IN_APP_STATUS_DISPLAYED,
  IN_APP_STATUS_QUEUED,
  IN_APP_STATUS_PROCESSING,
  IN_APP_STATUS_PARTIAL,
];

// ============================================
// ৯. ইন্টারঅ্যাক্টিভ ইন-অ্যাপ স্ট্যাটাসসমূহ
// ============================================

/**
 * ইন্টারঅ্যাক্টিভ ইন-অ্যাপ স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলোতে ইউজার ইন্টারঅ্যাকশন হয়েছে
 */
export const IN_APP_INTERACTED_STATUSES: InAppStatus[] = [
  IN_APP_STATUS_INTERACTED,
  IN_APP_STATUS_READ,
  IN_APP_STATUS_VIEWED,
  IN_APP_STATUS_ACKNOWLEDGED,
];

// ============================================
// ১০. ইন-অ্যাপ স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * ইন-অ্যাপ স্ট্যাটাস কনফিগারেশন
 */
export interface InAppStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: InAppStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: InAppStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** ইন্টারঅ্যাক্টিভ স্ট্যাটাস কিনা */
  isInteracted: boolean;
  /** ইউজার স্ট্যাটাস কিনা */
  isUserStatus: boolean;
}

/**
 * সব ইন-অ্যাপ স্ট্যাটাসের কনফিগারেশন
 */
export const IN_APP_STATUS_CONFIGS: InAppStatusConfig[] = [
  {
    status: IN_APP_STATUS_PENDING,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_PENDING],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_PENDING],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_PENDING],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_PENDING],
    isTerminal: false,
    isActive: true,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_DISPLAYED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_DISPLAYED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_DISPLAYED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_DISPLAYED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_DISPLAYED],
    isTerminal: false,
    isActive: true,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_INTERACTED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_INTERACTED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_INTERACTED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_INTERACTED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_INTERACTED],
    isTerminal: false,
    isActive: false,
    isInteracted: true,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_DISMISSED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_DISMISSED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_DISMISSED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_DISMISSED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_DISMISSED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_EXPIRED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_EXPIRED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_EXPIRED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_EXPIRED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_READ,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_READ],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_READ],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_READ],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_READ],
    isTerminal: false,
    isActive: false,
    isInteracted: true,
    isUserStatus: true,
  },
  {
    status: IN_APP_STATUS_UNREAD,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_UNREAD],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_UNREAD],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_UNREAD],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_UNREAD],
    isTerminal: false,
    isActive: false,
    isInteracted: false,
    isUserStatus: true,
  },
  {
    status: IN_APP_STATUS_DELETED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_DELETED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_DELETED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_DELETED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_DELETED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_ARCHIVED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_ARCHIVED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_ARCHIVED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_ARCHIVED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_QUEUED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_QUEUED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_QUEUED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_QUEUED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_QUEUED],
    isTerminal: false,
    isActive: true,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_PROCESSING,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_PROCESSING],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_PROCESSING],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_PROCESSING],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_PROCESSING],
    isTerminal: false,
    isActive: true,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_VIEWED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_VIEWED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_VIEWED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_VIEWED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_VIEWED],
    isTerminal: false,
    isActive: false,
    isInteracted: true,
    isUserStatus: true,
  },
  {
    status: IN_APP_STATUS_ACKNOWLEDGED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_ACKNOWLEDGED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_ACKNOWLEDGED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_ACKNOWLEDGED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_ACKNOWLEDGED],
    isTerminal: false,
    isActive: false,
    isInteracted: true,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_IGNORED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_IGNORED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_IGNORED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_IGNORED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_IGNORED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_REPORTED,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_REPORTED],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_REPORTED],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_REPORTED],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_REPORTED],
    isTerminal: true,
    isActive: false,
    isInteracted: false,
    isUserStatus: false,
  },
  {
    status: IN_APP_STATUS_PARTIAL,
    label: IN_APP_STATUS_LABELS[IN_APP_STATUS_PARTIAL],
    icon: IN_APP_STATUS_ICONS[IN_APP_STATUS_PARTIAL],
    color: IN_APP_STATUS_COLORS[IN_APP_STATUS_PARTIAL],
    group: IN_APP_STATUS_TO_GROUP[IN_APP_STATUS_PARTIAL],
    isTerminal: false,
    isActive: true,
    isInteracted: false,
    isUserStatus: false,
  },
];
