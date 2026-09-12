import { getOptionalEnv } from './env/env.validation';

export const redisConfig = {
  host: getOptionalEnv('REDIS_HOST', 'localhost'),
  port: Number(getOptionalEnv('REDIS_PORT', '6379')),
  password: getOptionalEnv('REDIS_PASSWORD', ''),
  db: Number(getOptionalEnv('REDIS_DB', '0')),
  keyPrefix: 'vubon:',
  retryStrategy: (times: number) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: true,
} as const;
