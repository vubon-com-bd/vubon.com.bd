/**
 * Report Schedule Types
 * Type definitions for report schedules based on shared-constants
 * @module ReportScheduleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-schedule
// ============================================================
import {
  // Schedule Core
  REPORT_SCHEDULE,
  ReportScheduleFrequency,
  ReportScheduleDay,
  ReportScheduleWeek,
  ReportScheduleMonth,
  ReportScheduleTimeFormat,
  ReportScheduleCronExpression,
  ReportScheduleTimezone,
  ReportScheduleExecutionStatus,
  ReportScheduleTriggerType,
  reportScheduleGetFrequencyLabel,
  reportScheduleGetDayLabel,
  reportScheduleGetWeekLabel,
  reportScheduleGetMonthLabel,
  reportScheduleGetCronExpression,
  reportScheduleGetExecutionStatusLabel,
  reportScheduleGetTriggerTypeLabel,
  reportScheduleIsValidFrequency,
  reportScheduleIsRecurring,
  reportScheduleGetTimeoutMinutes,
  reportScheduleGetRetryAttempts,
  reportScheduleGetNextRunTime,
  // Schedule Status
  REPORT_SCHEDULE_STATUS,
  ReportScheduleStatusType,
  ReportScheduleStatusCategory,
  ReportScheduleStatusColor,
  ReportScheduleStatusPriority,
  ReportScheduleStatusTransition,
  reportScheduleStatusGetLabel,
  reportScheduleStatusGetCategory,
  reportScheduleStatusGetColor,
  reportScheduleStatusGetPriority,
  reportScheduleStatusIsActive,
  reportScheduleStatusIsApproved,
  reportScheduleStatusIsTerminated,
  reportScheduleStatusCanTransitionTo,
  reportScheduleStatusGetAvailableTransitions,
  reportScheduleStatusGetSequence,
  reportScheduleStatusIsInSequence,
  reportScheduleStatusGetNextInSequence,
  reportScheduleStatusGetPreviousInSequence,
  reportScheduleStatusGetPriorityOrder,
  reportScheduleStatusIsValid,
} from '@vubon/shared-constants';

// ============================================================
// Report Schedule Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Report Schedule Filter
 */
export interface ReportScheduleFilter {
  ids?: ID[];
  reportIds?: ID[];
  frequencies?: ReportScheduleFrequency[];
  days?: ReportScheduleDay[];
  weeks?: ReportScheduleWeek[];
  months?: ReportScheduleMonth[];
  timeFormats?: ReportScheduleTimeFormat[];
  timezones?: ReportScheduleTimezone[];
  executionStatuses?: ReportScheduleExecutionStatus[];
  triggerTypes?: ReportScheduleTriggerType[];
  statuses?: ReportScheduleStatusType[];
  priorities?: ReportScheduleStatusPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isApproved?: boolean;
  isTerminated?: boolean;
  isRecurring?: boolean;
  searchTerm?: string;
}

/**
 * Report Schedule Statistics
 */
export interface ReportScheduleStatistics {
  reportId: ID;
  totalSchedules: number;
  activeSchedules: number;
  approvedSchedules: number;
  terminatedSchedules: number;
  recurringSchedules: number;
  byFrequency: Record<ReportScheduleFrequency, number>;
  byDay: Record<ReportScheduleDay, number>;
  byWeek: Record<ReportScheduleWeek, number>;
  byMonth: Record<ReportScheduleMonth, number>;
  byTimezone: Record<ReportScheduleTimezone, number>;
  byExecutionStatus: Record<ReportScheduleExecutionStatus, number>;
  byTriggerType: Record<ReportScheduleTriggerType, number>;
  byStatus: Record<ReportScheduleStatusType, number>;
  byPriority: Record<ReportScheduleStatusPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRetryAttempts: number;
  maxRetryAttempts: number;
  minRetryAttempts: number;
  averageTimeoutMinutes: number;
  maxTimeoutMinutes: number;
  minTimeoutMinutes: number;
  mostFrequentFrequency: ReportScheduleFrequency;
  mostFrequentStatus: ReportScheduleStatusType;
  mostFrequentPriority: ReportScheduleStatusPriority;
}

/**
 * Report Schedule Summary
 */
export interface ReportScheduleSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSchedules: number;
  active: number;
  approved: number;
  terminated: number;
  recurring: number;
  byFrequency: Record<ReportScheduleFrequency, number>;
  byDay: Record<ReportScheduleDay, number>;
  byWeek: Record<ReportScheduleWeek, number>;
  byMonth: Record<ReportScheduleMonth, number>;
  byTimezone: Record<ReportScheduleTimezone, number>;
  byExecutionStatus: Record<ReportScheduleExecutionStatus, number>;
  byTriggerType: Record<ReportScheduleTriggerType, number>;
  byStatus: Record<ReportScheduleStatusType, number>;
  byPriority: Record<ReportScheduleStatusPriority, number>;
  scheduleTrend: {
    date: Date;
    total: number;
    active: number;
    approved: number;
  }[];
  topFrequencies: {
    frequency: ReportScheduleFrequency;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ReportScheduleStatusType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ReportScheduleStatusPriority;
    count: number;
    label: string;
  }[];
}

/**
 * Report Schedule Configuration
 */
export interface ReportScheduleConfiguration {
  enabled: boolean;
  defaultFrequency: ReportScheduleFrequency;
  defaultDay: ReportScheduleDay;
  defaultWeek: ReportScheduleWeek;
  defaultMonth: ReportScheduleMonth;
  defaultTimezone: ReportScheduleTimezone;
  defaultTriggerType: ReportScheduleTriggerType;
  defaultPriority: ReportScheduleStatusPriority;
  timeoutMinutes: number;
  retryAttempts: number;
  requireApproval: boolean;
  allowRecurring: boolean;
  allowTermination: boolean;
  autoActivate: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  notificationOnTerminate: boolean;
  notificationOnRun: boolean;
  notificationOnFailure: boolean;
  alertConfig?: ReportScheduleAlertConfig;
}

/**
 * Report Schedule Alert Configuration
 */
export interface ReportScheduleAlertConfig {
  enabled: boolean;
  missedScheduleAlert: boolean;
  missedScheduleThreshold: number;
  failureAlert: boolean;
  failureThreshold: number;
  timeoutAlert: boolean;
  timeoutThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Report Schedule History
 */
export interface ReportScheduleHistory extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  reportId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'approve'
    | 'reject'
    | 'terminate'
    | 'run'
    | 'fail'
    | 'retry'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Report Schedule Validation
 */
export interface ReportScheduleValidation {
  isValid: boolean;
  scheduleId: ID;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Report Schedule Execution
 */
export interface ReportScheduleExecution extends BaseEntity, Timestamp {
  id: ID;
  scheduleId: ID;
  reportId: ID;
  startedAt: Date;
  completedAt?: Date;
  status: ReportScheduleExecutionStatus;
  triggerType: ReportScheduleTriggerType;
  attempts: number;
  errorMessage?: string;
  metadata?: Metadata;
}

/**
 * Report Schedule Export
 */
export interface ReportScheduleExport extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReportScheduleFilter;
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
  // Schedule Core
  REPORT_SCHEDULE,
  ReportScheduleFrequency,
  ReportScheduleDay,
  ReportScheduleWeek,
  ReportScheduleMonth,
  ReportScheduleTimeFormat,
  ReportScheduleCronExpression,
  ReportScheduleTimezone,
  ReportScheduleExecutionStatus,
  ReportScheduleTriggerType,
  reportScheduleGetFrequencyLabel,
  reportScheduleGetDayLabel,
  reportScheduleGetWeekLabel,
  reportScheduleGetMonthLabel,
  reportScheduleGetCronExpression,
  reportScheduleGetExecutionStatusLabel,
  reportScheduleGetTriggerTypeLabel,
  reportScheduleIsValidFrequency,
  reportScheduleIsRecurring,
  reportScheduleGetTimeoutMinutes,
  reportScheduleGetRetryAttempts,
  reportScheduleGetNextRunTime,
  // Schedule Status
  REPORT_SCHEDULE_STATUS,
  ReportScheduleStatusType,
  ReportScheduleStatusCategory,
  ReportScheduleStatusColor,
  ReportScheduleStatusPriority,
  ReportScheduleStatusTransition,
  reportScheduleStatusGetLabel,
  reportScheduleStatusGetCategory,
  reportScheduleStatusGetColor,
  reportScheduleStatusGetPriority,
  reportScheduleStatusIsActive,
  reportScheduleStatusIsApproved,
  reportScheduleStatusIsTerminated,
  reportScheduleStatusCanTransitionTo,
  reportScheduleStatusGetAvailableTransitions,
  reportScheduleStatusGetSequence,
  reportScheduleStatusIsInSequence,
  reportScheduleStatusGetNextInSequence,
  reportScheduleStatusGetPreviousInSequence,
  reportScheduleStatusGetPriorityOrder,
  reportScheduleStatusIsValid,
};
