/**
 * Case Study Status Constants
 * Status definitions for case study lifecycle
 */

export const CONTENT_CASE_STUDY_STATUS = {
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

  // Case Study State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Case Study Action Types
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

// Case Study Statuses
export type ContentCaseStudyStatusType =
  (typeof CONTENT_CASE_STUDY_STATUS.STATUSES)[keyof typeof CONTENT_CASE_STUDY_STATUS.STATUSES];

// Status Categories
export type ContentCaseStudyStatusCategory =
  (typeof CONTENT_CASE_STUDY_STATUS.CATEGORIES)[keyof typeof CONTENT_CASE_STUDY_STATUS.CATEGORIES];

// Status Colors
export type ContentCaseStudyStatusColor =
  (typeof CONTENT_CASE_STUDY_STATUS.COLORS)[keyof typeof CONTENT_CASE_STUDY_STATUS.COLORS];

// Status Priority
export type ContentCaseStudyStatusPriority =
  (typeof CONTENT_CASE_STUDY_STATUS.PRIORITY)[keyof typeof CONTENT_CASE_STUDY_STATUS.PRIORITY];

// Case Study State
export type ContentCaseStudyState =
  (typeof CONTENT_CASE_STUDY_STATUS.STATE)[keyof typeof CONTENT_CASE_STUDY_STATUS.STATE];

// Case Study Actions
export type ContentCaseStudyAction =
  (typeof CONTENT_CASE_STUDY_STATUS.ACTIONS)[keyof typeof CONTENT_CASE_STUDY_STATUS.ACTIONS];

// Utility Functions
export function contentCaseStudyStatusGetLabel(status: ContentCaseStudyStatusType): string {
  const labels: Record<ContentCaseStudyStatusType, string> = {
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PRIVATE]: 'Private',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentCaseStudyStatusGetCategory(
  status: ContentCaseStudyStatusType
): ContentCaseStudyStatusCategory {
  const categories: Record<ContentCaseStudyStatusType, ContentCaseStudyStatusCategory> = {
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.CREATION,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_CASE_STUDY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_CASE_STUDY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REJECTED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PRIVATE]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.UNLISTED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.ARCHIVED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DEPRECATED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DELETED]: CONTENT_CASE_STUDY_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_CASE_STUDY_STATUS.CATEGORIES.CREATION;
}

export function contentCaseStudyStatusGetColor(
  status: ContentCaseStudyStatusType
): ContentCaseStudyStatusColor {
  const colorMap: Record<ContentCaseStudyStatusType, ContentCaseStudyStatusColor> = {
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT]: CONTENT_CASE_STUDY_STATUS.COLORS.DRAFT,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_CASE_STUDY_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW]: CONTENT_CASE_STUDY_STATUS.COLORS.IN_REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED]: CONTENT_CASE_STUDY_STATUS.COLORS.REVIEWED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_CASE_STUDY_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED]: CONTENT_CASE_STUDY_STATUS.COLORS.APPROVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REJECTED]: CONTENT_CASE_STUDY_STATUS.COLORS.REJECTED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED]: CONTENT_CASE_STUDY_STATUS.COLORS.PUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED]: CONTENT_CASE_STUDY_STATUS.COLORS.SCHEDULED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PRIVATE]: CONTENT_CASE_STUDY_STATUS.COLORS.PRIVATE,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.UNLISTED]: CONTENT_CASE_STUDY_STATUS.COLORS.UNLISTED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.ARCHIVED]: CONTENT_CASE_STUDY_STATUS.COLORS.ARCHIVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DEPRECATED]: CONTENT_CASE_STUDY_STATUS.COLORS.DEPRECATED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DELETED]: CONTENT_CASE_STUDY_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentCaseStudyStatusGetPriority(
  status: ContentCaseStudyStatusType
): ContentCaseStudyStatusPriority {
  const priorityMap: Record<ContentCaseStudyStatusType, ContentCaseStudyStatusPriority> = {
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT]: CONTENT_CASE_STUDY_STATUS.PRIORITY.DRAFT,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_CASE_STUDY_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW]: CONTENT_CASE_STUDY_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.REVIEWED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_CASE_STUDY_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.APPROVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.REJECTED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.REJECTED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.PRIVATE]: CONTENT_CASE_STUDY_STATUS.PRIORITY.PRIVATE,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.UNLISTED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.UNLISTED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.ARCHIVED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DEPRECATED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.DEPRECATED,
    [CONTENT_CASE_STUDY_STATUS.STATUSES.DELETED]: CONTENT_CASE_STUDY_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentCaseStudyStatusIsPublished(status: ContentCaseStudyStatusType): boolean {
  const publishedStatuses: ContentCaseStudyStatusType[] = [
    CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentCaseStudyStatusIsEditable(status: ContentCaseStudyStatusType): boolean {
  const editableStatuses: ContentCaseStudyStatusType[] = [
    CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW,
    CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_CASE_STUDY_STATUS.STATUSES.REJECTED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PRIVATE,
    CONTENT_CASE_STUDY_STATUS.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentCaseStudyStatusIsApproved(status: ContentCaseStudyStatusType): boolean {
  const approvedStatuses: ContentCaseStudyStatusType[] = [
    CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentCaseStudyStatusIsArchived(status: ContentCaseStudyStatusType): boolean {
  const archivedStatuses: ContentCaseStudyStatusType[] = [
    CONTENT_CASE_STUDY_STATUS.STATUSES.ARCHIVED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.DEPRECATED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function contentCaseStudyStatusCanTransitionTo(
  currentStatus: ContentCaseStudyStatusType,
  targetStatus: ContentCaseStudyStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_CASE_STUDY_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentCaseStudyStatusGetAvailableTransitions(
  currentStatus: ContentCaseStudyStatusType
): ContentCaseStudyStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_CASE_STUDY_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentCaseStudyStatusType[];
}

export function contentCaseStudyStatusGetSequence(): ContentCaseStudyStatusType[] {
  return [
    CONTENT_CASE_STUDY_STATUS.STATUSES.DRAFT,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_CASE_STUDY_STATUS.STATUSES.IN_REVIEW,
    CONTENT_CASE_STUDY_STATUS.STATUSES.REVIEWED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_CASE_STUDY_STATUS.STATUSES.APPROVED,
    CONTENT_CASE_STUDY_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentCaseStudyStatusGetStateLabel(state: ContentCaseStudyState): string {
  const labels: Record<ContentCaseStudyState, string> = {
    [CONTENT_CASE_STUDY_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_CASE_STUDY_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_CASE_STUDY_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_CASE_STUDY_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_CASE_STUDY_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_CASE_STUDY_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_CASE_STUDY_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentCaseStudyStatusGetActionLabel(action: ContentCaseStudyAction): string {
  const labels: Record<ContentCaseStudyAction, string> = {
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.CREATE]: 'Create Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.UPDATE]: 'Update Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.PUBLISH]: 'Publish Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.DELETE]: 'Delete Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.RESTORE]: 'Restore Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.ARCHIVE]: 'Archive Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.REVIEW]: 'Review Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.APPROVE]: 'Approve Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.REJECT]: 'Reject Case Study',
    [CONTENT_CASE_STUDY_STATUS.ACTIONS.SCHEDULE]: 'Schedule Case Study',
  };
  return labels[action] || 'Unknown Action';
}

export function contentCaseStudyStatusIsValid(
  status: string
): status is ContentCaseStudyStatusType {
  return Object.values(CONTENT_CASE_STUDY_STATUS.STATUSES).includes(
    status as ContentCaseStudyStatusType
  );
}

export function contentCaseStudyStatusIsValidState(state: string): state is ContentCaseStudyState {
  return Object.values(CONTENT_CASE_STUDY_STATUS.STATE).includes(state as ContentCaseStudyState);
}
