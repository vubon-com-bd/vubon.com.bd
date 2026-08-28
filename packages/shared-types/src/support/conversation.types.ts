/**
 * Conversation Types
 * Type definitions for support conversations based on shared-constants
 * @module ConversationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support conversation
// ============================================================
import {
  // Conversation Core
  CONVERSATION,
  ConversationType,
  ConversationStatus,
  ConversationContext,
  conversationGetTypeLabel,
  conversationGetStatusLabel,
  conversationIsActive,
  conversationIsClosed,
  conversationGetDuration,
  // Conversation Type
  CONVERSATION_TYPE,
  ConversationTypeType,
  ConversationTypeCategory,
  ConversationTypeIcon,
  ConversationTypeColor,
  ConversationTypeVisibility,
  conversationTypeGetLabel,
  conversationTypeGetIcon,
  conversationTypeIsPublic,
  conversationTypeIsPrivate,
  conversationTypeIsGroup,
  // Conversation Status
  CONVERSATION_STATUS,
  ConversationStatusType,
  ConversationStatusCategory,
  ConversationStatusColor,
  ConversationStatusIcon,
  ConversationStatusTransition,
  conversationStatusGetLabel,
  conversationStatusIsActive,
  conversationStatusIsClosed,
  conversationStatusIsPending,
  conversationStatusGetCategory,
  conversationStatusIsResolved,
} from '@vubon/shared-constants';

// ============================================================
// Conversation Extended Types
// ============================================================

/**
 * Conversation
 */
export interface Conversation extends BaseEntity, Timestamp {
  id: ID;
  ticketId: ID;
  userId: ID;
  type: ConversationType;
  status: ConversationStatus;
  context: ConversationContext;
  title?: string;
  isActive: boolean;
  isClosed: boolean;
  duration?: number;
  metadata?: Metadata;
}

/**
 * Conversation filter
 */
export interface ConversationFilter {
  ids?: ID[];
  ticketIds?: ID[];
  userIds?: ID[];
  types?: ConversationType[];
  statuses?: ConversationStatus[];
  contexts?: ConversationContext[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isClosed?: boolean;
  searchTerm?: string;
}

/**
 * Conversation statistics
 */
export interface ConversationStatistics {
  userId: ID;
  totalConversations: number;
  activeConversations: number;
  closedConversations: number;
  byType: Record<ConversationType, number>;
  byStatus: Record<ConversationStatus, number>;
  byContext: Record<ConversationContext, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: ConversationType;
  mostFrequentStatus: ConversationStatus;
  mostFrequentContext: ConversationContext;
}

/**
 * Conversation summary
 */
export interface ConversationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalConversations: number;
  active: number;
  closed: number;
  byType: Record<ConversationType, number>;
  byStatus: Record<ConversationStatus, number>;
  byContext: Record<ConversationContext, number>;
  conversationTrend: {
    date: Date;
    total: number;
    active: number;
    closed: number;
  }[];
  topTypes: {
    type: ConversationType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ConversationStatus;
    count: number;
    label: string;
  }[];
  topContexts: {
    context: ConversationContext;
    count: number;
    label: string;
  }[];
}

/**
 * Conversation configuration
 */
export interface ConversationConfiguration {
  enabled: boolean;
  defaultType: ConversationType;
  defaultStatus: ConversationStatus;
  autoClose: boolean;
  autoCloseAfterHours: number;
  requireTitle: boolean;
  allowMultiple: boolean;
  maxConversationsPerTicket: number;
  notificationOnCreate: boolean;
  notificationOnStatusChange: boolean;
  notificationOnClose: boolean;
  alertConfig?: ConversationAlertConfig;
}

/**
 * Conversation alert configuration
 */
export interface ConversationAlertConfig {
  enabled: boolean;
  staleConversationAlert: boolean;
  staleConversationThreshold: number;
  highActivityAlert: boolean;
  highActivityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Conversation history
 */
export interface ConversationHistory extends BaseEntity, Timestamp {
  id: ID;
  conversationId: ID;
  ticketId: ID;
  userId: ID;
  action: 'create' | 'update' | 'close' | 'reopen' | 'status_change' | 'context_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Conversation validation
 */
export interface ConversationValidation {
  isValid: boolean;
  conversationId: ID;
  ticketId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Conversation export
 */
export interface ConversationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ConversationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Conversation Core
  CONVERSATION,
  ConversationType,
  ConversationStatus,
  ConversationContext,
  conversationGetTypeLabel,
  conversationGetStatusLabel,
  conversationIsActive,
  conversationIsClosed,
  conversationGetDuration,
  // Conversation Type
  CONVERSATION_TYPE,
  ConversationTypeType,
  ConversationTypeCategory,
  ConversationTypeIcon,
  ConversationTypeColor,
  ConversationTypeVisibility,
  conversationTypeGetLabel,
  conversationTypeGetIcon,
  conversationTypeIsPublic,
  conversationTypeIsPrivate,
  conversationTypeIsGroup,
  // Conversation Status
  CONVERSATION_STATUS,
  ConversationStatusType,
  ConversationStatusCategory,
  ConversationStatusColor,
  ConversationStatusIcon,
  ConversationStatusTransition,
  conversationStatusGetLabel,
  conversationStatusIsActive,
  conversationStatusIsClosed,
  conversationStatusIsPending,
  conversationStatusGetCategory,
  conversationStatusIsResolved,
};
