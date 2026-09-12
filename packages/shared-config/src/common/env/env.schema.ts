import { z } from 'zod';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';
import { LOG_LEVEL } from '@vubon/shared-constants/src/common/log-level.constants';
import { LOCALE } from '@vubon/shared-constants/src/common/locale.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';
import { TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';

const envValues = Object.values(ENVIRONMENT) as [string, ...string[]];
const logLevelValues = Object.values(LOG_LEVEL) as [string, ...string[]];
const localeValues = Object.values(LOCALE) as [string, ...string[]];
const currencyValues = Object.keys(CURRENCY) as [string, ...string[]];
const timezoneValues = Object.values(TIMEZONE) as [string, ...string[]];

export const EnvSchema = z.object({
  NODE_ENV: z.enum(envValues).default(ENVIRONMENT.DEVELOPMENT),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  API_URL: z.string().url().default('http://localhost:3000'),
  API_VERSION: z.string().default('v1'),
  LOG_LEVEL: z.enum(logLevelValues).default(LOG_LEVEL.INFO),
  TIMEZONE: z.enum(timezoneValues).default(TIMEZONE.DHAKA),
  LOCALE: z.enum(localeValues).default(LOCALE.BN_BD),
  CURRENCY: z.enum(currencyValues).default('BDT'),
  DB_HOST: z.string().min(1).default('localhost'),
  DB_PORT: z.coerce.number().int().min(1).max(65535).default(5432),
  DB_USER: z.string().min(1).default('postgres'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD is required'),
  DB_NAME: z.string().min(1).default('vubon'),
  DB_SSL: z.coerce.boolean().default(false),
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().min(1).max(65535).default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().int().min(0).default(0),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  ENCRYPTION_KEY: z.string().length(64, 'ENCRYPTION_KEY must be 64 hex characters'),
  ENCRYPTION_IV: z.string().length(24, 'ENCRYPTION_IV must be 24 characters').optional(),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().int().default(587),
  SMTP_USER: z.string().default(''),
  SMTP_PASS: z.string().default(''),
  SMS_API_KEY: z.string().optional(),
  SMS_API_SECRET: z.string().optional(),
  SSLCOMMERZ_STORE_ID: z.string().optional(),
  SSLCOMMERZ_STORE_PASSWORD: z.string().optional(),
  BKASH_APP_KEY: z.string().optional(),
  BKASH_APP_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  ELASTICSEARCH_URL: z.string().url().default('http://localhost:9200'),
  ELASTICSEARCH_USERNAME: z.string().default('elastic'),
  ELASTICSEARCH_PASSWORD: z.string().optional(),
  CORS_ORIGINS: z.string().default('http://localhost:3000,http://localhost:3001'),
  DEVICE_FINGERPRINT_SALT: z
    .string()
    .min(16, 'DEVICE_FINGERPRINT_SALT must be at least 16 characters'),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  FACEBOOK_CLIENT_ID: z.string().optional(),
  FACEBOOK_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;
