/**
 * Live Chat Status Constants
 * Status definitions for live chat
 */

export const LIVE_CHAT_STATUS = {
  // Status Types
  TYPES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    ESCALATED: 'escalated',
    TRANSFERRED: 'transferred',
    ARCHIVED: 'archived',
  } as const,

  // Status Categories
  CATEGORIES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    ENDED: 'ended',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#yellow-500',
    ACTIVE: '#green-500',
    INACTIVE: '#gray-400',
    CLOSED: '#gray-500',
    ESCALATED: '#red-500',
    TRANSFERRED: '#purple-500',
    ARCHIVED: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    PENDING: '⏳',
    ACTIVE: '💬',
    INACTIVE: '💤',
    CLOSED: '🔒',
    ESCALATED: '🚨',
    TRANSFERRED: '↗️',
    ARCHIVED: '📦',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    PENDING_TO_ACTIVE: 'pending_to_active',
    PENDING_TO_CLOSED: 'pending_to_closed',
    ACTIVE_TO_INACTIVE: 'active_to_inactive',
    INACTIVE_TO_ACTIVE: 'inactive_to_active',
    ACTIVE_TO_CLOSED: 'active_to_closed',
    ACTIVE_TO_ESCALATED: 'active_to_escalated',
    ACTIVE_TO_TRANSFERRED: 'active_to_transferred',
    ESCALATED_TO_CLOSED: 'escalated_to_closed',
    ESCALATED_TO_ACTIVE: 'escalated_to_active',
    TRANSFERRED_TO_ACTIVE: 'transferred_to_active',
    CLOSED_TO_ARCHIVED: 'closed_to_archived',
  } as const,
} as const;

// Status Types
export type LiveChatStatusType =
  (typeof LIVE_CHAT_STATUS.TYPES)[keyof typeof LIVE_CHAT_STATUS.TYPES];

// Status Categories
export type LiveChatStatusCategory =
  (typeof LIVE_CHAT_STATUS.CATEGORIES)[keyof typeof LIVE_CHAT_STATUS.CATEGORIES];

// Status Colors
export type LiveChatStatusColor =
  (typeof LIVE_CHAT_STATUS.COLORS)[keyof typeof LIVE_CHAT_STATUS.COLORS];

// Status Icons
export type LiveChatStatusIcon =
  (typeof LIVE_CHAT_STATUS.ICONS)[keyof typeof LIVE_CHAT_STATUS.ICONS];

// Status Transitions
export type LiveChatStatusTransition =
  (typeof LIVE_CHAT_STATUS.TRANSITIONS)[keyof typeof LIVE_CHAT_STATUS.TRANSITIONS];

// Utility Functions
export function liveChatStatusGetLabel(status: LiveChatStatusType): string {
  const labels: Record<LiveChatStatusType, string> = {
    [LIVE_CHAT_STATUS.TYPES.PENDING]: 'Pending',
    [LIVE_CHAT_STATUS.TYPES.ACTIVE]: 'Active',
    [LIVE_CHAT_STATUS.TYPES.INACTIVE]: 'Inactive',
    [LIVE_CHAT_STATUS.TYPES.CLOSED]: 'Closed',
    [LIVE_CHAT_STATUS.TYPES.ESCALATED]: 'Escalated',
    [LIVE_CHAT_STATUS.TYPES.TRANSFERRED]: 'Transferred',
    [LIVE_CHAT_STATUS.TYPES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function liveChatStatusIsActive(status: LiveChatStatusType): boolean {
  return status === LIVE_CHAT_STATUS.TYPES.ACTIVE;
}

export function liveChatStatusIsEnded(status: LiveChatStatusType): boolean {
  return status === LIVE_CHAT_STATUS.TYPES.CLOSED || status === LIVE_CHAT_STATUS.TYPES.ARCHIVED;
}

export function liveChatStatusGetCategory(status: LiveChatStatusType): LiveChatStatusCategory {
  const categories: Record<LiveChatStatusType, LiveChatStatusCategory> = {
    [LIVE_CHAT_STATUS.TYPES.PENDING]: LIVE_CHAT_STATUS.CATEGORIES.PENDING,
    [LIVE_CHAT_STATUS.TYPES.ACTIVE]: LIVE_CHAT_STATUS.CATEGORIES.ACTIVE,
    [LIVE_CHAT_STATUS.TYPES.INACTIVE]: LIVE_CHAT_STATUS.CATEGORIES.ACTIVE,
    [LIVE_CHAT_STATUS.TYPES.CLOSED]: LIVE_CHAT_STATUS.CATEGORIES.ENDED,
    [LIVE_CHAT_STATUS.TYPES.ESCALATED]: LIVE_CHAT_STATUS.CATEGORIES.ACTIVE,
    [LIVE_CHAT_STATUS.TYPES.TRANSFERRED]: LIVE_CHAT_STATUS.CATEGORIES.ENDED,
    [LIVE_CHAT_STATUS.TYPES.ARCHIVED]: LIVE_CHAT_STATUS.CATEGORIES.ENDED,
  };
  return categories[status] || LIVE_CHAT_STATUS.CATEGORIES.PENDING;
}

export function liveChatStatusCanTransition(
  status: LiveChatStatusType,
  transition: LiveChatStatusTransition
): boolean {
  const allowedTransitions: Record<LiveChatStatusType, LiveChatStatusTransition[]> = {
    [LIVE_CHAT_STATUS.TYPES.PENDING]: [
      LIVE_CHAT_STATUS.TRANSITIONS.PENDING_TO_ACTIVE,
      LIVE_CHAT_STATUS.TRANSITIONS.PENDING_TO_CLOSED,
    ],
    [LIVE_CHAT_STATUS.TYPES.ACTIVE]: [
      LIVE_CHAT_STATUS.TRANSITIONS.ACTIVE_TO_INACTIVE,
      LIVE_CHAT_STATUS.TRANSITIONS.ACTIVE_TO_CLOSED,
      LIVE_CHAT_STATUS.TRANSITIONS.ACTIVE_TO_ESCALATED,
      LIVE_CHAT_STATUS.TRANSITIONS.ACTIVE_TO_TRANSFERRED,
    ],
    [LIVE_CHAT_STATUS.TYPES.INACTIVE]: [
      LIVE_CHAT_STATUS.TRANSITIONS.INACTIVE_TO_ACTIVE,
      LIVE_CHAT_STATUS.TRANSITIONS.ACTIVE_TO_CLOSED,
    ],
    [LIVE_CHAT_STATUS.TYPES.ESCALATED]: [
      LIVE_CHAT_STATUS.TRANSITIONS.ESCALATED_TO_CLOSED,
      LIVE_CHAT_STATUS.TRANSITIONS.ESCALATED_TO_ACTIVE,
    ],
    [LIVE_CHAT_STATUS.TYPES.TRANSFERRED]: [LIVE_CHAT_STATUS.TRANSITIONS.TRANSFERRED_TO_ACTIVE],
    [LIVE_CHAT_STATUS.TYPES.CLOSED]: [LIVE_CHAT_STATUS.TRANSITIONS.CLOSED_TO_ARCHIVED],
    [LIVE_CHAT_STATUS.TYPES.ARCHIVED]: [],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
