/**
 * SMS Marketing Template Types
 * Type definitions for SMS marketing templates based on shared-constants
 * @module SMSMarketingTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants sms marketing
// ============================================================
import {
  // SMS Marketing Core
  MarketingSMSType,
  MarketingSMSCategory,
  MarketingSMSPriority,
  MarketingSMSProvider,
  MarketingSMSSendingMethod,
  MarketingSMSTrackingType,
} from '@vubon/shared-constants';

// ============================================================
// SMS Marketing Template Extended Types
// ============================================================

/**
 * SMS Marketing Template
 */
export interface SMSMarketingTemplate extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  message: string;
  type: MarketingSMSType;
  category: MarketingSMSCategory;
  priority: MarketingSMSPriority;
  provider: MarketingSMSProvider;
  sendingMethod: MarketingSMSSendingMethod;
  trackingType: MarketingSMSTrackingType;
  isActive: boolean;
  isDefault: boolean;
  version: string;
  metadata?: Metadata;
}

/**
 * SMS Marketing Template Filter
 */
export interface SMSMarketingTemplateFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingSMSType[];
  categories?: MarketingSMSCategory[];
  priorities?: MarketingSMSPriority[];
  providers?: MarketingSMSProvider[];
  sendingMethods?: MarketingSMSSendingMethod[];
  trackingTypes?: MarketingSMSTrackingType[];
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
 * SMS Marketing Template Statistics
 */
export interface SMSMarketingTemplateStatistics {
  userId: ID;
  totalTemplates: number;
  activeTemplates: number;
  defaultTemplates: number;
  byType: Record<MarketingSMSType, number>;
  byCategory: Record<MarketingSMSCategory, number>;
  byPriority: Record<MarketingSMSPriority, number>;
  byProvider: Record<MarketingSMSProvider, number>;
  bySendingMethod: Record<MarketingSMSSendingMethod, number>;
  byTrackingType: Record<MarketingSMSTrackingType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: MarketingSMSType;
  mostFrequentCategory: MarketingSMSCategory;
  mostFrequentPriority: MarketingSMSPriority;
  mostFrequentProvider: MarketingSMSProvider;
}

/**
 * SMS Marketing Template Summary
 */
export interface SMSMarketingTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  active: number;
  default: number;
  byType: Record<MarketingSMSType, number>;
  byCategory: Record<MarketingSMSCategory, number>;
  byPriority: Record<MarketingSMSPriority, number>;
  byProvider: Record<MarketingSMSProvider, number>;
  bySendingMethod: Record<MarketingSMSSendingMethod, number>;
  byTrackingType: Record<MarketingSMSTrackingType, number>;
  templateTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingSMSType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingSMSCategory;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: MarketingSMSPriority;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: MarketingSMSProvider;
    count: number;
    label: string;
  }[];
}

/**
 * SMS Marketing Template Configuration
 */
export interface SMSMarketingTemplateConfiguration {
  enabled: boolean;
  defaultType: MarketingSMSType;
  defaultCategory: MarketingSMSCategory;
  defaultPriority: MarketingSMSPriority;
  defaultProvider: MarketingSMSProvider;
  defaultSendingMethod: MarketingSMSSendingMethod;
  defaultTrackingType: MarketingSMSTrackingType;
  maxTemplatesPerUser: number;
  maxTemplatesPerType: number;
  requireApproval: boolean;
  allowVersioning: boolean;
  maxVersions: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: SMSMarketingTemplateAlertConfig;
}

/**
 * SMS Marketing Template Alert Configuration
 */
export interface SMSMarketingTemplateAlertConfig {
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
 * SMS Marketing Template History
 */
export interface SMSMarketingTemplateHistory extends BaseEntity, Timestamp {
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
 * SMS Marketing Template Validation
 */
export interface SMSMarketingTemplateValidation {
  isValid: boolean;
  templateId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SMS Marketing Template Version
 */
export interface SMSMarketingTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  userId: ID;
  version: string;
  message: string;
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
 * SMS Marketing Template Export
 */
export interface SMSMarketingTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'xml' | 'txt';
  filter: SMSMarketingTemplateFilter;
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
  // SMS Marketing Core
  MarketingSMSType,
  MarketingSMSCategory,
  MarketingSMSPriority,
  MarketingSMSProvider,
  MarketingSMSSendingMethod,
  MarketingSMSTrackingType,
};
