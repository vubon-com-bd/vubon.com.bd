/**
 * Webhook retry configuration
 * @module shared-config/platform/webhook
 */
import { getOptionalEnvInt } from '../../common/env/env.helper';

export const WEBHOOK_RETRY_CONFIG = Object.freeze({
  maxRetries: getOptionalEnvInt('WEBHOOK_MAX_RETRIES', 5),
  delaysSeconds: Object.freeze([10, 30, 120, 600, 3600] as const),
  jitterMs: getOptionalEnvInt('WEBHOOK_RETRY_JITTER_MS', 1000),
  backoffType: 'exponential',
  retryOnStatusCodes: Object.freeze([408, 429, 500, 502, 503, 504] as const),
});
