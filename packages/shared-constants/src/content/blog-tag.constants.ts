import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CONTENT_TAG } from './content-tag.constants';

export const BLOG_TAG = {
  TYPES: {
    ...COMMON_TYPES,
    ...CONTENT_TAG.TYPES,
    TIPS: 'tips',
    TRICKS: 'tricks',
    HOW_TO: 'how_to',
    BEGINNER: 'beginner',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  },
  CONTENT_TAG: { ...CONTENT_TAG },
} as const;
