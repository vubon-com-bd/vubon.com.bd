/**
 * Email Marketing Template Types
 * Type definitions for email marketing templates based on shared-constants
 * @module EmailMarketingTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants email marketing
// ============================================================
import {
  // Email Marketing Core
  MarketingEmailType,
  MarketingEmailCategory,
  MarketingEmailPriority,
  MarketingEmailProvider,
  MarketingEmailSendingMethod,
  MarketingEmailTrackingType,
} from '@vubon/shared-constants';

// ============================================================
// Email Marketing Template Extended Types
// ============================================================

/**
 * Email Marketing Template
 */
export interface EmailMarketingTemplate extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  subject: string;
  content: string;
  type: MarketingEmailType;
  category: MarketingEmailCategory;
  priority: MarketingEmailPriority;
  provider: MarketingEmailProvider;
  sendingMethod: MarketingEmailSendingMethod;
  trackingType: MarketingEmailTrackingType;
  isActive: boolean;
  isDefault: boolean;
  version: string;
  metadata?: Metadata;
}

/**
 * Email Marketing Template Filter
 */
export interface EmailMarketingTemplateFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingEmailType[];
  categories?: MarketingEmailCategory[];
  priorities?: MarketingEmailPriority[];
  providers?: MarketingEmailProvider[];
  sendingMethods?: MarketingEmailSendingMethod[];
  trackingTypes?: MarketingEmailTrackingType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
  version?: string;
}

/**
 * Email Marketing Template Statistics
 */
export interface EmailMarketingTemplateStatistics {
  userId: ID;
  totalTemplates: number;
  activeTemplates: number;
  defaultTemplates: number;
  byType: Record<MarketingEmailType, number>;
  byCategory: Record<MarketingEmailCategory, number>;
  byPriority: Record<MarketingEmailPriority, number>;
  byProvider: Record<MarketingEmailProvider, number>;
  bySendingMethod: Record<MarketingEmailSendingMethod, number>;
  byTrackingType: Record<MarketingEmailTrackingType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: MarketingEmailType;
  mostFrequentCategory: MarketingEmailCategory;
  mostFrequentPriority: MarketingEmailPriority;
  mostFrequentProvider: MarketingEmailProvider;
}

/**
 * Email Marketing Template Summary
 */
export interface EmailMarketingTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  active: number;
  default: number;
  byType: Record<MarketingEmailType, number>;
  byCategory: Record<MarketingEmailCategory, number>;
  byPriority: Record<MarketingEmailPriority, number>;
  byProvider: Record<MarketingEmailProvider, number>;
  bySendingMethod: Record<MarketingEmailSendingMethod, number>;
  byTrackingType: Record<MarketingEmailTrackingType, number>;
  templateTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingEmailType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingEmailCategory;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: MarketingEmailPriority;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: MarketingEmailProvider;
    count: number;
    label: string;
  }[];
}

/**
 * Email Marketing Template Configuration
 */
export interface EmailMarketingTemplateConfiguration {
  enabled: boolean;
  defaultType: MarketingEmailType;
  defaultCategory: MarketingEmailCategory;
  defaultPriority: MarketingEmailPriority;
  defaultProvider: MarketingEmailProvider;
  defaultSendingMethod: MarketingEmailSendingMethod;
  defaultTrackingType: MarketingEmailTrackingType;
  maxTemplatesPerUser: number;
  maxTemplatesPerType: number;
  requireApproval: boolean;
  allowVersioning: boolean;
  maxVersions: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: EmailMarketingTemplateAlertConfig;
}

/**
 * Email Marketing Template Alert Configuration
 */
export interface EmailMarketingTemplateAlertConfig {
  enabled: boolean;
  duplicateTemplateAlert: boolean;
  invalidTemplateAlert: boolean;
  maxLimitAlert: boolean;
  maxLimitThreshold: number;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Email Marketing Template History
 */
export interface EmailMarketingTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'delete'
    | 'restore'
    | 'version';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Email Marketing Template Validation
 */
export interface EmailMarketingTemplateValidation {
  isValid: boolean;
  templateId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Email Marketing Template Version
 */
export interface EmailMarketingTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  userId: ID;
  version: string;
  subject: string;
  content: string;
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Email Marketing Template Export
 */
export interface EmailMarketingTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'xml' | 'eml';
  filter: EmailMarketingTemplateFilter;
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
  // Email Marketing Core
  MarketingEmailType,
  MarketingEmailCategory,
  MarketingEmailPriority,
  MarketingEmailProvider,
  MarketingEmailSendingMethod,
  MarketingEmailTrackingType,
};
