/**
 * Live Chat Constants
 * Configuration for live chat system
 */

export const LIVE_CHAT = {
  // Chat Types
  TYPES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    SUPPORT: 'support',
    SALES: 'sales',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // Chat Statuses
  STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    ESCALATED: 'escalated',
    TRANSFERRED: 'transferred',
    ARCHIVED: 'archived',
  } as const,

  // Chat Channels
  CHANNELS: {
    WEBSITE: 'website',
    APP: 'app',
    FACEBOOK: 'facebook',
    MESSENGER: 'messenger',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    SLACK: 'slack',
    DISCORD: 'discord',
  } as const,

  // Chat Limits
  LIMITS: {
    MAX_MESSAGES_PER_SESSION: 1000,
    MAX_CHARS_PER_MESSAGE: 10000,
    MAX_ATTACHMENTS: 5,
    MAX_SESSION_DURATION: 3600, // 1 hour
    MAX_SESSIONS_PER_AGENT: 5,
    MAX_QUEUE_SIZE: 100,
    MAX_WAIT_TIME: 300, // 5 minutes
  } as const,

  // Chat Timeouts (in seconds)
  TIMEOUTS: {
    SESSION: 3600,
    INACTIVITY: 300,
    TYPING: 30,
    RECONNECT: 60,
  } as const,

  // Transfer Reasons
  TRANSFER_REASONS: {
    ESCALATION: 'escalation',
    SKILL_MATCH: 'skill_match',
    LOAD_BALANCING: 'load_balancing',
    LANGUAGE: 'language',
    DEPARTMENT: 'department',
    CUSTOMER_REQUEST: 'customer_request',
  } as const,
} as const;

// Chat Types
export type LiveChatType = (typeof LIVE_CHAT.TYPES)[keyof typeof LIVE_CHAT.TYPES];

// Chat Statuses
export type LiveChatStatus = (typeof LIVE_CHAT.STATUS)[keyof typeof LIVE_CHAT.STATUS];

// Chat Channels
export type LiveChatChannel = (typeof LIVE_CHAT.CHANNELS)[keyof typeof LIVE_CHAT.CHANNELS];

// Transfer Reasons
export type LiveChatTransferReason =
  (typeof LIVE_CHAT.TRANSFER_REASONS)[keyof typeof LIVE_CHAT.TRANSFER_REASONS];

// Utility Functions
export function liveChatGetTypeLabel(type: LiveChatType): string {
  const labels: Record<LiveChatType, string> = {
    [LIVE_CHAT.TYPES.PUBLIC]: 'Public',
    [LIVE_CHAT.TYPES.PRIVATE]: 'Private',
    [LIVE_CHAT.TYPES.SUPPORT]: 'Support',
    [LIVE_CHAT.TYPES.SALES]: 'Sales',
    [LIVE_CHAT.TYPES.TECHNICAL]: 'Technical',
    [LIVE_CHAT.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown';
}

export function liveChatGetStatusLabel(status: LiveChatStatus): string {
  const labels: Record<LiveChatStatus, string> = {
    [LIVE_CHAT.STATUS.PENDING]: 'Pending',
    [LIVE_CHAT.STATUS.ACTIVE]: 'Active',
    [LIVE_CHAT.STATUS.INACTIVE]: 'Inactive',
    [LIVE_CHAT.STATUS.CLOSED]: 'Closed',
    [LIVE_CHAT.STATUS.ESCALATED]: 'Escalated',
    [LIVE_CHAT.STATUS.TRANSFERRED]: 'Transferred',
    [LIVE_CHAT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function liveChatGetChannelLabel(channel: LiveChatChannel): string {
  const labels: Record<LiveChatChannel, string> = {
    [LIVE_CHAT.CHANNELS.WEBSITE]: 'Website',
    [LIVE_CHAT.CHANNELS.APP]: 'Mobile App',
    [LIVE_CHAT.CHANNELS.FACEBOOK]: 'Facebook',
    [LIVE_CHAT.CHANNELS.MESSENGER]: 'Messenger',
    [LIVE_CHAT.CHANNELS.WHATSAPP]: 'WhatsApp',
    [LIVE_CHAT.CHANNELS.TELEGRAM]: 'Telegram',
    [LIVE_CHAT.CHANNELS.SLACK]: 'Slack',
    [LIVE_CHAT.CHANNELS.DISCORD]: 'Discord',
  };
  return labels[channel] || 'Unknown';
}

export function liveChatIsActive(status: LiveChatStatus): boolean {
  return status === LIVE_CHAT.STATUS.ACTIVE;
}

export function liveChatIsEnded(status: LiveChatStatus): boolean {
  return status === LIVE_CHAT.STATUS.CLOSED || status === LIVE_CHAT.STATUS.ARCHIVED;
}

export function liveChatCanTransfer(status: LiveChatStatus): boolean {
  return status === LIVE_CHAT.STATUS.ACTIVE || status === LIVE_CHAT.STATUS.PENDING;
}

export function liveChatCanEscalate(status: LiveChatStatus): boolean {
  return status === LIVE_CHAT.STATUS.ACTIVE || status === LIVE_CHAT.STATUS.PENDING;
}
