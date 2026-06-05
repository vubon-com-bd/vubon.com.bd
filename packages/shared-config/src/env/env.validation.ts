/**
 * Environment Validation - Safe env parsing and validation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-config/src/env/env.validation
 * 
 * RULES:
 * ✅ ONLY env parsing and validation - NO business logic
 * ✅ NO runtime mutation after validation
 * ✅ Fail fast on invalid env - prevents invalid startup
 * ✅ Readonly frozen exports
 * ✅ No side effects beyond module initialization
 */

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { EnvSchema, type Env } from './env.schema';

// ==================== Constants ====================

const ENV_FILE_PATHS = ['.env', '.env.local', '.env.production', '.env.development'];

// ==================== Load Environment ====================

/**
 * Load and expand environment variables from .env file
 * Silent failure - dotenv errors are non-critical
 */
const loadEnv = (): void => {
  for (const envPath of ENV_FILE_PATHS) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      dotenvExpand.expand(result);
      break;
    }
  }
};

// Load env at module level (runs once at import)
loadEnv();

// ==================== Private Helpers ====================

/**
 * Log validation error details for debugging
 */
const logValidationError = (error: unknown): void => {
  console.error('❌ Environment validation failed:');
  
  if (error instanceof Error) {
    console.error(`   ${error.message}`);
    
    if (error.name === 'ZodError' && 'issues' in (error as { issues?: unknown[] })) {
      const zodError = error as { issues?: Array<{ path: string[]; message: string }> };
      if (zodError.issues) {
        console.error('   Missing/Invalid fields:');
        zodError.issues.forEach((issue) => {
          console.error(`     - ${issue.path.join('.')}: ${issue.message}`);
        });
      }
    }
  } else {
    console.error('   Unknown error:', error);
  }
};

// ==================== Validate Environment ====================

/**
 * Validate and parse environment variables
 * Throws error if validation fails - fail fast on startup
 */
export const validateEnv = (): Env => {
  return EnvSchema.parse(process.env);
};

/**
 * Safe validate environment with error handling
 * Returns null on validation failure (for graceful degradation)
 * Not recommended for production - use validateEnv() instead
 */
export const safeValidateEnv = (): Env | null => {
  try {
    return validateEnv();
  } catch (error) {
    logValidationError(error);
    return null;
  }
};

// ==================== Type-safe Environment ====================

/**
 * Validated environment object (readonly and frozen)
 * Throws at import time if validation fails - prevents invalid startup
 * This is the main export that should be used throughout the app
 */
export const env: Readonly<Env> = Object.freeze(validateEnv());

// ==================== Environment Helpers ====================

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Check if running in development
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Check if running in test
 */
export const isTest = env.NODE_ENV === 'test';

/**
 * Check if running in staging (if applicable)
 */
export const isStaging = (): boolean => {
  return (env.NODE_ENV as string) === 'staging' || (isProduction && (env.APP_URL?.includes('staging') ?? false));
};

/**
 * Get environment variable with type safety
 */
export const getEnv = <K extends keyof Env>(key: K): Env[K] => {
  return env[key];
};

/**
 * Check if specific OAuth provider is configured
 */
export const isOAuthConfigured = (provider: 'google' | 'github' | 'facebook' | 'apple' | 'linkedin'): boolean => {
  const config: Record<string, boolean> = {
    google: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
    github: !!env.GITHUB_CLIENT_ID && !!env.GITHUB_CLIENT_SECRET,
    facebook: !!env.FACEBOOK_CLIENT_ID && !!env.FACEBOOK_CLIENT_SECRET,
    apple: !!env.APPLE_CLIENT_ID && !!env.APPLE_PRIVATE_KEY,
    linkedin: !!env.LINKEDIN_CLIENT_ID && !!env.LINKEDIN_CLIENT_SECRET,
  };
  return config[provider] ?? false;
};

/**
 * Get list of configured OAuth providers
 */
export const getConfiguredOAuthProviders = (): string[] => {
  const providers: string[] = [];
  if (isOAuthConfigured('google')) providers.push('google');
  if (isOAuthConfigured('github')) providers.push('github');
  if (isOAuthConfigured('facebook')) providers.push('facebook');
  if (isOAuthConfigured('apple')) providers.push('apple');
  if (isOAuthConfigured('linkedin')) providers.push('linkedin');
  return providers;
};

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof Env): boolean => {
  const value = env[feature];
  return typeof value === 'boolean' ? value : false;
};

/**
 * Get CORS origins as array
 */
export const getCorsOrigins = (): string[] => {
  // ✅ FIXED: CORS_ORIGINS is already string[] from Zod transform
  const origins = env.CORS_ORIGINS;
  if (origins && Array.isArray(origins)) {
    return origins;
  }
  return [];
};

/**
 * Check if maintenance mode is enabled
 */
export const isMaintenanceMode = (): boolean => {
  return env.ENABLE_MAINTENANCE_MODE === true;
};

/**
 * Check if debug mode is enabled (development only)
 */
export const isDebugMode = (): boolean => {
  return env.ENABLE_DEBUG_MODE === true && !isProduction;
};

// ==================== Type Exports ====================

export type ValidatedEnv = Env;
