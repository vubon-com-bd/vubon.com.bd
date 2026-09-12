import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { DATE_FORMAT } from '../../common/date-format.constants';
import { SEO_ANALYTICS } from './seo-analytics.constants';
import { SEO_RANKING } from './seo-ranking.constants';
import { SEO_SCORE } from './seo-score.constants';

export const SEO_REPORT = {
  TYPES: {
    ...COMMON_TYPES,
    KEYWORD: 'keyword',
    RANKING: 'ranking',
    TRAFFIC: 'traffic',
    PERFORMANCE: 'performance',
    COMPETITOR: 'competitor',
    BACKLINK: 'backlink',
  },
  DATE_FORMAT: { ...DATE_FORMAT },
  SEO_ANALYTICS: { ...SEO_ANALYTICS },
  SEO_RANKING: { ...SEO_RANKING },
  SEO_SCORE: { ...SEO_SCORE },
  REPORT_FORMATS: {
    PDF: 'pdf',
    EXCEL: 'excel',
    CSV: 'csv',
    JSON: 'json',
    HTML: 'html',
  },
  REPORT_SECTIONS: [
    'executive_summary',
    'keyword_performance',
    'ranking_progress',
    'traffic_analysis',
    'backlink_profile',
    'technical_seo',
    'recommendations',
  ],
  DEFAULT_REPORT_DAYS: 30,
  MAX_REPORT_DAYS: 365,
  REPORT_SCHEDULE: {
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  },
} as const;
