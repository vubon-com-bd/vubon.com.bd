/**
 * SEO Content Constants Index
 * Export all SEO content constants and types for easy importing
 */

// SEO Content Main Constants
export {
  SEO_CONTENT,
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
} from './seo-content.constants';

export type {
  SEOContentType,
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
} from './seo-content.constants';

// SEO Content Type Constants
export {
  SEO_CONTENT_TYPE,
  getSEOContentCategoryLabel,
  getSEOContentSubCategoryLabel,
  getSEOContentStyleLabel,
  getSEOContentComplexityLabel,
  getSEOContentAudienceLabel,
  getSEOContentFormatTypeLabel,
  getSEOContentSourceLabel,
} from './seo-content-type.constants';

export type {
  SEOContentTypeCategory,
  SEOContentTypeSubCategory,
  SEOContentTypeStyle,
  SEOContentTypeComplexity,
  SEOContentTypeAudience,
  SEOContentTypeFormat,
  SEOContentTypeSource,
} from './seo-content-type.constants';

// SEO Content Status Constants
export {
  SEO_CONTENT_STATUS,
  getSEOContentLifecycleLabel,
  getSEOContentWorkflowLabel,
  getSEOContentPublishingLabel,
  getSEOContentApprovalLabel,
  getSEOContentQualityLabel as getSEOContentQualityStatusLabel,
  getSEOContentStatusCategory,
  getSEOContentStatusColor,
  isContentReadyToPublish,
  isContentPublished as isSEOContentPublished,
  getProgressPercentage as getSEOContentProgressPercentage,
} from './seo-content-status.constants';

export type {
  SEOContentLifecycleStatus,
  SEOContentWorkflowStatus,
  SEOContentPublishingStatus,
  SEOContentQualityStatus,
  SEOContentApprovalStatus,
  SEOContentStatusCategory,
} from './seo-content-status.constants';

// SEO Content Optimization Constants
export {
  SEO_CONTENT_OPTIMIZATION,
  getSEOContentOptimizationTypeLabel,
  getSEOContentOptimizationStatusLabel,
  getSEOContentOptimizationTechniqueLabel,
  getSEOContentOptimizationPriorityLabel,
  getSEOContentOptimizationImpactLabel,
  getSEOContentOptimizationEffortLabel,
  getSEOContentOptimizationToolLabel,
} from './seo-content-optimization.constants';

export type {
  SEOContentOptimizationType,
  SEOContentOptimizationStatus,
  SEOContentOptimizationTechnique,
  SEOContentOptimizationPriority,
  SEOContentOptimizationImpact,
  SEOContentOptimizationEffort,
  SEOContentOptimizationTool,
  SEOContentOptimizationMetric,
  SEOContentOptimizationRecommendation,
} from './seo-content-optimization.constants';

// SEO Content Optimization Type Constants
export {
  SEO_CONTENT_OPTIMIZATION_TYPE,
  getSEOContentOptimizationCategoryLabel,
  getSEOContentOptimizationApproachLabel,
  getSEOContentOptimizationStrategyLabel,
  getSEOContentOptimizationPhaseLabel,
  getSEOContentOptimizationScopeLabel,
  getSEOContentOptimizationTriggerLabel,
} from './seo-content-optimization-type.constants';

export type {
  SEOContentOptimizationTypeCategory,
  SEOContentOptimizationTypeApproach,
  SEOContentOptimizationTypeStrategy,
  SEOContentOptimizationTypePhase,
  SEOContentOptimizationTypeScope,
  SEOContentOptimizationTypeTrigger,
} from './seo-content-optimization-type.constants';

// SEO Content Optimization Status Constants
export {
  SEO_CONTENT_OPTIMIZATION_STATUS,
  getSEOContentOptimizationProcessLabel,
  getSEOContentOptimizationResultLabel,
  getSEOContentOptimizationPerformanceLabel,
  getSEOContentOptimizationHealthLabel,
  getSEOContentOptimizationValidationLabel,
  getSEOContentOptimizationStatusCategory,
  getSEOContentOptimizationStatusColor,
  isOptimizationSuccessful,
  isOptimizationInProgress,
  getProgressPercentage as getSEOOptimizationProgressPercentage,
} from './seo-content-optimization-status.constants';

export type {
  SEOContentOptimizationProcessStatus,
  SEOContentOptimizationResultStatus,
  SEOContentOptimizationPerformanceStatus,
  SEOContentOptimizationHealthStatus,
  SEOContentOptimizationValidationStatus,
  SEOContentOptimizationStatusCategory,
} from './seo-content-optimization-status.constants';
