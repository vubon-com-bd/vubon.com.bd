/**
 * Media Status Constants
 * Status definitions for media lifecycle
 */

export const CONTENT_MEDIA_STATUS = {
  // Statuses
  STATUSES: {
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    OPTIMIZING: 'optimizing',
    RESIZING: 'resizing',
    READY: 'ready',
    FAILED: 'failed',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
  } as const,

  // Status Categories
  CATEGORIES: {
    UPLOAD: 'upload',
    PROCESSING: 'processing',
    READY: 'ready',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    UPLOADING: '#3B82F6',
    PROCESSING: '#8B5CF6',
    OPTIMIZING: '#06B6D4',
    RESIZING: '#14B8A6',
    READY: '#10B981',
    FAILED: '#EF4444',
    DELETED: '#6B7280',
    ARCHIVED: '#6B7280',
    PENDING: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    UPLOADING: 0,
    PROCESSING: 1,
    OPTIMIZING: 2,
    RESIZING: 3,
    READY: 4,
    FAILED: 5,
    DELETED: 6,
    ARCHIVED: 7,
    PENDING: 8,
    APPROVED: 9,
    REJECTED: 10,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    UPLOADING: ['processing', 'failed'],
    PROCESSING: ['optimizing', 'failed'],
    OPTIMIZING: ['resizing', 'failed'],
    RESIZING: ['ready', 'failed'],
    READY: ['archived', 'deleted'],
    FAILED: ['uploading'],
    DELETED: [],
    ARCHIVED: ['deleted'],
    PENDING: ['approved', 'rejected'],
    APPROVED: ['ready'],
    REJECTED: ['pending'],
  } as const,

  // Media State
  STATE: {
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    READY: 'ready',
    ERROR: 'error',
    DELETING: 'deleting',
  } as const,

  // Media Action Types
  ACTIONS: {
    UPLOAD: 'upload',
    PROCESS: 'process',
    OPTIMIZE: 'optimize',
    RESIZE: 'resize',
    DELETE: 'delete',
    RESTORE: 'restore',
    ARCHIVE: 'archive',
  } as const,
} as const;

// Media Statuses
export type ContentMediaStatusType =
  (typeof CONTENT_MEDIA_STATUS.STATUSES)[keyof typeof CONTENT_MEDIA_STATUS.STATUSES];

// Status Categories
export type ContentMediaStatusCategory =
  (typeof CONTENT_MEDIA_STATUS.CATEGORIES)[keyof typeof CONTENT_MEDIA_STATUS.CATEGORIES];

// Status Colors
export type ContentMediaStatusColor =
  (typeof CONTENT_MEDIA_STATUS.COLORS)[keyof typeof CONTENT_MEDIA_STATUS.COLORS];

// Status Priority
export type ContentMediaStatusPriority =
  (typeof CONTENT_MEDIA_STATUS.PRIORITY)[keyof typeof CONTENT_MEDIA_STATUS.PRIORITY];

// Media State
export type ContentMediaState =
  (typeof CONTENT_MEDIA_STATUS.STATE)[keyof typeof CONTENT_MEDIA_STATUS.STATE];

// Media Actions
export type ContentMediaAction =
  (typeof CONTENT_MEDIA_STATUS.ACTIONS)[keyof typeof CONTENT_MEDIA_STATUS.ACTIONS];

// Utility Functions
export function contentMediaStatusGetLabel(status: ContentMediaStatusType): string {
  const labels: Record<ContentMediaStatusType, string> = {
    [CONTENT_MEDIA_STATUS.STATUSES.UPLOADING]: 'Uploading',
    [CONTENT_MEDIA_STATUS.STATUSES.PROCESSING]: 'Processing',
    [CONTENT_MEDIA_STATUS.STATUSES.OPTIMIZING]: 'Optimizing',
    [CONTENT_MEDIA_STATUS.STATUSES.RESIZING]: 'Resizing',
    [CONTENT_MEDIA_STATUS.STATUSES.READY]: 'Ready',
    [CONTENT_MEDIA_STATUS.STATUSES.FAILED]: 'Failed',
    [CONTENT_MEDIA_STATUS.STATUSES.DELETED]: 'Deleted',
    [CONTENT_MEDIA_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_MEDIA_STATUS.STATUSES.PENDING]: 'Pending',
    [CONTENT_MEDIA_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_MEDIA_STATUS.STATUSES.REJECTED]: 'Rejected',
  };
  return labels[status] || 'Unknown Status';
}

export function contentMediaStatusGetCategory(
  status: ContentMediaStatusType
): ContentMediaStatusCategory {
  const categories: Record<ContentMediaStatusType, ContentMediaStatusCategory> = {
    [CONTENT_MEDIA_STATUS.STATUSES.UPLOADING]: CONTENT_MEDIA_STATUS.CATEGORIES.UPLOAD,
    [CONTENT_MEDIA_STATUS.STATUSES.PROCESSING]: CONTENT_MEDIA_STATUS.CATEGORIES.PROCESSING,
    [CONTENT_MEDIA_STATUS.STATUSES.OPTIMIZING]: CONTENT_MEDIA_STATUS.CATEGORIES.PROCESSING,
    [CONTENT_MEDIA_STATUS.STATUSES.RESIZING]: CONTENT_MEDIA_STATUS.CATEGORIES.PROCESSING,
    [CONTENT_MEDIA_STATUS.STATUSES.READY]: CONTENT_MEDIA_STATUS.CATEGORIES.READY,
    [CONTENT_MEDIA_STATUS.STATUSES.FAILED]: CONTENT_MEDIA_STATUS.CATEGORIES.FAILED,
    [CONTENT_MEDIA_STATUS.STATUSES.DELETED]: CONTENT_MEDIA_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_MEDIA_STATUS.STATUSES.ARCHIVED]: CONTENT_MEDIA_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_MEDIA_STATUS.STATUSES.PENDING]: CONTENT_MEDIA_STATUS.CATEGORIES.UPLOAD,
    [CONTENT_MEDIA_STATUS.STATUSES.APPROVED]: CONTENT_MEDIA_STATUS.CATEGORIES.READY,
    [CONTENT_MEDIA_STATUS.STATUSES.REJECTED]: CONTENT_MEDIA_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || CONTENT_MEDIA_STATUS.CATEGORIES.UPLOAD;
}

export function contentMediaStatusGetColor(
  status: ContentMediaStatusType
): ContentMediaStatusColor {
  const colorMap: Record<ContentMediaStatusType, ContentMediaStatusColor> = {
    [CONTENT_MEDIA_STATUS.STATUSES.UPLOADING]: CONTENT_MEDIA_STATUS.COLORS.UPLOADING,
    [CONTENT_MEDIA_STATUS.STATUSES.PROCESSING]: CONTENT_MEDIA_STATUS.COLORS.PROCESSING,
    [CONTENT_MEDIA_STATUS.STATUSES.OPTIMIZING]: CONTENT_MEDIA_STATUS.COLORS.OPTIMIZING,
    [CONTENT_MEDIA_STATUS.STATUSES.RESIZING]: CONTENT_MEDIA_STATUS.COLORS.RESIZING,
    [CONTENT_MEDIA_STATUS.STATUSES.READY]: CONTENT_MEDIA_STATUS.COLORS.READY,
    [CONTENT_MEDIA_STATUS.STATUSES.FAILED]: CONTENT_MEDIA_STATUS.COLORS.FAILED,
    [CONTENT_MEDIA_STATUS.STATUSES.DELETED]: CONTENT_MEDIA_STATUS.COLORS.DELETED,
    [CONTENT_MEDIA_STATUS.STATUSES.ARCHIVED]: CONTENT_MEDIA_STATUS.COLORS.ARCHIVED,
    [CONTENT_MEDIA_STATUS.STATUSES.PENDING]: CONTENT_MEDIA_STATUS.COLORS.PENDING,
    [CONTENT_MEDIA_STATUS.STATUSES.APPROVED]: CONTENT_MEDIA_STATUS.COLORS.APPROVED,
    [CONTENT_MEDIA_STATUS.STATUSES.REJECTED]: CONTENT_MEDIA_STATUS.COLORS.REJECTED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentMediaStatusGetPriority(
  status: ContentMediaStatusType
): ContentMediaStatusPriority {
  const priorityMap: Record<ContentMediaStatusType, ContentMediaStatusPriority> = {
    [CONTENT_MEDIA_STATUS.STATUSES.UPLOADING]: CONTENT_MEDIA_STATUS.PRIORITY.UPLOADING,
    [CONTENT_MEDIA_STATUS.STATUSES.PROCESSING]: CONTENT_MEDIA_STATUS.PRIORITY.PROCESSING,
    [CONTENT_MEDIA_STATUS.STATUSES.OPTIMIZING]: CONTENT_MEDIA_STATUS.PRIORITY.OPTIMIZING,
    [CONTENT_MEDIA_STATUS.STATUSES.RESIZING]: CONTENT_MEDIA_STATUS.PRIORITY.RESIZING,
    [CONTENT_MEDIA_STATUS.STATUSES.READY]: CONTENT_MEDIA_STATUS.PRIORITY.READY,
    [CONTENT_MEDIA_STATUS.STATUSES.FAILED]: CONTENT_MEDIA_STATUS.PRIORITY.FAILED,
    [CONTENT_MEDIA_STATUS.STATUSES.DELETED]: CONTENT_MEDIA_STATUS.PRIORITY.DELETED,
    [CONTENT_MEDIA_STATUS.STATUSES.ARCHIVED]: CONTENT_MEDIA_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_MEDIA_STATUS.STATUSES.PENDING]: CONTENT_MEDIA_STATUS.PRIORITY.PENDING,
    [CONTENT_MEDIA_STATUS.STATUSES.APPROVED]: CONTENT_MEDIA_STATUS.PRIORITY.APPROVED,
    [CONTENT_MEDIA_STATUS.STATUSES.REJECTED]: CONTENT_MEDIA_STATUS.PRIORITY.REJECTED,
  };
  return priorityMap[status] || 0;
}

export function contentMediaStatusIsReady(status: ContentMediaStatusType): boolean {
  const readyStatuses: ContentMediaStatusType[] = [
    CONTENT_MEDIA_STATUS.STATUSES.READY,
    CONTENT_MEDIA_STATUS.STATUSES.APPROVED,
  ];
  return readyStatuses.includes(status);
}

export function contentMediaStatusIsProcessing(status: ContentMediaStatusType): boolean {
  const processingStatuses: ContentMediaStatusType[] = [
    CONTENT_MEDIA_STATUS.STATUSES.UPLOADING,
    CONTENT_MEDIA_STATUS.STATUSES.PROCESSING,
    CONTENT_MEDIA_STATUS.STATUSES.OPTIMIZING,
    CONTENT_MEDIA_STATUS.STATUSES.RESIZING,
  ];
  return processingStatuses.includes(status);
}

export function contentMediaStatusIsFailed(status: ContentMediaStatusType): boolean {
  const failedStatuses: ContentMediaStatusType[] = [
    CONTENT_MEDIA_STATUS.STATUSES.FAILED,
    CONTENT_MEDIA_STATUS.STATUSES.REJECTED,
  ];
  return failedStatuses.includes(status);
}

export function contentMediaStatusIsArchived(status: ContentMediaStatusType): boolean {
  const archivedStatuses: ContentMediaStatusType[] = [
    CONTENT_MEDIA_STATUS.STATUSES.ARCHIVED,
    CONTENT_MEDIA_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentMediaStatusCanTransitionTo(
  currentStatus: ContentMediaStatusType,
  targetStatus: ContentMediaStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_MEDIA_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentMediaStatusGetAvailableTransitions(
  currentStatus: ContentMediaStatusType
): ContentMediaStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_MEDIA_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentMediaStatusType[];
}

export function contentMediaStatusGetStateLabel(state: ContentMediaState): string {
  const labels: Record<ContentMediaState, string> = {
    [CONTENT_MEDIA_STATUS.STATE.UPLOADING]: 'Uploading',
    [CONTENT_MEDIA_STATUS.STATE.PROCESSING]: 'Processing',
    [CONTENT_MEDIA_STATUS.STATE.READY]: 'Ready',
    [CONTENT_MEDIA_STATUS.STATE.ERROR]: 'Error',
    [CONTENT_MEDIA_STATUS.STATE.DELETING]: 'Deleting',
  };
  return labels[state] || 'Unknown State';
}

export function contentMediaStatusGetActionLabel(action: ContentMediaAction): string {
  const labels: Record<ContentMediaAction, string> = {
    [CONTENT_MEDIA_STATUS.ACTIONS.UPLOAD]: 'Upload Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.PROCESS]: 'Process Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.OPTIMIZE]: 'Optimize Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.RESIZE]: 'Resize Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.DELETE]: 'Delete Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.RESTORE]: 'Restore Media',
    [CONTENT_MEDIA_STATUS.ACTIONS.ARCHIVE]: 'Archive Media',
  };
  return labels[action] || 'Unknown Action';
}

export function contentMediaStatusIsValid(status: string): status is ContentMediaStatusType {
  return Object.values(CONTENT_MEDIA_STATUS.STATUSES).includes(status as ContentMediaStatusType);
}

export function contentMediaStatusIsValidState(state: string): state is ContentMediaState {
  return Object.values(CONTENT_MEDIA_STATUS.STATE).includes(state as ContentMediaState);
}
