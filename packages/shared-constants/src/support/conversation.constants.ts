export const CONVERSATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
  CLOSED: 'closed',
  PENDING: 'pending',
  ESCALATED: 'escalated',
} as const;

export const CONVERSATION_TYPE = {
  DIRECT: 'direct',
  GROUP: 'group',
  TICKET: 'ticket',
  CHAT: 'chat',
  EMAIL: 'email',
  THREAD: 'thread',
} as const;

export const CONVERSATION = {
  STATUS: CONVERSATION_STATUS,
  TYPE: CONVERSATION_TYPE,
  TITLE_MAX_LENGTH: 200,
  MAX_PARTICIPANTS: 50,
  MAX_MESSAGES: 10000,
  MAX_ATTACHMENTS: 20,
  MAX_ATTACHMENT_SIZE_MB: 25,
  AUTO_ARCHIVE_DAYS: 90,
  INACTIVE_AFTER_HOURS: 72,
  RETENTION_DAYS: 730,
} as const;

export type ConversationStatusType = (typeof CONVERSATION_STATUS)[keyof typeof CONVERSATION_STATUS];
export type ConversationTypeType = (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];
