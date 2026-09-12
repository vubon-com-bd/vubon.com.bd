/**
 * Support Message Constants
 * @module shared-constants/support/message
 *
 * Contains TWO things:
 * 1. SUPPORT_MESSAGE — text templates for support notifications
 * 2. MESSAGE — entity enums (STATUS, TYPES) for chat Message entity
 */

/**
 * Support message text templates (used in support notifications).
 */
export const SUPPORT_MESSAGE = {
  TICKET_CREATED: 'Support ticket created',
  TICKET_UPDATED: 'Support ticket updated',
  TICKET_RESOLVED: 'Support ticket resolved',
  TICKET_CLOSED: 'Support ticket closed',
  TICKET_ESCALATED: 'Support ticket escalated',
  REPLY_RECEIVED: 'New reply received',
  AGENT_ASSIGNED: 'Agent assigned to your ticket',
  AWAITING_RESPONSE: 'Awaiting your response',
} as const;

export type SupportMessage = (typeof SUPPORT_MESSAGE)[keyof typeof SUPPORT_MESSAGE];

/**
 * Message entity enums — for chat/conversation Message entity.
 * Note: Kept local to support to avoid collision with common MESSAGE.
 */
export const MESSAGE = {
  STATUS: {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    DELETED: 'deleted',
    ARCHIVED: 'archived',
  },

  TYPES: {
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    FILE: 'file',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    SYSTEM: 'system',
  },

  MAX_MESSAGE_LENGTH: 10000,
  MAX_MEDIA_MESSAGE_SIZE_MB: 10,
  SUPPORTED_MEDIA_TYPES: ['image', 'video', 'audio', 'document'],
} as const;

export type MessageStatus = (typeof MESSAGE.STATUS)[keyof typeof MESSAGE.STATUS];
export type MessageType = (typeof MESSAGE.TYPES)[keyof typeof MESSAGE.TYPES];
