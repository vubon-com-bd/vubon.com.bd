export const MESSAGE_TYPE = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  LOCATION: 'location',
  CONTACT: 'contact',
  SYSTEM: 'system',
  TEMPLATE: 'template',
  RICH: 'rich',
} as const;

export const MESSAGE_STATUS = {
  PENDING: 'pending',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  DELETED: 'deleted',
} as const;

export const MESSAGE_SENDER_TYPE = {
  CUSTOMER: 'customer',
  AGENT: 'agent',
  SYSTEM: 'system',
  BOT: 'bot',
} as const;

export const MESSAGE = {
  TYPE: MESSAGE_TYPE,
  STATUS: MESSAGE_STATUS,
  SENDER_TYPE: MESSAGE_SENDER_TYPE,
  TEXT_MAX_LENGTH: 10000,
  MAX_ATTACHMENTS: 10,
  MAX_ATTACHMENT_SIZE_MB: 25,
  EDIT_WINDOW_MINUTES: 15,
  DELETE_WINDOW_MINUTES: 60,
  RETENTION_DAYS: 730,
} as const;

export const SUPPORT_MESSAGE_TEMPLATE = {
  TICKET_CREATED: 'ticket_created',
  TICKET_ASSIGNED: 'ticket_assigned',
  TICKET_ESCALATED: 'ticket_escalated',
  TICKET_RESOLVED: 'ticket_resolved',
  TICKET_CLOSED: 'ticket_closed',
  TICKET_REOPENED: 'ticket_reopened',
  AGENT_REPLIED: 'agent_replied',
  CUSTOMER_REPLIED: 'customer_replied',
  FEEDBACK_REQUEST: 'feedback_request',
  SLA_BREACH: 'sla_breach',
  AUTO_REPLY: 'auto_reply',
  WELCOME_MESSAGE: 'welcome_message',
  AWAY_MESSAGE: 'away_message',
} as const;

export type MessageTypeType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE];
export type MessageStatusType = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];
export type MessageSenderTypeType = (typeof MESSAGE_SENDER_TYPE)[keyof typeof MESSAGE_SENDER_TYPE];
