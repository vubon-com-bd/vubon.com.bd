import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const REPORT_CONFIG = Object.freeze({
  maxRowsPerExport: getOptionalEnvInt('REPORT_MAX_ROWS_EXPORT', 100_000),
  maxReportsPerOwner: getOptionalEnvInt('REPORT_MAX_PER_OWNER', 50),
  generationTimeoutMs: getOptionalEnvInt('REPORT_GEN_TIMEOUT_MS', 300_000),
  defaultFormat: 'json' as const,
  cacheTtlSeconds: getOptionalEnvInt('REPORT_CACHE_TTL', 1800),
  enableScheduling: getOptionalEnvBool('REPORT_ENABLE_SCHEDULING', true),
  maxRecipients: getOptionalEnvInt('REPORT_MAX_RECIPIENTS', 50),
  retentionDays: getOptionalEnvInt('REPORT_RETENTION_DAYS', 90),
} as const);
