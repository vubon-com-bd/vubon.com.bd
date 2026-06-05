/**
 * Environment Schema - Type-safe environment contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-config/src/env/env.schema

 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO runtime mutation, side effects
 * ✅ Strict validation with meaningful error messages
 * ✅ Readonly type exports
 */

import { z } from 'zod';
// ✅ FIXED: Correct package name and import specific types
import type { 
  JWT_CONFIG, 
  RATE_LIMITS, 
  SESSION_SECURITY, 
  ENCRYPTION_CONFIG,
  CORS_CONFIG 
} from '@vubon/shared-constants';

// ==================== Node Environment ====================

export const NodeEnvSchema = z.enum(['development', 'test', 'production']);

// ==================== Server Configuration ====================

export const ServerConfigSchema = z.object({
  NODE_ENV: NodeEnvSchema,
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),
  API_URL: z.string().url('API_URL must be a valid URL').default('http://localhost:3000'),
  APP_URL: z.string().url('APP_URL must be a valid URL').default('http://localhost:3001'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL').default('http://localhost:3000'),
  // Bangladesh specific
  TIMEZONE: z.string().default('Asia/Dhaka'),
  LOCALE: z.string().default('bn-BD'),
});

// ==================== Database Configuration ====================

export const DatabaseConfigSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DATABASE_POOL_MIN: z.coerce.number().int().min(1).max(50).default(2),
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(100).default(10),
  DATABASE_CONNECTION_TIMEOUT: z.coerce.number().int().positive().max(120000).default(30000),
  DATABASE_IDLE_TIMEOUT: z.coerce.number().int().positive().default(10000),
  DATABASE_SSL_ENABLED: z.coerce.boolean().default(true),
  DATABASE_SSL_REJECT_UNAUTHORIZED: z.coerce.boolean().default(true),
});

// ==================== Redis Configuration ====================

export const RedisConfigSchema = z.object({
  REDIS_URL: z.string().url().optional(),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().max(65535).default(6379),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_DB: z.coerce.number().int().min(0).max(15).default(0),
  REDIS_TLS_ENABLED: z.coerce.boolean().default(false),
  REDIS_KEY_PREFIX: z.string().default('vubon:'),
  REDIS_CONNECT_TIMEOUT: z.coerce.number().int().positive().default(10000),
  REDIS_MAX_RETRIES: z.coerce.number().int().min(1).max(10).default(3),
});

// ==================== JWT Configuration ====================

export const JWTConfigSchema = z.object({
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z
    .string()
    .regex(/^\d+[smhdw]$/, 'Invalid expiry format (e.g., 15m, 1h, 7d)')
    .default('15m'),
  JWT_REFRESH_EXPIRY: z
    .string()
    .regex(/^\d+[smhdw]$/, 'Invalid expiry format')
    .default('7d'),
  JWT_ISSUER: z.string().default('vubon.com.bd'),
  JWT_AUDIENCE: z.string().default('vubon-api'),
  JWT_ALGORITHM: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'])
    .default('HS256'),
});

// ==================== OAuth Configuration ====================

// Google OAuth
export const GoogleOAuthSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CALLBACK_URL: z.string().url().optional(),
});

// GitHub OAuth
export const GitHubOAuthSchema = z.object({
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GITHUB_CALLBACK_URL: z.string().url().optional(),
});

// Facebook OAuth
export const FacebookOAuthSchema = z.object({
  FACEBOOK_CLIENT_ID: z.string().optional(),
  FACEBOOK_CLIENT_SECRET: z.string().optional(),
  FACEBOOK_CALLBACK_URL: z.string().url().optional(),
  FACEBOOK_API_VERSION: z.string().default('v18.0'),
});

// Apple OAuth
export const AppleOAuthSchema = z.object({
  APPLE_CLIENT_ID: z.string().optional(),
  APPLE_TEAM_ID: z.string().optional(),
  APPLE_KEY_ID: z.string().optional(),
  APPLE_PRIVATE_KEY: z.string().optional(),
  APPLE_CALLBACK_URL: z.string().url().optional(),
});

// LinkedIn OAuth
export const LinkedInOAuthSchema = z.object({
  LINKEDIN_CLIENT_ID: z.string().optional(),
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  LINKEDIN_CALLBACK_URL: z.string().url().optional(),
});

// WhatsApp OAuth (Bangladesh specific)
export const WhatsAppOAuthSchema = z.object({
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().optional(),
  WHATSAPP_VERIFY_TOKEN: z.string().optional(),
});

// bKash OAuth (Bangladesh specific)
export const BkashOAuthSchema = z.object({
  BKASH_APP_KEY: z.string().optional(),
  BKASH_APP_SECRET: z.string().optional(),
  BKASH_USERNAME: z.string().optional(),
  BKASH_PASSWORD: z.string().optional(),
  BKASH_BASE_URL: z.string().url().default('https://tokenized.sandbox.bka.sh'),
});

// Nagad OAuth (Bangladesh specific)
export const NagadOAuthSchema = z.object({
  NAGAD_MERCHANT_ID: z.string().optional(),
  NAGAD_PUBLIC_KEY: z.string().optional(),
  NAGAD_PRIVATE_KEY: z.string().optional(),
  NAGAD_BASE_URL: z.string().url().default('https://sandbox.mynagad.com'),
});

export const OAuthConfigSchema = z.object({
  ...GoogleOAuthSchema.shape,
  ...GitHubOAuthSchema.shape,
  ...FacebookOAuthSchema.shape,
  ...AppleOAuthSchema.shape,
  ...LinkedInOAuthSchema.shape,
  ...WhatsAppOAuthSchema.shape,
  ...BkashOAuthSchema.shape,
  ...NagadOAuthSchema.shape,
});

// ==================== Security Configuration ====================

export const SecurityConfigSchema = z.object({
  // CORS
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000,http://localhost:3001')
    .transform((val) => val.split(',').map((o) => o.trim())),
  CORS_CREDENTIALS: z.coerce.boolean().default(true),
  CORS_MAX_AGE: z.coerce.number().int().positive().default(86400),

  // Rate Limiting
  RATE_LIMIT_TTL: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_LOGIN_TTL: z.coerce.number().int().positive().default(900),
  RATE_LIMIT_LOGIN_MAX: z.coerce.number().int().positive().default(5),
  RATE_LIMIT_PAYMENT_TTL: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_PAYMENT_MAX: z.coerce.number().int().positive().default(5),

  // Password & Encryption
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  ENCRYPTION_KEY: z
    .string()
    .min(32, 'ENCRYPTION_KEY must be at least 32 characters')
    .regex(/^[a-f0-9]{64}$/i, 'ENCRYPTION_KEY must be a 64-character hex string')
    .optional(),
  ENCRYPTION_ALGORITHM: z.enum(['aes-256-gcm', 'aes-256-cbc']).default('aes-256-gcm'),

  // CSRF Protection
  CSRF_PROTECTION_ENABLED: z.coerce.boolean().default(true),
  CSRF_COOKIE_NAME: z.string().default('csrf-token'),

  // Session Security
  SESSION_COOKIE_SECURE: z.coerce.boolean().default(true),
  SESSION_COOKIE_HTTP_ONLY: z.coerce.boolean().default(true),
  SESSION_COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('lax'),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(86400),
});

// ==================== Email Configuration ====================

export const EmailConfigSchema = z.object({
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().max(65535).default(587),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM_EMAIL: z.string().email().default('noreply@vubon.com.bd'),
  SMTP_FROM_NAME: z.string().default('Vubon'),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_TLS_ENABLED: z.coerce.boolean().default(true),
  SMTP_SEND_TIMEOUT: z.coerce.number().int().positive().default(10000),
});

// ==================== Feature Flags (Bangladesh specific) ====================

export const FeatureFlagsSchema = z.object({
  ENABLE_MFA: z.coerce.boolean().default(true),
  ENABLE_SOCIAL_LOGIN: z.coerce.boolean().default(true),
  ENABLE_MOBILE_OTP: z.coerce.boolean().default(true),
  ENABLE_WHATSAPP_LOGIN: z.coerce.boolean().default(false),
  ENABLE_BKASH_LOGIN: z.coerce.boolean().default(false),
  ENABLE_NAGAD_LOGIN: z.coerce.boolean().default(false),
  ENABLE_MAINTENANCE_MODE: z.coerce.boolean().default(false),
  ENABLE_DEBUG_MODE: z.coerce.boolean().default(false),
  ENABLE_ANALYTICS: z.coerce.boolean().default(true),
  ENABLE_LOGGING: z.coerce.boolean().default(true),
});

// ==================== Complete Environment Schema ====================

export const EnvSchema = z.object({
  ...ServerConfigSchema.shape,
  ...DatabaseConfigSchema.shape,
  ...RedisConfigSchema.shape,
  ...JWTConfigSchema.shape,
  ...OAuthConfigSchema.shape,
  ...SecurityConfigSchema.shape,
  ...EmailConfigSchema.shape,
  ...FeatureFlagsSchema.shape,
});

// ==================== Type Exports ====================

export type NodeEnv = z.infer<typeof NodeEnvSchema>;
export type ServerConfig = z.infer<typeof ServerConfigSchema>;
export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
export type RedisConfig = z.infer<typeof RedisConfigSchema>;
export type JWTConfig = z.infer<typeof JWTConfigSchema>;
export type OAuthConfig = z.infer<typeof OAuthConfigSchema>;
export type SecurityConfig = z.infer<typeof SecurityConfigSchema>;
export type EmailConfig = z.infer<typeof EmailConfigSchema>;
export type FeatureFlags = z.infer<typeof FeatureFlagsSchema>;
export type Env = z.infer<typeof EnvSchema>;
