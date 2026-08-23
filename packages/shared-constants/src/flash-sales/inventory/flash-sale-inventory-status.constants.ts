/**
 * Flash Sale Inventory Status Constants
 * Status definitions for flash sale inventory lifecycle
 */

export const FLASH_SALE_INVENTORY_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    SOLD_OUT: 'sold_out',
    DISCONTINUED: 'discontinued',
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
    SOLD_OUT: '#EF4444',
    DISCONTINUED: '#6B7280',
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
    SOLD_OUT: 7,
    DISCONTINUED: 8,
    ARCHIVED: 9,
    DELETED: 10,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['active', 'inactive', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    ACTIVE: ['inactive', 'paused', 'sold_out', 'deleted'],
    INACTIVE: ['active', 'deleted'],
    PAUSED: ['active', 'deleted'],
    SOLD_OUT: ['inactive', 'discontinued', 'deleted'],
    DISCONTINUED: ['archived', 'deleted'],
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
    CAN_SOLD_OUT: ['active'],
    CAN_DISCONTINUE: ['inactive', 'sold_out'],
    CAN_DELETE: [
      'draft',
      'pending_approval',
      'rejected',
      'inactive',
      'paused',
      'discontinued',
      'archived',
    ],
  },

  // Inventory Availability
  AVAILABILITY: {
    IN_STOCK: 'in_stock',
    LOW_STOCK: 'low_stock',
    OUT_OF_STOCK: 'out_of_stock',
    PRE_ORDER: 'pre_order',
    BACKORDER: 'backorder',
    DISCONTINUED: 'discontinued',
  },

  // Stock Levels
  STOCK_LEVELS: {
    CRITICAL: 'critical',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    FULL: 'full',
  },
} as const;

// Flash Sale Inventory Statuses
export type FlashSaleInventoryStatusType =
  (typeof FLASH_SALE_INVENTORY_STATUS.STATUSES)[keyof typeof FLASH_SALE_INVENTORY_STATUS.STATUSES];

// Status Categories
export type FlashSaleInventoryStatusCategory =
  (typeof FLASH_SALE_INVENTORY_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_INVENTORY_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleInventoryStatusColor =
  (typeof FLASH_SALE_INVENTORY_STATUS.COLORS)[keyof typeof FLASH_SALE_INVENTORY_STATUS.COLORS];

// Status Priority
export type FlashSaleInventoryStatusPriority =
  (typeof FLASH_SALE_INVENTORY_STATUS.PRIORITY)[keyof typeof FLASH_SALE_INVENTORY_STATUS.PRIORITY];

// Availability
export type FlashSaleInventoryAvailability =
  (typeof FLASH_SALE_INVENTORY_STATUS.AVAILABILITY)[keyof typeof FLASH_SALE_INVENTORY_STATUS.AVAILABILITY];

// Stock Levels
export type FlashSaleInventoryStockLevel =
  (typeof FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS)[keyof typeof FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS];

// Utility Functions
export function flashsalesInventoryStatusGetLabel(status: FlashSaleInventoryStatusType): string {
  const labels: Record<FlashSaleInventoryStatusType, string> = {
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT]: 'Sold Out',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED]: 'Discontinued',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesInventoryStatusGetCategory(
  status: FlashSaleInventoryStatusType
): FlashSaleInventoryStatusCategory {
  const categories: Record<FlashSaleInventoryStatusType, FlashSaleInventoryStatusCategory> = {
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DRAFT]: FLASH_SALE_INVENTORY_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE]: FLASH_SALE_INVENTORY_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED]: FLASH_SALE_INVENTORY_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DELETED]:
      FLASH_SALE_INVENTORY_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_INVENTORY_STATUS.CATEGORIES.CREATION;
}

export function flashsalesInventoryStatusGetColor(
  status: FlashSaleInventoryStatusType
): FlashSaleInventoryStatusColor {
  const colorMap: Record<FlashSaleInventoryStatusType, FlashSaleInventoryStatusColor> = {
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DRAFT]: FLASH_SALE_INVENTORY_STATUS.COLORS.DRAFT,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_INVENTORY_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED]: FLASH_SALE_INVENTORY_STATUS.COLORS.APPROVED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.REJECTED]: FLASH_SALE_INVENTORY_STATUS.COLORS.REJECTED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE]: FLASH_SALE_INVENTORY_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE]: FLASH_SALE_INVENTORY_STATUS.COLORS.INACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED]: FLASH_SALE_INVENTORY_STATUS.COLORS.PAUSED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT]: FLASH_SALE_INVENTORY_STATUS.COLORS.SOLD_OUT,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED]:
      FLASH_SALE_INVENTORY_STATUS.COLORS.DISCONTINUED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_INVENTORY_STATUS.COLORS.ARCHIVED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DELETED]: FLASH_SALE_INVENTORY_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesInventoryStatusGetPriority(
  status: FlashSaleInventoryStatusType
): FlashSaleInventoryStatusPriority {
  const priorityMap: Record<FlashSaleInventoryStatusType, FlashSaleInventoryStatusPriority> = {
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DRAFT]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_INVENTORY_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.REJECTED]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.INACTIVE,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.SOLD_OUT,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED]:
      FLASH_SALE_INVENTORY_STATUS.PRIORITY.DISCONTINUED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.ARCHIVED,
    [FLASH_SALE_INVENTORY_STATUS.STATUSES.DELETED]: FLASH_SALE_INVENTORY_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesInventoryStatusIsActive(status: FlashSaleInventoryStatusType): boolean {
  const activeStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesInventoryStatusIsApproved(status: FlashSaleInventoryStatusType): boolean {
  const approvedStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE,
  ];
  return approvedStatuses.includes(status);
}

export function flashsalesInventoryStatusIsTerminated(
  status: FlashSaleInventoryStatusType
): boolean {
  const terminatedStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.DELETED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT,
  ];
  return terminatedStatuses.includes(status);
}

export function flashsalesInventoryStatusCanTransitionTo(
  currentStatus: FlashSaleInventoryStatusType,
  targetStatus: FlashSaleInventoryStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_INVENTORY_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesInventoryStatusGetAvailableTransitions(
  currentStatus: FlashSaleInventoryStatusType
): FlashSaleInventoryStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_INVENTORY_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleInventoryStatusType[];
}

export function flashsalesInventoryStatusCanApprove(status: FlashSaleInventoryStatusType): boolean {
  const canApproveStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesInventoryStatusCanReject(status: FlashSaleInventoryStatusType): boolean {
  const canRejectStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesInventoryStatusCanActivate(
  status: FlashSaleInventoryStatusType
): boolean {
  const canActivateStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.APPROVED,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesInventoryStatusCanPause(status: FlashSaleInventoryStatusType): boolean {
  const canPauseStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesInventoryStatusCanResume(status: FlashSaleInventoryStatusType): boolean {
  const canResumeStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesInventoryStatusCanSoldOut(status: FlashSaleInventoryStatusType): boolean {
  const canSoldOutStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ACTIVE,
  ];
  return canSoldOutStatuses.includes(status);
}

export function flashsalesInventoryStatusCanDiscontinue(
  status: FlashSaleInventoryStatusType
): boolean {
  const canDiscontinueStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.SOLD_OUT,
  ];
  return canDiscontinueStatuses.includes(status);
}

export function flashsalesInventoryStatusCanDelete(status: FlashSaleInventoryStatusType): boolean {
  const canDeleteStatuses: FlashSaleInventoryStatusType[] = [
    FLASH_SALE_INVENTORY_STATUS.STATUSES.DRAFT,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.REJECTED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.PAUSED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.DISCONTINUED,
    FLASH_SALE_INVENTORY_STATUS.STATUSES.ARCHIVED,
  ];
  return canDeleteStatuses.includes(status);
}

export function flashsalesInventoryStatusGetAvailabilityLabel(
  availability: FlashSaleInventoryAvailability
): string {
  const labels: Record<FlashSaleInventoryAvailability, string> = {
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.IN_STOCK]: 'In Stock',
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.LOW_STOCK]: 'Low Stock',
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.OUT_OF_STOCK]: 'Out of Stock',
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.PRE_ORDER]: 'Pre-Order',
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.BACKORDER]: 'Backorder',
    [FLASH_SALE_INVENTORY_STATUS.AVAILABILITY.DISCONTINUED]: 'Discontinued',
  };
  return labels[availability] || 'Unknown Availability';
}

export function flashsalesInventoryStatusGetStockLevelLabel(
  stockLevel: FlashSaleInventoryStockLevel
): string {
  const labels: Record<FlashSaleInventoryStockLevel, string> = {
    [FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS.CRITICAL]: 'Critical Stock',
    [FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS.LOW]: 'Low Stock',
    [FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS.MEDIUM]: 'Medium Stock',
    [FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS.HIGH]: 'High Stock',
    [FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS.FULL]: 'Full Stock',
  };
  return labels[stockLevel] || 'Unknown Stock Level';
}

export function flashsalesInventoryStatusIsValid(
  status: string
): status is FlashSaleInventoryStatusType {
  return Object.values(FLASH_SALE_INVENTORY_STATUS.STATUSES).includes(
    status as FlashSaleInventoryStatusType
  );
}

export function flashsalesInventoryStatusIsValidAvailability(
  availability: string
): availability is FlashSaleInventoryAvailability {
  return Object.values(FLASH_SALE_INVENTORY_STATUS.AVAILABILITY).includes(
    availability as FlashSaleInventoryAvailability
  );
}

export function flashsalesInventoryStatusIsValidStockLevel(
  stockLevel: string
): stockLevel is FlashSaleInventoryStockLevel {
  return Object.values(FLASH_SALE_INVENTORY_STATUS.STOCK_LEVELS).includes(
    stockLevel as FlashSaleInventoryStockLevel
  );
}
