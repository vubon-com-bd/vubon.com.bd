import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { METRICS } from '../../common/types.constants';

export const SEARCH_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    QUERY: 'query',
    CLICK: 'click',
    CONVERSION: 'conversion',
    SESSION: 'session',
    USER: 'user',
  },
  METRICS: {
    ...METRICS,
    TOTAL_SEARCHES: 'total_searches',
    UNIQUE_SEARCHES: 'unique_searches',
    ZERO_RESULTS: 'zero_results',
    CLICK_THROUGH_RATE: 'click_through_rate',
    CONVERSION_RATE: 'conversion_rate',
    AVERAGE_CLICK_POSITION: 'average_click_position',
    AVERAGE_SEARCH_TIME: 'average_search_time',
    POPULAR_QUERIES: 'popular_queries',
    FALLBACK_QUERIES: 'fallback_queries',
  },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  RETENTION_DAYS: 90,
  MIN_QUERIES_FOR_TRENDING: 10,
} as const;
