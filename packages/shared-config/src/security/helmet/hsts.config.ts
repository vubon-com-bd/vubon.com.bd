/**
 * HTTP Strict Transport Security configuration
 * @module shared-config/security/helmet
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';
import { loadEnv } from '../../common/env/env.loader';

const isProd = loadEnv().NODE_ENV === 'production';

export const HSTS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('HSTS_ENABLED', isProd),
  maxAgeSeconds: getOptionalEnvInt('HSTS_MAX_AGE_SECONDS', 31536000),
  includeSubDomains: getOptionalEnvBool('HSTS_INCLUDE_SUBDOMAINS', true),
  preload: getOptionalEnvBool('HSTS_PRELOAD', true),
});

export type HstsConfig = typeof HSTS_CONFIG;
