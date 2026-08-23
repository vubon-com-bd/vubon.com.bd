/**
 * Product Deal Status Constants
 * Status definitions for product deal lifecycle
 */

export const PRODUCT_DEAL_STATUS = {
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

// Product Deal Statuses
export type ProductDealStatusType =
  (typeof PRODUCT_DEAL_STATUS.STATUSES)[keyof typeof PRODUCT_DEAL_STATUS.STATUSES];

// Status Categories
export type ProductDealStatusCategory =
  (typeof PRODUCT_DEAL_STATUS.CATEGORIES)[keyof typeof PRODUCT_DEAL_STATUS.CATEGORIES];

// Status Colors
export type ProductDealStatusColor =
  (typeof PRODUCT_DEAL_STATUS.COLORS)[keyof typeof PRODUCT_DEAL_STATUS.COLORS];

// Status Priority
export type ProductDealStatusPriority =
  (typeof PRODUCT_DEAL_STATUS.PRIORITY)[keyof typeof PRODUCT_DEAL_STATUS.PRIORITY];

// Utility Functions
export function flashsalesProductDealStatusGetLabel(status: ProductDealStatusType): string {
  const labels: Record<ProductDealStatusType, string> = {
    [PRODUCT_DEAL_STATUS.STATUSES.DRAFT]: 'Draft',
    [PRODUCT_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [PRODUCT_DEAL_STATUS.STATUSES.APPROVED]: 'Approved',
    [PRODUCT_DEAL_STATUS.STATUSES.REJECTED]: 'Rejected',
    [PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON]: 'Coming Soon',
    [PRODUCT_DEAL_STATUS.STATUSES.ACTIVE]: 'Active',
    [PRODUCT_DEAL_STATUS.STATUSES.ONGOING]: 'Ongoing',
    [PRODUCT_DEAL_STATUS.STATUSES.PAUSED]: 'Paused',
    [PRODUCT_DEAL_STATUS.STATUSES.EXPIRED]: 'Expired',
    [PRODUCT_DEAL_STATUS.STATUSES.COMPLETED]: 'Completed',
    [PRODUCT_DEAL_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [PRODUCT_DEAL_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesProductDealStatusGetCategory(
  status: ProductDealStatusType
): ProductDealStatusCategory {
  const categories: Record<ProductDealStatusType, ProductDealStatusCategory> = {
    [PRODUCT_DEAL_STATUS.STATUSES.DRAFT]: PRODUCT_DEAL_STATUS.CATEGORIES.PREPARATION,
    [PRODUCT_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: PRODUCT_DEAL_STATUS.CATEGORIES.PREPARATION,
    [PRODUCT_DEAL_STATUS.STATUSES.APPROVED]: PRODUCT_DEAL_STATUS.CATEGORIES.PREPARATION,
    [PRODUCT_DEAL_STATUS.STATUSES.REJECTED]: PRODUCT_DEAL_STATUS.CATEGORIES.PREPARATION,
    [PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED]: PRODUCT_DEAL_STATUS.CATEGORIES.SCHEDULED,
    [PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON]: PRODUCT_DEAL_STATUS.CATEGORIES.SCHEDULED,
    [PRODUCT_DEAL_STATUS.STATUSES.ACTIVE]: PRODUCT_DEAL_STATUS.CATEGORIES.ACTIVE,
    [PRODUCT_DEAL_STATUS.STATUSES.ONGOING]: PRODUCT_DEAL_STATUS.CATEGORIES.ACTIVE,
    [PRODUCT_DEAL_STATUS.STATUSES.PAUSED]: PRODUCT_DEAL_STATUS.CATEGORIES.ACTIVE,
    [PRODUCT_DEAL_STATUS.STATUSES.EXPIRED]: PRODUCT_DEAL_STATUS.CATEGORIES.POST_DEAL,
    [PRODUCT_DEAL_STATUS.STATUSES.COMPLETED]: PRODUCT_DEAL_STATUS.CATEGORIES.POST_DEAL,
    [PRODUCT_DEAL_STATUS.STATUSES.CANCELLED]: PRODUCT_DEAL_STATUS.CATEGORIES.TERMINATED,
    [PRODUCT_DEAL_STATUS.STATUSES.ARCHIVED]: PRODUCT_DEAL_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || PRODUCT_DEAL_STATUS.CATEGORIES.PREPARATION;
}

export function flashsalesProductDealStatusGetColor(
  status: ProductDealStatusType
): ProductDealStatusColor {
  const colorMap: Record<ProductDealStatusType, ProductDealStatusColor> = {
    [PRODUCT_DEAL_STATUS.STATUSES.DRAFT]: PRODUCT_DEAL_STATUS.COLORS.DRAFT,
    [PRODUCT_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: PRODUCT_DEAL_STATUS.COLORS.PENDING_APPROVAL,
    [PRODUCT_DEAL_STATUS.STATUSES.APPROVED]: PRODUCT_DEAL_STATUS.COLORS.APPROVED,
    [PRODUCT_DEAL_STATUS.STATUSES.REJECTED]: PRODUCT_DEAL_STATUS.COLORS.REJECTED,
    [PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED]: PRODUCT_DEAL_STATUS.COLORS.SCHEDULED,
    [PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON]: PRODUCT_DEAL_STATUS.COLORS.COMING_SOON,
    [PRODUCT_DEAL_STATUS.STATUSES.ACTIVE]: PRODUCT_DEAL_STATUS.COLORS.ACTIVE,
    [PRODUCT_DEAL_STATUS.STATUSES.ONGOING]: PRODUCT_DEAL_STATUS.COLORS.ONGOING,
    [PRODUCT_DEAL_STATUS.STATUSES.PAUSED]: PRODUCT_DEAL_STATUS.COLORS.PAUSED,
    [PRODUCT_DEAL_STATUS.STATUSES.EXPIRED]: PRODUCT_DEAL_STATUS.COLORS.EXPIRED,
    [PRODUCT_DEAL_STATUS.STATUSES.COMPLETED]: PRODUCT_DEAL_STATUS.COLORS.COMPLETED,
    [PRODUCT_DEAL_STATUS.STATUSES.CANCELLED]: PRODUCT_DEAL_STATUS.COLORS.CANCELLED,
    [PRODUCT_DEAL_STATUS.STATUSES.ARCHIVED]: PRODUCT_DEAL_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesProductDealStatusGetPriority(
  status: ProductDealStatusType
): ProductDealStatusPriority {
  const priorityMap: Record<ProductDealStatusType, ProductDealStatusPriority> = {
    [PRODUCT_DEAL_STATUS.STATUSES.DRAFT]: PRODUCT_DEAL_STATUS.PRIORITY.DRAFT,
    [PRODUCT_DEAL_STATUS.STATUSES.PENDING_APPROVAL]: PRODUCT_DEAL_STATUS.PRIORITY.PENDING_APPROVAL,
    [PRODUCT_DEAL_STATUS.STATUSES.APPROVED]: PRODUCT_DEAL_STATUS.PRIORITY.APPROVED,
    [PRODUCT_DEAL_STATUS.STATUSES.REJECTED]: PRODUCT_DEAL_STATUS.PRIORITY.REJECTED,
    [PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED]: PRODUCT_DEAL_STATUS.PRIORITY.SCHEDULED,
    [PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON]: PRODUCT_DEAL_STATUS.PRIORITY.COMING_SOON,
    [PRODUCT_DEAL_STATUS.STATUSES.ACTIVE]: PRODUCT_DEAL_STATUS.PRIORITY.ACTIVE,
    [PRODUCT_DEAL_STATUS.STATUSES.ONGOING]: PRODUCT_DEAL_STATUS.PRIORITY.ONGOING,
    [PRODUCT_DEAL_STATUS.STATUSES.PAUSED]: PRODUCT_DEAL_STATUS.PRIORITY.PAUSED,
    [PRODUCT_DEAL_STATUS.STATUSES.EXPIRED]: PRODUCT_DEAL_STATUS.PRIORITY.EXPIRED,
    [PRODUCT_DEAL_STATUS.STATUSES.COMPLETED]: PRODUCT_DEAL_STATUS.PRIORITY.COMPLETED,
    [PRODUCT_DEAL_STATUS.STATUSES.CANCELLED]: PRODUCT_DEAL_STATUS.PRIORITY.CANCELLED,
    [PRODUCT_DEAL_STATUS.STATUSES.ARCHIVED]: PRODUCT_DEAL_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesProductDealStatusIsActive(status: ProductDealStatusType): boolean {
  const activeStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.ACTIVE,
    PRODUCT_DEAL_STATUS.STATUSES.ONGOING,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesProductDealStatusIsScheduled(status: ProductDealStatusType): boolean {
  const scheduledStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED,
    PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON,
  ];
  return scheduledStatuses.includes(status);
}

export function flashsalesProductDealStatusIsComplete(status: ProductDealStatusType): boolean {
  const completeStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.COMPLETED,
    PRODUCT_DEAL_STATUS.STATUSES.EXPIRED,
    PRODUCT_DEAL_STATUS.STATUSES.CANCELLED,
    PRODUCT_DEAL_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesProductDealStatusCanTransitionTo(
  currentStatus: ProductDealStatusType,
  targetStatus: ProductDealStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = PRODUCT_DEAL_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesProductDealStatusGetAvailableTransitions(
  currentStatus: ProductDealStatusType
): ProductDealStatusType[] {
  const transitions: Record<string, readonly string[]> = PRODUCT_DEAL_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ProductDealStatusType[];
}

export function flashsalesProductDealStatusCanStart(status: ProductDealStatusType): boolean {
  const canStartStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.APPROVED,
    PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED,
  ];
  return canStartStatuses.includes(status);
}

export function flashsalesProductDealStatusCanPause(status: ProductDealStatusType): boolean {
  const canPauseStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.ACTIVE,
    PRODUCT_DEAL_STATUS.STATUSES.ONGOING,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesProductDealStatusCanResume(status: ProductDealStatusType): boolean {
  const canResumeStatuses: ProductDealStatusType[] = [PRODUCT_DEAL_STATUS.STATUSES.PAUSED];
  return canResumeStatuses.includes(status);
}

export function flashsalesProductDealStatusCanEnd(status: ProductDealStatusType): boolean {
  const canEndStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.ACTIVE,
    PRODUCT_DEAL_STATUS.STATUSES.ONGOING,
    PRODUCT_DEAL_STATUS.STATUSES.PAUSED,
  ];
  return canEndStatuses.includes(status);
}

export function flashsalesProductDealStatusCanCancel(status: ProductDealStatusType): boolean {
  const canCancelStatuses: ProductDealStatusType[] = [
    PRODUCT_DEAL_STATUS.STATUSES.DRAFT,
    PRODUCT_DEAL_STATUS.STATUSES.PENDING_APPROVAL,
    PRODUCT_DEAL_STATUS.STATUSES.APPROVED,
    PRODUCT_DEAL_STATUS.STATUSES.SCHEDULED,
    PRODUCT_DEAL_STATUS.STATUSES.COMING_SOON,
    PRODUCT_DEAL_STATUS.STATUSES.ACTIVE,
    PRODUCT_DEAL_STATUS.STATUSES.ONGOING,
    PRODUCT_DEAL_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesProductDealStatusIsValid(
  status: string
): status is ProductDealStatusType {
  return Object.values(PRODUCT_DEAL_STATUS.STATUSES).includes(status as ProductDealStatusType);
}
