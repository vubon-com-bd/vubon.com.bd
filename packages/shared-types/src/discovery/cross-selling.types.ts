/**
 * Cross-Selling Types
 * Type definitions for cross-selling items based on shared-constants
 * @module CrossSellingTypes
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
  // Cross-Selling
  DISCOVERY_CROSS_SELLING,
  DiscoveryCrossSellingType,
  DiscoveryCrossSellingStrategy,
  DiscoveryCrossSellingStatus,
  DiscoveryCrossSellingDefault,
  DiscoveryCrossSellingLimit,
  DiscoveryCrossSellingError,
  discoveryCrossSellingGetTypeLabel,
  discoveryCrossSellingGetStrategyLabel,
  discoveryCrossSellingGetStatusLabel,
  discoveryCrossSellingGetErrorLabel,
  discoveryCrossSellingIsActive,
  discoveryCrossSellingIsAnalyzed,
  discoveryCrossSellingGetDefaultLimit,
  discoveryCrossSellingGetDefaultConfidence,
} from '@vubon/shared-constants';

// ============================================================
// Cross-Selling Extended Types
// ============================================================

/**
 * Cross-selling item
 */
export interface CrossSellingItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryCrossSellingType;
  strategy: DiscoveryCrossSellingStrategy;
  status: DiscoveryCrossSellingStatus;
  itemId: ID;
  crossSellingItems: {
    itemId: ID;
    crossSellValue: number;
    confidence: number;
    reason: string;
  }[];
  isActive: boolean;
  isAnalyzed: boolean;
  metadata?: Metadata;
}

/**
 * Cross-selling filter
 */
export interface CrossSellingFilter {
  types?: DiscoveryCrossSellingType[];
  strategies?: DiscoveryCrossSellingStrategy[];
  statuses?: DiscoveryCrossSellingStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minCrossSellValue?: number;
  maxCrossSellValue?: number;
  minConfidence?: number;
  maxConfidence?: number;
  isActive?: boolean;
  isAnalyzed?: boolean;
  searchTerm?: string;
}

/**
 * Cross-selling statistics
 */
export interface CrossSellingStatistics {
  totalItems: number;
  activeItems: number;
  analyzedItems: number;
  byType: Record<DiscoveryCrossSellingType, number>;
  byStrategy: Record<DiscoveryCrossSellingStrategy, number>;
  byStatus: Record<DiscoveryCrossSellingStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCrossSellValue: number;
  maxCrossSellValue: number;
  minCrossSellValue: number;
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  mostFrequentType: DiscoveryCrossSellingType;
  mostFrequentStrategy: DiscoveryCrossSellingStrategy;
  totalCrossSellingPairs: number;
}

/**
 * Cross-selling summary
 */
export interface CrossSellingSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  analyzed: number;
  byType: Record<DiscoveryCrossSellingType, number>;
  byStrategy: Record<DiscoveryCrossSellingStrategy, number>;
  byStatus: Record<DiscoveryCrossSellingStatus, number>;
  crossSellingTrend: {
    date: Date;
    total: number;
    active: number;
    analyzed: number;
  }[];
  topTypes: {
    type: DiscoveryCrossSellingType;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: DiscoveryCrossSellingStrategy;
    count: number;
    label: string;
  }[];
  topCrossSellingPairs: {
    itemId: ID;
    crossSellingItemId: ID;
    crossSellValue: number;
    confidence: number;
    reason: string;
  }[];
}

/**
 * Cross-selling configuration
 */
export interface CrossSellingConfiguration {
  enabled: boolean;
  defaultType: DiscoveryCrossSellingType;
  defaultStrategy: DiscoveryCrossSellingStrategy;
  defaultLimit: number;
  defaultConfidence: number;
  minCrossSellValue: number;
  minConfidence: number;
  analysisIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnAnalysis: boolean;
  notificationOnError: boolean;
  alertConfig?: CrossSellingAlertConfig;
}

/**
 * Cross-selling alert configuration
 */
export interface CrossSellingAlertConfig {
  enabled: boolean;
  crossSellValueDropAlert: boolean;
  confidenceThresholdAlert: boolean;
  analysisErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  crossSellValueThreshold: number;
  confidenceThreshold: number;
}

/**
 * Cross-selling history
 */
export interface CrossSellingHistory extends BaseEntity, Timestamp {
  id: ID;
  crossSellingId: ID;
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
 * Cross-selling relationship
 */
export interface CrossSellingRelationship extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  crossSellingItemId: ID;
  crossSellValue: number;
  confidence: number;
  support: number;
  reason: string;
  strength: 'weak' | 'medium' | 'strong';
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Cross-selling analysis result
 */
export interface CrossSellingAnalysisResult extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryCrossSellingType;
  strategy: DiscoveryCrossSellingStrategy;
  results: {
    itemId: ID;
    crossSellingItems: {
      crossSellingItemId: ID;
      crossSellValue: number;
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
 * Cross-selling prediction
 */
export interface CrossSellingPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryCrossSellingType;
  strategy: DiscoveryCrossSellingStrategy;
  predictedCrossSellingItems: {
    itemId: ID;
    crossSellValue: number;
    confidence: number;
    reason: string;
  }[];
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Cross-selling export
 */
export interface CrossSellingExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: CrossSellingFilter;
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
  // Cross-Selling
  DISCOVERY_CROSS_SELLING,
  DiscoveryCrossSellingType,
  DiscoveryCrossSellingStrategy,
  DiscoveryCrossSellingStatus,
  DiscoveryCrossSellingDefault,
  DiscoveryCrossSellingLimit,
  DiscoveryCrossSellingError,
  discoveryCrossSellingGetTypeLabel,
  discoveryCrossSellingGetStrategyLabel,
  discoveryCrossSellingGetStatusLabel,
  discoveryCrossSellingGetErrorLabel,
  discoveryCrossSellingIsActive,
  discoveryCrossSellingIsAnalyzed,
  discoveryCrossSellingGetDefaultLimit,
  discoveryCrossSellingGetDefaultConfidence,
};
