// ============================================
// নোটিফিকেশন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. নোটিফিকেশন স্ট্যাটাস
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস
 * নোটিফিকেশনের বর্তমান অবস্থা নির্দেশ করে
 */
export type NotificationStatus =
  | typeof NOTIFICATION_STATUS_PENDING
  | typeof NOTIFICATION_STATUS_PROCESSING
  | typeof NOTIFICATION_STATUS_SENT
  | typeof NOTIFICATION_STATUS_DELIVERED
  | typeof NOTIFICATION_STATUS_FAILED
  | typeof NOTIFICATION_STATUS_CANCELLED
  | typeof NOTIFICATION_STATUS_SCHEDULED
  | typeof NOTIFICATION_STATUS_DRAFT
  | typeof NOTIFICATION_STATUS_ARCHIVED
  | typeof NOTIFICATION_STATUS_DELETED
  | typeof NOTIFICATION_STATUS_READ
  | typeof NOTIFICATION_STATUS_UNREAD
  | typeof NOTIFICATION_STATUS_EXPIRED
  | typeof NOTIFICATION_STATUS_QUEUED
  | typeof NOTIFICATION_STATUS_BOUNCED
  | typeof NOTIFICATION_STATUS_SPAM
  | typeof NOTIFICATION_STATUS_BLOCKED
  | typeof NOTIFICATION_STATUS_RETRYING
  | typeof NOTIFICATION_STATUS_PARTIAL;

/**
 * পেন্ডিং স্ট্যাটাস
 * @description নোটিফিকেশন প্রক্রিয়াকরণের অপেক্ষায়
 */
export const NOTIFICATION_STATUS_PENDING = 'PENDING';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description নোটিফিকেশন প্রক্রিয়াকরণ চলছে
 */
export const NOTIFICATION_STATUS_PROCESSING = 'PROCESSING';

/**
 * সেন্ট স্ট্যাটাস
 * @description নোটিফিকেশন পাঠানো হয়েছে
 */
export const NOTIFICATION_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 * @description নোটিফিকেশন প্রাপকের কাছে পৌঁছেছে
 */
export const NOTIFICATION_STATUS_DELIVERED = 'DELIVERED';

/**
 * ফেইলড স্ট্যাটাস
 * @description নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে
 */
export const NOTIFICATION_STATUS_FAILED = 'FAILED';

/**
 * ক্যান্সেলড স্ট্যাটাস
 * @description নোটিফিকেশন বাতিল করা হয়েছে
 */
export const NOTIFICATION_STATUS_CANCELLED = 'CANCELLED';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description নোটিফিকেশন নির্ধারিত সময়ে পাঠানোর জন্য
 */
export const NOTIFICATION_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * ড্রাফট স্ট্যাটাস
 * @description নোটিফিকেশন খসড়া হিসেবে সংরক্ষিত
 */
export const NOTIFICATION_STATUS_DRAFT = 'DRAFT';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description নোটিফিকেশন আর্কাইভ করা হয়েছে
 */
export const NOTIFICATION_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * ডিলিটেড স্ট্যাটাস
 * @description নোটিফিকেশন মুছে ফেলা হয়েছে
 */
export const NOTIFICATION_STATUS_DELETED = 'DELETED';

/**
 * রিড স্ট্যাটাস
 * @description নোটিফিকেশন পড়া হয়েছে
 */
export const NOTIFICATION_STATUS_READ = 'READ';

/**
 * আনরিড স্ট্যাটাস
 * @description নোটিফিকেশন পড়া হয়নি
 */
export const NOTIFICATION_STATUS_UNREAD = 'UNREAD';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description নোটিফিকেশন মেয়াদোত্তীর্ণ হয়েছে
 */
export const NOTIFICATION_STATUS_EXPIRED = 'EXPIRED';

/**
 * কিউড স্ট্যাটাস
 * @description নোটিফিকেশন সারিবদ্ধ করা হয়েছে
 */
export const NOTIFICATION_STATUS_QUEUED = 'QUEUED';

/**
 * বাউন্সড স্ট্যাটাস
 * @description নোটিফিকেশন বাউন্স হয়েছে (ইমেইল/এসএমএস)
 */
export const NOTIFICATION_STATUS_BOUNCED = 'BOUNCED';

/**
 * স্প্যাম স্ট্যাটাস
 * @description নোটিফিকেশন স্প্যাম হিসেবে চিহ্নিত হয়েছে
 */
export const NOTIFICATION_STATUS_SPAM = 'SPAM';

/**
 * ব্লকড স্ট্যাটাস
 * @description নোটিফিকেশন ব্লক করা হয়েছে
 */
export const NOTIFICATION_STATUS_BLOCKED = 'BLOCKED';

/**
 * রিট্রাইং স্ট্যাটাস
 * @description নোটিফিকেশন পুনরায় পাঠানোর চেষ্টা চলছে
 */
export const NOTIFICATION_STATUS_RETRYING = 'RETRYING';

/**
 * পার্শিয়াল স্ট্যাটাস
 * @description নোটিফিকেশন আংশিকভাবে সফল হয়েছে
 */
export const NOTIFICATION_STATUS_PARTIAL = 'PARTIAL';

// ============================================
// ২. স্ট্যাটাস ক্যাটাগরি
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস ক্যাটাগরি
 */
export type NotificationStatusCategory =
  | typeof NOTIFICATION_STATUS_CATEGORY_ACTIVE
  | typeof NOTIFICATION_STATUS_CATEGORY_COMPLETED
  | typeof NOTIFICATION_STATUS_CATEGORY_FAILED
  | typeof NOTIFICATION_STATUS_CATEGORY_TERMINAL
  | typeof NOTIFICATION_STATUS_CATEGORY_USER;

/**
 * অ্যাক্টিভ ক্যাটাগরি
 * @description চলমান বা সক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_STATUS_CATEGORY_ACTIVE = 'ACTIVE';

/**
 * কমপ্লিটেড ক্যাটাগরি
 * @description সফলভাবে সম্পন্ন স্ট্যাটাস
 */
export const NOTIFICATION_STATUS_CATEGORY_COMPLETED = 'COMPLETED';

/**
 * ফেইলড ক্যাটাগরি
 * @description ব্যর্থ বা সমস্যাযুক্ত স্ট্যাটাস
 */
export const NOTIFICATION_STATUS_CATEGORY_FAILED = 'FAILED';

/**
 * টার্মিনাল ক্যাটাগরি
 * @description শেষ অবস্থা (চূড়ান্ত স্ট্যাটাস)
 */
export const NOTIFICATION_STATUS_CATEGORY_TERMINAL = 'TERMINAL';

/**
 * ইউজার ক্যাটাগরি
 * @description ইউজার-নির্দিষ্ট স্ট্যাটাস
 */
export const NOTIFICATION_STATUS_CATEGORY_USER = 'USER';

// ============================================
// ৩. স্ট্যাটাস থেকে ক্যাটাগরি ম্যাপিং
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস থেকে ক্যাটাগরি ম্যাপিং
 */
export const NOTIFICATION_STATUS_TO_CATEGORY: Record<
  NotificationStatus,
  NotificationStatusCategory
> = {
  [NOTIFICATION_STATUS_PENDING]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_PROCESSING]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_SENT]: NOTIFICATION_STATUS_CATEGORY_COMPLETED,
  [NOTIFICATION_STATUS_DELIVERED]: NOTIFICATION_STATUS_CATEGORY_COMPLETED,
  [NOTIFICATION_STATUS_FAILED]: NOTIFICATION_STATUS_CATEGORY_FAILED,
  [NOTIFICATION_STATUS_CANCELLED]: NOTIFICATION_STATUS_CATEGORY_TERMINAL,
  [NOTIFICATION_STATUS_SCHEDULED]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_DRAFT]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_ARCHIVED]: NOTIFICATION_STATUS_CATEGORY_TERMINAL,
  [NOTIFICATION_STATUS_DELETED]: NOTIFICATION_STATUS_CATEGORY_TERMINAL,
  [NOTIFICATION_STATUS_READ]: NOTIFICATION_STATUS_CATEGORY_USER,
  [NOTIFICATION_STATUS_UNREAD]: NOTIFICATION_STATUS_CATEGORY_USER,
  [NOTIFICATION_STATUS_EXPIRED]: NOTIFICATION_STATUS_CATEGORY_TERMINAL,
  [NOTIFICATION_STATUS_QUEUED]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_BOUNCED]: NOTIFICATION_STATUS_CATEGORY_FAILED,
  [NOTIFICATION_STATUS_SPAM]: NOTIFICATION_STATUS_CATEGORY_FAILED,
  [NOTIFICATION_STATUS_BLOCKED]: NOTIFICATION_STATUS_CATEGORY_FAILED,
  [NOTIFICATION_STATUS_RETRYING]: NOTIFICATION_STATUS_CATEGORY_ACTIVE,
  [NOTIFICATION_STATUS_PARTIAL]: NOTIFICATION_STATUS_CATEGORY_FAILED,
};

// ============================================
// ৪. স্ট্যাটাস লেবেল
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস লেবেল
 * প্রতিটি স্ট্যাটাসের জন্য মানব-পাঠযোগ্য লেবেল
 */
export const NOTIFICATION_STATUS_LABELS: Record<NotificationStatus, string> = {
  [NOTIFICATION_STATUS_PENDING]: 'অপেক্ষমান',
  [NOTIFICATION_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [NOTIFICATION_STATUS_SENT]: 'পাঠানো হয়েছে',
  [NOTIFICATION_STATUS_DELIVERED]: 'পৌঁছেছে',
  [NOTIFICATION_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [NOTIFICATION_STATUS_CANCELLED]: 'বাতিল',
  [NOTIFICATION_STATUS_SCHEDULED]: 'নির্ধারিত',
  [NOTIFICATION_STATUS_DRAFT]: 'খসড়া',
  [NOTIFICATION_STATUS_ARCHIVED]: 'আর্কাইভ',
  [NOTIFICATION_STATUS_DELETED]: 'মুছে ফেলা',
  [NOTIFICATION_STATUS_READ]: 'পড়া হয়েছে',
  [NOTIFICATION_STATUS_UNREAD]: 'পড়া হয়নি',
  [NOTIFICATION_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [NOTIFICATION_STATUS_QUEUED]: 'সারিবদ্ধ',
  [NOTIFICATION_STATUS_BOUNCED]: 'বাউন্স হয়েছে',
  [NOTIFICATION_STATUS_SPAM]: 'স্প্যাম',
  [NOTIFICATION_STATUS_BLOCKED]: 'ব্লক',
  [NOTIFICATION_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
  [NOTIFICATION_STATUS_PARTIAL]: 'আংশিক',
};

// ============================================
// ৫. স্ট্যাটাস আইকন
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস আইকন
 * প্রতিটি স্ট্যাটাসের জন্য আইকন নাম
 */
export const NOTIFICATION_STATUS_ICONS: Record<NotificationStatus, string> = {
  [NOTIFICATION_STATUS_PENDING]: 'pending',
  [NOTIFICATION_STATUS_PROCESSING]: 'processing',
  [NOTIFICATION_STATUS_SENT]: 'send',
  [NOTIFICATION_STATUS_DELIVERED]: 'delivered',
  [NOTIFICATION_STATUS_FAILED]: 'error',
  [NOTIFICATION_STATUS_CANCELLED]: 'cancel',
  [NOTIFICATION_STATUS_SCHEDULED]: 'schedule',
  [NOTIFICATION_STATUS_DRAFT]: 'draft',
  [NOTIFICATION_STATUS_ARCHIVED]: 'archive',
  [NOTIFICATION_STATUS_DELETED]: 'delete',
  [NOTIFICATION_STATUS_READ]: 'read',
  [NOTIFICATION_STATUS_UNREAD]: 'unread',
  [NOTIFICATION_STATUS_EXPIRED]: 'expired',
  [NOTIFICATION_STATUS_QUEUED]: 'queue',
  [NOTIFICATION_STATUS_BOUNCED]: 'bounce',
  [NOTIFICATION_STATUS_SPAM]: 'spam',
  [NOTIFICATION_STATUS_BLOCKED]: 'block',
  [NOTIFICATION_STATUS_RETRYING]: 'retry',
  [NOTIFICATION_STATUS_PARTIAL]: 'partial',
};

// ============================================
// ৬. স্ট্যাটাস কালার
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস কালার
 * প্রতিটি স্ট্যাটাসের জন্য কালার কোড
 */
export const NOTIFICATION_STATUS_COLORS: Record<NotificationStatus, string> = {
  [NOTIFICATION_STATUS_PENDING]: '#FFC107', // Amber
  [NOTIFICATION_STATUS_PROCESSING]: '#2196F3', // Blue
  [NOTIFICATION_STATUS_SENT]: '#00BCD4', // Cyan
  [NOTIFICATION_STATUS_DELIVERED]: '#4CAF50', // Green
  [NOTIFICATION_STATUS_FAILED]: '#F44336', // Red
  [NOTIFICATION_STATUS_CANCELLED]: '#9E9E9E', // Grey
  [NOTIFICATION_STATUS_SCHEDULED]: '#FF9800', // Orange
  [NOTIFICATION_STATUS_DRAFT]: '#607D8B', // Blue Grey
  [NOTIFICATION_STATUS_ARCHIVED]: '#795548', // Brown
  [NOTIFICATION_STATUS_DELETED]: '#BDBDBD', // Light Grey
  [NOTIFICATION_STATUS_READ]: '#8BC34A', // Light Green
  [NOTIFICATION_STATUS_UNREAD]: '#FF5722', // Deep Orange
  [NOTIFICATION_STATUS_EXPIRED]: '#9E9E9E', // Grey
  [NOTIFICATION_STATUS_QUEUED]: '#03A9F4', // Light Blue
  [NOTIFICATION_STATUS_BOUNCED]: '#E91E63', // Pink
  [NOTIFICATION_STATUS_SPAM]: '#D32F2F', // Dark Red
  [NOTIFICATION_STATUS_BLOCKED]: '#424242', // Dark Grey
  [NOTIFICATION_STATUS_RETRYING]: '#FF6F00', // Dark Amber
  [NOTIFICATION_STATUS_PARTIAL]: '#FFAB00', // Yellow
};

// ============================================
// ৭. টার্মিনাল স্ট্যাটাসসমূহ (চূড়ান্ত অবস্থা)
// ============================================

/**
 * টার্মিনাল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const NOTIFICATION_TERMINAL_STATUSES: NotificationStatus[] = [
  NOTIFICATION_STATUS_DELIVERED,
  NOTIFICATION_STATUS_FAILED,
  NOTIFICATION_STATUS_CANCELLED,
  NOTIFICATION_STATUS_ARCHIVED,
  NOTIFICATION_STATUS_DELETED,
  NOTIFICATION_STATUS_EXPIRED,
  NOTIFICATION_STATUS_BOUNCED,
  NOTIFICATION_STATUS_SPAM,
  NOTIFICATION_STATUS_BLOCKED,
  NOTIFICATION_STATUS_PARTIAL,
];

// ============================================
// ৮. সফল স্ট্যাটাসসমূহ
// ============================================

/**
 * সফল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো সফলতা নির্দেশ করে
 */
export const NOTIFICATION_SUCCESS_STATUSES: NotificationStatus[] = [
  NOTIFICATION_STATUS_SENT,
  NOTIFICATION_STATUS_DELIVERED,
  NOTIFICATION_STATUS_READ,
];

// ============================================
// ৯. ত্রুটি স্ট্যাটাসসমূহ
// ============================================

/**
 * ত্রুটি স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো ত্রুটি বা সমস্যা নির্দেশ করে
 */
export const NOTIFICATION_ERROR_STATUSES: NotificationStatus[] = [
  NOTIFICATION_STATUS_FAILED,
  NOTIFICATION_STATUS_BOUNCED,
  NOTIFICATION_STATUS_SPAM,
  NOTIFICATION_STATUS_BLOCKED,
  NOTIFICATION_STATUS_PARTIAL,
];

// ============================================
// ১০. সক্রিয় স্ট্যাটাসসমূহ
// ============================================

/**
 * সক্রিয় স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও চলমান বা পরিবর্তনশীল
 */
export const NOTIFICATION_ACTIVE_STATUSES: NotificationStatus[] = [
  NOTIFICATION_STATUS_PENDING,
  NOTIFICATION_STATUS_PROCESSING,
  NOTIFICATION_STATUS_SCHEDULED,
  NOTIFICATION_STATUS_QUEUED,
  NOTIFICATION_STATUS_RETRYING,
  NOTIFICATION_STATUS_DRAFT,
];

// ============================================
// ১১. স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন স্ট্যাটাস কনফিগারেশন
 */
export interface NotificationStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: NotificationStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের ক্যাটাগরি */
  category: NotificationStatusCategory;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** সফল স্ট্যাটাস কিনা */
  isSuccess: boolean;
  /** ত্রুটি স্ট্যাটাস কিনা */
  isError: boolean;
  /** সক্রিয় স্ট্যাটাস কিনা */
  isActive: boolean;
}

/**
 * সব নোটিফিকেশন স্ট্যাটাসের কনফিগারেশন
 */
export const NOTIFICATION_STATUS_CONFIGS: NotificationStatusConfig[] = [
  {
    status: NOTIFICATION_STATUS_PENDING,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_PENDING],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_PENDING],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_PENDING],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_PENDING],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_PROCESSING,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_PROCESSING],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_PROCESSING],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_PROCESSING],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_PROCESSING],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_SENT,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_SENT],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_SENT],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_SENT],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_SENT],
    isTerminal: false,
    isSuccess: true,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_DELIVERED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_DELIVERED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_DELIVERED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_DELIVERED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_DELIVERED],
    isTerminal: true,
    isSuccess: true,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_FAILED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_FAILED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_FAILED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_FAILED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_FAILED],
    isTerminal: true,
    isSuccess: false,
    isError: true,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_CANCELLED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_CANCELLED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_CANCELLED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_CANCELLED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_CANCELLED],
    isTerminal: true,
    isSuccess: false,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_SCHEDULED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_SCHEDULED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_SCHEDULED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_SCHEDULED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_SCHEDULED],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_DRAFT,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_DRAFT],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_DRAFT],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_DRAFT],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_DRAFT],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_ARCHIVED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_ARCHIVED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_ARCHIVED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_ARCHIVED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_ARCHIVED],
    isTerminal: true,
    isSuccess: false,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_DELETED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_DELETED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_DELETED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_DELETED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_DELETED],
    isTerminal: true,
    isSuccess: false,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_READ,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_READ],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_READ],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_READ],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_READ],
    isTerminal: false,
    isSuccess: true,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_UNREAD,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_UNREAD],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_UNREAD],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_UNREAD],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_UNREAD],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_EXPIRED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_EXPIRED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_EXPIRED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_EXPIRED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_EXPIRED],
    isTerminal: true,
    isSuccess: false,
    isError: false,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_QUEUED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_QUEUED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_QUEUED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_QUEUED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_QUEUED],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_BOUNCED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_BOUNCED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_BOUNCED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_BOUNCED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_BOUNCED],
    isTerminal: true,
    isSuccess: false,
    isError: true,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_SPAM,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_SPAM],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_SPAM],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_SPAM],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_SPAM],
    isTerminal: true,
    isSuccess: false,
    isError: true,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_BLOCKED,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_BLOCKED],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_BLOCKED],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_BLOCKED],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_BLOCKED],
    isTerminal: true,
    isSuccess: false,
    isError: true,
    isActive: false,
  },
  {
    status: NOTIFICATION_STATUS_RETRYING,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_RETRYING],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_RETRYING],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_RETRYING],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_RETRYING],
    isTerminal: false,
    isSuccess: false,
    isError: false,
    isActive: true,
  },
  {
    status: NOTIFICATION_STATUS_PARTIAL,
    label: NOTIFICATION_STATUS_LABELS[NOTIFICATION_STATUS_PARTIAL],
    icon: NOTIFICATION_STATUS_ICONS[NOTIFICATION_STATUS_PARTIAL],
    color: NOTIFICATION_STATUS_COLORS[NOTIFICATION_STATUS_PARTIAL],
    category: NOTIFICATION_STATUS_TO_CATEGORY[NOTIFICATION_STATUS_PARTIAL],
    isTerminal: true,
    isSuccess: false,
    isError: true,
    isActive: false,
  },
];
