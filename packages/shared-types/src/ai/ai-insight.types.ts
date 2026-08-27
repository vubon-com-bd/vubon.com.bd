/**
 * AI Insight Types
 * Type definitions for AI insights based on shared-constants
 * @module AIInsightTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai insight (সঠিক নাম ব্যবহার করে)
// ============================================================
import {
  // Insight
  AI_INSIGHT,
  AIInsightType,
  AIInsightStatus,
  AIInsightCategory,
  AIInsightMethod,
  AIInsightPriority,
  AIInsightConfidence,
  AIInsightImpact,
  AIInsightQuality,
  AIInsightSource,
  AIInsightLimit,
  AIInsightFormat,
  AIInsightMetric,
  getAiInsightTypeLabel,
  getAiInsightStatusLabel,
  getAiInsightCategoryLabel,
  getAiInsightMethodLabel,
  getAiInsightPriorityLabel,
  getAiInsightConfidenceLabel,
  getAiInsightImpactLabel,
  getAiInsightQualityLabel,
  getAiInsightSourceLabel,
  getAiInsightFormatLabel,
  getAiInsightMetricLabel,
  isAiInsightActive,
  isAiInsightProcessing,
  isAiInsightFailed,
  getAiInsightPriorityScore,
  getAiInsightConfidenceScore,
  getAiInsightQualityScore,
  getAiInsightImpactScore,
  // Insight Type
  AI_INSIGHT_TYPE,
  AIInsightDomain,
  AIInsightSubType,
  AIInsightComplexity,
  AIInsightMaturity,
  AIInsightScope,
  AIInsightHorizon,
  getAiInsightDomainLabel,
  getAiInsightSubTypeLabel,
  getAiInsightComplexityLabel,
  getAiInsightMaturityLabel,
  getAiInsightScopeLabel,
  getAiInsightHorizonLabel,
  getAiInsightComplexityScore,
  getAiInsightMaturityScore,
  // Insight Status
  AI_INSIGHT_STATUS_TYPES,
  AI_INSIGHT_STATUS,
  AIInsightStatusType,
  AIInsightStatusCategory,
  AIInsightStatusSeverity,
  AIInsightStatusColor,
  getAiInsightStatusLabelDetailed,
  getAiInsightStatusCategory,
  getAiInsightStatusSeverity,
  getAiInsightStatusColor,
  isAiInsightActiveStatus,
  isAiInsightCompleted,
  isAiInsightFailedStatus,
  getAiInsightStatusProgress,
  // Insight Priority
  AI_INSIGHT_PRIORITY_FACTORS,
  AIInsightPriorityFactor,
  AIInsightPriorityWeight,
  AIInsightPriorityThreshold,
  AIInsightPriorityBoost,
  AIInsightPriorityPenalty,
  AIInsightPriorityDecay,
  getAiInsightPriorityFactorLabel,
  getAiInsightPriorityBoostLabel,
  getAiInsightPriorityPenaltyLabel,
  getAiInsightPriorityDecayLabel,
  getAiInsightPriorityThresholds,
  getAiInsightDefaultFactorWeights,
  getAiInsightDecayFactor,
} from '@vubon/shared-constants';

// ============================================================
// AI Insight Extended Types
// ============================================================

/**
 * AI Insight
 */
export interface AIInsight extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  userId: ID;
  type: AIInsightType;
  status: AIInsightStatus;
  category: AIInsightCategory;
  method: AIInsightMethod;
  priority: AIInsightPriority;
  confidence: AIInsightConfidence;
  impact: AIInsightImpact;
  quality: AIInsightQuality;
  source: AIInsightSource;
  format: AIInsightFormat;
  metric: AIInsightMetric;
  title: string;
  description: string;
  recommendation?: string;
  isActive: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Insight Filter
 */
export interface AIInsightFilter {
  ids?: ID[];
  modelIds?: ID[];
  userIds?: ID[];
  types?: AIInsightType[];
  statuses?: AIInsightStatus[];
  categories?: AIInsightCategory[];
  methods?: AIInsightMethod[];
  priorities?: AIInsightPriority[];
  domains?: AIInsightDomain[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  minConfidence?: number;
  maxConfidence?: number;
  minImpact?: number;
  maxImpact?: number;
  minQuality?: number;
  maxQuality?: number;
  searchTerm?: string;
}

/**
 * AI Insight Statistics
 */
export interface AIInsightStatistics {
  modelId: ID;
  totalInsights: number;
  activeInsights: number;
  processingInsights: number;
  failedInsights: number;
  byType: Record<AIInsightType, number>;
  byStatus: Record<AIInsightStatus, number>;
  byCategory: Record<AIInsightCategory, number>;
  byMethod: Record<AIInsightMethod, number>;
  byPriority: Record<AIInsightPriority, number>;
  byDomain: Record<AIInsightDomain, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageConfidence: number;
  maxConfidence: number;
  minConfidence: number;
  averageImpact: number;
  maxImpact: number;
  minImpact: number;
  averageQuality: number;
  maxQuality: number;
  minQuality: number;
  mostFrequentType: AIInsightType;
  mostFrequentCategory: AIInsightCategory;
  mostFrequentPriority: AIInsightPriority;
}

/**
 * AI Insight Summary
 */
export interface AIInsightSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInsights: number;
  active: number;
  processing: number;
  failed: number;
  byType: Record<AIInsightType, number>;
  byStatus: Record<AIInsightStatus, number>;
  byCategory: Record<AIInsightCategory, number>;
  byMethod: Record<AIInsightMethod, number>;
  byPriority: Record<AIInsightPriority, number>;
  byDomain: Record<AIInsightDomain, number>;
  insightTrend: {
    date: Date;
    total: number;
    active: number;
    processing: number;
  }[];
  topTypes: {
    type: AIInsightType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: AIInsightCategory;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: AIInsightPriority;
    count: number;
    label: string;
  }[];
}

/**
 * AI Insight Configuration
 */
export interface AIInsightConfiguration {
  enabled: boolean;
  defaultType: AIInsightType;
  defaultPriority: AIInsightPriority;
  defaultCategory: AIInsightCategory;
  defaultMethod: AIInsightMethod;
  confidenceThreshold: number;
  impactThreshold: number;
  qualityThreshold: number;
  maxInsightsPerModel: number;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIInsightAlertConfig;
}

/**
 * AI Insight Alert Configuration
 */
export interface AIInsightAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  confidenceDropAlert: boolean;
  impactDropAlert: boolean;
  qualityDropAlert: boolean;
  failureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Insight History
 */
export interface AIInsightHistory extends BaseEntity, Timestamp {
  id: ID;
  insightId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'retry' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Insight Validation
 */
export interface AIInsightValidationResult {
  isValid: boolean;
  insightId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Insight Export
 */
export interface AIInsightExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: AIInsightFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Insight Action
 */
export interface AIInsightAction extends BaseEntity, Timestamp {
  id: ID;
  insightId: ID;
  modelId: ID;
  userId: ID;
  action: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * AI Insight Feedback
 */
export interface AIInsightFeedback extends BaseEntity, Timestamp {
  id: ID;
  insightId: ID;
  modelId: ID;
  userId: ID;
  rating: number;
  comment?: string;
  isHelpful: boolean;
  isAccurate: boolean;
  isActionable: boolean;
  metadata?: Metadata;
}

/**
 * AI Insight Priority Factor
 */
export interface AIInsightPriorityFactorDetail extends BaseEntity, Timestamp {
  id: ID;
  insightId: ID;
  factor: AIInsightPriorityFactor;
  weight: AIInsightPriorityWeight;
  boost?: AIInsightPriorityBoost;
  penalty?: AIInsightPriorityPenalty;
  decay?: AIInsightPriorityDecay;
  threshold?: AIInsightPriorityThreshold;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Insight
  AI_INSIGHT,
  AIInsightType,
  AIInsightStatus,
  AIInsightCategory,
  AIInsightMethod,
  AIInsightPriority,
  AIInsightConfidence,
  AIInsightImpact,
  AIInsightQuality,
  AIInsightSource,
  AIInsightLimit,
  AIInsightFormat,
  AIInsightMetric,
  getAiInsightTypeLabel,
  getAiInsightStatusLabel,
  getAiInsightCategoryLabel,
  getAiInsightMethodLabel,
  getAiInsightPriorityLabel,
  getAiInsightConfidenceLabel,
  getAiInsightImpactLabel,
  getAiInsightQualityLabel,
  getAiInsightSourceLabel,
  getAiInsightFormatLabel,
  getAiInsightMetricLabel,
  isAiInsightActive,
  isAiInsightProcessing,
  isAiInsightFailed,
  getAiInsightPriorityScore,
  getAiInsightConfidenceScore,
  getAiInsightQualityScore,
  getAiInsightImpactScore,
  // Insight Type
  AI_INSIGHT_TYPE,
  AIInsightDomain,
  AIInsightSubType,
  AIInsightComplexity,
  AIInsightMaturity,
  AIInsightScope,
  AIInsightHorizon,
  getAiInsightDomainLabel,
  getAiInsightSubTypeLabel,
  getAiInsightComplexityLabel,
  getAiInsightMaturityLabel,
  getAiInsightScopeLabel,
  getAiInsightHorizonLabel,
  getAiInsightComplexityScore,
  getAiInsightMaturityScore,
  // Insight Status
  AI_INSIGHT_STATUS_TYPES,
  AI_INSIGHT_STATUS,
  AIInsightStatusType,
  AIInsightStatusCategory,
  AIInsightStatusSeverity,
  AIInsightStatusColor,
  getAiInsightStatusLabelDetailed,
  getAiInsightStatusCategory,
  getAiInsightStatusSeverity,
  getAiInsightStatusColor,
  isAiInsightActiveStatus,
  isAiInsightCompleted,
  isAiInsightFailedStatus,
  getAiInsightStatusProgress,
  // Insight Priority
  AI_INSIGHT_PRIORITY_FACTORS,
  AIInsightPriorityFactor,
  AIInsightPriorityWeight,
  AIInsightPriorityThreshold,
  AIInsightPriorityBoost,
  AIInsightPriorityPenalty,
  AIInsightPriorityDecay,
  getAiInsightPriorityFactorLabel,
  getAiInsightPriorityBoostLabel,
  getAiInsightPriorityPenaltyLabel,
  getAiInsightPriorityDecayLabel,
  getAiInsightPriorityThresholds,
  getAiInsightDefaultFactorWeights,
  getAiInsightDecayFactor,
};
