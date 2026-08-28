/**
 * Chatbot Conversation Types
 * Type definitions for chatbot conversations based on shared-constants
 * @module ChatbotConversationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import ChatbotEntity from chatbot-entity.types
// ============================================================
import type { ChatbotEntity } from './chatbot-entity.types';

// ============================================================
// Import ChatbotIntentHistory from chatbot-intent.types
// ============================================================
import type { ChatbotIntentHistory } from './chatbot-intent.types';

// ============================================================
// Import from shared-constants support chatbot
// ============================================================
import {
  // Chatbot Core
  ChatbotType,
  ChatbotStatus,
  ChatbotPlatform,
  ChatbotLanguage,
  // Chatbot Intent
  ChatbotIntentType,
  ChatbotIntentCategory,
  ChatbotIntentStatus,
  ChatbotIntentPriority,
  ChatbotIntentContext,
  ChatbotIntentAction,
  // Chatbot Entity
  ChatbotEntityType,
  ChatbotEntityCategory,
  ChatbotEntityStatus,
  ChatbotEntityExtractionMethod,
  ChatbotEntityRole,
  // Chatbot Context
  ChatbotContextType,
  ChatbotContextStatus,
  ChatbotContextPriority,
  ChatbotContextScope,
  ChatbotContextAction,
} from '@vubon/shared-constants';

// ============================================================
// Chatbot Conversation Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Chatbot conversation
 */
export interface ChatbotConversation extends BaseEntity, Timestamp {
  id: ID;
  chatbotId: ID;
  userId: ID;
  sessionId: string;
  status: 'active' | 'ended' | 'transferred' | 'escalated' | 'timeout';
  startedAt: Date;
  endedAt?: Date;
  messages: ChatbotMessage[];
  context: Record<string, unknown>;
  intentHistory: ChatbotIntentHistory[];
  entities: ChatbotEntity[];
  metadata?: Metadata;
}

/**
 * Chatbot message
 */
export interface ChatbotMessage extends BaseEntity, Timestamp {
  id: ID;
  conversationId: ID;
  userId: ID;
  sender: 'user' | 'chatbot' | 'agent';
  type: 'text' | 'quick_reply' | 'button' | 'carousel' | 'image' | 'file' | 'system';
  content: string;
  metadata?: Metadata;
}

/**
 * Chatbot conversation filter
 */
export interface ChatbotConversationFilter {
  ids?: ID[];
  chatbotIds?: ID[];
  userIds?: ID[];
  sessionIds?: string[];
  statuses?: ('active' | 'ended' | 'transferred' | 'escalated' | 'timeout')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

/**
 * Chatbot conversation statistics
 */
export interface ChatbotConversationStatistics {
  chatbotId: ID;
  totalConversations: number;
  activeConversations: number;
  endedConversations: number;
  transferredConversations: number;
  escalatedConversations: number;
  timeoutConversations: number;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  averageMessages: number;
  maxMessages: number;
  minMessages: number;
  mostFrequentIntent: ChatbotIntentType;
  intentMatchRate: number;
  escalationRate: number;
  transferRate: number;
}

/**
 * Chatbot conversation summary
 */
export interface ChatbotConversationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalConversations: number;
  active: number;
  ended: number;
  transferred: number;
  escalated: number;
  timeout: number;
  byStatus: Record<string, number>;
  conversationTrend: {
    date: Date;
    total: number;
    active: number;
    ended: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDuration: number;
    averageMessages: number;
    intentMatchRate: number;
    escalationRate: number;
    transferRate: number;
  };
}

/**
 * Chatbot conversation configuration
 */
export interface ChatbotConversationConfiguration {
  enabled: boolean;
  maxMessagesPerConversation: number;
  maxDurationMinutes: number;
  timeoutMinutes: number;
  autoEnd: boolean;
  autoEndAfterMinutes: number;
  allowTransfer: boolean;
  allowEscalation: boolean;
  requireUser: boolean;
  requireChatbot: boolean;
  trackIntents: boolean;
  trackEntities: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnTransfer: boolean;
  notificationOnEscalation: boolean;
  alertConfig?: ChatbotConversationAlertConfig;
}

/**
 * Chatbot conversation alert configuration
 */
export interface ChatbotConversationAlertConfig {
  enabled: boolean;
  longConversationAlert: boolean;
  longConversationThreshold: number;
  highMessageCountAlert: boolean;
  highMessageCountThreshold: number;
  lowIntentMatchAlert: boolean;
  lowIntentMatchThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Chatbot conversation history
 */
export interface ChatbotConversationHistory extends BaseEntity, Timestamp {
  id: ID;
  conversationId: ID;
  chatbotId: ID;
  userId: ID;
  action:
    'start' | 'end' | 'transfer' | 'escalate' | 'timeout' | 'message_sent' | 'message_received';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Chatbot conversation validation
 */
export interface ChatbotConversationValidation {
  isValid: boolean;
  conversationId: ID;
  chatbotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Chatbot conversation export
 */
export interface ChatbotConversationExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: ChatbotConversationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Chatbot Core
  ChatbotType,
  ChatbotStatus,
  ChatbotPlatform,
  ChatbotLanguage,
  // Chatbot Intent
  ChatbotIntentType,
  ChatbotIntentCategory,
  ChatbotIntentStatus,
  ChatbotIntentPriority,
  ChatbotIntentContext,
  ChatbotIntentAction,
  // Chatbot Entity
  ChatbotEntityType,
  ChatbotEntityCategory,
  ChatbotEntityStatus,
  ChatbotEntityExtractionMethod,
  ChatbotEntityRole,
  // Chatbot Context
  ChatbotContextType,
  ChatbotContextStatus,
  ChatbotContextPriority,
  ChatbotContextScope,
  ChatbotContextAction,
};
