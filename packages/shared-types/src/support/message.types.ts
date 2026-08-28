/**
 * Message Types
 * Type definitions for support messages based on shared-constants
 * @module MessageTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support message
// ============================================================
import {
  // Message Core
  MESSAGE,
  MessageType,
  MessageStatus,
  MessageDirection,
  MessageFormat,
  messageGetTypeLabel,
  messageGetStatusLabel,
  messageIsDelivered,
  messageIsFailed,
  messageIsDraft,
  messageCanBeEdited,
  messageGetFormatLabel,
  // Message Type
  MESSAGE_TYPE,
  MessageTypeType,
  MessageTypeCategory,
  MessageTypeIcon,
  MessageTypeColor,
  MessageTypeVisibility,
  messageTypeGetLabel,
  messageTypeGetIcon,
  messageTypeIsMedia,
  messageTypeIsSystem,
  messageTypeIsInternal,
  // Message Status
  MESSAGE_STATUS,
  MessageStatusType,
  MessageStatusCategory,
  MessageStatusColor,
  MessageStatusIcon,
  MessageStatusTransition,
  messageStatusGetLabel,
  messageStatusIsDelivered,
  messageStatusIsFailed,
  messageStatusIsPending,
  messageStatusGetCategory,
  messageStatusIsFinal,
} from '@vubon/shared-constants';

// ============================================================
// Message Extended Types
// ============================================================

/**
 * Message
 */
export interface Message extends BaseEntity, Timestamp {
  id: ID;
  conversationId: ID;
  userId: ID;
  type: MessageType;
  status: MessageStatus;
  direction: MessageDirection;
  format: MessageFormat;
  content: string;
  isDelivered: boolean;
  isFailed: boolean;
  isDraft: boolean;
  canBeEdited: boolean;
  isMedia: boolean;
  isSystem: boolean;
  isInternal: boolean;
  isFinal: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Message filter
 */
export interface MessageFilter {
  ids?: ID[];
  conversationIds?: ID[];
  userIds?: ID[];
  types?: MessageType[];
  statuses?: MessageStatus[];
  directions?: MessageDirection[];
  formats?: MessageFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isDelivered?: boolean;
  isFailed?: boolean;
  isDraft?: boolean;
  canBeEdited?: boolean;
  isMedia?: boolean;
  isSystem?: boolean;
  isInternal?: boolean;
  isFinal?: boolean;
  isPending?: boolean;
  searchTerm?: string;
}

/**
 * Message statistics
 */
export interface MessageStatistics {
  conversationId: ID;
  totalMessages: number;
  deliveredMessages: number;
  failedMessages: number;
  draftMessages: number;
  mediaMessages: number;
  systemMessages: number;
  internalMessages: number;
  byType: Record<MessageType, number>;
  byStatus: Record<MessageStatus, number>;
  byDirection: Record<MessageDirection, number>;
  byFormat: Record<MessageFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageMessageLength: number;
  maxMessageLength: number;
  minMessageLength: number;
  mostFrequentType: MessageType;
  mostFrequentStatus: MessageStatus;
  mostFrequentDirection: MessageDirection;
  mostFrequentFormat: MessageFormat;
}

/**
 * Message summary
 */
export interface MessageSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMessages: number;
  delivered: number;
  failed: number;
  draft: number;
  media: number;
  system: number;
  internal: number;
  byType: Record<MessageType, number>;
  byStatus: Record<MessageStatus, number>;
  byDirection: Record<MessageDirection, number>;
  byFormat: Record<MessageFormat, number>;
  messageTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topTypes: {
    type: MessageType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MessageStatus;
    count: number;
    label: string;
  }[];
  topDirections: {
    direction: MessageDirection;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: MessageFormat;
    count: number;
    label: string;
  }[];
}

/**
 * Message configuration
 */
export interface MessageConfiguration {
  enabled: boolean;
  defaultType: MessageType;
  defaultFormat: MessageFormat;
  allowEdit: boolean;
  editWindowMinutes: number;
  allowDelete: boolean;
  deleteWindowMinutes: number;
  allowMedia: boolean;
  maxMediaSize: number;
  allowedMediaTypes: string[];
  allowSystemMessages: boolean;
  allowInternalMessages: boolean;
  notificationOnMessage: boolean;
  notificationOnFailed: boolean;
  alertConfig?: MessageAlertConfig;
}

/**
 * Message alert configuration
 */
export interface MessageAlertConfig {
  enabled: boolean;
  failedMessageAlert: boolean;
  highVolumeAlert: boolean;
  highVolumeThreshold: number;
  spamAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Message history
 */
export interface MessageHistory extends BaseEntity, Timestamp {
  id: ID;
  messageId: ID;
  conversationId: ID;
  userId: ID;
  action: 'create' | 'update' | 'delete' | 'deliver' | 'fail' | 'edit';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Message validation
 */
export interface MessageValidation {
  isValid: boolean;
  messageId: ID;
  conversationId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Message export
 */
export interface MessageExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: MessageFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Message attachment
 */
export interface MessageAttachment extends BaseEntity, Timestamp {
  id: ID;
  messageId: ID;
  conversationId: ID;
  userId: ID;
  filename: string;
  fileSize: number;
  mimeType: string;
  url: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Message Core
  MESSAGE,
  MessageType,
  MessageStatus,
  MessageDirection,
  MessageFormat,
  messageGetTypeLabel,
  messageGetStatusLabel,
  messageIsDelivered,
  messageIsFailed,
  messageIsDraft,
  messageCanBeEdited,
  messageGetFormatLabel,
  // Message Type
  MESSAGE_TYPE,
  MessageTypeType,
  MessageTypeCategory,
  MessageTypeIcon,
  MessageTypeColor,
  MessageTypeVisibility,
  messageTypeGetLabel,
  messageTypeGetIcon,
  messageTypeIsMedia,
  messageTypeIsSystem,
  messageTypeIsInternal,
  // Message Status
  MESSAGE_STATUS,
  MessageStatusType,
  MessageStatusCategory,
  MessageStatusColor,
  MessageStatusIcon,
  MessageStatusTransition,
  messageStatusGetLabel,
  messageStatusIsDelivered,
  messageStatusIsFailed,
  messageStatusIsPending,
  messageStatusGetCategory,
  messageStatusIsFinal,
};
