/**
 * Report Configuration
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const REPORT_CONFIG = Object.freeze({
  generationEnabled: getOptionalEnvBool('ANALYTICS_REPORT_GEN_ENABLED', true),
  maxConcurrent: getOptionalEnvInt('ANALYTICS_REPORT_MAX_CONCURRENT', 5),
  maxRowsPerReport: getOptionalEnvInt('ANALYTICS_REPORT_MAX_ROWS', 100000),
  maxFileSizeMb: getOptionalEnvInt('ANALYTICS_REPORT_MAX_SIZE_MB', 100),
  defaultFormat: getOptionalEnv('ANALYTICS_REPORT_DEFAULT_FORMAT', 'csv'),
  defaultFrequency: getOptionalEnv('ANALYTICS_REPORT_DEFAULT_FREQUENCY', 'daily'),
  storageBucket: getOptionalEnv('ANALYTICS_REPORT_BUCKET', 'vubon-analytics'),
  retentionDays: getOptionalEnvInt('ANALYTICS_REPORT_RETENTION_DAYS', 365),
  notifyOnComplete: getOptionalEnvBool('ANALYTICS_REPORT_NOTIFY_COMPLETE', true),
});
