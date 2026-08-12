/**
 * ডিফল্ট ইপোক সংখ্যা
 */
export const AI_TRAINING_DEFAULT_EPOCHS = 10 as const;

/**
 * ডিফল্ট ব্যাচ সাইজ
 */
export const AI_TRAINING_DEFAULT_BATCH_SIZE = 32 as const;

/**
 * লার্নিং রেট
 */
export const AI_TRAINING_LEARNING_RATE = 0.001 as const;

/**
 * ভ্যালিডেশন স্প্লিট
 */
export const AI_TRAINING_VALIDATION_SPLIT = 0.2 as const;

/**
 * আর্লি স্টপিং প্যারামিটার
 */
export const AI_TRAINING_EARLY_STOPPING = {
  PATIENCE: 5,
  MIN_DELTA: 0.001,
  RESTORE_BEST_WEIGHTS: true,
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস এনাম
 */
export const AI_TRAINING_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  RUNNING: 'running',
  VALIDATING: 'validating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  PAUSED: 'paused',
} as const;

/**
 * AI_TRAINING_STATUS থেকে টাইপ
 */
export type AITrainingStatus = (typeof AI_TRAINING_STATUS)[keyof typeof AI_TRAINING_STATUS];

/**
 * ট্রেইনিং স্ট্যাটাস লেবেল
 */
export const AI_TRAINING_STATUS_LABELS: Record<AITrainingStatus, string> = {
  [AI_TRAINING_STATUS.PENDING]: 'Pending',
  [AI_TRAINING_STATUS.PREPARING]: 'Preparing',
  [AI_TRAINING_STATUS.RUNNING]: 'Running',
  [AI_TRAINING_STATUS.VALIDATING]: 'Validating',
  [AI_TRAINING_STATUS.COMPLETED]: 'Completed',
  [AI_TRAINING_STATUS.FAILED]: 'Failed',
  [AI_TRAINING_STATUS.CANCELLED]: 'Cancelled',
  [AI_TRAINING_STATUS.PAUSED]: 'Paused',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস বিবরণ
 */
export const AI_TRAINING_STATUS_DESCRIPTIONS: Record<AITrainingStatus, string> = {
  [AI_TRAINING_STATUS.PENDING]: 'Training job is waiting to start',
  [AI_TRAINING_STATUS.PREPARING]: 'Training data is being prepared and preprocessed',
  [AI_TRAINING_STATUS.RUNNING]: 'Training is currently in progress',
  [AI_TRAINING_STATUS.VALIDATING]: 'Training is being validated and evaluated',
  [AI_TRAINING_STATUS.COMPLETED]: 'Training has completed successfully',
  [AI_TRAINING_STATUS.FAILED]: 'Training has failed due to an error',
  [AI_TRAINING_STATUS.CANCELLED]: 'Training was cancelled by user',
  [AI_TRAINING_STATUS.PAUSED]: 'Training is temporarily paused',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস আইকন
 */
export const AI_TRAINING_STATUS_ICONS: Record<AITrainingStatus, string> = {
  [AI_TRAINING_STATUS.PENDING]: '⏳',
  [AI_TRAINING_STATUS.PREPARING]: '🔧',
  [AI_TRAINING_STATUS.RUNNING]: '⚡',
  [AI_TRAINING_STATUS.VALIDATING]: '✅',
  [AI_TRAINING_STATUS.COMPLETED]: '🎉',
  [AI_TRAINING_STATUS.FAILED]: '❌',
  [AI_TRAINING_STATUS.CANCELLED]: '⛔',
  [AI_TRAINING_STATUS.PAUSED]: '⏸️',
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস কালার (হেক্স কোড)
 */
export const AI_TRAINING_STATUS_COLORS: Record<AITrainingStatus, string> = {
  [AI_TRAINING_STATUS.PENDING]: '#f59e0b', // Amber-500
  [AI_TRAINING_STATUS.PREPARING]: '#3b82f6', // Blue-500
  [AI_TRAINING_STATUS.RUNNING]: '#8b5cf6', // Violet-500
  [AI_TRAINING_STATUS.VALIDATING]: '#06b6d4', // Cyan-500
  [AI_TRAINING_STATUS.COMPLETED]: '#22c55e', // Green-500
  [AI_TRAINING_STATUS.FAILED]: '#dc2626', // Red-600
  [AI_TRAINING_STATUS.CANCELLED]: '#64748b', // Slate-500
  [AI_TRAINING_STATUS.PAUSED]: '#94a3b8', // Slate-400
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস ট্রানজিশন রুলস
 */
export const AI_TRAINING_STATUS_TRANSITIONS: Record<AITrainingStatus, AITrainingStatus[]> = {
  [AI_TRAINING_STATUS.PENDING]: [AI_TRAINING_STATUS.PREPARING, AI_TRAINING_STATUS.CANCELLED],
  [AI_TRAINING_STATUS.PREPARING]: [
    AI_TRAINING_STATUS.RUNNING,
    AI_TRAINING_STATUS.FAILED,
    AI_TRAINING_STATUS.CANCELLED,
  ],
  [AI_TRAINING_STATUS.RUNNING]: [
    AI_TRAINING_STATUS.VALIDATING,
    AI_TRAINING_STATUS.PAUSED,
    AI_TRAINING_STATUS.FAILED,
    AI_TRAINING_STATUS.CANCELLED,
  ],
  [AI_TRAINING_STATUS.VALIDATING]: [
    AI_TRAINING_STATUS.COMPLETED,
    AI_TRAINING_STATUS.FAILED,
    AI_TRAINING_STATUS.PAUSED,
  ],
  [AI_TRAINING_STATUS.COMPLETED]: [],
  [AI_TRAINING_STATUS.FAILED]: [AI_TRAINING_STATUS.PENDING, AI_TRAINING_STATUS.CANCELLED],
  [AI_TRAINING_STATUS.CANCELLED]: [],
  [AI_TRAINING_STATUS.PAUSED]: [
    AI_TRAINING_STATUS.RUNNING,
    AI_TRAINING_STATUS.CANCELLED,
    AI_TRAINING_STATUS.FAILED,
  ],
} as const;

/**
 * ট্রেইনিং টাইপ এনাম
 */
export const AI_TRAINING_TYPE = {
  SUPERVISED: 'supervised',
  UNSUPERVISED: 'unsupervised',
  SEMI_SUPERVISED: 'semi-supervised',
  REINFORCEMENT: 'reinforcement',
  TRANSFER: 'transfer',
  FEDERATED: 'federated',
} as const;

/**
 * AI_TRAINING_TYPE থেকে টাইপ
 */
export type AITrainingType = (typeof AI_TRAINING_TYPE)[keyof typeof AI_TRAINING_TYPE];

/**
 * ট্রেইনিং টাইপ লেবেল
 */
export const AI_TRAINING_TYPE_LABELS: Record<AITrainingType, string> = {
  [AI_TRAINING_TYPE.SUPERVISED]: 'Supervised',
  [AI_TRAINING_TYPE.UNSUPERVISED]: 'Unsupervised',
  [AI_TRAINING_TYPE.SEMI_SUPERVISED]: 'Semi-Supervised',
  [AI_TRAINING_TYPE.REINFORCEMENT]: 'Reinforcement',
  [AI_TRAINING_TYPE.TRANSFER]: 'Transfer',
  [AI_TRAINING_TYPE.FEDERATED]: 'Federated',
} as const;

/**
 * ট্রেইনিং টাইপ বিবরণ
 */
export const AI_TRAINING_TYPE_DESCRIPTIONS: Record<AITrainingType, string> = {
  [AI_TRAINING_TYPE.SUPERVISED]: 'Training with labeled data and ground truth',
  [AI_TRAINING_TYPE.UNSUPERVISED]: 'Training with unlabeled data to find patterns',
  [AI_TRAINING_TYPE.SEMI_SUPERVISED]: 'Training with partially labeled data',
  [AI_TRAINING_TYPE.REINFORCEMENT]: 'Training through trial and error with rewards',
  [AI_TRAINING_TYPE.TRANSFER]: 'Transferring knowledge from pre-trained models',
  [AI_TRAINING_TYPE.FEDERATED]: 'Distributed training across multiple devices',
} as const;

/**
 * ট্রেইনিং কনফিগারেশন
 */
export interface AITrainingConfig {
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationSplit: number;
  earlyStopping: {
    patience: number;
    minDelta: number;
    restoreBestWeights: boolean;
  };
  type: AITrainingType;
  shuffleData: boolean;
  useGPU: boolean;
  useMixedPrecision: boolean;
  seed: number;
}

/**
 * ট্রেইনিং ডিফল্ট কনফিগারেশন
 */
export const AI_TRAINING_DEFAULT_CONFIG: AITrainingConfig = {
  epochs: AI_TRAINING_DEFAULT_EPOCHS,
  batchSize: AI_TRAINING_DEFAULT_BATCH_SIZE,
  learningRate: AI_TRAINING_LEARNING_RATE,
  validationSplit: AI_TRAINING_VALIDATION_SPLIT,
  earlyStopping: {
    patience: AI_TRAINING_EARLY_STOPPING.PATIENCE,
    minDelta: AI_TRAINING_EARLY_STOPPING.MIN_DELTA,
    restoreBestWeights: AI_TRAINING_EARLY_STOPPING.RESTORE_BEST_WEIGHTS,
  },
  type: AI_TRAINING_TYPE.SUPERVISED,
  shuffleData: true,
  useGPU: false,
  useMixedPrecision: false,
  seed: 42,
} as const;

/**
 * ট্রেইনিং ফিল্টার
 */
export interface AITrainingFilter {
  type?: AITrainingType;
  status?: AITrainingStatus;
  startDate?: Date;
  endDate?: Date;
  minEpochs?: number;
  maxEpochs?: number;
  modelIds?: string[];
  userIds?: string[];
  limit?: number;
  offset?: number;
}

/**
 * ট্রেইনিং প্রগ্রেস
 */
export interface AITrainingProgress {
  currentEpoch: number;
  totalEpochs: number;
  currentBatch: number;
  totalBatches: number;
  loss: number;
  accuracy?: number;
  valLoss: number;
  valAccuracy?: number;
  learningRate: number;
  percentage: number;
  eta: number;
}

/**
 * ট্রেইনিং রেসপন্স
 */
export interface AITrainingResponse<T = unknown> {
  jobId: string;
  modelId: string;
  type: AITrainingType;
  status: AITrainingStatus;
  config: AITrainingConfig;
  progress: AITrainingProgress;
  metrics: Record<string, unknown>;
  artifacts: T[];
  startTime: Date;
  endTime?: Date;
  duration?: number;
  error?: string;
}

/**
 * ট্রেইনিং স্ট্যাটাস গ্রুপ
 */
export const AI_TRAINING_STATUS_GROUPS = {
  ACTIVE: [
    AI_TRAINING_STATUS.PENDING,
    AI_TRAINING_STATUS.PREPARING,
    AI_TRAINING_STATUS.RUNNING,
    AI_TRAINING_STATUS.VALIDATING,
  ] as const,
  TERMINAL: [
    AI_TRAINING_STATUS.COMPLETED,
    AI_TRAINING_STATUS.FAILED,
    AI_TRAINING_STATUS.CANCELLED,
  ] as const,
  PAUSED: [AI_TRAINING_STATUS.PAUSED] as const,
} as const;

/**
 * ট্রেইনিং স্ট্যাটাস গ্রুপ লেবেল
 */
export const AI_TRAINING_STATUS_GROUP_LABELS = {
  ACTIVE: 'Active',
  TERMINAL: 'Terminal',
  PAUSED: 'Paused',
} as const;

/**
 * ট্রেইনিং টাইপ গ্রুপ
 */
export const AI_TRAINING_TYPE_GROUPS = {
  SUPERVISED_LEARNING: [AI_TRAINING_TYPE.SUPERVISED, AI_TRAINING_TYPE.SEMI_SUPERVISED] as const,
  UNSUPERVISED_LEARNING: [AI_TRAINING_TYPE.UNSUPERVISED] as const,
  ADVANCED_LEARNING: [
    AI_TRAINING_TYPE.REINFORCEMENT,
    AI_TRAINING_TYPE.TRANSFER,
    AI_TRAINING_TYPE.FEDERATED,
  ] as const,
} as const;

/**
 * ট্রেইনিং টাইপ গ্রুপ লেবেল
 */
export const AI_TRAINING_TYPE_GROUP_LABELS = {
  SUPERVISED_LEARNING: 'Supervised Learning',
  UNSUPERVISED_LEARNING: 'Unsupervised Learning',
  ADVANCED_LEARNING: 'Advanced Learning',
} as const;
