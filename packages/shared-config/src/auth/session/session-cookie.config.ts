/**
 * Auth session cookie configuration
 * @module shared-config/auth/session
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const isProd = loadEnv().NODE_ENV === 'production';

export const AUTH_SESSION_COOKIE_CONFIG = Object.freeze({
  name: getOptionalEnv('AUTH_SESSION_COOKIE', 'vubon.auth'),
  httpOnly: getOptionalEnvBool('AUTH_SESSION_COOKIE_HTTP_ONLY', true),
  secure: getOptionalEnvBool('AUTH_SESSION_COOKIE_SECURE', isProd),
  sameSite: getOptionalEnv('AUTH_SESSION_COOKIE_SAME_SITE', 'lax'),
  path: '/',
  domain: getOptionalEnv('AUTH_SESSION_COOKIE_DOMAIN', ''),
  maxAgeSeconds: getOptionalEnvInt('AUTH_SESSION_COOKIE_MAX_AGE', 86400),
});
