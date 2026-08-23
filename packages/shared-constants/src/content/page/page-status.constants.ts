/**
 * Page Status Constants
 * Status definitions for page lifecycle
 */

export const CONTENT_PAGE_STATUS = {
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

  // Page State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Page Action Types
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

// Page Statuses
export type ContentPageStatusType =
  (typeof CONTENT_PAGE_STATUS.STATUSES)[keyof typeof CONTENT_PAGE_STATUS.STATUSES];

// Status Categories
export type ContentPageStatusCategory =
  (typeof CONTENT_PAGE_STATUS.CATEGORIES)[keyof typeof CONTENT_PAGE_STATUS.CATEGORIES];

// Status Colors
export type ContentPageStatusColor =
  (typeof CONTENT_PAGE_STATUS.COLORS)[keyof typeof CONTENT_PAGE_STATUS.COLORS];

// Status Priority
export type ContentPageStatusPriority =
  (typeof CONTENT_PAGE_STATUS.PRIORITY)[keyof typeof CONTENT_PAGE_STATUS.PRIORITY];

// Page State
export type ContentPageState =
  (typeof CONTENT_PAGE_STATUS.STATE)[keyof typeof CONTENT_PAGE_STATUS.STATE];

// Page Actions
export type ContentPageAction =
  (typeof CONTENT_PAGE_STATUS.ACTIONS)[keyof typeof CONTENT_PAGE_STATUS.ACTIONS];

// Utility Functions
export function contentPageStatusGetLabel(status: ContentPageStatusType): string {
  const labels: Record<ContentPageStatusType, string> = {
    [CONTENT_PAGE_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_PAGE_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_PAGE_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_PAGE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_PAGE_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_PAGE_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_PAGE_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_PAGE_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_PAGE_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_PAGE_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_PAGE_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentPageStatusGetCategory(
  status: ContentPageStatusType
): ContentPageStatusCategory {
  const categories: Record<ContentPageStatusType, ContentPageStatusCategory> = {
    [CONTENT_PAGE_STATUS.STATUSES.DRAFT]: CONTENT_PAGE_STATUS.CATEGORIES.CREATION,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_PAGE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW]: CONTENT_PAGE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.REVIEWED]: CONTENT_PAGE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_PAGE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_PAGE_STATUS.STATUSES.APPROVED]: CONTENT_PAGE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_PAGE_STATUS.STATUSES.REJECTED]: CONTENT_PAGE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_PAGE_STATUS.STATUSES.PUBLISHED]: CONTENT_PAGE_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.SCHEDULED]: CONTENT_PAGE_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.PRIVATE]: CONTENT_PAGE_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.UNLISTED]: CONTENT_PAGE_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.ARCHIVED]: CONTENT_PAGE_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_PAGE_STATUS.STATUSES.DEPRECATED]: CONTENT_PAGE_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_PAGE_STATUS.STATUSES.DELETED]: CONTENT_PAGE_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_PAGE_STATUS.CATEGORIES.CREATION;
}

export function contentPageStatusGetColor(status: ContentPageStatusType): ContentPageStatusColor {
  const colorMap: Record<ContentPageStatusType, ContentPageStatusColor> = {
    [CONTENT_PAGE_STATUS.STATUSES.DRAFT]: CONTENT_PAGE_STATUS.COLORS.DRAFT,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_PAGE_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW]: CONTENT_PAGE_STATUS.COLORS.IN_REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.REVIEWED]: CONTENT_PAGE_STATUS.COLORS.REVIEWED,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_PAGE_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_PAGE_STATUS.STATUSES.APPROVED]: CONTENT_PAGE_STATUS.COLORS.APPROVED,
    [CONTENT_PAGE_STATUS.STATUSES.REJECTED]: CONTENT_PAGE_STATUS.COLORS.REJECTED,
    [CONTENT_PAGE_STATUS.STATUSES.PUBLISHED]: CONTENT_PAGE_STATUS.COLORS.PUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.SCHEDULED]: CONTENT_PAGE_STATUS.COLORS.SCHEDULED,
    [CONTENT_PAGE_STATUS.STATUSES.PRIVATE]: CONTENT_PAGE_STATUS.COLORS.PRIVATE,
    [CONTENT_PAGE_STATUS.STATUSES.UNLISTED]: CONTENT_PAGE_STATUS.COLORS.UNLISTED,
    [CONTENT_PAGE_STATUS.STATUSES.ARCHIVED]: CONTENT_PAGE_STATUS.COLORS.ARCHIVED,
    [CONTENT_PAGE_STATUS.STATUSES.DEPRECATED]: CONTENT_PAGE_STATUS.COLORS.DEPRECATED,
    [CONTENT_PAGE_STATUS.STATUSES.DELETED]: CONTENT_PAGE_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentPageStatusGetPriority(
  status: ContentPageStatusType
): ContentPageStatusPriority {
  const priorityMap: Record<ContentPageStatusType, ContentPageStatusPriority> = {
    [CONTENT_PAGE_STATUS.STATUSES.DRAFT]: CONTENT_PAGE_STATUS.PRIORITY.DRAFT,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_PAGE_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW]: CONTENT_PAGE_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_PAGE_STATUS.STATUSES.REVIEWED]: CONTENT_PAGE_STATUS.PRIORITY.REVIEWED,
    [CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_PAGE_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_PAGE_STATUS.STATUSES.APPROVED]: CONTENT_PAGE_STATUS.PRIORITY.APPROVED,
    [CONTENT_PAGE_STATUS.STATUSES.REJECTED]: CONTENT_PAGE_STATUS.PRIORITY.REJECTED,
    [CONTENT_PAGE_STATUS.STATUSES.PUBLISHED]: CONTENT_PAGE_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_PAGE_STATUS.STATUSES.SCHEDULED]: CONTENT_PAGE_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_PAGE_STATUS.STATUSES.PRIVATE]: CONTENT_PAGE_STATUS.PRIORITY.PRIVATE,
    [CONTENT_PAGE_STATUS.STATUSES.UNLISTED]: CONTENT_PAGE_STATUS.PRIORITY.UNLISTED,
    [CONTENT_PAGE_STATUS.STATUSES.ARCHIVED]: CONTENT_PAGE_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_PAGE_STATUS.STATUSES.DEPRECATED]: CONTENT_PAGE_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_PAGE_STATUS.STATUSES.DELETED]: CONTENT_PAGE_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentPageStatusIsPublished(status: ContentPageStatusType): boolean {
  const publishedStatuses: ContentPageStatusType[] = [
    CONTENT_PAGE_STATUS.STATUSES.PUBLISHED,
    CONTENT_PAGE_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentPageStatusIsEditable(status: ContentPageStatusType): boolean {
  const editableStatuses: ContentPageStatusType[] = [
    CONTENT_PAGE_STATUS.STATUSES.DRAFT,
    CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW,
    CONTENT_PAGE_STATUS.STATUSES.REVIEWED,
    CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_PAGE_STATUS.STATUSES.REJECTED,
    CONTENT_PAGE_STATUS.STATUSES.PRIVATE,
    CONTENT_PAGE_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentPageStatusIsArchived(status: ContentPageStatusType): boolean {
  const archivedStatuses: ContentPageStatusType[] = [
    CONTENT_PAGE_STATUS.STATUSES.ARCHIVED,
    CONTENT_PAGE_STATUS.STATUSES.DEPRECATED,
    CONTENT_PAGE_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentPageStatusCanTransitionTo(
  currentStatus: ContentPageStatusType,
  targetStatus: ContentPageStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_PAGE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentPageStatusGetAvailableTransitions(
  currentStatus: ContentPageStatusType
): ContentPageStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_PAGE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentPageStatusType[];
}

export function contentPageStatusGetSequence(): ContentPageStatusType[] {
  return [
    CONTENT_PAGE_STATUS.STATUSES.DRAFT,
    CONTENT_PAGE_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_PAGE_STATUS.STATUSES.IN_REVIEW,
    CONTENT_PAGE_STATUS.STATUSES.REVIEWED,
    CONTENT_PAGE_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_PAGE_STATUS.STATUSES.APPROVED,
    CONTENT_PAGE_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentPageStatusGetStateLabel(state: ContentPageState): string {
  const labels: Record<ContentPageState, string> = {
    [CONTENT_PAGE_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_PAGE_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_PAGE_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_PAGE_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_PAGE_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_PAGE_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_PAGE_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentPageStatusGetActionLabel(action: ContentPageAction): string {
  const labels: Record<ContentPageAction, string> = {
    [CONTENT_PAGE_STATUS.ACTIONS.CREATE]: 'Create Page',
    [CONTENT_PAGE_STATUS.ACTIONS.UPDATE]: 'Update Page',
    [CONTENT_PAGE_STATUS.ACTIONS.PUBLISH]: 'Publish Page',
    [CONTENT_PAGE_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Page',
    [CONTENT_PAGE_STATUS.ACTIONS.DELETE]: 'Delete Page',
    [CONTENT_PAGE_STATUS.ACTIONS.RESTORE]: 'Restore Page',
    [CONTENT_PAGE_STATUS.ACTIONS.ARCHIVE]: 'Archive Page',
    [CONTENT_PAGE_STATUS.ACTIONS.REVIEW]: 'Review Page',
    [CONTENT_PAGE_STATUS.ACTIONS.APPROVE]: 'Approve Page',
    [CONTENT_PAGE_STATUS.ACTIONS.REJECT]: 'Reject Page',
    [CONTENT_PAGE_STATUS.ACTIONS.SCHEDULE]: 'Schedule Page',
  };
  return labels[action] || 'Unknown Action';
}

export function contentPageStatusIsValid(status: string): status is ContentPageStatusType {
  return Object.values(CONTENT_PAGE_STATUS.STATUSES).includes(status as ContentPageStatusType);
}

export function contentPageStatusIsValidState(state: string): state is ContentPageState {
  return Object.values(CONTENT_PAGE_STATUS.STATE).includes(state as ContentPageState);
}
