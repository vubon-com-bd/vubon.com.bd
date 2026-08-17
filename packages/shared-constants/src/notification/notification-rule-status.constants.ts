// ============================================
// নোটিফিকেশন রুল স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
// ============================================

// ============================================
// ১. রুল স্ট্যাটাস
// ============================================

/**
 * নোটিফিকেশন রুল স্ট্যাটাস
 * রুলের বর্তমান অবস্থা নির্দেশ করে
 */
export type NotificationRuleStatus =
  | typeof NOTIFICATION_RULE_STATUS_ACTIVE
  | typeof NOTIFICATION_RULE_STATUS_INACTIVE
  | typeof NOTIFICATION_RULE_STATUS_DRAFT
  | typeof NOTIFICATION_RULE_STATUS_ARCHIVED
  | typeof NOTIFICATION_RULE_STATUS_DELETED
  | typeof NOTIFICATION_RULE_STATUS_DEPRECATED
  | typeof NOTIFICATION_RULE_STATUS_TESTING
  | typeof NOTIFICATION_RULE_STATUS_FAILED
  | typeof NOTIFICATION_RULE_STATUS_PENDING_APPROVAL
  | typeof NOTIFICATION_RULE_STATUS_APPROVED
  | typeof NOTIFICATION_RULE_STATUS_REJECTED
  | typeof NOTIFICATION_RULE_STATUS_SCHEDULED
  | typeof NOTIFICATION_RULE_STATUS_PAUSED
  | typeof NOTIFICATION_RULE_STATUS_RESTORED
  | typeof NOTIFICATION_RULE_STATUS_EXPIRED;

/**
 * অ্যাক্টিভ স্ট্যাটাস
 * @description রুল সক্রিয় এবং কার্যকর
 */
export const NOTIFICATION_RULE_STATUS_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাস
 * @description রুল নিষ্ক্রিয়
 */
export const NOTIFICATION_RULE_STATUS_INACTIVE = 'INACTIVE';

/**
 * ড্রাফট স্ট্যাটাস
 * @description রুল খসড়া হিসেবে সংরক্ষিত
 */
export const NOTIFICATION_RULE_STATUS_DRAFT = 'DRAFT';

/**
 * আর্কাইভড স্ট্যাটাস
 * @description রুল আর্কাইভ করা হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_ARCHIVED = 'ARCHIVED';

/**
 * ডিলিটেড স্ট্যাটাস
 * @description রুল মুছে ফেলা হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_DELETED = 'DELETED';

/**
 * ডিপ্রিকেটেড স্ট্যাটাস
 * @description রুল অপ্রচলিত
 */
export const NOTIFICATION_RULE_STATUS_DEPRECATED = 'DEPRECATED';

/**
 * টেস্টিং স্ট্যাটাস
 * @description রুল পরীক্ষাধীন
 */
export const NOTIFICATION_RULE_STATUS_TESTING = 'TESTING';

/**
 * ফেইলড স্ট্যাটাস
 * @description রুল ব্যর্থ হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_FAILED = 'FAILED';

/**
 * পেন্ডিং অ্যাপ্রুভাল স্ট্যাটাস
 * @description রুল অনুমোদনের অপেক্ষায়
 */
export const NOTIFICATION_RULE_STATUS_PENDING_APPROVAL = 'PENDING_APPROVAL';

/**
 * অ্যাপ্রুভড স্ট্যাটাস
 * @description রুল অনুমোদিত
 */
export const NOTIFICATION_RULE_STATUS_APPROVED = 'APPROVED';

/**
 * রিজেক্টেড স্ট্যাটাস
 * @description রুল বাতিল করা হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_REJECTED = 'REJECTED';

/**
 * স্কেডিউলড স্ট্যাটাস
 * @description রুল নির্ধারিত সময়ে সক্রিয় হবে
 */
export const NOTIFICATION_RULE_STATUS_SCHEDULED = 'SCHEDULED';

/**
 * পজড স্ট্যাটাস
 * @description রুল স্থগিত করা হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_PAUSED = 'PAUSED';

/**
 * রিস্টোরড স্ট্যাটাস
 * @description রুল পুনরুদ্ধার করা হয়েছে
 */
export const NOTIFICATION_RULE_STATUS_RESTORED = 'RESTORED';

/**
 * এক্সপাইরড স্ট্যাটাস
 * @description রুলের মেয়াদ শেষ
 */
export const NOTIFICATION_RULE_STATUS_EXPIRED = 'EXPIRED';

// ============================================
// ২. রুল স্ট্যাটাস গ্রুপ
// ============================================

/**
 * রুল স্ট্যাটাস গ্রুপ
 */
export type NotificationRuleStatusGroup =
  | typeof NOTIFICATION_RULE_STATUS_GROUP_ACTIVE
  | typeof NOTIFICATION_RULE_STATUS_GROUP_INACTIVE
  | typeof NOTIFICATION_RULE_STATUS_GROUP_DRAFT
  | typeof NOTIFICATION_RULE_STATUS_GROUP_PENDING
  | typeof NOTIFICATION_RULE_STATUS_GROUP_TERMINAL;

/**
 * অ্যাক্টিভ গ্রুপ
 * @description সক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_GROUP_ACTIVE = 'ACTIVE';

/**
 * ইনঅ্যাক্টিভ গ্রুপ
 * @description নিষ্ক্রিয় স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_GROUP_INACTIVE = 'INACTIVE';

/**
 * ড্রাফট গ্রুপ
 * @description খসড়া স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_GROUP_DRAFT = 'DRAFT';

/**
 * পেন্ডিং গ্রুপ
 * @description অপেক্ষমান স্ট্যাটাস
 */
export const NOTIFICATION_RULE_STATUS_GROUP_PENDING = 'PENDING';

/**
 * টার্মিনাল গ্রুপ
 * @description চূড়ান্ত অবস্থা
 */
export const NOTIFICATION_RULE_STATUS_GROUP_TERMINAL = 'TERMINAL';

// ============================================
// ৩. রুল স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
// ============================================

/**
 * রুল স্ট্যাটাস থেকে গ্রুপ ম্যাপিং
 */
export const NOTIFICATION_RULE_STATUS_TO_GROUP: Record<
  NotificationRuleStatus,
  NotificationRuleStatusGroup
> = {
  [NOTIFICATION_RULE_STATUS_ACTIVE]: NOTIFICATION_RULE_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_RULE_STATUS_INACTIVE]: NOTIFICATION_RULE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_RULE_STATUS_DRAFT]: NOTIFICATION_RULE_STATUS_GROUP_DRAFT,
  [NOTIFICATION_RULE_STATUS_ARCHIVED]: NOTIFICATION_RULE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_RULE_STATUS_DELETED]: NOTIFICATION_RULE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_RULE_STATUS_DEPRECATED]: NOTIFICATION_RULE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_RULE_STATUS_TESTING]: NOTIFICATION_RULE_STATUS_GROUP_PENDING,
  [NOTIFICATION_RULE_STATUS_FAILED]: NOTIFICATION_RULE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_RULE_STATUS_PENDING_APPROVAL]: NOTIFICATION_RULE_STATUS_GROUP_PENDING,
  [NOTIFICATION_RULE_STATUS_APPROVED]: NOTIFICATION_RULE_STATUS_GROUP_PENDING,
  [NOTIFICATION_RULE_STATUS_REJECTED]: NOTIFICATION_RULE_STATUS_GROUP_TERMINAL,
  [NOTIFICATION_RULE_STATUS_SCHEDULED]: NOTIFICATION_RULE_STATUS_GROUP_PENDING,
  [NOTIFICATION_RULE_STATUS_PAUSED]: NOTIFICATION_RULE_STATUS_GROUP_INACTIVE,
  [NOTIFICATION_RULE_STATUS_RESTORED]: NOTIFICATION_RULE_STATUS_GROUP_ACTIVE,
  [NOTIFICATION_RULE_STATUS_EXPIRED]: NOTIFICATION_RULE_STATUS_GROUP_TERMINAL,
};

// ============================================
// ৪. রুল স্ট্যাটাস লেবেল
// ============================================

/**
 * রুল স্ট্যাটাস লেবেল
 */
export const NOTIFICATION_RULE_STATUS_LABELS: Record<NotificationRuleStatus, string> = {
  [NOTIFICATION_RULE_STATUS_ACTIVE]: 'সক্রিয়',
  [NOTIFICATION_RULE_STATUS_INACTIVE]: 'নিষ্ক্রিয়',
  [NOTIFICATION_RULE_STATUS_DRAFT]: 'খসড়া',
  [NOTIFICATION_RULE_STATUS_ARCHIVED]: 'আর্কাইভ',
  [NOTIFICATION_RULE_STATUS_DELETED]: 'মুছে ফেলা',
  [NOTIFICATION_RULE_STATUS_DEPRECATED]: 'অপ্রচলিত',
  [NOTIFICATION_RULE_STATUS_TESTING]: 'পরীক্ষাধীন',
  [NOTIFICATION_RULE_STATUS_FAILED]: 'ব্যর্থ',
  [NOTIFICATION_RULE_STATUS_PENDING_APPROVAL]: 'অনুমোদনের অপেক্ষায়',
  [NOTIFICATION_RULE_STATUS_APPROVED]: 'অনুমোদিত',
  [NOTIFICATION_RULE_STATUS_REJECTED]: 'বাতিল',
  [NOTIFICATION_RULE_STATUS_SCHEDULED]: 'নির্ধারিত',
  [NOTIFICATION_RULE_STATUS_PAUSED]: 'স্থগিত',
  [NOTIFICATION_RULE_STATUS_RESTORED]: 'পুনরুদ্ধার',
  [NOTIFICATION_RULE_STATUS_EXPIRED]: 'মেয়াদোত্তীর্ণ',
};

// ============================================
// ৫. রুল স্ট্যাটাস আইকন
// ============================================

/**
 * রুল স্ট্যাটাস আইকন
 */
export const NOTIFICATION_RULE_STATUS_ICONS: Record<NotificationRuleStatus, string> = {
  [NOTIFICATION_RULE_STATUS_ACTIVE]: 'check_circle',
  [NOTIFICATION_RULE_STATUS_INACTIVE]: 'cancel',
  [NOTIFICATION_RULE_STATUS_DRAFT]: 'draft',
  [NOTIFICATION_RULE_STATUS_ARCHIVED]: 'archive',
  [NOTIFICATION_RULE_STATUS_DELETED]: 'delete',
  [NOTIFICATION_RULE_STATUS_DEPRECATED]: 'warning',
  [NOTIFICATION_RULE_STATUS_TESTING]: 'science',
  [NOTIFICATION_RULE_STATUS_FAILED]: 'error',
  [NOTIFICATION_RULE_STATUS_PENDING_APPROVAL]: 'pending',
  [NOTIFICATION_RULE_STATUS_APPROVED]: 'thumb_up',
  [NOTIFICATION_RULE_STATUS_REJECTED]: 'block',
  [NOTIFICATION_RULE_STATUS_SCHEDULED]: 'schedule',
  [NOTIFICATION_RULE_STATUS_PAUSED]: 'pause_circle',
  [NOTIFICATION_RULE_STATUS_RESTORED]: 'restore',
  [NOTIFICATION_RULE_STATUS_EXPIRED]: 'timer',
};

// ============================================
// ৬. রুল স্ট্যাটাস কালার
// ============================================

/**
 * রুল স্ট্যাটাস কালার
 */
export const NOTIFICATION_RULE_STATUS_COLORS: Record<NotificationRuleStatus, string> = {
  [NOTIFICATION_RULE_STATUS_ACTIVE]: '#4CAF50', // Green
  [NOTIFICATION_RULE_STATUS_INACTIVE]: '#9E9E9E', // Grey
  [NOTIFICATION_RULE_STATUS_DRAFT]: '#FFC107', // Amber
  [NOTIFICATION_RULE_STATUS_ARCHIVED]: '#607D8B', // Blue Grey
  [NOTIFICATION_RULE_STATUS_DELETED]: '#757575', // Dark Grey
  [NOTIFICATION_RULE_STATUS_DEPRECATED]: '#FF5722', // Deep Orange
  [NOTIFICATION_RULE_STATUS_TESTING]: '#00BCD4', // Cyan
  [NOTIFICATION_RULE_STATUS_FAILED]: '#F44336', // Red
  [NOTIFICATION_RULE_STATUS_PENDING_APPROVAL]: '#FF9800', // Orange
  [NOTIFICATION_RULE_STATUS_APPROVED]: '#8BC34A', // Light Green
  [NOTIFICATION_RULE_STATUS_REJECTED]: '#D32F2F', // Dark Red
  [NOTIFICATION_RULE_STATUS_SCHEDULED]: '#3F51B5', // Indigo
  [NOTIFICATION_RULE_STATUS_PAUSED]: '#795548', // Brown
  [NOTIFICATION_RULE_STATUS_RESTORED]: '#2196F3', // Blue
  [NOTIFICATION_RULE_STATUS_EXPIRED]: '#9E9E9E', // Grey
};

// ============================================
// ৭. টার্মিনাল রুল স্ট্যাটাসসমূহ
// ============================================

/**
 * টার্মিনাল রুল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো চূড়ান্ত এবং আর পরিবর্তন হয় না
 */
export const NOTIFICATION_RULE_TERMINAL_STATUSES: NotificationRuleStatus[] = [
  NOTIFICATION_RULE_STATUS_ARCHIVED,
  NOTIFICATION_RULE_STATUS_DELETED,
  NOTIFICATION_RULE_STATUS_FAILED,
  NOTIFICATION_RULE_STATUS_REJECTED,
  NOTIFICATION_RULE_STATUS_EXPIRED,
];

// ============================================
// ৮. অ্যাক্টিভ রুল স্ট্যাটাসসমূহ
// ============================================

/**
 * অ্যাক্টিভ রুল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো সক্রিয়
 */
export const NOTIFICATION_RULE_ACTIVE_STATUSES: NotificationRuleStatus[] = [
  NOTIFICATION_RULE_STATUS_ACTIVE,
  NOTIFICATION_RULE_STATUS_RESTORED,
];

// ============================================
// ৯. পেন্ডিং রুল স্ট্যাটাসসমূহ
// ============================================

/**
 * পেন্ডিং রুল স্ট্যাটাসসমূহ
 * যে স্ট্যাটাসগুলো অপেক্ষমান
 */
export const NOTIFICATION_RULE_PENDING_STATUSES: NotificationRuleStatus[] = [
  NOTIFICATION_RULE_STATUS_TESTING,
  NOTIFICATION_RULE_STATUS_PENDING_APPROVAL,
  NOTIFICATION_RULE_STATUS_SCHEDULED,
];

// ============================================
// ১০. রুল স্ট্যাটাস কনফিগারেশন
// ============================================

/**
 * রুল স্ট্যাটাস কনফিগারেশন
 */
export interface NotificationRuleStatusConfig {
  /** স্ট্যাটাসের নাম */
  status: NotificationRuleStatus;
  /** স্ট্যাটাসের লেবেল */
  label: string;
  /** স্ট্যাটাসের আইকন */
  icon: string;
  /** স্ট্যাটাসের কালার */
  color: string;
  /** স্ট্যাটাসের গ্রুপ */
  group: NotificationRuleStatusGroup;
  /** টার্মিনাল স্ট্যাটাস কিনা */
  isTerminal: boolean;
  /** অ্যাক্টিভ স্ট্যাটাস কিনা */
  isActive: boolean;
  /** পেন্ডিং স্ট্যাটাস কিনা */
  isPending: boolean;
}

/**
 * সব রুল স্ট্যাটাসের কনফিগারেশন
 */
export const NOTIFICATION_RULE_STATUS_CONFIGS: NotificationRuleStatusConfig[] = [
  {
    status: NOTIFICATION_RULE_STATUS_ACTIVE,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_ACTIVE],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_ACTIVE],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_ACTIVE],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_ACTIVE],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_INACTIVE,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_INACTIVE],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_INACTIVE],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_INACTIVE],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_INACTIVE],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_DRAFT,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_DRAFT],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_DRAFT],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_DRAFT],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_DRAFT],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_ARCHIVED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_ARCHIVED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_ARCHIVED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_ARCHIVED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_ARCHIVED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_DELETED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_DELETED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_DELETED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_DELETED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_DELETED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_DEPRECATED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_DEPRECATED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_DEPRECATED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_DEPRECATED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_DEPRECATED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_TESTING,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_TESTING],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_TESTING],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_TESTING],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_TESTING],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_RULE_STATUS_FAILED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_FAILED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_FAILED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_FAILED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_FAILED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_PENDING_APPROVAL,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_PENDING_APPROVAL],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_PENDING_APPROVAL],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_PENDING_APPROVAL],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_PENDING_APPROVAL],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_RULE_STATUS_APPROVED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_APPROVED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_APPROVED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_APPROVED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_APPROVED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_RULE_STATUS_REJECTED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_REJECTED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_REJECTED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_REJECTED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_REJECTED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_SCHEDULED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_SCHEDULED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_SCHEDULED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_SCHEDULED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_SCHEDULED],
    isTerminal: false,
    isActive: false,
    isPending: true,
  },
  {
    status: NOTIFICATION_RULE_STATUS_PAUSED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_PAUSED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_PAUSED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_PAUSED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_PAUSED],
    isTerminal: false,
    isActive: false,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_RESTORED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_RESTORED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_RESTORED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_RESTORED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_RESTORED],
    isTerminal: false,
    isActive: true,
    isPending: false,
  },
  {
    status: NOTIFICATION_RULE_STATUS_EXPIRED,
    label: NOTIFICATION_RULE_STATUS_LABELS[NOTIFICATION_RULE_STATUS_EXPIRED],
    icon: NOTIFICATION_RULE_STATUS_ICONS[NOTIFICATION_RULE_STATUS_EXPIRED],
    color: NOTIFICATION_RULE_STATUS_COLORS[NOTIFICATION_RULE_STATUS_EXPIRED],
    group: NOTIFICATION_RULE_STATUS_TO_GROUP[NOTIFICATION_RULE_STATUS_EXPIRED],
    isTerminal: true,
    isActive: false,
    isPending: false,
  },
];
