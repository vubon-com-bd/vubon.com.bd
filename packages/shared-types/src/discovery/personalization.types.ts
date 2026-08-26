/**
 * Personalization Types
 * Type definitions for personalization based on shared-constants
 * @module PersonalizationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
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
// Personalization Extended Types
// ============================================================

/**
 * Personalization with additional metadata
 */
export interface Personalization extends BaseEntity, Timestamp {
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
 * Personalization filter
 */
export interface PersonalizationFilter {
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
 * Personalization statistics
 */
export interface PersonalizationStatistics {
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
  mostFrequentType: DiscoveryPersonalizationType;
  mostFrequentCategory: DiscoveryPersonalizationCategory;
  mostFrequentStrategy: DiscoveryPersonalizationStrategy;
}

/**
 * Personalization summary
 */
export interface PersonalizationSummary {
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
 * Personalization configuration
 */
export interface PersonalizationConfiguration {
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
  alertConfig?: PersonalizationAlertConfig;
}

/**
 * Personalization alert configuration
 */
export interface PersonalizationAlertConfig {
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
 * Personalization history
 */
export interface PersonalizationHistory extends BaseEntity, Timestamp {
  id: ID;
  personalizationId: ID;
  userId: ID;
  action: 'create' | 'update' | 'deploy' | 'rollback' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Personalization data point
 */
export interface PersonalizationDataPoint extends BaseEntity, Timestamp {
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
 * Personalization model
 */
export interface PersonalizationModel extends BaseEntity, Timestamp {
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
 * Personalization test
 */
export interface PersonalizationTest extends BaseEntity, Timestamp {
  id: ID;
  personalizationId: ID;
  name: string;
  description?: string;
  type: 'ab' | 'multivariate' | 'bandit';
  variants: PersonalizationTestVariant[];
  startDate: Date;
  endDate?: Date;
  status: 'draft' | 'running' | 'completed' | 'cancelled';
  metadata?: Metadata;
}

/**
 * Personalization test variant
 */
export interface PersonalizationTestVariant {
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

/**
 * Personalization export
 */
export interface PersonalizationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: PersonalizationFilter;
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
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
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
