/**
 * Sitemap configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SITEMAP_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SITEMAP_ENABLED', true),
  path: getOptionalEnv('SITEMAP_PATH', '/sitemap.xml'),
  maxUrlsPerFile: getOptionalEnvInt('SITEMAP_MAX_URLS', 50000),
  maxFileSizeMb: getOptionalEnvInt('SITEMAP_MAX_FILE_SIZE_MB', 50),
  autoGenerate: getOptionalEnvBool('SITEMAP_AUTO_GENERATE', true),
  includeImages: getOptionalEnvBool('SITEMAP_INCLUDE_IMAGES', true),
  includeVideos: getOptionalEnvBool('SITEMAP_INCLUDE_VIDEOS', false),
  pingSearchEngines: getOptionalEnvBool('SITEMAP_PING_SEARCH_ENGINES', true),
  defaultChangefreq: getOptionalEnv('SITEMAP_CHANGEFREQ', 'weekly'),
  defaultPriority: 0.5,
});
