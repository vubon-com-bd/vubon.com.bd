/**
 * Cart Redis Configuration
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_REDIS_CONFIG = Object.freeze({
  keyPrefix: 'cart:svc:',
  defaultTtlSeconds: getOptionalEnvInt('CART_REDIS_TTL', 604800),
  lockTtlSeconds: getOptionalEnvInt('CART_REDIS_LOCK_TTL', 30),
  idempotencyTtlSeconds: getOptionalEnvInt('CART_IDEMPOTENCY_TTL', 86400),
  maxKeysPerScan: getOptionalEnvInt('CART_REDIS_SCAN_LIMIT', 1000),
});
