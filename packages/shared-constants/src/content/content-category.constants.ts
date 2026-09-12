import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CATEGORY } from '../business/product/category.constants';

export const CONTENT_CATEGORY = {
  TYPES: {
    ...COMMON_TYPES,
    ...CATEGORY.STATUS,
    TECHNOLOGY: 'technology',
    BUSINESS: 'business',
    LIFESTYLE: 'lifestyle',
    HEALTH: 'health',
    EDUCATION: 'education',
    ENTERTAINMENT: 'entertainment',
    SPORTS: 'sports',
    TRAVEL: 'travel',
    FOOD: 'food',
    FASHION: 'fashion',
    MARKETING: 'marketing',
    FINANCE: 'finance',
    SCIENCE: 'science',
    POLITICS: 'politics',
    CULTURE: 'culture',
  },
  PRODUCT_CATEGORIES: { ...CATEGORY },
  CATEGORY_HIERARCHY: {
    TECHNOLOGY: ['software', 'hardware', 'ai', 'blockchain'],
    BUSINESS: ['startup', 'entrepreneurship', 'management'],
    HEALTH: ['fitness', 'nutrition', 'mental_health'],
  },
  MAX_CATEGORIES_PER_CONTENT: 5,
} as const;
