/**
 * Announcement Status Constants
 * Status definitions for announcement lifecycle
 */

export const CONTENT_ANNOUNCEMENT_STATUS = {
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
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
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
    EXPIRED: '#6B7280',
    ARCHIVED: '#6B7280',
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
    EXPIRED: 9,
    ARCHIVED: 10,
    DELETED: 11,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['published', 'scheduled', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    PUBLISHED: ['expired', 'archived', 'deleted'],
    SCHEDULED: ['published', 'draft', 'deleted'],
    EXPIRED: ['archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  } as const,

  // Announcement State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    PUBLISHING: 'publishing',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Announcement Action Types
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

// Announcement Statuses
export type ContentAnnouncementStatusType =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.STATUSES)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.STATUSES];

// Status Categories
export type ContentAnnouncementStatusCategory =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES];

// Status Colors
export type ContentAnnouncementStatusColor =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.COLORS)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.COLORS];

// Status Priority
export type ContentAnnouncementStatusPriority =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.PRIORITY)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.PRIORITY];

// Announcement State
export type ContentAnnouncementState =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.STATE)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.STATE];

// Announcement Actions
export type ContentAnnouncementAction =
  (typeof CONTENT_ANNOUNCEMENT_STATUS.ACTIONS)[keyof typeof CONTENT_ANNOUNCEMENT_STATUS.ACTIONS];

// Utility Functions
export function contentAnnouncementStatusGetLabel(status: ContentAnnouncementStatusType): string {
  const labels: Record<ContentAnnouncementStatusType, string> = {
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.EXPIRED]: 'Expired',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentAnnouncementStatusGetCategory(
  status: ContentAnnouncementStatusType
): ContentAnnouncementStatusCategory {
  const categories: Record<ContentAnnouncementStatusType, ContentAnnouncementStatusCategory> = {
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT]: CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.CREATION,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW]: CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED]: CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REJECTED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.PUBLISHED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.EXPIRED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.UNPUBLISHED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.ARCHIVED]:
      CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DELETED]: CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_ANNOUNCEMENT_STATUS.CATEGORIES.CREATION;
}

export function contentAnnouncementStatusGetColor(
  status: ContentAnnouncementStatusType
): ContentAnnouncementStatusColor {
  const colorMap: Record<ContentAnnouncementStatusType, ContentAnnouncementStatusColor> = {
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.DRAFT,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_ANNOUNCEMENT_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.IN_REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.REVIEWED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_ANNOUNCEMENT_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.APPROVED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REJECTED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.REJECTED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.PUBLISHED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.SCHEDULED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.EXPIRED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.EXPIRED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.ARCHIVED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.ARCHIVED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DELETED]: CONTENT_ANNOUNCEMENT_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentAnnouncementStatusGetPriority(
  status: ContentAnnouncementStatusType
): ContentAnnouncementStatusPriority {
  const priorityMap: Record<ContentAnnouncementStatusType, ContentAnnouncementStatusPriority> = {
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.DRAFT,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW]:
      CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.REVIEWED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.APPROVED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REJECTED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.REJECTED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED]:
      CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.PUBLISHED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED]:
      CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.EXPIRED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.EXPIRED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.ARCHIVED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DELETED]: CONTENT_ANNOUNCEMENT_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentAnnouncementStatusIsPublished(
  status: ContentAnnouncementStatusType
): boolean {
  const publishedStatuses: ContentAnnouncementStatusType[] = [
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentAnnouncementStatusIsEditable(
  status: ContentAnnouncementStatusType
): boolean {
  const editableStatuses: ContentAnnouncementStatusType[] = [
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REJECTED,
  ];
  return editableStatuses.includes(status);
}

export function contentAnnouncementStatusIsActive(status: ContentAnnouncementStatusType): boolean {
  const activeStatuses: ContentAnnouncementStatusType[] = [
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.SCHEDULED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED,
  ];
  return activeStatuses.includes(status);
}

export function contentAnnouncementStatusIsArchived(
  status: ContentAnnouncementStatusType
): boolean {
  const archivedStatuses: ContentAnnouncementStatusType[] = [
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.ARCHIVED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DELETED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.EXPIRED,
  ];
  return archivedStatuses.includes(status);
}

export function contentAnnouncementStatusCanTransitionTo(
  currentStatus: ContentAnnouncementStatusType,
  targetStatus: ContentAnnouncementStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_ANNOUNCEMENT_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentAnnouncementStatusGetAvailableTransitions(
  currentStatus: ContentAnnouncementStatusType
): ContentAnnouncementStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_ANNOUNCEMENT_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentAnnouncementStatusType[];
}

export function contentAnnouncementStatusGetSequence(): ContentAnnouncementStatusType[] {
  return [
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.DRAFT,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.IN_REVIEW,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.REVIEWED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.APPROVED,
    CONTENT_ANNOUNCEMENT_STATUS.STATUSES.PUBLISHED,
  ];
}

export function contentAnnouncementStatusGetStateLabel(state: ContentAnnouncementState): string {
  const labels: Record<ContentAnnouncementState, string> = {
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.PUBLISHING]: 'Publishing',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_ANNOUNCEMENT_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentAnnouncementStatusGetActionLabel(action: ContentAnnouncementAction): string {
  const labels: Record<ContentAnnouncementAction, string> = {
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.CREATE]: 'Create Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.UPDATE]: 'Update Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.PUBLISH]: 'Publish Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.UNPUBLISH]: 'Unpublish Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.DELETE]: 'Delete Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.RESTORE]: 'Restore Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.ARCHIVE]: 'Archive Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.REVIEW]: 'Review Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.APPROVE]: 'Approve Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.REJECT]: 'Reject Announcement',
    [CONTENT_ANNOUNCEMENT_STATUS.ACTIONS.SCHEDULE]: 'Schedule Announcement',
  };
  return labels[action] || 'Unknown Action';
}

export function contentAnnouncementStatusIsValid(
  status: string
): status is ContentAnnouncementStatusType {
  return Object.values(CONTENT_ANNOUNCEMENT_STATUS.STATUSES).includes(
    status as ContentAnnouncementStatusType
  );
}

export function contentAnnouncementStatusIsValidState(
  state: string
): state is ContentAnnouncementState {
  return Object.values(CONTENT_ANNOUNCEMENT_STATUS.STATE).includes(
    state as ContentAnnouncementState
  );
}
