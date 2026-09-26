import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const SEARCH_CONFIG = Object.freeze({
  defaultLimit: getOptionalEnvInt('SEARCH_DEFAULT_LIMIT', 20),
  maxLimit: getOptionalEnvInt('SEARCH_MAX_LIMIT', 100),
  semanticWeight: 0.7,
  keywordWeight: 0.3,
  defaultThreshold: 0.7,
  timeoutMs: getOptionalEnvInt('SEARCH_TIMEOUT_MS', 10000),
} as const);
