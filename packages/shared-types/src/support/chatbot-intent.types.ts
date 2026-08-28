/**
 * Chatbot Intent Types
 * Type definitions for chatbot intents based on shared-constants
 * @module ChatbotIntentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support chatbot
// ============================================================
import {
  // Chatbot Intent
  CHATBOT_INTENT,
  ChatbotIntentType,
  ChatbotIntentCategory,
  ChatbotIntentStatus,
  ChatbotIntentPriority,
  ChatbotIntentContext,
  ChatbotIntentAction,
  chatbotIntentGetTypeLabel,
  chatbotIntentGetCategory,
  chatbotIntentGetStatusLabel,
  chatbotIntentGetPriorityLabel,
  chatbotIntentIsActive,
  chatbotIntentGetContext,
} from '@vubon/shared-constants';

// ============================================================
// Chatbot Intent Extended Types
// ============================================================

/**
 * Chatbot intent
 */
export interface ChatbotIntent extends BaseEntity, Timestamp {
  id: ID;
  chatbotId: ID;
  type: ChatbotIntentType;
  category: ChatbotIntentCategory;
  status: ChatbotIntentStatus;
  priority: ChatbotIntentPriority;
  context: ChatbotIntentContext;
  action: ChatbotIntentAction;
  name: string;
  description?: string;
  isActive: boolean;
  confidenceThreshold: number;
  trainingPhrases: string[];
  response: string;
  metadata?: Metadata;
}

/**
 * Chatbot intent filter
 */
export interface ChatbotIntentFilter {
  ids?: ID[];
  chatbotIds?: ID[];
  types?: ChatbotIntentType[];
  categories?: ChatbotIntentCategory[];
  statuses?: ChatbotIntentStatus[];
  priorities?: ChatbotIntentPriority[];
  contexts?: ChatbotIntentContext[];
  actions?: ChatbotIntentAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minConfidenceThreshold?: number;
  maxConfidenceThreshold?: number;
  searchTerm?: string;
}

/**
 * Chatbot intent statistics
 */
export interface ChatbotIntentStatistics {
  chatbotId: ID;
  totalIntents: number;
  activeIntents: number;
  byType: Record<ChatbotIntentType, number>;
  byCategory: Record<ChatbotIntentCategory, number>;
  byStatus: Record<ChatbotIntentStatus, number>;
  byPriority: Record<ChatbotIntentPriority, number>;
  byContext: Record<ChatbotIntentContext, number>;
  byAction: Record<ChatbotIntentAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidenceThreshold: number;
  maxConfidenceThreshold: number;
  minConfidenceThreshold: number;
  mostFrequentType: ChatbotIntentType;
  mostFrequentCategory: ChatbotIntentCategory;
  mostFrequentStatus: ChatbotIntentStatus;
  mostFrequentPriority: ChatbotIntentPriority;
  mostFrequentContext: ChatbotIntentContext;
  mostFrequentAction: ChatbotIntentAction;
}

/**
 * Chatbot intent summary
 */
export interface ChatbotIntentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalIntents: number;
  active: number;
  byType: Record<ChatbotIntentType, number>;
  byCategory: Record<ChatbotIntentCategory, number>;
  byStatus: Record<ChatbotIntentStatus, number>;
  byPriority: Record<ChatbotIntentPriority, number>;
  byContext: Record<ChatbotIntentContext, number>;
  byAction: Record<ChatbotIntentAction, number>;
  intentTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ChatbotIntentType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ChatbotIntentCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ChatbotIntentStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ChatbotIntentPriority;
    count: number;
    label: string;
  }[];
  topContexts: {
    context: ChatbotIntentContext;
    count: number;
    label: string;
  }[];
  topActions: {
    action: ChatbotIntentAction;
    count: number;
    label: string;
  }[];
}

/**
 * Chatbot intent configuration
 */
export interface ChatbotIntentConfiguration {
  enabled: boolean;
  defaultType: ChatbotIntentType;
  defaultStatus: ChatbotIntentStatus;
  defaultPriority: ChatbotIntentPriority;
  defaultContext: ChatbotIntentContext;
  defaultAction: ChatbotIntentAction;
  minConfidenceThreshold: number;
  maxConfidenceThreshold: number;
  requireName: boolean;
  requireDescription: boolean;
  requireTrainingPhrases: boolean;
  requireResponse: boolean;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: ChatbotIntentAlertConfig;
}

/**
 * Chatbot intent alert configuration
 */
export interface ChatbotIntentAlertConfig {
  enabled: boolean;
  lowConfidenceAlert: boolean;
  lowConfidenceThreshold: number;
  inactiveIntentAlert: boolean;
  inactiveThreshold: number;
  duplicateIntentAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Chatbot intent history
 */
export interface ChatbotIntentHistory extends BaseEntity, Timestamp {
  id: ID;
  intentId: ID;
  chatbotId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Chatbot intent validation
 */
export interface ChatbotIntentValidation {
  isValid: boolean;
  intentId: ID;
  chatbotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Chatbot intent export
 */
export interface ChatbotIntentExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ChatbotIntentFilter;
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
  // Chatbot Intent
  CHATBOT_INTENT,
  ChatbotIntentType,
  ChatbotIntentCategory,
  ChatbotIntentStatus,
  ChatbotIntentPriority,
  ChatbotIntentContext,
  ChatbotIntentAction,
  chatbotIntentGetTypeLabel,
  chatbotIntentGetCategory,
  chatbotIntentGetStatusLabel,
  chatbotIntentGetPriorityLabel,
  chatbotIntentIsActive,
  chatbotIntentGetContext,
};
