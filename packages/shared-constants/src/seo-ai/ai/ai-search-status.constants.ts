/**
 * AI সার্চ স্ট্যাটাস এনাম
 */
export const AI_SEARCH_STATUS = {
  INITIATED: 'initiated',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  PARTIAL: 'partial',
  FAILED: 'failed',
  TIMEOUT: 'timeout',
  CACHED: 'cached',
} as const;

/**
 * AI_SEARCH_STATUS থেকে টাইপ
 */
export type AISearchStatus = (typeof AI_SEARCH_STATUS)[keyof typeof AI_SEARCH_STATUS];

/**
 * সার্চ স্ট্যাটাস লেবেল
 */
export const AI_SEARCH_STATUS_LABELS: Record<AISearchStatus, string> = {
  [AI_SEARCH_STATUS.INITIATED]: 'Initiated',
  [AI_SEARCH_STATUS.PROCESSING]: 'Processing',
  [AI_SEARCH_STATUS.COMPLETED]: 'Completed',
  [AI_SEARCH_STATUS.PARTIAL]: 'Partial',
  [AI_SEARCH_STATUS.FAILED]: 'Failed',
  [AI_SEARCH_STATUS.TIMEOUT]: 'Timeout',
  [AI_SEARCH_STATUS.CACHED]: 'Cached',
} as const;

/**
 * সার্চ স্ট্যাটাস বিবরণ
 */
export const AI_SEARCH_STATUS_DESCRIPTIONS: Record<AISearchStatus, string> = {
  [AI_SEARCH_STATUS.INITIATED]: 'Search request has been initiated and is waiting to start',
  [AI_SEARCH_STATUS.PROCESSING]: 'Search is actively processing the query',
  [AI_SEARCH_STATUS.COMPLETED]: 'Search has completed successfully with full results',
  [AI_SEARCH_STATUS.PARTIAL]: 'Search completed but only partial results are available',
  [AI_SEARCH_STATUS.FAILED]: 'Search has failed due to an error',
  [AI_SEARCH_STATUS.TIMEOUT]: 'Search has timed out due to processing duration exceeding limit',
  [AI_SEARCH_STATUS.CACHED]: 'Search results are served from cache',
} as const;

/**
 * সার্চ স্ট্যাটাস আইকন
 */
export const AI_SEARCH_STATUS_ICONS: Record<AISearchStatus, string> = {
  [AI_SEARCH_STATUS.INITIATED]: '🚀',
  [AI_SEARCH_STATUS.PROCESSING]: '⏳',
  [AI_SEARCH_STATUS.COMPLETED]: '✅',
  [AI_SEARCH_STATUS.PARTIAL]: '⚠️',
  [AI_SEARCH_STATUS.FAILED]: '❌',
  [AI_SEARCH_STATUS.TIMEOUT]: '⌛',
  [AI_SEARCH_STATUS.CACHED]: '💾',
} as const;

/**
 * সার্চ স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_SEARCH_STATUS_COLORS: Record<AISearchStatus, string> = {
  [AI_SEARCH_STATUS.INITIATED]: '#3b82f6', // Blue-500
  [AI_SEARCH_STATUS.PROCESSING]: '#8b5cf6', // Violet-500
  [AI_SEARCH_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_SEARCH_STATUS.PARTIAL]: '#f59e0b', // Amber-500
  [AI_SEARCH_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_SEARCH_STATUS.TIMEOUT]: '#ef4444', // Red-500
  [AI_SEARCH_STATUS.CACHED]: '#06b6d4', // Cyan-500
} as const;

/**
 * সার্চ স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_SEARCH_STATUS_TRANSITIONS: Record<AISearchStatus, AISearchStatus[]> = {
  [AI_SEARCH_STATUS.INITIATED]: [
    AI_SEARCH_STATUS.PROCESSING,
    AI_SEARCH_STATUS.COMPLETED,
    AI_SEARCH_STATUS.FAILED,
  ],
  [AI_SEARCH_STATUS.PROCESSING]: [
    AI_SEARCH_STATUS.COMPLETED,
    AI_SEARCH_STATUS.PARTIAL,
    AI_SEARCH_STATUS.FAILED,
    AI_SEARCH_STATUS.TIMEOUT,
  ],
  [AI_SEARCH_STATUS.COMPLETED]: [AI_SEARCH_STATUS.CACHED],
  [AI_SEARCH_STATUS.PARTIAL]: [AI_SEARCH_STATUS.COMPLETED, AI_SEARCH_STATUS.FAILED],
  [AI_SEARCH_STATUS.FAILED]: [AI_SEARCH_STATUS.INITIATED],
  [AI_SEARCH_STATUS.TIMEOUT]: [AI_SEARCH_STATUS.INITIATED],
  [AI_SEARCH_STATUS.CACHED]: [AI_SEARCH_STATUS.COMPLETED],
} as const;

/**
 * সার্চ স্ট্যাটাস কনফিগারেশন
 */
export interface AISearchStatusConfig {
  status: AISearchStatus;
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
 * সার্চ স্ট্যাটাস মেটাডেটা
 */
export const AI_SEARCH_STATUS_METADATA: Record<AISearchStatus, AISearchStatusConfig> = {
  [AI_SEARCH_STATUS.INITIATED]: {
    status: AI_SEARCH_STATUS.INITIATED,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.INITIATED],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.INITIATED],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.INITIATED],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.INITIATED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 0,
  },
  [AI_SEARCH_STATUS.PROCESSING]: {
    status: AI_SEARCH_STATUS.PROCESSING,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.PROCESSING],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.PROCESSING],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.PROCESSING],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.PROCESSING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 1,
  },
  [AI_SEARCH_STATUS.COMPLETED]: {
    status: AI_SEARCH_STATUS.COMPLETED,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.COMPLETED],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.COMPLETED],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.COMPLETED],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.COMPLETED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    order: 2,
  },
  [AI_SEARCH_STATUS.PARTIAL]: {
    status: AI_SEARCH_STATUS.PARTIAL,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.PARTIAL],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.PARTIAL],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.PARTIAL],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.PARTIAL],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    order: 3,
  },
  [AI_SEARCH_STATUS.FAILED]: {
    status: AI_SEARCH_STATUS.FAILED,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.FAILED],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.FAILED],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.FAILED],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    order: 4,
  },
  [AI_SEARCH_STATUS.TIMEOUT]: {
    status: AI_SEARCH_STATUS.TIMEOUT,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.TIMEOUT],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.TIMEOUT],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.TIMEOUT],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.TIMEOUT],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    order: 5,
  },
  [AI_SEARCH_STATUS.CACHED]: {
    status: AI_SEARCH_STATUS.CACHED,
    label: AI_SEARCH_STATUS_LABELS[AI_SEARCH_STATUS.CACHED],
    description: AI_SEARCH_STATUS_DESCRIPTIONS[AI_SEARCH_STATUS.CACHED],
    icon: AI_SEARCH_STATUS_ICONS[AI_SEARCH_STATUS.CACHED],
    color: AI_SEARCH_STATUS_COLORS[AI_SEARCH_STATUS.CACHED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_SEARCH_TERMINAL_STATUSES = [
  AI_SEARCH_STATUS.COMPLETED,
  AI_SEARCH_STATUS.PARTIAL,
  AI_SEARCH_STATUS.FAILED,
  AI_SEARCH_STATUS.TIMEOUT,
  AI_SEARCH_STATUS.CACHED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_SEARCH_ERROR_STATUSES = [
  AI_SEARCH_STATUS.FAILED,
  AI_SEARCH_STATUS.TIMEOUT,
] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_SEARCH_SUCCESS_STATUSES = [
  AI_SEARCH_STATUS.COMPLETED,
  AI_SEARCH_STATUS.CACHED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_SEARCH_ACTIVE_STATUSES = [
  AI_SEARCH_STATUS.INITIATED,
  AI_SEARCH_STATUS.PROCESSING,
] as const;

/**
 * পার্শিয়াল স্ট্যাটাসের তালিকা
 */
export const AI_SEARCH_PARTIAL_STATUSES = [AI_SEARCH_STATUS.PARTIAL] as const;
