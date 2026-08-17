// ============================================
// নোটিফিকেশন অ্যাকশন সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. নোটিফিকেশন অ্যাকশন
// ============================================

/**
 * নোটিফিকেশন অ্যাকশন
 * নোটিফিকেশনে ব্যবহারকারী যে কর্ম সম্পাদন করতে পারে
 */
export type NotificationAction =
  | typeof NOTIFICATION_ACTION_VIEW
  | typeof NOTIFICATION_ACTION_OPEN
  | typeof NOTIFICATION_ACTION_CLICK
  | typeof NOTIFICATION_ACTION_DELETE
  | typeof NOTIFICATION_ACTION_ARCHIVE
  | typeof NOTIFICATION_ACTION_MARK_READ
  | typeof NOTIFICATION_ACTION_MARK_UNREAD
  | typeof NOTIFICATION_ACTION_SHARE
  | typeof NOTIFICATION_ACTION_REPLY
  | typeof NOTIFICATION_ACTION_FORWARD
  | typeof NOTIFICATION_ACTION_SNOOZE
  | typeof NOTIFICATION_ACTION_REPORT
  | typeof NOTIFICATION_ACTION_UNSUBSCRIBE
  | typeof NOTIFICATION_ACTION_DISMISS
  | typeof NOTIFICATION_ACTION_FAVORITE
  | typeof NOTIFICATION_ACTION_UNFAVORITE
  | typeof NOTIFICATION_ACTION_SPAM
  | typeof NOTIFICATION_ACTION_BLOCK
  | typeof NOTIFICATION_ACTION_PRINT
  | typeof NOTIFICATION_ACTION_DOWNLOAD;

/**
 * ভিউ অ্যাকশন
 * @description নোটিফিকেশন দেখুন
 */
export const NOTIFICATION_ACTION_VIEW = 'VIEW';

/**
 * ওপেন অ্যাকশন
 * @description নোটিফিকেশন খুলুন
 */
export const NOTIFICATION_ACTION_OPEN = 'OPEN';

/**
 * ক্লিক অ্যাকশন
 * @description নোটিফিকেশনে ক্লিক করুন
 */
export const NOTIFICATION_ACTION_CLICK = 'CLICK';

/**
 * ডিলিট অ্যাকশন
 * @description নোটিফিকেশন মুছে ফেলুন
 */
export const NOTIFICATION_ACTION_DELETE = 'DELETE';

/**
 * আর্কাইভ অ্যাকশন
 * @description নোটিফিকেশন আর্কাইভ করুন
 */
export const NOTIFICATION_ACTION_ARCHIVE = 'ARCHIVE';

/**
 * মার্ক রিড অ্যাকশন
 * @description নোটিফিকেশন পড়া হিসেবে চিহ্নিত করুন
 */
export const NOTIFICATION_ACTION_MARK_READ = 'MARK_READ';

/**
 * মার্ক আনরিড অ্যাকশন
 * @description নোটিফিকেশন অ-পঠিত হিসেবে চিহ্নিত করুন
 */
export const NOTIFICATION_ACTION_MARK_UNREAD = 'MARK_UNREAD';

/**
 * শেয়ার অ্যাকশন
 * @description নোটিফিকেশন শেয়ার করুন
 */
export const NOTIFICATION_ACTION_SHARE = 'SHARE';

/**
 * রিপ্লাই অ্যাকশন
 * @description নোটিফিকেশনে উত্তর দিন
 */
export const NOTIFICATION_ACTION_REPLY = 'REPLY';

/**
 * ফরওয়ার্ড অ্যাকশন
 * @description নোটিফিকেশন ফরওয়ার্ড করুন
 */
export const NOTIFICATION_ACTION_FORWARD = 'FORWARD';

/**
 * স্নুজ অ্যাকশন
 * @description নোটিফিকেশন কিছুক্ষণের জন্য সরিয়ে রাখুন
 */
export const NOTIFICATION_ACTION_SNOOZE = 'SNOOZE';

/**
 * রিপোর্ট অ্যাকশন
 * @description নোটিফিকেশন রিপোর্ট করুন
 */
export const NOTIFICATION_ACTION_REPORT = 'REPORT';

/**
 * আনসাবস্ক্রাইব অ্যাকশন
 * @description নোটিফিকেশন থেকে আনসাবস্ক্রাইব করুন
 */
export const NOTIFICATION_ACTION_UNSUBSCRIBE = 'UNSUBSCRIBE';

/**
 * ডিসমিস অ্যাকশন
 * @description নোটিফিকেশন বাদ দিন
 */
export const NOTIFICATION_ACTION_DISMISS = 'DISMISS';

/**
 * ফেভারিট অ্যাকশন
 * @description নোটিফিকেশন পছন্দ হিসেবে চিহ্নিত করুন
 */
export const NOTIFICATION_ACTION_FAVORITE = 'FAVORITE';

/**
 * আনফেভারিট অ্যাকশন
 * @description নোটিফিকেশন অ-পছন্দ হিসেবে চিহ্নিত করুন
 */
export const NOTIFICATION_ACTION_UNFAVORITE = 'UNFAVORITE';

/**
 * স্প্যাম অ্যাকশন
 * @description নোটিফিকেশন স্প্যাম হিসেবে চিহ্নিত করুন
 */
export const NOTIFICATION_ACTION_SPAM = 'SPAM';

/**
 * ব্লক অ্যাকশন
 * @description নোটিফিকেশন ব্লক করুন
 */
export const NOTIFICATION_ACTION_BLOCK = 'BLOCK';

/**
 * প্রিন্ট অ্যাকশন
 * @description নোটিফিকেশন প্রিন্ট করুন
 */
export const NOTIFICATION_ACTION_PRINT = 'PRINT';

/**
 * ডাউনলোড অ্যাকশন
 * @description নোটিফিকেশন ডাউনলোড করুন
 */
export const NOTIFICATION_ACTION_DOWNLOAD = 'DOWNLOAD';

// ============================================
// ২. অ্যাকশন ক্যাটাগরি
// ============================================

/**
 * অ্যাকশন ক্যাটাগরি
 */
export type NotificationActionCategory =
  | typeof NOTIFICATION_ACTION_CATEGORY_VIEW
  | typeof NOTIFICATION_ACTION_CATEGORY_MANAGE
  | typeof NOTIFICATION_ACTION_CATEGORY_COMMUNICATE
  | typeof NOTIFICATION_ACTION_CATEGORY_MODERATE;

/**
 * ভিউ ক্যাটাগরি
 * @description দেখার সাথে সম্পর্কিত অ্যাকশন
 */
export const NOTIFICATION_ACTION_CATEGORY_VIEW = 'VIEW';

/**
 * ম্যানেজ ক্যাটাগরি
 * @description ব্যবস্থাপনার সাথে সম্পর্কিত অ্যাকশন
 */
export const NOTIFICATION_ACTION_CATEGORY_MANAGE = 'MANAGE';

/**
 * কমিউনিকেট ক্যাটাগরি
 * @description যোগাযোগের সাথে সম্পর্কিত অ্যাকশন
 */
export const NOTIFICATION_ACTION_CATEGORY_COMMUNICATE = 'COMMUNICATE';

/**
 * মডারেট ক্যাটাগরি
 * @description মডারেশনের সাথে সম্পর্কিত অ্যাকশন
 */
export const NOTIFICATION_ACTION_CATEGORY_MODERATE = 'MODERATE';

// ============================================
// ৩. অ্যাকশন থেকে ক্যাটাগরি ম্যাপিং
// ============================================

/**
 * অ্যাকশন থেকে ক্যাটাগরি ম্যাপিং
 */
export const NOTIFICATION_ACTION_TO_CATEGORY: Record<
  NotificationAction,
  NotificationActionCategory
> = {
  [NOTIFICATION_ACTION_VIEW]: NOTIFICATION_ACTION_CATEGORY_VIEW,
  [NOTIFICATION_ACTION_OPEN]: NOTIFICATION_ACTION_CATEGORY_VIEW,
  [NOTIFICATION_ACTION_CLICK]: NOTIFICATION_ACTION_CATEGORY_VIEW,
  [NOTIFICATION_ACTION_DELETE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_ARCHIVE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_MARK_READ]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_MARK_UNREAD]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_SHARE]: NOTIFICATION_ACTION_CATEGORY_COMMUNICATE,
  [NOTIFICATION_ACTION_REPLY]: NOTIFICATION_ACTION_CATEGORY_COMMUNICATE,
  [NOTIFICATION_ACTION_FORWARD]: NOTIFICATION_ACTION_CATEGORY_COMMUNICATE,
  [NOTIFICATION_ACTION_SNOOZE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_REPORT]: NOTIFICATION_ACTION_CATEGORY_MODERATE,
  [NOTIFICATION_ACTION_UNSUBSCRIBE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_DISMISS]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_FAVORITE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_UNFAVORITE]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
  [NOTIFICATION_ACTION_SPAM]: NOTIFICATION_ACTION_CATEGORY_MODERATE,
  [NOTIFICATION_ACTION_BLOCK]: NOTIFICATION_ACTION_CATEGORY_MODERATE,
  [NOTIFICATION_ACTION_PRINT]: NOTIFICATION_ACTION_CATEGORY_VIEW,
  [NOTIFICATION_ACTION_DOWNLOAD]: NOTIFICATION_ACTION_CATEGORY_MANAGE,
};

// ============================================
// ৪. অ্যাকশন লেবেল
// ============================================

/**
 * অ্যাকশন লেবেল
 */
export const NOTIFICATION_ACTION_LABELS: Record<NotificationAction, string> = {
  [NOTIFICATION_ACTION_VIEW]: 'দেখুন',
  [NOTIFICATION_ACTION_OPEN]: 'খুলুন',
  [NOTIFICATION_ACTION_CLICK]: 'ক্লিক করুন',
  [NOTIFICATION_ACTION_DELETE]: 'মুছে ফেলুন',
  [NOTIFICATION_ACTION_ARCHIVE]: 'আর্কাইভ করুন',
  [NOTIFICATION_ACTION_MARK_READ]: 'পড়া হিসেবে চিহ্নিত করুন',
  [NOTIFICATION_ACTION_MARK_UNREAD]: 'অ-পঠিত হিসেবে চিহ্নিত করুন',
  [NOTIFICATION_ACTION_SHARE]: 'শেয়ার করুন',
  [NOTIFICATION_ACTION_REPLY]: 'উত্তর দিন',
  [NOTIFICATION_ACTION_FORWARD]: 'ফরওয়ার্ড করুন',
  [NOTIFICATION_ACTION_SNOOZE]: 'স্নুজ করুন',
  [NOTIFICATION_ACTION_REPORT]: 'রিপোর্ট করুন',
  [NOTIFICATION_ACTION_UNSUBSCRIBE]: 'আনসাবস্ক্রাইব করুন',
  [NOTIFICATION_ACTION_DISMISS]: 'বাদ দিন',
  [NOTIFICATION_ACTION_FAVORITE]: 'পছন্দ করুন',
  [NOTIFICATION_ACTION_UNFAVORITE]: 'অ-পছন্দ করুন',
  [NOTIFICATION_ACTION_SPAM]: 'স্প্যাম হিসেবে চিহ্নিত করুন',
  [NOTIFICATION_ACTION_BLOCK]: 'ব্লক করুন',
  [NOTIFICATION_ACTION_PRINT]: 'প্রিন্ট করুন',
  [NOTIFICATION_ACTION_DOWNLOAD]: 'ডাউনলোড করুন',
};

// ============================================
// ৫. অ্যাকশন আইকন
// ============================================

/**
 * অ্যাকশন আইকন
 */
export const NOTIFICATION_ACTION_ICONS: Record<NotificationAction, string> = {
  [NOTIFICATION_ACTION_VIEW]: 'visibility',
  [NOTIFICATION_ACTION_OPEN]: 'open_in_new',
  [NOTIFICATION_ACTION_CLICK]: 'touch_app',
  [NOTIFICATION_ACTION_DELETE]: 'delete',
  [NOTIFICATION_ACTION_ARCHIVE]: 'archive',
  [NOTIFICATION_ACTION_MARK_READ]: 'mark_email_read',
  [NOTIFICATION_ACTION_MARK_UNREAD]: 'mark_email_unread',
  [NOTIFICATION_ACTION_SHARE]: 'share',
  [NOTIFICATION_ACTION_REPLY]: 'reply',
  [NOTIFICATION_ACTION_FORWARD]: 'forward',
  [NOTIFICATION_ACTION_SNOOZE]: 'snooze',
  [NOTIFICATION_ACTION_REPORT]: 'report',
  [NOTIFICATION_ACTION_UNSUBSCRIBE]: 'unsubscribe',
  [NOTIFICATION_ACTION_DISMISS]: 'close',
  [NOTIFICATION_ACTION_FAVORITE]: 'favorite',
  [NOTIFICATION_ACTION_UNFAVORITE]: 'favorite_border',
  [NOTIFICATION_ACTION_SPAM]: 'report_spam',
  [NOTIFICATION_ACTION_BLOCK]: 'block',
  [NOTIFICATION_ACTION_PRINT]: 'print',
  [NOTIFICATION_ACTION_DOWNLOAD]: 'download',
};

// ============================================
// ৬. অ্যাকশন কালার
// ============================================

/**
 * অ্যাকশন কালার
 */
export const NOTIFICATION_ACTION_COLORS: Record<NotificationAction, string> = {
  [NOTIFICATION_ACTION_VIEW]: '#2196F3', // Blue
  [NOTIFICATION_ACTION_OPEN]: '#00BCD4', // Cyan
  [NOTIFICATION_ACTION_CLICK]: '#4CAF50', // Green
  [NOTIFICATION_ACTION_DELETE]: '#F44336', // Red
  [NOTIFICATION_ACTION_ARCHIVE]: '#FF9800', // Orange
  [NOTIFICATION_ACTION_MARK_READ]: '#8BC34A', // Light Green
  [NOTIFICATION_ACTION_MARK_UNREAD]: '#FF5722', // Deep Orange
  [NOTIFICATION_ACTION_SHARE]: '#9C27B0', // Purple
  [NOTIFICATION_ACTION_REPLY]: '#3F51B5', // Indigo
  [NOTIFICATION_ACTION_FORWARD]: '#009688', // Teal
  [NOTIFICATION_ACTION_SNOOZE]: '#607D8B', // Blue Grey
  [NOTIFICATION_ACTION_REPORT]: '#D32F2F', // Dark Red
  [NOTIFICATION_ACTION_UNSUBSCRIBE]: '#795548', // Brown
  [NOTIFICATION_ACTION_DISMISS]: '#9E9E9E', // Grey
  [NOTIFICATION_ACTION_FAVORITE]: '#E91E63', // Pink
  [NOTIFICATION_ACTION_UNFAVORITE]: '#BDBDBD', // Light Grey
  [NOTIFICATION_ACTION_SPAM]: '#C62828', // Dark Red
  [NOTIFICATION_ACTION_BLOCK]: '#424242', // Dark Grey
  [NOTIFICATION_ACTION_PRINT]: '#607D8B', // Blue Grey
  [NOTIFICATION_ACTION_DOWNLOAD]: '#00BCD4', // Cyan
};

// ============================================
// ৭. অ্যাকশন কনফিগারেশন
// ============================================

/**
 * নোটিফিকেশন অ্যাকশন কনফিগারেশন
 */
export interface NotificationActionConfig {
  /** অ্যাকশনের নাম */
  action: NotificationAction;
  /** অ্যাকশনের লেবেল */
  label: string;
  /** অ্যাকশনের আইকন */
  icon: string;
  /** অ্যাকশনের কালার */
  color: string;
  /** অ্যাকশনের ক্যাটাগরি */
  category: NotificationActionCategory;
  /** অ্যাকশন কি ডিফল্টভাবে সক্রিয় */
  isDefault: boolean;
  /** অ্যাকশন কি বিপজ্জনক (ডিলিট, ব্লক ইত্যাদি) */
  isDangerous: boolean;
}

/**
 * সব অ্যাকশনের কনফিগারেশন
 */
export const NOTIFICATION_ACTION_CONFIGS: NotificationActionConfig[] = [
  {
    action: NOTIFICATION_ACTION_VIEW,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_VIEW],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_VIEW],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_VIEW],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_VIEW],
    isDefault: true,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_OPEN,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_OPEN],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_OPEN],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_OPEN],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_OPEN],
    isDefault: true,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_CLICK,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_CLICK],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_CLICK],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_CLICK],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_CLICK],
    isDefault: true,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_DELETE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_DELETE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_DELETE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_DELETE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_DELETE],
    isDefault: false,
    isDangerous: true,
  },
  {
    action: NOTIFICATION_ACTION_ARCHIVE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_ARCHIVE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_ARCHIVE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_ARCHIVE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_ARCHIVE],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_MARK_READ,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_MARK_READ],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_MARK_READ],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_MARK_READ],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_MARK_READ],
    isDefault: true,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_MARK_UNREAD,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_MARK_UNREAD],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_MARK_UNREAD],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_MARK_UNREAD],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_MARK_UNREAD],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_SHARE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_SHARE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_SHARE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_SHARE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_SHARE],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_REPLY,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_REPLY],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_REPLY],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_REPLY],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_REPLY],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_FORWARD,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_FORWARD],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_FORWARD],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_FORWARD],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_FORWARD],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_SNOOZE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_SNOOZE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_SNOOZE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_SNOOZE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_SNOOZE],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_REPORT,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_REPORT],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_REPORT],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_REPORT],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_REPORT],
    isDefault: false,
    isDangerous: true,
  },
  {
    action: NOTIFICATION_ACTION_UNSUBSCRIBE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_UNSUBSCRIBE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_UNSUBSCRIBE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_UNSUBSCRIBE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_UNSUBSCRIBE],
    isDefault: false,
    isDangerous: true,
  },
  {
    action: NOTIFICATION_ACTION_DISMISS,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_DISMISS],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_DISMISS],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_DISMISS],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_DISMISS],
    isDefault: true,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_FAVORITE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_FAVORITE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_FAVORITE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_FAVORITE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_FAVORITE],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_UNFAVORITE,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_UNFAVORITE],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_UNFAVORITE],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_UNFAVORITE],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_UNFAVORITE],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_SPAM,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_SPAM],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_SPAM],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_SPAM],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_SPAM],
    isDefault: false,
    isDangerous: true,
  },
  {
    action: NOTIFICATION_ACTION_BLOCK,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_BLOCK],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_BLOCK],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_BLOCK],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_BLOCK],
    isDefault: false,
    isDangerous: true,
  },
  {
    action: NOTIFICATION_ACTION_PRINT,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_PRINT],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_PRINT],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_PRINT],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_PRINT],
    isDefault: false,
    isDangerous: false,
  },
  {
    action: NOTIFICATION_ACTION_DOWNLOAD,
    label: NOTIFICATION_ACTION_LABELS[NOTIFICATION_ACTION_DOWNLOAD],
    icon: NOTIFICATION_ACTION_ICONS[NOTIFICATION_ACTION_DOWNLOAD],
    color: NOTIFICATION_ACTION_COLORS[NOTIFICATION_ACTION_DOWNLOAD],
    category: NOTIFICATION_ACTION_TO_CATEGORY[NOTIFICATION_ACTION_DOWNLOAD],
    isDefault: false,
    isDangerous: false,
  },
];
