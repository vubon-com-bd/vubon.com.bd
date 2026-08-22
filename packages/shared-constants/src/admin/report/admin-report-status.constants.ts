/**
 * Admin Report Status Constants
 * Detailed report status definitions
 */

export const ADMIN_REPORT_STATUS = {
  // Lifecycle statuses
  CREATED: 'created',
  INITIALIZED: 'initialized',
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  QUEUED: 'queued',
  PROCESSING: 'processing',

  // Generation statuses
  GENERATING: 'generating',
  GENERATED: 'generated',
  COMPLETED: 'completed',
  PARTIALLY_COMPLETED: 'partially_completed',
  FAILED: 'failed',

  // Delivery statuses
  DELIVERED: 'delivered',
  EXPORTED: 'exported',
  EMAILED: 'emailed',
  SHARED: 'shared',
  DOWNLOADED: 'downloaded',

  // View statuses
  CREATED_VIEW: 'created_view',
  VIEWED: 'viewed',
  DOWNLOADED_VIEW: 'downloaded_view',
  PRINTED: 'printed',

  // Error statuses
  ERROR: 'error',
  TIMEOUT: 'timeout',
  CORRUPTED: 'corrupted',
  INCOMPLETE: 'incomplete',
  INVALID: 'invalid',

  // Final statuses
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  PURGED: 'purged',
} as const;

export type AdminReportStatusDetail =
  (typeof ADMIN_REPORT_STATUS)[keyof typeof ADMIN_REPORT_STATUS];

export const ADMIN_REPORT_STATUS_LABELS_DETAIL: Record<AdminReportStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_REPORT_STATUS.CREATED]: 'Created',
  [ADMIN_REPORT_STATUS.INITIALIZED]: 'Initialized',
  [ADMIN_REPORT_STATUS.DRAFT]: 'Draft',
  [ADMIN_REPORT_STATUS.SCHEDULED]: 'Scheduled',
  [ADMIN_REPORT_STATUS.QUEUED]: 'Queued',
  [ADMIN_REPORT_STATUS.PROCESSING]: 'Processing',

  // Generation statuses
  [ADMIN_REPORT_STATUS.GENERATING]: 'Generating',
  [ADMIN_REPORT_STATUS.GENERATED]: 'Generated',
  [ADMIN_REPORT_STATUS.COMPLETED]: 'Completed',
  [ADMIN_REPORT_STATUS.PARTIALLY_COMPLETED]: 'Partially Completed',
  [ADMIN_REPORT_STATUS.FAILED]: 'Failed',

  // Delivery statuses
  [ADMIN_REPORT_STATUS.DELIVERED]: 'Delivered',
  [ADMIN_REPORT_STATUS.EXPORTED]: 'Exported',
  [ADMIN_REPORT_STATUS.EMAILED]: 'Emailed',
  [ADMIN_REPORT_STATUS.SHARED]: 'Shared',
  [ADMIN_REPORT_STATUS.DOWNLOADED]: 'Downloaded',

  // View statuses
  [ADMIN_REPORT_STATUS.CREATED_VIEW]: 'Created View',
  [ADMIN_REPORT_STATUS.VIEWED]: 'Viewed',
  [ADMIN_REPORT_STATUS.DOWNLOADED_VIEW]: 'Downloaded View',
  [ADMIN_REPORT_STATUS.PRINTED]: 'Printed',

  // Error statuses
  [ADMIN_REPORT_STATUS.ERROR]: 'Error',
  [ADMIN_REPORT_STATUS.TIMEOUT]: 'Timeout',
  [ADMIN_REPORT_STATUS.CORRUPTED]: 'Corrupted',
  [ADMIN_REPORT_STATUS.INCOMPLETE]: 'Incomplete',
  [ADMIN_REPORT_STATUS.INVALID]: 'Invalid',

  // Final statuses
  [ADMIN_REPORT_STATUS.CANCELLED]: 'Cancelled',
  [ADMIN_REPORT_STATUS.EXPIRED]: 'Expired',
  [ADMIN_REPORT_STATUS.ARCHIVED]: 'Archived',
  [ADMIN_REPORT_STATUS.DELETED]: 'Deleted',
  [ADMIN_REPORT_STATUS.PURGED]: 'Purged',
};

export const ADMIN_REPORT_STATUS_COLORS_DETAIL: Record<AdminReportStatusDetail, string> = {
  // Lifecycle statuses
  [ADMIN_REPORT_STATUS.CREATED]: '#93C5FD',
  [ADMIN_REPORT_STATUS.INITIALIZED]: '#60A5FA',
  [ADMIN_REPORT_STATUS.DRAFT]: '#9CA3AF',
  [ADMIN_REPORT_STATUS.SCHEDULED]: '#6366F1',
  [ADMIN_REPORT_STATUS.QUEUED]: '#8B5CF6',
  [ADMIN_REPORT_STATUS.PROCESSING]: '#A78BFA',

  // Generation statuses
  [ADMIN_REPORT_STATUS.GENERATING]: '#3B82F6',
  [ADMIN_REPORT_STATUS.GENERATED]: '#34D399',
  [ADMIN_REPORT_STATUS.COMPLETED]: '#10B981',
  [ADMIN_REPORT_STATUS.PARTIALLY_COMPLETED]: '#F59E0B',
  [ADMIN_REPORT_STATUS.FAILED]: '#EF4444',

  // Delivery statuses
  [ADMIN_REPORT_STATUS.DELIVERED]: '#10B981',
  [ADMIN_REPORT_STATUS.EXPORTED]: '#34D399',
  [ADMIN_REPORT_STATUS.EMAILED]: '#34D399',
  [ADMIN_REPORT_STATUS.SHARED]: '#8B5CF6',
  [ADMIN_REPORT_STATUS.DOWNLOADED]: '#3B82F6',

  // View statuses
  [ADMIN_REPORT_STATUS.CREATED_VIEW]: '#60A5FA',
  [ADMIN_REPORT_STATUS.VIEWED]: '#34D399',
  [ADMIN_REPORT_STATUS.DOWNLOADED_VIEW]: '#3B82F6',
  [ADMIN_REPORT_STATUS.PRINTED]: '#6EE7B7',

  // Error statuses
  [ADMIN_REPORT_STATUS.ERROR]: '#DC2626',
  [ADMIN_REPORT_STATUS.TIMEOUT]: '#F97316',
  [ADMIN_REPORT_STATUS.CORRUPTED]: '#DC2626',
  [ADMIN_REPORT_STATUS.INCOMPLETE]: '#F59E0B',
  [ADMIN_REPORT_STATUS.INVALID]: '#EF4444',

  // Final statuses
  [ADMIN_REPORT_STATUS.CANCELLED]: '#6B7280',
  [ADMIN_REPORT_STATUS.EXPIRED]: '#9CA3AF',
  [ADMIN_REPORT_STATUS.ARCHIVED]: '#6B7280',
  [ADMIN_REPORT_STATUS.DELETED]: '#DC2626',
  [ADMIN_REPORT_STATUS.PURGED]: '#6B7280',
};

export const ADMIN_REPORT_STATUS_GROUPS = {
  LIFECYCLE: [
    ADMIN_REPORT_STATUS.CREATED,
    ADMIN_REPORT_STATUS.INITIALIZED,
    ADMIN_REPORT_STATUS.DRAFT,
    ADMIN_REPORT_STATUS.SCHEDULED,
    ADMIN_REPORT_STATUS.QUEUED,
    ADMIN_REPORT_STATUS.PROCESSING,
  ] as AdminReportStatusDetail[],
  GENERATION: [
    ADMIN_REPORT_STATUS.GENERATING,
    ADMIN_REPORT_STATUS.GENERATED,
    ADMIN_REPORT_STATUS.COMPLETED,
    ADMIN_REPORT_STATUS.PARTIALLY_COMPLETED,
    ADMIN_REPORT_STATUS.FAILED,
  ] as AdminReportStatusDetail[],
  DELIVERY: [
    ADMIN_REPORT_STATUS.DELIVERED,
    ADMIN_REPORT_STATUS.EXPORTED,
    ADMIN_REPORT_STATUS.EMAILED,
    ADMIN_REPORT_STATUS.SHARED,
    ADMIN_REPORT_STATUS.DOWNLOADED,
  ] as AdminReportStatusDetail[],
  VIEW: [
    ADMIN_REPORT_STATUS.CREATED_VIEW,
    ADMIN_REPORT_STATUS.VIEWED,
    ADMIN_REPORT_STATUS.DOWNLOADED_VIEW,
    ADMIN_REPORT_STATUS.PRINTED,
  ] as AdminReportStatusDetail[],
  ERROR: [
    ADMIN_REPORT_STATUS.ERROR,
    ADMIN_REPORT_STATUS.TIMEOUT,
    ADMIN_REPORT_STATUS.CORRUPTED,
    ADMIN_REPORT_STATUS.INCOMPLETE,
    ADMIN_REPORT_STATUS.INVALID,
  ] as AdminReportStatusDetail[],
  FINAL: [
    ADMIN_REPORT_STATUS.CANCELLED,
    ADMIN_REPORT_STATUS.EXPIRED,
    ADMIN_REPORT_STATUS.ARCHIVED,
    ADMIN_REPORT_STATUS.DELETED,
    ADMIN_REPORT_STATUS.PURGED,
  ] as AdminReportStatusDetail[],
};

export function getAdminReportStatusLabel(status: AdminReportStatusDetail): string {
  return ADMIN_REPORT_STATUS_LABELS_DETAIL[status] || 'Unknown Status';
}

export function getAdminReportStatusColor(status: AdminReportStatusDetail): string {
  return ADMIN_REPORT_STATUS_COLORS_DETAIL[status] || '#6B7280';
}

export function isLifecycleStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.LIFECYCLE.includes(status);
}

export function isGenerationStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.GENERATION.includes(status);
}

export function isDeliveryStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.DELIVERY.includes(status);
}

export function isViewStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.VIEW.includes(status);
}

export function isErrorStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.ERROR.includes(status);
}

export function isFinalStatus(status: AdminReportStatusDetail): boolean {
  return ADMIN_REPORT_STATUS_GROUPS.FINAL.includes(status);
}

export function isReportReady(status: AdminReportStatusDetail): boolean {
  return (
    status === ADMIN_REPORT_STATUS.GENERATED ||
    status === ADMIN_REPORT_STATUS.COMPLETED ||
    status === ADMIN_REPORT_STATUS.DELIVERED
  );
}

export function isReportProcessing(status: AdminReportStatusDetail): boolean {
  return (
    status === ADMIN_REPORT_STATUS.GENERATING ||
    status === ADMIN_REPORT_STATUS.PROCESSING ||
    status === ADMIN_REPORT_STATUS.QUEUED ||
    status === ADMIN_REPORT_STATUS.SCHEDULED
  );
}

export function isReportFailed(status: AdminReportStatusDetail): boolean {
  return (
    status === ADMIN_REPORT_STATUS.FAILED ||
    status === ADMIN_REPORT_STATUS.ERROR ||
    status === ADMIN_REPORT_STATUS.TIMEOUT ||
    status === ADMIN_REPORT_STATUS.CORRUPTED ||
    status === ADMIN_REPORT_STATUS.INVALID
  );
}

export function isReportTerminal(status: AdminReportStatusDetail): boolean {
  return isFinalStatus(status) || isReportReady(status) || isReportFailed(status);
}

export function getStatusPriority(status: AdminReportStatusDetail): number {
  const priorityMap: Record<AdminReportStatusDetail, number> = {
    [ADMIN_REPORT_STATUS.CREATED]: 1,
    [ADMIN_REPORT_STATUS.INITIALIZED]: 1,
    [ADMIN_REPORT_STATUS.DRAFT]: 1,
    [ADMIN_REPORT_STATUS.SCHEDULED]: 1,
    [ADMIN_REPORT_STATUS.QUEUED]: 2,
    [ADMIN_REPORT_STATUS.PROCESSING]: 2,
    [ADMIN_REPORT_STATUS.GENERATING]: 3,
    [ADMIN_REPORT_STATUS.GENERATED]: 4,
    [ADMIN_REPORT_STATUS.COMPLETED]: 4,
    [ADMIN_REPORT_STATUS.DELIVERED]: 4,
    [ADMIN_REPORT_STATUS.VIEWED]: 4,
    [ADMIN_REPORT_STATUS.DOWNLOADED]: 4,
    [ADMIN_REPORT_STATUS.EXPORTED]: 4,
    [ADMIN_REPORT_STATUS.EMAILED]: 4,
    [ADMIN_REPORT_STATUS.SHARED]: 4,
    [ADMIN_REPORT_STATUS.PARTIALLY_COMPLETED]: 3,
    [ADMIN_REPORT_STATUS.FAILED]: 5,
    [ADMIN_REPORT_STATUS.ERROR]: 5,
    [ADMIN_REPORT_STATUS.TIMEOUT]: 5,
    [ADMIN_REPORT_STATUS.CORRUPTED]: 5,
    [ADMIN_REPORT_STATUS.INCOMPLETE]: 4,
    [ADMIN_REPORT_STATUS.INVALID]: 5,
    [ADMIN_REPORT_STATUS.CANCELLED]: 6,
    [ADMIN_REPORT_STATUS.EXPIRED]: 6,
    [ADMIN_REPORT_STATUS.ARCHIVED]: 6,
    [ADMIN_REPORT_STATUS.DELETED]: 6,
    [ADMIN_REPORT_STATUS.PURGED]: 6,
    [ADMIN_REPORT_STATUS.CREATED_VIEW]: 3,
    [ADMIN_REPORT_STATUS.DOWNLOADED_VIEW]: 3,
    [ADMIN_REPORT_STATUS.PRINTED]: 3,
  };
  return priorityMap[status] || 3;
}

export function getAdminReportStatuses(): AdminReportStatusDetail[] {
  return Object.values(ADMIN_REPORT_STATUS);
}

export function getLifecycleStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.LIFECYCLE;
}

export function getGenerationStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.GENERATION;
}

export function getDeliveryStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.DELIVERY;
}

export function getViewStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.VIEW;
}

export function getErrorStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.ERROR;
}

export function getFinalStatuses(): AdminReportStatusDetail[] {
  return ADMIN_REPORT_STATUS_GROUPS.FINAL;
}
