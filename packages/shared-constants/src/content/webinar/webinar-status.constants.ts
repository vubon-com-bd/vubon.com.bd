/**
 * Webinar Status Constants
 * Status definitions for webinar lifecycle
 */

export const CONTENT_WEBINAR_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    UPCOMING: 'upcoming',
    LIVE: 'live',
    ONGOING: 'ongoing',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    POSTPONED: 'postponed',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    REVIEW: 'review',
    APPROVAL: 'approval',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
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
    SCHEDULED: '#06B6D4',
    UPCOMING: '#3B82F6',
    LIVE: '#EF4444',
    ONGOING: '#10B981',
    PAUSED: '#F59E0B',
    COMPLETED: '#10B981',
    CANCELLED: '#EF4444',
    POSTPONED: '#F59E0B',
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
    SCHEDULED: 7,
    UPCOMING: 8,
    LIVE: 9,
    ONGOING: 10,
    PAUSED: 11,
    COMPLETED: 12,
    CANCELLED: 13,
    POSTPONED: 14,
    ARCHIVED: 15,
    DELETED: 16,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['scheduled', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    SCHEDULED: ['upcoming', 'postponed', 'cancelled', 'deleted'],
    UPCOMING: ['live', 'postponed', 'cancelled', 'deleted'],
    LIVE: ['ongoing', 'paused', 'cancelled', 'deleted'],
    ONGOING: ['completed', 'paused', 'cancelled', 'deleted'],
    PAUSED: ['live', 'ongoing', 'cancelled', 'deleted'],
    COMPLETED: ['archived', 'deleted'],
    CANCELLED: ['deleted'],
    POSTPONED: ['scheduled', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  } as const,

  // Webinar State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    SAVING: 'saving',
    SAVED: 'saved',
    STARTING: 'starting',
    ENDING: 'ending',
    DELETING: 'deleting',
    ERROR: 'error',
  } as const,

  // Webinar Action Types
  ACTIONS: {
    CREATE: 'create',
    UPDATE: 'update',
    SCHEDULE: 'schedule',
    START: 'start',
    PAUSE: 'pause',
    RESUME: 'resume',
    END: 'end',
    CANCEL: 'cancel',
    POSTPONE: 'postpone',
    DELETE: 'delete',
    RESTORE: 'restore',
    ARCHIVE: 'archive',
    REVIEW: 'review',
    APPROVE: 'approve',
    REJECT: 'reject',
  } as const,
} as const;

// Webinar Statuses
export type ContentWebinarStatusType =
  (typeof CONTENT_WEBINAR_STATUS.STATUSES)[keyof typeof CONTENT_WEBINAR_STATUS.STATUSES];

// Status Categories
export type ContentWebinarStatusCategory =
  (typeof CONTENT_WEBINAR_STATUS.CATEGORIES)[keyof typeof CONTENT_WEBINAR_STATUS.CATEGORIES];

// Status Colors
export type ContentWebinarStatusColor =
  (typeof CONTENT_WEBINAR_STATUS.COLORS)[keyof typeof CONTENT_WEBINAR_STATUS.COLORS];

// Status Priority
export type ContentWebinarStatusPriority =
  (typeof CONTENT_WEBINAR_STATUS.PRIORITY)[keyof typeof CONTENT_WEBINAR_STATUS.PRIORITY];

// Webinar State
export type ContentWebinarState =
  (typeof CONTENT_WEBINAR_STATUS.STATE)[keyof typeof CONTENT_WEBINAR_STATUS.STATE];

// Webinar Actions
export type ContentWebinarAction =
  (typeof CONTENT_WEBINAR_STATUS.ACTIONS)[keyof typeof CONTENT_WEBINAR_STATUS.ACTIONS];

// Utility Functions
export function contentWebinarStatusGetLabel(status: ContentWebinarStatusType): string {
  const labels: Record<ContentWebinarStatusType, string> = {
    [CONTENT_WEBINAR_STATUS.STATUSES.DRAFT]: 'Draft',
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_WEBINAR_STATUS.STATUSES.APPROVED]: 'Approved',
    [CONTENT_WEBINAR_STATUS.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING]: 'Upcoming',
    [CONTENT_WEBINAR_STATUS.STATUSES.LIVE]: 'Live',
    [CONTENT_WEBINAR_STATUS.STATUSES.ONGOING]: 'Ongoing',
    [CONTENT_WEBINAR_STATUS.STATUSES.PAUSED]: 'Paused',
    [CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED]: 'Completed',
    [CONTENT_WEBINAR_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [CONTENT_WEBINAR_STATUS.STATUSES.POSTPONED]: 'Postponed',
    [CONTENT_WEBINAR_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_WEBINAR_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentWebinarStatusGetCategory(
  status: ContentWebinarStatusType
): ContentWebinarStatusCategory {
  const categories: Record<ContentWebinarStatusType, ContentWebinarStatusCategory> = {
    [CONTENT_WEBINAR_STATUS.STATUSES.DRAFT]: CONTENT_WEBINAR_STATUS.CATEGORIES.CREATION,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_WEBINAR_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW]: CONTENT_WEBINAR_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED]: CONTENT_WEBINAR_STATUS.CATEGORIES.REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL]: CONTENT_WEBINAR_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WEBINAR_STATUS.STATUSES.APPROVED]: CONTENT_WEBINAR_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WEBINAR_STATUS.STATUSES.REJECTED]: CONTENT_WEBINAR_STATUS.CATEGORIES.APPROVAL,
    [CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED]: CONTENT_WEBINAR_STATUS.CATEGORIES.SCHEDULED,
    [CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING]: CONTENT_WEBINAR_STATUS.CATEGORIES.SCHEDULED,
    [CONTENT_WEBINAR_STATUS.STATUSES.LIVE]: CONTENT_WEBINAR_STATUS.CATEGORIES.ACTIVE,
    [CONTENT_WEBINAR_STATUS.STATUSES.ONGOING]: CONTENT_WEBINAR_STATUS.CATEGORIES.ACTIVE,
    [CONTENT_WEBINAR_STATUS.STATUSES.PAUSED]: CONTENT_WEBINAR_STATUS.CATEGORIES.ACTIVE,
    [CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED]: CONTENT_WEBINAR_STATUS.CATEGORIES.COMPLETED,
    [CONTENT_WEBINAR_STATUS.STATUSES.CANCELLED]: CONTENT_WEBINAR_STATUS.CATEGORIES.CANCELLED,
    [CONTENT_WEBINAR_STATUS.STATUSES.POSTPONED]: CONTENT_WEBINAR_STATUS.CATEGORIES.SCHEDULED,
    [CONTENT_WEBINAR_STATUS.STATUSES.ARCHIVED]: CONTENT_WEBINAR_STATUS.CATEGORIES.ARCHIVED,
    [CONTENT_WEBINAR_STATUS.STATUSES.DELETED]: CONTENT_WEBINAR_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONTENT_WEBINAR_STATUS.CATEGORIES.CREATION;
}

export function contentWebinarStatusGetColor(
  status: ContentWebinarStatusType
): ContentWebinarStatusColor {
  const colorMap: Record<ContentWebinarStatusType, ContentWebinarStatusColor> = {
    [CONTENT_WEBINAR_STATUS.STATUSES.DRAFT]: CONTENT_WEBINAR_STATUS.COLORS.DRAFT,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW]: CONTENT_WEBINAR_STATUS.COLORS.PENDING_REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW]: CONTENT_WEBINAR_STATUS.COLORS.IN_REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED]: CONTENT_WEBINAR_STATUS.COLORS.REVIEWED,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_WEBINAR_STATUS.COLORS.PENDING_APPROVAL,
    [CONTENT_WEBINAR_STATUS.STATUSES.APPROVED]: CONTENT_WEBINAR_STATUS.COLORS.APPROVED,
    [CONTENT_WEBINAR_STATUS.STATUSES.REJECTED]: CONTENT_WEBINAR_STATUS.COLORS.REJECTED,
    [CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED]: CONTENT_WEBINAR_STATUS.COLORS.SCHEDULED,
    [CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING]: CONTENT_WEBINAR_STATUS.COLORS.UPCOMING,
    [CONTENT_WEBINAR_STATUS.STATUSES.LIVE]: CONTENT_WEBINAR_STATUS.COLORS.LIVE,
    [CONTENT_WEBINAR_STATUS.STATUSES.ONGOING]: CONTENT_WEBINAR_STATUS.COLORS.ONGOING,
    [CONTENT_WEBINAR_STATUS.STATUSES.PAUSED]: CONTENT_WEBINAR_STATUS.COLORS.PAUSED,
    [CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED]: CONTENT_WEBINAR_STATUS.COLORS.COMPLETED,
    [CONTENT_WEBINAR_STATUS.STATUSES.CANCELLED]: CONTENT_WEBINAR_STATUS.COLORS.CANCELLED,
    [CONTENT_WEBINAR_STATUS.STATUSES.POSTPONED]: CONTENT_WEBINAR_STATUS.COLORS.POSTPONED,
    [CONTENT_WEBINAR_STATUS.STATUSES.ARCHIVED]: CONTENT_WEBINAR_STATUS.COLORS.ARCHIVED,
    [CONTENT_WEBINAR_STATUS.STATUSES.DELETED]: CONTENT_WEBINAR_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function contentWebinarStatusGetPriority(
  status: ContentWebinarStatusType
): ContentWebinarStatusPriority {
  const priorityMap: Record<ContentWebinarStatusType, ContentWebinarStatusPriority> = {
    [CONTENT_WEBINAR_STATUS.STATUSES.DRAFT]: CONTENT_WEBINAR_STATUS.PRIORITY.DRAFT,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW]:
      CONTENT_WEBINAR_STATUS.PRIORITY.PENDING_REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW]: CONTENT_WEBINAR_STATUS.PRIORITY.IN_REVIEW,
    [CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED]: CONTENT_WEBINAR_STATUS.PRIORITY.REVIEWED,
    [CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL]:
      CONTENT_WEBINAR_STATUS.PRIORITY.PENDING_APPROVAL,
    [CONTENT_WEBINAR_STATUS.STATUSES.APPROVED]: CONTENT_WEBINAR_STATUS.PRIORITY.APPROVED,
    [CONTENT_WEBINAR_STATUS.STATUSES.REJECTED]: CONTENT_WEBINAR_STATUS.PRIORITY.REJECTED,
    [CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED]: CONTENT_WEBINAR_STATUS.PRIORITY.SCHEDULED,
    [CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING]: CONTENT_WEBINAR_STATUS.PRIORITY.UPCOMING,
    [CONTENT_WEBINAR_STATUS.STATUSES.LIVE]: CONTENT_WEBINAR_STATUS.PRIORITY.LIVE,
    [CONTENT_WEBINAR_STATUS.STATUSES.ONGOING]: CONTENT_WEBINAR_STATUS.PRIORITY.ONGOING,
    [CONTENT_WEBINAR_STATUS.STATUSES.PAUSED]: CONTENT_WEBINAR_STATUS.PRIORITY.PAUSED,
    [CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED]: CONTENT_WEBINAR_STATUS.PRIORITY.COMPLETED,
    [CONTENT_WEBINAR_STATUS.STATUSES.CANCELLED]: CONTENT_WEBINAR_STATUS.PRIORITY.CANCELLED,
    [CONTENT_WEBINAR_STATUS.STATUSES.POSTPONED]: CONTENT_WEBINAR_STATUS.PRIORITY.POSTPONED,
    [CONTENT_WEBINAR_STATUS.STATUSES.ARCHIVED]: CONTENT_WEBINAR_STATUS.PRIORITY.ARCHIVED,
    [CONTENT_WEBINAR_STATUS.STATUSES.DELETED]: CONTENT_WEBINAR_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function contentWebinarStatusIsPublished(status: ContentWebinarStatusType): boolean {
  const publishedStatuses: ContentWebinarStatusType[] = [
    CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED,
    CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING,
    CONTENT_WEBINAR_STATUS.STATUSES.LIVE,
    CONTENT_WEBINAR_STATUS.STATUSES.ONGOING,
  ];
  return publishedStatuses.includes(status);
}

export function contentWebinarStatusIsEditable(status: ContentWebinarStatusType): boolean {
  const editableStatuses: ContentWebinarStatusType[] = [
    CONTENT_WEBINAR_STATUS.STATUSES.DRAFT,
    CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW,
    CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED,
    CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_WEBINAR_STATUS.STATUSES.REJECTED,
    CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED,
    CONTENT_WEBINAR_STATUS.STATUSES.POSTPONED,
  ];
  return editableStatuses.includes(status);
}

export function contentWebinarStatusIsLive(status: ContentWebinarStatusType): boolean {
  const liveStatuses: ContentWebinarStatusType[] = [
    CONTENT_WEBINAR_STATUS.STATUSES.LIVE,
    CONTENT_WEBINAR_STATUS.STATUSES.ONGOING,
  ];
  return liveStatuses.includes(status);
}

export function contentWebinarStatusIsCompleted(status: ContentWebinarStatusType): boolean {
  const completedStatuses: ContentWebinarStatusType[] = [
    CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED,
    CONTENT_WEBINAR_STATUS.STATUSES.CANCELLED,
    CONTENT_WEBINAR_STATUS.STATUSES.ARCHIVED,
    CONTENT_WEBINAR_STATUS.STATUSES.DELETED,
  ];
  return completedStatuses.includes(status);
}

export function contentWebinarStatusCanTransitionTo(
  currentStatus: ContentWebinarStatusType,
  targetStatus: ContentWebinarStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = CONTENT_WEBINAR_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function contentWebinarStatusGetAvailableTransitions(
  currentStatus: ContentWebinarStatusType
): ContentWebinarStatusType[] {
  const transitions: Record<string, readonly string[]> = CONTENT_WEBINAR_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ContentWebinarStatusType[];
}

export function contentWebinarStatusGetSequence(): ContentWebinarStatusType[] {
  return [
    CONTENT_WEBINAR_STATUS.STATUSES.DRAFT,
    CONTENT_WEBINAR_STATUS.STATUSES.PENDING_REVIEW,
    CONTENT_WEBINAR_STATUS.STATUSES.IN_REVIEW,
    CONTENT_WEBINAR_STATUS.STATUSES.REVIEWED,
    CONTENT_WEBINAR_STATUS.STATUSES.PENDING_APPROVAL,
    CONTENT_WEBINAR_STATUS.STATUSES.APPROVED,
    CONTENT_WEBINAR_STATUS.STATUSES.SCHEDULED,
    CONTENT_WEBINAR_STATUS.STATUSES.UPCOMING,
    CONTENT_WEBINAR_STATUS.STATUSES.LIVE,
    CONTENT_WEBINAR_STATUS.STATUSES.ONGOING,
    CONTENT_WEBINAR_STATUS.STATUSES.COMPLETED,
  ];
}

export function contentWebinarStatusGetStateLabel(state: ContentWebinarState): string {
  const labels: Record<ContentWebinarState, string> = {
    [CONTENT_WEBINAR_STATUS.STATE.LOADING]: 'Loading',
    [CONTENT_WEBINAR_STATUS.STATE.LOADED]: 'Loaded',
    [CONTENT_WEBINAR_STATUS.STATE.SAVING]: 'Saving',
    [CONTENT_WEBINAR_STATUS.STATE.SAVED]: 'Saved',
    [CONTENT_WEBINAR_STATUS.STATE.STARTING]: 'Starting',
    [CONTENT_WEBINAR_STATUS.STATE.ENDING]: 'Ending',
    [CONTENT_WEBINAR_STATUS.STATE.DELETING]: 'Deleting',
    [CONTENT_WEBINAR_STATUS.STATE.ERROR]: 'Error',
  };
  return labels[state] || 'Unknown State';
}

export function contentWebinarStatusGetActionLabel(action: ContentWebinarAction): string {
  const labels: Record<ContentWebinarAction, string> = {
    [CONTENT_WEBINAR_STATUS.ACTIONS.CREATE]: 'Create Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.UPDATE]: 'Update Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.SCHEDULE]: 'Schedule Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.START]: 'Start Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.PAUSE]: 'Pause Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.RESUME]: 'Resume Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.END]: 'End Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.CANCEL]: 'Cancel Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.POSTPONE]: 'Postpone Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.DELETE]: 'Delete Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.RESTORE]: 'Restore Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.ARCHIVE]: 'Archive Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.REVIEW]: 'Review Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.APPROVE]: 'Approve Webinar',
    [CONTENT_WEBINAR_STATUS.ACTIONS.REJECT]: 'Reject Webinar',
  };
  return labels[action] || 'Unknown Action';
}

export function contentWebinarStatusIsValid(status: string): status is ContentWebinarStatusType {
  return Object.values(CONTENT_WEBINAR_STATUS.STATUSES).includes(
    status as ContentWebinarStatusType
  );
}

export function contentWebinarStatusIsValidState(state: string): state is ContentWebinarState {
  return Object.values(CONTENT_WEBINAR_STATUS.STATE).includes(state as ContentWebinarState);
}
