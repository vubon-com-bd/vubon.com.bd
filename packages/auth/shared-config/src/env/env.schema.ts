/**
 * Environment variable validation schema using Zod
 * Defines and validates all required environment variables
 */
import { z } from 'zod';

const emptyStringToUndefined = z.literal('').transform(() => undefined);

const optionalUrl = () =>
  z.union([z.string().url(), emptyStringToUndefined, z.undefined()]).optional();

export const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'test', 'production', 'staging']).default('development'),

  // Server Configuration
  PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive().max(65535)),

  HOST: z.string().default('localhost'),

  API_URL: optionalUrl(),

  APP_NAME: z.string().default('Auth Service'),

  // Database Configuration
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required').url('Invalid DATABASE_URL format'),

  DATABASE_MAX_CONNECTIONS: z
    .string()
    .default('20')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  DATABASE_IDLE_TIMEOUT: z
    .string()
    .default('30000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  DATABASE_CONNECTION_TIMEOUT: z
    .string()
    .default('5000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  // JWT Configuration
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),

  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),

  JWT_ACCESS_EXPIRY: z.string().default('15m'),

  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // Auth Configuration
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),

  ENCRYPTION_KEY: z
    .union([
      z.string().min(32, 'ENCRYPTION_KEY must be at least 32 characters'),
      emptyStringToUndefined,
      z.undefined(),
    ])
    .optional(),

  // Email Configuration
  SMTP_HOST: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  SMTP_PORT: z
    .union([z.string(), emptyStringToUndefined, z.undefined()])
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().max(65535).optional()),

  SMTP_USER: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  SMTP_PASS: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  SMTP_FROM: z
    .union([
      z.string().email('SMTP_FROM must be a valid email'),
      emptyStringToUndefined,
      z.undefined(),
    ])
    .optional(),

  // Redis Configuration
  REDIS_URL: optionalUrl(),
  REDIS_HOST: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  REDIS_PORT: z
    .union([z.string(), emptyStringToUndefined, z.undefined()])
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().positive().max(65535).optional()),

  REDIS_PASSWORD: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  REDIS_DB: z
    .union([z.string(), emptyStringToUndefined, z.undefined()])
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().nonnegative().optional()),

  // CORS Configuration
  CORS_ORIGIN: z
    .string()
    .default('*')
    .transform((val) => {
      if (val === '*') return ['*'];
      return val.split(',').map((origin) => origin.trim());
    })
    .pipe(z.array(z.string())),

  CORS_CREDENTIALS: z
    .string()
    .default('true')
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default('900000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .default('100')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  // Security
  BCRYPT_ROUNDS: z
    .string()
    .default('12')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive().min(10).max(15)),

  SALT_ROUNDS: z
    .string()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'trace']).default('info'),

  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),

  // Feature Flags
  ENABLE_EMAIL_VERIFICATION: z
    .string()
    .default('true')
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  ENABLE_TWO_FACTOR_AUTH: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  ENABLE_PASSWORD_RESET: z
    .string()
    .default('true')
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  ENABLE_SOCIAL_LOGIN: z
    .string()
    .default('false')
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  // OAuth Configuration
  GOOGLE_CLIENT_ID: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  GOOGLE_CLIENT_SECRET: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  GITHUB_CLIENT_ID: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  GITHUB_CLIENT_SECRET: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  FACEBOOK_CLIENT_ID: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),
  FACEBOOK_CLIENT_SECRET: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  // Monitoring
  SENTRY_DSN: optionalUrl(),
  NEW_RELIC_LICENSE_KEY: z.union([z.string(), emptyStringToUndefined, z.undefined()]).optional(),

  // Cache
  CACHE_TTL: z
    .string()
    .default('3600')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().nonnegative()),

  CACHE_MAX_ITEMS: z
    .string()
    .default('1000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),

  // Service URLs
  USER_SERVICE_URL: optionalUrl(),
  EMAIL_SERVICE_URL: optionalUrl(),
  NOTIFICATION_SERVICE_URL: optionalUrl(),

  // Testing
  TEST_DATABASE_URL: optionalUrl(),
  TEST_REDIS_URL: optionalUrl(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validatedEnv = (env: Record<string, string | undefined>): EnvConfig => {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  return result.data;
};

export const strictEnvSchema = envSchema
  .refine(
    (data) => {
      if (data.NODE_ENV === 'production') {
        return !!data.JWT_SECRET && data.JWT_SECRET.length >= 32;
      }
      return true;
    },
    {
      message: 'JWT_SECRET must be at least 32 characters in production',
      path: ['JWT_SECRET'],
    },
  )
  .refine(
    (data) => {
      if (data.NODE_ENV === 'production') {
        return !!data.SESSION_SECRET && data.SESSION_SECRET.length >= 32;
      }
      return true;
    },
    {
      message: 'SESSION_SECRET must be at least 32 characters in production',
      path: ['SESSION_SECRET'],
    },
  )
  .refine(
    (data) => {
      if (data.ENABLE_EMAIL_VERIFICATION) {
        return !!data.SMTP_HOST && !!data.SMTP_USER && !!data.SMTP_PASS;
      }
      return true;
    },
    {
      message: 'SMTP configuration is required when email verification is enabled',
      path: ['SMTP_HOST'],
    },
  );

export type StrictEnvConfig = z.infer<typeof strictEnvSchema>;

export const validateStrictEnv = (env: Record<string, string | undefined>): StrictEnvConfig => {
  const result = strictEnvSchema.safeParse(env);

  if (!result.success) {
    const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
    throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
  }

  return result.data;
};
