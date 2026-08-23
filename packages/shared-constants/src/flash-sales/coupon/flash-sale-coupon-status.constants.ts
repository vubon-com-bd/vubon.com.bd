/**
 * Flash Sale Coupon Status Constants
 * Status definitions for flash sale coupon lifecycle
 */

export const FLASH_SALE_COUPON_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    PAUSED: 'paused',
    EXPIRED: 'expired',
    EXHAUSTED: 'exhausted',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  },

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    APPROVAL: 'approval',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    TERMINATED: 'terminated',
  },

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    SCHEDULED: '#3B82F6',
    ACTIVE: '#10B981',
    PAUSED: '#F59E0B',
    EXPIRED: '#6B7280',
    EXHAUSTED: '#EF4444',
    COMPLETED: '#10B981',
    CANCELLED: '#EF4444',
    ARCHIVED: '#6B7280',
    DELETED: '#EF4444',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_APPROVAL: 1,
    APPROVED: 2,
    REJECTED: 3,
    SCHEDULED: 4,
    ACTIVE: 5,
    PAUSED: 6,
    EXPIRED: 7,
    EXHAUSTED: 8,
    COMPLETED: 9,
    CANCELLED: 10,
    ARCHIVED: 11,
    DELETED: 12,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'cancelled', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'cancelled'],
    APPROVED: ['scheduled', 'active', 'cancelled'],
    REJECTED: ['draft', 'deleted'],
    SCHEDULED: ['active', 'cancelled'],
    ACTIVE: ['paused', 'expired', 'exhausted', 'completed', 'cancelled'],
    PAUSED: ['active', 'cancelled'],
    EXPIRED: ['archived', 'deleted'],
    EXHAUSTED: ['archived', 'deleted'],
    COMPLETED: ['archived', 'deleted'],
    CANCELLED: ['archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_APPROVE: ['pending_approval'],
    CAN_REJECT: ['pending_approval'],
    CAN_SCHEDULE: ['approved'],
    CAN_ACTIVATE: ['approved', 'scheduled'],
    CAN_PAUSE: ['active'],
    CAN_RESUME: ['paused'],
    CAN_COMPLETE: ['active'],
    CAN_EXPIRE: ['active', 'scheduled'],
    CAN_CANCEL: ['draft', 'pending_approval', 'approved', 'scheduled', 'active', 'paused'],
    CAN_DELETE: [
      'draft',
      'pending_approval',
      'rejected',
      'paused',
      'expired',
      'exhausted',
      'archived',
    ],
  },

  // Coupon Availability
  AVAILABILITY: {
    AVAILABLE: 'available',
    LIMITED: 'limited',
    UNAVAILABLE: 'unavailable',
    EXPIRED: 'expired',
    EXHAUSTED: 'exhausted',
    SCHEDULED: 'scheduled',
  },
} as const;

// Flash Sale Coupon Statuses
export type FlashSaleCouponStatusType =
  (typeof FLASH_SALE_COUPON_STATUS.STATUSES)[keyof typeof FLASH_SALE_COUPON_STATUS.STATUSES];

// Status Categories
export type FlashSaleCouponStatusCategory =
  (typeof FLASH_SALE_COUPON_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_COUPON_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleCouponStatusColor =
  (typeof FLASH_SALE_COUPON_STATUS.COLORS)[keyof typeof FLASH_SALE_COUPON_STATUS.COLORS];

// Status Priority
export type FlashSaleCouponStatusPriority =
  (typeof FLASH_SALE_COUPON_STATUS.PRIORITY)[keyof typeof FLASH_SALE_COUPON_STATUS.PRIORITY];

// Coupon Availability
export type FlashSaleCouponAvailability =
  (typeof FLASH_SALE_COUPON_STATUS.AVAILABILITY)[keyof typeof FLASH_SALE_COUPON_STATUS.AVAILABILITY];

// Utility Functions
export function flashsalesCouponStatusGetLabel(status: FlashSaleCouponStatusType): string {
  const labels: Record<FlashSaleCouponStatusType, string> = {
    [FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_COUPON_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED]: 'Exhausted',
    [FLASH_SALE_COUPON_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_COUPON_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [FLASH_SALE_COUPON_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesCouponStatusGetCategory(
  status: FlashSaleCouponStatusType
): FlashSaleCouponStatusCategory {
  const categories: Record<FlashSaleCouponStatusType, FlashSaleCouponStatusCategory> = {
    [FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT]: FLASH_SALE_COUPON_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_COUPON_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_COUPON_STATUS.STATUSES.REJECTED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE]: FLASH_SALE_COUPON_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.COMPLETED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.CANCELLED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.DELETED]: FLASH_SALE_COUPON_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_COUPON_STATUS.CATEGORIES.CREATION;
}

export function flashsalesCouponStatusGetColor(
  status: FlashSaleCouponStatusType
): FlashSaleCouponStatusColor {
  const colorMap: Record<FlashSaleCouponStatusType, FlashSaleCouponStatusColor> = {
    [FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT]: FLASH_SALE_COUPON_STATUS.COLORS.DRAFT,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_COUPON_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED]: FLASH_SALE_COUPON_STATUS.COLORS.APPROVED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.REJECTED]: FLASH_SALE_COUPON_STATUS.COLORS.REJECTED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_COUPON_STATUS.COLORS.SCHEDULED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE]: FLASH_SALE_COUPON_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED]: FLASH_SALE_COUPON_STATUS.COLORS.PAUSED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED]: FLASH_SALE_COUPON_STATUS.COLORS.EXPIRED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED]: FLASH_SALE_COUPON_STATUS.COLORS.EXHAUSTED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.COMPLETED]: FLASH_SALE_COUPON_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.CANCELLED]: FLASH_SALE_COUPON_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_COUPON_STATUS.COLORS.ARCHIVED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.DELETED]: FLASH_SALE_COUPON_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesCouponStatusGetPriority(
  status: FlashSaleCouponStatusType
): FlashSaleCouponStatusPriority {
  const priorityMap: Record<FlashSaleCouponStatusType, FlashSaleCouponStatusPriority> = {
    [FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT]: FLASH_SALE_COUPON_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_COUPON_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED]: FLASH_SALE_COUPON_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.REJECTED]: FLASH_SALE_COUPON_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_COUPON_STATUS.PRIORITY.SCHEDULED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE]: FLASH_SALE_COUPON_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED]: FLASH_SALE_COUPON_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED]: FLASH_SALE_COUPON_STATUS.PRIORITY.EXPIRED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED]: FLASH_SALE_COUPON_STATUS.PRIORITY.EXHAUSTED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.COMPLETED]: FLASH_SALE_COUPON_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.CANCELLED]: FLASH_SALE_COUPON_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_COUPON_STATUS.PRIORITY.ARCHIVED,
    [FLASH_SALE_COUPON_STATUS.STATUSES.DELETED]: FLASH_SALE_COUPON_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesCouponStatusIsActive(status: FlashSaleCouponStatusType): boolean {
  const activeStatuses: FlashSaleCouponStatusType[] = [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE];
  return activeStatuses.includes(status);
}

export function flashsalesCouponStatusIsAvailable(status: FlashSaleCouponStatusType): boolean {
  const availableStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED,
  ];
  return availableStatuses.includes(status);
}

export function flashsalesCouponStatusIsTerminated(status: FlashSaleCouponStatusType): boolean {
  const terminatedStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED,
    FLASH_SALE_COUPON_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_COUPON_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED,
    FLASH_SALE_COUPON_STATUS.STATUSES.DELETED,
  ];
  return terminatedStatuses.includes(status);
}

export function flashsalesCouponStatusCanTransitionTo(
  currentStatus: FlashSaleCouponStatusType,
  targetStatus: FlashSaleCouponStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_COUPON_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesCouponStatusGetAvailableTransitions(
  currentStatus: FlashSaleCouponStatusType
): FlashSaleCouponStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_COUPON_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleCouponStatusType[];
}

export function flashsalesCouponStatusCanApprove(status: FlashSaleCouponStatusType): boolean {
  const canApproveStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesCouponStatusCanReject(status: FlashSaleCouponStatusType): boolean {
  const canRejectStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesCouponStatusCanSchedule(status: FlashSaleCouponStatusType): boolean {
  const canScheduleStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED,
  ];
  return canScheduleStatuses.includes(status);
}

export function flashsalesCouponStatusCanActivate(status: FlashSaleCouponStatusType): boolean {
  const canActivateStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED,
    FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesCouponStatusCanPause(status: FlashSaleCouponStatusType): boolean {
  const canPauseStatuses: FlashSaleCouponStatusType[] = [FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE];
  return canPauseStatuses.includes(status);
}

export function flashsalesCouponStatusCanResume(status: FlashSaleCouponStatusType): boolean {
  const canResumeStatuses: FlashSaleCouponStatusType[] = [FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED];
  return canResumeStatuses.includes(status);
}

export function flashsalesCouponStatusCanComplete(status: FlashSaleCouponStatusType): boolean {
  const canCompleteStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE,
  ];
  return canCompleteStatuses.includes(status);
}

export function flashsalesCouponStatusCanExpire(status: FlashSaleCouponStatusType): boolean {
  const canExpireStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED,
  ];
  return canExpireStatuses.includes(status);
}

export function flashsalesCouponStatusCanCancel(status: FlashSaleCouponStatusType): boolean {
  const canCancelStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT,
    FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_COUPON_STATUS.STATUSES.APPROVED,
    FLASH_SALE_COUPON_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_COUPON_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesCouponStatusCanDelete(status: FlashSaleCouponStatusType): boolean {
  const canDeleteStatuses: FlashSaleCouponStatusType[] = [
    FLASH_SALE_COUPON_STATUS.STATUSES.DRAFT,
    FLASH_SALE_COUPON_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_COUPON_STATUS.STATUSES.REJECTED,
    FLASH_SALE_COUPON_STATUS.STATUSES.PAUSED,
    FLASH_SALE_COUPON_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_COUPON_STATUS.STATUSES.EXHAUSTED,
    FLASH_SALE_COUPON_STATUS.STATUSES.ARCHIVED,
  ];
  return canDeleteStatuses.includes(status);
}

export function flashsalesCouponStatusGetAvailabilityLabel(
  availability: FlashSaleCouponAvailability
): string {
  const labels: Record<FlashSaleCouponAvailability, string> = {
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.AVAILABLE]: 'Available',
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.LIMITED]: 'Limited Availability',
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.UNAVAILABLE]: 'Unavailable',
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.EXPIRED]: 'Expired',
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.EXHAUSTED]: 'Exhausted',
    [FLASH_SALE_COUPON_STATUS.AVAILABILITY.SCHEDULED]: 'Scheduled',
  };
  return labels[availability] || 'Unknown Availability';
}

export function flashsalesCouponStatusIsValid(status: string): status is FlashSaleCouponStatusType {
  return Object.values(FLASH_SALE_COUPON_STATUS.STATUSES).includes(
    status as FlashSaleCouponStatusType
  );
}

export function flashsalesCouponStatusIsValidAvailability(
  availability: string
): availability is FlashSaleCouponAvailability {
  return Object.values(FLASH_SALE_COUPON_STATUS.AVAILABILITY).includes(
    availability as FlashSaleCouponAvailability
  );
}
