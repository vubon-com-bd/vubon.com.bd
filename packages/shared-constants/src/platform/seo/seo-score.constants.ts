import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_SCORE = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO.SEO_TYPES,
    OVERALL: 'overall',
    PAGE_SPEED: 'page_speed',
    MOBILE_FRIENDLY: 'mobile_friendly',
    CONTENT_QUALITY: 'content_quality',
    BACKLINK_QUALITY: 'backlink_quality',
    USER_EXPERIENCE: 'user_experience',
  },
  SEO: { ...SEO },
  SCORE_RANGES: {
    EXCELLENT: 90,
    GOOD: 75,
    AVERAGE: 60,
    POOR: 40,
    CRITICAL: 20,
  },
  SCORE_WEIGHTS: {
    TECHNICAL: 0.2,
    ON_PAGE: 0.25,
    CONTENT: 0.25,
    LINKS: 0.15,
    USER_EXPERIENCE: 0.15,
  },
  MIN_SCORE_THRESHOLD: 60,
  TARGET_SCORE: 80,
} as const;
