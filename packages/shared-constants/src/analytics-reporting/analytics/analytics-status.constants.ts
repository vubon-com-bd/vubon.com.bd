/**
 * @fileoverview Analytics data status and state definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics data processing status
 */
export enum AnalyticsDataStatus {
  /** Data is pending processing */
  PENDING = 'PENDING',
  /** Data is currently being processed */
  PROCESSING = 'PROCESSING',
  /** Data processing completed successfully */
  COMPLETED = 'COMPLETED',
  /** Data processing failed */
  FAILED = 'FAILED',
  /** Data is partially processed */
  PARTIAL = 'PARTIAL',
  /** Data has expired and is no longer valid */
  EXPIRED = 'EXPIRED',
  /** Data has been archived */
  ARCHIVED = 'ARCHIVED',
  /** Data has been deleted */
  DELETED = 'DELETED',
  /** Data is queued for processing */
  QUEUED = 'QUEUED',
  /** Data is being validated */
  VALIDATING = 'VALIDATING',
  /** Data validation passed */
  VALIDATED = 'VALIDATED',
  /** Data validation failed */
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  /** Data is being transformed */
  TRANSFORMING = 'TRANSFORMING',
  /** Data transformation completed */
  TRANSFORMED = 'TRANSFORMED',
  /** Data is being loaded */
  LOADING = 'LOADING',
  /** Data loading completed */
  LOADED = 'LOADED',
  /** Data is being exported */
  EXPORTING = 'EXPORTING',
  /** Data export completed */
  EXPORTED = 'EXPORTED',
  /** Data is being imported */
  IMPORTING = 'IMPORTING',
  /** Data import completed */
  IMPORTED = 'IMPORTED',
  /** Data is being synced */
  SYNCING = 'SYNCING',
  /** Data sync completed */
  SYNCED = 'SYNCED',
  /** Data sync failed */
  SYNC_FAILED = 'SYNC_FAILED',
  /** Data is being backed up */
  BACKING_UP = 'BACKING_UP',
  /** Data backup completed */
  BACKED_UP = 'BACKED_UP',
  /** Data is being restored */
  RESTORING = 'RESTORING',
  /** Data restore completed */
  RESTORED = 'RESTORED',
  /** Data is in draft mode */
  DRAFT = 'DRAFT',
  /** Data is published */
  PUBLISHED = 'PUBLISHED',
  /** Data is unpublished */
  UNPUBLISHED = 'UNPUBLISHED',
  /** Data is being reviewed */
  REVIEW = 'REVIEW',
  /** Data review approved */
  APPROVED = 'APPROVED',
  /** Data review rejected */
  REJECTED = 'REJECTED',
  /** Data is scheduled for future */
  SCHEDULED = 'SCHEDULED',
  /** Data is cancelled */
  CANCELLED = 'CANCELLED',
  /** Data is paused */
  PAUSED = 'PAUSED',
  /** Data is in maintenance mode */
  MAINTENANCE = 'MAINTENANCE',
}

/**
 * Status category classification
 */
export enum AnalyticsStatusCategory {
  /** Processing states */
  PROCESSING = 'PROCESSING',
  /** Success states */
  SUCCESS = 'SUCCESS',
  /** Error states */
  ERROR = 'ERROR',
  /** Terminal states */
  TERMINAL = 'TERMINAL',
  /** Transition states */
  TRANSITION = 'TRANSITION',
  /** Validation states */
  VALIDATION = 'VALIDATION',
  /** Data operation states */
  OPERATION = 'OPERATION',
  /** Content states */
  CONTENT = 'CONTENT',
  /** Schedule states */
  SCHEDULE = 'SCHEDULE',
}

/**
 * Status category mapping
 */
export const ANALYTICS_STATUS_CATEGORY_MAP: Record<AnalyticsDataStatus, AnalyticsStatusCategory> = {
  [AnalyticsDataStatus.PENDING]: AnalyticsStatusCategory.PROCESSING,
  [AnalyticsDataStatus.PROCESSING]: AnalyticsStatusCategory.PROCESSING,
  [AnalyticsDataStatus.COMPLETED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.FAILED]: AnalyticsStatusCategory.ERROR,
  [AnalyticsDataStatus.PARTIAL]: AnalyticsStatusCategory.ERROR,
  [AnalyticsDataStatus.EXPIRED]: AnalyticsStatusCategory.TERMINAL,
  [AnalyticsDataStatus.ARCHIVED]: AnalyticsStatusCategory.TERMINAL,
  [AnalyticsDataStatus.DELETED]: AnalyticsStatusCategory.TERMINAL,
  [AnalyticsDataStatus.QUEUED]: AnalyticsStatusCategory.PROCESSING,
  [AnalyticsDataStatus.VALIDATING]: AnalyticsStatusCategory.VALIDATION,
  [AnalyticsDataStatus.VALIDATED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.VALIDATION_FAILED]: AnalyticsStatusCategory.ERROR,
  [AnalyticsDataStatus.TRANSFORMING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.TRANSFORMED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.LOADING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.LOADED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.EXPORTING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.EXPORTED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.IMPORTING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.IMPORTED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.SYNCING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.SYNCED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.SYNC_FAILED]: AnalyticsStatusCategory.ERROR,
  [AnalyticsDataStatus.BACKING_UP]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.BACKED_UP]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.RESTORING]: AnalyticsStatusCategory.OPERATION,
  [AnalyticsDataStatus.RESTORED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.DRAFT]: AnalyticsStatusCategory.CONTENT,
  [AnalyticsDataStatus.PUBLISHED]: AnalyticsStatusCategory.CONTENT,
  [AnalyticsDataStatus.UNPUBLISHED]: AnalyticsStatusCategory.CONTENT,
  [AnalyticsDataStatus.REVIEW]: AnalyticsStatusCategory.VALIDATION,
  [AnalyticsDataStatus.APPROVED]: AnalyticsStatusCategory.SUCCESS,
  [AnalyticsDataStatus.REJECTED]: AnalyticsStatusCategory.ERROR,
  [AnalyticsDataStatus.SCHEDULED]: AnalyticsStatusCategory.SCHEDULE,
  [AnalyticsDataStatus.CANCELLED]: AnalyticsStatusCategory.TERMINAL,
  [AnalyticsDataStatus.PAUSED]: AnalyticsStatusCategory.PROCESSING,
  [AnalyticsDataStatus.MAINTENANCE]: AnalyticsStatusCategory.PROCESSING,
};

/**
 * Status configuration
 */
export interface AnalyticsStatusConfig {
  label: string;
  description: string;
  color: string;
  icon?: string;
  isTerminal: boolean;
  isError: boolean;
  priority: number;
}

export const ANALYTICS_STATUS_CONFIG: Record<AnalyticsDataStatus, AnalyticsStatusConfig> = {
  [AnalyticsDataStatus.PENDING]: {
    label: 'Pending',
    description: 'Data is waiting to be processed',
    color: '#F59E0B',
    icon: 'Clock',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.PROCESSING]: {
    label: 'Processing',
    description: 'Data is currently being processed',
    color: '#3B82F6',
    icon: 'Refresh',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.COMPLETED]: {
    label: 'Completed',
    description: 'Data processing completed successfully',
    color: '#22C55E',
    icon: 'CheckCircle',
    isTerminal: true,
    isError: false,
    priority: 1,
  },
  [AnalyticsDataStatus.FAILED]: {
    label: 'Failed',
    description: 'Data processing failed',
    color: '#EF4444',
    icon: 'XCircle',
    isTerminal: true,
    isError: true,
    priority: 1,
  },
  [AnalyticsDataStatus.PARTIAL]: {
    label: 'Partial',
    description: 'Data is partially processed with some errors',
    color: '#F97316',
    icon: 'AlertTriangle',
    isTerminal: false,
    isError: true,
    priority: 2,
  },
  [AnalyticsDataStatus.EXPIRED]: {
    label: 'Expired',
    description: 'Data has expired and is no longer valid',
    color: '#6B7280',
    icon: 'Clock',
    isTerminal: true,
    isError: true,
    priority: 3,
  },
  [AnalyticsDataStatus.ARCHIVED]: {
    label: 'Archived',
    description: 'Data has been archived',
    color: '#6B7280',
    icon: 'Archive',
    isTerminal: true,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.DELETED]: {
    label: 'Deleted',
    description: 'Data has been deleted',
    color: '#6B7280',
    icon: 'Trash',
    isTerminal: true,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.QUEUED]: {
    label: 'Queued',
    description: 'Data is queued for processing',
    color: '#8B5CF6',
    icon: 'List',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.VALIDATING]: {
    label: 'Validating',
    description: 'Data is being validated',
    color: '#6366F1',
    icon: 'ShieldCheck',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.VALIDATED]: {
    label: 'Validated',
    description: 'Data validation passed',
    color: '#34D399',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.VALIDATION_FAILED]: {
    label: 'Validation Failed',
    description: 'Data validation failed',
    color: '#EF4444',
    icon: 'XCircle',
    isTerminal: false,
    isError: true,
    priority: 2,
  },
  [AnalyticsDataStatus.TRANSFORMING]: {
    label: 'Transforming',
    description: 'Data is being transformed',
    color: '#F472B6',
    icon: 'Refresh',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.TRANSFORMED]: {
    label: 'Transformed',
    description: 'Data transformation completed',
    color: '#EC4899',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.LOADING]: {
    label: 'Loading',
    description: 'Data is being loaded',
    color: '#60A5FA',
    icon: 'Database',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.LOADED]: {
    label: 'Loaded',
    description: 'Data loading completed',
    color: '#3B82F6',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.EXPORTING]: {
    label: 'Exporting',
    description: 'Data is being exported',
    color: '#FCD34D',
    icon: 'Download',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.EXPORTED]: {
    label: 'Exported',
    description: 'Data export completed',
    color: '#F59E0B',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.IMPORTING]: {
    label: 'Importing',
    description: 'Data is being imported',
    color: '#A78BFA',
    icon: 'Upload',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.IMPORTED]: {
    label: 'Imported',
    description: 'Data import completed',
    color: '#8B5CF6',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.SYNCING]: {
    label: 'Syncing',
    description: 'Data is being synced',
    color: '#34D399',
    icon: 'Repeat',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.SYNCED]: {
    label: 'Synced',
    description: 'Data sync completed',
    color: '#10B981',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.SYNC_FAILED]: {
    label: 'Sync Failed',
    description: 'Data sync failed',
    color: '#EF4444',
    icon: 'XCircle',
    isTerminal: false,
    isError: true,
    priority: 2,
  },
  [AnalyticsDataStatus.BACKING_UP]: {
    label: 'Backing Up',
    description: 'Data is being backed up',
    color: '#FCD34D',
    icon: 'Database',
    isTerminal: false,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.BACKED_UP]: {
    label: 'Backed Up',
    description: 'Data backup completed',
    color: '#F59E0B',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.RESTORING]: {
    label: 'Restoring',
    description: 'Data is being restored',
    color: '#F472B6',
    icon: 'RotateCcw',
    isTerminal: false,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.RESTORED]: {
    label: 'Restored',
    description: 'Data restore completed',
    color: '#EC4899',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 3,
  },
  [AnalyticsDataStatus.DRAFT]: {
    label: 'Draft',
    description: 'Data is in draft mode',
    color: '#6B7280',
    icon: 'FileText',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.PUBLISHED]: {
    label: 'Published',
    description: 'Data is published and live',
    color: '#22C55E',
    icon: 'Globe',
    isTerminal: false,
    isError: false,
    priority: 1,
  },
  [AnalyticsDataStatus.UNPUBLISHED]: {
    label: 'Unpublished',
    description: 'Data is unpublished',
    color: '#6B7280',
    icon: 'EyeOff',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.REVIEW]: {
    label: 'Under Review',
    description: 'Data is being reviewed',
    color: '#F59E0B',
    icon: 'ShieldCheck',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.APPROVED]: {
    label: 'Approved',
    description: 'Data review approved',
    color: '#22C55E',
    icon: 'CheckCircle',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.REJECTED]: {
    label: 'Rejected',
    description: 'Data review rejected',
    color: '#EF4444',
    icon: 'XCircle',
    isTerminal: false,
    isError: true,
    priority: 2,
  },
  [AnalyticsDataStatus.SCHEDULED]: {
    label: 'Scheduled',
    description: 'Data is scheduled for future',
    color: '#8B5CF6',
    icon: 'Calendar',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.CANCELLED]: {
    label: 'Cancelled',
    description: 'Data processing cancelled',
    color: '#6B7280',
    icon: 'XCircle',
    isTerminal: true,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.PAUSED]: {
    label: 'Paused',
    description: 'Data processing paused',
    color: '#F59E0B',
    icon: 'Pause',
    isTerminal: false,
    isError: false,
    priority: 2,
  },
  [AnalyticsDataStatus.MAINTENANCE]: {
    label: 'Maintenance',
    description: 'Data is in maintenance mode',
    color: '#6B7280',
    icon: 'Settings',
    isTerminal: false,
    isError: false,
    priority: 3,
  },
};

/**
 * Get status category
 */
export function getStatusCategory(status: AnalyticsDataStatus): AnalyticsStatusCategory {
  return ANALYTICS_STATUS_CATEGORY_MAP[status];
}

/**
 * Get status label
 */
export function getStatusLabel(status: AnalyticsDataStatus): string {
  return ANALYTICS_STATUS_CONFIG[status]?.label || status;
}

/**
 * Get status description
 */
export function getStatusDescription(status: AnalyticsDataStatus): string {
  return ANALYTICS_STATUS_CONFIG[status]?.description || '';
}

/**
 * Get status color
 */
export function getStatusColor(status: AnalyticsDataStatus): string {
  return ANALYTICS_STATUS_CONFIG[status]?.color || '#6B7280';
}

/**
 * Get status icon
 */
export function getStatusIcon(status: AnalyticsDataStatus): string {
  return ANALYTICS_STATUS_CONFIG[status]?.icon || 'Circle';
}

/**
 * Check if status is terminal
 */
export function isStatusTerminal(status: AnalyticsDataStatus): boolean {
  return ANALYTICS_STATUS_CONFIG[status]?.isTerminal || false;
}

/**
 * Check if status is error
 */
export function isStatusError(status: AnalyticsDataStatus): boolean {
  return ANALYTICS_STATUS_CONFIG[status]?.isError || false;
}

/**
 * Check if status is successful
 */
export function isStatusSuccess(status: AnalyticsDataStatus): boolean {
  return !isStatusError(status) && isStatusTerminal(status);
}

/**
 * Get statuses by category
 */
export function getStatusesByCategory(category: AnalyticsStatusCategory): AnalyticsDataStatus[] {
  return Object.entries(ANALYTICS_STATUS_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([status]) => status as AnalyticsDataStatus);
}

/**
 * Get processing statuses
 */
export function getProcessingStatuses(): AnalyticsDataStatus[] {
  return getStatusesByCategory(AnalyticsStatusCategory.PROCESSING);
}

/**
 * Get success statuses
 */
export function getSuccessStatuses(): AnalyticsDataStatus[] {
  return getStatusesByCategory(AnalyticsStatusCategory.SUCCESS);
}

/**
 * Get error statuses
 */
export function getErrorStatuses(): AnalyticsDataStatus[] {
  return getStatusesByCategory(AnalyticsStatusCategory.ERROR);
}

/**
 * Get terminal statuses
 */
export function getTerminalStatuses(): AnalyticsDataStatus[] {
  return getStatusesByCategory(AnalyticsStatusCategory.TERMINAL);
}

/**
 * Check if status can transition to another status
 */
export function canTransitionTo(
  currentStatus: AnalyticsDataStatus,
  newStatus: AnalyticsDataStatus
): boolean {
  if (isStatusTerminal(currentStatus)) {
    return false;
  }

  // Cannot transition from error to processing
  if (
    isStatusError(currentStatus) &&
    getStatusCategory(newStatus) === AnalyticsStatusCategory.PROCESSING
  ) {
    return false;
  }

  // Cannot transition from success to processing
  if (
    isStatusSuccess(currentStatus) &&
    getStatusCategory(newStatus) === AnalyticsStatusCategory.PROCESSING
  ) {
    return false;
  }

  return true;
}

/**
 * Get allowed next statuses
 */
export function getAllowedNextStatuses(currentStatus: AnalyticsDataStatus): AnalyticsDataStatus[] {
  return Object.values(AnalyticsDataStatus).filter((status) =>
    canTransitionTo(currentStatus, status)
  );
}

/**
 * Status transition validation result
 */
export interface StatusTransitionResult {
  valid: boolean;
  message: string;
  nextStatuses: AnalyticsDataStatus[];
}

/**
 * Validate status transition
 */
export function validateStatusTransition(
  currentStatus: AnalyticsDataStatus,
  newStatus: AnalyticsDataStatus
): StatusTransitionResult {
  if (currentStatus === newStatus) {
    return {
      valid: false,
      message: 'Cannot transition to the same status',
      nextStatuses: getAllowedNextStatuses(currentStatus),
    };
  }

  if (isStatusTerminal(currentStatus)) {
    return {
      valid: false,
      message: 'Cannot transition from terminal status',
      nextStatuses: [],
    };
  }

  if (!canTransitionTo(currentStatus, newStatus)) {
    return {
      valid: false,
      message: `Cannot transition from ${getStatusLabel(currentStatus)} to ${getStatusLabel(newStatus)}`,
      nextStatuses: getAllowedNextStatuses(currentStatus),
    };
  }

  return {
    valid: true,
    message: 'Transition allowed',
    nextStatuses: getAllowedNextStatuses(newStatus),
  };
}

/**
 * Get default statuses for dashboard
 */
export function getDefaultDashboardStatuses(): AnalyticsDataStatus[] {
  return [
    AnalyticsDataStatus.PENDING,
    AnalyticsDataStatus.PROCESSING,
    AnalyticsDataStatus.COMPLETED,
    AnalyticsDataStatus.FAILED,
    AnalyticsDataStatus.PARTIAL,
  ];
}

/**
 * Get active statuses (non-terminal)
 */
export function getActiveStatuses(): AnalyticsDataStatus[] {
  return Object.values(AnalyticsDataStatus).filter((status) => !isStatusTerminal(status));
}
