import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const DRIFT_CONFIG = Object.freeze({
  defaultThreshold: getOptionalEnvInt('DRIFT_DEFAULT_THRESHOLD', 20) / 100,
  lowSeverityMultiplier: 1.5,
  mediumSeverityMultiplier: 2.5,
  checkIntervalMs: getOptionalEnvInt('DRIFT_CHECK_INTERVAL_MS', 3600000),
  retrainingEnabled: true,
} as const);
