/**
 * Environment variable loader and validator
 * Loads, validates, and exports validated environment configuration
 */
import { config } from 'dotenv';

import { envSchema, strictEnvSchema, validatedEnv, validateStrictEnv } from './env.schema';
import type { EnvConfig, StrictEnvConfig } from './env.schema';

// Load environment variables from .env file
config();

// Get raw environment variables securely matching process.env keys
const getRawEnv = (): Record<string, string | undefined> => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    API_URL: process.env.API_URL,
    APP_NAME: process.env.APP_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_MAX_CONNECTIONS: process.env.DATABASE_MAX_CONNECTIONS,
    DATABASE_IDLE_TIMEOUT: process.env.DATABASE_IDLE_TIMEOUT,
    DATABASE_CONNECTION_TIMEOUT: process.env.DATABASE_CONNECTION_TIMEOUT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DB: process.env.REDIS_DB,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    CORS_CREDENTIALS: process.env.CORS_CREDENTIALS,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_FORMAT: process.env.LOG_FORMAT,
    ENABLE_EMAIL_VERIFICATION: process.env.ENABLE_EMAIL_VERIFICATION,
    ENABLE_TWO_FACTOR_AUTH: process.env.ENABLE_TWO_FACTOR_AUTH,
    ENABLE_PASSWORD_RESET: process.env.ENABLE_PASSWORD_RESET,
    ENABLE_SOCIAL_LOGIN: process.env.ENABLE_SOCIAL_LOGIN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY,
    CACHE_TTL: process.env.CACHE_TTL,
    CACHE_MAX_ITEMS: process.env.CACHE_MAX_ITEMS,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
    NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL,
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
    TEST_REDIS_URL: process.env.TEST_REDIS_URL,
  };
};

// Validate and export environment configuration
export const env: EnvConfig = (() => {
  try {
    const rawEnv = getRawEnv();
    return validatedEnv(rawEnv);
  } catch (error) {
    console.error('Failed to validate environment variables:', error);
    throw error;
  }
})();

// Validate and export strict environment configuration
export const strictEnv: StrictEnvConfig = (() => {
  try {
    const rawEnv = getRawEnv();
    return validateStrictEnv(rawEnv);
  } catch (error) {
    console.error('Failed to validate strict environment variables:', error);
    throw error;
  }
})();

// Export environment validation utilities for custom overrides (e.g., in Testing)
export const validateEnv = (envOverride?: Record<string, string | undefined>): EnvConfig => {
  try {
    const rawEnv = getRawEnv();
    const mergedEnv = {
      ...rawEnv,
      ...envOverride,
    };
    return validatedEnv(mergedEnv);
  } catch (error) {
    console.error('Environment validation failed:', error);
    throw error;
  }
};

export const validateStrictEnvOverride = (
  envOverride?: Record<string, string | undefined>,
): StrictEnvConfig => {
  try {
    const rawEnv = getRawEnv();
    const mergedEnv = {
      ...rawEnv,
      ...envOverride,
    };
    return validateStrictEnv(mergedEnv);
  } catch (error) {
    console.error('Strict environment validation failed:', error);
    throw error;
  }
};

// Export environment utilities
export const getEnv = (key: keyof EnvConfig): EnvConfig[keyof EnvConfig] | undefined => {
  return env[key];
};

export const getStringEnv = (key: keyof EnvConfig): string | undefined => {
  const value = env[key];
  if (typeof value === 'string') {
    return value;
  }
  return undefined;
};

export const getNumberEnv = (key: keyof EnvConfig): number | undefined => {
  const value = env[key];
  if (typeof value === 'number') {
    return value;
  }
  return undefined;
};

export const getBooleanEnv = (key: keyof EnvConfig): boolean | undefined => {
  const value = env[key];
  if (typeof value === 'boolean') {
    return value;
  }
  return undefined;
};

export const getArrayEnv = (key: keyof EnvConfig): string[] | undefined => {
  const value = env[key];
  if (Array.isArray(value)) {
    return value;
  }
  return undefined;
};

// Check if environment is production
export const isProduction = (): boolean => {
  return env.NODE_ENV === 'production';
};

// Check if environment is development
export const isDevelopment = (): boolean => {
  return env.NODE_ENV === 'development';
};

// Check if environment is test
export const isTest = (): boolean => {
  return env.NODE_ENV === 'test';
};

// Check if environment is staging
export const isStaging = (): boolean => {
  return env.NODE_ENV === 'staging';
};

// Check if environment is non-production
export const isNonProduction = (): boolean => {
  return !isProduction();
};

// Get API URL with fallback
export const getApiUrl = (): string => {
  return env.API_URL || `http://${env.HOST}:${env.PORT}`;
};

// Get database URL with environment-specific fallback
export const getDatabaseUrl = (): string => {
  if (isTest() && env.TEST_DATABASE_URL) {
    return env.TEST_DATABASE_URL;
  }
  return env.DATABASE_URL;
};

// Get Redis URL with environment-specific fallback
export const getRedisUrl = (): string | undefined => {
  if (isTest() && env.TEST_REDIS_URL) {
    return env.TEST_REDIS_URL;
  }
  return env.REDIS_URL;
};

// Export all environment utilities as default
export default {
  env,
  strictEnv,
  validateEnv,
  validateStrictEnvOverride,
  getEnv,
  getStringEnv,
  getNumberEnv,
  getBooleanEnv,
  getArrayEnv,
  isProduction,
  isDevelopment,
  isTest,
  isStaging,
  isNonProduction,
  getApiUrl,
  getDatabaseUrl,
  getRedisUrl,
};
