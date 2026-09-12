import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';

export const SEO_KEYWORD_RESEARCH = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO_KEYWORD.TYPES,
    TRENDING: 'trending',
    SEASONAL: 'seasonal',
    COMPETITIVE: 'competitive',
    NICHE: 'niche',
    OPPORTUNITY: 'opportunity',
  },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  RESEARCH_TOOLS: {
    GOOGLE_KEYWORD_PLANNER: 'google_keyword_planner',
    AHREFS: 'ahrefs',
    SEMRUSH: 'semrush',
    MOZ: 'moz',
    UBERSUGGEST: 'ubersuggest',
  },
  METRICS: {
    SEARCH_VOLUME: 'search_volume',
    KEYWORD_DIFFICULTY: 'keyword_difficulty',
    CPC: 'cpc',
    TREND: 'trend',
    COMPETITION: 'competition',
  },
  MIN_SEARCH_VOLUME: 100,
  MAX_SEARCH_VOLUME: 1000000,
  RESEARCH_FREQUENCY_DAYS: 30,
} as const;
