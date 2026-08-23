/**
 * Blog Status Constants
 * Status definitions for blog lifecycle
 */

export const CONTENT_BLOG_STATUS = {
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

  // Blog State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Blog Action Types
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

// Blog Statuses
export type ContentBlogStatusType =
  (typeof CONTENT_BLOG_STATUS.STATUSES)[keyof typeof CONTENT_BLOG_STATUS.STATUSES];

// Status Categories
export type ContentBlogStatusCategory =
  (typeof CONTENT_BLOG_STATUS.CATEGORIES)[keyof typeof CONTENT_BLOG_STATUS.CATEGORIES];

// Status Colors
export type ContentBlogStatusColor =
  (typeof CONTENT_BLOG_STATUS.COLORS)[keyof typeof CONTENT_BLOG_STATUS.COLORS];

// Status Priority
export type ContentBlogStatusPriority =
  (typeof CONTENT_BLOG_STATUS.PRIORITY)[keyof typeof CONTENT_BLOG_STATUS.PRIORITY];

// Blog State
export type ContentBlogState =
  (typeof CONTENT_BLOG_STATUS.STATE)[keyof typeof CONTENT_BLOG_STATUS.STATE];

// Blog Actions
export type ContentBlogAction =
  (typeof CONTENT_BLOG_STATUS.ACTIONS)[keyof typeof CONTENT_BLOG_STATUS.ACTIONS];

// Utility Functions
export function contentBlogStatusGetLabel(status: ContentBlogStatusType): string {
  const labels: Record<ContentBlogStatusType, string> = {
    [CONTENT_BLOG_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_BLOG_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_BLOG_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_BLOG_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_BLOG_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_BLOG_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_BLOG_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_BLOG_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_BLOG_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_BLOG_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_BLOG_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentBlogStatusGetCategory(
  status: ContentBlogStatusType
): ContentBlogStatusCategory {
  const categories: Record<ContentBlogStatusType, ContentBlogStatusCategory> = {
    [CONTENT_BLOG_STATUS.STATUSES.DRAFT]: CONTENT_BLOG_STATUS.CATEGORIES.CREATION,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_BLOG_STATUS.CATEGORIES.REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW]: CONTENT_BLOG_STATUS.CATEGORIES.REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.REVIEWED]: CONTENT_BLOG_STATUS.CATEGORIES.REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_BLOG_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_BLOG_STATUS.STATUSES.APPROVED]: CONTENT_BLOG_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_BLOG_STATUS.STATUSES.REJECTED]: CONTENT_BLOG_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_BLOG_STATUS.STATUSES.PUBLISHED]: CONTENT_BLOG_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.SCHEDULED]: CONTENT_BLOG_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.PRIVATE]: CONTENT_BLOG_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.UNLISTED]: CONTENT_BLOG_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.ARCHIVED]: CONTENT_BLOG_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_BLOG_STATUS.STATUSES.DEPRECATED]: CONTENT_BLOG_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_BLOG_STATUS.STATUSES.DELETED]: CONTENT_BLOG_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_BLOG_STATUS.CATEGORIES.CREATION;
}

export function contentBlogStatusGetColor(status: ContentBlogStatusType): ContentBlogStatusColor {
  const colorMap: Record<ContentBlogStatusType, ContentBlogStatusColor> = {
    [CONTENT_BLOG_STATUS.STATUSES.DRAFT]: CONTENT_BLOG_STATUS.COLORS.DRAFT,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_BLOG_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW]: CONTENT_BLOG_STATUS.COLORS.IN_REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.REVIEWED]: CONTENT_BLOG_STATUS.COLORS.REVIEWED,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_BLOG_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_BLOG_STATUS.STATUSES.APPROVED]: CONTENT_BLOG_STATUS.COLORS.APPROVED,
    [CONTENT_BLOG_STATUS.STATUSES.REJECTED]: CONTENT_BLOG_STATUS.COLORS.REJECTED,
    [CONTENT_BLOG_STATUS.STATUSES.PUBLISHED]: CONTENT_BLOG_STATUS.COLORS.PUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.SCHEDULED]: CONTENT_BLOG_STATUS.COLORS.SCHEDULED,
    [CONTENT_BLOG_STATUS.STATUSES.PRIVATE]: CONTENT_BLOG_STATUS.COLORS.PRIVATE,
    [CONTENT_BLOG_STATUS.STATUSES.UNLISTED]: CONTENT_BLOG_STATUS.COLORS.UNLISTED,
    [CONTENT_BLOG_STATUS.STATUSES.ARCHIVED]: CONTENT_BLOG_STATUS.COLORS.ARCHIVED,
    [CONTENT_BLOG_STATUS.STATUSES.DEPRECATED]: CONTENT_BLOG_STATUS.COLORS.DEPRECATED,
    [CONTENT_BLOG_STATUS.STATUSES.DELETED]: CONTENT_BLOG_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentBlogStatusGetPriority(
  status: ContentBlogStatusType
): ContentBlogStatusPriority {
  const priorityMap: Record<ContentBlogStatusType, ContentBlogStatusPriority> = {
    [CONTENT_BLOG_STATUS.STATUSES.DRAFT]: CONTENT_BLOG_STATUS.PRIORITY.DRAFT,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_BLOG_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW]: CONTENT_BLOG_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_BLOG_STATUS.STATUSES.REVIEWED]: CONTENT_BLOG_STATUS.PRIORITY.REVIEWED,
    [CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_BLOG_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_BLOG_STATUS.STATUSES.APPROVED]: CONTENT_BLOG_STATUS.PRIORITY.APPROVED,
    [CONTENT_BLOG_STATUS.STATUSES.REJECTED]: CONTENT_BLOG_STATUS.PRIORITY.REJECTED,
    [CONTENT_BLOG_STATUS.STATUSES.PUBLISHED]: CONTENT_BLOG_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_BLOG_STATUS.STATUSES.SCHEDULED]: CONTENT_BLOG_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_BLOG_STATUS.STATUSES.PRIVATE]: CONTENT_BLOG_STATUS.PRIORITY.PRIVATE,
    [CONTENT_BLOG_STATUS.STATUSES.UNLISTED]: CONTENT_BLOG_STATUS.PRIORITY.UNLISTED,
    [CONTENT_BLOG_STATUS.STATUSES.ARCHIVED]: CONTENT_BLOG_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_BLOG_STATUS.STATUSES.DEPRECATED]: CONTENT_BLOG_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_BLOG_STATUS.STATUSES.DELETED]: CONTENT_BLOG_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentBlogStatusIsPublished(status: ContentBlogStatusType): boolean {
  const publishedStatuses: ContentBlogStatusType[] = [
    CONTENT_BLOG_STATUS.STATUSES.PUBLISHED,
    CONTENT_BLOG_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentBlogStatusIsEditable(status: ContentBlogStatusType): boolean {
  const editableStatuses: ContentBlogStatusType[] = [
    CONTENT_BLOG_STATUS.STATUSES.DRAFT,
    CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW,
    CONTENT_BLOG_STATUS.STATUSES.REVIEWED,
    CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_BLOG_STATUS.STATUSES.REJECTED,
    CONTENT_BLOG_STATUS.STATUSES.PRIVATE,
    CONTENT_BLOG_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentBlogStatusIsArchived(status: ContentBlogStatusType): boolean {
  const archivedStatuses: ContentBlogStatusType[] = [
    CONTENT_BLOG_STATUS.STATUSES.ARCHIVED,
    CONTENT_BLOG_STATUS.STATUSES.DEPRECATED,
    CONTENT_BLOG_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentBlogStatusCanTransitionTo(
  currentStatus: ContentBlogStatusType,
  targetStatus: ContentBlogStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_BLOG_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentBlogStatusGetAvailableTransitions(
  currentStatus: ContentBlogStatusType
): ContentBlogStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_BLOG_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentBlogStatusType[];
}

export function contentBlogStatusGetSequence(): ContentBlogStatusType[] {
  return [
    CONTENT_BLOG_STATUS.STATUSES.DRAFT,
    CONTENT_BLOG_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_BLOG_STATUS.STATUSES.IN_REVIEW,
    CONTENT_BLOG_STATUS.STATUSES.REVIEWED,
    CONTENT_BLOG_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_BLOG_STATUS.STATUSES.APPROVED,
    CONTENT_BLOG_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentBlogStatusGetStateLabel(state: ContentBlogState): string {
  const labels: Record<ContentBlogState, string> = {
    [CONTENT_BLOG_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_BLOG_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_BLOG_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_BLOG_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_BLOG_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_BLOG_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_BLOG_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentBlogStatusGetActionLabel(action: ContentBlogAction): string {
  const labels: Record<ContentBlogAction, string> = {
    [CONTENT_BLOG_STATUS.ACTIONS.CREATE]: 'Create Post',
    [CONTENT_BLOG_STATUS.ACTIONS.UPDATE]: 'Update Post',
    [CONTENT_BLOG_STATUS.ACTIONS.PUBLISH]: 'Publish Post',
    [CONTENT_BLOG_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Post',
    [CONTENT_BLOG_STATUS.ACTIONS.DELETE]: 'Delete Post',
    [CONTENT_BLOG_STATUS.ACTIONS.RESTORE]: 'Restore Post',
    [CONTENT_BLOG_STATUS.ACTIONS.ARCHIVE]: 'Archive Post',
    [CONTENT_BLOG_STATUS.ACTIONS.REVIEW]: 'Review Post',
    [CONTENT_BLOG_STATUS.ACTIONS.APPROVE]: 'Approve Post',
    [CONTENT_BLOG_STATUS.ACTIONS.REJECT]: 'Reject Post',
    [CONTENT_BLOG_STATUS.ACTIONS.SCHEDULE]: 'Schedule Post',
  };
  return labels[action] || 'Unknown Action';
}

export function contentBlogStatusIsValid(status: string): status is ContentBlogStatusType {
  return Object.values(CONTENT_BLOG_STATUS.STATUSES).includes(status as ContentBlogStatusType);
}

export function contentBlogStatusIsValidState(state: string): state is ContentBlogState {
  return Object.values(CONTENT_BLOG_STATUS.STATE).includes(state as ContentBlogState);
}
