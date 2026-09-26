/**
 * Application URL configuration
 * @module shared-config/common/app
 */
import { getOptionalEnv } from '../env/env.helper';

export const APP_URL_CONFIG = Object.freeze({
  app: getOptionalEnv('APP_URL', 'http://localhost:3000'),
  api: getOptionalEnv('API_URL', 'http://localhost:3000/api'),
  adminUrl: getOptionalEnv('ADMIN_URL', 'http://localhost:3001'),
  cdnUrl: getOptionalEnv('CDN_URL', ''),
  docsUrl: getOptionalEnv('DOCS_URL', ''),
} as const);

export type AppUrlConfig = typeof APP_URL_CONFIG;
