import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const RETENTION_CONFIG = Object.freeze({
  eventRetentionDays: getOptionalEnvInt('RETENTION_EVENT_DAYS', 365),
  metricRetentionDays: getOptionalEnvInt('RETENTION_METRIC_DAYS', 730),
  sessionRetentionDays: getOptionalEnvInt('RETENTION_SESSION_DAYS', 180),
  pageViewRetentionDays: getOptionalEnvInt('RETENTION_PAGEVIEW_DAYS', 90),
  reportRetentionDays: getOptionalEnvInt('RETENTION_REPORT_DAYS', 90),
  analyticsRetentionDays: getOptionalEnvInt('RETENTION_ANALYTICS_DAYS', 1825),
  cleanupScheduleCron: '0 3 * * *',
  enableAutoCleanup: getOptionalEnvBool('RETENTION_AUTO_CLEANUP', true),
  batchSize: getOptionalEnvInt('RETENTION_BATCH_SIZE', 1000),
} as const);
