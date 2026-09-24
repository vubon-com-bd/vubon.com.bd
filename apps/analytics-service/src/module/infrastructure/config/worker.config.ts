import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const WORKER_CONFIG = Object.freeze({
  eventProcessorConcurrency: getOptionalEnvInt('WORKER_EVENT_CONCURRENCY', 10),
  metricAggregatorConcurrency: getOptionalEnvInt('WORKER_METRIC_CONCURRENCY', 5),
  kpiEvaluatorConcurrency: getOptionalEnvInt('WORKER_KPI_CONCURRENCY', 3),
  reportGeneratorConcurrency: getOptionalEnvInt('WORKER_REPORT_CONCURRENCY', 2),
  cohortBuilderConcurrency: getOptionalEnvInt('WORKER_COHORT_CONCURRENCY', 2),
  cleanupConcurrency: getOptionalEnvInt('WORKER_CLEANUP_CONCURRENCY', 1),
  jobTimeoutMs: getOptionalEnvInt('WORKER_JOB_TIMEOUT_MS', 300_000),
  maxRetries: getOptionalEnvInt('WORKER_MAX_RETRIES', 3),
  retryDelayMs: getOptionalEnvInt('WORKER_RETRY_DELAY_MS', 5000),
  enableMetrics: getOptionalEnvBool('WORKER_ENABLE_METRICS', true),
} as const);
