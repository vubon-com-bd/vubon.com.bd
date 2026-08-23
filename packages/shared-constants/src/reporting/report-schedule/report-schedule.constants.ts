/**
 * Report Schedule Constants
 * Configuration for report scheduling, frequency, and execution
 */

export const REPORT_SCHEDULE = {
  // Schedule Frequencies
  FREQUENCIES: {
    ONE_TIME: 'one_time',
    HOURLY: 'hourly',
    EVERY_2_HOURS: 'every_2_hours',
    EVERY_3_HOURS: 'every_3_hours',
    EVERY_4_HOURS: 'every_4_hours',
    EVERY_6_HOURS: 'every_6_hours',
    EVERY_8_HOURS: 'every_8_hours',
    EVERY_12_HOURS: 'every_12_hours',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BI_ANNUAL: 'bi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  } as const,

  // Schedule Days
  DAYS: {
    MONDAY: 'monday',
    TUESDAY: 'tuesday',
    WEDNESDAY: 'wednesday',
    THURSDAY: 'thursday',
    FRIDAY: 'friday',
    SATURDAY: 'saturday',
    SUNDAY: 'sunday',
  } as const,

  // Schedule Weeks
  WEEKS: {
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
    FOURTH: 'fourth',
    LAST: 'last',
    ALL: 'all',
  } as const,

  // Schedule Months
  MONTHS: {
    JANUARY: 'january',
    FEBRUARY: 'february',
    MARCH: 'march',
    APRIL: 'april',
    MAY: 'may',
    JUNE: 'june',
    JULY: 'july',
    AUGUST: 'august',
    SEPTEMBER: 'september',
    OCTOBER: 'october',
    NOVEMBER: 'november',
    DECEMBER: 'december',
  } as const,

  // Schedule Time Formats
  TIME_FORMATS: {
    HOURS_12: '12h',
    HOURS_24: '24h',
  } as const,

  // Schedule Cron Expressions
  CRON_EXPRESSIONS: {
    HOURLY: '0 * * * *',
    EVERY_2_HOURS: '0 */2 * * *',
    EVERY_3_HOURS: '0 */3 * * *',
    EVERY_4_HOURS: '0 */4 * * *',
    EVERY_6_HOURS: '0 */6 * * *',
    EVERY_8_HOURS: '0 */8 * * *',
    EVERY_12_HOURS: '0 */12 * * *',
    DAILY_MIDNIGHT: '0 0 * * *',
    DAILY_6AM: '0 6 * * *',
    DAILY_9AM: '0 9 * * *',
    DAILY_NOON: '0 12 * * *',
    DAILY_6PM: '0 18 * * *',
    WEEKLY_MONDAY: '0 9 * * 1',
    WEEKLY_TUESDAY: '0 9 * * 2',
    WEEKLY_WEDNESDAY: '0 9 * * 3',
    WEEKLY_THURSDAY: '0 9 * * 4',
    WEEKLY_FRIDAY: '0 9 * * 5',
    WEEKLY_SATURDAY: '0 9 * * 6',
    WEEKLY_SUNDAY: '0 9 * * 0',
    MONTHLY_FIRST: '0 9 1 * *',
    MONTHLY_LAST: '0 9 L * *',
    QUARTERLY: '0 9 1 1,4,7,10 *',
    BI_ANNUAL: '0 9 1 1,7 *',
    ANNUAL: '0 9 1 1 *',
  } as const,

  // Schedule Time Zones
  TIMEZONES: {
    UTC: 'UTC',
    BD: 'Asia/Dhaka',
    US_EAST: 'America/New_York',
    US_WEST: 'America/Los_Angeles',
    EU_LONDON: 'Europe/London',
    EU_PARIS: 'Europe/Paris',
    ASIA_DUBAI: 'Asia/Dubai',
    ASIA_SINGAPORE: 'Asia/Singapore',
    ASIA_TOKYO: 'Asia/Tokyo',
    AUSTRALIA: 'Australia/Sydney',
  } as const,

  // Schedule Options
  OPTIONS: {
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MINUTES: 5,
    MAX_CONCURRENT_JOBS: 10,
    JOB_TIMEOUT_MINUTES: 30,
    SCHEDULE_LOOKAHEAD_MINUTES: 60,
  } as const,

  // Schedule Execution Status
  EXECUTION_STATUS: {
    PENDING: 'pending',
    RUNNING: 'running',
    SUCCESS: 'success',
    FAILED: 'failed',
    RETRYING: 'retrying',
    CANCELLED: 'cancelled',
    SKIPPED: 'skipped',
  } as const,

  // Schedule Trigger Types
  TRIGGER_TYPES: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    EVENT_BASED: 'event_based',
    TIME_BASED: 'time_based',
    DEPENDENCY: 'dependency',
  } as const,
} as const;

export type ReportScheduleFrequency =
  (typeof REPORT_SCHEDULE.FREQUENCIES)[keyof typeof REPORT_SCHEDULE.FREQUENCIES];
export type ReportScheduleDay = (typeof REPORT_SCHEDULE.DAYS)[keyof typeof REPORT_SCHEDULE.DAYS];
export type ReportScheduleWeek = (typeof REPORT_SCHEDULE.WEEKS)[keyof typeof REPORT_SCHEDULE.WEEKS];
export type ReportScheduleMonth =
  (typeof REPORT_SCHEDULE.MONTHS)[keyof typeof REPORT_SCHEDULE.MONTHS];
export type ReportScheduleTimeFormat =
  (typeof REPORT_SCHEDULE.TIME_FORMATS)[keyof typeof REPORT_SCHEDULE.TIME_FORMATS];
export type ReportScheduleCronExpression =
  (typeof REPORT_SCHEDULE.CRON_EXPRESSIONS)[keyof typeof REPORT_SCHEDULE.CRON_EXPRESSIONS];
export type ReportScheduleTimezone =
  (typeof REPORT_SCHEDULE.TIMEZONES)[keyof typeof REPORT_SCHEDULE.TIMEZONES];
export type ReportScheduleExecutionStatus =
  (typeof REPORT_SCHEDULE.EXECUTION_STATUS)[keyof typeof REPORT_SCHEDULE.EXECUTION_STATUS];
export type ReportScheduleTriggerType =
  (typeof REPORT_SCHEDULE.TRIGGER_TYPES)[keyof typeof REPORT_SCHEDULE.TRIGGER_TYPES];

export function reportScheduleGetFrequencyLabel(frequency: ReportScheduleFrequency): string {
  const labels: Record<ReportScheduleFrequency, string> = {
    [REPORT_SCHEDULE.FREQUENCIES.ONE_TIME]: 'One Time',
    [REPORT_SCHEDULE.FREQUENCIES.HOURLY]: 'Hourly',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]: 'Every 2 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]: 'Every 3 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]: 'Every 4 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]: 'Every 6 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]: 'Every 8 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]: 'Every 12 Hours',
    [REPORT_SCHEDULE.FREQUENCIES.DAILY]: 'Daily',
    [REPORT_SCHEDULE.FREQUENCIES.WEEKLY]: 'Weekly',
    [REPORT_SCHEDULE.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [REPORT_SCHEDULE.FREQUENCIES.MONTHLY]: 'Monthly',
    [REPORT_SCHEDULE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [REPORT_SCHEDULE.FREQUENCIES.BI_ANNUAL]: 'Bi-Annual',
    [REPORT_SCHEDULE.FREQUENCIES.ANNUAL]: 'Annual',
    [REPORT_SCHEDULE.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function reportScheduleGetDayLabel(day: ReportScheduleDay): string {
  const labels: Record<ReportScheduleDay, string> = {
    [REPORT_SCHEDULE.DAYS.MONDAY]: 'Monday',
    [REPORT_SCHEDULE.DAYS.TUESDAY]: 'Tuesday',
    [REPORT_SCHEDULE.DAYS.WEDNESDAY]: 'Wednesday',
    [REPORT_SCHEDULE.DAYS.THURSDAY]: 'Thursday',
    [REPORT_SCHEDULE.DAYS.FRIDAY]: 'Friday',
    [REPORT_SCHEDULE.DAYS.SATURDAY]: 'Saturday',
    [REPORT_SCHEDULE.DAYS.SUNDAY]: 'Sunday',
  };
  return labels[day] || 'Unknown Day';
}

export function reportScheduleGetWeekLabel(week: ReportScheduleWeek): string {
  const labels: Record<ReportScheduleWeek, string> = {
    [REPORT_SCHEDULE.WEEKS.FIRST]: 'First Week',
    [REPORT_SCHEDULE.WEEKS.SECOND]: 'Second Week',
    [REPORT_SCHEDULE.WEEKS.THIRD]: 'Third Week',
    [REPORT_SCHEDULE.WEEKS.FOURTH]: 'Fourth Week',
    [REPORT_SCHEDULE.WEEKS.LAST]: 'Last Week',
    [REPORT_SCHEDULE.WEEKS.ALL]: 'All Weeks',
  };
  return labels[week] || 'Unknown Week';
}

export function reportScheduleGetMonthLabel(month: ReportScheduleMonth): string {
  const labels: Record<ReportScheduleMonth, string> = {
    [REPORT_SCHEDULE.MONTHS.JANUARY]: 'January',
    [REPORT_SCHEDULE.MONTHS.FEBRUARY]: 'February',
    [REPORT_SCHEDULE.MONTHS.MARCH]: 'March',
    [REPORT_SCHEDULE.MONTHS.APRIL]: 'April',
    [REPORT_SCHEDULE.MONTHS.MAY]: 'May',
    [REPORT_SCHEDULE.MONTHS.JUNE]: 'June',
    [REPORT_SCHEDULE.MONTHS.JULY]: 'July',
    [REPORT_SCHEDULE.MONTHS.AUGUST]: 'August',
    [REPORT_SCHEDULE.MONTHS.SEPTEMBER]: 'September',
    [REPORT_SCHEDULE.MONTHS.OCTOBER]: 'October',
    [REPORT_SCHEDULE.MONTHS.NOVEMBER]: 'November',
    [REPORT_SCHEDULE.MONTHS.DECEMBER]: 'December',
  };
  return labels[month] || 'Unknown Month';
}

export function reportScheduleGetCronExpression(frequency: ReportScheduleFrequency): string {
  const cronMap: Record<ReportScheduleFrequency, string> = {
    [REPORT_SCHEDULE.FREQUENCIES.ONE_TIME]: '',
    [REPORT_SCHEDULE.FREQUENCIES.HOURLY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.HOURLY,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_2_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_3_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_4_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_6_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_8_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]: REPORT_SCHEDULE.CRON_EXPRESSIONS.EVERY_12_HOURS,
    [REPORT_SCHEDULE.FREQUENCIES.DAILY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.DAILY_9AM,
    [REPORT_SCHEDULE.FREQUENCIES.WEEKLY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.WEEKLY_MONDAY,
    [REPORT_SCHEDULE.FREQUENCIES.BI_WEEKLY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.WEEKLY_MONDAY,
    [REPORT_SCHEDULE.FREQUENCIES.MONTHLY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.MONTHLY_FIRST,
    [REPORT_SCHEDULE.FREQUENCIES.QUARTERLY]: REPORT_SCHEDULE.CRON_EXPRESSIONS.QUARTERLY,
    [REPORT_SCHEDULE.FREQUENCIES.BI_ANNUAL]: REPORT_SCHEDULE.CRON_EXPRESSIONS.BI_ANNUAL,
    [REPORT_SCHEDULE.FREQUENCIES.ANNUAL]: REPORT_SCHEDULE.CRON_EXPRESSIONS.ANNUAL,
    [REPORT_SCHEDULE.FREQUENCIES.CUSTOM]: '',
  };
  return cronMap[frequency] || '';
}

export function reportScheduleGetExecutionStatusLabel(
  status: ReportScheduleExecutionStatus
): string {
  const labels: Record<ReportScheduleExecutionStatus, string> = {
    [REPORT_SCHEDULE.EXECUTION_STATUS.PENDING]: 'Pending',
    [REPORT_SCHEDULE.EXECUTION_STATUS.RUNNING]: 'Running',
    [REPORT_SCHEDULE.EXECUTION_STATUS.SUCCESS]: 'Success',
    [REPORT_SCHEDULE.EXECUTION_STATUS.FAILED]: 'Failed',
    [REPORT_SCHEDULE.EXECUTION_STATUS.RETRYING]: 'Retrying',
    [REPORT_SCHEDULE.EXECUTION_STATUS.CANCELLED]: 'Cancelled',
    [REPORT_SCHEDULE.EXECUTION_STATUS.SKIPPED]: 'Skipped',
  };
  return labels[status] || 'Unknown Status';
}

export function reportScheduleGetTriggerTypeLabel(triggerType: ReportScheduleTriggerType): string {
  const labels: Record<ReportScheduleTriggerType, string> = {
    [REPORT_SCHEDULE.TRIGGER_TYPES.MANUAL]: 'Manual',
    [REPORT_SCHEDULE.TRIGGER_TYPES.AUTOMATIC]: 'Automatic',
    [REPORT_SCHEDULE.TRIGGER_TYPES.EVENT_BASED]: 'Event-Based',
    [REPORT_SCHEDULE.TRIGGER_TYPES.TIME_BASED]: 'Time-Based',
    [REPORT_SCHEDULE.TRIGGER_TYPES.DEPENDENCY]: 'Dependency',
  };
  return labels[triggerType] || 'Unknown Trigger Type';
}

export function reportScheduleIsValidFrequency(
  frequency: string
): frequency is ReportScheduleFrequency {
  return Object.values(REPORT_SCHEDULE.FREQUENCIES).includes(frequency as ReportScheduleFrequency);
}

export function reportScheduleIsRecurring(frequency: ReportScheduleFrequency): boolean {
  const oneTimeFrequencies: ReportScheduleFrequency[] = [REPORT_SCHEDULE.FREQUENCIES.ONE_TIME];
  return !oneTimeFrequencies.includes(frequency);
}

export function reportScheduleGetTimeoutMinutes(frequency: ReportScheduleFrequency): number {
  const timeouts: Record<ReportScheduleFrequency, number> = {
    [REPORT_SCHEDULE.FREQUENCIES.ONE_TIME]: 60,
    [REPORT_SCHEDULE.FREQUENCIES.HOURLY]: 15,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]: 15,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]: 15,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]: 20,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]: 20,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]: 25,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]: 25,
    [REPORT_SCHEDULE.FREQUENCIES.DAILY]: 30,
    [REPORT_SCHEDULE.FREQUENCIES.WEEKLY]: 30,
    [REPORT_SCHEDULE.FREQUENCIES.BI_WEEKLY]: 30,
    [REPORT_SCHEDULE.FREQUENCIES.MONTHLY]: 45,
    [REPORT_SCHEDULE.FREQUENCIES.QUARTERLY]: 60,
    [REPORT_SCHEDULE.FREQUENCIES.BI_ANNUAL]: 60,
    [REPORT_SCHEDULE.FREQUENCIES.ANNUAL]: 60,
    [REPORT_SCHEDULE.FREQUENCIES.CUSTOM]: 30,
  };
  return timeouts[frequency] || REPORT_SCHEDULE.OPTIONS.JOB_TIMEOUT_MINUTES;
}

export function reportScheduleGetRetryAttempts(frequency: ReportScheduleFrequency): number {
  const attempts: Record<ReportScheduleFrequency, number> = {
    [REPORT_SCHEDULE.FREQUENCIES.ONE_TIME]: 5,
    [REPORT_SCHEDULE.FREQUENCIES.HOURLY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.DAILY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.WEEKLY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.BI_WEEKLY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.MONTHLY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.QUARTERLY]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.BI_ANNUAL]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.ANNUAL]: 3,
    [REPORT_SCHEDULE.FREQUENCIES.CUSTOM]: 3,
  };
  return attempts[frequency] || REPORT_SCHEDULE.OPTIONS.MAX_RETRY_ATTEMPTS;
}

export function reportScheduleGetNextRunTime(
  frequency: ReportScheduleFrequency,
  lastRun: Date
): Date {
  const nextRun = new Date(lastRun);

  switch (frequency) {
    case REPORT_SCHEDULE.FREQUENCIES.HOURLY:
      nextRun.setHours(nextRun.getHours() + 1);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_2_HOURS:
      nextRun.setHours(nextRun.getHours() + 2);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_3_HOURS:
      nextRun.setHours(nextRun.getHours() + 3);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_4_HOURS:
      nextRun.setHours(nextRun.getHours() + 4);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_6_HOURS:
      nextRun.setHours(nextRun.getHours() + 6);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_8_HOURS:
      nextRun.setHours(nextRun.getHours() + 8);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.EVERY_12_HOURS:
      nextRun.setHours(nextRun.getHours() + 12);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.DAILY:
      nextRun.setDate(nextRun.getDate() + 1);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.WEEKLY:
      nextRun.setDate(nextRun.getDate() + 7);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.BI_WEEKLY:
      nextRun.setDate(nextRun.getDate() + 14);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.MONTHLY:
      nextRun.setMonth(nextRun.getMonth() + 1);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.QUARTERLY:
      nextRun.setMonth(nextRun.getMonth() + 3);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.BI_ANNUAL:
      nextRun.setMonth(nextRun.getMonth() + 6);
      break;
    case REPORT_SCHEDULE.FREQUENCIES.ANNUAL:
      nextRun.setFullYear(nextRun.getFullYear() + 1);
      break;
    default:
      break;
  }

  return nextRun;
}
