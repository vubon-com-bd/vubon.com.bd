/**
 * Flash Sale Schedule Types
 * Type definitions for flash sale schedules based on shared-constants
 * @module FlashSaleScheduleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales schedule
// ============================================================
import {
  // Schedule Core
  FLASH_SALE_SCHEDULE,
  FlashSaleScheduleType,
  FlashSaleScheduleFrequency,
  FlashSaleScheduleDay,
  FlashSaleScheduleWeek,
  FlashSaleScheduleMonth,
  FlashSaleScheduleTimezone,
  FlashSaleScheduleTimeFormat,
  FlashSaleScheduleCronExpression,
  flashsalesScheduleGetTypeLabel,
  flashsalesScheduleGetFrequencyLabel,
  flashsalesScheduleGetDayLabel,
  flashsalesScheduleGetWeekLabel,
  flashsalesScheduleGetMonthLabel,
  flashsalesScheduleGetTimezoneLabel,
  flashsalesScheduleGetCronExpression,
  flashsalesScheduleIsValidType,
  flashsalesScheduleIsValidFrequency,
  flashsalesScheduleGetDefaultTimezone,
  flashsalesScheduleGetMaxSchedulesPerDay,
  flashsalesScheduleGetMinDuration,
  flashsalesScheduleGetMaxDuration,
  flashsalesScheduleIsRecurring,
  // Schedule Status
  FLASH_SALE_SCHEDULE_STATUS,
  FlashSaleScheduleStatusType,
  FlashSaleScheduleStatusCategory,
  FlashSaleScheduleStatusColor,
  FlashSaleScheduleStatusPriority,
  flashsalesScheduleStatusGetLabel,
  flashsalesScheduleStatusGetCategory,
  flashsalesScheduleStatusGetColor,
  flashsalesScheduleStatusGetPriority,
  flashsalesScheduleStatusIsActive,
  flashsalesScheduleStatusIsApproved,
  flashsalesScheduleStatusIsComplete,
  flashsalesScheduleStatusCanTransitionTo,
  flashsalesScheduleStatusGetAvailableTransitions,
  flashsalesScheduleStatusCanApprove,
  flashsalesScheduleStatusCanReject,
  flashsalesScheduleStatusCanSchedule,
  flashsalesScheduleStatusCanExecute,
  flashsalesScheduleStatusCanPause,
  flashsalesScheduleStatusCanResume,
  flashsalesScheduleStatusCanCancel,
  flashsalesScheduleStatusIsValid,
  // Schedule Type
  FLASH_SALE_SCHEDULE_TYPE,
  FlashSaleScheduleTypeCategory,
  FlashSaleScheduleTypeComplexity,
  FlashSaleScheduleTypeScope,
  FlashSaleScheduleTypePriority,
  FlashSaleScheduleTypePattern,
  FlashSaleScheduleTypeInterval,
  FlashSaleScheduleTypeExecution,
  flashsalesScheduleTypeGetCategoryLabel,
  flashsalesScheduleTypeGetComplexityLabel,
  flashsalesScheduleTypeGetScopeLabel,
  flashsalesScheduleTypeGetPriorityLabel,
  flashsalesScheduleTypeGetPatternLabel,
  flashsalesScheduleTypeGetIntervalLabel,
  flashsalesScheduleTypeGetExecutionLabel,
  flashsalesScheduleTypeIsValidCategory,
  flashsalesScheduleTypeIsValidPriority,
  flashsalesScheduleTypeIsValidInterval,
  flashsalesScheduleTypeGetIntervalMinutes,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Schedule Extended Types
// ============================================================

/**
 * Flash Sale Schedule
 */
export interface FlashSaleSchedule extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  type: FlashSaleScheduleType;
  status: FlashSaleScheduleStatusType;
  frequency: FlashSaleScheduleFrequency;
  day: FlashSaleScheduleDay;
  week: FlashSaleScheduleWeek;
  month: FlashSaleScheduleMonth;
  timezone: FlashSaleScheduleTimezone;
  timeFormat: FlashSaleScheduleTimeFormat;
  cronExpression: FlashSaleScheduleCronExpression;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  isApproved: boolean;
  isComplete: boolean;
  isRecurring: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Schedule Filter
 */
export interface FlashSaleScheduleFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  types?: FlashSaleScheduleType[];
  statuses?: FlashSaleScheduleStatusType[];
  frequencies?: FlashSaleScheduleFrequency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isApproved?: boolean;
  isComplete?: boolean;
  isRecurring?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Schedule Statistics
 */
export interface FlashSaleScheduleStatistics {
  flashSaleId: ID;
  totalSchedules: number;
  activeSchedules: number;
  approvedSchedules: number;
  completeSchedules: number;
  recurringSchedules: number;
  byType: Record<FlashSaleScheduleType, number>;
  byStatus: Record<FlashSaleScheduleStatusType, number>;
  byFrequency: Record<FlashSaleScheduleFrequency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: FlashSaleScheduleType;
  mostFrequentStatus: FlashSaleScheduleStatusType;
  mostFrequentFrequency: FlashSaleScheduleFrequency;
}

/**
 * Flash Sale Schedule Summary
 */
export interface FlashSaleScheduleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchedules: number;
  active: number;
  approved: number;
  complete: number;
  recurring: number;
  byType: Record<FlashSaleScheduleType, number>;
  byStatus: Record<FlashSaleScheduleStatusType, number>;
  byFrequency: Record<FlashSaleScheduleFrequency, number>;
  scheduleTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: FlashSaleScheduleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleScheduleStatusType;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: FlashSaleScheduleFrequency;
    count: number;
    label: string;
  }[];
}

/**
 * Flash Sale Schedule Configuration
 */
export interface FlashSaleScheduleConfiguration {
  enabled: boolean;
  defaultType: FlashSaleScheduleType;
  defaultStatus: FlashSaleScheduleStatusType;
  defaultFrequency: FlashSaleScheduleFrequency;
  defaultTimezone: FlashSaleScheduleTimezone;
  maxSchedulesPerDay: number;
  minDuration: number;
  maxDuration: number;
  requireApproval: boolean;
  allowRecurring: boolean;
  allowPause: boolean;
  allowCancel: boolean;
  autoExecute: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnSchedule: boolean;
  notificationOnExecute: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnCancel: boolean;
  alertConfig?: FlashSaleScheduleAlertConfig;
}

/**
 * Flash Sale Schedule Alert Configuration
 */
export interface FlashSaleScheduleAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  scheduleConflictAlert: boolean;
  executionFailureAlert: boolean;
  approvalDelayAlert: boolean;
  approvalDelayThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Schedule History
 */
export interface FlashSaleScheduleHistory extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  flashSaleId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'schedule'
    | 'execute'
    | 'pause'
    | 'resume'
    | 'cancel'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Schedule Validation
 */
export interface FlashSaleScheduleValidation {
  isValid: boolean;
  scheduleId: ID;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Schedule Export
 */
export interface FlashSaleScheduleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleScheduleFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Schedule Execution
 */
export interface FlashSaleScheduleExecution extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  flashSaleId: ID;
  scheduledAt: Date;
  executedAt?: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'skipped';
  result?: string;
  error?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Schedule Core
  FLASH_SALE_SCHEDULE,
  FlashSaleScheduleType,
  FlashSaleScheduleFrequency,
  FlashSaleScheduleDay,
  FlashSaleScheduleWeek,
  FlashSaleScheduleMonth,
  FlashSaleScheduleTimezone,
  FlashSaleScheduleTimeFormat,
  FlashSaleScheduleCronExpression,
  flashsalesScheduleGetTypeLabel,
  flashsalesScheduleGetFrequencyLabel,
  flashsalesScheduleGetDayLabel,
  flashsalesScheduleGetWeekLabel,
  flashsalesScheduleGetMonthLabel,
  flashsalesScheduleGetTimezoneLabel,
  flashsalesScheduleGetCronExpression,
  flashsalesScheduleIsValidType,
  flashsalesScheduleIsValidFrequency,
  flashsalesScheduleGetDefaultTimezone,
  flashsalesScheduleGetMaxSchedulesPerDay,
  flashsalesScheduleGetMinDuration,
  flashsalesScheduleGetMaxDuration,
  flashsalesScheduleIsRecurring,
  // Schedule Status
  FLASH_SALE_SCHEDULE_STATUS,
  FlashSaleScheduleStatusType,
  FlashSaleScheduleStatusCategory,
  FlashSaleScheduleStatusColor,
  FlashSaleScheduleStatusPriority,
  flashsalesScheduleStatusGetLabel,
  flashsalesScheduleStatusGetCategory,
  flashsalesScheduleStatusGetColor,
  flashsalesScheduleStatusGetPriority,
  flashsalesScheduleStatusIsActive,
  flashsalesScheduleStatusIsApproved,
  flashsalesScheduleStatusIsComplete,
  flashsalesScheduleStatusCanTransitionTo,
  flashsalesScheduleStatusGetAvailableTransitions,
  flashsalesScheduleStatusCanApprove,
  flashsalesScheduleStatusCanReject,
  flashsalesScheduleStatusCanSchedule,
  flashsalesScheduleStatusCanExecute,
  flashsalesScheduleStatusCanPause,
  flashsalesScheduleStatusCanResume,
  flashsalesScheduleStatusCanCancel,
  flashsalesScheduleStatusIsValid,
  // Schedule Type
  FLASH_SALE_SCHEDULE_TYPE,
  FlashSaleScheduleTypeCategory,
  FlashSaleScheduleTypeComplexity,
  FlashSaleScheduleTypeScope,
  FlashSaleScheduleTypePriority,
  FlashSaleScheduleTypePattern,
  FlashSaleScheduleTypeInterval,
  FlashSaleScheduleTypeExecution,
  flashsalesScheduleTypeGetCategoryLabel,
  flashsalesScheduleTypeGetComplexityLabel,
  flashsalesScheduleTypeGetScopeLabel,
  flashsalesScheduleTypeGetPriorityLabel,
  flashsalesScheduleTypeGetPatternLabel,
  flashsalesScheduleTypeGetIntervalLabel,
  flashsalesScheduleTypeGetExecutionLabel,
  flashsalesScheduleTypeIsValidCategory,
  flashsalesScheduleTypeIsValidPriority,
  flashsalesScheduleTypeIsValidInterval,
  flashsalesScheduleTypeGetIntervalMinutes,
};
