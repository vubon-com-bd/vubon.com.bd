/**
 * CORS whitelist — explicit allow list per environment
 * @module shared-config/security/cors
 */
import { getOptionalEnv } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const env = loadEnv().NODE_ENV;

const DEV_ORIGINS: readonly string[] = Object.freeze([
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
]);

const STAGING_ORIGINS: readonly string[] = Object.freeze([
  'https://staging.vubon.com.bd',
  'https://admin-staging.vubon.com.bd',
]);

const PROD_ORIGINS: readonly string[] = Object.freeze([
  'https://vubon.com.bd',
  'https://www.vubon.com.bd',
  'https://admin.vubon.com.bd',
]);

function selectOrigins(): readonly string[] {
  switch (env) {
    case 'development':
      return DEV_ORIGINS;
    case 'staging':
      return STAGING_ORIGINS;
    case 'production':
      return PROD_ORIGINS;
    case 'test':
      return DEV_ORIGINS;
    default:
      return DEV_ORIGINS;
  }
}

const envOrigins = getOptionalEnv('CORS_ORIGINS', '');

export const CORS_WHITELIST = Object.freeze({
  environment: env,
  origins: Object.freeze(
    envOrigins
      ? envOrigins
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
      : selectOrigins()
  ),
  allowLocalhostInProd: false,
  allowWildcardInDev: true,
});

export type CorsWhitelist = typeof CORS_WHITELIST;
