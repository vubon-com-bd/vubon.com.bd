/**
 * SEO Constants Index
 * Export all SEO constants and types for easy importing
 */

// SEO Constants
export {
  CONTENT_SEO,
  contentSeoGetTypeLabel,
  contentSeoGetStatusLabel,
  contentSeoGetPriorityLabel,
  contentSeoGetFrequencyLabel,
  contentSeoGetScoreLabel,
  contentSeoIsPublished,
  contentSeoIsEditable,
  contentSeoGetDefaultPriority,
  contentSeoGetDefaultFrequency,
  contentSeoGetMaxTitleLength,
  contentSeoGetMaxMetaDescriptionLength,
  contentSeoGetMaxKeywords,
  contentSeoIsValidType,
  contentSeoIsValidStatus,
  contentSeoIsValidPriority,
  contentSeoIsValidFrequency,
} from './seo.constants';

export type {
  ContentSEOType,
  ContentSEOStatus,
  ContentSEOPriority,
  ContentSEOFrequency,
  ContentSEOScore,
} from './seo.constants';

// SEO Meta Constants
export {
  CONTENT_SEO_META,
  contentSeoMetaGetTypeLabel,
  contentSeoMetaGetPropertyLabel,
  contentSeoMetaGetDefaultCharset,
  contentSeoMetaGetDefaultViewport,
  contentSeoMetaGetDefaultRobots,
  contentSeoMetaGetDefaultOGType,
  contentSeoMetaGetDefaultTwitterCard,
  contentSeoMetaGetMaxTitle,
  contentSeoMetaGetMaxDescription,
  contentSeoMetaIsValidType,
  contentSeoMetaIsValidProperty,
} from './seo-meta.constants';

export type { ContentSEOMetaType, ContentSEOMetaProperty } from './seo-meta.constants';

// SEO Robots Constants
export {
  CONTENT_SEO_ROBOTS,
  contentSeoRobotsGetDirectiveLabel,
  contentSeoRobotsGetRuleLabel,
  contentSeoRobotsGetActionLabel,
  contentSeoRobotsGetUserAgentLabel,
  contentSeoRobotsGetDefaultRule,
  contentSeoRobotsGetDefaultSitemapPriority,
  contentSeoRobotsGetDefaultCrawlDelay,
  contentSeoRobotsIsValidDirective,
  contentSeoRobotsIsValidRule,
} from './seo-robots.constants';

export type {
  ContentSEORobotsDirective,
  ContentSEORobotsAction,
  ContentSEORobotsRule,
  ContentSEORobotsUserAgent,
} from './seo-robots.constants';

// SEO Sitemap Constants
export {
  CONTENT_SEO_SITEMAP,
  contentSeoSitemapGetTypeLabel,
  contentSeoSitemapGetPriorityLabel,
  contentSeoSitemapGetFrequencyLabel,
  contentSeoSitemapGetFormatLabel,
  contentSeoSitemapGetDefaultPriority,
  contentSeoSitemapGetDefaultFrequency,
  contentSeoSitemapGetMaxUrls,
  contentSeoSitemapGetMaxSizeMB,
  contentSeoSitemapGetMaxIndex,
  contentSeoSitemapIsValidType,
  contentSeoSitemapIsValidPriority,
} from './seo-sitemap.constants';

export type {
  ContentSEOSitemapType,
  ContentSEOSitemapPriority,
  ContentSEOSitemapFrequency,
  ContentSEOSitemapFormat,
} from './seo-sitemap.constants';

// SEO Schema Constants
export {
  CONTENT_SEO_SCHEMA,
  contentSeoSchemaGetTypeLabel,
  contentSeoSchemaGetFormatLabel,
  contentSeoSchemaGetPropertyLabel,
  contentSeoSchemaGetDefaultFormat,
  contentSeoSchemaGetDefaultType,
  contentSeoSchemaIsValidType,
  contentSeoSchemaIsValidFormat,
} from './seo-schema.constants';

export type {
  ContentSEOSchemaType,
  ContentSEOSchemaFormat,
  ContentSEOSchemaProperty,
} from './seo-schema.constants';

// SEO Open Graph Constants
export {
  CONTENT_SEO_OPEN_GRAPH,
  contentSeoOpenGraphGetTypeLabel,
  contentSeoOpenGraphGetPropertyLabel,
  contentSeoOpenGraphGetImageTypeLabel,
  contentSeoOpenGraphGetDefaultType,
  contentSeoOpenGraphGetDefaultLocale,
  contentSeoOpenGraphGetDefaultImageWidth,
  contentSeoOpenGraphGetDefaultImageHeight,
  contentSeoOpenGraphIsValidType,
  contentSeoOpenGraphIsValidProperty,
} from './seo-open-graph.constants';

export type {
  ContentSEOOGType,
  ContentSEOOGProperty,
  ContentSEOOGImageType,
} from './seo-open-graph.constants';

// SEO Twitter Card Constants
export {
  CONTENT_SEO_TWITTER_CARD,
  contentSeoTwitterCardGetTypeLabel,
  contentSeoTwitterCardGetPropertyLabel,
  contentSeoTwitterCardGetImageTypeLabel,
  contentSeoTwitterCardGetDefaultCard,
  contentSeoTwitterCardGetDefaultImageWidth,
  contentSeoTwitterCardGetDefaultImageHeight,
  contentSeoTwitterCardIsValidType,
  contentSeoTwitterCardIsValidProperty,
} from './seo-twitter-card.constants';

export type {
  ContentSEOTwitterCardType,
  ContentSEOTwitterCardProperty,
  ContentSEOTwitterCardImageType,
} from './seo-twitter-card.constants';
