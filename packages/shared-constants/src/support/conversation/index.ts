/**
 * Conversation Constants Index
 * Export all conversation constants and types for easy importing
 */

// Conversation Constants
export {
  CONVERSATION,
  conversationGetTypeLabel,
  conversationGetStatusLabel,
  conversationIsActive,
  conversationIsClosed,
  conversationGetDuration,
} from './conversation.constants';

export type {
  ConversationType,
  ConversationStatus,
  ConversationContext,
} from './conversation.constants';

// Conversation Type Constants
export {
  CONVERSATION_TYPE,
  conversationTypeGetLabel,
  conversationTypeGetIcon,
  conversationTypeIsPublic,
  conversationTypeIsPrivate,
  conversationTypeIsGroup,
} from './conversation-type.constants';

export type {
  ConversationTypeType,
  ConversationTypeCategory,
  ConversationTypeIcon,
  ConversationTypeColor,
  ConversationTypeVisibility,
} from './conversation-type.constants';

// Conversation Status Constants
export {
  CONVERSATION_STATUS,
  conversationStatusGetLabel,
  conversationStatusIsActive,
  conversationStatusIsClosed,
  conversationStatusIsPending,
  conversationStatusGetCategory,
  conversationStatusIsResolved,
} from './conversation-status.constants';

export type {
  ConversationStatusType,
  ConversationStatusCategory,
  ConversationStatusColor,
  ConversationStatusIcon,
  ConversationStatusTransition,
} from './conversation-status.constants';
