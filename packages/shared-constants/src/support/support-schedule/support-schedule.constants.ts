/**
 * Support Schedule Constants
 * Configuration for support schedules
 */

export const SUPPORT_SCHEDULE = {
  // Schedule Types
  TYPES: {
    FIXED: 'fixed',
    ROTATING: 'rotating',
    FLEXIBLE: 'flexible',
    ON_CALL: 'on_call',
    HYBRID: 'hybrid',
  } as const,

  // Schedule Statuses
  STATUS: {
    ACTIVE: 'active',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
  } as const,

  // Schedule Shifts
  SHIFTS: {
    MORNING: 'morning',
    AFTERNOON: 'afternoon',
    EVENING: 'evening',
    NIGHT: 'night',
    WEEKEND: 'weekend',
    HOLIDAY: 'holiday',
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

  // Schedule Time Slots
  TIME_SLOTS: {
    MORNING_START: 6,
    MORNING_END: 14,
    AFTERNOON_START: 14,
    AFTERNOON_END: 22,
    EVENING_START: 16,
    EVENING_END: 0,
    NIGHT_START: 22,
    NIGHT_END: 6,
  } as const,

  // Schedule Limits
  LIMITS: {
    MAX_HOURS_PER_DAY: 12,
    MAX_HOURS_PER_WEEK: 60,
    MIN_HOURS_PER_WEEK: 20,
    MAX_CONSECUTIVE_DAYS: 6,
    MIN_REST_HOURS: 8,
  } as const,

  // Schedule Preferences
  PREFERENCES: {
    EARLY: 'early',
    LATE: 'late',
    NIGHT: 'night',
    FLEXIBLE: 'flexible',
  } as const,
} as const;

// Schedule Types
export type SupportScheduleType =
  (typeof SUPPORT_SCHEDULE.TYPES)[keyof typeof SUPPORT_SCHEDULE.TYPES];

// Schedule Statuses
export type SupportScheduleStatus =
  (typeof SUPPORT_SCHEDULE.STATUS)[keyof typeof SUPPORT_SCHEDULE.STATUS];

// Schedule Shifts
export type SupportScheduleShift =
  (typeof SUPPORT_SCHEDULE.SHIFTS)[keyof typeof SUPPORT_SCHEDULE.SHIFTS];

// Schedule Days
export type SupportScheduleDay = (typeof SUPPORT_SCHEDULE.DAYS)[keyof typeof SUPPORT_SCHEDULE.DAYS];

// Schedule Preferences
export type SupportSchedulePreference =
  (typeof SUPPORT_SCHEDULE.PREFERENCES)[keyof typeof SUPPORT_SCHEDULE.PREFERENCES];

// Utility Functions
export function supportScheduleGetTypeLabel(type: SupportScheduleType): string {
  const labels: Record<SupportScheduleType, string> = {
    [SUPPORT_SCHEDULE.TYPES.FIXED]: 'Fixed Schedule',
    [SUPPORT_SCHEDULE.TYPES.ROTATING]: 'Rotating Schedule',
    [SUPPORT_SCHEDULE.TYPES.FLEXIBLE]: 'Flexible Schedule',
    [SUPPORT_SCHEDULE.TYPES.ON_CALL]: 'On Call Schedule',
    [SUPPORT_SCHEDULE.TYPES.HYBRID]: 'Hybrid Schedule',
  };
  return labels[type] || 'Unknown';
}

export function supportScheduleGetStatusLabel(status: SupportScheduleStatus): string {
  const labels: Record<SupportScheduleStatus, string> = {
    [SUPPORT_SCHEDULE.STATUS.ACTIVE]: 'Active',
    [SUPPORT_SCHEDULE.STATUS.PAUSED]: 'Paused',
    [SUPPORT_SCHEDULE.STATUS.EXPIRED]: 'Expired',
    [SUPPORT_SCHEDULE.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function supportScheduleGetShiftLabel(shift: SupportScheduleShift): string {
  const labels: Record<SupportScheduleShift, string> = {
    [SUPPORT_SCHEDULE.SHIFTS.MORNING]: 'Morning (6AM - 2PM)',
    [SUPPORT_SCHEDULE.SHIFTS.AFTERNOON]: 'Afternoon (2PM - 10PM)',
    [SUPPORT_SCHEDULE.SHIFTS.EVENING]: 'Evening (4PM - 12AM)',
    [SUPPORT_SCHEDULE.SHIFTS.NIGHT]: 'Night (10PM - 6AM)',
    [SUPPORT_SCHEDULE.SHIFTS.WEEKEND]: 'Weekend',
    [SUPPORT_SCHEDULE.SHIFTS.HOLIDAY]: 'Holiday',
  };
  return labels[shift] || 'Unknown';
}

export function supportScheduleGetDayLabel(day: SupportScheduleDay): string {
  const labels: Record<SupportScheduleDay, string> = {
    [SUPPORT_SCHEDULE.DAYS.MONDAY]: 'Monday',
    [SUPPORT_SCHEDULE.DAYS.TUESDAY]: 'Tuesday',
    [SUPPORT_SCHEDULE.DAYS.WEDNESDAY]: 'Wednesday',
    [SUPPORT_SCHEDULE.DAYS.THURSDAY]: 'Thursday',
    [SUPPORT_SCHEDULE.DAYS.FRIDAY]: 'Friday',
    [SUPPORT_SCHEDULE.DAYS.SATURDAY]: 'Saturday',
    [SUPPORT_SCHEDULE.DAYS.SUNDAY]: 'Sunday',
  };
  return labels[day] || 'Unknown';
}

export function supportScheduleIsActive(status: SupportScheduleStatus): boolean {
  return status === SUPPORT_SCHEDULE.STATUS.ACTIVE;
}

export function supportScheduleIsWeekend(day: SupportScheduleDay): boolean {
  const weekendDays: SupportScheduleDay[] = [
    SUPPORT_SCHEDULE.DAYS.SATURDAY,
    SUPPORT_SCHEDULE.DAYS.SUNDAY,
  ];
  return weekendDays.includes(day);
}

export function supportScheduleIsWeekday(day: SupportScheduleDay): boolean {
  return !supportScheduleIsWeekend(day);
}

export function supportScheduleGetPreferenceLabel(preference: SupportSchedulePreference): string {
  const labels: Record<SupportSchedulePreference, string> = {
    [SUPPORT_SCHEDULE.PREFERENCES.EARLY]: 'Early Bird (6AM - 2PM)',
    [SUPPORT_SCHEDULE.PREFERENCES.LATE]: 'Night Owl (2PM - 10PM)',
    [SUPPORT_SCHEDULE.PREFERENCES.NIGHT]: 'Night Shift (10PM - 6AM)',
    [SUPPORT_SCHEDULE.PREFERENCES.FLEXIBLE]: 'Flexible',
  };
  return labels[preference] || 'Unknown';
}
