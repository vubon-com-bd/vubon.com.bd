import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const REPORT_SCHEDULE_FREQUENCY = {
  TYPES: {
    ...COMMON_TYPES,
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    SEMI_ANNUAL: 'semi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  },
  FREQUENCY_CRON_MAP: {
    HOURLY: '0 * * * *',
    DAILY: '0 0 * * *',
    WEEKLY: '0 0 * * 0',
    MONTHLY: '0 0 1 * *',
    QUARTERLY: '0 0 1 */3 *',
    ANNUAL: '0 0 1 1 *',
  },
} as const;
