import { EnvSchema, type Env } from './env.schema';

/**
 * Validates process.env against EnvSchema.
 * On failure, logs errors and exits (fail-fast).
 */
export const validateEnv = (): Env => {
  const result = EnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
};

/**
 * REQUIRED env var — throws if missing.
 * Returns string.
 */
export const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value === '') {
    throw new Error(`Required environment variable "${key}" is not set`);
  }
  return value;
};

/**
 * Optional env var — returns defaultValue if missing.
 * ⚠️ Do NOT use for secrets.
 *
 * Signature: returns string. Use Number() or === 'true' for conversion.
 */
export const getOptionalEnv = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  if (value === undefined || value === '') return defaultValue;
  return value;
};

/**
 * @deprecated Use getRequiredEnv or getOptionalEnv explicitly.
 */
export const getEnv = (key: string, defaultValue?: string): string => {
  if (defaultValue !== undefined) {
    return getOptionalEnv(key, defaultValue);
  }
  return getRequiredEnv(key);
};
