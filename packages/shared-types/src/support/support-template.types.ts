/**
 * Support Template Types
 * Type definitions for support templates based on shared-constants
 * @module SupportTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support support-template
// ============================================================
import {
  // Support Template Core
  SUPPORT_TEMPLATE,
  SupportTemplateType,
  SupportTemplateStatus,
  SupportTemplateCategory,
  SupportTemplateFormat,
  SupportTemplateVariable as SupportTemplateVariableType,
  supportTemplateGetTypeLabel,
  supportTemplateGetStatusLabel,
  supportTemplateGetCategoryLabel,
  supportTemplateGetFormatLabel,
  supportTemplateIsActive,
  supportTemplateGetVariableLabel,
  // Support Template Type
  SUPPORT_TEMPLATE_TYPE,
  SupportTemplateTypeCategory,
  SupportTemplateTypeScope,
  SupportTemplateTypeLanguage,
  SupportTemplateTypePriority,
  SupportTemplateTypeComplexity,
  supportTemplateTypeGetCategoryLabel,
  supportTemplateTypeGetScopeLabel,
  supportTemplateTypeGetLanguageLabel,
  supportTemplateTypeGetPriorityLabel,
  supportTemplateTypeGetComplexityLabel,
} from '@vubon/shared-constants';

// ============================================================
// Support Template Extended Types
// ============================================================

/**
 * Support template
 */
export interface SupportTemplate extends BaseEntity, Timestamp {
  id: ID;
  type: SupportTemplateType;
  status: SupportTemplateStatus;
  category: SupportTemplateCategory;
  format: SupportTemplateFormat;
  name: string;
  subject: string;
  content: string;
  variables: SupportTemplateVariableType[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Support template filter
 */
export interface SupportTemplateFilter {
  ids?: ID[];
  types?: SupportTemplateType[];
  statuses?: SupportTemplateStatus[];
  categories?: SupportTemplateCategory[];
  formats?: SupportTemplateFormat[];
  variables?: SupportTemplateVariableType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Support template statistics
 */
export interface SupportTemplateStatistics {
  totalTemplates: number;
  activeTemplates: number;
  byType: Record<SupportTemplateType, number>;
  byStatus: Record<SupportTemplateStatus, number>;
  byCategory: Record<SupportTemplateCategory, number>;
  byFormat: Record<SupportTemplateFormat, number>;
  byVariable: Record<SupportTemplateVariableType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageVariables: number;
  maxVariables: number;
  minVariables: number;
  mostFrequentType: SupportTemplateType;
  mostFrequentStatus: SupportTemplateStatus;
  mostFrequentCategory: SupportTemplateCategory;
  mostFrequentFormat: SupportTemplateFormat;
  mostFrequentVariable: SupportTemplateVariableType;
}

/**
 * Support template summary
 */
export interface SupportTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  active: number;
  byType: Record<SupportTemplateType, number>;
  byStatus: Record<SupportTemplateStatus, number>;
  byCategory: Record<SupportTemplateCategory, number>;
  byFormat: Record<SupportTemplateFormat, number>;
  byVariable: Record<SupportTemplateVariableType, number>;
  templateTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: SupportTemplateType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SupportTemplateStatus;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: SupportTemplateCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SupportTemplateFormat;
    count: number;
    label: string;
  }[];
  topVariables: {
    variable: SupportTemplateVariableType;
    count: number;
    label: string;
  }[];
}

/**
 * Support template configuration
 */
export interface SupportTemplateConfiguration {
  enabled: boolean;
  defaultType: SupportTemplateType;
  defaultStatus: SupportTemplateStatus;
  defaultCategory: SupportTemplateCategory;
  defaultFormat: SupportTemplateFormat;
  requireName: boolean;
  requireSubject: boolean;
  requireContent: boolean;
  requireVariables: boolean;
  maxVariables: number;
  autoActivate: boolean;
  requireApproval: boolean;
  allowVariables: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  alertConfig?: SupportTemplateAlertConfig;
}

/**
 * Support template alert configuration
 */
export interface SupportTemplateAlertConfig {
  enabled: boolean;
  duplicateTemplateAlert: boolean;
  inactiveTemplateAlert: boolean;
  inactiveThreshold: number;
  missingVariablesAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Support template history
 */
export interface SupportTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Support template validation
 */
export interface SupportTemplateValidation {
  isValid: boolean;
  templateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Support template export
 */
export interface SupportTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'markdown';
  filter: SupportTemplateFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Support template variable detail (local type)
 */
export interface SupportTemplateVariableDetail extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'array' | 'object';
  required: boolean;
  description?: string;
  defaultValue?: string;
  metadata?: Metadata;
}

/**
 * Support template usage
 */
export interface SupportTemplateUsage extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  ticketId: ID;
  userId: ID;
  usedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Support Template Core
  SUPPORT_TEMPLATE,
  SupportTemplateType,
  SupportTemplateStatus,
  SupportTemplateCategory,
  SupportTemplateFormat,
  SupportTemplateVariableType,
  supportTemplateGetTypeLabel,
  supportTemplateGetStatusLabel,
  supportTemplateGetCategoryLabel,
  supportTemplateGetFormatLabel,
  supportTemplateIsActive,
  supportTemplateGetVariableLabel,
  // Support Template Type
  SUPPORT_TEMPLATE_TYPE,
  SupportTemplateTypeCategory,
  SupportTemplateTypeScope,
  SupportTemplateTypeLanguage,
  SupportTemplateTypePriority,
  SupportTemplateTypeComplexity,
  supportTemplateTypeGetCategoryLabel,
  supportTemplateTypeGetScopeLabel,
  supportTemplateTypeGetLanguageLabel,
  supportTemplateTypeGetPriorityLabel,
  supportTemplateTypeGetComplexityLabel,
};
