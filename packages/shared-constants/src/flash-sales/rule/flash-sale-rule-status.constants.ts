/**
 * Flash Sale Rule Status Constants
 * Status definitions for flash sale rule lifecycle
 */

export const FLASH_SALE_RULE_STATUS = {
  // Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    TESTING: 'testing',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  },

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    APPROVAL: 'approval',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
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
    TESTING: '#3B82F6',
    DEPRECATED: '#6B7280',
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
    TESTING: 7,
    DEPRECATED: 8,
    ARCHIVED: 9,
    DELETED: 10,
  },

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['active', 'testing', 'inactive', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    ACTIVE: ['inactive', 'paused', 'deprecated', 'deleted'],
    INACTIVE: ['active', 'deleted'],
    PAUSED: ['active', 'deleted'],
    TESTING: ['active', 'inactive', 'deleted'],
    DEPRECATED: ['archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_APPROVE: ['pending_approval'],
    CAN_REJECT: ['pending_approval'],
    CAN_ACTIVATE: ['approved', 'testing'],
    CAN_PAUSE: ['active'],
    CAN_RESUME: ['paused', 'inactive'],
    CAN_DEPRECATE: ['active', 'inactive'],
    CAN_DELETE: [
      'draft',
      'pending_approval',
      'rejected',
      'inactive',
      'paused',
      'deprecated',
      'archived',
    ],
  },
} as const;

// Flash Sale Rule Statuses
export type FlashSaleRuleStatusType =
  (typeof FLASH_SALE_RULE_STATUS.STATUSES)[keyof typeof FLASH_SALE_RULE_STATUS.STATUSES];

// Status Categories
export type FlashSaleRuleStatusCategory =
  (typeof FLASH_SALE_RULE_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_RULE_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleRuleStatusColor =
  (typeof FLASH_SALE_RULE_STATUS.COLORS)[keyof typeof FLASH_SALE_RULE_STATUS.COLORS];

// Status Priority
export type FlashSaleRuleStatusPriority =
  (typeof FLASH_SALE_RULE_STATUS.PRIORITY)[keyof typeof FLASH_SALE_RULE_STATUS.PRIORITY];

// Utility Functions
export function flashsalesRuleStatusGetLabel(status: FlashSaleRuleStatusType): string {
  const labels: Record<FlashSaleRuleStatusType, string> = {
    [FLASH_SALE_RULE_STATUS.STATUSES.DRAFT]: 'Draft',
    [FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [FLASH_SALE_RULE_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_RULE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [FLASH_SALE_RULE_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_RULE_STATUS.STATUSES.TESTING]: 'Testing',
    [FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED]: 'Deprecated',
    [FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [FLASH_SALE_RULE_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesRuleStatusGetCategory(
  status: FlashSaleRuleStatusType
): FlashSaleRuleStatusCategory {
  const categories: Record<FlashSaleRuleStatusType, FlashSaleRuleStatusCategory> = {
    [FLASH_SALE_RULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_RULE_STATUS.CATEGORIES.CREATION,
    [FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL]: FLASH_SALE_RULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_RULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_RULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_RULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_RULE_STATUS.CATEGORIES.APPROVAL,
    [FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_RULE_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE]: FLASH_SALE_RULE_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_RULE_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.TESTING]: FLASH_SALE_RULE_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED]: FLASH_SALE_RULE_STATUS.CATEGORIES.MAINTENANCE,
    [FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_RULE_STATUS.CATEGORIES.TERMINATED,
    [FLASH_SALE_RULE_STATUS.STATUSES.DELETED]: FLASH_SALE_RULE_STATUS.CATEGORIES.TERMINATED,
  };
  return categories[status] || FLASH_SALE_RULE_STATUS.CATEGORIES.CREATION;
}

export function flashsalesRuleStatusGetColor(
  status: FlashSaleRuleStatusType
): FlashSaleRuleStatusColor {
  const colorMap: Record<FlashSaleRuleStatusType, FlashSaleRuleStatusColor> = {
    [FLASH_SALE_RULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_RULE_STATUS.COLORS.DRAFT,
    [FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_RULE_STATUS.COLORS.PENDING_APPROVAL,
    [FLASH_SALE_RULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_RULE_STATUS.COLORS.APPROVED,
    [FLASH_SALE_RULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_RULE_STATUS.COLORS.REJECTED,
    [FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_RULE_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE]: FLASH_SALE_RULE_STATUS.COLORS.INACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_RULE_STATUS.COLORS.PAUSED,
    [FLASH_SALE_RULE_STATUS.STATUSES.TESTING]: FLASH_SALE_RULE_STATUS.COLORS.TESTING,
    [FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED]: FLASH_SALE_RULE_STATUS.COLORS.DEPRECATED,
    [FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_RULE_STATUS.COLORS.ARCHIVED,
    [FLASH_SALE_RULE_STATUS.STATUSES.DELETED]: FLASH_SALE_RULE_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesRuleStatusGetPriority(
  status: FlashSaleRuleStatusType
): FlashSaleRuleStatusPriority {
  const priorityMap: Record<FlashSaleRuleStatusType, FlashSaleRuleStatusPriority> = {
    [FLASH_SALE_RULE_STATUS.STATUSES.DRAFT]: FLASH_SALE_RULE_STATUS.PRIORITY.DRAFT,
    [FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL]:
      FLASH_SALE_RULE_STATUS.PRIORITY.PENDING_APPROVAL,
    [FLASH_SALE_RULE_STATUS.STATUSES.APPROVED]: FLASH_SALE_RULE_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_RULE_STATUS.STATUSES.REJECTED]: FLASH_SALE_RULE_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE]: FLASH_SALE_RULE_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE]: FLASH_SALE_RULE_STATUS.PRIORITY.INACTIVE,
    [FLASH_SALE_RULE_STATUS.STATUSES.PAUSED]: FLASH_SALE_RULE_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_RULE_STATUS.STATUSES.TESTING]: FLASH_SALE_RULE_STATUS.PRIORITY.TESTING,
    [FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED]: FLASH_SALE_RULE_STATUS.PRIORITY.DEPRECATED,
    [FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED]: FLASH_SALE_RULE_STATUS.PRIORITY.ARCHIVED,
    [FLASH_SALE_RULE_STATUS.STATUSES.DELETED]: FLASH_SALE_RULE_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesRuleStatusIsActive(status: FlashSaleRuleStatusType): boolean {
  const activeStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_RULE_STATUS.STATUSES.TESTING,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesRuleStatusIsApproved(status: FlashSaleRuleStatusType): boolean {
  const approvedStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_RULE_STATUS.STATUSES.TESTING,
  ];
  return approvedStatuses.includes(status);
}

export function flashsalesRuleStatusIsArchived(status: FlashSaleRuleStatusType): boolean {
  const archivedStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED,
    FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED,
    FLASH_SALE_RULE_STATUS.STATUSES.DELETED,
  ];
  return archivedStatuses.includes(status);
}

export function flashsalesRuleStatusCanTransitionTo(
  currentStatus: FlashSaleRuleStatusType,
  targetStatus: FlashSaleRuleStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_RULE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesRuleStatusGetAvailableTransitions(
  currentStatus: FlashSaleRuleStatusType
): FlashSaleRuleStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_RULE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleRuleStatusType[];
}

export function flashsalesRuleStatusCanApprove(status: FlashSaleRuleStatusType): boolean {
  const canApproveStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesRuleStatusCanReject(status: FlashSaleRuleStatusType): boolean {
  const canRejectStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL,
  ];
  return canRejectStatuses.includes(status);
}

export function flashsalesRuleStatusCanActivate(status: FlashSaleRuleStatusType): boolean {
  const canActivateStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.APPROVED,
    FLASH_SALE_RULE_STATUS.STATUSES.TESTING,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesRuleStatusCanPause(status: FlashSaleRuleStatusType): boolean {
  const canPauseStatuses: FlashSaleRuleStatusType[] = [FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE];
  return canPauseStatuses.includes(status);
}

export function flashsalesRuleStatusCanResume(status: FlashSaleRuleStatusType): boolean {
  const canResumeStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.PAUSED,
    FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesRuleStatusCanDeprecate(status: FlashSaleRuleStatusType): boolean {
  const canDeprecateStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE,
  ];
  return canDeprecateStatuses.includes(status);
}

export function flashsalesRuleStatusCanDelete(status: FlashSaleRuleStatusType): boolean {
  const canDeleteStatuses: FlashSaleRuleStatusType[] = [
    FLASH_SALE_RULE_STATUS.STATUSES.DRAFT,
    FLASH_SALE_RULE_STATUS.STATUSES.PENDING_APPROVAL,
    FLASH_SALE_RULE_STATUS.STATUSES.REJECTED,
    FLASH_SALE_RULE_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_RULE_STATUS.STATUSES.PAUSED,
    FLASH_SALE_RULE_STATUS.STATUSES.DEPRECATED,
    FLASH_SALE_RULE_STATUS.STATUSES.ARCHIVED,
  ];
  return canDeleteStatuses.includes(status);
}

export function flashsalesRuleStatusIsValid(status: string): status is FlashSaleRuleStatusType {
  return Object.values(FLASH_SALE_RULE_STATUS.STATUSES).includes(status as FlashSaleRuleStatusType);
}
