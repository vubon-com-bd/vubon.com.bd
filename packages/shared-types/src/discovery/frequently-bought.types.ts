/**
 * Frequently Bought Types
 * Type definitions for frequently bought items based on shared-constants
 * @module FrequentlyBoughtTypes
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
  // Frequently Bought
  DISCOVERY_FREQUENTLY_BOUGHT,
  DiscoveryFrequentlyBoughtType,
  DiscoveryFrequentlyBoughtAnalysis,
  DiscoveryFrequentlyBoughtStatus,
  DiscoveryFrequentlyBoughtDefault,
  DiscoveryFrequentlyBoughtLimit,
  DiscoveryFrequentlyBoughtError,
  discoveryFrequentlyBoughtGetTypeLabel,
  discoveryFrequentlyBoughtGetAnalysisLabel,
  discoveryFrequentlyBoughtGetStatusLabel,
  discoveryFrequentlyBoughtGetErrorLabel,
  discoveryFrequentlyBoughtIsActive,
  discoveryFrequentlyBoughtIsAnalyzed,
  discoveryFrequentlyBoughtGetDefaultLimit,
  discoveryFrequentlyBoughtGetDefaultConfidence,
} from '@vubon/shared-constants';

// ============================================================
// Frequently Bought Extended Types
// ============================================================

/**
 * Frequently bought item
 */
export interface FrequentlyBoughtItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryFrequentlyBoughtType;
  analysis: DiscoveryFrequentlyBoughtAnalysis;
  status: DiscoveryFrequentlyBoughtStatus;
  itemId: ID;
  boughtWith: {
    itemId: ID;
    frequency: number;
    confidence: number;
  }[];
  isActive: boolean;
  isAnalyzed: boolean;
  metadata?: Metadata;
}

/**
 * Frequently bought filter
 */
export interface FrequentlyBoughtFilter {
  types?: DiscoveryFrequentlyBoughtType[];
  analysisTypes?: DiscoveryFrequentlyBoughtAnalysis[];
  statuses?: DiscoveryFrequentlyBoughtStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minFrequency?: number;
  maxFrequency?: number;
  minConfidence?: number;
  maxConfidence?: number;
  isActive?: boolean;
  isAnalyzed?: boolean;
  searchTerm?: string;
}

/**
 * Frequently bought statistics
 */
export interface FrequentlyBoughtStatistics {
  totalItems: number;
  activeItems: number;
  analyzedItems: number;
  byType: Record<DiscoveryFrequentlyBoughtType, number>;
  byAnalysis: Record<DiscoveryFrequentlyBoughtAnalysis, number>;
  byStatus: Record<DiscoveryFrequentlyBoughtStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFrequency: number;
  maxFrequency: number;
  minFrequency: number;
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  mostFrequentType: DiscoveryFrequentlyBoughtType;
  mostFrequentAnalysis: DiscoveryFrequentlyBoughtAnalysis;
  totalAssociations: number;
}

/**
 * Frequently bought summary
 */
export interface FrequentlyBoughtSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  analyzed: number;
  byType: Record<DiscoveryFrequentlyBoughtType, number>;
  byAnalysis: Record<DiscoveryFrequentlyBoughtAnalysis, number>;
  byStatus: Record<DiscoveryFrequentlyBoughtStatus, number>;
  frequencyTrend: {
    date: Date;
    total: number;
    active: number;
    analyzed: number;
  }[];
  topTypes: {
    type: DiscoveryFrequentlyBoughtType;
    count: number;
    label: string;
  }[];
  topAssociations: {
    itemId: ID;
    boughtWithId: ID;
    frequency: number;
    confidence: number;
  }[];
}

/**
 * Frequently bought configuration
 */
export interface FrequentlyBoughtConfiguration {
  enabled: boolean;
  defaultType: DiscoveryFrequentlyBoughtType;
  defaultAnalysis: DiscoveryFrequentlyBoughtAnalysis;
  defaultLimit: number;
  defaultConfidence: number;
  minFrequency: number;
  minConfidence: number;
  analysisIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnAnalysis: boolean;
  notificationOnError: boolean;
  alertConfig?: FrequentlyBoughtAlertConfig;
}

/**
 * Frequently bought alert configuration
 */
export interface FrequentlyBoughtAlertConfig {
  enabled: boolean;
  confidenceDropAlert: boolean;
  frequencyThresholdAlert: boolean;
  analysisErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  confidenceThreshold: number;
  frequencyThreshold: number;
}

/**
 * Frequently bought history
 */
export interface FrequentlyBoughtHistory extends BaseEntity, Timestamp {
  id: ID;
  frequentlyBoughtId: ID;
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
 * Frequently bought association
 */
export interface FrequentlyBoughtAssociation extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  associatedItemId: ID;
  frequency: number;
  confidence: number;
  support: number;
  lift: number;
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Frequently bought analysis result
 */
export interface FrequentlyBoughtAnalysisResult extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryFrequentlyBoughtType;
  analysis: DiscoveryFrequentlyBoughtAnalysis;
  results: {
    itemId: ID;
    associations: {
      associatedItemId: ID;
      frequency: number;
      confidence: number;
      support: number;
      lift: number;
    }[];
  }[];
  analyzedAt: Date;
  metadata?: Metadata;
}

/**
 * Frequently bought prediction
 */
export interface FrequentlyBoughtPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryFrequentlyBoughtType;
  predictedAssociations: {
    itemId: ID;
    probability: number;
    confidence: number;
  }[];
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Frequently bought export
 */
export interface FrequentlyBoughtExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: FrequentlyBoughtFilter;
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
  // Frequently Bought
  DISCOVERY_FREQUENTLY_BOUGHT,
  DiscoveryFrequentlyBoughtType,
  DiscoveryFrequentlyBoughtAnalysis,
  DiscoveryFrequentlyBoughtStatus,
  DiscoveryFrequentlyBoughtDefault,
  DiscoveryFrequentlyBoughtLimit,
  DiscoveryFrequentlyBoughtError,
  discoveryFrequentlyBoughtGetTypeLabel,
  discoveryFrequentlyBoughtGetAnalysisLabel,
  discoveryFrequentlyBoughtGetStatusLabel,
  discoveryFrequentlyBoughtGetErrorLabel,
  discoveryFrequentlyBoughtIsActive,
  discoveryFrequentlyBoughtIsAnalyzed,
  discoveryFrequentlyBoughtGetDefaultLimit,
  discoveryFrequentlyBoughtGetDefaultConfidence,
};
