/**
 * Flash Sale Notification Status Constants
 * Status definitions for flash sale notification lifecycle
 */

export const FLASH_SALE_NOTIFICATION_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    QUEUED: 'queued',
    PROCESSING: 'processing',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
  },

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    APPROVAL: 'approval',
    QUEUED: 'queued',
    SENDING: 'sending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    COMPLETED: 'completed',
  },

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    SCHEDULED: '#3B82F6',
    QUEUED: '#8B5CF6',
    PROCESSING: '#06B6D4',
    SENT: '#10B981',
    DELIVERED: '#10B981',
    READ: '#10B981',
    FAILED: '#EF4444',
    CANCELLED: '#EF4444',
    EXPIRED: '#6B7280',
    ARCHIVED: '#6B7280',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_APPROVAL: 1,
    APPROVED: 2,
    REJECTED: 3,
    SCHEDULED: 4,
    QUEUED: 5,
    PROCESSING: 6,
    SENT: 7,
    DELIVERED: 8,
    READ: 9,
    FAILED: 10,
    CANCELLED: 11,
    EXPIRED: 12,
    ARCHIVED: 13,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'cancelled', 'archived'],
    PENDING_APPROVAL: ['approved', 'rejected', 'cancelled'],
    APPROVED: ['scheduled', 'queued', 'cancelled'],
    REJECTED: ['draft', 'archived'],
    SCHEDULED: ['queued', 'cancelled'],
    QUEUED: ['processing', 'cancelled'],
    PROCESSING: ['sent', 'failed', 'cancelled'],
    SENT: ['delivered', 'failed'],
    DELIVERED: ['read', 'archived'],
    READ: ['archived'],
    FAILED: ['queued', 'archived'],
    CANCELLED: ['archived'],
    EXPIRED: ['archived'],
    ARCHIVED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_APPROVE: ['pending_approval'],
    CAN_REJECT: ['pending_approval'],
    CAN_SCHEDULE: ['approved'],
    CAN_QUEUE: ['approved', 'scheduled'],
    CAN_PROCESS: ['queued'],
    CAN_SEND: ['processing'],
    CAN_RETRY: ['failed'],
    CAN_CANCEL: ['draft', 'pending_approval', 'approved', 'scheduled', 'queued', 'processing'],
    CAN_ARCHIVE: ['sent', 'delivered', 'read', 'failed', 'cancelled', 'expired'],
  },

  // Notification Delivery Status
  DELIVERY_STATUS: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    PARTIAL: 'partial',
    FAILED: 'failed',
    RETRYING: 'retrying',
  },
} as const;

// Flash Sale Notification Statuses
export type FlashSaleNotificationStatusType =
  (typeof FLASH_SALE_NOTIFICATION_STATUS.STATUSES)[keyof typeof FLASH_SALE_NOTIFICATION_STATUS.STATUSES];

// Status Categories
export type FlashSaleNotificationStatusCategory =
  (typeof FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleNotificationStatusColor =
  (typeof FLASH_SALE_NOTIFICATION_STATUS.COLORS)[keyof typeof FLASH_SALE_NOTIFICATION_STATUS.COLORS];

// Status Priority
export type FlashSaleNotificationStatusPriority =
  (typeof FLASH_SALE_NOTIFICATION_STATUS.PRIORITY)[keyof typeof FLASH_SALE_NOTIFICATION_STATUS.PRIORITY];

// Delivery Status
export type FlashSaleNotificationDeliveryStatus =
  (typeof FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS)[keyof typeof FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS];

// Utility Functions
export function flashsalesNotificationStatusGetLabel(
  status: FlashSaleNotificationStatusType
): string {
  const labels: Record<FlashSaleNotificationStatusType, string> = {
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED]: 'Queued',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING]: 'Processing',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT]: 'Sent',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED]: 'Delivered',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ]: 'Read',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED]: 'Failed',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.EXPIRED]: 'Expired',
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesNotificationStatusGetCategory(
  status: FlashSaleNotificationStatusType
): FlashSaleNotificationStatusCategory {
  const categories: Record<FlashSaleNotificationStatusType, FlashSaleNotificationStatusCategory> = {
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DRAFT]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.QUEUED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.QUEUED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.SENDING,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.SENDING,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.DELIVERED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.DELIVERED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.FAILED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.EXPIRED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.COMPLETED,
  };
  return categories[status] || FLASH_SALE_NOTIFICATION_STATUS.CATEGORIES.CREATION;
}

export function flashsalesNotificationStatusGetColor(
  status: FlashSaleNotificationStatusType
): FlashSaleNotificationStatusColor {
  const colorMap: Record<FlashSaleNotificationStatusType, FlashSaleNotificationStatusColor> = {
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DRAFT]: FLASH_SALE_NOTIFICATION_STATUS.COLORS.DRAFT,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.APPROVED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.REJECTED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.SCHEDULED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED]: FLASH_SALE_NOTIFICATION_STATUS.COLORS.QUEUED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.PROCESSING,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT]: FLASH_SALE_NOTIFICATION_STATUS.COLORS.SENT,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.DELIVERED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ]: FLASH_SALE_NOTIFICATION_STATUS.COLORS.READ,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED]: FLASH_SALE_NOTIFICATION_STATUS.COLORS.FAILED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.EXPIRED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.EXPIRED,
    [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_NOTIFICATION_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesNotificationStatusGetPriority(
  status: FlashSaleNotificationStatusType
): FlashSaleNotificationStatusPriority {
  const priorityMap: Record<FlashSaleNotificationStatusType, FlashSaleNotificationStatusPriority> =
    {
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DRAFT]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.DRAFT,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.PENDING_APPROVAL,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.APPROVED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.REJECTED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.REJECTED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.SCHEDULED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.QUEUED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.PROCESSING,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT]: FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.SENT,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.DELIVERED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ]: FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.READ,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.FAILED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.CANCELLED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.EXPIRED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.EXPIRED,
      [FLASH_SALE_NOTIFICATION_STATUS.STATUSES.ARCHIVED]:
        FLASH_SALE_NOTIFICATION_STATUS.PRIORITY.ARCHIVED,
    };
  return priorityMap[status] || 0;
}

export function flashsalesNotificationStatusIsActive(
  status: FlashSaleNotificationStatusType
): boolean {
  const activeStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesNotificationStatusIsDelivered(
  status: FlashSaleNotificationStatusType
): boolean {
  const deliveredStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ,
  ];
  return deliveredStatuses.includes(status);
}

export function flashsalesNotificationStatusIsFailed(
  status: FlashSaleNotificationStatusType
): boolean {
  const failedStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED,
  ];
  return failedStatuses.includes(status);
}

export function flashsalesNotificationStatusCanTransitionTo(
  currentStatus: FlashSaleNotificationStatusType,
  targetStatus: FlashSaleNotificationStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_NOTIFICATION_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesNotificationStatusGetAvailableTransitions(
  currentStatus: FlashSaleNotificationStatusType
): FlashSaleNotificationStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_NOTIFICATION_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleNotificationStatusType[];
}

export function flashsalesNotificationStatusCanApprove(
  status: FlashSaleNotificationStatusType
): boolean {
  const canApproveStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesNotificationStatusCanReject(
  status: FlashSaleNotificationStatusType
): boolean {
  const canRejectStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesNotificationStatusCanSchedule(
  status: FlashSaleNotificationStatusType
): boolean {
  const canScheduleStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED,
  ];
  return canScheduleStatuses.includes(status);
}

export function flashsalesNotificationStatusCanQueue(
  status: FlashSaleNotificationStatusType
): boolean {
  const canQueueStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED,
  ];
  return canQueueStatuses.includes(status);
}

export function flashsalesNotificationStatusCanProcess(
  status: FlashSaleNotificationStatusType
): boolean {
  const canProcessStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED,
  ];
  return canProcessStatuses.includes(status);
}

export function flashsalesNotificationStatusCanSend(
  status: FlashSaleNotificationStatusType
): boolean {
  const canSendStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING,
  ];
  return canSendStatuses.includes(status);
}

export function flashsalesNotificationStatusCanRetry(
  status: FlashSaleNotificationStatusType
): boolean {
  const canRetryStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED,
  ];
  return canRetryStatuses.includes(status);
}

export function flashsalesNotificationStatusCanCancel(
  status: FlashSaleNotificationStatusType
): boolean {
  const canCancelStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DRAFT,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.APPROVED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.QUEUED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.PROCESSING,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesNotificationStatusCanArchive(
  status: FlashSaleNotificationStatusType
): boolean {
  const canArchiveStatuses: FlashSaleNotificationStatusType[] = [
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.SENT,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.DELIVERED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.READ,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.FAILED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_NOTIFICATION_STATUS.STATUSES.EXPIRED,
  ];
  return canArchiveStatuses.includes(status);
}

export function flashsalesNotificationStatusGetDeliveryStatusLabel(
  status: FlashSaleNotificationDeliveryStatus
): string {
  const labels: Record<FlashSaleNotificationDeliveryStatus, string> = {
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.PENDING]: 'Pending',
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.IN_PROGRESS]: 'In Progress',
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.COMPLETED]: 'Completed',
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.PARTIAL]: 'Partial',
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.FAILED]: 'Failed',
    [FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS.RETRYING]: 'Retrying',
  };
  return labels[status] || 'Unknown Delivery Status';
}

export function flashsalesNotificationStatusIsValid(
  status: string
): status is FlashSaleNotificationStatusType {
  return Object.values(FLASH_SALE_NOTIFICATION_STATUS.STATUSES).includes(
    status as FlashSaleNotificationStatusType
  );
}

export function flashsalesNotificationStatusIsValidDeliveryStatus(
  status: string
): status is FlashSaleNotificationDeliveryStatus {
  return Object.values(FLASH_SALE_NOTIFICATION_STATUS.DELIVERY_STATUS).includes(
    status as FlashSaleNotificationDeliveryStatus
  );
}
