/**
 * AI অ্যানালিটিক্স স্ট্যাটাস এনাম
 */
export const AI_ANALYTICS_STATUS = {
  COLLECTING: 'collecting',
  PROCESSING: 'processing',
  AGGREGATED: 'aggregated',
  ANALYZED: 'analyzed',
  REPORTED: 'reported',
  ERROR: 'error',
  PAUSED: 'paused',
} as const;

/**
 * AI_ANALYTICS_STATUS থেকে টাইপ
 */
export type AIAnalyticsStatus = (typeof AI_ANALYTICS_STATUS)[keyof typeof AI_ANALYTICS_STATUS];

/**
 * অ্যানালিটিক্স স্ট্যাটাস লেবেল
 */
export const AI_ANALYTICS_STATUS_LABELS: Record<AIAnalyticsStatus, string> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: 'Collecting',
  [AI_ANALYTICS_STATUS.PROCESSING]: 'Processing',
  [AI_ANALYTICS_STATUS.AGGREGATED]: 'Aggregated',
  [AI_ANALYTICS_STATUS.ANALYZED]: 'Analyzed',
  [AI_ANALYTICS_STATUS.REPORTED]: 'Reported',
  [AI_ANALYTICS_STATUS.ERROR]: 'Error',
  [AI_ANALYTICS_STATUS.PAUSED]: 'Paused',
} as const;

/**
 * অ্যানালিটিক্স স্ট্যাটাস বিবরণ
 */
export const AI_ANALYTICS_STATUS_DESCRIPTIONS: Record<AIAnalyticsStatus, string> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: 'Analytics data is being collected from various sources',
  [AI_ANALYTICS_STATUS.PROCESSING]: 'Analytics data is being processed and transformed',
  [AI_ANALYTICS_STATUS.AGGREGATED]: 'Analytics data has been aggregated and summarized',
  [AI_ANALYTICS_STATUS.ANALYZED]: 'Analytics data has been analyzed and interpreted',
  [AI_ANALYTICS_STATUS.REPORTED]: 'Analytics data has been reported and visualized',
  [AI_ANALYTICS_STATUS.ERROR]: 'Analytics system has encountered an error',
  [AI_ANALYTICS_STATUS.PAUSED]: 'Analytics data collection is temporarily paused',
} as const;

/**
 * অ্যানালিটিক্স স্ট্যাটাস আইকন
 */
export const AI_ANALYTICS_STATUS_ICONS: Record<AIAnalyticsStatus, string> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: '📥',
  [AI_ANALYTICS_STATUS.PROCESSING]: '⚙️',
  [AI_ANALYTICS_STATUS.AGGREGATED]: '📊',
  [AI_ANALYTICS_STATUS.ANALYZED]: '🔍',
  [AI_ANALYTICS_STATUS.REPORTED]: '📋',
  [AI_ANALYTICS_STATUS.ERROR]: '❌',
  [AI_ANALYTICS_STATUS.PAUSED]: '⏸️',
} as const;

/**
 * অ্যানালিটিক্স স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_ANALYTICS_STATUS_COLORS: Record<AIAnalyticsStatus, string> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: '#3b82f6', // Blue-500
  [AI_ANALYTICS_STATUS.PROCESSING]: '#8b5cf6', // Violet-500
  [AI_ANALYTICS_STATUS.AGGREGATED]: '#06b6d4', // Cyan-500
  [AI_ANALYTICS_STATUS.ANALYZED]: '#22c55e', // Green-500
  [AI_ANALYTICS_STATUS.REPORTED]: '#f59e0b', // Amber-500
  [AI_ANALYTICS_STATUS.ERROR]: '#dc2626', // Red-600
  [AI_ANALYTICS_STATUS.PAUSED]: '#94a3b8', // Slate-400
} as const;

/**
 * অ্যানালিটিক্স স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_ANALYTICS_STATUS_TRANSITIONS: Record<AIAnalyticsStatus, AIAnalyticsStatus[]> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: [
    AI_ANALYTICS_STATUS.PROCESSING,
    AI_ANALYTICS_STATUS.PAUSED,
    AI_ANALYTICS_STATUS.ERROR,
  ],
  [AI_ANALYTICS_STATUS.PROCESSING]: [
    AI_ANALYTICS_STATUS.AGGREGATED,
    AI_ANALYTICS_STATUS.ERROR,
    AI_ANALYTICS_STATUS.PAUSED,
  ],
  [AI_ANALYTICS_STATUS.AGGREGATED]: [
    AI_ANALYTICS_STATUS.ANALYZED,
    AI_ANALYTICS_STATUS.ERROR,
    AI_ANALYTICS_STATUS.PAUSED,
  ],
  [AI_ANALYTICS_STATUS.ANALYZED]: [AI_ANALYTICS_STATUS.REPORTED, AI_ANALYTICS_STATUS.ERROR],
  [AI_ANALYTICS_STATUS.REPORTED]: [AI_ANALYTICS_STATUS.COLLECTING, AI_ANALYTICS_STATUS.PAUSED],
  [AI_ANALYTICS_STATUS.ERROR]: [AI_ANALYTICS_STATUS.COLLECTING, AI_ANALYTICS_STATUS.PAUSED],
  [AI_ANALYTICS_STATUS.PAUSED]: [
    AI_ANALYTICS_STATUS.COLLECTING,
    AI_ANALYTICS_STATUS.PROCESSING,
    AI_ANALYTICS_STATUS.ERROR,
  ],
} as const;

/**
 * অ্যানালিটিক্স স্ট্যাটাস কনফিগারেশন
 */
export interface AIAnalyticsStatusConfig {
  status: AIAnalyticsStatus;
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
 * অ্যানালিটিক্স স্ট্যাটাস মেটাডেটা
 */
export const AI_ANALYTICS_STATUS_METADATA: Record<AIAnalyticsStatus, AIAnalyticsStatusConfig> = {
  [AI_ANALYTICS_STATUS.COLLECTING]: {
    status: AI_ANALYTICS_STATUS.COLLECTING,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.COLLECTING],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.COLLECTING],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.COLLECTING],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.COLLECTING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 0,
  },
  [AI_ANALYTICS_STATUS.PROCESSING]: {
    status: AI_ANALYTICS_STATUS.PROCESSING,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.PROCESSING],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.PROCESSING],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.PROCESSING],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.PROCESSING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 1,
  },
  [AI_ANALYTICS_STATUS.AGGREGATED]: {
    status: AI_ANALYTICS_STATUS.AGGREGATED,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.AGGREGATED],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.AGGREGATED],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.AGGREGATED],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.AGGREGATED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 2,
  },
  [AI_ANALYTICS_STATUS.ANALYZED]: {
    status: AI_ANALYTICS_STATUS.ANALYZED,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.ANALYZED],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.ANALYZED],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.ANALYZED],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.ANALYZED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    order: 3,
  },
  [AI_ANALYTICS_STATUS.REPORTED]: {
    status: AI_ANALYTICS_STATUS.REPORTED,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.REPORTED],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.REPORTED],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.REPORTED],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.REPORTED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    order: 4,
  },
  [AI_ANALYTICS_STATUS.ERROR]: {
    status: AI_ANALYTICS_STATUS.ERROR,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.ERROR],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.ERROR],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.ERROR],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.ERROR],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    order: 5,
  },
  [AI_ANALYTICS_STATUS.PAUSED]: {
    status: AI_ANALYTICS_STATUS.PAUSED,
    label: AI_ANALYTICS_STATUS_LABELS[AI_ANALYTICS_STATUS.PAUSED],
    description: AI_ANALYTICS_STATUS_DESCRIPTIONS[AI_ANALYTICS_STATUS.PAUSED],
    icon: AI_ANALYTICS_STATUS_ICONS[AI_ANALYTICS_STATUS.PAUSED],
    color: AI_ANALYTICS_STATUS_COLORS[AI_ANALYTICS_STATUS.PAUSED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_ANALYTICS_TERMINAL_STATUSES = [
  AI_ANALYTICS_STATUS.REPORTED,
  AI_ANALYTICS_STATUS.ERROR,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_ANALYTICS_ERROR_STATUSES = [AI_ANALYTICS_STATUS.ERROR] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_ANALYTICS_SUCCESS_STATUSES = [
  AI_ANALYTICS_STATUS.ANALYZED,
  AI_ANALYTICS_STATUS.REPORTED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_ANALYTICS_ACTIVE_STATUSES = [
  AI_ANALYTICS_STATUS.COLLECTING,
  AI_ANALYTICS_STATUS.PROCESSING,
  AI_ANALYTICS_STATUS.AGGREGATED,
  AI_ANALYTICS_STATUS.ANALYZED,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_ANALYTICS_INACTIVE_STATUSES = [
  AI_ANALYTICS_STATUS.REPORTED,
  AI_ANALYTICS_STATUS.ERROR,
  AI_ANALYTICS_STATUS.PAUSED,
] as const;
