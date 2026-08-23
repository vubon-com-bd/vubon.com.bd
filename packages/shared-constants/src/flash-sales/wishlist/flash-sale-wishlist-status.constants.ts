/**
 * Flash Sale Wishlist Status Constants
 * Status definitions for flash sale wishlist lifecycle
 */

export const FLASH_SALE_WISHLIST_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
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
    ACTIVE: '#10B981',
    INACTIVE: '#6B7280',
    PAUSED: '#F59E0B',
    ARCHIVED: '#6B7280',
    DELETED: '#EF4444',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_APPROVAL: 1,
    APPROVED: 2,
    REJECTED: 3,
    ACTIVE: 4,
    INACTIVE: 5,
    PAUSED: 6,
    ARCHIVED: 7,
    DELETED: 8,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['active', 'inactive', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    ACTIVE: ['inactive', 'paused', 'archived', 'deleted'],
    INACTIVE: ['active', 'archived', 'deleted'],
    PAUSED: ['active', 'archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_APPROVE: ['pending_approval'],
    CAN_REJECT: ['pending_approval'],
    CAN_ACTIVATE: ['approved'],
    CAN_PAUSE: ['active'],
    CAN_RESUME: ['paused', 'inactive'],
    CAN_ARCHIVE: ['active', 'inactive', 'paused'],
    CAN_DELETE: ['draft', 'pending_approval', 'rejected', 'inactive', 'paused', 'archived'],
  },

  // Wishlist Item Status
  ITEM_STATUS: {
    PENDING: 'pending',
    SAVED: 'saved',
    PURCHASED: 'purchased',
    REMOVED: 'removed',
    EXPIRED: 'expired',
    SOLD_OUT: 'sold_out',
    BACK_IN_STOCK: 'back_in_stock',
    PRICE_CHANGED: 'price_changed',
    ON_SALE: 'on_sale',
  },

  // Wishlist Item Priority
  ITEM_PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  },
} as const;

// Flash Sale Wishlist Statuses
export type FlashSaleWishlistStatusType =
  (typeof FLASH_SALE_WISHLIST_STATUS.STATUSES)[keyof typeof FLASH_SALE_WISHLIST_STATUS.STATUSES];

// Status Categories
export type FlashSaleWishlistStatusCategory =
  (typeof FLASH_SALE_WISHLIST_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_WISHLIST_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleWishlistStatusColor =
  (typeof FLASH_SALE_WISHLIST_STATUS.COLORS)[keyof typeof FLASH_SALE_WISHLIST_STATUS.COLORS];

// Status Priority
export type FlashSaleWishlistStatusPriority =
  (typeof FLASH_SALE_WISHLIST_STATUS.PRIORITY)[keyof typeof FLASH_SALE_WISHLIST_STATUS.PRIORITY];

// Wishlist Item Status
export type FlashSaleWishlistItemStatus =
  (typeof FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS)[keyof typeof FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS];

// Wishlist Item Priority
export type FlashSaleWishlistItemPriority =
  (typeof FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY)[keyof typeof FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY];

// Utility Functions
export function flashsalesWishlistStatusGetLabel(status: FlashSaleWishlistStatusType): string {
  const labels: Record<FlashSaleWishlistStatusType, string> = {
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesWishlistStatusGetCategory(
  status: FlashSaleWishlistStatusType
): FlashSaleWishlistStatusCategory {
  const categories: Record<FlashSaleWishlistStatusType, FlashSaleWishlistStatusCategory> = {
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DRAFT]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_WISHLIST_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.REJECTED]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_WISHLIST_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DELETED]: FLASH_SALE_WISHLIST_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_WISHLIST_STATUS.CATEGORIES.CREATION;
}

export function flashsalesWishlistStatusGetColor(
  status: FlashSaleWishlistStatusType
): FlashSaleWishlistStatusColor {
  const colorMap: Record<FlashSaleWishlistStatusType, FlashSaleWishlistStatusColor> = {
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DRAFT]: FLASH_SALE_WISHLIST_STATUS.COLORS.DRAFT,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_WISHLIST_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED]: FLASH_SALE_WISHLIST_STATUS.COLORS.APPROVED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.REJECTED]: FLASH_SALE_WISHLIST_STATUS.COLORS.REJECTED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE]: FLASH_SALE_WISHLIST_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE]: FLASH_SALE_WISHLIST_STATUS.COLORS.INACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED]: FLASH_SALE_WISHLIST_STATUS.COLORS.PAUSED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_WISHLIST_STATUS.COLORS.ARCHIVED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DELETED]: FLASH_SALE_WISHLIST_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesWishlistStatusGetPriority(
  status: FlashSaleWishlistStatusType
): FlashSaleWishlistStatusPriority {
  const priorityMap: Record<FlashSaleWishlistStatusType, FlashSaleWishlistStatusPriority> = {
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DRAFT]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_WISHLIST_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.REJECTED]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.INACTIVE,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.ARCHIVED,
    [FLASH_SALE_WISHLIST_STATUS.STATUSES.DELETED]: FLASH_SALE_WISHLIST_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesWishlistStatusIsActive(status: FlashSaleWishlistStatusType): boolean {
  const activeStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesWishlistStatusIsApproved(status: FlashSaleWishlistStatusType): boolean {
  const approvedStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE,
  ];
  return approvedStatuses.includes(status);
}

export function flashsalesWishlistStatusIsTerminated(status: FlashSaleWishlistStatusType): boolean {
  const terminatedStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.DELETED,
  ];
  return terminatedStatuses.includes(status);
}

export function flashsalesWishlistStatusCanTransitionTo(
  currentStatus: FlashSaleWishlistStatusType,
  targetStatus: FlashSaleWishlistStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_WISHLIST_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesWishlistStatusGetAvailableTransitions(
  currentStatus: FlashSaleWishlistStatusType
): FlashSaleWishlistStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_WISHLIST_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleWishlistStatusType[];
}

export function flashsalesWishlistStatusCanApprove(status: FlashSaleWishlistStatusType): boolean {
  const canApproveStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesWishlistStatusCanReject(status: FlashSaleWishlistStatusType): boolean {
  const canRejectStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesWishlistStatusCanActivate(status: FlashSaleWishlistStatusType): boolean {
  const canActivateStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.APPROVED,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesWishlistStatusCanPause(status: FlashSaleWishlistStatusType): boolean {
  const canPauseStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesWishlistStatusCanResume(status: FlashSaleWishlistStatusType): boolean {
  const canResumeStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesWishlistStatusCanArchive(status: FlashSaleWishlistStatusType): boolean {
  const canArchiveStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED,
  ];
  return canArchiveStatuses.includes(status);
}

export function flashsalesWishlistStatusCanDelete(status: FlashSaleWishlistStatusType): boolean {
  const canDeleteStatuses: FlashSaleWishlistStatusType[] = [
    FLASH_SALE_WISHLIST_STATUS.STATUSES.DRAFT,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.REJECTED,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.PAUSED,
    FLASH_SALE_WISHLIST_STATUS.STATUSES.ARCHIVED,
  ];
  return canDeleteStatuses.includes(status);
}

export function flashsalesWishlistStatusGetItemStatusLabel(
  itemStatus: FlashSaleWishlistItemStatus
): string {
  const labels: Record<FlashSaleWishlistItemStatus, string> = {
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.PENDING]: 'Pending',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.SAVED]: 'Saved',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.PURCHASED]: 'Purchased',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.REMOVED]: 'Removed',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.EXPIRED]: 'Expired',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.SOLD_OUT]: 'Sold Out',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.BACK_IN_STOCK]: 'Back in Stock',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.PRICE_CHANGED]: 'Price Changed',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS.ON_SALE]: 'On Sale',
  };
  return labels[itemStatus] || 'Unknown Item Status';
}

export function flashsalesWishlistStatusGetItemPriorityLabel(
  itemPriority: FlashSaleWishlistItemPriority
): string {
  const labels: Record<FlashSaleWishlistItemPriority, string> = {
    [FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY.LOW]: 'Low',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY.HIGH]: 'High',
    [FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY.URGENT]: 'Urgent',
  };
  return labels[itemPriority] || 'Unknown Priority';
}

export function flashsalesWishlistStatusIsValid(
  status: string
): status is FlashSaleWishlistStatusType {
  return Object.values(FLASH_SALE_WISHLIST_STATUS.STATUSES).includes(
    status as FlashSaleWishlistStatusType
  );
}

export function flashsalesWishlistStatusIsValidItemStatus(
  status: string
): status is FlashSaleWishlistItemStatus {
  return Object.values(FLASH_SALE_WISHLIST_STATUS.ITEM_STATUS).includes(
    status as FlashSaleWishlistItemStatus
  );
}

export function flashsalesWishlistStatusIsValidItemPriority(
  priority: string
): priority is FlashSaleWishlistItemPriority {
  return Object.values(FLASH_SALE_WISHLIST_STATUS.ITEM_PRIORITY).includes(
    priority as FlashSaleWishlistItemPriority
  );
}
