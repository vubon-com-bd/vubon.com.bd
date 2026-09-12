import { TYPES as COMMON_TYPES } from '../../common/types.constants';

// TIME_FRAME নিজে ডিফাইন করুন (কারণ common এ নেই)
export const TIME_FRAME = {
  LAST_HOUR: 'last_hour',
  LAST_DAY: 'last_day',
  LAST_WEEK: 'last_week',
  LAST_MONTH: 'last_month',
  LAST_YEAR: 'last_year',
} as const;

export const TRENDING = {
  TYPES: {
    ...COMMON_TYPES,
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    BRANDS: 'brands',
    VENDORS: 'vendors',
    SEARCHES: 'searches',
    VIEWS: 'views',
    PURCHASES: 'purchases',
  },
  TIME_FRAMES: {
    ...TIME_FRAME,
    LAST_HOUR: 'last_hour',
    LAST_DAY: 'last_day',
    LAST_WEEK: 'last_week',
    LAST_MONTH: 'last_month',
  },
  TRENDING_WEIGHTS: {
    VIEWS: 0.3,
    PURCHASES: 0.5,
    SEARCHES: 0.2,
  },
  TRENDING_SCORE_THRESHOLD: 100,
  MAX_TRENDING_ITEMS: 50,
  TRENDING_UPDATE_INTERVAL_MINUTES: 60,
} as const;
