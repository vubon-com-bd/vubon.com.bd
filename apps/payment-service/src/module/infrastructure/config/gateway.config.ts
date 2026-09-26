import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const GATEWAY_CONFIG = Object.freeze({
  defaultTimeoutMs: getOptionalEnvInt('GATEWAY_TIMEOUT_MS', 30000),
  retryAttempts: getOptionalEnvInt('GATEWAY_RETRY_ATTEMPTS', 3),
  retryDelayMs: getOptionalEnvInt('GATEWAY_RETRY_DELAY_MS', 1000),
  circuitBreakerThreshold: getOptionalEnvInt('GATEWAY_CB_THRESHOLD', 50),
  circuitBreakerResetMs: getOptionalEnvInt('GATEWAY_CB_RESET_MS', 60000),
  sandboxMode: getOptionalEnv('GATEWAY_SANDBOX', 'true') === 'true',
} as const);
