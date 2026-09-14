/**
 * Base rate limit configuration
 * @module shared-config/security/rate-limit
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv();

export const RATE_LIMIT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('RATE_LIMIT_ENABLED', true),
  driver: getOptionalEnv('RATE_LIMIT_DRIVER', 'redis'), // redis | memory
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  keyPrefix: getOptionalEnv('RATE_LIMIT_PREFIX', 'vubon:rate:'),
  skipSuccessfulRequests: getOptionalEnvBool('RATE_LIMIT_SKIP_SUCCESS', false),
  skipFailedRequests: getOptionalEnvBool('RATE_LIMIT_SKIP_FAILED', false),
  standardHeaders: getOptionalEnvBool('RATE_LIMIT_STANDARD_HEADERS', true),
  legacyHeaders: getOptionalEnvBool('RATE_LIMIT_LEGACY_HEADERS', false),
  trustProxy: getOptionalEnvBool('RATE_LIMIT_TRUST_PROXY', true),
  maxBlockDurationMs: getOptionalEnvInt('RATE_LIMIT_MAX_BLOCK_MS', 3600000),
} as const);

export type RateLimitConfig = typeof RATE_LIMIT_CONFIG;
