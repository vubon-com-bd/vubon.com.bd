/**
 * AI Personalization Settings Types
 * Type definitions for AI personalization settings based on shared-constants
 * @module AIPersonalizationSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai personalization
// ============================================================
import {
  // Personalization
  DISCOVERY_PERSONALIZATION,
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStatus,
  DiscoveryPersonalizationStrategy,
  DiscoveryPersonalizationDefault,
  DiscoveryPersonalizationLimit,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// AI Personalization Settings Extended Types
// ============================================================

/**
 * AI Personalization Settings
 */
export interface AIPersonalizationSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  enabled: boolean;
  defaultStrategy: DiscoveryPersonalizationStrategy;
  defaultDataSource: DiscoveryPersonalizationDataSource;
  confidenceThreshold: number;
  updateIntervalHours: number;
  maxItemsPerUser: number;
  minDataPoints: number;
  autoDeploy: boolean;
  requireApproval: boolean;
  enableABTesting: boolean;
  notificationOnDeploy: boolean;
  notificationOnUpdate: boolean;
  metadata?: Metadata;
}

/**
 * AI Personalization Settings Configuration
 */
export interface AIPersonalizationSettingsConfiguration {
  /** Enable personalization */
  enabled: boolean;
  /** Default strategy */
  defaultStrategy: DiscoveryPersonalizationStrategy;
  /** Default data source */
  defaultDataSource: DiscoveryPersonalizationDataSource;
  /** Confidence threshold (0-1) */
  confidenceThreshold: number;
  /** Update interval in hours */
  updateIntervalHours: number;
  /** Max items per user */
  maxItemsPerUser: number;
  /** Minimum data points */
  minDataPoints: number;
  /** Auto deploy */
  autoDeploy: boolean;
  /** Require approval */
  requireApproval: boolean;
  /** Enable A/B testing */
  enableABTesting: boolean;
  /** Notification on deploy */
  notificationOnDeploy: boolean;
  /** Notification on update */
  notificationOnUpdate: boolean;
}

/**
 * AI Personalization User Preferences
 */
export interface AIPersonalizationUserPreferences {
  /** User ID */
  userId: ID;
  /** Enable personalization for user */
  enabled: boolean;
  /** Preferred strategy */
  preferredStrategy?: DiscoveryPersonalizationStrategy;
  /** Preferred data sources */
  preferredDataSources?: DiscoveryPersonalizationDataSource[];
  /** Opt-out categories */
  optOutCategories?: DiscoveryPersonalizationCategory[];
  /** Opt-out types */
  optOutTypes?: DiscoveryPersonalizationType[];
  /** Metadata */
  metadata?: Metadata;
}

/**
 * AI Personalization Settings Filter
 */
export interface AIPersonalizationSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  strategies?: DiscoveryPersonalizationStrategy[];
  dataSources?: DiscoveryPersonalizationDataSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isEnabled?: boolean;
  isAutoDeploy?: boolean;
  isRequireApproval?: boolean;
  isABTesting?: boolean;
  searchTerm?: string;
}

/**
 * AI Personalization Settings Statistics
 */
export interface AIPersonalizationSettingsStatistics {
  userId: ID;
  totalSettings: number;
  enabledSettings: number;
  autoDeployCount: number;
  requireApprovalCount: number;
  abTestingCount: number;
  byStrategy: Record<DiscoveryPersonalizationStrategy, number>;
  byDataSource: Record<DiscoveryPersonalizationDataSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidenceThreshold: number;
  averageUpdateInterval: number;
  averageMaxItems: number;
  averageMinDataPoints: number;
  mostFrequentStrategy: DiscoveryPersonalizationStrategy;
  mostFrequentDataSource: DiscoveryPersonalizationDataSource;
}

/**
 * AI Personalization Settings Summary
 */
export interface AIPersonalizationSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  enabled: number;
  autoDeploy: number;
  requireApproval: number;
  abTesting: number;
  byStrategy: Record<DiscoveryPersonalizationStrategy, number>;
  byDataSource: Record<DiscoveryPersonalizationDataSource, number>;
  settingsTrend: {
    date: Date;
    total: number;
    enabled: number;
  }[];
  topStrategies: {
    strategy: DiscoveryPersonalizationStrategy;
    count: number;
    label: string;
  }[];
  topDataSources: {
    dataSource: DiscoveryPersonalizationDataSource;
    count: number;
    label: string;
  }[];
  parametersSummary: {
    averageConfidenceThreshold: number;
    averageUpdateInterval: number;
    averageMaxItems: number;
    averageMinDataPoints: number;
  };
}

/**
 * AI Personalization Settings Validation
 */
export interface AIPersonalizationSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Personalization Settings History
 */
export interface AIPersonalizationSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  action: 'create' | 'update' | 'enable' | 'disable' | 'deploy' | 'undeploy' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Personalization Settings Export
 */
export interface AIPersonalizationSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: AIPersonalizationSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Personalization Settings Import
 */
export interface AIPersonalizationSettingsImport extends BaseEntity, Timestamp {
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
 * AI Personalization Settings Default
 */
export interface AIPersonalizationSettingsDefault {
  /** Default configuration */
  config: AIPersonalizationSettingsConfiguration;
  /** User preferences default */
  preferences: AIPersonalizationUserPreferences;
  /** Settings version */
  version: string;
  /** Last updated */
  updatedAt: Date;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Personalization
  DISCOVERY_PERSONALIZATION,
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStatus,
  DiscoveryPersonalizationStrategy,
  DiscoveryPersonalizationDefault,
  DiscoveryPersonalizationLimit,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
};
