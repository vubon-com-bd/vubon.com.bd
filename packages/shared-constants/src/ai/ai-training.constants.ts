import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { AI_MODEL } from './ai-model.constants';

export const AI_TRAINING = {
  STATUS: {
    ...COMMON_STATUS,
    QUEUED: 'queued',
    PREPARING: 'preparing',
    RUNNING: 'running',
    EVALUATING: 'evaluating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PAUSED: 'paused',
  },
  TYPES: {
    ...COMMON_TYPES,
    SUPERVISED: 'supervised',
    UNSUPERVISED: 'unsupervised',
    SEMI_SUPERVISED: 'semi_supervised',
    REINFORCEMENT: 'reinforcement',
    TRANSFER: 'transfer',
    FINE_TUNING: 'fine_tuning',
  },
  AI_MODEL: { ...AI_MODEL },
  TRAINING_CONFIGS: {
    BATCH_SIZE: 32,
    EPOCHS: 100,
    LEARNING_RATE: 0.001,
    OPTIMIZER: 'adam',
    LOSS_FUNCTION: 'cross_entropy',
  },
  TRAINING_DATA_SPLIT: {
    TRAIN: 0.7,
    VALIDATION: 0.15,
    TEST: 0.15,
  },
  MAX_TRAINING_EPOCHS: 1000,
  EARLY_STOPPING_PATIENCE: 10,
  MIN_TRAINING_DATA_SIZE: 100,
  MAX_TRAINING_DATA_SIZE: 1000000,
} as const;
