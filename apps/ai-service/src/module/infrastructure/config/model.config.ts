import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const MODEL_CONFIG = Object.freeze({
  maxModelSizeMb: getOptionalEnvInt('MODEL_MAX_SIZE_MB', 5000),
  minAccuracyThreshold: getOptionalEnvInt('MODEL_MIN_ACCURACY', 80) / 100,
  deploymentTimeoutMs: getOptionalEnvInt('MODEL_DEPLOY_TIMEOUT_MS', 30000),
  maxConcurrentTraining: getOptionalEnvInt('MODEL_MAX_TRAINING', 3),
  artifactStorageBucket: getEnv('MODEL_ARTIFACT_BUCKET'),
} as const);

export type ModelConfig = typeof MODEL_CONFIG;
