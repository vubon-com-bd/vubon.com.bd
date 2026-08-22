/**
 * SEO (Search Engine Optimization) Constants
 * Configuration for SEO strategies, metadata, and optimization
 */

export const SEO = {
  // SEO Strategy Types
  STRATEGY_TYPES: {
    ON_PAGE: 'on_page',
    OFF_PAGE: 'off_page',
    TECHNICAL: 'technical',
    LOCAL: 'local',
    ECOMMERCE: 'ecommerce',
    CONTENT: 'content',
    MOBILE: 'mobile',
    VOICE: 'voice',
    INTERNATIONAL: 'international',
  } as const,

  // SEO Status
  STATUS: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    REVIEWED: 'reviewed',
    APPROVED: 'approved',
    IMPLEMENTED: 'implemented',
    MONITORING: 'monitoring',
    OPTIMIZED: 'optimized',
    NEEDS_UPDATE: 'needs_update',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,

  // SEO Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    NONE: 'none',
  } as const,

  // Meta Tags
  META_TAGS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    KEYWORDS: 'keywords',
    ROBOTS: 'robots',
    VIEWPORT: 'viewport',
    CHARSET: 'charset',
    AUTHOR: 'author',
    PUBLISHER: 'publisher',
    COPYRIGHT: 'copyright',
    REVISIT_AFTER: 'revisit-after',
    LANGUAGE: 'language',
    CANONICAL: 'canonical',
  } as const,

  // Open Graph Tags
  OG_TAGS: {
    TITLE: 'og:title',
    DESCRIPTION: 'og:description',
    TYPE: 'og:type',
    URL: 'og:url',
    IMAGE: 'og:image',
    SITE_NAME: 'og:site_name',
    LOCAL: 'og:locale',
    VIDEO: 'og:video',
    AUDIO: 'og:audio',
    DETERMINER: 'og:determiner',
  } as const,

  // Twitter Card Tags
  TWITTER_CARDS: {
    CARD: 'twitter:card',
    SITE: 'twitter:site',
    CREATOR: 'twitter:creator',
    TITLE: 'twitter:title',
    DESCRIPTION: 'twitter:description',
    IMAGE: 'twitter:image',
    IMAGE_ALT: 'twitter:image:alt',
    PLAYER: 'twitter:player',
    PLAYER_WIDTH: 'twitter:player:width',
    PLAYER_HEIGHT: 'twitter:player:height',
    APP_ID: 'twitter:app:id:iphone',
    APP_NAME: 'twitter:app:name:iphone',
  } as const,

  // Robots Directives
  ROBOTS: {
    INDEX: 'index',
    NOINDEX: 'noindex',
    FOLLOW: 'follow',
    NOFOLLOW: 'nofollow',
    NOARCHIVE: 'noarchive',
    NOSNIPPET: 'nosnippet',
    NOODP: 'noodp',
    NOYDIR: 'noydir',
    NOTRANSLATE: 'notranslate',
    NOCACHE: 'nocache',
    NOPREVIEW: 'nopreview',
    MAX_SNIPPET: 'max-snippet',
    MAX_VIDEO_PREVIEW: 'max-video-preview',
    MAX_IMAGE_PREVIEW: 'max-image-preview',
  } as const,

  // Sitemap Types
  SITEMAP_TYPES: {
    XML: 'xml',
    HTML: 'html',
    TEXT: 'text',
    RSS: 'rss',
    ATOM: 'atom',
  } as const,

  // Schema Types
  SCHEMA_TYPES: {
    PRODUCT: 'Product',
    PERSON: 'Person',
    ORGANIZATION: 'Organization',
    LOCAL_BUSINESS: 'LocalBusiness',
    E_COMMERCE: 'ECommerce',
    STORE: 'Store',
    WEBSITE: 'WebSite',
    ARTICLE: 'Article',
    BLOG: 'Blog',
    NEWS: 'News',
    EVENT: 'Event',
    REVIEW: 'Review',
    RATING: 'Rating',
    FAQ: 'FAQ',
    HOW_TO: 'HowTo',
    RECIPE: 'Recipe',
    VIDEO: 'Video',
    AUDIO: 'Audio',
    BOOK: 'Book',
    MOVIE: 'Movie',
    MUSIC: 'Music',
    RESTAURANT: 'Restaurant',
    HOTEL: 'Hotel',
    PLACE: 'Place',
  } as const,

  // SEO Score Ranges
  SCORE_RANGES: {
    POOR: [0, 30],
    FAIR: [31, 50],
    GOOD: [51, 70],
    EXCELLENT: [71, 90],
    OUTSTANDING: [91, 100],
  } as const,

  // Meta Length Limits
  META_LIMITS: {
    TITLE_MIN: 30,
    TITLE_MAX: 60,
    TITLE_OPTIMAL: 50,
    DESCRIPTION_MIN: 70,
    DESCRIPTION_MAX: 160,
    DESCRIPTION_OPTIMAL: 155,
    KEYWORDS_MAX: 10,
    SLUG_MIN: 3,
    SLUG_MAX: 60,
  } as const,

  // Keyword Research
  KEYWORD_TYPES: {
    HEAD: 'head',
    BODY: 'body',
    LONG_TAIL: 'long_tail',
    SEASONAL: 'seasonal',
    TRENDING: 'trending',
    COMPETITOR: 'competitor',
    LSI: 'lsi',
  } as const,

  // Keyword Intent
  KEYWORD_INTENT: {
    INFORMATIONAL: 'informational',
    NAVIGATIONAL: 'navigational',
    COMMERCIAL: 'commercial',
    TRANSACTIONAL: 'transactional',
  } as const,

  // Link Types
  LINK_TYPES: {
    INTERNAL: 'internal',
    EXTERNAL: 'external',
    BACKLINK: 'backlink',
    DOFOLLOW: 'dofollow',
    NOFOLLOW: 'nofollow',
    SPONSORED: 'sponsored',
    UGC: 'ugc',
  } as const,

  // Content Optimization
  CONTENT_TYPES: {
    BLOG: 'blog',
    PRODUCT: 'product',
    CATEGORY: 'category',
    LANDING: 'landing',
    ABOUT: 'about',
    CONTACT: 'contact',
    FAQ: 'faq',
    GUIDE: 'guide',
    TUTORIAL: 'tutorial',
    CASE_STUDY: 'case_study',
    WHITE_PAPER: 'white_paper',
    EBOOK: 'ebook',
    VIDEO: 'video',
    INFOGRAPHIC: 'infographic',
  } as const,

  // SEO Tools
  TOOLS: {
    GOOGLE_ANALYTICS: 'google_analytics',
    GOOGLE_SEARCH_CONSOLE: 'google_search_console',
    GOOGLE_TAG_MANAGER: 'google_tag_manager',
    BING_WEBMASTER: 'bing_webmaster',
    YANDEX_WEBMASTER: 'yandex_webmaster',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    SCREAMING_FROG: 'screaming_frog',
    YOAST: 'yoast',
    RANK_MATH: 'rank_math',
  } as const,

  // SEO Recommendations
  RECOMMENDATIONS: {
    OPTIMIZE_TITLE: 'optimize_title',
    OPTIMIZE_DESCRIPTION: 'optimize_description',
    ADD_HEADINGS: 'add_headings',
    IMAGE_ALT_TEXT: 'image_alt_text',
    INTERNAL_LINKS: 'internal_links',
    EXTERNAL_LINKS: 'external_links',
    MOBILE_FRIENDLY: 'mobile_friendly',
    PAGE_SPEED: 'page_speed',
    SECURE_HTTPS: 'secure_https',
    CANONICAL_TAG: 'canonical_tag',
    XML_SITEMAP: 'xml_sitemap',
    ROBOTS_TXT: 'robots_txt',
    SCHEMA_MARKUP: 'schema_markup',
    SOCIAL_SHARING: 'social_sharing',
    MULTILINGUAL: 'multilingual',
    CONTENT_QUALITY: 'content_quality',
  } as const,

  // SEO Errors
  ERROR_TYPES: {
    MISSING_TITLE: 'missing_title',
    MISSING_DESCRIPTION: 'missing_description',
    DUPLICATE_TITLE: 'duplicate_title',
    DUPLICATE_DESCRIPTION: 'duplicate_description',
    MISSING_ALT_TEXT: 'missing_alt_text',
    BROKEN_LINK: 'broken_link',
    MISSING_CANONICAL: 'missing_canonical',
    NO_INDEX_INDEX: 'no_index_index',
    SLOW_PAGE: 'slow_page',
    NO_HTTPS: 'no_https',
    NO_SITEMAP: 'no_sitemap',
    NO_ROBOTS: 'no_robots',
    NO_SCHEMA: 'no_schema',
    MISSING_OG: 'missing_og',
    MISSING_TWITTER: 'missing_twitter',
    THIN_CONTENT: 'thin_content',
    DUPLICATE_CONTENT: 'duplicate_content',
    KEYWORD_STUFFING: 'keyword_stuffing',
  } as const,
} as const;

// Strategy Types
export type SEOStrategyType = (typeof SEO.STRATEGY_TYPES)[keyof typeof SEO.STRATEGY_TYPES];

// SEO Status
export type SEOStatus = (typeof SEO.STATUS)[keyof typeof SEO.STATUS];

// SEO Priority
export type SEOPriority = (typeof SEO.PRIORITY)[keyof typeof SEO.PRIORITY];

// Meta Tags
export type SEOMetaTag = (typeof SEO.META_TAGS)[keyof typeof SEO.META_TAGS];

// OG Tags
export type SEOOGTag = (typeof SEO.OG_TAGS)[keyof typeof SEO.OG_TAGS];

// Twitter Card Types
export type SEOTwitterCard = (typeof SEO.TWITTER_CARDS)[keyof typeof SEO.TWITTER_CARDS];

// Robots Directives
export type SEORobotsDirective = (typeof SEO.ROBOTS)[keyof typeof SEO.ROBOTS];

// Sitemap Types
export type SEOSitemapType = (typeof SEO.SITEMAP_TYPES)[keyof typeof SEO.SITEMAP_TYPES];

// Schema Types
export type SEOSchemaType = (typeof SEO.SCHEMA_TYPES)[keyof typeof SEO.SCHEMA_TYPES];

// Keyword Types
export type SEOKeywordType = (typeof SEO.KEYWORD_TYPES)[keyof typeof SEO.KEYWORD_TYPES];

// Keyword Intent
export type SEOKeywordIntent = (typeof SEO.KEYWORD_INTENT)[keyof typeof SEO.KEYWORD_INTENT];

// Link Types
export type SEOLinkType = (typeof SEO.LINK_TYPES)[keyof typeof SEO.LINK_TYPES];

// Content Types
export type SEOContentType = (typeof SEO.CONTENT_TYPES)[keyof typeof SEO.CONTENT_TYPES];

// SEO Tools
export type SEOTool = (typeof SEO.TOOLS)[keyof typeof SEO.TOOLS];

// SEO Recommendations
export type SEORecommendation = (typeof SEO.RECOMMENDATIONS)[keyof typeof SEO.RECOMMENDATIONS];

// SEO Errors
export type SEOErrorType = (typeof SEO.ERROR_TYPES)[keyof typeof SEO.ERROR_TYPES];

// SEO Specific Utility Functions (renamed to avoid conflicts)
export function getSEOPriorityLabel(priority: SEOPriority): string {
  const labels: Record<SEOPriority, string> = {
    [SEO.PRIORITY.CRITICAL]: 'Critical',
    [SEO.PRIORITY.HIGH]: 'High',
    [SEO.PRIORITY.MEDIUM]: 'Medium',
    [SEO.PRIORITY.LOW]: 'Low',
    [SEO.PRIORITY.NONE]: 'None',
  };
  return labels[priority] || 'Unknown';
}

export function getSEOStatusLabel(status: SEOStatus): string {
  const labels: Record<SEOStatus, string> = {
    [SEO.STATUS.DRAFT]: 'Draft',
    [SEO.STATUS.PENDING_REVIEW]: 'Pending Review',
    [SEO.STATUS.REVIEWED]: 'Reviewed',
    [SEO.STATUS.APPROVED]: 'Approved',
    [SEO.STATUS.IMPLEMENTED]: 'Implemented',
    [SEO.STATUS.MONITORING]: 'Monitoring',
    [SEO.STATUS.OPTIMIZED]: 'Optimized',
    [SEO.STATUS.NEEDS_UPDATE]: 'Needs Update',
    [SEO.STATUS.DEPRECATED]: 'Deprecated',
    [SEO.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function getSEOScoreLabel(score: number): string {
  if (score >= 91) return 'Outstanding';
  if (score >= 71) return 'Excellent';
  if (score >= 51) return 'Good';
  if (score >= 31) return 'Fair';
  return 'Poor';
}

export function getSEOScoreColor(score: number): string {
  if (score >= 91) return '#4CAF50';
  if (score >= 71) return '#8BC34A';
  if (score >= 51) return '#FFC107';
  if (score >= 31) return '#FF9800';
  return '#F44336';
}

export function isSEOTitleValid(title: string): boolean {
  const length = title.length;
  return length >= SEO.META_LIMITS.TITLE_MIN && length <= SEO.META_LIMITS.TITLE_MAX;
}

export function isSEODescriptionValid(description: string): boolean {
  const length = description.length;
  return length >= SEO.META_LIMITS.DESCRIPTION_MIN && length <= SEO.META_LIMITS.DESCRIPTION_MAX;
}

export function getSEOOptimalTitleLength(): number {
  return SEO.META_LIMITS.TITLE_OPTIMAL;
}

export function getSEOOptimalDescriptionLength(): number {
  return SEO.META_LIMITS.DESCRIPTION_OPTIMAL;
}

export function getSEOErrorLabel(errorType: SEOErrorType): string {
  const labels: Record<SEOErrorType, string> = {
    [SEO.ERROR_TYPES.MISSING_TITLE]: 'Missing Title Tag',
    [SEO.ERROR_TYPES.MISSING_DESCRIPTION]: 'Missing Meta Description',
    [SEO.ERROR_TYPES.DUPLICATE_TITLE]: 'Duplicate Title Tag',
    [SEO.ERROR_TYPES.DUPLICATE_DESCRIPTION]: 'Duplicate Meta Description',
    [SEO.ERROR_TYPES.MISSING_ALT_TEXT]: 'Missing Alt Text',
    [SEO.ERROR_TYPES.BROKEN_LINK]: 'Broken Link',
    [SEO.ERROR_TYPES.MISSING_CANONICAL]: 'Missing Canonical Tag',
    [SEO.ERROR_TYPES.NO_INDEX_INDEX]: 'No Index / Index Conflict',
    [SEO.ERROR_TYPES.SLOW_PAGE]: 'Slow Page Speed',
    [SEO.ERROR_TYPES.NO_HTTPS]: 'Missing HTTPS',
    [SEO.ERROR_TYPES.NO_SITEMAP]: 'Missing XML Sitemap',
    [SEO.ERROR_TYPES.NO_ROBOTS]: 'Missing Robots.txt',
    [SEO.ERROR_TYPES.NO_SCHEMA]: 'Missing Schema Markup',
    [SEO.ERROR_TYPES.MISSING_OG]: 'Missing Open Graph Tags',
    [SEO.ERROR_TYPES.MISSING_TWITTER]: 'Missing Twitter Card Tags',
    [SEO.ERROR_TYPES.THIN_CONTENT]: 'Thin Content',
    [SEO.ERROR_TYPES.DUPLICATE_CONTENT]: 'Duplicate Content',
    [SEO.ERROR_TYPES.KEYWORD_STUFFING]: 'Keyword Stuffing',
  };
  return labels[errorType] || 'Unknown Error';
}

export function getSEORecommendationLabel(recommendation: SEORecommendation): string {
  const labels: Record<SEORecommendation, string> = {
    [SEO.RECOMMENDATIONS.OPTIMIZE_TITLE]: 'Optimize Title Tag',
    [SEO.RECOMMENDATIONS.OPTIMIZE_DESCRIPTION]: 'Optimize Meta Description',
    [SEO.RECOMMENDATIONS.ADD_HEADINGS]: 'Add Heading Tags',
    [SEO.RECOMMENDATIONS.IMAGE_ALT_TEXT]: 'Add Image Alt Text',
    [SEO.RECOMMENDATIONS.INTERNAL_LINKS]: 'Add Internal Links',
    [SEO.RECOMMENDATIONS.EXTERNAL_LINKS]: 'Add External Links',
    [SEO.RECOMMENDATIONS.MOBILE_FRIENDLY]: 'Make Mobile Friendly',
    [SEO.RECOMMENDATIONS.PAGE_SPEED]: 'Improve Page Speed',
    [SEO.RECOMMENDATIONS.SECURE_HTTPS]: 'Enable HTTPS',
    [SEO.RECOMMENDATIONS.CANONICAL_TAG]: 'Add Canonical Tag',
    [SEO.RECOMMENDATIONS.XML_SITEMAP]: 'Create XML Sitemap',
    [SEO.RECOMMENDATIONS.ROBOTS_TXT]: 'Create Robots.txt',
    [SEO.RECOMMENDATIONS.SCHEMA_MARKUP]: 'Add Schema Markup',
    [SEO.RECOMMENDATIONS.SOCIAL_SHARING]: 'Enable Social Sharing',
    [SEO.RECOMMENDATIONS.MULTILINGUAL]: 'Add Multilingual Support',
    [SEO.RECOMMENDATIONS.CONTENT_QUALITY]: 'Improve Content Quality',
  };
  return labels[recommendation] || 'Unknown Recommendation';
}

export function getSEOMetaTagName(tag: SEOMetaTag): string {
  const names: Record<SEOMetaTag, string> = {
    [SEO.META_TAGS.TITLE]: 'title',
    [SEO.META_TAGS.DESCRIPTION]: 'description',
    [SEO.META_TAGS.KEYWORDS]: 'keywords',
    [SEO.META_TAGS.ROBOTS]: 'robots',
    [SEO.META_TAGS.VIEWPORT]: 'viewport',
    [SEO.META_TAGS.CHARSET]: 'charset',
    [SEO.META_TAGS.AUTHOR]: 'author',
    [SEO.META_TAGS.PUBLISHER]: 'publisher',
    [SEO.META_TAGS.COPYRIGHT]: 'copyright',
    [SEO.META_TAGS.REVISIT_AFTER]: 'revisit-after',
    [SEO.META_TAGS.LANGUAGE]: 'language',
    [SEO.META_TAGS.CANONICAL]: 'canonical',
  };
  return names[tag] || '';
}
