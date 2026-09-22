import Redis from 'ioredis';
import { CART_REDIS_CONFIG } from '../../config/redis.config';

export const cartRedisClient = new Redis(CART_REDIS_CONFIG.url, {
  keyPrefix: CART_REDIS_CONFIG.keyPrefix,
  db: CART_REDIS_CONFIG.db,
  maxRetriesPerRequest: CART_REDIS_CONFIG.maxRetriesPerRequest,
  enableReadyCheck: CART_REDIS_CONFIG.enableReadyCheck,
  lazyConnect: CART_REDIS_CONFIG.lazyConnect,
});
