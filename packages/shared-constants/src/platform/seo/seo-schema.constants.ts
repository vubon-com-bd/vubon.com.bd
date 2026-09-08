import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_SCHEMA = {
  TYPES: {
    ...COMMON_TYPES,
    PRODUCT: 'product',
    ARTICLE: 'article',
    BLOG_POSTING: 'blog_posting',
    REVIEW: 'review',
    RATING: 'rating',
    ORGANIZATION: 'organization',
    PERSON: 'person',
    PLACE: 'place',
    EVENT: 'event',
    FAQ: 'faq',
    HOW_TO: 'how_to',
    BREADCRUMB: 'breadcrumb',
    SITENAVIGATION: 'sitenavigation',
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
  },
  SEO: { ...SEO },
  SCHEMA_PROPERTIES: {
    PRODUCT: ['name', 'description', 'brand', 'offers', 'aggregateRating'],
    ARTICLE: ['headline', 'author', 'datePublished', 'dateModified'],
    FAQ: ['mainEntity', 'question', 'answer'],
    HOW_TO: ['name', 'step', 'totalTime'],
  },
  MAX_SCHEMAS_PER_PAGE: 10,
  SCHEMA_VERSION: '1.0',
} as const;
