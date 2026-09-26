/**
 * Application mode flags derived from NODE_ENV
 * @module shared-config/common/app
 */
import { loadEnv } from '../env/env.loader';

const env = loadEnv();

export const APP_MODE = Object.freeze({
  name: env.NODE_ENV,
  isDevelopment: env.NODE_ENV === 'development',
  isStaging: env.NODE_ENV === 'staging',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
} as const);

export type AppMode = typeof APP_MODE;
