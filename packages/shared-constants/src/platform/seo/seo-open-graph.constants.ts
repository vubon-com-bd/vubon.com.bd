import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_OPEN_GRAPH = {
  TYPES: {
    ...COMMON_TYPES,
    WEBSITE: 'website',
    ARTICLE: 'article',
    PRODUCT: 'product',
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
    BOOK: 'book',
    MUSIC: 'music',
  },
  SEO: { ...SEO },
  OPEN_GRAPH_PROPERTIES: {
    TITLE: 'og:title',
    DESCRIPTION: 'og:description',
    URL: 'og:url',
    IMAGE: 'og:image',
    TYPE: 'og:type',
    SITE_NAME: 'og:site_name',
    LOCALE: 'og:locale',
    VIDEO: 'og:video',
    AUDIO: 'og:audio',
  },
  MAX_OPEN_GRAPH_TAGS: 20,
  RECOMMENDED_IMAGE_SIZE: '1200x630',
  MIN_IMAGE_SIZE: '200x200',
} as const;
