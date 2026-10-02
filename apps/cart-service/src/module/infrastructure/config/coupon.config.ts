/**
 * Coupon Config
 * @module cart-service/infrastructure/config
 */
import { getOptionalEnvInt } from './_helpers.js';
import { COUPON_LIMIT } from '@vubon/shared-constants/business/cart';

export const COUPON_CONFIG = Object.freeze({
  CODE_MIN_LENGTH: COUPON_LIMIT.CODE_MIN_LENGTH,
  CODE_MAX_LENGTH: COUPON_LIMIT.CODE_MAX_LENGTH,
  MAX_USES: COUPON_LIMIT.MAX_USES,
  MAX_USES_PER_USER: COUPON_LIMIT.MAX_USES_PER_USER,
  MAX_DISCOUNT_AMOUNT: COUPON_LIMIT.MAX_DISCOUNT_AMOUNT,
  VALIDATION_CACHE_TTL: getOptionalEnvInt('COUPON_CACHE_TTL', 60),
} as const);

export type CouponConfig = typeof COUPON_CONFIG;
