/**
 * Admin Verification Status Constants
 * Detailed verification status definitions
 */

export const ADMIN_VERIFICATION_STATUS = {
  // Initial statuses
  INITIATED: 'initiated',
  CREATED: 'created',
  REQUESTED: 'requested',

  // Pending statuses
  PENDING: 'pending',
  PENDING_USER: 'pending_user',
  PENDING_SYSTEM: 'pending_system',
  PENDING_REVIEW: 'pending_review',
  PENDING_APPROVAL: 'pending_approval',
  PENDING_INPUT: 'pending_input',
  PENDING_DOCUMENT: 'pending_document',
  PENDING_VERIFICATION: 'pending_verification',

  // Processing statuses
  PROCESSING: 'processing',
  IN_PROGRESS: 'in_progress',
  AWAITING: 'awaiting',
  SUBMITTED: 'submitted',

  // Review statuses
  REVIEWING: 'reviewing',
  UNDER_REVIEW: 'under_review',
  IN_REVIEW: 'in_review',
  REVIEWED: 'reviewed',

  // Success statuses
  VERIFIED: 'verified',
  APPROVED: 'approved',
  VALIDATED: 'validated',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  SUCCESS: 'success',

  // Failure statuses
  FAILED: 'failed',
  REJECTED: 'rejected',
  DECLINED: 'declined',
  DENIED: 'denied',
  INVALID: 'invalid',
  INVALID_DATA: 'invalid_data',
  INVALID_DOCUMENT: 'invalid_document',

  // Expired statuses
  EXPIRED: 'expired',
  TIMEOUT: 'timeout',
  STALE: 'stale',
  OUTDATED: 'outdated',

  // Canceled statuses
  CANCELLED: 'cancelled',
  ABORTED: 'aborted',
  STOPPED: 'stopped',

  // Problem statuses
  ERROR: 'error',
  CORRUPTED: 'corrupted',
  INCOMPLETE: 'incomplete',
  AMBIGUOUS: 'ambiguous',
  UNCLEAR: 'unclear',

  // Special statuses
  SKIPPED: 'skipped',
  DEFERRED: 'deferred',
  DEFERRED_REVIEW: 'deferred_review',
  SUSPENDED: 'suspended',
  HOLD: 'hold',
  ON_HOLD: 'on_hold',

  // Final statuses
  CLOSED: 'closed',
  RESOLVED: 'resolved',
  ARCHIVED: 'archived',
} as const;

export type AdminverificationStatusDetail =
  (typeof ADMIN_VERIFICATION_STATUS)[keyof typeof ADMIN_VERIFICATION_STATUS];

export const ADMIN_VERIFICATION_STATUS_LABELS_DETAIL: Record<
  AdminverificationStatusDetail,
  string
> = {
  // Initial statuses
  [ADMIN_VERIFICATION_STATUS.INITIATED]: 'Initiated',
  [ADMIN_VERIFICATION_STATUS.CREATED]: 'Created',
  [ADMIN_VERIFICATION_STATUS.REQUESTED]: 'Requested',

  // Pending statuses
  [ADMIN_VERIFICATION_STATUS.PENDING]: 'Pending',
  [ADMIN_VERIFICATION_STATUS.PENDING_USER]: 'Pending User Action',
  [ADMIN_VERIFICATION_STATUS.PENDING_SYSTEM]: 'Pending System Action',
  [ADMIN_VERIFICATION_STATUS.PENDING_REVIEW]: 'Pending Review',
  [ADMIN_VERIFICATION_STATUS.PENDING_APPROVAL]: 'Pending Approval',
  [ADMIN_VERIFICATION_STATUS.PENDING_INPUT]: 'Pending Input',
  [ADMIN_VERIFICATION_STATUS.PENDING_DOCUMENT]: 'Pending Document',
  [ADMIN_VERIFICATION_STATUS.PENDING_VERIFICATION]: 'Pending Verification',

  // Processing statuses
  [ADMIN_VERIFICATION_STATUS.PROCESSING]: 'Processing',
  [ADMIN_VERIFICATION_STATUS.IN_PROGRESS]: 'In Progress',
  [ADMIN_VERIFICATION_STATUS.AWAITING]: 'Awaiting',
  [ADMIN_VERIFICATION_STATUS.SUBMITTED]: 'Submitted',

  // Review statuses
  [ADMIN_VERIFICATION_STATUS.REVIEWING]: 'Reviewing',
  [ADMIN_VERIFICATION_STATUS.UNDER_REVIEW]: 'Under Review',
  [ADMIN_VERIFICATION_STATUS.IN_REVIEW]: 'In Review',
  [ADMIN_VERIFICATION_STATUS.REVIEWED]: 'Reviewed',

  // Success statuses
  [ADMIN_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [ADMIN_VERIFICATION_STATUS.APPROVED]: 'Approved',
  [ADMIN_VERIFICATION_STATUS.VALIDATED]: 'Validated',
  [ADMIN_VERIFICATION_STATUS.CONFIRMED]: 'Confirmed',
  [ADMIN_VERIFICATION_STATUS.COMPLETED]: 'Completed',
  [ADMIN_VERIFICATION_STATUS.SUCCESS]: 'Success',

  // Failure statuses
  [ADMIN_VERIFICATION_STATUS.FAILED]: 'Failed',
  [ADMIN_VERIFICATION_STATUS.REJECTED]: 'Rejected',
  [ADMIN_VERIFICATION_STATUS.DECLINED]: 'Declined',
  [ADMIN_VERIFICATION_STATUS.DENIED]: 'Denied',
  [ADMIN_VERIFICATION_STATUS.INVALID]: 'Invalid',
  [ADMIN_VERIFICATION_STATUS.INVALID_DATA]: 'Invalid Data',
  [ADMIN_VERIFICATION_STATUS.INVALID_DOCUMENT]: 'Invalid Document',

  // Expired statuses
  [ADMIN_VERIFICATION_STATUS.EXPIRED]: 'Expired',
  [ADMIN_VERIFICATION_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_VERIFICATION_STATUS.STALE]: 'Stale',
  [ADMIN_VERIFICATION_STATUS.OUTDATED]: 'Outdated',

  // Canceled statuses
  [ADMIN_VERIFICATION_STATUS.CANCELLED]: 'Cancelled',
  [ADMIN_VERIFICATION_STATUS.ABORTED]: 'Aborted',
  [ADMIN_VERIFICATION_STATUS.STOPPED]: 'Stopped',

  // Problem statuses
  [ADMIN_VERIFICATION_STATUS.ERROR]: 'Error',
  [ADMIN_VERIFICATION_STATUS.CORRUPTED]: 'Corrupted',
  [ADMIN_VERIFICATION_STATUS.INCOMPLETE]: 'Incomplete',
  [ADMIN_VERIFICATION_STATUS.AMBIGUOUS]: 'Ambiguous',
  [ADMIN_VERIFICATION_STATUS.UNCLEAR]: 'Unclear',

  // Special statuses
  [ADMIN_VERIFICATION_STATUS.SKIPPED]: 'Skipped',
  [ADMIN_VERIFICATION_STATUS.DEFERRED]: 'Deferred',
  [ADMIN_VERIFICATION_STATUS.DEFERRED_REVIEW]: 'Deferred Review',
  [ADMIN_VERIFICATION_STATUS.SUSPENDED]: 'Suspended',
  [ADMIN_VERIFICATION_STATUS.HOLD]: 'On Hold',
  [ADMIN_VERIFICATION_STATUS.ON_HOLD]: 'On Hold',

  // Final statuses
  [ADMIN_VERIFICATION_STATUS.CLOSED]: 'Closed',
  [ADMIN_VERIFICATION_STATUS.RESOLVED]: 'Resolved',
  [ADMIN_VERIFICATION_STATUS.ARCHIVED]: 'Archived',
};

export const ADMIN_VERIFICATION_STATUS_COLORS_DETAIL: Record<
  AdminverificationStatusDetail,
  string
> = {
  // Initial statuses
  [ADMIN_VERIFICATION_STATUS.INITIATED]: '#93C5FD',
  [ADMIN_VERIFICATION_STATUS.CREATED]: '#A7F3D0',
  [ADMIN_VERIFICATION_STATUS.REQUESTED]: '#FCD34D',

  // Pending statuses
  [ADMIN_VERIFICATION_STATUS.PENDING]: '#F59E0B',
  [ADMIN_VERIFICATION_STATUS.PENDING_USER]: '#FCD34D',
  [ADMIN_VERIFICATION_STATUS.PENDING_SYSTEM]: '#93C5FD',
  [ADMIN_VERIFICATION_STATUS.PENDING_REVIEW]: '#6366F1',
  [ADMIN_VERIFICATION_STATUS.PENDING_APPROVAL]: '#8B5CF6',
  [ADMIN_VERIFICATION_STATUS.PENDING_INPUT]: '#FDE68A',
  [ADMIN_VERIFICATION_STATUS.PENDING_DOCUMENT]: '#FCD34D',
  [ADMIN_VERIFICATION_STATUS.PENDING_VERIFICATION]: '#FCD34D',

  // Processing statuses
  [ADMIN_VERIFICATION_STATUS.PROCESSING]: '#3B82F6',
  [ADMIN_VERIFICATION_STATUS.IN_PROGRESS]: '#60A5FA',
  [ADMIN_VERIFICATION_STATUS.AWAITING]: '#93C5FD',
  [ADMIN_VERIFICATION_STATUS.SUBMITTED]: '#A7F3D0',

  // Review statuses
  [ADMIN_VERIFICATION_STATUS.REVIEWING]: '#6366F1',
  [ADMIN_VERIFICATION_STATUS.UNDER_REVIEW]: '#818CF8',
  [ADMIN_VERIFICATION_STATUS.IN_REVIEW]: '#A78BFA',
  [ADMIN_VERIFICATION_STATUS.REVIEWED]: '#8B5CF6',

  // Success statuses
  [ADMIN_VERIFICATION_STATUS.VERIFIED]: '#10B981',
  [ADMIN_VERIFICATION_STATUS.APPROVED]: '#34D399',
  [ADMIN_VERIFICATION_STATUS.VALIDATED]: '#6EE7B7',
  [ADMIN_VERIFICATION_STATUS.CONFIRMED]: '#34D399',
  [ADMIN_VERIFICATION_STATUS.COMPLETED]: '#10B981',
  [ADMIN_VERIFICATION_STATUS.SUCCESS]: '#10B981',

  // Failure statuses
  [ADMIN_VERIFICATION_STATUS.FAILED]: '#EF4444',
  [ADMIN_VERIFICATION_STATUS.REJECTED]: '#DC2626',
  [ADMIN_VERIFICATION_STATUS.DECLINED]: '#EF4444',
  [ADMIN_VERIFICATION_STATUS.DENIED]: '#DC2626',
  [ADMIN_VERIFICATION_STATUS.INVALID]: '#F87171',
  [ADMIN_VERIFICATION_STATUS.INVALID_DATA]: '#F87171',
  [ADMIN_VERIFICATION_STATUS.INVALID_DOCUMENT]: '#F87171',

  // Expired statuses
  [ADMIN_VERIFICATION_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_VERIFICATION_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_VERIFICATION_STATUS.STALE]: '#9CA3AF',
  [ADMIN_VERIFICATION_STATUS.OUTDATED]: '#9CA3AF',

  // Canceled statuses
  [ADMIN_VERIFICATION_STATUS.CANCELLED]: '#6B7280',
  [ADMIN_VERIFICATION_STATUS.ABORTED]: '#7F1D1D',
  [ADMIN_VERIFICATION_STATUS.STOPPED]: '#6B7280',

  // Problem statuses
  [ADMIN_VERIFICATION_STATUS.ERROR]: '#DC2626',
  [ADMIN_VERIFICATION_STATUS.CORRUPTED]: '#DC2626',
  [ADMIN_VERIFICATION_STATUS.INCOMPLETE]: '#F59E0B',
  [ADMIN_VERIFICATION_STATUS.AMBIGUOUS]: '#F59E0B',
  [ADMIN_VERIFICATION_STATUS.UNCLEAR]: '#F59E0B',

  // Special statuses
  [ADMIN_VERIFICATION_STATUS.SKIPPED]: '#9CA3AF',
  [ADMIN_VERIFICATION_STATUS.DEFERRED]: '#FCD34D',
  [ADMIN_VERIFICATION_STATUS.DEFERRED_REVIEW]: '#FCD34D',
  [ADMIN_VERIFICATION_STATUS.SUSPENDED]: '#F97316',
  [ADMIN_VERIFICATION_STATUS.HOLD]: '#FCD34D',
  [ADMIN_VERIFICATION_STATUS.ON_HOLD]: '#FCD34D',

  // Final statuses
  [ADMIN_VERIFICATION_STATUS.CLOSED]: '#6B7280',
  [ADMIN_VERIFICATION_STATUS.RESOLVED]: '#34D399',
  [ADMIN_VERIFICATION_STATUS.ARCHIVED]: '#9CA3AF',
};

export const ADMIN_VERIFICATION_STATUS_GROUPS = {
  INITIAL: [
    ADMIN_VERIFICATION_STATUS.INITIATED,
    ADMIN_VERIFICATION_STATUS.CREATED,
    ADMIN_VERIFICATION_STATUS.REQUESTED,
  ] as AdminverificationStatusDetail[],
  PENDING: [
    ADMIN_VERIFICATION_STATUS.PENDING,
    ADMIN_VERIFICATION_STATUS.PENDING_USER,
    ADMIN_VERIFICATION_STATUS.PENDING_SYSTEM,
    ADMIN_VERIFICATION_STATUS.PENDING_REVIEW,
    ADMIN_VERIFICATION_STATUS.PENDING_APPROVAL,
    ADMIN_VERIFICATION_STATUS.PENDING_INPUT,
    ADMIN_VERIFICATION_STATUS.PENDING_DOCUMENT,
    ADMIN_VERIFICATION_STATUS.PENDING_VERIFICATION,
  ] as AdminverificationStatusDetail[],
  PROCESSING: [
    ADMIN_VERIFICATION_STATUS.PROCESSING,
    ADMIN_VERIFICATION_STATUS.IN_PROGRESS,
    ADMIN_VERIFICATION_STATUS.AWAITING,
    ADMIN_VERIFICATION_STATUS.SUBMITTED,
  ] as AdminverificationStatusDetail[],
  REVIEW: [
    ADMIN_VERIFICATION_STATUS.REVIEWING,
    ADMIN_VERIFICATION_STATUS.UNDER_REVIEW,
    ADMIN_VERIFICATION_STATUS.IN_REVIEW,
    ADMIN_VERIFICATION_STATUS.REVIEWED,
  ] as AdminverificationStatusDetail[],
  SUCCESS: [
    ADMIN_VERIFICATION_STATUS.VERIFIED,
    ADMIN_VERIFICATION_STATUS.APPROVED,
    ADMIN_VERIFICATION_STATUS.VALIDATED,
    ADMIN_VERIFICATION_STATUS.CONFIRMED,
    ADMIN_VERIFICATION_STATUS.COMPLETED,
    ADMIN_VERIFICATION_STATUS.SUCCESS,
  ] as AdminverificationStatusDetail[],
  FAILURE: [
    ADMIN_VERIFICATION_STATUS.FAILED,
    ADMIN_VERIFICATION_STATUS.REJECTED,
    ADMIN_VERIFICATION_STATUS.DECLINED,
    ADMIN_VERIFICATION_STATUS.DENIED,
    ADMIN_VERIFICATION_STATUS.INVALID,
    ADMIN_VERIFICATION_STATUS.INVALID_DATA,
    ADMIN_VERIFICATION_STATUS.INVALID_DOCUMENT,
  ] as AdminverificationStatusDetail[],
  EXPIRED: [
    ADMIN_VERIFICATION_STATUS.EXPIRED,
    ADMIN_VERIFICATION_STATUS.TIMEOUT,
    ADMIN_VERIFICATION_STATUS.STALE,
    ADMIN_VERIFICATION_STATUS.OUTDATED,
  ] as AdminverificationStatusDetail[],
  CANCELLED: [
    ADMIN_VERIFICATION_STATUS.CANCELLED,
    ADMIN_VERIFICATION_STATUS.ABORTED,
    ADMIN_VERIFICATION_STATUS.STOPPED,
  ] as AdminverificationStatusDetail[],
  PROBLEM: [
    ADMIN_VERIFICATION_STATUS.ERROR,
    ADMIN_VERIFICATION_STATUS.CORRUPTED,
    ADMIN_VERIFICATION_STATUS.INCOMPLETE,
    ADMIN_VERIFICATION_STATUS.AMBIGUOUS,
    ADMIN_VERIFICATION_STATUS.UNCLEAR,
  ] as AdminverificationStatusDetail[],
  SPECIAL: [
    ADMIN_VERIFICATION_STATUS.SKIPPED,
    ADMIN_VERIFICATION_STATUS.DEFERRED,
    ADMIN_VERIFICATION_STATUS.DEFERRED_REVIEW,
    ADMIN_VERIFICATION_STATUS.SUSPENDED,
    ADMIN_VERIFICATION_STATUS.HOLD,
    ADMIN_VERIFICATION_STATUS.ON_HOLD,
  ] as AdminverificationStatusDetail[],
  FINAL: [
    ADMIN_VERIFICATION_STATUS.CLOSED,
    ADMIN_VERIFICATION_STATUS.RESOLVED,
    ADMIN_VERIFICATION_STATUS.ARCHIVED,
  ] as AdminverificationStatusDetail[],
};

export function getAdminverificationStatusLabel(status: AdminverificationStatusDetail): string {
  return ADMIN_VERIFICATION_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminverificationStatusColor(status: AdminverificationStatusDetail): string {
  return ADMIN_VERIFICATION_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isAdminverificationInitialStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.INITIAL.includes(status);
}

export function isAdminverificationPendingStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PENDING.includes(status);
}

export function isAdminverificationProcessingStatus(
  status: AdminverificationStatusDetail
): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PROCESSING.includes(status);
}

export function isAdminverificationReviewStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.REVIEW.includes(status);
}

export function isAdminverificationSuccessStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.SUCCESS.includes(status);
}

export function isAdminverificationFailureStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.FAILURE.includes(status);
}

export function isAdminverificationExpiredStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.EXPIRED.includes(status);
}

export function isAdminverificationCancelledStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.CANCELLED.includes(status);
}

export function isAdminverificationProblemStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PROBLEM.includes(status);
}

export function isAdminverificationSpecialStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.SPECIAL.includes(status);
}

export function isAdminverificationFinalStatus(status: AdminverificationStatusDetail): boolean {
  return ADMIN_VERIFICATION_STATUS_GROUPS.FINAL.includes(status);
}

export function isAdminverificationActiveStatus(status: AdminverificationStatusDetail): boolean {
  return (
    !isAdminverificationFinalStatus(status) &&
    !isAdminverificationCancelledStatus(status) &&
    !isAdminverificationExpiredStatus(status) &&
    !isAdminverificationFailureStatus(status)
  );
}

export function isAdminverificationTerminalStatus(status: AdminverificationStatusDetail): boolean {
  return (
    isAdminverificationFinalStatus(status) ||
    isAdminverificationCancelledStatus(status) ||
    isAdminverificationExpiredStatus(status) ||
    isAdminverificationFailureStatus(status) ||
    isAdminverificationSuccessStatus(status)
  );
}

export function isAdminverificationResolvableStatus(
  status: AdminverificationStatusDetail
): boolean {
  return (
    isAdminverificationPendingStatus(status) ||
    isAdminverificationProcessingStatus(status) ||
    isAdminverificationReviewStatus(status) ||
    isAdminverificationProblemStatus(status) ||
    isAdminverificationSpecialStatus(status)
  );
}

export function getAdminverificationStatusPriority(status: AdminverificationStatusDetail): number {
  const priorityMap: Record<AdminverificationStatusDetail, number> = {
    [ADMIN_VERIFICATION_STATUS.INITIATED]: 1,
    [ADMIN_VERIFICATION_STATUS.CREATED]: 1,
    [ADMIN_VERIFICATION_STATUS.REQUESTED]: 1,
    [ADMIN_VERIFICATION_STATUS.PENDING]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_USER]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_SYSTEM]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_REVIEW]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_APPROVAL]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_INPUT]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_DOCUMENT]: 2,
    [ADMIN_VERIFICATION_STATUS.PENDING_VERIFICATION]: 2,
    [ADMIN_VERIFICATION_STATUS.PROCESSING]: 3,
    [ADMIN_VERIFICATION_STATUS.IN_PROGRESS]: 3,
    [ADMIN_VERIFICATION_STATUS.AWAITING]: 3,
    [ADMIN_VERIFICATION_STATUS.SUBMITTED]: 3,
    [ADMIN_VERIFICATION_STATUS.REVIEWING]: 4,
    [ADMIN_VERIFICATION_STATUS.UNDER_REVIEW]: 4,
    [ADMIN_VERIFICATION_STATUS.IN_REVIEW]: 4,
    [ADMIN_VERIFICATION_STATUS.REVIEWED]: 4,
    [ADMIN_VERIFICATION_STATUS.VERIFIED]: 5,
    [ADMIN_VERIFICATION_STATUS.APPROVED]: 5,
    [ADMIN_VERIFICATION_STATUS.VALIDATED]: 5,
    [ADMIN_VERIFICATION_STATUS.CONFIRMED]: 5,
    [ADMIN_VERIFICATION_STATUS.COMPLETED]: 5,
    [ADMIN_VERIFICATION_STATUS.SUCCESS]: 5,
    [ADMIN_VERIFICATION_STATUS.FAILED]: 6,
    [ADMIN_VERIFICATION_STATUS.REJECTED]: 6,
    [ADMIN_VERIFICATION_STATUS.DECLINED]: 6,
    [ADMIN_VERIFICATION_STATUS.DENIED]: 6,
    [ADMIN_VERIFICATION_STATUS.INVALID]: 6,
    [ADMIN_VERIFICATION_STATUS.INVALID_DATA]: 6,
    [ADMIN_VERIFICATION_STATUS.INVALID_DOCUMENT]: 6,
    [ADMIN_VERIFICATION_STATUS.EXPIRED]: 7,
    [ADMIN_VERIFICATION_STATUS.TIMEOUT]: 7,
    [ADMIN_VERIFICATION_STATUS.STALE]: 7,
    [ADMIN_VERIFICATION_STATUS.OUTDATED]: 7,
    [ADMIN_VERIFICATION_STATUS.CANCELLED]: 8,
    [ADMIN_VERIFICATION_STATUS.ABORTED]: 8,
    [ADMIN_VERIFICATION_STATUS.STOPPED]: 8,
    [ADMIN_VERIFICATION_STATUS.ERROR]: 9,
    [ADMIN_VERIFICATION_STATUS.CORRUPTED]: 9,
    [ADMIN_VERIFICATION_STATUS.INCOMPLETE]: 9,
    [ADMIN_VERIFICATION_STATUS.AMBIGUOUS]: 9,
    [ADMIN_VERIFICATION_STATUS.UNCLEAR]: 9,
    [ADMIN_VERIFICATION_STATUS.SKIPPED]: 4,
    [ADMIN_VERIFICATION_STATUS.DEFERRED]: 4,
    [ADMIN_VERIFICATION_STATUS.DEFERRED_REVIEW]: 4,
    [ADMIN_VERIFICATION_STATUS.SUSPENDED]: 4,
    [ADMIN_VERIFICATION_STATUS.HOLD]: 4,
    [ADMIN_VERIFICATION_STATUS.ON_HOLD]: 4,
    [ADMIN_VERIFICATION_STATUS.CLOSED]: 10,
    [ADMIN_VERIFICATION_STATUS.RESOLVED]: 10,
    [ADMIN_VERIFICATION_STATUS.ARCHIVED]: 10,
  };
  return priorityMap[status] || 3;
}

export function getAdminverificationStatuses(): AdminverificationStatusDetail[] {
  return Object.values(ADMIN_VERIFICATION_STATUS);
}

export function getAdminverificationInitialStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.INITIAL;
}

export function getAdminverificationPendingStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PENDING;
}

export function getAdminverificationProcessingStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PROCESSING;
}

export function getAdminverificationReviewStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.REVIEW;
}

export function getAdminverificationSuccessStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.SUCCESS;
}

export function getAdminverificationFailureStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.FAILURE;
}

export function getAdminverificationExpiredStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.EXPIRED;
}

export function getAdminverificationCancelledStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.CANCELLED;
}

export function getAdminverificationProblemStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.PROBLEM;
}

export function getAdminverificationSpecialStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.SPECIAL;
}

export function getAdminverificationFinalStatuses(): AdminverificationStatusDetail[] {
  return ADMIN_VERIFICATION_STATUS_GROUPS.FINAL;
}
