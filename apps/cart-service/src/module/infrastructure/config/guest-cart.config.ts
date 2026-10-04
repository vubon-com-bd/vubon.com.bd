/**
 * Guest Cart Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from './_helpers.js';
import { GUEST_TOKEN_LIMIT } from '@vubon/shared-constants/business/cart';

export const GUEST_CART_CONFIG = Object.freeze({
  TOKEN_MIN_LENGTH: GUEST_TOKEN_LIMIT.MIN_LENGTH,
  TOKEN_MAX_LENGTH: GUEST_TOKEN_LIMIT.MAX_LENGTH,
  TOKEN_TTL_SECONDS: GUEST_TOKEN_LIMIT.TTL_SECONDS,
  TOKEN_BYTES: getOptionalEnvInt('GUEST_TOKEN_BYTES', 32),
  AUTO_MERGE_ON_LOGIN: true,
} as const);

export type GuestCartConfig = typeof GUEST_CART_CONFIG;
