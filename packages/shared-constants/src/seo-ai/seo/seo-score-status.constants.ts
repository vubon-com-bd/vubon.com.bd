/**
 * SEO স্কোর স্ট্যাটাস এনাম
 */
export const SEO_SCORE_STATUS = {
  CALCULATING: 'calculating',
  UPDATED: 'updated',
  STALE: 'stale',
  IMPROVING: 'improving',
  DECLINING: 'declining',
  STABLE: 'stable',
} as const;

/**
 * SEO_SCORE_STATUS থেকে টাইপ
 */
export type SEOScoreStatus = (typeof SEO_SCORE_STATUS)[keyof typeof SEO_SCORE_STATUS];

/**
 * SEO স্কোর স্ট্যাটাস লেবেল
 */
export const SEO_SCORE_STATUS_LABELS: Record<SEOScoreStatus, string> = {
  [SEO_SCORE_STATUS.CALCULATING]: 'Calculating',
  [SEO_SCORE_STATUS.UPDATED]: 'Updated',
  [SEO_SCORE_STATUS.STALE]: 'Stale',
  [SEO_SCORE_STATUS.IMPROVING]: 'Improving',
  [SEO_SCORE_STATUS.DECLINING]: 'Declining',
  [SEO_SCORE_STATUS.STABLE]: 'Stable',
} as const;

/**
 * SEO স্কোর স্ট্যাটাস বিবরণ
 */
export const SEO_SCORE_STATUS_DESCRIPTIONS: Record<SEOScoreStatus, string> = {
  [SEO_SCORE_STATUS.CALCULATING]: 'Score is currently being calculated',
  [SEO_SCORE_STATUS.UPDATED]: 'Score has been recently updated with fresh data',
  [SEO_SCORE_STATUS.STALE]: 'Score is outdated and needs recalculation',
  [SEO_SCORE_STATUS.IMPROVING]: 'Score is showing positive trend over time',
  [SEO_SCORE_STATUS.DECLINING]: 'Score is showing negative trend over time',
  [SEO_SCORE_STATUS.STABLE]: 'Score is maintaining consistent performance',
} as const;

/**
 * SEO স্কোর স্ট্যাটাস আইকন
 */
export const SEO_SCORE_STATUS_ICONS: Record<SEOScoreStatus, string> = {
  [SEO_SCORE_STATUS.CALCULATING]: '🔄',
  [SEO_SCORE_STATUS.UPDATED]: '✅',
  [SEO_SCORE_STATUS.STALE]: '⏰',
  [SEO_SCORE_STATUS.IMPROVING]: '📈',
  [SEO_SCORE_STATUS.DECLINING]: '📉',
  [SEO_SCORE_STATUS.STABLE]: '📌',
} as const;

/**
 * SEO স্কোর স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_SCORE_STATUS_COLORS: Record<SEOScoreStatus, string> = {
  [SEO_SCORE_STATUS.CALCULATING]: '#3b82f6', // Blue-500
  [SEO_SCORE_STATUS.UPDATED]: '#22c55e', // Green-500
  [SEO_SCORE_STATUS.STALE]: '#94a3b8', // Slate-400
  [SEO_SCORE_STATUS.IMPROVING]: '#06b6d4', // Cyan-500
  [SEO_SCORE_STATUS.DECLINING]: '#dc2626', // Red-600
  [SEO_SCORE_STATUS.STABLE]: '#8b5cf6', // Violet-500
} as const;

/**
 * SEO স্কোর স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_SCORE_STATUS_TRANSITIONS: Record<SEOScoreStatus, SEOScoreStatus[]> = {
  [SEO_SCORE_STATUS.CALCULATING]: [SEO_SCORE_STATUS.UPDATED, SEO_SCORE_STATUS.STALE],
  [SEO_SCORE_STATUS.UPDATED]: [
    SEO_SCORE_STATUS.STABLE,
    SEO_SCORE_STATUS.IMPROVING,
    SEO_SCORE_STATUS.DECLINING,
    SEO_SCORE_STATUS.STALE,
  ],
  [SEO_SCORE_STATUS.STABLE]: [
    SEO_SCORE_STATUS.IMPROVING,
    SEO_SCORE_STATUS.DECLINING,
    SEO_SCORE_STATUS.STALE,
    SEO_SCORE_STATUS.UPDATED,
  ],
  [SEO_SCORE_STATUS.IMPROVING]: [
    SEO_SCORE_STATUS.STABLE,
    SEO_SCORE_STATUS.UPDATED,
    SEO_SCORE_STATUS.DECLINING,
  ],
  [SEO_SCORE_STATUS.DECLINING]: [
    SEO_SCORE_STATUS.STABLE,
    SEO_SCORE_STATUS.UPDATED,
    SEO_SCORE_STATUS.IMPROVING,
  ],
  [SEO_SCORE_STATUS.STALE]: [SEO_SCORE_STATUS.CALCULATING, SEO_SCORE_STATUS.UPDATED],
} as const;

/**
 * SEO স্কোর স্ট্যাটাস কনফিগারেশন
 */
export interface SEOScoreStatusConfig {
  status: SEOScoreStatus;
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
 * SEO স্কোর স্ট্যাটাস মেটাডেটা
 */
export const SEO_SCORE_STATUS_METADATA: Record<SEOScoreStatus, SEOScoreStatusConfig> = {
  [SEO_SCORE_STATUS.CALCULATING]: {
    status: SEO_SCORE_STATUS.CALCULATING,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.CALCULATING],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.CALCULATING],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.CALCULATING],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.CALCULATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [SEO_SCORE_STATUS.UPDATED]: {
    status: SEO_SCORE_STATUS.UPDATED,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.UPDATED],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.UPDATED],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.UPDATED],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.UPDATED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 1,
  },
  [SEO_SCORE_STATUS.STABLE]: {
    status: SEO_SCORE_STATUS.STABLE,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.STABLE],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.STABLE],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.STABLE],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.STABLE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_SCORE_STATUS.IMPROVING]: {
    status: SEO_SCORE_STATUS.IMPROVING,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.IMPROVING],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.IMPROVING],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.IMPROVING],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.IMPROVING],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 3,
  },
  [SEO_SCORE_STATUS.DECLINING]: {
    status: SEO_SCORE_STATUS.DECLINING,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.DECLINING],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.DECLINING],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.DECLINING],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.DECLINING],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_SCORE_STATUS.STALE]: {
    status: SEO_SCORE_STATUS.STALE,
    label: SEO_SCORE_STATUS_LABELS[SEO_SCORE_STATUS.STALE],
    description: SEO_SCORE_STATUS_DESCRIPTIONS[SEO_SCORE_STATUS.STALE],
    icon: SEO_SCORE_STATUS_ICONS[SEO_SCORE_STATUS.STALE],
    color: SEO_SCORE_STATUS_COLORS[SEO_SCORE_STATUS.STALE],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_SCORE_TERMINAL_STATUSES = [SEO_SCORE_STATUS.STALE] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_SCORE_SUCCESS_STATUSES = [
  SEO_SCORE_STATUS.UPDATED,
  SEO_SCORE_STATUS.STABLE,
  SEO_SCORE_STATUS.IMPROVING,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_SCORE_ERROR_STATUSES = [SEO_SCORE_STATUS.DECLINING] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_SCORE_ACTIVE_STATUSES = [
  SEO_SCORE_STATUS.CALCULATING,
  SEO_SCORE_STATUS.UPDATED,
  SEO_SCORE_STATUS.STABLE,
  SEO_SCORE_STATUS.IMPROVING,
  SEO_SCORE_STATUS.DECLINING,
] as const;
