import { z } from 'zod';

/**
 * Environment Variables Schema
 * এনভায়রনমেন্ট ভেরিয়েবল স্কিমা
 */
export const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  HOST: z.string().default('0.0.0.0'),
  APP_NAME: z.string().default('Vubon Platform'),
  APP_VERSION: z.string().default('1.0.0'),
  TIMEZONE: z.string().default('Asia/Dhaka'),
  BASE_URL: z.string().default('http://localhost:3000'),
  API_PREFIX: z.string().default('/api'),

  // Database
  DATABASE_URL: z.string().default('postgresql://localhost:5432/vubon_db'),
  DATABASE_SSL: z
    .string()
    .transform((v: string) => v === 'true')
    .default('false'),
  DATABASE_POOL_MIN: z.string().transform(Number).default('2'),
  DATABASE_POOL_MAX: z.string().transform(Number).default('10'),
  DATABASE_SYNCHRONIZE: z
    .string()
    .transform((v: string) => v === 'true')
    .default('false'),
  DATABASE_LOGGING: z
    .string()
    .transform((v: string) => v === 'true')
    .default('false'),

  // Redis
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().default(''),
  REDIS_TTL_SESSION: z.string().transform(Number).default('86400'),
  REDIS_TTL_CACHE: z.string().transform(Number).default('3600'),
  REDIS_TTL_QUEUE: z.string().transform(Number).default('604800'),
  REDIS_TTL_OTP: z.string().transform(Number).default('300'),
  REDIS_TTL_VERIFICATION: z.string().transform(Number).default('86400'),

  // JWT
  JWT_SECRET: z.string().min(32).default('jwt-secret-key-change-in-production'),
  JWT_EXPIRES_IN: z.string().default('1h'),
  JWT_REFRESH_SECRET: z.string().min(32).default('jwt-refresh-secret-key-change-in-production'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  JWT_ISSUER: z.string().default('vubon-platform'),
  JWT_AUDIENCE: z.string().default('vubon-users'),

  // Rate Limit
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX: z.string().transform(Number).default('100'),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000,http://localhost:3001'),
  CORS_MAX_AGE: z.string().transform(Number).default('86400'),

  // Payment Gateways
  SSLCOMMERZ_STORE_ID: z.string().default('test_store_id'),
  SSLCOMMERZ_STORE_PASSWORD: z.string().default('test_store_password'),
  SSLCOMMERZ_SANDBOX: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  BKASH_APP_KEY: z.string().default('test_app_key'),
  BKASH_APP_SECRET: z.string().default('test_app_secret'),
  BKASH_USERNAME: z.string().default('test_username'),
  BKASH_PASSWORD: z.string().default('test_password'),
  BKASH_SANDBOX: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  NAGAD_MERCHANT_ID: z.string().default('test_merchant_id'),
  NAGAD_MERCHANT_SECRET: z.string().default('test_merchant_secret'),
  NAGAD_SANDBOX: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  ROCKET_MERCHANT_ID: z.string().default('test_merchant_id'),
  ROCKET_MERCHANT_SECRET: z.string().default('test_merchant_secret'),
  ROCKET_SANDBOX: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  DEFAULT_PAYMENT_GATEWAY: z.enum(['sslcommerz', 'bkash', 'nagad', 'rocket']).default('sslcommerz'),

  // SMS
  SMS_PROVIDER: z.enum(['banglasms', 'sendsms', 'twilio', 'mim']).default('banglasms'),
  SMS_API_KEY: z.string().default(''),
  SMS_API_SECRET: z.string().default(''),
  SMS_SENDER_ID: z.string().default('VUBON'),
  SMS_TEST_MODE: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  // Email
  EMAIL_PROVIDER: z.enum(['sendgrid', 'mailgun', 'aws', 'smtp']).default('sendgrid'),
  EMAIL_API_KEY: z.string().default(''),
  EMAIL_API_SECRET: z.string().default(''),
  EMAIL_FROM: z.string().default('noreply@vubon.com.bd'),
  EMAIL_TEST_MODE: z
    .string()
    .transform((v: string) => v === 'true')
    .default('true'),

  // Debug
  DEBUG: z
    .string()
    .transform((v: string) => v === 'true')
    .default('false'),
});

export type EnvSchema = z.infer<typeof envSchema>;
