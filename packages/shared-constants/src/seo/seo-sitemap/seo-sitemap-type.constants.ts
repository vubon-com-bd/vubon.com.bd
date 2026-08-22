/**
 * SEO Sitemap Type Constants
 * Types and classifications for sitemaps
 */

export const SEO_SITEMAP_TYPE = {
  // Sitemap Categories
  CATEGORIES: {
    XML: 'xml',
    HTML: 'html',
    TEXT: 'text',
    FEED: 'feed',
    IMAGE: 'image',
    VIDEO: 'video',
    NEWS: 'news',
    MOBILE: 'mobile',
    CODE: 'code',
  } as const,

  // Sitemap Sub-types
  SUB_TYPES: {
    // XML
    STANDARD: 'standard',
    EXTENDED: 'extended',
    COMPRESSED: 'compressed',

    // HTML
    USER_FRIENDLY: 'user_friendly',
    SEO_FRIENDLY: 'seo_friendly',
    CATEGORIZED: 'categorized',

    // Feed
    RSS: 'rss',
    ATOM: 'atom',
    JSON_FEED: 'json_feed',

    // Specialized
    PRODUCT: 'product',
    BLOG: 'blog',
    CATEGORY: 'category',
    AUTHOR: 'author',
    DATE: 'date',
    TAG: 'tag',
  } as const,

  // Sitemap Generators
  GENERATORS: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    DYNAMIC: 'dynamic',
    STATIC: 'static',
    HYBRID: 'hybrid',
    CMS: 'cms',
    PLUGIN: 'plugin',
    CUSTOM: 'custom',
  } as const,

  // Sitemap Scope
  SCOPE: {
    FULL_SITE: 'full_site',
    SECTION: 'section',
    CATEGORY: 'category',
    CONTENT_TYPE: 'content_type',
    CUSTOM: 'custom',
  } as const,

  // Sitemap Structure
  STRUCTURES: {
    FLAT: 'flat',
    HIERARCHICAL: 'hierarchical',
    CATEGORIZED: 'categorized',
    CHRONOLOGICAL: 'chronological',
    ALPHABETICAL: 'alphabetical',
  } as const,

  // Sitemap Target Audience
  AUDIENCE: {
    SEARCH_ENGINES: 'search_engines',
    USERS: 'users',
    BOTH: 'both',
  } as const,
} as const;

// Sitemap Categories
export type SEOSitemapTypeCategory =
  (typeof SEO_SITEMAP_TYPE.CATEGORIES)[keyof typeof SEO_SITEMAP_TYPE.CATEGORIES];

// Sitemap Sub-types
export type SEOSitemapTypeSubType =
  (typeof SEO_SITEMAP_TYPE.SUB_TYPES)[keyof typeof SEO_SITEMAP_TYPE.SUB_TYPES];

// Sitemap Generators
export type SEOSitemapTypeGenerator =
  (typeof SEO_SITEMAP_TYPE.GENERATORS)[keyof typeof SEO_SITEMAP_TYPE.GENERATORS];

// Sitemap Scope
export type SEOSitemapTypeScope =
  (typeof SEO_SITEMAP_TYPE.SCOPE)[keyof typeof SEO_SITEMAP_TYPE.SCOPE];

// Sitemap Structure
export type SEOSitemapTypeStructure =
  (typeof SEO_SITEMAP_TYPE.STRUCTURES)[keyof typeof SEO_SITEMAP_TYPE.STRUCTURES];

// Sitemap Audience
export type SEOSitemapTypeAudience =
  (typeof SEO_SITEMAP_TYPE.AUDIENCE)[keyof typeof SEO_SITEMAP_TYPE.AUDIENCE];

// Utility Functions
export function getSEOSitemapCategoryLabel(category: SEOSitemapTypeCategory): string {
  const labels: Record<SEOSitemapTypeCategory, string> = {
    [SEO_SITEMAP_TYPE.CATEGORIES.XML]: 'XML Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.HTML]: 'HTML Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.TEXT]: 'Text Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.FEED]: 'Feed Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.IMAGE]: 'Image Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.VIDEO]: 'Video Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.NEWS]: 'News Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.MOBILE]: 'Mobile Sitemap',
    [SEO_SITEMAP_TYPE.CATEGORIES.CODE]: 'Code Sitemap',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEOSitemapSubTypeLabel(subType: SEOSitemapTypeSubType): string {
  const labels: Record<SEOSitemapTypeSubType, string> = {
    // XML
    [SEO_SITEMAP_TYPE.SUB_TYPES.STANDARD]: 'Standard XML',
    [SEO_SITEMAP_TYPE.SUB_TYPES.EXTENDED]: 'Extended XML',
    [SEO_SITEMAP_TYPE.SUB_TYPES.COMPRESSED]: 'Compressed XML',

    // HTML
    [SEO_SITEMAP_TYPE.SUB_TYPES.USER_FRIENDLY]: 'User Friendly HTML',
    [SEO_SITEMAP_TYPE.SUB_TYPES.SEO_FRIENDLY]: 'SEO Friendly HTML',
    [SEO_SITEMAP_TYPE.SUB_TYPES.CATEGORIZED]: 'Categorized HTML',

    // Feed
    [SEO_SITEMAP_TYPE.SUB_TYPES.RSS]: 'RSS Feed',
    [SEO_SITEMAP_TYPE.SUB_TYPES.ATOM]: 'Atom Feed',
    [SEO_SITEMAP_TYPE.SUB_TYPES.JSON_FEED]: 'JSON Feed',

    // Specialized
    [SEO_SITEMAP_TYPE.SUB_TYPES.PRODUCT]: 'Product Sitemap',
    [SEO_SITEMAP_TYPE.SUB_TYPES.BLOG]: 'Blog Sitemap',
    [SEO_SITEMAP_TYPE.SUB_TYPES.CATEGORY]: 'Category Sitemap',
    [SEO_SITEMAP_TYPE.SUB_TYPES.AUTHOR]: 'Author Sitemap',
    [SEO_SITEMAP_TYPE.SUB_TYPES.DATE]: 'Date-based Sitemap',
    [SEO_SITEMAP_TYPE.SUB_TYPES.TAG]: 'Tag Sitemap',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEOSitemapGeneratorLabel(generator: SEOSitemapTypeGenerator): string {
  const labels: Record<SEOSitemapTypeGenerator, string> = {
    [SEO_SITEMAP_TYPE.GENERATORS.MANUAL]: 'Manual Generation',
    [SEO_SITEMAP_TYPE.GENERATORS.AUTOMATIC]: 'Automatic Generation',
    [SEO_SITEMAP_TYPE.GENERATORS.DYNAMIC]: 'Dynamic Generation',
    [SEO_SITEMAP_TYPE.GENERATORS.STATIC]: 'Static Generation',
    [SEO_SITEMAP_TYPE.GENERATORS.HYBRID]: 'Hybrid Generation',
    [SEO_SITEMAP_TYPE.GENERATORS.CMS]: 'CMS Generated',
    [SEO_SITEMAP_TYPE.GENERATORS.PLUGIN]: 'Plugin Generated',
    [SEO_SITEMAP_TYPE.GENERATORS.CUSTOM]: 'Custom Generated',
  };
  return labels[generator] || 'Unknown Generator';
}

export function getSEOSitemapScopeLabel(scope: SEOSitemapTypeScope): string {
  const labels: Record<SEOSitemapTypeScope, string> = {
    [SEO_SITEMAP_TYPE.SCOPE.FULL_SITE]: 'Full Site',
    [SEO_SITEMAP_TYPE.SCOPE.SECTION]: 'Section',
    [SEO_SITEMAP_TYPE.SCOPE.CATEGORY]: 'Category',
    [SEO_SITEMAP_TYPE.SCOPE.CONTENT_TYPE]: 'Content Type',
    [SEO_SITEMAP_TYPE.SCOPE.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function getSEOSitemapStructureLabel(structure: SEOSitemapTypeStructure): string {
  const labels: Record<SEOSitemapTypeStructure, string> = {
    [SEO_SITEMAP_TYPE.STRUCTURES.FLAT]: 'Flat Structure',
    [SEO_SITEMAP_TYPE.STRUCTURES.HIERARCHICAL]: 'Hierarchical Structure',
    [SEO_SITEMAP_TYPE.STRUCTURES.CATEGORIZED]: 'Categorized Structure',
    [SEO_SITEMAP_TYPE.STRUCTURES.CHRONOLOGICAL]: 'Chronological Structure',
    [SEO_SITEMAP_TYPE.STRUCTURES.ALPHABETICAL]: 'Alphabetical Structure',
  };
  return labels[structure] || 'Unknown Structure';
}

export function getSEOSitemapAudienceLabel(audience: SEOSitemapTypeAudience): string {
  const labels: Record<SEOSitemapTypeAudience, string> = {
    [SEO_SITEMAP_TYPE.AUDIENCE.SEARCH_ENGINES]: 'Search Engines',
    [SEO_SITEMAP_TYPE.AUDIENCE.USERS]: 'Users',
    [SEO_SITEMAP_TYPE.AUDIENCE.BOTH]: 'Both',
  };
  return labels[audience] || 'Unknown Audience';
}
