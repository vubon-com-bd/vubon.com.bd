import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ANALYTICS_CONFIG = Object.freeze({
  defaultGranularity: getOptionalEnv('ANALYTICS_DEFAULT_GRANULARITY', 'daily'),
  retentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_DAYS', 365),
  batchSize: getOptionalEnvInt('ANALYTICS_BATCH_SIZE', 1000),
} as const);
