/**
 * Report Email Status Constants
 * Status definitions for email lifecycle
 */

export const REPORT_EMAIL_STATUS = {
  // Email Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    QUEUED: 'queued',
    PROCESSING: 'processing',
    GENERATING: 'generating',
    SENDING: 'sending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    BOUNCED: 'bounced',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  } as const,

  // Status Categories
  CATEGORIES: {
    DRAFT: 'draft',
    WAITING: 'waiting',
    PROCESSING: 'processing',
    DELIVERY: 'delivery',
    COMPLETED: 'completed',
    FAILED: 'failed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING: '#F59E0B',
    QUEUED: '#3B82F6',
    PROCESSING: '#8B5CF6',
    GENERATING: '#06B6D4',
    SENDING: '#6366F1',
    DELIVERED: '#10B981',
    FAILED: '#EF4444',
    BOUNCED: '#EF4444',
    REJECTED: '#DC2626',
    CANCELLED: '#6B7280',
    EXPIRED: '#6B7280',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING: 1,
    QUEUED: 2,
    PROCESSING: 3,
    GENERATING: 4,
    SENDING: 5,
    DELIVERED: 6,
    FAILED: 7,
    BOUNCED: 8,
    REJECTED: 9,
    CANCELLED: 10,
    EXPIRED: 11,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending', 'cancelled'],
    PENDING: ['queued', 'cancelled'],
    QUEUED: ['processing', 'cancelled'],
    PROCESSING: ['generating', 'failed', 'cancelled'],
    GENERATING: ['sending', 'failed', 'cancelled'],
    SENDING: ['delivered', 'failed', 'bounced', 'rejected', 'cancelled'],
    DELIVERED: ['expired'],
    FAILED: ['pending'],
    BOUNCED: ['pending'],
    REJECTED: ['pending'],
    CANCELLED: [],
    EXPIRED: [],
  } as const,

  // Email Delivery Status
  DELIVERY_STATUS: {
    PENDING: 'pending',
    SENDING: 'sending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    BOUNCED: 'bounced',
    REJECTED: 'rejected',
    DEFERRED: 'deferred',
    OPENED: 'opened',
    CLICKED: 'clicked',
    UNSUBSCRIBED: 'unsubscribed',
  } as const,

  // Email Progress
  PROGRESS: {
    INITIAL: 0,
    PENDING: 10,
    QUEUED: 20,
    PROCESSING: 40,
    GENERATING: 60,
    SENDING: 80,
    DELIVERED: 100,
    FAILED: 0,
  } as const,

  // Email Error Types
  ERROR_TYPES: {
    GENERATION_ERROR: 'generation_error',
    SEND_ERROR: 'send_error',
    DELIVERY_ERROR: 'delivery_error',
    BOUNCE_ERROR: 'bounce_error',
    REJECTION_ERROR: 'rejection_error',
    AUTH_ERROR: 'auth_error',
    TIMEOUT: 'timeout',
    SIZE_EXCEEDED: 'size_exceeded',
    RATE_LIMIT: 'rate_limit',
    INVALID_RECIPIENT: 'invalid_recipient',
    INVALID_ATTACHMENT: 'invalid_attachment',
    UNKNOWN: 'unknown',
  } as const,

  // Email Actions
  ACTIONS: {
    SEND: 'send',
    RESEND: 'resend',
    CANCEL: 'cancel',
    RETRY: 'retry',
    DELETE: 'delete',
    ARCHIVE: 'archive',
    PREVIEW: 'preview',
    TEST: 'test',
  } as const,
} as const;

// Email Statuses
export type ReportEmailStatusType =
  (typeof REPORT_EMAIL_STATUS.STATUSES)[keyof typeof REPORT_EMAIL_STATUS.STATUSES];

// Status Categories
export type ReportEmailStatusCategory =
  (typeof REPORT_EMAIL_STATUS.CATEGORIES)[keyof typeof REPORT_EMAIL_STATUS.CATEGORIES];

// Status Colors
export type ReportEmailStatusColor =
  (typeof REPORT_EMAIL_STATUS.COLORS)[keyof typeof REPORT_EMAIL_STATUS.COLORS];

// Status Priority
export type ReportEmailStatusPriority =
  (typeof REPORT_EMAIL_STATUS.PRIORITY)[keyof typeof REPORT_EMAIL_STATUS.PRIORITY];

// Delivery Status
export type ReportEmailDeliveryStatus =
  (typeof REPORT_EMAIL_STATUS.DELIVERY_STATUS)[keyof typeof REPORT_EMAIL_STATUS.DELIVERY_STATUS];

// Progress
export type ReportEmailProgress =
  (typeof REPORT_EMAIL_STATUS.PROGRESS)[keyof typeof REPORT_EMAIL_STATUS.PROGRESS];

// Error Types
export type ReportEmailErrorType =
  (typeof REPORT_EMAIL_STATUS.ERROR_TYPES)[keyof typeof REPORT_EMAIL_STATUS.ERROR_TYPES];

// Email Actions
export type ReportEmailAction =
  (typeof REPORT_EMAIL_STATUS.ACTIONS)[keyof typeof REPORT_EMAIL_STATUS.ACTIONS];

// Utility Functions
export function reportEmailStatusGetLabel(status: ReportEmailStatusType): string {
  const labels: Record<ReportEmailStatusType, string> = {
    [REPORT_EMAIL_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_EMAIL_STATUS.STATUSES.PENDING]: 'Pending',
    [REPORT_EMAIL_STATUS.STATUSES.QUEUED]: 'Queued',
    [REPORT_EMAIL_STATUS.STATUSES.PROCESSING]: 'Processing',
    [REPORT_EMAIL_STATUS.STATUSES.GENERATING]: 'Generating',
    [REPORT_EMAIL_STATUS.STATUSES.SENDING]: 'Sending',
    [REPORT_EMAIL_STATUS.STATUSES.DELIVERED]: 'Delivered',
    [REPORT_EMAIL_STATUS.STATUSES.FAILED]: 'Failed',
    [REPORT_EMAIL_STATUS.STATUSES.BOUNCED]: 'Bounced',
    [REPORT_EMAIL_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_EMAIL_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [REPORT_EMAIL_STATUS.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function reportEmailStatusGetCategory(
  status: ReportEmailStatusType
): ReportEmailStatusCategory {
  const categories: Record<ReportEmailStatusType, ReportEmailStatusCategory> = {
    [REPORT_EMAIL_STATUS.STATUSES.DRAFT]: REPORT_EMAIL_STATUS.CATEGORIES.DRAFT,
    [REPORT_EMAIL_STATUS.STATUSES.PENDING]: REPORT_EMAIL_STATUS.CATEGORIES.WAITING,
    [REPORT_EMAIL_STATUS.STATUSES.QUEUED]: REPORT_EMAIL_STATUS.CATEGORIES.WAITING,
    [REPORT_EMAIL_STATUS.STATUSES.PROCESSING]: REPORT_EMAIL_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EMAIL_STATUS.STATUSES.GENERATING]: REPORT_EMAIL_STATUS.CATEGORIES.PROCESSING,
    [REPORT_EMAIL_STATUS.STATUSES.SENDING]: REPORT_EMAIL_STATUS.CATEGORIES.DELIVERY,
    [REPORT_EMAIL_STATUS.STATUSES.DELIVERED]: REPORT_EMAIL_STATUS.CATEGORIES.COMPLETED,
    [REPORT_EMAIL_STATUS.STATUSES.FAILED]: REPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.BOUNCED]: REPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.REJECTED]: REPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.CANCELLED]: REPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.EXPIRED]: REPORT_EMAIL_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || REPORT_EMAIL_STATUS.CATEGORIES.DRAFT;
}

export function reportEmailStatusGetColor(status: ReportEmailStatusType): ReportEmailStatusColor {
  const colorMap: Record<ReportEmailStatusType, ReportEmailStatusColor> = {
    [REPORT_EMAIL_STATUS.STATUSES.DRAFT]: REPORT_EMAIL_STATUS.COLORS.DRAFT,
    [REPORT_EMAIL_STATUS.STATUSES.PENDING]: REPORT_EMAIL_STATUS.COLORS.PENDING,
    [REPORT_EMAIL_STATUS.STATUSES.QUEUED]: REPORT_EMAIL_STATUS.COLORS.QUEUED,
    [REPORT_EMAIL_STATUS.STATUSES.PROCESSING]: REPORT_EMAIL_STATUS.COLORS.PROCESSING,
    [REPORT_EMAIL_STATUS.STATUSES.GENERATING]: REPORT_EMAIL_STATUS.COLORS.GENERATING,
    [REPORT_EMAIL_STATUS.STATUSES.SENDING]: REPORT_EMAIL_STATUS.COLORS.SENDING,
    [REPORT_EMAIL_STATUS.STATUSES.DELIVERED]: REPORT_EMAIL_STATUS.COLORS.DELIVERED,
    [REPORT_EMAIL_STATUS.STATUSES.FAILED]: REPORT_EMAIL_STATUS.COLORS.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.BOUNCED]: REPORT_EMAIL_STATUS.COLORS.BOUNCED,
    [REPORT_EMAIL_STATUS.STATUSES.REJECTED]: REPORT_EMAIL_STATUS.COLORS.REJECTED,
    [REPORT_EMAIL_STATUS.STATUSES.CANCELLED]: REPORT_EMAIL_STATUS.COLORS.CANCELLED,
    [REPORT_EMAIL_STATUS.STATUSES.EXPIRED]: REPORT_EMAIL_STATUS.COLORS.EXPIRED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportEmailStatusGetPriority(
  status: ReportEmailStatusType
): ReportEmailStatusPriority {
  const priorityMap: Record<ReportEmailStatusType, ReportEmailStatusPriority> = {
    [REPORT_EMAIL_STATUS.STATUSES.DRAFT]: REPORT_EMAIL_STATUS.PRIORITY.DRAFT,
    [REPORT_EMAIL_STATUS.STATUSES.PENDING]: REPORT_EMAIL_STATUS.PRIORITY.PENDING,
    [REPORT_EMAIL_STATUS.STATUSES.QUEUED]: REPORT_EMAIL_STATUS.PRIORITY.QUEUED,
    [REPORT_EMAIL_STATUS.STATUSES.PROCESSING]: REPORT_EMAIL_STATUS.PRIORITY.PROCESSING,
    [REPORT_EMAIL_STATUS.STATUSES.GENERATING]: REPORT_EMAIL_STATUS.PRIORITY.GENERATING,
    [REPORT_EMAIL_STATUS.STATUSES.SENDING]: REPORT_EMAIL_STATUS.PRIORITY.SENDING,
    [REPORT_EMAIL_STATUS.STATUSES.DELIVERED]: REPORT_EMAIL_STATUS.PRIORITY.DELIVERED,
    [REPORT_EMAIL_STATUS.STATUSES.FAILED]: REPORT_EMAIL_STATUS.PRIORITY.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.BOUNCED]: REPORT_EMAIL_STATUS.PRIORITY.BOUNCED,
    [REPORT_EMAIL_STATUS.STATUSES.REJECTED]: REPORT_EMAIL_STATUS.PRIORITY.REJECTED,
    [REPORT_EMAIL_STATUS.STATUSES.CANCELLED]: REPORT_EMAIL_STATUS.PRIORITY.CANCELLED,
    [REPORT_EMAIL_STATUS.STATUSES.EXPIRED]: REPORT_EMAIL_STATUS.PRIORITY.EXPIRED,
  };
  return priorityMap[status] || 0;
}

export function reportEmailStatusIsComplete(status: ReportEmailStatusType): boolean {
  const completeStatuses: ReportEmailStatusType[] = [REPORT_EMAIL_STATUS.STATUSES.DELIVERED];
  return completeStatuses.includes(status);
}

export function reportEmailStatusIsFailed(status: ReportEmailStatusType): boolean {
  const failedStatuses: ReportEmailStatusType[] = [
    REPORT_EMAIL_STATUS.STATUSES.FAILED,
    REPORT_EMAIL_STATUS.STATUSES.BOUNCED,
    REPORT_EMAIL_STATUS.STATUSES.REJECTED,
    REPORT_EMAIL_STATUS.STATUSES.CANCELLED,
    REPORT_EMAIL_STATUS.STATUSES.EXPIRED,
  ];
  return failedStatuses.includes(status);
}

export function reportEmailStatusIsInProgress(status: ReportEmailStatusType): boolean {
  const inProgressStatuses: ReportEmailStatusType[] = [
    REPORT_EMAIL_STATUS.STATUSES.PENDING,
    REPORT_EMAIL_STATUS.STATUSES.QUEUED,
    REPORT_EMAIL_STATUS.STATUSES.PROCESSING,
    REPORT_EMAIL_STATUS.STATUSES.GENERATING,
    REPORT_EMAIL_STATUS.STATUSES.SENDING,
  ];
  return inProgressStatuses.includes(status);
}

export function reportEmailStatusCanTransitionTo(
  currentStatus: ReportEmailStatusType,
  targetStatus: ReportEmailStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_EMAIL_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportEmailStatusGetAvailableTransitions(
  currentStatus: ReportEmailStatusType
): ReportEmailStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_EMAIL_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportEmailStatusType[];
}

export function reportEmailStatusGetProgress(status: ReportEmailStatusType): ReportEmailProgress {
  const progressMap: Record<ReportEmailStatusType, ReportEmailProgress> = {
    [REPORT_EMAIL_STATUS.STATUSES.DRAFT]: REPORT_EMAIL_STATUS.PROGRESS.INITIAL,
    [REPORT_EMAIL_STATUS.STATUSES.PENDING]: REPORT_EMAIL_STATUS.PROGRESS.PENDING,
    [REPORT_EMAIL_STATUS.STATUSES.QUEUED]: REPORT_EMAIL_STATUS.PROGRESS.QUEUED,
    [REPORT_EMAIL_STATUS.STATUSES.PROCESSING]: REPORT_EMAIL_STATUS.PROGRESS.PROCESSING,
    [REPORT_EMAIL_STATUS.STATUSES.GENERATING]: REPORT_EMAIL_STATUS.PROGRESS.GENERATING,
    [REPORT_EMAIL_STATUS.STATUSES.SENDING]: REPORT_EMAIL_STATUS.PROGRESS.SENDING,
    [REPORT_EMAIL_STATUS.STATUSES.DELIVERED]: REPORT_EMAIL_STATUS.PROGRESS.DELIVERED,
    [REPORT_EMAIL_STATUS.STATUSES.FAILED]: REPORT_EMAIL_STATUS.PROGRESS.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.BOUNCED]: REPORT_EMAIL_STATUS.PROGRESS.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.REJECTED]: REPORT_EMAIL_STATUS.PROGRESS.FAILED,
    [REPORT_EMAIL_STATUS.STATUSES.CANCELLED]: REPORT_EMAIL_STATUS.PROGRESS.INITIAL,
    [REPORT_EMAIL_STATUS.STATUSES.EXPIRED]: REPORT_EMAIL_STATUS.PROGRESS.INITIAL,
  };
  return progressMap[status] || REPORT_EMAIL_STATUS.PROGRESS.INITIAL;
}

export function reportEmailStatusGetErrorLabel(errorType: ReportEmailErrorType): string {
  const labels: Record<ReportEmailErrorType, string> = {
    [REPORT_EMAIL_STATUS.ERROR_TYPES.GENERATION_ERROR]: 'Generation Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.SEND_ERROR]: 'Send Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.DELIVERY_ERROR]: 'Delivery Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.BOUNCE_ERROR]: 'Bounce Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.REJECTION_ERROR]: 'Rejection Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.AUTH_ERROR]: 'Authentication Error',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.TIMEOUT]: 'Timeout',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.SIZE_EXCEEDED]: 'Size Exceeded',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.RATE_LIMIT]: 'Rate Limit Exceeded',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.INVALID_RECIPIENT]: 'Invalid Recipient',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.INVALID_ATTACHMENT]: 'Invalid Attachment',
    [REPORT_EMAIL_STATUS.ERROR_TYPES.UNKNOWN]: 'Unknown Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function reportEmailStatusGetActionLabel(action: ReportEmailAction): string {
  const labels: Record<ReportEmailAction, string> = {
    [REPORT_EMAIL_STATUS.ACTIONS.SEND]: 'Send',
    [REPORT_EMAIL_STATUS.ACTIONS.RESEND]: 'Resend',
    [REPORT_EMAIL_STATUS.ACTIONS.CANCEL]: 'Cancel',
    [REPORT_EMAIL_STATUS.ACTIONS.RETRY]: 'Retry',
    [REPORT_EMAIL_STATUS.ACTIONS.DELETE]: 'Delete',
    [REPORT_EMAIL_STATUS.ACTIONS.ARCHIVE]: 'Archive',
    [REPORT_EMAIL_STATUS.ACTIONS.PREVIEW]: 'Preview',
    [REPORT_EMAIL_STATUS.ACTIONS.TEST]: 'Test',
  };
  return labels[action] || 'Unknown Action';
}

export function reportEmailStatusIsValid(status: string): status is ReportEmailStatusType {
  return Object.values(REPORT_EMAIL_STATUS.STATUSES).includes(status as ReportEmailStatusType);
}

export function reportEmailStatusIsValidErrorType(
  errorType: string
): errorType is ReportEmailErrorType {
  return Object.values(REPORT_EMAIL_STATUS.ERROR_TYPES).includes(errorType as ReportEmailErrorType);
}

export function reportEmailStatusIsValidAction(action: string): action is ReportEmailAction {
  return Object.values(REPORT_EMAIL_STATUS.ACTIONS).includes(action as ReportEmailAction);
}
