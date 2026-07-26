/* global process */
/**
 * Environment variables schema validation using Zod
 * Defines all required and optional environment variables
 */

import { z } from 'zod';

/**
 * Environment variables schema
 * All environment variables must be defined here
 */
export const EnvSchema = z.object({
  /**
   * Node environment
   * @default 'development'
   */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  /**
   * Server port
   * @default 3000
   */
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('3000')
    .pipe(z.number().min(1).max(65535)),

  /**
   * Database connection URL
   * Required for database operations
   */
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .url('DATABASE_URL must be a valid URL'),

  /**
   * JWT secret key
   * Required for JWT token generation and verification
   * Must be at least 32 characters in production
   */
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters')
    .refine(
      (val) => {
        if (process.env.NODE_ENV === 'production') {
          return val.length >= 32;
        }
        return true;
      },
      {
        message: 'JWT_SECRET must be at least 32 characters in production',
      },
    ),

  /**
   * JWT expiration time
   * @default '7d'
   */
  JWT_EXPIRES_IN: z
    .string()
    .default('7d')
    .refine(
      (val) => {
        const regex = /^(\d+[smhdw])+$/;
        return regex.test(val);
      },
      {
        message: 'JWT_EXPIRES_IN must be a valid duration (e.g., 7d, 24h, 60m)',
      },
    ),

  /**
   * SMTP host for email sending
   * Required for email notifications
   */
  SMTP_HOST: z.string().optional().default('smtp.gmail.com'),

  /**
   * SMTP port
   * @default 587
   */
  SMTP_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('587')
    .pipe(z.number().min(1).max(65535))
    .optional(),

  /**
   * SMTP username
   * Required if SMTP is configured
   */
  SMTP_USER: z.string().optional(),

  /**
   * SMTP password
   * Required if SMTP is configured
   */
  SMTP_PASS: z.string().optional(),

  /**
   * From email address for sending emails
   * Required if SMTP is configured
   */
  SMTP_FROM: z.string().email('SMTP_FROM must be a valid email address').optional(),

  /**
   * Redis connection URL
   * Optional, for caching and session management
   */
  REDIS_URL: z.string().url('REDIS_URL must be a valid URL').optional(),

  /**
   * CORS allowed origins
   * Comma-separated list of allowed origins
   * @default '*'
   */
  CORS_ORIGINS: z
    .string()
    .default('*')
    .transform((val) => val.split(',').map((s) => s.trim()))
    .pipe(z.array(z.string())),

  /**
   * Rate limiting settings
   * Maximum number of requests per window
   * @default 100
   */
  RATE_LIMIT_MAX: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('100')
    .pipe(z.number().min(1)),

  /**
   * Rate limiting window in seconds
   * @default 60
   */
  RATE_LIMIT_WINDOW: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default('60')
    .pipe(z.number().min(1)),

  /**
   * Frontend URL for redirects
   * Required for email verification and password reset links
   */
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL').default('http://localhost:3000'),

  /**
   * API base URL
   * Required for API documentation and self-referential links
   */
  API_URL: z.string().url('API_URL must be a valid URL').default('http://localhost:3001'),

  /**
   * Log level
   * @default 'info'
   */
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'trace']).default('info'),

  /**
   * Enable debug mode
   * @default false
   */
  DEBUG: z
    .string()
    .transform((val) => val === 'true')
    .default('false')
    .pipe(z.boolean()),
});

/**
 * Type inference for environment variables
 */
export type Env = z.infer<typeof EnvSchema>;

/**
 * Development environment-specific schema overrides
 */
export const DevEnvSchema = EnvSchema.extend({
  NODE_ENV: z.literal('development'),
  DATABASE_URL: z.string().default('postgresql://localhost:5432/dev_db'),
  JWT_SECRET: z.string().default('dev-secret-key-min-32-chars-here-please'),
});

/**
 * Production environment-specific schema overrides
 */
export const ProdEnvSchema = EnvSchema.extend({
  NODE_ENV: z.literal('production'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required in production'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters in production'),
});

/**
 * Test environment-specific schema overrides
 */
export const TestEnvSchema = EnvSchema.extend({
  NODE_ENV: z.literal('test'),
  DATABASE_URL: z.string().default('postgresql://localhost:5432/test_db'),
  JWT_SECRET: z.string().default('test-secret-key-min-32-chars-here-please'),
});
