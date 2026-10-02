/**
 * Cart Expiry Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from './_helpers.js';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export const CART_EXPIRY_CONFIG = Object.freeze({
  USER_CART_TTL_HOURS: getOptionalEnvInt('CART_USER_TTL_HOURS', 720),
  GUEST_CART_TTL_HOURS: getOptionalEnvInt('CART_GUEST_TTL_HOURS', 168),
  REDIS_TTL_SECONDS: getOptionalEnvInt('CART_REDIS_TTL', CACHE_TTL.SEVEN_DAYS),
  EXPIRY_SCAN_INTERVAL_MS: getOptionalEnvInt('CART_EXPIRY_SCAN_INTERVAL_MS', 3600_000),
} as const);

export type CartExpiryConfig = typeof CART_EXPIRY_CONFIG;
