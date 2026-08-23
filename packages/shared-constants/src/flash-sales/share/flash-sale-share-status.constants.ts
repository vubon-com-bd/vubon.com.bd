/**
 * Flash Sale Share Status Constants
 * Status definitions for flash sale share lifecycle
 */

export const FLASH_SALE_SHARE_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
  },

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    TERMINATED: 'terminated',
  },

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING: '#F59E0B',
    PROCESSING: '#3B82F6',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    CANCELLED: '#EF4444',
    EXPIRED: '#6B7280',
    ARCHIVED: '#6B7280',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING: 1,
    PROCESSING: 2,
    COMPLETED: 3,
    FAILED: 4,
    CANCELLED: 5,
    EXPIRED: 6,
    ARCHIVED: 7,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending', 'cancelled'],
    PENDING: ['processing', 'cancelled'],
    PROCESSING: ['completed', 'failed', 'cancelled'],
    COMPLETED: ['archived'],
    FAILED: ['pending', 'archived'],
    CANCELLED: ['archived'],
    EXPIRED: ['archived'],
    ARCHIVED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_PROCESS: ['pending'],
    CAN_COMPLETE: ['processing'],
    CAN_RETRY: ['failed'],
    CAN_CANCEL: ['draft', 'pending', 'processing'],
    CAN_ARCHIVE: ['completed', 'failed', 'cancelled', 'expired'],
  },

  // Share Delivery Status
  DELIVERY_STATUS: {
    PENDING: 'pending',
    SENDING: 'sending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETRYING: 'retrying',
  },

  // Share Engagement Status
  ENGAGEMENT_STATUS: {
    VIEWED: 'viewed',
    CLICKED: 'clicked',
    SHARED: 'shared',
    REPOSTED: 'reposted',
    LIKED: 'liked',
    COMMENTED: 'commented',
    CONVERTED: 'converted',
  },
} as const;

// Flash Sale Share Statuses
export type FlashSaleShareStatusType =
  (typeof FLASH_SALE_SHARE_STATUS.STATUSES)[keyof typeof FLASH_SALE_SHARE_STATUS.STATUSES];

// Status Categories
export type FlashSaleShareStatusCategory =
  (typeof FLASH_SALE_SHARE_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_SHARE_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleShareStatusColor =
  (typeof FLASH_SALE_SHARE_STATUS.COLORS)[keyof typeof FLASH_SALE_SHARE_STATUS.COLORS];

// Status Priority
export type FlashSaleShareStatusPriority =
  (typeof FLASH_SALE_SHARE_STATUS.PRIORITY)[keyof typeof FLASH_SALE_SHARE_STATUS.PRIORITY];

// Delivery Status
export type FlashSaleShareDeliveryStatus =
  (typeof FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS)[keyof typeof FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS];

// Engagement Status
export type FlashSaleShareEngagementStatus =
  (typeof FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS)[keyof typeof FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS];

// Utility Functions
export function flashsalesShareStatusGetLabel(status: FlashSaleShareStatusType): string {
  const labels: Record<FlashSaleShareStatusType, string> = {
    [FLASH_SALE_SHARE_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_SHARE_STATUS.STATUSES.PENDING]: 'Pending',
    [FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING]: 'Processing',
    [FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_SHARE_STATUS.STATUSES.FAILED]: 'Failed',
    [FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE_SHARE_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesShareStatusGetCategory(
  status: FlashSaleShareStatusType
): FlashSaleShareStatusCategory {
  const categories: Record<FlashSaleShareStatusType, FlashSaleShareStatusCategory> = {
    [FLASH_SALE_SHARE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SHARE_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PENDING]: FLASH_SALE_SHARE_STATUS.CATEGORIES.PROCESSING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING]: FLASH_SALE_SHARE_STATUS.CATEGORIES.PROCESSING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_SHARE_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.FAILED]: FLASH_SALE_SHARE_STATUS.CATEGORIES.FAILED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_SHARE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_SHARE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_SHARE_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_SHARE_STATUS.CATEGORIES.CREATION;
}

export function flashsalesShareStatusGetColor(
  status: FlashSaleShareStatusType
): FlashSaleShareStatusColor {
  const colorMap: Record<FlashSaleShareStatusType, FlashSaleShareStatusColor> = {
    [FLASH_SALE_SHARE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SHARE_STATUS.COLORS.DRAFT,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PENDING]: FLASH_SALE_SHARE_STATUS.COLORS.PENDING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING]: FLASH_SALE_SHARE_STATUS.COLORS.PROCESSING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_SHARE_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.FAILED]: FLASH_SALE_SHARE_STATUS.COLORS.FAILED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_SHARE_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_SHARE_STATUS.COLORS.EXPIRED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_SHARE_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesShareStatusGetPriority(
  status: FlashSaleShareStatusType
): FlashSaleShareStatusPriority {
  const priorityMap: Record<FlashSaleShareStatusType, FlashSaleShareStatusPriority> = {
    [FLASH_SALE_SHARE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SHARE_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PENDING]: FLASH_SALE_SHARE_STATUS.PRIORITY.PENDING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING]: FLASH_SALE_SHARE_STATUS.PRIORITY.PROCESSING,
    [FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_SHARE_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.FAILED]: FLASH_SALE_SHARE_STATUS.PRIORITY.FAILED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_SHARE_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED]: FLASH_SALE_SHARE_STATUS.PRIORITY.EXPIRED,
    [FLASH_SALE_SHARE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_SHARE_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesShareStatusIsActive(status: FlashSaleShareStatusType): boolean {
  const activeStatuses: FlashSaleShareStatusType[] = [
    FLASH_SALE_SHARE_STATUS.STATUSES.PENDING,
    FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesShareStatusIsComplete(status: FlashSaleShareStatusType): boolean {
  const completeStatuses: FlashSaleShareStatusType[] = [
    FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_SHARE_STATUS.STATUSES.FAILED,
    FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED,
    FLASH_SALE_SHARE_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesShareStatusCanTransitionTo(
  currentStatus: FlashSaleShareStatusType,
  targetStatus: FlashSaleShareStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_SHARE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesShareStatusGetAvailableTransitions(
  currentStatus: FlashSaleShareStatusType
): FlashSaleShareStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_SHARE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleShareStatusType[];
}

export function flashsalesShareStatusCanProcess(status: FlashSaleShareStatusType): boolean {
  const canProcessStatuses: FlashSaleShareStatusType[] = [FLASH_SALE_SHARE_STATUS.STATUSES.PENDING];
  return canProcessStatuses.includes(status);
}

export function flashsalesShareStatusCanComplete(status: FlashSaleShareStatusType): boolean {
  const canCompleteStatuses: FlashSaleShareStatusType[] = [
    FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING,
  ];
  return canCompleteStatuses.includes(status);
}

export function flashsalesShareStatusCanRetry(status: FlashSaleShareStatusType): boolean {
  const canRetryStatuses: FlashSaleShareStatusType[] = [FLASH_SALE_SHARE_STATUS.STATUSES.FAILED];
  return canRetryStatuses.includes(status);
}

export function flashsalesShareStatusCanCancel(status: FlashSaleShareStatusType): boolean {
  const canCancelStatuses: FlashSaleShareStatusType[] = [
    FLASH_SALE_SHARE_STATUS.STATUSES.DRAFT,
    FLASH_SALE_SHARE_STATUS.STATUSES.PENDING,
    FLASH_SALE_SHARE_STATUS.STATUSES.PROCESSING,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesShareStatusCanArchive(status: FlashSaleShareStatusType): boolean {
  const canArchiveStatuses: FlashSaleShareStatusType[] = [
    FLASH_SALE_SHARE_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_SHARE_STATUS.STATUSES.FAILED,
    FLASH_SALE_SHARE_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_SHARE_STATUS.STATUSES.EXPIRED,
  ];
  return canArchiveStatuses.includes(status);
}

export function flashsalesShareStatusGetDeliveryStatusLabel(
  status: FlashSaleShareDeliveryStatus
): string {
  const labels: Record<FlashSaleShareDeliveryStatus, string> = {
    [FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS.PENDING]: 'Pending',
    [FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS.SENDING]: 'Sending',
    [FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS.DELIVERED]: 'Delivered',
    [FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS.FAILED]: 'Failed',
    [FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS.RETRYING]: 'Retrying',
  };
  return labels[status] || 'Unknown Delivery Status';
}

export function flashsalesShareStatusGetEngagementStatusLabel(
  status: FlashSaleShareEngagementStatus
): string {
  const labels: Record<FlashSaleShareEngagementStatus, string> = {
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.VIEWED]: 'Viewed',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.CLICKED]: 'Clicked',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.SHARED]: 'Shared',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.REPOSTED]: 'Reposted',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.LIKED]: 'Liked',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.COMMENTED]: 'Commented',
    [FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS.CONVERTED]: 'Converted',
  };
  return labels[status] || 'Unknown Engagement Status';
}

export function flashsalesShareStatusIsValid(status: string): status is FlashSaleShareStatusType {
  return Object.values(FLASH_SALE_SHARE_STATUS.STATUSES).includes(
    status as FlashSaleShareStatusType
  );
}

export function flashsalesShareStatusIsValidDeliveryStatus(
  status: string
): status is FlashSaleShareDeliveryStatus {
  return Object.values(FLASH_SALE_SHARE_STATUS.DELIVERY_STATUS).includes(
    status as FlashSaleShareDeliveryStatus
  );
}

export function flashsalesShareStatusIsValidEngagementStatus(
  status: string
): status is FlashSaleShareEngagementStatus {
  return Object.values(FLASH_SALE_SHARE_STATUS.ENGAGEMENT_STATUS).includes(
    status as FlashSaleShareEngagementStatus
  );
}
