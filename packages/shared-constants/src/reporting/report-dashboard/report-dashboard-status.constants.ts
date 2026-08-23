/**
 * Report Dashboard Status Constants
 * Status definitions for dashboard lifecycle
 */

export const REPORT_DASHBOARD_STATUS = {
  // Dashboard Statuses
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

  // Dashboard Visibility
  VISIBILITY: {
    PRIVATE: 'private',
    TEAM: 'team',
    ORGANIZATION: 'organization',
    PUBLIC: 'public',
  } as const,

  // Dashboard Sharing
  SHARING: {
    NOT_SHARED: 'not_shared',
    VIEW_ONLY: 'view_only',
    EDITABLE: 'editable',
    FULL_ACCESS: 'full_access',
  } as const,
} as const;

// Dashboard Statuses
export type ReportDashboardStatusType =
  (typeof REPORT_DASHBOARD_STATUS.STATUSES)[keyof typeof REPORT_DASHBOARD_STATUS.STATUSES];

// Status Categories
export type ReportDashboardStatusCategory =
  (typeof REPORT_DASHBOARD_STATUS.CATEGORIES)[keyof typeof REPORT_DASHBOARD_STATUS.CATEGORIES];

// Status Colors
export type ReportDashboardStatusColor =
  (typeof REPORT_DASHBOARD_STATUS.COLORS)[keyof typeof REPORT_DASHBOARD_STATUS.COLORS];

// Status Priority
export type ReportDashboardStatusPriority =
  (typeof REPORT_DASHBOARD_STATUS.PRIORITY)[keyof typeof REPORT_DASHBOARD_STATUS.PRIORITY];

// Dashboard Visibility
export type ReportDashboardVisibility =
  (typeof REPORT_DASHBOARD_STATUS.VISIBILITY)[keyof typeof REPORT_DASHBOARD_STATUS.VISIBILITY];

// Dashboard Sharing
export type ReportDashboardSharing =
  (typeof REPORT_DASHBOARD_STATUS.SHARING)[keyof typeof REPORT_DASHBOARD_STATUS.SHARING];

// Utility Functions
export function reportDashboardStatusGetLabel(status: ReportDashboardStatusType): string {
  const labels: Record<ReportDashboardStatusType, string> = {
    [REPORT_DASHBOARD_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_DASHBOARD_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [REPORT_DASHBOARD_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [REPORT_DASHBOARD_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [REPORT_DASHBOARD_STATUS.STATUSES.APPROVED]: 'Approved',
    [REPORT_DASHBOARD_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED]: 'Published',
    [REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE]: 'Active',
    [REPORT_DASHBOARD_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [REPORT_DASHBOARD_STATUS.STATUSES.PAUSED]: 'Paused',
    [REPORT_DASHBOARD_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [REPORT_DASHBOARD_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [REPORT_DASHBOARD_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function reportDashboardStatusGetCategory(
  status: ReportDashboardStatusType
): ReportDashboardStatusCategory {
  const categories: Record<ReportDashboardStatusType, ReportDashboardStatusCategory> = {
    [REPORT_DASHBOARD_STATUS.STATUSES.DRAFT]: REPORT_DASHBOARD_STATUS.CATEGORIES.CREATION,
    [REPORT_DASHBOARD_STATUS.STATUSES.PENDING_REVIEW]: REPORT_DASHBOARD_STATUS.CATEGORIES.REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.IN_REVIEW]: REPORT_DASHBOARD_STATUS.CATEGORIES.REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.REVIEWED]: REPORT_DASHBOARD_STATUS.CATEGORIES.REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.APPROVED]: REPORT_DASHBOARD_STATUS.CATEGORIES.APPROVAL,
    [REPORT_DASHBOARD_STATUS.STATUSES.REJECTED]: REPORT_DASHBOARD_STATUS.CATEGORIES.APPROVAL,
    [REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED]: REPORT_DASHBOARD_STATUS.CATEGORIES.ACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE]: REPORT_DASHBOARD_STATUS.CATEGORIES.ACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.INACTIVE]: REPORT_DASHBOARD_STATUS.CATEGORIES.INACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.PAUSED]: REPORT_DASHBOARD_STATUS.CATEGORIES.INACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.ARCHIVED]: REPORT_DASHBOARD_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DEPRECATED]: REPORT_DASHBOARD_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DELETED]: REPORT_DASHBOARD_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || REPORT_DASHBOARD_STATUS.CATEGORIES.CREATION;
}

export function reportDashboardStatusGetColor(
  status: ReportDashboardStatusType
): ReportDashboardStatusColor {
  const colorMap: Record<ReportDashboardStatusType, ReportDashboardStatusColor> = {
    [REPORT_DASHBOARD_STATUS.STATUSES.DRAFT]: REPORT_DASHBOARD_STATUS.COLORS.DRAFT,
    [REPORT_DASHBOARD_STATUS.STATUSES.PENDING_REVIEW]:
      REPORT_DASHBOARD_STATUS.COLORS.PENDING_REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.IN_REVIEW]: REPORT_DASHBOARD_STATUS.COLORS.IN_REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.REVIEWED]: REPORT_DASHBOARD_STATUS.COLORS.REVIEWED,
    [REPORT_DASHBOARD_STATUS.STATUSES.APPROVED]: REPORT_DASHBOARD_STATUS.COLORS.APPROVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.REJECTED]: REPORT_DASHBOARD_STATUS.COLORS.REJECTED,
    [REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED]: REPORT_DASHBOARD_STATUS.COLORS.PUBLISHED,
    [REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE]: REPORT_DASHBOARD_STATUS.COLORS.ACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.INACTIVE]: REPORT_DASHBOARD_STATUS.COLORS.INACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.PAUSED]: REPORT_DASHBOARD_STATUS.COLORS.PAUSED,
    [REPORT_DASHBOARD_STATUS.STATUSES.ARCHIVED]: REPORT_DASHBOARD_STATUS.COLORS.ARCHIVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DEPRECATED]: REPORT_DASHBOARD_STATUS.COLORS.DEPRECATED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DELETED]: REPORT_DASHBOARD_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportDashboardStatusGetPriority(
  status: ReportDashboardStatusType
): ReportDashboardStatusPriority {
  const priorityMap: Record<ReportDashboardStatusType, ReportDashboardStatusPriority> = {
    [REPORT_DASHBOARD_STATUS.STATUSES.DRAFT]: REPORT_DASHBOARD_STATUS.PRIORITY.DRAFT,
    [REPORT_DASHBOARD_STATUS.STATUSES.PENDING_REVIEW]:
      REPORT_DASHBOARD_STATUS.PRIORITY.PENDING_REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.IN_REVIEW]: REPORT_DASHBOARD_STATUS.PRIORITY.IN_REVIEW,
    [REPORT_DASHBOARD_STATUS.STATUSES.REVIEWED]: REPORT_DASHBOARD_STATUS.PRIORITY.REVIEWED,
    [REPORT_DASHBOARD_STATUS.STATUSES.APPROVED]: REPORT_DASHBOARD_STATUS.PRIORITY.APPROVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.REJECTED]: REPORT_DASHBOARD_STATUS.PRIORITY.REJECTED,
    [REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED]: REPORT_DASHBOARD_STATUS.PRIORITY.PUBLISHED,
    [REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE]: REPORT_DASHBOARD_STATUS.PRIORITY.ACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.INACTIVE]: REPORT_DASHBOARD_STATUS.PRIORITY.INACTIVE,
    [REPORT_DASHBOARD_STATUS.STATUSES.PAUSED]: REPORT_DASHBOARD_STATUS.PRIORITY.PAUSED,
    [REPORT_DASHBOARD_STATUS.STATUSES.ARCHIVED]: REPORT_DASHBOARD_STATUS.PRIORITY.ARCHIVED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DEPRECATED]: REPORT_DASHBOARD_STATUS.PRIORITY.DEPRECATED,
    [REPORT_DASHBOARD_STATUS.STATUSES.DELETED]: REPORT_DASHBOARD_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function reportDashboardStatusIsActive(status: ReportDashboardStatusType): boolean {
  const activeStatuses: ReportDashboardStatusType[] = [
    REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE,
    REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED,
  ];
  return activeStatuses.includes(status);
}

export function reportDashboardStatusIsPublished(status: ReportDashboardStatusType): boolean {
  const publishedStatuses: ReportDashboardStatusType[] = [
    REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED,
    REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE,
  ];
  return publishedStatuses.includes(status);
}

export function reportDashboardStatusIsArchived(status: ReportDashboardStatusType): boolean {
  const archivedStatuses: ReportDashboardStatusType[] = [
    REPORT_DASHBOARD_STATUS.STATUSES.ARCHIVED,
    REPORT_DASHBOARD_STATUS.STATUSES.DEPRECATED,
    REPORT_DASHBOARD_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function reportDashboardStatusCanTransitionTo(
  currentStatus: ReportDashboardStatusType,
  targetStatus: ReportDashboardStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_DASHBOARD_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportDashboardStatusGetAvailableTransitions(
  currentStatus: ReportDashboardStatusType
): ReportDashboardStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_DASHBOARD_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportDashboardStatusType[];
}

export function reportDashboardStatusGetSequence(): ReportDashboardStatusType[] {
  return [
    REPORT_DASHBOARD_STATUS.STATUSES.DRAFT,
    REPORT_DASHBOARD_STATUS.STATUSES.PENDING_REVIEW,
    REPORT_DASHBOARD_STATUS.STATUSES.IN_REVIEW,
    REPORT_DASHBOARD_STATUS.STATUSES.REVIEWED,
    REPORT_DASHBOARD_STATUS.STATUSES.APPROVED,
    REPORT_DASHBOARD_STATUS.STATUSES.PUBLISHED,
    REPORT_DASHBOARD_STATUS.STATUSES.ACTIVE,
  ];
}

export function reportDashboardStatusGetVisibilityLabel(
  visibility: ReportDashboardVisibility
): string {
  const labels: Record<ReportDashboardVisibility, string> = {
    [REPORT_DASHBOARD_STATUS.VISIBILITY.PRIVATE]: 'Private',
    [REPORT_DASHBOARD_STATUS.VISIBILITY.TEAM]: 'Team',
    [REPORT_DASHBOARD_STATUS.VISIBILITY.ORGANIZATION]: 'Organization',
    [REPORT_DASHBOARD_STATUS.VISIBILITY.PUBLIC]: 'Public',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function reportDashboardStatusGetSharingLabel(sharing: ReportDashboardSharing): string {
  const labels: Record<ReportDashboardSharing, string> = {
    [REPORT_DASHBOARD_STATUS.SHARING.NOT_SHARED]: 'Not Shared',
    [REPORT_DASHBOARD_STATUS.SHARING.VIEW_ONLY]: 'View Only',
    [REPORT_DASHBOARD_STATUS.SHARING.EDITABLE]: 'Editable',
    [REPORT_DASHBOARD_STATUS.SHARING.FULL_ACCESS]: 'Full Access',
  };
  return labels[sharing] || 'Unknown Sharing';
}

export function reportDashboardStatusIsValid(status: string): status is ReportDashboardStatusType {
  return Object.values(REPORT_DASHBOARD_STATUS.STATUSES).includes(
    status as ReportDashboardStatusType
  );
}

export function reportDashboardStatusIsValidVisibility(
  visibility: string
): visibility is ReportDashboardVisibility {
  return Object.values(REPORT_DASHBOARD_STATUS.VISIBILITY).includes(
    visibility as ReportDashboardVisibility
  );
}
