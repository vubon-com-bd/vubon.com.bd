/**
 * Message Type Constants
 * Types of messages in support system
 */

export const MESSAGE_TYPE = {
  // Type Types
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

  // Type Categories
  CATEGORIES: {
    CONTENT: 'content',
    MEDIA: 'media',
    SYSTEM: 'system',
    NOTE: 'note',
  } as const,

  // Type Icons (for UI)
  ICONS: {
    TEXT: '📝',
    IMAGE: '🖼️',
    VIDEO: '🎬',
    AUDIO: '🎵',
    FILE: '📎',
    SYSTEM: '⚙️',
    NOTE: '📋',
    INTERNAL: '🔒',
    TEMPLATE: '📄',
  } as const,

  // Type Colors (for UI)
  COLORS: {
    TEXT: '#blue-500',
    IMAGE: '#green-500',
    VIDEO: '#red-500',
    AUDIO: '#purple-500',
    FILE: '#gray-500',
    SYSTEM: '#yellow-500',
    NOTE: '#orange-500',
    INTERNAL: '#red-600',
    TEMPLATE: '#indigo-500',
  } as const,

  // Type Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INTERNAL: 'internal',
  } as const,
} as const;

// Type Types
export type MessageTypeType = (typeof MESSAGE_TYPE.TYPES)[keyof typeof MESSAGE_TYPE.TYPES];

// Type Categories
export type MessageTypeCategory =
  (typeof MESSAGE_TYPE.CATEGORIES)[keyof typeof MESSAGE_TYPE.CATEGORIES];

// Type Icons
export type MessageTypeIcon = (typeof MESSAGE_TYPE.ICONS)[keyof typeof MESSAGE_TYPE.ICONS];

// Type Colors
export type MessageTypeColor = (typeof MESSAGE_TYPE.COLORS)[keyof typeof MESSAGE_TYPE.COLORS];

// Type Visibility
export type MessageTypeVisibility =
  (typeof MESSAGE_TYPE.VISIBILITY)[keyof typeof MESSAGE_TYPE.VISIBILITY];

// Utility Functions
export function messageTypeGetLabel(type: MessageTypeType): string {
  const labels: Record<MessageTypeType, string> = {
    [MESSAGE_TYPE.TYPES.TEXT]: 'Text',
    [MESSAGE_TYPE.TYPES.IMAGE]: 'Image',
    [MESSAGE_TYPE.TYPES.VIDEO]: 'Video',
    [MESSAGE_TYPE.TYPES.AUDIO]: 'Audio',
    [MESSAGE_TYPE.TYPES.FILE]: 'File',
    [MESSAGE_TYPE.TYPES.SYSTEM]: 'System',
    [MESSAGE_TYPE.TYPES.NOTE]: 'Note',
    [MESSAGE_TYPE.TYPES.INTERNAL]: 'Internal',
    [MESSAGE_TYPE.TYPES.TEMPLATE]: 'Template',
  };
  return labels[type] || 'Unknown';
}

export function messageTypeGetIcon(type: MessageTypeType): MessageTypeIcon {
  const icons: Record<MessageTypeType, MessageTypeIcon> = {
    [MESSAGE_TYPE.TYPES.TEXT]: MESSAGE_TYPE.ICONS.TEXT,
    [MESSAGE_TYPE.TYPES.IMAGE]: MESSAGE_TYPE.ICONS.IMAGE,
    [MESSAGE_TYPE.TYPES.VIDEO]: MESSAGE_TYPE.ICONS.VIDEO,
    [MESSAGE_TYPE.TYPES.AUDIO]: MESSAGE_TYPE.ICONS.AUDIO,
    [MESSAGE_TYPE.TYPES.FILE]: MESSAGE_TYPE.ICONS.FILE,
    [MESSAGE_TYPE.TYPES.SYSTEM]: MESSAGE_TYPE.ICONS.SYSTEM,
    [MESSAGE_TYPE.TYPES.NOTE]: MESSAGE_TYPE.ICONS.NOTE,
    [MESSAGE_TYPE.TYPES.INTERNAL]: MESSAGE_TYPE.ICONS.INTERNAL,
    [MESSAGE_TYPE.TYPES.TEMPLATE]: MESSAGE_TYPE.ICONS.TEMPLATE,
  };
  return icons[type] || '📝';
}

export function messageTypeIsMedia(type: MessageTypeType): boolean {
  const mediaTypes: MessageTypeType[] = [
    MESSAGE_TYPE.TYPES.IMAGE,
    MESSAGE_TYPE.TYPES.VIDEO,
    MESSAGE_TYPE.TYPES.AUDIO,
    MESSAGE_TYPE.TYPES.FILE,
  ];
  return mediaTypes.includes(type);
}

export function messageTypeIsSystem(type: MessageTypeType): boolean {
  return type === MESSAGE_TYPE.TYPES.SYSTEM;
}

export function messageTypeIsInternal(type: MessageTypeType): boolean {
  return type === MESSAGE_TYPE.TYPES.INTERNAL;
}
