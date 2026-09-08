import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO_CONTENT } from './seo-content.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';

export const SEO_CONTENT_OPTIMIZATION = {
  TYPES: {
    ...COMMON_TYPES,
    ...SEO_CONTENT.TYPES,
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
  },
  SEO_CONTENT: { ...SEO_CONTENT },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  OPTIMIZATION_FACTORS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    HEADINGS: 'headings',
    KEYWORD_DENSITY: 'keyword_density',
    READABILITY: 'readability',
    INTERNAL_LINKS: 'internal_links',
    EXTERNAL_LINKS: 'external_links',
    IMAGES: 'images',
    URL: 'url',
  },
  OPTIMIZATION_SCORES: {
    EXCELLENT: 90,
    GOOD: 75,
    AVERAGE: 60,
    POOR: 40,
  },
  MAX_OPTIMIZATION_RULES: 20,
} as const;
