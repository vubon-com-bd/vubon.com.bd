/**
 * SEO Sitemap Constants Index
 * Export all SEO sitemap constants and types for easy importing
 */

// SEO Sitemap Main Constants
export {
  SEO_SITEMAP,
  getSEOSitemapTypeLabel,
  getSEOSitemapStatusLabel,
  getSEOSitemapPriorityLabel,
  getSEOSitemapChangeFrequencyLabel,
  getSEOSitemapFormatLabel,
  getSEOSitemapCompressionLabel,
  getSEOSitemapValidationLabel as getSEOSitemapValidationMainLabel,
  getSEOSitemapErrorLabel,
  getSEOSitemapSourceLabel,
  getSitemapStatusColor,
  isSitemapValid,
  isSitemapActive,
  getPriorityValue,
} from './seo-sitemap.constants';

export type {
  SEOSitemapType,
  SEOSitemapStatus,
  SEOSitemapPriority,
  SEOSitemapChangeFrequency,
  SEOSitemapFormat,
  SEOSitemapSize,
  SEOSitemapProtocol,
  SEOSitemapCompression,
  SEOSitemapValidation,
  SEOSitemapErrorType,
  SEOSitemapMetric,
  SEOSitemapSource,
} from './seo-sitemap.constants';

// SEO Sitemap Type Constants
export {
  SEO_SITEMAP_TYPE,
  getSEOSitemapCategoryLabel,
  getSEOSitemapSubTypeLabel,
  getSEOSitemapGeneratorLabel,
  getSEOSitemapScopeLabel,
  getSEOSitemapStructureLabel,
  getSEOSitemapAudienceLabel,
} from './seo-sitemap-type.constants';

export type {
  SEOSitemapTypeCategory,
  SEOSitemapTypeSubType,
  SEOSitemapTypeGenerator,
  SEOSitemapTypeScope,
  SEOSitemapTypeStructure,
  SEOSitemapTypeAudience,
} from './seo-sitemap-type.constants';

// SEO Sitemap Status Constants
export {
  SEO_SITEMAP_STATUS,
  getSEOSitemapLifecycleLabel,
  getSEOSitemapHealthLabel,
  getSEOSitemapQualityLabel,
  getSEOSitemapValidationLabel as getSEOSitemapValidationStatusLabel,
  getSEOSitemapIndexingLabel,
  getSEOSitemapStatusCategory,
  getSEOSitemapStatusColor,
  isSitemapValid as isSitemapLifecycleValid,
  isSitemapProcessing,
} from './seo-sitemap-status.constants';

export type {
  SEOSitemapLifecycleStatus,
  SEOSitemapHealthStatus,
  SEOSitemapQualityStatus,
  SEOSitemapValidationStatus,
  SEOSitemapIndexingStatus,
  SEOSitemapStatusCategory,
} from './seo-sitemap-status.constants';
