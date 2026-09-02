/**
 * Redis Configuration
 * রেডিস কনফিগারেশন
 */
export interface RedisConfig {
  url: string;
  host: string;
  port: number;
  password: string;
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

export const redisConfig = (): RedisConfig => ({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
  ttl: {
    session: parseInt(process.env.REDIS_TTL_SESSION || '86400'), // 24 hours
    cache: parseInt(process.env.REDIS_TTL_CACHE || '3600'), // 1 hour
    queue: parseInt(process.env.REDIS_TTL_QUEUE || '604800'), // 7 days
    otp: parseInt(process.env.REDIS_TTL_OTP || '300'), // 5 minutes
    verification: parseInt(process.env.REDIS_TTL_VERIFICATION || '86400'), // 24 hours
  },
  prefix: {
    session: 'session:',
    cache: 'cache:',
    queue: 'queue:',
    otp: 'otp:',
  },
});
