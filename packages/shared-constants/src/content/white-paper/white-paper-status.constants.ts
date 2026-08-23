/**
 * White Paper Status Constants
 * Status definitions for white paper lifecycle
 */

export const CONTENT_WHITE_PAPER_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    REVIEW: 'review',
    APPROVAL: 'approval',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
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
    PUBLISHED: '#10B981',
    SCHEDULED: '#06B6D4',
    PRIVATE: '#6B7280',
    UNLISTED: '#6B7280',
    ARCHIVED: '#6B7280',
    DEPRECATED: '#6B7280',
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
    PUBLISHED: 7,
    SCHEDULED: 8,
    PRIVATE: 9,
    UNLISTED: 10,
    ARCHIVED: 11,
    DEPRECATED: 12,
    DELETED: 13,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'private', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['published', 'private', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    PUBLISHED: ['archived', 'deprecated', 'deleted'],
    SCHEDULED: ['published', 'draft', 'deleted'],
    PRIVATE: ['published', 'unlisted', 'draft', 'deleted'],
    UNLISTED: ['published', 'private', 'draft', 'deleted'],
    ARCHIVED: ['deleted'],
    DEPRECATED: ['archived', 'deleted'],
    DELETED: [],
  } as const,

  // White Paper State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // White Paper Action Types
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    PUBLISH: 'publish',
    UNPUBLISH: 'unpublish',
    DELETE: 'delete',
    RESTORE: 'restore',
    ARCHIVE: 'archive',
    REVIEW: 'review',
    APPROVE: 'approve',
    REJECT: 'reject',
    SCHEDULE: 'schedule',
  } as const,
} as const;

// White Paper Statuses
export type ContentWhitePaperStatusType =
  (typeof CONTENT_WHITE_PAPER_STATUS.STATUSES)[keyof typeof CONTENT_WHITE_PAPER_STATUS.STATUSES];

// Status Categories
export type ContentWhitePaperStatusCategory =
  (typeof CONTENT_WHITE_PAPER_STATUS.CATEGORIES)[keyof typeof CONTENT_WHITE_PAPER_STATUS.CATEGORIES];

// Status Colors
export type ContentWhitePaperStatusColor =
  (typeof CONTENT_WHITE_PAPER_STATUS.COLORS)[keyof typeof CONTENT_WHITE_PAPER_STATUS.COLORS];

// Status Priority
export type ContentWhitePaperStatusPriority =
  (typeof CONTENT_WHITE_PAPER_STATUS.PRIORITY)[keyof typeof CONTENT_WHITE_PAPER_STATUS.PRIORITY];

// White Paper State
export type ContentWhitePaperState =
  (typeof CONTENT_WHITE_PAPER_STATUS.STATE)[keyof typeof CONTENT_WHITE_PAPER_STATUS.STATE];

// White Paper Actions
export type ContentWhitePaperAction =
  (typeof CONTENT_WHITE_PAPER_STATUS.ACTIONS)[keyof typeof CONTENT_WHITE_PAPER_STATUS.ACTIONS];

// Utility Functions
export function contentWhitePaperStatusGetLabel(status: ContentWhitePaperStatusType): string {
  const labels: Record<ContentWhitePaperStatusType, string> = {
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentWhitePaperStatusGetCategory(
  status: ContentWhitePaperStatusType
): ContentWhitePaperStatusCategory {
  const categories: Record<ContentWhitePaperStatusType, ContentWhitePaperStatusCategory> = {
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.CREATION,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REJECTED]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PRIVATE]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.UNLISTED]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.ARCHIVED]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DEPRECATED]:
      CONTENT_WHITE_PAPER_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DELETED]: CONTENT_WHITE_PAPER_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_WHITE_PAPER_STATUS.CATEGORIES.CREATION;
}

export function contentWhitePaperStatusGetColor(
  status: ContentWhitePaperStatusType
): ContentWhitePaperStatusColor {
  const colorMap: Record<ContentWhitePaperStatusType, ContentWhitePaperStatusColor> = {
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT]: CONTENT_WHITE_PAPER_STATUS.COLORS.DRAFT,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_WHITE_PAPER_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW]: CONTENT_WHITE_PAPER_STATUS.COLORS.IN_REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED]: CONTENT_WHITE_PAPER_STATUS.COLORS.REVIEWED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_WHITE_PAPER_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED]: CONTENT_WHITE_PAPER_STATUS.COLORS.APPROVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REJECTED]: CONTENT_WHITE_PAPER_STATUS.COLORS.REJECTED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED]: CONTENT_WHITE_PAPER_STATUS.COLORS.PUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED]: CONTENT_WHITE_PAPER_STATUS.COLORS.SCHEDULED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PRIVATE]: CONTENT_WHITE_PAPER_STATUS.COLORS.PRIVATE,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.UNLISTED]: CONTENT_WHITE_PAPER_STATUS.COLORS.UNLISTED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.ARCHIVED]: CONTENT_WHITE_PAPER_STATUS.COLORS.ARCHIVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DEPRECATED]: CONTENT_WHITE_PAPER_STATUS.COLORS.DEPRECATED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DELETED]: CONTENT_WHITE_PAPER_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentWhitePaperStatusGetPriority(
  status: ContentWhitePaperStatusType
): ContentWhitePaperStatusPriority {
  const priorityMap: Record<ContentWhitePaperStatusType, ContentWhitePaperStatusPriority> = {
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.DRAFT,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_WHITE_PAPER_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.REVIEWED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_WHITE_PAPER_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.APPROVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.REJECTED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.REJECTED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.PRIVATE]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.PRIVATE,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.UNLISTED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.UNLISTED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.ARCHIVED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DEPRECATED]:
      CONTENT_WHITE_PAPER_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_WHITE_PAPER_STATUS.STATUSES.DELETED]: CONTENT_WHITE_PAPER_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentWhitePaperStatusIsPublished(status: ContentWhitePaperStatusType): boolean {
  const publishedStatuses: ContentWhitePaperStatusType[] = [
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentWhitePaperStatusIsEditable(status: ContentWhitePaperStatusType): boolean {
  const editableStatuses: ContentWhitePaperStatusType[] = [
    CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.REJECTED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PRIVATE,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentWhitePaperStatusIsApproved(status: ContentWhitePaperStatusType): boolean {
  const approvedStatuses: ContentWhitePaperStatusType[] = [
    CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentWhitePaperStatusIsArchived(status: ContentWhitePaperStatusType): boolean {
  const archivedStatuses: ContentWhitePaperStatusType[] = [
    CONTENT_WHITE_PAPER_STATUS.STATUSES.ARCHIVED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.DEPRECATED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentWhitePaperStatusCanTransitionTo(
  currentStatus: ContentWhitePaperStatusType,
  targetStatus: ContentWhitePaperStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_WHITE_PAPER_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentWhitePaperStatusGetAvailableTransitions(
  currentStatus: ContentWhitePaperStatusType
): ContentWhitePaperStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_WHITE_PAPER_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentWhitePaperStatusType[];
}

export function contentWhitePaperStatusGetSequence(): ContentWhitePaperStatusType[] {
  return [
    CONTENT_WHITE_PAPER_STATUS.STATUSES.DRAFT,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.IN_REVIEW,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.REVIEWED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.APPROVED,
    CONTENT_WHITE_PAPER_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentWhitePaperStatusGetStateLabel(state: ContentWhitePaperState): string {
  const labels: Record<ContentWhitePaperState, string> = {
    [CONTENT_WHITE_PAPER_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_WHITE_PAPER_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_WHITE_PAPER_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_WHITE_PAPER_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_WHITE_PAPER_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_WHITE_PAPER_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_WHITE_PAPER_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentWhitePaperStatusGetActionLabel(action: ContentWhitePaperAction): string {
  const labels: Record<ContentWhitePaperAction, string> = {
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.CREATE]: 'Create White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.UPDATE]: 'Update White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.PUBLISH]: 'Publish White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.DELETE]: 'Delete White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.RESTORE]: 'Restore White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.ARCHIVE]: 'Archive White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.REVIEW]: 'Review White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.APPROVE]: 'Approve White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.REJECT]: 'Reject White Paper',
    [CONTENT_WHITE_PAPER_STATUS.ACTIONS.SCHEDULE]: 'Schedule White Paper',
  };
  return labels[action] || 'Unknown Action';
}

export function contentWhitePaperStatusIsValid(
  status: string
): status is ContentWhitePaperStatusType {
  return Object.values(CONTENT_WHITE_PAPER_STATUS.STATUSES).includes(
    status as ContentWhitePaperStatusType
  );
}

export function contentWhitePaperStatusIsValidState(
  state: string
): state is ContentWhitePaperState {
  return Object.values(CONTENT_WHITE_PAPER_STATUS.STATE).includes(state as ContentWhitePaperState);
}
