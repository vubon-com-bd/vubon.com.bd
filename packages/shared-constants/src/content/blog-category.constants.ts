import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CONTENT_CATEGORY } from './content-category.constants';

export const BLOG_CATEGORY = {
  TYPES: {
    ...COMMON_TYPES,
    ...CONTENT_CATEGORY.TYPES,
    ECOMMERCE: 'ecommerce',
    DIGITAL_MARKETING: 'digital_marketing',
    SEO: 'seo',
    SOCIAL_MEDIA: 'social_media',
    WEB_DEVELOPMENT: 'web_development',
    MOBILE_APPS: 'mobile_apps',
    AI_ML: 'ai_ml',
    DATA_SCIENCE: 'data_science',
  },
  CONTENT_CATEGORY: { ...CONTENT_CATEGORY },
} as const;
