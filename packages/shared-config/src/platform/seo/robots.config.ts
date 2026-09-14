/**
 * Robots.txt configuration
 * @module shared-config/platform/seo
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ROBOTS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ROBOTS_ENABLED', true),
  allowAll: getOptionalEnvBool('ROBOTS_ALLOW_ALL', true),
  disallowPaths: Object.freeze([
    '/api',
    '/admin',
    '/cart',
    '/checkout',
    '/account',
    '/search',
  ] as const),
  crawlDelay: getOptionalEnvInt('ROBOTS_CRAWL_DELAY', 1),
  sitemapUrl: '/sitemap.xml',
});
