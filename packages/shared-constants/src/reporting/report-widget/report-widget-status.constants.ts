/**
 * Report Widget Status Constants
 * Status definitions for widget lifecycle
 */

export const REPORT_WIDGET_STATUS = {
  // Widget Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    REVIEW: 'review',
    APPROVAL: 'approval',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_REVIEW: '#F59E0B',
    IN_REVIEW: '#3B82F6',
    REVIEWED: '#8B5CF6',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    PUBLISHED: '#10B981',
    ACTIVE: '#10B981',
    INACTIVE: '#6B7280',
    PAUSED: '#F59E0B',
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
    APPROVED: 4,
    REJECTED: 5,
    PUBLISHED: 6,
    ACTIVE: 7,
    INACTIVE: 8,
    PAUSED: 9,
    ARCHIVED: 10,
    DEPRECATED: 11,
    DELETED: 12,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['approved', 'rejected', 'deleted'],
    APPROVED: ['published', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    PUBLISHED: ['active', 'inactive', 'archived', 'deleted'],
    ACTIVE: ['inactive', 'paused', 'archived', 'deleted'],
    INACTIVE: ['active', 'archived', 'deleted'],
    PAUSED: ['active', 'archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DEPRECATED: ['archived', 'deleted'],
    DELETED: [],
  } as const,

  // Widget Visibility
  VISIBILITY: {
    PRIVATE: 'private',
    TEAM: 'team',
    ORGANIZATION: 'organization',
    PUBLIC: 'public',
  } as const,

  // Widget State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error',
    EMPTY: 'empty',
    REFRESHING: 'refreshing',
    UPDATING: 'updating',
  } as const,
} as const;

// Widget Statuses
export type ReportWidgetStatusType =
  (typeof REPORT_WIDGET_STATUS.STATUSES)[keyof typeof REPORT_WIDGET_STATUS.STATUSES];

// Status Categories
export type ReportWidgetStatusCategory =
  (typeof REPORT_WIDGET_STATUS.CATEGORIES)[keyof typeof REPORT_WIDGET_STATUS.CATEGORIES];

// Status Colors
export type ReportWidgetStatusColor =
  (typeof REPORT_WIDGET_STATUS.COLORS)[keyof typeof REPORT_WIDGET_STATUS.COLORS];

// Status Priority
export type ReportWidgetStatusPriority =
  (typeof REPORT_WIDGET_STATUS.PRIORITY)[keyof typeof REPORT_WIDGET_STATUS.PRIORITY];

// Widget Visibility
export type ReportWidgetVisibility =
  (typeof REPORT_WIDGET_STATUS.VISIBILITY)[keyof typeof REPORT_WIDGET_STATUS.VISIBILITY];

// Widget State
export type ReportWidgetState =
  (typeof REPORT_WIDGET_STATUS.STATE)[keyof typeof REPORT_WIDGET_STATUS.STATE];

// Utility Functions
export function reportWidgetStatusGetLabel(status: ReportWidgetStatusType): string {
  const labels: Record<ReportWidgetStatusType, string> = {
    [REPORT_WIDGET_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_WIDGET_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [REPORT_WIDGET_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [REPORT_WIDGET_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [REPORT_WIDGET_STATUS.STATUSES.APPROVED]: 'Approved',
    [REPORT_WIDGET_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_WIDGET_STATUS.STATUSES.PUBLISHED]: 'Published',
    [REPORT_WIDGET_STATUS.STATUSES.ACTIVE]: 'Active',
    [REPORT_WIDGET_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [REPORT_WIDGET_STATUS.STATUSES.PAUSED]: 'Paused',
    [REPORT_WIDGET_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [REPORT_WIDGET_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [REPORT_WIDGET_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function reportWidgetStatusGetCategory(
  status: ReportWidgetStatusType
): ReportWidgetStatusCategory {
  const categories: Record<ReportWidgetStatusType, ReportWidgetStatusCategory> = {
    [REPORT_WIDGET_STATUS.STATUSES.DRAFT]: REPORT_WIDGET_STATUS.CATEGORIES.CREATION,
    [REPORT_WIDGET_STATUS.STATUSES.PENDING_REVIEW]: REPORT_WIDGET_STATUS.CATEGORIES.REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.IN_REVIEW]: REPORT_WIDGET_STATUS.CATEGORIES.REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.REVIEWED]: REPORT_WIDGET_STATUS.CATEGORIES.REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.APPROVED]: REPORT_WIDGET_STATUS.CATEGORIES.APPROVAL,
    [REPORT_WIDGET_STATUS.STATUSES.REJECTED]: REPORT_WIDGET_STATUS.CATEGORIES.APPROVAL,
    [REPORT_WIDGET_STATUS.STATUSES.PUBLISHED]: REPORT_WIDGET_STATUS.CATEGORIES.ACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.ACTIVE]: REPORT_WIDGET_STATUS.CATEGORIES.ACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.INACTIVE]: REPORT_WIDGET_STATUS.CATEGORIES.INACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.PAUSED]: REPORT_WIDGET_STATUS.CATEGORIES.INACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.ARCHIVED]: REPORT_WIDGET_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_WIDGET_STATUS.STATUSES.DEPRECATED]: REPORT_WIDGET_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_WIDGET_STATUS.STATUSES.DELETED]: REPORT_WIDGET_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || REPORT_WIDGET_STATUS.CATEGORIES.CREATION;
}

export function reportWidgetStatusGetColor(
  status: ReportWidgetStatusType
): ReportWidgetStatusColor {
  const colorMap: Record<ReportWidgetStatusType, ReportWidgetStatusColor> = {
    [REPORT_WIDGET_STATUS.STATUSES.DRAFT]: REPORT_WIDGET_STATUS.COLORS.DRAFT,
    [REPORT_WIDGET_STATUS.STATUSES.PENDING_REVIEW]: REPORT_WIDGET_STATUS.COLORS.PENDING_REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.IN_REVIEW]: REPORT_WIDGET_STATUS.COLORS.IN_REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.REVIEWED]: REPORT_WIDGET_STATUS.COLORS.REVIEWED,
    [REPORT_WIDGET_STATUS.STATUSES.APPROVED]: REPORT_WIDGET_STATUS.COLORS.APPROVED,
    [REPORT_WIDGET_STATUS.STATUSES.REJECTED]: REPORT_WIDGET_STATUS.COLORS.REJECTED,
    [REPORT_WIDGET_STATUS.STATUSES.PUBLISHED]: REPORT_WIDGET_STATUS.COLORS.PUBLISHED,
    [REPORT_WIDGET_STATUS.STATUSES.ACTIVE]: REPORT_WIDGET_STATUS.COLORS.ACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.INACTIVE]: REPORT_WIDGET_STATUS.COLORS.INACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.PAUSED]: REPORT_WIDGET_STATUS.COLORS.PAUSED,
    [REPORT_WIDGET_STATUS.STATUSES.ARCHIVED]: REPORT_WIDGET_STATUS.COLORS.ARCHIVED,
    [REPORT_WIDGET_STATUS.STATUSES.DEPRECATED]: REPORT_WIDGET_STATUS.COLORS.DEPRECATED,
    [REPORT_WIDGET_STATUS.STATUSES.DELETED]: REPORT_WIDGET_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportWidgetStatusGetPriority(
  status: ReportWidgetStatusType
): ReportWidgetStatusPriority {
  const priorityMap: Record<ReportWidgetStatusType, ReportWidgetStatusPriority> = {
    [REPORT_WIDGET_STATUS.STATUSES.DRAFT]: REPORT_WIDGET_STATUS.PRIORITY.DRAFT,
    [REPORT_WIDGET_STATUS.STATUSES.PENDING_REVIEW]: REPORT_WIDGET_STATUS.PRIORITY.PENDING_REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.IN_REVIEW]: REPORT_WIDGET_STATUS.PRIORITY.IN_REVIEW,
    [REPORT_WIDGET_STATUS.STATUSES.REVIEWED]: REPORT_WIDGET_STATUS.PRIORITY.REVIEWED,
    [REPORT_WIDGET_STATUS.STATUSES.APPROVED]: REPORT_WIDGET_STATUS.PRIORITY.APPROVED,
    [REPORT_WIDGET_STATUS.STATUSES.REJECTED]: REPORT_WIDGET_STATUS.PRIORITY.REJECTED,
    [REPORT_WIDGET_STATUS.STATUSES.PUBLISHED]: REPORT_WIDGET_STATUS.PRIORITY.PUBLISHED,
    [REPORT_WIDGET_STATUS.STATUSES.ACTIVE]: REPORT_WIDGET_STATUS.PRIORITY.ACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.INACTIVE]: REPORT_WIDGET_STATUS.PRIORITY.INACTIVE,
    [REPORT_WIDGET_STATUS.STATUSES.PAUSED]: REPORT_WIDGET_STATUS.PRIORITY.PAUSED,
    [REPORT_WIDGET_STATUS.STATUSES.ARCHIVED]: REPORT_WIDGET_STATUS.PRIORITY.ARCHIVED,
    [REPORT_WIDGET_STATUS.STATUSES.DEPRECATED]: REPORT_WIDGET_STATUS.PRIORITY.DEPRECATED,
    [REPORT_WIDGET_STATUS.STATUSES.DELETED]: REPORT_WIDGET_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function reportWidgetStatusIsActive(status: ReportWidgetStatusType): boolean {
  const activeStatuses: ReportWidgetStatusType[] = [
    REPORT_WIDGET_STATUS.STATUSES.ACTIVE,
    REPORT_WIDGET_STATUS.STATUSES.PUBLISHED,
  ];
  return activeStatuses.includes(status);
}

export function reportWidgetStatusIsPublished(status: ReportWidgetStatusType): boolean {
  const publishedStatuses: ReportWidgetStatusType[] = [
    REPORT_WIDGET_STATUS.STATUSES.PUBLISHED,
    REPORT_WIDGET_STATUS.STATUSES.ACTIVE,
  ];
  return publishedStatuses.includes(status);
}

export function reportWidgetStatusIsArchived(status: ReportWidgetStatusType): boolean {
  const archivedStatuses: ReportWidgetStatusType[] = [
    REPORT_WIDGET_STATUS.STATUSES.ARCHIVED,
    REPORT_WIDGET_STATUS.STATUSES.DEPRECATED,
    REPORT_WIDGET_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function reportWidgetStatusCanTransitionTo(
  currentStatus: ReportWidgetStatusType,
  targetStatus: ReportWidgetStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_WIDGET_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportWidgetStatusGetAvailableTransitions(
  currentStatus: ReportWidgetStatusType
): ReportWidgetStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_WIDGET_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportWidgetStatusType[];
}

export function reportWidgetStatusGetSequence(): ReportWidgetStatusType[] {
  return [
    REPORT_WIDGET_STATUS.STATUSES.DRAFT,
    REPORT_WIDGET_STATUS.STATUSES.PENDING_REVIEW,
    REPORT_WIDGET_STATUS.STATUSES.IN_REVIEW,
    REPORT_WIDGET_STATUS.STATUSES.REVIEWED,
    REPORT_WIDGET_STATUS.STATUSES.APPROVED,
    REPORT_WIDGET_STATUS.STATUSES.PUBLISHED,
    REPORT_WIDGET_STATUS.STATUSES.ACTIVE,
  ];
}

export function reportWidgetStatusGetVisibilityLabel(visibility: ReportWidgetVisibility): string {
  const labels: Record<ReportWidgetVisibility, string> = {
    [REPORT_WIDGET_STATUS.VISIBILITY.PRIVATE]: 'Private',
    [REPORT_WIDGET_STATUS.VISIBILITY.TEAM]: 'Team',
    [REPORT_WIDGET_STATUS.VISIBILITY.ORGANIZATION]: 'Organization',
    [REPORT_WIDGET_STATUS.VISIBILITY.PUBLIC]: 'Public',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function reportWidgetStatusGetStateLabel(state: ReportWidgetState): string {
  const labels: Record<ReportWidgetState, string> = {
    [REPORT_WIDGET_STATUS.STATE.LOADING]: 'Loading',
    [REPORT_WIDGET_STATUS.STATE.LOADED]: 'Loaded',
    [REPORT_WIDGET_STATUS.STATE.ERROR]: 'Error',
    [REPORT_WIDGET_STATUS.STATE.EMPTY]: 'No Data',
    [REPORT_WIDGET_STATUS.STATE.REFRESHING]: 'Refreshing',
    [REPORT_WIDGET_STATUS.STATE.UPDATING]: 'Updating',
  };
  return labels[state] || 'Unknown State';
}

export function reportWidgetStatusIsValid(status: string): status is ReportWidgetStatusType {
  return Object.values(REPORT_WIDGET_STATUS.STATUSES).includes(status as ReportWidgetStatusType);
}

export function reportWidgetStatusIsValidVisibility(
  visibility: string
): visibility is ReportWidgetVisibility {
  return Object.values(REPORT_WIDGET_STATUS.VISIBILITY).includes(
    visibility as ReportWidgetVisibility
  );
}

export function reportWidgetStatusIsValidState(state: string): state is ReportWidgetState {
  return Object.values(REPORT_WIDGET_STATUS.STATE).includes(state as ReportWidgetState);
}
