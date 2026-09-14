/**
 * CORS configuration
 * @module shared-config/security/cors
 *
 * ⚠️ Wildcard origin ('*') FORBIDDEN in production — use whitelist.
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

function parseOrigins(raw: string): readonly string[] {
  return raw
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

const origins = parseOrigins(loadEnv().CORS_ORIGINS);

export const CORS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CORS_ENABLED', true),
  origins: Object.freeze(origins),
  credentials: getOptionalEnvBool('CORS_CREDENTIALS', true),
  methods: Object.freeze(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] as const),
  allowedHeaders: Object.freeze([
    'Content-Type',
    'Authorization',
    'X-Request-Id',
    'X-CSRF-Token',
    'X-Api-Key',
    'Accept-Language',
  ] as const),
  exposedHeaders: Object.freeze([
    'X-Request-Id',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
  ] as const),
  maxAgeSeconds: getOptionalEnvInt('CORS_MAX_AGE_SECONDS', 86400),
  preflightContinue: getOptionalEnvBool('CORS_PREFLIGHT_CONTINUE', false),
  optionsSuccessStatus: getOptionalEnvInt('CORS_OPTIONS_SUCCESS_STATUS', 204),
});

export type CorsConfig = typeof CORS_CONFIG;

/**
 * Check if an origin is allowed (whitelist match)
 */
export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true;
  if (CORS_CONFIG.origins.includes('*')) return true;
  return CORS_CONFIG.origins.includes(origin);
}
