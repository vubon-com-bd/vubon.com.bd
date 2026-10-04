/**
 * Activity Config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common/env';

export const ACTIVITY_CONFIG = Object.freeze({
  retentionDays: getOptionalEnvInt('ACTIVITY_RETENTION_DAYS', 90),
  cleanupBatchSize: getOptionalEnvInt('ACTIVITY_CLEANUP_BATCH', 1000),
  statsCacheTtl: getOptionalEnvInt('ACTIVITY_STATS_CACHE_TTL', 600),
} as const);

export type ActivityConfig = typeof ACTIVITY_CONFIG;
