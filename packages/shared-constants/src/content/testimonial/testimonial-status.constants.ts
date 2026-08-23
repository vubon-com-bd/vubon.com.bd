/**
 * Testimonial Status Constants
 * Status definitions for testimonial lifecycle
 */

export const CONTENT_TESTIMONIAL_STATUS = {
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

  // Testimonial State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Testimonial Action Types
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

// Testimonial Statuses
export type ContentTestimonialStatusType =
  (typeof CONTENT_TESTIMONIAL_STATUS.STATUSES)[keyof typeof CONTENT_TESTIMONIAL_STATUS.STATUSES];

// Status Categories
export type ContentTestimonialStatusCategory =
  (typeof CONTENT_TESTIMONIAL_STATUS.CATEGORIES)[keyof typeof CONTENT_TESTIMONIAL_STATUS.CATEGORIES];

// Status Colors
export type ContentTestimonialStatusColor =
  (typeof CONTENT_TESTIMONIAL_STATUS.COLORS)[keyof typeof CONTENT_TESTIMONIAL_STATUS.COLORS];

// Status Priority
export type ContentTestimonialStatusPriority =
  (typeof CONTENT_TESTIMONIAL_STATUS.PRIORITY)[keyof typeof CONTENT_TESTIMONIAL_STATUS.PRIORITY];

// Testimonial State
export type ContentTestimonialState =
  (typeof CONTENT_TESTIMONIAL_STATUS.STATE)[keyof typeof CONTENT_TESTIMONIAL_STATUS.STATE];

// Testimonial Actions
export type ContentTestimonialAction =
  (typeof CONTENT_TESTIMONIAL_STATUS.ACTIONS)[keyof typeof CONTENT_TESTIMONIAL_STATUS.ACTIONS];

// Utility Functions
export function contentTestimonialStatusGetLabel(status: ContentTestimonialStatusType): string {
  const labels: Record<ContentTestimonialStatusType, string> = {
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentTestimonialStatusGetCategory(
  status: ContentTestimonialStatusType
): ContentTestimonialStatusCategory {
  const categories: Record<ContentTestimonialStatusType, ContentTestimonialStatusCategory> = {
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.CREATION,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REJECTED]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PRIVATE]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.UNLISTED]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.ARCHIVED]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DEPRECATED]:
      CONTENT_TESTIMONIAL_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DELETED]: CONTENT_TESTIMONIAL_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_TESTIMONIAL_STATUS.CATEGORIES.CREATION;
}

export function contentTestimonialStatusGetColor(
  status: ContentTestimonialStatusType
): ContentTestimonialStatusColor {
  const colorMap: Record<ContentTestimonialStatusType, ContentTestimonialStatusColor> = {
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT]: CONTENT_TESTIMONIAL_STATUS.COLORS.DRAFT,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_TESTIMONIAL_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW]: CONTENT_TESTIMONIAL_STATUS.COLORS.IN_REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED]: CONTENT_TESTIMONIAL_STATUS.COLORS.REVIEWED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_TESTIMONIAL_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED]: CONTENT_TESTIMONIAL_STATUS.COLORS.APPROVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REJECTED]: CONTENT_TESTIMONIAL_STATUS.COLORS.REJECTED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED]: CONTENT_TESTIMONIAL_STATUS.COLORS.PUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED]: CONTENT_TESTIMONIAL_STATUS.COLORS.SCHEDULED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PRIVATE]: CONTENT_TESTIMONIAL_STATUS.COLORS.PRIVATE,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.UNLISTED]: CONTENT_TESTIMONIAL_STATUS.COLORS.UNLISTED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.ARCHIVED]: CONTENT_TESTIMONIAL_STATUS.COLORS.ARCHIVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DEPRECATED]: CONTENT_TESTIMONIAL_STATUS.COLORS.DEPRECATED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DELETED]: CONTENT_TESTIMONIAL_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentTestimonialStatusGetPriority(
  status: ContentTestimonialStatusType
): ContentTestimonialStatusPriority {
  const priorityMap: Record<ContentTestimonialStatusType, ContentTestimonialStatusPriority> = {
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.DRAFT,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_TESTIMONIAL_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.REVIEWED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_TESTIMONIAL_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.APPROVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.REJECTED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.REJECTED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.PRIVATE]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.PRIVATE,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.UNLISTED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.UNLISTED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.ARCHIVED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DEPRECATED]:
      CONTENT_TESTIMONIAL_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_TESTIMONIAL_STATUS.STATUSES.DELETED]: CONTENT_TESTIMONIAL_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentTestimonialStatusIsPublished(status: ContentTestimonialStatusType): boolean {
  const publishedStatuses: ContentTestimonialStatusType[] = [
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentTestimonialStatusIsEditable(status: ContentTestimonialStatusType): boolean {
  const editableStatuses: ContentTestimonialStatusType[] = [
    CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.REJECTED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PRIVATE,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentTestimonialStatusIsApproved(status: ContentTestimonialStatusType): boolean {
  const approvedStatuses: ContentTestimonialStatusType[] = [
    CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentTestimonialStatusIsArchived(status: ContentTestimonialStatusType): boolean {
  const archivedStatuses: ContentTestimonialStatusType[] = [
    CONTENT_TESTIMONIAL_STATUS.STATUSES.ARCHIVED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.DEPRECATED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentTestimonialStatusCanTransitionTo(
  currentStatus: ContentTestimonialStatusType,
  targetStatus: ContentTestimonialStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_TESTIMONIAL_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentTestimonialStatusGetAvailableTransitions(
  currentStatus: ContentTestimonialStatusType
): ContentTestimonialStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_TESTIMONIAL_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentTestimonialStatusType[];
}

export function contentTestimonialStatusGetSequence(): ContentTestimonialStatusType[] {
  return [
    CONTENT_TESTIMONIAL_STATUS.STATUSES.DRAFT,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.IN_REVIEW,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.REVIEWED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.APPROVED,
    CONTENT_TESTIMONIAL_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentTestimonialStatusGetStateLabel(state: ContentTestimonialState): string {
  const labels: Record<ContentTestimonialState, string> = {
    [CONTENT_TESTIMONIAL_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_TESTIMONIAL_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_TESTIMONIAL_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_TESTIMONIAL_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_TESTIMONIAL_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_TESTIMONIAL_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_TESTIMONIAL_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentTestimonialStatusGetActionLabel(action: ContentTestimonialAction): string {
  const labels: Record<ContentTestimonialAction, string> = {
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.CREATE]: 'Create Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.UPDATE]: 'Update Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.PUBLISH]: 'Publish Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.DELETE]: 'Delete Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.RESTORE]: 'Restore Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.ARCHIVE]: 'Archive Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.REVIEW]: 'Review Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.APPROVE]: 'Approve Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.REJECT]: 'Reject Testimonial',
    [CONTENT_TESTIMONIAL_STATUS.ACTIONS.SCHEDULE]: 'Schedule Testimonial',
  };
  return labels[action] || 'Unknown Action';
}

export function contentTestimonialStatusIsValid(
  status: string
): status is ContentTestimonialStatusType {
  return Object.values(CONTENT_TESTIMONIAL_STATUS.STATUSES).includes(
    status as ContentTestimonialStatusType
  );
}

export function contentTestimonialStatusIsValidState(
  state: string
): state is ContentTestimonialState {
  return Object.values(CONTENT_TESTIMONIAL_STATUS.STATE).includes(state as ContentTestimonialState);
}
