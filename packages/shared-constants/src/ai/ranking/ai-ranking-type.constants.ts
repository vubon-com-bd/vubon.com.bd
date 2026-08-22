/**
 * AI Ranking Type Constants
 * Types and classifications for AI ranking
 */

export const AI_RANKING_TYPE = {
  // Ranking Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    USER: 'user',
    ORDER: 'order',
    SEARCH: 'search',
    RECOMMENDATION: 'recommendation',
    REVIEW: 'review',
    BLOG: 'blog',
    VIDEO: 'video',
    IMAGE: 'image',
  } as const,

  // Ranking Sub-Types
  SUB_TYPES: {
    // Product Ranking
    PRODUCT_RELEVANCE: 'product_relevance',
    PRODUCT_POPULARITY: 'product_popularity',
    PRODUCT_RATING: 'product_rating',
    PRODUCT_SALES: 'product_sales',
    PRODUCT_REVENUE: 'product_revenue',

    // Content Ranking
    CONTENT_RELEVANCE: 'content_relevance',
    CONTENT_POPULARITY: 'content_popularity',
    CONTENT_FRESHNESS: 'content_freshness',
    CONTENT_ENGAGEMENT: 'content_engagement',

    // User Ranking
    USER_PREFERENCE: 'user_preference',
    USER_HISTORY: 'user_history',
    USER_INTEREST: 'user_interest',
    USER_ACTIVITY: 'user_activity',

    // Search Ranking
    SEARCH_RELEVANCE: 'search_relevance',
    SEARCH_POPULARITY: 'search_popularity',
    SEARCH_FRESHNESS: 'search_freshness',
    SEARCH_QUALITY: 'search_quality',
  } as const,

  // Ranking Levels
  LEVELS: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    BRAND: 'brand',
    STORE: 'store',
    USER: 'user',
    SESSION: 'session',
  } as const,

  // Ranking Scopes
  SCOPES: {
    PERSONAL: 'personal',
    PUBLIC: 'public',
    GROUP: 'group',
    REGIONAL: 'regional',
    GLOBAL: 'global',
  } as const,

  // Ranking Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,

  // Ranking Methods
  METHODS: {
    POINT_WISE: 'point_wise',
    PAIR_WISE: 'pair_wise',
    LIST_WISE: 'list_wise',
    HYBRID: 'hybrid',
  } as const,
} as const;

// Ranking Categories
export type AIRankingCategory =
  (typeof AI_RANKING_TYPE.CATEGORIES)[keyof typeof AI_RANKING_TYPE.CATEGORIES];

// Ranking Sub-Types
export type AIRankingSubType =
  (typeof AI_RANKING_TYPE.SUB_TYPES)[keyof typeof AI_RANKING_TYPE.SUB_TYPES];

// Ranking Levels
export type AIRankingLevel = (typeof AI_RANKING_TYPE.LEVELS)[keyof typeof AI_RANKING_TYPE.LEVELS];

// Ranking Scopes
export type AIRankingScope = (typeof AI_RANKING_TYPE.SCOPES)[keyof typeof AI_RANKING_TYPE.SCOPES];

// Ranking Priorities
export type AIRankingPriority =
  (typeof AI_RANKING_TYPE.PRIORITIES)[keyof typeof AI_RANKING_TYPE.PRIORITIES];

// Ranking Methods
export type AIRankingMethod =
  (typeof AI_RANKING_TYPE.METHODS)[keyof typeof AI_RANKING_TYPE.METHODS];

// Utility Functions
export function getRankingCategoryLabel(category: AIRankingCategory): string {
  const labels: Record<AIRankingCategory, string> = {
    [AI_RANKING_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [AI_RANKING_TYPE.CATEGORIES.CONTENT]: 'Content',
    [AI_RANKING_TYPE.CATEGORIES.USER]: 'User',
    [AI_RANKING_TYPE.CATEGORIES.ORDER]: 'Order',
    [AI_RANKING_TYPE.CATEGORIES.SEARCH]: 'Search',
    [AI_RANKING_TYPE.CATEGORIES.RECOMMENDATION]: 'Recommendation',
    [AI_RANKING_TYPE.CATEGORIES.REVIEW]: 'Review',
    [AI_RANKING_TYPE.CATEGORIES.BLOG]: 'Blog',
    [AI_RANKING_TYPE.CATEGORIES.VIDEO]: 'Video',
    [AI_RANKING_TYPE.CATEGORIES.IMAGE]: 'Image',
  };
  return labels[category] || 'Unknown';
}

export function getRankingSubTypeLabel(subType: AIRankingSubType): string {
  const labels: Record<AIRankingSubType, string> = {
    [AI_RANKING_TYPE.SUB_TYPES.PRODUCT_RELEVANCE]: 'Product Relevance',
    [AI_RANKING_TYPE.SUB_TYPES.PRODUCT_POPULARITY]: 'Product Popularity',
    [AI_RANKING_TYPE.SUB_TYPES.PRODUCT_RATING]: 'Product Rating',
    [AI_RANKING_TYPE.SUB_TYPES.PRODUCT_SALES]: 'Product Sales',
    [AI_RANKING_TYPE.SUB_TYPES.PRODUCT_REVENUE]: 'Product Revenue',
    [AI_RANKING_TYPE.SUB_TYPES.CONTENT_RELEVANCE]: 'Content Relevance',
    [AI_RANKING_TYPE.SUB_TYPES.CONTENT_POPULARITY]: 'Content Popularity',
    [AI_RANKING_TYPE.SUB_TYPES.CONTENT_FRESHNESS]: 'Content Freshness',
    [AI_RANKING_TYPE.SUB_TYPES.CONTENT_ENGAGEMENT]: 'Content Engagement',
    [AI_RANKING_TYPE.SUB_TYPES.USER_PREFERENCE]: 'User Preference',
    [AI_RANKING_TYPE.SUB_TYPES.USER_HISTORY]: 'User History',
    [AI_RANKING_TYPE.SUB_TYPES.USER_INTEREST]: 'User Interest',
    [AI_RANKING_TYPE.SUB_TYPES.USER_ACTIVITY]: 'User Activity',
    [AI_RANKING_TYPE.SUB_TYPES.SEARCH_RELEVANCE]: 'Search Relevance',
    [AI_RANKING_TYPE.SUB_TYPES.SEARCH_POPULARITY]: 'Search Popularity',
    [AI_RANKING_TYPE.SUB_TYPES.SEARCH_FRESHNESS]: 'Search Freshness',
    [AI_RANKING_TYPE.SUB_TYPES.SEARCH_QUALITY]: 'Search Quality',
  };
  return labels[subType] || 'Unknown';
}

export function getRankingLevelLabel(level: AIRankingLevel): string {
  const labels: Record<AIRankingLevel, string> = {
    [AI_RANKING_TYPE.LEVELS.GLOBAL]: 'Global',
    [AI_RANKING_TYPE.LEVELS.CATEGORY]: 'Category',
    [AI_RANKING_TYPE.LEVELS.BRAND]: 'Brand',
    [AI_RANKING_TYPE.LEVELS.STORE]: 'Store',
    [AI_RANKING_TYPE.LEVELS.USER]: 'User',
    [AI_RANKING_TYPE.LEVELS.SESSION]: 'Session',
  };
  return labels[level] || 'Unknown';
}

export function getRankingScopeLabel(scope: AIRankingScope): string {
  const labels: Record<AIRankingScope, string> = {
    [AI_RANKING_TYPE.SCOPES.PERSONAL]: 'Personal',
    [AI_RANKING_TYPE.SCOPES.PUBLIC]: 'Public',
    [AI_RANKING_TYPE.SCOPES.GROUP]: 'Group',
    [AI_RANKING_TYPE.SCOPES.REGIONAL]: 'Regional',
    [AI_RANKING_TYPE.SCOPES.GLOBAL]: 'Global',
  };
  return labels[scope] || 'Unknown';
}

export function getRankingPriorityLabel(priority: AIRankingPriority): string {
  const labels: Record<AIRankingPriority, string> = {
    [AI_RANKING_TYPE.PRIORITIES.CRITICAL]: 'Critical',
    [AI_RANKING_TYPE.PRIORITIES.HIGH]: 'High',
    [AI_RANKING_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [AI_RANKING_TYPE.PRIORITIES.LOW]: 'Low',
    [AI_RANKING_TYPE.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function getRankingMethodLabel(method: AIRankingMethod): string {
  const labels: Record<AIRankingMethod, string> = {
    [AI_RANKING_TYPE.METHODS.POINT_WISE]: 'Point Wise',
    [AI_RANKING_TYPE.METHODS.PAIR_WISE]: 'Pair Wise',
    [AI_RANKING_TYPE.METHODS.LIST_WISE]: 'List Wise',
    [AI_RANKING_TYPE.METHODS.HYBRID]: 'Hybrid',
  };
  return labels[method] || 'Unknown';
}
