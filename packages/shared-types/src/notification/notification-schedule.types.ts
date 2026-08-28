/**
 * Notification Schedule Types
 * Type definitions for notification schedules based on shared-constants
 * @module NotificationScheduleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants notification schedule
// ============================================================
import {
  // Notification Schedule
  NOTIFICATIONSCHEDULE,
  NotificationScheduleType,
  NotificationScheduleFrequency,
  NotificationScheduleDay,
  NotificationScheduleTimezone,
  NotificationSchedulePriority,
  NotificationScheduleDefault,
  NotificationScheduleLimit,
  notificationscheduleGetTypeLabel,
  notificationscheduleGetFrequencyLabel,
  notificationscheduleGetDayLabel,
  notificationscheduleGetTimezoneLabel,
  notificationscheduleGetPriorityLabel,
  notificationscheduleGetDefaultTimezone,
  notificationscheduleIsRecurring,
  notificationscheduleIsOneTime,
  notificationscheduleIsWeekday,
  notificationscheduleIsWeekend,
  // Notification Schedule Type
  NOTIFICATIONSCHEDULE_TYPE,
  NotificationScheduleCategoryType,
  NotificationSchedulePattern,
  NotificationScheduleInterval,
  NotificationScheduleRecurrenceRule,
  NotificationSchedulePriorityLevel,
  NotificationScheduleComplexity,
  notificationscheduleGetCategoryLabel,
  notificationscheduleGetPatternLabel,
  notificationscheduleGetIntervalLabel,
  notificationscheduleGetRecurrenceRuleLabel,
  notificationscheduleGetPriorityLevelLabel,
  notificationscheduleGetComplexityLabel,
  notificationscheduleIsMarketingCategory,
  notificationscheduleIsTransactionalCategory,
  notificationscheduleIsSystemCategory,
  notificationscheduleIsRecurringRule,
  // Notification Schedule Status
  NOTIFICATIONSCHEDULE_STATUS,
  NotificationScheduleStatusType,
  NotificationScheduleStatusColor,
  NotificationScheduleStatusCategory,
  NotificationScheduleStatusOrder,
  NotificationScheduleStatusTransition,
  notificationscheduleGetStatusLabel,
  notificationscheduleGetStatusColor,
  notificationscheduleGetStatusCategory,
  notificationscheduleIsActive,
  notificationscheduleIsPaused,
  notificationscheduleIsCompleted,
  notificationscheduleIsEditable,
  notificationscheduleCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Notification Schedule Extended Types
// ============================================================

/**
 * Notification Schedule
 */
export interface NotificationSchedule extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: NotificationScheduleType;
  frequency: NotificationScheduleFrequency;
  day: NotificationScheduleDay;
  timezone: NotificationScheduleTimezone;
  priority: NotificationSchedulePriority;
  status: NotificationScheduleStatusType;
  startDate: Date;
  endDate?: Date;
  time: string;
  interval?: number;
  recurrenceRule?: string;
  isRecurring: boolean;
  isOneTime: boolean;
  isWeekday: boolean;
  isWeekend: boolean;
  isActive: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  isEditable: boolean;
  metadata?: Metadata;
}

/**
 * Notification Schedule Filter
 */
export interface NotificationScheduleFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: NotificationScheduleType[];
  frequencies?: NotificationScheduleFrequency[];
  days?: NotificationScheduleDay[];
  timezones?: NotificationScheduleTimezone[];
  priorities?: NotificationSchedulePriority[];
  statuses?: NotificationScheduleStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isRecurring?: boolean;
  isOneTime?: boolean;
  isWeekday?: boolean;
  isWeekend?: boolean;
  isActive?: boolean;
  isPaused?: boolean;
  isCompleted?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
}

/**
 * Notification Schedule Statistics
 */
export interface NotificationScheduleStatistics {
  userId: ID;
  totalSchedules: number;
  activeSchedules: number;
  pausedSchedules: number;
  completedSchedules: number;
  editableSchedules: number;
  byType: Record<NotificationScheduleType, number>;
  byFrequency: Record<NotificationScheduleFrequency, number>;
  byDay: Record<NotificationScheduleDay, number>;
  byTimezone: Record<NotificationScheduleTimezone, number>;
  byPriority: Record<NotificationSchedulePriority, number>;
  byStatus: Record<NotificationScheduleStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  recurringSchedules: number;
  oneTimeSchedules: number;
  weekdaySchedules: number;
  weekendSchedules: number;
  mostFrequentType: NotificationScheduleType;
  mostFrequentFrequency: NotificationScheduleFrequency;
  mostFrequentDay: NotificationScheduleDay;
  mostFrequentTimezone: NotificationScheduleTimezone;
  mostFrequentPriority: NotificationSchedulePriority;
  mostFrequentStatus: NotificationScheduleStatusType;
}

/**
 * Notification Schedule Summary
 */
export interface NotificationScheduleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchedules: number;
  active: number;
  paused: number;
  completed: number;
  editable: number;
  byType: Record<NotificationScheduleType, number>;
  byFrequency: Record<NotificationScheduleFrequency, number>;
  byDay: Record<NotificationScheduleDay, number>;
  byTimezone: Record<NotificationScheduleTimezone, number>;
  byPriority: Record<NotificationSchedulePriority, number>;
  byStatus: Record<NotificationScheduleStatusType, number>;
  scheduleTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: NotificationScheduleType;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: NotificationScheduleFrequency;
    count: number;
    label: string;
  }[];
  topDays: {
    day: NotificationScheduleDay;
    count: number;
    label: string;
  }[];
  topTimezones: {
    timezone: NotificationScheduleTimezone;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: NotificationSchedulePriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: NotificationScheduleStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Notification Schedule Configuration
 */
export interface NotificationScheduleConfiguration {
  enabled: boolean;
  defaultType: NotificationScheduleType;
  defaultFrequency: NotificationScheduleFrequency;
  defaultDay: NotificationScheduleDay;
  defaultTimezone: NotificationScheduleTimezone;
  defaultPriority: NotificationSchedulePriority;
  maxSchedulesPerUser: number;
  allowRecurring: boolean;
  allowOneTime: boolean;
  allowWeekday: boolean;
  allowWeekend: boolean;
  allowCustomTime: boolean;
  allowCustomInterval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStatusChange: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: NotificationScheduleAlertConfig;
}

/**
 * Notification Schedule Alert Configuration
 */
export interface NotificationScheduleAlertConfig {
  enabled: boolean;
  scheduleConflictAlert: boolean;
  overdueScheduleAlert: boolean;
  highPriorityAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Notification Schedule History
 */
export interface NotificationScheduleHistory extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'pause' | 'resume' | 'complete' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Notification Schedule Validation
 */
export interface NotificationScheduleValidation {
  isValid: boolean;
  scheduleId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Notification Schedule Export
 */
export interface NotificationScheduleExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'ical';
  filter: NotificationScheduleFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Notification Schedule
  NOTIFICATIONSCHEDULE,
  NotificationScheduleType,
  NotificationScheduleFrequency,
  NotificationScheduleDay,
  NotificationScheduleTimezone,
  NotificationSchedulePriority,
  NotificationScheduleDefault,
  NotificationScheduleLimit,
  notificationscheduleGetTypeLabel,
  notificationscheduleGetFrequencyLabel,
  notificationscheduleGetDayLabel,
  notificationscheduleGetTimezoneLabel,
  notificationscheduleGetPriorityLabel,
  notificationscheduleGetDefaultTimezone,
  notificationscheduleIsRecurring,
  notificationscheduleIsOneTime,
  notificationscheduleIsWeekday,
  notificationscheduleIsWeekend,
  // Notification Schedule Type
  NOTIFICATIONSCHEDULE_TYPE,
  NotificationScheduleCategoryType,
  NotificationSchedulePattern,
  NotificationScheduleInterval,
  NotificationScheduleRecurrenceRule,
  NotificationSchedulePriorityLevel,
  NotificationScheduleComplexity,
  notificationscheduleGetCategoryLabel,
  notificationscheduleGetPatternLabel,
  notificationscheduleGetIntervalLabel,
  notificationscheduleGetRecurrenceRuleLabel,
  notificationscheduleGetPriorityLevelLabel,
  notificationscheduleGetComplexityLabel,
  notificationscheduleIsMarketingCategory,
  notificationscheduleIsTransactionalCategory,
  notificationscheduleIsSystemCategory,
  notificationscheduleIsRecurringRule,
  // Notification Schedule Status
  NOTIFICATIONSCHEDULE_STATUS,
  NotificationScheduleStatusType,
  NotificationScheduleStatusColor,
  NotificationScheduleStatusCategory,
  NotificationScheduleStatusOrder,
  NotificationScheduleStatusTransition,
  notificationscheduleGetStatusLabel,
  notificationscheduleGetStatusColor,
  notificationscheduleGetStatusCategory,
  notificationscheduleIsActive,
  notificationscheduleIsPaused,
  notificationscheduleIsCompleted,
  notificationscheduleIsEditable,
  notificationscheduleCanTransition,
};
