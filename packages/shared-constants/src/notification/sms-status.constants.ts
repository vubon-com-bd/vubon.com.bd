// ============================================
// এসএমএস স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. এসএমএস স্ট্যাটাস
// ============================================

/**
 * এসএমএস স্ট্যাটাস
 * এসএমএসের বর্তমান অবস্থা নির্দেশ করে
 */
export type SmsStatus =
  | typeof SMS_STATUS_PENDING
  | typeof SMS_STATUS_QUEUED
  | typeof SMS_STATUS_SENT
  | typeof SMS_STATUS_DELIVERED
  | typeof SMS_STATUS_FAILED
  | typeof SMS_STATUS_EXPIRED
  | typeof SMS_STATUS_REJECTED
  | typeof SMS_STATUS_UNDELIVERED
  | typeof SMS_STATUS_UNKNOWN
  | typeof SMS_STATUS_PROCESSING
  | typeof SMS_STATUS_SCHEDULED
  | typeof SMS_STATUS_DEFERRED
  | typeof SMS_STATUS_DROPPED
  | typeof SMS_STATUS_BOUNCED
  | typeof SMS_STATUS_SPAM
  | typeof SMS_STATUS_BLOCKED
  | typeof SMS_STATUS_UNSUBSCRIBED
  | typeof SMS_STATUS_COMPLAINED
  | typeof SMS_STATUS_RETRYING
  | typeof SMS_STATUS_PARTIAL;

/**
 * পেন্ডিং স্ট্যাটাস
 * @description এসএমএস প্রক্রিয়াকরণের অপেক্ষায়
 */
export const SMS_STATUS_PENDING = 'PENDING';

/**
 * কিউড স্ট্যাটাস
 * @description এসএমএস সারিবদ্ধ করা হয়েছে
 */
export const SMS_STATUS_QUEUED = 'QUEUED';

/**
 * সেন্ট স্ট্যাটাস
 * @description এসএমএস পাঠানো হয়েছে
 */
export const SMS_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 * @description এসএমএস প্রাপকের কাছে পৌঁছেছে
 */
export const SMS_STATUS_DELIVERED = 'DELIVERED';

/**
 * ফেইলড স্ট্যাটাস
 * @description এসএমএস পাঠাতে ব্যর্থ হয়েছে
 */
export const SMS_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description এসএমএসের মেয়াদ শেষ
 */
export const SMS_STATUS_EXPIRED = 'EXPIRED';

/**
 * রিজেক্টেড স্ট্যাটাস
 * @description এসএমএস প্রত্যাখ্যান করা হয়েছে
 */
export const SMS_STATUS_REJECTED = 'REJECTED';

/**
 * আনডেলিভারড স্ট্যাটাস
 * @description এসএমএস পৌঁছায়নি
 */
export const SMS_STATUS_UNDELIVERED = 'UNDELIVERED';

/**
 * আননোন স্ট্যাটাস
 * @description এসএমএসের অবস্থা অজানা
 */
export const SMS_STATUS_UNKNOWN = 'UNKNOWN';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description এসএমএস প্রক্রিয়াকরণ চলছে
 */
export const SMS_STATUS_PROCESSING = 'PROCESSING';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description এসএমএস নির্ধারিত সময়ে পাঠানোর জন্য
 */
export const SMS_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * ডিফারড স্ট্যাটাস
 * @description এসএমএস স্থগিত করা হয়েছে
 */
export const SMS_STATUS_DEFERRED = 'DEFERRED';

/**
 * ড্রপড স্ট্যাটাস
 * @description এসএমএস ড্রপ করা হয়েছে
 */
export const SMS_STATUS_DROPPED = 'DROPPED';

/**
 * বাউন্সড স্ট্যাটাস
 * @description এসএমএস বাউন্স হয়েছে
 */
export const SMS_STATUS_BOUNCED = 'BOUNCED';

/**
 * স্প্যাম স্ট্যাটাস
 * @description এসএমএস স্প্যাম হিসেবে চিহ্নিত হয়েছে
 */
export const SMS_STATUS_SPAM = 'SPAM';

/**
 * ব্লকড স্ট্যাটাস
 * @description এসএমএস ব্লক করা হয়েছে
 */
export const SMS_STATUS_BLOCKED = 'BLOCKED';

/**
 * আনসাবস্ক্রাইবড স্ট্যাটাস
 * @description প্রাপক আনসাবস্ক্রাইব করেছে
 */
export const SMS_STATUS_UNSUBSCRIBED = 'UNSUBSCRIBED';

/**
 * কমপ্লেইনড স্ট্যাটাস
 * @description প্রাপক অভিযোগ করেছে
 */
export const SMS_STATUS_COMPLAINED = 'COMPLAINED';

/**
 * রিট্রাইং স্ট্যাটাস
 * @description এসএমএস পুনরায় পাঠানোর চেষ্টা চলছে
 */
export const SMS_STATUS_RETRYING = 'RETRYING';

/**
 * পার্শিয়াল স্ট্যাটাস
 * @description এসএমএস আংশিকভাবে সফল হয়েছে
 */
export const SMS_STATUS_PARTIAL = 'PARTIAL';

// ============================================
// ২. এসএমএস স্ট্যাটাস গ্রুপ
// ============================================

/**
 * এসএমএস স্ট্যাটাস গ্রুপ
 */
export type SmsStatusGroup =
  | typeof SMS_STATUS_GROUP_PENDING
  | typeof SMS_STATUS_GROUP_IN_PROGRESS
  | typeof SMS_STATUS_GROUP_SUCCESS
  | typeof SMS_STATUS_GROUP_FAILURE
  | typeof SMS_STATUS_GROUP_TERMINAL
  | typeof SMS_STATUS_GROUP_UNKNOWN;

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const SMS_STATUS_GROUP_PENDING = 'PENDING';

/**
 * ইন-প্রোগ্রেস গ্রুপ
 * @description চলমান স্ট্যাটাস
 */
export const SMS_STATUS_GROUP_IN_PROGRESS = 'IN_PROGRESS';

/**
 * সাকসেস গ্রুপ
 * @description সফল স্ট্যাটাস
 */
export const SMS_STATUS_GROUP_SUCCESS = 'SUCCESS';

/**
 * ফেইল্যুর গ্রুপ
 * @description ব্যর্থ স্ট্যাটাস
 */
export const SMS_STATUS_GROUP_FAILURE = 'FAILURE';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const SMS_STATUS_GROUP_TERMINAL = 'TERMINAL';

/**
 * আননোন গ্রুপ
 * @description অজানা অবস্থা
 */
export const SMS_STATUS_GROUP_UNKNOWN = 'UNKNOWN';

// ============================================
// ৩. এসএমএস স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * এসএমএস স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const SMS_STATUS_TO_GROUP: Record<SmsStatus, SmsStatusGroup> = {
  [SMS_STATUS_PENDING]: SMS_STATUS_GROUP_PENDING,
  [SMS_STATUS_QUEUED]: SMS_STATUS_GROUP_PENDING,
  [SMS_STATUS_SENT]: SMS_STATUS_GROUP_IN_PROGRESS,
  [SMS_STATUS_DELIVERED]: SMS_STATUS_GROUP_SUCCESS,
  [SMS_STATUS_FAILED]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_EXPIRED]: SMS_STATUS_GROUP_TERMINAL,
  [SMS_STATUS_REJECTED]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_UNDELIVERED]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_UNKNOWN]: SMS_STATUS_GROUP_UNKNOWN,
  [SMS_STATUS_PROCESSING]: SMS_STATUS_GROUP_IN_PROGRESS,
  [SMS_STATUS_SCHEDULED]: SMS_STATUS_GROUP_PENDING,
  [SMS_STATUS_DEFERRED]: SMS_STATUS_GROUP_PENDING,
  [SMS_STATUS_DROPPED]: SMS_STATUS_GROUP_TERMINAL,
  [SMS_STATUS_BOUNCED]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_SPAM]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_BLOCKED]: SMS_STATUS_GROUP_FAILURE,
  [SMS_STATUS_UNSUBSCRIBED]: SMS_STATUS_GROUP_TERMINAL,
  [SMS_STATUS_COMPLAINED]: SMS_STATUS_GROUP_TERMINAL,
  [SMS_STATUS_RETRYING]: SMS_STATUS_GROUP_IN_PROGRESS,
  [SMS_STATUS_PARTIAL]: SMS_STATUS_GROUP_FAILURE,
};

// ============================================
// ৪. এসএমএস স্ট্যাটাস লেবেল
// ============================================

/**
 * এসএমএস স্ট্যাটাস লেবেল
 */
export const SMS_STATUS_LABELS: Record<SmsStatus, string> = {
  [SMS_STATUS_PENDING]: 'অপেক্ষমান',
  [SMS_STATUS_QUEUED]: 'সারিবদ্ধ',
  [SMS_STATUS_SENT]: 'পাঠানো হয়েছে',
  [SMS_STATUS_DELIVERED]: 'পৌঁছেছে',
  [SMS_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [SMS_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [SMS_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [SMS_STATUS_UNDELIVERED]: 'পৌঁছায়নি',
  [SMS_STATUS_UNKNOWN]: 'অজানা',
  [SMS_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [SMS_STATUS_SCHEDULED]: 'নির্ধারিত',
  [SMS_STATUS_DEFERRED]: 'স্থগিত',
  [SMS_STATUS_DROPPED]: 'ড্রপ',
  [SMS_STATUS_BOUNCED]: 'বাউন্স',
  [SMS_STATUS_SPAM]: 'স্প্যাম',
  [SMS_STATUS_BLOCKED]: 'ব্লক',
  [SMS_STATUS_UNSUBSCRIBED]: 'আনসাবস্ক্রাইব',
  [SMS_STATUS_COMPLAINED]: 'অভিযোগ',
  [SMS_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
  [SMS_STATUS_PARTIAL]: 'আংশিক',
};

// ============================================
// ৫. এসএমএস স্ট্যাটাস আইকন
// ============================================

/**
 * এসএমএস স্ট্যাটাস আইকন
 */
export const SMS_STATUS_ICONS: Record<SmsStatus, string> = {
  [SMS_STATUS_PENDING]: 'pending',
  [SMS_STATUS_QUEUED]: 'queue',
  [SMS_STATUS_SENT]: 'send',
  [SMS_STATUS_DELIVERED]: 'check_circle',
  [SMS_STATUS_FAILED]: 'error',
  [SMS_STATUS_EXPIRED]: 'timer',
  [SMS_STATUS_REJECTED]: 'block',
  [SMS_STATUS_UNDELIVERED]: 'warning',
  [SMS_STATUS_UNKNOWN]: 'help',
  [SMS_STATUS_PROCESSING]: 'processing',
  [SMS_STATUS_SCHEDULED]: 'schedule',
  [SMS_STATUS_DEFERRED]: 'pause',
  [SMS_STATUS_DROPPED]: 'delete',
  [SMS_STATUS_BOUNCED]: 'bounce',
  [SMS_STATUS_SPAM]: 'report_spam',
  [SMS_STATUS_BLOCKED]: 'block',
  [SMS_STATUS_UNSUBSCRIBED]: 'unsubscribe',
  [SMS_STATUS_COMPLAINED]: 'report',
  [SMS_STATUS_RETRYING]: 'retry',
  [SMS_STATUS_PARTIAL]: 'partial',
};

// ============================================
// ৬. এসএমএস স্ট্যাটাস কালার
// ============================================

/**
 * এসএমএস স্ট্যাটাস কালার
 */
export const SMS_STATUS_COLORS: Record<SmsStatus, string> = {
  [SMS_STATUS_PENDING]: '#FFC107', // Amber
  [SMS_STATUS_QUEUED]: '#FF9800', // Orange
  [SMS_STATUS_SENT]: '#00BCD4', // Cyan
  [SMS_STATUS_DELIVERED]: '#4CAF50', // Green
  [SMS_STATUS_FAILED]: '#F44336', // Red
  [SMS_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [SMS_STATUS_REJECTED]: '#D32F2F', // Dark Red
  [SMS_STATUS_UNDELIVERED]: '#FF5722', // Deep Orange
  [SMS_STATUS_UNKNOWN]: '#9E9E9E', // Grey
  [SMS_STATUS_PROCESSING]: '#2196F3', // Blue
  [SMS_STATUS_SCHEDULED]: '#FF6F00', // Dark Amber
  [SMS_STATUS_DEFERRED]: '#795548', // Brown
  [SMS_STATUS_DROPPED]: '#9E9E9E', // Grey
  [SMS_STATUS_BOUNCED]: '#E91E63', // Pink
  [SMS_STATUS_SPAM]: '#C62828', // Dark Red
  [SMS_STATUS_BLOCKED]: '#424242', // Dark Grey
  [SMS_STATUS_UNSUBSCRIBED]: '#424242', // Dark Grey
  [SMS_STATUS_COMPLAINED]: '#E91E63', // Pink
  [SMS_STATUS_RETRYING]: '#FF6F00', // Dark Amber
  [SMS_STATUS_PARTIAL]: '#FFAB00', // Yellow
};

// ============================================
// ৭. টার্মিনাল এসএমএস স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল এসএমএস স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const SMS_TERMINAL_STATUSES: SmsStatus[] = [
  SMS_STATUS_DELIVERED,
  SMS_STATUS_FAILED,
  SMS_STATUS_EXPIRED,
  SMS_STATUS_REJECTED,
  SMS_STATUS_UNDELIVERED,
  SMS_STATUS_DROPPED,
  SMS_STATUS_BOUNCED,
  SMS_STATUS_SPAM,
  SMS_STATUS_BLOCKED,
  SMS_STATUS_UNSUBSCRIBED,
  SMS_STATUS_COMPLAINED,
];

// ============================================
// ৮. সফল এসএমএস স্ট্যাটাসসমূহ
// ============================================

/**
 * সফল এসএমএস স্ট্যাটাসসমূহ
 */
export const SMS_SUCCESS_STATUSES: SmsStatus[] = [SMS_STATUS_SENT, SMS_STATUS_DELIVERED];

// ============================================
// ৯. ব্যর্থ এসএমএস স্ট্যাটাসসমূহ
// ============================================

/**
 * ব্যর্থ এসএমএস স্ট্যাটাসসমূহ
 */
export const SMS_FAILURE_STATUSES: SmsStatus[] = [
  SMS_STATUS_FAILED,
  SMS_STATUS_REJECTED,
  SMS_STATUS_UNDELIVERED,
  SMS_STATUS_BOUNCED,
  SMS_STATUS_SPAM,
  SMS_STATUS_BLOCKED,
  SMS_STATUS_PARTIAL,
];

// ============================================
// ১০. অ্যাক্টিভ এসএমএস স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ এসএমএস স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও চলমান
 */
export const SMS_ACTIVE_STATUSES: SmsStatus[] = [
  SMS_STATUS_PENDING,
  SMS_STATUS_QUEUED,
  SMS_STATUS_SENT,
  SMS_STATUS_PROCESSING,
  SMS_STATUS_DEFERRED,
  SMS_STATUS_RETRYING,
];

// ============================================
// ১১. এসএমএস স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * এসএমএস স্ট্যাটাস কনফিগারেশন
 */
export interface SmsStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: SmsStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: SmsStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** সফল স্ট্যাটাস কিনা */
  isSuccess: boolean;
  /** ব্যর্থ স্ট্যাটাস কিনা */
  isFailure: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** রেট্রাই করা যাবে কিনা */
  isRetryable: boolean;
}

/**
 * সব এসএমএস স্ট্যাটাসের কনফিগারেশন
 */
export const SMS_STATUS_CONFIGS: SmsStatusConfig[] = [
  {
    status: SMS_STATUS_PENDING,
    label: SMS_STATUS_LABELS[SMS_STATUS_PENDING],
    icon: SMS_STATUS_ICONS[SMS_STATUS_PENDING],
    color: SMS_STATUS_COLORS[SMS_STATUS_PENDING],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_PENDING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_QUEUED,
    label: SMS_STATUS_LABELS[SMS_STATUS_QUEUED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_QUEUED],
    color: SMS_STATUS_COLORS[SMS_STATUS_QUEUED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_QUEUED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_SENT,
    label: SMS_STATUS_LABELS[SMS_STATUS_SENT],
    icon: SMS_STATUS_ICONS[SMS_STATUS_SENT],
    color: SMS_STATUS_COLORS[SMS_STATUS_SENT],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_SENT],
    isTerminal: false,
    isSuccess: true,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_DELIVERED,
    label: SMS_STATUS_LABELS[SMS_STATUS_DELIVERED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_DELIVERED],
    color: SMS_STATUS_COLORS[SMS_STATUS_DELIVERED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_DELIVERED],
    isTerminal: true,
    isSuccess: true,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_FAILED,
    label: SMS_STATUS_LABELS[SMS_STATUS_FAILED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_FAILED],
    color: SMS_STATUS_COLORS[SMS_STATUS_FAILED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_FAILED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
  {
    status: SMS_STATUS_EXPIRED,
    label: SMS_STATUS_LABELS[SMS_STATUS_EXPIRED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_EXPIRED],
    color: SMS_STATUS_COLORS[SMS_STATUS_EXPIRED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_EXPIRED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_REJECTED,
    label: SMS_STATUS_LABELS[SMS_STATUS_REJECTED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_REJECTED],
    color: SMS_STATUS_COLORS[SMS_STATUS_REJECTED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_REJECTED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_UNDELIVERED,
    label: SMS_STATUS_LABELS[SMS_STATUS_UNDELIVERED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_UNDELIVERED],
    color: SMS_STATUS_COLORS[SMS_STATUS_UNDELIVERED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_UNDELIVERED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
  {
    status: SMS_STATUS_UNKNOWN,
    label: SMS_STATUS_LABELS[SMS_STATUS_UNKNOWN],
    icon: SMS_STATUS_ICONS[SMS_STATUS_UNKNOWN],
    color: SMS_STATUS_COLORS[SMS_STATUS_UNKNOWN],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_UNKNOWN],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_PROCESSING,
    label: SMS_STATUS_LABELS[SMS_STATUS_PROCESSING],
    icon: SMS_STATUS_ICONS[SMS_STATUS_PROCESSING],
    color: SMS_STATUS_COLORS[SMS_STATUS_PROCESSING],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_PROCESSING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_SCHEDULED,
    label: SMS_STATUS_LABELS[SMS_STATUS_SCHEDULED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_SCHEDULED],
    color: SMS_STATUS_COLORS[SMS_STATUS_SCHEDULED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_SCHEDULED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_DEFERRED,
    label: SMS_STATUS_LABELS[SMS_STATUS_DEFERRED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_DEFERRED],
    color: SMS_STATUS_COLORS[SMS_STATUS_DEFERRED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_DEFERRED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: true,
  },
  {
    status: SMS_STATUS_DROPPED,
    label: SMS_STATUS_LABELS[SMS_STATUS_DROPPED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_DROPPED],
    color: SMS_STATUS_COLORS[SMS_STATUS_DROPPED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_DROPPED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_BOUNCED,
    label: SMS_STATUS_LABELS[SMS_STATUS_BOUNCED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_BOUNCED],
    color: SMS_STATUS_COLORS[SMS_STATUS_BOUNCED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_BOUNCED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
  {
    status: SMS_STATUS_SPAM,
    label: SMS_STATUS_LABELS[SMS_STATUS_SPAM],
    icon: SMS_STATUS_ICONS[SMS_STATUS_SPAM],
    color: SMS_STATUS_COLORS[SMS_STATUS_SPAM],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_SPAM],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_BLOCKED,
    label: SMS_STATUS_LABELS[SMS_STATUS_BLOCKED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_BLOCKED],
    color: SMS_STATUS_COLORS[SMS_STATUS_BLOCKED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_BLOCKED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_UNSUBSCRIBED,
    label: SMS_STATUS_LABELS[SMS_STATUS_UNSUBSCRIBED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_UNSUBSCRIBED],
    color: SMS_STATUS_COLORS[SMS_STATUS_UNSUBSCRIBED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_UNSUBSCRIBED],
    isTerminal: true,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_COMPLAINED,
    label: SMS_STATUS_LABELS[SMS_STATUS_COMPLAINED],
    icon: SMS_STATUS_ICONS[SMS_STATUS_COMPLAINED],
    color: SMS_STATUS_COLORS[SMS_STATUS_COMPLAINED],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_COMPLAINED],
    isTerminal: true,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: SMS_STATUS_RETRYING,
    label: SMS_STATUS_LABELS[SMS_STATUS_RETRYING],
    icon: SMS_STATUS_ICONS[SMS_STATUS_RETRYING],
    color: SMS_STATUS_COLORS[SMS_STATUS_RETRYING],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_RETRYING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: true,
  },
  {
    status: SMS_STATUS_PARTIAL,
    label: SMS_STATUS_LABELS[SMS_STATUS_PARTIAL],
    icon: SMS_STATUS_ICONS[SMS_STATUS_PARTIAL],
    color: SMS_STATUS_COLORS[SMS_STATUS_PARTIAL],
    group: SMS_STATUS_TO_GROUP[SMS_STATUS_PARTIAL],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
];
