/**
 * AI র্যাঙ্কিং স্ট্যাটাস এনাম
 */
export const AI_RANKING_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  PARTIAL: 'partial',
  STALE: 'stale',
  UPDATING: 'updating',
} as const;

/**
 * AI_RANKING_STATUS থেকে টাইপ
 */
export type AIRankingStatus = (typeof AI_RANKING_STATUS)[keyof typeof AI_RANKING_STATUS];

/**
 * র্যাঙ্কিং স্ট্যাটাস লেবেল
 */
export const AI_RANKING_STATUS_LABELS: Record<AIRankingStatus, string> = {
  [AI_RANKING_STATUS.PENDING]: 'Pending',
  [AI_RANKING_STATUS.PROCESSING]: 'Processing',
  [AI_RANKING_STATUS.COMPLETED]: 'Completed',
  [AI_RANKING_STATUS.FAILED]: 'Failed',
  [AI_RANKING_STATUS.PARTIAL]: 'Partial',
  [AI_RANKING_STATUS.STALE]: 'Stale',
  [AI_RANKING_STATUS.UPDATING]: 'Updating',
} as const;

/**
 * র্যাঙ্কিং স্ট্যাটাস বিবরণ
 */
export const AI_RANKING_STATUS_DESCRIPTIONS: Record<AIRankingStatus, string> = {
  [AI_RANKING_STATUS.PENDING]: 'Ranking request is waiting to be processed',
  [AI_RANKING_STATUS.PROCESSING]: 'Ranking is currently being computed',
  [AI_RANKING_STATUS.COMPLETED]: 'Ranking has been successfully completed',
  [AI_RANKING_STATUS.FAILED]: 'Ranking has failed due to an error',
  [AI_RANKING_STATUS.PARTIAL]: 'Ranking completed but only partial results available',
  [AI_RANKING_STATUS.STALE]: 'Ranking results are stale and need refresh',
  [AI_RANKING_STATUS.UPDATING]: 'Ranking is being updated with new data',
} as const;

/**
 * র্যাঙ্কিং স্ট্যাটাস আইকন
 */
export const AI_RANKING_STATUS_ICONS: Record<AIRankingStatus, string> = {
  [AI_RANKING_STATUS.PENDING]: '⏳',
  [AI_RANKING_STATUS.PROCESSING]: '🔄',
  [AI_RANKING_STATUS.COMPLETED]: '✅',
  [AI_RANKING_STATUS.FAILED]: '❌',
  [AI_RANKING_STATUS.PARTIAL]: '⚠️',
  [AI_RANKING_STATUS.STALE]: '🕐',
  [AI_RANKING_STATUS.UPDATING]: '📥',
} as const;

/**
 * র্যাঙ্কিং স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_RANKING_STATUS_COLORS: Record<AIRankingStatus, string> = {
  [AI_RANKING_STATUS.PENDING]: '#f59e0b', // Amber-500
  [AI_RANKING_STATUS.PROCESSING]: '#3b82f6', // Blue-500
  [AI_RANKING_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_RANKING_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_RANKING_STATUS.PARTIAL]: '#8b5cf6', // Violet-500
  [AI_RANKING_STATUS.STALE]: '#94a3b8', // Slate-400
  [AI_RANKING_STATUS.UPDATING]: '#06b6d4', // Cyan-500
} as const;

/**
 * র্যাঙ্কিং স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_RANKING_STATUS_TRANSITIONS: Record<AIRankingStatus, AIRankingStatus[]> = {
  [AI_RANKING_STATUS.PENDING]: [
    AI_RANKING_STATUS.PROCESSING,
    AI_RANKING_STATUS.COMPLETED,
    AI_RANKING_STATUS.FAILED,
  ],
  [AI_RANKING_STATUS.PROCESSING]: [
    AI_RANKING_STATUS.COMPLETED,
    AI_RANKING_STATUS.PARTIAL,
    AI_RANKING_STATUS.FAILED,
  ],
  [AI_RANKING_STATUS.COMPLETED]: [AI_RANKING_STATUS.STALE, AI_RANKING_STATUS.UPDATING],
  [AI_RANKING_STATUS.FAILED]: [AI_RANKING_STATUS.PENDING],
  [AI_RANKING_STATUS.PARTIAL]: [AI_RANKING_STATUS.COMPLETED, AI_RANKING_STATUS.FAILED],
  [AI_RANKING_STATUS.STALE]: [AI_RANKING_STATUS.UPDATING],
  [AI_RANKING_STATUS.UPDATING]: [
    AI_RANKING_STATUS.COMPLETED,
    AI_RANKING_STATUS.FAILED,
    AI_RANKING_STATUS.PARTIAL,
  ],
} as const;

/**
 * র্যাঙ্কিং স্ট্যাটাস কনফিগারেশন
 */
export interface AIRankingStatusConfig {
  status: AIRankingStatus;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  order: number;
}

/**
 * র্যাঙ্কিং স্ট্যাটাস মেটাডেটা
 */
export const AI_RANKING_STATUS_METADATA: Record<AIRankingStatus, AIRankingStatusConfig> = {
  [AI_RANKING_STATUS.PENDING]: {
    status: AI_RANKING_STATUS.PENDING,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.PENDING],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.PENDING],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.PENDING],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.PENDING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 0,
  },
  [AI_RANKING_STATUS.PROCESSING]: {
    status: AI_RANKING_STATUS.PROCESSING,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.PROCESSING],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.PROCESSING],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.PROCESSING],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.PROCESSING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 1,
  },
  [AI_RANKING_STATUS.COMPLETED]: {
    status: AI_RANKING_STATUS.COMPLETED,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.COMPLETED],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.COMPLETED],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.COMPLETED],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.COMPLETED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    order: 2,
  },
  [AI_RANKING_STATUS.FAILED]: {
    status: AI_RANKING_STATUS.FAILED,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.FAILED],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.FAILED],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.FAILED],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    order: 3,
  },
  [AI_RANKING_STATUS.PARTIAL]: {
    status: AI_RANKING_STATUS.PARTIAL,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.PARTIAL],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.PARTIAL],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.PARTIAL],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.PARTIAL],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    order: 4,
  },
  [AI_RANKING_STATUS.STALE]: {
    status: AI_RANKING_STATUS.STALE,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.STALE],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.STALE],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.STALE],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.STALE],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    order: 5,
  },
  [AI_RANKING_STATUS.UPDATING]: {
    status: AI_RANKING_STATUS.UPDATING,
    label: AI_RANKING_STATUS_LABELS[AI_RANKING_STATUS.UPDATING],
    description: AI_RANKING_STATUS_DESCRIPTIONS[AI_RANKING_STATUS.UPDATING],
    icon: AI_RANKING_STATUS_ICONS[AI_RANKING_STATUS.UPDATING],
    color: AI_RANKING_STATUS_COLORS[AI_RANKING_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_RANKING_TERMINAL_STATUSES = [
  AI_RANKING_STATUS.COMPLETED,
  AI_RANKING_STATUS.FAILED,
  AI_RANKING_STATUS.PARTIAL,
  AI_RANKING_STATUS.STALE,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_RANKING_ERROR_STATUSES = [AI_RANKING_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_RANKING_SUCCESS_STATUSES = [
  AI_RANKING_STATUS.COMPLETED,
  AI_RANKING_STATUS.PARTIAL,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_RANKING_ACTIVE_STATUSES = [
  AI_RANKING_STATUS.PENDING,
  AI_RANKING_STATUS.PROCESSING,
  AI_RANKING_STATUS.UPDATING,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_RANKING_INACTIVE_STATUSES = [
  AI_RANKING_STATUS.COMPLETED,
  AI_RANKING_STATUS.FAILED,
  AI_RANKING_STATUS.PARTIAL,
  AI_RANKING_STATUS.STALE,
] as const;
