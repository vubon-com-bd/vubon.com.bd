import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const WEBHOOK_CONFIG = Object.freeze({
  maxRetries: getOptionalEnvInt('WEBHOOK_MAX_RETRIES', 5),
  retryDelayMs: getOptionalEnvInt('WEBHOOK_RETRY_DELAY_MS', 2000),
  idempotencyTtlSeconds: getOptionalEnvInt('WEBHOOK_IDEMPOTENCY_TTL', 86400),
  signatureHeaderPrefix: 'x-webhook-signature',
} as const);
