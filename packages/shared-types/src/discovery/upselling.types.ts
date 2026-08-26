/**
 * Upselling Types
 * Type definitions for upselling items based on shared-constants
 * @module UpsellingTypes
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
  // Upselling
  DISCOVERY_UPSELLING,
  DiscoveryUpsellingType,
  DiscoveryUpsellingStrategy,
  DiscoveryUpsellingStatus,
  DiscoveryUpsellingDefault,
  DiscoveryUpsellingLimit,
  DiscoveryUpsellingError,
  discoveryUpsellingGetTypeLabel,
  discoveryUpsellingGetStrategyLabel,
  discoveryUpsellingGetStatusLabel,
  discoveryUpsellingGetErrorLabel,
  discoveryUpsellingIsActive,
  discoveryUpsellingIsAnalyzed,
  discoveryUpsellingGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Upselling Extended Types
// ============================================================

/**
 * Upselling item
 */
export interface UpsellingItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryUpsellingType;
  strategy: DiscoveryUpsellingStrategy;
  status: DiscoveryUpsellingStatus;
  itemId: ID;
  upsellingItems: {
    itemId: ID;
    upgradeValue: number;
    confidence: number;
    reason: string;
  }[];
  isActive: boolean;
  isAnalyzed: boolean;
  metadata?: Metadata;
}

/**
 * Upselling filter
 */
export interface UpsellingFilter {
  types?: DiscoveryUpsellingType[];
  strategies?: DiscoveryUpsellingStrategy[];
  statuses?: DiscoveryUpsellingStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minUpgradeValue?: number;
  maxUpgradeValue?: number;
  minConfidence?: number;
  maxConfidence?: number;
  isActive?: boolean;
  isAnalyzed?: boolean;
  searchTerm?: string;
}

/**
 * Upselling statistics
 */
export interface UpsellingStatistics {
  totalItems: number;
  activeItems: number;
  analyzedItems: number;
  byType: Record<DiscoveryUpsellingType, number>;
  byStrategy: Record<DiscoveryUpsellingStrategy, number>;
  byStatus: Record<DiscoveryUpsellingStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageUpgradeValue: number;
  maxUpgradeValue: number;
  minUpgradeValue: number;
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  mostFrequentType: DiscoveryUpsellingType;
  mostFrequentStrategy: DiscoveryUpsellingStrategy;
  totalUpsellingPairs: number;
}

/**
 * Upselling summary
 */
export interface UpsellingSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  analyzed: number;
  byType: Record<DiscoveryUpsellingType, number>;
  byStrategy: Record<DiscoveryUpsellingStrategy, number>;
  byStatus: Record<DiscoveryUpsellingStatus, number>;
  upsellingTrend: {
    date: Date;
    total: number;
    active: number;
    analyzed: number;
  }[];
  topTypes: {
    type: DiscoveryUpsellingType;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: DiscoveryUpsellingStrategy;
    count: number;
    label: string;
  }[];
  topUpsellingPairs: {
    itemId: ID;
    upsellingItemId: ID;
    upgradeValue: number;
    confidence: number;
    reason: string;
  }[];
}

/**
 * Upselling configuration
 */
export interface UpsellingConfiguration {
  enabled: boolean;
  defaultType: DiscoveryUpsellingType;
  defaultStrategy: DiscoveryUpsellingStrategy;
  defaultLimit: number;
  minUpgradeValue: number;
  minConfidence: number;
  analysisIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnAnalysis: boolean;
  notificationOnError: boolean;
  alertConfig?: UpsellingAlertConfig;
}

/**
 * Upselling alert configuration
 */
export interface UpsellingAlertConfig {
  enabled: boolean;
  upgradeValueDropAlert: boolean;
  confidenceThresholdAlert: boolean;
  analysisErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  upgradeValueThreshold: number;
  confidenceThreshold: number;
}

/**
 * Upselling history
 */
export interface UpsellingHistory extends BaseEntity, Timestamp {
  id: ID;
  upsellingId: ID;
  itemId: ID;
  action: 'analyze' | 'update' | 'expire' | 'archive';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Upselling relationship
 */
export interface UpsellingRelationship extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  upsellingItemId: ID;
  upgradeValue: number;
  confidence: number;
  support: number;
  reason: string;
  strength: 'weak' | 'medium' | 'strong';
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Upselling analysis result
 */
export interface UpsellingAnalysisResult extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryUpsellingType;
  strategy: DiscoveryUpsellingStrategy;
  results: {
    itemId: ID;
    upsellingItems: {
      upsellingItemId: ID;
      upgradeValue: number;
      confidence: number;
      support: number;
      strength: string;
      reason: string;
    }[];
  }[];
  analyzedAt: Date;
  metadata?: Metadata;
}

/**
 * Upselling prediction
 */
export interface UpsellingPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryUpsellingType;
  strategy: DiscoveryUpsellingStrategy;
  predictedUpsellingItems: {
    itemId: ID;
    upgradeValue: number;
    confidence: number;
    reason: string;
  }[];
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Upselling export
 */
export interface UpsellingExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UpsellingFilter;
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
  // Upselling
  DISCOVERY_UPSELLING,
  DiscoveryUpsellingType,
  DiscoveryUpsellingStrategy,
  DiscoveryUpsellingStatus,
  DiscoveryUpsellingDefault,
  DiscoveryUpsellingLimit,
  DiscoveryUpsellingError,
  discoveryUpsellingGetTypeLabel,
  discoveryUpsellingGetStrategyLabel,
  discoveryUpsellingGetStatusLabel,
  discoveryUpsellingGetErrorLabel,
  discoveryUpsellingIsActive,
  discoveryUpsellingIsAnalyzed,
  discoveryUpsellingGetDefaultLimit,
};
