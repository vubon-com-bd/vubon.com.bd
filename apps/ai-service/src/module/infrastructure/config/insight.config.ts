import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const INSIGHT_CONFIG = Object.freeze({
  defaultPriority: 'medium',
  minConfidence: getOptionalEnvInt('INSIGHT_MIN_CONFIDENCE', 50) / 100,
  highConfidenceThreshold: getOptionalEnvInt('INSIGHT_HIGH_CONFIDENCE', 80) / 100,
  anomalyZScoreThreshold: getOptionalEnvInt('INSIGHT_ANOMALY_ZSCORE', 2),
  maxFindings: getOptionalEnvInt('INSIGHT_MAX_FINDINGS', 100),
} as const);
