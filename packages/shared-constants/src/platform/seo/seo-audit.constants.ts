import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';
import { SEO_SCORE } from './seo-score.constants';

export const SEO_AUDIT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
  },
  TYPES: {
    ...COMMON_TYPES,
    ...SEO.SEO_TYPES,
    FULL: 'full',
    QUICK: 'quick',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    LINK: 'link',
  },
  SEO: { ...SEO },
  SEO_SCORE: { ...SEO_SCORE },
  AUDIT_FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  },
  AUDIT_CATEGORIES: [
    'technical',
    'on_page',
    'content',
    'links',
    'performance',
    'mobile',
    'security',
  ],
  MAX_AUDITS: 50,
  AUDIT_RETENTION_DAYS: 365,
} as const;
