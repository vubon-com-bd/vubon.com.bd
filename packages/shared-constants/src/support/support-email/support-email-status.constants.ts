/**
 * Support Email Status Constants
 * Status definitions for support emails
 */

export const SUPPORT_EMAIL_STATUS = {
  // Status Types
  TYPES: {
    DRAFT: 'draft',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    PENDING: 'pending',
    SCHEDULED: 'scheduled',
    BOUNCED: 'bounced',
    SPAM: 'spam',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    DRAFT: '#gray-400',
    SENT: '#blue-500',
    DELIVERED: '#green-500',
    READ: '#green-600',
    FAILED: '#red-500',
    PENDING: '#yellow-500',
    SCHEDULED: '#purple-500',
    BOUNCED: '#orange-500',
    SPAM: '#red-400',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    DRAFT: '📝',
    SENT: '📤',
    DELIVERED: '✅',
    READ: '👁️',
    FAILED: '❌',
    PENDING: '⏳',
    SCHEDULED: '📅',
    BOUNCED: '↩️',
    SPAM: '🚫',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_SENT: 'draft_to_sent',
    DRAFT_TO_SCHEDULED: 'draft_to_scheduled',
    PENDING_TO_SENT: 'pending_to_sent',
    PENDING_TO_FAILED: 'pending_to_failed',
    SENT_TO_DELIVERED: 'sent_to_delivered',
    DELIVERED_TO_READ: 'delivered_to_read',
    SENT_TO_BOUNCED: 'sent_to_bounced',
    SENT_TO_SPAM: 'sent_to_spam',
    ANY_TO_ARCHIVED: 'any_to_archived',
  } as const,
} as const;

// Status Types
export type SupportEmailStatusType =
  (typeof SUPPORT_EMAIL_STATUS.TYPES)[keyof typeof SUPPORT_EMAIL_STATUS.TYPES];

// Status Categories
export type SupportEmailStatusCategory =
  (typeof SUPPORT_EMAIL_STATUS.CATEGORIES)[keyof typeof SUPPORT_EMAIL_STATUS.CATEGORIES];

// Status Colors
export type SupportEmailStatusColor =
  (typeof SUPPORT_EMAIL_STATUS.COLORS)[keyof typeof SUPPORT_EMAIL_STATUS.COLORS];

// Status Icons
export type SupportEmailStatusIcon =
  (typeof SUPPORT_EMAIL_STATUS.ICONS)[keyof typeof SUPPORT_EMAIL_STATUS.ICONS];

// Status Transitions
export type SupportEmailStatusTransition =
  (typeof SUPPORT_EMAIL_STATUS.TRANSITIONS)[keyof typeof SUPPORT_EMAIL_STATUS.TRANSITIONS];

// Utility Functions
export function supportEmailStatusGetLabel(status: SupportEmailStatusType): string {
  const labels: Record<SupportEmailStatusType, string> = {
    [SUPPORT_EMAIL_STATUS.TYPES.DRAFT]: 'Draft',
    [SUPPORT_EMAIL_STATUS.TYPES.SENT]: 'Sent',
    [SUPPORT_EMAIL_STATUS.TYPES.DELIVERED]: 'Delivered',
    [SUPPORT_EMAIL_STATUS.TYPES.READ]: 'Read',
    [SUPPORT_EMAIL_STATUS.TYPES.FAILED]: 'Failed',
    [SUPPORT_EMAIL_STATUS.TYPES.PENDING]: 'Pending',
    [SUPPORT_EMAIL_STATUS.TYPES.SCHEDULED]: 'Scheduled',
    [SUPPORT_EMAIL_STATUS.TYPES.BOUNCED]: 'Bounced',
    [SUPPORT_EMAIL_STATUS.TYPES.SPAM]: 'Spam',
  };
  return labels[status] || 'Unknown';
}

export function supportEmailStatusIsSent(status: SupportEmailStatusType): boolean {
  return (
    status === SUPPORT_EMAIL_STATUS.TYPES.SENT ||
    status === SUPPORT_EMAIL_STATUS.TYPES.DELIVERED ||
    status === SUPPORT_EMAIL_STATUS.TYPES.READ
  );
}

export function supportEmailStatusIsFailed(status: SupportEmailStatusType): boolean {
  return (
    status === SUPPORT_EMAIL_STATUS.TYPES.FAILED || status === SUPPORT_EMAIL_STATUS.TYPES.BOUNCED
  );
}

export function supportEmailStatusIsPending(status: SupportEmailStatusType): boolean {
  return (
    status === SUPPORT_EMAIL_STATUS.TYPES.PENDING ||
    status === SUPPORT_EMAIL_STATUS.TYPES.DRAFT ||
    status === SUPPORT_EMAIL_STATUS.TYPES.SCHEDULED
  );
}

export function supportEmailStatusGetCategory(
  status: SupportEmailStatusType
): SupportEmailStatusCategory {
  const categories: Record<SupportEmailStatusType, SupportEmailStatusCategory> = {
    [SUPPORT_EMAIL_STATUS.TYPES.DRAFT]: SUPPORT_EMAIL_STATUS.CATEGORIES.PENDING,
    [SUPPORT_EMAIL_STATUS.TYPES.SENT]: SUPPORT_EMAIL_STATUS.CATEGORIES.SUCCESS,
    [SUPPORT_EMAIL_STATUS.TYPES.DELIVERED]: SUPPORT_EMAIL_STATUS.CATEGORIES.SUCCESS,
    [SUPPORT_EMAIL_STATUS.TYPES.READ]: SUPPORT_EMAIL_STATUS.CATEGORIES.SUCCESS,
    [SUPPORT_EMAIL_STATUS.TYPES.FAILED]: SUPPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [SUPPORT_EMAIL_STATUS.TYPES.PENDING]: SUPPORT_EMAIL_STATUS.CATEGORIES.PENDING,
    [SUPPORT_EMAIL_STATUS.TYPES.SCHEDULED]: SUPPORT_EMAIL_STATUS.CATEGORIES.PENDING,
    [SUPPORT_EMAIL_STATUS.TYPES.BOUNCED]: SUPPORT_EMAIL_STATUS.CATEGORIES.FAILED,
    [SUPPORT_EMAIL_STATUS.TYPES.SPAM]: SUPPORT_EMAIL_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || SUPPORT_EMAIL_STATUS.CATEGORIES.PENDING;
}

export function supportEmailStatusCanTransition(
  status: SupportEmailStatusType,
  transition: SupportEmailStatusTransition
): boolean {
  const allowedTransitions: Record<SupportEmailStatusType, SupportEmailStatusTransition[]> = {
    [SUPPORT_EMAIL_STATUS.TYPES.DRAFT]: [
      SUPPORT_EMAIL_STATUS.TRANSITIONS.DRAFT_TO_SENT,
      SUPPORT_EMAIL_STATUS.TRANSITIONS.DRAFT_TO_SCHEDULED,
    ],
    [SUPPORT_EMAIL_STATUS.TYPES.PENDING]: [
      SUPPORT_EMAIL_STATUS.TRANSITIONS.PENDING_TO_SENT,
      SUPPORT_EMAIL_STATUS.TRANSITIONS.PENDING_TO_FAILED,
    ],
    [SUPPORT_EMAIL_STATUS.TYPES.SENT]: [
      SUPPORT_EMAIL_STATUS.TRANSITIONS.SENT_TO_DELIVERED,
      SUPPORT_EMAIL_STATUS.TRANSITIONS.SENT_TO_BOUNCED,
      SUPPORT_EMAIL_STATUS.TRANSITIONS.SENT_TO_SPAM,
    ],
    [SUPPORT_EMAIL_STATUS.TYPES.DELIVERED]: [SUPPORT_EMAIL_STATUS.TRANSITIONS.DELIVERED_TO_READ],
    [SUPPORT_EMAIL_STATUS.TYPES.SCHEDULED]: [SUPPORT_EMAIL_STATUS.TRANSITIONS.DRAFT_TO_SENT],
    [SUPPORT_EMAIL_STATUS.TYPES.BOUNCED]: [],
    [SUPPORT_EMAIL_STATUS.TYPES.SPAM]: [],
    [SUPPORT_EMAIL_STATUS.TYPES.FAILED]: [],
    [SUPPORT_EMAIL_STATUS.TYPES.READ]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
