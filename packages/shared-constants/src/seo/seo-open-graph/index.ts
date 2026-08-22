/**
 * SEO Open Graph Constants Index
 * Export all SEO Open Graph constants and types for easy importing
 */

// SEO Open Graph Main Constants
export {
  SEO_OPEN_GRAPH,
  getSEOOpenGraphTypeLabel,
  getSEOOpenGraphStatusLabel,
  getSEOOpenGraphPropertyLabel,
  getSEOOpenGraphPlatformLabel,
  getSEOOpenGraphErrorLabel,
  getOGStatusColor,
  isOGValid,
  isOGActive,
  getOGImageRecommendation,
} from './seo-open-graph.constants';

export type {
  SEOOpenGraphType,
  SEOOpenGraphStatus,
  SEOOpenGraphProperty,
  SEOOpenGraphImageSize,
  SEOOpenGraphValidation,
  SEOOpenGraphPlatform,
  SEOOpenGraphErrorType,
  SEOOpenGraphMetric,
} from './seo-open-graph.constants';

// SEO Open Graph Type Constants
export {
  SEO_OPEN_GRAPH_TYPE,
  getSEOOpenGraphCategoryLabel,
  getSEOOpenGraphSubTypeLabel,
  getSEOOpenGraphContextLabel,
  getSEOOpenGraphPurposeLabel,
  getSEOOpenGraphComplexityLabel,
} from './seo-open-graph-type.constants';

export type {
  SEOOpenGraphTypeCategory,
  SEOOpenGraphTypeSubType,
  SEOOpenGraphTypeContext,
  SEOOpenGraphTypePurpose,
  SEOOpenGraphTypeComplexity,
} from './seo-open-graph-type.constants';

// SEO Open Graph Status Constants
export {
  SEO_OPEN_GRAPH_STATUS,
  getSEOOpenGraphLifecycleLabel,
  getSEOOpenGraphHealthLabel,
  getSEOOpenGraphQualityLabel,
  getSEOOpenGraphComplianceLabel,
  getSEOOpenGraphPerformanceLabel,
  getSEOOpenGraphStatusCategory,
  getSEOOpenGraphStatusColor,
  isOGValid as isOGLifecycleValid,
  isOGProcessing,
} from './seo-open-graph-status.constants';

export type {
  SEOOpenGraphLifecycleStatus,
  SEOOpenGraphHealthStatus,
  SEOOpenGraphQualityStatus,
  SEOOpenGraphComplianceStatus,
  SEOOpenGraphPerformanceStatus,
  SEOOpenGraphStatusCategory,
} from './seo-open-graph-status.constants';
