/**
 * SEO কীওয়ার্ড স্ট্যাটাস এনাম
 */
export const SEO_KEYWORD_STATUS = {
  RESEARCHING: 'researching',
  SHORTLISTED: 'shortlisted',
  TARGETED: 'targeted',
  RANKING: 'ranking',
  OPTIMIZING: 'optimizing',
  ACHIEVED: 'achieved',
  DROPPED: 'dropped',
  STABLE: 'stable',
} as const;

/**
 * SEO_KEYWORD_STATUS থেকে টাইপ
 */
export type SEOKeywordStatus = (typeof SEO_KEYWORD_STATUS)[keyof typeof SEO_KEYWORD_STATUS];

/**
 * SEO কীওয়ার্ড স্ট্যাটাস লেবেল
 */
export const SEO_KEYWORD_STATUS_LABELS: Record<SEOKeywordStatus, string> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: 'Researching',
  [SEO_KEYWORD_STATUS.SHORTLISTED]: 'Shortlisted',
  [SEO_KEYWORD_STATUS.TARGETED]: 'Targeted',
  [SEO_KEYWORD_STATUS.RANKING]: 'Ranking',
  [SEO_KEYWORD_STATUS.OPTIMIZING]: 'Optimizing',
  [SEO_KEYWORD_STATUS.ACHIEVED]: 'Achieved',
  [SEO_KEYWORD_STATUS.DROPPED]: 'Dropped',
  [SEO_KEYWORD_STATUS.STABLE]: 'Stable',
} as const;

/**
 * SEO কীওয়ার্ড স্ট্যাটাস বিবরণ
 */
export const SEO_KEYWORD_STATUS_DESCRIPTIONS: Record<SEOKeywordStatus, string> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: 'Keyword is being researched for potential opportunities',
  [SEO_KEYWORD_STATUS.SHORTLISTED]: 'Keyword has been shortlisted for targeting',
  [SEO_KEYWORD_STATUS.TARGETED]: 'Keyword is actively being targeted in content strategy',
  [SEO_KEYWORD_STATUS.RANKING]: 'Keyword is currently ranking in search results',
  [SEO_KEYWORD_STATUS.OPTIMIZING]: 'Keyword is being optimized for better performance',
  [SEO_KEYWORD_STATUS.ACHIEVED]: 'Target position or goal has been achieved for the keyword',
  [SEO_KEYWORD_STATUS.DROPPED]: 'Keyword has been dropped from targeting strategy',
  [SEO_KEYWORD_STATUS.STABLE]: 'Keyword is maintaining stable ranking position',
} as const;

/**
 * SEO কীওয়ার্ড স্ট্যাটাস আইকন
 */
export const SEO_KEYWORD_STATUS_ICONS: Record<SEOKeywordStatus, string> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: '🔍',
  [SEO_KEYWORD_STATUS.SHORTLISTED]: '📋',
  [SEO_KEYWORD_STATUS.TARGETED]: '🎯',
  [SEO_KEYWORD_STATUS.RANKING]: '📊',
  [SEO_KEYWORD_STATUS.OPTIMIZING]: '🔄',
  [SEO_KEYWORD_STATUS.ACHIEVED]: '✅',
  [SEO_KEYWORD_STATUS.DROPPED]: '❌',
  [SEO_KEYWORD_STATUS.STABLE]: '📌',
} as const;

/**
 * SEO কীওয়ার্ড স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_KEYWORD_STATUS_COLORS: Record<SEOKeywordStatus, string> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: '#94a3b8', // Slate-400
  [SEO_KEYWORD_STATUS.SHORTLISTED]: '#6366f1', // Indigo-500
  [SEO_KEYWORD_STATUS.TARGETED]: '#3b82f6', // Blue-500
  [SEO_KEYWORD_STATUS.RANKING]: '#8b5cf6', // Violet-500
  [SEO_KEYWORD_STATUS.OPTIMIZING]: '#f59e0b', // Amber-500
  [SEO_KEYWORD_STATUS.ACHIEVED]: '#22c55e', // Green-500
  [SEO_KEYWORD_STATUS.DROPPED]: '#dc2626', // Red-600
  [SEO_KEYWORD_STATUS.STABLE]: '#06b6d4', // Cyan-500
} as const;

/**
 * SEO কীওয়ার্ড স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_KEYWORD_STATUS_TRANSITIONS: Record<SEOKeywordStatus, SEOKeywordStatus[]> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: [SEO_KEYWORD_STATUS.SHORTLISTED, SEO_KEYWORD_STATUS.DROPPED],
  [SEO_KEYWORD_STATUS.SHORTLISTED]: [SEO_KEYWORD_STATUS.TARGETED, SEO_KEYWORD_STATUS.DROPPED],
  [SEO_KEYWORD_STATUS.TARGETED]: [
    SEO_KEYWORD_STATUS.RANKING,
    SEO_KEYWORD_STATUS.OPTIMIZING,
    SEO_KEYWORD_STATUS.DROPPED,
  ],
  [SEO_KEYWORD_STATUS.RANKING]: [
    SEO_KEYWORD_STATUS.STABLE,
    SEO_KEYWORD_STATUS.OPTIMIZING,
    SEO_KEYWORD_STATUS.ACHIEVED,
    SEO_KEYWORD_STATUS.DROPPED,
  ],
  [SEO_KEYWORD_STATUS.OPTIMIZING]: [
    SEO_KEYWORD_STATUS.RANKING,
    SEO_KEYWORD_STATUS.ACHIEVED,
    SEO_KEYWORD_STATUS.DROPPED,
  ],
  [SEO_KEYWORD_STATUS.ACHIEVED]: [SEO_KEYWORD_STATUS.STABLE, SEO_KEYWORD_STATUS.DROPPED],
  [SEO_KEYWORD_STATUS.DROPPED]: [SEO_KEYWORD_STATUS.RESEARCHING, SEO_KEYWORD_STATUS.SHORTLISTED],
  [SEO_KEYWORD_STATUS.STABLE]: [
    SEO_KEYWORD_STATUS.OPTIMIZING,
    SEO_KEYWORD_STATUS.DROPPED,
    SEO_KEYWORD_STATUS.RANKING,
  ],
} as const;

/**
 * SEO কীওয়ার্ড স্ট্যাটাস কনফিগারেশন
 */
export interface SEOKeywordStatusConfig {
  status: SEOKeywordStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  isActive: boolean;
  order: number;
}

/**
 * SEO কীওয়ার্ড স্ট্যাটাস মেটাডেটা
 */
export const SEO_KEYWORD_STATUS_METADATA: Record<SEOKeywordStatus, SEOKeywordStatusConfig> = {
  [SEO_KEYWORD_STATUS.RESEARCHING]: {
    status: SEO_KEYWORD_STATUS.RESEARCHING,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.RESEARCHING],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.RESEARCHING],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.RESEARCHING],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.RESEARCHING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [SEO_KEYWORD_STATUS.SHORTLISTED]: {
    status: SEO_KEYWORD_STATUS.SHORTLISTED,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.SHORTLISTED],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.SHORTLISTED],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.SHORTLISTED],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.SHORTLISTED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_KEYWORD_STATUS.TARGETED]: {
    status: SEO_KEYWORD_STATUS.TARGETED,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.TARGETED],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.TARGETED],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.TARGETED],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.TARGETED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 2,
  },
  [SEO_KEYWORD_STATUS.RANKING]: {
    status: SEO_KEYWORD_STATUS.RANKING,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.RANKING],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.RANKING],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.RANKING],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.RANKING],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 3,
  },
  [SEO_KEYWORD_STATUS.OPTIMIZING]: {
    status: SEO_KEYWORD_STATUS.OPTIMIZING,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.OPTIMIZING],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.OPTIMIZING],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.OPTIMIZING],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.OPTIMIZING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_KEYWORD_STATUS.ACHIEVED]: {
    status: SEO_KEYWORD_STATUS.ACHIEVED,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.ACHIEVED],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.ACHIEVED],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.ACHIEVED],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.ACHIEVED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 5,
  },
  [SEO_KEYWORD_STATUS.DROPPED]: {
    status: SEO_KEYWORD_STATUS.DROPPED,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.DROPPED],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.DROPPED],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.DROPPED],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.DROPPED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
  [SEO_KEYWORD_STATUS.STABLE]: {
    status: SEO_KEYWORD_STATUS.STABLE,
    label: SEO_KEYWORD_STATUS_LABELS[SEO_KEYWORD_STATUS.STABLE],
    description: SEO_KEYWORD_STATUS_DESCRIPTIONS[SEO_KEYWORD_STATUS.STABLE],
    icon: SEO_KEYWORD_STATUS_ICONS[SEO_KEYWORD_STATUS.STABLE],
    color: SEO_KEYWORD_STATUS_COLORS[SEO_KEYWORD_STATUS.STABLE],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 7,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_KEYWORD_TERMINAL_STATUSES = [
  SEO_KEYWORD_STATUS.ACHIEVED,
  SEO_KEYWORD_STATUS.DROPPED,
  SEO_KEYWORD_STATUS.STABLE,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_KEYWORD_SUCCESS_STATUSES = [
  SEO_KEYWORD_STATUS.RANKING,
  SEO_KEYWORD_STATUS.ACHIEVED,
  SEO_KEYWORD_STATUS.STABLE,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_KEYWORD_ERROR_STATUSES = [SEO_KEYWORD_STATUS.DROPPED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_KEYWORD_ACTIVE_STATUSES = [
  SEO_KEYWORD_STATUS.RESEARCHING,
  SEO_KEYWORD_STATUS.SHORTLISTED,
  SEO_KEYWORD_STATUS.TARGETED,
  SEO_KEYWORD_STATUS.RANKING,
  SEO_KEYWORD_STATUS.OPTIMIZING,
] as const;
