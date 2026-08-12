/**
 * AI ভেক্টর স্ট্যাটাস এনাম
 */
export const AI_VECTOR_STATUS = {
  CREATED: 'created',
  INDEXING: 'indexing',
  INDEXED: 'indexed',
  UPDATING: 'updating',
  DELETED: 'deleted',
  ERROR: 'error',
  OPTIMIZING: 'optimizing',
} as const;

/**
 * AI_VECTOR_STATUS থেকে টাইপ
 */
export type AIVectorStatusType = (typeof AI_VECTOR_STATUS)[keyof typeof AI_VECTOR_STATUS];

/**
 * ভেক্টর স্ট্যাটাস লেবেল
 */
export const AI_VECTOR_STATUS_LABELS: Record<AIVectorStatusType, string> = {
  [AI_VECTOR_STATUS.CREATED]: 'Created',
  [AI_VECTOR_STATUS.INDEXING]: 'Indexing',
  [AI_VECTOR_STATUS.INDEXED]: 'Indexed',
  [AI_VECTOR_STATUS.UPDATING]: 'Updating',
  [AI_VECTOR_STATUS.DELETED]: 'Deleted',
  [AI_VECTOR_STATUS.ERROR]: 'Error',
  [AI_VECTOR_STATUS.OPTIMIZING]: 'Optimizing',
} as const;

/**
 * ভেক্টর স্ট্যাটাস বিবরণ
 */
export const AI_VECTOR_STATUS_DESCRIPTIONS: Record<AIVectorStatusType, string> = {
  [AI_VECTOR_STATUS.CREATED]: 'Vector has been created and ready for indexing',
  [AI_VECTOR_STATUS.INDEXING]: 'Vector is being indexed for search',
  [AI_VECTOR_STATUS.INDEXED]: 'Vector has been successfully indexed',
  [AI_VECTOR_STATUS.UPDATING]: 'Vector index is being updated',
  [AI_VECTOR_STATUS.DELETED]: 'Vector has been deleted from the index',
  [AI_VECTOR_STATUS.ERROR]: 'Vector operation has encountered an error',
  [AI_VECTOR_STATUS.OPTIMIZING]: 'Vector index is being optimized',
} as const;

/**
 * ভেক্টর স্ট্যাটাস আইকন
 */
export const AI_VECTOR_STATUS_ICONS: Record<AIVectorStatusType, string> = {
  [AI_VECTOR_STATUS.CREATED]: '📝',
  [AI_VECTOR_STATUS.INDEXING]: '📊',
  [AI_VECTOR_STATUS.INDEXED]: '✅',
  [AI_VECTOR_STATUS.UPDATING]: '🔄',
  [AI_VECTOR_STATUS.DELETED]: '🗑️',
  [AI_VECTOR_STATUS.ERROR]: '❌',
  [AI_VECTOR_STATUS.OPTIMIZING]: '⚡',
} as const;

/**
 * ভেক্টর স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_VECTOR_STATUS_COLORS: Record<AIVectorStatusType, string> = {
  [AI_VECTOR_STATUS.CREATED]: '#3b82f6', // Blue-500
  [AI_VECTOR_STATUS.INDEXING]: '#8b5cf6', // Violet-500
  [AI_VECTOR_STATUS.INDEXED]: '#22c55e', // Green-500
  [AI_VECTOR_STATUS.UPDATING]: '#f59e0b', // Amber-500
  [AI_VECTOR_STATUS.DELETED]: '#64748b', // Slate-500
  [AI_VECTOR_STATUS.ERROR]: '#dc2626', // Red-600
  [AI_VECTOR_STATUS.OPTIMIZING]: '#06b6d4', // Cyan-500
} as const;

/**
 * ভেক্টর স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_VECTOR_STATUS_TRANSITIONS: Record<AIVectorStatusType, AIVectorStatusType[]> = {
  [AI_VECTOR_STATUS.CREATED]: [
    AI_VECTOR_STATUS.INDEXING,
    AI_VECTOR_STATUS.DELETED,
    AI_VECTOR_STATUS.ERROR,
  ],
  [AI_VECTOR_STATUS.INDEXING]: [
    AI_VECTOR_STATUS.INDEXED,
    AI_VECTOR_STATUS.ERROR,
    AI_VECTOR_STATUS.DELETED,
  ],
  [AI_VECTOR_STATUS.INDEXED]: [
    AI_VECTOR_STATUS.UPDATING,
    AI_VECTOR_STATUS.DELETED,
    AI_VECTOR_STATUS.ERROR,
  ],
  [AI_VECTOR_STATUS.UPDATING]: [
    AI_VECTOR_STATUS.INDEXED,
    AI_VECTOR_STATUS.OPTIMIZING,
    AI_VECTOR_STATUS.ERROR,
    AI_VECTOR_STATUS.DELETED,
  ],
  [AI_VECTOR_STATUS.DELETED]: [],
  [AI_VECTOR_STATUS.ERROR]: [AI_VECTOR_STATUS.CREATED, AI_VECTOR_STATUS.DELETED],
  [AI_VECTOR_STATUS.OPTIMIZING]: [
    AI_VECTOR_STATUS.INDEXED,
    AI_VECTOR_STATUS.ERROR,
    AI_VECTOR_STATUS.DELETED,
  ],
} as const;

/**
 * ভেক্টর স্ট্যাটাস কনফিগারেশন
 */
export interface AIVectorStatusConfig {
  status: AIVectorStatusType;
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
 * ভেক্টর স্ট্যাটাস মেটাডেটা
 */
export const AI_VECTOR_STATUS_METADATA: Record<AIVectorStatusType, AIVectorStatusConfig> = {
  [AI_VECTOR_STATUS.CREATED]: {
    status: AI_VECTOR_STATUS.CREATED,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.CREATED],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.CREATED],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.CREATED],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.CREATED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [AI_VECTOR_STATUS.INDEXING]: {
    status: AI_VECTOR_STATUS.INDEXING,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.INDEXING],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.INDEXING],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.INDEXING],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.INDEXING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [AI_VECTOR_STATUS.INDEXED]: {
    status: AI_VECTOR_STATUS.INDEXED,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.INDEXED],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.INDEXED],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.INDEXED],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.INDEXED],
    isTerminal: false,
    isError: false,
    isSuccess: true,
    isActive: true,
    order: 2,
  },
  [AI_VECTOR_STATUS.UPDATING]: {
    status: AI_VECTOR_STATUS.UPDATING,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.UPDATING],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.UPDATING],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.UPDATING],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.UPDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
  [AI_VECTOR_STATUS.DELETED]: {
    status: AI_VECTOR_STATUS.DELETED,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.DELETED],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.DELETED],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.DELETED],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.DELETED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 4,
  },
  [AI_VECTOR_STATUS.ERROR]: {
    status: AI_VECTOR_STATUS.ERROR,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.ERROR],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.ERROR],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.ERROR],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.ERROR],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 5,
  },
  [AI_VECTOR_STATUS.OPTIMIZING]: {
    status: AI_VECTOR_STATUS.OPTIMIZING,
    label: AI_VECTOR_STATUS_LABELS[AI_VECTOR_STATUS.OPTIMIZING],
    description: AI_VECTOR_STATUS_DESCRIPTIONS[AI_VECTOR_STATUS.OPTIMIZING],
    icon: AI_VECTOR_STATUS_ICONS[AI_VECTOR_STATUS.OPTIMIZING],
    color: AI_VECTOR_STATUS_COLORS[AI_VECTOR_STATUS.OPTIMIZING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 6,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_TERMINAL_STATUSES = [
  AI_VECTOR_STATUS.DELETED,
  AI_VECTOR_STATUS.ERROR,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_ERROR_STATUSES = [AI_VECTOR_STATUS.ERROR] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_SUCCESS_STATUSES = [AI_VECTOR_STATUS.INDEXED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_ACTIVE_STATUSES = [
  AI_VECTOR_STATUS.CREATED,
  AI_VECTOR_STATUS.INDEXING,
  AI_VECTOR_STATUS.INDEXED,
  AI_VECTOR_STATUS.UPDATING,
  AI_VECTOR_STATUS.OPTIMIZING,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_INACTIVE_STATUSES = [
  AI_VECTOR_STATUS.DELETED,
  AI_VECTOR_STATUS.ERROR,
] as const;

/**
 * অপারেশনাল স্ট্যাটাসের তালিকা
 */
export const AI_VECTOR_OPERATIONAL_STATUSES = [
  AI_VECTOR_STATUS.INDEXING,
  AI_VECTOR_STATUS.UPDATING,
  AI_VECTOR_STATUS.OPTIMIZING,
] as const;

/**
 * ভেক্টর স্ট্যাটাস গ্রুপ
 */
export const AI_VECTOR_STATUS_GROUPS = {
  PROCESSING: [
    AI_VECTOR_STATUS.CREATED,
    AI_VECTOR_STATUS.INDEXING,
    AI_VECTOR_STATUS.OPTIMIZING,
  ] as const,
  AVAILABLE: [AI_VECTOR_STATUS.INDEXED] as const,
  MAINTENANCE: [AI_VECTOR_STATUS.UPDATING] as const,
  INVALID: [AI_VECTOR_STATUS.DELETED, AI_VECTOR_STATUS.ERROR] as const,
} as const;

/**
 * ভেক্টর স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_VECTOR_STATUS_GROUP_LABELS = {
  PROCESSING: 'Processing',
  AVAILABLE: 'Available',
  MAINTENANCE: 'Maintenance',
  INVALID: 'Invalid',
} as const;
