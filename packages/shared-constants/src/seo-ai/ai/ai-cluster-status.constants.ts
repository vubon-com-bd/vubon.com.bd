/**
 * AI ক্লাস্টার স্ট্যাটাস এনাম
 */
export const AI_CLUSTER_STATUS = {
  INITIALIZED: 'initialized',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  UPDATING: 'updating',
  OPTIMIZED: 'optimized',
} as const;

/**
 * AI_CLUSTER_STATUS থেকে টাইপ
 */
export type AIClusterStatusType = (typeof AI_CLUSTER_STATUS)[keyof typeof AI_CLUSTER_STATUS];

/**
 * ক্লাস্টার স্ট্যাটাস লেবেল
 */
export const AI_CLUSTER_STATUS_LABELS: Record<AIClusterStatusType, string> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: 'Initialized',
  [AI_CLUSTER_STATUS.PROCESSING]: 'Processing',
  [AI_CLUSTER_STATUS.COMPLETED]: 'Completed',
  [AI_CLUSTER_STATUS.FAILED]: 'Failed',
  [AI_CLUSTER_STATUS.UPDATING]: 'Updating',
  [AI_CLUSTER_STATUS.OPTIMIZED]: 'Optimized',
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস বিবরণ
 */
export const AI_CLUSTER_STATUS_DESCRIPTIONS: Record<AIClusterStatusType, string> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: 'Cluster has been initialized and ready for processing',
  [AI_CLUSTER_STATUS.PROCESSING]: 'Cluster is currently being processed',
  [AI_CLUSTER_STATUS.COMPLETED]: 'Cluster has been completed successfully',
  [AI_CLUSTER_STATUS.FAILED]: 'Cluster processing has failed',
  [AI_CLUSTER_STATUS.UPDATING]: 'Cluster is being updated with new data',
  [AI_CLUSTER_STATUS.OPTIMIZED]: 'Cluster has been optimized for performance',
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস আইকন
 */
export const AI_CLUSTER_STATUS_ICONS: Record<AIClusterStatusType, string> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: '📝',
  [AI_CLUSTER_STATUS.PROCESSING]: '⚙️',
  [AI_CLUSTER_STATUS.COMPLETED]: '✅',
  [AI_CLUSTER_STATUS.FAILED]: '❌',
  [AI_CLUSTER_STATUS.UPDATING]: '🔄',
  [AI_CLUSTER_STATUS.OPTIMIZED]: '⚡',
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_CLUSTER_STATUS_COLORS: Record<AIClusterStatusType, string> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: '#3b82f6', // Blue-500
  [AI_CLUSTER_STATUS.PROCESSING]: '#8b5cf6', // Violet-500
  [AI_CLUSTER_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_CLUSTER_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_CLUSTER_STATUS.UPDATING]: '#f59e0b', // Amber-500
  [AI_CLUSTER_STATUS.OPTIMIZED]: '#06b6d4', // Cyan-500
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_CLUSTER_STATUS_TRANSITIONS: Record<AIClusterStatusType, AIClusterStatusType[]> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: [AI_CLUSTER_STATUS.PROCESSING, AI_CLUSTER_STATUS.FAILED],
  [AI_CLUSTER_STATUS.PROCESSING]: [
    AI_CLUSTER_STATUS.COMPLETED,
    AI_CLUSTER_STATUS.FAILED,
    AI_CLUSTER_STATUS.OPTIMIZED,
  ],
  [AI_CLUSTER_STATUS.COMPLETED]: [
    AI_CLUSTER_STATUS.UPDATING,
    AI_CLUSTER_STATUS.OPTIMIZED,
    AI_CLUSTER_STATUS.FAILED,
  ],
  [AI_CLUSTER_STATUS.FAILED]: [AI_CLUSTER_STATUS.INITIALIZED, AI_CLUSTER_STATUS.PROCESSING],
  [AI_CLUSTER_STATUS.UPDATING]: [
    AI_CLUSTER_STATUS.COMPLETED,
    AI_CLUSTER_STATUS.OPTIMIZED,
    AI_CLUSTER_STATUS.FAILED,
  ],
  [AI_CLUSTER_STATUS.OPTIMIZED]: [
    AI_CLUSTER_STATUS.COMPLETED,
    AI_CLUSTER_STATUS.UPDATING,
    AI_CLUSTER_STATUS.FAILED,
  ],
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস কনফিগারেশন
 */
export interface AIClusterStatusConfig {
  status: AIClusterStatusType;
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
 * ক্লাস্টার স্ট্যাটাস মেটাডেটা
 */
export const AI_CLUSTER_STATUS_METADATA: Record<AIClusterStatusType, AIClusterStatusConfig> = {
  [AI_CLUSTER_STATUS.INITIALIZED]: {
    status: AI_CLUSTER_STATUS.INITIALIZED,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.INITIALIZED],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.INITIALIZED],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.INITIALIZED],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.INITIALIZED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [AI_CLUSTER_STATUS.PROCESSING]: {
    status: AI_CLUSTER_STATUS.PROCESSING,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.PROCESSING],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.PROCESSING],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.PROCESSING],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.PROCESSING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [AI_CLUSTER_STATUS.COMPLETED]: {
    status: AI_CLUSTER_STATUS.COMPLETED,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.COMPLETED],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.COMPLETED],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.COMPLETED],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.COMPLETED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [AI_CLUSTER_STATUS.FAILED]: {
    status: AI_CLUSTER_STATUS.FAILED,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.FAILED],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.FAILED],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.FAILED],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 3,
  },
  [AI_CLUSTER_STATUS.UPDATING]: {
    status: AI_CLUSTER_STATUS.UPDATING,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.UPDATING],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.UPDATING],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.UPDATING],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [AI_CLUSTER_STATUS.OPTIMIZED]: {
    status: AI_CLUSTER_STATUS.OPTIMIZED,
    label: AI_CLUSTER_STATUS_LABELS[AI_CLUSTER_STATUS.OPTIMIZED],
    description: AI_CLUSTER_STATUS_DESCRIPTIONS[AI_CLUSTER_STATUS.OPTIMIZED],
    icon: AI_CLUSTER_STATUS_ICONS[AI_CLUSTER_STATUS.OPTIMIZED],
    color: AI_CLUSTER_STATUS_COLORS[AI_CLUSTER_STATUS.OPTIMIZED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 5,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_CLUSTER_TERMINAL_STATUSES = [AI_CLUSTER_STATUS.FAILED] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_CLUSTER_ERROR_STATUSES = [AI_CLUSTER_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_CLUSTER_SUCCESS_STATUSES = [
  AI_CLUSTER_STATUS.COMPLETED,
  AI_CLUSTER_STATUS.OPTIMIZED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_CLUSTER_ACTIVE_STATUSES = [
  AI_CLUSTER_STATUS.INITIALIZED,
  AI_CLUSTER_STATUS.PROCESSING,
  AI_CLUSTER_STATUS.COMPLETED,
  AI_CLUSTER_STATUS.UPDATING,
  AI_CLUSTER_STATUS.OPTIMIZED,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_CLUSTER_INACTIVE_STATUSES = [AI_CLUSTER_STATUS.FAILED] as const;

/**
 * ক্লাস্টার স্ট্যাটাস গ্রুপ
 */
export const AI_CLUSTER_STATUS_GROUPS = {
  PROCESSING: [AI_CLUSTER_STATUS.INITIALIZED, AI_CLUSTER_STATUS.PROCESSING] as const,
  AVAILABLE: [AI_CLUSTER_STATUS.COMPLETED, AI_CLUSTER_STATUS.OPTIMIZED] as const,
  MAINTENANCE: [AI_CLUSTER_STATUS.UPDATING] as const,
  INVALID: [AI_CLUSTER_STATUS.FAILED] as const,
} as const;

/**
 * ক্লাস্টার স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_CLUSTER_STATUS_GROUP_LABELS = {
  PROCESSING: 'Processing',
  AVAILABLE: 'Available',
  MAINTENANCE: 'Maintenance',
  INVALID: 'Invalid',
} as const;
