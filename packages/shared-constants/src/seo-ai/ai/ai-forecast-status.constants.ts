/**
 * AI ফোরকাস্ট স্ট্যাটাস এনাম
 */
export const AI_FORECAST_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  UPDATING: 'updating',
  EXPIRED: 'expired',
} as const;

/**
 * AI_FORECAST_STATUS থেকে টাইপ
 */
export type AIForecastStatusType = (typeof AI_FORECAST_STATUS)[keyof typeof AI_FORECAST_STATUS];

/**
 * ফোরকাস্ট স্ট্যাটাস লেবেল
 */
export const AI_FORECAST_STATUS_LABELS: Record<AIForecastStatusType, string> = {
  [AI_FORECAST_STATUS.PENDING]: 'Pending',
  [AI_FORECAST_STATUS.GENERATING]: 'Generating',
  [AI_FORECAST_STATUS.COMPLETED]: 'Completed',
  [AI_FORECAST_STATUS.FAILED]: 'Failed',
  [AI_FORECAST_STATUS.UPDATING]: 'Updating',
  [AI_FORECAST_STATUS.EXPIRED]: 'Expired',
} as const;

/**
 * ফোরকাস্ট স্ট্যাটাস বিবরণ
 */
export const AI_FORECAST_STATUS_DESCRIPTIONS: Record<AIForecastStatusType, string> = {
  [AI_FORECAST_STATUS.PENDING]: 'Forecast is pending and waiting to start',
  [AI_FORECAST_STATUS.GENERATING]: 'Forecast is currently being generated',
  [AI_FORECAST_STATUS.COMPLETED]: 'Forecast has been completed successfully',
  [AI_FORECAST_STATUS.FAILED]: 'Forecast generation has failed',
  [AI_FORECAST_STATUS.UPDATING]: 'Forecast is being updated with new data',
  [AI_FORECAST_STATUS.EXPIRED]: 'Forecast has expired and needs regeneration',
} as const;

/**
 * ফোরকাস্ট স্ট্যাটাস আইকন
 */
export const AI_FORECAST_STATUS_ICONS: Record<AIForecastStatusType, string> = {
  [AI_FORECAST_STATUS.PENDING]: '⏳',
  [AI_FORECAST_STATUS.GENERATING]: '⚡',
  [AI_FORECAST_STATUS.COMPLETED]: '✅',
  [AI_FORECAST_STATUS.FAILED]: '❌',
  [AI_FORECAST_STATUS.UPDATING]: '🔄',
  [AI_FORECAST_STATUS.EXPIRED]: '⏰',
} as const;

/**
 * ফোরকাস্ট স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_FORECAST_STATUS_COLORS: Record<AIForecastStatusType, string> = {
  [AI_FORECAST_STATUS.PENDING]: '#f59e0b', // Amber-500
  [AI_FORECAST_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [AI_FORECAST_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_FORECAST_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_FORECAST_STATUS.UPDATING]: '#8b5cf6', // Violet-500
  [AI_FORECAST_STATUS.EXPIRED]: '#94a3b8', // Slate-400
} as const;

/**
 * ফোরকাস্ট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_FORECAST_STATUS_TRANSITIONS: Record<AIForecastStatusType, AIForecastStatusType[]> =
  {
    [AI_FORECAST_STATUS.PENDING]: [AI_FORECAST_STATUS.GENERATING, AI_FORECAST_STATUS.FAILED],
    [AI_FORECAST_STATUS.GENERATING]: [AI_FORECAST_STATUS.COMPLETED, AI_FORECAST_STATUS.FAILED],
    [AI_FORECAST_STATUS.COMPLETED]: [AI_FORECAST_STATUS.UPDATING, AI_FORECAST_STATUS.EXPIRED],
    [AI_FORECAST_STATUS.FAILED]: [AI_FORECAST_STATUS.PENDING],
    [AI_FORECAST_STATUS.UPDATING]: [
      AI_FORECAST_STATUS.COMPLETED,
      AI_FORECAST_STATUS.FAILED,
      AI_FORECAST_STATUS.EXPIRED,
    ],
    [AI_FORECAST_STATUS.EXPIRED]: [AI_FORECAST_STATUS.PENDING, AI_FORECAST_STATUS.GENERATING],
  } as const;

/**
 * ফোরকাস্ট স্ট্যাটাস কনফিগারেশন
 */
export interface AIForecastStatusConfig {
  status: AIForecastStatusType;
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
 * ফোরকাস্ট স্ট্যাটাস মেটাডেটা
 */
export const AI_FORECAST_STATUS_METADATA: Record<AIForecastStatusType, AIForecastStatusConfig> = {
  [AI_FORECAST_STATUS.PENDING]: {
    status: AI_FORECAST_STATUS.PENDING,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.PENDING],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.PENDING],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.PENDING],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.PENDING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [AI_FORECAST_STATUS.GENERATING]: {
    status: AI_FORECAST_STATUS.GENERATING,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.GENERATING],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.GENERATING],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.GENERATING],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.GENERATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [AI_FORECAST_STATUS.COMPLETED]: {
    status: AI_FORECAST_STATUS.COMPLETED,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.COMPLETED],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.COMPLETED],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.COMPLETED],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.COMPLETED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [AI_FORECAST_STATUS.FAILED]: {
    status: AI_FORECAST_STATUS.FAILED,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.FAILED],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.FAILED],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.FAILED],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 3,
  },
  [AI_FORECAST_STATUS.UPDATING]: {
    status: AI_FORECAST_STATUS.UPDATING,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.UPDATING],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.UPDATING],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.UPDATING],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [AI_FORECAST_STATUS.EXPIRED]: {
    status: AI_FORECAST_STATUS.EXPIRED,
    label: AI_FORECAST_STATUS_LABELS[AI_FORECAST_STATUS.EXPIRED],
    description: AI_FORECAST_STATUS_DESCRIPTIONS[AI_FORECAST_STATUS.EXPIRED],
    icon: AI_FORECAST_STATUS_ICONS[AI_FORECAST_STATUS.EXPIRED],
    color: AI_FORECAST_STATUS_COLORS[AI_FORECAST_STATUS.EXPIRED],
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
export const AI_FORECAST_TERMINAL_STATUSES = [
  AI_FORECAST_STATUS.FAILED,
  AI_FORECAST_STATUS.EXPIRED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_FORECAST_ERROR_STATUSES = [AI_FORECAST_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_FORECAST_SUCCESS_STATUSES = [AI_FORECAST_STATUS.COMPLETED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_FORECAST_ACTIVE_STATUSES = [
  AI_FORECAST_STATUS.PENDING,
  AI_FORECAST_STATUS.GENERATING,
  AI_FORECAST_STATUS.COMPLETED,
  AI_FORECAST_STATUS.UPDATING,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_FORECAST_INACTIVE_STATUSES = [
  AI_FORECAST_STATUS.FAILED,
  AI_FORECAST_STATUS.EXPIRED,
] as const;

/**
 * ফোরকাস্ট স্ট্যাটাস গ্রুপ
 */
export const AI_FORECAST_STATUS_GROUPS = {
  PROCESSING: [AI_FORECAST_STATUS.PENDING, AI_FORECAST_STATUS.GENERATING] as const,
  AVAILABLE: [AI_FORECAST_STATUS.COMPLETED] as const,
  MAINTENANCE: [AI_FORECAST_STATUS.UPDATING] as const,
  INVALID: [AI_FORECAST_STATUS.FAILED, AI_FORECAST_STATUS.EXPIRED] as const,
} as const;

/**
 * ফোরকাস্ট স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_FORECAST_STATUS_GROUP_LABELS = {
  PROCESSING: 'Processing',
  AVAILABLE: 'Available',
  MAINTENANCE: 'Maintenance',
  INVALID: 'Invalid',
} as const;
