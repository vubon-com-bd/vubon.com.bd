/* global process */
/**
 * Environment variables validation and loading
 * Loads and validates environment variables using Zod
 */

import 'dotenv/config';
import { EnvSchema, type Env } from './env.schema.js';

/**
 * Loaded and validated environment variables
 * This object is frozen to prevent mutations
 */
let cachedEnv: Env | null = null;

/**
 * Validate and load environment variables
 * @throws Error if validation fails
 * @returns Validated environment object
 */
export function validateEnv(): Env {
  // Return cached if available
  if (cachedEnv !== null) {
    return cachedEnv;
  }

  try {
    // Parse and validate environment variables
    const result = EnvSchema.safeParse(process.env);

    if (!result.success) {
      const errors = result.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Environment validation failed:\n${errors.join('\n')}`);
    }

    // Freeze the object to prevent mutations
    cachedEnv = Object.freeze(result.data);
    return cachedEnv;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to validate environment: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Get the validated environment object
 * @returns Validated environment object
 */
export function getEnv(): Env {
  return validateEnv();
}

/**
 * Check if running in development mode
 * @returns boolean
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === 'development';
}

/**
 * Check if running in production mode
 * @returns boolean
 */
export function isProduction(): boolean {
  return getEnv().NODE_ENV === 'production';
}

/**
 * Check if running in test mode
 * @returns boolean
 */
export function isTest(): boolean {
  return getEnv().NODE_ENV === 'test';
}

/**
 * Get a specific environment variable with type safety
 * @param key - Environment variable key
 * @returns Environment variable value
 * @throws Error if key is not defined in schema
 */
export function getEnvVar<K extends keyof Env>(key: K): Env[K] {
  const env = getEnv();
  return env[key];
}

/**
 * Reload environment variables (useful for testing)
 * Clears the cached environment
 */
export function reloadEnv(): void {
  cachedEnv = null;
}
