/**
 * E-Book Status Constants
 * Status definitions for e-book lifecycle
 */

export const CONTENT_E_BOOK_STATUS = {
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

  // E-Book State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // E-Book Action Types
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

// E-Book Statuses
export type ContentEBookStatusType =
  (typeof CONTENT_E_BOOK_STATUS.STATUSES)[keyof typeof CONTENT_E_BOOK_STATUS.STATUSES];

// Status Categories
export type ContentEBookStatusCategory =
  (typeof CONTENT_E_BOOK_STATUS.CATEGORIES)[keyof typeof CONTENT_E_BOOK_STATUS.CATEGORIES];

// Status Colors
export type ContentEBookStatusColor =
  (typeof CONTENT_E_BOOK_STATUS.COLORS)[keyof typeof CONTENT_E_BOOK_STATUS.COLORS];

// Status Priority
export type ContentEBookStatusPriority =
  (typeof CONTENT_E_BOOK_STATUS.PRIORITY)[keyof typeof CONTENT_E_BOOK_STATUS.PRIORITY];

// E-Book State
export type ContentEBookState =
  (typeof CONTENT_E_BOOK_STATUS.STATE)[keyof typeof CONTENT_E_BOOK_STATUS.STATE];

// E-Book Actions
export type ContentEBookAction =
  (typeof CONTENT_E_BOOK_STATUS.ACTIONS)[keyof typeof CONTENT_E_BOOK_STATUS.ACTIONS];

// Utility Functions
export function contentEBookStatusGetLabel(status: ContentEBookStatusType): string {
  const labels: Record<ContentEBookStatusType, string> = {
    [CONTENT_E_BOOK_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_E_BOOK_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_E_BOOK_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_E_BOOK_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_E_BOOK_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_E_BOOK_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_E_BOOK_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_E_BOOK_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentEBookStatusGetCategory(
  status: ContentEBookStatusType
): ContentEBookStatusCategory {
  const categories: Record<ContentEBookStatusType, ContentEBookStatusCategory> = {
    [CONTENT_E_BOOK_STATUS.STATUSES.DRAFT]: CONTENT_E_BOOK_STATUS.CATEGORIES.CREATION,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_E_BOOK_STATUS.CATEGORIES.REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW]: CONTENT_E_BOOK_STATUS.CATEGORIES.REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED]: CONTENT_E_BOOK_STATUS.CATEGORIES.REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_E_BOOK_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_E_BOOK_STATUS.STATUSES.APPROVED]: CONTENT_E_BOOK_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_E_BOOK_STATUS.STATUSES.REJECTED]: CONTENT_E_BOOK_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED]: CONTENT_E_BOOK_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED]: CONTENT_E_BOOK_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PRIVATE]: CONTENT_E_BOOK_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.UNLISTED]: CONTENT_E_BOOK_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.ARCHIVED]: CONTENT_E_BOOK_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DEPRECATED]: CONTENT_E_BOOK_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DELETED]: CONTENT_E_BOOK_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_E_BOOK_STATUS.CATEGORIES.CREATION;
}

export function contentEBookStatusGetColor(
  status: ContentEBookStatusType
): ContentEBookStatusColor {
  const colorMap: Record<ContentEBookStatusType, ContentEBookStatusColor> = {
    [CONTENT_E_BOOK_STATUS.STATUSES.DRAFT]: CONTENT_E_BOOK_STATUS.COLORS.DRAFT,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_E_BOOK_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW]: CONTENT_E_BOOK_STATUS.COLORS.IN_REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED]: CONTENT_E_BOOK_STATUS.COLORS.REVIEWED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_E_BOOK_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_E_BOOK_STATUS.STATUSES.APPROVED]: CONTENT_E_BOOK_STATUS.COLORS.APPROVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.REJECTED]: CONTENT_E_BOOK_STATUS.COLORS.REJECTED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED]: CONTENT_E_BOOK_STATUS.COLORS.PUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED]: CONTENT_E_BOOK_STATUS.COLORS.SCHEDULED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PRIVATE]: CONTENT_E_BOOK_STATUS.COLORS.PRIVATE,
    [CONTENT_E_BOOK_STATUS.STATUSES.UNLISTED]: CONTENT_E_BOOK_STATUS.COLORS.UNLISTED,
    [CONTENT_E_BOOK_STATUS.STATUSES.ARCHIVED]: CONTENT_E_BOOK_STATUS.COLORS.ARCHIVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DEPRECATED]: CONTENT_E_BOOK_STATUS.COLORS.DEPRECATED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DELETED]: CONTENT_E_BOOK_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentEBookStatusGetPriority(
  status: ContentEBookStatusType
): ContentEBookStatusPriority {
  const priorityMap: Record<ContentEBookStatusType, ContentEBookStatusPriority> = {
    [CONTENT_E_BOOK_STATUS.STATUSES.DRAFT]: CONTENT_E_BOOK_STATUS.PRIORITY.DRAFT,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_E_BOOK_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW]: CONTENT_E_BOOK_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED]: CONTENT_E_BOOK_STATUS.PRIORITY.REVIEWED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_E_BOOK_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_E_BOOK_STATUS.STATUSES.APPROVED]: CONTENT_E_BOOK_STATUS.PRIORITY.APPROVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.REJECTED]: CONTENT_E_BOOK_STATUS.PRIORITY.REJECTED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED]: CONTENT_E_BOOK_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED]: CONTENT_E_BOOK_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_E_BOOK_STATUS.STATUSES.PRIVATE]: CONTENT_E_BOOK_STATUS.PRIORITY.PRIVATE,
    [CONTENT_E_BOOK_STATUS.STATUSES.UNLISTED]: CONTENT_E_BOOK_STATUS.PRIORITY.UNLISTED,
    [CONTENT_E_BOOK_STATUS.STATUSES.ARCHIVED]: CONTENT_E_BOOK_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DEPRECATED]: CONTENT_E_BOOK_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_E_BOOK_STATUS.STATUSES.DELETED]: CONTENT_E_BOOK_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentEBookStatusIsPublished(status: ContentEBookStatusType): boolean {
  const publishedStatuses: ContentEBookStatusType[] = [
    CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED,
    CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentEBookStatusIsEditable(status: ContentEBookStatusType): boolean {
  const editableStatuses: ContentEBookStatusType[] = [
    CONTENT_E_BOOK_STATUS.STATUSES.DRAFT,
    CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW,
    CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED,
    CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_E_BOOK_STATUS.STATUSES.REJECTED,
    CONTENT_E_BOOK_STATUS.STATUSES.PRIVATE,
    CONTENT_E_BOOK_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentEBookStatusIsApproved(status: ContentEBookStatusType): boolean {
  const approvedStatuses: ContentEBookStatusType[] = [
    CONTENT_E_BOOK_STATUS.STATUSES.APPROVED,
    CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED,
    CONTENT_E_BOOK_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentEBookStatusIsArchived(status: ContentEBookStatusType): boolean {
  const archivedStatuses: ContentEBookStatusType[] = [
    CONTENT_E_BOOK_STATUS.STATUSES.ARCHIVED,
    CONTENT_E_BOOK_STATUS.STATUSES.DEPRECATED,
    CONTENT_E_BOOK_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentEBookStatusCanTransitionTo(
  currentStatus: ContentEBookStatusType,
  targetStatus: ContentEBookStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_E_BOOK_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentEBookStatusGetAvailableTransitions(
  currentStatus: ContentEBookStatusType
): ContentEBookStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_E_BOOK_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentEBookStatusType[];
}

export function contentEBookStatusGetSequence(): ContentEBookStatusType[] {
  return [
    CONTENT_E_BOOK_STATUS.STATUSES.DRAFT,
    CONTENT_E_BOOK_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_E_BOOK_STATUS.STATUSES.IN_REVIEW,
    CONTENT_E_BOOK_STATUS.STATUSES.REVIEWED,
    CONTENT_E_BOOK_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_E_BOOK_STATUS.STATUSES.APPROVED,
    CONTENT_E_BOOK_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentEBookStatusGetStateLabel(state: ContentEBookState): string {
  const labels: Record<ContentEBookState, string> = {
    [CONTENT_E_BOOK_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_E_BOOK_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_E_BOOK_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_E_BOOK_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_E_BOOK_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_E_BOOK_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_E_BOOK_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentEBookStatusGetActionLabel(action: ContentEBookAction): string {
  const labels: Record<ContentEBookAction, string> = {
    [CONTENT_E_BOOK_STATUS.ACTIONS.CREATE]: 'Create E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.UPDATE]: 'Update E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.PUBLISH]: 'Publish E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.DELETE]: 'Delete E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.RESTORE]: 'Restore E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.ARCHIVE]: 'Archive E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.REVIEW]: 'Review E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.APPROVE]: 'Approve E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.REJECT]: 'Reject E-Book',
    [CONTENT_E_BOOK_STATUS.ACTIONS.SCHEDULE]: 'Schedule E-Book',
  };
  return labels[action] || 'Unknown Action';
}

export function contentEBookStatusIsValid(status: string): status is ContentEBookStatusType {
  return Object.values(CONTENT_E_BOOK_STATUS.STATUSES).includes(status as ContentEBookStatusType);
}

export function contentEBookStatusIsValidState(state: string): state is ContentEBookState {
  return Object.values(CONTENT_E_BOOK_STATUS.STATE).includes(state as ContentEBookState);
}
