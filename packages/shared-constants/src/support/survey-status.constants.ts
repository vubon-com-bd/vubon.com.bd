/**
 * সার্ভের বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সার্ভে স্ট্যাটাস
 */
export const SURVEY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  CLOSED: 'closed',
  PENDING_REVIEW: 'pending_review',
  EXPIRED: 'expired',
  SCHEDULED: 'scheduled',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  DELETED: 'deleted',
} as const;

/**
 * সার্ভে স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SURVEY_STATUS_DISPLAY_NAMES = {
  [SURVEY_STATUS.DRAFT]: 'খসড়া',
  [SURVEY_STATUS.ACTIVE]: 'সক্রিয়',
  [SURVEY_STATUS.PAUSED]: 'বিরতিপ্রাপ্ত',
  [SURVEY_STATUS.COMPLETED]: 'সমাপ্ত',
  [SURVEY_STATUS.ARCHIVED]: 'আর্কাইভড',
  [SURVEY_STATUS.CLOSED]: 'বন্ধ',
  [SURVEY_STATUS.PENDING_REVIEW]: 'পর্যালোচনার অপেক্ষায়',
  [SURVEY_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [SURVEY_STATUS.SCHEDULED]: 'নির্ধারিত',
  [SURVEY_STATUS.UNDER_REVIEW]: 'পর্যালোচনাধীন',
  [SURVEY_STATUS.APPROVED]: 'অনুমোদিত',
  [SURVEY_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
  [SURVEY_STATUS.DELETED]: 'মুছে ফেলা',
} as const;

/**
 * সার্ভে স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SURVEY_STATUS_COLORS = {
  [SURVEY_STATUS.DRAFT]: '#95a5a6',
  [SURVEY_STATUS.ACTIVE]: '#2ecc71',
  [SURVEY_STATUS.PAUSED]: '#f39c12',
  [SURVEY_STATUS.COMPLETED]: '#3498db',
  [SURVEY_STATUS.ARCHIVED]: '#7f8c8d',
  [SURVEY_STATUS.CLOSED]: '#e74c3c',
  [SURVEY_STATUS.PENDING_REVIEW]: '#9b59b6',
  [SURVEY_STATUS.EXPIRED]: '#e67e22',
  [SURVEY_STATUS.SCHEDULED]: '#3498db',
  [SURVEY_STATUS.UNDER_REVIEW]: '#1abc9c',
  [SURVEY_STATUS.APPROVED]: '#27ae60',
  [SURVEY_STATUS.REJECTED]: '#c0392b',
  [SURVEY_STATUS.DELETED]: '#2c3e50',
} as const;

/**
 * সার্ভে স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const SURVEY_STATUS_ICONS = {
  [SURVEY_STATUS.DRAFT]: 'file',
  [SURVEY_STATUS.ACTIVE]: 'play-circle',
  [SURVEY_STATUS.PAUSED]: 'pause-circle',
  [SURVEY_STATUS.COMPLETED]: 'check-circle',
  [SURVEY_STATUS.ARCHIVED]: 'archive',
  [SURVEY_STATUS.CLOSED]: 'x-circle',
  [SURVEY_STATUS.PENDING_REVIEW]: 'clock',
  [SURVEY_STATUS.EXPIRED]: 'clock',
  [SURVEY_STATUS.SCHEDULED]: 'calendar',
  [SURVEY_STATUS.UNDER_REVIEW]: 'eye',
  [SURVEY_STATUS.APPROVED]: 'thumbs-up',
  [SURVEY_STATUS.REJECTED]: 'x-octagon',
  [SURVEY_STATUS.DELETED]: 'trash-2',
} as const;

/**
 * সার্ভে স্ট্যাটাসের ক্যাটাগরি
 */
export const SURVEY_STATUS_CATEGORIES = {
  [SURVEY_STATUS.DRAFT]: 'inactive',
  [SURVEY_STATUS.ACTIVE]: 'active',
  [SURVEY_STATUS.PAUSED]: 'pending',
  [SURVEY_STATUS.COMPLETED]: 'completed',
  [SURVEY_STATUS.ARCHIVED]: 'inactive',
  [SURVEY_STATUS.CLOSED]: 'completed',
  [SURVEY_STATUS.PENDING_REVIEW]: 'pending',
  [SURVEY_STATUS.EXPIRED]: 'inactive',
  [SURVEY_STATUS.SCHEDULED]: 'pending',
  [SURVEY_STATUS.UNDER_REVIEW]: 'pending',
  [SURVEY_STATUS.APPROVED]: 'active',
  [SURVEY_STATUS.REJECTED]: 'inactive',
  [SURVEY_STATUS.DELETED]: 'inactive',
} as const;

/**
 * সার্ভে স্ট্যাটাস গ্রুপ
 */
export const SURVEY_STATUS_GROUPS = {
  ACTIVE: ['active', 'approved'],
  PENDING: ['scheduled', 'pending_review', 'under_review', 'paused'],
  INACTIVE: ['draft', 'archived', 'expired', 'rejected', 'deleted'],
  COMPLETED: ['completed', 'closed'],
} as const;

/**
 * সার্ভে স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SURVEY_STATUS_TRANSITIONS = {
  [SURVEY_STATUS.DRAFT]: ['pending_review', 'active', 'archived', 'deleted'],
  [SURVEY_STATUS.PENDING_REVIEW]: ['under_review', 'rejected', 'draft'],
  [SURVEY_STATUS.UNDER_REVIEW]: ['approved', 'rejected', 'draft'],
  [SURVEY_STATUS.APPROVED]: ['active', 'scheduled'],
  [SURVEY_STATUS.SCHEDULED]: ['active', 'draft', 'archived'],
  [SURVEY_STATUS.ACTIVE]: ['paused', 'completed', 'closed', 'archived'],
  [SURVEY_STATUS.PAUSED]: ['active', 'closed', 'archived'],
  [SURVEY_STATUS.COMPLETED]: ['archived', 'closed'],
  [SURVEY_STATUS.CLOSED]: ['archived'],
  [SURVEY_STATUS.ARCHIVED]: ['active', 'deleted'],
  [SURVEY_STATUS.EXPIRED]: ['archived', 'deleted'],
  [SURVEY_STATUS.REJECTED]: ['draft', 'deleted'],
  [SURVEY_STATUS.DELETED]: [],
} as const;

/**
 * সার্ভে স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const SURVEY_STATUS_DEFAULT_ACTIONS = {
  [SURVEY_STATUS.DRAFT]: 'সার্ভে খসড়া সংরক্ষিত, পর্যালোচনা বা প্রকাশের অপেক্ষায়',
  [SURVEY_STATUS.ACTIVE]: 'সার্ভে সক্রিয় এবং প্রতিক্রিয়া গ্রহণ করছে',
  [SURVEY_STATUS.PAUSED]: 'সার্ভে সাময়িকভাবে বিরতিপ্রাপ্ত',
  [SURVEY_STATUS.COMPLETED]: 'সার্ভে সম্পন্ন হয়েছে',
  [SURVEY_STATUS.ARCHIVED]: 'সার্ভে আর্কাইভ করা হয়েছে',
  [SURVEY_STATUS.CLOSED]: 'সার্ভে বন্ধ করা হয়েছে',
  [SURVEY_STATUS.PENDING_REVIEW]: 'সার্ভে পর্যালোচনার অপেক্ষায়',
  [SURVEY_STATUS.EXPIRED]: 'সার্ভের মেয়াদ শেষ হয়েছে',
  [SURVEY_STATUS.SCHEDULED]: 'সার্ভে নির্ধারিত সময়ে প্রকাশিত হবে',
  [SURVEY_STATUS.UNDER_REVIEW]: 'সার্ভে পর্যালোচনাধীন',
  [SURVEY_STATUS.APPROVED]: 'সার্ভে অনুমোদিত হয়েছে',
  [SURVEY_STATUS.REJECTED]: 'সার্ভে প্রত্যাখ্যাত হয়েছে',
  [SURVEY_STATUS.DELETED]: 'সার্ভে মুছে ফেলা হয়েছে',
} as const;

/**
 * সার্ভে স্ট্যাটাসের টাইমআউট (ঘন্টায়)
 */
export const SURVEY_STATUS_TIME_LIMITS = {
  [SURVEY_STATUS.DRAFT]: 0,
  [SURVEY_STATUS.ACTIVE]: 0,
  [SURVEY_STATUS.PAUSED]: 0,
  [SURVEY_STATUS.COMPLETED]: 0,
  [SURVEY_STATUS.ARCHIVED]: 0,
  [SURVEY_STATUS.CLOSED]: 0,
  [SURVEY_STATUS.PENDING_REVIEW]: 72,
  [SURVEY_STATUS.EXPIRED]: 0,
  [SURVEY_STATUS.SCHEDULED]: 0,
  [SURVEY_STATUS.UNDER_REVIEW]: 48,
  [SURVEY_STATUS.APPROVED]: 0,
  [SURVEY_STATUS.REJECTED]: 0,
  [SURVEY_STATUS.DELETED]: 0,
} as const;

/**
 * সার্ভে স্ট্যাটাসের অটো-ট্রানজিশন
 */
export const SURVEY_STATUS_AUTO_TRANSITIONS = {
  [SURVEY_STATUS.PENDING_REVIEW]: {
    after: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.PENDING_REVIEW],
    to: SURVEY_STATUS.UNDER_REVIEW,
  },
  [SURVEY_STATUS.UNDER_REVIEW]: {
    after: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.UNDER_REVIEW],
    to: SURVEY_STATUS.APPROVED,
  },
} as const;

/**
 * সার্ভে স্ট্যাটাসের পাবলিক ভিজিবিলিটি
 */
export const SURVEY_STATUS_PUBLIC_VISIBILITY = {
  [SURVEY_STATUS.DRAFT]: false,
  [SURVEY_STATUS.ACTIVE]: true,
  [SURVEY_STATUS.PAUSED]: false,
  [SURVEY_STATUS.COMPLETED]: true,
  [SURVEY_STATUS.ARCHIVED]: false,
  [SURVEY_STATUS.CLOSED]: false,
  [SURVEY_STATUS.PENDING_REVIEW]: false,
  [SURVEY_STATUS.EXPIRED]: false,
  [SURVEY_STATUS.SCHEDULED]: false,
  [SURVEY_STATUS.UNDER_REVIEW]: false,
  [SURVEY_STATUS.APPROVED]: false,
  [SURVEY_STATUS.REJECTED]: false,
  [SURVEY_STATUS.DELETED]: false,
} as const;

/**
 * সার্ভে স্ট্যাটাসের অনুমোদিত কর্ম
 */
export const SURVEY_STATUS_ALLOWED_ACTIONS = {
  [SURVEY_STATUS.DRAFT]: ['edit', 'submit_for_review', 'publish', 'delete', 'archive'] as string[],
  [SURVEY_STATUS.PENDING_REVIEW]: ['review', 'approve', 'reject'] as string[],
  [SURVEY_STATUS.UNDER_REVIEW]: ['approve', 'reject', 'request_changes'] as string[],
  [SURVEY_STATUS.APPROVED]: ['publish', 'schedule', 'edit'] as string[],
  [SURVEY_STATUS.SCHEDULED]: ['unschedule', 'edit', 'publish_now'] as string[],
  [SURVEY_STATUS.ACTIVE]: ['pause', 'close', 'complete', 'archive'] as string[],
  [SURVEY_STATUS.PAUSED]: ['resume', 'close', 'archive'] as string[],
  [SURVEY_STATUS.COMPLETED]: ['archive', 'close'] as string[],
  [SURVEY_STATUS.CLOSED]: ['archive'] as string[],
  [SURVEY_STATUS.ARCHIVED]: ['restore', 'delete'] as string[],
  [SURVEY_STATUS.EXPIRED]: ['archive', 'delete'] as string[],
  [SURVEY_STATUS.REJECTED]: ['edit', 'submit_for_review', 'delete'] as string[],
  [SURVEY_STATUS.DELETED]: ['restore'] as string[],
} as const;

export type SurveyStatus = (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];
export type SurveyStatusDisplayNames = typeof SURVEY_STATUS_DISPLAY_NAMES;
export type SurveyStatusColors = typeof SURVEY_STATUS_COLORS;
export type SurveyStatusIcons = typeof SURVEY_STATUS_ICONS;
export type SurveyStatusCategories = typeof SURVEY_STATUS_CATEGORIES;
export type SurveyStatusGroups = typeof SURVEY_STATUS_GROUPS;
export type SurveyStatusTransitions = typeof SURVEY_STATUS_TRANSITIONS;
export type SurveyStatusDefaultActions = typeof SURVEY_STATUS_DEFAULT_ACTIONS;
export type SurveyStatusTimeLimits = typeof SURVEY_STATUS_TIME_LIMITS;
export type SurveyStatusAutoTransitions = typeof SURVEY_STATUS_AUTO_TRANSITIONS;
export type SurveyStatusPublicVisibility = typeof SURVEY_STATUS_PUBLIC_VISIBILITY;
export type SurveyStatusAllowedActions = typeof SURVEY_STATUS_ALLOWED_ACTIONS;

export interface SurveyStatusConfig {
  status: SurveyStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'active' | 'pending' | 'inactive' | 'completed';
  defaultAction: string;
  timeLimitHours: number;
  publicVisibility: boolean;
  allowedActions: string[];
  autoTransition?: {
    after: number;
    to: SurveyStatus;
  };
}

/**
 * সার্ভে স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const SURVEY_STATUS_CONFIGS: Record<SurveyStatus, SurveyStatusConfig> = {
  [SURVEY_STATUS.DRAFT]: {
    status: SURVEY_STATUS.DRAFT,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.DRAFT],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.DRAFT],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.DRAFT],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.DRAFT] as 'inactive',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.DRAFT],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.DRAFT],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.DRAFT],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.DRAFT],
  },
  [SURVEY_STATUS.ACTIVE]: {
    status: SURVEY_STATUS.ACTIVE,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.ACTIVE],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.ACTIVE],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.ACTIVE],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.ACTIVE] as 'active',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.ACTIVE],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.ACTIVE],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.ACTIVE],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.ACTIVE],
  },
  [SURVEY_STATUS.PAUSED]: {
    status: SURVEY_STATUS.PAUSED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.PAUSED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.PAUSED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.PAUSED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.PAUSED] as 'pending',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.PAUSED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.PAUSED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.PAUSED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.PAUSED],
  },
  [SURVEY_STATUS.COMPLETED]: {
    status: SURVEY_STATUS.COMPLETED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.COMPLETED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.COMPLETED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.COMPLETED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.COMPLETED] as 'completed',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.COMPLETED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.COMPLETED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.COMPLETED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.COMPLETED],
  },
  [SURVEY_STATUS.ARCHIVED]: {
    status: SURVEY_STATUS.ARCHIVED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.ARCHIVED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.ARCHIVED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.ARCHIVED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.ARCHIVED] as 'inactive',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.ARCHIVED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.ARCHIVED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.ARCHIVED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.ARCHIVED],
  },
  [SURVEY_STATUS.CLOSED]: {
    status: SURVEY_STATUS.CLOSED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.CLOSED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.CLOSED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.CLOSED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.CLOSED] as 'completed',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.CLOSED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.CLOSED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.CLOSED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.CLOSED],
  },
  [SURVEY_STATUS.PENDING_REVIEW]: {
    status: SURVEY_STATUS.PENDING_REVIEW,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.PENDING_REVIEW],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.PENDING_REVIEW],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.PENDING_REVIEW],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.PENDING_REVIEW] as 'pending',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.PENDING_REVIEW],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.PENDING_REVIEW],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.PENDING_REVIEW],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.PENDING_REVIEW],
    autoTransition: SURVEY_STATUS_AUTO_TRANSITIONS[SURVEY_STATUS.PENDING_REVIEW],
  },
  [SURVEY_STATUS.EXPIRED]: {
    status: SURVEY_STATUS.EXPIRED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.EXPIRED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.EXPIRED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.EXPIRED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.EXPIRED] as 'inactive',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.EXPIRED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.EXPIRED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.EXPIRED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.EXPIRED],
  },
  [SURVEY_STATUS.SCHEDULED]: {
    status: SURVEY_STATUS.SCHEDULED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.SCHEDULED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.SCHEDULED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.SCHEDULED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.SCHEDULED] as 'pending',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.SCHEDULED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.SCHEDULED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.SCHEDULED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.SCHEDULED],
  },
  [SURVEY_STATUS.UNDER_REVIEW]: {
    status: SURVEY_STATUS.UNDER_REVIEW,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.UNDER_REVIEW],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.UNDER_REVIEW],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.UNDER_REVIEW],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.UNDER_REVIEW] as 'pending',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.UNDER_REVIEW],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.UNDER_REVIEW],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.UNDER_REVIEW],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.UNDER_REVIEW],
    autoTransition: SURVEY_STATUS_AUTO_TRANSITIONS[SURVEY_STATUS.UNDER_REVIEW],
  },
  [SURVEY_STATUS.APPROVED]: {
    status: SURVEY_STATUS.APPROVED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.APPROVED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.APPROVED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.APPROVED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.APPROVED] as 'active',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.APPROVED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.APPROVED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.APPROVED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.APPROVED],
  },
  [SURVEY_STATUS.REJECTED]: {
    status: SURVEY_STATUS.REJECTED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.REJECTED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.REJECTED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.REJECTED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.REJECTED] as 'inactive',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.REJECTED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.REJECTED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.REJECTED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.REJECTED],
  },
  [SURVEY_STATUS.DELETED]: {
    status: SURVEY_STATUS.DELETED,
    displayName: SURVEY_STATUS_DISPLAY_NAMES[SURVEY_STATUS.DELETED],
    color: SURVEY_STATUS_COLORS[SURVEY_STATUS.DELETED],
    icon: SURVEY_STATUS_ICONS[SURVEY_STATUS.DELETED],
    category: SURVEY_STATUS_CATEGORIES[SURVEY_STATUS.DELETED] as 'inactive',
    defaultAction: SURVEY_STATUS_DEFAULT_ACTIONS[SURVEY_STATUS.DELETED],
    timeLimitHours: SURVEY_STATUS_TIME_LIMITS[SURVEY_STATUS.DELETED],
    publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY[SURVEY_STATUS.DELETED],
    allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS[SURVEY_STATUS.DELETED],
  },
};

/**
 * সার্ভে স্ট্যাটাস কনফিগারেশন
 */
export const SURVEY_STATUS_CONFIG = {
  statuses: SURVEY_STATUS,
  displayNames: SURVEY_STATUS_DISPLAY_NAMES,
  colors: SURVEY_STATUS_COLORS,
  icons: SURVEY_STATUS_ICONS,
  categories: SURVEY_STATUS_CATEGORIES,
  groups: SURVEY_STATUS_GROUPS,
  transitions: SURVEY_STATUS_TRANSITIONS,
  defaultActions: SURVEY_STATUS_DEFAULT_ACTIONS,
  timeLimits: SURVEY_STATUS_TIME_LIMITS,
  autoTransitions: SURVEY_STATUS_AUTO_TRANSITIONS,
  publicVisibility: SURVEY_STATUS_PUBLIC_VISIBILITY,
  allowedActions: SURVEY_STATUS_ALLOWED_ACTIONS,
  configs: SURVEY_STATUS_CONFIGS,
} as const;
