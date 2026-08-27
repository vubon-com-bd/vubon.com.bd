/**
 * AI Personalization Types
 * Type definitions for AI personalization based on shared-constants
 * @module AIPersonalizationTypes
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
  DiscoveryPersonalizationError,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationGetErrorLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// AI Personalization Extended Types
// ============================================================

/**
 * AI Personalization
 */
export interface AIPersonalization extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: DiscoveryPersonalizationType;
  category: DiscoveryPersonalizationCategory;
  dataSource: DiscoveryPersonalizationDataSource;
  status: DiscoveryPersonalizationStatus;
  strategy: DiscoveryPersonalizationStrategy;
  isActive: boolean;
  isDeployed: boolean;
  confidenceScore: number;
  lastUpdatedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Personalization Filter
 */
export interface AIPersonalizationFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: DiscoveryPersonalizationType[];
  categories?: DiscoveryPersonalizationCategory[];
  dataSources?: DiscoveryPersonalizationDataSource[];
  statuses?: DiscoveryPersonalizationStatus[];
  strategies?: DiscoveryPersonalizationStrategy[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDeployed?: boolean;
  minConfidenceScore?: number;
  maxConfidenceScore?: number;
  searchTerm?: string;
}

/**
 * AI Personalization Statistics
 */
export interface AIPersonalizationStatistics {
  userId: ID;
  totalPersonalizations: number;
  activePersonalizations: number;
  deployedPersonalizations: number;
  byType: Record<DiscoveryPersonalizationType, number>;
  byCategory: Record<DiscoveryPersonalizationCategory, number>;
  byDataSource: Record<DiscoveryPersonalizationDataSource, number>;
  byStatus: Record<DiscoveryPersonalizationStatus, number>;
  byStrategy: Record<DiscoveryPersonalizationStrategy, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidenceScore: number;
  maxConfidenceScore: number;
  minConfidenceScore: number;
  mostFrequentType: DiscoveryPersonalizationType;
  mostFrequentCategory: DiscoveryPersonalizationCategory;
  mostFrequentStrategy: DiscoveryPersonalizationStrategy;
}

/**
 * AI Personalization Summary
 */
export interface AIPersonalizationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  deployed: number;
  byType: Record<DiscoveryPersonalizationType, number>;
  byCategory: Record<DiscoveryPersonalizationCategory, number>;
  byDataSource: Record<DiscoveryPersonalizationDataSource, number>;
  byStatus: Record<DiscoveryPersonalizationStatus, number>;
  byStrategy: Record<DiscoveryPersonalizationStrategy, number>;
  personalizationTrend: {
    date: Date;
    total: number;
    active: number;
    deployed: number;
  }[];
  topTypes: {
    type: DiscoveryPersonalizationType;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: DiscoveryPersonalizationStrategy;
    count: number;
    label: string;
  }[];
}

/**
 * AI Personalization Configuration
 */
export interface AIPersonalizationConfiguration {
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
  alertConfig?: AIPersonalizationAlertConfig;
}

/**
 * AI Personalization Alert Configuration
 */
export interface AIPersonalizationAlertConfig {
  enabled: boolean;
  confidenceDropAlert: boolean;
  dataSourceFailureAlert: boolean;
  strategyFailureAlert: boolean;
  performanceDropAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  confidenceThreshold: number;
}

/**
 * AI Personalization History
 */
export interface AIPersonalizationHistory extends BaseEntity, Timestamp {
  id: ID;
  personalizationId: ID;
  userId: ID;
  action: 'create' | 'update' | 'deploy' | 'rollback' | 'delete' | 'activate' | 'deactivate';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Personalization Data Point
 */
export interface AIPersonalizationDataPoint extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  personalizationId: ID;
  dataSource: DiscoveryPersonalizationDataSource;
  dataType: string;
  value: unknown;
  weight: number;
  metadata?: Metadata;
}

/**
 * AI Personalization Model
 */
export interface AIPersonalizationModel extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  personalizationId: ID;
  name: string;
  type: string;
  version: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainedAt: Date;
  deployedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Personalization Validation
 */
export interface AIPersonalizationValidation {
  isValid: boolean;
  personalizationId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Personalization Export
 */
export interface AIPersonalizationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIPersonalizationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Personalization Test
 */
export interface AIPersonalizationTest extends BaseEntity, Timestamp {
  id: ID;
  personalizationId: ID;
  name: string;
  description?: string;
  type: 'ab' | 'multivariate' | 'bandit';
  variants: AIPersonalizationTestVariant[];
  startDate: Date;
  endDate?: Date;
  status: 'draft' | 'running' | 'completed' | 'cancelled';
  metadata?: Metadata;
}

/**
 * AI Personalization Test Variant
 */
export interface AIPersonalizationTestVariant {
  id: string;
  name: string;
  description?: string;
  strategy: DiscoveryPersonalizationStrategy;
  weight: number;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
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
  DiscoveryPersonalizationError,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationGetErrorLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
};
