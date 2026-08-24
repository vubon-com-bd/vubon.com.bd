/**
 * Message Status Constants
 * Status definitions for messages
 */

export const MESSAGE_STATUS = {
  // Status Types
  TYPES: {
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    PENDING: 'pending',
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    EDITED: 'edited',
    DELETED: 'deleted',
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
    SENT: '#blue-500',
    DELIVERED: '#green-500',
    READ: '#green-600',
    FAILED: '#red-500',
    PENDING: '#yellow-500',
    DRAFT: '#gray-400',
    SCHEDULED: '#purple-500',
    EDITED: '#orange-500',
    DELETED: '#red-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    SENT: '📤',
    DELIVERED: '✅',
    READ: '👁️',
    FAILED: '❌',
    PENDING: '⏳',
    DRAFT: '📝',
    SCHEDULED: '📅',
    EDITED: '✏️',
    DELETED: '🗑️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    DRAFT_TO_SENT: 'draft_to_sent',
    DRAFT_TO_SCHEDULED: 'draft_to_scheduled',
    PENDING_TO_SENT: 'pending_to_sent',
    PENDING_TO_FAILED: 'pending_to_failed',
    SENT_TO_DELIVERED: 'sent_to_delivered',
    DELIVERED_TO_READ: 'delivered_to_read',
    SENT_TO_EDITED: 'sent_to_edited',
    ANY_TO_DELETED: 'any_to_deleted',
  } as const,
} as const;

// Status Types
export type MessageStatusType = (typeof MESSAGE_STATUS.TYPES)[keyof typeof MESSAGE_STATUS.TYPES];

// Status Categories
export type MessageStatusCategory =
  (typeof MESSAGE_STATUS.CATEGORIES)[keyof typeof MESSAGE_STATUS.CATEGORIES];

// Status Colors
export type MessageStatusColor = (typeof MESSAGE_STATUS.COLORS)[keyof typeof MESSAGE_STATUS.COLORS];

// Status Icons
export type MessageStatusIcon = (typeof MESSAGE_STATUS.ICONS)[keyof typeof MESSAGE_STATUS.ICONS];

// Status Transitions
export type MessageStatusTransition =
  (typeof MESSAGE_STATUS.TRANSITIONS)[keyof typeof MESSAGE_STATUS.TRANSITIONS];

// Utility Functions
export function messageStatusGetLabel(status: MessageStatusType): string {
  const labels: Record<MessageStatusType, string> = {
    [MESSAGE_STATUS.TYPES.SENT]: 'Sent',
    [MESSAGE_STATUS.TYPES.DELIVERED]: 'Delivered',
    [MESSAGE_STATUS.TYPES.READ]: 'Read',
    [MESSAGE_STATUS.TYPES.FAILED]: 'Failed',
    [MESSAGE_STATUS.TYPES.PENDING]: 'Pending',
    [MESSAGE_STATUS.TYPES.DRAFT]: 'Draft',
    [MESSAGE_STATUS.TYPES.SCHEDULED]: 'Scheduled',
    [MESSAGE_STATUS.TYPES.EDITED]: 'Edited',
    [MESSAGE_STATUS.TYPES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function messageStatusIsDelivered(status: MessageStatusType): boolean {
  return status === MESSAGE_STATUS.TYPES.DELIVERED || status === MESSAGE_STATUS.TYPES.READ;
}

export function messageStatusIsFailed(status: MessageStatusType): boolean {
  return status === MESSAGE_STATUS.TYPES.FAILED;
}

export function messageStatusIsPending(status: MessageStatusType): boolean {
  return (
    status === MESSAGE_STATUS.TYPES.PENDING ||
    status === MESSAGE_STATUS.TYPES.DRAFT ||
    status === MESSAGE_STATUS.TYPES.SCHEDULED
  );
}

export function messageStatusGetCategory(status: MessageStatusType): MessageStatusCategory {
  const categories: Record<MessageStatusType, MessageStatusCategory> = {
    [MESSAGE_STATUS.TYPES.SENT]: MESSAGE_STATUS.CATEGORIES.SUCCESS,
    [MESSAGE_STATUS.TYPES.DELIVERED]: MESSAGE_STATUS.CATEGORIES.SUCCESS,
    [MESSAGE_STATUS.TYPES.READ]: MESSAGE_STATUS.CATEGORIES.SUCCESS,
    [MESSAGE_STATUS.TYPES.FAILED]: MESSAGE_STATUS.CATEGORIES.FAILED,
    [MESSAGE_STATUS.TYPES.PENDING]: MESSAGE_STATUS.CATEGORIES.PENDING,
    [MESSAGE_STATUS.TYPES.DRAFT]: MESSAGE_STATUS.CATEGORIES.PENDING,
    [MESSAGE_STATUS.TYPES.SCHEDULED]: MESSAGE_STATUS.CATEGORIES.PENDING,
    [MESSAGE_STATUS.TYPES.EDITED]: MESSAGE_STATUS.CATEGORIES.SUCCESS,
    [MESSAGE_STATUS.TYPES.DELETED]: MESSAGE_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || MESSAGE_STATUS.CATEGORIES.PENDING;
}

export function messageStatusIsFinal(status: MessageStatusType): boolean {
  const finalStatuses: MessageStatusType[] = [
    MESSAGE_STATUS.TYPES.DELIVERED,
    MESSAGE_STATUS.TYPES.READ,
    MESSAGE_STATUS.TYPES.FAILED,
    MESSAGE_STATUS.TYPES.DELETED,
  ];
  return finalStatuses.includes(status);
}
