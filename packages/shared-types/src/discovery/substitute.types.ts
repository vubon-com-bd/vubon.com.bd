/**
 * Substitute Types
 * Type definitions for substitute items based on shared-constants
 * @module SubstituteTypes
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
  // Substitute
  DISCOVERY_SUBSTITUTE,
  DiscoverySubstituteType,
  DiscoverySubstituteStatus,
  DiscoverySubstituteDefault,
  DiscoverySubstituteLimit,
  DiscoverySubstituteError,
  discoverySubstituteGetTypeLabel,
  discoverySubstituteGetStatusLabel,
  discoverySubstituteGetErrorLabel,
  discoverySubstituteIsActive,
  discoverySubstituteIsAnalyzed,
  discoverySubstituteGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Substitute Extended Types
// ============================================================

/**
 * Substitute item
 */
export interface SubstituteItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoverySubstituteType;
  status: DiscoverySubstituteStatus;
  itemId: ID;
  substituteItems: {
    itemId: ID;
    similarityScore: number;
    confidence: number;
    reason: string;
  }[];
  isActive: boolean;
  isAnalyzed: boolean;
  metadata?: Metadata;
}

/**
 * Substitute filter
 */
export interface SubstituteFilter {
  types?: DiscoverySubstituteType[];
  statuses?: DiscoverySubstituteStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minSimilarityScore?: number;
  maxSimilarityScore?: number;
  minConfidence?: number;
  maxConfidence?: number;
  isActive?: boolean;
  isAnalyzed?: boolean;
  searchTerm?: string;
}

/**
 * Substitute statistics
 */
export interface SubstituteStatistics {
  totalItems: number;
  activeItems: number;
  analyzedItems: number;
  byType: Record<DiscoverySubstituteType, number>;
  byStatus: Record<DiscoverySubstituteStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSimilarityScore: number;
  maxSimilarityScore: number;
  minSimilarityScore: number;
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  mostFrequentType: DiscoverySubstituteType;
  totalSubstitutePairs: number;
}

/**
 * Substitute summary
 */
export interface SubstituteSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  analyzed: number;
  byType: Record<DiscoverySubstituteType, number>;
  byStatus: Record<DiscoverySubstituteStatus, number>;
  substituteTrend: {
    date: Date;
    total: number;
    active: number;
    analyzed: number;
  }[];
  topTypes: {
    type: DiscoverySubstituteType;
    count: number;
    label: string;
  }[];
  topSubstitutePairs: {
    itemId: ID;
    substituteItemId: ID;
    similarityScore: number;
    confidence: number;
    reason: string;
  }[];
}

/**
 * Substitute configuration
 */
export interface SubstituteConfiguration {
  enabled: boolean;
  defaultType: DiscoverySubstituteType;
  defaultLimit: number;
  minSimilarityScore: number;
  minConfidence: number;
  analysisIntervalHours: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnAnalysis: boolean;
  notificationOnError: boolean;
  alertConfig?: SubstituteAlertConfig;
}

/**
 * Substitute alert configuration
 */
export interface SubstituteAlertConfig {
  enabled: boolean;
  similarityDropAlert: boolean;
  confidenceThresholdAlert: boolean;
  analysisErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  similarityThreshold: number;
  confidenceThreshold: number;
}

/**
 * Substitute history
 */
export interface SubstituteHistory extends BaseEntity, Timestamp {
  id: ID;
  substituteId: ID;
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
 * Substitute relationship
 */
export interface SubstituteRelationship extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  substituteItemId: ID;
  similarityScore: number;
  confidence: number;
  support: number;
  reason: string;
  strength: 'weak' | 'medium' | 'strong';
  calculatedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Substitute analysis result
 */
export interface SubstituteAnalysisResult extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoverySubstituteType;
  results: {
    itemId: ID;
    substituteItems: {
      substituteItemId: ID;
      similarityScore: number;
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
 * Substitute prediction
 */
export interface SubstitutePrediction extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  type: DiscoverySubstituteType;
  predictedSubstituteItems: {
    itemId: ID;
    similarityScore: number;
    confidence: number;
    reason: string;
  }[];
  predictedAt: Date;
  horizon: number;
  metadata?: Metadata;
}

/**
 * Substitute export
 */
export interface SubstituteExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: SubstituteFilter;
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
  // Substitute
  DISCOVERY_SUBSTITUTE,
  DiscoverySubstituteType,
  DiscoverySubstituteStatus,
  DiscoverySubstituteDefault,
  DiscoverySubstituteLimit,
  DiscoverySubstituteError,
  discoverySubstituteGetTypeLabel,
  discoverySubstituteGetStatusLabel,
  discoverySubstituteGetErrorLabel,
  discoverySubstituteIsActive,
  discoverySubstituteIsAnalyzed,
  discoverySubstituteGetDefaultLimit,
};
