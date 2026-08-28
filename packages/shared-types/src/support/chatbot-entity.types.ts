/**
 * Chatbot Entity Types
 * Type definitions for chatbot entities based on shared-constants
 * @module ChatbotEntityTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support chatbot
// ============================================================
import {
  // Chatbot Entity
  CHATBOT_ENTITY,
  ChatbotEntityType,
  ChatbotEntityCategory,
  ChatbotEntityStatus,
  ChatbotEntityExtractionMethod,
  ChatbotEntityRole,
  chatbotEntityGetTypeLabel,
  chatbotEntityGetCategory,
  chatbotEntityGetStatusLabel,
  chatbotEntityIsActive,
  chatbotEntityGetRole,
} from '@vubon/shared-constants';

// ============================================================
// Chatbot Entity Extended Types
// ============================================================

/**
 * Chatbot entity
 */
export interface ChatbotEntity extends BaseEntity, Timestamp {
  id: ID;
  chatbotId: ID;
  type: ChatbotEntityType;
  category: ChatbotEntityCategory;
  status: ChatbotEntityStatus;
  extractionMethod: ChatbotEntityExtractionMethod;
  role: ChatbotEntityRole;
  name: string;
  description?: string;
  isActive: boolean;
  synonyms: string[];
  patterns?: string[];
  metadata?: Metadata;
}

/**
 * Chatbot entity filter
 */
export interface ChatbotEntityFilter {
  ids?: ID[];
  chatbotIds?: ID[];
  types?: ChatbotEntityType[];
  categories?: ChatbotEntityCategory[];
  statuses?: ChatbotEntityStatus[];
  extractionMethods?: ChatbotEntityExtractionMethod[];
  roles?: ChatbotEntityRole[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Chatbot entity statistics
 */
export interface ChatbotEntityStatistics {
  chatbotId: ID;
  totalEntities: number;
  activeEntities: number;
  byType: Record<ChatbotEntityType, number>;
  byCategory: Record<ChatbotEntityCategory, number>;
  byStatus: Record<ChatbotEntityStatus, number>;
  byExtractionMethod: Record<ChatbotEntityExtractionMethod, number>;
  byRole: Record<ChatbotEntityRole, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSynonyms: number;
  maxSynonyms: number;
  minSynonyms: number;
  mostFrequentType: ChatbotEntityType;
  mostFrequentCategory: ChatbotEntityCategory;
  mostFrequentStatus: ChatbotEntityStatus;
  mostFrequentExtractionMethod: ChatbotEntityExtractionMethod;
  mostFrequentRole: ChatbotEntityRole;
}

/**
 * Chatbot entity summary
 */
export interface ChatbotEntitySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEntities: number;
  active: number;
  byType: Record<ChatbotEntityType, number>;
  byCategory: Record<ChatbotEntityCategory, number>;
  byStatus: Record<ChatbotEntityStatus, number>;
  byExtractionMethod: Record<ChatbotEntityExtractionMethod, number>;
  byRole: Record<ChatbotEntityRole, number>;
  entityTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: ChatbotEntityType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: ChatbotEntityCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ChatbotEntityStatus;
    count: number;
    label: string;
  }[];
  topExtractionMethods: {
    method: ChatbotEntityExtractionMethod;
    count: number;
    label: string;
  }[];
  topRoles: {
    role: ChatbotEntityRole;
    count: number;
    label: string;
  }[];
}

/**
 * Chatbot entity configuration
 */
export interface ChatbotEntityConfiguration {
  enabled: boolean;
  defaultType: ChatbotEntityType;
  defaultStatus: ChatbotEntityStatus;
  defaultExtractionMethod: ChatbotEntityExtractionMethod;
  defaultRole: ChatbotEntityRole;
  requireName: boolean;
  requireDescription: boolean;
  allowSynonyms: boolean;
  allowPatterns: boolean;
  autoActivate: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: ChatbotEntityAlertConfig;
}

/**
 * Chatbot entity alert configuration
 */
export interface ChatbotEntityAlertConfig {
  enabled: boolean;
  inactiveEntityAlert: boolean;
  inactiveThreshold: number;
  duplicateEntityAlert: boolean;
  extractionFailureAlert: boolean;
  extractionFailureThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Chatbot entity history
 */
export interface ChatbotEntityHistory extends BaseEntity, Timestamp {
  id: ID;
  entityId: ID;
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
 * Chatbot entity validation
 */
export interface ChatbotEntityValidation {
  isValid: boolean;
  entityId: ID;
  chatbotId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Chatbot entity export
 */
export interface ChatbotEntityExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ChatbotEntityFilter;
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
  // Chatbot Entity
  CHATBOT_ENTITY,
  ChatbotEntityType,
  ChatbotEntityCategory,
  ChatbotEntityStatus,
  ChatbotEntityExtractionMethod,
  ChatbotEntityRole,
  chatbotEntityGetTypeLabel,
  chatbotEntityGetCategory,
  chatbotEntityGetStatusLabel,
  chatbotEntityIsActive,
  chatbotEntityGetRole,
};
