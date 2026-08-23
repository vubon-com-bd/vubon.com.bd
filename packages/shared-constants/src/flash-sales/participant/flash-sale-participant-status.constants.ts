/**
 * Flash Sale Participant Status Constants
 * Status definitions for flash sale participant lifecycle
 */

export const FLASH_SALE_PARTICIPANT_STATUS = {
  // Statuses
  STATUSES: {
    REGISTERED: 'registered',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PENDING_VERIFICATION: 'pending_verification',
    VERIFIED: 'verified',
    ACTIVE: 'active',
    ENGAGED: 'engaged',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    BLOCKED: 'blocked',
    SUSPENDED: 'suspended',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },

  // Status Categories
  CATEGORIES: {
    REGISTRATION: 'registration',
    VERIFICATION: 'verification',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    RESTRICTED: 'restricted',
    COMPLETED: 'completed',
  },

  // Status Colors (for UI)
  COLORS: {
    REGISTERED: '#6B7280',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    PENDING_VERIFICATION: '#F59E0B',
    VERIFIED: '#10B981',
    ACTIVE: '#10B981',
    ENGAGED: '#3B82F6',
    INACTIVE: '#6B7280',
    PAUSED: '#F59E0B',
    BLOCKED: '#EF4444',
    SUSPENDED: '#EF4444',
    COMPLETED: '#10B981',
    CANCELLED: '#EF4444',
    ARCHIVED: '#6B7280',
  },

  // Status Priority (for sorting)
  PRIORITY: {
    REGISTERED: 0,
    APPROVED: 1,
    REJECTED: 2,
    PENDING_VERIFICATION: 3,
    VERIFIED: 4,
    ACTIVE: 5,
    ENGAGED: 6,
    INACTIVE: 7,
    PAUSED: 8,
    BLOCKED: 9,
    SUSPENDED: 10,
    COMPLETED: 11,
    CANCELLED: 12,
    ARCHIVED: 13,
  },

  // Status Transitions
  TRANSITIONS: {
    REGISTERED: ['pending_verification', 'cancelled', 'archived'],
    PENDING_VERIFICATION: ['verified', 'rejected', 'cancelled'],
    VERIFIED: ['approved', 'cancelled'],
    APPROVED: ['active', 'cancelled'],
    REJECTED: ['registered', 'archived'],
    ACTIVE: ['engaged', 'inactive', 'paused', 'completed', 'cancelled'],
    ENGAGED: ['active', 'inactive', 'paused', 'completed', 'cancelled'],
    INACTIVE: ['active', 'paused', 'completed', 'archived'],
    PAUSED: ['active', 'completed', 'cancelled'],
    BLOCKED: ['suspended', 'archived'],
    SUSPENDED: ['active', 'archived'],
    COMPLETED: ['archived'],
    CANCELLED: ['archived'],
    ARCHIVED: [],
  },

  // Status Validation
  VALIDATION: {
    CAN_VERIFY: ['pending_verification'],
    CAN_APPROVE: ['verified', 'registered'],
    CAN_REJECT: ['pending_verification'],
    CAN_ACTIVATE: ['approved', 'verified'],
    CAN_ENGAGE: ['active'],
    CAN_PAUSE: ['active', 'engaged'],
    CAN_RESUME: ['paused', 'inactive'],
    CAN_BLOCK: ['active', 'engaged', 'inactive', 'paused'],
    CAN_SUSPEND: ['active', 'engaged', 'inactive'],
    CAN_COMPLETE: ['active', 'engaged', 'inactive', 'paused'],
    CAN_CANCEL: [
      'registered',
      'pending_verification',
      'verified',
      'approved',
      'active',
      'engaged',
      'inactive',
      'paused',
    ],
  },

  // Participant Access Levels
  ACCESS_LEVELS: {
    FULL: 'full',
    LIMITED: 'limited',
    RESTRICTED: 'restricted',
    READ_ONLY: 'read_only',
    NO_ACCESS: 'no_access',
  },
} as const;

// Flash Sale Participant Statuses
export type FlashSaleParticipantStatusType =
  (typeof FLASH_SALE_PARTICIPANT_STATUS.STATUSES)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS.STATUSES];

// Status Categories
export type FlashSaleParticipantStatusCategory =
  (typeof FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES];

// Status Colors
export type FlashSaleParticipantStatusColor =
  (typeof FLASH_SALE_PARTICIPANT_STATUS.COLORS)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS.COLORS];

// Status Priority
export type FlashSaleParticipantStatusPriority =
  (typeof FLASH_SALE_PARTICIPANT_STATUS.PRIORITY)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS.PRIORITY];

// Access Levels
export type FlashSaleParticipantAccessLevel =
  (typeof FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS)[keyof typeof FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS];

// Utility Functions
export function flashsalesParticipantStatusGetLabel(
  status: FlashSaleParticipantStatusType
): string {
  const labels: Record<FlashSaleParticipantStatusType, string> = {
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED]: 'Registered',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED]: 'Approved',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED]: 'Rejected',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION]: 'Pending Verification',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED]: 'Verified',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE]: 'Active',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED]: 'Engaged',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED]: 'Paused',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED]: 'Blocked',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED]: 'Suspended',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED]: 'Completed',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED]: 'Cancelled',
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesParticipantStatusGetCategory(
  status: FlashSaleParticipantStatusType
): FlashSaleParticipantStatusCategory {
  const categories: Record<FlashSaleParticipantStatusType, FlashSaleParticipantStatusCategory> = {
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.REGISTRATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.REGISTRATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.REGISTRATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.VERIFICATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.VERIFICATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.ACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.INACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.RESTRICTED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.RESTRICTED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.COMPLETED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.COMPLETED,
  };
  return categories[status] || FLASH_SALE_PARTICIPANT_STATUS.CATEGORIES.REGISTRATION;
}

export function flashsalesParticipantStatusGetColor(
  status: FlashSaleParticipantStatusType
): FlashSaleParticipantStatusColor {
  const colorMap: Record<FlashSaleParticipantStatusType, FlashSaleParticipantStatusColor> = {
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.REGISTERED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.APPROVED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.REJECTED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.PENDING_VERIFICATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.VERIFIED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE]: FLASH_SALE_PARTICIPANT_STATUS.COLORS.ACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED]: FLASH_SALE_PARTICIPANT_STATUS.COLORS.ENGAGED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.INACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED]: FLASH_SALE_PARTICIPANT_STATUS.COLORS.PAUSED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED]: FLASH_SALE_PARTICIPANT_STATUS.COLORS.BLOCKED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.SUSPENDED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.COMPLETED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.CANCELLED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_PARTICIPANT_STATUS.COLORS.ARCHIVED,
  };
  return colorMap[status] || '#6B7280';
}

export function flashsalesParticipantStatusGetPriority(
  status: FlashSaleParticipantStatusType
): FlashSaleParticipantStatusPriority {
  const priorityMap: Record<FlashSaleParticipantStatusType, FlashSaleParticipantStatusPriority> = {
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.REGISTERED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.APPROVED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.REJECTED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.PENDING_VERIFICATION,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.VERIFIED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE]: FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.ACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.ENGAGED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.INACTIVE,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED]: FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.PAUSED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.BLOCKED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.SUSPENDED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.COMPLETED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.CANCELLED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_PARTICIPANT_STATUS.PRIORITY.ARCHIVED,
  };
  return priorityMap[status] || 0;
}

export function flashsalesParticipantStatusIsActive(
  status: FlashSaleParticipantStatusType
): boolean {
  const activeStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
  ];
  return activeStatuses.includes(status);
}

export function flashsalesParticipantStatusIsVerified(
  status: FlashSaleParticipantStatusType
): boolean {
  const verifiedStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
  ];
  return verifiedStatuses.includes(status);
}

export function flashsalesParticipantStatusIsRestricted(
  status: FlashSaleParticipantStatusType
): boolean {
  const restrictedStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED,
  ];
  return restrictedStatuses.includes(status);
}

export function flashsalesParticipantStatusIsComplete(
  status: FlashSaleParticipantStatusType
): boolean {
  const completeStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function flashsalesParticipantStatusCanTransitionTo(
  currentStatus: FlashSaleParticipantStatusType,
  targetStatus: FlashSaleParticipantStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_PARTICIPANT_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function flashsalesParticipantStatusGetAvailableTransitions(
  currentStatus: FlashSaleParticipantStatusType
): FlashSaleParticipantStatusType[] {
  const transitions: Record<string, readonly string[]> = FLASH_SALE_PARTICIPANT_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as FlashSaleParticipantStatusType[];
}

export function flashsalesParticipantStatusCanVerify(
  status: FlashSaleParticipantStatusType
): boolean {
  const canVerifyStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION,
  ];
  return canVerifyStatuses.includes(status);
}

export function flashsalesParticipantStatusCanApprove(
  status: FlashSaleParticipantStatusType
): boolean {
  const canApproveStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED,
  ];
  return canApproveStatuses.includes(status);
}

export function flashsalesParticipantStatusCanActivate(
  status: FlashSaleParticipantStatusType
): boolean {
  const canActivateStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED,
  ];
  return canActivateStatuses.includes(status);
}

export function flashsalesParticipantStatusCanEngage(
  status: FlashSaleParticipantStatusType
): boolean {
  const canEngageStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
  ];
  return canEngageStatuses.includes(status);
}

export function flashsalesParticipantStatusCanPause(
  status: FlashSaleParticipantStatusType
): boolean {
  const canPauseStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
  ];
  return canPauseStatuses.includes(status);
}

export function flashsalesParticipantStatusCanResume(
  status: FlashSaleParticipantStatusType
): boolean {
  const canResumeStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE,
  ];
  return canResumeStatuses.includes(status);
}

export function flashsalesParticipantStatusCanBlock(
  status: FlashSaleParticipantStatusType
): boolean {
  const canBlockStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED,
  ];
  return canBlockStatuses.includes(status);
}

export function flashsalesParticipantStatusCanSuspend(
  status: FlashSaleParticipantStatusType
): boolean {
  const canSuspendStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE,
  ];
  return canSuspendStatuses.includes(status);
}

export function flashsalesParticipantStatusCanComplete(
  status: FlashSaleParticipantStatusType
): boolean {
  const canCompleteStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED,
  ];
  return canCompleteStatuses.includes(status);
}

export function flashsalesParticipantStatusCanCancel(
  status: FlashSaleParticipantStatusType
): boolean {
  const canCancelStatuses: FlashSaleParticipantStatusType[] = [
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE,
    FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED,
  ];
  return canCancelStatuses.includes(status);
}

export function flashsalesParticipantStatusGetAccessLevel(
  status: FlashSaleParticipantStatusType
): FlashSaleParticipantAccessLevel {
  const accessLevels: Record<FlashSaleParticipantStatusType, FlashSaleParticipantAccessLevel> = {
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REGISTERED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.LIMITED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.APPROVED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.FULL,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.REJECTED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.NO_ACCESS,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PENDING_VERIFICATION]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.LIMITED,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.VERIFIED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.FULL,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.FULL,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ENGAGED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.FULL,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.INACTIVE]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.READ_ONLY,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.PAUSED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.READ_ONLY,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.BLOCKED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.NO_ACCESS,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.SUSPENDED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.NO_ACCESS,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.COMPLETED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.READ_ONLY,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.CANCELLED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.NO_ACCESS,
    [FLASH_SALE_PARTICIPANT_STATUS.STATUSES.ARCHIVED]:
      FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.NO_ACCESS,
  };
  return accessLevels[status] || FLASH_SALE_PARTICIPANT_STATUS.ACCESS_LEVELS.LIMITED;
}

export function flashsalesParticipantStatusIsValid(
  status: string
): status is FlashSaleParticipantStatusType {
  return Object.values(FLASH_SALE_PARTICIPANT_STATUS.STATUSES).includes(
    status as FlashSaleParticipantStatusType
  );
}
