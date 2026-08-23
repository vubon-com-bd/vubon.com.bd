/**
 * Report Schedule Status Constants
 * Status definitions for report schedule lifecycle
 */

export const REPORT_SCHEDULE_STATUS = {
  // Schedule Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    CREATION: 'creation',
    APPROVAL: 'approval',
    EXECUTION: 'execution',
    MAINTENANCE: 'maintenance',
    TERMINATION: 'termination',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#6B7280',
    PENDING_APPROVAL: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    ACTIVE: '#10B981',
    INACTIVE: '#6B7280',
    PAUSED: '#F59E0B',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    EXPIRED: '#6B7280',
    ARCHIVED: '#6B7280',
    DELETED: '#EF4444',
  } as const,

  // Status Priority (for sorting)
  PRIORITY: {
    DRAFT: 0,
    PENDING_APPROVAL: 1,
    APPROVED: 2,
    REJECTED: 3,
    ACTIVE: 4,
    INACTIVE: 5,
    PAUSED: 6,
    COMPLETED: 7,
    FAILED: 8,
    EXPIRED: 9,
    ARCHIVED: 10,
    DELETED: 11,
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT: ['pending_approval', 'deleted'],
    PENDING_APPROVAL: ['approved', 'rejected', 'deleted'],
    APPROVED: ['active', 'inactive', 'deleted'],
    REJECTED: ['draft', 'deleted'],
    ACTIVE: ['paused', 'completed', 'failed', 'inactive', 'deleted'],
    INACTIVE: ['active', 'deleted'],
    PAUSED: ['active', 'completed', 'failed', 'deleted'],
    COMPLETED: ['archived', 'deleted'],
    FAILED: ['draft', 'deleted'],
    EXPIRED: ['archived', 'deleted'],
    ARCHIVED: ['deleted'],
    DELETED: [],
  } as const,
} as const;

export type ReportScheduleStatusType =
  (typeof REPORT_SCHEDULE_STATUS.STATUSES)[keyof typeof REPORT_SCHEDULE_STATUS.STATUSES];
export type ReportScheduleStatusCategory =
  (typeof REPORT_SCHEDULE_STATUS.CATEGORIES)[keyof typeof REPORT_SCHEDULE_STATUS.CATEGORIES];
export type ReportScheduleStatusColor =
  (typeof REPORT_SCHEDULE_STATUS.COLORS)[keyof typeof REPORT_SCHEDULE_STATUS.COLORS];
export type ReportScheduleStatusPriority =
  (typeof REPORT_SCHEDULE_STATUS.PRIORITY)[keyof typeof REPORT_SCHEDULE_STATUS.PRIORITY];
export type ReportScheduleStatusTransition = keyof typeof REPORT_SCHEDULE_STATUS.TRANSITIONS;

export function reportScheduleStatusGetLabel(status: ReportScheduleStatusType): string {
  const labels: Record<ReportScheduleStatusType, string> = {
    [REPORT_SCHEDULE_STATUS.STATUSES.DRAFT]: 'Draft',
    [REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [REPORT_SCHEDULE_STATUS.STATUSES.APPROVED]: 'Approved',
    [REPORT_SCHEDULE_STATUS.STATUSES.REJECTED]: 'Rejected',
    [REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE]: 'Active',
    [REPORT_SCHEDULE_STATUS.STATUSES.INACTIVE]: 'Inactive',
    [REPORT_SCHEDULE_STATUS.STATUSES.PAUSED]: 'Paused',
    [REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED]: 'Completed',
    [REPORT_SCHEDULE_STATUS.STATUSES.FAILED]: 'Failed',
    [REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED]: 'Expired',
    [REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED]: 'Archived',
    [REPORT_SCHEDULE_STATUS.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function reportScheduleStatusGetCategory(
  status: ReportScheduleStatusType
): ReportScheduleStatusCategory {
  const categories: Record<ReportScheduleStatusType, ReportScheduleStatusCategory> = {
    [REPORT_SCHEDULE_STATUS.STATUSES.DRAFT]: REPORT_SCHEDULE_STATUS.CATEGORIES.CREATION,
    [REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]: REPORT_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_SCHEDULE_STATUS.STATUSES.APPROVED]: REPORT_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_SCHEDULE_STATUS.STATUSES.REJECTED]: REPORT_SCHEDULE_STATUS.CATEGORIES.APPROVAL,
    [REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE]: REPORT_SCHEDULE_STATUS.CATEGORIES.EXECUTION,
    [REPORT_SCHEDULE_STATUS.STATUSES.INACTIVE]: REPORT_SCHEDULE_STATUS.CATEGORIES.MAINTENANCE,
    [REPORT_SCHEDULE_STATUS.STATUSES.PAUSED]: REPORT_SCHEDULE_STATUS.CATEGORIES.MAINTENANCE,
    [REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED]: REPORT_SCHEDULE_STATUS.CATEGORIES.TERMINATION,
    [REPORT_SCHEDULE_STATUS.STATUSES.FAILED]: REPORT_SCHEDULE_STATUS.CATEGORIES.TERMINATION,
    [REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED]: REPORT_SCHEDULE_STATUS.CATEGORIES.TERMINATION,
    [REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED]: REPORT_SCHEDULE_STATUS.CATEGORIES.TERMINATION,
    [REPORT_SCHEDULE_STATUS.STATUSES.DELETED]: REPORT_SCHEDULE_STATUS.CATEGORIES.TERMINATION,
  };
  return categories[status] || REPORT_SCHEDULE_STATUS.CATEGORIES.CREATION;
}

export function reportScheduleStatusGetColor(
  status: ReportScheduleStatusType
): ReportScheduleStatusColor {
  const colorMap: Record<ReportScheduleStatusType, ReportScheduleStatusColor> = {
    [REPORT_SCHEDULE_STATUS.STATUSES.DRAFT]: REPORT_SCHEDULE_STATUS.COLORS.DRAFT,
    [REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]:
      REPORT_SCHEDULE_STATUS.COLORS.PENDING_APPROVAL,
    [REPORT_SCHEDULE_STATUS.STATUSES.APPROVED]: REPORT_SCHEDULE_STATUS.COLORS.APPROVED,
    [REPORT_SCHEDULE_STATUS.STATUSES.REJECTED]: REPORT_SCHEDULE_STATUS.COLORS.REJECTED,
    [REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE]: REPORT_SCHEDULE_STATUS.COLORS.ACTIVE,
    [REPORT_SCHEDULE_STATUS.STATUSES.INACTIVE]: REPORT_SCHEDULE_STATUS.COLORS.INACTIVE,
    [REPORT_SCHEDULE_STATUS.STATUSES.PAUSED]: REPORT_SCHEDULE_STATUS.COLORS.PAUSED,
    [REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED]: REPORT_SCHEDULE_STATUS.COLORS.COMPLETED,
    [REPORT_SCHEDULE_STATUS.STATUSES.FAILED]: REPORT_SCHEDULE_STATUS.COLORS.FAILED,
    [REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED]: REPORT_SCHEDULE_STATUS.COLORS.EXPIRED,
    [REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED]: REPORT_SCHEDULE_STATUS.COLORS.ARCHIVED,
    [REPORT_SCHEDULE_STATUS.STATUSES.DELETED]: REPORT_SCHEDULE_STATUS.COLORS.DELETED,
  };
  return colorMap[status] || '#6B7280';
}

export function reportScheduleStatusGetPriority(
  status: ReportScheduleStatusType
): ReportScheduleStatusPriority {
  const priorityMap: Record<ReportScheduleStatusType, ReportScheduleStatusPriority> = {
    [REPORT_SCHEDULE_STATUS.STATUSES.DRAFT]: REPORT_SCHEDULE_STATUS.PRIORITY.DRAFT,
    [REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]:
      REPORT_SCHEDULE_STATUS.PRIORITY.PENDING_APPROVAL,
    [REPORT_SCHEDULE_STATUS.STATUSES.APPROVED]: REPORT_SCHEDULE_STATUS.PRIORITY.APPROVED,
    [REPORT_SCHEDULE_STATUS.STATUSES.REJECTED]: REPORT_SCHEDULE_STATUS.PRIORITY.REJECTED,
    [REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE]: REPORT_SCHEDULE_STATUS.PRIORITY.ACTIVE,
    [REPORT_SCHEDULE_STATUS.STATUSES.INACTIVE]: REPORT_SCHEDULE_STATUS.PRIORITY.INACTIVE,
    [REPORT_SCHEDULE_STATUS.STATUSES.PAUSED]: REPORT_SCHEDULE_STATUS.PRIORITY.PAUSED,
    [REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED]: REPORT_SCHEDULE_STATUS.PRIORITY.COMPLETED,
    [REPORT_SCHEDULE_STATUS.STATUSES.FAILED]: REPORT_SCHEDULE_STATUS.PRIORITY.FAILED,
    [REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED]: REPORT_SCHEDULE_STATUS.PRIORITY.EXPIRED,
    [REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED]: REPORT_SCHEDULE_STATUS.PRIORITY.ARCHIVED,
    [REPORT_SCHEDULE_STATUS.STATUSES.DELETED]: REPORT_SCHEDULE_STATUS.PRIORITY.DELETED,
  };
  return priorityMap[status] || 0;
}

export function reportScheduleStatusIsActive(status: ReportScheduleStatusType): boolean {
  const activeStatuses: ReportScheduleStatusType[] = [
    REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE,
    REPORT_SCHEDULE_STATUS.STATUSES.PAUSED,
  ];
  return activeStatuses.includes(status);
}

export function reportScheduleStatusIsApproved(status: ReportScheduleStatusType): boolean {
  const approvedStatuses: ReportScheduleStatusType[] = [
    REPORT_SCHEDULE_STATUS.STATUSES.APPROVED,
    REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE,
    REPORT_SCHEDULE_STATUS.STATUSES.PAUSED,
    REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED,
  ];
  return approvedStatuses.includes(status);
}

export function reportScheduleStatusIsTerminated(status: ReportScheduleStatusType): boolean {
  const terminatedStatuses: ReportScheduleStatusType[] = [
    REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED,
    REPORT_SCHEDULE_STATUS.STATUSES.FAILED,
    REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED,
    REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED,
    REPORT_SCHEDULE_STATUS.STATUSES.DELETED,
  ];
  return terminatedStatuses.includes(status);
}

export function reportScheduleStatusCanTransitionTo(
  currentStatus: ReportScheduleStatusType,
  targetStatus: ReportScheduleStatusType
): boolean {
  const transitions: Record<string, readonly string[]> = REPORT_SCHEDULE_STATUS.TRANSITIONS;
  const allowedTransitions = transitions[currentStatus] || [];
  return allowedTransitions.includes(targetStatus);
}

export function reportScheduleStatusGetAvailableTransitions(
  currentStatus: ReportScheduleStatusType
): ReportScheduleStatusType[] {
  const transitions: Record<string, readonly string[]> = REPORT_SCHEDULE_STATUS.TRANSITIONS;
  const available = transitions[currentStatus] || [];
  return [...available] as ReportScheduleStatusType[];
}

export function reportScheduleStatusGetSequence(): ReportScheduleStatusType[] {
  return [
    REPORT_SCHEDULE_STATUS.STATUSES.DRAFT,
    REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL,
    REPORT_SCHEDULE_STATUS.STATUSES.APPROVED,
    REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE,
    REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED,
    REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED,
  ];
}

export function reportScheduleStatusIsInSequence(
  status: ReportScheduleStatusType,
  sequence: ReportScheduleStatusType[]
): boolean {
  return sequence.includes(status);
}

export function reportScheduleStatusGetNextInSequence(
  currentStatus: ReportScheduleStatusType
): ReportScheduleStatusType | null {
  const sequence = reportScheduleStatusGetSequence();
  const currentIndex = sequence.indexOf(currentStatus);

  if (currentIndex === -1 || currentIndex === sequence.length - 1) {
    return null;
  }

  return sequence[currentIndex + 1];
}

export function reportScheduleStatusGetPreviousInSequence(
  currentStatus: ReportScheduleStatusType
): ReportScheduleStatusType | null {
  const sequence = reportScheduleStatusGetSequence();
  const currentIndex = sequence.indexOf(currentStatus);

  if (currentIndex <= 0) {
    return null;
  }

  return sequence[currentIndex - 1];
}

export function reportScheduleStatusGetPriorityOrder(): Record<ReportScheduleStatusType, number> {
  return {
    [REPORT_SCHEDULE_STATUS.STATUSES.DRAFT]: 0,
    [REPORT_SCHEDULE_STATUS.STATUSES.PENDING_APPROVAL]: 1,
    [REPORT_SCHEDULE_STATUS.STATUSES.APPROVED]: 2,
    [REPORT_SCHEDULE_STATUS.STATUSES.REJECTED]: 3,
    [REPORT_SCHEDULE_STATUS.STATUSES.ACTIVE]: 4,
    [REPORT_SCHEDULE_STATUS.STATUSES.INACTIVE]: 5,
    [REPORT_SCHEDULE_STATUS.STATUSES.PAUSED]: 6,
    [REPORT_SCHEDULE_STATUS.STATUSES.COMPLETED]: 7,
    [REPORT_SCHEDULE_STATUS.STATUSES.FAILED]: 8,
    [REPORT_SCHEDULE_STATUS.STATUSES.EXPIRED]: 9,
    [REPORT_SCHEDULE_STATUS.STATUSES.ARCHIVED]: 10,
    [REPORT_SCHEDULE_STATUS.STATUSES.DELETED]: 11,
  };
}

export function reportScheduleStatusIsValid(status: string): status is ReportScheduleStatusType {
  return Object.values(REPORT_SCHEDULE_STATUS.STATUSES).includes(
    status as ReportScheduleStatusType
  );
}
