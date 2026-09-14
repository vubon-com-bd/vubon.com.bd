export const AI_TRAINING_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  PAUSED: 'paused',
} as const;

export const AI_TRAINING_TYPE = {
  FINE_TUNING: 'fine_tuning',
  FULL_TRAINING: 'full_training',
  TRANSFER_LEARNING: 'transfer_learning',
  RLHF: 'rlhf',
  LORA: 'lora',
  QLORA: 'qlora',
  DISTILLATION: 'distillation',
} as const;

export const AI_TRAINING = {
  MAX_EPOCHS: 100,
  MIN_EPOCHS: 1,
  DEFAULT_EPOCHS: 10,
  MAX_BATCH_SIZE: 512,
  DEFAULT_BATCH_SIZE: 32,
  MIN_LEARNING_RATE: 0.0000001,
  MAX_LEARNING_RATE: 1.0,
  DEFAULT_LEARNING_RATE: 0.0001,
  MAX_TRAINING_HOURS: 168,
  VALIDATION_SPLIT: 0.2,
  TEST_SPLIT: 0.1,
  RANDOM_SEED: 42,
  EARLY_STOPPING_PATIENCE: 5,
  CHECKPOINT_INTERVAL: 1000,
  MAX_CHECKPOINTS: 5,
} as const;

export type AiTrainingStatusType = (typeof AI_TRAINING_STATUS)[keyof typeof AI_TRAINING_STATUS];
export type AiTrainingTypeType = (typeof AI_TRAINING_TYPE)[keyof typeof AI_TRAINING_TYPE];
