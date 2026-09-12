import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';
import { SEO_RANKING } from './seo-ranking.constants';
import { SEO_SCORE } from './seo-score.constants';

export const SEO_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO_KEYWORD.TYPES,
    TRAFFIC: 'traffic',
    CONVERSION: 'conversion',
    BOUNCE: 'bounce',
    ENGAGEMENT: 'engagement',
  },
  METRICS: {
    ...METRICS,
    ORGANIC_TRAFFIC: 'organic_traffic',
    ORGANIC_CONVERSIONS: 'organic_conversions',
    BOUNCE_RATE: 'bounce_rate',
    PAGE_VIEWS: 'page_views',
    AVERAGE_SESSION_DURATION: 'average_session_duration',
    KEYWORD_RANKINGS: 'keyword_rankings',
    BACKLINK_COUNT: 'backlink_count',
    DOMAIN_AUTHORITY: 'domain_authority',
  },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  SEO_RANKING: { ...SEO_RANKING },
  SEO_SCORE: { ...SEO_SCORE },
  ANALYTICS_GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  },
  TRACKING_PERIOD_DAYS: 30,
  RETENTION_DAYS: 365,
} as const;
