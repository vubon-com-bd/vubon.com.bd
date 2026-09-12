import { TIMEZONE } from '@vubon/shared-constants/src/common/timezone.constants';

export const scheduleConfig = {
  timezone: TIMEZONE.DHAKA,
  maxSchedules: 50,
  retentionDays: 90,
  maxRecurringSchedules: 20,
  timeout: 60 * 60,
  frequencies: ['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'annual'] as const,
} as const;
