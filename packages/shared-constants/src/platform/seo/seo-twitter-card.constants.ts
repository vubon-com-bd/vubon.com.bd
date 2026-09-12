import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { SEO } from './seo.constants';

export const SEO_TWITTER_CARD = {
  TYPES: {
    ...COMMON_TYPES,
    SUMMARY: 'summary',
    SUMMARY_LARGE_IMAGE: 'summary_large_image',
    APP: 'app',
    PLAYER: 'player',
  },
  SEO: { ...SEO },
  TWITTER_CARD_PROPERTIES: {
    CARD: 'twitter:card',
    SITE: 'twitter:site',
    TITLE: 'twitter:title',
    DESCRIPTION: 'twitter:description',
    IMAGE: 'twitter:image',
    CREATOR: 'twitter:creator',
  },
  MAX_TWITTER_CARD_TAGS: 10,
  RECOMMENDED_IMAGE_SIZE: '1200x675',
  MIN_IMAGE_SIZE: '200x200',
} as const;
