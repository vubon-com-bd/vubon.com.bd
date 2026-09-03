export interface RedisConfig {
  host: string;
  port: number;
  password: string;
  db: number;
  ttl: {
    session: number;
    cache: number;
    queue: number;
    otp: number;
    verification: number;
  };
  prefix: {
    session: string;
    cache: string;
    queue: string;
    otp: string;
  };
}

export const getRedisConfig = (): RedisConfig => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_DB || '0'),
  ttl: {
    session: parseInt(process.env.REDIS_TTL_SESSION || '86400'),
    cache: parseInt(process.env.REDIS_TTL_CACHE || '3600'),
    queue: parseInt(process.env.REDIS_TTL_QUEUE || '604800'),
    otp: parseInt(process.env.REDIS_TTL_OTP || '300'),
    verification: parseInt(process.env.REDIS_TTL_VERIFICATION || '86400'),
  },
  prefix: {
    session: 'session:',
    cache: 'cache:',
    queue: 'queue:',
    otp: 'otp:',
  },
});
