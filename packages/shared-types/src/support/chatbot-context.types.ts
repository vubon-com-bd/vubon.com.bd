/**
 * Chatbot Context Types
 * Type definitions for chatbot context based on shared-constants
 * @module ChatbotContextTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support chatbot
// ============================================================
import {
  // Chatbot Context
  CHATBOT_CONTEXT,
  ChatbotContextType,
  ChatbotContextStatus,
  ChatbotContextPriority,
  ChatbotContextScope,
  ChatbotContextAction,
  chatbotContextGetTypeLabel,
  chatbotContextGetStatusLabel,
  chatbotContextGetPriorityLabel,
  chatbotContextGetScopeLabel,
  chatbotContextIsActive,
  chatbotContextGetLifetime,
  chatbotContextGetPriority,
} from '@vubon/shared-constants';

// ============================================================
// Chatbot Context Extended Types
// ============================================================

/**
 * Chatbot context
 */
export interface ChatbotContext extends BaseEntity, Timestamp {
  id: ID;
  chatbotId: ID;
  type: ChatbotContextType;
  status: ChatbotContextStatus;
  priority: ChatbotContextPriority;
  scope: ChatbotContextScope;
  action: ChatbotContextAction;
  name: string;
  description?: string;
  isActive: boolean;
  lifetime: number;
  variables: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Chatbot context filter
 */
export interface ChatbotContextFilter {
  ids?: ID[];
  chatbotIds?: ID[];
  types?: ChatbotContextType[];
  statuses?: ChatbotContextStatus[];
  priorities?: ChatbotContextPriority[];
  scopes?: ChatbotContextScope[];
  actions?: ChatbotContextAction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  minLifetime?: number;
  maxLifetime?: number;
  searchTerm?: string;
}

/**
 * Chatbot context statistics
 */
export interface ChatbotContextStatistics {
  chatbotId: ID;
  totalContexts: number;
  activeContexts: number;
  byType: Record<ChatbotContextType, number>;
  byStatus: Record<ChatbotContextStatus, number>;
  byPriority: Record<ChatbotContextPriority, number>;
  byScope: Record<ChatbotContextScope, number>;
  byAction: Record<ChatbotContextAction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageLifetime: number;
  maxLifetime: number;
  minLifetime: number;
  mostFrequentType: ChatbotContextType;
  mostFrequentStatus: ChatbotContextStatus;
  mostFrequentPriority: ChatbotContextPriority;
  mostFrequentScope: ChatbotContextScope;
  mostFrequentAction: ChatbotContextAction;
}

/**
 * Chatbot context summary
 */
export interface ChatbotContextSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalContexts: number;
  active: number;
  byType: Record<ChatbotContextType, number>;
  byStatus: Record<ChatbotContextStatus, number>;
  byPriority: Record<ChatbotContextPriority, number>;
  byScope: Record<ChatbotContextScope, number>;
  byAction: Record<ChatbotContextAction, number>;
  contextTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ChatbotContextType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ChatbotContextStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ChatbotContextPriority;
    count: number;
    label: string;
  }[];
  topScopes: {
    scope: ChatbotContextScope;
    count: number;
    label: string;
  }[];
  topActions: {
    action: ChatbotContextAction;
    count: number;
    label: string;
  }[];
}

/**
 * Chatbot context configuration
 */
export interface ChatbotContextConfiguration {
  enabled: boolean;
  defaultType: ChatbotContextType;
  defaultStatus: ChatbotContextStatus;
  defaultPriority: ChatbotContextPriority;
  defaultScope: ChatbotContextScope;
  defaultAction: ChatbotContextAction;
  defaultLifetime: number;
  requireName: boolean;
  requireDescription: boolean;
  autoActivate: boolean;
  allowVariables: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: ChatbotContextAlertConfig;
}

/**
 * Chatbot context alert configuration
 */
export interface ChatbotContextAlertConfig {
  enabled: boolean;
  inactiveContextAlert: boolean;
  inactiveThreshold: number;
  expiredContextAlert: boolean;
  expiredThreshold: number;
  conflictContextAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Chatbot context history
 */
export interface ChatbotContextHistory extends BaseEntity, Timestamp {
  id: ID;
  contextId: ID;
  chatbotId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Chatbot context validation
 */
export interface ChatbotContextValidation {
  isValid: boolean;
  contextId: ID;
  chatbotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Chatbot context export
 */
export interface ChatbotContextExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ChatbotContextFilter;
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
  // Chatbot Context
  CHATBOT_CONTEXT,
  ChatbotContextType,
  ChatbotContextStatus,
  ChatbotContextPriority,
  ChatbotContextScope,
  ChatbotContextAction,
  chatbotContextGetTypeLabel,
  chatbotContextGetStatusLabel,
  chatbotContextGetPriorityLabel,
  chatbotContextGetScopeLabel,
  chatbotContextIsActive,
  chatbotContextGetLifetime,
  chatbotContextGetPriority,
};
