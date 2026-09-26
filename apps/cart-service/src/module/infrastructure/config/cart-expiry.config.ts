import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_EXPIRY_CONFIG = Object.freeze({
  activeCartTtlSeconds: getOptionalEnvInt('CART_ACTIVE_TTL', 86400 * 7),
  guestCartTtlSeconds: getOptionalEnvInt('CART_GUEST_TTL', 86400 * 3),
  savedCartTtlSeconds: getOptionalEnvInt('CART_SAVED_TTL', 86400 * 30),
  abandonedCartTtlSeconds: getOptionalEnvInt('CART_ABANDONED_TTL', 86400 * 90),
} as const);
