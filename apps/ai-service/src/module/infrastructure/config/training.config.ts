import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const TRAINING_CONFIG = Object.freeze({
  maxEpochs: getOptionalEnvInt('TRAINING_MAX_EPOCHS', 1000),
  defaultEpochs: getOptionalEnvInt('TRAINING_DEFAULT_EPOCHS', 10),
  maxBatchSize: getOptionalEnvInt('TRAINING_MAX_BATCH_SIZE', 4096),
  defaultBatchSize: getOptionalEnvInt('TRAINING_DEFAULT_BATCH_SIZE', 32),
  checkpointIntervalEpochs: getOptionalEnvInt('TRAINING_CHECKPOINT_INTERVAL', 5),
  maxConcurrentJobs: getOptionalEnvInt('TRAINING_MAX_CONCURRENT', 3),
  jobTimeoutMs: getOptionalEnvInt('TRAINING_JOB_TIMEOUT_MS', 3600000),
} as const);
