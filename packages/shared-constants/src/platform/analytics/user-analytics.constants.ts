import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_STATUS } from '../../user/user-status.constants';

export const USER_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    NEW_USERS: 'new_users',
    ACTIVE_USERS: 'active_users',
    RETURNING_USERS: 'returning_users',
    CHURNED_USERS: 'churned_users',
    USER_LIFETIME: 'user_lifetime',
    USER_ENGAGEMENT: 'user_engagement',
  },
  USER_STATUS: { ...USER_STATUS },
  METRICS: {
    TOTAL_USERS: 'total_users',
    NEW_USERS: 'new_users',
    ACTIVE_USERS: 'active_users',
    BOUNCE_RATE: 'bounce_rate',
    SESSION_DURATION: 'session_duration',
    USER_RETENTION: 'user_retention',
  },
  RETENTION_PERIODS: {
    DAY_1: 'day_1',
    DAY_7: 'day_7',
    DAY_30: 'day_30',
    DAY_90: 'day_90',
  },
} as const;
