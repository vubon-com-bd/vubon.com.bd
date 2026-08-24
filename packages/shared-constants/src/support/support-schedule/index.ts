/**
 * Support Schedule Constants Index
 * Export all support schedule constants and types for easy importing
 */

// Support Schedule Constants
export {
  SUPPORT_SCHEDULE,
  supportScheduleGetTypeLabel,
  supportScheduleGetStatusLabel,
  supportScheduleGetShiftLabel,
  supportScheduleGetDayLabel,
  supportScheduleIsActive,
  supportScheduleIsWeekend,
  supportScheduleIsWeekday,
  supportScheduleGetPreferenceLabel,
} from './support-schedule.constants';

export type {
  SupportScheduleType,
  SupportScheduleStatus,
  SupportScheduleShift,
  SupportScheduleDay,
  SupportSchedulePreference,
} from './support-schedule.constants';

// Support Schedule Type Constants
export {
  SUPPORT_SCHEDULE_TYPE,
  supportScheduleTypeGetCategoryLabel,
  supportScheduleTypeGetFrequencyLabel,
  supportScheduleTypeGetDurationLabel,
  supportScheduleTypeGetPriorityLabel,
  supportScheduleTypeGetPatternLabel,
  supportScheduleTypeGetCoverageLabel,
} from './support-schedule-type.constants';

export type {
  SupportScheduleCategory,
  SupportScheduleFrequency,
  SupportScheduleDuration,
  SupportSchedulePattern,
  SupportScheduleCoverage,
  SupportSchedulePriority,
} from './support-schedule-type.constants';
