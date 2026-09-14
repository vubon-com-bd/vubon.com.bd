export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const ENV_KEY = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
  DATABASE_URL: 'DATABASE_URL',
  REDIS_URL: 'REDIS_URL',
  JWT_SECRET: 'JWT_SECRET',
  JWT_EXPIRES_IN: 'JWT_EXPIRES_IN',
  API_BASE_URL: 'API_BASE_URL',
  LOG_LEVEL: 'LOG_LEVEL',
} as const;

export type EnvironmentType = (typeof ENVIRONMENT)[keyof typeof ENVIRONMENT];
