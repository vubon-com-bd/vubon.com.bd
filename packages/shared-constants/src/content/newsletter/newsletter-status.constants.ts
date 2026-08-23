/**
 * Newsletter Status Constants
 * Status definitions for newsletter lifecycle
 */

export const CONTENT_NEWSLETTER_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    QUEUED: 'queued',
    SENDING: 'sending',
    SENT: 'sent',
    SCHEDULED: 'scheduled',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    REVIEW: 'review',
    APPROVAL: 'approval',
    QUEUED: 'queued',
    SENDING: 'sending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_REVIEW: '#F59E0B',
    IN_REVIEW: '#3B82F6',
    REVIEWED: '#8B5CF6',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    QUEUED: '#F59E0B',
    SENDING: '#3B82F6',
    SENT: '#10B981',
    SCHEDULED: '#06B6D4',
    PAUSED: '#F59E0B',
    CANCELLED: '#6B7280',
    FAILED: '#EF4444',
    ARCHIVED: '#6B7280',
    DELETED: '#EF4444',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_REVIEW: 1,
    IN_REVIEW: 2,
    REVIEWED: 3,
    PENDING_APPROVAL: 4,
    APPROVED: 5,
    REJECTED: 6,
    QUEUED: 7,
    SENDING: 8,
    SENT: 9,
    SCHEDULED: 10,
    PAUSED: 11,
    CANCELLED: 12,
    FAILED: 13,
    ARCHIVED: 14,
    DELETED: 15,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['queued', 'scheduled', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    QUEUED: ['sending', 'paused', 'cancelled', 'deleted'],
    SENDING: ['sent', 'failed', 'paused', 'cancelled', 'deleted'],
    SENT: ['archived', 'deleted'],
    SCHEDULED: ['queued', 'draft', 'deleted'],
    PAUSED: ['sending', 'queued', 'cancelled', 'deleted'],
    CANCELLED: ['draft', 'deleted'],
    FAILED: ['draft', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  } as const,

  // Newsletter State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    SENDING: 'sending',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Newsletter Action Types
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    SEND: 'send',
    PAUSE: 'pause',
    RESUME: 'resume',
    CANCEL: 'cancel',
    DELETE: 'delete',
    RESTORE: 'restore',
    ARCHIVE: 'archive',
    REVIEW: 'review',
    APPROVE: 'approve',
    REJECT: 'reject',
    SCHEDULE: 'schedule',
  } as const,
} as const;

// Newsletter Statuses
export type ContentNewsletterStatusType =
  (typeof CONTENT_NEWSLETTER_STATUS.STATUSES)[keyof typeof CONTENT_NEWSLETTER_STATUS.STATUSES];

// Status Categories
export type ContentNewsletterStatusCategory =
  (typeof CONTENT_NEWSLETTER_STATUS.CATEGORIES)[keyof typeof CONTENT_NEWSLETTER_STATUS.CATEGORIES];

// Status Colors
export type ContentNewsletterStatusColor =
  (typeof CONTENT_NEWSLETTER_STATUS.COLORS)[keyof typeof CONTENT_NEWSLETTER_STATUS.COLORS];

// Status Priority
export type ContentNewsletterStatusPriority =
  (typeof CONTENT_NEWSLETTER_STATUS.PRIORITY)[keyof typeof CONTENT_NEWSLETTER_STATUS.PRIORITY];

// Newsletter State
export type ContentNewsletterState =
  (typeof CONTENT_NEWSLETTER_STATUS.STATE)[keyof typeof CONTENT_NEWSLETTER_STATUS.STATE];

// Newsletter Actions
export type ContentNewsletterAction =
  (typeof CONTENT_NEWSLETTER_STATUS.ACTIONS)[keyof typeof CONTENT_NEWSLETTER_STATUS.ACTIONS];

// Utility Functions
export function contentNewsletterStatusGetLabel(status: ContentNewsletterStatusType): string {
  const labels: Record<ContentNewsletterStatusType, string> = {
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED]: 'Queued',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING]: 'Sending',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENT]: 'Sent',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PAUSED]: 'Paused',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.FAILED]: 'Failed',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentNewsletterStatusGetCategory(
  status: ContentNewsletterStatusType
): ContentNewsletterStatusCategory {
  const categories: Record<ContentNewsletterStatusType, ContentNewsletterStatusCategory> = {
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.CREATION,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_NEWSLETTER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_NEWSLETTER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.APPROVED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REJECTED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.QUEUED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.SENDING,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENT]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.COMPLETED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SCHEDULED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.QUEUED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PAUSED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.SENDING,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.CANCELLED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.FAILED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.FAILED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.FAILED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.ARCHIVED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DELETED]: CONTENT_NEWSLETTER_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_NEWSLETTER_STATUS.CATEGORIES.CREATION;
}

export function contentNewsletterStatusGetColor(
  status: ContentNewsletterStatusType
): ContentNewsletterStatusColor {
  const colorMap: Record<ContentNewsletterStatusType, ContentNewsletterStatusColor> = {
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT]: CONTENT_NEWSLETTER_STATUS.COLORS.DRAFT,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_NEWSLETTER_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW]: CONTENT_NEWSLETTER_STATUS.COLORS.IN_REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED]: CONTENT_NEWSLETTER_STATUS.COLORS.REVIEWED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_NEWSLETTER_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.APPROVED]: CONTENT_NEWSLETTER_STATUS.COLORS.APPROVED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REJECTED]: CONTENT_NEWSLETTER_STATUS.COLORS.REJECTED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED]: CONTENT_NEWSLETTER_STATUS.COLORS.QUEUED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING]: CONTENT_NEWSLETTER_STATUS.COLORS.SENDING,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENT]: CONTENT_NEWSLETTER_STATUS.COLORS.SENT,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SCHEDULED]: CONTENT_NEWSLETTER_STATUS.COLORS.SCHEDULED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PAUSED]: CONTENT_NEWSLETTER_STATUS.COLORS.PAUSED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.CANCELLED]: CONTENT_NEWSLETTER_STATUS.COLORS.CANCELLED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.FAILED]: CONTENT_NEWSLETTER_STATUS.COLORS.FAILED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.ARCHIVED]: CONTENT_NEWSLETTER_STATUS.COLORS.ARCHIVED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DELETED]: CONTENT_NEWSLETTER_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentNewsletterStatusGetPriority(
  status: ContentNewsletterStatusType
): ContentNewsletterStatusPriority {
  const priorityMap: Record<ContentNewsletterStatusType, ContentNewsletterStatusPriority> = {
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT]: CONTENT_NEWSLETTER_STATUS.PRIORITY.DRAFT,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_NEWSLETTER_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW]: CONTENT_NEWSLETTER_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.REVIEWED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_NEWSLETTER_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.APPROVED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.APPROVED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.REJECTED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.REJECTED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.QUEUED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING]: CONTENT_NEWSLETTER_STATUS.PRIORITY.SENDING,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SENT]: CONTENT_NEWSLETTER_STATUS.PRIORITY.SENT,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.SCHEDULED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.PAUSED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.PAUSED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.CANCELLED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.CANCELLED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.FAILED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.FAILED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.ARCHIVED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_NEWSLETTER_STATUS.STATUSES.DELETED]: CONTENT_NEWSLETTER_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentNewsletterStatusIsPublished(status: ContentNewsletterStatusType): boolean {
  const publishedStatuses: ContentNewsletterStatusType[] = [
    CONTENT_NEWSLETTER_STATUS.STATUSES.SENT,
    CONTENT_NEWSLETTER_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentNewsletterStatusIsEditable(status: ContentNewsletterStatusType): boolean {
  const editableStatuses: ContentNewsletterStatusType[] = [
    CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT,
    CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW,
    CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_NEWSLETTER_STATUS.STATUSES.REJECTED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.PAUSED,
  ];
  return editableStatuses.includes(status);
}

export function contentNewsletterStatusIsSending(status: ContentNewsletterStatusType): boolean {
  const sendingStatuses: ContentNewsletterStatusType[] = [
    CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING,
  ];
  return sendingStatuses.includes(status);
}

export function contentNewsletterStatusIsArchived(status: ContentNewsletterStatusType): boolean {
  const archivedStatuses: ContentNewsletterStatusType[] = [
    CONTENT_NEWSLETTER_STATUS.STATUSES.ARCHIVED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentNewsletterStatusCanTransitionTo(
  currentStatus: ContentNewsletterStatusType,
  targetStatus: ContentNewsletterStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_NEWSLETTER_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentNewsletterStatusGetAvailableTransitions(
  currentStatus: ContentNewsletterStatusType
): ContentNewsletterStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_NEWSLETTER_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentNewsletterStatusType[];
}

export function contentNewsletterStatusGetSequence(): ContentNewsletterStatusType[] {
  return [
    CONTENT_NEWSLETTER_STATUS.STATUSES.DRAFT,
    CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_NEWSLETTER_STATUS.STATUSES.IN_REVIEW,
    CONTENT_NEWSLETTER_STATUS.STATUSES.REVIEWED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_NEWSLETTER_STATUS.STATUSES.APPROVED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.QUEUED,
    CONTENT_NEWSLETTER_STATUS.STATUSES.SENDING,
    CONTENT_NEWSLETTER_STATUS.STATUSES.SENT,
  ];
}

export function contentNewsletterStatusGetStateLabel(state: ContentNewsletterState): string {
  const labels: Record<ContentNewsletterState, string> = {
    [CONTENT_NEWSLETTER_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_NEWSLETTER_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_NEWSLETTER_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_NEWSLETTER_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_NEWSLETTER_STATUS.STATE.SENDING]: 'Sending',
    [CONTENT_NEWSLETTER_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_NEWSLETTER_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentNewsletterStatusGetActionLabel(action: ContentNewsletterAction): string {
  const labels: Record<ContentNewsletterAction, string> = {
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.CREATE]: 'Create Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.UPDATE]: 'Update Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.SEND]: 'Send Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.PAUSE]: 'Pause Sending',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.RESUME]: 'Resume Sending',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.CANCEL]: 'Cancel Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.DELETE]: 'Delete Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.RESTORE]: 'Restore Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.ARCHIVE]: 'Archive Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.REVIEW]: 'Review Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.APPROVE]: 'Approve Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.REJECT]: 'Reject Newsletter',
    [CONTENT_NEWSLETTER_STATUS.ACTIONS.SCHEDULE]: 'Schedule Newsletter',
  };
  return labels[action] || 'Unknown Action';
}

export function contentNewsletterStatusIsValid(
  status: string
): status is ContentNewsletterStatusType {
  return Object.values(CONTENT_NEWSLETTER_STATUS.STATUSES).includes(
    status as ContentNewsletterStatusType
  );
}

export function contentNewsletterStatusIsValidState(
  state: string
): state is ContentNewsletterState {
  return Object.values(CONTENT_NEWSLETTER_STATUS.STATE).includes(state as ContentNewsletterState);
}
