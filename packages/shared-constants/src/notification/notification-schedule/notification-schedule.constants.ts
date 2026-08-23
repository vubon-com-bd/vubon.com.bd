/**
 * Notification Schedule Constants
 * Core notification schedule configuration and settings
 */

export const NOTIFICATIONSCHEDULE = {
  // Schedule Types
  TYPES: {
    ONE_TIME: 'one_time',
    RECURRING: 'recurring',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  } as const,

  // Schedule Frequencies
  FREQUENCIES: {
    ONCE: 'once',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
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
    ALL: 'all',
    WEEKDAYS: 'weekdays',
    WEEKENDS: 'weekends',
  } as const,

  // Schedule Timezones
  TIMEZONES: {
    UTC: 'UTC',
    ASIA_DHAKA: 'Asia/Dhaka',
    ASIA_KOLKATA: 'Asia/Kolkata',
    ASIA_DUBAI: 'Asia/Dubai',
    ASIA_SINGAPORE: 'Asia/Singapore',
    ASIA_TOKYO: 'Asia/Tokyo',
    AMERICA_NEW_YORK: 'America/New_York',
    AMERICA_LOS_ANGELES: 'America/Los_Angeles',
    EUROPE_LONDON: 'Europe/London',
    EUROPE_PARIS: 'Europe/Paris',
    AUSTRALIA_SYDNEY: 'Australia/Sydney',
  } as const,

  // Schedule Priority
  PRIORITY: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Schedule Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'one_time',
    DEFAULT_FREQUENCY: 'daily',
    DEFAULT_TIME: '09:00:00',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_PRIORITY: 'medium',
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 300000,
    DEFAULT_MAX_SCHEDULES: 100,
    DEFAULT_BATCH_SIZE: 50,
  } as const,

  // Schedule Limits
  LIMITS: {
    MIN_INTERVAL_MINUTES: 5,
    MAX_INTERVAL_DAYS: 365,
    MAX_SCHEDULES_PER_USER: 50,
    MAX_SCHEDULES_PER_NOTIFICATION: 10,
    MIN_TIME_PRECISION: 'minute',
  } as const,
} as const;

// Schedule Types
export type NotificationScheduleType =
  (typeof NOTIFICATIONSCHEDULE.TYPES)[keyof typeof NOTIFICATIONSCHEDULE.TYPES];

// Schedule Frequencies
export type NotificationScheduleFrequency =
  (typeof NOTIFICATIONSCHEDULE.FREQUENCIES)[keyof typeof NOTIFICATIONSCHEDULE.FREQUENCIES];

// Schedule Days
export type NotificationScheduleDay =
  (typeof NOTIFICATIONSCHEDULE.DAYS)[keyof typeof NOTIFICATIONSCHEDULE.DAYS];

// Schedule Timezones
export type NotificationScheduleTimezone =
  (typeof NOTIFICATIONSCHEDULE.TIMEZONES)[keyof typeof NOTIFICATIONSCHEDULE.TIMEZONES];

// Schedule Priority
export type NotificationSchedulePriority =
  (typeof NOTIFICATIONSCHEDULE.PRIORITY)[keyof typeof NOTIFICATIONSCHEDULE.PRIORITY];

// Schedule Defaults
export type NotificationScheduleDefault =
  (typeof NOTIFICATIONSCHEDULE.DEFAULTS)[keyof typeof NOTIFICATIONSCHEDULE.DEFAULTS];

// Schedule Limits
export type NotificationScheduleLimit =
  (typeof NOTIFICATIONSCHEDULE.LIMITS)[keyof typeof NOTIFICATIONSCHEDULE.LIMITS];

// Utility Functions
export function notificationscheduleGetTypeLabel(type: NotificationScheduleType): string {
  const labels: Record<NotificationScheduleType, string> = {
    [NOTIFICATIONSCHEDULE.TYPES.ONE_TIME]: 'One Time',
    [NOTIFICATIONSCHEDULE.TYPES.RECURRING]: 'Recurring',
    [NOTIFICATIONSCHEDULE.TYPES.DAILY]: 'Daily',
    [NOTIFICATIONSCHEDULE.TYPES.WEEKLY]: 'Weekly',
    [NOTIFICATIONSCHEDULE.TYPES.BI_WEEKLY]: 'Bi-Weekly',
    [NOTIFICATIONSCHEDULE.TYPES.MONTHLY]: 'Monthly',
    [NOTIFICATIONSCHEDULE.TYPES.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONSCHEDULE.TYPES.YEARLY]: 'Yearly',
    [NOTIFICATIONSCHEDULE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Schedule Type';
}

export function notificationscheduleGetFrequencyLabel(
  frequency: NotificationScheduleFrequency
): string {
  const labels: Record<NotificationScheduleFrequency, string> = {
    [NOTIFICATIONSCHEDULE.FREQUENCIES.ONCE]: 'Once',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.HOURLY]: 'Hourly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.DAILY]: 'Daily',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.WEEKLY]: 'Weekly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.MONTHLY]: 'Monthly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.YEARLY]: 'Yearly',
    [NOTIFICATIONSCHEDULE.FREQUENCIES.CUSTOM]: 'Custom',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function notificationscheduleGetDayLabel(day: NotificationScheduleDay): string {
  const labels: Record<NotificationScheduleDay, string> = {
    [NOTIFICATIONSCHEDULE.DAYS.MONDAY]: 'Monday',
    [NOTIFICATIONSCHEDULE.DAYS.TUESDAY]: 'Tuesday',
    [NOTIFICATIONSCHEDULE.DAYS.WEDNESDAY]: 'Wednesday',
    [NOTIFICATIONSCHEDULE.DAYS.THURSDAY]: 'Thursday',
    [NOTIFICATIONSCHEDULE.DAYS.FRIDAY]: 'Friday',
    [NOTIFICATIONSCHEDULE.DAYS.SATURDAY]: 'Saturday',
    [NOTIFICATIONSCHEDULE.DAYS.SUNDAY]: 'Sunday',
    [NOTIFICATIONSCHEDULE.DAYS.ALL]: 'All Days',
    [NOTIFICATIONSCHEDULE.DAYS.WEEKDAYS]: 'Weekdays',
    [NOTIFICATIONSCHEDULE.DAYS.WEEKENDS]: 'Weekends',
  };
  return labels[day] || 'Unknown Day';
}

export function notificationscheduleGetTimezoneLabel(
  timezone: NotificationScheduleTimezone
): string {
  const labels: Record<NotificationScheduleTimezone, string> = {
    [NOTIFICATIONSCHEDULE.TIMEZONES.UTC]: 'UTC',
    [NOTIFICATIONSCHEDULE.TIMEZONES.ASIA_DHAKA]: 'Asia/Dhaka',
    [NOTIFICATIONSCHEDULE.TIMEZONES.ASIA_KOLKATA]: 'Asia/Kolkata',
    [NOTIFICATIONSCHEDULE.TIMEZONES.ASIA_DUBAI]: 'Asia/Dubai',
    [NOTIFICATIONSCHEDULE.TIMEZONES.ASIA_SINGAPORE]: 'Asia/Singapore',
    [NOTIFICATIONSCHEDULE.TIMEZONES.ASIA_TOKYO]: 'Asia/Tokyo',
    [NOTIFICATIONSCHEDULE.TIMEZONES.AMERICA_NEW_YORK]: 'America/New_York',
    [NOTIFICATIONSCHEDULE.TIMEZONES.AMERICA_LOS_ANGELES]: 'America/Los_Angeles',
    [NOTIFICATIONSCHEDULE.TIMEZONES.EUROPE_LONDON]: 'Europe/London',
    [NOTIFICATIONSCHEDULE.TIMEZONES.EUROPE_PARIS]: 'Europe/Paris',
    [NOTIFICATIONSCHEDULE.TIMEZONES.AUSTRALIA_SYDNEY]: 'Australia/Sydney',
  };
  return labels[timezone] || 'Unknown Timezone';
}

export function notificationscheduleGetPriorityLabel(
  priority: NotificationSchedulePriority
): string {
  const labels: Record<NotificationSchedulePriority, string> = {
    [NOTIFICATIONSCHEDULE.PRIORITY.HIGH]: 'High',
    [NOTIFICATIONSCHEDULE.PRIORITY.MEDIUM]: 'Medium',
    [NOTIFICATIONSCHEDULE.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown Priority';
}

export function notificationscheduleGetDefaultTimezone(): NotificationScheduleTimezone {
  return NOTIFICATIONSCHEDULE.DEFAULTS.DEFAULT_TIMEZONE;
}

export function notificationscheduleIsRecurring(type: NotificationScheduleType): boolean {
  const recurringTypes: NotificationScheduleType[] = [
    NOTIFICATIONSCHEDULE.TYPES.RECURRING,
    NOTIFICATIONSCHEDULE.TYPES.DAILY,
    NOTIFICATIONSCHEDULE.TYPES.WEEKLY,
    NOTIFICATIONSCHEDULE.TYPES.BI_WEEKLY,
    NOTIFICATIONSCHEDULE.TYPES.MONTHLY,
    NOTIFICATIONSCHEDULE.TYPES.QUARTERLY,
    NOTIFICATIONSCHEDULE.TYPES.YEARLY,
  ];
  return recurringTypes.includes(type);
}

export function notificationscheduleIsOneTime(type: NotificationScheduleType): boolean {
  return type === NOTIFICATIONSCHEDULE.TYPES.ONE_TIME;
}

export function notificationscheduleIsWeekday(day: NotificationScheduleDay): boolean {
  const weekdays: NotificationScheduleDay[] = [
    NOTIFICATIONSCHEDULE.DAYS.MONDAY,
    NOTIFICATIONSCHEDULE.DAYS.TUESDAY,
    NOTIFICATIONSCHEDULE.DAYS.WEDNESDAY,
    NOTIFICATIONSCHEDULE.DAYS.THURSDAY,
    NOTIFICATIONSCHEDULE.DAYS.FRIDAY,
  ];
  return weekdays.includes(day);
}

export function notificationscheduleIsWeekend(day: NotificationScheduleDay): boolean {
  const weekends: NotificationScheduleDay[] = [
    NOTIFICATIONSCHEDULE.DAYS.SATURDAY,
    NOTIFICATIONSCHEDULE.DAYS.SUNDAY,
  ];
  return weekends.includes(day);
}
