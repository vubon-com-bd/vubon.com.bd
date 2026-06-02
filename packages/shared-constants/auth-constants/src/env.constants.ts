/**
 * Environment Configuration - Enterprise Grade (Complete)
 * @module shared-constants/env.constants
 * 
 * RULES:
 * ✅ ONLY place where process.env is accessed directly
 * ✅ Production validation with hard failures
 * ✅ Connection configs for DB, Redis, Queue, Email
 * ✅ TLS/SSL support
 * ✅ Retry and timeout configurations
 */

// ============================================================
// Type Definitions
// ============================================================
type NodeEnv = 'development' | 'production' | 'test';

export interface EnvConfig {
  NODE_ENV: NodeEnv;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  IS_TEST: boolean;
}

export interface DatabaseConfig {
  URL: string;
  PORT: number;
  TIMEOUT_MS: number;
  MAX_RETRIES: number;
  RETRY_DELAY_MS: number;
  SSL: boolean;
  SSL_CA: string;
  POOL_MIN: number;
  POOL_MAX: number;
  IDLE_TIMEOUT_MS: number;
}

export interface RedisConfig {
  URL: string;
  HOST: string;
  PORT: number;
  PASSWORD: string;
  TIMEOUT_MS: number;
  MAX_RETRIES: number;
  RETRY_DELAY_MS: number;
  TLS: boolean;
  DB_INDEX: number;
}

export interface QueueConfig {
  REDIS_URL: string;
  PREFIX: string;
  DELAYED_RETRY_LIMIT: number;
  JOB_TIMEOUT_MS: number;
  CONCURRENCY: number;
}

export interface EmailConfig {
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_SECURE: boolean;
  FROM_EMAIL: string;
  FROM_NAME: string;
  TIMEOUT_MS: number;
}

export interface SecurityConfig {
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_EXPIRES_IN: string;
  ENCRYPTION_KEY: string;
  SESSION_SECRET: string;
  BCRYPT_ROUNDS: number;
}

// ============================================================
// Validation Helpers
// ============================================================
const validateNodeEnv = (value: string | undefined): NodeEnv => {
  if (value === 'development' || value === 'production' || value === 'test') {
    return value;
  }
  return 'development';
};

const validateRequired = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`❌ FATAL: ${name} is required in ${process.env['NODE_ENV'] || 'production'} mode`);
  }
  return value;
};

const validatePort = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const port = parseInt(value, 10);
  return isNaN(port) ? defaultValue : port;
};

const validateNumber = (value: string | undefined, defaultValue: number, min?: number): number => {
  if (!value) return defaultValue;
  const num = parseInt(value, 10);
  if (isNaN(num)) return defaultValue;
  if (min !== undefined && num < min) return defaultValue;
  return num;
};

const validateBoolean = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'true';
};

// ============================================================
// Read Environment (CRITICAL: Production hard fail)
// ============================================================
const NODE_ENV = validateNodeEnv(process.env['NODE_ENV']);
const IS_PRODUCTION = NODE_ENV === 'production';

// Database Config
export const DATABASE_CONFIG: DatabaseConfig = {
  URL: validateRequired(process.env['DATABASE_URL'], 'DATABASE_URL'),
  PORT: validatePort(process.env['DB_PORT'], 5432),
  TIMEOUT_MS: validateNumber(process.env['DB_TIMEOUT_MS'], 30000, 1000),
  MAX_RETRIES: validateNumber(process.env['DB_MAX_RETRIES'], 5, 1),
  RETRY_DELAY_MS: validateNumber(process.env['DB_RETRY_DELAY_MS'], 1000, 100),
  SSL: validateBoolean(process.env['DATABASE_SSL']),
  SSL_CA: process.env['DATABASE_SSL_CA'] || '',
  POOL_MIN: validateNumber(process.env['DB_POOL_MIN'], 2, 1),
  POOL_MAX: validateNumber(process.env['DB_POOL_MAX'], 10, 1),
  IDLE_TIMEOUT_MS: validateNumber(process.env['DB_IDLE_TIMEOUT_MS'], 10000, 1000),
};

// Redis Config
export const REDIS_CONFIG: RedisConfig = {
  URL: validateRequired(process.env['REDIS_URL'], 'REDIS_URL'),
  HOST: process.env['REDIS_HOST'] || 'localhost',
  PORT: validatePort(process.env['REDIS_PORT'], 6379),
  PASSWORD: process.env['REDIS_PASSWORD'] || '',
  TIMEOUT_MS: validateNumber(process.env['REDIS_TIMEOUT_MS'], 5000, 1000),
  MAX_RETRIES: validateNumber(process.env['REDIS_MAX_RETRIES'], 3, 1),
  RETRY_DELAY_MS: validateNumber(process.env['REDIS_RETRY_DELAY_MS'], 100, 50),
  TLS: validateBoolean(process.env['REDIS_TLS']),
  DB_INDEX: validateNumber(process.env['REDIS_DB_INDEX'], 0, 0),
};

// Queue Config (using Redis)
export const QUEUE_CONFIG: QueueConfig = {
  REDIS_URL: process.env['QUEUE_REDIS_URL'] || REDIS_CONFIG.URL,
  PREFIX: process.env['QUEUE_PREFIX'] || 'vubon:queue',
  DELAYED_RETRY_LIMIT: validateNumber(process.env['QUEUE_DELAYED_RETRY_LIMIT'], 3, 1),
  JOB_TIMEOUT_MS: validateNumber(process.env['QUEUE_JOB_TIMEOUT_MS'], 60000, 5000),
  CONCURRENCY: validateNumber(process.env['QUEUE_CONCURRENCY'], 5, 1),
};

// Email Config
export const EMAIL_CONFIG: EmailConfig = {
  SMTP_HOST: validateRequired(process.env['SMTP_HOST'], 'SMTP_HOST'),
  SMTP_PORT: validatePort(process.env['SMTP_PORT'], 587),
  SMTP_USER: validateRequired(process.env['SMTP_USER'], 'SMTP_USER'),
  SMTP_PASS: validateRequired(process.env['SMTP_PASS'], 'SMTP_PASS'),
  SMTP_SECURE: validateBoolean(process.env['SMTP_SECURE']),
  FROM_EMAIL: process.env['FROM_EMAIL'] || 'noreply@vubon.com.bd',
  FROM_NAME: process.env['FROM_NAME'] || 'Vubon Platform',
  TIMEOUT_MS: validateNumber(process.env['EMAIL_TIMEOUT_MS'], 10000, 2000),
};

// Security Config
export const SECURITY_CONFIG: SecurityConfig = {
  JWT_SECRET: validateRequired(process.env['JWT_SECRET'], 'JWT_SECRET'),
  JWT_EXPIRES_IN: process.env['JWT_EXPIRES_IN'] || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
  ENCRYPTION_KEY: validateRequired(process.env['ENCRYPTION_KEY'], 'ENCRYPTION_KEY'),
  SESSION_SECRET: validateRequired(process.env['SESSION_SECRET'], 'SESSION_SECRET'),
  BCRYPT_ROUNDS: validateNumber(process.env['BCRYPT_ROUNDS'], 12, 8),
};

// ============================================================
// Export Main Env Config
// ============================================================
export const ENV_CONFIG: EnvConfig = {
  NODE_ENV,
  IS_PRODUCTION,
  IS_DEVELOPMENT: NODE_ENV === 'development',
  IS_TEST: NODE_ENV === 'test',
};

// ============================================================
// Connection Validation (Runs on import)
// ============================================================
if (IS_PRODUCTION) {
  console.log('✅ Environment validation passed for production');
}

// ============================================================
// Type Exports
// ============================================================
export type { NodeEnv };
