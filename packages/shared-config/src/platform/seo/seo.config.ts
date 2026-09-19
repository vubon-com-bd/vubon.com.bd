/**
 * SEO base configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SEO_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SEO_ENABLED', true),
  siteName: getOptionalEnv('SEO_SITE_NAME', 'Vubon'),
  siteUrl: getOptionalEnv('SEO_SITE_URL', 'http://localhost:3000'),
  defaultTitle: getOptionalEnv('SEO_DEFAULT_TITLE', 'Vubon Marketplace'),
  titleTemplate: getOptionalEnv('SEO_TITLE_TEMPLATE', '%s | Vubon'),
  defaultDescription: getOptionalEnv(
    'SEO_DEFAULT_DESCRIPTION',
    'Vubon — Multi-vendor marketplace in Bangladesh'
  ),
  defaultKeywords: getOptionalEnv('SEO_DEFAULT_KEYWORDS', 'vubon, marketplace, bangladesh'),
  defaultImage: getOptionalEnv('SEO_DEFAULT_IMAGE', ''),
  twitterHandle: getOptionalEnv('SEO_TWITTER_HANDLE', ''),
  locale: getOptionalEnv('SEO_LOCALE', 'bn_BD'),
  cacheTtlSeconds: getOptionalEnvInt('SEO_CACHE_TTL_SECONDS', 3600),
  trailingSlash: getOptionalEnvBool('SEO_TRAILING_SLASH', false),
});
