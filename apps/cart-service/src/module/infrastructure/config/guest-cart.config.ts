import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const GUEST_CART_CONFIG = Object.freeze({
  tokenLength: getOptionalEnvInt('GUEST_TOKEN_LENGTH', 32),
  tokenTtlHours: getOptionalEnvInt('GUEST_TOKEN_TTL_HOURS', 72),
  maxActiveGuestCarts: getOptionalEnvInt('GUEST_MAX_CARTS', 5),
  autoMergeOnLogin: true,
} as const);
