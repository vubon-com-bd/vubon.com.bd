// packages/shared-config/src/env/env.schema.ts
import { z } from 'zod';

/**
 * Environment validation schemas using Zod
 * All environment variables are validated at startup for type safety
 */

// ============================================================================
// Base Environment Schema
// ============================================================================

/**
 * Node environment types
 */
export const NodeEnvSchema = z.enum(['development', 'staging', 'production', 'test']);

export type NodeEnv = z.infer<typeof NodeEnvSchema>;

// ============================================================================
// Server Configuration Schema
// ============================================================================

/**
 * Server configuration schema
 * Validates server-related environment variables
 */
export const ServerConfigSchema = z.object({
  /** Server port number */
  PORT: z.coerce.number().int().positive().default(3000),
  /** Node environment */
  NODE_ENV: NodeEnvSchema.default('development'),
  /** Application name */
  APP_NAME: z.string().min(1).default('Vubon App'),
  /** Application version */
  APP_VERSION: z.string().min(1).default('1.0.0'),
  /** API base URL */
  API_URL: z.string().url().default('http://localhost:3000'),
  /** Client application URL */
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  /** Whether to enable CORS */
  ENABLE_CORS: z.coerce.boolean().default(true),
  /** Allowed CORS origins (comma-separated) */
  CORS_ORIGINS: z.string().optional().default('*'),
  /** Whether to enable compression */
  ENABLE_COMPRESSION: z.coerce.boolean().default(true),
  /** Whether to enable request logging */
  ENABLE_LOGGING: z.coerce.boolean().default(true),
  /** Log level */
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  /** Whether to enable graceful shutdown */
  ENABLE_GRACEFUL_SHUTDOWN: z.coerce.boolean().default(true),
  /** Graceful shutdown timeout in milliseconds */
  GRACEFUL_SHUTDOWN_TIMEOUT: z.coerce.number().int().positive().default(10000),
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;

// ============================================================================
// Database Configuration Schema
// ============================================================================

/**
 * Database configuration schema
 * Validates database-related environment variables
 */
export const DatabaseConfigSchema = z.object({
  /** Database host */
  DB_HOST: z.string().min(1).default('localhost'),
  /** Database port */
  DB_PORT: z.coerce.number().int().positive().default(5432),
  /** Database name */
  DB_NAME: z.string().min(1).default('vubon_db'),
  /** Database username */
  DB_USER: z.string().min(1).default('postgres'),
  /** Database password */
  DB_PASSWORD: z.string().optional(),
  /** Database connection pool max size */
  DB_POOL_MAX: z.coerce.number().int().positive().default(10),
  /** Database connection pool min size */
  DB_POOL_MIN: z.coerce.number().int().nonnegative().default(2),
  /** Database connection idle timeout in milliseconds */
  DB_IDLE_TIMEOUT: z.coerce.number().int().positive().default(30000),
  /** Database connection timeout in milliseconds */
  DB_CONNECTION_TIMEOUT: z.coerce.number().int().positive().default(5000),
  /** Whether to enable database logging */
  DB_LOGGING: z.coerce.boolean().default(false),
  /** Whether to enable SSL for database connection */
  DB_SSL: z.coerce.boolean().default(false),
  /** Whether to synchronize database schema automatically (development only) */
  DB_SYNCHRONIZE: z.coerce.boolean().default(false),
  /** Database driver type */
  DB_TYPE: z.enum(['postgres', 'mysql', 'sqlite']).default('postgres'),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

// ============================================================================
// Redis Configuration Schema
// ============================================================================

/**
 * Redis configuration schema
 * Validates Redis-related environment variables
 */
export const RedisConfigSchema = z.object({
  /** Redis host */
  REDIS_HOST: z.string().min(1).default('localhost'),
  /** Redis port */
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  /** Redis password (optional) */
  REDIS_PASSWORD: z.string().optional(),
  /** Redis database index */
  REDIS_DB: z.coerce.number().int().nonnegative().default(0),
  /** Redis key prefix */
  REDIS_KEY_PREFIX: z.string().default('vubon:'),
  /** Redis connection timeout in milliseconds */
  REDIS_CONNECT_TIMEOUT: z.coerce.number().int().positive().default(10000),
  /** Redis command timeout in milliseconds */
  REDIS_COMMAND_TIMEOUT: z.coerce.number().int().positive().default(5000),
  /** Redis max retries per request */
  REDIS_MAX_RETRIES: z.coerce.number().int().positive().default(3),
  /** Redis retry delay in milliseconds */
  REDIS_RETRY_DELAY: z.coerce.number().int().positive().default(100),
  /** Whether to enable TLS for Redis */
  REDIS_TLS: z.coerce.boolean().default(false),
  /** Redis URL (alternative to individual configs) */
  REDIS_URL: z.string().url().optional(),
});

export type RedisConfig = z.infer<typeof RedisConfigSchema>;

// ============================================================================
// JWT Configuration Schema
// ============================================================================

/**
 * JWT configuration schema
 * Validates JWT-related environment variables
 */
export const JWTConfigSchema = z.object({
  /** JWT access token secret */
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  /** JWT refresh token secret */
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  /** JWT verification token secret */
  JWT_VERIFICATION_SECRET: z
    .string()
    .min(32, 'JWT_VERIFICATION_SECRET must be at least 32 characters'),
  /** JWT reset token secret */
  JWT_RESET_SECRET: z.string().min(32, 'JWT_RESET_SECRET must be at least 32 characters'),
  /** JWT access token expiry (e.g., '15m', '1h', '7d') */
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  /** JWT refresh token expiry (e.g., '7d', '30d') */
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  /** JWT verification token expiry (e.g., '24h') */
  JWT_VERIFICATION_EXPIRY: z.string().default('24h'),
  /** JWT reset token expiry (e.g., '30m') */
  JWT_RESET_EXPIRY: z.string().default('30m'),
  /** JWT issuer */
  JWT_ISSUER: z.string().default('vubon.com'),
  /** JWT audience */
  JWT_AUDIENCE: z.string().default('vubon-api'),
  /** JWT algorithm */
  JWT_ALGORITHM: z.enum(['HS256', 'RS256', 'ES256']).default('HS256'),
  /** Whether to enable JWT rotation */
  JWT_ENABLE_ROTATION: z.coerce.boolean().default(true),
});

export type JWTConfig = z.infer<typeof JWTConfigSchema>;

// ============================================================================
// OAuth Configuration Schema
// ============================================================================

/**
 * OAuth configuration schema
 * Validates OAuth-related environment variables
 */
export const OAuthConfigSchema = z.object({
  // ============================================================================
  // Google OAuth
  // ============================================================================
  /** Google OAuth client ID */
  GOOGLE_CLIENT_ID: z.string().optional(),
  /** Google OAuth client secret */
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  /** Google OAuth callback URL */
  GOOGLE_CALLBACK_URL: z.string().url().optional(),
  /** Whether Google OAuth is enabled */
  GOOGLE_ENABLED: z.coerce.boolean().default(false),

  // ============================================================================
  // Facebook OAuth
  // ============================================================================
  /** Facebook OAuth client ID */
  FACEBOOK_CLIENT_ID: z.string().optional(),
  /** Facebook OAuth client secret */
  FACEBOOK_CLIENT_SECRET: z.string().optional(),
  /** Facebook OAuth callback URL */
  FACEBOOK_CALLBACK_URL: z.string().url().optional(),
  /** Whether Facebook OAuth is enabled */
  FACEBOOK_ENABLED: z.coerce.boolean().default(false),

  // ============================================================================
  // GitHub OAuth
  // ============================================================================
  /** GitHub OAuth client ID */
  GITHUB_CLIENT_ID: z.string().optional(),
  /** GitHub OAuth client secret */
  GITHUB_CLIENT_SECRET: z.string().optional(),
  /** GitHub OAuth callback URL */
  GITHUB_CALLBACK_URL: z.string().url().optional(),
  /** Whether GitHub OAuth is enabled */
  GITHUB_ENABLED: z.coerce.boolean().default(false),

  // ============================================================================
  // Apple OAuth
  // ============================================================================
  /** Apple OAuth client ID */
  APPLE_CLIENT_ID: z.string().optional(),
  /** Apple OAuth team ID */
  APPLE_TEAM_ID: z.string().optional(),
  /** Apple OAuth key ID */
  APPLE_KEY_ID: z.string().optional(),
  /** Apple OAuth private key (base64 encoded) */
  APPLE_PRIVATE_KEY: z.string().optional(),
  /** Apple OAuth callback URL */
  APPLE_CALLBACK_URL: z.string().url().optional(),
  /** Whether Apple OAuth is enabled */
  APPLE_ENABLED: z.coerce.boolean().default(false),

  // ============================================================================
  // LinkedIn OAuth
  // ============================================================================
  /** LinkedIn OAuth client ID */
  LINKEDIN_CLIENT_ID: z.string().optional(),
  /** LinkedIn OAuth client secret */
  LINKEDIN_CLIENT_SECRET: z.string().optional(),
  /** LinkedIn OAuth callback URL */
  LINKEDIN_CALLBACK_URL: z.string().url().optional(),
  /** Whether LinkedIn OAuth is enabled */
  LINKEDIN_ENABLED: z.coerce.boolean().default(false),

  // ============================================================================
  // General OAuth Settings
  // ============================================================================
  /** Whether OAuth is enabled globally */
  OAUTH_ENABLED: z.coerce.boolean().default(true),
  /** Whether to allow account linking via OAuth */
  OAUTH_ALLOW_ACCOUNT_LINKING: z.coerce.boolean().default(true),
  /** Whether to allow registration via OAuth */
  OAUTH_ALLOW_REGISTRATION: z.coerce.boolean().default(true),
});

export type OAuthConfig = z.infer<typeof OAuthConfigSchema>;

// ============================================================================
// Security Configuration Schema
// ============================================================================

/**
 * Security configuration schema
 * Validates security-related environment variables
 */
export const SecurityConfigSchema = z.object({
  /** Bcrypt salt rounds */
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  /** Rate limit window in milliseconds */
  RATE_LIMIT_WINDOW_MS: z.coerce
    .number()
    .int()
    .positive()
    .default(15 * 60 * 1000),
  /** Rate limit max requests per window */
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  /** Max login attempts before lockout */
  MAX_LOGIN_ATTEMPTS: z.coerce.number().int().positive().default(5),
  /** Account lockout duration in minutes */
  LOCKOUT_DURATION_MINUTES: z.coerce.number().int().positive().default(15),
  /** Whether to enable CSRF protection */
  ENABLE_CSRF: z.coerce.boolean().default(true),
  /** CSRF token expiry in seconds */
  CSRF_TOKEN_EXPIRY: z.coerce.number().int().positive().default(3600),
  /** Whether to enable Helmet security headers */
  ENABLE_HELMET: z.coerce.boolean().default(true),
  /** Whether to enable IP blocking */
  ENABLE_IP_BLOCKING: z.coerce.boolean().default(true),
  /** IP block duration in minutes */
  IP_BLOCK_DURATION_MINUTES: z.coerce.number().int().positive().default(60),
  /** Whether to enable session encryption */
  ENABLE_SESSION_ENCRYPTION: z.coerce.boolean().default(true),
  /** Session encryption key (must be 32 bytes for AES-256) */
  SESSION_ENCRYPTION_KEY: z.string().optional(),
});

export type SecurityConfig = z.infer<typeof SecurityConfigSchema>;

// ============================================================================
// Email Configuration Schema
// ============================================================================

/**
 * Email configuration schema
 * Validates email-related environment variables
 */
export const EmailConfigSchema = z.object({
  /** Email service provider */
  EMAIL_PROVIDER: z.enum(['nodemailer', 'sendgrid', 'resend', 'smtp']).default('nodemailer'),
  /** SMTP host */
  SMTP_HOST: z.string().optional(),
  /** SMTP port */
  SMTP_PORT: z.coerce.number().int().positive().optional(),
  /** SMTP secure connection */
  SMTP_SECURE: z.coerce.boolean().default(false),
  /** SMTP username */
  SMTP_USER: z.string().optional(),
  /** SMTP password */
  SMTP_PASS: z.string().optional(),
  /** Default email sender address */
  EMAIL_FROM: z.string().email().default('noreply@vubon.com'),
  /** Default email sender name */
  EMAIL_FROM_NAME: z.string().default('Vubon'),
  /** Whether email is enabled */
  EMAIL_ENABLED: z.coerce.boolean().default(true),
  /** SendGrid API key */
  SENDGRID_API_KEY: z.string().optional(),
  /** Resend API key */
  RESEND_API_KEY: z.string().optional(),
});

export type EmailConfig = z.infer<typeof EmailConfigSchema>;

// ============================================================================
// Feature Flags Schema
// ============================================================================

/**
 * Feature flags schema
 * Validates feature flag-related environment variables
 */
export const FeatureFlagSchema = z.object({
  /** Whether to enable registration */
  FEATURE_REGISTRATION: z.coerce.boolean().default(true),
  /** Whether to enable email verification */
  FEATURE_EMAIL_VERIFICATION: z.coerce.boolean().default(true),
  /** Whether to enable phone verification */
  FEATURE_PHONE_VERIFICATION: z.coerce.boolean().default(true),
  /** Whether to enable MFA */
  FEATURE_MFA: z.coerce.boolean().default(true),
  /** Whether to enable MFA for admin users only */
  FEATURE_MFA_ADMIN_ONLY: z.coerce.boolean().default(true),
  /** Whether to enable social login */
  FEATURE_SOCIAL_LOGIN: z.coerce.boolean().default(true),
  /** Whether to enable password reset */
  FEATURE_PASSWORD_RESET: z.coerce.boolean().default(true),
  /** Whether to enable remember me */
  FEATURE_REMEMBER_ME: z.coerce.boolean().default(true),
  /** Whether to enable session management UI */
  FEATURE_SESSION_MANAGEMENT: z.coerce.boolean().default(true),
  /** Whether to enable device management */
  FEATURE_DEVICE_MANAGEMENT: z.coerce.boolean().default(true),
  /** Whether to enable email notifications */
  FEATURE_EMAIL_NOTIFICATIONS: z.coerce.boolean().default(true),
  /** Whether to enable SMS notifications */
  FEATURE_SMS_NOTIFICATIONS: z.coerce.boolean().default(true),
  /** Whether to enable analytics */
  FEATURE_ANALYTICS: z.coerce.boolean().default(true),
});

export type FeatureFlags = z.infer<typeof FeatureFlagSchema>;

// ============================================================================
// Complete Environment Schema
// ============================================================================

/**
 * Complete environment configuration schema
 * Combines all configuration schemas
 */
export const EnvSchema = z.object({
  server: ServerConfigSchema,
  database: DatabaseConfigSchema,
  redis: RedisConfigSchema,
  jwt: JWTConfigSchema,
  oauth: OAuthConfigSchema,
  security: SecurityConfigSchema,
  email: EmailConfigSchema,
  features: FeatureFlagSchema,
});

export type EnvConfig = z.infer<typeof EnvSchema>;

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Parses and validates environment variables
 * @param env - The environment variables object (usually process.env)
 * @returns Validated environment configuration
 * @throws ZodError if validation fails
 */
export function parseEnv(env: Record<string, string | undefined>): EnvConfig {
  const raw = env as Record<string, string>;

  // Parse each section
  const server = ServerConfigSchema.parse(raw);
  const database = DatabaseConfigSchema.parse(raw);
  const redis = RedisConfigSchema.parse(raw);
  const jwt = JWTConfigSchema.parse(raw);
  const oauth = OAuthConfigSchema.parse(raw);
  const security = SecurityConfigSchema.parse(raw);
  const email = EmailConfigSchema.parse(raw);
  const features = FeatureFlagSchema.parse(raw);

  return {
    server,
    database,
    redis,
    jwt,
    oauth,
    security,
    email,
    features,
  };
}

/**
 * Safely parses environment variables without throwing
 * @param env - The environment variables object (usually process.env)
 * @returns Object with success flag and either data or error
 */
export function safeParseEnv(env: Record<string, string | undefined>): {
  success: boolean;
  data?: EnvConfig;
  error?: z.ZodError;
} {
  try {
    const data = parseEnv(env);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

/**
 * Validates a single environment variable
 * This function is kept for backward compatibility but uses a simpler implementation
 * @param key - The environment variable key
 * @param value - The environment variable value
 * @param schema - The Zod schema to validate against
 * @returns The parsed value
 * @throws ZodError if validation fails
 */
export function validateEnvVar<T>(key: string, value: string | undefined, schema: z.ZodType<T>): T {
  // Create a simple object with the key and value
  const obj: Record<string, string | undefined> = {};
  obj[key] = value;
  // Parse and return the result
  const result = schema.parse(obj);
  return result;
}

/**
 * Checks if a required environment variable is present
 * @param key - The environment variable key
 * @param env - The environment variables object
 * @returns True if the variable is present and non-empty
 */
export function hasEnvVar(key: string, env: Record<string, string | undefined>): boolean {
  const value = env[key];
  return value !== undefined && value !== '';
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Gets a masked version of sensitive environment variables for logging
 * @param env - The environment variables object
 * @returns A masked object with sensitive values hidden
 */
export function maskSensitiveEnv(env: Record<string, string | undefined>): Record<string, string> {
  const sensitiveKeys = [
    'DB_PASSWORD',
    'REDIS_PASSWORD',
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'JWT_VERIFICATION_SECRET',
    'JWT_RESET_SECRET',
    'GOOGLE_CLIENT_SECRET',
    'FACEBOOK_CLIENT_SECRET',
    'GITHUB_CLIENT_SECRET',
    'APPLE_PRIVATE_KEY',
    'SESSION_ENCRYPTION_KEY',
    'SENDGRID_API_KEY',
    'RESEND_API_KEY',
    'SMTP_PASS',
  ];

  const masked: Record<string, string> = {};

  for (const [key, value] of Object.entries(env)) {
    if (sensitiveKeys.includes(key) && value !== undefined) {
      masked[key] = '********';
    } else {
      masked[key] = value || '';
    }
  }

  return masked;
}
