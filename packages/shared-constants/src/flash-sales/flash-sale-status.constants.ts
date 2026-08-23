/**
 * Flash Sale Status Constants
 * Status definitions for flash sale lifecycle
 */

export const FLASH_SALE_STATUS = {
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
  } as const,

  // Status Categories
  CATEGORIES: {
    PREPARATION: 'preparation',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    POST_SALE: 'post_sale',
    TERMINATED: 'terminated',
  } as const,

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
  } as const,

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
  } as const,

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
  } as const,

  // Status Validation
  VALIDATION: {
    CAN_START: ['approved', 'scheduled'] as readonly string[],
    CAN_PAUSE: ['active', 'ongoing'] as readonly string[],
    CAN_RESUME: ['paused'] as readonly string[],
    CAN_END: ['active', 'ongoing', 'paused'] as readonly string[],
    CAN_CANCEL: [
      'draft',
      'pending_approval',
      'approved',
      'scheduled',
      'coming_soon',
      'active',
      'ongoing',
      'paused',
    ] as readonly string[],
  } as const,
} as const;

// Flash Sale Statuses
export type FlashSaleStatusType =
  (typeof FLASH_SALE_STATUS.STATUSES)[keyof typeof FLASH_SALE_STATUS.STATUSES];

// Status Categories
export type FlashSaleStatusCategory =
  (typeof FLASH_SALE_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleStatusColor =
  (typeof FLASH_SALE_STATUS.COLORS)[keyof typeof FLASH_SALE_STATUS.COLORS];

// Status Priority
export type FlashSaleStatusPriority =
  (typeof FLASH_SALE_STATUS.PRIORITY)[keyof typeof FLASH_SALE_STATUS.PRIORITY];

// Utility Functions
export function flashSaleStatusGetLabel(status: FlashSaleStatusType): string {
  const labels: Record<FlashSaleStatusType, string> = {
    [FLASH_SALE_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_STATUS.STATUSES.COMING_SOON]: 'Coming Soon',
    [FLASH_SALE_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_STATUS.STATUSES.ONGOING]: 'Ongoing',
    [FLASH_SALE_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_STATUS.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashSaleStatusGetCategory(status: FlashSaleStatusType): FlashSaleStatusCategory {
  const categories: Record<FlashSaleStatusType, FlashSaleStatusCategory> = {
    [FLASH_SALE_STATUS.STATUSES.DRAFT]: FLASH_SALE_STATUS.CATEGORIES.PREPARATION,
    [FLASH_SALE_STATUS.STATUSES.PENDING_APPROVAL]: FLASH_SALE_STATUS.CATEGORIES.PREPARATION,
    [FLASH_SALE_STATUS.STATUSES.APPROVED]: FLASH_SALE_STATUS.CATEGORIES.PREPARATION,
    [FLASH_SALE_STATUS.STATUSES.REJECTED]: FLASH_SALE_STATUS.CATEGORIES.PREPARATION,
    [FLASH_SALE_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_STATUS.CATEGORIES.SCHEDULED,
    [FLASH_SALE_STATUS.STATUSES.COMING_SOON]: FLASH_SALE_STATUS.CATEGORIES.SCHEDULED,
    [FLASH_SALE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_STATUS.STATUSES.ONGOING]: FLASH_SALE_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_STATUS.STATUSES.PAUSED]: FLASH_SALE_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_STATUS.CATEGORIES.POST_SALE,
    [FLASH_SALE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_STATUS.CATEGORIES.POST_SALE,
    [FLASH_SALE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_STATUS.CATEGORIES.PREPARATION;
}

export function flashSaleStatusGetColor(status: FlashSaleStatusType): FlashSaleStatusColor {
  const colorMap: Record<FlashSaleStatusType, FlashSaleStatusColor> = {
    [FLASH_SALE_STATUS.STATUSES.DRAFT]: FLASH_SALE_STATUS.COLORS.DRAFT,
    [FLASH_SALE_STATUS.STATUSES.PENDING_APPROVAL]: FLASH_SALE_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_STATUS.STATUSES.APPROVED]: FLASH_SALE_STATUS.COLORS.APPROVED,
    [FLASH_SALE_STATUS.STATUSES.REJECTED]: FLASH_SALE_STATUS.COLORS.REJECTED,
    [FLASH_SALE_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_STATUS.COLORS.SCHEDULED,
    [FLASH_SALE_STATUS.STATUSES.COMING_SOON]: FLASH_SALE_STATUS.COLORS.COMING_SOON,
    [FLASH_SALE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_STATUS.STATUSES.ONGOING]: FLASH_SALE_STATUS.COLORS.ONGOING,
    [FLASH_SALE_STATUS.STATUSES.PAUSED]: FLASH_SALE_STATUS.COLORS.PAUSED,
    [FLASH_SALE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_STATUS.COLORS.EXPIRED,
    [FLASH_SALE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashSaleStatusGetPriority(status: FlashSaleStatusType): FlashSaleStatusPriority {
  const priorityMap: Record<FlashSaleStatusType, FlashSaleStatusPriority> = {
    [FLASH_SALE_STATUS.STATUSES.DRAFT]: FLASH_SALE_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_STATUS.STATUSES.PENDING_APPROVAL]: FLASH_SALE_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_STATUS.STATUSES.APPROVED]: FLASH_SALE_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_STATUS.STATUSES.REJECTED]: FLASH_SALE_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_STATUS.PRIORITY.SCHEDULED,
    [FLASH_SALE_STATUS.STATUSES.COMING_SOON]: FLASH_SALE_STATUS.PRIORITY.COMING_SOON,
    [FLASH_SALE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_STATUS.STATUSES.ONGOING]: FLASH_SALE_STATUS.PRIORITY.ONGOING,
    [FLASH_SALE_STATUS.STATUSES.PAUSED]: FLASH_SALE_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_STATUS.PRIORITY.EXPIRED,
    [FLASH_SALE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashSaleStatusIsActive(status: FlashSaleStatusType): boolean {
  const activeStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_STATUS.STATUSES.ONGOING,
  ];
  return activeStatuses.includes(status);
}

export function flashSaleStatusIsScheduled(status: FlashSaleStatusType): boolean {
  const scheduledStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_STATUS.STATUSES.COMING_SOON,
  ];
  return scheduledStatuses.includes(status);
}

export function flashSaleStatusIsComplete(status: FlashSaleStatusType): boolean {
  const completeStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashSaleStatusCanTransitionTo(
  currentStatus: FlashSaleStatusType,
  targetStatus: FlashSaleStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashSaleStatusGetAvailableTransitions(
  currentStatus: FlashSaleStatusType
): FlashSaleStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleStatusType[];
}

export function flashSaleStatusCanStart(status: FlashSaleStatusType): boolean {
  const canStartStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_STATUS.STATUSES.SCHEDULED,
  ];
  return canStartStatuses.includes(status);
}

export function flashSaleStatusCanPause(status: FlashSaleStatusType): boolean {
  const canPauseStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_STATUS.STATUSES.ONGOING,
  ];
  return canPauseStatuses.includes(status);
}

export function flashSaleStatusCanResume(status: FlashSaleStatusType): boolean {
  const canResumeStatuses: FlashSaleStatusType[] = [FLASH_SALE_STATUS.STATUSES.PAUSED];
  return canResumeStatuses.includes(status);
}

export function flashSaleStatusCanEnd(status: FlashSaleStatusType): boolean {
  const canEndStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_STATUS.STATUSES.ONGOING,
    FLASH_SALE_STATUS.STATUSES.PAUSED,
  ];
  return canEndStatuses.includes(status);
}

export function flashSaleStatusCanCancel(status: FlashSaleStatusType): boolean {
  const canCancelStatuses: FlashSaleStatusType[] = [
    FLASH_SALE_STATUS.STATUSES.DRAFT,
    FLASH_SALE_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_STATUS.STATUSES.COMING_SOON,
    FLASH_SALE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_STATUS.STATUSES.ONGOING,
    FLASH_SALE_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashSaleStatusIsValid(status: string): status is FlashSaleStatusType {
  return Object.values(FLASH_SALE_STATUS.STATUSES).includes(status as FlashSaleStatusType);
}
