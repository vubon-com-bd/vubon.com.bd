/**
 * Application core configuration
 * @module shared-config/common/app
 */
import { getOptionalEnv, getOptionalEnvInt } from '../env/env.helper';
import { loadEnv } from '../env/env.loader';

export const APP_CONFIG = Object.freeze({
  name: getOptionalEnv('APP_NAME', 'Vubon'),
  version: getOptionalEnv('APP_VERSION', '1.0.0'),
  port: getOptionalEnvInt('APP_PORT', 3000),
  env: loadEnv().NODE_ENV,
  logLevel: loadEnv().LOG_LEVEL,
  defaultLocale: 'bn-BD',
  defaultTimezone: 'Asia/Dhaka',
  defaultCurrency: 'BDT',
  defaultLanguage: 'bn',
} as const);

export type AppConfig = typeof APP_CONFIG;
