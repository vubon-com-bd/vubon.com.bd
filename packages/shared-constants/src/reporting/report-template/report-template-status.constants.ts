/**
 * Report Template Status Constants
 * Status definitions for report template lifecycle
 */

export const REPORT_TEMPLATE_STATUS = {
  // Template Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
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
    ARCHIVED: 8,
    DEPRECATED: 9,
    DELETED: 10,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_review', 'deleted'],
    PENDING_REVIEW: ['in_review', 'deleted'],
    IN_REVIEW: ['reviewed', 'deleted'],
    REVIEWED: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['published', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    PUBLISHED: ['archived', 'deprecated', 'deleted'],
    ARCHIVED: ['deleted'],
    DEPRECATED: ['archived', 'deleted'],
    DELETED: [],
  } as const,

  // Template Visibility
  VISIBILITY: {
    PRIVATE: 'private',
    TEAM: 'team',
    ORGANIZATION: 'organization',
    PUBLIC: 'public',
  } as const,

  // Template Access Levels
  ACCESS_LEVELS: {
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete',
    PUBLISH: 'publish',
    ADMIN: 'admin',
  } as const,
} as const;

// Template Statuses
export type ReportTemplateStatusType =
  (typeof REPORT_TEMPLATE_STATUS.STATUSES)[keyof typeof REPORT_TEMPLATE_STATUS.STATUSES];

// Status Categories
export type ReportTemplateStatusCategory =
  (typeof REPORT_TEMPLATE_STATUS.CATEGORIES)[keyof typeof REPORT_TEMPLATE_STATUS.CATEGORIES];

// Status Colors
export type ReportTemplateStatusColor =
  (typeof REPORT_TEMPLATE_STATUS.COLORS)[keyof typeof REPORT_TEMPLATE_STATUS.COLORS];

// Status Priority
export type ReportTemplateStatusPriority =
  (typeof REPORT_TEMPLATE_STATUS.PRIORITY)[keyof typeof REPORT_TEMPLATE_STATUS.PRIORITY];

// Template Visibility
export type ReportTemplateVisibility =
  (typeof REPORT_TEMPLATE_STATUS.VISIBILITY)[keyof typeof REPORT_TEMPLATE_STATUS.VISIBILITY];

// Template Access Levels
export type ReportTemplateAccessLevel =
  (typeof REPORT_TEMPLATE_STATUS.ACCESS_LEVELS)[keyof typeof REPORT_TEMPLATE_STATUS.ACCESS_LEVELS];

// Utility Functions
export function reportTemplateStatusGetLabel(status: ReportTemplateStatusType): string {
  const labels: Record<ReportTemplateStatusType, string> = {
    [REPORT_TEMPLATE_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [REPORT_TEMPLATE_STATUS.STATUSES.IN_REVIEW]: 'In Review',
    [REPORT_TEMPLATE_STATUS.STATUSES.REVIEWED]: 'Reviewed',
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [REPORT_TEMPLATE_STATUS.STATUSES.APPROVED]: 'Approved',
    [REPORT_TEMPLATE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED]: 'Published',
    [REPORT_TEMPLATE_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [REPORT_TEMPLATE_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [REPORT_TEMPLATE_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function reportTemplateStatusGetCategory(
  status: ReportTemplateStatusType
): ReportTemplateStatusCategory {
  const categories: Record<ReportTemplateStatusType, ReportTemplateStatusCategory> = {
    [REPORT_TEMPLATE_STATUS.STATUSES.DRAFT]: REPORT_TEMPLATE_STATUS.CATEGORIES.CREATION,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_REVIEW]: REPORT_TEMPLATE_STATUS.CATEGORIES.REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.IN_REVIEW]: REPORT_TEMPLATE_STATUS.CATEGORIES.REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.REVIEWED]: REPORT_TEMPLATE_STATUS.CATEGORIES.REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_APPROVAL]: REPORT_TEMPLATE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_TEMPLATE_STATUS.STATUSES.APPROVED]: REPORT_TEMPLATE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_TEMPLATE_STATUS.STATUSES.REJECTED]: REPORT_TEMPLATE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED]: REPORT_TEMPLATE_STATUS.CATEGORIES.PUBLISHED,
    [REPORT_TEMPLATE_STATUS.STATUSES.ARCHIVED]: REPORT_TEMPLATE_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DEPRECATED]: REPORT_TEMPLATE_STATUS.CATEGORIES.ARCHIVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DELETED]: REPORT_TEMPLATE_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || REPORT_TEMPLATE_STATUS.CATEGORIES.CREATION;
}

export function reportTemplateStatusGetColor(
  status: ReportTemplateStatusType
): ReportTemplateStatusColor {
  const colorMap: Record<ReportTemplateStatusType, ReportTemplateStatusColor> = {
    [REPORT_TEMPLATE_STATUS.STATUSES.DRAFT]: REPORT_TEMPLATE_STATUS.COLORS.DRAFT,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_REVIEW]: REPORT_TEMPLATE_STATUS.COLORS.PENDING_REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.IN_REVIEW]: REPORT_TEMPLATE_STATUS.COLORS.IN_REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.REVIEWED]: REPORT_TEMPLATE_STATUS.COLORS.REVIEWED,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_APPROVAL]:
      REPORT_TEMPLATE_STATUS.COLORS.PENDING_APPROVAL,
    [REPORT_TEMPLATE_STATUS.STATUSES.APPROVED]: REPORT_TEMPLATE_STATUS.COLORS.APPROVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.REJECTED]: REPORT_TEMPLATE_STATUS.COLORS.REJECTED,
    [REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED]: REPORT_TEMPLATE_STATUS.COLORS.PUBLISHED,
    [REPORT_TEMPLATE_STATUS.STATUSES.ARCHIVED]: REPORT_TEMPLATE_STATUS.COLORS.ARCHIVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DEPRECATED]: REPORT_TEMPLATE_STATUS.COLORS.DEPRECATED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DELETED]: REPORT_TEMPLATE_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportTemplateStatusGetPriority(
  status: ReportTemplateStatusType
): ReportTemplateStatusPriority {
  const priorityMap: Record<ReportTemplateStatusType, ReportTemplateStatusPriority> = {
    [REPORT_TEMPLATE_STATUS.STATUSES.DRAFT]: REPORT_TEMPLATE_STATUS.PRIORITY.DRAFT,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_REVIEW]:
      REPORT_TEMPLATE_STATUS.PRIORITY.PENDING_REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.IN_REVIEW]: REPORT_TEMPLATE_STATUS.PRIORITY.IN_REVIEW,
    [REPORT_TEMPLATE_STATUS.STATUSES.REVIEWED]: REPORT_TEMPLATE_STATUS.PRIORITY.REVIEWED,
    [REPORT_TEMPLATE_STATUS.STATUSES.PENDING_APPROVAL]:
      REPORT_TEMPLATE_STATUS.PRIORITY.PENDING_APPROVAL,
    [REPORT_TEMPLATE_STATUS.STATUSES.APPROVED]: REPORT_TEMPLATE_STATUS.PRIORITY.APPROVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.REJECTED]: REPORT_TEMPLATE_STATUS.PRIORITY.REJECTED,
    [REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED]: REPORT_TEMPLATE_STATUS.PRIORITY.PUBLISHED,
    [REPORT_TEMPLATE_STATUS.STATUSES.ARCHIVED]: REPORT_TEMPLATE_STATUS.PRIORITY.ARCHIVED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DEPRECATED]: REPORT_TEMPLATE_STATUS.PRIORITY.DEPRECATED,
    [REPORT_TEMPLATE_STATUS.STATUSES.DELETED]: REPORT_TEMPLATE_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function reportTemplateStatusIsPublished(status: ReportTemplateStatusType): boolean {
  const publishedStatuses: ReportTemplateStatusType[] = [
    REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED,
    REPORT_TEMPLATE_STATUS.STATUSES.APPROVED,
  ];
  return publishedStatuses.includes(status);
}

export function reportTemplateStatusIsApproved(status: ReportTemplateStatusType): boolean {
  const approvedStatuses: ReportTemplateStatusType[] = [
    REPORT_TEMPLATE_STATUS.STATUSES.APPROVED,
    REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED,
  ];
  return approvedStatuses.includes(status);
}

export function reportTemplateStatusIsArchived(status: ReportTemplateStatusType): boolean {
  const archivedStatuses: ReportTemplateStatusType[] = [
    REPORT_TEMPLATE_STATUS.STATUSES.ARCHIVED,
    REPORT_TEMPLATE_STATUS.STATUSES.DEPRECATED,
    REPORT_TEMPLATE_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function reportTemplateStatusCanTransitionTo(
  currentStatus: ReportTemplateStatusType,
  targetStatus: ReportTemplateStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_TEMPLATE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportTemplateStatusGetAvailableTransitions(
  currentStatus: ReportTemplateStatusType
): ReportTemplateStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_TEMPLATE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportTemplateStatusType[];
}

export function reportTemplateStatusGetSequence(): ReportTemplateStatusType[] {
  return [
    REPORT_TEMPLATE_STATUS.STATUSES.DRAFT,
    REPORT_TEMPLATE_STATUS.STATUSES.PENDING_REVIEW,
    REPORT_TEMPLATE_STATUS.STATUSES.IN_REVIEW,
    REPORT_TEMPLATE_STATUS.STATUSES.REVIEWED,
    REPORT_TEMPLATE_STATUS.STATUSES.PENDING_APPROVAL,
    REPORT_TEMPLATE_STATUS.STATUSES.APPROVED,
    REPORT_TEMPLATE_STATUS.STATUSES.PUBLISHED,
  ];
}

export function reportTemplateStatusGetVisibilityLabel(
  visibility: ReportTemplateVisibility
): string {
  const labels: Record<ReportTemplateVisibility, string> = {
    [REPORT_TEMPLATE_STATUS.VISIBILITY.PRIVATE]: 'Private',
    [REPORT_TEMPLATE_STATUS.VISIBILITY.TEAM]: 'Team',
    [REPORT_TEMPLATE_STATUS.VISIBILITY.ORGANIZATION]: 'Organization',
    [REPORT_TEMPLATE_STATUS.VISIBILITY.PUBLIC]: 'Public',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function reportTemplateStatusGetAccessLevelLabel(
  accessLevel: ReportTemplateAccessLevel
): string {
  const labels: Record<ReportTemplateAccessLevel, string> = {
    [REPORT_TEMPLATE_STATUS.ACCESS_LEVELS.VIEW]: 'View Only',
    [REPORT_TEMPLATE_STATUS.ACCESS_LEVELS.EDIT]: 'Edit',
    [REPORT_TEMPLATE_STATUS.ACCESS_LEVELS.DELETE]: 'Delete',
    [REPORT_TEMPLATE_STATUS.ACCESS_LEVELS.PUBLISH]: 'Publish',
    [REPORT_TEMPLATE_STATUS.ACCESS_LEVELS.ADMIN]: 'Admin',
  };
  return labels[accessLevel] || 'Unknown Access Level';
}

export function reportTemplateStatusIsValid(status: string): status is ReportTemplateStatusType {
  return Object.values(REPORT_TEMPLATE_STATUS.STATUSES).includes(
    status as ReportTemplateStatusType
  );
}

export function reportTemplateStatusIsValidVisibility(
  visibility: string
): visibility is ReportTemplateVisibility {
  return Object.values(REPORT_TEMPLATE_STATUS.VISIBILITY).includes(
    visibility as ReportTemplateVisibility
  );
}
