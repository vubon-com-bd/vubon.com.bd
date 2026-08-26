/**
 * Complementary Types
 * Type definitions for complementary items based on shared-constants
 * @module ComplementaryTypes
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
  // Complementary
  DISCOVERY_COMPLEMENTARY,
  DiscoveryComplementaryType,
  DiscoveryComplementaryStatus,
  DiscoveryComplementaryDefault,
  DiscoveryComplementaryLimit,
  DiscoveryComplementaryError,
  discoveryComplementaryGetTypeLabel,
  discoveryComplementaryGetStatusLabel,
  discoveryComplementaryGetErrorLabel,
  discoveryComplementaryIsActive,
  discoveryComplementaryIsAnalyzed,
  discoveryComplementaryGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Complementary Extended Types
// ============================================================

/**
 * Complementary item
 */
export interface ComplementaryItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryComplementaryType;
  status: DiscoveryComplementaryStatus;
  itemId: ID;
  complementaryItems: {
    itemId: ID;
    relevanceScore: number;
    confidence: number;
  }[];
  isActive: boolean;
  isAnalyzed: boolean;
  metadata?: Metadata;
}

/**
 * Complementary filter
 */
export interface ComplementaryFilter {
  types?: DiscoveryComplementaryType[];
  statuses?: DiscoveryComplementaryStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minRelevanceScore?: number;
  maxRelevanceScore?: number;
  minConfidence?: number;
  maxConfidence?: number;
  isActive?: boolean;
  isAnalyzed?: boolean;
  searchTerm?: string;
}

/**
 * Complementary statistics
 */
export interface ComplementaryStatistics {
  totalItems: number;
  activeItems: number;
  analyzedItems: number;
  byType: Record<DiscoveryComplementaryType, number>;
  byStatus: Record<DiscoveryComplementaryStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRelevanceScore: number;
  maxRelevanceScore: number;
  minRelevanceScore: number;
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  mostFrequentType: DiscoveryComplementaryType;
  totalComplementaryPairs: number;
}

/**
 * Complementary summary
 */
export interface ComplementarySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  analyzed: number;
  byType: Record<DiscoveryComplementaryType, number>;
  byStatus: Record<DiscoveryComplementaryStatus, number>;
  complementaryTrend: {
    date: Date;
    total: number;
    active: number;
    analyzed: number;
  }[];
  topTypes: {
    type: DiscoveryComplementaryType;
    count: number;
    label: string;
  }[];
  topComplementaryPairs: {
    itemId: ID;
    complementaryItemId: ID;
    relevanceScore: number;
    confidence: number;
  }[];
}

/**
 * Complementary configuration
 */
export interface ComplementaryConfiguration {
  enabled: boolean;
  defaultType: DiscoveryComplementaryType;
  defaultLimit: number;
  minRelevanceScore: number;
  minConfidence: number;
  analysisIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnAnalysis: boolean;
  notificationOnError: boolean;
  alertConfig?: ComplementaryAlertConfig;
}

/**
 * Complementary alert configuration
 */
export interface ComplementaryAlertConfig {
  enabled: boolean;
  relevanceDropAlert: boolean;
  confidenceThresholdAlert: boolean;
  analysisErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  relevanceThreshold: number;
  confidenceThreshold: number;
}

/**
 * Complementary history
 */
export interface ComplementaryHistory extends BaseEntity, Timestamp {
  id: ID;
  complementaryId: ID;
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
 * Complementary relationship
 */
export interface ComplementaryRelationship extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  complementaryItemId: ID;
  relevanceScore: number;
  confidence: number;
  support: number;
  strength: 'weak' | 'medium' | 'strong';
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Complementary analysis result
 */
export interface ComplementaryAnalysisResult extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryComplementaryType;
  results: {
    itemId: ID;
    complementaryItems: {
      complementaryItemId: ID;
      relevanceScore: number;
      confidence: number;
      support: number;
      strength: string;
    }[];
  }[];
  analyzedAt: Date;
  metadata?: Metadata;
}

/**
 * Complementary prediction
 */
export interface ComplementaryPrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoveryComplementaryType;
  predictedComplementaryItems: {
    itemId: ID;
    relevanceScore: number;
    confidence: number;
  }[];
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Complementary export
 */
export interface ComplementaryExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: ComplementaryFilter;
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
  // Complementary
  DISCOVERY_COMPLEMENTARY,
  DiscoveryComplementaryType,
  DiscoveryComplementaryStatus,
  DiscoveryComplementaryDefault,
  DiscoveryComplementaryLimit,
  DiscoveryComplementaryError,
  discoveryComplementaryGetTypeLabel,
  discoveryComplementaryGetStatusLabel,
  discoveryComplementaryGetErrorLabel,
  discoveryComplementaryIsActive,
  discoveryComplementaryIsAnalyzed,
  discoveryComplementaryGetDefaultLimit,
};
