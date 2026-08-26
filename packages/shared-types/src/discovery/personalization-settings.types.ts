/**
 * Personalization Settings Types
 * Type definitions for personalization settings based on shared-constants
 * @module PersonalizationSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
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
// Personalization Settings Types
// ============================================================

/**
 * Personalization settings
 */
export interface PersonalizationSettings extends BaseEntity, Timestamp {
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
 * Personalization settings configuration
 */
export interface PersonalizationSettingsConfiguration {
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
 * Personalization user preferences
 */
export interface PersonalizationUserPreferences {
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
 * Personalization settings validation
 */
export interface PersonalizationSettingsValidation {
  /** Whether the settings are valid */
  isValid: boolean;
  /** Settings type */
  type: 'configuration' | 'user' | 'preferences';
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Personalization settings update
 */
export interface PersonalizationSettingsUpdate {
  /** Settings to update */
  settings: Partial<PersonalizationSettings>;
  /** Updated by user ID */
  updatedBy: ID;
  /** Reason for update */
  reason?: string;
  /** Timestamp */
  timestamp: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalization settings history
 */
export interface PersonalizationSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Personalization settings export
 */
export interface PersonalizationSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml';
  settings: Partial<PersonalizationSettings>;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Personalization settings import
 */
export interface PersonalizationSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedAt?: Date;
  importErrors?: string[];
  metadata?: Metadata;
}

/**
 * Personalization settings default
 */
export interface PersonalizationSettingsDefault {
  /** Default configuration */
  config: PersonalizationSettingsConfiguration;
  /** User preferences default */
  preferences: PersonalizationUserPreferences;
  /** Settings version */
  version: string;
  /** Last updated */
  updatedAt: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Personalization A/B test settings
 */
export interface PersonalizationABTestSettings {
  /** Enable A/B testing */
  enabled: boolean;
  /** Test name */
  name: string;
  /** Test description */
  description?: string;
  /** Variants */
  variants: {
    id: string;
    name: string;
    strategy: DiscoveryPersonalizationStrategy;
    weight: number;
  }[];
  /** Traffic allocation */
  trafficAllocation: number;
  /** Start date */
  startDate: Date;
  /** End date */
  endDate?: Date;
  /** Status */
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  /** Metrics to track */
  metrics: ('conversion' | 'engagement' | 'revenue' | 'retention')[];
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
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
