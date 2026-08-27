/**
 * AI Recommendation Types
 * Type definitions for AI recommendations based on shared-constants
 * @module AIRecommendationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai recommendation
// ============================================================
import {
  // Recommendation
  DISCOVERY_RECOMMENDATION,
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  DiscoveryRecommendationDefault,
  DiscoveryRecommendationLimit,
  DiscoveryRecommendationError,
  discoveryRecommendationGetTypeLabel,
  discoveryRecommendationGetCategoryLabel,
  discoveryRecommendationGetStatusLabel,
  discoveryRecommendationGetErrorLabel,
  discoveryRecommendationIsActive,
  discoveryRecommendationIsGenerated,
  discoveryRecommendationGetDefaultLimit,
  discoveryRecommendationGetDefaultScore,
  // Recommendation Type
  DISCOVERY_RECOMMENDATION_TYPE,
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  discoveryRecommendationTypeGetCategoryLabel,
  discoveryRecommendationGetSubTypeLabel,
  discoveryRecommendationGetScopeLabel,
  discoveryRecommendationGetContextLabel,
  discoveryRecommendationGetPriorityLabel,
  discoveryRecommendationIsProductCategory,
  discoveryRecommendationIsContentCategory,
  discoveryRecommendationIsOfferCategory,
  // Recommendation Strategy
  DISCOVERY_RECOMMENDATION_STRATEGY,
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  DiscoveryRecommendationStrategyDefault,
  DiscoveryRecommendationStrategyLimit,
  discoveryRecommendationStrategyGetTypeLabel,
  discoveryRecommendationStrategyGetGoalLabel,
  discoveryRecommendationStrategyGetMetricLabel,
  discoveryRecommendationStrategyIsPersonalized,
  discoveryRecommendationStrategyIsPopularity,
  discoveryRecommendationStrategyIsDiversity,
  discoveryRecommendationStrategyGetDefaultWeight,
} from '@vubon/shared-constants';

// ============================================================
// AI Recommendation Extended Types
// ============================================================

/**
 * AI Recommendation
 */
export interface AIRecommendation extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: DiscoveryRecommendationType;
  category: DiscoveryRecommendationCategory;
  status: DiscoveryRecommendationStatus;
  score: DiscoveryRecommendationScore;
  itemId: ID;
  reason?: string;
  strategy: DiscoveryRecommendationStrategyType;
  priority: DiscoveryRecommendationPriority;
  isActive: boolean;
  isGenerated: boolean;
  isProductCategory: boolean;
  isContentCategory: boolean;
  isOfferCategory: boolean;
  metadata?: Metadata;
}

/**
 * AI Recommendation Filter
 */
export interface AIRecommendationFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: DiscoveryRecommendationType[];
  categories?: DiscoveryRecommendationCategory[];
  statuses?: DiscoveryRecommendationStatus[];
  strategies?: DiscoveryRecommendationStrategyType[];
  priorities?: DiscoveryRecommendationPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  isActive?: boolean;
  isGenerated?: boolean;
  isProductCategory?: boolean;
  isContentCategory?: boolean;
  isOfferCategory?: boolean;
  searchTerm?: string;
  itemId?: ID;
}

/**
 * AI Recommendation Statistics
 */
export interface AIRecommendationStatistics {
  userId: ID;
  totalRecommendations: number;
  activeRecommendations: number;
  generatedRecommendations: number;
  byType: Record<DiscoveryRecommendationType, number>;
  byCategory: Record<DiscoveryRecommendationCategory, number>;
  byStatus: Record<DiscoveryRecommendationStatus, number>;
  byStrategy: Record<DiscoveryRecommendationStrategyType, number>;
  byPriority: Record<DiscoveryRecommendationPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  mostFrequentType: DiscoveryRecommendationType;
  mostFrequentCategory: DiscoveryRecommendationCategory;
  mostFrequentStrategy: DiscoveryRecommendationStrategyType;
  productCategoryCount: number;
  contentCategoryCount: number;
  offerCategoryCount: number;
}

/**
 * AI Recommendation Summary
 */
export interface AIRecommendationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRecommendations: number;
  active: number;
  generated: number;
  byType: Record<DiscoveryRecommendationType, number>;
  byCategory: Record<DiscoveryRecommendationCategory, number>;
  byStatus: Record<DiscoveryRecommendationStatus, number>;
  byStrategy: Record<DiscoveryRecommendationStrategyType, number>;
  byPriority: Record<DiscoveryRecommendationPriority, number>;
  recommendationTrend: {
    date: Date;
    total: number;
    active: number;
    generated: number;
  }[];
  topTypes: {
    type: DiscoveryRecommendationType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: DiscoveryRecommendationCategory;
    count: number;
    label: string;
  }[];
  topStrategies: {
    strategy: DiscoveryRecommendationStrategyType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: DiscoveryRecommendationPriority;
    count: number;
    label: string;
  }[];
}

/**
 * AI Recommendation Configuration
 */
export interface AIRecommendationConfiguration {
  enabled: boolean;
  defaultType: DiscoveryRecommendationType;
  defaultStrategy: DiscoveryRecommendationStrategyType;
  defaultPriority: DiscoveryRecommendationPriority;
  defaultLimit: number;
  minScore: number;
  maxRecommendationsPerUser: number;
  enablePersonalized: boolean;
  enablePopularity: boolean;
  enableDiversity: boolean;
  enableContentBased: boolean;
  enableCollaborative: boolean;
  enableHybrid: boolean;
  cacheTTLSeconds: number;
  notificationOnGenerate: boolean;
  notificationOnError: boolean;
  alertConfig?: AIRecommendationAlertConfig;
}

/**
 * AI Recommendation Alert Configuration
 */
export interface AIRecommendationAlertConfig {
  enabled: boolean;
  lowScoreAlert: boolean;
  lowScoreThreshold: number;
  generationFailureAlert: boolean;
  performanceDropAlert: boolean;
  performanceDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Recommendation History
 */
export interface AIRecommendationHistory extends BaseEntity, Timestamp {
  id: ID;
  recommendationId: ID;
  userId: ID;
  action: 'generate' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Recommendation Validation
 */
export interface AIRecommendationValidation {
  isValid: boolean;
  recommendationId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Recommendation Export
 */
export interface AIRecommendationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIRecommendationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Recommendation Request
 */
export interface AIRecommendationRequest {
  userId: ID;
  type?: DiscoveryRecommendationType;
  category?: DiscoveryRecommendationCategory;
  strategy?: DiscoveryRecommendationStrategyType;
  limit?: number;
  minScore?: number;
  context?: Record<string, unknown>;
  excludeItemIds?: ID[];
  includeItemIds?: ID[];
  metadata?: Metadata;
}

/**
 * AI Recommendation Response
 */
export interface AIRecommendationResponse {
  recommendations: AIRecommendation[];
  total: number;
  limit: number;
  hasMore: boolean;
  processingTimeMs: number;
  timestamp: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Recommendation
  DISCOVERY_RECOMMENDATION,
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  DiscoveryRecommendationDefault,
  DiscoveryRecommendationLimit,
  DiscoveryRecommendationError,
  discoveryRecommendationGetTypeLabel,
  discoveryRecommendationGetCategoryLabel,
  discoveryRecommendationGetStatusLabel,
  discoveryRecommendationGetErrorLabel,
  discoveryRecommendationIsActive,
  discoveryRecommendationIsGenerated,
  discoveryRecommendationGetDefaultLimit,
  discoveryRecommendationGetDefaultScore,
  // Recommendation Type
  DISCOVERY_RECOMMENDATION_TYPE,
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  discoveryRecommendationTypeGetCategoryLabel,
  discoveryRecommendationGetSubTypeLabel,
  discoveryRecommendationGetScopeLabel,
  discoveryRecommendationGetContextLabel,
  discoveryRecommendationGetPriorityLabel,
  discoveryRecommendationIsProductCategory,
  discoveryRecommendationIsContentCategory,
  discoveryRecommendationIsOfferCategory,
  // Recommendation Strategy
  DISCOVERY_RECOMMENDATION_STRATEGY,
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  DiscoveryRecommendationStrategyDefault,
  DiscoveryRecommendationStrategyLimit,
  discoveryRecommendationStrategyGetTypeLabel,
  discoveryRecommendationStrategyGetGoalLabel,
  discoveryRecommendationStrategyGetMetricLabel,
  discoveryRecommendationStrategyIsPersonalized,
  discoveryRecommendationStrategyIsPopularity,
  discoveryRecommendationStrategyIsDiversity,
  discoveryRecommendationStrategyGetDefaultWeight,
};
