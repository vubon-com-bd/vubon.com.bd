/**
 * AI Settings Types
 * Type definitions for AI settings based on shared-constants
 * @module AISettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai
// ============================================================
import {
  // AI Core
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getDefaultLearningRate,
} from '@vubon/shared-constants';

// ============================================================
// AI Settings Extended Types
// ============================================================

/**
 * AI Settings
 */
export interface AISettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  modelId?: ID;
  serviceType: AIServiceType;
  provider: AIProvider;
  modelType: AIModelType;
  endpoint: AIEndpoint;
  timeout: AITimeout;
  batchSize: AIBatchSize;
  learningRate: AILearningRate;
  epochs: AIEpoch;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  features: AIFeature[];
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * AI Settings Filter
 */
export interface AISettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  modelIds?: ID[];
  serviceTypes?: AIServiceType[];
  providers?: AIProvider[];
  modelTypes?: AIModelType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * AI Settings Statistics
 */
export interface AISettingsStatistics {
  userId: ID;
  totalSettings: number;
  activeSettings: number;
  defaultSettings: number;
  byServiceType: Record<AIServiceType, number>;
  byProvider: Record<AIProvider, number>;
  byModelType: Record<AIModelType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageTimeout: number;
  averageBatchSize: number;
  averageLearningRate: number;
  averageEpochs: number;
  mostFrequentServiceType: AIServiceType;
  mostFrequentProvider: AIProvider;
  mostFrequentModelType: AIModelType;
}

/**
 * AI Settings Summary
 */
export interface AISettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  active: number;
  default: number;
  byServiceType: Record<AIServiceType, number>;
  byProvider: Record<AIProvider, number>;
  byModelType: Record<AIModelType, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topServiceTypes: {
    serviceType: AIServiceType;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: AIProvider;
    count: number;
    label: string;
  }[];
  topModelTypes: {
    modelType: AIModelType;
    count: number;
    label: string;
  }[];
  parametersSummary: {
    averageTimeout: number;
    averageBatchSize: number;
    averageLearningRate: number;
    averageEpochs: number;
  };
}

/**
 * AI Settings Configuration
 */
export interface AISettingsConfiguration {
  enabled: boolean;
  defaultServiceType: AIServiceType;
  defaultProvider: AIProvider;
  defaultModelType: AIModelType;
  defaultEndpoint: AIEndpoint;
  defaultTimeout: AITimeout;
  defaultBatchSize: AIBatchSize;
  defaultLearningRate: AILearningRate;
  defaultEpochs: AIEpoch;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences: string[];
  features: AIFeature[];
  maxSettingsPerUser: number;
  requireValidation: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AISettingsAlertConfig;
}

/**
 * AI Settings Alert Configuration
 */
export interface AISettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Settings History
 */
export interface AISettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Settings Validation
 */
export interface AISettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Settings Export
 */
export interface AISettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: AISettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Settings Import
 */
export interface AISettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Settings Default
 */
export interface AISettingsDefault {
  serviceType: AIServiceType;
  provider: AIProvider;
  modelType: AIModelType;
  endpoint: AIEndpoint;
  timeout: AITimeout;
  batchSize: AIBatchSize;
  learningRate: AILearningRate;
  epochs: AIEpoch;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences: string[];
  features: AIFeature[];
  version: string;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // AI Core
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getDefaultLearningRate,
};
