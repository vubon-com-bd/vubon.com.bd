/**
 * Guide Status Constants
 * Status definitions for guide lifecycle
 */

export const CONTENT_GUIDE_STATUS = {
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

  // Guide State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Guide Action Types
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

// Guide Statuses
export type ContentGuideStatusType =
  (typeof CONTENT_GUIDE_STATUS.STATUSES)[keyof typeof CONTENT_GUIDE_STATUS.STATUSES];

// Status Categories
export type ContentGuideStatusCategory =
  (typeof CONTENT_GUIDE_STATUS.CATEGORIES)[keyof typeof CONTENT_GUIDE_STATUS.CATEGORIES];

// Status Colors
export type ContentGuideStatusColor =
  (typeof CONTENT_GUIDE_STATUS.COLORS)[keyof typeof CONTENT_GUIDE_STATUS.COLORS];

// Status Priority
export type ContentGuideStatusPriority =
  (typeof CONTENT_GUIDE_STATUS.PRIORITY)[keyof typeof CONTENT_GUIDE_STATUS.PRIORITY];

// Guide State
export type ContentGuideState =
  (typeof CONTENT_GUIDE_STATUS.STATE)[keyof typeof CONTENT_GUIDE_STATUS.STATE];

// Guide Actions
export type ContentGuideAction =
  (typeof CONTENT_GUIDE_STATUS.ACTIONS)[keyof typeof CONTENT_GUIDE_STATUS.ACTIONS];

// Utility Functions
export function contentGuideStatusGetLabel(status: ContentGuideStatusType): string {
  const labels: Record<ContentGuideStatusType, string> = {
    [CONTENT_GUIDE_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_GUIDE_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_GUIDE_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_GUIDE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_GUIDE_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_GUIDE_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_GUIDE_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_GUIDE_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_GUIDE_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentGuideStatusGetCategory(
  status: ContentGuideStatusType
): ContentGuideStatusCategory {
  const categories: Record<ContentGuideStatusType, ContentGuideStatusCategory> = {
    [CONTENT_GUIDE_STATUS.STATUSES.DRAFT]: CONTENT_GUIDE_STATUS.CATEGORIES.CREATION,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_GUIDE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW]: CONTENT_GUIDE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.REVIEWED]: CONTENT_GUIDE_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_GUIDE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GUIDE_STATUS.STATUSES.APPROVED]: CONTENT_GUIDE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GUIDE_STATUS.STATUSES.REJECTED]: CONTENT_GUIDE_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED]: CONTENT_GUIDE_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED]: CONTENT_GUIDE_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.PRIVATE]: CONTENT_GUIDE_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.UNLISTED]: CONTENT_GUIDE_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.ARCHIVED]: CONTENT_GUIDE_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_GUIDE_STATUS.STATUSES.DEPRECATED]: CONTENT_GUIDE_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_GUIDE_STATUS.STATUSES.DELETED]: CONTENT_GUIDE_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_GUIDE_STATUS.CATEGORIES.CREATION;
}

export function contentGuideStatusGetColor(
  status: ContentGuideStatusType
): ContentGuideStatusColor {
  const colorMap: Record<ContentGuideStatusType, ContentGuideStatusColor> = {
    [CONTENT_GUIDE_STATUS.STATUSES.DRAFT]: CONTENT_GUIDE_STATUS.COLORS.DRAFT,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_GUIDE_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW]: CONTENT_GUIDE_STATUS.COLORS.IN_REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.REVIEWED]: CONTENT_GUIDE_STATUS.COLORS.REVIEWED,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_GUIDE_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_GUIDE_STATUS.STATUSES.APPROVED]: CONTENT_GUIDE_STATUS.COLORS.APPROVED,
    [CONTENT_GUIDE_STATUS.STATUSES.REJECTED]: CONTENT_GUIDE_STATUS.COLORS.REJECTED,
    [CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED]: CONTENT_GUIDE_STATUS.COLORS.PUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED]: CONTENT_GUIDE_STATUS.COLORS.SCHEDULED,
    [CONTENT_GUIDE_STATUS.STATUSES.PRIVATE]: CONTENT_GUIDE_STATUS.COLORS.PRIVATE,
    [CONTENT_GUIDE_STATUS.STATUSES.UNLISTED]: CONTENT_GUIDE_STATUS.COLORS.UNLISTED,
    [CONTENT_GUIDE_STATUS.STATUSES.ARCHIVED]: CONTENT_GUIDE_STATUS.COLORS.ARCHIVED,
    [CONTENT_GUIDE_STATUS.STATUSES.DEPRECATED]: CONTENT_GUIDE_STATUS.COLORS.DEPRECATED,
    [CONTENT_GUIDE_STATUS.STATUSES.DELETED]: CONTENT_GUIDE_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentGuideStatusGetPriority(
  status: ContentGuideStatusType
): ContentGuideStatusPriority {
  const priorityMap: Record<ContentGuideStatusType, ContentGuideStatusPriority> = {
    [CONTENT_GUIDE_STATUS.STATUSES.DRAFT]: CONTENT_GUIDE_STATUS.PRIORITY.DRAFT,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_GUIDE_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW]: CONTENT_GUIDE_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_GUIDE_STATUS.STATUSES.REVIEWED]: CONTENT_GUIDE_STATUS.PRIORITY.REVIEWED,
    [CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_GUIDE_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_GUIDE_STATUS.STATUSES.APPROVED]: CONTENT_GUIDE_STATUS.PRIORITY.APPROVED,
    [CONTENT_GUIDE_STATUS.STATUSES.REJECTED]: CONTENT_GUIDE_STATUS.PRIORITY.REJECTED,
    [CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED]: CONTENT_GUIDE_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED]: CONTENT_GUIDE_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_GUIDE_STATUS.STATUSES.PRIVATE]: CONTENT_GUIDE_STATUS.PRIORITY.PRIVATE,
    [CONTENT_GUIDE_STATUS.STATUSES.UNLISTED]: CONTENT_GUIDE_STATUS.PRIORITY.UNLISTED,
    [CONTENT_GUIDE_STATUS.STATUSES.ARCHIVED]: CONTENT_GUIDE_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_GUIDE_STATUS.STATUSES.DEPRECATED]: CONTENT_GUIDE_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_GUIDE_STATUS.STATUSES.DELETED]: CONTENT_GUIDE_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentGuideStatusIsPublished(status: ContentGuideStatusType): boolean {
  const publishedStatuses: ContentGuideStatusType[] = [
    CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED,
    CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentGuideStatusIsEditable(status: ContentGuideStatusType): boolean {
  const editableStatuses: ContentGuideStatusType[] = [
    CONTENT_GUIDE_STATUS.STATUSES.DRAFT,
    CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW,
    CONTENT_GUIDE_STATUS.STATUSES.REVIEWED,
    CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_GUIDE_STATUS.STATUSES.REJECTED,
    CONTENT_GUIDE_STATUS.STATUSES.PRIVATE,
    CONTENT_GUIDE_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentGuideStatusIsApproved(status: ContentGuideStatusType): boolean {
  const approvedStatuses: ContentGuideStatusType[] = [
    CONTENT_GUIDE_STATUS.STATUSES.APPROVED,
    CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED,
    CONTENT_GUIDE_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentGuideStatusIsArchived(status: ContentGuideStatusType): boolean {
  const archivedStatuses: ContentGuideStatusType[] = [
    CONTENT_GUIDE_STATUS.STATUSES.ARCHIVED,
    CONTENT_GUIDE_STATUS.STATUSES.DEPRECATED,
    CONTENT_GUIDE_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentGuideStatusCanTransitionTo(
  currentStatus: ContentGuideStatusType,
  targetStatus: ContentGuideStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_GUIDE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentGuideStatusGetAvailableTransitions(
  currentStatus: ContentGuideStatusType
): ContentGuideStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_GUIDE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentGuideStatusType[];
}

export function contentGuideStatusGetSequence(): ContentGuideStatusType[] {
  return [
    CONTENT_GUIDE_STATUS.STATUSES.DRAFT,
    CONTENT_GUIDE_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_GUIDE_STATUS.STATUSES.IN_REVIEW,
    CONTENT_GUIDE_STATUS.STATUSES.REVIEWED,
    CONTENT_GUIDE_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_GUIDE_STATUS.STATUSES.APPROVED,
    CONTENT_GUIDE_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentGuideStatusGetStateLabel(state: ContentGuideState): string {
  const labels: Record<ContentGuideState, string> = {
    [CONTENT_GUIDE_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_GUIDE_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_GUIDE_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_GUIDE_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_GUIDE_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_GUIDE_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_GUIDE_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentGuideStatusGetActionLabel(action: ContentGuideAction): string {
  const labels: Record<ContentGuideAction, string> = {
    [CONTENT_GUIDE_STATUS.ACTIONS.CREATE]: 'Create Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.UPDATE]: 'Update Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.PUBLISH]: 'Publish Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.DELETE]: 'Delete Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.RESTORE]: 'Restore Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.ARCHIVE]: 'Archive Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.REVIEW]: 'Review Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.APPROVE]: 'Approve Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.REJECT]: 'Reject Guide',
    [CONTENT_GUIDE_STATUS.ACTIONS.SCHEDULE]: 'Schedule Guide',
  };
  return labels[action] || 'Unknown Action';
}

export function contentGuideStatusIsValid(status: string): status is ContentGuideStatusType {
  return Object.values(CONTENT_GUIDE_STATUS.STATUSES).includes(status as ContentGuideStatusType);
}

export function contentGuideStatusIsValidState(state: string): state is ContentGuideState {
  return Object.values(CONTENT_GUIDE_STATUS.STATE).includes(state as ContentGuideState);
}
