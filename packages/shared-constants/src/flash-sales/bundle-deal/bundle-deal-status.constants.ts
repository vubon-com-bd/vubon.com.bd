/**
 * Bundle Deal Status Constants
 * Status definitions for bundle deal lifecycle
 */

export const BUNDLE_DEAL_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    COMING_SOON: 'coming_soon',
    ACTIVE: 'active',
    ONGOING: 'ongoing',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },

  // Status Categories
  CATEGORIES: {
    PREPARATION: 'preparation',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    POST_DEAL: 'post_deal',
    TERMINATED: 'terminated',
  },

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    SCHEDULED: '#3B82F6',
    COMING_SOON: '#8B5CF6',
    ACTIVE: '#10B981',
    ONGOING: '#10B981',
    PAUSED: '#F59E0B',
    EXPIRED: '#6B7280',
    COMPLETED: '#10B981',
    CANCELLED: '#EF4444',
    ARCHIVED: '#6B7280',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_APPROVAL: 1,
    APPROVED: 2,
    REJECTED: 3,
    SCHEDULED: 4,
    COMING_SOON: 5,
    ACTIVE: 6,
    ONGOING: 7,
    PAUSED: 8,
    EXPIRED: 9,
    COMPLETED: 10,
    CANCELLED: 11,
    ARCHIVED: 12,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'cancelled', 'archived'],
    PENDING_APPROVAL: ['approved', 'rejected', 'cancelled'],
    APPROVED: ['scheduled', 'cancelled'],
    REJECTED: ['draft', 'archived'],
    SCHEDULED: ['coming_soon', 'active', 'cancelled'],
    COMING_SOON: ['active', 'cancelled'],
    ACTIVE: ['ongoing', 'paused', 'expired', 'cancelled'],
    ONGOING: ['completed', 'expired', 'cancelled'],
    PAUSED: ['active', 'cancelled'],
    EXPIRED: ['archived'],
    COMPLETED: ['archived'],
    CANCELLED: ['archived'],
    ARCHIVED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_START: ['approved', 'scheduled'],
    CAN_PAUSE: ['active', 'ongoing'],
    CAN_RESUME: ['paused'],
    CAN_END: ['active', 'ongoing', 'paused'],
    CAN_CANCEL: [
      'draft',
      'pending_approval',
      'approved',
      'scheduled',
      'coming_soon',
      'active',
      'ongoing',
      'paused',
    ],
  },
} as const;

// Bundle Deal Statuses
export type BundleDealStatusType =
  (typeof BUNDLE_DEAL_STATUS.STATUSES)[keyof typeof BUNDLE_DEAL_STATUS.STATUSES];

// Status Categories
export type BundleDealStatusCategory =
  (typeof BUNDLE_DEAL_STATUS.CATEGORIES)[keyof typeof BUNDLE_DEAL_STATUS.CATEGORIES];

// Status Colors
export type BundleDealStatusColor =
  (typeof BUNDLE_DEAL_STATUS.COLORS)[keyof typeof BUNDLE_DEAL_STATUS.COLORS];

// Status Priority
export type BundleDealStatusPriority =
  (typeof BUNDLE_DEAL_STATUS.PRIORITY)[keyof typeof BUNDLE_DEAL_STATUS.PRIORITY];

// Utility Functions
export function flashsalesBundleDealStatusGetLabel(status: BundleDealStatusType): string {
  const labels: Record<BundleDealStatusType, string> = {
    [BUNDLE_DEAL_STATUS.STATUSES.DRAFT]: 'Draft',
    [BUNDLE_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [BUNDLE_DEAL_STATUS.STATUSES.APPROVED]: 'Approved',
    [BUNDLE_DEAL_STATUS.STATUSES.REJECTED]: 'Rejected',
    [BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON]: 'Coming Soon',
    [BUNDLE_DEAL_STATUS.STATUSES.ACTIVE]: 'Active',
    [BUNDLE_DEAL_STATUS.STATUSES.ONGOING]: 'Ongoing',
    [BUNDLE_DEAL_STATUS.STATUSES.PAUSED]: 'Paused',
    [BUNDLE_DEAL_STATUS.STATUSES.EXPIRED]: 'Expired',
    [BUNDLE_DEAL_STATUS.STATUSES.COMPLETED]: 'Completed',
    [BUNDLE_DEAL_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [BUNDLE_DEAL_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesBundleDealStatusGetCategory(
  status: BundleDealStatusType
): BundleDealStatusCategory {
  const categories: Record<BundleDealStatusType, BundleDealStatusCategory> = {
    [BUNDLE_DEAL_STATUS.STATUSES.DRAFT]: BUNDLE_DEAL_STATUS.CATEGORIES.PREPARATION,
    [BUNDLE_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: BUNDLE_DEAL_STATUS.CATEGORIES.PREPARATION,
    [BUNDLE_DEAL_STATUS.STATUSES.APPROVED]: BUNDLE_DEAL_STATUS.CATEGORIES.PREPARATION,
    [BUNDLE_DEAL_STATUS.STATUSES.REJECTED]: BUNDLE_DEAL_STATUS.CATEGORIES.PREPARATION,
    [BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED]: BUNDLE_DEAL_STATUS.CATEGORIES.SCHEDULED,
    [BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON]: BUNDLE_DEAL_STATUS.CATEGORIES.SCHEDULED,
    [BUNDLE_DEAL_STATUS.STATUSES.ACTIVE]: BUNDLE_DEAL_STATUS.CATEGORIES.ACTIVE,
    [BUNDLE_DEAL_STATUS.STATUSES.ONGOING]: BUNDLE_DEAL_STATUS.CATEGORIES.ACTIVE,
    [BUNDLE_DEAL_STATUS.STATUSES.PAUSED]: BUNDLE_DEAL_STATUS.CATEGORIES.ACTIVE,
    [BUNDLE_DEAL_STATUS.STATUSES.EXPIRED]: BUNDLE_DEAL_STATUS.CATEGORIES.POST_DEAL,
    [BUNDLE_DEAL_STATUS.STATUSES.COMPLETED]: BUNDLE_DEAL_STATUS.CATEGORIES.POST_DEAL,
    [BUNDLE_DEAL_STATUS.STATUSES.CANCELLED]: BUNDLE_DEAL_STATUS.CATEGORIES.TERMINATED,
    [BUNDLE_DEAL_STATUS.STATUSES.ARCHIVED]: BUNDLE_DEAL_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || BUNDLE_DEAL_STATUS.CATEGORIES.PREPARATION;
}

export function flashsalesBundleDealStatusGetColor(
  status: BundleDealStatusType
): BundleDealStatusColor {
  const colorMap: Record<BundleDealStatusType, BundleDealStatusColor> = {
    [BUNDLE_DEAL_STATUS.STATUSES.DRAFT]: BUNDLE_DEAL_STATUS.COLORS.DRAFT,
    [BUNDLE_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: BUNDLE_DEAL_STATUS.COLORS.PENDING_APPROVAL,
    [BUNDLE_DEAL_STATUS.STATUSES.APPROVED]: BUNDLE_DEAL_STATUS.COLORS.APPROVED,
    [BUNDLE_DEAL_STATUS.STATUSES.REJECTED]: BUNDLE_DEAL_STATUS.COLORS.REJECTED,
    [BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED]: BUNDLE_DEAL_STATUS.COLORS.SCHEDULED,
    [BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON]: BUNDLE_DEAL_STATUS.COLORS.COMING_SOON,
    [BUNDLE_DEAL_STATUS.STATUSES.ACTIVE]: BUNDLE_DEAL_STATUS.COLORS.ACTIVE,
    [BUNDLE_DEAL_STATUS.STATUSES.ONGOING]: BUNDLE_DEAL_STATUS.COLORS.ONGOING,
    [BUNDLE_DEAL_STATUS.STATUSES.PAUSED]: BUNDLE_DEAL_STATUS.COLORS.PAUSED,
    [BUNDLE_DEAL_STATUS.STATUSES.EXPIRED]: BUNDLE_DEAL_STATUS.COLORS.EXPIRED,
    [BUNDLE_DEAL_STATUS.STATUSES.COMPLETED]: BUNDLE_DEAL_STATUS.COLORS.COMPLETED,
    [BUNDLE_DEAL_STATUS.STATUSES.CANCELLED]: BUNDLE_DEAL_STATUS.COLORS.CANCELLED,
    [BUNDLE_DEAL_STATUS.STATUSES.ARCHIVED]: BUNDLE_DEAL_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesBundleDealStatusGetPriority(
  status: BundleDealStatusType
): BundleDealStatusPriority {
  const priorityMap: Record<BundleDealStatusType, BundleDealStatusPriority> = {
    [BUNDLE_DEAL_STATUS.STATUSES.DRAFT]: BUNDLE_DEAL_STATUS.PRIORITY.DRAFT,
    [BUNDLE_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: BUNDLE_DEAL_STATUS.PRIORITY.PENDING_APPROVAL,
    [BUNDLE_DEAL_STATUS.STATUSES.APPROVED]: BUNDLE_DEAL_STATUS.PRIORITY.APPROVED,
    [BUNDLE_DEAL_STATUS.STATUSES.REJECTED]: BUNDLE_DEAL_STATUS.PRIORITY.REJECTED,
    [BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED]: BUNDLE_DEAL_STATUS.PRIORITY.SCHEDULED,
    [BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON]: BUNDLE_DEAL_STATUS.PRIORITY.COMING_SOON,
    [BUNDLE_DEAL_STATUS.STATUSES.ACTIVE]: BUNDLE_DEAL_STATUS.PRIORITY.ACTIVE,
    [BUNDLE_DEAL_STATUS.STATUSES.ONGOING]: BUNDLE_DEAL_STATUS.PRIORITY.ONGOING,
    [BUNDLE_DEAL_STATUS.STATUSES.PAUSED]: BUNDLE_DEAL_STATUS.PRIORITY.PAUSED,
    [BUNDLE_DEAL_STATUS.STATUSES.EXPIRED]: BUNDLE_DEAL_STATUS.PRIORITY.EXPIRED,
    [BUNDLE_DEAL_STATUS.STATUSES.COMPLETED]: BUNDLE_DEAL_STATUS.PRIORITY.COMPLETED,
    [BUNDLE_DEAL_STATUS.STATUSES.CANCELLED]: BUNDLE_DEAL_STATUS.PRIORITY.CANCELLED,
    [BUNDLE_DEAL_STATUS.STATUSES.ARCHIVED]: BUNDLE_DEAL_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesBundleDealStatusIsActive(status: BundleDealStatusType): boolean {
  const activeStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.ACTIVE,
    BUNDLE_DEAL_STATUS.STATUSES.ONGOING,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesBundleDealStatusIsScheduled(status: BundleDealStatusType): boolean {
  const scheduledStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED,
    BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON,
  ];
  return scheduledStatuses.includes(status);
}

export function flashsalesBundleDealStatusIsComplete(status: BundleDealStatusType): boolean {
  const completeStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.COMPLETED,
    BUNDLE_DEAL_STATUS.STATUSES.EXPIRED,
    BUNDLE_DEAL_STATUS.STATUSES.CANCELLED,
    BUNDLE_DEAL_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesBundleDealStatusCanTransitionTo(
  currentStatus: BundleDealStatusType,
  targetStatus: BundleDealStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = BUNDLE_DEAL_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesBundleDealStatusGetAvailableTransitions(
  currentStatus: BundleDealStatusType
): BundleDealStatusType[] {
  const transitions: Record<string, readonly string[]> = BUNDLE_DEAL_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as BundleDealStatusType[];
}

export function flashsalesBundleDealStatusCanStart(status: BundleDealStatusType): boolean {
  const canStartStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.APPROVED,
    BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED,
  ];
  return canStartStatuses.includes(status);
}

export function flashsalesBundleDealStatusCanPause(status: BundleDealStatusType): boolean {
  const canPauseStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.ACTIVE,
    BUNDLE_DEAL_STATUS.STATUSES.ONGOING,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesBundleDealStatusCanResume(status: BundleDealStatusType): boolean {
  const canResumeStatuses: BundleDealStatusType[] = [BUNDLE_DEAL_STATUS.STATUSES.PAUSED];
  return canResumeStatuses.includes(status);
}

export function flashsalesBundleDealStatusCanEnd(status: BundleDealStatusType): boolean {
  const canEndStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.ACTIVE,
    BUNDLE_DEAL_STATUS.STATUSES.ONGOING,
    BUNDLE_DEAL_STATUS.STATUSES.PAUSED,
  ];
  return canEndStatuses.includes(status);
}

export function flashsalesBundleDealStatusCanCancel(status: BundleDealStatusType): boolean {
  const canCancelStatuses: BundleDealStatusType[] = [
    BUNDLE_DEAL_STATUS.STATUSES.DRAFT,
    BUNDLE_DEAL_STATUS.STATUSES.PENDING_APPROVAL,
    BUNDLE_DEAL_STATUS.STATUSES.APPROVED,
    BUNDLE_DEAL_STATUS.STATUSES.SCHEDULED,
    BUNDLE_DEAL_STATUS.STATUSES.COMING_SOON,
    BUNDLE_DEAL_STATUS.STATUSES.ACTIVE,
    BUNDLE_DEAL_STATUS.STATUSES.ONGOING,
    BUNDLE_DEAL_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesBundleDealStatusIsValid(status: string): status is BundleDealStatusType {
  return Object.values(BUNDLE_DEAL_STATUS.STATUSES).includes(status as BundleDealStatusType);
}
