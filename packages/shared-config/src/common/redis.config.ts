import { getEnv } from './env/env.validation';

export const redisConfig = {
  host: getEnv('REDIS_HOST', 'localhost'),
  port: getEnv('REDIS_PORT', 6379),
  password: getEnv('REDIS_PASSWORD', undefined),
  db: getEnv('REDIS_DB', 0),
  keyPrefix: 'vubon:',
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,
};
