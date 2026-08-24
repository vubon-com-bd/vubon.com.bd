/**
 * Support Agent Status Constants
 * Status definitions for support agents
 */

export const SUPPORT_AGENT_STATUS = {
  // Status Types
  TYPES: {
    AVAILABLE: 'available',
    BUSY: 'busy',
    OFFLINE: 'offline',
    AWAY: 'away',
    DO_NOT_DISTURB: 'do_not_disturb',
    IN_MEETING: 'in_meeting',
    ON_BREAK: 'on_break',
    TRAINING: 'training',
    ON_LEAVE: 'on_leave',
  } as const,

  // Status Categories
  CATEGORIES: {
    ONLINE: 'online',
    OFFLINE: 'offline',
    BUSY: 'busy',
    UNAVAILABLE: 'unavailable',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    AVAILABLE: '#green-500',
    BUSY: '#red-500',
    OFFLINE: '#gray-500',
    AWAY: '#yellow-500',
    DO_NOT_DISTURB: '#red-600',
    IN_MEETING: '#purple-500',
    ON_BREAK: '#orange-500',
    TRAINING: '#blue-500',
    ON_LEAVE: '#gray-600',
  } as const,

  // Status Icons (for UI)
  ICONS: {
    AVAILABLE: '🟢',
    BUSY: '🔴',
    OFFLINE: '⚪',
    AWAY: '🟡',
    DO_NOT_DISTURB: '⛔',
    IN_MEETING: '📅',
    ON_BREAK: '☕',
    TRAINING: '📚',
    ON_LEAVE: '🏖️',
  } as const,

  // Status Transitions
  TRANSITIONS: {
    AVAILABLE_TO_BUSY: 'available_to_busy',
    AVAILABLE_TO_AWAY: 'available_to_away',
    AVAILABLE_TO_DND: 'available_to_dnd',
    AVAILABLE_TO_OFFLINE: 'available_to_offline',
    BUSY_TO_AVAILABLE: 'busy_to_available',
    BUSY_TO_AWAY: 'busy_to_away',
    AWAY_TO_AVAILABLE: 'away_to_available',
    AWAY_TO_BUSY: 'away_to_busy',
    DND_TO_AVAILABLE: 'dnd_to_available',
    DND_TO_BUSY: 'dnd_to_busy',
    OFFLINE_TO_AVAILABLE: 'offline_to_available',
    MEETING_TO_AVAILABLE: 'meeting_to_available',
    BREAK_TO_AVAILABLE: 'break_to_available',
    TRAINING_TO_AVAILABLE: 'training_to_available',
    LEAVE_TO_OFFLINE: 'leave_to_offline',
  } as const,
} as const;

// Status Types
export type SupportAgentStatusType =
  (typeof SUPPORT_AGENT_STATUS.TYPES)[keyof typeof SUPPORT_AGENT_STATUS.TYPES];

// Status Categories
export type SupportAgentStatusCategory =
  (typeof SUPPORT_AGENT_STATUS.CATEGORIES)[keyof typeof SUPPORT_AGENT_STATUS.CATEGORIES];

// Status Colors
export type SupportAgentStatusColor =
  (typeof SUPPORT_AGENT_STATUS.COLORS)[keyof typeof SUPPORT_AGENT_STATUS.COLORS];

// Status Icons
export type SupportAgentStatusIcon =
  (typeof SUPPORT_AGENT_STATUS.ICONS)[keyof typeof SUPPORT_AGENT_STATUS.ICONS];

// Status Transitions
export type SupportAgentStatusTransition =
  (typeof SUPPORT_AGENT_STATUS.TRANSITIONS)[keyof typeof SUPPORT_AGENT_STATUS.TRANSITIONS];

// Utility Functions
export function supportAgentStatusGetLabel(status: SupportAgentStatusType): string {
  const labels: Record<SupportAgentStatusType, string> = {
    [SUPPORT_AGENT_STATUS.TYPES.AVAILABLE]: 'Available',
    [SUPPORT_AGENT_STATUS.TYPES.BUSY]: 'Busy',
    [SUPPORT_AGENT_STATUS.TYPES.OFFLINE]: 'Offline',
    [SUPPORT_AGENT_STATUS.TYPES.AWAY]: 'Away',
    [SUPPORT_AGENT_STATUS.TYPES.DO_NOT_DISTURB]: 'Do Not Disturb',
    [SUPPORT_AGENT_STATUS.TYPES.IN_MEETING]: 'In Meeting',
    [SUPPORT_AGENT_STATUS.TYPES.ON_BREAK]: 'On Break',
    [SUPPORT_AGENT_STATUS.TYPES.TRAINING]: 'Training',
    [SUPPORT_AGENT_STATUS.TYPES.ON_LEAVE]: 'On Leave',
  };
  return labels[status] || 'Unknown';
}

export function supportAgentStatusIsAvailable(status: SupportAgentStatusType): boolean {
  return status === SUPPORT_AGENT_STATUS.TYPES.AVAILABLE;
}

export function supportAgentStatusIsOnline(status: SupportAgentStatusType): boolean {
  const onlineStatuses: SupportAgentStatusType[] = [
    SUPPORT_AGENT_STATUS.TYPES.AVAILABLE,
    SUPPORT_AGENT_STATUS.TYPES.BUSY,
    SUPPORT_AGENT_STATUS.TYPES.AWAY,
    SUPPORT_AGENT_STATUS.TYPES.DO_NOT_DISTURB,
  ];
  return onlineStatuses.includes(status);
}

export function supportAgentStatusCanHandleWork(status: SupportAgentStatusType): boolean {
  const workStatuses: SupportAgentStatusType[] = [
    SUPPORT_AGENT_STATUS.TYPES.AVAILABLE,
    SUPPORT_AGENT_STATUS.TYPES.BUSY,
  ];
  return workStatuses.includes(status);
}

export function supportAgentStatusGetCategory(
  status: SupportAgentStatusType
): SupportAgentStatusCategory {
  const categories: Record<SupportAgentStatusType, SupportAgentStatusCategory> = {
    [SUPPORT_AGENT_STATUS.TYPES.AVAILABLE]: SUPPORT_AGENT_STATUS.CATEGORIES.ONLINE,
    [SUPPORT_AGENT_STATUS.TYPES.BUSY]: SUPPORT_AGENT_STATUS.CATEGORIES.BUSY,
    [SUPPORT_AGENT_STATUS.TYPES.OFFLINE]: SUPPORT_AGENT_STATUS.CATEGORIES.OFFLINE,
    [SUPPORT_AGENT_STATUS.TYPES.AWAY]: SUPPORT_AGENT_STATUS.CATEGORIES.ONLINE,
    [SUPPORT_AGENT_STATUS.TYPES.DO_NOT_DISTURB]: SUPPORT_AGENT_STATUS.CATEGORIES.UNAVAILABLE,
    [SUPPORT_AGENT_STATUS.TYPES.IN_MEETING]: SUPPORT_AGENT_STATUS.CATEGORIES.UNAVAILABLE,
    [SUPPORT_AGENT_STATUS.TYPES.ON_BREAK]: SUPPORT_AGENT_STATUS.CATEGORIES.UNAVAILABLE,
    [SUPPORT_AGENT_STATUS.TYPES.TRAINING]: SUPPORT_AGENT_STATUS.CATEGORIES.UNAVAILABLE,
    [SUPPORT_AGENT_STATUS.TYPES.ON_LEAVE]: SUPPORT_AGENT_STATUS.CATEGORIES.OFFLINE,
  };
  return categories[status] || SUPPORT_AGENT_STATUS.CATEGORIES.OFFLINE;
}

export function supportAgentStatusCanTransition(
  status: SupportAgentStatusType,
  transition: SupportAgentStatusTransition
): boolean {
  const allowedTransitions: Record<SupportAgentStatusType, SupportAgentStatusTransition[]> = {
    [SUPPORT_AGENT_STATUS.TYPES.AVAILABLE]: [
      SUPPORT_AGENT_STATUS.TRANSITIONS.AVAILABLE_TO_BUSY,
      SUPPORT_AGENT_STATUS.TRANSITIONS.AVAILABLE_TO_AWAY,
      SUPPORT_AGENT_STATUS.TRANSITIONS.AVAILABLE_TO_DND,
      SUPPORT_AGENT_STATUS.TRANSITIONS.AVAILABLE_TO_OFFLINE,
    ],
    [SUPPORT_AGENT_STATUS.TYPES.BUSY]: [
      SUPPORT_AGENT_STATUS.TRANSITIONS.BUSY_TO_AVAILABLE,
      SUPPORT_AGENT_STATUS.TRANSITIONS.BUSY_TO_AWAY,
    ],
    [SUPPORT_AGENT_STATUS.TYPES.AWAY]: [
      SUPPORT_AGENT_STATUS.TRANSITIONS.AWAY_TO_AVAILABLE,
      SUPPORT_AGENT_STATUS.TRANSITIONS.AWAY_TO_BUSY,
    ],
    [SUPPORT_AGENT_STATUS.TYPES.DO_NOT_DISTURB]: [
      SUPPORT_AGENT_STATUS.TRANSITIONS.DND_TO_AVAILABLE,
      SUPPORT_AGENT_STATUS.TRANSITIONS.DND_TO_BUSY,
    ],
    [SUPPORT_AGENT_STATUS.TYPES.OFFLINE]: [SUPPORT_AGENT_STATUS.TRANSITIONS.OFFLINE_TO_AVAILABLE],
    [SUPPORT_AGENT_STATUS.TYPES.IN_MEETING]: [
      SUPPORT_AGENT_STATUS.TRANSITIONS.MEETING_TO_AVAILABLE,
    ],
    [SUPPORT_AGENT_STATUS.TYPES.ON_BREAK]: [SUPPORT_AGENT_STATUS.TRANSITIONS.BREAK_TO_AVAILABLE],
    [SUPPORT_AGENT_STATUS.TYPES.TRAINING]: [SUPPORT_AGENT_STATUS.TRANSITIONS.TRAINING_TO_AVAILABLE],
    [SUPPORT_AGENT_STATUS.TYPES.ON_LEAVE]: [SUPPORT_AGENT_STATUS.TRANSITIONS.LEAVE_TO_OFFLINE],
  };
  return allowedTransitions[status]?.includes(transition) || false;
}
