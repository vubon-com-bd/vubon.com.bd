import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { TAG } from '../business/product/tag.constants';

export const CONTENT_TAG = {
  TYPES: {
    ...COMMON_TYPES,
    ...TAG.STATUS,
    TRENDING: 'trending',
    POPULAR: 'popular',
    NEW: 'new',
    FEATURED: 'featured',
    EDITOR_PICK: 'editor_pick',
    EXCLUSIVE: 'exclusive',
  },
  PRODUCT_TAGS: { ...TAG },
  MAX_TAGS_PER_CONTENT: 10,
  TAG_POPULARITY_THRESHOLD: 100,
} as const;
