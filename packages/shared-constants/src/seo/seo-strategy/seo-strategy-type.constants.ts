/**
 * SEO Strategy Type Constants
 * Types and classifications for SEO strategies
 */

export const SEO_STRATEGY_TYPE = {
  CATEGORIES: {
    TECHNICAL: 'technical',
    CONTENT: 'content',
    LINK: 'link',
    LOCAL: 'local',
    ECOMMERCE: 'ecommerce',
    MOBILE: 'mobile',
    INTERNATIONAL: 'international',
    SOCIAL: 'social',
    BRAND: 'brand',
    REPUTATION: 'reputation',
  } as const,

  SUB_TYPES: {
    SITE_ARCHITECTURE: 'site_architecture',
    CRAWL_OPTIMIZATION: 'crawl_optimization',
    INDEX_OPTIMIZATION: 'index_optimization',
    PAGE_SPEED: 'page_speed',
    MOBILE_OPTIMIZATION: 'mobile_optimization',
    STRUCTURED_DATA: 'structured_data',
    SECURITY: 'security',

    CONTENT_CREATION: 'content_creation',
    CONTENT_OPTIMIZATION: 'content_optimization',
    CONTENT_DISTRIBUTION: 'content_distribution',
    CONTENT_UPGRADE: 'content_upgrade',
    CONTENT_REFRESH: 'content_refresh',

    OUTREACH: 'outreach',
    GUEST_POSTING: 'guest_posting',
    BROKEN_LINK: 'broken_link',
    RESOURCE_LINKS: 'resource_links',
    EDITORIAL_LINKS: 'editorial_links',
    LOCAL_CITATIONS: 'local_citations',

    GMB_OPTIMIZATION: 'gmb_optimization',
    LOCAL_LISTINGS: 'local_listings',
    LOCAL_CONTENT: 'local_content',
    LOCAL_BACKLINKS: 'local_backlinks',
    REVIEW_MANAGEMENT: 'review_management',

    PRODUCT_OPTIMIZATION: 'product_optimization',
    CATEGORY_OPTIMIZATION: 'category_optimization',
    FACETED_NAVIGATION: 'faceted_navigation',
    PRODUCT_REVIEWS: 'product_reviews',
    PRODUCT_SCHEMA: 'product_schema',
    COMPARISON_SHOPPING: 'comparison_shopping',
  } as const,

  APPROACHES: {
    AGGRESSIVE: 'aggressive',
    BALANCED: 'balanced',
    CONSERVATIVE: 'conservative',
    WHITE_HAT: 'white_hat',
    GREY_HAT: 'grey_hat',
    BLACK_HAT: 'black_hat',
  } as const,

  FOCUS_AREAS: {
    TRAFFIC: 'traffic',
    CONVERSION: 'conversion',
    BRANDING: 'branding',
    ENGAGEMENT: 'engagement',
    RETENTION: 'retention',
    AUTHORITY: 'authority',
    REVENUE: 'revenue',
  } as const,

  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,

  MATURITY: {
    NASCENT: 'nascent',
    EMERGING: 'emerging',
    ESTABLISHED: 'established',
    MATURE: 'mature',
    DECLINING: 'declining',
  } as const,
} as const;

export type SEOStrategyTypeCategory =
  (typeof SEO_STRATEGY_TYPE.CATEGORIES)[keyof typeof SEO_STRATEGY_TYPE.CATEGORIES];
export type SEOStrategyTypeSubType =
  (typeof SEO_STRATEGY_TYPE.SUB_TYPES)[keyof typeof SEO_STRATEGY_TYPE.SUB_TYPES];
export type SEOStrategyTypeApproach =
  (typeof SEO_STRATEGY_TYPE.APPROACHES)[keyof typeof SEO_STRATEGY_TYPE.APPROACHES];
export type SEOStrategyTypeFocus =
  (typeof SEO_STRATEGY_TYPE.FOCUS_AREAS)[keyof typeof SEO_STRATEGY_TYPE.FOCUS_AREAS];
export type SEOStrategyTypeComplexity =
  (typeof SEO_STRATEGY_TYPE.COMPLEXITY)[keyof typeof SEO_STRATEGY_TYPE.COMPLEXITY];
export type SEOStrategyTypeMaturity =
  (typeof SEO_STRATEGY_TYPE.MATURITY)[keyof typeof SEO_STRATEGY_TYPE.MATURITY];

export function getSeostrategyCategoryLabel(category: SEOStrategyTypeCategory): string {
  const labels: Record<SEOStrategyTypeCategory, string> = {
    [SEO_STRATEGY_TYPE.CATEGORIES.TECHNICAL]: 'Technical SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.CONTENT]: 'Content SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.LINK]: 'Link Building',
    [SEO_STRATEGY_TYPE.CATEGORIES.LOCAL]: 'Local SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.ECOMMERCE]: 'E-commerce SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.MOBILE]: 'Mobile SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.INTERNATIONAL]: 'International SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.SOCIAL]: 'Social SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.BRAND]: 'Brand SEO',
    [SEO_STRATEGY_TYPE.CATEGORIES.REPUTATION]: 'Reputation Management',
  };
  return labels[category] || 'Unknown Category';
}

export function getSeostrategySubTypeLabel(subType: SEOStrategyTypeSubType): string {
  const labels: Record<SEOStrategyTypeSubType, string> = {
    [SEO_STRATEGY_TYPE.SUB_TYPES.SITE_ARCHITECTURE]: 'Site Architecture',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CRAWL_OPTIMIZATION]: 'Crawl Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.INDEX_OPTIMIZATION]: 'Index Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.PAGE_SPEED]: 'Page Speed Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.MOBILE_OPTIMIZATION]: 'Mobile Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.STRUCTURED_DATA]: 'Structured Data',
    [SEO_STRATEGY_TYPE.SUB_TYPES.SECURITY]: 'Security (HTTPS)',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CONTENT_CREATION]: 'Content Creation',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CONTENT_OPTIMIZATION]: 'Content Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CONTENT_DISTRIBUTION]: 'Content Distribution',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CONTENT_UPGRADE]: 'Content Upgrade',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CONTENT_REFRESH]: 'Content Refresh',
    [SEO_STRATEGY_TYPE.SUB_TYPES.OUTREACH]: 'Outreach',
    [SEO_STRATEGY_TYPE.SUB_TYPES.GUEST_POSTING]: 'Guest Posting',
    [SEO_STRATEGY_TYPE.SUB_TYPES.BROKEN_LINK]: 'Broken Link Building',
    [SEO_STRATEGY_TYPE.SUB_TYPES.RESOURCE_LINKS]: 'Resource Links',
    [SEO_STRATEGY_TYPE.SUB_TYPES.EDITORIAL_LINKS]: 'Editorial Links',
    [SEO_STRATEGY_TYPE.SUB_TYPES.LOCAL_CITATIONS]: 'Local Citations',
    [SEO_STRATEGY_TYPE.SUB_TYPES.GMB_OPTIMIZATION]: 'GMB Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.LOCAL_LISTINGS]: 'Local Listings',
    [SEO_STRATEGY_TYPE.SUB_TYPES.LOCAL_CONTENT]: 'Local Content',
    [SEO_STRATEGY_TYPE.SUB_TYPES.LOCAL_BACKLINKS]: 'Local Backlinks',
    [SEO_STRATEGY_TYPE.SUB_TYPES.REVIEW_MANAGEMENT]: 'Review Management',
    [SEO_STRATEGY_TYPE.SUB_TYPES.PRODUCT_OPTIMIZATION]: 'Product Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.CATEGORY_OPTIMIZATION]: 'Category Optimization',
    [SEO_STRATEGY_TYPE.SUB_TYPES.FACETED_NAVIGATION]: 'Faceted Navigation',
    [SEO_STRATEGY_TYPE.SUB_TYPES.PRODUCT_REVIEWS]: 'Product Reviews',
    [SEO_STRATEGY_TYPE.SUB_TYPES.PRODUCT_SCHEMA]: 'Product Schema',
    [SEO_STRATEGY_TYPE.SUB_TYPES.COMPARISON_SHOPPING]: 'Comparison Shopping',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSeostrategyApproachLabel(approach: SEOStrategyTypeApproach): string {
  const labels: Record<SEOStrategyTypeApproach, string> = {
    [SEO_STRATEGY_TYPE.APPROACHES.AGGRESSIVE]: 'Aggressive',
    [SEO_STRATEGY_TYPE.APPROACHES.BALANCED]: 'Balanced',
    [SEO_STRATEGY_TYPE.APPROACHES.CONSERVATIVE]: 'Conservative',
    [SEO_STRATEGY_TYPE.APPROACHES.WHITE_HAT]: 'White Hat',
    [SEO_STRATEGY_TYPE.APPROACHES.GREY_HAT]: 'Grey Hat',
    [SEO_STRATEGY_TYPE.APPROACHES.BLACK_HAT]: 'Black Hat',
  };
  return labels[approach] || 'Unknown Approach';
}

export function getSeostrategyFocusLabel(focus: SEOStrategyTypeFocus): string {
  const labels: Record<SEOStrategyTypeFocus, string> = {
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.TRAFFIC]: 'Traffic Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.CONVERSION]: 'Conversion Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.BRANDING]: 'Branding Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.ENGAGEMENT]: 'Engagement Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.RETENTION]: 'Retention Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.AUTHORITY]: 'Authority Focus',
    [SEO_STRATEGY_TYPE.FOCUS_AREAS.REVENUE]: 'Revenue Focus',
  };
  return labels[focus] || 'Unknown Focus Area';
}

export function getSeostrategyComplexityLabel(complexity: SEOStrategyTypeComplexity): string {
  const labels: Record<SEOStrategyTypeComplexity, string> = {
    [SEO_STRATEGY_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [SEO_STRATEGY_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [SEO_STRATEGY_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [SEO_STRATEGY_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function getSeostrategyMaturityLabel(maturity: SEOStrategyTypeMaturity): string {
  const labels: Record<SEOStrategyTypeMaturity, string> = {
    [SEO_STRATEGY_TYPE.MATURITY.NASCENT]: 'Nascent',
    [SEO_STRATEGY_TYPE.MATURITY.EMERGING]: 'Emerging',
    [SEO_STRATEGY_TYPE.MATURITY.ESTABLISHED]: 'Established',
    [SEO_STRATEGY_TYPE.MATURITY.MATURE]: 'Mature',
    [SEO_STRATEGY_TYPE.MATURITY.DECLINING]: 'Declining',
  };
  return labels[maturity] || 'Unknown Maturity Level';
}

export function isSeostrategyWhiteHat(approach: SEOStrategyTypeApproach): boolean {
  return approach === SEO_STRATEGY_TYPE.APPROACHES.WHITE_HAT;
}

export function isSeostrategyBlackHat(approach: SEOStrategyTypeApproach): boolean {
  return approach === SEO_STRATEGY_TYPE.APPROACHES.BLACK_HAT;
}

export function getSeostrategyApproachRiskLevel(approach: SEOStrategyTypeApproach): string {
  const riskLevels: Record<SEOStrategyTypeApproach, string> = {
    [SEO_STRATEGY_TYPE.APPROACHES.WHITE_HAT]: 'Low Risk',
    [SEO_STRATEGY_TYPE.APPROACHES.BALANCED]: 'Medium Risk',
    [SEO_STRATEGY_TYPE.APPROACHES.CONSERVATIVE]: 'Low Risk',
    [SEO_STRATEGY_TYPE.APPROACHES.AGGRESSIVE]: 'Medium-High Risk',
    [SEO_STRATEGY_TYPE.APPROACHES.GREY_HAT]: 'High Risk',
    [SEO_STRATEGY_TYPE.APPROACHES.BLACK_HAT]: 'Very High Risk',
  };
  return riskLevels[approach] || 'Unknown Risk Level';
}
