/**
 * Session cookie configuration
 * @module shared-config/infrastructure/session
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const isProd = loadEnv().NODE_ENV === 'production';

export const SESSION_COOKIE_CONFIG = Object.freeze({
  name: getOptionalEnv('SESSION_COOKIE_NAME', 'vubon.sid'),
  httpOnly: getOptionalEnvBool('SESSION_COOKIE_HTTP_ONLY', true),
  secure: getOptionalEnvBool('SESSION_COOKIE_SECURE', isProd),
  sameSite: getOptionalEnv('SESSION_COOKIE_SAME_SITE', 'lax'), // strict | lax | none
  path: getOptionalEnv('SESSION_COOKIE_PATH', '/'),
  domain: getOptionalEnv('SESSION_COOKIE_DOMAIN', ''),
  maxAgeSeconds: getOptionalEnvInt('SESSION_COOKIE_MAX_AGE_SECONDS', 86400),
  signed: getOptionalEnvBool('SESSION_COOKIE_SIGNED', true),
  partitioned: getOptionalEnvBool('SESSION_COOKIE_PARTITIONED', false),
} as const);

export type SessionCookieConfig = typeof SESSION_COOKIE_CONFIG;
