/**
 * AI Ranking Types
 * Type definitions for AI ranking based on shared-constants
 * @module AIRankingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai ranking
// ============================================================
import {
  // Ranking
  AI_RANKING,
  AIRankingType,
  AIRankingStrategy,
  AIRankingStatus,
  AIRankingMetric,
  AIRankingFactor,
  AIRankingMode,
  AIRankingLimit,
  getAiRankingTypeLabel,
  getAiRankingStrategyLabel,
  getAiRankingStatusLabel,
  getAiRankingMetricLabel,
  getAiRankingFactorLabel,
  getAiRankingModeLabel,
  isAiRankingActive,
  isAiRankingCompleted,
  isAiRankingFailed,
  getAiRankingDefaultLimit,
  // Ranking Type
  AI_RANKING_TYPE,
  AIRankingCategory,
  AIRankingSubType,
  AIRankingMethod,
  AIRankingScope,
  AIRankingPriority,
  getAiRankingCategoryLabel,
  getAiRankingSubTypeLabel,
  getAiRankingMethodLabel,
  getAiRankingScopeLabel,
  getAiRankingPriorityLabel,
  // Ranking Strategy
  AI_RANKING_STRATEGY,
  AIRankingStrategyCategory,
  AIRankingStrategyType,
  AIRankingStrategyApproach,
  AIRankingStrategyTradeOff,
  getAiRankingStrategyCategoryLabel,
  getAiRankingStrategyTypeLabel,
  getAiRankingStrategyApproachLabel,
  getAiRankingStrategyTradeOffLabel,
  getAiRankingStrategyPriorityWeight,
  // Ranking Status
  AI_RANKING_STATUS_TYPES,
  AI_RANKING_STATUS,
  AIRankingStatusType,
  AIRankingStatusCategory,
  AIRankingStatusSeverity,
  AIRankingStatusColor,
  getAiRankingStatusLabelDetailed,
  getAiRankingStatusCategory,
  getAiRankingStatusSeverity,
  getAiRankingStatusColor,
  isAiRankingActiveStatus,
  isAiRankingFailedStatus,
  getAiRankingStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Ranking Extended Types
// ============================================================

/**
 * AI Ranking
 */
export interface AIRanking extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: AIRankingType;
  strategy: AIRankingStrategy;
  status: AIRankingStatus;
  metric: AIRankingMetric;
  factors: AIRankingFactor[];
  mode: AIRankingMode;
  score: number;
  position: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Ranking Filter
 */
export interface AIRankingFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: AIRankingType[];
  strategies?: AIRankingStrategy[];
  statuses?: AIRankingStatus[];
  metrics?: AIRankingMetric[];
  modes?: AIRankingMode[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  minPosition?: number;
  maxPosition?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * AI Ranking Statistics
 */
export interface AIRankingStatistics {
  userId: ID;
  totalRankings: number;
  activeRankings: number;
  completedRankings: number;
  failedRankings: number;
  byType: Record<AIRankingType, number>;
  byStrategy: Record<AIRankingStrategy, number>;
  byStatus: Record<AIRankingStatus, number>;
  byMetric: Record<AIRankingMetric, number>;
  byMode: Record<AIRankingMode, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  averagePosition: number;
  maxPosition: number;
  minPosition: number;
  mostFrequentType: AIRankingType;
  mostFrequentStrategy: AIRankingStrategy;
  mostFrequentStatus: AIRankingStatus;
  mostFrequentMetric: AIRankingMetric;
  mostFrequentMode: AIRankingMode;
}

/**
 * AI Ranking Summary
 */
export interface AIRankingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRankings: number;
  active: number;
  completed: number;
  failed: number;
  byType: Record<AIRankingType, number>;
  byStrategy: Record<AIRankingStrategy, number>;
  byStatus: Record<AIRankingStatus, number>;
  byMetric: Record<AIRankingMetric, number>;
  byMode: Record<AIRankingMode, number>;
  rankingTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AIRankingType;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: AIRankingStrategy;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AIRankingStatus;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: AIRankingMetric;
    count: number;
    label: string;
  }[];
  topModes: {
    mode: AIRankingMode;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageScore: number;
    averagePosition: number;
    successRate: number;
    failureRate: number;
  };
}

/**
 * AI Ranking Configuration
 */
export interface AIRankingConfiguration {
  enabled: boolean;
  defaultType: AIRankingType;
  defaultStrategy: AIRankingStrategy;
  defaultMetric: AIRankingMetric;
  defaultMode: AIRankingMode;
  defaultLimit: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIRankingAlertConfig;
}

/**
 * AI Ranking Alert Configuration
 */
export interface AIRankingAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  scoreDropAlert: boolean;
  scoreDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Ranking History
 */
export interface AIRankingHistory extends BaseEntity, Timestamp {
  id: ID;
  rankingId: ID;
  userId: ID;
  action: 'create' | 'update' | 'complete' | 'fail' | 'retry' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Ranking Validation
 */
export interface AIRankingValidation {
  isValid: boolean;
  rankingId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Ranking Export
 */
export interface AIRankingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIRankingFilter;
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
  // Ranking
  AI_RANKING,
  AIRankingType,
  AIRankingStrategy,
  AIRankingStatus,
  AIRankingMetric,
  AIRankingFactor,
  AIRankingMode,
  AIRankingLimit,
  getAiRankingTypeLabel,
  getAiRankingStrategyLabel,
  getAiRankingStatusLabel,
  getAiRankingMetricLabel,
  getAiRankingFactorLabel,
  getAiRankingModeLabel,
  isAiRankingActive,
  isAiRankingCompleted,
  isAiRankingFailed,
  getAiRankingDefaultLimit,
  // Ranking Type
  AI_RANKING_TYPE,
  AIRankingCategory,
  AIRankingSubType,
  AIRankingMethod,
  AIRankingScope,
  AIRankingPriority,
  getAiRankingCategoryLabel,
  getAiRankingSubTypeLabel,
  getAiRankingMethodLabel,
  getAiRankingScopeLabel,
  getAiRankingPriorityLabel,
  // Ranking Strategy
  AI_RANKING_STRATEGY,
  AIRankingStrategyCategory,
  AIRankingStrategyType,
  AIRankingStrategyApproach,
  AIRankingStrategyTradeOff,
  getAiRankingStrategyCategoryLabel,
  getAiRankingStrategyTypeLabel,
  getAiRankingStrategyApproachLabel,
  getAiRankingStrategyTradeOffLabel,
  getAiRankingStrategyPriorityWeight,
  // Ranking Status
  AI_RANKING_STATUS_TYPES,
  AI_RANKING_STATUS,
  AIRankingStatusType,
  AIRankingStatusCategory,
  AIRankingStatusSeverity,
  AIRankingStatusColor,
  getAiRankingStatusLabelDetailed,
  getAiRankingStatusCategory,
  getAiRankingStatusSeverity,
  getAiRankingStatusColor,
  isAiRankingActiveStatus,
  isAiRankingFailedStatus,
  getAiRankingStatusProgress,
};
