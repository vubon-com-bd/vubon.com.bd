/**
 * Reporting base configuration
 * @module shared-config/platform/reporting
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REPORTING_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REPORTING_ENABLED', true),
  maxRows: getOptionalEnvInt('REPORT_MAX_ROWS', 1000000),
  maxConcurrentJobs: getOptionalEnvInt('REPORT_MAX_CONCURRENT_JOBS', 5),
  queryTimeoutMs: getOptionalEnvInt('REPORT_QUERY_TIMEOUT_MS', 60000),
  cacheTtlSeconds: getOptionalEnvInt('REPORT_CACHE_TTL_SECONDS', 300),
  retentionDays: getOptionalEnvInt('REPORT_RETENTION_DAYS', 365),
  maxFileSizeMb: getOptionalEnvInt('REPORT_MAX_FILE_SIZE_MB', 500),
});
