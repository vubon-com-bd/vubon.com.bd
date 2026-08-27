/**
 * AI Preferences Types
 * Type definitions for AI preferences based on shared-constants
 * @module AIPreferencesTypes
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
  AIEndpoint,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  AIFeature,
} from '@vubon/shared-constants';

// ============================================================
// AI Preferences Extended Types
// ============================================================

/**
 * AI Preferences
 */
export interface AIPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredServiceType: AIServiceType;
  preferredProvider: AIProvider;
  preferredModelType: AIModelType;
  preferredEndpoint: AIEndpoint;
  preferredTimeout: AITimeout;
  preferredBatchSize: AIBatchSize;
  preferredLearningRate: AILearningRate;
  preferredEpochs: AIEpoch;
  preferredFeatures: AIFeature[];
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * AI Preferences Filter
 */
export interface AIPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredServiceTypes?: AIServiceType[];
  preferredProviders?: AIProvider[];
  preferredModelTypes?: AIModelType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * AI Preferences Statistics
 */
export interface AIPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  activePreferences: number;
  defaultPreferences: number;
  byPreferredServiceType: Record<AIServiceType, number>;
  byPreferredProvider: Record<AIProvider, number>;
  byPreferredModelType: Record<AIModelType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentServiceType: AIServiceType;
  mostFrequentProvider: AIProvider;
  mostFrequentModelType: AIModelType;
}

/**
 * AI Preferences Summary
 */
export interface AIPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  active: number;
  default: number;
  byPreferredServiceType: Record<AIServiceType, number>;
  byPreferredProvider: Record<AIProvider, number>;
  byPreferredModelType: Record<AIModelType, number>;
  preferencesTrend: {
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
}

/**
 * AI Preferences Configuration
 */
export interface AIPreferencesConfiguration {
  enabled: boolean;
  defaultServiceType: AIServiceType;
  defaultProvider: AIProvider;
  defaultModelType: AIModelType;
  defaultEndpoint: AIEndpoint;
  defaultTimeout: AITimeout;
  defaultBatchSize: AIBatchSize;
  defaultLearningRate: AILearningRate;
  defaultEpochs: AIEpoch;
  maxPreferencesPerUser: number;
  allowCustomPreferences: boolean;
  autoApplyDefaults: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AIPreferencesAlertConfig;
}

/**
 * AI Preferences Alert Configuration
 */
export interface AIPreferencesAlertConfig {
  enabled: boolean;
  duplicatePreferencesAlert: boolean;
  invalidPreferencesAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Preferences History
 */
export interface AIPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
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
 * AI Preferences Validation
 */
export interface AIPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Preferences Export
 */
export interface AIPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: AIPreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Preferences Import
 */
export interface AIPreferencesImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedPreferences: number;
  failedPreferences: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Preferences Default
 */
export interface AIPreferencesDefault {
  serviceType: AIServiceType;
  provider: AIProvider;
  modelType: AIModelType;
  endpoint: AIEndpoint;
  timeout: AITimeout;
  batchSize: AIBatchSize;
  learningRate: AILearningRate;
  epochs: AIEpoch;
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
  AIEndpoint,
  AITimeout,
  AIBatchSize,
  AILearningRate,
  AIEpoch,
  AIFeature,
};
