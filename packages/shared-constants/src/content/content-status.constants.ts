/**
 * Content Status Constants
 * Status definitions for content lifecycle
 */

export const CONTENT_STATUS = {
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

  // Content State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Content Action Types
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
  } as const,
} as const;

// Content Statuses
export type ContentStatusType =
  (typeof CONTENT_STATUS.STATUSES)[keyof typeof CONTENT_STATUS.STATUSES];

// Status Categories
export type ContentStatusCategory =
  (typeof CONTENT_STATUS.CATEGORIES)[keyof typeof CONTENT_STATUS.CATEGORIES];

// Status Colors
export type ContentStatusColor = (typeof CONTENT_STATUS.COLORS)[keyof typeof CONTENT_STATUS.COLORS];

// Status Priority
export type ContentStatusPriority =
  (typeof CONTENT_STATUS.PRIORITY)[keyof typeof CONTENT_STATUS.PRIORITY];

// Content State
export type ContentState = (typeof CONTENT_STATUS.STATE)[keyof typeof CONTENT_STATUS.STATE];

// Content Actions
export type ContentAction = (typeof CONTENT_STATUS.ACTIONS)[keyof typeof CONTENT_STATUS.ACTIONS];

// Utility Functions
export function contentStatusGetLabel(status: ContentStatusType): string {
  const labels: Record<ContentStatusType, string> = {
    [CONTENT_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentStatusGetCategory(status: ContentStatusType): ContentStatusCategory {
  const categories: Record<ContentStatusType, ContentStatusCategory> = {
    [CONTENT_STATUS.STATUSES.DRAFT]: CONTENT_STATUS.CATEGORIES.CREATION,
    [CONTENT_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_STATUS.STATUSES.IN_REVIEW]: CONTENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_STATUS.STATUSES.REVIEWED]: CONTENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_STATUS.STATUSES.APPROVED]: CONTENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_STATUS.STATUSES.REJECTED]: CONTENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_STATUS.STATUSES.PUBLISHED]: CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_STATUS.STATUSES.SCHEDULED]: CONTENT_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_STATUS.STATUSES.PRIVATE]: CONTENT_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_STATUS.STATUSES.UNLISTED]: CONTENT_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_STATUS.STATUSES.ARCHIVED]: CONTENT_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_STATUS.STATUSES.DEPRECATED]: CONTENT_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_STATUS.STATUSES.DELETED]: CONTENT_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_STATUS.CATEGORIES.CREATION;
}

export function contentStatusGetColor(status: ContentStatusType): ContentStatusColor {
  const colorMap: Record<ContentStatusType, ContentStatusColor> = {
    [CONTENT_STATUS.STATUSES.DRAFT]: CONTENT_STATUS.COLORS.DRAFT,
    [CONTENT_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_STATUS.STATUSES.IN_REVIEW]: CONTENT_STATUS.COLORS.IN_REVIEW,
    [CONTENT_STATUS.STATUSES.REVIEWED]: CONTENT_STATUS.COLORS.REVIEWED,
    [CONTENT_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_STATUS.STATUSES.APPROVED]: CONTENT_STATUS.COLORS.APPROVED,
    [CONTENT_STATUS.STATUSES.REJECTED]: CONTENT_STATUS.COLORS.REJECTED,
    [CONTENT_STATUS.STATUSES.PUBLISHED]: CONTENT_STATUS.COLORS.PUBLISHED,
    [CONTENT_STATUS.STATUSES.SCHEDULED]: CONTENT_STATUS.COLORS.SCHEDULED,
    [CONTENT_STATUS.STATUSES.PRIVATE]: CONTENT_STATUS.COLORS.PRIVATE,
    [CONTENT_STATUS.STATUSES.UNLISTED]: CONTENT_STATUS.COLORS.UNLISTED,
    [CONTENT_STATUS.STATUSES.ARCHIVED]: CONTENT_STATUS.COLORS.ARCHIVED,
    [CONTENT_STATUS.STATUSES.DEPRECATED]: CONTENT_STATUS.COLORS.DEPRECATED,
    [CONTENT_STATUS.STATUSES.DELETED]: CONTENT_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentStatusGetPriority(status: ContentStatusType): ContentStatusPriority {
  const priorityMap: Record<ContentStatusType, ContentStatusPriority> = {
    [CONTENT_STATUS.STATUSES.DRAFT]: CONTENT_STATUS.PRIORITY.DRAFT,
    [CONTENT_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_STATUS.STATUSES.IN_REVIEW]: CONTENT_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_STATUS.STATUSES.REVIEWED]: CONTENT_STATUS.PRIORITY.REVIEWED,
    [CONTENT_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_STATUS.STATUSES.APPROVED]: CONTENT_STATUS.PRIORITY.APPROVED,
    [CONTENT_STATUS.STATUSES.REJECTED]: CONTENT_STATUS.PRIORITY.REJECTED,
    [CONTENT_STATUS.STATUSES.PUBLISHED]: CONTENT_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_STATUS.STATUSES.SCHEDULED]: CONTENT_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_STATUS.STATUSES.PRIVATE]: CONTENT_STATUS.PRIORITY.PRIVATE,
    [CONTENT_STATUS.STATUSES.UNLISTED]: CONTENT_STATUS.PRIORITY.UNLISTED,
    [CONTENT_STATUS.STATUSES.ARCHIVED]: CONTENT_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_STATUS.STATUSES.DEPRECATED]: CONTENT_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_STATUS.STATUSES.DELETED]: CONTENT_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentStatusIsPublished(status: ContentStatusType): boolean {
  const publishedStatuses: ContentStatusType[] = [
    CONTENT_STATUS.STATUSES.PUBLISHED,
    CONTENT_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentStatusIsEditable(status: ContentStatusType): boolean {
  const editableStatuses: ContentStatusType[] = [
    CONTENT_STATUS.STATUSES.DRAFT,
    CONTENT_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_STATUS.STATUSES.IN_REVIEW,
    CONTENT_STATUS.STATUSES.REVIEWED,
    CONTENT_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_STATUS.STATUSES.REJECTED,
    CONTENT_STATUS.STATUSES.PRIVATE,
    CONTENT_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentStatusIsArchived(status: ContentStatusType): boolean {
  const archivedStatuses: ContentStatusType[] = [
    CONTENT_STATUS.STATUSES.ARCHIVED,
    CONTENT_STATUS.STATUSES.DEPRECATED,
    CONTENT_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentStatusCanTransitionTo(
  currentStatus: ContentStatusType,
  targetStatus: ContentStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentStatusGetAvailableTransitions(
  currentStatus: ContentStatusType
): ContentStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentStatusType[];
}

export function contentStatusGetSequence(): ContentStatusType[] {
  return [
    CONTENT_STATUS.STATUSES.DRAFT,
    CONTENT_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_STATUS.STATUSES.IN_REVIEW,
    CONTENT_STATUS.STATUSES.REVIEWED,
    CONTENT_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_STATUS.STATUSES.APPROVED,
    CONTENT_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentStatusGetStateLabel(state: ContentState): string {
  const labels: Record<ContentState, string> = {
    [CONTENT_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentStatusGetActionLabel(action: ContentAction): string {
  const labels: Record<ContentAction, string> = {
    [CONTENT_STATUS.ACTIONS.CREATE]: 'Create',
    [CONTENT_STATUS.ACTIONS.UPDATE]: 'Update',
    [CONTENT_STATUS.ACTIONS.PUBLISH]: 'Publish',
    [CONTENT_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish',
    [CONTENT_STATUS.ACTIONS.DELETE]: 'Delete',
    [CONTENT_STATUS.ACTIONS.RESTORE]: 'Restore',
    [CONTENT_STATUS.ACTIONS.ARCHIVE]: 'Archive',
    [CONTENT_STATUS.ACTIONS.REVIEW]: 'Review',
    [CONTENT_STATUS.ACTIONS.APPROVE]: 'Approve',
    [CONTENT_STATUS.ACTIONS.REJECT]: 'Reject',
  };
  return labels[action] || 'Unknown Action';
}

export function contentStatusIsValid(status: string): status is ContentStatusType {
  return Object.values(CONTENT_STATUS.STATUSES).includes(status as ContentStatusType);
}

export function contentStatusIsValidState(state: string): state is ContentState {
  return Object.values(CONTENT_STATUS.STATE).includes(state as ContentState);
}
