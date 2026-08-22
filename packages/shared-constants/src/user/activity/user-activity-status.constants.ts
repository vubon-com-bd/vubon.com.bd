/**
 * User Activity Status Constants
 * Defines all possible user activity statuses
 */

export const USER_ACTIVITY_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
} as const;

export type UserActivityStatus = (typeof USER_ACTIVITY_STATUS)[keyof typeof USER_ACTIVITY_STATUS];

export const USER_ACTIVITY_STATUS_LABELS: Record<UserActivityStatus, string> = {
  [USER_ACTIVITY_STATUS.ACTIVE]: 'Active',
  [USER_ACTIVITY_STATUS.PENDING]: 'Pending',
  [USER_ACTIVITY_STATUS.COMPLETED]: 'Completed',
  [USER_ACTIVITY_STATUS.FAILED]: 'Failed',
  [USER_ACTIVITY_STATUS.CANCELLED]: 'Cancelled',
  [USER_ACTIVITY_STATUS.ARCHIVED]: 'Archived',
};

export const USER_ACTIVITY_STATUS_COLORS: Record<UserActivityStatus, string> = {
  [USER_ACTIVITY_STATUS.ACTIVE]: 'success',
  [USER_ACTIVITY_STATUS.PENDING]: 'warning',
  [USER_ACTIVITY_STATUS.COMPLETED]: 'info',
  [USER_ACTIVITY_STATUS.FAILED]: 'danger',
  [USER_ACTIVITY_STATUS.CANCELLED]: 'secondary',
  [USER_ACTIVITY_STATUS.ARCHIVED]: 'dark',
};

export const ACTIVE_ACTIVITY_STATUSES: UserActivityStatus[] = [
  USER_ACTIVITY_STATUS.ACTIVE,
  USER_ACTIVITY_STATUS.PENDING,
];

export const COMPLETED_ACTIVITY_STATUSES: UserActivityStatus[] = [USER_ACTIVITY_STATUS.COMPLETED];

export const FAILED_ACTIVITY_STATUSES: UserActivityStatus[] = [
  USER_ACTIVITY_STATUS.FAILED,
  USER_ACTIVITY_STATUS.CANCELLED,
];

export const ARCHIVED_ACTIVITY_STATUSES: UserActivityStatus[] = [USER_ACTIVITY_STATUS.ARCHIVED];

export const ALL_ACTIVITY_STATUSES: UserActivityStatus[] = [
  USER_ACTIVITY_STATUS.ACTIVE,
  USER_ACTIVITY_STATUS.PENDING,
  USER_ACTIVITY_STATUS.COMPLETED,
  USER_ACTIVITY_STATUS.FAILED,
  USER_ACTIVITY_STATUS.CANCELLED,
  USER_ACTIVITY_STATUS.ARCHIVED,
];

export function isActivityActive(status: UserActivityStatus): boolean {
  return ACTIVE_ACTIVITY_STATUSES.includes(status);
}

export function isActivityCompleted(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.COMPLETED;
}

export function isActivityFailed(status: UserActivityStatus): boolean {
  return FAILED_ACTIVITY_STATUSES.includes(status);
}

export function isActivityArchived(status: UserActivityStatus): boolean {
  return status === USER_ACTIVITY_STATUS.ARCHIVED;
}

export function isActivityFinished(status: UserActivityStatus): boolean {
  return (
    status === USER_ACTIVITY_STATUS.COMPLETED ||
    status === USER_ACTIVITY_STATUS.FAILED ||
    status === USER_ACTIVITY_STATUS.CANCELLED ||
    status === USER_ACTIVITY_STATUS.ARCHIVED
  );
}

export function getActivityStatusLabel(status: UserActivityStatus): string {
  return USER_ACTIVITY_STATUS_LABELS[status] || 'Unknown';
}

export function getActivityStatusColor(status: UserActivityStatus): string {
  return USER_ACTIVITY_STATUS_COLORS[status] || 'secondary';
}
