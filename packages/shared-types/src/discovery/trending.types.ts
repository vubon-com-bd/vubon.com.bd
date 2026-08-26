/**
 * Trending Types
 * Type definitions for trending content based on shared-constants
 * @module TrendingTypes
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
  // Trending
  DISCOVERY_TRENDING,
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  DiscoveryTrendingStatus,
  DiscoveryTrendingDefault,
  DiscoveryTrendingLimit,
  DiscoveryTrendingError,
  discoveryTrendingGetTypeLabel,
  discoveryTrendingGetPeriodLabel,
  discoveryTrendingGetStatusLabel,
  discoveryTrendingGetErrorLabel,
  discoveryTrendingIsActive,
  discoveryTrendingIsCalculated,
  discoveryTrendingGetDefaultLimit,
  // Trending Now
  DISCOVERY_TRENDING_NOW,
  DiscoveryTrendingNowType,
  DiscoveryTrendingNowStatus,
  DiscoveryTrendingNowDefault,
  DiscoveryTrendingNowLimit,
  DiscoveryTrendingNowError,
  discoveryTrendingNowGetTypeLabel,
  discoveryTrendingNowGetStatusLabel,
  discoveryTrendingNowGetErrorLabel,
  discoveryTrendingNowIsActive,
  discoveryTrendingNowIsUpdated,
  discoveryTrendingNowGetDefaultLimit,
  discoveryTrendingNowGetDefaultUpdateInterval,
} from '@vubon/shared-constants';

// ============================================================
// Trending Extended Types
// ============================================================

/**
 * Trending item
 */
export interface TrendingItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryTrendingType;
  period: DiscoveryTrendingPeriod;
  status: DiscoveryTrendingStatus;
  itemId: ID;
  score: number;
  position: number;
  velocity: number;
  isActive: boolean;
  isCalculated: boolean;
  metadata?: Metadata;
}

/**
 * Trending now item
 */
export interface TrendingNowItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryTrendingNowType;
  status: DiscoveryTrendingNowStatus;
  itemId: ID;
  score: number;
  position: number;
  isActive: boolean;
  isUpdated: boolean;
  lastUpdatedAt: Date;
  metadata?: Metadata;
}

/**
 * Trending filter
 */
export interface TrendingFilter {
  types?: DiscoveryTrendingType[];
  periods?: DiscoveryTrendingPeriod[];
  statuses?: DiscoveryTrendingStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  minPosition?: number;
  maxPosition?: number;
  isActive?: boolean;
  isCalculated?: boolean;
  searchTerm?: string;
}

/**
 * Trending statistics
 */
export interface TrendingStatistics {
  totalTrending: number;
  activeTrending: number;
  calculatedTrending: number;
  byType: Record<DiscoveryTrendingType, number>;
  byPeriod: Record<DiscoveryTrendingPeriod, number>;
  byStatus: Record<DiscoveryTrendingStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  mostFrequentType: DiscoveryTrendingType;
  mostFrequentPeriod: DiscoveryTrendingPeriod;
}

/**
 * Trending summary
 */
export interface TrendingSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  calculated: number;
  byType: Record<DiscoveryTrendingType, number>;
  byPeriod: Record<DiscoveryTrendingPeriod, number>;
  byStatus: Record<DiscoveryTrendingStatus, number>;
  trendingTrend: {
    date: Date;
    total: number;
    active: number;
    calculated: number;
  }[];
  topTypes: {
    type: DiscoveryTrendingType;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: DiscoveryTrendingPeriod;
    count: number;
    label: string;
  }[];
}

/**
 * Trending configuration
 */
export interface TrendingConfiguration {
  enabled: boolean;
  defaultPeriod: DiscoveryTrendingPeriod;
  defaultType: DiscoveryTrendingType;
  defaultLimit: number;
  minScore: number;
  updateIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: TrendingAlertConfig;
}

/**
 * Trending alert configuration
 */
export interface TrendingAlertConfig {
  enabled: boolean;
  scoreDropAlert: boolean;
  scoreThresholdAlert: boolean;
  calculationErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  scoreThreshold: number;
}

/**
 * Trending history
 */
export interface TrendingHistory extends BaseEntity, Timestamp {
  id: ID;
  trendingId: ID;
  itemId: ID;
  action: 'calculate' | 'update' | 'expire' | 'archive';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Trending score
 */
export interface TrendingScore extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryTrendingType;
  period: DiscoveryTrendingPeriod;
  score: number;
  velocity: number;
  acceleration: number;
  confidence: number;
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Trending prediction
 */
export interface TrendingPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryTrendingType;
  predictedScore: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Trending export
 */
export interface TrendingExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: TrendingFilter;
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
  // Trending
  DISCOVERY_TRENDING,
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  DiscoveryTrendingStatus,
  DiscoveryTrendingDefault,
  DiscoveryTrendingLimit,
  DiscoveryTrendingError,
  discoveryTrendingGetTypeLabel,
  discoveryTrendingGetPeriodLabel,
  discoveryTrendingGetStatusLabel,
  discoveryTrendingGetErrorLabel,
  discoveryTrendingIsActive,
  discoveryTrendingIsCalculated,
  discoveryTrendingGetDefaultLimit,
  // Trending Now
  DISCOVERY_TRENDING_NOW,
  DiscoveryTrendingNowType,
  DiscoveryTrendingNowStatus,
  DiscoveryTrendingNowDefault,
  DiscoveryTrendingNowLimit,
  DiscoveryTrendingNowError,
  discoveryTrendingNowGetTypeLabel,
  discoveryTrendingNowGetStatusLabel,
  discoveryTrendingNowGetErrorLabel,
  discoveryTrendingNowIsActive,
  discoveryTrendingNowIsUpdated,
  discoveryTrendingNowGetDefaultLimit,
  discoveryTrendingNowGetDefaultUpdateInterval,
};
