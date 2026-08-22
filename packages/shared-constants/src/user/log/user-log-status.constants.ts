/**
 * User Log Status Constants
 * Defines all possible user log statuses
 */

export const USER_LOG_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  PROCESSED: 'processed',
  FAILED: 'failed',
  ARCHIVED: 'archived',
} as const;

export type UserLogStatus = (typeof USER_LOG_STATUS)[keyof typeof USER_LOG_STATUS];

export const USER_LOG_STATUS_LABELS: Record<UserLogStatus, string> = {
  [USER_LOG_STATUS.ACTIVE]: 'Active',
  [USER_LOG_STATUS.PENDING]: 'Pending',
  [USER_LOG_STATUS.PROCESSED]: 'Processed',
  [USER_LOG_STATUS.FAILED]: 'Failed',
  [USER_LOG_STATUS.ARCHIVED]: 'Archived',
};

export const USER_LOG_STATUS_COLORS: Record<UserLogStatus, string> = {
  [USER_LOG_STATUS.ACTIVE]: 'success',
  [USER_LOG_STATUS.PENDING]: 'warning',
  [USER_LOG_STATUS.PROCESSED]: 'info',
  [USER_LOG_STATUS.FAILED]: 'danger',
  [USER_LOG_STATUS.ARCHIVED]: 'dark',
};

export const ACTIVE_LOG_STATUSES: UserLogStatus[] = [
  USER_LOG_STATUS.ACTIVE,
  USER_LOG_STATUS.PENDING,
];

export const COMPLETED_LOG_STATUSES: UserLogStatus[] = [USER_LOG_STATUS.PROCESSED];

export const FAILED_LOG_STATUSES: UserLogStatus[] = [USER_LOG_STATUS.FAILED];

export const ARCHIVED_LOG_STATUSES: UserLogStatus[] = [USER_LOG_STATUS.ARCHIVED];

export function isLogActive(status: UserLogStatus): boolean {
  return ACTIVE_LOG_STATUSES.includes(status);
}

export function isLogProcessed(status: UserLogStatus): boolean {
  return status === USER_LOG_STATUS.PROCESSED;
}

export function isLogFailed(status: UserLogStatus): boolean {
  return status === USER_LOG_STATUS.FAILED;
}

export function isLogArchived(status: UserLogStatus): boolean {
  return status === USER_LOG_STATUS.ARCHIVED;
}

export function isLogFinished(status: UserLogStatus): boolean {
  return (
    status === USER_LOG_STATUS.PROCESSED ||
    status === USER_LOG_STATUS.FAILED ||
    status === USER_LOG_STATUS.ARCHIVED
  );
}

export function getLogStatusLabel(status: UserLogStatus): string {
  return USER_LOG_STATUS_LABELS[status] || 'Unknown';
}

export function getLogStatusColor(status: UserLogStatus): string {
  return USER_LOG_STATUS_COLORS[status] || 'secondary';
}
