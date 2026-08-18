/**
 * SLA এর বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * SLA স্ট্যাটাস
 */
export const SLA_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  EXPIRED: 'expired',
  BREACHED: 'breached',
  COMPLETED: 'completed',
  PENDING_REVIEW: 'pending_review',
  ARCHIVED: 'archived',
  DRAFT: 'draft',
  INACTIVE: 'inactive',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  UNDER_REVIEW: 'under_review',
  SUSPENDED: 'suspended',
} as const;

/**
 * SLA স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SLA_STATUS_DISPLAY_NAMES = {
  [SLA_STATUS.ACTIVE]: 'সক্রিয়',
  [SLA_STATUS.PAUSED]: 'বিরতিপ্রাপ্ত',
  [SLA_STATUS.EXPIRED]: 'মেয়াদোত্তীর্ণ',
  [SLA_STATUS.BREACHED]: 'লঙ্ঘিত',
  [SLA_STATUS.COMPLETED]: 'সমাপ্ত',
  [SLA_STATUS.PENDING_REVIEW]: 'পর্যালোচনার অপেক্ষায়',
  [SLA_STATUS.ARCHIVED]: 'আর্কাইভড',
  [SLA_STATUS.DRAFT]: 'খসড়া',
  [SLA_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [SLA_STATUS.APPROVED]: 'অনুমোদিত',
  [SLA_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
  [SLA_STATUS.UNDER_REVIEW]: 'পর্যালোচনাধীন',
  [SLA_STATUS.SUSPENDED]: 'স্থগিত',
} as const;

/**
 * SLA স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SLA_STATUS_COLORS = {
  [SLA_STATUS.ACTIVE]: '#2ecc71',
  [SLA_STATUS.PAUSED]: '#f39c12',
  [SLA_STATUS.EXPIRED]: '#95a5a6',
  [SLA_STATUS.BREACHED]: '#e74c3c',
  [SLA_STATUS.COMPLETED]: '#3498db',
  [SLA_STATUS.PENDING_REVIEW]: '#9b59b6',
  [SLA_STATUS.ARCHIVED]: '#7f8c8d',
  [SLA_STATUS.DRAFT]: '#95a5a6',
  [SLA_STATUS.INACTIVE]: '#7f8c8d',
  [SLA_STATUS.APPROVED]: '#27ae60',
  [SLA_STATUS.REJECTED]: '#c0392b',
  [SLA_STATUS.UNDER_REVIEW]: '#3498db',
  [SLA_STATUS.SUSPENDED]: '#e67e22',
} as const;

/**
 * SLA স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const SLA_STATUS_ICONS = {
  [SLA_STATUS.ACTIVE]: 'check-circle',
  [SLA_STATUS.PAUSED]: 'pause-circle',
  [SLA_STATUS.EXPIRED]: 'clock',
  [SLA_STATUS.BREACHED]: 'alert-circle',
  [SLA_STATUS.COMPLETED]: 'check-circle',
  [SLA_STATUS.PENDING_REVIEW]: 'clock',
  [SLA_STATUS.ARCHIVED]: 'archive',
  [SLA_STATUS.DRAFT]: 'file',
  [SLA_STATUS.INACTIVE]: 'slash',
  [SLA_STATUS.APPROVED]: 'thumbs-up',
  [SLA_STATUS.REJECTED]: 'x-circle',
  [SLA_STATUS.UNDER_REVIEW]: 'eye',
  [SLA_STATUS.SUSPENDED]: 'pause',
} as const;

/**
 * SLA স্ট্যাটাসের ক্যাটাগরি
 */
export const SLA_STATUS_CATEGORIES = {
  [SLA_STATUS.ACTIVE]: 'active',
  [SLA_STATUS.PAUSED]: 'pending',
  [SLA_STATUS.EXPIRED]: 'inactive',
  [SLA_STATUS.BREACHED]: 'error',
  [SLA_STATUS.COMPLETED]: 'completed',
  [SLA_STATUS.PENDING_REVIEW]: 'pending',
  [SLA_STATUS.ARCHIVED]: 'inactive',
  [SLA_STATUS.DRAFT]: 'inactive',
  [SLA_STATUS.INACTIVE]: 'inactive',
  [SLA_STATUS.APPROVED]: 'active',
  [SLA_STATUS.REJECTED]: 'inactive',
  [SLA_STATUS.UNDER_REVIEW]: 'pending',
  [SLA_STATUS.SUSPENDED]: 'pending',
} as const;

/**
 * SLA স্ট্যাটাস গ্রুপ
 */
export const SLA_STATUS_GROUPS = {
  ACTIVE: ['active', 'approved'],
  PENDING: ['paused', 'pending_review', 'under_review', 'suspended'],
  INACTIVE: ['expired', 'archived', 'draft', 'inactive', 'rejected'],
  COMPLETED: ['completed'],
  ERROR: ['breached'],
} as const;

/**
 * SLA স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SLA_STATUS_TRANSITIONS = {
  [SLA_STATUS.DRAFT]: ['pending_review', 'archived', 'inactive'],
  [SLA_STATUS.PENDING_REVIEW]: ['under_review', 'approved', 'rejected'],
  [SLA_STATUS.UNDER_REVIEW]: ['approved', 'rejected', 'draft'],
  [SLA_STATUS.APPROVED]: ['active', 'suspended', 'archived'],
  [SLA_STATUS.ACTIVE]: ['paused', 'suspended', 'breached', 'completed', 'archived'],
  [SLA_STATUS.PAUSED]: ['active', 'suspended', 'archived'],
  [SLA_STATUS.SUSPENDED]: ['active', 'paused', 'archived'],
  [SLA_STATUS.BREACHED]: ['active', 'suspended', 'archived'],
  [SLA_STATUS.COMPLETED]: ['archived'],
  [SLA_STATUS.EXPIRED]: ['archived'],
  [SLA_STATUS.REJECTED]: ['draft', 'archived'],
  [SLA_STATUS.ARCHIVED]: ['draft', 'inactive'],
  [SLA_STATUS.INACTIVE]: ['draft', 'pending_review'],
} as const;

/**
 * SLA স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const SLA_STATUS_DEFAULT_ACTIONS = {
  [SLA_STATUS.ACTIVE]: 'SLA সক্রিয়, পারফরম্যান্স মনিটর করুন',
  [SLA_STATUS.PAUSED]: 'SLA বিরতিপ্রাপ্ত, পর্যালোচনা প্রয়োজন',
  [SLA_STATUS.EXPIRED]: 'SLA মেয়াদ শেষ, পুনর্নবীকরণ প্রয়োজন',
  [SLA_STATUS.BREACHED]: 'SLA লঙ্ঘিত হয়েছে, তাৎক্ষণিক ব্যবস্থা নিন',
  [SLA_STATUS.COMPLETED]: 'SLA সম্পন্ন হয়েছে, আর্কাইভ করুন',
  [SLA_STATUS.PENDING_REVIEW]: 'SLA পর্যালোচনার অপেক্ষায়',
  [SLA_STATUS.ARCHIVED]: 'SLA আর্কাইভ করা হয়েছে',
  [SLA_STATUS.DRAFT]: 'SLA খসড়া, সম্পাদনা করুন',
  [SLA_STATUS.INACTIVE]: 'SLA নিষ্ক্রিয়, প্রয়োজনে সক্রিয় করুন',
  [SLA_STATUS.APPROVED]: 'SLA অনুমোদিত, সক্রিয়করণের অপেক্ষায়',
  [SLA_STATUS.REJECTED]: 'SLA প্রত্যাখ্যাত, প্রয়োজনীয় সংশোধন করুন',
  [SLA_STATUS.UNDER_REVIEW]: 'SLA পর্যালোচনাধীন, ফলাফলের জন্য অপেক্ষা করুন',
  [SLA_STATUS.SUSPENDED]: 'SLA স্থগিত, কারণ পর্যালোচনা করুন',
} as const;

/**
 * SLA স্ট্যাটাসের সময়সীমা (ঘন্টায়)
 */
export const SLA_STATUS_TIME_LIMITS = {
  [SLA_STATUS.ACTIVE]: 0,
  [SLA_STATUS.PAUSED]: 0,
  [SLA_STATUS.EXPIRED]: 0,
  [SLA_STATUS.BREACHED]: 0,
  [SLA_STATUS.COMPLETED]: 0,
  [SLA_STATUS.PENDING_REVIEW]: 72,
  [SLA_STATUS.ARCHIVED]: 0,
  [SLA_STATUS.DRAFT]: 0,
  [SLA_STATUS.INACTIVE]: 0,
  [SLA_STATUS.APPROVED]: 0,
  [SLA_STATUS.REJECTED]: 0,
  [SLA_STATUS.UNDER_REVIEW]: 48,
  [SLA_STATUS.SUSPENDED]: 0,
} as const;

/**
 * SLA স্ট্যাটাসের অটো-ট্রানজিশন
 */
export const SLA_STATUS_AUTO_TRANSITIONS = {
  [SLA_STATUS.PENDING_REVIEW]: {
    after: SLA_STATUS_TIME_LIMITS[SLA_STATUS.PENDING_REVIEW],
    to: SLA_STATUS.UNDER_REVIEW,
  },
  [SLA_STATUS.UNDER_REVIEW]: {
    after: SLA_STATUS_TIME_LIMITS[SLA_STATUS.UNDER_REVIEW],
    to: SLA_STATUS.REJECTED,
  },
} as const;

/**
 * SLA স্ট্যাটাসের পাবলিক ভিজিবিলিটি
 */
export const SLA_STATUS_PUBLIC_VISIBILITY = {
  [SLA_STATUS.ACTIVE]: true,
  [SLA_STATUS.PAUSED]: false,
  [SLA_STATUS.EXPIRED]: false,
  [SLA_STATUS.BREACHED]: true,
  [SLA_STATUS.COMPLETED]: true,
  [SLA_STATUS.PENDING_REVIEW]: false,
  [SLA_STATUS.ARCHIVED]: false,
  [SLA_STATUS.DRAFT]: false,
  [SLA_STATUS.INACTIVE]: false,
  [SLA_STATUS.APPROVED]: false,
  [SLA_STATUS.REJECTED]: false,
  [SLA_STATUS.UNDER_REVIEW]: false,
  [SLA_STATUS.SUSPENDED]: false,
} as const;

/**
 * SLA স্ট্যাটাসের অনুমোদিত কর্ম
 */
export const SLA_STATUS_ALLOWED_ACTIONS = {
  [SLA_STATUS.DRAFT]: ['edit', 'submit_for_review', 'delete', 'archive'] as string[],
  [SLA_STATUS.PENDING_REVIEW]: ['review', 'approve', 'reject', 'request_changes'] as string[],
  [SLA_STATUS.UNDER_REVIEW]: ['approve', 'reject', 'request_changes'] as string[],
  [SLA_STATUS.APPROVED]: ['activate', 'schedule', 'edit'] as string[],
  [SLA_STATUS.ACTIVE]: ['pause', 'suspend', 'complete', 'archive'] as string[],
  [SLA_STATUS.PAUSED]: ['resume', 'suspend', 'archive'] as string[],
  [SLA_STATUS.SUSPENDED]: ['resume', 'archive'] as string[],
  [SLA_STATUS.BREACHED]: ['investigate', 'archive', 'resolve'] as string[],
  [SLA_STATUS.COMPLETED]: ['archive'] as string[],
  [SLA_STATUS.EXPIRED]: ['renew', 'archive'] as string[],
  [SLA_STATUS.REJECTED]: ['edit', 'submit_for_review', 'delete'] as string[],
  [SLA_STATUS.ARCHIVED]: ['restore', 'delete'] as string[],
  [SLA_STATUS.INACTIVE]: ['activate', 'delete'] as string[],
} as const;

export type SlaStatus = (typeof SLA_STATUS)[keyof typeof SLA_STATUS];
export type SlaStatusDisplayNames = typeof SLA_STATUS_DISPLAY_NAMES;
export type SlaStatusColors = typeof SLA_STATUS_COLORS;
export type SlaStatusIcons = typeof SLA_STATUS_ICONS;
export type SlaStatusCategories = typeof SLA_STATUS_CATEGORIES;
export type SlaStatusGroups = typeof SLA_STATUS_GROUPS;
export type SlaStatusTransitions = typeof SLA_STATUS_TRANSITIONS;
export type SlaStatusDefaultActions = typeof SLA_STATUS_DEFAULT_ACTIONS;
export type SlaStatusTimeLimits = typeof SLA_STATUS_TIME_LIMITS;
export type SlaStatusAutoTransitions = typeof SLA_STATUS_AUTO_TRANSITIONS;
export type SlaStatusPublicVisibility = typeof SLA_STATUS_PUBLIC_VISIBILITY;
export type SlaStatusAllowedActions = typeof SLA_STATUS_ALLOWED_ACTIONS;

export interface SlaStatusConfig {
  status: SlaStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'active' | 'pending' | 'inactive' | 'completed' | 'error';
  defaultAction: string;
  timeLimitHours: number;
  publicVisibility: boolean;
  allowedActions: string[];
  autoTransition?: {
    after: number;
    to: SlaStatus;
  };
}

/**
 * SLA স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const SLA_STATUS_CONFIGS: Record<SlaStatus, SlaStatusConfig> = {
  [SLA_STATUS.ACTIVE]: {
    status: SLA_STATUS.ACTIVE,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.ACTIVE],
    color: SLA_STATUS_COLORS[SLA_STATUS.ACTIVE],
    icon: SLA_STATUS_ICONS[SLA_STATUS.ACTIVE],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.ACTIVE] as 'active',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.ACTIVE],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.ACTIVE],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.ACTIVE],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.ACTIVE],
  },
  [SLA_STATUS.PAUSED]: {
    status: SLA_STATUS.PAUSED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.PAUSED],
    color: SLA_STATUS_COLORS[SLA_STATUS.PAUSED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.PAUSED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.PAUSED] as 'pending',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.PAUSED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.PAUSED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.PAUSED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.PAUSED],
  },
  [SLA_STATUS.EXPIRED]: {
    status: SLA_STATUS.EXPIRED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.EXPIRED],
    color: SLA_STATUS_COLORS[SLA_STATUS.EXPIRED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.EXPIRED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.EXPIRED] as 'inactive',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.EXPIRED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.EXPIRED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.EXPIRED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.EXPIRED],
  },
  [SLA_STATUS.BREACHED]: {
    status: SLA_STATUS.BREACHED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.BREACHED],
    color: SLA_STATUS_COLORS[SLA_STATUS.BREACHED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.BREACHED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.BREACHED] as 'error',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.BREACHED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.BREACHED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.BREACHED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.BREACHED],
  },
  [SLA_STATUS.COMPLETED]: {
    status: SLA_STATUS.COMPLETED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.COMPLETED],
    color: SLA_STATUS_COLORS[SLA_STATUS.COMPLETED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.COMPLETED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.COMPLETED] as 'completed',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.COMPLETED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.COMPLETED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.COMPLETED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.COMPLETED],
  },
  [SLA_STATUS.PENDING_REVIEW]: {
    status: SLA_STATUS.PENDING_REVIEW,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.PENDING_REVIEW],
    color: SLA_STATUS_COLORS[SLA_STATUS.PENDING_REVIEW],
    icon: SLA_STATUS_ICONS[SLA_STATUS.PENDING_REVIEW],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.PENDING_REVIEW] as 'pending',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.PENDING_REVIEW],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.PENDING_REVIEW],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.PENDING_REVIEW],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.PENDING_REVIEW],
    autoTransition: SLA_STATUS_AUTO_TRANSITIONS[SLA_STATUS.PENDING_REVIEW],
  },
  [SLA_STATUS.ARCHIVED]: {
    status: SLA_STATUS.ARCHIVED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.ARCHIVED],
    color: SLA_STATUS_COLORS[SLA_STATUS.ARCHIVED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.ARCHIVED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.ARCHIVED] as 'inactive',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.ARCHIVED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.ARCHIVED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.ARCHIVED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.ARCHIVED],
  },
  [SLA_STATUS.DRAFT]: {
    status: SLA_STATUS.DRAFT,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.DRAFT],
    color: SLA_STATUS_COLORS[SLA_STATUS.DRAFT],
    icon: SLA_STATUS_ICONS[SLA_STATUS.DRAFT],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.DRAFT] as 'inactive',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.DRAFT],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.DRAFT],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.DRAFT],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.DRAFT],
  },
  [SLA_STATUS.INACTIVE]: {
    status: SLA_STATUS.INACTIVE,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.INACTIVE],
    color: SLA_STATUS_COLORS[SLA_STATUS.INACTIVE],
    icon: SLA_STATUS_ICONS[SLA_STATUS.INACTIVE],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.INACTIVE] as 'inactive',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.INACTIVE],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.INACTIVE],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.INACTIVE],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.INACTIVE],
  },
  [SLA_STATUS.APPROVED]: {
    status: SLA_STATUS.APPROVED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.APPROVED],
    color: SLA_STATUS_COLORS[SLA_STATUS.APPROVED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.APPROVED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.APPROVED] as 'active',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.APPROVED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.APPROVED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.APPROVED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.APPROVED],
  },
  [SLA_STATUS.REJECTED]: {
    status: SLA_STATUS.REJECTED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.REJECTED],
    color: SLA_STATUS_COLORS[SLA_STATUS.REJECTED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.REJECTED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.REJECTED] as 'inactive',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.REJECTED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.REJECTED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.REJECTED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.REJECTED],
  },
  [SLA_STATUS.UNDER_REVIEW]: {
    status: SLA_STATUS.UNDER_REVIEW,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.UNDER_REVIEW],
    color: SLA_STATUS_COLORS[SLA_STATUS.UNDER_REVIEW],
    icon: SLA_STATUS_ICONS[SLA_STATUS.UNDER_REVIEW],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.UNDER_REVIEW] as 'pending',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.UNDER_REVIEW],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.UNDER_REVIEW],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.UNDER_REVIEW],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.UNDER_REVIEW],
    autoTransition: SLA_STATUS_AUTO_TRANSITIONS[SLA_STATUS.UNDER_REVIEW],
  },
  [SLA_STATUS.SUSPENDED]: {
    status: SLA_STATUS.SUSPENDED,
    displayName: SLA_STATUS_DISPLAY_NAMES[SLA_STATUS.SUSPENDED],
    color: SLA_STATUS_COLORS[SLA_STATUS.SUSPENDED],
    icon: SLA_STATUS_ICONS[SLA_STATUS.SUSPENDED],
    category: SLA_STATUS_CATEGORIES[SLA_STATUS.SUSPENDED] as 'pending',
    defaultAction: SLA_STATUS_DEFAULT_ACTIONS[SLA_STATUS.SUSPENDED],
    timeLimitHours: SLA_STATUS_TIME_LIMITS[SLA_STATUS.SUSPENDED],
    publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY[SLA_STATUS.SUSPENDED],
    allowedActions: SLA_STATUS_ALLOWED_ACTIONS[SLA_STATUS.SUSPENDED],
  },
};

/**
 * SLA স্ট্যাটাস কনফিগারেশন
 */
export const SLA_STATUS_CONFIG = {
  statuses: SLA_STATUS,
  displayNames: SLA_STATUS_DISPLAY_NAMES,
  colors: SLA_STATUS_COLORS,
  icons: SLA_STATUS_ICONS,
  categories: SLA_STATUS_CATEGORIES,
  groups: SLA_STATUS_GROUPS,
  transitions: SLA_STATUS_TRANSITIONS,
  defaultActions: SLA_STATUS_DEFAULT_ACTIONS,
  timeLimits: SLA_STATUS_TIME_LIMITS,
  autoTransitions: SLA_STATUS_AUTO_TRANSITIONS,
  publicVisibility: SLA_STATUS_PUBLIC_VISIBILITY,
  allowedActions: SLA_STATUS_ALLOWED_ACTIONS,
  configs: SLA_STATUS_CONFIGS,
} as const;
