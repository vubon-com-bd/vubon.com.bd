/**
 * @fileoverview Report schedule constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Schedule types
 */
export enum ReportScheduleType {
  /** Daily schedule */
  DAILY = 'DAILY',
  /** Weekly schedule */
  WEEKLY = 'WEEKLY',
  /** Monthly schedule */
  MONTHLY = 'MONTHLY',
  /** Quarterly schedule */
  QUARTERLY = 'QUARTERLY',
  /** Yearly schedule */
  YEARLY = 'YEARLY',
  /** Hourly schedule */
  HOURLY = 'HOURLY',
  /** Minutely schedule */
  MINUTELY = 'MINUTELY',
  /** Custom schedule */
  CUSTOM = 'CUSTOM',
  /** On-demand schedule */
  ON_DEMAND = 'ON_DEMAND',
  /** One-time schedule */
  ONE_TIME = 'ONE_TIME',
  /** Recurring schedule */
  RECURRING = 'RECURRING',
  /** Bi-weekly schedule */
  BI_WEEKLY = 'BI_WEEKLY',
  /** Semi-monthly schedule */
  SEMI_MONTHLY = 'SEMI_MONTHLY',
}

/**
 * Schedule frequency options
 */
export enum ReportScheduleFrequency {
  /** Every day */
  EVERY_DAY = 'EVERY_DAY',
  /** Every weekday (Mon-Fri) */
  EVERY_WEEKDAY = 'EVERY_WEEKDAY',
  /** Every weekend (Sat-Sun) */
  EVERY_WEEKEND = 'EVERY_WEEKEND',
  /** Specific days of week */
  SPECIFIC_DAYS = 'SPECIFIC_DAYS',
  /** Specific dates of month */
  SPECIFIC_DATES = 'SPECIFIC_DATES',
  /** Every N days */
  EVERY_N_DAYS = 'EVERY_N_DAYS',
  /** Every N hours */
  EVERY_N_HOURS = 'EVERY_N_HOURS',
  /** Every N minutes */
  EVERY_N_MINUTES = 'EVERY_N_MINUTES',
}

/**
 * Schedule configuration
 */
export interface ReportScheduleConfig {
  /** Schedule type */
  type: ReportScheduleType;
  /** Frequency */
  frequency: ReportScheduleFrequency;
  /** Timezone */
  timezone: string;
  /** Start time */
  startTime: string;
  /** End time */
  endTime: string;
  /** Interval value (for custom intervals) */
  intervalValue?: number;
  /** Interval unit */
  intervalUnit?: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
  /** Specific days of week (0-6, Sunday=0) */
  specificDays?: number[];
  /** Specific dates of month (1-31) */
  specificDates?: number[];
  /** Specific months (1-12) */
  specificMonths?: number[];
  /** Specific years */
  specificYears?: number[];
  /** Exclude dates */
  excludeDates?: Date[];
  /** Max runs */
  maxRuns?: number;
  /** Next run at */
  nextRunAt?: Date;
  /** Last run at */
  lastRunAt?: Date;
}

export const DEFAULT_REPORT_SCHEDULE_CONFIG: ReportScheduleConfig = {
  type: ReportScheduleType.DAILY,
  frequency: ReportScheduleFrequency.EVERY_DAY,
  timezone: 'UTC',
  startTime: '00:00',
  endTime: '23:59',
  intervalValue: 1,
  intervalUnit: 'days',
};

/**
 * Schedule exclusion settings
 */
export interface ReportScheduleExclusion {
  /** Enable exclusions */
  enableExclusions: boolean;
  /** Excluded days of week */
  excludedDaysOfWeek: number[];
  /** Excluded dates */
  excludedDates: Date[];
  /** Excluded date ranges */
  excludedDateRanges: { start: Date; end: Date }[];
  /** Excluded holidays */
  excludedHolidays: string[];
  /** Excluded time ranges */
  excludedTimeRanges: { start: string; end: string }[];
}

export const DEFAULT_REPORT_SCHEDULE_EXCLUSION: ReportScheduleExclusion = {
  enableExclusions: true,
  excludedDaysOfWeek: [],
  excludedDates: [],
  excludedDateRanges: [],
  excludedHolidays: [],
  excludedTimeRanges: [],
};

/**
 * Schedule overlap settings
 */
export interface ReportScheduleOverlap {
  /** Allow overlap */
  allowOverlap: boolean;
  /** Maximum concurrent runs */
  maxConcurrentRuns: number;
  /** Overlap strategy */
  overlapStrategy: 'QUEUE' | 'SKIP' | 'CANCEL' | 'WAIT';
  /** Wait time in minutes */
  waitTimeMinutes: number;
  /** Queue timeout in minutes */
  queueTimeoutMinutes: number;
}

export const DEFAULT_REPORT_SCHEDULE_OVERLAP: ReportScheduleOverlap = {
  allowOverlap: false,
  maxConcurrentRuns: 1,
  overlapStrategy: 'QUEUE',
  waitTimeMinutes: 5,
  queueTimeoutMinutes: 30,
};

/**
 * Schedule run-out settings
 */
export interface ReportScheduleRunOut {
  /** Action on run-out */
  action: 'NOTIFY' | 'SKIP' | 'CANCEL' | 'RESCHEDULE';
  /** Notification threshold in minutes */
  notificationThresholdMinutes: number;
  /** Reschedule interval in minutes */
  rescheduleIntervalMinutes: number;
  /** Max reschedule attempts */
  maxRescheduleAttempts: number;
  /** Enable auto-reschedule */
  enableAutoReschedule: boolean;
}

export const DEFAULT_REPORT_SCHEDULE_RUNOUT: ReportScheduleRunOut = {
  action: 'NOTIFY',
  notificationThresholdMinutes: 15,
  rescheduleIntervalMinutes: 30,
  maxRescheduleAttempts: 3,
  enableAutoReschedule: true,
};

/**
 * Schedule retry settings
 */
export interface ReportScheduleRetry {
  /** Enable retries */
  enableRetries: boolean;
  /** Max retry attempts */
  maxRetryAttempts: number;
  /** Retry delay in minutes */
  retryDelayMinutes: number;
  /** Retry delay multiplier */
  retryDelayMultiplier: number;
  /** Max retry delay in minutes */
  maxRetryDelayMinutes: number;
  /** Retry on specific errors */
  retryOnErrors: string[];
}

export const DEFAULT_REPORT_SCHEDULE_RETRY: ReportScheduleRetry = {
  enableRetries: true,
  maxRetryAttempts: 3,
  retryDelayMinutes: 5,
  retryDelayMultiplier: 2,
  maxRetryDelayMinutes: 60,
  retryOnErrors: ['TIMEOUT', 'NETWORK_ERROR', 'SYSTEM_ERROR'],
};

/**
 * Schedule dependency settings
 */
export interface ReportScheduleDependency {
  /** Enable dependency checking */
  enableDependencyChecking: boolean;
  /** Dependent schedule IDs */
  dependentScheduleIds: string[];
  /** Dependency timeout in minutes */
  dependencyTimeoutMinutes: number;
  /** Dependency strategy */
  dependencyStrategy: 'ALL' | 'ANY' | 'NONE' | 'CUSTOM';
  /** Fail on dependency failure */
  failOnDependencyFailure: boolean;
}

export const DEFAULT_REPORT_SCHEDULE_DEPENDENCY: ReportScheduleDependency = {
  enableDependencyChecking: false,
  dependentScheduleIds: [],
  dependencyTimeoutMinutes: 60,
  dependencyStrategy: 'ALL',
  failOnDependencyFailure: true,
};

/**
 * Schedule chaining settings
 */
export interface ReportScheduleChaining {
  /** Enable chaining */
  enableChaining: boolean;
  /** Chain schedule IDs */
  chainScheduleIds: string[];
  /** Chain timeout in minutes */
  chainTimeoutMinutes: number;
  /** Chain strategy */
  chainStrategy: 'SEQUENTIAL' | 'PARALLEL' | 'CUSTOM';
  /** Fail chain on failure */
  failChainOnFailure: boolean;
}

export const DEFAULT_REPORT_SCHEDULE_CHAINING: ReportScheduleChaining = {
  enableChaining: false,
  chainScheduleIds: [],
  chainTimeoutMinutes: 60,
  chainStrategy: 'SEQUENTIAL',
  failChainOnFailure: true,
};

/**
 * Schedule parallelization settings
 */
export interface ReportScheduleParallelization {
  /** Enable parallelization */
  enableParallelization: boolean;
  /** Max parallel runs */
  maxParallelRuns: number;
  /** Parallelization strategy */
  strategy: 'SPLIT' | 'SHARD' | 'ROUND_ROBIN' | 'CUSTOM';
  /** Split size */
  splitSize: number;
  /** Timeout per parallel run in minutes */
  timeoutPerRunMinutes: number;
}

export const DEFAULT_REPORT_SCHEDULE_PARALLELIZATION: ReportScheduleParallelization = {
  enableParallelization: false,
  maxParallelRuns: 5,
  strategy: 'SPLIT',
  splitSize: 100,
  timeoutPerRunMinutes: 30,
};

/**
 * Schedule limit settings
 */
export interface ReportScheduleLimits {
  /** Max runs per day */
  maxRunsPerDay: number;
  /** Max runs per week */
  maxRunsPerWeek: number;
  /** Max runs per month */
  maxRunsPerMonth: number;
  /** Max total runs */
  maxTotalRuns: number;
  /** Max runtime in minutes */
  maxRuntimeMinutes: number;
  /** Enable limits */
  enableLimits: boolean;
}

export const DEFAULT_REPORT_SCHEDULE_LIMITS: ReportScheduleLimits = {
  maxRunsPerDay: 10,
  maxRunsPerWeek: 50,
  maxRunsPerMonth: 200,
  maxTotalRuns: 1000,
  maxRuntimeMinutes: 60,
  enableLimits: true,
};

/**
 * Schedule throttling settings
 */
export interface ReportScheduleThrottling {
  /** Enable throttling */
  enableThrottling: boolean;
  /** Throttle rate (runs per interval) */
  rate: number;
  /** Throttle interval in minutes */
  intervalMinutes: number;
  /** Burst size */
  burstSize: number;
  /** Throttling strategy */
  strategy: 'FIXED_WINDOW' | 'SLIDING_WINDOW' | 'TOKEN_BUCKET';
}

export const DEFAULT_REPORT_SCHEDULE_THROTTLING: ReportScheduleThrottling = {
  enableThrottling: false,
  rate: 10,
  intervalMinutes: 60,
  burstSize: 20,
  strategy: 'FIXED_WINDOW',
};

/**
 * Schedule deadline settings
 */
export interface ReportScheduleDeadline {
  /** Enable deadlines */
  enableDeadlines: boolean;
  /** Deadline time in minutes */
  deadlineMinutes: number;
  /** Grace period in minutes */
  gracePeriodMinutes: number;
  /** Action on deadline miss */
  actionOnMiss: 'NOTIFY' | 'ESCALATE' | 'CANCEL' | 'RESCHEDULE';
  /** Escalation contact */
  escalationContact?: string;
}

export const DEFAULT_REPORT_SCHEDULE_DEADLINE: ReportScheduleDeadline = {
  enableDeadlines: true,
  deadlineMinutes: 60,
  gracePeriodMinutes: 15,
  actionOnMiss: 'NOTIFY',
};

/**
 * Schedule time window settings
 */
export interface ReportScheduleTimeWindow {
  /** Enable time windows */
  enableTimeWindows: boolean;
  /** Allowed start time */
  allowedStartTime: string;
  /** Allowed end time */
  allowedEndTime: string;
  /** Allowed days of week */
  allowedDaysOfWeek: number[];
  /** Allowed dates */
  allowedDates: Date[];
  /** Time window strategy */
  strategy: 'ALLOW' | 'DENY' | 'CUSTOM';
}

export const DEFAULT_REPORT_SCHEDULE_TIMEWINDOW: ReportScheduleTimeWindow = {
  enableTimeWindows: false,
  allowedStartTime: '00:00',
  allowedEndTime: '23:59',
  allowedDaysOfWeek: [0, 1, 2, 3, 4, 5, 6],
  allowedDates: [],
  strategy: 'ALLOW',
};

/**
 * Schedule constants
 */
export const SCHEDULE_CONSTANTS = {
  /** Default timezone */
  DEFAULT_TIMEZONE: 'UTC',
  /** Default start time */
  DEFAULT_START_TIME: '00:00',
  /** Default end time */
  DEFAULT_END_TIME: '23:59',
  /** Default max runs */
  DEFAULT_MAX_RUNS: 1000,
  /** Default retry attempts */
  DEFAULT_RETRY_ATTEMPTS: 3,
  /** Default timeout in minutes */
  DEFAULT_TIMEOUT_MINUTES: 60,
} as const;

/**
 * Schedule day mapping
 */
export const SCHEDULE_DAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;

/**
 * Schedule month mapping
 */
export const SCHEDULE_MONTHS = {
  JANUARY: 1,
  FEBRUARY: 2,
  MARCH: 3,
  APRIL: 4,
  MAY: 5,
  JUNE: 6,
  JULY: 7,
  AUGUST: 8,
  SEPTEMBER: 9,
  OCTOBER: 10,
  NOVEMBER: 11,
  DECEMBER: 12,
} as const;

/**
 * Get schedule type label
 */
export function getScheduleTypeLabel(type: ReportScheduleType): string {
  const labels: Record<ReportScheduleType, string> = {
    [ReportScheduleType.DAILY]: 'Daily',
    [ReportScheduleType.WEEKLY]: 'Weekly',
    [ReportScheduleType.MONTHLY]: 'Monthly',
    [ReportScheduleType.QUARTERLY]: 'Quarterly',
    [ReportScheduleType.YEARLY]: 'Yearly',
    [ReportScheduleType.HOURLY]: 'Hourly',
    [ReportScheduleType.MINUTELY]: 'Minutely',
    [ReportScheduleType.CUSTOM]: 'Custom',
    [ReportScheduleType.ON_DEMAND]: 'On Demand',
    [ReportScheduleType.ONE_TIME]: 'One Time',
    [ReportScheduleType.RECURRING]: 'Recurring',
    [ReportScheduleType.BI_WEEKLY]: 'Bi-Weekly',
    [ReportScheduleType.SEMI_MONTHLY]: 'Semi-Monthly',
  };
  return labels[type] || type;
}

/**
 * Get schedule frequency label
 */
export function getScheduleFrequencyLabel(frequency: ReportScheduleFrequency): string {
  const labels: Record<ReportScheduleFrequency, string> = {
    [ReportScheduleFrequency.EVERY_DAY]: 'Every Day',
    [ReportScheduleFrequency.EVERY_WEEKDAY]: 'Every Weekday',
    [ReportScheduleFrequency.EVERY_WEEKEND]: 'Every Weekend',
    [ReportScheduleFrequency.SPECIFIC_DAYS]: 'Specific Days',
    [ReportScheduleFrequency.SPECIFIC_DATES]: 'Specific Dates',
    [ReportScheduleFrequency.EVERY_N_DAYS]: 'Every N Days',
    [ReportScheduleFrequency.EVERY_N_HOURS]: 'Every N Hours',
    [ReportScheduleFrequency.EVERY_N_MINUTES]: 'Every N Minutes',
  };
  return labels[frequency] || frequency;
}

/**
 * Get day name
 */
export function getDayName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day] || '';
}

/**
 * Get month name
 */
export function getMonthName(month: number): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month - 1] || '';
}
