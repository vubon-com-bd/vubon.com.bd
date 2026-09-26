import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const PROVIDER_CONFIG = Object.freeze({
  defaultTimeoutMs: getOptionalEnvInt('PROVIDER_TIMEOUT_MS', 30000),
  defaultMaxRetries: getOptionalEnvInt('PROVIDER_MAX_RETRIES', 3),
  circuitBreakerThreshold: getOptionalEnvInt('PROVIDER_CB_THRESHOLD', 5),
  circuitBreakerCooldownMs: getOptionalEnvInt('PROVIDER_CB_COOLDOWN_MS', 60000),
  healthCheckIntervalMs: getOptionalEnvInt('PROVIDER_HEALTH_INTERVAL_MS', 30000),
} as const);
