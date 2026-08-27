/**
 * AI Model Config Types
 * Type definitions for AI model configuration based on shared-constants
 * @module AIModelConfigTypes
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
  AIConfidence,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getDefaultLearningRate,
} from '@vubon/shared-constants';

// ============================================================
// AI Model Config Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * AI Model Config Filter
 */
export interface AIModelConfigFilter {
  ids?: ID[];
  modelIds?: ID[];
  modelTypes?: AIModelType[];
  serviceTypes?: AIServiceType[];
  providers?: AIProvider[];
  versions?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * AI Model Config Statistics
 */
export interface AIModelConfigStatistics {
  totalConfigs: number;
  activeConfigs: number;
  defaultConfigs: number;
  byModelType: Record<AIModelType, number>;
  byProvider: Record<AIProvider, number>;
  byServiceType: Record<AIServiceType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageMaxTokens: number;
  averageTemperature: number;
  averageTopP: number;
  averageTimeout: number;
  averageBatchSize: number;
  averageLearningRate: number;
  mostFrequentModelType: AIModelType;
  mostFrequentProvider: AIProvider;
  mostFrequentServiceType: AIServiceType;
}

/**
 * AI Model Config Summary
 */
export interface AIModelConfigSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalConfigs: number;
  active: number;
  default: number;
  byModelType: Record<AIModelType, number>;
  byProvider: Record<AIProvider, number>;
  byServiceType: Record<AIServiceType, number>;
  configTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topModelTypes: {
    type: AIModelType;
    count: number;
    label: string;
  }[];
  topProviders: {
    provider: AIProvider;
    count: number;
    label: string;
  }[];
  topServiceTypes: {
    serviceType: AIServiceType;
    count: number;
    label: string;
  }[];
  parametersSummary: {
    averageMaxTokens: number;
    averageTemperature: number;
    averageTopP: number;
    averageTimeout: number;
    averageBatchSize: number;
  };
}

/**
 * AI Model Config Validation
 */
export interface AIModelConfigValidation {
  isValid: boolean;
  configId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Model Config History
 */
export interface AIModelConfigHistory extends BaseEntity, Timestamp {
  id: ID;
  configId: ID;
  modelId: ID;
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
 * AI Model Config Export
 */
export interface AIModelConfigExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: AIModelConfigFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Model Config Import
 */
export interface AIModelConfigImport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedConfigs: number;
  failedConfigs: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Model Config Version
 */
export interface AIModelConfigVersion extends BaseEntity, Timestamp {
  id: ID;
  configId: ID;
  modelId: ID;
  version: string;
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  createdBy: ID;
  metadata?: Metadata;
}

/**
 * AI Model Config Parameter
 */
export interface AIModelConfigParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  value: unknown;
  description?: string;
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
  // AI Core
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIConfidence,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  getDefaultLearningRate,
};
