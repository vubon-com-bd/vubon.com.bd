import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { REPORT_SCHEDULE_FREQUENCY } from './report-schedule-frequency.constants';

export const REPORT_SCHEDULE = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    FAILED: 'failed',
  },
  REPORT_SCHEDULE_FREQUENCY: { ...REPORT_SCHEDULE_FREQUENCY },
  SCHEDULE_TYPES: {
    ONCE: 'once',
    RECURRING: 'recurring',
    CUSTOM: 'custom',
  },
  MAX_SCHEDULES: 50,
  SCHEDULE_RETENTION_DAYS: 90,
  MAX_RECURRING_SCHEDULES: 20,
  SCHEDULE_TIMEOUT_MINUTES: 60,
} as const;
