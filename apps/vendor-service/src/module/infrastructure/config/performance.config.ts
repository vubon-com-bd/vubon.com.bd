import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PERFORMANCE_CONFIG = Object.freeze({
  evaluationPeriodDays: getOptionalEnvInt('PERFORMANCE_EVAL_DAYS', 30),
  minOrdersForRating: getOptionalEnvInt('PERFORMANCE_MIN_ORDERS', 5),
  responseTimeTargetHours: getOptionalEnvInt('PERFORMANCE_RESPONSE_TARGET', 24),
} as const);
