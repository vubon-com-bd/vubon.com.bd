/**
 * Live Chat Constants Index
 * Export all live chat constants and types for easy importing
 */

// Live Chat Constants
export {
  LIVE_CHAT,
  liveChatGetTypeLabel,
  liveChatGetStatusLabel,
  liveChatGetChannelLabel,
  liveChatIsActive,
  liveChatIsEnded,
  liveChatCanTransfer,
  liveChatCanEscalate,
} from './live-chat.constants';

export type {
  LiveChatType,
  LiveChatStatus,
  LiveChatChannel,
  LiveChatTransferReason,
} from './live-chat.constants';

// Live Chat Status Constants
export {
  LIVE_CHAT_STATUS,
  liveChatStatusGetLabel,
  liveChatStatusIsActive,
  liveChatStatusIsEnded,
  liveChatStatusGetCategory,
  liveChatStatusCanTransition,
} from './live-chat-status.constants';

export type {
  LiveChatStatusType,
  LiveChatStatusCategory,
  LiveChatStatusColor,
  LiveChatStatusIcon,
  LiveChatStatusTransition,
} from './live-chat-status.constants';

// Live Chat Session Constants
export {
  LIVE_CHAT_SESSION,
  liveChatSessionGetTypeLabel,
  liveChatSessionGetStatusLabel,
  liveChatSessionGetPriorityLabel,
  liveChatSessionIsActive,
  liveChatSessionIsEnded,
  liveChatSessionCanTransfer,
  liveChatSessionCanEscalate,
} from './live-chat-session.constants';

export type {
  LiveChatSessionType,
  LiveChatSessionStatus,
  LiveChatSessionPriority,
  LiveChatSessionEvent,
} from './live-chat-session.constants';
