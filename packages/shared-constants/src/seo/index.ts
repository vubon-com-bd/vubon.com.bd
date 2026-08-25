/**
 * SEO Constants Index
 * Export all SEO constants and types for easy importing
 */

// SEO Main Constants
export {
  SEO,
  getSEOPriorityLabel,
  getSEOStatusLabel,
  getSEOScoreLabel,
  getSEOScoreColor,
  isSEOTitleValid,
  isSEODescriptionValid,
  getSEOOptimalTitleLength,
  getSEOOptimalDescriptionLength,
  getSEOErrorLabel,
  getSEORecommendationLabel,
  getSEOMetaTagName,
} from './seo.constants';

export type {
  SEOStrategyType as SEOStrategyMainType,
  SEOStatus,
  SEOPriority,
  SEOMetaTag,
  SEOOGTag,
  SEOTwitterCard,
  SEOSitemapType,
  SEOKeywordType as SEOKeywordMainType,
  SEOKeywordIntent as SEOKeywordMainIntent,
  SEOContentType,
  SEOTool,
  SEORecommendation,
  SEOErrorType,
} from './seo.constants';

// SEO Type Constants
export {
  SEO_TYPE,
  getSEOPageTypeLabel,
  getSEOSearchEngineLabel,
  getSEORichSnippetLabel,
  getSEOEcommerceTypeLabel,
  getSEOMobileTypeLabel,
} from './seo-type.constants';

export type {
  SEOTypeCategory,
  SEOTypePageType,
  SEOTypeContentType,
  SEOTypeLinkAttribute,
  SEOTypeMobileType,
  SEOTypeInternationalType,
  SEOTypeSearchEngine,
  SEOTypeAlgorithmUpdate,
  SEOTypeRichSnippet,
  SEOTypeLocalType,
  SEOTypeEcommerceType,
} from './seo-type.constants';

// SEO Status Constants
export {
  SEO_STATUS,
  getSEOTaskStatusLabel,
  getSEOPageStatusLabel,
  getSEOLinkStatusLabel,
  getSEOIndexStatusLabel,
  getSEOTaskPriorityLabel,
  getSEOStatusCategory,
  getSEOStatusColor,
  isSEOTaskComplete,
  isSEOTaskBlocked,
  isSEOPagePublished,
  isSEOIndexed,
} from './seo-status.constants';

export type {
  SEOTaskStatus,
  SEOPageStatus,
  SEOLinkStatus as SEOGeneralLinkStatus,
  SEOIndexStatus,
  SEOCrawlStatus,
  SEOTaskPriority,
  SEOStatusCategory,
  SEOStatusValue,
} from './seo-status.constants';

// SEO Priority Constants
export {
  SEO_PRIORITY,
  getSEOPriorityLevelLabel,
  getSEOPriorityScoreLabel,
  getSEOPriorityImpactLabel,
  getSEOPriorityEffortLabel,
  getSEOPriorityTimeFrameLabel,
  calculateSEOPriorityScore,
  getSEOPriorityLevelFromScore,
  getSEOPriorityValue,
  shouldSEOPrioritizeOver,
  getSEOPriorityColor,
} from './seo-priority.constants';

// SEO Error Constants
export {
  SEO_ERROR,
  getSEOError,
  getSEOMessage,
  getSEODescription,
  isSEOError,
  getSEOErrorCategory,
} from './seo-error.constants';

export type { SEOErrorCode, SEOErrorMessage } from './seo-error.constants';

// seo-audit Constants
export * from './seo-audit';

// seo-content Constants
export * from './seo-content';

// seo-keyword Constants
export * from './seo-keyword';

// seo-link Constants
export * from './seo-link';

// seo-open-graph Constants
export * from './seo-open-graph';

// seo-ranking Constants
export * from './seo-ranking';

// seo-robots Constants
export * from './seo-robots';

// seo-schema Constants
export * from './seo-schema';

// seo-score Constants
export * from './seo-score';

// seo-sitemap Constants
export * from './seo-sitemap';

// seo-strategy Constants
export * from './seo-strategy';

// seo-twitter-card Constants
export * from './seo-twitter-card';
