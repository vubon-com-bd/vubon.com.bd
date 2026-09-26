import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CLUSTER_CONFIG = Object.freeze({
  defaultAlgorithm: 'kmeans',
  defaultMaxIterations: getOptionalEnvInt('CLUSTER_MAX_ITERATIONS', 100),
  minVectors: getOptionalEnvInt('CLUSTER_MIN_VECTORS', 2),
  maxK: getOptionalEnvInt('CLUSTER_MAX_K', 100),
  minK: 2,
} as const);
