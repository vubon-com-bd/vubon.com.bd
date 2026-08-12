/**
 * AI এম্বেডিং স্ট্যাটাস এনাম
 */
export const AI_EMBEDDING_STATUS = {
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CACHED: 'cached',
  STALE: 'stale',
  DELETED: 'deleted',
} as const;

/**
 * AI_EMBEDDING_STATUS থেকে টাইপ
 */
export type AIEmbeddingStatusType = (typeof AI_EMBEDDING_STATUS)[keyof typeof AI_EMBEDDING_STATUS];

/**
 * এম্বেডিং স্ট্যাটাস লেবেল
 */
export const AI_EMBEDDING_STATUS_LABELS: Record<AIEmbeddingStatusType, string> = {
  [AI_EMBEDDING_STATUS.PENDING]: 'Pending',
  [AI_EMBEDDING_STATUS.GENERATING]: 'Generating',
  [AI_EMBEDDING_STATUS.COMPLETED]: 'Completed',
  [AI_EMBEDDING_STATUS.FAILED]: 'Failed',
  [AI_EMBEDDING_STATUS.CACHED]: 'Cached',
  [AI_EMBEDDING_STATUS.STALE]: 'Stale',
  [AI_EMBEDDING_STATUS.DELETED]: 'Deleted',
} as const;

/**
 * এম্বেডিং স্ট্যাটাস বিবরণ
 */
export const AI_EMBEDDING_STATUS_DESCRIPTIONS: Record<AIEmbeddingStatusType, string> = {
  [AI_EMBEDDING_STATUS.PENDING]: 'Embedding generation is pending and waiting to start',
  [AI_EMBEDDING_STATUS.GENERATING]: 'Embedding is currently being generated',
  [AI_EMBEDDING_STATUS.COMPLETED]: 'Embedding has been successfully generated',
  [AI_EMBEDDING_STATUS.FAILED]: 'Embedding generation has failed',
  [AI_EMBEDDING_STATUS.CACHED]: 'Embedding is cached and available for retrieval',
  [AI_EMBEDDING_STATUS.STALE]: 'Embedding is stale and needs regeneration',
  [AI_EMBEDDING_STATUS.DELETED]: 'Embedding has been deleted and is no longer available',
} as const;

/**
 * এম্বেডিং স্ট্যাটাস আইকন
 */
export const AI_EMBEDDING_STATUS_ICONS: Record<AIEmbeddingStatusType, string> = {
  [AI_EMBEDDING_STATUS.PENDING]: '⏳',
  [AI_EMBEDDING_STATUS.GENERATING]: '⚡',
  [AI_EMBEDDING_STATUS.COMPLETED]: '✅',
  [AI_EMBEDDING_STATUS.FAILED]: '❌',
  [AI_EMBEDDING_STATUS.CACHED]: '💾',
  [AI_EMBEDDING_STATUS.STALE]: '🕐',
  [AI_EMBEDDING_STATUS.DELETED]: '🗑️',
} as const;

/**
 * এম্বেডিং স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_EMBEDDING_STATUS_COLORS: Record<AIEmbeddingStatusType, string> = {
  [AI_EMBEDDING_STATUS.PENDING]: '#f59e0b', // Amber-500
  [AI_EMBEDDING_STATUS.GENERATING]: '#3b82f6', // Blue-500
  [AI_EMBEDDING_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_EMBEDDING_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_EMBEDDING_STATUS.CACHED]: '#8b5cf6', // Violet-500
  [AI_EMBEDDING_STATUS.STALE]: '#94a3b8', // Slate-400
  [AI_EMBEDDING_STATUS.DELETED]: '#64748b', // Slate-500
} as const;

/**
 * এম্বেডিং স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_EMBEDDING_STATUS_TRANSITIONS: Record<
  AIEmbeddingStatusType,
  AIEmbeddingStatusType[]
> = {
  [AI_EMBEDDING_STATUS.PENDING]: [
    AI_EMBEDDING_STATUS.GENERATING,
    AI_EMBEDDING_STATUS.FAILED,
    AI_EMBEDDING_STATUS.DELETED,
  ],
  [AI_EMBEDDING_STATUS.GENERATING]: [
    AI_EMBEDDING_STATUS.COMPLETED,
    AI_EMBEDDING_STATUS.FAILED,
    AI_EMBEDDING_STATUS.CACHED,
  ],
  [AI_EMBEDDING_STATUS.COMPLETED]: [
    AI_EMBEDDING_STATUS.CACHED,
    AI_EMBEDDING_STATUS.STALE,
    AI_EMBEDDING_STATUS.DELETED,
  ],
  [AI_EMBEDDING_STATUS.FAILED]: [AI_EMBEDDING_STATUS.PENDING, AI_EMBEDDING_STATUS.DELETED],
  [AI_EMBEDDING_STATUS.CACHED]: [
    AI_EMBEDDING_STATUS.COMPLETED,
    AI_EMBEDDING_STATUS.STALE,
    AI_EMBEDDING_STATUS.DELETED,
  ],
  [AI_EMBEDDING_STATUS.STALE]: [
    AI_EMBEDDING_STATUS.PENDING,
    AI_EMBEDDING_STATUS.GENERATING,
    AI_EMBEDDING_STATUS.DELETED,
  ],
  [AI_EMBEDDING_STATUS.DELETED]: [],
} as const;

/**
 * এম্বেডিং স্ট্যাটাস কনফিগারেশন
 */
export interface AIEmbeddingStatusConfig {
  status: AIEmbeddingStatusType;
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
 * এম্বেডিং স্ট্যাটাস মেটাডেটা
 */
export const AI_EMBEDDING_STATUS_METADATA: Record<AIEmbeddingStatusType, AIEmbeddingStatusConfig> =
  {
    [AI_EMBEDDING_STATUS.PENDING]: {
      status: AI_EMBEDDING_STATUS.PENDING,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.PENDING],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.PENDING],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.PENDING],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.PENDING],
      isTerminal: false,
      isError: false,
      isSuccess: false,
      isAvailable: false,
      order: 0,
    },
    [AI_EMBEDDING_STATUS.GENERATING]: {
      status: AI_EMBEDDING_STATUS.GENERATING,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.GENERATING],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.GENERATING],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.GENERATING],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.GENERATING],
      isTerminal: false,
      isError: false,
      isSuccess: false,
      isAvailable: false,
      order: 1,
    },
    [AI_EMBEDDING_STATUS.COMPLETED]: {
      status: AI_EMBEDDING_STATUS.COMPLETED,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.COMPLETED],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.COMPLETED],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.COMPLETED],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.COMPLETED],
      isTerminal: false,
      isError: false,
      isSuccess: true,
      isAvailable: true,
      order: 2,
    },
    [AI_EMBEDDING_STATUS.FAILED]: {
      status: AI_EMBEDDING_STATUS.FAILED,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.FAILED],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.FAILED],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.FAILED],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.FAILED],
      isTerminal: true,
      isError: true,
      isSuccess: false,
      isAvailable: false,
      order: 3,
    },
    [AI_EMBEDDING_STATUS.CACHED]: {
      status: AI_EMBEDDING_STATUS.CACHED,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.CACHED],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.CACHED],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.CACHED],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.CACHED],
      isTerminal: false,
      isError: false,
      isSuccess: true,
      isAvailable: true,
      order: 4,
    },
    [AI_EMBEDDING_STATUS.STALE]: {
      status: AI_EMBEDDING_STATUS.STALE,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.STALE],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.STALE],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.STALE],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.STALE],
      isTerminal: false,
      isError: false,
      isSuccess: false,
      isAvailable: false,
      order: 5,
    },
    [AI_EMBEDDING_STATUS.DELETED]: {
      status: AI_EMBEDDING_STATUS.DELETED,
      label: AI_EMBEDDING_STATUS_LABELS[AI_EMBEDDING_STATUS.DELETED],
      description: AI_EMBEDDING_STATUS_DESCRIPTIONS[AI_EMBEDDING_STATUS.DELETED],
      icon: AI_EMBEDDING_STATUS_ICONS[AI_EMBEDDING_STATUS.DELETED],
      color: AI_EMBEDDING_STATUS_COLORS[AI_EMBEDDING_STATUS.DELETED],
      isTerminal: true,
      isError: false,
      isSuccess: false,
      isAvailable: false,
      order: 6,
    },
  } as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_TERMINAL_STATUSES = [
  AI_EMBEDDING_STATUS.FAILED,
  AI_EMBEDDING_STATUS.DELETED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_ERROR_STATUSES = [AI_EMBEDDING_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_SUCCESS_STATUSES = [
  AI_EMBEDDING_STATUS.COMPLETED,
  AI_EMBEDDING_STATUS.CACHED,
] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_ACTIVE_STATUSES = [
  AI_EMBEDDING_STATUS.PENDING,
  AI_EMBEDDING_STATUS.GENERATING,
] as const;

/**
 * উপলব্ধ স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_AVAILABLE_STATUSES = [
  AI_EMBEDDING_STATUS.COMPLETED,
  AI_EMBEDDING_STATUS.CACHED,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_EMBEDDING_INACTIVE_STATUSES = [
  AI_EMBEDDING_STATUS.FAILED,
  AI_EMBEDDING_STATUS.STALE,
  AI_EMBEDDING_STATUS.DELETED,
] as const;

/**
 * এম্বেডিং স্ট্যাটাস গ্রুপ
 */
export const AI_EMBEDDING_STATUS_GROUPS = {
  PROCESSING: [AI_EMBEDDING_STATUS.PENDING, AI_EMBEDDING_STATUS.GENERATING] as const,
  AVAILABLE: [AI_EMBEDDING_STATUS.COMPLETED, AI_EMBEDDING_STATUS.CACHED] as const,
  INVALID: [
    AI_EMBEDDING_STATUS.FAILED,
    AI_EMBEDDING_STATUS.STALE,
    AI_EMBEDDING_STATUS.DELETED,
  ] as const,
} as const;

/**
 * এম্বেডিং স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_EMBEDDING_STATUS_GROUP_LABELS = {
  PROCESSING: 'Processing',
  AVAILABLE: 'Available',
  INVALID: 'Invalid',
} as const;
