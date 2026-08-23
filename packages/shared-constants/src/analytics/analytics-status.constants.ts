/**
 * Analytics Status Constants
 * Status codes for analytics operations
 */

export const ANALYTICS_STATUS = {
  // Status Codes
  CODES: {
    // Success Statuses
    SUCCESS: 'success',
    COMPLETED: 'completed',
    FINISHED: 'finished',
    DONE: 'done',
    OK: 'ok',

    // Processing Statuses
    PENDING: 'pending',
    PROCESSING: 'processing',
    RUNNING: 'running',
    IN_PROGRESS: 'in_progress',
    STARTED: 'started',
    QUEUED: 'queued',

    // Failure Statuses
    FAILED: 'failed',
    ERROR: 'error',
    TIMEOUT: 'timeout',
    CANCELLED: 'cancelled',
    ABORTED: 'aborted',
    INTERRUPTED: 'interrupted',

    // Data Statuses
    PARTIAL: 'partial',
    INCOMPLETE: 'incomplete',
    OUTDATED: 'outdated',
    STALE: 'stale',
    CORRUPTED: 'corrupted',

    // Validation Statuses
    VALID: 'valid',
    INVALID: 'invalid',
    UNVERIFIED: 'unverified',
    VERIFIED: 'verified',

    // System Statuses
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable',
    MAINTENANCE: 'maintenance',
    DEGRADED: 'degraded',
  } as const,

  // Status Categories
  CATEGORIES: {
    SUCCESS: 'success',
    PROCESSING: 'processing',
    FAILURE: 'failure',
    DATA: 'data',
    VALIDATION: 'validation',
    SYSTEM: 'system',
  } as const,

  // Status Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Status Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    INTERNAL: 'internal',
    PRIVATE: 'private',
  } as const,

  // Status Actions
  ACTIONS: {
    RETRY: 'retry',
    CONTINUE: 'continue',
    STOP: 'stop',
    CANCEL: 'cancel',
    RESUME: 'resume',
    PAUSE: 'pause',
  } as const,
} as const;

// Analytics Status Codes
export type AnalyticsStatusCode =
  (typeof ANALYTICS_STATUS.CODES)[keyof typeof ANALYTICS_STATUS.CODES];

// Analytics Status Categories
export type AnalyticsStatusCategory =
  (typeof ANALYTICS_STATUS.CATEGORIES)[keyof typeof ANALYTICS_STATUS.CATEGORIES];

// Analytics Status Priority
export type AnalyticsStatusPriority =
  (typeof ANALYTICS_STATUS.PRIORITY)[keyof typeof ANALYTICS_STATUS.PRIORITY];

// Analytics Status Visibility
export type AnalyticsStatusVisibility =
  (typeof ANALYTICS_STATUS.VISIBILITY)[keyof typeof ANALYTICS_STATUS.VISIBILITY];

// Analytics Status Actions
export type AnalyticsStatusAction =
  (typeof ANALYTICS_STATUS.ACTIONS)[keyof typeof ANALYTICS_STATUS.ACTIONS];

// Analytics Status Labels
export function getAnalyticsStatusCodeLabel(code: AnalyticsStatusCode): string {
  const labels: Record<AnalyticsStatusCode, string> = {
    [ANALYTICS_STATUS.CODES.SUCCESS]: 'Success',
    [ANALYTICS_STATUS.CODES.COMPLETED]: 'Completed',
    [ANALYTICS_STATUS.CODES.FINISHED]: 'Finished',
    [ANALYTICS_STATUS.CODES.DONE]: 'Done',
    [ANALYTICS_STATUS.CODES.OK]: 'OK',
    [ANALYTICS_STATUS.CODES.PENDING]: 'Pending',
    [ANALYTICS_STATUS.CODES.PROCESSING]: 'Processing',
    [ANALYTICS_STATUS.CODES.RUNNING]: 'Running',
    [ANALYTICS_STATUS.CODES.IN_PROGRESS]: 'In Progress',
    [ANALYTICS_STATUS.CODES.STARTED]: 'Started',
    [ANALYTICS_STATUS.CODES.QUEUED]: 'Queued',
    [ANALYTICS_STATUS.CODES.FAILED]: 'Failed',
    [ANALYTICS_STATUS.CODES.ERROR]: 'Error',
    [ANALYTICS_STATUS.CODES.TIMEOUT]: 'Timeout',
    [ANALYTICS_STATUS.CODES.CANCELLED]: 'Cancelled',
    [ANALYTICS_STATUS.CODES.ABORTED]: 'Aborted',
    [ANALYTICS_STATUS.CODES.INTERRUPTED]: 'Interrupted',
    [ANALYTICS_STATUS.CODES.PARTIAL]: 'Partial',
    [ANALYTICS_STATUS.CODES.INCOMPLETE]: 'Incomplete',
    [ANALYTICS_STATUS.CODES.OUTDATED]: 'Outdated',
    [ANALYTICS_STATUS.CODES.STALE]: 'Stale',
    [ANALYTICS_STATUS.CODES.CORRUPTED]: 'Corrupted',
    [ANALYTICS_STATUS.CODES.VALID]: 'Valid',
    [ANALYTICS_STATUS.CODES.INVALID]: 'Invalid',
    [ANALYTICS_STATUS.CODES.UNVERIFIED]: 'Unverified',
    [ANALYTICS_STATUS.CODES.VERIFIED]: 'Verified',
    [ANALYTICS_STATUS.CODES.AVAILABLE]: 'Available',
    [ANALYTICS_STATUS.CODES.UNAVAILABLE]: 'Unavailable',
    [ANALYTICS_STATUS.CODES.MAINTENANCE]: 'Maintenance',
    [ANALYTICS_STATUS.CODES.DEGRADED]: 'Degraded',
  };
  return labels[code] || 'Unknown';
}

// Analytics Status Category Labels
export function getAnalyticsStatusCategoryLabel(category: AnalyticsStatusCategory): string {
  const labels: Record<AnalyticsStatusCategory, string> = {
    [ANALYTICS_STATUS.CATEGORIES.SUCCESS]: 'Success',
    [ANALYTICS_STATUS.CATEGORIES.PROCESSING]: 'Processing',
    [ANALYTICS_STATUS.CATEGORIES.FAILURE]: 'Failure',
    [ANALYTICS_STATUS.CATEGORIES.DATA]: 'Data Status',
    [ANALYTICS_STATUS.CATEGORIES.VALIDATION]: 'Validation',
    [ANALYTICS_STATUS.CATEGORIES.SYSTEM]: 'System Status',
  };
  return labels[category] || 'Unknown';
}

// Analytics Status Priority Labels
export function getAnalyticsStatusPriorityLabel(priority: AnalyticsStatusPriority): string {
  const labels: Record<AnalyticsStatusPriority, string> = {
    [ANALYTICS_STATUS.PRIORITY.CRITICAL]: 'Critical',
    [ANALYTICS_STATUS.PRIORITY.HIGH]: 'High',
    [ANALYTICS_STATUS.PRIORITY.MEDIUM]: 'Medium',
    [ANALYTICS_STATUS.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Analytics Status Visibility Labels
export function getAnalyticsStatusVisibilityLabel(visibility: AnalyticsStatusVisibility): string {
  const labels: Record<AnalyticsStatusVisibility, string> = {
    [ANALYTICS_STATUS.VISIBILITY.PUBLIC]: 'Public',
    [ANALYTICS_STATUS.VISIBILITY.INTERNAL]: 'Internal',
    [ANALYTICS_STATUS.VISIBILITY.PRIVATE]: 'Private',
  };
  return labels[visibility] || 'Unknown';
}

// Analytics Status Action Labels
export function getAnalyticsStatusActionLabel(action: AnalyticsStatusAction): string {
  const labels: Record<AnalyticsStatusAction, string> = {
    [ANALYTICS_STATUS.ACTIONS.RETRY]: 'Retry',
    [ANALYTICS_STATUS.ACTIONS.CONTINUE]: 'Continue',
    [ANALYTICS_STATUS.ACTIONS.STOP]: 'Stop',
    [ANALYTICS_STATUS.ACTIONS.CANCEL]: 'Cancel',
    [ANALYTICS_STATUS.ACTIONS.RESUME]: 'Resume',
    [ANALYTICS_STATUS.ACTIONS.PAUSE]: 'Pause',
  };
  return labels[action] || 'Unknown';
}

// Check if status is success
export function isAnalyticsStatusSuccess(status: AnalyticsStatusCode): boolean {
  const successStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.SUCCESS,
    ANALYTICS_STATUS.CODES.COMPLETED,
    ANALYTICS_STATUS.CODES.FINISHED,
    ANALYTICS_STATUS.CODES.DONE,
    ANALYTICS_STATUS.CODES.OK,
  ];
  return successStatuses.includes(status);
}

// Check if status is processing
export function isAnalyticsStatusProcessing(status: AnalyticsStatusCode): boolean {
  const processingStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.PENDING,
    ANALYTICS_STATUS.CODES.PROCESSING,
    ANALYTICS_STATUS.CODES.RUNNING,
    ANALYTICS_STATUS.CODES.IN_PROGRESS,
    ANALYTICS_STATUS.CODES.STARTED,
    ANALYTICS_STATUS.CODES.QUEUED,
  ];
  return processingStatuses.includes(status);
}

// Check if status is failure
export function isAnalyticsStatusFailure(status: AnalyticsStatusCode): boolean {
  const failureStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.FAILED,
    ANALYTICS_STATUS.CODES.ERROR,
    ANALYTICS_STATUS.CODES.TIMEOUT,
    ANALYTICS_STATUS.CODES.CANCELLED,
    ANALYTICS_STATUS.CODES.ABORTED,
    ANALYTICS_STATUS.CODES.INTERRUPTED,
  ];
  return failureStatuses.includes(status);
}

// Check if status is final
export function isAnalyticsStatusFinal(status: AnalyticsStatusCode): boolean {
  const finalStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.SUCCESS,
    ANALYTICS_STATUS.CODES.COMPLETED,
    ANALYTICS_STATUS.CODES.FINISHED,
    ANALYTICS_STATUS.CODES.DONE,
    ANALYTICS_STATUS.CODES.FAILED,
    ANALYTICS_STATUS.CODES.ERROR,
    ANALYTICS_STATUS.CODES.CANCELLED,
    ANALYTICS_STATUS.CODES.ABORTED,
  ];
  return finalStatuses.includes(status);
}

// Get status category
export function getAnalyticsStatusCategory(status: AnalyticsStatusCode): AnalyticsStatusCategory {
  if (isAnalyticsStatusSuccess(status)) return ANALYTICS_STATUS.CATEGORIES.SUCCESS;
  if (isAnalyticsStatusProcessing(status)) return ANALYTICS_STATUS.CATEGORIES.PROCESSING;
  if (isAnalyticsStatusFailure(status)) return ANALYTICS_STATUS.CATEGORIES.FAILURE;

  const dataStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.PARTIAL,
    ANALYTICS_STATUS.CODES.INCOMPLETE,
    ANALYTICS_STATUS.CODES.OUTDATED,
    ANALYTICS_STATUS.CODES.STALE,
    ANALYTICS_STATUS.CODES.CORRUPTED,
  ];
  if (dataStatuses.includes(status)) return ANALYTICS_STATUS.CATEGORIES.DATA;

  const validationStatuses: AnalyticsStatusCode[] = [
    ANALYTICS_STATUS.CODES.VALID,
    ANALYTICS_STATUS.CODES.INVALID,
    ANALYTICS_STATUS.CODES.UNVERIFIED,
    ANALYTICS_STATUS.CODES.VERIFIED,
  ];
  if (validationStatuses.includes(status)) return ANALYTICS_STATUS.CATEGORIES.VALIDATION;

  return ANALYTICS_STATUS.CATEGORIES.SYSTEM;
}
