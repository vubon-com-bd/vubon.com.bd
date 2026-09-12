import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';
import { SEO_SCORE } from './seo-score.constants';

export const SEO_RANKING = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO_KEYWORD.TYPES,
    ORGANIC: 'organic',
    LOCAL: 'local',
    MAP: 'map',
    VIDEO: 'video',
    IMAGE: 'image',
    NEWS: 'news',
  },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  SEO_SCORE: { ...SEO_SCORE },
  RANKING_POSITIONS: {
    TOP_3: 3,
    TOP_10: 10,
    TOP_20: 20,
    TOP_50: 50,
    TOP_100: 100,
  },
  RANKING_IMPROVEMENT: {
    EXCELLENT: 10,
    GOOD: 5,
    AVERAGE: 2,
    POOR: 0,
  },
  MAX_RANKING_KEYWORDS: 100,
  RANKING_CHECK_FREQUENCY_DAYS: 7,
} as const;
