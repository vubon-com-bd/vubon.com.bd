// packages/shared-config/src/env/env.validation.ts
import dotenv from 'dotenv';
import { z } from 'zod';
import type { EnvConfig, NodeEnv } from './env.schema';
import { EnvSchema, safeParseEnv } from './env.schema';

/**
 * Environment validation and loading module
 * Loads .env file, validates all environment variables, and exports typed config
 */

// ============================================================================
// Load Environment Variables
// ============================================================================

/**
 * Loads environment variables from .env file
 * In production, skips .env loading if NODE_ENV is production
 */
function loadEnvFile(): void {
  const nodeEnv = process.env.NODE_ENV || 'development';

  // In production, we expect environment variables to be set directly
  if (nodeEnv === 'production') {
    return;
  }

  // Load .env file based on environment
  const envFile = `.env.${nodeEnv}`;
  const result = dotenv.config({ path: envFile });

  // If specific env file doesn't exist, try .env
  if (result.error) {
    dotenv.config({ path: '.env' });
  }
}

// ============================================================================
// Validate and Export Environment
// ============================================================================

/**
 * Validates and exports the environment configuration
 * Throws an error if validation fails
 */
function validateAndExportEnv(): EnvConfig {
  // Load .env file
  loadEnvFile();

  // Validate environment variables
  const result = safeParseEnv(process.env as Record<string, string | undefined>);

  if (!result.success) {
    const errors = result.error?.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));

    console.error('❌ Environment validation failed:');
    console.error(JSON.stringify(errors, null, 2));

    throw new Error(`Environment validation failed: ${result.error?.message || 'Unknown error'}`);
  }

  // Log validation success
  console.log('✅ Environment validation passed');

  return result.data;
}

/**
 * Validated environment configuration object
 * Frozen to prevent accidental mutations
 */
export const env = Object.freeze(validateAndExportEnv()) as EnvConfig;

/**
 * Validates the environment configuration
 * Useful for manual validation or testing
 * @returns The validated environment configuration
 * @throws ZodError if validation fails
 */
export function validateEnv(): EnvConfig {
  // Reload and validate
  loadEnvFile();
  const result = safeParseEnv(process.env as Record<string, string | undefined>);

  if (!result.success) {
    throw new Error(`Environment validation failed: ${result.error?.message || 'Unknown error'}`);
  }

  return result.data;
}

// ============================================================================
// Environment Check Functions
// ============================================================================

/**
 * Checks if the current environment is production
 * @returns True if in production environment
 */
export function isProduction(): boolean {
  return env.server.NODE_ENV === 'production';
}

/**
 * Checks if the current environment is development
 * @returns True if in development environment
 */
export function isDevelopment(): boolean {
  return env.server.NODE_ENV === 'development';
}

/**
 * Checks if the current environment is staging
 * @returns True if in staging environment
 */
export function isStaging(): boolean {
  return env.server.NODE_ENV === 'staging';
}

/**
 * Checks if the current environment is test
 * @returns True if in test environment
 */
export function isTest(): boolean {
  return env.server.NODE_ENV === 'test';
}

/**
 * Gets the current node environment
 * @returns The current node environment
 */
export function getNodeEnv(): NodeEnv {
  return env.server.NODE_ENV;
}

// ============================================================================
// Configuration Getters
// ============================================================================

/**
 * Gets a specific configuration section or value
 * @param key - Dot notation path to the config value
 * @returns The configuration value
 * @throws Error if the key is not found
 */
export function getEnv<T = unknown>(key: string): T {
  const keys = key.split('.');
  let current: unknown = env;

  for (const k of keys) {
    if (current === undefined || current === null) {
      throw new Error(`Configuration key "${key}" not found`);
    }
    current = (current as Record<string, unknown>)[k];
  }

  if (current === undefined) {
    throw new Error(`Configuration key "${key}" not found`);
  }

  return current as T;
}

/**
 * Gets a specific environment variable value
 * @param key - The environment variable key (e.g., 'server.PORT')
 * @param defaultValue - Default value if the key is not found
 * @returns The configuration value or default
 */
export function getEnvOrDefault<T = unknown>(key: string, defaultValue: T): T {
  try {
    const value = getEnv<T>(key);
    return value ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

// ============================================================================
// OAuth Configuration Checks
// ============================================================================

/**
 * Checks if a specific OAuth provider is configured
 * @param provider - The OAuth provider name
 * @returns True if the provider is configured and enabled
 */
export function isOAuthProviderConfigured(
  provider: 'google' | 'facebook' | 'github' | 'apple'
): boolean {
  const enabledMap: Record<string, boolean> = {
    google: env.oauth.GOOGLE_ENABLED,
    facebook: env.oauth.FACEBOOK_ENABLED,
    github: env.oauth.GITHUB_ENABLED,
    apple: env.oauth.APPLE_ENABLED,
  };

  const clientIdMap: Record<string, string | undefined> = {
    google: env.oauth.GOOGLE_CLIENT_ID,
    facebook: env.oauth.FACEBOOK_CLIENT_ID,
    github: env.oauth.GITHUB_CLIENT_ID,
    apple: env.oauth.APPLE_CLIENT_ID,
  };

  const clientSecretMap: Record<string, string | undefined> = {
    google: env.oauth.GOOGLE_CLIENT_SECRET,
    facebook: env.oauth.FACEBOOK_CLIENT_SECRET,
    github: env.oauth.GITHUB_CLIENT_SECRET,
    apple: env.oauth.APPLE_PRIVATE_KEY,
  };

  return (
    enabledMap[provider] === true &&
    !!clientIdMap[provider] &&
    !!clientSecretMap[provider]
  );
}

/**
 * Checks if any OAuth provider is configured
 * @returns True if at least one OAuth provider is configured and enabled
 */
export function isOAuthConfigured(): boolean {
  const providers: Array<'google' | 'facebook' | 'github' | 'apple'> = [
    'google',
    'facebook',
    'github',
    'apple',
  ];

  return providers.some((provider) => isOAuthProviderConfigured(provider));
}

/**
 * Gets a list of enabled OAuth providers
 * @returns Array of enabled OAuth provider names
 */
export function getEnabledOAuthProviders(): Array<'google' | 'facebook' | 'github' | 'apple'> {
  const providers: Array<'google' | 'facebook' | 'github' | 'apple'> = [
    'google',
    'facebook',
    'github',
    'apple',
  ];

  return providers.filter((provider) => isOAuthProviderConfigured(provider));
}

// ============================================================================
// Feature Flag Check Functions
// ============================================================================

/**
 * Checks if a specific feature is enabled
 * @param feature - The feature name
 * @returns True if the feature is enabled
 */
export function isFeatureEnabled<K extends keyof typeof env.features>(
  feature: K
): boolean {
  return env.features[feature] === true;
}

/**
 * Gets all feature flags
 * @returns The complete feature flags object
 */
export function getFeatureFlags(): typeof env.features {
  return { ...env.features };
}

// ============================================================================
// Database Configuration Helpers
// ============================================================================

/**
 * Gets the database connection URL
 * @returns The database connection URL string
 */
export function getDatabaseUrl(): string {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = env.database;

  if (DB_PASSWORD) {
    return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }

  return `postgresql://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

/**
 * Gets the Redis connection URL
 * @returns The Redis connection URL string
 */
export function getRedisUrl(): string {
  if (env.redis.REDIS_URL) {
    return env.redis.REDIS_URL;
  }

  const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, REDIS_DB } = env.redis;

  if (REDIS_PASSWORD) {
    return `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`;
  }

  return `redis://${REDIS_HOST}:${REDIS_PORT}/${REDIS_DB}`;
}

// ============================================================================
// Security Helpers
// ============================================================================

/**
 * Gets the JWT configuration for a specific token type
 * @param type - The token type
 * @returns The JWT configuration for the specified type
 */
export function getJWTConfig(type: 'access' | 'refresh' | 'verification' | 'reset'): {
  secret: string;
  expiresIn: string;
} {
  const secrets = {
    access: env.jwt.JWT_ACCESS_SECRET,
    refresh: env.jwt.JWT_REFRESH_SECRET,
    verification: env.jwt.JWT_VERIFICATION_SECRET,
    reset: env.jwt.JWT_RESET_SECRET,
  };

  const expiries = {
    access: env.jwt.JWT_ACCESS_EXPIRY,
    refresh: env.jwt.JWT_REFRESH_EXPIRY,
    verification: env.jwt.JWT_VERIFICATION_EXPIRY,
    reset: env.jwt.JWT_RESET_EXPIRY,
  };

  return {
    secret: secrets[type],
    expiresIn: expiries[type],
  };
}

/**
 * Checks if session encryption is configured
 * @returns True if session encryption is enabled and a key is provided
 */
export function isSessionEncryptionConfigured(): boolean {
  return env.security.ENABLE_SESSION_ENCRYPTION && !!env.security.SESSION_ENCRYPTION_KEY;
}

// ============================================================================
// Environment Information
// ============================================================================

/**
 * Gets environment information for logging and debugging
 * @returns Environment information object
 */
export function getEnvironmentInfo() {
  return {
    nodeEnv: env.server.NODE_ENV,
    appName: env.server.APP_NAME,
    appVersion: env.server.APP_VERSION,
    isProduction: isProduction(),
    isDevelopment: isDevelopment(),
    isStaging: isStaging(),
    isTest: isTest(),
    isOAuthConfigured: isOAuthConfigured(),
    enabledOAuthProviders: getEnabledOAuthProviders(),
    databaseUrlMasked: getDatabaseUrl().replace(/:[^:@]+@/, ':****@'),
    redisUrlMasked: getRedisUrl().replace(/:[^:@]+@/, ':****@'),
    features: getFeatureFlags(),
  };
}
