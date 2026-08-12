/**
 * AI সিমিলারিটি স্ট্যাটাস এনাম
 */
export const AI_SIMILARITY_STATUS = {
  CALCULATING: 'calculating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CACHED: 'cached',
  STALE: 'stale',
} as const;

/**
 * AI_SIMILARITY_STATUS থেকে টাইপ
 */
export type AISimilarityStatusType =
  (typeof AI_SIMILARITY_STATUS)[keyof typeof AI_SIMILARITY_STATUS];

/**
 * সিমিলারিটি স্ট্যাটাস লেবেল
 */
export const AI_SIMILARITY_STATUS_LABELS: Record<AISimilarityStatusType, string> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: 'Calculating',
  [AI_SIMILARITY_STATUS.COMPLETED]: 'Completed',
  [AI_SIMILARITY_STATUS.FAILED]: 'Failed',
  [AI_SIMILARITY_STATUS.CACHED]: 'Cached',
  [AI_SIMILARITY_STATUS.STALE]: 'Stale',
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস বিবরণ
 */
export const AI_SIMILARITY_STATUS_DESCRIPTIONS: Record<AISimilarityStatusType, string> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: 'Similarity calculation is in progress',
  [AI_SIMILARITY_STATUS.COMPLETED]: 'Similarity calculation has been completed successfully',
  [AI_SIMILARITY_STATUS.FAILED]: 'Similarity calculation has failed',
  [AI_SIMILARITY_STATUS.CACHED]: 'Similarity result is cached and available',
  [AI_SIMILARITY_STATUS.STALE]: 'Similarity result is stale and needs recalculation',
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস আইকন
 */
export const AI_SIMILARITY_STATUS_ICONS: Record<AISimilarityStatusType, string> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: '⏳',
  [AI_SIMILARITY_STATUS.COMPLETED]: '✅',
  [AI_SIMILARITY_STATUS.FAILED]: '❌',
  [AI_SIMILARITY_STATUS.CACHED]: '💾',
  [AI_SIMILARITY_STATUS.STALE]: '🕐',
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_SIMILARITY_STATUS_COLORS: Record<AISimilarityStatusType, string> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: '#3b82f6', // Blue-500
  [AI_SIMILARITY_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_SIMILARITY_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_SIMILARITY_STATUS.CACHED]: '#8b5cf6', // Violet-500
  [AI_SIMILARITY_STATUS.STALE]: '#94a3b8', // Slate-400
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_SIMILARITY_STATUS_TRANSITIONS: Record<
  AISimilarityStatusType,
  AISimilarityStatusType[]
> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: [
    AI_SIMILARITY_STATUS.COMPLETED,
    AI_SIMILARITY_STATUS.FAILED,
    AI_SIMILARITY_STATUS.CACHED,
  ],
  [AI_SIMILARITY_STATUS.COMPLETED]: [AI_SIMILARITY_STATUS.CACHED, AI_SIMILARITY_STATUS.STALE],
  [AI_SIMILARITY_STATUS.FAILED]: [AI_SIMILARITY_STATUS.CALCULATING],
  [AI_SIMILARITY_STATUS.CACHED]: [AI_SIMILARITY_STATUS.COMPLETED, AI_SIMILARITY_STATUS.STALE],
  [AI_SIMILARITY_STATUS.STALE]: [AI_SIMILARITY_STATUS.CALCULATING, AI_SIMILARITY_STATUS.COMPLETED],
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস কনফিগারেশন
 */
export interface AISimilarityStatusConfig {
  status: AISimilarityStatusType;
  label: string;
  description: string;
  icon: string;
  color: string;
  isTerminal: boolean;
  isError: boolean;
  isSuccess: boolean;
  isAvailable: boolean;
  order: number;
}

/**
 * সিমিলারিটি স্ট্যাটাস মেটাডেটা
 */
export const AI_SIMILARITY_STATUS_METADATA: Record<
  AISimilarityStatusType,
  AISimilarityStatusConfig
> = {
  [AI_SIMILARITY_STATUS.CALCULATING]: {
    status: AI_SIMILARITY_STATUS.CALCULATING,
    label: AI_SIMILARITY_STATUS_LABELS[AI_SIMILARITY_STATUS.CALCULATING],
    description: AI_SIMILARITY_STATUS_DESCRIPTIONS[AI_SIMILARITY_STATUS.CALCULATING],
    icon: AI_SIMILARITY_STATUS_ICONS[AI_SIMILARITY_STATUS.CALCULATING],
    color: AI_SIMILARITY_STATUS_COLORS[AI_SIMILARITY_STATUS.CALCULATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isAvailable: false,
    order: 0,
  },
  [AI_SIMILARITY_STATUS.COMPLETED]: {
    status: AI_SIMILARITY_STATUS.COMPLETED,
    label: AI_SIMILARITY_STATUS_LABELS[AI_SIMILARITY_STATUS.COMPLETED],
    description: AI_SIMILARITY_STATUS_DESCRIPTIONS[AI_SIMILARITY_STATUS.COMPLETED],
    icon: AI_SIMILARITY_STATUS_ICONS[AI_SIMILARITY_STATUS.COMPLETED],
    color: AI_SIMILARITY_STATUS_COLORS[AI_SIMILARITY_STATUS.COMPLETED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isAvailable: true,
    order: 1,
  },
  [AI_SIMILARITY_STATUS.FAILED]: {
    status: AI_SIMILARITY_STATUS.FAILED,
    label: AI_SIMILARITY_STATUS_LABELS[AI_SIMILARITY_STATUS.FAILED],
    description: AI_SIMILARITY_STATUS_DESCRIPTIONS[AI_SIMILARITY_STATUS.FAILED],
    icon: AI_SIMILARITY_STATUS_ICONS[AI_SIMILARITY_STATUS.FAILED],
    color: AI_SIMILARITY_STATUS_COLORS[AI_SIMILARITY_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isAvailable: false,
    order: 2,
  },
  [AI_SIMILARITY_STATUS.CACHED]: {
    status: AI_SIMILARITY_STATUS.CACHED,
    label: AI_SIMILARITY_STATUS_LABELS[AI_SIMILARITY_STATUS.CACHED],
    description: AI_SIMILARITY_STATUS_DESCRIPTIONS[AI_SIMILARITY_STATUS.CACHED],
    icon: AI_SIMILARITY_STATUS_ICONS[AI_SIMILARITY_STATUS.CACHED],
    color: AI_SIMILARITY_STATUS_COLORS[AI_SIMILARITY_STATUS.CACHED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isAvailable: true,
    order: 3,
  },
  [AI_SIMILARITY_STATUS.STALE]: {
    status: AI_SIMILARITY_STATUS.STALE,
    label: AI_SIMILARITY_STATUS_LABELS[AI_SIMILARITY_STATUS.STALE],
    description: AI_SIMILARITY_STATUS_DESCRIPTIONS[AI_SIMILARITY_STATUS.STALE],
    icon: AI_SIMILARITY_STATUS_ICONS[AI_SIMILARITY_STATUS.STALE],
    color: AI_SIMILARITY_STATUS_COLORS[AI_SIMILARITY_STATUS.STALE],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isAvailable: false,
    order: 4,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_SIMILARITY_TERMINAL_STATUSES = [AI_SIMILARITY_STATUS.FAILED] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_SIMILARITY_ERROR_STATUSES = [AI_SIMILARITY_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_SIMILARITY_SUCCESS_STATUSES = [
  AI_SIMILARITY_STATUS.COMPLETED,
  AI_SIMILARITY_STATUS.CACHED,
] as const;

/**
 * উপলব্ধ স্ট্যাটাসের তালিকা
 */
export const AI_SIMILARITY_AVAILABLE_STATUSES = [
  AI_SIMILARITY_STATUS.COMPLETED,
  AI_SIMILARITY_STATUS.CACHED,
] as const;

/**
 * সিমিলারিটি স্ট্যাটাস গ্রুপ
 */
export const AI_SIMILARITY_STATUS_GROUPS = {
  PROCESSING: [AI_SIMILARITY_STATUS.CALCULATING] as const,
  AVAILABLE: [AI_SIMILARITY_STATUS.COMPLETED, AI_SIMILARITY_STATUS.CACHED] as const,
  INVALID: [AI_SIMILARITY_STATUS.FAILED, AI_SIMILARITY_STATUS.STALE] as const,
} as const;

/**
 * সিমিলারিটি স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_SIMILARITY_STATUS_GROUP_LABELS = {
  PROCESSING: 'Processing',
  AVAILABLE: 'Available',
  INVALID: 'Invalid',
} as const;
