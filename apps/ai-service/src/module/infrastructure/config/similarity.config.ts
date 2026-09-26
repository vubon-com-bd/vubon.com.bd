import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SIMILARITY_CONFIG = Object.freeze({
  defaultThreshold: getOptionalEnvInt('SIMILARITY_DEFAULT_THRESHOLD', 70) / 100,
  strictThreshold: getOptionalEnvInt('SIMILARITY_STRICT_THRESHOLD', 90) / 100,
  maxCandidates: getOptionalEnvInt('SIMILARITY_MAX_CANDIDATES', 1000),
  defaultMetric: 'cosine',
} as const);
