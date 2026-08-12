/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস এনাম
 */
export const SEO_RANKING_STATUS = {
  TRACKING: 'tracking',
  UPDATED: 'updated',
  IMPROVED: 'improved',
  DECLINED: 'declined',
  STABLE: 'stable',
  NOT_RANKING: 'not-ranking',
  NEW: 'new',
} as const;

/**
 * SEO_RANKING_STATUS থেকে টাইপ
 */
export type SEORankingStatus = (typeof SEO_RANKING_STATUS)[keyof typeof SEO_RANKING_STATUS];

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস লেবেল
 */
export const SEO_RANKING_STATUS_LABELS: Record<SEORankingStatus, string> = {
  [SEO_RANKING_STATUS.TRACKING]: 'Tracking',
  [SEO_RANKING_STATUS.UPDATED]: 'Updated',
  [SEO_RANKING_STATUS.IMPROVED]: 'Improved',
  [SEO_RANKING_STATUS.DECLINED]: 'Declined',
  [SEO_RANKING_STATUS.STABLE]: 'Stable',
  [SEO_RANKING_STATUS.NOT_RANKING]: 'Not Ranking',
  [SEO_RANKING_STATUS.NEW]: 'New',
} as const;

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস বিবরণ
 */
export const SEO_RANKING_STATUS_DESCRIPTIONS: Record<SEORankingStatus, string> = {
  [SEO_RANKING_STATUS.TRACKING]: 'Keyword is being tracked for ranking changes',
  [SEO_RANKING_STATUS.UPDATED]: 'Ranking has been updated with latest data',
  [SEO_RANKING_STATUS.IMPROVED]: 'Ranking has improved since last check',
  [SEO_RANKING_STATUS.DECLINED]: 'Ranking has declined since last check',
  [SEO_RANKING_STATUS.STABLE]: 'Ranking is stable with no significant changes',
  [SEO_RANKING_STATUS.NOT_RANKING]: 'Keyword is not ranking in search results',
  [SEO_RANKING_STATUS.NEW]: 'Keyword is newly added for ranking tracking',
} as const;

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস আইকন
 */
export const SEO_RANKING_STATUS_ICONS: Record<SEORankingStatus, string> = {
  [SEO_RANKING_STATUS.TRACKING]: '🔍',
  [SEO_RANKING_STATUS.UPDATED]: '🔄',
  [SEO_RANKING_STATUS.IMPROVED]: '📈',
  [SEO_RANKING_STATUS.DECLINED]: '📉',
  [SEO_RANKING_STATUS.STABLE]: '📌',
  [SEO_RANKING_STATUS.NOT_RANKING]: '🚫',
  [SEO_RANKING_STATUS.NEW]: '✨',
} as const;

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস কালার (হেক্স কোড)
 */
export const SEO_RANKING_STATUS_COLORS: Record<SEORankingStatus, string> = {
  [SEO_RANKING_STATUS.TRACKING]: '#3b82f6', // Blue-500
  [SEO_RANKING_STATUS.UPDATED]: '#06b6d4', // Cyan-500
  [SEO_RANKING_STATUS.IMPROVED]: '#22c55e', // Green-500
  [SEO_RANKING_STATUS.DECLINED]: '#dc2626', // Red-600
  [SEO_RANKING_STATUS.STABLE]: '#8b5cf6', // Violet-500
  [SEO_RANKING_STATUS.NOT_RANKING]: '#94a3b8', // Slate-400
  [SEO_RANKING_STATUS.NEW]: '#f59e0b', // Amber-500
} as const;

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SEO_RANKING_STATUS_TRANSITIONS: Record<SEORankingStatus, SEORankingStatus[]> = {
  [SEO_RANKING_STATUS.NEW]: [SEO_RANKING_STATUS.TRACKING, SEO_RANKING_STATUS.NOT_RANKING],
  [SEO_RANKING_STATUS.TRACKING]: [SEO_RANKING_STATUS.UPDATED, SEO_RANKING_STATUS.NOT_RANKING],
  [SEO_RANKING_STATUS.UPDATED]: [
    SEO_RANKING_STATUS.IMPROVED,
    SEO_RANKING_STATUS.DECLINED,
    SEO_RANKING_STATUS.STABLE,
    SEO_RANKING_STATUS.NOT_RANKING,
  ],
  [SEO_RANKING_STATUS.IMPROVED]: [
    SEO_RANKING_STATUS.STABLE,
    SEO_RANKING_STATUS.DECLINED,
    SEO_RANKING_STATUS.UPDATED,
    SEO_RANKING_STATUS.NOT_RANKING,
  ],
  [SEO_RANKING_STATUS.DECLINED]: [
    SEO_RANKING_STATUS.IMPROVED,
    SEO_RANKING_STATUS.STABLE,
    SEO_RANKING_STATUS.UPDATED,
    SEO_RANKING_STATUS.NOT_RANKING,
  ],
  [SEO_RANKING_STATUS.STABLE]: [
    SEO_RANKING_STATUS.IMPROVED,
    SEO_RANKING_STATUS.DECLINED,
    SEO_RANKING_STATUS.UPDATED,
    SEO_RANKING_STATUS.NOT_RANKING,
  ],
  [SEO_RANKING_STATUS.NOT_RANKING]: [SEO_RANKING_STATUS.NEW, SEO_RANKING_STATUS.TRACKING],
} as const;

/**
 * SEO র‍্যাঙ্কিং স্ট্যাটাস কনফিগারেশন
 */
export interface SEORankingStatusConfig {
  status: SEORankingStatus;
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
 * SEO র‍্যাঙ্কিং স্ট্যাটাস মেটাডেটা
 */
export const SEO_RANKING_STATUS_METADATA: Record<SEORankingStatus, SEORankingStatusConfig> = {
  [SEO_RANKING_STATUS.NEW]: {
    status: SEO_RANKING_STATUS.NEW,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.NEW],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.NEW],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.NEW],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.NEW],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [SEO_RANKING_STATUS.TRACKING]: {
    status: SEO_RANKING_STATUS.TRACKING,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.TRACKING],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.TRACKING],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.TRACKING],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.TRACKING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [SEO_RANKING_STATUS.UPDATED]: {
    status: SEO_RANKING_STATUS.UPDATED,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.UPDATED],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.UPDATED],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.UPDATED],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.UPDATED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [SEO_RANKING_STATUS.IMPROVED]: {
    status: SEO_RANKING_STATUS.IMPROVED,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.IMPROVED],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.IMPROVED],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.IMPROVED],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.IMPROVED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 3,
  },
  [SEO_RANKING_STATUS.DECLINED]: {
    status: SEO_RANKING_STATUS.DECLINED,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.DECLINED],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.DECLINED],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.DECLINED],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.DECLINED],
    isTerminal: false,
    isError: true,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [SEO_RANKING_STATUS.STABLE]: {
    status: SEO_RANKING_STATUS.STABLE,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.STABLE],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.STABLE],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.STABLE],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.STABLE],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 5,
  },
  [SEO_RANKING_STATUS.NOT_RANKING]: {
    status: SEO_RANKING_STATUS.NOT_RANKING,
    label: SEO_RANKING_STATUS_LABELS[SEO_RANKING_STATUS.NOT_RANKING],
    description: SEO_RANKING_STATUS_DESCRIPTIONS[SEO_RANKING_STATUS.NOT_RANKING],
    icon: SEO_RANKING_STATUS_ICONS[SEO_RANKING_STATUS.NOT_RANKING],
    color: SEO_RANKING_STATUS_COLORS[SEO_RANKING_STATUS.NOT_RANKING],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const SEO_RANKING_TERMINAL_STATUSES = [SEO_RANKING_STATUS.NOT_RANKING] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const SEO_RANKING_SUCCESS_STATUSES = [
  SEO_RANKING_STATUS.UPDATED,
  SEO_RANKING_STATUS.IMPROVED,
  SEO_RANKING_STATUS.STABLE,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const SEO_RANKING_ERROR_STATUSES = [
  SEO_RANKING_STATUS.DECLINED,
  SEO_RANKING_STATUS.NOT_RANKING,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const SEO_RANKING_ACTIVE_STATUSES = [
  SEO_RANKING_STATUS.NEW,
  SEO_RANKING_STATUS.TRACKING,
  SEO_RANKING_STATUS.UPDATED,
  SEO_RANKING_STATUS.IMPROVED,
  SEO_RANKING_STATUS.DECLINED,
  SEO_RANKING_STATUS.STABLE,
] as const;
