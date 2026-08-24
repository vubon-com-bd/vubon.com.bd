/**
 * Message Constants
 * Configuration for support messages
 */

export const MESSAGE = {
  // Message Types
  TYPES: {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
    SYSTEM: 'system',
    NOTE: 'note',
    INTERNAL: 'internal',
    TEMPLATE: 'template',
  } as const,

  // Message Statuses
  STATUS: {
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

  // Message Directions
  DIRECTIONS: {
    INBOUND: 'inbound',
    OUTBOUND: 'outbound',
    SYSTEM: 'system',
  } as const,

  // Message Limits
  LIMITS: {
    MAX_TEXT_LENGTH: 10000,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE: 10485760, // 10MB
    MAX_MESSAGES_PER_CONVERSATION: 1000,
    MAX_MESSAGES_PER_DAY: 200,
  } as const,

  // Message Formats
  FORMATS: {
    PLAIN: 'plain',
    MARKDOWN: 'markdown',
    HTML: 'html',
    JSON: 'json',
  } as const,
} as const;

// Message Types
export type MessageType = (typeof MESSAGE.TYPES)[keyof typeof MESSAGE.TYPES];

// Message Statuses
export type MessageStatus = (typeof MESSAGE.STATUS)[keyof typeof MESSAGE.STATUS];

// Message Directions
export type MessageDirection = (typeof MESSAGE.DIRECTIONS)[keyof typeof MESSAGE.DIRECTIONS];

// Message Formats
export type MessageFormat = (typeof MESSAGE.FORMATS)[keyof typeof MESSAGE.FORMATS];

// Utility Functions
export function messageGetTypeLabel(type: MessageType): string {
  const labels: Record<MessageType, string> = {
    [MESSAGE.TYPES.TEXT]: 'Text',
    [MESSAGE.TYPES.IMAGE]: 'Image',
    [MESSAGE.TYPES.VIDEO]: 'Video',
    [MESSAGE.TYPES.AUDIO]: 'Audio',
    [MESSAGE.TYPES.FILE]: 'File',
    [MESSAGE.TYPES.SYSTEM]: 'System',
    [MESSAGE.TYPES.NOTE]: 'Note',
    [MESSAGE.TYPES.INTERNAL]: 'Internal',
    [MESSAGE.TYPES.TEMPLATE]: 'Template',
  };
  return labels[type] || 'Unknown';
}

export function messageGetStatusLabel(status: MessageStatus): string {
  const labels: Record<MessageStatus, string> = {
    [MESSAGE.STATUS.SENT]: 'Sent',
    [MESSAGE.STATUS.DELIVERED]: 'Delivered',
    [MESSAGE.STATUS.READ]: 'Read',
    [MESSAGE.STATUS.FAILED]: 'Failed',
    [MESSAGE.STATUS.PENDING]: 'Pending',
    [MESSAGE.STATUS.DRAFT]: 'Draft',
    [MESSAGE.STATUS.SCHEDULED]: 'Scheduled',
    [MESSAGE.STATUS.EDITED]: 'Edited',
    [MESSAGE.STATUS.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown';
}

export function messageIsDelivered(status: MessageStatus): boolean {
  return status === MESSAGE.STATUS.DELIVERED || status === MESSAGE.STATUS.READ;
}

export function messageIsFailed(status: MessageStatus): boolean {
  return status === MESSAGE.STATUS.FAILED;
}

export function messageIsDraft(status: MessageStatus): boolean {
  return status === MESSAGE.STATUS.DRAFT;
}

export function messageCanBeEdited(status: MessageStatus): boolean {
  const editableStatuses: MessageStatus[] = [
    MESSAGE.STATUS.DRAFT,
    MESSAGE.STATUS.PENDING,
    MESSAGE.STATUS.SCHEDULED,
  ];
  return editableStatuses.includes(status);
}

export function messageGetFormatLabel(format: MessageFormat): string {
  const labels: Record<MessageFormat, string> = {
    [MESSAGE.FORMATS.PLAIN]: 'Plain Text',
    [MESSAGE.FORMATS.MARKDOWN]: 'Markdown',
    [MESSAGE.FORMATS.HTML]: 'HTML',
    [MESSAGE.FORMATS.JSON]: 'JSON',
  };
  return labels[format] || 'Unknown';
}
