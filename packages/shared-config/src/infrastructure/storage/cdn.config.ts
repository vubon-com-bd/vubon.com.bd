/**
 * CDN configuration
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CDN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CDN_ENABLED', false),
  provider: getOptionalEnv('CDN_PROVIDER', 'cloudfront'), // cloudfront | cloudflare | fastly | bunny | custom
  baseUrl: getOptionalEnv('CDN_BASE_URL', ''),
  originUrl: getOptionalEnv('CDN_ORIGIN_URL', ''),
  cacheTtlSeconds: getOptionalEnvInt('CDN_CACHE_TTL_SECONDS', 86400),
  staleWhileRevalidateSeconds: getOptionalEnvInt('CDN_SWR_SECONDS', 3600),
  signedUrlsEnabled: getOptionalEnvBool('CDN_SIGNED_URLS', false),
  signKeyId: getOptionalEnv('CDN_SIGN_KEY_ID', ''),
  signPrivateKey: getOptionalEnv('CDN_SIGN_PRIVATE_KEY', ''),
  signedUrlExpirySeconds: getOptionalEnvInt('CDN_SIGNED_URL_EXPIRY_SECONDS', 3600),
  purgeApiKey: getOptionalEnv('CDN_PURGE_API_KEY', ''),
} as const);

export type CdnConfig = typeof CDN_CONFIG;
