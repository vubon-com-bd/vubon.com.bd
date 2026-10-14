/**
 * Performance configuration
 * @module vendor-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PERFORMANCE_CONFIG = Object.freeze({
  evaluationPeriodDays: getOptionalEnvInt('PERF_EVAL_PERIOD_DAYS', 30),
  minOrdersForEvaluation: getOptionalEnvInt('PERF_MIN_ORDERS', 10),
  warningBelow: getOptionalEnvInt('PERF_WARNING_BELOW', 60),
  autoSuspendBelow: getOptionalEnvInt('PERF_AUTO_SUSPEND_BELOW', 40),
} as const);
