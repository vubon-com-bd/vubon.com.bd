/**
 * AI Prompt Template Types
 * Type definitions for AI prompt templates based on shared-constants
 * @module AIPromptTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai prompt
// ============================================================
import {
  // Prompt Core
  AIPromptType,
  AIPromptFormat,
  AIPromptVariable,
  AIPromptParameter,
  // Prompt Template
  AI_PROMPT_TEMPLATE,
  AIPromptTemplateCategory,
  AIPromptTemplateFormat,
  AIPromptTemplateVariable,
  AIPromptTemplateParameter,
  AIPromptTemplateMetric,
  getAiPromptTemplateCategoryLabel,
  getAiPromptTemplateFormatLabel,
  getAiPromptTemplateVariableLabel,
  getAiPromptTemplateParameterLabel,
  getAiPromptTemplateMetricLabel,
} from '@vubon/shared-constants';

// ============================================================
// AI Prompt Template Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * AI Prompt Template Filter
 */
export interface AIPromptTemplateFilter {
  ids?: ID[];
  modelIds?: ID[];
  categories?: AIPromptTemplateCategory[];
  formats?: AIPromptTemplateFormat[];
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
 * AI Prompt Template Statistics
 */
export interface AIPromptTemplateStatistics {
  modelId: ID;
  totalTemplates: number;
  activeTemplates: number;
  defaultTemplates: number;
  byCategory: Record<AIPromptTemplateCategory, number>;
  byFormat: Record<AIPromptTemplateFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageVariables: number;
  averageParameters: number;
  mostFrequentCategory: AIPromptTemplateCategory;
  mostFrequentFormat: AIPromptTemplateFormat;
}

/**
 * AI Prompt Template Summary
 */
export interface AIPromptTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTemplates: number;
  active: number;
  default: number;
  byCategory: Record<AIPromptTemplateCategory, number>;
  byFormat: Record<AIPromptTemplateFormat, number>;
  templateTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: AIPromptTemplateCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: AIPromptTemplateFormat;
    count: number;
    label: string;
  }[];
}

/**
 * AI Prompt Template Configuration
 */
export interface AIPromptTemplateConfiguration {
  enabled: boolean;
  defaultCategory: AIPromptTemplateCategory;
  defaultFormat: AIPromptTemplateFormat;
  maxTemplatesPerModel: number;
  requireDescription: boolean;
  requireVariables: boolean;
  requireParameters: boolean;
  enableVersioning: boolean;
  maxVersions: number;
  allowCustomVariables: boolean;
  allowCustomParameters: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AIPromptTemplateAlertConfig;
}

/**
 * AI Prompt Template Alert Configuration
 */
export interface AIPromptTemplateAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidTemplateAlert: boolean;
  maxLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  maxLimitThreshold: number;
}

/**
 * AI Prompt Template History
 */
export interface AIPromptTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  modelId: ID;
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
 * AI Prompt Template Validation
 */
export interface AIPromptTemplateValidation {
  isValid: boolean;
  templateId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Prompt Template Version
 */
export interface AIPromptTemplateVersion extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  modelId: ID;
  version: string;
  template: string;
  variables: AIPromptTemplateVariable[];
  parameters: AIPromptTemplateParameter[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * AI Prompt Template Export
 */
export interface AIPromptTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'yaml' | 'xml' | 'txt';
  filter: AIPromptTemplateFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Prompt Template Variable
 */
export interface AIPromptTemplateVariableDetail extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'datetime';
  description?: string;
  defaultValue?: unknown;
  isRequired: boolean;
  metadata?: Metadata;
}

/**
 * AI Prompt Template Parameter
 */
export interface AIPromptTemplateParameterDetail extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date' | 'datetime';
  description?: string;
  defaultValue?: unknown;
  isRequired: boolean;
  minValue?: number;
  maxValue?: number;
  allowedValues?: unknown[];
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Prompt Core
  AIPromptType,
  AIPromptFormat,
  AIPromptVariable,
  AIPromptParameter,
  // Prompt Template
  AI_PROMPT_TEMPLATE,
  AIPromptTemplateCategory,
  AIPromptTemplateFormat,
  AIPromptTemplateVariable,
  AIPromptTemplateParameter,
  AIPromptTemplateMetric,
  getAiPromptTemplateCategoryLabel,
  getAiPromptTemplateFormatLabel,
  getAiPromptTemplateVariableLabel,
  getAiPromptTemplateParameterLabel,
  getAiPromptTemplateMetricLabel,
};
