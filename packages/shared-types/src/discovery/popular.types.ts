/**
 * Popular Types
 * Type definitions for popular content based on shared-constants
 * @module PopularTypes
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
  // Popular
  DISCOVERY_POPULAR,
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  DiscoveryPopularStatus,
  DiscoveryPopularDefault,
  DiscoveryPopularLimit,
  DiscoveryPopularError,
  discoveryPopularGetTypeLabel,
  discoveryPopularGetMetricLabel,
  discoveryPopularGetStatusLabel,
  discoveryPopularGetErrorLabel,
  discoveryPopularIsActive,
  discoveryPopularIsCalculated,
  discoveryPopularGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Popular Extended Types
// ============================================================

/**
 * Popular item
 */
export interface PopularItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryPopularType;
  metric: DiscoveryPopularMetric;
  status: DiscoveryPopularStatus;
  itemId: ID;
  value: number;
  position: number;
  isActive: boolean;
  isCalculated: boolean;
  metadata?: Metadata;
}

/**
 * Popular filter
 */
export interface PopularFilter {
  types?: DiscoveryPopularType[];
  metrics?: DiscoveryPopularMetric[];
  statuses?: DiscoveryPopularStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minValue?: number;
  maxValue?: number;
  minPosition?: number;
  maxPosition?: number;
  isActive?: boolean;
  isCalculated?: boolean;
  searchTerm?: string;
}

/**
 * Popular statistics
 */
export interface PopularStatistics {
  totalPopular: number;
  activePopular: number;
  calculatedPopular: number;
  byType: Record<DiscoveryPopularType, number>;
  byMetric: Record<DiscoveryPopularMetric, number>;
  byStatus: Record<DiscoveryPopularStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValue: number;
  maxValue: number;
  minValue: number;
  mostFrequentType: DiscoveryPopularType;
  mostFrequentMetric: DiscoveryPopularMetric;
}

/**
 * Popular summary
 */
export interface PopularSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  calculated: number;
  byType: Record<DiscoveryPopularType, number>;
  byMetric: Record<DiscoveryPopularMetric, number>;
  byStatus: Record<DiscoveryPopularStatus, number>;
  popularTrend: {
    date: Date;
    total: number;
    active: number;
    calculated: number;
  }[];
  topTypes: {
    type: DiscoveryPopularType;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: DiscoveryPopularMetric;
    count: number;
    label: string;
  }[];
}

/**
 * Popular configuration
 */
export interface PopularConfiguration {
  enabled: boolean;
  defaultMetric: DiscoveryPopularMetric;
  defaultType: DiscoveryPopularType;
  defaultLimit: number;
  minValue: number;
  updateIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnUpdate: boolean;
  notificationOnError: boolean;
  alertConfig?: PopularAlertConfig;
}

/**
 * Popular alert configuration
 */
export interface PopularAlertConfig {
  enabled: boolean;
  valueDropAlert: boolean;
  valueThresholdAlert: boolean;
  calculationErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  valueThreshold: number;
}

/**
 * Popular history
 */
export interface PopularHistory extends BaseEntity, Timestamp {
  id: ID;
  popularId: ID;
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
 * Popular score
 */
export interface PopularScore extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryPopularType;
  metric: DiscoveryPopularMetric;
  value: number;
  rank: number;
  percentile: number;
  confidence: number;
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Popular prediction
 */
export interface PopularPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryPopularType;
  metric: DiscoveryPopularMetric;
  predictedValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Popular ranking
 */
export interface PopularRanking extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryPopularType;
  metric: DiscoveryPopularMetric;
  rankings: {
    itemId: ID;
    value: number;
    position: number;
    change: number;
  }[];
  calculatedAt: Date;
  metadata?: Metadata;
}

/**
 * Popular export
 */
export interface PopularExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: PopularFilter;
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
  // Popular
  DISCOVERY_POPULAR,
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  DiscoveryPopularStatus,
  DiscoveryPopularDefault,
  DiscoveryPopularLimit,
  DiscoveryPopularError,
  discoveryPopularGetTypeLabel,
  discoveryPopularGetMetricLabel,
  discoveryPopularGetStatusLabel,
  discoveryPopularGetErrorLabel,
  discoveryPopularIsActive,
  discoveryPopularIsCalculated,
  discoveryPopularGetDefaultLimit,
};
