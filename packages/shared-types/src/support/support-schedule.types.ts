/**
 * Support Schedule Types
 * Type definitions for support schedules based on shared-constants
 * @module SupportScheduleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-schedule
// ============================================================
import {
  // Support Schedule Core
  SUPPORT_SCHEDULE,
  SupportScheduleType,
  SupportScheduleStatus,
  SupportScheduleShift,
  SupportScheduleDay,
  SupportSchedulePreference,
  supportScheduleGetTypeLabel,
  supportScheduleGetStatusLabel,
  supportScheduleGetShiftLabel,
  supportScheduleGetDayLabel,
  supportScheduleIsActive,
  supportScheduleIsWeekend,
  supportScheduleIsWeekday,
  supportScheduleGetPreferenceLabel,
  // Support Schedule Type
  SUPPORT_SCHEDULE_TYPE,
  SupportScheduleCategory,
  SupportScheduleFrequency,
  SupportScheduleDuration,
  SupportSchedulePattern,
  SupportScheduleCoverage,
  SupportSchedulePriority,
  supportScheduleTypeGetCategoryLabel,
  supportScheduleTypeGetFrequencyLabel,
  supportScheduleTypeGetDurationLabel,
  supportScheduleTypeGetPriorityLabel,
  supportScheduleTypeGetPatternLabel,
  supportScheduleTypeGetCoverageLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support Schedule Extended Types
// ============================================================

/**
 * Support schedule
 */
export interface SupportSchedule extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: SupportScheduleType;
  status: SupportScheduleStatus;
  shift: SupportScheduleShift;
  day: SupportScheduleDay;
  preference: SupportSchedulePreference;
  category: SupportScheduleCategory;
  frequency: SupportScheduleFrequency;
  duration: SupportScheduleDuration;
  pattern: SupportSchedulePattern;
  coverage: SupportScheduleCoverage;
  priority: SupportSchedulePriority;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  isWeekend: boolean;
  isWeekday: boolean;
  timezone: string;
  metadata?: Metadata;
}

/**
 * Support schedule filter
 */
export interface SupportScheduleFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: SupportScheduleType[];
  statuses?: SupportScheduleStatus[];
  shifts?: SupportScheduleShift[];
  days?: SupportScheduleDay[];
  preferences?: SupportSchedulePreference[];
  categories?: SupportScheduleCategory[];
  frequencies?: SupportScheduleFrequency[];
  durations?: SupportScheduleDuration[];
  patterns?: SupportSchedulePattern[];
  coverages?: SupportScheduleCoverage[];
  priorities?: SupportSchedulePriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isWeekend?: boolean;
  isWeekday?: boolean;
  searchTerm?: string;
}

/**
 * Support schedule statistics
 */
export interface SupportScheduleStatistics {
  userId: ID;
  totalSchedules: number;
  activeSchedules: number;
  weekendSchedules: number;
  weekdaySchedules: number;
  byType: Record<SupportScheduleType, number>;
  byStatus: Record<SupportScheduleStatus, number>;
  byShift: Record<SupportScheduleShift, number>;
  byDay: Record<SupportScheduleDay, number>;
  byPreference: Record<SupportSchedulePreference, number>;
  byCategory: Record<SupportScheduleCategory, number>;
  byFrequency: Record<SupportScheduleFrequency, number>;
  byDuration: Record<SupportScheduleDuration, number>;
  byPattern: Record<SupportSchedulePattern, number>;
  byCoverage: Record<SupportScheduleCoverage, number>;
  byPriority: Record<SupportSchedulePriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SupportScheduleType;
  mostFrequentStatus: SupportScheduleStatus;
  mostFrequentShift: SupportScheduleShift;
  mostFrequentDay: SupportScheduleDay;
  mostFrequentCategory: SupportScheduleCategory;
  mostFrequentFrequency: SupportScheduleFrequency;
}

/**
 * Support schedule summary
 */
export interface SupportScheduleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchedules: number;
  active: number;
  weekend: number;
  weekday: number;
  byType: Record<SupportScheduleType, number>;
  byStatus: Record<SupportScheduleStatus, number>;
  byShift: Record<SupportScheduleShift, number>;
  byDay: Record<SupportScheduleDay, number>;
  byPreference: Record<SupportSchedulePreference, number>;
  byCategory: Record<SupportScheduleCategory, number>;
  byFrequency: Record<SupportScheduleFrequency, number>;
  byDuration: Record<SupportScheduleDuration, number>;
  byPattern: Record<SupportSchedulePattern, number>;
  byCoverage: Record<SupportScheduleCoverage, number>;
  byPriority: Record<SupportSchedulePriority, number>;
  scheduleTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: SupportScheduleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportScheduleStatus;
    count: number;
    label: string;
  }[];
  topShifts: {
    shift: SupportScheduleShift;
    count: number;
    label: string;
  }[];
  topDays: {
    day: SupportScheduleDay;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportScheduleCategory;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: SupportScheduleFrequency;
    count: number;
    label: string;
  }[];
}

/**
 * Support schedule configuration
 */
export interface SupportScheduleConfiguration {
  enabled: boolean;
  defaultType: SupportScheduleType;
  defaultStatus: SupportScheduleStatus;
  defaultShift: SupportScheduleShift;
  defaultDay: SupportScheduleDay;
  defaultPreference: SupportSchedulePreference;
  defaultCategory: SupportScheduleCategory;
  defaultFrequency: SupportScheduleFrequency;
  defaultDuration: SupportScheduleDuration;
  defaultPattern: SupportSchedulePattern;
  defaultCoverage: SupportScheduleCoverage;
  defaultPriority: SupportSchedulePriority;
  defaultTimezone: string;
  allowWeekend: boolean;
  allowWeekday: boolean;
  maxSchedulesPerUser: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  alertConfig?: SupportScheduleAlertConfig;
}

/**
 * Support schedule alert configuration
 */
export interface SupportScheduleAlertConfig {
  enabled: boolean;
  scheduleConflictAlert: boolean;
  overlappingScheduleAlert: boolean;
  inactiveScheduleAlert: boolean;
  inactiveThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support schedule history
 */
export interface SupportScheduleHistory extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support schedule validation
 */
export interface SupportScheduleValidation {
  isValid: boolean;
  scheduleId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support schedule export
 */
export interface SupportScheduleExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SupportScheduleFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support schedule time slot
 */
export interface SupportScheduleTimeSlot extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  userId: ID;
  startTime: string;
  endTime: string;
  day: SupportScheduleDay;
  isActive: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Schedule Core
  SUPPORT_SCHEDULE,
  SupportScheduleType,
  SupportScheduleStatus,
  SupportScheduleShift,
  SupportScheduleDay,
  SupportSchedulePreference,
  supportScheduleGetTypeLabel,
  supportScheduleGetStatusLabel,
  supportScheduleGetShiftLabel,
  supportScheduleGetDayLabel,
  supportScheduleIsActive,
  supportScheduleIsWeekend,
  supportScheduleIsWeekday,
  supportScheduleGetPreferenceLabel,
  // Support Schedule Type
  SUPPORT_SCHEDULE_TYPE,
  SupportScheduleCategory,
  SupportScheduleFrequency,
  SupportScheduleDuration,
  SupportSchedulePattern,
  SupportScheduleCoverage,
  SupportSchedulePriority,
  supportScheduleTypeGetCategoryLabel,
  supportScheduleTypeGetFrequencyLabel,
  supportScheduleTypeGetDurationLabel,
  supportScheduleTypeGetPriorityLabel,
  supportScheduleTypeGetPatternLabel,
  supportScheduleTypeGetCoverageLabel,
};
