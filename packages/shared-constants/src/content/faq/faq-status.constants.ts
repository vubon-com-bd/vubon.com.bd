/**
 * FAQ Status Constants
 * Status definitions for FAQ lifecycle
 */

export const CONTENT_FAQ_STATUS = {
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

  // FAQ State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // FAQ Action Types
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

// FAQ Statuses
export type ContentFAQStatusType =
  (typeof CONTENT_FAQ_STATUS.STATUSES)[keyof typeof CONTENT_FAQ_STATUS.STATUSES];

// Status Categories
export type ContentFAQStatusCategory =
  (typeof CONTENT_FAQ_STATUS.CATEGORIES)[keyof typeof CONTENT_FAQ_STATUS.CATEGORIES];

// Status Colors
export type ContentFAQStatusColor =
  (typeof CONTENT_FAQ_STATUS.COLORS)[keyof typeof CONTENT_FAQ_STATUS.COLORS];

// Status Priority
export type ContentFAQStatusPriority =
  (typeof CONTENT_FAQ_STATUS.PRIORITY)[keyof typeof CONTENT_FAQ_STATUS.PRIORITY];

// FAQ State
export type ContentFAQState =
  (typeof CONTENT_FAQ_STATUS.STATE)[keyof typeof CONTENT_FAQ_STATUS.STATE];

// FAQ Actions
export type ContentFAQAction =
  (typeof CONTENT_FAQ_STATUS.ACTIONS)[keyof typeof CONTENT_FAQ_STATUS.ACTIONS];

// Utility Functions
export function contentFaqStatusGetLabel(status: ContentFAQStatusType): string {
  const labels: Record<ContentFAQStatusType, string> = {
    [CONTENT_FAQ_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_FAQ_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_FAQ_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_FAQ_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_FAQ_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_FAQ_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_FAQ_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_FAQ_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_FAQ_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_FAQ_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_FAQ_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentFaqStatusGetCategory(
  status: ContentFAQStatusType
): ContentFAQStatusCategory {
  const categories: Record<ContentFAQStatusType, ContentFAQStatusCategory> = {
    [CONTENT_FAQ_STATUS.STATUSES.DRAFT]: CONTENT_FAQ_STATUS.CATEGORIES.CREATION,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_FAQ_STATUS.CATEGORIES.REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW]: CONTENT_FAQ_STATUS.CATEGORIES.REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.REVIEWED]: CONTENT_FAQ_STATUS.CATEGORIES.REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_FAQ_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_FAQ_STATUS.STATUSES.APPROVED]: CONTENT_FAQ_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_FAQ_STATUS.STATUSES.REJECTED]: CONTENT_FAQ_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_FAQ_STATUS.STATUSES.PUBLISHED]: CONTENT_FAQ_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.SCHEDULED]: CONTENT_FAQ_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.PRIVATE]: CONTENT_FAQ_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.UNLISTED]: CONTENT_FAQ_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.ARCHIVED]: CONTENT_FAQ_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_FAQ_STATUS.STATUSES.DEPRECATED]: CONTENT_FAQ_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_FAQ_STATUS.STATUSES.DELETED]: CONTENT_FAQ_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_FAQ_STATUS.CATEGORIES.CREATION;
}

export function contentFaqStatusGetColor(status: ContentFAQStatusType): ContentFAQStatusColor {
  const colorMap: Record<ContentFAQStatusType, ContentFAQStatusColor> = {
    [CONTENT_FAQ_STATUS.STATUSES.DRAFT]: CONTENT_FAQ_STATUS.COLORS.DRAFT,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_FAQ_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW]: CONTENT_FAQ_STATUS.COLORS.IN_REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.REVIEWED]: CONTENT_FAQ_STATUS.COLORS.REVIEWED,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_FAQ_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_FAQ_STATUS.STATUSES.APPROVED]: CONTENT_FAQ_STATUS.COLORS.APPROVED,
    [CONTENT_FAQ_STATUS.STATUSES.REJECTED]: CONTENT_FAQ_STATUS.COLORS.REJECTED,
    [CONTENT_FAQ_STATUS.STATUSES.PUBLISHED]: CONTENT_FAQ_STATUS.COLORS.PUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.SCHEDULED]: CONTENT_FAQ_STATUS.COLORS.SCHEDULED,
    [CONTENT_FAQ_STATUS.STATUSES.PRIVATE]: CONTENT_FAQ_STATUS.COLORS.PRIVATE,
    [CONTENT_FAQ_STATUS.STATUSES.UNLISTED]: CONTENT_FAQ_STATUS.COLORS.UNLISTED,
    [CONTENT_FAQ_STATUS.STATUSES.ARCHIVED]: CONTENT_FAQ_STATUS.COLORS.ARCHIVED,
    [CONTENT_FAQ_STATUS.STATUSES.DEPRECATED]: CONTENT_FAQ_STATUS.COLORS.DEPRECATED,
    [CONTENT_FAQ_STATUS.STATUSES.DELETED]: CONTENT_FAQ_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentFaqStatusGetPriority(
  status: ContentFAQStatusType
): ContentFAQStatusPriority {
  const priorityMap: Record<ContentFAQStatusType, ContentFAQStatusPriority> = {
    [CONTENT_FAQ_STATUS.STATUSES.DRAFT]: CONTENT_FAQ_STATUS.PRIORITY.DRAFT,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_FAQ_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW]: CONTENT_FAQ_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_FAQ_STATUS.STATUSES.REVIEWED]: CONTENT_FAQ_STATUS.PRIORITY.REVIEWED,
    [CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_FAQ_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_FAQ_STATUS.STATUSES.APPROVED]: CONTENT_FAQ_STATUS.PRIORITY.APPROVED,
    [CONTENT_FAQ_STATUS.STATUSES.REJECTED]: CONTENT_FAQ_STATUS.PRIORITY.REJECTED,
    [CONTENT_FAQ_STATUS.STATUSES.PUBLISHED]: CONTENT_FAQ_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_FAQ_STATUS.STATUSES.SCHEDULED]: CONTENT_FAQ_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_FAQ_STATUS.STATUSES.PRIVATE]: CONTENT_FAQ_STATUS.PRIORITY.PRIVATE,
    [CONTENT_FAQ_STATUS.STATUSES.UNLISTED]: CONTENT_FAQ_STATUS.PRIORITY.UNLISTED,
    [CONTENT_FAQ_STATUS.STATUSES.ARCHIVED]: CONTENT_FAQ_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_FAQ_STATUS.STATUSES.DEPRECATED]: CONTENT_FAQ_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_FAQ_STATUS.STATUSES.DELETED]: CONTENT_FAQ_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentFaqStatusIsPublished(status: ContentFAQStatusType): boolean {
  const publishedStatuses: ContentFAQStatusType[] = [
    CONTENT_FAQ_STATUS.STATUSES.PUBLISHED,
    CONTENT_FAQ_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentFaqStatusIsEditable(status: ContentFAQStatusType): boolean {
  const editableStatuses: ContentFAQStatusType[] = [
    CONTENT_FAQ_STATUS.STATUSES.DRAFT,
    CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW,
    CONTENT_FAQ_STATUS.STATUSES.REVIEWED,
    CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_FAQ_STATUS.STATUSES.REJECTED,
    CONTENT_FAQ_STATUS.STATUSES.PRIVATE,
    CONTENT_FAQ_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentFaqStatusIsApproved(status: ContentFAQStatusType): boolean {
  const approvedStatuses: ContentFAQStatusType[] = [
    CONTENT_FAQ_STATUS.STATUSES.APPROVED,
    CONTENT_FAQ_STATUS.STATUSES.PUBLISHED,
    CONTENT_FAQ_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentFaqStatusIsArchived(status: ContentFAQStatusType): boolean {
  const archivedStatuses: ContentFAQStatusType[] = [
    CONTENT_FAQ_STATUS.STATUSES.ARCHIVED,
    CONTENT_FAQ_STATUS.STATUSES.DEPRECATED,
    CONTENT_FAQ_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentFaqStatusCanTransitionTo(
  currentStatus: ContentFAQStatusType,
  targetStatus: ContentFAQStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_FAQ_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentFaqStatusGetAvailableTransitions(
  currentStatus: ContentFAQStatusType
): ContentFAQStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_FAQ_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentFAQStatusType[];
}

export function contentFaqStatusGetSequence(): ContentFAQStatusType[] {
  return [
    CONTENT_FAQ_STATUS.STATUSES.DRAFT,
    CONTENT_FAQ_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_FAQ_STATUS.STATUSES.IN_REVIEW,
    CONTENT_FAQ_STATUS.STATUSES.REVIEWED,
    CONTENT_FAQ_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_FAQ_STATUS.STATUSES.APPROVED,
    CONTENT_FAQ_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentFaqStatusGetStateLabel(state: ContentFAQState): string {
  const labels: Record<ContentFAQState, string> = {
    [CONTENT_FAQ_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_FAQ_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_FAQ_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_FAQ_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_FAQ_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_FAQ_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_FAQ_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentFaqStatusGetActionLabel(action: ContentFAQAction): string {
  const labels: Record<ContentFAQAction, string> = {
    [CONTENT_FAQ_STATUS.ACTIONS.CREATE]: 'Create FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.UPDATE]: 'Update FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.PUBLISH]: 'Publish FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.DELETE]: 'Delete FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.RESTORE]: 'Restore FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.ARCHIVE]: 'Archive FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.REVIEW]: 'Review FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.APPROVE]: 'Approve FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.REJECT]: 'Reject FAQ',
    [CONTENT_FAQ_STATUS.ACTIONS.SCHEDULE]: 'Schedule FAQ',
  };
  return labels[action] || 'Unknown Action';
}

export function contentFaqStatusIsValid(status: string): status is ContentFAQStatusType {
  return Object.values(CONTENT_FAQ_STATUS.STATUSES).includes(status as ContentFAQStatusType);
}

export function contentFaqStatusIsValidState(state: string): state is ContentFAQState {
  return Object.values(CONTENT_FAQ_STATUS.STATE).includes(state as ContentFAQState);
}
