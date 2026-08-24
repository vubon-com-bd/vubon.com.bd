/**
 * SEO Analytics Constants Index
 * Export all SEO analytics constants and types for easy importing
 */

// SEO Analytics Main Constants
export {
  SEO_ANALYTICS,
  getSEOAnalyticsTypeLabel,
  getSEOAnalyticsStatusLabel,
  getSEOAnalyticsTimeframeLabel,
  getSEOAnalyticsAggregationLabel,
  getSEOAnalyticsDimensionLabel,
  getSEOAnalyticsSourceLabel,
  getSEOAnalyticsFrequencyLabel,
  getSEOAnalyticsErrorLabel,
  getAnalyticsStatusColor,
  isSEOAnalyticsComplete,
  isSEOAnalyticsProcessing,
} from './seo-analytics.constants';

export type {
  SEOAnalyticsType,
  SEOAnalyticsStatus,
  SEOAnalyticsTimeframe,
  SEOAnalyticsAggregation,
  SEOAnalyticsDimension,
  SEOAnalyticsSource,
  SEOAnalyticsFrequency,
  SEOAnalyticsErrorType,
} from './seo-analytics.constants';

// SEO Analytics Type Constants
export {
  SEO_ANALYTICS_TYPE,
  getSEOAnalyticsCategoryLabel,
  getSEOAnalyticsSubTypeLabel,
  getSEOAnalyticsScopeLabel,
  getSEOAnalyticsGranularityLabel,
  getSEOAnalyticsContextLabel,
  getSEOAnalyticsPurposeLabel,
} from './seo-analytics-type.constants';

export type {
  SEOAnalyticsTypeCategory,
  SEOAnalyticsTypeSubType,
  SEOAnalyticsTypeScope,
  SEOAnalyticsTypeGranularity,
  SEOAnalyticsTypeContext,
  SEOAnalyticsTypePurpose,
} from './seo-analytics-type.constants';

// SEO Analytics Metric Constants
export {
  SEO_ANALYTICS_METRIC,
  getSEOAnalyticsMetricLabel,
  getSEOAnalyticsMetricCategory,
} from './seo-analytics-metric.constants';

export type {
  SEOAnalyticsMetricTraffic,
  SEOAnalyticsMetricAcquisition,
  SEOAnalyticsMetricConversion,
  SEOAnalyticsMetricEngagement,
  SEOAnalyticsMetricTechnical,
  SEOAnalyticsMetricPerformance,
  SEOAnalyticsMetricBacklink,
  SEOAnalyticsMetricContent,
  SEOAnalyticsMetricMobile,
  SEOAnalyticsMetricSocial,
  SEOAnalyticsMetricRevenue,
} from './seo-analytics-metric.constants';
