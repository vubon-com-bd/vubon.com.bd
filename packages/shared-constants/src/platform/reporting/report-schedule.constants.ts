export const REPORT_SCHEDULE_TYPE = {
  ONCE: 'once',
  RECURRING: 'recurring',
  TRIGGERED: 'triggered',
  ON_DEMAND: 'on_demand',
} as const;

export const REPORT_SCHEDULE_FREQUENCY = {
  HOURLY: 'hourly',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  HALF_YEARLY: 'half_yearly',
  YEARLY: 'yearly',
  CUSTOM: 'custom',
} as const;

export const REPORT_SCHEDULE_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
  EXPIRED: 'expired',
} as const;

export const REPORT_SCHEDULE = {
  MAX_ACTIVE_SCHEDULES: 1000,
  MIN_INTERVAL_MINUTES: 60,
  MAX_FUTURE_DAYS: 365,
  TIMEZONE_DEFAULT: 'Asia/Dhaka',
  DEFAULT_SEND_HOUR: 9,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 300,
  NOTIFY_ON_FAILURE: true,
} as const;

export type ReportScheduleTypeType =
  (typeof REPORT_SCHEDULE_TYPE)[keyof typeof REPORT_SCHEDULE_TYPE];
export type ReportScheduleFrequencyType =
  (typeof REPORT_SCHEDULE_FREQUENCY)[keyof typeof REPORT_SCHEDULE_FREQUENCY];
export type ReportScheduleStatusType =
  (typeof REPORT_SCHEDULE_STATUS)[keyof typeof REPORT_SCHEDULE_STATUS];
