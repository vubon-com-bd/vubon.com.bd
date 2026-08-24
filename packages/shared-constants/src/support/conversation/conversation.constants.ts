/**
 * Conversation Constants
 * Configuration for support conversations
 */

export const CONVERSATION = {
  // Conversation Types
  TYPES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    GROUP: 'group',
    DIRECT: 'direct',
    SUPPORT: 'support',
    SALES: 'sales',
    TECHNICAL: 'technical',
    GENERAL: 'general',
  } as const,

  // Conversation Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    CLOSED: 'closed',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    MUTED: 'muted',
    LOCKED: 'locked',
    DELETED: 'deleted',
  } as const,

  // Conversation Contexts
  CONTEXTS: {
    TICKET: 'ticket',
    ORDER: 'order',
    SUPPORT: 'support',
    SALES: 'sales',
    COMPLAINT: 'complaint',
    FEEDBACK: 'feedback',
    GENERAL: 'general',
  } as const,

  // Conversation Limits
  LIMITS: {
    MAX_PARTICIPANTS: 50,
    MAX_MESSAGES_PER_DAY: 1000,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE: 10485760, // 10MB
    MAX_MESSAGE_LENGTH: 10000,
    MAX_CONVERSATIONS_PER_USER: 100,
  } as const,

  // Conversation Timeouts (in minutes)
  TIMEOUTS: {
    INACTIVE: 30,
    PENDING: 1440, // 24 hours
    LOCKED: 60,
  } as const,
} as const;

// Conversation Types
export type ConversationType = (typeof CONVERSATION.TYPES)[keyof typeof CONVERSATION.TYPES];

// Conversation Status
export type ConversationStatus = (typeof CONVERSATION.STATUS)[keyof typeof CONVERSATION.STATUS];

// Conversation Contexts
export type ConversationContext =
  (typeof CONVERSATION.CONTEXTS)[keyof typeof CONVERSATION.CONTEXTS];

// Utility Functions
export function conversationGetTypeLabel(type: ConversationType): string {
  const labels: Record<ConversationType, string> = {
    [CONVERSATION.TYPES.PUBLIC]: 'Public',
    [CONVERSATION.TYPES.PRIVATE]: 'Private',
    [CONVERSATION.TYPES.GROUP]: 'Group',
    [CONVERSATION.TYPES.DIRECT]: 'Direct',
    [CONVERSATION.TYPES.SUPPORT]: 'Support',
    [CONVERSATION.TYPES.SALES]: 'Sales',
    [CONVERSATION.TYPES.TECHNICAL]: 'Technical',
    [CONVERSATION.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown';
}

export function conversationGetStatusLabel(status: ConversationStatus): string {
  const labels: Record<ConversationStatus, string> = {
    [CONVERSATION.STATUS.ACTIVE]: 'Active',
    [CONVERSATION.STATUS.INACTIVE]: 'Inactive',
    [CONVERSATION.STATUS.CLOSED]: 'Closed',
    [CONVERSATION.STATUS.ARCHIVED]: 'Archived',
    [CONVERSATION.STATUS.PENDING]: 'Pending',
    [CONVERSATION.STATUS.MUTED]: 'Muted',
    [CONVERSATION.STATUS.LOCKED]: 'Locked',
    [CONVERSATION.STATUS.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function conversationIsActive(status: ConversationStatus): boolean {
  return status === CONVERSATION.STATUS.ACTIVE;
}

export function conversationIsClosed(status: ConversationStatus): boolean {
  return status === CONVERSATION.STATUS.CLOSED || status === CONVERSATION.STATUS.ARCHIVED;
}

export function conversationGetDuration(startTime: Date, endTime: Date): number {
  return (endTime.getTime() - startTime.getTime()) / (1000 * 60); // minutes
}
