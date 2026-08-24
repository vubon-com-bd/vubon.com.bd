/**
 * Message Constants Index
 * Export all message constants and types for easy importing
 */

// Message Constants
export {
  MESSAGE,
  messageGetTypeLabel,
  messageGetStatusLabel,
  messageIsDelivered,
  messageIsFailed,
  messageIsDraft,
  messageCanBeEdited,
  messageGetFormatLabel,
} from './message.constants';

export type {
  MessageType,
  MessageStatus,
  MessageDirection,
  MessageFormat,
} from './message.constants';

// Message Type Constants
export {
  MESSAGE_TYPE,
  messageTypeGetLabel,
  messageTypeGetIcon,
  messageTypeIsMedia,
  messageTypeIsSystem,
  messageTypeIsInternal,
} from './message-type.constants';

export type {
  MessageTypeType,
  MessageTypeCategory,
  MessageTypeIcon,
  MessageTypeColor,
  MessageTypeVisibility,
} from './message-type.constants';

// Message Status Constants
export {
  MESSAGE_STATUS,
  messageStatusGetLabel,
  messageStatusIsDelivered,
  messageStatusIsFailed,
  messageStatusIsPending,
  messageStatusGetCategory,
  messageStatusIsFinal,
} from './message-status.constants';

export type {
  MessageStatusType,
  MessageStatusCategory,
  MessageStatusColor,
  MessageStatusIcon,
  MessageStatusTransition,
} from './message-status.constants';
