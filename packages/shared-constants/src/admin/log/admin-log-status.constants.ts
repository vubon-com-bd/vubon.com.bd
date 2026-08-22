/**
 * Admin Log Status Constants
 * Detailed log status definitions
 */

export const ADMIN_LOG_STATUS = {
  // Basic statuses
  SUCCESS: 'success',
  FAILED: 'failed',
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  ERROR: 'error',
  TIMEOUT: 'timeout',
  RETRY: 'retry',
  SKIPPED: 'skipped',
  ABORTED: 'aborted',

  // Extended statuses
  INITIATED: 'initiated',
  QUEUED: 'queued',
  RUNNING: 'running',
  PAUSED: 'paused',
  RESUMED: 'resumed',
  STOPPED: 'stopped',
  EXPIRED: 'expired',
  REJECTED: 'rejected',
  APPROVED: 'approved',
  VERIFIED: 'verified',
  VALIDATED: 'validated',
  AUTHENTICATED: 'authenticated',
  AUTHORIZED: 'authorized',
  DECLINED: 'declined',
  ACCEPTED: 'accepted',
  RECEIVED: 'received',
  PROCESSED: 'processed',

  // Log specific statuses
  LOGGED: 'logged',
  STORED: 'stored',
  ARCHIVED: 'archived',
  COMPRESSED: 'compressed',
  ROTATED: 'rotated',
  DELETED: 'deleted',
  CORRUPTED: 'corrupted',
  INCOMPLETE: 'incomplete',
  DUPLICATE: 'duplicate',
  IGNORED: 'ignored',
} as const;

export type AdminLogStatusDetail = (typeof ADMIN_LOG_STATUS)[keyof typeof ADMIN_LOG_STATUS];

export const ADMIN_LOG_STATUS_LABELS_DETAIL: Record<AdminLogStatusDetail, string> = {
  [ADMIN_LOG_STATUS.SUCCESS]: 'Success',
  [ADMIN_LOG_STATUS.FAILED]: 'Failed',
  [ADMIN_LOG_STATUS.PENDING]: 'Pending',
  [ADMIN_LOG_STATUS.PROCESSING]: 'Processing',
  [ADMIN_LOG_STATUS.COMPLETED]: 'Completed',
  [ADMIN_LOG_STATUS.CANCELLED]: 'Cancelled',
  [ADMIN_LOG_STATUS.ERROR]: 'Error',
  [ADMIN_LOG_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_LOG_STATUS.RETRY]: 'Retry',
  [ADMIN_LOG_STATUS.SKIPPED]: 'Skipped',
  [ADMIN_LOG_STATUS.ABORTED]: 'Aborted',
  [ADMIN_LOG_STATUS.INITIATED]: 'Initiated',
  [ADMIN_LOG_STATUS.QUEUED]: 'Queued',
  [ADMIN_LOG_STATUS.RUNNING]: 'Running',
  [ADMIN_LOG_STATUS.PAUSED]: 'Paused',
  [ADMIN_LOG_STATUS.RESUMED]: 'Resumed',
  [ADMIN_LOG_STATUS.STOPPED]: 'Stopped',
  [ADMIN_LOG_STATUS.EXPIRED]: 'Expired',
  [ADMIN_LOG_STATUS.REJECTED]: 'Rejected',
  [ADMIN_LOG_STATUS.APPROVED]: 'Approved',
  [ADMIN_LOG_STATUS.VERIFIED]: 'Verified',
  [ADMIN_LOG_STATUS.VALIDATED]: 'Validated',
  [ADMIN_LOG_STATUS.AUTHENTICATED]: 'Authenticated',
  [ADMIN_LOG_STATUS.AUTHORIZED]: 'Authorized',
  [ADMIN_LOG_STATUS.DECLINED]: 'Declined',
  [ADMIN_LOG_STATUS.ACCEPTED]: 'Accepted',
  [ADMIN_LOG_STATUS.RECEIVED]: 'Received',
  [ADMIN_LOG_STATUS.PROCESSED]: 'Processed',
  [ADMIN_LOG_STATUS.LOGGED]: 'Logged',
  [ADMIN_LOG_STATUS.STORED]: 'Stored',
  [ADMIN_LOG_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_LOG_STATUS.COMPRESSED]: 'Compressed',
  [ADMIN_LOG_STATUS.ROTATED]: 'Rotated',
  [ADMIN_LOG_STATUS.DELETED]: 'Deleted',
  [ADMIN_LOG_STATUS.CORRUPTED]: 'Corrupted',
  [ADMIN_LOG_STATUS.INCOMPLETE]: 'Incomplete',
  [ADMIN_LOG_STATUS.DUPLICATE]: 'Duplicate',
  [ADMIN_LOG_STATUS.IGNORED]: 'Ignored',
};

export const ADMIN_LOG_STATUS_COLORS_DETAIL: Record<AdminLogStatusDetail, string> = {
  [ADMIN_LOG_STATUS.SUCCESS]: '#10B981',
  [ADMIN_LOG_STATUS.FAILED]: '#EF4444',
  [ADMIN_LOG_STATUS.PENDING]: '#F59E0B',
  [ADMIN_LOG_STATUS.PROCESSING]: '#3B82F6',
  [ADMIN_LOG_STATUS.COMPLETED]: '#34D399',
  [ADMIN_LOG_STATUS.CANCELLED]: '#6B7280',
  [ADMIN_LOG_STATUS.ERROR]: '#DC2626',
  [ADMIN_LOG_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_LOG_STATUS.RETRY]: '#8B5CF6',
  [ADMIN_LOG_STATUS.SKIPPED]: '#9CA3AF',
  [ADMIN_LOG_STATUS.ABORTED]: '#7F1D1D',
  [ADMIN_LOG_STATUS.INITIATED]: '#93C5FD',
  [ADMIN_LOG_STATUS.QUEUED]: '#A7F3D0',
  [ADMIN_LOG_STATUS.RUNNING]: '#34D399',
  [ADMIN_LOG_STATUS.PAUSED]: '#FCD34D',
  [ADMIN_LOG_STATUS.RESUMED]: '#6EE7B7',
  [ADMIN_LOG_STATUS.STOPPED]: '#D1D5DB',
  [ADMIN_LOG_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_LOG_STATUS.REJECTED]: '#EF4444',
  [ADMIN_LOG_STATUS.APPROVED]: '#10B981',
  [ADMIN_LOG_STATUS.VERIFIED]: '#34D399',
  [ADMIN_LOG_STATUS.VALIDATED]: '#60A5FA',
  [ADMIN_LOG_STATUS.AUTHENTICATED]: '#818CF8',
  [ADMIN_LOG_STATUS.AUTHORIZED]: '#A78BFA',
  [ADMIN_LOG_STATUS.DECLINED]: '#F87171',
  [ADMIN_LOG_STATUS.ACCEPTED]: '#6EE7B7',
  [ADMIN_LOG_STATUS.RECEIVED]: '#93C5FD',
  [ADMIN_LOG_STATUS.PROCESSED]: '#34D399',
  [ADMIN_LOG_STATUS.LOGGED]: '#60A5FA',
  [ADMIN_LOG_STATUS.STORED]: '#34D399',
  [ADMIN_LOG_STATUS.ARCHIVED]: '#6B7280',
  [ADMIN_LOG_STATUS.COMPRESSED]: '#8B5CF6',
  [ADMIN_LOG_STATUS.ROTATED]: '#6366F1',
  [ADMIN_LOG_STATUS.DELETED]: '#EF4444',
  [ADMIN_LOG_STATUS.CORRUPTED]: '#DC2626',
  [ADMIN_LOG_STATUS.INCOMPLETE]: '#F59E0B',
  [ADMIN_LOG_STATUS.DUPLICATE]: '#F97316',
  [ADMIN_LOG_STATUS.IGNORED]: '#9CA3AF',
};

export const ADMIN_LOG_STATUS_GROUPS = {
  SUCCESS: [
    ADMIN_LOG_STATUS.SUCCESS,
    ADMIN_LOG_STATUS.COMPLETED,
    ADMIN_LOG_STATUS.APPROVED,
    ADMIN_LOG_STATUS.VERIFIED,
    ADMIN_LOG_STATUS.VALIDATED,
    ADMIN_LOG_STATUS.AUTHENTICATED,
    ADMIN_LOG_STATUS.AUTHORIZED,
    ADMIN_LOG_STATUS.ACCEPTED,
    ADMIN_LOG_STATUS.RECEIVED,
    ADMIN_LOG_STATUS.PROCESSED,
    ADMIN_LOG_STATUS.LOGGED,
    ADMIN_LOG_STATUS.STORED,
    ADMIN_LOG_STATUS.ARCHIVED,
    ADMIN_LOG_STATUS.COMPRESSED,
    ADMIN_LOG_STATUS.ROTATED,
  ] as AdminLogStatusDetail[],
  FAILURE: [
    ADMIN_LOG_STATUS.FAILED,
    ADMIN_LOG_STATUS.ERROR,
    ADMIN_LOG_STATUS.TIMEOUT,
    ADMIN_LOG_STATUS.CANCELLED,
    ADMIN_LOG_STATUS.ABORTED,
    ADMIN_LOG_STATUS.REJECTED,
    ADMIN_LOG_STATUS.DECLINED,
    ADMIN_LOG_STATUS.EXPIRED,
    ADMIN_LOG_STATUS.CORRUPTED,
    ADMIN_LOG_STATUS.INCOMPLETE,
    ADMIN_LOG_STATUS.DUPLICATE,
    ADMIN_LOG_STATUS.DELETED,
  ] as AdminLogStatusDetail[],
  PENDING: [
    ADMIN_LOG_STATUS.PENDING,
    ADMIN_LOG_STATUS.PROCESSING,
    ADMIN_LOG_STATUS.INITIATED,
    ADMIN_LOG_STATUS.QUEUED,
    ADMIN_LOG_STATUS.RUNNING,
  ] as AdminLogStatusDetail[],
  INTERMEDIATE: [
    ADMIN_LOG_STATUS.RETRY,
    ADMIN_LOG_STATUS.PAUSED,
    ADMIN_LOG_STATUS.RESUMED,
    ADMIN_LOG_STATUS.STOPPED,
    ADMIN_LOG_STATUS.SKIPPED,
    ADMIN_LOG_STATUS.IGNORED,
  ] as AdminLogStatusDetail[],
};

export function getAdminLogStatusLabel(status: AdminLogStatusDetail): string {
  return ADMIN_LOG_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminLogStatusColor(status: AdminLogStatusDetail): string {
  return ADMIN_LOG_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isSuccessStatus(status: AdminLogStatusDetail): boolean {
  return ADMIN_LOG_STATUS_GROUPS.SUCCESS.includes(status);
}

export function isFailureStatus(status: AdminLogStatusDetail): boolean {
  return ADMIN_LOG_STATUS_GROUPS.FAILURE.includes(status);
}

export function isPendingStatus(status: AdminLogStatusDetail): boolean {
  return ADMIN_LOG_STATUS_GROUPS.PENDING.includes(status);
}

export function isIntermediateStatus(status: AdminLogStatusDetail): boolean {
  return ADMIN_LOG_STATUS_GROUPS.INTERMEDIATE.includes(status);
}

export function isTerminalStatus(status: AdminLogStatusDetail): boolean {
  return isSuccessStatus(status) || isFailureStatus(status);
}

export function isActiveStatus(status: AdminLogStatusDetail): boolean {
  return isPendingStatus(status) || isIntermediateStatus(status);
}

export function getStatusPriority(status: AdminLogStatusDetail): number {
  const priorityMap: Record<AdminLogStatusDetail, number> = {
    [ADMIN_LOG_STATUS.SUCCESS]: 1,
    [ADMIN_LOG_STATUS.COMPLETED]: 1,
    [ADMIN_LOG_STATUS.APPROVED]: 1,
    [ADMIN_LOG_STATUS.VERIFIED]: 1,
    [ADMIN_LOG_STATUS.VALIDATED]: 1,
    [ADMIN_LOG_STATUS.AUTHENTICATED]: 1,
    [ADMIN_LOG_STATUS.AUTHORIZED]: 1,
    [ADMIN_LOG_STATUS.ACCEPTED]: 1,
    [ADMIN_LOG_STATUS.RECEIVED]: 1,
    [ADMIN_LOG_STATUS.PROCESSED]: 1,
    [ADMIN_LOG_STATUS.LOGGED]: 1,
    [ADMIN_LOG_STATUS.STORED]: 1,
    [ADMIN_LOG_STATUS.ARCHIVED]: 1,
    [ADMIN_LOG_STATUS.COMPRESSED]: 1,
    [ADMIN_LOG_STATUS.ROTATED]: 1,
    [ADMIN_LOG_STATUS.FAILED]: 5,
    [ADMIN_LOG_STATUS.ERROR]: 5,
    [ADMIN_LOG_STATUS.TIMEOUT]: 4,
    [ADMIN_LOG_STATUS.CANCELLED]: 3,
    [ADMIN_LOG_STATUS.ABORTED]: 4,
    [ADMIN_LOG_STATUS.REJECTED]: 5,
    [ADMIN_LOG_STATUS.DECLINED]: 5,
    [ADMIN_LOG_STATUS.EXPIRED]: 3,
    [ADMIN_LOG_STATUS.CORRUPTED]: 5,
    [ADMIN_LOG_STATUS.INCOMPLETE]: 4,
    [ADMIN_LOG_STATUS.DUPLICATE]: 3,
    [ADMIN_LOG_STATUS.DELETED]: 3,
    [ADMIN_LOG_STATUS.PENDING]: 2,
    [ADMIN_LOG_STATUS.PROCESSING]: 2,
    [ADMIN_LOG_STATUS.INITIATED]: 2,
    [ADMIN_LOG_STATUS.QUEUED]: 2,
    [ADMIN_LOG_STATUS.RUNNING]: 2,
    [ADMIN_LOG_STATUS.RETRY]: 3,
    [ADMIN_LOG_STATUS.PAUSED]: 3,
    [ADMIN_LOG_STATUS.RESUMED]: 2,
    [ADMIN_LOG_STATUS.STOPPED]: 3,
    [ADMIN_LOG_STATUS.SKIPPED]: 3,
    [ADMIN_LOG_STATUS.IGNORED]: 3,
  };
  return priorityMap[status] || 3;
}

export function getAdminLogStatuses(): AdminLogStatusDetail[] {
  return Object.values(ADMIN_LOG_STATUS);
}

export function getSuccessStatuses(): AdminLogStatusDetail[] {
  return ADMIN_LOG_STATUS_GROUPS.SUCCESS;
}

export function getFailureStatuses(): AdminLogStatusDetail[] {
  return ADMIN_LOG_STATUS_GROUPS.FAILURE;
}

export function getPendingStatuses(): AdminLogStatusDetail[] {
  return ADMIN_LOG_STATUS_GROUPS.PENDING;
}

export function getIntermediateStatuses(): AdminLogStatusDetail[] {
  return ADMIN_LOG_STATUS_GROUPS.INTERMEDIATE;
}
