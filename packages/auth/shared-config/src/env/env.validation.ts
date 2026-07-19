/* eslint-disable security/detect-object-injection */
/**
 * Environment variable loader and validator
 * Loads, validates, and exports validated environment configuration
 */
import { config } from 'dotenv';

import { validatedEnv, validateStrictEnv } from './env.schema';
import type { EnvConfig, StrictEnvConfig } from './env.schema';

// Load environment variables from .env file
config();

// Get raw environment variables securely
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

export const env: EnvConfig = validatedEnv(getRawEnv());
export const strictEnv: StrictEnvConfig = validateStrictEnv(getRawEnv());

export const validateEnv = (envOverride?: Record<string, string | undefined>): EnvConfig => {
  return validatedEnv({ ...getRawEnv(), ...envOverride });
};

export const validateStrictEnvOverride = (
  envOverride?: Record<string, string | undefined>,
): StrictEnvConfig => {
  return validateStrictEnv({ ...getRawEnv(), ...envOverride });
};

export const getEnv = (key: keyof EnvConfig) => env[key];
export const getStringEnv = (key: keyof EnvConfig) =>
  typeof env[key] === 'string' ? env[key] : undefined;
export const getNumberEnv = (key: keyof EnvConfig) =>
  typeof env[key] === 'number' ? env[key] : undefined;
export const getBooleanEnv = (key: keyof EnvConfig) =>
  typeof env[key] === 'boolean' ? env[key] : undefined;
export const getArrayEnv = (key: keyof EnvConfig) =>
  Array.isArray(env[key]) ? env[key] : undefined;

export const isProduction = () => env.NODE_ENV === 'production';
export const isDevelopment = () => env.NODE_ENV === 'development';
export const isTest = () => env.NODE_ENV === 'test';
export const isStaging = () => env.NODE_ENV === 'staging';
export const isNonProduction = () => !isProduction();

export const getApiUrl = () => env.API_URL || `http://${env.HOST}:${env.PORT}`;
export const getDatabaseUrl = () =>
  isTest() && env.TEST_DATABASE_URL ? env.TEST_DATABASE_URL : env.DATABASE_URL;
export const getRedisUrl = () =>
  isTest() && env.TEST_REDIS_URL ? env.TEST_REDIS_URL : env.REDIS_URL;

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
