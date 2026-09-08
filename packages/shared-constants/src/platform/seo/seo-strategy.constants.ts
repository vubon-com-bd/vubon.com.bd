import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_STRATEGY = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO.SEO_TYPES,
    ORGANIC: 'organic',
    PAID: 'paid',
    HYBRID: 'hybrid',
    SHORT_TERM: 'short_term',
    LONG_TERM: 'long_term',
  },
  SEO: { ...SEO },
  STRATEGY_PRIORITIES: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
  STRATEGY_GOALS: {
    AWARENESS: 'awareness',
    TRAFFIC: 'traffic',
    CONVERSION: 'conversion',
    BRANDING: 'branding',
  },
  MAX_STRATEGIES: 10,
  STRATEGY_DURATION_DAYS: 90,
} as const;
