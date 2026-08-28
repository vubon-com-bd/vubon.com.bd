/**
 * Chatbot Types
 * Type definitions for chatbot based on shared-constants
 * @module ChatbotTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support chatbot
// ============================================================
import {
  // Chatbot Core
  CHATBOT,
  ChatbotType,
  ChatbotStatus,
  ChatbotPlatform,
  ChatbotLanguage,
  ChatbotResponseType,
  ChatbotEscalationReason,
  chatbotGetTypeLabel,
  chatbotGetStatusLabel,
  chatbotGetPlatformLabel,
  chatbotIsActive,
  chatbotCanBeUsed,
  chatbotGetResponseTypeLabel,
  chatbotGetEscalationReasonLabel,
} from '@vubon/shared-constants';

// ============================================================
// Chatbot Extended Types
// ============================================================

/**
 * Chatbot
 */
export interface Chatbot extends BaseEntity, Timestamp {
  id: ID;
  type: ChatbotType;
  status: ChatbotStatus;
  platform: ChatbotPlatform;
  language: ChatbotLanguage;
  name: string;
  description?: string;
  isActive: boolean;
  canBeUsed: boolean;
  config: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Chatbot filter
 */
export interface ChatbotFilter {
  ids?: ID[];
  types?: ChatbotType[];
  statuses?: ChatbotStatus[];
  platforms?: ChatbotPlatform[];
  languages?: ChatbotLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  canBeUsed?: boolean;
  searchTerm?: string;
}

/**
 * Chatbot statistics
 */
export interface ChatbotStatistics {
  totalChatbots: number;
  activeChatbots: number;
  usableChatbots: number;
  byType: Record<ChatbotType, number>;
  byStatus: Record<ChatbotStatus, number>;
  byPlatform: Record<ChatbotPlatform, number>;
  byLanguage: Record<ChatbotLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: ChatbotType;
  mostFrequentStatus: ChatbotStatus;
  mostFrequentPlatform: ChatbotPlatform;
  mostFrequentLanguage: ChatbotLanguage;
}

/**
 * Chatbot summary
 */
export interface ChatbotSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalChatbots: number;
  active: number;
  usable: number;
  byType: Record<ChatbotType, number>;
  byStatus: Record<ChatbotStatus, number>;
  byPlatform: Record<ChatbotPlatform, number>;
  byLanguage: Record<ChatbotLanguage, number>;
  chatbotTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ChatbotType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ChatbotStatus;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: ChatbotPlatform;
    count: number;
    label: string;
  }[];
  topLanguages: {
    language: ChatbotLanguage;
    count: number;
    label: string;
  }[];
}

/**
 * Chatbot configuration
 */
export interface ChatbotConfiguration {
  enabled: boolean;
  defaultType: ChatbotType;
  defaultStatus: ChatbotStatus;
  defaultPlatform: ChatbotPlatform;
  defaultLanguage: ChatbotLanguage;
  maxChatbotsPerUser: number;
  requireName: boolean;
  requireDescription: boolean;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: ChatbotAlertConfig;
}

/**
 * Chatbot alert configuration
 */
export interface ChatbotAlertConfig {
  enabled: boolean;
  inactiveChatbotAlert: boolean;
  inactiveThreshold: number;
  errorRateAlert: boolean;
  errorRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Chatbot history
 */
export interface ChatbotHistory extends BaseEntity, Timestamp {
  id: ID;
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
 * Chatbot validation
 */
export interface ChatbotValidation {
  isValid: boolean;
  chatbotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Chatbot export
 */
export interface ChatbotExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ChatbotFilter;
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
  // Chatbot Core
  CHATBOT,
  ChatbotType,
  ChatbotStatus,
  ChatbotPlatform,
  ChatbotLanguage,
  ChatbotResponseType,
  ChatbotEscalationReason,
  chatbotGetTypeLabel,
  chatbotGetStatusLabel,
  chatbotGetPlatformLabel,
  chatbotIsActive,
  chatbotCanBeUsed,
  chatbotGetResponseTypeLabel,
  chatbotGetEscalationReasonLabel,
};
