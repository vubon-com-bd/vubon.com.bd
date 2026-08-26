/**
 * SEO Content Optimization Types
 * Type definitions for SEO content optimization based on shared-constants
 * @module SEOContentOptimizationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants seo content optimization
// ============================================================
import {
  // SEO Content Optimization
  SEO_CONTENT_OPTIMIZATION,
  SEOContentOptimizationType,
  SEOContentOptimizationStatus,
  SEOContentOptimizationTechnique,
  SEOContentOptimizationPriority,
  SEOContentOptimizationImpact,
  SEOContentOptimizationEffort,
  SEOContentOptimizationTool,
  SEOContentOptimizationMetric,
  SEOContentOptimizationRecommendation,
  getSEOContentOptimizationTypeLabel,
  getSEOContentOptimizationStatusLabel,
  getSEOContentOptimizationTechniqueLabel,
  getSEOContentOptimizationPriorityLabel,
  getSEOContentOptimizationImpactLabel,
  getSEOContentOptimizationEffortLabel,
  getSEOContentOptimizationToolLabel,
  // SEO Content Optimization Type
  SEO_CONTENT_OPTIMIZATION_TYPE,
  SEOContentOptimizationTypeCategory,
  SEOContentOptimizationTypeApproach,
  SEOContentOptimizationTypeStrategy,
  SEOContentOptimizationTypePhase,
  SEOContentOptimizationTypeScope,
  SEOContentOptimizationTypeTrigger,
  getSEOContentOptimizationCategoryLabel,
  getSEOContentOptimizationApproachLabel,
  getSEOContentOptimizationStrategyLabel,
  getSEOContentOptimizationPhaseLabel,
  getSEOContentOptimizationScopeLabel,
  getSEOContentOptimizationTriggerLabel,
  // SEO Content Optimization Status
  SEO_CONTENT_OPTIMIZATION_STATUS,
  SEOContentOptimizationProcessStatus,
  SEOContentOptimizationResultStatus,
  SEOContentOptimizationPerformanceStatus,
  SEOContentOptimizationHealthStatus,
  SEOContentOptimizationValidationStatus,
  SEOContentOptimizationStatusCategory,
  getSEOContentOptimizationProcessLabel,
  getSEOContentOptimizationResultLabel,
  getSEOContentOptimizationPerformanceLabel,
  getSEOContentOptimizationHealthLabel,
  getSEOContentOptimizationValidationLabel,
  getSEOContentOptimizationStatusCategory,
  getSEOContentOptimizationStatusColor,
  isOptimizationSuccessful,
  isOptimizationInProgress,
  getSEOOptimizationProgressPercentage,
} from '@vubon/shared-constants';

// ============================================================
// SEO Content Optimization Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * SEO content optimization filter
 */
export interface SEOContentOptimizationFilter {
  ids?: ID[];
  contentIds?: ID[];
  types?: SEOContentOptimizationType[];
  statuses?: SEOContentOptimizationStatus[];
  techniques?: SEOContentOptimizationTechnique[];
  priorities?: SEOContentOptimizationPriority[];
  impacts?: SEOContentOptimizationImpact[];
  efforts?: SEOContentOptimizationEffort[];
  tools?: SEOContentOptimizationTool[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isOptimized?: boolean;
  isInProgress?: boolean;
  isSuccessful?: boolean;
  minImpact?: number;
  maxImpact?: number;
  minEffort?: number;
  maxEffort?: number;
  searchTerm?: string;
}

/**
 * SEO content optimization statistics
 */
export interface SEOContentOptimizationStatistics {
  contentId: ID;
  totalOptimizations: number;
  successfulOptimizations: number;
  inProgressOptimizations: number;
  byType: Record<SEOContentOptimizationType, number>;
  byStatus: Record<SEOContentOptimizationStatus, number>;
  byTechnique: Record<SEOContentOptimizationTechnique, number>;
  byPriority: Record<SEOContentOptimizationPriority, number>;
  byImpact: Record<SEOContentOptimizationImpact, number>;
  byEffort: Record<SEOContentOptimizationEffort, number>;
  byTool: Record<SEOContentOptimizationTool, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageImpact: number;
  averageEffort: number;
  successRate: number;
  mostFrequentType: SEOContentOptimizationType;
  mostFrequentTechnique: SEOContentOptimizationTechnique;
  mostFrequentPriority: SEOContentOptimizationPriority;
}

/**
 * SEO content optimization summary
 */
export interface SEOContentOptimizationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalOptimizations: number;
  successful: number;
  inProgress: number;
  byType: Record<SEOContentOptimizationType, number>;
  byStatus: Record<SEOContentOptimizationStatus, number>;
  byTechnique: Record<SEOContentOptimizationTechnique, number>;
  byPriority: Record<SEOContentOptimizationPriority, number>;
  byImpact: Record<SEOContentOptimizationImpact, number>;
  byEffort: Record<SEOContentOptimizationEffort, number>;
  byTool: Record<SEOContentOptimizationTool, number>;
  optimizationTrend: {
    date: Date;
    total: number;
    successful: number;
    inProgress: number;
  }[];
  topTypes: {
    type: SEOContentOptimizationType;
    count: number;
    label: string;
  }[];
  topTechniques: {
    technique: SEOContentOptimizationTechnique;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SEOContentOptimizationPriority;
    count: number;
    label: string;
  }[];
  impactSummary: {
    average: number;
    max: number;
    min: number;
  };
  effortSummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO content optimization configuration
 */
export interface SEOContentOptimizationConfiguration {
  enabled: boolean;
  defaultType: SEOContentOptimizationType;
  defaultTechnique: SEOContentOptimizationTechnique;
  defaultPriority: SEOContentOptimizationPriority;
  defaultTool: SEOContentOptimizationTool;
  minImpact: number;
  maxImpact: number;
  minEffort: number;
  maxEffort: number;
  allowMultipleTypes: boolean;
  autoOptimize: boolean;
  requireApproval: boolean;
  requireImpactAnalysis: boolean;
  requireEffortAnalysis: boolean;
  maxOptimizationsPerContent: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnSuccess: boolean;
  notificationOnFailure: boolean;
  alertConfig?: SEOContentOptimizationAlertConfig;
}

/**
 * SEO content optimization alert configuration
 */
export interface SEOContentOptimizationAlertConfig {
  enabled: boolean;
  lowImpactAlert: boolean;
  highEffortAlert: boolean;
  failureAlert: boolean;
  duplicationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  impactThreshold: number;
  effortThreshold: number;
}

/**
 * SEO content optimization history
 */
export interface SEOContentOptimizationHistory extends BaseEntity, Timestamp {
  id: ID;
  optimizationId: ID;
  contentId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'complete'
    | 'fail'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO content optimization validation
 */
export interface SEOContentOptimizationValidation {
  isValid: boolean;
  optimizationId: ID;
  contentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO content optimization result
 */
export interface SEOContentOptimizationResult extends BaseEntity, Timestamp {
  id: ID;
  optimizationId: ID;
  contentId: ID;
  before: {
    quality: number;
    readability: number;
    length: number;
    keywordDensity: number;
  };
  after: {
    quality: number;
    readability: number;
    length: number;
    keywordDensity: number;
  };
  improvements: {
    quality: number;
    readability: number;
    length: number;
    keywordDensity: number;
  };
  score: number;
  isSuccessful: boolean;
  completedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO content optimization export
 */
export interface SEOContentOptimizationExport extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SEOContentOptimizationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOContentOptimization বাদে)
// ============================================================

export {
  // SEO Content Optimization (SEOContentOptimization টাইপ বাদে)
  SEO_CONTENT_OPTIMIZATION,
  SEOContentOptimizationType,
  SEOContentOptimizationStatus,
  SEOContentOptimizationTechnique,
  SEOContentOptimizationPriority,
  SEOContentOptimizationImpact,
  SEOContentOptimizationEffort,
  SEOContentOptimizationTool,
  SEOContentOptimizationMetric,
  SEOContentOptimizationRecommendation,
  getSEOContentOptimizationTypeLabel,
  getSEOContentOptimizationStatusLabel,
  getSEOContentOptimizationTechniqueLabel,
  getSEOContentOptimizationPriorityLabel,
  getSEOContentOptimizationImpactLabel,
  getSEOContentOptimizationEffortLabel,
  getSEOContentOptimizationToolLabel,
  // SEO Content Optimization Type
  SEO_CONTENT_OPTIMIZATION_TYPE,
  SEOContentOptimizationTypeCategory,
  SEOContentOptimizationTypeApproach,
  SEOContentOptimizationTypeStrategy,
  SEOContentOptimizationTypePhase,
  SEOContentOptimizationTypeScope,
  SEOContentOptimizationTypeTrigger,
  getSEOContentOptimizationCategoryLabel,
  getSEOContentOptimizationApproachLabel,
  getSEOContentOptimizationStrategyLabel,
  getSEOContentOptimizationPhaseLabel,
  getSEOContentOptimizationScopeLabel,
  getSEOContentOptimizationTriggerLabel,
  // SEO Content Optimization Status
  SEO_CONTENT_OPTIMIZATION_STATUS,
  SEOContentOptimizationProcessStatus,
  SEOContentOptimizationResultStatus,
  SEOContentOptimizationPerformanceStatus,
  SEOContentOptimizationHealthStatus,
  SEOContentOptimizationValidationStatus,
  SEOContentOptimizationStatusCategory,
  getSEOContentOptimizationProcessLabel,
  getSEOContentOptimizationResultLabel,
  getSEOContentOptimizationPerformanceLabel,
  getSEOContentOptimizationHealthLabel,
  getSEOContentOptimizationValidationLabel,
  getSEOContentOptimizationStatusCategory,
  getSEOContentOptimizationStatusColor,
  isOptimizationSuccessful,
  isOptimizationInProgress,
  getSEOOptimizationProgressPercentage,
};
