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
// ✅ FIXED: Correct package name
import { 
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
  API_URL: z.string().url('API_URL must be a valid URL'),
  APP_URL: z.string().url('APP_URL must be a valid URL'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
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

// ==================== JWT Configuration (using constants) ====================

export const JWTConfigSchema = z.object({
  JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z
    .string()
    .regex(/^\d+[smhdw]$/, 'Invalid expiry format (e.g., 15m, 1h, 7d)')
    .default(JWT_CONFIG.ACCESS_TOKEN_EXPIRY),
  JWT_REFRESH_EXPIRY: z
    .string()
    .regex(/^\d+[smhdw]$/, 'Invalid expiry format')
    .default(JWT_CONFIG.REFRESH_TOKEN_EXPIRY),
  JWT_ISSUER: z.string().default(JWT_CONFIG.ISSUER),
  JWT_AUDIENCE: z.string().default(JWT_CONFIG.AUDIENCE),
  JWT_ALGORITHM: z
    .enum(['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'])
    .default('HS256'),
});

// ==================== OAuth Configuration ====================

// Google OAuth
export const GoogleOAuthSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
  GOOGLE_CALLBACK_URL: z.string().url('Invalid Google callback URL'),
});

// GitHub OAuth
export const GitHubOAuthSchema = z.object({
  GITHUB_CLIENT_ID: z.string().min(1, 'GITHUB_CLIENT_ID is required'),
  GITHUB_CLIENT_SECRET: z.string().min(1, 'GITHUB_CLIENT_SECRET is required'),
  GITHUB_CALLBACK_URL: z.string().url('Invalid GitHub callback URL'),
});

// Facebook OAuth
export const FacebookOAuthSchema = z.object({
  FACEBOOK_CLIENT_ID: z.string().min(1, 'FACEBOOK_CLIENT_ID is required'),
  FACEBOOK_CLIENT_SECRET: z.string().min(1, 'FACEBOOK_CLIENT_SECRET is required'),
  FACEBOOK_CALLBACK_URL: z.string().url('Invalid Facebook callback URL'),
  FACEBOOK_API_VERSION: z.string().default('v18.0'),
});

// Apple OAuth
export const AppleOAuthSchema = z.object({
  APPLE_CLIENT_ID: z.string().min(1, 'APPLE_CLIENT_ID is required'),
  APPLE_TEAM_ID: z.string().min(1, 'APPLE_TEAM_ID is required'),
  APPLE_KEY_ID: z.string().min(1, 'APPLE_KEY_ID is required'),
  APPLE_PRIVATE_KEY: z.string().min(1, 'APPLE_PRIVATE_KEY is required'),
  APPLE_CALLBACK_URL: z.string().url('Invalid Apple callback URL'),
});

// LinkedIn OAuth
export const LinkedInOAuthSchema = z.object({
  LINKEDIN_CLIENT_ID: z.string().min(1, 'LINKEDIN_CLIENT_ID is required'),
  LINKEDIN_CLIENT_SECRET: z.string().min(1, 'LINKEDIN_CLIENT_SECRET is required'),
  LINKEDIN_CALLBACK_URL: z.string().url('Invalid LinkedIn callback URL'),
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

// Required OAuth providers (for validation)
export const RequiredOAuthConfigSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'GOOGLE_CLIENT_SECRET is required'),
  GOOGLE_CALLBACK_URL: z.string().url('Invalid Google callback URL'),
});

// Optional OAuth providers (partial)
export const OptionalOAuthConfigSchema = z.object({
  ...GitHubOAuthSchema.shape,
  ...FacebookOAuthSchema.shape,
  ...AppleOAuthSchema.shape,
  ...LinkedInOAuthSchema.shape,
  ...WhatsAppOAuthSchema.shape,
  ...BkashOAuthSchema.shape,
  ...NagadOAuthSchema.shape,
}).partial();

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

// ==================== Security Configuration (using constants) ====================

export const SecurityConfigSchema = z.object({
  // CORS (using constants)
  CORS_ORIGINS: z
    .string()
    .default(CORS_CONFIG.ALLOWED_ORIGINS.join(','))
    .transform((val) => val.split(',').map((o) => o.trim())),
  CORS_CREDENTIALS: z.coerce.boolean().default(CORS_CONFIG.CREDENTIALS),
  CORS_MAX_AGE: z.coerce.number().int().positive().default(CORS_CONFIG.MAX_AGE),

  // Rate Limiting (using constants)
  RATE_LIMIT_TTL: z.coerce.number().int().positive().default(RATE_LIMITS.GLOBAL.WINDOW_MS / 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(RATE_LIMITS.GLOBAL.MAX_REQUESTS),
  RATE_LIMIT_LOGIN_TTL: z.coerce.number().int().positive().default(RATE_LIMITS.AUTH.LOGIN.WINDOW_MS / 1000),
  RATE_LIMIT_LOGIN_MAX: z.coerce.number().int().positive().default(RATE_LIMITS.AUTH.LOGIN.MAX_REQUESTS),
  RATE_LIMIT_PAYMENT_TTL: z.coerce.number().int().positive().default(RATE_LIMITS.PAYMENT.INITIATE.WINDOW_MS / 1000),
  RATE_LIMIT_PAYMENT_MAX: z.coerce.number().int().positive().default(RATE_LIMITS.PAYMENT.INITIATE.MAX_REQUESTS),

  // Password & Encryption (using constants)
  BCRYPT_SALT_ROUNDS: z
    .coerce.number()
    .int()
    .min(ENCRYPTION_CONFIG.MIN_SALT_ROUNDS)
    .max(ENCRYPTION_CONFIG.MAX_SALT_ROUNDS)
    .default(ENCRYPTION_CONFIG.SALT_ROUNDS),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  ENCRYPTION_KEY: z
    .string()
    .min(32, 'ENCRYPTION_KEY must be at least 32 characters')
    .regex(/^[a-f0-9]{64}$/i, 'ENCRYPTION_KEY must be a 64-character hex string'),
  ENCRYPTION_ALGORITHM: z
    .enum(['aes-256-gcm', 'aes-256-cbc'])
    .default(ENCRYPTION_CONFIG.ALGORITHM),

  // CSRF Protection
  CSRF_PROTECTION_ENABLED: z.coerce.boolean().default(true),
  CSRF_COOKIE_NAME: z.string().default('csrf-token'),

  // Session Security (using constants)
  SESSION_COOKIE_SECURE: z.coerce.boolean().default(SESSION_SECURITY.SECURE_COOKIE),
  SESSION_COOKIE_HTTP_ONLY: z.coerce.boolean().default(SESSION_SECURITY.HTTP_ONLY_COOKIE),
  SESSION_COOKIE_SAME_SITE: z
    .enum(['strict', 'lax', 'none'])
    .default(SESSION_SECURITY.SAME_SITE),
  SESSION_TTL_SECONDS: z.coerce.number().int().positive().default(SESSION_SECURITY.ABSOLUTE_TIMEOUT_SECONDS),
});

// ==================== Email Configuration ====================

export const EmailConfigSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.coerce.number().int().positive().max(65535).default(587),
  SMTP_USER: z.string().email('Invalid SMTP user email'),
  SMTP_PASSWORD: z.string().min(1, 'SMTP_PASSWORD is required'),
  SMTP_FROM_EMAIL: z.string().email('Invalid from email'),
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
}).strict();

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

// ==================== Required OAuth Config Type (for validation) ====================

export type RequiredOAuthConfig = z.infer<typeof RequiredOAuthConfigSchema>;
