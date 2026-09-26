/**
 * Zod schema for runtime environment validation
 * @module shared-config/common/env
 */
import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']),
  APP_NAME: z.string().min(1).max(100).default('Vubon'),
  APP_VERSION: z.string().min(1).max(50).default('1.0.0'),
  APP_PORT: z.coerce.number().int().positive().max(65535).default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('http://localhost:3000/api'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),

  DATABASE_URL: z.string().url(),
  DB_POOL_MIN: z.coerce.number().int().nonnegative().default(2),
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  DB_TIMEOUT_MS: z.coerce.number().int().positive().default(5000),

  REDIS_URL: z.string().url().optional(),
  REDIS_KEY_PREFIX: z.string().max(50).default('vubon:'),

  JWT_SECRET: z.string().min(32),
  JWT_ISSUER: z.string().min(1).default('vubon-api'),
  JWT_AUDIENCE: z.string().min(1).default('vubon-client'),
  JWT_ACCESS_EXPIRY: z.string().min(1).default('15m'),
  JWT_REFRESH_EXPIRY: z.string().min(1).default('7d'),

  CORS_ORIGINS: z.string().min(1),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  AUTH_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),

  FF_NEW_CHECKOUT: z.enum(['true', 'false']).default('false'),
  FF_AI_RECOMMENDATION: z.enum(['true', 'false']).default('true'),
  FF_DARK_MODE: z.enum(['true', 'false']).default('true'),
});

export type EnvSchemaType = z.infer<typeof EnvSchema>;
