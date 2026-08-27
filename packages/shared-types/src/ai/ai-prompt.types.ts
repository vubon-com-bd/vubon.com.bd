/**
 * AI Prompt Types
 * Type definitions for AI prompts based on shared-constants
 * @module AIPromptTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai prompt (সঠিক নাম ব্যবহার করে)
// ============================================================
import {
  // Prompt Core
  AI_PROMPT,
  AIPromptType,
  AIPromptStatus,
  AIPromptCategory,
  AIPromptFormat,
  AIPromptVariable,
  AIPromptTemplate,
  AIPromptParameter,
  AIPromptDefault,
  AIPromptLimit,
  AIPromptMetric,
  getAiPromptTypeLabel,
  getAiPromptStatusLabel,
  getAiPromptCategoryLabel,
  getAiPromptFormatLabel,
  getAiPromptTemplateLabel,
  getAiPromptParameterLabel,
  getAiPromptMetricLabel,
  isAiPromptActive,
  isAiPromptAvailable,
  isAiPromptDeprecated,
  getAiPromptDefaultTemperature,
  getAiPromptDefaultMaxTokens,
  getAiPromptDefaultTopP,
  getAiPromptDefaultTopK,
  getAiPromptLimit,
  // Prompt Type
  AI_PROMPT_TYPE,
  AIPromptDomain,
  AIPromptSubType,
  AIPromptComplexity,
  AIPromptTone,
  AIPromptLanguage,
  AIPromptPersona,
  getAiPromptDomainLabel,
  getAiPromptSubTypeLabel,
  getAiPromptComplexityLabel,
  getAiPromptToneLabel,
  getAiPromptLanguageLabel,
  getAiPromptPersonaLabel,
  getAiPromptComplexityScore,
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
  // Prompt Status
  AI_PROMPT_STATUS_TYPES,
  AI_PROMPT_STATUS,
  AIPromptStatusType,
  AIPromptStatusCategory,
  AIPromptStatusSeverity,
  AIPromptStatusColor,
  getAiPromptStatusLabelDetailed,
  getAiPromptStatusCategory,
  getAiPromptStatusSeverity,
  getAiPromptStatusColor,
  isAiPromptInDevelopment,
  isAiPromptInTesting,
  isAiPromptInProduction,
  isAiPromptActiveStatus,
  getAiPromptStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Prompt Extended Types
// ============================================================

/**
 * AI Prompt
 */
export interface AIPrompt extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  name: string;
  description?: string;
  type: AIPromptType;
  status: AIPromptStatus;
  category: AIPromptCategory;
  format: AIPromptFormat;
  template: AIPromptTemplate;
  parameters: AIPromptParameter[];
  variables: AIPromptVariable[];
  content: string;
  isActive: boolean;
  isAvailable: boolean;
  isDeprecated: boolean;
  version: string;
  metadata?: Metadata;
}

/**
 * AI Prompt Filter
 */
export interface AIPromptFilter {
  ids?: ID[];
  modelIds?: ID[];
  types?: AIPromptType[];
  statuses?: AIPromptStatus[];
  categories?: AIPromptCategory[];
  formats?: AIPromptFormat[];
  domains?: AIPromptDomain[];
  languages?: AIPromptLanguage[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isAvailable?: boolean;
  isDeprecated?: boolean;
  searchTerm?: string;
  version?: string;
}

/**
 * AI Prompt Statistics
 */
export interface AIPromptStatistics {
  modelId: ID;
  totalPrompts: number;
  activePrompts: number;
  availablePrompts: number;
  deprecatedPrompts: number;
  byType: Record<AIPromptType, number>;
  byStatus: Record<AIPromptStatus, number>;
  byCategory: Record<AIPromptCategory, number>;
  byFormat: Record<AIPromptFormat, number>;
  byDomain: Record<AIPromptDomain, number>;
  byLanguage: Record<AIPromptLanguage, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageTemperature: number;
  averageMaxTokens: number;
  averageTopP: number;
  averageTopK: number;
  mostFrequentType: AIPromptType;
  mostFrequentCategory: AIPromptCategory;
  mostFrequentFormat: AIPromptFormat;
}

/**
 * AI Prompt Summary
 */
export interface AIPromptSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPrompts: number;
  active: number;
  available: number;
  deprecated: number;
  byType: Record<AIPromptType, number>;
  byStatus: Record<AIPromptStatus, number>;
  byCategory: Record<AIPromptCategory, number>;
  byFormat: Record<AIPromptFormat, number>;
  byDomain: Record<AIPromptDomain, number>;
  byLanguage: Record<AIPromptLanguage, number>;
  promptTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: AIPromptType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AIPromptCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: AIPromptFormat;
    count: number;
    label: string;
  }[];
}

/**
 * AI Prompt Configuration
 */
export interface AIPromptConfiguration {
  enabled: boolean;
  defaultType: AIPromptType;
  defaultCategory: AIPromptCategory;
  defaultFormat: AIPromptFormat;
  defaultTemperature: number;
  defaultMaxTokens: number;
  defaultTopP: number;
  defaultTopK: number;
  maxPromptsPerModel: number;
  requireDescription: boolean;
  requireTemplate: boolean;
  requireParameters: boolean;
  enableVersioning: boolean;
  maxVersions: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AIPromptAlertConfig;
}

/**
 * AI Prompt Alert Configuration
 */
export interface AIPromptAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidTemplateAlert: boolean;
  maxLimitAlert: boolean;
  deprecatedPromptAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  maxLimitThreshold: number;
}

/**
 * AI Prompt History
 */
export interface AIPromptHistory extends BaseEntity, Timestamp {
  id: ID;
  promptId: ID;
  modelId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'deprecate'
    | 'restore'
    | 'delete'
    | 'version';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Prompt Validation
 */
export interface AIPromptValidation {
  isValid: boolean;
  promptId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Prompt Version
 */
export interface AIPromptVersion extends BaseEntity, Timestamp {
  id: ID;
  promptId: ID;
  modelId: ID;
  version: string;
  content: string;
  template: AIPromptTemplate;
  parameters: AIPromptParameter[];
  createdBy: ID;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * AI Prompt Export
 */
export interface AIPromptExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'yaml' | 'xml' | 'txt';
  filter: AIPromptFilter;
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
  // Prompt Core
  AI_PROMPT,
  AIPromptType,
  AIPromptStatus,
  AIPromptCategory,
  AIPromptFormat,
  AIPromptVariable,
  AIPromptTemplate,
  AIPromptParameter,
  AIPromptDefault,
  AIPromptLimit,
  AIPromptMetric,
  getAiPromptTypeLabel,
  getAiPromptStatusLabel,
  getAiPromptCategoryLabel,
  getAiPromptFormatLabel,
  getAiPromptTemplateLabel,
  getAiPromptParameterLabel,
  getAiPromptMetricLabel,
  isAiPromptActive,
  isAiPromptAvailable,
  isAiPromptDeprecated,
  getAiPromptDefaultTemperature,
  getAiPromptDefaultMaxTokens,
  getAiPromptDefaultTopP,
  getAiPromptDefaultTopK,
  getAiPromptLimit,
  // Prompt Type
  AI_PROMPT_TYPE,
  AIPromptDomain,
  AIPromptSubType,
  AIPromptComplexity,
  AIPromptTone,
  AIPromptLanguage,
  AIPromptPersona,
  getAiPromptDomainLabel,
  getAiPromptSubTypeLabel,
  getAiPromptComplexityLabel,
  getAiPromptToneLabel,
  getAiPromptLanguageLabel,
  getAiPromptPersonaLabel,
  getAiPromptComplexityScore,
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
  // Prompt Status
  AI_PROMPT_STATUS_TYPES,
  AI_PROMPT_STATUS,
  AIPromptStatusType,
  AIPromptStatusCategory,
  AIPromptStatusSeverity,
  AIPromptStatusColor,
  getAiPromptStatusLabelDetailed,
  getAiPromptStatusCategory,
  getAiPromptStatusSeverity,
  getAiPromptStatusColor,
  isAiPromptInDevelopment,
  isAiPromptInTesting,
  isAiPromptInProduction,
  isAiPromptActiveStatus,
  getAiPromptStatusProgress,
};
