/**
 * Report Export Status Constants
 * Status definitions for export lifecycle
 */

export const REPORT_EXPORT_STATUS = {
  // Export Statuses
  STATUSES: {
    PENDING: 'pending',
    QUEUED: 'queued',
    PROCESSING: 'processing',
    GENERATING: 'generating',
    COMPRESSING: 'compressing',
    ENCRYPTING: 'encrypting',
    UPLOADING: 'uploading',
    SENDING: 'sending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    PARTIAL: 'partial',
  } as const,

  // Status Categories
  CATEGORIES: {
    WAITING: 'waiting',
    PROCESSING: 'processing',
    DELIVERY: 'delivery',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#6B7280',
    QUEUED: '#F59E0B',
    PROCESSING: '#3B82F6',
    GENERATING: '#8B5CF6',
    COMPRESSING: '#06B6D4',
    ENCRYPTING: '#10B981',
    UPLOADING: '#14B8A6',
    SENDING: '#6366F1',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    CANCELLED: '#6B7280',
    EXPIRED: '#6B7280',
    PARTIAL: '#F59E0B',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    PENDING: 0,
    QUEUED: 1,
    PROCESSING: 2,
    GENERATING: 3,
    COMPRESSING: 4,
    ENCRYPTING: 5,
    UPLOADING: 6,
    SENDING: 7,
    COMPLETED: 8,
    FAILED: 9,
    CANCELLED: 10,
    EXPIRED: 11,
    PARTIAL: 12,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING: ['queued', 'cancelled'],
    QUEUED: ['processing', 'cancelled'],
    PROCESSING: ['generating', 'failed', 'cancelled'],
    GENERATING: ['compressing', 'failed', 'cancelled'],
    COMPRESSING: ['encrypting', 'failed', 'cancelled'],
    ENCRYPTING: ['uploading', 'failed', 'cancelled'],
    UPLOADING: ['sending', 'failed', 'cancelled'],
    SENDING: ['completed', 'failed', 'cancelled'],
    COMPLETED: ['expired'],
    FAILED: ['pending'],
    CANCELLED: [],
    EXPIRED: [],
    PARTIAL: ['completed', 'failed'],
  } as const,

  // Export Delivery Status
  DELIVERY_STATUS: {
    PENDING: 'pending',
    SENDING: 'sending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETRYING: 'retrying',
  } as const,

  // Export Progress
  PROGRESS: {
    INITIAL: 0,
    STARTED: 10,
    PROCESSING: 25,
    GENERATING: 50,
    COMPRESSING: 65,
    ENCRYPTING: 75,
    UPLOADING: 85,
    SENDING: 90,
    COMPLETED: 100,
  } as const,

  // Export Error Types
  ERROR_TYPES: {
    GENERATION_ERROR: 'generation_error',
    COMPRESSION_ERROR: 'compression_error',
    ENCRYPTION_ERROR: 'encryption_error',
    UPLOAD_ERROR: 'upload_error',
    DELIVERY_ERROR: 'delivery_error',
    TIMEOUT: 'timeout',
    SIZE_EXCEEDED: 'size_exceeded',
    PERMISSION_DENIED: 'permission_denied',
    INVALID_FORMAT: 'invalid_format',
    UNKNOWN: 'unknown',
  } as const,
} as const;

// Export Statuses
export type ReportExportStatusType =
  (typeof REPORT_EXPORT_STATUS.STATUSES)[keyof typeof REPORT_EXPORT_STATUS.STATUSES];

// Status Categories
export type ReportExportStatusCategory =
  (typeof REPORT_EXPORT_STATUS.CATEGORIES)[keyof typeof REPORT_EXPORT_STATUS.CATEGORIES];

// Status Colors
export type ReportExportStatusColor =
  (typeof REPORT_EXPORT_STATUS.COLORS)[keyof typeof REPORT_EXPORT_STATUS.COLORS];

// Status Priority
export type ReportExportStatusPriority =
  (typeof REPORT_EXPORT_STATUS.PRIORITY)[keyof typeof REPORT_EXPORT_STATUS.PRIORITY];

// Delivery Status
export type ReportExportDeliveryStatus =
  (typeof REPORT_EXPORT_STATUS.DELIVERY_STATUS)[keyof typeof REPORT_EXPORT_STATUS.DELIVERY_STATUS];

// Progress
export type ReportExportProgress =
  (typeof REPORT_EXPORT_STATUS.PROGRESS)[keyof typeof REPORT_EXPORT_STATUS.PROGRESS];

// Error Types
export type ReportExportErrorType =
  (typeof REPORT_EXPORT_STATUS.ERROR_TYPES)[keyof typeof REPORT_EXPORT_STATUS.ERROR_TYPES];

// Utility Functions
export function reportExportStatusGetLabel(status: ReportExportStatusType): string {
  const labels: Record<ReportExportStatusType, string> = {
    [REPORT_EXPORT_STATUS.STATUSES.PENDING]: 'Pending',
    [REPORT_EXPORT_STATUS.STATUSES.QUEUED]: 'Queued',
    [REPORT_EXPORT_STATUS.STATUSES.PROCESSING]: 'Processing',
    [REPORT_EXPORT_STATUS.STATUSES.GENERATING]: 'Generating',
    [REPORT_EXPORT_STATUS.STATUSES.COMPRESSING]: 'Compressing',
    [REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING]: 'Encrypting',
    [REPORT_EXPORT_STATUS.STATUSES.UPLOADING]: 'Uploading',
    [REPORT_EXPORT_STATUS.STATUSES.SENDING]: 'Sending',
    [REPORT_EXPORT_STATUS.STATUSES.COMPLETED]: 'Completed',
    [REPORT_EXPORT_STATUS.STATUSES.FAILED]: 'Failed',
    [REPORT_EXPORT_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [REPORT_EXPORT_STATUS.STATUSES.EXPIRED]: 'Expired',
    [REPORT_EXPORT_STATUS.STATUSES.PARTIAL]: 'Partial',
  };
  return labels[status] || 'Unknown Status';
}

export function reportExportStatusGetCategory(
  status: ReportExportStatusType
): ReportExportStatusCategory {
  const categories: Record<ReportExportStatusType, ReportExportStatusCategory> = {
    [REPORT_EXPORT_STATUS.STATUSES.PENDING]: REPORT_EXPORT_STATUS.CATEGORIES.WAITING,
    [REPORT_EXPORT_STATUS.STATUSES.QUEUED]: REPORT_EXPORT_STATUS.CATEGORIES.WAITING,
    [REPORT_EXPORT_STATUS.STATUSES.PROCESSING]: REPORT_EXPORT_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.GENERATING]: REPORT_EXPORT_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPRESSING]: REPORT_EXPORT_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING]: REPORT_EXPORT_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.UPLOADING]: REPORT_EXPORT_STATUS.CATEGORIES.DELIVERY,
    [REPORT_EXPORT_STATUS.STATUSES.SENDING]: REPORT_EXPORT_STATUS.CATEGORIES.DELIVERY,
    [REPORT_EXPORT_STATUS.STATUSES.COMPLETED]: REPORT_EXPORT_STATUS.CATEGORIES.COMPLETED,
    [REPORT_EXPORT_STATUS.STATUSES.FAILED]: REPORT_EXPORT_STATUS.CATEGORIES.FAILED,
    [REPORT_EXPORT_STATUS.STATUSES.CANCELLED]: REPORT_EXPORT_STATUS.CATEGORIES.FAILED,
    [REPORT_EXPORT_STATUS.STATUSES.EXPIRED]: REPORT_EXPORT_STATUS.CATEGORIES.FAILED,
    [REPORT_EXPORT_STATUS.STATUSES.PARTIAL]: REPORT_EXPORT_STATUS.CATEGORIES.COMPLETED,
  };
  return categories[status] || REPORT_EXPORT_STATUS.CATEGORIES.WAITING;
}

export function reportExportStatusGetColor(
  status: ReportExportStatusType
): ReportExportStatusColor {
  const colorMap: Record<ReportExportStatusType, ReportExportStatusColor> = {
    [REPORT_EXPORT_STATUS.STATUSES.PENDING]: REPORT_EXPORT_STATUS.COLORS.PENDING,
    [REPORT_EXPORT_STATUS.STATUSES.QUEUED]: REPORT_EXPORT_STATUS.COLORS.QUEUED,
    [REPORT_EXPORT_STATUS.STATUSES.PROCESSING]: REPORT_EXPORT_STATUS.COLORS.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.GENERATING]: REPORT_EXPORT_STATUS.COLORS.GENERATING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPRESSING]: REPORT_EXPORT_STATUS.COLORS.COMPRESSING,
    [REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING]: REPORT_EXPORT_STATUS.COLORS.ENCRYPTING,
    [REPORT_EXPORT_STATUS.STATUSES.UPLOADING]: REPORT_EXPORT_STATUS.COLORS.UPLOADING,
    [REPORT_EXPORT_STATUS.STATUSES.SENDING]: REPORT_EXPORT_STATUS.COLORS.SENDING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPLETED]: REPORT_EXPORT_STATUS.COLORS.COMPLETED,
    [REPORT_EXPORT_STATUS.STATUSES.FAILED]: REPORT_EXPORT_STATUS.COLORS.FAILED,
    [REPORT_EXPORT_STATUS.STATUSES.CANCELLED]: REPORT_EXPORT_STATUS.COLORS.CANCELLED,
    [REPORT_EXPORT_STATUS.STATUSES.EXPIRED]: REPORT_EXPORT_STATUS.COLORS.EXPIRED,
    [REPORT_EXPORT_STATUS.STATUSES.PARTIAL]: REPORT_EXPORT_STATUS.COLORS.PARTIAL,
  };
  return colorMap[status] || '#6B7280';
}

export function reportExportStatusGetPriority(
  status: ReportExportStatusType
): ReportExportStatusPriority {
  const priorityMap: Record<ReportExportStatusType, ReportExportStatusPriority> = {
    [REPORT_EXPORT_STATUS.STATUSES.PENDING]: REPORT_EXPORT_STATUS.PRIORITY.PENDING,
    [REPORT_EXPORT_STATUS.STATUSES.QUEUED]: REPORT_EXPORT_STATUS.PRIORITY.QUEUED,
    [REPORT_EXPORT_STATUS.STATUSES.PROCESSING]: REPORT_EXPORT_STATUS.PRIORITY.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.GENERATING]: REPORT_EXPORT_STATUS.PRIORITY.GENERATING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPRESSING]: REPORT_EXPORT_STATUS.PRIORITY.COMPRESSING,
    [REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING]: REPORT_EXPORT_STATUS.PRIORITY.ENCRYPTING,
    [REPORT_EXPORT_STATUS.STATUSES.UPLOADING]: REPORT_EXPORT_STATUS.PRIORITY.UPLOADING,
    [REPORT_EXPORT_STATUS.STATUSES.SENDING]: REPORT_EXPORT_STATUS.PRIORITY.SENDING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPLETED]: REPORT_EXPORT_STATUS.PRIORITY.COMPLETED,
    [REPORT_EXPORT_STATUS.STATUSES.FAILED]: REPORT_EXPORT_STATUS.PRIORITY.FAILED,
    [REPORT_EXPORT_STATUS.STATUSES.CANCELLED]: REPORT_EXPORT_STATUS.PRIORITY.CANCELLED,
    [REPORT_EXPORT_STATUS.STATUSES.EXPIRED]: REPORT_EXPORT_STATUS.PRIORITY.EXPIRED,
    [REPORT_EXPORT_STATUS.STATUSES.PARTIAL]: REPORT_EXPORT_STATUS.PRIORITY.PARTIAL,
  };
  return priorityMap[status] || 0;
}

export function reportExportStatusIsComplete(status: ReportExportStatusType): boolean {
  const completeStatuses: ReportExportStatusType[] = [
    REPORT_EXPORT_STATUS.STATUSES.COMPLETED,
    REPORT_EXPORT_STATUS.STATUSES.PARTIAL,
  ];
  return completeStatuses.includes(status);
}

export function reportExportStatusIsFailed(status: ReportExportStatusType): boolean {
  const failedStatuses: ReportExportStatusType[] = [
    REPORT_EXPORT_STATUS.STATUSES.FAILED,
    REPORT_EXPORT_STATUS.STATUSES.CANCELLED,
    REPORT_EXPORT_STATUS.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function reportExportStatusIsInProgress(status: ReportExportStatusType): boolean {
  const inProgressStatuses: ReportExportStatusType[] = [
    REPORT_EXPORT_STATUS.STATUSES.PROCESSING,
    REPORT_EXPORT_STATUS.STATUSES.GENERATING,
    REPORT_EXPORT_STATUS.STATUSES.COMPRESSING,
    REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING,
    REPORT_EXPORT_STATUS.STATUSES.UPLOADING,
    REPORT_EXPORT_STATUS.STATUSES.SENDING,
  ];
  return inProgressStatuses.includes(status);
}

export function reportExportStatusCanTransitionTo(
  currentStatus: ReportExportStatusType,
  targetStatus: ReportExportStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_EXPORT_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportExportStatusGetAvailableTransitions(
  currentStatus: ReportExportStatusType
): ReportExportStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_EXPORT_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportExportStatusType[];
}

export function reportExportStatusGetProgress(
  status: ReportExportStatusType
): ReportExportProgress {
  const progressMap: Record<ReportExportStatusType, ReportExportProgress> = {
    [REPORT_EXPORT_STATUS.STATUSES.PENDING]: REPORT_EXPORT_STATUS.PROGRESS.INITIAL,
    [REPORT_EXPORT_STATUS.STATUSES.QUEUED]: REPORT_EXPORT_STATUS.PROGRESS.INITIAL,
    [REPORT_EXPORT_STATUS.STATUSES.PROCESSING]: REPORT_EXPORT_STATUS.PROGRESS.PROCESSING,
    [REPORT_EXPORT_STATUS.STATUSES.GENERATING]: REPORT_EXPORT_STATUS.PROGRESS.GENERATING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPRESSING]: REPORT_EXPORT_STATUS.PROGRESS.COMPRESSING,
    [REPORT_EXPORT_STATUS.STATUSES.ENCRYPTING]: REPORT_EXPORT_STATUS.PROGRESS.ENCRYPTING,
    [REPORT_EXPORT_STATUS.STATUSES.UPLOADING]: REPORT_EXPORT_STATUS.PROGRESS.UPLOADING,
    [REPORT_EXPORT_STATUS.STATUSES.SENDING]: REPORT_EXPORT_STATUS.PROGRESS.SENDING,
    [REPORT_EXPORT_STATUS.STATUSES.COMPLETED]: REPORT_EXPORT_STATUS.PROGRESS.COMPLETED,
    [REPORT_EXPORT_STATUS.STATUSES.FAILED]: REPORT_EXPORT_STATUS.PROGRESS.INITIAL,
    [REPORT_EXPORT_STATUS.STATUSES.CANCELLED]: REPORT_EXPORT_STATUS.PROGRESS.INITIAL,
    [REPORT_EXPORT_STATUS.STATUSES.EXPIRED]: REPORT_EXPORT_STATUS.PROGRESS.INITIAL,
    [REPORT_EXPORT_STATUS.STATUSES.PARTIAL]: REPORT_EXPORT_STATUS.PROGRESS.COMPLETED,
  };
  return progressMap[status] || REPORT_EXPORT_STATUS.PROGRESS.INITIAL;
}

export function reportExportStatusGetErrorLabel(errorType: ReportExportErrorType): string {
  const labels: Record<ReportExportErrorType, string> = {
    [REPORT_EXPORT_STATUS.ERROR_TYPES.GENERATION_ERROR]: 'Generation Error',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.COMPRESSION_ERROR]: 'Compression Error',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.ENCRYPTION_ERROR]: 'Encryption Error',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.UPLOAD_ERROR]: 'Upload Error',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.DELIVERY_ERROR]: 'Delivery Error',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.TIMEOUT]: 'Timeout',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.SIZE_EXCEEDED]: 'Size Exceeded',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.PERMISSION_DENIED]: 'Permission Denied',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.INVALID_FORMAT]: 'Invalid Format',
    [REPORT_EXPORT_STATUS.ERROR_TYPES.UNKNOWN]: 'Unknown Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function reportExportStatusIsValid(status: string): status is ReportExportStatusType {
  return Object.values(REPORT_EXPORT_STATUS.STATUSES).includes(status as ReportExportStatusType);
}

export function reportExportStatusIsValidErrorType(
  errorType: string
): errorType is ReportExportErrorType {
  return Object.values(REPORT_EXPORT_STATUS.ERROR_TYPES).includes(
    errorType as ReportExportErrorType
  );
}
