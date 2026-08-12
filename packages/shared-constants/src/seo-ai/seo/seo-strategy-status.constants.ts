/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস এনাম
 */
export const SEO_STRATEGY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  FAILED: 'failed',
  UNDER_REVIEW: 'under-review',
} as const;

/**
 * SEO_STRATEGY_STATUS থেকে টাইপ
 */
export type SEOStrategyStatus = (typeof SEO_STRATEGY_STATUS)[keyof typeof SEO_STRATEGY_STATUS];

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস লেবেল
 */
export const SEO_STRATEGY_STATUS_LABELS: Record<SEOStrategyStatus, string> = {
  [SEO_STRATEGY_STATUS.DRAFT]: 'Draft',
  [SEO_STRATEGY_STATUS.ACTIVE]: 'Active',
  [SEO_STRATEGY_STATUS.PAUSED]: 'Paused',
  [SEO_STRATEGY_STATUS.COMPLETED]: 'Completed',
  [SEO_STRATEGY_STATUS.ARCHIVED]: 'Archived',
  [SEO_STRATEGY_STATUS.FAILED]: 'Failed',
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: 'Under Review',
} as const;

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস বিবরণ
 */
export const SEO_STRATEGY_STATUS_DESCRIPTIONS: Record<SEOStrategyStatus, string> = {
  [SEO_STRATEGY_STATUS.DRAFT]: 'Strategy is in draft mode, not yet finalized or approved',
  [SEO_STRATEGY_STATUS.ACTIVE]: 'Strategy is currently being implemented and executed',
  [SEO_STRATEGY_STATUS.PAUSED]: 'Strategy is temporarily paused for review or adjustments',
  [SEO_STRATEGY_STATUS.COMPLETED]: 'Strategy has been fully implemented and completed',
  [SEO_STRATEGY_STATUS.ARCHIVED]: 'Strategy is archived and no longer in use',
  [SEO_STRATEGY_STATUS.FAILED]: 'Strategy failed to meet objectives or was unsuccessful',
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: 'Strategy is being reviewed for performance or changes',
} as const;

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস আইকন
 */
export const SEO_STRATEGY_STATUS_ICONS: Record<SEOStrategyStatus, string> = {
  [SEO_STRATEGY_STATUS.DRAFT]: '📝',
  [SEO_STRATEGY_STATUS.ACTIVE]: '▶️',
  [SEO_STRATEGY_STATUS.PAUSED]: '⏸️',
  [SEO_STRATEGY_STATUS.COMPLETED]: '✅',
  [SEO_STRATEGY_STATUS.ARCHIVED]: '📦',
  [SEO_STRATEGY_STATUS.FAILED]: '❌',
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: '🔍',
} as const;

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_STRATEGY_STATUS_COLORS: Record<SEOStrategyStatus, string> = {
  [SEO_STRATEGY_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_STRATEGY_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_STRATEGY_STATUS.PAUSED]: '#f59e0b', // Amber-500
  [SEO_STRATEGY_STATUS.COMPLETED]: '#3b82f6', // Blue-500
  [SEO_STRATEGY_STATUS.ARCHIVED]: '#64748b', // Slate-500
  [SEO_STRATEGY_STATUS.FAILED]: '#dc2626', // Red-600
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: '#8b5cf6', // Violet-500
} as const;

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_STRATEGY_STATUS_TRANSITIONS: Record<SEOStrategyStatus, SEOStrategyStatus[]> = {
  [SEO_STRATEGY_STATUS.DRAFT]: [
    SEO_STRATEGY_STATUS.UNDER_REVIEW,
    SEO_STRATEGY_STATUS.ACTIVE,
    SEO_STRATEGY_STATUS.ARCHIVED,
  ],
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: [
    SEO_STRATEGY_STATUS.ACTIVE,
    SEO_STRATEGY_STATUS.DRAFT,
    SEO_STRATEGY_STATUS.FAILED,
  ],
  [SEO_STRATEGY_STATUS.ACTIVE]: [
    SEO_STRATEGY_STATUS.PAUSED,
    SEO_STRATEGY_STATUS.COMPLETED,
    SEO_STRATEGY_STATUS.FAILED,
    SEO_STRATEGY_STATUS.UNDER_REVIEW,
  ],
  [SEO_STRATEGY_STATUS.PAUSED]: [
    SEO_STRATEGY_STATUS.ACTIVE,
    SEO_STRATEGY_STATUS.UNDER_REVIEW,
    SEO_STRATEGY_STATUS.COMPLETED,
    SEO_STRATEGY_STATUS.FAILED,
  ],
  [SEO_STRATEGY_STATUS.COMPLETED]: [SEO_STRATEGY_STATUS.ARCHIVED, SEO_STRATEGY_STATUS.UNDER_REVIEW],
  [SEO_STRATEGY_STATUS.FAILED]: [
    SEO_STRATEGY_STATUS.DRAFT,
    SEO_STRATEGY_STATUS.ARCHIVED,
    SEO_STRATEGY_STATUS.UNDER_REVIEW,
  ],
  [SEO_STRATEGY_STATUS.ARCHIVED]: [SEO_STRATEGY_STATUS.DRAFT],
} as const;

/**
 * SEO স্ট্র্যাটেজি স্ট্যাটাস কনফিগারেশন
 */
export interface SEOStrategyStatusConfig {
  status: SEOStrategyStatus;
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
 * SEO স্ট্র্যাটেজি স্ট্যাটাস মেটাডেটা
 */
export const SEO_STRATEGY_STATUS_METADATA: Record<SEOStrategyStatus, SEOStrategyStatusConfig> = {
  [SEO_STRATEGY_STATUS.DRAFT]: {
    status: SEO_STRATEGY_STATUS.DRAFT,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.DRAFT],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.DRAFT],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.DRAFT],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.DRAFT],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 0,
  },
  [SEO_STRATEGY_STATUS.UNDER_REVIEW]: {
    status: SEO_STRATEGY_STATUS.UNDER_REVIEW,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.UNDER_REVIEW],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.UNDER_REVIEW],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.UNDER_REVIEW],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.UNDER_REVIEW],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_STRATEGY_STATUS.ACTIVE]: {
    status: SEO_STRATEGY_STATUS.ACTIVE,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.ACTIVE],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.ACTIVE],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.ACTIVE],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.ACTIVE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_STRATEGY_STATUS.PAUSED]: {
    status: SEO_STRATEGY_STATUS.PAUSED,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.PAUSED],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.PAUSED],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.PAUSED],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.PAUSED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 3,
  },
  [SEO_STRATEGY_STATUS.COMPLETED]: {
    status: SEO_STRATEGY_STATUS.COMPLETED,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.COMPLETED],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.COMPLETED],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.COMPLETED],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.COMPLETED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 4,
  },
  [SEO_STRATEGY_STATUS.FAILED]: {
    status: SEO_STRATEGY_STATUS.FAILED,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.FAILED],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.FAILED],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.FAILED],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
  [SEO_STRATEGY_STATUS.ARCHIVED]: {
    status: SEO_STRATEGY_STATUS.ARCHIVED,
    label: SEO_STRATEGY_STATUS_LABELS[SEO_STRATEGY_STATUS.ARCHIVED],
    description: SEO_STRATEGY_STATUS_DESCRIPTIONS[SEO_STRATEGY_STATUS.ARCHIVED],
    icon: SEO_STRATEGY_STATUS_ICONS[SEO_STRATEGY_STATUS.ARCHIVED],
    color: SEO_STRATEGY_STATUS_COLORS[SEO_STRATEGY_STATUS.ARCHIVED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_STRATEGY_TERMINAL_STATUSES = [
  SEO_STRATEGY_STATUS.COMPLETED,
  SEO_STRATEGY_STATUS.FAILED,
  SEO_STRATEGY_STATUS.ARCHIVED,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_STRATEGY_SUCCESS_STATUSES = [
  SEO_STRATEGY_STATUS.ACTIVE,
  SEO_STRATEGY_STATUS.COMPLETED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_STRATEGY_ERROR_STATUSES = [SEO_STRATEGY_STATUS.FAILED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_STRATEGY_ACTIVE_STATUSES = [
  SEO_STRATEGY_STATUS.UNDER_REVIEW,
  SEO_STRATEGY_STATUS.ACTIVE,
] as const;
