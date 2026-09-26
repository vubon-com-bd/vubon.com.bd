import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const COHORT_CONFIG = Object.freeze({
  minSize: getOptionalEnvInt('COHORT_MIN_SIZE', 10),
  maxSize: getOptionalEnvInt('COHORT_MAX_SIZE', 1_000_000),
  maxPeriods: getOptionalEnvInt('COHORT_MAX_PERIODS', 365),
  defaultPeriod: 'weekly' as const,
  analysisCacheTtlSeconds: getOptionalEnvInt('COHORT_ANALYSIS_CACHE_TTL', 3600),
  autoRebuildEnabled: getOptionalEnvBool('COHORT_AUTO_REBUILD', true),
  healthyDay1Threshold: getOptionalEnvInt('COHORT_HEALTHY_DAY1', 40),
  healthyDay30Threshold: getOptionalEnvInt('COHORT_HEALTHY_DAY30', 15),
} as const);
