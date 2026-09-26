import { getEnv, getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const CART_REDIS_CONFIG = Object.freeze({
  url: getEnv('REDIS_URL'),
  keyPrefix: getOptionalEnv('REDIS_CART_PREFIX', 'cart:'),
  db: getOptionalEnvInt('REDIS_CART_DB', 3),
  maxRetriesPerRequest: getOptionalEnvInt('REDIS_MAX_RETRIES', 3),
  enableReadyCheck: true,
  lazyConnect: false,
} as const);
