import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { METRICS } from '../common/types.constants';
import { CONTENT_STATUS } from './content-status.constants';
import { USER_STATUS } from '../user/user-status.constants';

export const CONTENT_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    VIEWS: 'views',
    ENGAGEMENT: 'engagement',
    SHARES: 'shares',
    COMMENTS: 'comments',
    REACTIONS: 'reactions',
    CONVERSION: 'conversion',
  },
  METRICS: {
    ...METRICS,
    TOTAL_VIEWS: 'total_views',
    UNIQUE_VIEWS: 'unique_views',
    AVERAGE_READ_TIME: 'average_read_time',
    BOUNCE_RATE: 'bounce_rate',
    SHARE_COUNT: 'share_count',
    COMMENT_COUNT: 'comment_count',
    REACTION_COUNT: 'reaction_count',
    CONVERSION_RATE: 'conversion_rate',
  },
  CONTENT_STATUS: { ...CONTENT_STATUS },
  USER_STATUS: { ...USER_STATUS },
  ANALYTICS_GRANULARITY: {
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  PERFORMANCE_THRESHOLDS: {
    VIRAL: 10000,
    POPULAR: 5000,
    AVERAGE: 1000,
    LOW: 100,
  },
  RETENTION_DAYS: 365,
} as const;
