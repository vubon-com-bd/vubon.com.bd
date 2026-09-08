import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_ROBOTS = {
  TYPES: {
    ...COMMON_TYPES,
    ALLOW: 'allow',
    DISALLOW: 'disallow',
    CRAWL_DELAY: 'crawl_delay',
    SITEMAP: 'sitemap',
  },
  SEO: { ...SEO },
  ROBOTS_DIRECTIVES: {
    INDEX: 'index',
    NOINDEX: 'noindex',
    FOLLOW: 'follow',
    NOFOLLOW: 'nofollow',
    ARCHIVE: 'archive',
    NOARCHIVE: 'noarchive',
  },
  CRAWL_DELAYS: {
    MIN: 0.1,
    MEDIUM: 1.0,
    MAX: 10.0,
  },
  MAX_RULES: 100,
  ROBOTS_RETENTION_DAYS: 365,
} as const;
