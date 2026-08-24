/**
 * SEO Types
 * Type definitions for Search Engine Optimization based on SEO constants
 * @module SEOTypes
 */

import { BaseEntity, Timestamp, Slug } from './core-primitives.types';

// Import from shared-constants SEO
import {
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
  getSEOPageTypeLabel,
  getSEOSearchEngineLabel,
  getSEORichSnippetLabel,
  getSEOEcommerceTypeLabel,
  getSEOMobileTypeLabel,
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
  getSEOError,
  getSEOMessage,
  getSEODescription,
  isSEOError,
  getSEOErrorCategory,
} from '@vubon/shared-constants';

/**
 * SEO status from shared-constants
 * Based on SEO_STATUS from seo.constants
 */
export type SEOStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED' | 'PENDING';

/**
 * SEO priority from shared-constants
 * Based on SEO_PRIORITY from seo.constants
 */
export type SEOPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

/**
 * SEO strategy type from shared-constants
 * Based on SEO_TYPE from seo-type.constants
 */
export type SEOStrategyType =
  | 'CONTENT'
  | 'TECHNICAL'
  | 'ON_PAGE'
  | 'OFF_PAGE'
  | 'LOCAL'
  | 'VOICE'
  | 'MOBILE'
  | 'VIDEO'
  | 'E_COMMERCE'
  | 'INTERNATIONAL';

/**
 * SEO keyword type from shared-constants
 */
export type SEOKeywordType =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'LONG_TAIL'
  | 'LSI'
  | 'BRANDED'
  | 'QUESTION'
  | 'TRANSACTIONAL'
  | 'INFORMATIONAL';

/**
 * SEO keyword intent from shared-constants
 */
export type SEOKeywordIntent =
  'INFORMATIONAL' | 'NAVIGATIONAL' | 'COMMERCIAL' | 'TRANSACTIONAL' | 'LOCAL' | 'VOICE';

/**
 * SEO content type from shared-constants
 */
export type SEOContentType =
  | 'BLOG_POST'
  | 'PAGE'
  | 'PRODUCT'
  | 'CATEGORY'
  | 'LANDING_PAGE'
  | 'GUIDE'
  | 'TUTORIAL'
  | 'CASE_STUDY'
  | 'WHITE_PAPER'
  | 'NEWS'
  | 'VIDEO'
  | 'PODCAST'
  | 'WEBINAR'
  | 'EBOOK';

/**
 * SEO link type from shared-constants
 */
export type SEOLinkType =
  'INTERNAL' | 'EXTERNAL' | 'INCOMING' | 'OUTGOING' | 'FOLLOW' | 'NOFOLLOW' | 'SPONSORED' | 'UGC';

/**
 * SEO audit type from shared-constants
 */
export type SEOAuditType =
  'TECHNICAL' | 'CONTENT' | 'LINK' | 'MOBILE' | 'SITE' | 'PAGE' | 'COMPREHENSIVE' | 'COMPETITOR';

/**
 * SEO audit severity from shared-constants
 */
export type SEOAuditSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

/**
 * SEO score type from shared-constants
 */
export type SEOScoreType =
  | 'OVERALL'
  | 'TECHNICAL'
  | 'CONTENT'
  | 'UX'
  | 'MOBILE'
  | 'PERFORMANCE'
  | 'ACCESSIBILITY'
  | 'SECURITY';

/**
 * SEO sitemap type from shared-constants
 */
export type SEOSitemapType = 'XML' | 'XML_GZIP' | 'TXT' | 'HTML' | 'IMAGE' | 'VIDEO';

/**
 * SEO robots directive from shared-constants
 */
export type SEORobotsDirective =
  | 'INDEX'
  | 'NOINDEX'
  | 'FOLLOW'
  | 'NOFOLLOW'
  | 'ARCHIVE'
  | 'NOARCHIVE'
  | 'SNIPPET'
  | 'NOSNIPPET'
  | 'ODP'
  | 'NOODP'
  | 'YDIR'
  | 'NOYDIR'
  | 'IMAGEINDEX'
  | 'NOIMAGEINDEX';

/**
 * SEO schema type from shared-constants
 */
export type SEOSchemaType =
  | 'ARTICLE'
  | 'BLOG_POST'
  | 'PRODUCT'
  | 'OFFER'
  | 'REVIEW'
  | 'RATING'
  | 'ORGANIZATION'
  | 'PERSON'
  | 'EVENT'
  | 'FAQ'
  | 'HOW_TO'
  | 'BREADCRUMB'
  | 'SITE_NAVIGATION'
  | 'VIDEO_OBJECT'
  | 'IMAGE_OBJECT'
  | 'LOCAL_BUSINESS';

/**
 * SEO Open Graph type from shared-constants
 */
export type SEOOpenGraphType =
  'WEBSITE' | 'ARTICLE' | 'BOOK' | 'PROFILE' | 'PRODUCT' | 'VIDEO' | 'MUSIC' | 'MOVIE';

/**
 * SEO Twitter Card type from shared-constants
 */
export type SEOTwitterCardType = 'SUMMARY' | 'SUMMARY_LARGE_IMAGE' | 'APP' | 'PLAYER' | 'PRODUCT';

/**
 * Search engine
 */
export type SearchEngine =
  'GOOGLE' | 'BING' | 'YAHOO' | 'DUCKDUCKGO' | 'YANDEX' | 'BAIDU' | 'NAVER';

/**
 * SEO metadata for pages
 */
export interface SeoMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  robots?: SeoRobots;
  openGraph?: OpenGraph;
  twitterCard?: TwitterCard;
  structuredData?: StructuredData[];
  metaTags?: Record<string, string>;
}

/**
 * SEO robots meta tag
 */
export interface SeoRobots {
  index?: boolean;
  follow?: boolean;
  archive?: boolean;
  snippet?: boolean;
  odp?: boolean;
  ydir?: boolean;
  imageIndex?: boolean;
}

/**
 * SEO strategy
 */
export interface SeoStrategy extends BaseEntity, Timestamp {
  name: string;
  type: SEOStrategyType;
  description?: string;
  keywords: SeoKeyword[];
  targetAudience?: string;
  status: SEOStatus;
  priority: SEOPriority;
  implementedAt?: Date;
}

/**
 * SEO keyword
 */
export interface SeoKeyword extends BaseEntity, Timestamp {
  keyword: string;
  type: SEOKeywordType;
  searchVolume?: number;
  difficulty?: number;
  intent?: SEOKeywordIntent;
  cpc?: number;
  competition?: 'LOW' | 'MEDIUM' | 'HIGH';
  relatedKeywords?: string[];
  status: SEOStatus;
}

/**
 * SEO content
 */
export interface SeoContent extends BaseEntity, Timestamp {
  title: string;
  slug: Slug;
  type: SEOContentType;
  body: string;
  excerpt?: string;
  keywords: SeoKeyword[];
  optimization?: SeoContentOptimization;
  status: SEOStatus;
  publishedAt?: Date;
  reviewedAt?: Date;
}

/**
 * SEO content optimization
 */
export interface SeoContentOptimization {
  readabilityScore?: number;
  keywordDensity?: number;
  internalLinks?: number;
  externalLinks?: number;
  imagesWithAlt?: number;
  headingStructure?: Record<string, number>;
  suggestions?: string[];
  seoScore?: number;
}

/**
 * SEO link
 */
export interface SeoLink extends BaseEntity, Timestamp {
  url: string;
  anchorText?: string;
  type: SEOLinkType;
  attributes?: SeoLinkAttributes;
  sourceId: string;
  targetId?: string;
  status: SEOStatus;
}

/**
 * SEO link attributes
 */
export interface SeoLinkAttributes {
  rel?: 'FOLLOW' | 'NOFOLLOW';
  target?: '_blank' | '_self' | '_parent' | '_top';
  title?: string;
  sponsored?: boolean;
  ugc?: boolean;
}

/**
 * SEO audit
 */
export interface SeoAudit extends BaseEntity, Timestamp {
  name: string;
  type: SEOAuditType;
  scope: string;
  findings: SeoFinding[];
  score: number;
  status: SEOStatus;
  auditedAt: Date;
  recommendations: string[];
}

/**
 * SEO finding
 */
export interface SeoFinding {
  id: string;
  severity: SEOAuditSeverity;
  description: string;
  location: string;
  recommendation?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'FIXED' | 'IGNORED';
}

/**
 * SEO score
 */
export interface SeoScore extends BaseEntity, Timestamp {
  url: string;
  type: SEOScoreType;
  overall: number;
  technical: number;
  content: number;
  ux: number;
  mobile: number;
  details: Record<string, number>;
  status: SEOStatus;
}

/**
 * SEO ranking
 */
export interface SeoRanking extends BaseEntity, Timestamp {
  keyword: string;
  url: string;
  currentPosition: number;
  previousPosition?: number;
  avgPosition: number;
  searchEngine: SearchEngine;
  region: string;
  device: 'DESKTOP' | 'MOBILE' | 'TABLET';
}

/**
 * SEO sitemap
 */
export interface SeoSitemap extends BaseEntity, Timestamp {
  filename: string;
  type: SEOSitemapType;
  urls: SeoSitemapUrl[];
  lastModified: Date;
  status: SEOStatus;
  size?: number;
}

/**
 * SEO sitemap URL entry
 */
export interface SeoSitemapUrl {
  loc: string;
  lastmod?: Date;
  changefreq?: 'ALWAYS' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'NEVER';
  priority?: number;
}

/**
 * SEO robots.txt
 */
export interface SeoRobotsTxt extends BaseEntity, Timestamp {
  rules: SeoRobotsTxtRule[];
  sitemaps: string[];
}

/**
 * SEO robots.txt rule
 */
export interface SeoRobotsTxtRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
  crawlDelay?: number;
}

/**
 * SEO schema.org structured data
 */
export interface StructuredData {
  type: SEOSchemaType;
  data: Record<string, unknown>;
  context?: 'https://schema.org';
}

/**
 * SEO Open Graph metadata
 */
export interface OpenGraph {
  title: string;
  description: string;
  image: string;
  type: SEOOpenGraphType;
  url?: string;
  siteName?: string;
  locale?: string;
}

/**
 * SEO Twitter Card
 */
export interface TwitterCard {
  card: SEOTwitterCardType;
  title: string;
  description: string;
  image: string;
  site?: string;
  creator?: string;
  url?: string;
}

/**
 * SEO analytics
 */
export interface SeoAnalytics extends BaseEntity, Timestamp {
  date: Date;
  url: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  keyword?: string;
  device: 'DESKTOP' | 'MOBILE' | 'TABLET';
  country: string;
}

/**
 * SEO report
 */
export interface SeoReport extends BaseEntity, Timestamp {
  title: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'CUSTOM';
  period: {
    start: Date;
    end: Date;
  };
  metrics: SeoReportMetrics;
  recommendations: string[];
  format: 'PDF' | 'HTML' | 'CSV' | 'XLSX';
  status: SEOStatus;
}

/**
 * SEO report metrics
 */
export interface SeoReportMetrics {
  avgPosition: number;
  totalImpressions: number;
  totalClicks: number;
  avgCtr: number;
  topKeywords: SeoKeyword[];
  topPages: string[];
  improvements: string[];
  declines: string[];
}

/**
 * SEO error code from shared-constants
 */
export type SEOErrorCode =
  | 'TITLE_TOO_LONG'
  | 'TITLE_TOO_SHORT'
  | 'DESCRIPTION_TOO_LONG'
  | 'DESCRIPTION_TOO_SHORT'
  | 'MISSING_TITLE'
  | 'MISSING_DESCRIPTION'
  | 'MISSING_CANONICAL'
  | 'DUPLICATE_TITLE'
  | 'DUPLICATE_DESCRIPTION'
  | 'KEYWORD_STUFFING'
  | 'BROKEN_LINK'
  | 'MISSING_ALT_TEXT'
  | 'NO_STRUCTURED_DATA'
  | 'INVALID_SCHEMA'
  | 'SLOW_PAGE_SPEED'
  | 'NO_MOBILE_VIEWPORT'
  | 'INVALID_ROBOTS';

// ============================================================
// Re-export helper functions for convenience
// ============================================================

export {
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
  getSEOPageTypeLabel,
  getSEOSearchEngineLabel,
  getSEORichSnippetLabel,
  getSEOEcommerceTypeLabel,
  getSEOMobileTypeLabel,
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
  getSEOError,
  getSEOMessage,
  getSEODescription,
  isSEOError,
  getSEOErrorCategory,
};
