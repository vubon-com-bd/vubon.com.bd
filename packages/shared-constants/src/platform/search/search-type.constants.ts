import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CONTENT_TYPE } from '../../content/content-type.constants';

export const SEARCH_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    ...CONTENT_TYPE,
    PRODUCT: 'product',
    VENDOR: 'vendor',
    CATEGORY: 'category',
    BRAND: 'brand',
    BLOG: 'blog',
    PAGE: 'page',
    USER: 'user',
    ORDER: 'order',
    REVIEW: 'review',
    FAQ: 'faq',
    MEDIA: 'media',
    ALL: 'all',
  },
  CONTENT_TYPE: { ...CONTENT_TYPE },
} as const;
