import { z } from 'zod';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';

const envKeys = Object.keys(ENVIRONMENT) as [string, ...string[]];
const logLevelKeys = Object.keys(LOG_LEVEL) as [string, ...string[]];

export const EnvSchema = z.object({
  NODE_ENV: z.enum(envKeys).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  API_URL: z.string().url().default('http://localhost:3000'),
  API_VERSION: z.string().default('v1'),
  LOG_LEVEL: z.enum(logLevelKeys).default('info'),
  TIMEZONE: z.string().default('Asia/Dhaka'),
  LOCALE: z.string().default('bn_BD'),
  CURRENCY: z.string().default('BDT'),
  // Database
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().transform(Number).default('5432'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('password'),
  DB_NAME: z.string().default('vubon'),
  DB_SSL: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().transform(Number).default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.string().transform(Number).default('0'),
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  // Encryption
  ENCRYPTION_KEY: z.string().min(32).optional(),
  ENCRYPTION_IV: z.string().min(16).optional(),
  // Services
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.string().transform(Number).default('587'),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  SMS_API_KEY: z.string().optional(),
  SMS_API_SECRET: z.string().optional(),
  // Payment Gateways
  SSLCOMMERZ_STORE_ID: z.string().optional(),
  SSLCOMMERZ_STORE_PASSWORD: z.string().optional(),
  BKASH_APP_KEY: z.string().optional(),
  BKASH_APP_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
});
