/**
 * Cart Expiry Configuration
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_EXPIRY_CONFIG = Object.freeze({
  userCartHours: getOptionalEnvInt('CART_EXPIRY_HOURS', 720),
  guestCartHours: getOptionalEnvInt('CART_GUEST_EXPIRY_HOURS', 168),
  sessionTtlSeconds: getOptionalEnvInt('CART_SESSION_TTL', 2592000),
  cleanupBatchSize: getOptionalEnvInt('CART_CLEANUP_BATCH', 100),
});
