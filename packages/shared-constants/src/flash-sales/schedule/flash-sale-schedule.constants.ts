/**
 * Flash Sale Schedule Constants
 * Configuration for flash sale scheduling and timing
 */

export const FLASH_SALE_SCHEDULE = {
  // Schedule Types
  TYPES: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  },

  // Schedule Frequencies
  FREQUENCIES: {
    ONCE: 'once',
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
  },

  // Schedule Days
  DAYS: {
    MONDAY: 'monday',
    TUESDAY: 'tuesday',
    WEDNESDAY: 'wednesday',
    THURSDAY: 'thursday',
    FRIDAY: 'friday',
    SATURDAY: 'saturday',
    SUNDAY: 'sunday',
    ALL: 'all',
    WEEKDAYS: 'weekdays',
    WEEKENDS: 'weekends',
  },

  // Schedule Weeks
  WEEKS: {
    FIRST: 'first',
    SECOND: 'second',
    THIRD: 'third',
    FOURTH: 'fourth',
    LAST: 'last',
    ALL: 'all',
  },

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
    ALL: 'all',
  },

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
  },

  // Schedule Time Formats
  TIME_FORMATS: {
    HOURS_12: '12h',
    HOURS_24: '24h',
  },

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
    DAILY_9PM: '0 21 * * *',
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
  },

  // Schedule Defaults
  DEFAULTS: {
    TIMEZONE: 'Asia/Dhaka',
    TIME_FORMAT: '24h',
    BUFFER_MINUTES: 30,
    PREP_TIME_MINUTES: 15,
    MAX_SCHEDULES_PER_DAY: 10,
    MAX_CONCURRENT_SALES: 5,
  },

  // Schedule Limits
  LIMITS: {
    MAX_SCHEDULES: 100,
    MAX_RECURRING_SCHEDULES: 50,
    MAX_SCHEDULES_PER_DAY: 24,
    MAX_DURATION_HOURS: 720,
    MIN_DURATION_MINUTES: 15,
    MAX_ADVANCE_DAYS: 365,
  },

  // Schedule Validation
  VALIDATION: {
    MIN_START_TIME: '00:00',
    MAX_START_TIME: '23:59',
    MIN_DURATION: 15,
    MAX_DURATION: 720,
  },
} as const;

// Schedule Types
export type FlashSaleScheduleType =
  (typeof FLASH_SALE_SCHEDULE.TYPES)[keyof typeof FLASH_SALE_SCHEDULE.TYPES];

// Schedule Frequencies
export type FlashSaleScheduleFrequency =
  (typeof FLASH_SALE_SCHEDULE.FREQUENCIES)[keyof typeof FLASH_SALE_SCHEDULE.FREQUENCIES];

// Schedule Days
export type FlashSaleScheduleDay =
  (typeof FLASH_SALE_SCHEDULE.DAYS)[keyof typeof FLASH_SALE_SCHEDULE.DAYS];

// Schedule Weeks
export type FlashSaleScheduleWeek =
  (typeof FLASH_SALE_SCHEDULE.WEEKS)[keyof typeof FLASH_SALE_SCHEDULE.WEEKS];

// Schedule Months
export type FlashSaleScheduleMonth =
  (typeof FLASH_SALE_SCHEDULE.MONTHS)[keyof typeof FLASH_SALE_SCHEDULE.MONTHS];

// Schedule Time Zones
export type FlashSaleScheduleTimezone =
  (typeof FLASH_SALE_SCHEDULE.TIMEZONES)[keyof typeof FLASH_SALE_SCHEDULE.TIMEZONES];

// Schedule Time Formats
export type FlashSaleScheduleTimeFormat =
  (typeof FLASH_SALE_SCHEDULE.TIME_FORMATS)[keyof typeof FLASH_SALE_SCHEDULE.TIME_FORMATS];

// Schedule Cron Expressions
export type FlashSaleScheduleCronExpression =
  (typeof FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS)[keyof typeof FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS];

// Utility Functions
export function flashsalesScheduleGetTypeLabel(type: FlashSaleScheduleType): string {
  const labels: Record<FlashSaleScheduleType, string> = {
    [FLASH_SALE_SCHEDULE.TYPES.ONE_TIME]: 'One Time',
    [FLASH_SALE_SCHEDULE.TYPES.RECURRING]: 'Recurring',
    [FLASH_SALE_SCHEDULE.TYPES.DAILY]: 'Daily',
    [FLASH_SALE_SCHEDULE.TYPES.WEEKLY]: 'Weekly',
    [FLASH_SALE_SCHEDULE.TYPES.MONTHLY]: 'Monthly',
    [FLASH_SALE_SCHEDULE.TYPES.QUARTERLY]: 'Quarterly',
    [FLASH_SALE_SCHEDULE.TYPES.ANNUAL]: 'Annual',
    [FLASH_SALE_SCHEDULE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Schedule Type';
}

export function flashsalesScheduleGetFrequencyLabel(frequency: FlashSaleScheduleFrequency): string {
  const labels: Record<FlashSaleScheduleFrequency, string> = {
    [FLASH_SALE_SCHEDULE.FREQUENCIES.ONCE]: 'Once',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.HOURLY]: 'Hourly',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]: 'Every 2 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]: 'Every 3 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]: 'Every 4 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]: 'Every 6 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]: 'Every 8 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]: 'Every 12 Hours',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.DAILY]: 'Daily',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.WEEKLY]: 'Weekly',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.MONTHLY]: 'Monthly',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.BI_ANNUAL]: 'Bi-Annual',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.ANNUAL]: 'Annual',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesScheduleGetDayLabel(day: FlashSaleScheduleDay): string {
  const labels: Record<FlashSaleScheduleDay, string> = {
    [FLASH_SALE_SCHEDULE.DAYS.MONDAY]: 'Monday',
    [FLASH_SALE_SCHEDULE.DAYS.TUESDAY]: 'Tuesday',
    [FLASH_SALE_SCHEDULE.DAYS.WEDNESDAY]: 'Wednesday',
    [FLASH_SALE_SCHEDULE.DAYS.THURSDAY]: 'Thursday',
    [FLASH_SALE_SCHEDULE.DAYS.FRIDAY]: 'Friday',
    [FLASH_SALE_SCHEDULE.DAYS.SATURDAY]: 'Saturday',
    [FLASH_SALE_SCHEDULE.DAYS.SUNDAY]: 'Sunday',
    [FLASH_SALE_SCHEDULE.DAYS.ALL]: 'All Days',
    [FLASH_SALE_SCHEDULE.DAYS.WEEKDAYS]: 'Weekdays',
    [FLASH_SALE_SCHEDULE.DAYS.WEEKENDS]: 'Weekends',
  };
  return labels[day] || 'Unknown Day';
}

export function flashsalesScheduleGetWeekLabel(week: FlashSaleScheduleWeek): string {
  const labels: Record<FlashSaleScheduleWeek, string> = {
    [FLASH_SALE_SCHEDULE.WEEKS.FIRST]: 'First Week',
    [FLASH_SALE_SCHEDULE.WEEKS.SECOND]: 'Second Week',
    [FLASH_SALE_SCHEDULE.WEEKS.THIRD]: 'Third Week',
    [FLASH_SALE_SCHEDULE.WEEKS.FOURTH]: 'Fourth Week',
    [FLASH_SALE_SCHEDULE.WEEKS.LAST]: 'Last Week',
    [FLASH_SALE_SCHEDULE.WEEKS.ALL]: 'All Weeks',
  };
  return labels[week] || 'Unknown Week';
}

export function flashsalesScheduleGetMonthLabel(month: FlashSaleScheduleMonth): string {
  const labels: Record<FlashSaleScheduleMonth, string> = {
    [FLASH_SALE_SCHEDULE.MONTHS.JANUARY]: 'January',
    [FLASH_SALE_SCHEDULE.MONTHS.FEBRUARY]: 'February',
    [FLASH_SALE_SCHEDULE.MONTHS.MARCH]: 'March',
    [FLASH_SALE_SCHEDULE.MONTHS.APRIL]: 'April',
    [FLASH_SALE_SCHEDULE.MONTHS.MAY]: 'May',
    [FLASH_SALE_SCHEDULE.MONTHS.JUNE]: 'June',
    [FLASH_SALE_SCHEDULE.MONTHS.JULY]: 'July',
    [FLASH_SALE_SCHEDULE.MONTHS.AUGUST]: 'August',
    [FLASH_SALE_SCHEDULE.MONTHS.SEPTEMBER]: 'September',
    [FLASH_SALE_SCHEDULE.MONTHS.OCTOBER]: 'October',
    [FLASH_SALE_SCHEDULE.MONTHS.NOVEMBER]: 'November',
    [FLASH_SALE_SCHEDULE.MONTHS.DECEMBER]: 'December',
    [FLASH_SALE_SCHEDULE.MONTHS.ALL]: 'All Months',
  };
  return labels[month] || 'Unknown Month';
}

export function flashsalesScheduleGetTimezoneLabel(timezone: FlashSaleScheduleTimezone): string {
  const labels: Record<FlashSaleScheduleTimezone, string> = {
    [FLASH_SALE_SCHEDULE.TIMEZONES.UTC]: 'UTC',
    [FLASH_SALE_SCHEDULE.TIMEZONES.BD]: 'Asia/Dhaka',
    [FLASH_SALE_SCHEDULE.TIMEZONES.US_EAST]: 'America/New_York',
    [FLASH_SALE_SCHEDULE.TIMEZONES.US_WEST]: 'America/Los_Angeles',
    [FLASH_SALE_SCHEDULE.TIMEZONES.EU_LONDON]: 'Europe/London',
    [FLASH_SALE_SCHEDULE.TIMEZONES.EU_PARIS]: 'Europe/Paris',
    [FLASH_SALE_SCHEDULE.TIMEZONES.ASIA_DUBAI]: 'Asia/Dubai',
    [FLASH_SALE_SCHEDULE.TIMEZONES.ASIA_SINGAPORE]: 'Asia/Singapore',
    [FLASH_SALE_SCHEDULE.TIMEZONES.ASIA_TOKYO]: 'Asia/Tokyo',
    [FLASH_SALE_SCHEDULE.TIMEZONES.AUSTRALIA]: 'Australia/Sydney',
  };
  return labels[timezone] || 'Unknown Timezone';
}

export function flashsalesScheduleGetCronExpression(frequency: FlashSaleScheduleFrequency): string {
  const cronMap: Record<FlashSaleScheduleFrequency, string> = {
    [FLASH_SALE_SCHEDULE.FREQUENCIES.ONCE]: '',
    [FLASH_SALE_SCHEDULE.FREQUENCIES.HOURLY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.HOURLY,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_2_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_2_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_3_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_3_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_4_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_4_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_6_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_6_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_8_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_8_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.EVERY_12_HOURS]:
      FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.EVERY_12_HOURS,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.DAILY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.DAILY_9AM,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.WEEKLY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.WEEKLY_MONDAY,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.BI_WEEKLY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.WEEKLY_MONDAY,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.MONTHLY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.MONTHLY_FIRST,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.QUARTERLY]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.QUARTERLY,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.BI_ANNUAL]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.BI_ANNUAL,
    [FLASH_SALE_SCHEDULE.FREQUENCIES.ANNUAL]: FLASH_SALE_SCHEDULE.CRON_EXPRESSIONS.ANNUAL,
  };
  return cronMap[frequency] || '';
}

export function flashsalesScheduleIsValidType(type: string): type is FlashSaleScheduleType {
  return Object.values(FLASH_SALE_SCHEDULE.TYPES).includes(type as FlashSaleScheduleType);
}

export function flashsalesScheduleIsValidFrequency(
  frequency: string
): frequency is FlashSaleScheduleFrequency {
  return Object.values(FLASH_SALE_SCHEDULE.FREQUENCIES).includes(
    frequency as FlashSaleScheduleFrequency
  );
}

export function flashsalesScheduleGetDefaultTimezone(): FlashSaleScheduleTimezone {
  return FLASH_SALE_SCHEDULE.DEFAULTS.TIMEZONE as FlashSaleScheduleTimezone;
}

export function flashsalesScheduleGetMaxSchedulesPerDay(): number {
  return FLASH_SALE_SCHEDULE.DEFAULTS.MAX_SCHEDULES_PER_DAY;
}

export function flashsalesScheduleGetMinDuration(): number {
  return FLASH_SALE_SCHEDULE.VALIDATION.MIN_DURATION;
}

export function flashsalesScheduleGetMaxDuration(): number {
  return FLASH_SALE_SCHEDULE.VALIDATION.MAX_DURATION;
}

export function flashsalesScheduleIsRecurring(scheduleType: FlashSaleScheduleType): boolean {
  const recurringTypes: FlashSaleScheduleType[] = [
    FLASH_SALE_SCHEDULE.TYPES.RECURRING,
    FLASH_SALE_SCHEDULE.TYPES.DAILY,
    FLASH_SALE_SCHEDULE.TYPES.WEEKLY,
    FLASH_SALE_SCHEDULE.TYPES.MONTHLY,
    FLASH_SALE_SCHEDULE.TYPES.QUARTERLY,
    FLASH_SALE_SCHEDULE.TYPES.ANNUAL,
  ];
  return recurringTypes.includes(scheduleType);
}
