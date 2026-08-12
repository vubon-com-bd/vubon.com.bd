/**
 * AI ট্রেইনিং স্ট্যাটাস এনাম
 */
export const AI_TRAINING_STATUS = {
  QUEUED: 'queued',
  INITIALIZING: 'initializing',
  PREPARING_DATA: 'preparing-data',
  TRAINING: 'training',
  VALIDATING: 'validating',
  EVALUATING: 'evaluating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  STOPPED: 'stopped',
  PAUSED: 'paused',
  DEPLOYING: 'deploying',
} as const;

/**
 * AI_TRAINING_STATUS থেকে টাইপ
 */
export type AITrainingStatusType = (typeof AI_TRAINING_STATUS)[keyof typeof AI_TRAINING_STATUS];

/**
 * ট্রেইনিং স্ট্যাটাস লেবেল
 */
export const AI_TRAINING_STATUS_LABELS: Record<AITrainingStatusType, string> = {
  [AI_TRAINING_STATUS.QUEUED]: 'Queued',
  [AI_TRAINING_STATUS.INITIALIZING]: 'Initializing',
  [AI_TRAINING_STATUS.PREPARING_DATA]: 'Preparing Data',
  [AI_TRAINING_STATUS.TRAINING]: 'Training',
  [AI_TRAINING_STATUS.VALIDATING]: 'Validating',
  [AI_TRAINING_STATUS.EVALUATING]: 'Evaluating',
  [AI_TRAINING_STATUS.COMPLETED]: 'Completed',
  [AI_TRAINING_STATUS.FAILED]: 'Failed',
  [AI_TRAINING_STATUS.STOPPED]: 'Stopped',
  [AI_TRAINING_STATUS.PAUSED]: 'Paused',
  [AI_TRAINING_STATUS.DEPLOYING]: 'Deploying',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস বিবরণ
 */
export const AI_TRAINING_STATUS_DESCRIPTIONS: Record<AITrainingStatusType, string> = {
  [AI_TRAINING_STATUS.QUEUED]: 'Training job is queued and waiting for resources',
  [AI_TRAINING_STATUS.INITIALIZING]: 'Training is initializing and setting up environment',
  [AI_TRAINING_STATUS.PREPARING_DATA]: 'Training data is being prepared and preprocessed',
  [AI_TRAINING_STATUS.TRAINING]: 'Model is actively training on the dataset',
  [AI_TRAINING_STATUS.VALIDATING]: 'Model is being validated on validation dataset',
  [AI_TRAINING_STATUS.EVALUATING]: 'Model is being evaluated on test dataset',
  [AI_TRAINING_STATUS.COMPLETED]: 'Training has completed successfully',
  [AI_TRAINING_STATUS.FAILED]: 'Training has failed due to an error',
  [AI_TRAINING_STATUS.STOPPED]: 'Training was stopped by user',
  [AI_TRAINING_STATUS.PAUSED]: 'Training is temporarily paused',
  [AI_TRAINING_STATUS.DEPLOYING]: 'Model is being deployed to production',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস আইকন
 */
export const AI_TRAINING_STATUS_ICONS: Record<AITrainingStatusType, string> = {
  [AI_TRAINING_STATUS.QUEUED]: '📋',
  [AI_TRAINING_STATUS.INITIALIZING]: '🚀',
  [AI_TRAINING_STATUS.PREPARING_DATA]: '🔧',
  [AI_TRAINING_STATUS.TRAINING]: '⚡',
  [AI_TRAINING_STATUS.VALIDATING]: '✅',
  [AI_TRAINING_STATUS.EVALUATING]: '📊',
  [AI_TRAINING_STATUS.COMPLETED]: '🎉',
  [AI_TRAINING_STATUS.FAILED]: '❌',
  [AI_TRAINING_STATUS.STOPPED]: '⏹️',
  [AI_TRAINING_STATUS.PAUSED]: '⏸️',
  [AI_TRAINING_STATUS.DEPLOYING]: '📦',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_TRAINING_STATUS_COLORS: Record<AITrainingStatusType, string> = {
  [AI_TRAINING_STATUS.QUEUED]: '#94a3b8', // Slate-400
  [AI_TRAINING_STATUS.INITIALIZING]: '#3b82f6', // Blue-500
  [AI_TRAINING_STATUS.PREPARING_DATA]: '#8b5cf6', // Violet-500
  [AI_TRAINING_STATUS.TRAINING]: '#f59e0b', // Amber-500
  [AI_TRAINING_STATUS.VALIDATING]: '#06b6d4', // Cyan-500
  [AI_TRAINING_STATUS.EVALUATING]: '#ec4899', // Pink-500
  [AI_TRAINING_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_TRAINING_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_TRAINING_STATUS.STOPPED]: '#64748b', // Slate-500
  [AI_TRAINING_STATUS.PAUSED]: '#94a3b8', // Slate-400
  [AI_TRAINING_STATUS.DEPLOYING]: '#f472b6', // Pink-400
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_TRAINING_STATUS_TRANSITIONS: Record<AITrainingStatusType, AITrainingStatusType[]> =
  {
    [AI_TRAINING_STATUS.QUEUED]: [
      AI_TRAINING_STATUS.INITIALIZING,
      AI_TRAINING_STATUS.STOPPED,
      AI_TRAINING_STATUS.FAILED,
    ],
    [AI_TRAINING_STATUS.INITIALIZING]: [
      AI_TRAINING_STATUS.PREPARING_DATA,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.STOPPED,
    ],
    [AI_TRAINING_STATUS.PREPARING_DATA]: [
      AI_TRAINING_STATUS.TRAINING,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.STOPPED,
      AI_TRAINING_STATUS.PAUSED,
    ],
    [AI_TRAINING_STATUS.TRAINING]: [
      AI_TRAINING_STATUS.VALIDATING,
      AI_TRAINING_STATUS.PAUSED,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.STOPPED,
    ],
    [AI_TRAINING_STATUS.VALIDATING]: [
      AI_TRAINING_STATUS.EVALUATING,
      AI_TRAINING_STATUS.TRAINING,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.STOPPED,
      AI_TRAINING_STATUS.PAUSED,
    ],
    [AI_TRAINING_STATUS.EVALUATING]: [
      AI_TRAINING_STATUS.COMPLETED,
      AI_TRAINING_STATUS.TRAINING,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.STOPPED,
    ],
    [AI_TRAINING_STATUS.COMPLETED]: [AI_TRAINING_STATUS.DEPLOYING],
    [AI_TRAINING_STATUS.FAILED]: [AI_TRAINING_STATUS.QUEUED, AI_TRAINING_STATUS.STOPPED],
    [AI_TRAINING_STATUS.STOPPED]: [AI_TRAINING_STATUS.QUEUED],
    [AI_TRAINING_STATUS.PAUSED]: [
      AI_TRAINING_STATUS.TRAINING,
      AI_TRAINING_STATUS.VALIDATING,
      AI_TRAINING_STATUS.PREPARING_DATA,
      AI_TRAINING_STATUS.STOPPED,
      AI_TRAINING_STATUS.FAILED,
    ],
    [AI_TRAINING_STATUS.DEPLOYING]: [AI_TRAINING_STATUS.COMPLETED, AI_TRAINING_STATUS.FAILED],
  } as const;

/**
 * ট্রেইনিং স্ট্যাটাস কনফিগারেশন
 */
export interface AITrainingStatusConfig {
  status: AITrainingStatusType;
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
 * ট্রেইনিং স্ট্যাটাস মেটাডেটা
 */
export const AI_TRAINING_STATUS_METADATA: Record<AITrainingStatusType, AITrainingStatusConfig> = {
  [AI_TRAINING_STATUS.QUEUED]: {
    status: AI_TRAINING_STATUS.QUEUED,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.QUEUED],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.QUEUED],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.QUEUED],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.QUEUED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 0,
  },
  [AI_TRAINING_STATUS.INITIALIZING]: {
    status: AI_TRAINING_STATUS.INITIALIZING,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.INITIALIZING],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.INITIALIZING],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.INITIALIZING],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.INITIALIZING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 1,
  },
  [AI_TRAINING_STATUS.PREPARING_DATA]: {
    status: AI_TRAINING_STATUS.PREPARING_DATA,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.PREPARING_DATA],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.PREPARING_DATA],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.PREPARING_DATA],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.PREPARING_DATA],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 2,
  },
  [AI_TRAINING_STATUS.TRAINING]: {
    status: AI_TRAINING_STATUS.TRAINING,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.TRAINING],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.TRAINING],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.TRAINING],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.TRAINING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 3,
  },
  [AI_TRAINING_STATUS.VALIDATING]: {
    status: AI_TRAINING_STATUS.VALIDATING,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.VALIDATING],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.VALIDATING],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.VALIDATING],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.VALIDATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 4,
  },
  [AI_TRAINING_STATUS.EVALUATING]: {
    status: AI_TRAINING_STATUS.EVALUATING,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.EVALUATING],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.EVALUATING],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.EVALUATING],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.EVALUATING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 5,
  },
  [AI_TRAINING_STATUS.COMPLETED]: {
    status: AI_TRAINING_STATUS.COMPLETED,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.COMPLETED],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.COMPLETED],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.COMPLETED],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.COMPLETED],
    isTerminal: true,
    isError: false,
    isSuccess: true,
    isActive: false,
    order: 6,
  },
  [AI_TRAINING_STATUS.FAILED]: {
    status: AI_TRAINING_STATUS.FAILED,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.FAILED],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.FAILED],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.FAILED],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.FAILED],
    isTerminal: true,
    isError: true,
    isSuccess: false,
    isActive: false,
    order: 7,
  },
  [AI_TRAINING_STATUS.STOPPED]: {
    status: AI_TRAINING_STATUS.STOPPED,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.STOPPED],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.STOPPED],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.STOPPED],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.STOPPED],
    isTerminal: true,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 8,
  },
  [AI_TRAINING_STATUS.PAUSED]: {
    status: AI_TRAINING_STATUS.PAUSED,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.PAUSED],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.PAUSED],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.PAUSED],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.PAUSED],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: false,
    order: 9,
  },
  [AI_TRAINING_STATUS.DEPLOYING]: {
    status: AI_TRAINING_STATUS.DEPLOYING,
    label: AI_TRAINING_STATUS_LABELS[AI_TRAINING_STATUS.DEPLOYING],
    description: AI_TRAINING_STATUS_DESCRIPTIONS[AI_TRAINING_STATUS.DEPLOYING],
    icon: AI_TRAINING_STATUS_ICONS[AI_TRAINING_STATUS.DEPLOYING],
    color: AI_TRAINING_STATUS_COLORS[AI_TRAINING_STATUS.DEPLOYING],
    isTerminal: false,
    isError: false,
    isSuccess: false,
    isActive: true,
    order: 10,
  },
} as const;

/**
 * টার্মিনাল স্ট্যাটাসের তালিকা
 */
export const AI_TRAINING_TERMINAL_STATUSES = [
  AI_TRAINING_STATUS.COMPLETED,
  AI_TRAINING_STATUS.FAILED,
  AI_TRAINING_STATUS.STOPPED,
] as const;

/**
 * ত্রুটির স্ট্যাটাসের তালিকা
 */
export const AI_TRAINING_ERROR_STATUSES = [AI_TRAINING_STATUS.FAILED] as const;

/**
 * সাফল্যের স্ট্যাটাসের তালিকা
 */
export const AI_TRAINING_SUCCESS_STATUSES = [AI_TRAINING_STATUS.COMPLETED] as const;

/**
 * অ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_TRAINING_ACTIVE_STATUSES = [
  AI_TRAINING_STATUS.QUEUED,
  AI_TRAINING_STATUS.INITIALIZING,
  AI_TRAINING_STATUS.PREPARING_DATA,
  AI_TRAINING_STATUS.TRAINING,
  AI_TRAINING_STATUS.VALIDATING,
  AI_TRAINING_STATUS.EVALUATING,
  AI_TRAINING_STATUS.DEPLOYING,
] as const;

/**
 * ইনঅ্যাক্টিভ স্ট্যাটাসের তালিকা
 */
export const AI_TRAINING_INACTIVE_STATUSES = [
  AI_TRAINING_STATUS.COMPLETED,
  AI_TRAINING_STATUS.FAILED,
  AI_TRAINING_STATUS.STOPPED,
  AI_TRAINING_STATUS.PAUSED,
] as const;

/**
 * ট্রেইনিং স্ট্যাটাস গ্রুপ
 */
export const AI_TRAINING_STATUS_GROUPS = {
  PREPARATION: [
    AI_TRAINING_STATUS.QUEUED,
    AI_TRAINING_STATUS.INITIALIZING,
    AI_TRAINING_STATUS.PREPARING_DATA,
  ] as const,
  EXECUTION: [
    AI_TRAINING_STATUS.TRAINING,
    AI_TRAINING_STATUS.VALIDATING,
    AI_TRAINING_STATUS.EVALUATING,
  ] as const,
  COMPLETION: [AI_TRAINING_STATUS.COMPLETED, AI_TRAINING_STATUS.DEPLOYING] as const,
  INTERRUPTED: [
    AI_TRAINING_STATUS.FAILED,
    AI_TRAINING_STATUS.STOPPED,
    AI_TRAINING_STATUS.PAUSED,
  ] as const,
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_TRAINING_STATUS_GROUP_LABELS = {
  PREPARATION: 'Preparation',
  EXECUTION: 'Execution',
  COMPLETION: 'Completion',
  INTERRUPTED: 'Interrupted',
} as const;
