import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const NOTIFICATION_SCHEDULE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    ONCE: 'once',
    RECURRING: 'recurring',
    CUSTOM: 'custom',
  },
  FREQUENCIES: {
    EVERY_MINUTE: 'every_minute',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
  },
  MAX_SCHEDULES: 50,
  SCHEDULE_RETENTION_DAYS: 30,
} as const;
