import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_KEYWORD = {
  TYPES: {
    ...COMMON_TYPES,
    HEAD: 'head',
    BODY: 'body',
    LONG_TAIL: 'long_tail',
    LSI: 'lsi',
    SEMANTIC: 'semantic',
    GEO: 'geo',
    BRANDED: 'branded',
    COMPETITOR: 'competitor',
  },
  SEO: { ...SEO },
  KEYWORD_LENGTHS: {
    SHORT: 1,
    MEDIUM: 2,
    LONG: 3,
  },
  KEYWORD_DIFFICULTY: {
    EASY: 0.3,
    MEDIUM: 0.6,
    HARD: 0.8,
  },
  MAX_KEYWORDS_PER_PAGE: 10,
  MAX_KEYWORDS_PER_CONTENT: 20,
  KEYWORD_TRACKING_LIMIT: 100,
} as const;
