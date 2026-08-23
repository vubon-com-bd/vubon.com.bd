/**
 * Recommendation Type Constants
 * Type definitions and classifications for recommendations
 */

export const DISCOVERY_RECOMMENDATION_TYPE = {
  // Recommendation Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    SERVICE: 'service',
    EXPERIENCE: 'experience',
    OFFER: 'offer',
    DEAL: 'deal',
    COLLECTION: 'collection',
    USER: 'user',
    ITEM: 'item',
    CUSTOM: 'custom',
  } as const,

  // Recommendation Sub-Types
  SUB_TYPES: {
    // Product
    SIMILAR: 'similar',
    COMPLEMENTARY: 'complementary',
    SUBSTITUTE: 'substitute',
    ALTERNATIVE: 'alternative',
    UPGRADE: 'upgrade',

    // Content
    RELATED: 'related',
    POPULAR: 'popular',
    TRENDING: 'trending',
    RECENT: 'recent',

    // Service
    RECOMMENDED: 'recommended',
    POPULAR_SERVICE: 'popular_service',
    TRENDING_SERVICE: 'trending_service',

    // Offer
    BEST_DEAL: 'best_deal',
    LIMITED_OFFER: 'limited_offer',
    FLASH_DEAL: 'flash_deal',

    // Collection
    CURATED: 'curated',
    EDITORIAL: 'editorial',
    SEASONAL: 'seasonal',
    THEMATIC: 'thematic',
  } as const,

  // Recommendation Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    SEGMENT: 'segment',
    USER: 'user',
    SESSION: 'session',
    CONTEXT: 'context',
  } as const,

  // Recommendation Contexts
  CONTEXTS: {
    HOMEPAGE: 'homepage',
    CATEGORY: 'category',
    PRODUCT: 'product',
    CART: 'cart',
    CHECKOUT: 'checkout',
    SEARCH: 'search',
    BROWSE: 'browse',
    SOCIAL: 'social',
    EMAIL: 'email',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEB: 'web',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
  } as const,

  // Recommendation Priorities
  PRIORITIES: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    BACKGROUND: 'background',
  } as const,
} as const;

// Recommendation Categories
export type DiscoveryRecommendationCategoryType =
  (typeof DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES)[keyof typeof DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES];

// Recommendation Sub-Types
export type DiscoveryRecommendationSubType =
  (typeof DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES)[keyof typeof DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES];

// Recommendation Scopes
export type DiscoveryRecommendationScope =
  (typeof DISCOVERY_RECOMMENDATION_TYPE.SCOPES)[keyof typeof DISCOVERY_RECOMMENDATION_TYPE.SCOPES];

// Recommendation Contexts
export type DiscoveryRecommendationContext =
  (typeof DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS)[keyof typeof DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS];

// Recommendation Priorities
export type DiscoveryRecommendationPriority =
  (typeof DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES)[keyof typeof DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES];

// Utility Functions
export function discoveryRecommendationGetCategoryLabel(
  category: DiscoveryRecommendationCategoryType
): string {
  const labels: Record<DiscoveryRecommendationCategoryType, string> = {
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.CONTENT]: 'Content',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.SERVICE]: 'Service',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.EXPERIENCE]: 'Experience',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.OFFER]: 'Offer',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.DEAL]: 'Deal',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.COLLECTION]: 'Collection',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.USER]: 'User',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.ITEM]: 'Item',
    [DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function discoveryRecommendationGetSubTypeLabel(
  subType: DiscoveryRecommendationSubType
): string {
  const labels: Record<DiscoveryRecommendationSubType, string> = {
    // Product
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.SIMILAR]: 'Similar',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.COMPLEMENTARY]: 'Complementary',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.SUBSTITUTE]: 'Substitute',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.ALTERNATIVE]: 'Alternative',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.UPGRADE]: 'Upgrade',

    // Content
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.RELATED]: 'Related',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.POPULAR]: 'Popular',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.TRENDING]: 'Trending',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.RECENT]: 'Recent',

    // Service
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.RECOMMENDED]: 'Recommended',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.POPULAR_SERVICE]: 'Popular Service',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.TRENDING_SERVICE]: 'Trending Service',

    // Offer
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.BEST_DEAL]: 'Best Deal',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.LIMITED_OFFER]: 'Limited Offer',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.FLASH_DEAL]: 'Flash Deal',

    // Collection
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.CURATED]: 'Curated',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.EDITORIAL]: 'Editorial',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY_RECOMMENDATION_TYPE.SUB_TYPES.THEMATIC]: 'Thematic',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function discoveryRecommendationGetScopeLabel(scope: DiscoveryRecommendationScope): string {
  const labels: Record<DiscoveryRecommendationScope, string> = {
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.GLOBAL]: 'Global',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.REGIONAL]: 'Regional',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.LOCAL]: 'Local',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.SEGMENT]: 'Segment',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.USER]: 'User',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.SESSION]: 'Session',
    [DISCOVERY_RECOMMENDATION_TYPE.SCOPES.CONTEXT]: 'Context',
  };
  return labels[scope] || 'Unknown Scope';
}

export function discoveryRecommendationGetContextLabel(
  context: DiscoveryRecommendationContext
): string {
  const labels: Record<DiscoveryRecommendationContext, string> = {
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.HOMEPAGE]: 'Homepage',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.CATEGORY]: 'Category',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.PRODUCT]: 'Product',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.CART]: 'Cart',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.CHECKOUT]: 'Checkout',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.SEARCH]: 'Search',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.BROWSE]: 'Browse',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.SOCIAL]: 'Social',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.EMAIL]: 'Email',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.PUSH]: 'Push',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.IN_APP]: 'In-App',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.WEB]: 'Web',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.MOBILE]: 'Mobile',
    [DISCOVERY_RECOMMENDATION_TYPE.CONTEXTS.DESKTOP]: 'Desktop',
  };
  return labels[context] || 'Unknown Context';
}

export function discoveryRecommendationGetPriorityLabel(
  priority: DiscoveryRecommendationPriority
): string {
  const labels: Record<DiscoveryRecommendationPriority, string> = {
    [DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES.HIGH]: 'High',
    [DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES.LOW]: 'Low',
    [DISCOVERY_RECOMMENDATION_TYPE.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown Priority';
}

export function discoveryRecommendationIsProductCategory(
  category: DiscoveryRecommendationCategoryType
): boolean {
  const productCategories: DiscoveryRecommendationCategoryType[] = [
    DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.PRODUCT,
    DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.ITEM,
  ];
  return productCategories.includes(category);
}

export function discoveryRecommendationIsContentCategory(
  category: DiscoveryRecommendationCategoryType
): boolean {
  return category === DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.CONTENT;
}

export function discoveryRecommendationIsOfferCategory(
  category: DiscoveryRecommendationCategoryType
): boolean {
  const offerCategories: DiscoveryRecommendationCategoryType[] = [
    DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.OFFER,
    DISCOVERY_RECOMMENDATION_TYPE.CATEGORIES.DEAL,
  ];
  return offerCategories.includes(category);
}
