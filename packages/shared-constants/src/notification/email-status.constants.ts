// ============================================
// ইমেইল স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. ইমেইল স্ট্যাটাস
// ============================================

/**
 * ইমেইল স্ট্যাটাস
 * ইমেইলের বর্তমান অবস্থা নির্দেশ করে
 */
export type EmailStatus =
  | typeof EMAIL_STATUS_DRAFT
  | typeof EMAIL_STATUS_PENDING
  | typeof EMAIL_STATUS_QUEUED
  | typeof EMAIL_STATUS_SENT
  | typeof EMAIL_STATUS_DELIVERED
  | typeof EMAIL_STATUS_OPENED
  | typeof EMAIL_STATUS_CLICKED
  | typeof EMAIL_STATUS_BOUNCED
  | typeof EMAIL_STATUS_SPAM
  | typeof EMAIL_STATUS_REJECTED
  | typeof EMAIL_STATUS_FAILED
  | typeof EMAIL_STATUS_EXPIRED
  | typeof EMAIL_STATUS_SCHEDULED
  | typeof EMAIL_STATUS_PROCESSING
  | typeof EMAIL_STATUS_DEFERRED
  | typeof EMAIL_STATUS_DROPPED
  | typeof EMAIL_STATUS_UNSUBSCRIBED
  | typeof EMAIL_STATUS_COMPLAINED
  | typeof EMAIL_STATUS_BLOCKED
  | typeof EMAIL_STATUS_RETRYING;

/**
 * ড্রাফট স্ট্যাটাস
 * @description ইমেইল খসড়া হিসেবে সংরক্ষিত
 */
export const EMAIL_STATUS_DRAFT = 'DRAFT';

/**
 * পেন্ডিং স্ট্যাটাস
 * @description ইমেইল প্রক্রিয়াকরণের অপেক্ষায়
 */
export const EMAIL_STATUS_PENDING = 'PENDING';

/**
 * কিউড স্ট্যাটাস
 * @description ইমেইল সারিবদ্ধ করা হয়েছে
 */
export const EMAIL_STATUS_QUEUED = 'QUEUED';

/**
 * সেন্ট স্ট্যাটাস
 * @description ইমেইল পাঠানো হয়েছে
 */
export const EMAIL_STATUS_SENT = 'SENT';

/**
 * ডেলিভারড স্ট্যাটাস
 * @description ইমেইল প্রাপকের কাছে পৌঁছেছে
 */
export const EMAIL_STATUS_DELIVERED = 'DELIVERED';

/**
 * ওপেনড স্ট্যাটাস
 * @description ইমেইল খোলা হয়েছে
 */
export const EMAIL_STATUS_OPENED = 'OPENED';

/**
 * ক্লিকড স্ট্যাটাস
 * @description ইমেইলের লিংকে ক্লিক করা হয়েছে
 */
export const EMAIL_STATUS_CLICKED = 'CLICKED';

/**
 * বাউন্সড স্ট্যাটাস
 * @description ইমেইল বাউন্স হয়েছে
 */
export const EMAIL_STATUS_BOUNCED = 'BOUNCED';

/**
 * স্প্যাম স্ট্যাটাস
 * @description ইমেইল স্প্যাম হিসেবে চিহ্নিত হয়েছে
 */
export const EMAIL_STATUS_SPAM = 'SPAM';

/**
 * রিজেক্টেড স্ট্যাটাস
 * @description ইমেইল প্রত্যাখ্যান করা হয়েছে
 */
export const EMAIL_STATUS_REJECTED = 'REJECTED';

/**
 * ফেইলড স্ট্যাটাস
 * @description ইমেইল পাঠাতে ব্যর্থ হয়েছে
 */
export const EMAIL_STATUS_FAILED = 'FAILED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description ইমেইলের মেয়াদ শেষ
 */
export const EMAIL_STATUS_EXPIRED = 'EXPIRED';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description ইমেইল নির্ধারিত সময়ে পাঠানোর জন্য
 */
export const EMAIL_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * প্রসেসিং স্ট্যাটাস
 * @description ইমেইল প্রক্রিয়াকরণ চলছে
 */
export const EMAIL_STATUS_PROCESSING = 'PROCESSING';

/**
 * ডিফারড স্ট্যাটাস
 * @description ইমেইল স্থগিত করা হয়েছে
 */
export const EMAIL_STATUS_DEFERRED = 'DEFERRED';

/**
 * ড্রপড স্ট্যাটাস
 * @description ইমেইল ড্রপ করা হয়েছে
 */
export const EMAIL_STATUS_DROPPED = 'DROPPED';

/**
 * আনসাবস্ক্রাইবড স্ট্যাটাস
 * @description প্রাপক আনসাবস্ক্রাইব করেছে
 */
export const EMAIL_STATUS_UNSUBSCRIBED = 'UNSUBSCRIBED';

/**
 * কমপ্লেইনড স্ট্যাটাস
 * @description প্রাপক অভিযোগ করেছে
 */
export const EMAIL_STATUS_COMPLAINED = 'COMPLAINED';

/**
 * ব্লকড স্ট্যাটাস
 * @description ইমেইল ব্লক করা হয়েছে
 */
export const EMAIL_STATUS_BLOCKED = 'BLOCKED';

/**
 * রিট্রাইং স্ট্যাটাস
 * @description ইমেইল পুনরায় পাঠানোর চেষ্টা চলছে
 */
export const EMAIL_STATUS_RETRYING = 'RETRYING';

// ============================================
// ২. ইমেইল স্ট্যাটাস গ্রুপ
// ============================================

/**
 * ইমেইল স্ট্যাটাস গ্রুপ
 */
export type EmailStatusGroup =
  | typeof EMAIL_STATUS_GROUP_DRAFT
  | typeof EMAIL_STATUS_GROUP_PENDING
  | typeof EMAIL_STATUS_GROUP_SENT
  | typeof EMAIL_STATUS_GROUP_DELIVERED
  | typeof EMAIL_STATUS_GROUP_OPENED
  | typeof EMAIL_STATUS_GROUP_FAILED
  | typeof EMAIL_STATUS_GROUP_TERMINAL
  | typeof EMAIL_STATUS_GROUP_USER_ACTION;

/**
 * ড্রাফট গ্রুপ
 * @description খসড়া স্ট্যাটাস
 */
export const EMAIL_STATUS_GROUP_DRAFT = 'DRAFT';

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const EMAIL_STATUS_GROUP_PENDING = 'PENDING';

/**
 * সেন্ট গ্রুপ
 * @description পাঠানো হয়েছে
 */
export const EMAIL_STATUS_GROUP_SENT = 'SENT';

/**
 * ডেলিভারড গ্রুপ
 * @description পৌঁছেছে
 */
export const EMAIL_STATUS_GROUP_DELIVERED = 'DELIVERED';

/**
 * ওপেনড গ্রুপ
 * @description খোলা হয়েছে
 */
export const EMAIL_STATUS_GROUP_OPENED = 'OPENED';

/**
 * ফেইলড গ্রুপ
 * @description ব্যর্থ হয়েছে
 */
export const EMAIL_STATUS_GROUP_FAILED = 'FAILED';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const EMAIL_STATUS_GROUP_TERMINAL = 'TERMINAL';

/**
 * ইউজার অ্যাকশন গ্রুপ
 * @description প্রাপকের কর্মকাণ্ড
 */
export const EMAIL_STATUS_GROUP_USER_ACTION = 'USER_ACTION';

// ============================================
// ৩. ইমেইল স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * ইমেইল স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const EMAIL_STATUS_TO_GROUP: Record<EmailStatus, EmailStatusGroup> = {
  [EMAIL_STATUS_DRAFT]: EMAIL_STATUS_GROUP_DRAFT,
  [EMAIL_STATUS_PENDING]: EMAIL_STATUS_GROUP_PENDING,
  [EMAIL_STATUS_QUEUED]: EMAIL_STATUS_GROUP_PENDING,
  [EMAIL_STATUS_SENT]: EMAIL_STATUS_GROUP_SENT,
  [EMAIL_STATUS_DELIVERED]: EMAIL_STATUS_GROUP_DELIVERED,
  [EMAIL_STATUS_OPENED]: EMAIL_STATUS_GROUP_OPENED,
  [EMAIL_STATUS_CLICKED]: EMAIL_STATUS_GROUP_USER_ACTION,
  [EMAIL_STATUS_BOUNCED]: EMAIL_STATUS_GROUP_FAILED,
  [EMAIL_STATUS_SPAM]: EMAIL_STATUS_GROUP_FAILED,
  [EMAIL_STATUS_REJECTED]: EMAIL_STATUS_GROUP_FAILED,
  [EMAIL_STATUS_FAILED]: EMAIL_STATUS_GROUP_FAILED,
  [EMAIL_STATUS_EXPIRED]: EMAIL_STATUS_GROUP_TERMINAL,
  [EMAIL_STATUS_SCHEDULED]: EMAIL_STATUS_GROUP_PENDING,
  [EMAIL_STATUS_PROCESSING]: EMAIL_STATUS_GROUP_PENDING,
  [EMAIL_STATUS_DEFERRED]: EMAIL_STATUS_GROUP_PENDING,
  [EMAIL_STATUS_DROPPED]: EMAIL_STATUS_GROUP_TERMINAL,
  [EMAIL_STATUS_UNSUBSCRIBED]: EMAIL_STATUS_GROUP_USER_ACTION,
  [EMAIL_STATUS_COMPLAINED]: EMAIL_STATUS_GROUP_USER_ACTION,
  [EMAIL_STATUS_BLOCKED]: EMAIL_STATUS_GROUP_FAILED,
  [EMAIL_STATUS_RETRYING]: EMAIL_STATUS_GROUP_PENDING,
};

// ============================================
// ৪. ইমেইল স্ট্যাটাস লেবেল
// ============================================

/**
 * ইমেইল স্ট্যাটাস লেবেল
 */
export const EMAIL_STATUS_LABELS: Record<EmailStatus, string> = {
  [EMAIL_STATUS_DRAFT]: 'খসড়া',
  [EMAIL_STATUS_PENDING]: 'অপেক্ষমান',
  [EMAIL_STATUS_QUEUED]: 'সারিবদ্ধ',
  [EMAIL_STATUS_SENT]: 'পাঠানো হয়েছে',
  [EMAIL_STATUS_DELIVERED]: 'পৌঁছেছে',
  [EMAIL_STATUS_OPENED]: 'খোলা হয়েছে',
  [EMAIL_STATUS_CLICKED]: 'ক্লিক করা হয়েছে',
  [EMAIL_STATUS_BOUNCED]: 'বাউন্স হয়েছে',
  [EMAIL_STATUS_SPAM]: 'স্প্যাম',
  [EMAIL_STATUS_REJECTED]: 'প্রত্যাখ্যান',
  [EMAIL_STATUS_FAILED]: 'ব্যর্থ হয়েছে',
  [EMAIL_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [EMAIL_STATUS_SCHEDULED]: 'নির্ধারিত',
  [EMAIL_STATUS_PROCESSING]: 'প্রক্রিয়াকরণ',
  [EMAIL_STATUS_DEFERRED]: 'স্থগিত',
  [EMAIL_STATUS_DROPPED]: 'ড্রপ',
  [EMAIL_STATUS_UNSUBSCRIBED]: 'আনসাবস্ক্রাইব',
  [EMAIL_STATUS_COMPLAINED]: 'অভিযোগ',
  [EMAIL_STATUS_BLOCKED]: 'ব্লক',
  [EMAIL_STATUS_RETRYING]: 'পুনরায় চেষ্টা',
};

// ============================================
// ৫. ইমেইল স্ট্যাটাস আইকন
// ============================================

/**
 * ইমেইল স্ট্যাটাস আইকন
 */
export const EMAIL_STATUS_ICONS: Record<EmailStatus, string> = {
  [EMAIL_STATUS_DRAFT]: 'draft',
  [EMAIL_STATUS_PENDING]: 'pending',
  [EMAIL_STATUS_QUEUED]: 'queue',
  [EMAIL_STATUS_SENT]: 'send',
  [EMAIL_STATUS_DELIVERED]: 'check_circle',
  [EMAIL_STATUS_OPENED]: 'visibility',
  [EMAIL_STATUS_CLICKED]: 'touch_app',
  [EMAIL_STATUS_BOUNCED]: 'bounce',
  [EMAIL_STATUS_SPAM]: 'report_spam',
  [EMAIL_STATUS_REJECTED]: 'block',
  [EMAIL_STATUS_FAILED]: 'error',
  [EMAIL_STATUS_EXPIRED]: 'timer',
  [EMAIL_STATUS_SCHEDULED]: 'schedule',
  [EMAIL_STATUS_PROCESSING]: 'processing',
  [EMAIL_STATUS_DEFERRED]: 'pause',
  [EMAIL_STATUS_DROPPED]: 'delete',
  [EMAIL_STATUS_UNSUBSCRIBED]: 'unsubscribe',
  [EMAIL_STATUS_COMPLAINED]: 'report',
  [EMAIL_STATUS_BLOCKED]: 'block',
  [EMAIL_STATUS_RETRYING]: 'retry',
};

// ============================================
// ৬. ইমেইল স্ট্যাটাস কালার
// ============================================

/**
 * ইমেইল স্ট্যাটাস কালার
 */
export const EMAIL_STATUS_COLORS: Record<EmailStatus, string> = {
  [EMAIL_STATUS_DRAFT]: '#9E9E9E', // Grey
  [EMAIL_STATUS_PENDING]: '#FFC107', // Amber
  [EMAIL_STATUS_QUEUED]: '#FF9800', // Orange
  [EMAIL_STATUS_SENT]: '#00BCD4', // Cyan
  [EMAIL_STATUS_DELIVERED]: '#4CAF50', // Green
  [EMAIL_STATUS_OPENED]: '#2196F3', // Blue
  [EMAIL_STATUS_CLICKED]: '#8BC34A', // Light Green
  [EMAIL_STATUS_BOUNCED]: '#F44336', // Red
  [EMAIL_STATUS_SPAM]: '#D32F2F', // Dark Red
  [EMAIL_STATUS_REJECTED]: '#C62828', // Dark Red
  [EMAIL_STATUS_FAILED]: '#E91E63', // Pink
  [EMAIL_STATUS_EXPIRED]: '#607D8B', // Blue Grey
  [EMAIL_STATUS_SCHEDULED]: '#FF6F00', // Dark Amber
  [EMAIL_STATUS_PROCESSING]: '#2196F3', // Blue
  [EMAIL_STATUS_DEFERRED]: '#795548', // Brown
  [EMAIL_STATUS_DROPPED]: '#9E9E9E', // Grey
  [EMAIL_STATUS_UNSUBSCRIBED]: '#424242', // Dark Grey
  [EMAIL_STATUS_COMPLAINED]: '#E91E63', // Pink
  [EMAIL_STATUS_BLOCKED]: '#424242', // Dark Grey
  [EMAIL_STATUS_RETRYING]: '#FF6F00', // Dark Amber
};

// ============================================
// ৭. টার্মিনাল ইমেইল স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল ইমেইল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const EMAIL_TERMINAL_STATUSES: EmailStatus[] = [
  EMAIL_STATUS_DELIVERED,
  EMAIL_STATUS_BOUNCED,
  EMAIL_STATUS_SPAM,
  EMAIL_STATUS_REJECTED,
  EMAIL_STATUS_FAILED,
  EMAIL_STATUS_EXPIRED,
  EMAIL_STATUS_DROPPED,
  EMAIL_STATUS_UNSUBSCRIBED,
  EMAIL_STATUS_COMPLAINED,
  EMAIL_STATUS_BLOCKED,
];

// ============================================
// ৮. সফল ইমেইল স্ট্যাটাসসমূহ
// ============================================

/**
 * সফল ইমেইল স্ট্যাটাসসমূহ
 */
export const EMAIL_SUCCESS_STATUSES: EmailStatus[] = [
  EMAIL_STATUS_SENT,
  EMAIL_STATUS_DELIVERED,
  EMAIL_STATUS_OPENED,
  EMAIL_STATUS_CLICKED,
];

// ============================================
// ৯. ব্যর্থ ইমেইল স্ট্যাটাসসমূহ
// ============================================

/**
 * ব্যর্থ ইমেইল স্ট্যাটাসসমূহ
 */
export const EMAIL_FAILURE_STATUSES: EmailStatus[] = [
  EMAIL_STATUS_BOUNCED,
  EMAIL_STATUS_SPAM,
  EMAIL_STATUS_REJECTED,
  EMAIL_STATUS_FAILED,
  EMAIL_STATUS_EXPIRED,
  EMAIL_STATUS_DROPPED,
  EMAIL_STATUS_BLOCKED,
];

// ============================================
// ১০. অ্যাক্টিভ ইমেইল স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ ইমেইল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো এখনও চলমান
 */
export const EMAIL_ACTIVE_STATUSES: EmailStatus[] = [
  EMAIL_STATUS_PENDING,
  EMAIL_STATUS_QUEUED,
  EMAIL_STATUS_PROCESSING,
  EMAIL_STATUS_DEFERRED,
  EMAIL_STATUS_RETRYING,
  EMAIL_STATUS_SCHEDULED,
];

// ============================================
// ১১. ইমেইল স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * ইমেইল স্ট্যাটাস কনফিগারেশন
 */
export interface EmailStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: EmailStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: EmailStatusGroup;
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
 * সব ইমেইল স্ট্যাটাসের কনফিগারেশন
 */
export const EMAIL_STATUS_CONFIGS: EmailStatusConfig[] = [
  {
    status: EMAIL_STATUS_DRAFT,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_DRAFT],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_DRAFT],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_DRAFT],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_DRAFT],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_PENDING,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_PENDING],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_PENDING],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_PENDING],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_PENDING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_QUEUED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_QUEUED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_QUEUED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_QUEUED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_QUEUED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_SENT,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_SENT],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_SENT],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_SENT],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_SENT],
    isTerminal: false,
    isSuccess: true,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_DELIVERED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_DELIVERED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_DELIVERED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_DELIVERED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_DELIVERED],
    isTerminal: true,
    isSuccess: true,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_OPENED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_OPENED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_OPENED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_OPENED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_OPENED],
    isTerminal: false,
    isSuccess: true,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_CLICKED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_CLICKED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_CLICKED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_CLICKED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_CLICKED],
    isTerminal: false,
    isSuccess: true,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_BOUNCED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_BOUNCED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_BOUNCED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_BOUNCED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_BOUNCED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
  {
    status: EMAIL_STATUS_SPAM,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_SPAM],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_SPAM],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_SPAM],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_SPAM],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_REJECTED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_REJECTED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_REJECTED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_REJECTED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_REJECTED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_FAILED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_FAILED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_FAILED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_FAILED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_FAILED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: true,
  },
  {
    status: EMAIL_STATUS_EXPIRED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_EXPIRED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_EXPIRED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_EXPIRED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_EXPIRED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_SCHEDULED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_SCHEDULED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_SCHEDULED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_SCHEDULED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_SCHEDULED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_PROCESSING,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_PROCESSING],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_PROCESSING],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_PROCESSING],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_PROCESSING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_DEFERRED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_DEFERRED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_DEFERRED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_DEFERRED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_DEFERRED],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: true,
  },
  {
    status: EMAIL_STATUS_DROPPED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_DROPPED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_DROPPED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_DROPPED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_DROPPED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_UNSUBSCRIBED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_UNSUBSCRIBED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_UNSUBSCRIBED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_UNSUBSCRIBED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_UNSUBSCRIBED],
    isTerminal: true,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_COMPLAINED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_COMPLAINED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_COMPLAINED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_COMPLAINED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_COMPLAINED],
    isTerminal: true,
    isSuccess: false,
    isFailure: false,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_BLOCKED,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_BLOCKED],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_BLOCKED],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_BLOCKED],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_BLOCKED],
    isTerminal: true,
    isSuccess: false,
    isFailure: true,
    isActive: false,
    isRetryable: false,
  },
  {
    status: EMAIL_STATUS_RETRYING,
    label: EMAIL_STATUS_LABELS[EMAIL_STATUS_RETRYING],
    icon: EMAIL_STATUS_ICONS[EMAIL_STATUS_RETRYING],
    color: EMAIL_STATUS_COLORS[EMAIL_STATUS_RETRYING],
    group: EMAIL_STATUS_TO_GROUP[EMAIL_STATUS_RETRYING],
    isTerminal: false,
    isSuccess: false,
    isFailure: false,
    isActive: true,
    isRetryable: true,
  },
];
