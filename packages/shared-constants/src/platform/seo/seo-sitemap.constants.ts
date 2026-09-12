import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_SITEMAP = {
  TYPES: {
    ...COMMON_TYPES,
    XML: 'xml',
    HTML: 'html',
    IMAGE: 'image',
    VIDEO: 'video',
    NEWS: 'news',
    MOBILE: 'mobile',
  },
  SEO: { ...SEO },
  SITEMAP_CHANGE_FREQUENCIES: {
    ALWAYS: 'always',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    YEARLY: 'yearly',
    NEVER: 'never',
  },
  SITEMAP_PRIORITIES: {
    HIGH: 1.0,
    MEDIUM: 0.5,
    LOW: 0.1,
  },
  MAX_URLS_PER_SITEMAP: 50000,
  MAX_SITEMAP_SIZE_MB: 50,
  SITEMAP_UPDATE_FREQUENCY_DAYS: 1,
} as const;
