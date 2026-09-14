/**
 * Checkout session configuration
 * @module shared-config/business/checkout
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CHECKOUT_SESSION_CONFIG = Object.freeze({
  ttlSeconds: getOptionalEnvInt('CHECKOUT_SESSION_TTL', 3600),
  maxAttempts: getOptionalEnvInt('CHECKOUT_MAX_ATTEMPTS', 3),
  cleanupIntervalSeconds: getOptionalEnvInt('CHECKOUT_CLEANUP_INTERVAL', 600),
  autoAbandonHours: getOptionalEnvInt('CHECKOUT_AUTO_ABANDON_HOURS', 24),
  idempotencyEnabled: getOptionalEnvBool('CHECKOUT_IDEMPOTENCY', true),
  idempotencyTtlSeconds: getOptionalEnvInt('CHECKOUT_IDEMPOTENCY_TTL', 86400),
});
