import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const COUPON_CONFIG = Object.freeze({
  validationCacheTtlSeconds: getOptionalEnvInt('COUPON_CACHE_TTL', 300),
  maxCodeLength: getOptionalEnvInt('COUPON_MAX_CODE_LEN', 32),
  minCodeLength: getOptionalEnvInt('COUPON_MIN_CODE_LEN', 4),
  crossServiceTimeoutMs: getOptionalEnvInt('COUPON_API_TIMEOUT', 5000),
  marketingServiceUrl: getOptionalEnv('MARKETING_SERVICE_URL', 'http://localhost:3006'),
} as const);
