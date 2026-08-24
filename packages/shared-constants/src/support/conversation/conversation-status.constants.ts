/**
 * Conversation Status Constants
 * Status definitions for conversations
 */

export const CONVERSATION_STATUS = {
  // Status Types
  TYPES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    MUTED: 'muted',
    LOCKED: 'locked',
    DELETED: 'deleted',
  } as const,

  // Status Categories
  CATEGORIES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    ACTIVE: '#green-500',
    INACTIVE: '#gray-400',
    CLOSED: '#gray-500',
    ARCHIVED: '#gray-600',
    PENDING: '#yellow-500',
    MUTED: '#gray-400',
    LOCKED: '#red-500',
    DELETED: '#red-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    ACTIVE: '🟢',
    INACTIVE: '⚪',
    CLOSED: '🔴',
    ARCHIVED: '📦',
    PENDING: '⏳',
    MUTED: '🔇',
    LOCKED: '🔒',
    DELETED: '🗑️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    ACTIVE_TO_PENDING: 'active_to_pending',
    ACTIVE_TO_LOCKED: 'active_to_locked',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    PENDING_TO_ACTIVE: 'pending_to_active',
    PENDING_TO_INACTIVE: 'pending_to_inactive',
    LOCKED_TO_ACTIVE: 'locked_to_active',
    LOCKED_TO_INACTIVE: 'locked_to_inactive',
    ACTIVE_TO_CLOSED: 'active_to_closed',
    INACTIVE_TO_CLOSED: 'inactive_to_closed',
    CLOSED_TO_ARCHIVED: 'closed_to_archived',
    ACTIVE_TO_MUTED: 'active_to_muted',
    MUTED_TO_ACTIVE: 'muted_to_active',
    ANY_TO_DELETED: 'any_to_deleted',
  } as const,
} as const;

// Status Types
export type ConversationStatusType =
  (typeof CONVERSATION_STATUS.TYPES)[keyof typeof CONVERSATION_STATUS.TYPES];

// Status Categories
export type ConversationStatusCategory =
  (typeof CONVERSATION_STATUS.CATEGORIES)[keyof typeof CONVERSATION_STATUS.CATEGORIES];

// Status Colors
export type ConversationStatusColor =
  (typeof CONVERSATION_STATUS.COLORS)[keyof typeof CONVERSATION_STATUS.COLORS];

// Status Icons
export type ConversationStatusIcon =
  (typeof CONVERSATION_STATUS.ICONS)[keyof typeof CONVERSATION_STATUS.ICONS];

// Status Transitions
export type ConversationStatusTransition =
  (typeof CONVERSATION_STATUS.TRANSITIONS)[keyof typeof CONVERSATION_STATUS.TRANSITIONS];

// Utility Functions
export function conversationStatusGetLabel(status: ConversationStatusType): string {
  const labels: Record<ConversationStatusType, string> = {
    [CONVERSATION_STATUS.TYPES.ACTIVE]: 'Active',
    [CONVERSATION_STATUS.TYPES.INACTIVE]: 'Inactive',
    [CONVERSATION_STATUS.TYPES.CLOSED]: 'Closed',
    [CONVERSATION_STATUS.TYPES.ARCHIVED]: 'Archived',
    [CONVERSATION_STATUS.TYPES.PENDING]: 'Pending',
    [CONVERSATION_STATUS.TYPES.MUTED]: 'Muted',
    [CONVERSATION_STATUS.TYPES.LOCKED]: 'Locked',
    [CONVERSATION_STATUS.TYPES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function conversationStatusIsActive(status: ConversationStatusType): boolean {
  return status === CONVERSATION_STATUS.TYPES.ACTIVE;
}

export function conversationStatusIsClosed(status: ConversationStatusType): boolean {
  return (
    status === CONVERSATION_STATUS.TYPES.CLOSED || status === CONVERSATION_STATUS.TYPES.ARCHIVED
  );
}

export function conversationStatusIsPending(status: ConversationStatusType): boolean {
  return status === CONVERSATION_STATUS.TYPES.PENDING;
}

export function conversationStatusGetCategory(
  status: ConversationStatusType
): ConversationStatusCategory {
  const categories: Record<ConversationStatusType, ConversationStatusCategory> = {
    [CONVERSATION_STATUS.TYPES.ACTIVE]: CONVERSATION_STATUS.CATEGORIES.ACTIVE,
    [CONVERSATION_STATUS.TYPES.INACTIVE]: CONVERSATION_STATUS.CATEGORIES.INACTIVE,
    [CONVERSATION_STATUS.TYPES.PENDING]: CONVERSATION_STATUS.CATEGORIES.ACTIVE,
    [CONVERSATION_STATUS.TYPES.MUTED]: CONVERSATION_STATUS.CATEGORIES.INACTIVE,
    [CONVERSATION_STATUS.TYPES.LOCKED]: CONVERSATION_STATUS.CATEGORIES.INACTIVE,
    [CONVERSATION_STATUS.TYPES.CLOSED]: CONVERSATION_STATUS.CATEGORIES.CLOSED,
    [CONVERSATION_STATUS.TYPES.ARCHIVED]: CONVERSATION_STATUS.CATEGORIES.ARCHIVED,
    [CONVERSATION_STATUS.TYPES.DELETED]: CONVERSATION_STATUS.CATEGORIES.ARCHIVED,
  };
  return categories[status] || CONVERSATION_STATUS.CATEGORIES.INACTIVE;
}

export function conversationStatusIsResolved(status: ConversationStatusType): boolean {
  return (
    status === CONVERSATION_STATUS.TYPES.CLOSED || status === CONVERSATION_STATUS.TYPES.ARCHIVED
  );
}
