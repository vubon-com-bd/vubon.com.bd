/**
 * FAQ আইটেমের বিভিন্ন স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * FAQ স্ট্যাটাস
 */
export const FAQ_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  PENDING_REVIEW: 'pending_review',
  REJECTED: 'rejected',
  NEEDS_UPDATE: 'needs_update',
  DEPRECATED: 'deprecated',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  SCHEDULED: 'scheduled',
} as const;

/**
 * FAQ স্ট্যাটাসের ডিসপ্লে নাম
 */
export const FAQ_STATUS_DISPLAY_NAMES = {
  [FAQ_STATUS.DRAFT]: 'খসড়া',
  [FAQ_STATUS.PUBLISHED]: 'প্রকাশিত',
  [FAQ_STATUS.ARCHIVED]: 'আর্কাইভড',
  [FAQ_STATUS.PENDING_REVIEW]: 'পর্যালোচনার অপেক্ষায়',
  [FAQ_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
  [FAQ_STATUS.NEEDS_UPDATE]: 'আপডেট প্রয়োজন',
  [FAQ_STATUS.DEPRECATED]: 'অপ্রচলিত',
  [FAQ_STATUS.UNDER_REVIEW]: 'পর্যালোচনাধীন',
  [FAQ_STATUS.APPROVED]: 'অনুমোদিত',
  [FAQ_STATUS.SCHEDULED]: 'নির্ধারিত',
} as const;

/**
 * FAQ স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const FAQ_STATUS_COLORS = {
  [FAQ_STATUS.DRAFT]: '#95a5a6',
  [FAQ_STATUS.PUBLISHED]: '#2ecc71',
  [FAQ_STATUS.ARCHIVED]: '#7f8c8d',
  [FAQ_STATUS.PENDING_REVIEW]: '#f39c12',
  [FAQ_STATUS.REJECTED]: '#e74c3c',
  [FAQ_STATUS.NEEDS_UPDATE]: '#e67e22',
  [FAQ_STATUS.DEPRECATED]: '#c0392b',
  [FAQ_STATUS.UNDER_REVIEW]: '#3498db',
  [FAQ_STATUS.APPROVED]: '#27ae60',
  [FAQ_STATUS.SCHEDULED]: '#9b59b6',
} as const;

/**
 * FAQ স্ট্যাটাসের আইকন (অনুষঙ্গিক নাম)
 */
export const FAQ_STATUS_ICONS = {
  [FAQ_STATUS.DRAFT]: 'file',
  [FAQ_STATUS.PUBLISHED]: 'check-circle',
  [FAQ_STATUS.ARCHIVED]: 'archive',
  [FAQ_STATUS.PENDING_REVIEW]: 'clock',
  [FAQ_STATUS.REJECTED]: 'x-circle',
  [FAQ_STATUS.NEEDS_UPDATE]: 'edit',
  [FAQ_STATUS.DEPRECATED]: 'alert-circle',
  [FAQ_STATUS.UNDER_REVIEW]: 'eye',
  [FAQ_STATUS.APPROVED]: 'thumbs-up',
  [FAQ_STATUS.SCHEDULED]: 'calendar',
} as const;

/**
 * FAQ স্ট্যাটাসের ক্যাটাগরি
 */
export const FAQ_STATUS_CATEGORIES = {
  [FAQ_STATUS.DRAFT]: 'inactive',
  [FAQ_STATUS.PUBLISHED]: 'active',
  [FAQ_STATUS.ARCHIVED]: 'inactive',
  [FAQ_STATUS.PENDING_REVIEW]: 'pending',
  [FAQ_STATUS.REJECTED]: 'inactive',
  [FAQ_STATUS.NEEDS_UPDATE]: 'pending',
  [FAQ_STATUS.DEPRECATED]: 'inactive',
  [FAQ_STATUS.UNDER_REVIEW]: 'pending',
  [FAQ_STATUS.APPROVED]: 'active',
  [FAQ_STATUS.SCHEDULED]: 'pending',
} as const;

/**
 * FAQ স্ট্যাটাস গ্রুপ
 */
export const FAQ_STATUS_GROUPS = {
  ACTIVE: ['published', 'approved'] as const,
  PENDING: ['pending_review', 'under_review', 'needs_update', 'scheduled'] as const,
  INACTIVE: ['draft', 'archived', 'rejected', 'deprecated'] as const,
} as const;

/**
 * FAQ স্ট্যাটাস ট্রানজিশন রুলস
 */
export const FAQ_STATUS_TRANSITIONS = {
  [FAQ_STATUS.DRAFT]: ['pending_review', 'published', 'archived'] as const,
  [FAQ_STATUS.PUBLISHED]: ['archived', 'deprecated', 'needs_update', 'under_review'] as const,
  [FAQ_STATUS.ARCHIVED]: ['draft', 'published'] as const,
  [FAQ_STATUS.PENDING_REVIEW]: ['approved', 'rejected', 'needs_update'] as const,
  [FAQ_STATUS.REJECTED]: ['draft', 'needs_update'] as const,
  [FAQ_STATUS.NEEDS_UPDATE]: ['pending_review', 'draft'] as const,
  [FAQ_STATUS.DEPRECATED]: ['archived'] as const,
  [FAQ_STATUS.UNDER_REVIEW]: ['approved', 'rejected', 'needs_update'] as const,
  [FAQ_STATUS.APPROVED]: ['published', 'scheduled'] as const,
  [FAQ_STATUS.SCHEDULED]: ['published', 'draft'] as const,
} as const;

/**
 * FAQ স্ট্যাটাসের ডিফল্ট অ্যাকশন
 */
export const FAQ_STATUS_DEFAULT_ACTIONS = {
  [FAQ_STATUS.DRAFT]: 'খসড়া সংরক্ষিত, প্রকাশের আগে পর্যালোচনা প্রয়োজন',
  [FAQ_STATUS.PUBLISHED]: 'FAQ প্রকাশিত হয়েছে এবং সকলের জন্য দৃশ্যমান',
  [FAQ_STATUS.ARCHIVED]: 'FAQ আর্কাইভ করা হয়েছে, প্রয়োজনে পুনরুদ্ধার করুন',
  [FAQ_STATUS.PENDING_REVIEW]: 'FAQ পর্যালোচনার জন্য জমা দেওয়া হয়েছে',
  [FAQ_STATUS.REJECTED]: 'FAQ প্রত্যাখ্যাত হয়েছে, প্রয়োজনীয় সংশোধন করুন',
  [FAQ_STATUS.NEEDS_UPDATE]: 'FAQ আপডেট প্রয়োজন, সংশোধন করে পুনরায় জমা দিন',
  [FAQ_STATUS.DEPRECATED]: 'FAQ অপ্রচলিত, প্রতিস্থাপন বা আর্কাইভ করুন',
  [FAQ_STATUS.UNDER_REVIEW]: 'FAQ পর্যালোচনাধীন, ফলাফলের জন্য অপেক্ষা করুন',
  [FAQ_STATUS.APPROVED]: 'FAQ অনুমোদিত, প্রকাশের জন্য প্রস্তুত',
  [FAQ_STATUS.SCHEDULED]: 'FAQ নির্ধারিত সময়ে প্রকাশিত হবে',
} as const;

/**
 * FAQ স্ট্যাটাসের টাইমআউট (ঘন্টায়)
 */
export const FAQ_STATUS_TIME_LIMITS = {
  [FAQ_STATUS.DRAFT]: 0,
  [FAQ_STATUS.PUBLISHED]: 0,
  [FAQ_STATUS.ARCHIVED]: 0,
  [FAQ_STATUS.PENDING_REVIEW]: 72,
  [FAQ_STATUS.REJECTED]: 0,
  [FAQ_STATUS.NEEDS_UPDATE]: 168,
  [FAQ_STATUS.DEPRECATED]: 0,
  [FAQ_STATUS.UNDER_REVIEW]: 48,
  [FAQ_STATUS.APPROVED]: 0,
  [FAQ_STATUS.SCHEDULED]: 0,
} as const;

/**
 * FAQ স্ট্যাটাসের অটো-ট্রানজিশন
 */
export const FAQ_STATUS_AUTO_TRANSITIONS = {
  [FAQ_STATUS.PENDING_REVIEW]: {
    after: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.PENDING_REVIEW],
    to: FAQ_STATUS.NEEDS_UPDATE,
  },
  [FAQ_STATUS.UNDER_REVIEW]: {
    after: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.UNDER_REVIEW],
    to: FAQ_STATUS.NEEDS_UPDATE,
  },
  [FAQ_STATUS.NEEDS_UPDATE]: {
    after: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.NEEDS_UPDATE],
    to: FAQ_STATUS.ARCHIVED,
  },
} as const;

/**
 * FAQ স্ট্যাটাসের ডিফল্ট পাবলিক ভিজিবিলিটি
 */
export const FAQ_STATUS_PUBLIC_VISIBILITY = {
  [FAQ_STATUS.DRAFT]: false,
  [FAQ_STATUS.PUBLISHED]: true,
  [FAQ_STATUS.ARCHIVED]: false,
  [FAQ_STATUS.PENDING_REVIEW]: false,
  [FAQ_STATUS.REJECTED]: false,
  [FAQ_STATUS.NEEDS_UPDATE]: false,
  [FAQ_STATUS.DEPRECATED]: true,
  [FAQ_STATUS.UNDER_REVIEW]: false,
  [FAQ_STATUS.APPROVED]: false,
  [FAQ_STATUS.SCHEDULED]: false,
} as const;

/**
 * FAQ স্ট্যাটাসের সার্চ ইন্ডেক্সিং
 */
export const FAQ_STATUS_SEARCH_INDEXING = {
  [FAQ_STATUS.DRAFT]: false,
  [FAQ_STATUS.PUBLISHED]: true,
  [FAQ_STATUS.ARCHIVED]: false,
  [FAQ_STATUS.PENDING_REVIEW]: false,
  [FAQ_STATUS.REJECTED]: false,
  [FAQ_STATUS.NEEDS_UPDATE]: false,
  [FAQ_STATUS.DEPRECATED]: true,
  [FAQ_STATUS.UNDER_REVIEW]: false,
  [FAQ_STATUS.APPROVED]: false,
  [FAQ_STATUS.SCHEDULED]: false,
} as const;

/**
 * FAQ স্ট্যাটাসের অনুমোদিত কর্ম (মিউটেবল অ্যারে হিসেবে)
 */
export const FAQ_STATUS_ALLOWED_ACTIONS = {
  [FAQ_STATUS.DRAFT]: ['edit', 'submit_for_review', 'delete'] as string[],
  [FAQ_STATUS.PUBLISHED]: ['edit', 'archive', 'deprecate', 'unpublish'] as string[],
  [FAQ_STATUS.ARCHIVED]: ['restore', 'delete'] as string[],
  [FAQ_STATUS.PENDING_REVIEW]: ['approve', 'reject', 'request_changes'] as string[],
  [FAQ_STATUS.REJECTED]: ['edit', 'submit_for_review', 'delete'] as string[],
  [FAQ_STATUS.NEEDS_UPDATE]: ['edit', 'submit_for_review', 'delete'] as string[],
  [FAQ_STATUS.DEPRECATED]: ['archive', 'restore'] as string[],
  [FAQ_STATUS.UNDER_REVIEW]: ['approve', 'reject', 'request_changes'] as string[],
  [FAQ_STATUS.APPROVED]: ['publish', 'schedule', 'edit'] as string[],
  [FAQ_STATUS.SCHEDULED]: ['unschedule', 'edit', 'publish_now'] as string[],
} as const;

export type FAQStatus = (typeof FAQ_STATUS)[keyof typeof FAQ_STATUS];
export type FAQStatusDisplayNames = typeof FAQ_STATUS_DISPLAY_NAMES;
export type FAQStatusColors = typeof FAQ_STATUS_COLORS;
export type FAQStatusIcons = typeof FAQ_STATUS_ICONS;
export type FAQStatusCategories = typeof FAQ_STATUS_CATEGORIES;
export type FAQStatusGroups = typeof FAQ_STATUS_GROUPS;
export type FAQStatusTransitions = typeof FAQ_STATUS_TRANSITIONS;
export type FAQStatusDefaultActions = typeof FAQ_STATUS_DEFAULT_ACTIONS;
export type FAQStatusTimeLimits = typeof FAQ_STATUS_TIME_LIMITS;
export type FAQStatusAutoTransitions = typeof FAQ_STATUS_AUTO_TRANSITIONS;
export type FAQStatusPublicVisibility = typeof FAQ_STATUS_PUBLIC_VISIBILITY;
export type FAQStatusSearchIndexing = typeof FAQ_STATUS_SEARCH_INDEXING;
export type FAQStatusAllowedActions = typeof FAQ_STATUS_ALLOWED_ACTIONS;

export interface FAQStatusConfig {
  status: FAQStatus;
  displayName: string;
  color: string;
  icon: string;
  category: 'active' | 'pending' | 'inactive';
  defaultAction: string;
  timeLimitHours: number;
  publicVisibility: boolean;
  searchIndexing: boolean;
  allowedActions: string[];
  autoTransition?: {
    after: number;
    to: FAQStatus;
  };
}

/**
 * FAQ স্ট্যাটাস কনফিগারেশন অবজেক্ট
 */
export const FAQ_STATUS_CONFIGS: Record<FAQStatus, FAQStatusConfig> = {
  [FAQ_STATUS.DRAFT]: {
    status: FAQ_STATUS.DRAFT,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.DRAFT],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.DRAFT],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.DRAFT],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.DRAFT] as 'inactive',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.DRAFT],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.DRAFT],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.DRAFT],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.DRAFT],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.DRAFT],
  },
  [FAQ_STATUS.PUBLISHED]: {
    status: FAQ_STATUS.PUBLISHED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.PUBLISHED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.PUBLISHED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.PUBLISHED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.PUBLISHED] as 'active',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.PUBLISHED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.PUBLISHED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.PUBLISHED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.PUBLISHED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.PUBLISHED],
  },
  [FAQ_STATUS.ARCHIVED]: {
    status: FAQ_STATUS.ARCHIVED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.ARCHIVED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.ARCHIVED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.ARCHIVED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.ARCHIVED] as 'inactive',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.ARCHIVED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.ARCHIVED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.ARCHIVED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.ARCHIVED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.ARCHIVED],
  },
  [FAQ_STATUS.PENDING_REVIEW]: {
    status: FAQ_STATUS.PENDING_REVIEW,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.PENDING_REVIEW],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.PENDING_REVIEW],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.PENDING_REVIEW],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.PENDING_REVIEW] as 'pending',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.PENDING_REVIEW],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.PENDING_REVIEW],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.PENDING_REVIEW],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.PENDING_REVIEW],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.PENDING_REVIEW],
    autoTransition: FAQ_STATUS_AUTO_TRANSITIONS[FAQ_STATUS.PENDING_REVIEW],
  },
  [FAQ_STATUS.REJECTED]: {
    status: FAQ_STATUS.REJECTED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.REJECTED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.REJECTED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.REJECTED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.REJECTED] as 'inactive',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.REJECTED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.REJECTED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.REJECTED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.REJECTED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.REJECTED],
  },
  [FAQ_STATUS.NEEDS_UPDATE]: {
    status: FAQ_STATUS.NEEDS_UPDATE,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.NEEDS_UPDATE],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.NEEDS_UPDATE],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.NEEDS_UPDATE],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.NEEDS_UPDATE] as 'pending',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.NEEDS_UPDATE],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.NEEDS_UPDATE],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.NEEDS_UPDATE],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.NEEDS_UPDATE],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.NEEDS_UPDATE],
    autoTransition: FAQ_STATUS_AUTO_TRANSITIONS[FAQ_STATUS.NEEDS_UPDATE],
  },
  [FAQ_STATUS.DEPRECATED]: {
    status: FAQ_STATUS.DEPRECATED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.DEPRECATED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.DEPRECATED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.DEPRECATED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.DEPRECATED] as 'inactive',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.DEPRECATED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.DEPRECATED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.DEPRECATED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.DEPRECATED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.DEPRECATED],
  },
  [FAQ_STATUS.UNDER_REVIEW]: {
    status: FAQ_STATUS.UNDER_REVIEW,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.UNDER_REVIEW],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.UNDER_REVIEW],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.UNDER_REVIEW],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.UNDER_REVIEW] as 'pending',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.UNDER_REVIEW],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.UNDER_REVIEW],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.UNDER_REVIEW],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.UNDER_REVIEW],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.UNDER_REVIEW],
    autoTransition: FAQ_STATUS_AUTO_TRANSITIONS[FAQ_STATUS.UNDER_REVIEW],
  },
  [FAQ_STATUS.APPROVED]: {
    status: FAQ_STATUS.APPROVED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.APPROVED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.APPROVED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.APPROVED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.APPROVED] as 'active',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.APPROVED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.APPROVED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.APPROVED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.APPROVED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.APPROVED],
  },
  [FAQ_STATUS.SCHEDULED]: {
    status: FAQ_STATUS.SCHEDULED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.SCHEDULED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.SCHEDULED],
    icon: FAQ_STATUS_ICONS[FAQ_STATUS.SCHEDULED],
    category: FAQ_STATUS_CATEGORIES[FAQ_STATUS.SCHEDULED] as 'pending',
    defaultAction: FAQ_STATUS_DEFAULT_ACTIONS[FAQ_STATUS.SCHEDULED],
    timeLimitHours: FAQ_STATUS_TIME_LIMITS[FAQ_STATUS.SCHEDULED],
    publicVisibility: FAQ_STATUS_PUBLIC_VISIBILITY[FAQ_STATUS.SCHEDULED],
    searchIndexing: FAQ_STATUS_SEARCH_INDEXING[FAQ_STATUS.SCHEDULED],
    allowedActions: FAQ_STATUS_ALLOWED_ACTIONS[FAQ_STATUS.SCHEDULED],
  },
};
