/**
 * Flash Sale Voucher Status Constants
 * Status definitions for flash sale voucher lifecycle
 */

export const FLASH_SALE_VOUCHER_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    PAUSED: 'paused',
    REDEEMED: 'redeemed',
    PARTIALLY_REDEEMED: 'partially_redeemed',
    EXPIRED: 'expired',
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
    REDEEMED: 'redeemed',
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
    REDEEMED: '#8B5CF6',
    PARTIALLY_REDEEMED: '#06B6D4',
    EXPIRED: '#6B7280',
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
    REDEEMED: 7,
    PARTIALLY_REDEEMED: 8,
    EXPIRED: 9,
    COMPLETED: 10,
    CANCELLED: 11,
    ARCHIVED: 12,
    DELETED: 13,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'cancelled', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'cancelled'],
    APPROVED: ['scheduled', 'active', 'cancelled'],
    REJECTED: ['draft', 'deleted'],
    SCHEDULED: ['active', 'cancelled'],
    ACTIVE: ['paused', 'redeemed', 'expired', 'completed', 'cancelled'],
    PAUSED: ['active', 'cancelled'],
    REDEEMED: ['completed', 'archived'],
    PARTIALLY_REDEEMED: ['redeemed', 'completed', 'archived'],
    EXPIRED: ['archived', 'deleted'],
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
    CAN_REDEEM: ['active'],
    CAN_PARTIAL_REDEEM: ['active'],
    CAN_COMPLETE: ['active', 'redeemed', 'partially_redeemed'],
    CAN_EXPIRE: ['active', 'scheduled'],
    CAN_CANCEL: ['draft', 'pending_approval', 'approved', 'scheduled', 'active', 'paused'],
    CAN_DELETE: ['draft', 'pending_approval', 'rejected', 'paused', 'expired', 'archived'],
  },

  // Voucher Availability
  AVAILABILITY: {
    AVAILABLE: 'available',
    REDEEMED: 'redeemed',
    PARTIAL: 'partial',
    EXPIRED: 'expired',
    EXHAUSTED: 'exhausted',
    SCHEDULED: 'scheduled',
  },
} as const;

// Flash Sale Voucher Statuses
export type FlashSaleVoucherStatusType =
  (typeof FLASH_SALE_VOUCHER_STATUS.STATUSES)[keyof typeof FLASH_SALE_VOUCHER_STATUS.STATUSES];

// Status Categories
export type FlashSaleVoucherStatusCategory =
  (typeof FLASH_SALE_VOUCHER_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_VOUCHER_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleVoucherStatusColor =
  (typeof FLASH_SALE_VOUCHER_STATUS.COLORS)[keyof typeof FLASH_SALE_VOUCHER_STATUS.COLORS];

// Status Priority
export type FlashSaleVoucherStatusPriority =
  (typeof FLASH_SALE_VOUCHER_STATUS.PRIORITY)[keyof typeof FLASH_SALE_VOUCHER_STATUS.PRIORITY];

// Voucher Availability
export type FlashSaleVoucherAvailability =
  (typeof FLASH_SALE_VOUCHER_STATUS.AVAILABILITY)[keyof typeof FLASH_SALE_VOUCHER_STATUS.AVAILABILITY];

// Utility Functions
export function flashsalesVoucherStatusGetLabel(status: FlashSaleVoucherStatusType): string {
  const labels: Record<FlashSaleVoucherStatusType, string> = {
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED]: 'Redeemed',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED]: 'Partially Redeemed',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesVoucherStatusGetCategory(
  status: FlashSaleVoucherStatusType
): FlashSaleVoucherStatusCategory {
  const categories: Record<FlashSaleVoucherStatusType, FlashSaleVoucherStatusCategory> = {
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_VOUCHER_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REJECTED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED]:
      FLASH_SALE_VOUCHER_STATUS.CATEGORIES.REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.COMPLETED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.CANCELLED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DELETED]: FLASH_SALE_VOUCHER_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_VOUCHER_STATUS.CATEGORIES.CREATION;
}

export function flashsalesVoucherStatusGetColor(
  status: FlashSaleVoucherStatusType
): FlashSaleVoucherStatusColor {
  const colorMap: Record<FlashSaleVoucherStatusType, FlashSaleVoucherStatusColor> = {
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT]: FLASH_SALE_VOUCHER_STATUS.COLORS.DRAFT,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_VOUCHER_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED]: FLASH_SALE_VOUCHER_STATUS.COLORS.APPROVED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REJECTED]: FLASH_SALE_VOUCHER_STATUS.COLORS.REJECTED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_VOUCHER_STATUS.COLORS.SCHEDULED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE]: FLASH_SALE_VOUCHER_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED]: FLASH_SALE_VOUCHER_STATUS.COLORS.PAUSED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED]: FLASH_SALE_VOUCHER_STATUS.COLORS.REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED]:
      FLASH_SALE_VOUCHER_STATUS.COLORS.PARTIALLY_REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED]: FLASH_SALE_VOUCHER_STATUS.COLORS.EXPIRED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.COMPLETED]: FLASH_SALE_VOUCHER_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.CANCELLED]: FLASH_SALE_VOUCHER_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_VOUCHER_STATUS.COLORS.ARCHIVED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DELETED]: FLASH_SALE_VOUCHER_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesVoucherStatusGetPriority(
  status: FlashSaleVoucherStatusType
): FlashSaleVoucherStatusPriority {
  const priorityMap: Record<FlashSaleVoucherStatusType, FlashSaleVoucherStatusPriority> = {
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_VOUCHER_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REJECTED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.SCHEDULED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED]:
      FLASH_SALE_VOUCHER_STATUS.PRIORITY.PARTIALLY_REDEEMED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.EXPIRED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.COMPLETED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.CANCELLED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.ARCHIVED,
    [FLASH_SALE_VOUCHER_STATUS.STATUSES.DELETED]: FLASH_SALE_VOUCHER_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesVoucherStatusIsActive(status: FlashSaleVoucherStatusType): boolean {
  const activeStatuses: FlashSaleVoucherStatusType[] = [FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE];
  return activeStatuses.includes(status);
}

export function flashsalesVoucherStatusIsAvailable(status: FlashSaleVoucherStatusType): boolean {
  const availableStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED,
  ];
  return availableStatuses.includes(status);
}

export function flashsalesVoucherStatusIsRedeemed(status: FlashSaleVoucherStatusType): boolean {
  const redeemedStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.COMPLETED,
  ];
  return redeemedStatuses.includes(status);
}

export function flashsalesVoucherStatusIsTerminated(status: FlashSaleVoucherStatusType): boolean {
  const terminatedStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.DELETED,
  ];
  return terminatedStatuses.includes(status);
}

export function flashsalesVoucherStatusCanTransitionTo(
  currentStatus: FlashSaleVoucherStatusType,
  targetStatus: FlashSaleVoucherStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_VOUCHER_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesVoucherStatusGetAvailableTransitions(
  currentStatus: FlashSaleVoucherStatusType
): FlashSaleVoucherStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_VOUCHER_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleVoucherStatusType[];
}

export function flashsalesVoucherStatusCanApprove(status: FlashSaleVoucherStatusType): boolean {
  const canApproveStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesVoucherStatusCanReject(status: FlashSaleVoucherStatusType): boolean {
  const canRejectStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesVoucherStatusCanSchedule(status: FlashSaleVoucherStatusType): boolean {
  const canScheduleStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED,
  ];
  return canScheduleStatuses.includes(status);
}

export function flashsalesVoucherStatusCanActivate(status: FlashSaleVoucherStatusType): boolean {
  const canActivateStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesVoucherStatusCanPause(status: FlashSaleVoucherStatusType): boolean {
  const canPauseStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesVoucherStatusCanResume(status: FlashSaleVoucherStatusType): boolean {
  const canResumeStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesVoucherStatusCanRedeem(status: FlashSaleVoucherStatusType): boolean {
  const canRedeemStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
  ];
  return canRedeemStatuses.includes(status);
}

export function flashsalesVoucherStatusCanPartialRedeem(
  status: FlashSaleVoucherStatusType
): boolean {
  const canPartialRedeemStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
  ];
  return canPartialRedeemStatuses.includes(status);
}

export function flashsalesVoucherStatusCanComplete(status: FlashSaleVoucherStatusType): boolean {
  const canCompleteStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.REDEEMED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PARTIALLY_REDEEMED,
  ];
  return canCompleteStatuses.includes(status);
}

export function flashsalesVoucherStatusCanExpire(status: FlashSaleVoucherStatusType): boolean {
  const canExpireStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED,
  ];
  return canExpireStatuses.includes(status);
}

export function flashsalesVoucherStatusCanCancel(status: FlashSaleVoucherStatusType): boolean {
  const canCancelStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.APPROVED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesVoucherStatusCanDelete(status: FlashSaleVoucherStatusType): boolean {
  const canDeleteStatuses: FlashSaleVoucherStatusType[] = [
    FLASH_SALE_VOUCHER_STATUS.STATUSES.DRAFT,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.REJECTED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.PAUSED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_VOUCHER_STATUS.STATUSES.ARCHIVED,
  ];
  return canDeleteStatuses.includes(status);
}

export function flashsalesVoucherStatusGetAvailabilityLabel(
  availability: FlashSaleVoucherAvailability
): string {
  const labels: Record<FlashSaleVoucherAvailability, string> = {
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.AVAILABLE]: 'Available',
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.REDEEMED]: 'Redeemed',
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.PARTIAL]: 'Partially Redeemed',
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.EXPIRED]: 'Expired',
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.EXHAUSTED]: 'Exhausted',
    [FLASH_SALE_VOUCHER_STATUS.AVAILABILITY.SCHEDULED]: 'Scheduled',
  };
  return labels[availability] || 'Unknown Availability';
}

export function flashsalesVoucherStatusIsValid(
  status: string
): status is FlashSaleVoucherStatusType {
  return Object.values(FLASH_SALE_VOUCHER_STATUS.STATUSES).includes(
    status as FlashSaleVoucherStatusType
  );
}

export function flashsalesVoucherStatusIsValidAvailability(
  availability: string
): availability is FlashSaleVoucherAvailability {
  return Object.values(FLASH_SALE_VOUCHER_STATUS.AVAILABILITY).includes(
    availability as FlashSaleVoucherAvailability
  );
}
