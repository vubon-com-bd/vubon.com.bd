/**
 * Report Filter Status Constants
 * Status definitions for filter lifecycle
 */

export const REPORT_FILTER_STATUS = {
  // Filter Statuses
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

  // Filter Visibility
  VISIBILITY: {
    PRIVATE: 'private',
    TEAM: 'team',
    ORGANIZATION: 'organization',
    PUBLIC: 'public',
  } as const,

  // Filter State
  STATE: {
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error',
    EMPTY: 'empty',
    APPLYING: 'applying',
    APPLIED: 'applied',
    CLEARING: 'clearing',
    CLEARED: 'cleared',
  } as const,

  // Filter Action Types
  ACTIONS: {
    APPLY: 'apply',
    CLEAR: 'clear',
    RESET: 'reset',
    SAVE: 'save',
    DELETE: 'delete',
    SHARE: 'share',
    EXPORT: 'export',
  } as const,
} as const;

// Filter Statuses
export type ReportFilterStatusType =
  (typeof REPORT_FILTER_STATUS.STATUSES)[keyof typeof REPORT_FILTER_STATUS.STATUSES];

// Status Categories
export type ReportFilterStatusCategory =
  (typeof REPORT_FILTER_STATUS.CATEGORIES)[keyof typeof REPORT_FILTER_STATUS.CATEGORIES];

// Status Colors
export type ReportFilterStatusColor =
  (typeof REPORT_FILTER_STATUS.COLORS)[keyof typeof REPORT_FILTER_STATUS.COLORS];

// Status Priority
export type ReportFilterStatusPriority =
  (typeof REPORT_FILTER_STATUS.PRIORITY)[keyof typeof REPORT_FILTER_STATUS.PRIORITY];

// Filter Visibility
export type ReportFilterVisibility =
  (typeof REPORT_FILTER_STATUS.VISIBILITY)[keyof typeof REPORT_FILTER_STATUS.VISIBILITY];

// Filter State
export type ReportFilterState =
  (typeof REPORT_FILTER_STATUS.STATE)[keyof typeof REPORT_FILTER_STATUS.STATE];

// Filter Action Types
export type ReportFilterAction =
  (typeof REPORT_FILTER_STATUS.ACTIONS)[keyof typeof REPORT_FILTER_STATUS.ACTIONS];

// Utility Functions
export function reportFilterStatusGetLabel(status: ReportFilterStatusType): string {
  const labels: Record<ReportFilterStatusType, string> = {
    [REPORT_FILTER_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_FILTER_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [REPORT_FILTER_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [REPORT_FILTER_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [REPORT_FILTER_STATUS.STATUSES.APPROVED]: 'Approved',
    [REPORT_FILTER_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_FILTER_STATUS.STATUSES.PUBLISHED]: 'Published',
    [REPORT_FILTER_STATUS.STATUSES.ACTIVE]: 'Active',
    [REPORT_FILTER_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [REPORT_FILTER_STATUS.STATUSES.PAUSED]: 'Paused',
    [REPORT_FILTER_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [REPORT_FILTER_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [REPORT_FILTER_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function reportFilterStatusGetCategory(
  status: ReportFilterStatusType
): ReportFilterStatusCategory {
  const categories: Record<ReportFilterStatusType, ReportFilterStatusCategory> = {
    [REPORT_FILTER_STATUS.STATUSES.DRAFT]: REPORT_FILTER_STATUS.CATEGORIES.CREATION,
    [REPORT_FILTER_STATUS.STATUSES.PENDING_REVIEW]: REPORT_FILTER_STATUS.CATEGORIES.REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.IN_REVIEW]: REPORT_FILTER_STATUS.CATEGORIES.REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.REVIEWED]: REPORT_FILTER_STATUS.CATEGORIES.REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.APPROVED]: REPORT_FILTER_STATUS.CATEGORIES.APPROVAL,
    [REPORT_FILTER_STATUS.STATUSES.REJECTED]: REPORT_FILTER_STATUS.CATEGORIES.APPROVAL,
    [REPORT_FILTER_STATUS.STATUSES.PUBLISHED]: REPORT_FILTER_STATUS.CATEGORIES.ACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.ACTIVE]: REPORT_FILTER_STATUS.CATEGORIES.ACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.INACTIVE]: REPORT_FILTER_STATUS.CATEGORIES.INACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.PAUSED]: REPORT_FILTER_STATUS.CATEGORIES.INACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.ARCHIVED]: REPORT_FILTER_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_FILTER_STATUS.STATUSES.DEPRECATED]: REPORT_FILTER_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_FILTER_STATUS.STATUSES.DELETED]: REPORT_FILTER_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || REPORT_FILTER_STATUS.CATEGORIES.CREATION;
}

export function reportFilterStatusGetColor(
  status: ReportFilterStatusType
): ReportFilterStatusColor {
  const colorMap: Record<ReportFilterStatusType, ReportFilterStatusColor> = {
    [REPORT_FILTER_STATUS.STATUSES.DRAFT]: REPORT_FILTER_STATUS.COLORS.DRAFT,
    [REPORT_FILTER_STATUS.STATUSES.PENDING_REVIEW]: REPORT_FILTER_STATUS.COLORS.PENDING_REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.IN_REVIEW]: REPORT_FILTER_STATUS.COLORS.IN_REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.REVIEWED]: REPORT_FILTER_STATUS.COLORS.REVIEWED,
    [REPORT_FILTER_STATUS.STATUSES.APPROVED]: REPORT_FILTER_STATUS.COLORS.APPROVED,
    [REPORT_FILTER_STATUS.STATUSES.REJECTED]: REPORT_FILTER_STATUS.COLORS.REJECTED,
    [REPORT_FILTER_STATUS.STATUSES.PUBLISHED]: REPORT_FILTER_STATUS.COLORS.PUBLISHED,
    [REPORT_FILTER_STATUS.STATUSES.ACTIVE]: REPORT_FILTER_STATUS.COLORS.ACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.INACTIVE]: REPORT_FILTER_STATUS.COLORS.INACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.PAUSED]: REPORT_FILTER_STATUS.COLORS.PAUSED,
    [REPORT_FILTER_STATUS.STATUSES.ARCHIVED]: REPORT_FILTER_STATUS.COLORS.ARCHIVED,
    [REPORT_FILTER_STATUS.STATUSES.DEPRECATED]: REPORT_FILTER_STATUS.COLORS.DEPRECATED,
    [REPORT_FILTER_STATUS.STATUSES.DELETED]: REPORT_FILTER_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportFilterStatusGetPriority(
  status: ReportFilterStatusType
): ReportFilterStatusPriority {
  const priorityMap: Record<ReportFilterStatusType, ReportFilterStatusPriority> = {
    [REPORT_FILTER_STATUS.STATUSES.DRAFT]: REPORT_FILTER_STATUS.PRIORITY.DRAFT,
    [REPORT_FILTER_STATUS.STATUSES.PENDING_REVIEW]: REPORT_FILTER_STATUS.PRIORITY.PENDING_REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.IN_REVIEW]: REPORT_FILTER_STATUS.PRIORITY.IN_REVIEW,
    [REPORT_FILTER_STATUS.STATUSES.REVIEWED]: REPORT_FILTER_STATUS.PRIORITY.REVIEWED,
    [REPORT_FILTER_STATUS.STATUSES.APPROVED]: REPORT_FILTER_STATUS.PRIORITY.APPROVED,
    [REPORT_FILTER_STATUS.STATUSES.REJECTED]: REPORT_FILTER_STATUS.PRIORITY.REJECTED,
    [REPORT_FILTER_STATUS.STATUSES.PUBLISHED]: REPORT_FILTER_STATUS.PRIORITY.PUBLISHED,
    [REPORT_FILTER_STATUS.STATUSES.ACTIVE]: REPORT_FILTER_STATUS.PRIORITY.ACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.INACTIVE]: REPORT_FILTER_STATUS.PRIORITY.INACTIVE,
    [REPORT_FILTER_STATUS.STATUSES.PAUSED]: REPORT_FILTER_STATUS.PRIORITY.PAUSED,
    [REPORT_FILTER_STATUS.STATUSES.ARCHIVED]: REPORT_FILTER_STATUS.PRIORITY.ARCHIVED,
    [REPORT_FILTER_STATUS.STATUSES.DEPRECATED]: REPORT_FILTER_STATUS.PRIORITY.DEPRECATED,
    [REPORT_FILTER_STATUS.STATUSES.DELETED]: REPORT_FILTER_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function reportFilterStatusIsActive(status: ReportFilterStatusType): boolean {
  const activeStatuses: ReportFilterStatusType[] = [
    REPORT_FILTER_STATUS.STATUSES.ACTIVE,
    REPORT_FILTER_STATUS.STATUSES.PUBLISHED,
  ];
  return activeStatuses.includes(status);
}

export function reportFilterStatusIsPublished(status: ReportFilterStatusType): boolean {
  const publishedStatuses: ReportFilterStatusType[] = [
    REPORT_FILTER_STATUS.STATUSES.PUBLISHED,
    REPORT_FILTER_STATUS.STATUSES.ACTIVE,
  ];
  return publishedStatuses.includes(status);
}

export function reportFilterStatusIsArchived(status: ReportFilterStatusType): boolean {
  const archivedStatuses: ReportFilterStatusType[] = [
    REPORT_FILTER_STATUS.STATUSES.ARCHIVED,
    REPORT_FILTER_STATUS.STATUSES.DEPRECATED,
    REPORT_FILTER_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function reportFilterStatusCanTransitionTo(
  currentStatus: ReportFilterStatusType,
  targetStatus: ReportFilterStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_FILTER_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportFilterStatusGetAvailableTransitions(
  currentStatus: ReportFilterStatusType
): ReportFilterStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_FILTER_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportFilterStatusType[];
}

export function reportFilterStatusGetSequence(): ReportFilterStatusType[] {
  return [
    REPORT_FILTER_STATUS.STATUSES.DRAFT,
    REPORT_FILTER_STATUS.STATUSES.PENDING_REVIEW,
    REPORT_FILTER_STATUS.STATUSES.IN_REVIEW,
    REPORT_FILTER_STATUS.STATUSES.REVIEWED,
    REPORT_FILTER_STATUS.STATUSES.APPROVED,
    REPORT_FILTER_STATUS.STATUSES.PUBLISHED,
    REPORT_FILTER_STATUS.STATUSES.ACTIVE,
  ];
}

export function reportFilterStatusGetVisibilityLabel(visibility: ReportFilterVisibility): string {
  const labels: Record<ReportFilterVisibility, string> = {
    [REPORT_FILTER_STATUS.VISIBILITY.PRIVATE]: 'Private',
    [REPORT_FILTER_STATUS.VISIBILITY.TEAM]: 'Team',
    [REPORT_FILTER_STATUS.VISIBILITY.ORGANIZATION]: 'Organization',
    [REPORT_FILTER_STATUS.VISIBILITY.PUBLIC]: 'Public',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function reportFilterStatusGetStateLabel(state: ReportFilterState): string {
  const labels: Record<ReportFilterState, string> = {
    [REPORT_FILTER_STATUS.STATE.LOADING]: 'Loading',
    [REPORT_FILTER_STATUS.STATE.LOADED]: 'Loaded',
    [REPORT_FILTER_STATUS.STATE.ERROR]: 'Error',
    [REPORT_FILTER_STATUS.STATE.EMPTY]: 'Empty',
    [REPORT_FILTER_STATUS.STATE.APPLYING]: 'Applying',
    [REPORT_FILTER_STATUS.STATE.APPLIED]: 'Applied',
    [REPORT_FILTER_STATUS.STATE.CLEARING]: 'Clearing',
    [REPORT_FILTER_STATUS.STATE.CLEARED]: 'Cleared',
  };
  return labels[state] || 'Unknown State';
}

export function reportFilterStatusGetActionLabel(action: ReportFilterAction): string {
  const labels: Record<ReportFilterAction, string> = {
    [REPORT_FILTER_STATUS.ACTIONS.APPLY]: 'Apply Filter',
    [REPORT_FILTER_STATUS.ACTIONS.CLEAR]: 'Clear Filter',
    [REPORT_FILTER_STATUS.ACTIONS.RESET]: 'Reset Filter',
    [REPORT_FILTER_STATUS.ACTIONS.SAVE]: 'Save Filter',
    [REPORT_FILTER_STATUS.ACTIONS.DELETE]: 'Delete Filter',
    [REPORT_FILTER_STATUS.ACTIONS.SHARE]: 'Share Filter',
    [REPORT_FILTER_STATUS.ACTIONS.EXPORT]: 'Export Filter',
  };
  return labels[action] || 'Unknown Action';
}

export function reportFilterStatusIsValid(status: string): status is ReportFilterStatusType {
  return Object.values(REPORT_FILTER_STATUS.STATUSES).includes(status as ReportFilterStatusType);
}

export function reportFilterStatusIsValidVisibility(
  visibility: string
): visibility is ReportFilterVisibility {
  return Object.values(REPORT_FILTER_STATUS.VISIBILITY).includes(
    visibility as ReportFilterVisibility
  );
}

export function reportFilterStatusIsValidState(state: string): state is ReportFilterState {
  return Object.values(REPORT_FILTER_STATUS.STATE).includes(state as ReportFilterState);
}
