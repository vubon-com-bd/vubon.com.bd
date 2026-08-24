/**
 * Feedback Status Constants
 * Status definitions for feedback
 */

export const SUPPORT_FEEDBACK_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    REVIEW: 'review',
    ACKNOWLEDGED: 'acknowledged',
    RESPONDED: 'responded',
    RESOLVED: 'resolved',
    CLOSED: 'closed',
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
    ACKNOWLEDGED: '#blue-500',
    RESPONDED: '#purple-500',
    RESOLVED: '#green-500',
    CLOSED: '#gray-500',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    REVIEW: '🔍',
    ACKNOWLEDGED: '✅',
    RESPONDED: '💬',
    RESOLVED: '🎉',
    CLOSED: '🔒',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_REVIEW: 'pending_to_review',
    PENDING_TO_ACKNOWLEDGED: 'pending_to_acknowledged',
    REVIEW_TO_ACKNOWLEDGED: 'review_to_acknowledged',
    REVIEW_TO_RESPONDED: 'review_to_responded',
    ACKNOWLEDGED_TO_RESPONDED: 'acknowledged_to_responded',
    RESPONDED_TO_RESOLVED: 'responded_to_resolved',
    RESOLVED_TO_CLOSED: 'resolved_to_closed',
    RESOLVED_TO_ARCHIVED: 'resolved_to_archived',
    CLOSED_TO_ARCHIVED: 'closed_to_archived',
    ANY_TO_PENDING: 'any_to_pending',
  } as const,
} as const;

// Status Types
export type SupportFeedbackStatusType =
  (typeof SUPPORT_FEEDBACK_STATUS.TYPES)[keyof typeof SUPPORT_FEEDBACK_STATUS.TYPES];

// Status Categories
export type SupportFeedbackStatusCategory =
  (typeof SUPPORT_FEEDBACK_STATUS.CATEGORIES)[keyof typeof SUPPORT_FEEDBACK_STATUS.CATEGORIES];

// Status Colors
export type SupportFeedbackStatusColor =
  (typeof SUPPORT_FEEDBACK_STATUS.COLORS)[keyof typeof SUPPORT_FEEDBACK_STATUS.COLORS];

// Status Icons
export type SupportFeedbackStatusIcon =
  (typeof SUPPORT_FEEDBACK_STATUS.ICONS)[keyof typeof SUPPORT_FEEDBACK_STATUS.ICONS];

// Status Transitions
export type SupportFeedbackStatusTransition =
  (typeof SUPPORT_FEEDBACK_STATUS.TRANSITIONS)[keyof typeof SUPPORT_FEEDBACK_STATUS.TRANSITIONS];

// Utility Functions
export function supportFeedbackStatusGetLabel(status: SupportFeedbackStatusType): string {
  const labels: Record<SupportFeedbackStatusType, string> = {
    [SUPPORT_FEEDBACK_STATUS.TYPES.PENDING]: 'Pending',
    [SUPPORT_FEEDBACK_STATUS.TYPES.REVIEW]: 'In Review',
    [SUPPORT_FEEDBACK_STATUS.TYPES.ACKNOWLEDGED]: 'Acknowledged',
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESPONDED]: 'Responded',
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESOLVED]: 'Resolved',
    [SUPPORT_FEEDBACK_STATUS.TYPES.CLOSED]: 'Closed',
    [SUPPORT_FEEDBACK_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function supportFeedbackStatusIsResolved(status: SupportFeedbackStatusType): boolean {
  return (
    status === SUPPORT_FEEDBACK_STATUS.TYPES.RESOLVED ||
    status === SUPPORT_FEEDBACK_STATUS.TYPES.CLOSED
  );
}

export function supportFeedbackStatusIsPending(status: SupportFeedbackStatusType): boolean {
  return (
    status === SUPPORT_FEEDBACK_STATUS.TYPES.PENDING ||
    status === SUPPORT_FEEDBACK_STATUS.TYPES.REVIEW
  );
}

export function supportFeedbackStatusIsActive(status: SupportFeedbackStatusType): boolean {
  const activeStatuses: SupportFeedbackStatusType[] = [
    SUPPORT_FEEDBACK_STATUS.TYPES.ACKNOWLEDGED,
    SUPPORT_FEEDBACK_STATUS.TYPES.RESPONDED,
  ];
  return activeStatuses.includes(status);
}

export function supportFeedbackStatusGetCategory(
  status: SupportFeedbackStatusType
): SupportFeedbackStatusCategory {
  const categories: Record<SupportFeedbackStatusType, SupportFeedbackStatusCategory> = {
    [SUPPORT_FEEDBACK_STATUS.TYPES.PENDING]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.PENDING,
    [SUPPORT_FEEDBACK_STATUS.TYPES.REVIEW]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.PENDING,
    [SUPPORT_FEEDBACK_STATUS.TYPES.ACKNOWLEDGED]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.ACTIVE,
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESPONDED]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.ACTIVE,
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESOLVED]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.RESOLVED,
    [SUPPORT_FEEDBACK_STATUS.TYPES.CLOSED]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.CLOSED,
    [SUPPORT_FEEDBACK_STATUS.TYPES.ARCHIVED]: SUPPORT_FEEDBACK_STATUS.CATEGORIES.CLOSED,
  };
  return categories[status] || SUPPORT_FEEDBACK_STATUS.CATEGORIES.PENDING;
}

export function supportFeedbackStatusCanTransition(
  status: SupportFeedbackStatusType,
  transition: SupportFeedbackStatusTransition
): boolean {
  const allowedTransitions: Record<SupportFeedbackStatusType, SupportFeedbackStatusTransition[]> = {
    [SUPPORT_FEEDBACK_STATUS.TYPES.PENDING]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.PENDING_TO_REVIEW,
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.PENDING_TO_ACKNOWLEDGED,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.REVIEW]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.REVIEW_TO_ACKNOWLEDGED,
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.REVIEW_TO_RESPONDED,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.ACKNOWLEDGED]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.ACKNOWLEDGED_TO_RESPONDED,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESPONDED]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.RESPONDED_TO_RESOLVED,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.RESOLVED]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.RESOLVED_TO_CLOSED,
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.RESOLVED_TO_ARCHIVED,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.CLOSED]: [
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.CLOSED_TO_ARCHIVED,
      SUPPORT_FEEDBACK_STATUS.TRANSITIONS.ANY_TO_PENDING,
    ],
    [SUPPORT_FEEDBACK_STATUS.TYPES.ARCHIVED]: [SUPPORT_FEEDBACK_STATUS.TRANSITIONS.ANY_TO_PENDING],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
