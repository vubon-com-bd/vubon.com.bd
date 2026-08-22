/**
 * Admin Notification Status Constants
 * Detailed notification status definitions
 */

export const ADMIN_NOTIFICATION_STATUS = {
  // Lifecycle statuses
  CREATED: 'created',
  INITIALIZED: 'initialized',
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  QUEUED: 'queued',
  PROCESSING: 'processing',
  SENT: 'sent',

  // Delivery statuses
  DELIVERED: 'delivered',
  FAILED: 'failed',
  BOUNCED: 'bounced',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  RETRY: 'retry',

  // Read statuses
  UNREAD: 'unread',
  READ: 'read',
  VIEWED: 'viewed',
  CLICKED: 'clicked',
  ACTIONED: 'actioned',

  // Final statuses
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  SUPPRESSED: 'suppressed',

  // Error statuses
  ERROR: 'error',
  TIMEOUT: 'timeout',
  MALFORMED: 'malformed',
  INVALID: 'invalid',
  SPAM: 'spam',
} as const;

export type AdminNotificationStatusDetail =
  (typeof ADMIN_NOTIFICATION_STATUS)[keyof typeof ADMIN_NOTIFICATION_STATUS];

export const ADMIN_NOTIFICATION_STATUS_LABELS_DETAIL: Record<
  AdminNotificationStatusDetail,
  string
> = {
  // Lifecycle statuses
  [ADMIN_NOTIFICATION_STATUS.CREATED]: 'Created',
  [ADMIN_NOTIFICATION_STATUS.INITIALIZED]: 'Initialized',
  [ADMIN_NOTIFICATION_STATUS.DRAFT]: 'Draft',
  [ADMIN_NOTIFICATION_STATUS.SCHEDULED]: 'Scheduled',
  [ADMIN_NOTIFICATION_STATUS.QUEUED]: 'Queued',
  [ADMIN_NOTIFICATION_STATUS.PROCESSING]: 'Processing',
  [ADMIN_NOTIFICATION_STATUS.SENT]: 'Sent',

  // Delivery statuses
  [ADMIN_NOTIFICATION_STATUS.DELIVERED]: 'Delivered',
  [ADMIN_NOTIFICATION_STATUS.FAILED]: 'Failed',
  [ADMIN_NOTIFICATION_STATUS.BOUNCED]: 'Bounced',
  [ADMIN_NOTIFICATION_STATUS.REJECTED]: 'Rejected',
  [ADMIN_NOTIFICATION_STATUS.EXPIRED]: 'Expired',
  [ADMIN_NOTIFICATION_STATUS.CANCELLED]: 'Cancelled',
  [ADMIN_NOTIFICATION_STATUS.RETRY]: 'Retry',

  // Read statuses
  [ADMIN_NOTIFICATION_STATUS.UNREAD]: 'Unread',
  [ADMIN_NOTIFICATION_STATUS.READ]: 'Read',
  [ADMIN_NOTIFICATION_STATUS.VIEWED]: 'Viewed',
  [ADMIN_NOTIFICATION_STATUS.CLICKED]: 'Clicked',
  [ADMIN_NOTIFICATION_STATUS.ACTIONED]: 'Actioned',

  // Final statuses
  [ADMIN_NOTIFICATION_STATUS.COMPLETED]: 'Completed',
  [ADMIN_NOTIFICATION_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_NOTIFICATION_STATUS.DELETED]: 'Deleted',
  [ADMIN_NOTIFICATION_STATUS.SUPPRESSED]: 'Suppressed',

  // Error statuses
  [ADMIN_NOTIFICATION_STATUS.ERROR]: 'Error',
  [ADMIN_NOTIFICATION_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_NOTIFICATION_STATUS.MALFORMED]: 'Malformed',
  [ADMIN_NOTIFICATION_STATUS.INVALID]: 'Invalid',
  [ADMIN_NOTIFICATION_STATUS.SPAM]: 'Spam',
};

export const ADMIN_NOTIFICATION_STATUS_COLORS_DETAIL: Record<
  AdminNotificationStatusDetail,
  string
> = {
  // Lifecycle statuses
  [ADMIN_NOTIFICATION_STATUS.CREATED]: '#93C5FD',
  [ADMIN_NOTIFICATION_STATUS.INITIALIZED]: '#60A5FA',
  [ADMIN_NOTIFICATION_STATUS.DRAFT]: '#9CA3AF',
  [ADMIN_NOTIFICATION_STATUS.SCHEDULED]: '#6366F1',
  [ADMIN_NOTIFICATION_STATUS.QUEUED]: '#8B5CF6',
  [ADMIN_NOTIFICATION_STATUS.PROCESSING]: '#A78BFA',
  [ADMIN_NOTIFICATION_STATUS.SENT]: '#3B82F6',

  // Delivery statuses
  [ADMIN_NOTIFICATION_STATUS.DELIVERED]: '#10B981',
  [ADMIN_NOTIFICATION_STATUS.FAILED]: '#EF4444',
  [ADMIN_NOTIFICATION_STATUS.BOUNCED]: '#DC2626',
  [ADMIN_NOTIFICATION_STATUS.REJECTED]: '#EF4444',
  [ADMIN_NOTIFICATION_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_NOTIFICATION_STATUS.CANCELLED]: '#6B7280',
  [ADMIN_NOTIFICATION_STATUS.RETRY]: '#F59E0B',

  // Read statuses
  [ADMIN_NOTIFICATION_STATUS.UNREAD]: '#6366F1',
  [ADMIN_NOTIFICATION_STATUS.READ]: '#34D399',
  [ADMIN_NOTIFICATION_STATUS.VIEWED]: '#6EE7B7',
  [ADMIN_NOTIFICATION_STATUS.CLICKED]: '#60A5FA',
  [ADMIN_NOTIFICATION_STATUS.ACTIONED]: '#34D399',

  // Final statuses
  [ADMIN_NOTIFICATION_STATUS.COMPLETED]: '#10B981',
  [ADMIN_NOTIFICATION_STATUS.ARCHIVED]: '#6B7280',
  [ADMIN_NOTIFICATION_STATUS.DELETED]: '#6B7280',
  [ADMIN_NOTIFICATION_STATUS.SUPPRESSED]: '#6B7280',

  // Error statuses
  [ADMIN_NOTIFICATION_STATUS.ERROR]: '#DC2626',
  [ADMIN_NOTIFICATION_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_NOTIFICATION_STATUS.MALFORMED]: '#F59E0B',
  [ADMIN_NOTIFICATION_STATUS.INVALID]: '#EF4444',
  [ADMIN_NOTIFICATION_STATUS.SPAM]: '#6B7280',
};

export const ADMIN_NOTIFICATION_STATUS_GROUPS = {
  LIFECYCLE: [
    ADMIN_NOTIFICATION_STATUS.CREATED,
    ADMIN_NOTIFICATION_STATUS.INITIALIZED,
    ADMIN_NOTIFICATION_STATUS.DRAFT,
    ADMIN_NOTIFICATION_STATUS.SCHEDULED,
    ADMIN_NOTIFICATION_STATUS.QUEUED,
    ADMIN_NOTIFICATION_STATUS.PROCESSING,
    ADMIN_NOTIFICATION_STATUS.SENT,
  ] as AdminNotificationStatusDetail[],
  DELIVERY: [
    ADMIN_NOTIFICATION_STATUS.DELIVERED,
    ADMIN_NOTIFICATION_STATUS.FAILED,
    ADMIN_NOTIFICATION_STATUS.BOUNCED,
    ADMIN_NOTIFICATION_STATUS.REJECTED,
    ADMIN_NOTIFICATION_STATUS.EXPIRED,
    ADMIN_NOTIFICATION_STATUS.CANCELLED,
    ADMIN_NOTIFICATION_STATUS.RETRY,
  ] as AdminNotificationStatusDetail[],
  READ: [
    ADMIN_NOTIFICATION_STATUS.UNREAD,
    ADMIN_NOTIFICATION_STATUS.READ,
    ADMIN_NOTIFICATION_STATUS.VIEWED,
    ADMIN_NOTIFICATION_STATUS.CLICKED,
    ADMIN_NOTIFICATION_STATUS.ACTIONED,
  ] as AdminNotificationStatusDetail[],
  FINAL: [
    ADMIN_NOTIFICATION_STATUS.COMPLETED,
    ADMIN_NOTIFICATION_STATUS.ARCHIVED,
    ADMIN_NOTIFICATION_STATUS.DELETED,
    ADMIN_NOTIFICATION_STATUS.SUPPRESSED,
  ] as AdminNotificationStatusDetail[],
  ERROR: [
    ADMIN_NOTIFICATION_STATUS.ERROR,
    ADMIN_NOTIFICATION_STATUS.TIMEOUT,
    ADMIN_NOTIFICATION_STATUS.MALFORMED,
    ADMIN_NOTIFICATION_STATUS.INVALID,
    ADMIN_NOTIFICATION_STATUS.SPAM,
  ] as AdminNotificationStatusDetail[],
};

export function getAdminNotificationStatusLabel(status: AdminNotificationStatusDetail): string {
  return ADMIN_NOTIFICATION_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminNotificationStatusColor(status: AdminNotificationStatusDetail): string {
  return ADMIN_NOTIFICATION_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isLifecycleStatus(status: AdminNotificationStatusDetail): boolean {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.LIFECYCLE.includes(status);
}

export function isDeliveryStatus(status: AdminNotificationStatusDetail): boolean {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.DELIVERY.includes(status);
}

export function isReadStatus(status: AdminNotificationStatusDetail): boolean {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.READ.includes(status);
}

export function isFinalStatus(status: AdminNotificationStatusDetail): boolean {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.FINAL.includes(status);
}

export function isErrorStatus(status: AdminNotificationStatusDetail): boolean {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.ERROR.includes(status);
}

export function isDeliveredStatus(status: AdminNotificationStatusDetail): boolean {
  return (
    status === ADMIN_NOTIFICATION_STATUS.DELIVERED ||
    status === ADMIN_NOTIFICATION_STATUS.READ ||
    status === ADMIN_NOTIFICATION_STATUS.VIEWED ||
    status === ADMIN_NOTIFICATION_STATUS.CLICKED ||
    status === ADMIN_NOTIFICATION_STATUS.ACTIONED
  );
}

export function isFailedStatus(status: AdminNotificationStatusDetail): boolean {
  return (
    status === ADMIN_NOTIFICATION_STATUS.FAILED ||
    status === ADMIN_NOTIFICATION_STATUS.BOUNCED ||
    status === ADMIN_NOTIFICATION_STATUS.REJECTED ||
    status === ADMIN_NOTIFICATION_STATUS.ERROR ||
    status === ADMIN_NOTIFICATION_STATUS.TIMEOUT
  );
}

export function isPendingStatus(status: AdminNotificationStatusDetail): boolean {
  return (
    status === ADMIN_NOTIFICATION_STATUS.QUEUED ||
    status === ADMIN_NOTIFICATION_STATUS.PROCESSING ||
    status === ADMIN_NOTIFICATION_STATUS.SCHEDULED ||
    status === ADMIN_NOTIFICATION_STATUS.RETRY
  );
}

export function isUnreadStatus(status: AdminNotificationStatusDetail): boolean {
  return (
    status === ADMIN_NOTIFICATION_STATUS.UNREAD ||
    status === ADMIN_NOTIFICATION_STATUS.CREATED ||
    status === ADMIN_NOTIFICATION_STATUS.INITIALIZED
  );
}

export function isReadStatusType(status: AdminNotificationStatusDetail): boolean {
  return (
    status === ADMIN_NOTIFICATION_STATUS.READ ||
    status === ADMIN_NOTIFICATION_STATUS.VIEWED ||
    status === ADMIN_NOTIFICATION_STATUS.CLICKED ||
    status === ADMIN_NOTIFICATION_STATUS.ACTIONED
  );
}

export function isTerminalStatus(status: AdminNotificationStatusDetail): boolean {
  return (
    isFinalStatus(status) ||
    status === ADMIN_NOTIFICATION_STATUS.EXPIRED ||
    status === ADMIN_NOTIFICATION_STATUS.CANCELLED ||
    isFailedStatus(status)
  );
}

export function getStatusPriority(status: AdminNotificationStatusDetail): number {
  const priorityMap: Record<AdminNotificationStatusDetail, number> = {
    [ADMIN_NOTIFICATION_STATUS.CREATED]: 1,
    [ADMIN_NOTIFICATION_STATUS.INITIALIZED]: 1,
    [ADMIN_NOTIFICATION_STATUS.DRAFT]: 1,
    [ADMIN_NOTIFICATION_STATUS.SCHEDULED]: 1,
    [ADMIN_NOTIFICATION_STATUS.QUEUED]: 2,
    [ADMIN_NOTIFICATION_STATUS.PROCESSING]: 2,
    [ADMIN_NOTIFICATION_STATUS.SENT]: 2,
    [ADMIN_NOTIFICATION_STATUS.DELIVERED]: 3,
    [ADMIN_NOTIFICATION_STATUS.READ]: 3,
    [ADMIN_NOTIFICATION_STATUS.VIEWED]: 3,
    [ADMIN_NOTIFICATION_STATUS.CLICKED]: 3,
    [ADMIN_NOTIFICATION_STATUS.ACTIONED]: 3,
    [ADMIN_NOTIFICATION_STATUS.COMPLETED]: 3,
    [ADMIN_NOTIFICATION_STATUS.UNREAD]: 2,
    [ADMIN_NOTIFICATION_STATUS.FAILED]: 4,
    [ADMIN_NOTIFICATION_STATUS.BOUNCED]: 4,
    [ADMIN_NOTIFICATION_STATUS.REJECTED]: 4,
    [ADMIN_NOTIFICATION_STATUS.EXPIRED]: 5,
    [ADMIN_NOTIFICATION_STATUS.CANCELLED]: 5,
    [ADMIN_NOTIFICATION_STATUS.RETRY]: 2,
    [ADMIN_NOTIFICATION_STATUS.ARCHIVED]: 5,
    [ADMIN_NOTIFICATION_STATUS.DELETED]: 5,
    [ADMIN_NOTIFICATION_STATUS.SUPPRESSED]: 4,
    [ADMIN_NOTIFICATION_STATUS.ERROR]: 4,
    [ADMIN_NOTIFICATION_STATUS.TIMEOUT]: 4,
    [ADMIN_NOTIFICATION_STATUS.MALFORMED]: 4,
    [ADMIN_NOTIFICATION_STATUS.INVALID]: 4,
    [ADMIN_NOTIFICATION_STATUS.SPAM]: 5,
  };
  return priorityMap[status] || 3;
}

export function getAdminNotificationStatuses(): AdminNotificationStatusDetail[] {
  return Object.values(ADMIN_NOTIFICATION_STATUS);
}

export function getLifecycleStatuses(): AdminNotificationStatusDetail[] {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.LIFECYCLE;
}

export function getDeliveryStatuses(): AdminNotificationStatusDetail[] {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.DELIVERY;
}

export function getReadStatuses(): AdminNotificationStatusDetail[] {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.READ;
}

export function getFinalStatuses(): AdminNotificationStatusDetail[] {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.FINAL;
}

export function getErrorStatuses(): AdminNotificationStatusDetail[] {
  return ADMIN_NOTIFICATION_STATUS_GROUPS.ERROR;
}
