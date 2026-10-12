/**
 * Retention Policy Configuration
 *
 * Analytics data retention rules per entity type.
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const RETENTION_POLICY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ANALYTICS_RETENTION_ENABLED', true),
  checkIntervalMs: getOptionalEnvInt('ANALYTICS_RETENTION_INTERVAL_MS', 86400000),
  batchSize: getOptionalEnvInt('ANALYTICS_RETENTION_BATCH_SIZE', 10000),

  eventRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_EVENT_DAYS', 730),
  metricRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_METRIC_DAYS', 730),
  sessionRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_SESSION_DAYS', 730),
  pageViewRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_PAGEVIEW_DAYS', 365),
  reportRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_REPORT_DAYS', 365),
  kpiResultRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_KPI_RESULT_DAYS', 730),
  cohortAnalysisRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_COHORT_DAYS', 730),
  attributionRetentionDays: getOptionalEnvInt('ANALYTICS_RETENTION_ATTR_DAYS', 730),

  archiveBeforeDelete: getOptionalEnvBool('ANALYTICS_RETENTION_ARCHIVE', true),
  hardDelete: getOptionalEnvBool('ANALYTICS_RETENTION_HARD_DELETE', true),
});
