/**
 * Flash Sale Schedule Status Constants
 * Status definitions for flash sale schedule lifecycle
 */

export const FLASH_SALE_SCHEDULE_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    SCHEDULED: 'scheduled',
    PENDING_EXECUTION: 'pending_execution',
    EXECUTING: 'executing',
    EXECUTED: 'executed',
    PAUSED: 'paused',
    FAILED: 'failed',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },

  // Status Categories
  CATEGORIES: {
    PREPARATION: 'preparation',
    APPROVAL: 'approval',
    SCHEDULED: 'scheduled',
    EXECUTION: 'execution',
    COMPLETED: 'completed',
    TERMINATED: 'terminated',
  },

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    SCHEDULED: '#3B82F6',
    PENDING_EXECUTION: '#8B5CF6',
    EXECUTING: '#06B6D4',
    EXECUTED: '#10B981',
    PAUSED: '#F59E0B',
    FAILED: '#EF4444',
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
    PENDING_EXECUTION: 5,
    EXECUTING: 6,
    EXECUTED: 7,
    PAUSED: 8,
    FAILED: 9,
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
    SCHEDULED: ['pending_execution', 'cancelled'],
    PENDING_EXECUTION: ['executing', 'cancelled'],
    EXECUTING: ['executed', 'failed', 'paused', 'cancelled'],
    PAUSED: ['executing', 'cancelled'],
    EXECUTED: ['completed', 'archived'],
    FAILED: ['draft', 'archived'],
    COMPLETED: ['archived'],
    CANCELLED: ['archived'],
    ARCHIVED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_APPROVE: ['pending_approval'],
    CAN_REJECT: ['pending_approval'],
    CAN_SCHEDULE: ['approved'],
    CAN_EXECUTE: ['scheduled', 'pending_execution'],
    CAN_PAUSE: ['executing'],
    CAN_RESUME: ['paused'],
    CAN_CANCEL: [
      'draft',
      'pending_approval',
      'approved',
      'scheduled',
      'pending_execution',
      'executing',
      'paused',
    ],
  },
} as const;

// Flash Sale Schedule Statuses
export type FlashSaleScheduleStatusType =
  (typeof FLASH_SALE_SCHEDULE_STATUS.STATUSES)[keyof typeof FLASH_SALE_SCHEDULE_STATUS.STATUSES];

// Status Categories
export type FlashSaleScheduleStatusCategory =
  (typeof FLASH_SALE_SCHEDULE_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_SCHEDULE_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleScheduleStatusColor =
  (typeof FLASH_SALE_SCHEDULE_STATUS.COLORS)[keyof typeof FLASH_SALE_SCHEDULE_STATUS.COLORS];

// Status Priority
export type FlashSaleScheduleStatusPriority =
  (typeof FLASH_SALE_SCHEDULE_STATUS.PRIORITY)[keyof typeof FLASH_SALE_SCHEDULE_STATUS.PRIORITY];

// Utility Functions
export function flashsalesScheduleStatusGetLabel(status: FlashSaleScheduleStatusType): string {
  const labels: Record<FlashSaleScheduleStatusType, string> = {
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED]: 'Scheduled',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION]: 'Pending Execution',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING]: 'Executing',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTED]: 'Executed',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.FAILED]: 'Failed',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesScheduleStatusGetCategory(
  status: FlashSaleScheduleStatusType
): FlashSaleScheduleStatusCategory {
  const categories: Record<FlashSaleScheduleStatusType, FlashSaleScheduleStatusCategory> = {
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.PREPARATION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.SCHEDULED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.SCHEDULED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.EXECUTION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTED]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.EXECUTION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.EXECUTION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.FAILED]: FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_SCHEDULE_STATUS.CATEGORIES.PREPARATION;
}

export function flashsalesScheduleStatusGetColor(
  status: FlashSaleScheduleStatusType
): FlashSaleScheduleStatusColor {
  const colorMap: Record<FlashSaleScheduleStatusType, FlashSaleScheduleStatusColor> = {
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SCHEDULE_STATUS.COLORS.DRAFT,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_SCHEDULE_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.APPROVED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.REJECTED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.SCHEDULED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION]:
      FLASH_SALE_SCHEDULE_STATUS.COLORS.PENDING_EXECUTION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING]: FLASH_SALE_SCHEDULE_STATUS.COLORS.EXECUTING,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.EXECUTED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.PAUSED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.FAILED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.FAILED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_SCHEDULE_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesScheduleStatusGetPriority(
  status: FlashSaleScheduleStatusType
): FlashSaleScheduleStatusPriority {
  const priorityMap: Record<FlashSaleScheduleStatusType, FlashSaleScheduleStatusPriority> = {
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_SCHEDULE_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.SCHEDULED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION]:
      FLASH_SALE_SCHEDULE_STATUS.PRIORITY.PENDING_EXECUTION,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.EXECUTING,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.EXECUTED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.FAILED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.FAILED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.CANCELLED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_SCHEDULE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_SCHEDULE_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesScheduleStatusIsActive(status: FlashSaleScheduleStatusType): boolean {
  const activeStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesScheduleStatusIsApproved(status: FlashSaleScheduleStatusType): boolean {
  const approvedStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED,
  ];
  return approvedStatuses.includes(status);
}

export function flashsalesScheduleStatusIsComplete(status: FlashSaleScheduleStatusType): boolean {
  const completeStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.FAILED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesScheduleStatusCanTransitionTo(
  currentStatus: FlashSaleScheduleStatusType,
  targetStatus: FlashSaleScheduleStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_SCHEDULE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesScheduleStatusGetAvailableTransitions(
  currentStatus: FlashSaleScheduleStatusType
): FlashSaleScheduleStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_SCHEDULE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleScheduleStatusType[];
}

export function flashsalesScheduleStatusCanApprove(status: FlashSaleScheduleStatusType): boolean {
  const canApproveStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesScheduleStatusCanReject(status: FlashSaleScheduleStatusType): boolean {
  const canRejectStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesScheduleStatusCanSchedule(status: FlashSaleScheduleStatusType): boolean {
  const canScheduleStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED,
  ];
  return canScheduleStatuses.includes(status);
}

export function flashsalesScheduleStatusCanExecute(status: FlashSaleScheduleStatusType): boolean {
  const canExecuteStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION,
  ];
  return canExecuteStatuses.includes(status);
}

export function flashsalesScheduleStatusCanPause(status: FlashSaleScheduleStatusType): boolean {
  const canPauseStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesScheduleStatusCanResume(status: FlashSaleScheduleStatusType): boolean {
  const canResumeStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesScheduleStatusCanCancel(status: FlashSaleScheduleStatusType): boolean {
  const canCancelStatuses: FlashSaleScheduleStatusType[] = [
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.DRAFT,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.SCHEDULED,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PENDING_EXECUTION,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.EXECUTING,
    FLASH_SALE_SCHEDULE_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesScheduleStatusIsValid(
  status: string
): status is FlashSaleScheduleStatusType {
  return Object.values(FLASH_SALE_SCHEDULE_STATUS.STATUSES).includes(
    status as FlashSaleScheduleStatusType
  );
}
