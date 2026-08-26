/**
 * SEO Ranking Types
 * Type definitions for SEO ranking based on shared-constants
 * @module SEORankingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants seo ranking
// ============================================================
import {
  // SEO Ranking Main
  SEO_RANKING,
  SEORankingType,
  SEORankingStatus,
  SEORankingPosition,
  SEORankingPositionCategory,
  SEORankingScoreRange,
  SEORankingFactor,
  SEORankingDifficulty,
  SEORankingVelocity,
  SEORankingMetric,
  SEORankingSource,
  SEORankingFrequency,
  getSEORankingTypeLabel,
  getSEORankingStatusLabel,
  getSEORankingPositionLabel,
  getSEORankingPositionCategory,
  getSEORankingDifficultyLabel,
  getSEORankingVelocityLabel,
  getSEORankingScoreLabel,
  getSEORankingScoreColor,
  getSEORankingSourceLabel,
  getSEORankingFrequencyLabel,
  getRankingStatusColor,
  isRankingImproving,
  isRankingDeclining,
  getPositionChange,
  // SEO Ranking Type
  SEO_RANKING_TYPE,
  SEORankingTypeCategory,
  SEORankingTypeSubType,
  SEORankingTypeSERPFeature,
  SEORankingTypeDevice,
  SEORankingTypeAlgorithm,
  SEORankingTypeQuality,
  SEORankingTypeStability,
  getSEORankingCategoryLabel,
  getSEORankingSubTypeLabel,
  getSEORankingSERPFeatureLabel,
  getSEORankingDeviceLabel,
  getSEORankingAlgorithmLabel,
  getSEORankingQualityLabel,
  getSEORankingStabilityLabel,
  // SEO Ranking Status
  SEO_RANKING_STATUS,
  SEORankingLifecycleStatus,
  SEORankingHealthStatus,
  SEORankingPerformanceStatus,
  SEORankingRiskStatus,
  SEORankingVisibilityStatus,
  SEORankingTrackingStatus,
  SEORankingStatusCategory,
  getSEORankingLifecycleLabel,
  getSEORankingHealthLabel,
  getSEORankingPerformanceLabel,
  getSEORankingRiskLabel,
  getSEORankingVisibilityLabel,
  getSEORankingTrackingLabel,
  getSEORankingStatusCategory,
  getSEORankingStatusColor,
  isSEORankingImproving,
  isSEORankingDeclining,
  isSEORankingStable,
  isSEORankingActive,
} from '@vubon/shared-constants';

// ============================================================
// SEO Ranking Extended Types
// ============================================================

/**
 * SEO ranking
 */
export interface SEORanking extends BaseEntity, Timestamp {
  id: ID;
  keyword: string;
  url: string;
  type: SEORankingType;
  status: SEORankingStatus;
  position: SEORankingPosition;
  positionCategory: SEORankingPositionCategory;
  previousPosition?: number;
  change: number;
  score: number;
  scoreRange: SEORankingScoreRange;
  factors: SEORankingFactor[];
  difficulty: SEORankingDifficulty;
  velocity: SEORankingVelocity;
  metric: SEORankingMetric;
  source: SEORankingSource;
  frequency: SEORankingFrequency;
  isImproving: boolean;
  isDeclining: boolean;
  isActive: boolean;
  isStable: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO ranking filter
 */
export interface SEORankingFilter {
  ids?: ID[];
  keywords?: string[];
  urls?: string[];
  types?: SEORankingType[];
  statuses?: SEORankingStatus[];
  positionCategories?: SEORankingPositionCategory[];
  difficulties?: SEORankingDifficulty[];
  velocities?: SEORankingVelocity[];
  sources?: SEORankingSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isImproving?: boolean;
  isDeclining?: boolean;
  isActive?: boolean;
  isStable?: boolean;
  minPosition?: number;
  maxPosition?: number;
  minScore?: number;
  maxScore?: number;
  searchTerm?: string;
}

/**
 * SEO ranking statistics
 */
export interface SEORankingStatistics {
  totalRankings: number;
  activeRankings: number;
  improvingRankings: number;
  decliningRankings: number;
  stableRankings: number;
  byType: Record<SEORankingType, number>;
  byStatus: Record<SEORankingStatus, number>;
  byPositionCategory: Record<SEORankingPositionCategory, number>;
  byDifficulty: Record<SEORankingDifficulty, number>;
  byVelocity: Record<SEORankingVelocity, number>;
  bySource: Record<SEORankingSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePosition: number;
  bestPosition: number;
  worstPosition: number;
  averageScore: number;
  maxScore: number;
  minScore: number;
  mostFrequentType: SEORankingType;
  mostFrequentPositionCategory: SEORankingPositionCategory;
  mostFrequentDifficulty: SEORankingDifficulty;
}

/**
 * SEO ranking summary
 */
export interface SEORankingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRankings: number;
  active: number;
  improving: number;
  declining: number;
  stable: number;
  byType: Record<SEORankingType, number>;
  byStatus: Record<SEORankingStatus, number>;
  byPositionCategory: Record<SEORankingPositionCategory, number>;
  byDifficulty: Record<SEORankingDifficulty, number>;
  byVelocity: Record<SEORankingVelocity, number>;
  bySource: Record<SEORankingSource, number>;
  rankingTrend: {
    date: Date;
    averagePosition: number;
    improving: number;
    declining: number;
  }[];
  topTypes: {
    type: SEORankingType;
    count: number;
    label: string;
  }[];
  topPositionCategories: {
    category: SEORankingPositionCategory;
    count: number;
    label: string;
  }[];
  topDifficulties: {
    difficulty: SEORankingDifficulty;
    count: number;
    label: string;
  }[];
  positionSummary: {
    average: number;
    best: number;
    worst: number;
  };
  scoreSummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO ranking configuration
 */
export interface SEORankingConfiguration {
  enabled: boolean;
  defaultType: SEORankingType;
  defaultStatus: SEORankingStatus;
  defaultSource: SEORankingSource;
  defaultFrequency: SEORankingFrequency;
  minPosition: number;
  maxPosition: number;
  minScore: number;
  maxScore: number;
  autoCheck: boolean;
  autoUpdate: boolean;
  trackChanges: boolean;
  trackVelocity: boolean;
  requireScoreCheck: boolean;
  requireDifficultyCheck: boolean;
  maxRankingsPerKeyword: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnImprovement: boolean;
  notificationOnDecline: boolean;
  alertConfig?: SEORankingAlertConfig;
}

/**
 * SEO ranking alert configuration
 */
export interface SEORankingAlertConfig {
  enabled: boolean;
  positionDropAlert: boolean;
  positionThresholdAlert: boolean;
  declineAlert: boolean;
  significantChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  positionDropThreshold: number;
  positionThreshold: number;
  significantChangeThreshold: number;
}

/**
 * SEO ranking history
 */
export interface SEORankingHistory extends BaseEntity, Timestamp {
  id: ID;
  rankingId: ID;
  action:
    | 'create'
    | 'update'
    | 'check'
    | 'refresh'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'position_change'
    | 'score_change'
    | 'difficulty_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO ranking validation
 */
export interface SEORankingValidation {
  isValid: boolean;
  rankingId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO ranking position history
 */
export interface SEORankingPositionHistory extends BaseEntity, Timestamp {
  id: ID;
  rankingId: ID;
  position: number;
  previousPosition?: number;
  change: number;
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO ranking export
 */
export interface SEORankingExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEORankingFilter;
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
  // SEO Ranking Main
  SEO_RANKING,
  SEORankingType,
  SEORankingStatus,
  SEORankingPosition,
  SEORankingPositionCategory,
  SEORankingScoreRange,
  SEORankingFactor,
  SEORankingDifficulty,
  SEORankingVelocity,
  SEORankingMetric,
  SEORankingSource,
  SEORankingFrequency,
  getSEORankingTypeLabel,
  getSEORankingStatusLabel,
  getSEORankingPositionLabel,
  getSEORankingPositionCategory,
  getSEORankingDifficultyLabel,
  getSEORankingVelocityLabel,
  getSEORankingScoreLabel,
  getSEORankingScoreColor,
  getSEORankingSourceLabel,
  getSEORankingFrequencyLabel,
  getRankingStatusColor,
  isRankingImproving,
  isRankingDeclining,
  getPositionChange,
  // SEO Ranking Type
  SEO_RANKING_TYPE,
  SEORankingTypeCategory,
  SEORankingTypeSubType,
  SEORankingTypeSERPFeature,
  SEORankingTypeDevice,
  SEORankingTypeAlgorithm,
  SEORankingTypeQuality,
  SEORankingTypeStability,
  getSEORankingCategoryLabel,
  getSEORankingSubTypeLabel,
  getSEORankingSERPFeatureLabel,
  getSEORankingDeviceLabel,
  getSEORankingAlgorithmLabel,
  getSEORankingQualityLabel,
  getSEORankingStabilityLabel,
  // SEO Ranking Status
  SEO_RANKING_STATUS,
  SEORankingLifecycleStatus,
  SEORankingHealthStatus,
  SEORankingPerformanceStatus,
  SEORankingRiskStatus,
  SEORankingVisibilityStatus,
  SEORankingTrackingStatus,
  SEORankingStatusCategory,
  getSEORankingLifecycleLabel,
  getSEORankingHealthLabel,
  getSEORankingPerformanceLabel,
  getSEORankingRiskLabel,
  getSEORankingVisibilityLabel,
  getSEORankingTrackingLabel,
  getSEORankingStatusCategory,
  getSEORankingStatusColor,
  isSEORankingImproving,
  isSEORankingDeclining,
  isSEORankingStable,
  isSEORankingActive,
};
