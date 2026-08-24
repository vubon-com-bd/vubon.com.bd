/**
 * Complaint Status Constants
 * Status definitions for complaints
 */

export const COMPLAINT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    REVIEW: 'review',
    INVESTIGATING: 'investigating',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
    REJECTED: 'rejected',
    ESCALATED: 'escalated',
    ARCHIVED: 'archived',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    REVIEW: '#orange-500',
    INVESTIGATING: '#purple-500',
    RESOLVED: '#green-500',
    CLOSED: '#gray-500',
    REJECTED: '#red-500',
    ESCALATED: '#red-600',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    REVIEW: '🔍',
    INVESTIGATING: '🔬',
    RESOLVED: '✅',
    CLOSED: '🔒',
    REJECTED: '❌',
    ESCALATED: '⬆️',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_REVIEW: 'pending_to_review',
    PENDING_TO_ESCALATED: 'pending_to_escalated',
    REVIEW_TO_INVESTIGATING: 'review_to_investigating',
    REVIEW_TO_ESCALATED: 'review_to_escalated',
    INVESTIGATING_TO_RESOLVED: 'investigating_to_resolved',
    INVESTIGATING_TO_ESCALATED: 'investigating_to_escalated',
    RESOLVED_TO_CLOSED: 'resolved_to_closed',
    RESOLVED_TO_REJECTED: 'resolved_to_rejected',
    CLOSED_TO_ARCHIVED: 'closed_to_archived',
    REJECTED_TO_ARCHIVED: 'rejected_to_archived',
    ANY_TO_PENDING: 'any_to_pending',
  } as const,
} as const;

// Status Types
export type ComplaintStatusType =
  (typeof COMPLAINT_STATUS.TYPES)[keyof typeof COMPLAINT_STATUS.TYPES];

// Status Categories
export type ComplaintStatusCategory =
  (typeof COMPLAINT_STATUS.CATEGORIES)[keyof typeof COMPLAINT_STATUS.CATEGORIES];

// Status Colors
export type ComplaintStatusColor =
  (typeof COMPLAINT_STATUS.COLORS)[keyof typeof COMPLAINT_STATUS.COLORS];

// Status Icons
export type ComplaintStatusIcon =
  (typeof COMPLAINT_STATUS.ICONS)[keyof typeof COMPLAINT_STATUS.ICONS];

// Status Transitions
export type ComplaintStatusTransition =
  (typeof COMPLAINT_STATUS.TRANSITIONS)[keyof typeof COMPLAINT_STATUS.TRANSITIONS];

// Utility Functions
export function complaintStatusGetLabel(status: ComplaintStatusType): string {
  const labels: Record<ComplaintStatusType, string> = {
    [COMPLAINT_STATUS.TYPES.PENDING]: 'Pending',
    [COMPLAINT_STATUS.TYPES.REVIEW]: 'In Review',
    [COMPLAINT_STATUS.TYPES.INVESTIGATING]: 'Investigating',
    [COMPLAINT_STATUS.TYPES.RESOLVED]: 'Resolved',
    [COMPLAINT_STATUS.TYPES.CLOSED]: 'Closed',
    [COMPLAINT_STATUS.TYPES.REJECTED]: 'Rejected',
    [COMPLAINT_STATUS.TYPES.ESCALATED]: 'Escalated',
    [COMPLAINT_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function complaintStatusIsResolved(status: ComplaintStatusType): boolean {
  return status === COMPLAINT_STATUS.TYPES.RESOLVED || status === COMPLAINT_STATUS.TYPES.CLOSED;
}

export function complaintStatusIsPending(status: ComplaintStatusType): boolean {
  return (
    status === COMPLAINT_STATUS.TYPES.PENDING ||
    status === COMPLAINT_STATUS.TYPES.REVIEW ||
    status === COMPLAINT_STATUS.TYPES.INVESTIGATING
  );
}

export function complaintStatusIsActive(status: ComplaintStatusType): boolean {
  const activeStatuses: ComplaintStatusType[] = [
    COMPLAINT_STATUS.TYPES.REVIEW,
    COMPLAINT_STATUS.TYPES.INVESTIGATING,
    COMPLAINT_STATUS.TYPES.ESCALATED,
  ];
  return activeStatuses.includes(status);
}

export function complaintStatusGetCategory(status: ComplaintStatusType): ComplaintStatusCategory {
  const categories: Record<ComplaintStatusType, ComplaintStatusCategory> = {
    [COMPLAINT_STATUS.TYPES.PENDING]: COMPLAINT_STATUS.CATEGORIES.PENDING,
    [COMPLAINT_STATUS.TYPES.REVIEW]: COMPLAINT_STATUS.CATEGORIES.ACTIVE,
    [COMPLAINT_STATUS.TYPES.INVESTIGATING]: COMPLAINT_STATUS.CATEGORIES.ACTIVE,
    [COMPLAINT_STATUS.TYPES.ESCALATED]: COMPLAINT_STATUS.CATEGORIES.ACTIVE,
    [COMPLAINT_STATUS.TYPES.RESOLVED]: COMPLAINT_STATUS.CATEGORIES.RESOLVED,
    [COMPLAINT_STATUS.TYPES.CLOSED]: COMPLAINT_STATUS.CATEGORIES.CLOSED,
    [COMPLAINT_STATUS.TYPES.REJECTED]: COMPLAINT_STATUS.CATEGORIES.CLOSED,
    [COMPLAINT_STATUS.TYPES.ARCHIVED]: COMPLAINT_STATUS.CATEGORIES.CLOSED,
  };
  return categories[status] || COMPLAINT_STATUS.CATEGORIES.PENDING;
}

export function complaintStatusCanTransition(
  status: ComplaintStatusType,
  transition: ComplaintStatusTransition
): boolean {
  const allowedTransitions: Record<ComplaintStatusType, ComplaintStatusTransition[]> = {
    [COMPLAINT_STATUS.TYPES.PENDING]: [
      COMPLAINT_STATUS.TRANSITIONS.PENDING_TO_REVIEW,
      COMPLAINT_STATUS.TRANSITIONS.PENDING_TO_ESCALATED,
    ],
    [COMPLAINT_STATUS.TYPES.REVIEW]: [
      COMPLAINT_STATUS.TRANSITIONS.REVIEW_TO_INVESTIGATING,
      COMPLAINT_STATUS.TRANSITIONS.REVIEW_TO_ESCALATED,
    ],
    [COMPLAINT_STATUS.TYPES.INVESTIGATING]: [
      COMPLAINT_STATUS.TRANSITIONS.INVESTIGATING_TO_RESOLVED,
      COMPLAINT_STATUS.TRANSITIONS.INVESTIGATING_TO_ESCALATED,
    ],
    [COMPLAINT_STATUS.TYPES.RESOLVED]: [
      COMPLAINT_STATUS.TRANSITIONS.RESOLVED_TO_CLOSED,
      COMPLAINT_STATUS.TRANSITIONS.RESOLVED_TO_REJECTED,
    ],
    [COMPLAINT_STATUS.TYPES.CLOSED]: [
      COMPLAINT_STATUS.TRANSITIONS.CLOSED_TO_ARCHIVED,
      COMPLAINT_STATUS.TRANSITIONS.ANY_TO_PENDING,
    ],
    [COMPLAINT_STATUS.TYPES.REJECTED]: [
      COMPLAINT_STATUS.TRANSITIONS.REJECTED_TO_ARCHIVED,
      COMPLAINT_STATUS.TRANSITIONS.ANY_TO_PENDING,
    ],
    [COMPLAINT_STATUS.TYPES.ESCALATED]: [
      COMPLAINT_STATUS.TRANSITIONS.INVESTIGATING_TO_RESOLVED,
      COMPLAINT_STATUS.TRANSITIONS.ANY_TO_PENDING,
    ],
    [COMPLAINT_STATUS.TYPES.ARCHIVED]: [COMPLAINT_STATUS.TRANSITIONS.ANY_TO_PENDING],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
