/**
 * Conversation Type Constants
 * Types of conversations in support system
 */

export const CONVERSATION_TYPE = {
  // Type Types
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

  // Type Categories
  CATEGORIES: {
    CHANNEL: 'channel',
    PURPOSE: 'purpose',
    AUDIENCE: 'audience',
  } as const,

  // Type Icons (for UI)
  ICONS: {
    PUBLIC: '🌐',
    PRIVATE: '🔒',
    GROUP: '👥',
    DIRECT: '💬',
    SUPPORT: '🆘',
    SALES: '💰',
    TECHNICAL: '🔧',
    GENERAL: '📋',
  } as const,

  // Type Colors (for UI)
  COLORS: {
    PUBLIC: '#blue-500',
    PRIVATE: '#green-500',
    GROUP: '#purple-500',
    DIRECT: '#teal-500',
    SUPPORT: '#red-500',
    SALES: '#gold-500',
    TECHNICAL: '#indigo-500',
    GENERAL: '#gray-500',
  } as const,

  // Type Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    RESTRICTED: 'restricted',
  } as const,
} as const;

// Type Types
export type ConversationTypeType =
  (typeof CONVERSATION_TYPE.TYPES)[keyof typeof CONVERSATION_TYPE.TYPES];

// Type Categories
export type ConversationTypeCategory =
  (typeof CONVERSATION_TYPE.CATEGORIES)[keyof typeof CONVERSATION_TYPE.CATEGORIES];

// Type Icons
export type ConversationTypeIcon =
  (typeof CONVERSATION_TYPE.ICONS)[keyof typeof CONVERSATION_TYPE.ICONS];

// Type Colors
export type ConversationTypeColor =
  (typeof CONVERSATION_TYPE.COLORS)[keyof typeof CONVERSATION_TYPE.COLORS];

// Type Visibility
export type ConversationTypeVisibility =
  (typeof CONVERSATION_TYPE.VISIBILITY)[keyof typeof CONVERSATION_TYPE.VISIBILITY];

// Utility Functions
export function conversationTypeGetLabel(type: ConversationTypeType): string {
  const labels: Record<ConversationTypeType, string> = {
    [CONVERSATION_TYPE.TYPES.PUBLIC]: 'Public',
    [CONVERSATION_TYPE.TYPES.PRIVATE]: 'Private',
    [CONVERSATION_TYPE.TYPES.GROUP]: 'Group',
    [CONVERSATION_TYPE.TYPES.DIRECT]: 'Direct',
    [CONVERSATION_TYPE.TYPES.SUPPORT]: 'Support',
    [CONVERSATION_TYPE.TYPES.SALES]: 'Sales',
    [CONVERSATION_TYPE.TYPES.TECHNICAL]: 'Technical',
    [CONVERSATION_TYPE.TYPES.GENERAL]: 'General',
  };
  return labels[type] || 'Unknown';
}

export function conversationTypeGetIcon(type: ConversationTypeType): ConversationTypeIcon {
  const icons: Record<ConversationTypeType, ConversationTypeIcon> = {
    [CONVERSATION_TYPE.TYPES.PUBLIC]: CONVERSATION_TYPE.ICONS.PUBLIC,
    [CONVERSATION_TYPE.TYPES.PRIVATE]: CONVERSATION_TYPE.ICONS.PRIVATE,
    [CONVERSATION_TYPE.TYPES.GROUP]: CONVERSATION_TYPE.ICONS.GROUP,
    [CONVERSATION_TYPE.TYPES.DIRECT]: CONVERSATION_TYPE.ICONS.DIRECT,
    [CONVERSATION_TYPE.TYPES.SUPPORT]: CONVERSATION_TYPE.ICONS.SUPPORT,
    [CONVERSATION_TYPE.TYPES.SALES]: CONVERSATION_TYPE.ICONS.SALES,
    [CONVERSATION_TYPE.TYPES.TECHNICAL]: CONVERSATION_TYPE.ICONS.TECHNICAL,
    [CONVERSATION_TYPE.TYPES.GENERAL]: CONVERSATION_TYPE.ICONS.GENERAL,
  };
  return icons[type] || '💬';
}

export function conversationTypeIsPublic(type: ConversationTypeType): boolean {
  return type === CONVERSATION_TYPE.TYPES.PUBLIC;
}

export function conversationTypeIsPrivate(type: ConversationTypeType): boolean {
  return type === CONVERSATION_TYPE.TYPES.PRIVATE || type === CONVERSATION_TYPE.TYPES.DIRECT;
}

export function conversationTypeIsGroup(type: ConversationTypeType): boolean {
  return type === CONVERSATION_TYPE.TYPES.GROUP;
}
