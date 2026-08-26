/**
 * SEO Content Types
 * Type definitions for SEO content based on shared-constants
 * @module SEOContentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOContentType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo content
// ============================================================
import {
  // SEO Content Main
  SEO_CONTENT,
  SEOContentStatus,
  SEOContentPriority,
  SEOContentFormat,
  SEOContentLengthCategory,
  SEOContentQualityLevel,
  SEOContentReadabilityLevel,
  SEOContentTone,
  SEOContentPurpose,
  SEOContentPlatform,
  SEOContentDistributionChannel,
  SEOContentMetric,
  SEOContentErrorType,
  getSEOContentTypeLabel,
  getSEOContentStatusLabel,
  getSEOContentPriorityLabel,
  getSEOContentFormatLabel,
  getSEOContentLengthCategory,
  getSEOContentQualityLabel,
  getSEOContentToneLabel,
  getSEOContentPurposeLabel,
  getSEOContentPlatformLabel,
  getSEOContentErrorLabel,
  isContentPublished,
  isContentActive,
  getContentStatusColor,
  // SEO Content Type
  SEO_CONTENT_TYPE,
  SEOContentTypeCategory,
  SEOContentTypeSubCategory,
  SEOContentTypeStyle,
  SEOContentTypeComplexity,
  SEOContentTypeAudience,
  SEOContentTypeFormat,
  SEOContentTypeSource,
  getSEOContentCategoryLabel,
  getSEOContentSubCategoryLabel,
  getSEOContentStyleLabel,
  getSEOContentComplexityLabel,
  getSEOContentAudienceLabel,
  getSEOContentFormatTypeLabel,
  getSEOContentSourceLabel,
  // SEO Content Status
  SEO_CONTENT_STATUS,
  SEOContentLifecycleStatus,
  SEOContentWorkflowStatus,
  SEOContentPublishingStatus,
  SEOContentQualityStatus,
  SEOContentApprovalStatus,
  SEOContentStatusCategory,
  getSEOContentLifecycleLabel,
  getSEOContentWorkflowLabel,
  getSEOContentPublishingLabel,
  getSEOContentApprovalLabel,
  getSEOContentQualityStatusLabel,
  getSEOContentStatusCategory,
  getSEOContentStatusColor,
  isContentReadyToPublish,
  isSEOContentPublished,
  getSEOContentProgressPercentage,
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
// SEO Content Extended Types
// ============================================================

/**
 * SEO content
 */
export interface SEOContent extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  type: SEOContentType;
  status: SEOContentStatus;
  priority: SEOContentPriority;
  format: SEOContentFormat;
  title: string;
  body: string;
  excerpt?: string;
  lengthCategory: SEOContentLengthCategory;
  qualityLevel: SEOContentQualityLevel;
  readabilityLevel: SEOContentReadabilityLevel;
  tone: SEOContentTone;
  purpose: SEOContentPurpose;
  platform: SEOContentPlatform;
  distributionChannel: SEOContentDistributionChannel;
  metric: SEOContentMetric;
  isPublished: boolean;
  isActive: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO content optimization
 */
export interface SEOContentOptimization extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  type: SEOContentOptimizationType;
  status: SEOContentOptimizationStatus;
  technique: SEOContentOptimizationTechnique;
  priority: SEOContentOptimizationPriority;
  impact: SEOContentOptimizationImpact;
  effort: SEOContentOptimizationEffort;
  tool: SEOContentOptimizationTool;
  metric: SEOContentOptimizationMetric;
  recommendation: SEOContentOptimizationRecommendation;
  suggestion: string;
  isOptimized: boolean;
  isInProgress: boolean;
  isSuccessful: boolean;
  optimizedAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO content filter
 */
export interface SEOContentFilter {
  ids?: ID[];
  projectIds?: ID[];
  types?: SEOContentType[];
  statuses?: SEOContentStatus[];
  priorities?: SEOContentPriority[];
  formats?: SEOContentFormat[];
  platforms?: SEOContentPlatform[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isActive?: boolean;
  isOptimized?: boolean;
  minLength?: number;
  maxLength?: number;
  minQuality?: number;
  maxQuality?: number;
  searchTerm?: string;
}

/**
 * SEO content statistics
 */
export interface SEOContentStatistics {
  projectId: ID;
  totalContent: number;
  publishedContent: number;
  activeContent: number;
  optimizedContent: number;
  byType: Record<SEOContentType, number>;
  byStatus: Record<SEOContentStatus, number>;
  byPriority: Record<SEOContentPriority, number>;
  byFormat: Record<SEOContentFormat, number>;
  byPlatform: Record<SEOContentPlatform, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageLength: number;
  averageQuality: number;
  averageReadability: number;
  mostFrequentType: SEOContentType;
  mostFrequentStatus: SEOContentStatus;
  mostFrequentFormat: SEOContentFormat;
}

/**
 * SEO content summary
 */
export interface SEOContentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalContent: number;
  published: number;
  active: number;
  optimized: number;
  byType: Record<SEOContentType, number>;
  byStatus: Record<SEOContentStatus, number>;
  byPriority: Record<SEOContentPriority, number>;
  byFormat: Record<SEOContentFormat, number>;
  byPlatform: Record<SEOContentPlatform, number>;
  contentTrend: {
    date: Date;
    total: number;
    published: number;
    optimized: number;
  }[];
  topTypes: {
    type: SEOContentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOContentStatus;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SEOContentFormat;
    count: number;
    label: string;
  }[];
  qualitySummary: {
    average: number;
    max: number;
    min: number;
  };
  readabilitySummary: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO content configuration
 */
export interface SEOContentConfiguration {
  enabled: boolean;
  defaultType: SEOContentType;
  defaultStatus: SEOContentStatus;
  defaultPriority: SEOContentPriority;
  defaultFormat: SEOContentFormat;
  defaultPlatform: SEOContentPlatform;
  minLength: number;
  maxLength: number;
  minQuality: number;
  maxQuality: number;
  minReadability: number;
  maxReadability: number;
  allowMultipleTypes: boolean;
  autoOptimize: boolean;
  autoPublish: boolean;
  requireApproval: boolean;
  requireQualityCheck: boolean;
  requireReadabilityCheck: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnOptimization: boolean;
  alertConfig?: SEOContentAlertConfig;
}

/**
 * SEO content alert configuration
 */
export interface SEOContentAlertConfig {
  enabled: boolean;
  qualityAlert: boolean;
  readabilityAlert: boolean;
  lengthAlert: boolean;
  duplicationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  qualityThreshold: number;
  readabilityThreshold: number;
  lengthThreshold: number;
}

/**
 * SEO content history
 */
export interface SEOContentHistory extends BaseEntity, Timestamp {
  id: ID;
  contentId: ID;
  projectId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'activate'
    | 'deactivate'
    | 'optimize'
    | 'delete'
    | 'restore'
    | 'quality_update'
    | 'readability_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO content validation
 */
export interface SEOContentValidation {
  isValid: boolean;
  contentId: ID;
  projectId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO content export
 */
export interface SEOContentExport extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'markdown';
  filter: SEOContentFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOContentType বাদে - এটি কমন থেকে আসে)
// ============================================================

export {
  // SEO Content Main (SEOContentType বাদে)
  SEO_CONTENT,
  SEOContentStatus,
  SEOContentPriority,
  SEOContentFormat,
  SEOContentLengthCategory,
  SEOContentQualityLevel,
  SEOContentReadabilityLevel,
  SEOContentTone,
  SEOContentPurpose,
  SEOContentPlatform,
  SEOContentDistributionChannel,
  SEOContentMetric,
  SEOContentErrorType,
  getSEOContentTypeLabel,
  getSEOContentStatusLabel,
  getSEOContentPriorityLabel,
  getSEOContentFormatLabel,
  getSEOContentLengthCategory,
  getSEOContentQualityLabel,
  getSEOContentToneLabel,
  getSEOContentPurposeLabel,
  getSEOContentPlatformLabel,
  getSEOContentErrorLabel,
  isContentPublished,
  isContentActive,
  getContentStatusColor,
  // SEO Content Type (SEOContentType বাদে)
  SEO_CONTENT_TYPE,
  SEOContentTypeCategory,
  SEOContentTypeSubCategory,
  SEOContentTypeStyle,
  SEOContentTypeComplexity,
  SEOContentTypeAudience,
  SEOContentTypeFormat,
  SEOContentTypeSource,
  getSEOContentCategoryLabel,
  getSEOContentSubCategoryLabel,
  getSEOContentStyleLabel,
  getSEOContentComplexityLabel,
  getSEOContentAudienceLabel,
  getSEOContentFormatTypeLabel,
  getSEOContentSourceLabel,
  // SEO Content Status
  SEO_CONTENT_STATUS,
  SEOContentLifecycleStatus,
  SEOContentWorkflowStatus,
  SEOContentPublishingStatus,
  SEOContentQualityStatus,
  SEOContentApprovalStatus,
  SEOContentStatusCategory,
  getSEOContentLifecycleLabel,
  getSEOContentWorkflowLabel,
  getSEOContentPublishingLabel,
  getSEOContentApprovalLabel,
  getSEOContentQualityStatusLabel,
  getSEOContentStatusCategory,
  getSEOContentStatusColor,
  isContentReadyToPublish,
  isSEOContentPublished,
  getSEOContentProgressPercentage,
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
};
