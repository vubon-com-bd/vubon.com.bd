import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { CONTENT_TYPE } from '../../content/content-type.constants';
import { SEO_KEYWORD } from './seo-keyword.constants';

export const SEO_CONTENT = {
  TYPES: {
    ...COMMON_TYPES,
    ...CONTENT_TYPE, // CONTENT_TYPE-এর সব টাইপ সরাসরি নেওয়া হচ্ছে
    BLOG: 'blog',
    LANDING: 'landing',
    PRODUCT: 'product',
    CATEGORY: 'category',
    ABOUT: 'about',
    CONTACT: 'contact',
    SERVICE: 'service',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    EBOOK: 'ebook',
  },
  CONTENT_TYPE: { ...CONTENT_TYPE },
  SEO_KEYWORD: { ...SEO_KEYWORD },
  CONTENT_LENGTH: {
    MIN: 300,
    RECOMMENDED: 1000,
    OPTIMAL: 2000,
    MAX: 10000,
  },
  READABILITY_SCORES: {
    EASY: 90,
    MEDIUM: 70,
    HARD: 50,
  },
  MAX_CONTENT_PER_PAGE: 1,
} as const;
