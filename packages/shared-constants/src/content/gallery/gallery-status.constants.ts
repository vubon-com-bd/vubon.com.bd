/**
 * Gallery Status Constants
 * Status definitions for gallery lifecycle
 */

export const CONTENT_GALLERY_STATUS = {
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

  // Gallery State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Gallery Action Types
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

// Gallery Statuses
export type ContentGalleryStatusType =
  (typeof CONTENT_GALLERY_STATUS.STATUSES)[keyof typeof CONTENT_GALLERY_STATUS.STATUSES];

// Status Categories
export type ContentGalleryStatusCategory =
  (typeof CONTENT_GALLERY_STATUS.CATEGORIES)[keyof typeof CONTENT_GALLERY_STATUS.CATEGORIES];

// Status Colors
export type ContentGalleryStatusColor =
  (typeof CONTENT_GALLERY_STATUS.COLORS)[keyof typeof CONTENT_GALLERY_STATUS.COLORS];

// Status Priority
export type ContentGalleryStatusPriority =
  (typeof CONTENT_GALLERY_STATUS.PRIORITY)[keyof typeof CONTENT_GALLERY_STATUS.PRIORITY];

// Gallery State
export type ContentGalleryState =
  (typeof CONTENT_GALLERY_STATUS.STATE)[keyof typeof CONTENT_GALLERY_STATUS.STATE];

// Gallery Actions
export type ContentGalleryAction =
  (typeof CONTENT_GALLERY_STATUS.ACTIONS)[keyof typeof CONTENT_GALLERY_STATUS.ACTIONS];

// Utility Functions
export function contentGalleryStatusGetLabel(status: ContentGalleryStatusType): string {
  const labels: Record<ContentGalleryStatusType, string> = {
    [CONTENT_GALLERY_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_GALLERY_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_GALLERY_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_GALLERY_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_GALLERY_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_GALLERY_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_GALLERY_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_GALLERY_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_GALLERY_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_GALLERY_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentGalleryStatusGetCategory(
  status: ContentGalleryStatusType
): ContentGalleryStatusCategory {
  const categories: Record<ContentGalleryStatusType, ContentGalleryStatusCategory> = {
    [CONTENT_GALLERY_STATUS.STATUSES.DRAFT]: CONTENT_GALLERY_STATUS.CATEGORIES.CREATION,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_GALLERY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW]: CONTENT_GALLERY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.REVIEWED]: CONTENT_GALLERY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_GALLERY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GALLERY_STATUS.STATUSES.APPROVED]: CONTENT_GALLERY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GALLERY_STATUS.STATUSES.REJECTED]: CONTENT_GALLERY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED]: CONTENT_GALLERY_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.SCHEDULED]: CONTENT_GALLERY_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.PRIVATE]: CONTENT_GALLERY_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.UNLISTED]: CONTENT_GALLERY_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.ARCHIVED]: CONTENT_GALLERY_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_GALLERY_STATUS.STATUSES.DEPRECATED]: CONTENT_GALLERY_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_GALLERY_STATUS.STATUSES.DELETED]: CONTENT_GALLERY_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_GALLERY_STATUS.CATEGORIES.CREATION;
}

export function contentGalleryStatusGetColor(
  status: ContentGalleryStatusType
): ContentGalleryStatusColor {
  const colorMap: Record<ContentGalleryStatusType, ContentGalleryStatusColor> = {
    [CONTENT_GALLERY_STATUS.STATUSES.DRAFT]: CONTENT_GALLERY_STATUS.COLORS.DRAFT,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_GALLERY_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW]: CONTENT_GALLERY_STATUS.COLORS.IN_REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.REVIEWED]: CONTENT_GALLERY_STATUS.COLORS.REVIEWED,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_GALLERY_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_GALLERY_STATUS.STATUSES.APPROVED]: CONTENT_GALLERY_STATUS.COLORS.APPROVED,
    [CONTENT_GALLERY_STATUS.STATUSES.REJECTED]: CONTENT_GALLERY_STATUS.COLORS.REJECTED,
    [CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED]: CONTENT_GALLERY_STATUS.COLORS.PUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.SCHEDULED]: CONTENT_GALLERY_STATUS.COLORS.SCHEDULED,
    [CONTENT_GALLERY_STATUS.STATUSES.PRIVATE]: CONTENT_GALLERY_STATUS.COLORS.PRIVATE,
    [CONTENT_GALLERY_STATUS.STATUSES.UNLISTED]: CONTENT_GALLERY_STATUS.COLORS.UNLISTED,
    [CONTENT_GALLERY_STATUS.STATUSES.ARCHIVED]: CONTENT_GALLERY_STATUS.COLORS.ARCHIVED,
    [CONTENT_GALLERY_STATUS.STATUSES.DEPRECATED]: CONTENT_GALLERY_STATUS.COLORS.DEPRECATED,
    [CONTENT_GALLERY_STATUS.STATUSES.DELETED]: CONTENT_GALLERY_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentGalleryStatusGetPriority(
  status: ContentGalleryStatusType
): ContentGalleryStatusPriority {
  const priorityMap: Record<ContentGalleryStatusType, ContentGalleryStatusPriority> = {
    [CONTENT_GALLERY_STATUS.STATUSES.DRAFT]: CONTENT_GALLERY_STATUS.PRIORITY.DRAFT,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_GALLERY_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW]: CONTENT_GALLERY_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_GALLERY_STATUS.STATUSES.REVIEWED]: CONTENT_GALLERY_STATUS.PRIORITY.REVIEWED,
    [CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_GALLERY_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_GALLERY_STATUS.STATUSES.APPROVED]: CONTENT_GALLERY_STATUS.PRIORITY.APPROVED,
    [CONTENT_GALLERY_STATUS.STATUSES.REJECTED]: CONTENT_GALLERY_STATUS.PRIORITY.REJECTED,
    [CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED]: CONTENT_GALLERY_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_GALLERY_STATUS.STATUSES.SCHEDULED]: CONTENT_GALLERY_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_GALLERY_STATUS.STATUSES.PRIVATE]: CONTENT_GALLERY_STATUS.PRIORITY.PRIVATE,
    [CONTENT_GALLERY_STATUS.STATUSES.UNLISTED]: CONTENT_GALLERY_STATUS.PRIORITY.UNLISTED,
    [CONTENT_GALLERY_STATUS.STATUSES.ARCHIVED]: CONTENT_GALLERY_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_GALLERY_STATUS.STATUSES.DEPRECATED]: CONTENT_GALLERY_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_GALLERY_STATUS.STATUSES.DELETED]: CONTENT_GALLERY_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentGalleryStatusIsPublished(status: ContentGalleryStatusType): boolean {
  const publishedStatuses: ContentGalleryStatusType[] = [
    CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED,
    CONTENT_GALLERY_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentGalleryStatusIsEditable(status: ContentGalleryStatusType): boolean {
  const editableStatuses: ContentGalleryStatusType[] = [
    CONTENT_GALLERY_STATUS.STATUSES.DRAFT,
    CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW,
    CONTENT_GALLERY_STATUS.STATUSES.REVIEWED,
    CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_GALLERY_STATUS.STATUSES.REJECTED,
    CONTENT_GALLERY_STATUS.STATUSES.PRIVATE,
    CONTENT_GALLERY_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentGalleryStatusIsArchived(status: ContentGalleryStatusType): boolean {
  const archivedStatuses: ContentGalleryStatusType[] = [
    CONTENT_GALLERY_STATUS.STATUSES.ARCHIVED,
    CONTENT_GALLERY_STATUS.STATUSES.DEPRECATED,
    CONTENT_GALLERY_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentGalleryStatusCanTransitionTo(
  currentStatus: ContentGalleryStatusType,
  targetStatus: ContentGalleryStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_GALLERY_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentGalleryStatusGetAvailableTransitions(
  currentStatus: ContentGalleryStatusType
): ContentGalleryStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_GALLERY_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentGalleryStatusType[];
}

export function contentGalleryStatusGetSequence(): ContentGalleryStatusType[] {
  return [
    CONTENT_GALLERY_STATUS.STATUSES.DRAFT,
    CONTENT_GALLERY_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_GALLERY_STATUS.STATUSES.IN_REVIEW,
    CONTENT_GALLERY_STATUS.STATUSES.REVIEWED,
    CONTENT_GALLERY_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_GALLERY_STATUS.STATUSES.APPROVED,
    CONTENT_GALLERY_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentGalleryStatusGetStateLabel(state: ContentGalleryState): string {
  const labels: Record<ContentGalleryState, string> = {
    [CONTENT_GALLERY_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_GALLERY_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_GALLERY_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_GALLERY_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_GALLERY_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_GALLERY_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_GALLERY_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentGalleryStatusGetActionLabel(action: ContentGalleryAction): string {
  const labels: Record<ContentGalleryAction, string> = {
    [CONTENT_GALLERY_STATUS.ACTIONS.CREATE]: 'Create Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.UPDATE]: 'Update Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.PUBLISH]: 'Publish Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.DELETE]: 'Delete Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.RESTORE]: 'Restore Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.ARCHIVE]: 'Archive Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.REVIEW]: 'Review Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.APPROVE]: 'Approve Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.REJECT]: 'Reject Gallery',
    [CONTENT_GALLERY_STATUS.ACTIONS.SCHEDULE]: 'Schedule Gallery',
  };
  return labels[action] || 'Unknown Action';
}

export function contentGalleryStatusIsValid(status: string): status is ContentGalleryStatusType {
  return Object.values(CONTENT_GALLERY_STATUS.STATUSES).includes(
    status as ContentGalleryStatusType
  );
}

export function contentGalleryStatusIsValidState(state: string): state is ContentGalleryState {
  return Object.values(CONTENT_GALLERY_STATUS.STATE).includes(state as ContentGalleryState);
}
