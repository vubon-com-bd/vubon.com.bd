/**
 * Cache key naming conventions
 * @module shared-config/infrastructure/cache
 *
 * Values আসে shared-constants/infrastructure/cache.constants থেকে।
 */
import { CACHE_PREFIX } from '@vubon/shared-constants/infrastructure';
import { getOptionalEnvInt } from '../../common/env/env.helper';

export const CACHE_KEY_CONFIG = Object.freeze({
  separator: ':',
  prefixes: Object.freeze({
    user: CACHE_PREFIX.USER,
    product: CACHE_PREFIX.PRODUCT,
    cart: CACHE_PREFIX.CART,
    order: CACHE_PREFIX.ORDER,
    session: CACHE_PREFIX.SESSION,
    token: CACHE_PREFIX.TOKEN,
    otp: CACHE_PREFIX.OTP,
    rateLimit: CACHE_PREFIX.RATE_LIMIT,
    permission: CACHE_PREFIX.PERMISSION,
    config: CACHE_PREFIX.CONFIG,
  }),
  maxSegments: getOptionalEnvInt('CACHE_KEY_MAX_SEGMENTS', 8),
  maxSegmentLength: getOptionalEnvInt('CACHE_KEY_MAX_SEGMENT_LENGTH', 64),
  hashLongKeys: true,
  hashThresholdLength: getOptionalEnvInt('CACHE_KEY_HASH_THRESHOLD', 200),
} as const);

export type CacheKeyConfig = typeof CACHE_KEY_CONFIG;
