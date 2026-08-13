/**
 * @fileoverview Report schedule status definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report schedule status enum
 */
export enum ReportScheduleStatus {
  /** Active - schedule is running normally */
  ACTIVE = 'ACTIVE',
  /** Inactive - schedule is not active */
  INACTIVE = 'INACTIVE',
  /** Paused - schedule is temporarily paused */
  PAUSED = 'PAUSED',
  /** Resumed - schedule has been resumed after pause */
  RESUMED = 'RESUMED',
  /** Completed - schedule has completed all runs */
  COMPLETED = 'COMPLETED',
  /** Failed - schedule execution failed */
  FAILED = 'FAILED',
  /** Cancelled - schedule has been cancelled */
  CANCELLED = 'CANCELLED',
  /** Expired - schedule has expired */
  EXPIRED = 'EXPIRED',
  /** Pending activation - schedule waiting to be activated */
  PENDING_ACTIVATION = 'PENDING_ACTIVATION',
  /** Pending deactivation - schedule waiting to be deactivated */
  PENDING_DEACTIVATION = 'PENDING_DEACTIVATION',
  /** Pending execution - schedule waiting to be executed */
  PENDING_EXECUTION = 'PENDING_EXECUTION',
  /** Executing - schedule is currently executing */
  EXECUTING = 'EXECUTING',
  /** Executed - schedule has been executed */
  EXECUTED = 'EXECUTED',
  /** Overdue - schedule is past due */
  OVERDUE = 'OVERDUE',
  /** Upcoming - schedule is upcoming */
  UPCOMING = 'UPCOMING',
  /** Missed - schedule execution was missed */
  MISSED = 'MISSED',
  /** Skipped - schedule execution was skipped */
  SKIPPED = 'SKIPPED',
  /** Retry scheduled - retry is scheduled */
  RETRY_SCHEDULED = 'RETRY_SCHEDULED',
  /** Retry limit exceeded - retry attempts exhausted */
  RETRY_LIMIT_EXCEEDED = 'RETRY_LIMIT_EXCEEDED',
  /** Permanently failed - schedule permanently failed */
  PERMANENTLY_FAILED = 'PERMANENTLY_FAILED',
  /** Partially executed - schedule partially executed */
  PARTIALLY_EXECUTED = 'PARTIALLY_EXECUTED',
  /** Waiting for dependency - waiting for dependency to complete */
  WAITING_FOR_DEPENDENCY = 'WAITING_FOR_DEPENDENCY',
  /** Dependency met - dependency condition satisfied */
  DEPENDENCY_MET = 'DEPENDENCY_MET',
  /** Dependency not met - dependency condition not satisfied */
  DEPENDENCY_NOT_MET = 'DEPENDENCY_NOT_MET',
  /** Blocked - schedule is blocked */
  BLOCKED = 'BLOCKED',
  /** Unblocked - schedule has been unblocked */
  UNBLOCKED = 'UNBLOCKED',
  /** Recovering - schedule is recovering from failure */
  RECOVERING = 'RECOVERING',
  /** Degraded - schedule is in degraded state */
  DEGRADED = 'DEGRADED',
  /** Maintenance - schedule is under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Disabled - schedule has been disabled */
  DISABLED = 'DISABLED',
  /** Deleted - schedule has been deleted */
  DELETED = 'DELETED',
  /** Archived - schedule has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Restored - schedule has been restored */
  RESTORED = 'RESTORED',
}

/**
 * Schedule status category for grouping
 */
export enum ReportScheduleStatusCategory {
  /** Active states */
  ACTIVE = 'ACTIVE',
  /** Inactive states */
  INACTIVE = 'INACTIVE',
  /** Pending states */
  PENDING = 'PENDING',
  /** Execution states */
  EXECUTION = 'EXECUTION',
  /** Success states */
  SUCCESS = 'SUCCESS',
  /** Error states */
  ERROR = 'ERROR',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
  /** Waiting states */
  WAITING = 'WAITING',
  /** Dependency states */
  DEPENDENCY = 'DEPENDENCY',
  /** Maintenance states */
  MAINTENANCE = 'MAINTENANCE',
}

/**
 * Schedule status category mapping
 */
export const REPORT_SCHEDULE_STATUS_CATEGORY_MAP: Record<
  ReportScheduleStatus,
  ReportScheduleStatusCategory
> = {
  [ReportScheduleStatus.ACTIVE]: ReportScheduleStatusCategory.ACTIVE,
  [ReportScheduleStatus.INACTIVE]: ReportScheduleStatusCategory.INACTIVE,
  [ReportScheduleStatus.PAUSED]: ReportScheduleStatusCategory.INACTIVE,
  [ReportScheduleStatus.RESUMED]: ReportScheduleStatusCategory.ACTIVE,
  [ReportScheduleStatus.COMPLETED]: ReportScheduleStatusCategory.SUCCESS,
  [ReportScheduleStatus.FAILED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.CANCELLED]: ReportScheduleStatusCategory.TERMINAL,
  [ReportScheduleStatus.EXPIRED]: ReportScheduleStatusCategory.TERMINAL,
  [ReportScheduleStatus.PENDING_ACTIVATION]: ReportScheduleStatusCategory.PENDING,
  [ReportScheduleStatus.PENDING_DEACTIVATION]: ReportScheduleStatusCategory.PENDING,
  [ReportScheduleStatus.PENDING_EXECUTION]: ReportScheduleStatusCategory.PENDING,
  [ReportScheduleStatus.EXECUTING]: ReportScheduleStatusCategory.EXECUTION,
  [ReportScheduleStatus.EXECUTED]: ReportScheduleStatusCategory.SUCCESS,
  [ReportScheduleStatus.OVERDUE]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.UPCOMING]: ReportScheduleStatusCategory.WAITING,
  [ReportScheduleStatus.MISSED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.SKIPPED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.RETRY_SCHEDULED]: ReportScheduleStatusCategory.WAITING,
  [ReportScheduleStatus.RETRY_LIMIT_EXCEEDED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.PERMANENTLY_FAILED]: ReportScheduleStatusCategory.TERMINAL,
  [ReportScheduleStatus.PARTIALLY_EXECUTED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.WAITING_FOR_DEPENDENCY]: ReportScheduleStatusCategory.WAITING,
  [ReportScheduleStatus.DEPENDENCY_MET]: ReportScheduleStatusCategory.DEPENDENCY,
  [ReportScheduleStatus.DEPENDENCY_NOT_MET]: ReportScheduleStatusCategory.DEPENDENCY,
  [ReportScheduleStatus.BLOCKED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.UNBLOCKED]: ReportScheduleStatusCategory.ACTIVE,
  [ReportScheduleStatus.RECOVERING]: ReportScheduleStatusCategory.ACTIVE,
  [ReportScheduleStatus.DEGRADED]: ReportScheduleStatusCategory.ERROR,
  [ReportScheduleStatus.MAINTENANCE]: ReportScheduleStatusCategory.MAINTENANCE,
  [ReportScheduleStatus.DISABLED]: ReportScheduleStatusCategory.INACTIVE,
  [ReportScheduleStatus.DELETED]: ReportScheduleStatusCategory.TERMINAL,
  [ReportScheduleStatus.ARCHIVED]: ReportScheduleStatusCategory.TERMINAL,
  [ReportScheduleStatus.RESTORED]: ReportScheduleStatusCategory.ACTIVE,
};

/**
 * Schedule status configuration
 */
export interface ReportScheduleStatusConfig {
  label: string;
  description: string;
  category: ReportScheduleStatusCategory;
  color: string;
  icon?: string;
  priority: number;
  isTerminal: boolean;
  isError: boolean;
  allowsExecution: boolean;
}

export const REPORT_SCHEDULE_STATUS_CONFIG: Record<
  ReportScheduleStatus,
  ReportScheduleStatusConfig
> = {
  [ReportScheduleStatus.ACTIVE]: {
    label: 'Active',
    description: 'Schedule is running normally',
    category: ReportScheduleStatusCategory.ACTIVE,
    color: '#22C55E',
    icon: 'Play',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.INACTIVE]: {
    label: 'Inactive',
    description: 'Schedule is not active',
    category: ReportScheduleStatusCategory.INACTIVE,
    color: '#6B7280',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PAUSED]: {
    label: 'Paused',
    description: 'Schedule is temporarily paused',
    category: ReportScheduleStatusCategory.INACTIVE,
    color: '#F59E0B',
    icon: 'Pause',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.RESUMED]: {
    label: 'Resumed',
    description: 'Schedule has been resumed after pause',
    category: ReportScheduleStatusCategory.ACTIVE,
    color: '#10B981',
    icon: 'Play',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.COMPLETED]: {
    label: 'Completed',
    description: 'Schedule has completed all runs',
    category: ReportScheduleStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 1,
    isTerminal: true,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.FAILED]: {
    label: 'Failed',
    description: 'Schedule execution failed',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 1,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.CANCELLED]: {
    label: 'Cancelled',
    description: 'Schedule has been cancelled',
    category: ReportScheduleStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'XCircle',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Schedule has expired',
    category: ReportScheduleStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Clock',
    priority: 2,
    isTerminal: true,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PENDING_ACTIVATION]: {
    label: 'Pending Activation',
    description: 'Schedule waiting to be activated',
    category: ReportScheduleStatusCategory.PENDING,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PENDING_DEACTIVATION]: {
    label: 'Pending Deactivation',
    description: 'Schedule waiting to be deactivated',
    category: ReportScheduleStatusCategory.PENDING,
    color: '#F59E0B',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PENDING_EXECUTION]: {
    label: 'Pending Execution',
    description: 'Schedule waiting to be executed',
    category: ReportScheduleStatusCategory.PENDING,
    color: '#3B82F6',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.EXECUTING]: {
    label: 'Executing',
    description: 'Schedule is currently executing',
    category: ReportScheduleStatusCategory.EXECUTION,
    color: '#6366F1',
    icon: 'Activity',
    priority: 1,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.EXECUTED]: {
    label: 'Executed',
    description: 'Schedule has been executed',
    category: ReportScheduleStatusCategory.SUCCESS,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.OVERDUE]: {
    label: 'Overdue',
    description: 'Schedule is past due',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.UPCOMING]: {
    label: 'Upcoming',
    description: 'Schedule is upcoming',
    category: ReportScheduleStatusCategory.WAITING,
    color: '#8B5CF6',
    icon: 'Calendar',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.MISSED]: {
    label: 'Missed',
    description: 'Schedule execution was missed',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.SKIPPED]: {
    label: 'Skipped',
    description: 'Schedule execution was skipped',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#F59E0B',
    icon: 'Skip',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.RETRY_SCHEDULED]: {
    label: 'Retry Scheduled',
    description: 'Retry is scheduled',
    category: ReportScheduleStatusCategory.WAITING,
    color: '#F59E0B',
    icon: 'Refresh',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.RETRY_LIMIT_EXCEEDED]: {
    label: 'Retry Limit Exceeded',
    description: 'Retry attempts exhausted',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PERMANENTLY_FAILED]: {
    label: 'Permanently Failed',
    description: 'Schedule permanently failed',
    category: ReportScheduleStatusCategory.TERMINAL,
    color: '#DC2626',
    icon: 'XCircle',
    priority: 1,
    isTerminal: true,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.PARTIALLY_EXECUTED]: {
    label: 'Partially Executed',
    description: 'Schedule partially executed',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.WAITING_FOR_DEPENDENCY]: {
    label: 'Waiting for Dependency',
    description: 'Waiting for dependency to complete',
    category: ReportScheduleStatusCategory.WAITING,
    color: '#8B5CF6',
    icon: 'Clock',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.DEPENDENCY_MET]: {
    label: 'Dependency Met',
    description: 'Dependency condition satisfied',
    category: ReportScheduleStatusCategory.DEPENDENCY,
    color: '#22C55E',
    icon: 'CheckCircle',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.DEPENDENCY_NOT_MET]: {
    label: 'Dependency Not Met',
    description: 'Dependency condition not satisfied',
    category: ReportScheduleStatusCategory.DEPENDENCY,
    color: '#EF4444',
    icon: 'XCircle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.BLOCKED]: {
    label: 'Blocked',
    description: 'Schedule is blocked',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#EF4444',
    icon: 'ShieldOff',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.UNBLOCKED]: {
    label: 'Unblocked',
    description: 'Schedule has been unblocked',
    category: ReportScheduleStatusCategory.ACTIVE,
    color: '#10B981',
    icon: 'ShieldCheck',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.RECOVERING]: {
    label: 'Recovering',
    description: 'Schedule is recovering from failure',
    category: ReportScheduleStatusCategory.ACTIVE,
    color: '#F59E0B',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
  [ReportScheduleStatus.DEGRADED]: {
    label: 'Degraded',
    description: 'Schedule is in degraded state',
    category: ReportScheduleStatusCategory.ERROR,
    color: '#F97316',
    icon: 'AlertTriangle',
    priority: 2,
    isTerminal: false,
    isError: true,
    allowsExecution: false,
  },
  [ReportScheduleStatus.MAINTENANCE]: {
    label: 'Maintenance',
    description: 'Schedule is under maintenance',
    category: ReportScheduleStatusCategory.MAINTENANCE,
    color: '#6B7280',
    icon: 'Settings',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.DISABLED]: {
    label: 'Disabled',
    description: 'Schedule has been disabled',
    category: ReportScheduleStatusCategory.INACTIVE,
    color: '#6B7280',
    icon: 'Power',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.DELETED]: {
    label: 'Deleted',
    description: 'Schedule has been deleted',
    category: ReportScheduleStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Trash',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Schedule has been archived',
    category: ReportScheduleStatusCategory.TERMINAL,
    color: '#6B7280',
    icon: 'Archive',
    priority: 3,
    isTerminal: true,
    isError: false,
    allowsExecution: false,
  },
  [ReportScheduleStatus.RESTORED]: {
    label: 'Restored',
    description: 'Schedule has been restored',
    category: ReportScheduleStatusCategory.ACTIVE,
    color: '#22C55E',
    icon: 'RotateCcw',
    priority: 2,
    isTerminal: false,
    isError: false,
    allowsExecution: true,
  },
};

/**
 * Get schedule status label
 */
export function getScheduleStatusLabel(status: ReportScheduleStatus): string {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get schedule status description
 */
export function getScheduleStatusDescription(status: ReportScheduleStatus): string {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get schedule status category
 */
export function getScheduleStatusCategory(
  status: ReportScheduleStatus
): ReportScheduleStatusCategory {
  return REPORT_SCHEDULE_STATUS_CATEGORY_MAP[status];
}

/**
 * Get schedule status color
 */
export function getScheduleStatusColor(status: ReportScheduleStatus): string {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get schedule status icon
 */
export function getScheduleStatusIcon(status: ReportScheduleStatus): string {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Get schedule statuses by category
 */
export function getScheduleStatusesByCategory(
  category: ReportScheduleStatusCategory
): ReportScheduleStatus[] {
  return Object.entries(REPORT_SCHEDULE_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as ReportScheduleStatus);
}

/**
 * Get active statuses
 */
export function getActiveScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.ACTIVE);
}

/**
 * Get inactive statuses
 */
export function getInactiveScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.INACTIVE);
}

/**
 * Get pending statuses
 */
export function getPendingScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.PENDING);
}

/**
 * Get execution statuses
 */
export function getExecutionScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.EXECUTION);
}

/**
 * Get success statuses
 */
export function getSuccessScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.SUCCESS);
}

/**
 * Get error statuses
 */
export function getErrorScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.ERROR);
}

/**
 * Get terminal statuses
 */
export function getTerminalScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.TERMINAL);
}

/**
 * Get waiting statuses
 */
export function getWaitingScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.WAITING);
}

/**
 * Get dependency statuses
 */
export function getDependencyScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.DEPENDENCY);
}

/**
 * Get maintenance statuses
 */
export function getMaintenanceScheduleStatuses(): ReportScheduleStatus[] {
  return getScheduleStatusesByCategory(ReportScheduleStatusCategory.MAINTENANCE);
}

/**
 * Check if status is terminal
 */
export function isScheduleStatusTerminal(status: ReportScheduleStatus): boolean {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isScheduleStatusError(status: ReportScheduleStatus): boolean {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status allows execution
 */
export function scheduleStatusAllowsExecution(status: ReportScheduleStatus): boolean {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.allowsExecution || false;
}

/**
 * Check if status is active (not terminal)
 */
export function isScheduleStatusActive(status: ReportScheduleStatus): boolean {
  return !isScheduleStatusTerminal(status);
}

/**
 * Get status priority
 */
export function getScheduleStatusPriority(status: ReportScheduleStatus): number {
  return REPORT_SCHEDULE_STATUS_CONFIG[status]?.priority || 3;
}

/**
 * Check if schedule status can transition to new status
 */
export function canScheduleTransitionTo(
  currentStatus: ReportScheduleStatus,
  newStatus: ReportScheduleStatus
): boolean {
  if (currentStatus === newStatus) {
    return false;
  }

  // Cannot transition from terminal status
  if (isScheduleStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to execution
  if (
    isScheduleStatusError(currentStatus) &&
    getScheduleStatusCategory(newStatus) === ReportScheduleStatusCategory.EXECUTION
  ) {
    return false;
  }

  // Blocked status can only transition to specific statuses
  if (currentStatus === ReportScheduleStatus.BLOCKED) {
    return [
      ReportScheduleStatus.UNBLOCKED,
      ReportScheduleStatus.RECOVERING,
      ReportScheduleStatus.DISABLED,
      ReportScheduleStatus.ARCHIVED,
    ].includes(newStatus);
  }

  // Maintenance status can only transition to specific statuses
  if (currentStatus === ReportScheduleStatus.MAINTENANCE) {
    return [
      ReportScheduleStatus.ACTIVE,
      ReportScheduleStatus.INACTIVE,
      ReportScheduleStatus.DISABLED,
    ].includes(newStatus);
  }

  return true;
}

/**
 * Get allowed next schedule statuses
 */
export function getAllowedNextScheduleStatuses(
  currentStatus: ReportScheduleStatus
): ReportScheduleStatus[] {
  return Object.values(ReportScheduleStatus).filter((status) =>
    canScheduleTransitionTo(currentStatus, status)
  );
}

/**
 * Schedule status groups
 */
export const SCHEDULE_STATUS_GROUPS = {
  /** Executable statuses */
  EXECUTABLE: [
    ReportScheduleStatus.ACTIVE,
    ReportScheduleStatus.RESUMED,
    ReportScheduleStatus.DEPENDENCY_MET,
    ReportScheduleStatus.UNBLOCKED,
    ReportScheduleStatus.RECOVERING,
    ReportScheduleStatus.RESTORED,
  ],
  /** Non-executable statuses */
  NON_EXECUTABLE: [
    ReportScheduleStatus.INACTIVE,
    ReportScheduleStatus.PAUSED,
    ReportScheduleStatus.PENDING_ACTIVATION,
    ReportScheduleStatus.PENDING_DEACTIVATION,
    ReportScheduleStatus.PENDING_EXECUTION,
    ReportScheduleStatus.COMPLETED,
    ReportScheduleStatus.FAILED,
    ReportScheduleStatus.CANCELLED,
    ReportScheduleStatus.EXPIRED,
    ReportScheduleStatus.OVERDUE,
    ReportScheduleStatus.UPCOMING,
    ReportScheduleStatus.MISSED,
    ReportScheduleStatus.SKIPPED,
    ReportScheduleStatus.RETRY_SCHEDULED,
    ReportScheduleStatus.RETRY_LIMIT_EXCEEDED,
    ReportScheduleStatus.PERMANENTLY_FAILED,
    ReportScheduleStatus.PARTIALLY_EXECUTED,
    ReportScheduleStatus.WAITING_FOR_DEPENDENCY,
    ReportScheduleStatus.DEPENDENCY_NOT_MET,
    ReportScheduleStatus.BLOCKED,
    ReportScheduleStatus.DEGRADED,
    ReportScheduleStatus.MAINTENANCE,
    ReportScheduleStatus.DISABLED,
    ReportScheduleStatus.DELETED,
    ReportScheduleStatus.ARCHIVED,
  ],
  /** Recoverable statuses */
  RECOVERABLE: [
    ReportScheduleStatus.FAILED,
    ReportScheduleStatus.OVERDUE,
    ReportScheduleStatus.MISSED,
    ReportScheduleStatus.SKIPPED,
    ReportScheduleStatus.RETRY_LIMIT_EXCEEDED,
    ReportScheduleStatus.PARTIALLY_EXECUTED,
    ReportScheduleStatus.BLOCKED,
    ReportScheduleStatus.DEGRADED,
  ],
} as const;
