/**
 * Logistics Report Status Constants
 * Status definitions for logistics reports
 */

export const LOGISTICS_REPORT_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    PENDING: '#yellow-500',
    GENERATING: '#blue-400',
    COMPLETED: '#green-600',
    FAILED: '#red-500',
    SCHEDULED: '#purple-500',
    CANCELLED: '#gray-500',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    PENDING: '⏳',
    GENERATING: '⚙️',
    COMPLETED: '✅',
    FAILED: '❌',
    SCHEDULED: '📅',
    CANCELLED: '🚫',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_PENDING: 'draft_to_pending',
    PENDING_TO_GENERATING: 'pending_to_generating',
    PENDING_TO_SCHEDULED: 'pending_to_scheduled',
    GENERATING_TO_COMPLETED: 'generating_to_completed',
    GENERATING_TO_FAILED: 'generating_to_failed',
    SCHEDULED_TO_PENDING: 'scheduled_to_pending',
    COMPLETED_TO_ARCHIVED: 'completed_to_archived',
    FAILED_TO_PENDING: 'failed_to_pending',
    ANY_TO_CANCELLED: 'any_to_cancelled',
    CANCELLED_TO_ARCHIVED: 'cancelled_to_archived',
  } as const,
} as const;

// Status Types
export type LogisticsReportStatusType =
  (typeof LOGISTICS_REPORT_STATUS.TYPES)[keyof typeof LOGISTICS_REPORT_STATUS.TYPES];

// Status Categories
export type LogisticsReportStatusCategory =
  (typeof LOGISTICS_REPORT_STATUS.CATEGORIES)[keyof typeof LOGISTICS_REPORT_STATUS.CATEGORIES];

// Status Colors
export type LogisticsReportStatusColor =
  (typeof LOGISTICS_REPORT_STATUS.COLORS)[keyof typeof LOGISTICS_REPORT_STATUS.COLORS];

// Status Icons
export type LogisticsReportStatusIcon =
  (typeof LOGISTICS_REPORT_STATUS.ICONS)[keyof typeof LOGISTICS_REPORT_STATUS.ICONS];

// Status Transitions
export type LogisticsReportStatusTransition =
  (typeof LOGISTICS_REPORT_STATUS.TRANSITIONS)[keyof typeof LOGISTICS_REPORT_STATUS.TRANSITIONS];

// Utility Functions
export function logisticsReportStatusGetLabel(status: LogisticsReportStatusType): string {
  const labels: Record<LogisticsReportStatusType, string> = {
    [LOGISTICS_REPORT_STATUS.TYPES.DRAFT]: 'Draft',
    [LOGISTICS_REPORT_STATUS.TYPES.PENDING]: 'Pending',
    [LOGISTICS_REPORT_STATUS.TYPES.GENERATING]: 'Generating',
    [LOGISTICS_REPORT_STATUS.TYPES.COMPLETED]: 'Completed',
    [LOGISTICS_REPORT_STATUS.TYPES.FAILED]: 'Failed',
    [LOGISTICS_REPORT_STATUS.TYPES.SCHEDULED]: 'Scheduled',
    [LOGISTICS_REPORT_STATUS.TYPES.CANCELLED]: 'Cancelled',
    [LOGISTICS_REPORT_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function logisticsReportStatusGetCategory(
  status: LogisticsReportStatusType
): LogisticsReportStatusCategory {
  const categories: Record<LogisticsReportStatusType, LogisticsReportStatusCategory> = {
    [LOGISTICS_REPORT_STATUS.TYPES.DRAFT]: LOGISTICS_REPORT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_REPORT_STATUS.TYPES.PENDING]: LOGISTICS_REPORT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_REPORT_STATUS.TYPES.GENERATING]: LOGISTICS_REPORT_STATUS.CATEGORIES.ACTIVE,
    [LOGISTICS_REPORT_STATUS.TYPES.SCHEDULED]: LOGISTICS_REPORT_STATUS.CATEGORIES.PENDING,
    [LOGISTICS_REPORT_STATUS.TYPES.COMPLETED]: LOGISTICS_REPORT_STATUS.CATEGORIES.COMPLETED,
    [LOGISTICS_REPORT_STATUS.TYPES.FAILED]: LOGISTICS_REPORT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_REPORT_STATUS.TYPES.CANCELLED]: LOGISTICS_REPORT_STATUS.CATEGORIES.FAILED,
    [LOGISTICS_REPORT_STATUS.TYPES.ARCHIVED]: LOGISTICS_REPORT_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || LOGISTICS_REPORT_STATUS.CATEGORIES.PENDING;
}

export function logisticsReportStatusIsComplete(status: LogisticsReportStatusType): boolean {
  const completeStatuses: LogisticsReportStatusType[] = [
    LOGISTICS_REPORT_STATUS.TYPES.COMPLETED,
    LOGISTICS_REPORT_STATUS.TYPES.FAILED,
    LOGISTICS_REPORT_STATUS.TYPES.CANCELLED,
    LOGISTICS_REPORT_STATUS.TYPES.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function logisticsReportStatusIsActive(status: LogisticsReportStatusType): boolean {
  return status === LOGISTICS_REPORT_STATUS.TYPES.GENERATING;
}

export function logisticsReportStatusCanTransition(
  status: LogisticsReportStatusType,
  transition: LogisticsReportStatusTransition
): boolean {
  const allowedTransitions: Record<LogisticsReportStatusType, LogisticsReportStatusTransition[]> = {
    [LOGISTICS_REPORT_STATUS.TYPES.DRAFT]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.DRAFT_TO_PENDING,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.PENDING]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.PENDING_TO_GENERATING,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.PENDING_TO_SCHEDULED,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.GENERATING]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.GENERATING_TO_COMPLETED,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.GENERATING_TO_FAILED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.SCHEDULED]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.SCHEDULED_TO_PENDING,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.COMPLETED]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.COMPLETED_TO_ARCHIVED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.FAILED]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.FAILED_TO_PENDING,
      LOGISTICS_REPORT_STATUS.TRANSITIONS.ANY_TO_CANCELLED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.CANCELLED]: [
      LOGISTICS_REPORT_STATUS.TRANSITIONS.CANCELLED_TO_ARCHIVED,
    ],
    [LOGISTICS_REPORT_STATUS.TYPES.ARCHIVED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
