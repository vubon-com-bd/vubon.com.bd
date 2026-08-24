/**
 * Live Chat Session Constants
 * Configuration for live chat sessions
 */

export const LIVE_CHAT_SESSION = {
  // Session Types
  TYPES: {
    SUPPORT: 'support',
    SALES: 'sales',
    TECHNICAL: 'technical',
    GENERAL: 'general',
    BILLING: 'billing',
    COMPLAINT: 'complaint',
  } as const,

  // Session Statuses
  STATUS: {
    INITIATED: 'initiated',
    QUEUED: 'queued',
    CONNECTED: 'connected',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    ESCALATED: 'escalated',
    TRANSFERRED: 'transferred',
  } as const,

  // Session Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Session Metrics
  METRICS: {
    AVERAGE_WAIT_TIME: 60, // seconds
    AVERAGE_DURATION: 300, // seconds
    MAX_QUEUE_SIZE: 50,
    MAX_SESSIONS_PER_AGENT: 5,
  } as const,

  // Session Events
  EVENTS: {
    INITIATED: 'session:initiated',
    QUEUED: 'session:queued',
    CONNECTED: 'session:connected',
    ACTIVE: 'session:active',
    PAUSED: 'session:paused',
    RESUMED: 'session:resumed',
    ENDED: 'session:ended',
    ESCALATED: 'session:escalated',
    TRANSFERRED: 'session:transferred',
    TIMEOUT: 'session:timeout',
    RECONNECTED: 'session:reconnected',
  } as const,

  // Session Ratings
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 3,
  } as const,
} as const;

// Session Types
export type LiveChatSessionType =
  (typeof LIVE_CHAT_SESSION.TYPES)[keyof typeof LIVE_CHAT_SESSION.TYPES];

// Session Statuses
export type LiveChatSessionStatus =
  (typeof LIVE_CHAT_SESSION.STATUS)[keyof typeof LIVE_CHAT_SESSION.STATUS];

// Session Priorities
export type LiveChatSessionPriority =
  (typeof LIVE_CHAT_SESSION.PRIORITY)[keyof typeof LIVE_CHAT_SESSION.PRIORITY];

// Session Events
export type LiveChatSessionEvent =
  (typeof LIVE_CHAT_SESSION.EVENTS)[keyof typeof LIVE_CHAT_SESSION.EVENTS];

// Utility Functions
export function liveChatSessionGetTypeLabel(type: LiveChatSessionType): string {
  const labels: Record<LiveChatSessionType, string> = {
    [LIVE_CHAT_SESSION.TYPES.SUPPORT]: 'Support',
    [LIVE_CHAT_SESSION.TYPES.SALES]: 'Sales',
    [LIVE_CHAT_SESSION.TYPES.TECHNICAL]: 'Technical',
    [LIVE_CHAT_SESSION.TYPES.GENERAL]: 'General',
    [LIVE_CHAT_SESSION.TYPES.BILLING]: 'Billing',
    [LIVE_CHAT_SESSION.TYPES.COMPLAINT]: 'Complaint',
  };
  return labels[type] || 'Unknown';
}

export function liveChatSessionGetStatusLabel(status: LiveChatSessionStatus): string {
  const labels: Record<LiveChatSessionStatus, string> = {
    [LIVE_CHAT_SESSION.STATUS.INITIATED]: 'Initiated',
    [LIVE_CHAT_SESSION.STATUS.QUEUED]: 'Queued',
    [LIVE_CHAT_SESSION.STATUS.CONNECTED]: 'Connected',
    [LIVE_CHAT_SESSION.STATUS.ACTIVE]: 'Active',
    [LIVE_CHAT_SESSION.STATUS.PAUSED]: 'Paused',
    [LIVE_CHAT_SESSION.STATUS.ENDED]: 'Ended',
    [LIVE_CHAT_SESSION.STATUS.ESCALATED]: 'Escalated',
    [LIVE_CHAT_SESSION.STATUS.TRANSFERRED]: 'Transferred',
  };
  return labels[status] || 'Unknown';
}

export function liveChatSessionGetPriorityLabel(priority: LiveChatSessionPriority): string {
  const labels: Record<LiveChatSessionPriority, string> = {
    [LIVE_CHAT_SESSION.PRIORITY.CRITICAL]: 'Critical',
    [LIVE_CHAT_SESSION.PRIORITY.HIGH]: 'High',
    [LIVE_CHAT_SESSION.PRIORITY.MEDIUM]: 'Medium',
    [LIVE_CHAT_SESSION.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function liveChatSessionIsActive(status: LiveChatSessionStatus): boolean {
  return (
    status === LIVE_CHAT_SESSION.STATUS.CONNECTED || status === LIVE_CHAT_SESSION.STATUS.ACTIVE
  );
}

export function liveChatSessionIsEnded(status: LiveChatSessionStatus): boolean {
  return status === LIVE_CHAT_SESSION.STATUS.ENDED;
}

export function liveChatSessionCanTransfer(status: LiveChatSessionStatus): boolean {
  const transferableStatuses: LiveChatSessionStatus[] = [
    LIVE_CHAT_SESSION.STATUS.CONNECTED,
    LIVE_CHAT_SESSION.STATUS.ACTIVE,
  ];
  return transferableStatuses.includes(status);
}

export function liveChatSessionCanEscalate(status: LiveChatSessionStatus): boolean {
  const escalatableStatuses: LiveChatSessionStatus[] = [
    LIVE_CHAT_SESSION.STATUS.CONNECTED,
    LIVE_CHAT_SESSION.STATUS.ACTIVE,
    LIVE_CHAT_SESSION.STATUS.QUEUED,
  ];
  return escalatableStatuses.includes(status);
}
