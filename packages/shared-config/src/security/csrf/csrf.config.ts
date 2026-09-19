/**
 * CSRF protection configuration
 * @module shared-config/security/csrf
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { SECURITY } from '@vubon/shared-constants/security';

export const CSRF_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CSRF_ENABLED', true),
  tokenLength: SECURITY.CSRF_TOKEN_LENGTH,
  headerName: SECURITY.CSRF_HEADER_NAME,
  cookieName: getOptionalEnv('CSRF_COOKIE_NAME', 'vubon.csrf'),
  cookieHttpOnly: getOptionalEnvBool('CSRF_COOKIE_HTTP_ONLY', true),
  cookieSecure: getOptionalEnvBool('CSRF_COOKIE_SECURE', true),
  cookieSameSite: getOptionalEnv('CSRF_COOKIE_SAME_SITE', 'strict'),
  ignoreMethods: Object.freeze(['GET', 'HEAD', 'OPTIONS'] as const),
  ignorePaths: Object.freeze(['/api/webhooks', '/api/health', '/api/metrics'] as const),
  errorMessage: getOptionalEnv('CSRF_ERROR_MESSAGE', 'Invalid CSRF token'),
  tokenTtlSeconds: getOptionalEnvInt('CSRF_TOKEN_TTL_SECONDS', 3600),
});

export type CsrfConfig = typeof CSRF_CONFIG;
