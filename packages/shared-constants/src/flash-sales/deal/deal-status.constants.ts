/**
 * Deal Status Constants
 * Status definitions for deal lifecycle
 */

export const DEAL_STATUS = {
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
} as const;

// Deal Statuses
export type DealStatusType = (typeof DEAL_STATUS.STATUSES)[keyof typeof DEAL_STATUS.STATUSES];

// Status Categories
export type DealStatusCategory =
  (typeof DEAL_STATUS.CATEGORIES)[keyof typeof DEAL_STATUS.CATEGORIES];

// Status Colors
export type DealStatusColor = (typeof DEAL_STATUS.COLORS)[keyof typeof DEAL_STATUS.COLORS];

// Status Priority
export type DealStatusPriority = (typeof DEAL_STATUS.PRIORITY)[keyof typeof DEAL_STATUS.PRIORITY];

// Utility Functions
export function flashsalesDealStatusGetLabel(status: DealStatusType): string {
  const labels: Record<DealStatusType, string> = {
    [DEAL_STATUS.STATUSES.DRAFT]: 'Draft',
    [DEAL_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [DEAL_STATUS.STATUSES.APPROVED]: 'Approved',
    [DEAL_STATUS.STATUSES.REJECTED]: 'Rejected',
    [DEAL_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [DEAL_STATUS.STATUSES.COMING_SOON]: 'Coming Soon',
    [DEAL_STATUS.STATUSES.ACTIVE]: 'Active',
    [DEAL_STATUS.STATUSES.ONGOING]: 'Ongoing',
    [DEAL_STATUS.STATUSES.PAUSED]: 'Paused',
    [DEAL_STATUS.STATUSES.EXPIRED]: 'Expired',
    [DEAL_STATUS.STATUSES.COMPLETED]: 'Completed',
    [DEAL_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [DEAL_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesDealStatusGetCategory(status: DealStatusType): DealStatusCategory {
  const categories: Record<DealStatusType, DealStatusCategory> = {
    [DEAL_STATUS.STATUSES.DRAFT]: DEAL_STATUS.CATEGORIES.PREPARATION,
    [DEAL_STATUS.STATUSES.PENDING_APPROVAL]: DEAL_STATUS.CATEGORIES.PREPARATION,
    [DEAL_STATUS.STATUSES.APPROVED]: DEAL_STATUS.CATEGORIES.PREPARATION,
    [DEAL_STATUS.STATUSES.REJECTED]: DEAL_STATUS.CATEGORIES.PREPARATION,
    [DEAL_STATUS.STATUSES.SCHEDULED]: DEAL_STATUS.CATEGORIES.SCHEDULED,
    [DEAL_STATUS.STATUSES.COMING_SOON]: DEAL_STATUS.CATEGORIES.SCHEDULED,
    [DEAL_STATUS.STATUSES.ACTIVE]: DEAL_STATUS.CATEGORIES.ACTIVE,
    [DEAL_STATUS.STATUSES.ONGOING]: DEAL_STATUS.CATEGORIES.ACTIVE,
    [DEAL_STATUS.STATUSES.PAUSED]: DEAL_STATUS.CATEGORIES.ACTIVE,
    [DEAL_STATUS.STATUSES.EXPIRED]: DEAL_STATUS.CATEGORIES.POST_DEAL,
    [DEAL_STATUS.STATUSES.COMPLETED]: DEAL_STATUS.CATEGORIES.POST_DEAL,
    [DEAL_STATUS.STATUSES.CANCELLED]: DEAL_STATUS.CATEGORIES.TERMINATED,
    [DEAL_STATUS.STATUSES.ARCHIVED]: DEAL_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || DEAL_STATUS.CATEGORIES.PREPARATION;
}

export function flashsalesDealStatusGetColor(status: DealStatusType): DealStatusColor {
  const colorMap: Record<DealStatusType, DealStatusColor> = {
    [DEAL_STATUS.STATUSES.DRAFT]: DEAL_STATUS.COLORS.DRAFT,
    [DEAL_STATUS.STATUSES.PENDING_APPROVAL]: DEAL_STATUS.COLORS.PENDING_APPROVAL,
    [DEAL_STATUS.STATUSES.APPROVED]: DEAL_STATUS.COLORS.APPROVED,
    [DEAL_STATUS.STATUSES.REJECTED]: DEAL_STATUS.COLORS.REJECTED,
    [DEAL_STATUS.STATUSES.SCHEDULED]: DEAL_STATUS.COLORS.SCHEDULED,
    [DEAL_STATUS.STATUSES.COMING_SOON]: DEAL_STATUS.COLORS.COMING_SOON,
    [DEAL_STATUS.STATUSES.ACTIVE]: DEAL_STATUS.COLORS.ACTIVE,
    [DEAL_STATUS.STATUSES.ONGOING]: DEAL_STATUS.COLORS.ONGOING,
    [DEAL_STATUS.STATUSES.PAUSED]: DEAL_STATUS.COLORS.PAUSED,
    [DEAL_STATUS.STATUSES.EXPIRED]: DEAL_STATUS.COLORS.EXPIRED,
    [DEAL_STATUS.STATUSES.COMPLETED]: DEAL_STATUS.COLORS.COMPLETED,
    [DEAL_STATUS.STATUSES.CANCELLED]: DEAL_STATUS.COLORS.CANCELLED,
    [DEAL_STATUS.STATUSES.ARCHIVED]: DEAL_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesDealStatusGetPriority(status: DealStatusType): DealStatusPriority {
  const priorityMap: Record<DealStatusType, DealStatusPriority> = {
    [DEAL_STATUS.STATUSES.DRAFT]: DEAL_STATUS.PRIORITY.DRAFT,
    [DEAL_STATUS.STATUSES.PENDING_APPROVAL]: DEAL_STATUS.PRIORITY.PENDING_APPROVAL,
    [DEAL_STATUS.STATUSES.APPROVED]: DEAL_STATUS.PRIORITY.APPROVED,
    [DEAL_STATUS.STATUSES.REJECTED]: DEAL_STATUS.PRIORITY.REJECTED,
    [DEAL_STATUS.STATUSES.SCHEDULED]: DEAL_STATUS.PRIORITY.SCHEDULED,
    [DEAL_STATUS.STATUSES.COMING_SOON]: DEAL_STATUS.PRIORITY.COMING_SOON,
    [DEAL_STATUS.STATUSES.ACTIVE]: DEAL_STATUS.PRIORITY.ACTIVE,
    [DEAL_STATUS.STATUSES.ONGOING]: DEAL_STATUS.PRIORITY.ONGOING,
    [DEAL_STATUS.STATUSES.PAUSED]: DEAL_STATUS.PRIORITY.PAUSED,
    [DEAL_STATUS.STATUSES.EXPIRED]: DEAL_STATUS.PRIORITY.EXPIRED,
    [DEAL_STATUS.STATUSES.COMPLETED]: DEAL_STATUS.PRIORITY.COMPLETED,
    [DEAL_STATUS.STATUSES.CANCELLED]: DEAL_STATUS.PRIORITY.CANCELLED,
    [DEAL_STATUS.STATUSES.ARCHIVED]: DEAL_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesDealStatusIsActive(status: DealStatusType): boolean {
  const activeStatuses: DealStatusType[] = [
    DEAL_STATUS.STATUSES.ACTIVE,
    DEAL_STATUS.STATUSES.ONGOING,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesDealStatusIsScheduled(status: DealStatusType): boolean {
  const scheduledStatuses: DealStatusType[] = [
    DEAL_STATUS.STATUSES.SCHEDULED,
    DEAL_STATUS.STATUSES.COMING_SOON,
  ];
  return scheduledStatuses.includes(status);
}

export function flashsalesDealStatusIsComplete(status: DealStatusType): boolean {
  const completeStatuses: DealStatusType[] = [
    DEAL_STATUS.STATUSES.COMPLETED,
    DEAL_STATUS.STATUSES.EXPIRED,
    DEAL_STATUS.STATUSES.CANCELLED,
    DEAL_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesDealStatusCanTransitionTo(
  currentStatus: DealStatusType,
  targetStatus: DealStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = DEAL_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesDealStatusGetAvailableTransitions(
  currentStatus: DealStatusType
): DealStatusType[] {
  const transitions: Record<string, readonly string[]> = DEAL_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as DealStatusType[];
}

export function flashsalesDealStatusIsValid(status: string): status is DealStatusType {
  return Object.values(DEAL_STATUS.STATUSES).includes(status as DealStatusType);
}
