/**
 * AI Recommendation Type Constants
 * Types of recommendations and their classifications
 */

export const AI_RECOMMENDATION_TYPE = {
  // Primary Recommendation Types
  TYPES: {
    // Based on User Behavior
    PERSONALIZED: 'personalized',
    BEHAVIORAL: 'behavioral',
    SESSION_BASED: 'session_based',
    SEQUENTIAL: 'sequential',

    // Based on Popularity
    POPULAR: 'popular',
    TRENDING: 'trending',
    BESTSELLER: 'bestseller',
    MOST_VIEWED: 'most_viewed',

    // Based on Context
    CONTEXTUAL: 'contextual',
    SEASONAL: 'seasonal',
    LOCATION_BASED: 'location_based',
    TIME_BASED: 'time_based',

    // Based on Content
    CONTENT_BASED: 'content_based',
    CATEGORY_BASED: 'category_based',
    BRAND_BASED: 'brand_based',

    // Based on Social
    SOCIAL: 'social',
    COLLABORATIVE: 'collaborative',
    COMMUNITY: 'community',

    // Based on Marketing
    EDITORIAL: 'editorial',
    CURATED: 'curated',
    PROMOTIONAL: 'promotional',
    CROSS_SELLING: 'cross_selling',
    UP_SELLING: 'up_selling',

    // Based on Purchase Stage
    PRE_PURCHASE: 'pre_purchase',
    POST_PURCHASE: 'post_purchase',
    CART_ABANDONMENT: 'cart_abandonment',
    REPURCHASE: 'repurchase',

    // Advanced Types
    HYBRID: 'hybrid',
    ENSEMBLE: 'ensemble',
    REINFORCEMENT: 'reinforcement',
    EXPLORE_EXPLOIT: 'explore_exploit',
  } as const,

  // Recommendation Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    CATEGORY: 'category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    DEAL: 'deal',
    PROMOTION: 'promotion',
    SERVICE: 'service',
    BLOG: 'blog',
    VIDEO: 'video',
    TUTORIAL: 'tutorial',
    ARTICLE: 'article',
    REVIEW: 'review',
    TESTIMONIAL: 'testimonial',
  } as const,

  // Recommendation Sub-Types
  SUB_TYPES: {
    // Product Recommendations
    SIMILAR_PRODUCTS: 'similar_products',
    COMPLEMENTARY_PRODUCTS: 'complementary_products',
    SUBSTITUTE_PRODUCTS: 'substitute_products',
    BUNDLE_PRODUCTS: 'bundle_products',
    ACCESSORY: 'accessory',

    // User Journey Recommendations
    FIRST_TIME_VISITOR: 'first_time_visitor',
    RETURNING_VISITOR: 'returning_visitor',
    LOYAL_CUSTOMER: 'loyal_customer',
    HIGH_SPENDER: 'high_spender',
    PRICE_SENSITIVE: 'price_sensitive',

    // Time-Based Recommendations
    DAILY_DEAL: 'daily_deal',
    WEEKLY_SPECIAL: 'weekly_special',
    MONTHLY_OFFER: 'monthly_offer',
    SEASONAL_SALE: 'seasonal_sale',
    HOLIDAY_SPECIAL: 'holiday_special',

    // Device-Based Recommendations
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',

    // Platform-Based
    MARKETPLACE: 'marketplace',
    BRAND_STORE: 'brand_store',
    VENDOR_STORE: 'vendor_store',
  } as const,

  // Recommendation Sources
  SOURCES: {
    USER_HISTORY: 'user_history',
    USER_PROFILE: 'user_profile',
    USER_PREFERENCES: 'user_preferences',
    USER_SESSION: 'user_session',
    BROWSE_HISTORY: 'browse_history',
    PURCHASE_HISTORY: 'purchase_history',
    SEARCH_HISTORY: 'search_history',
    WISHLIST: 'wishlist',
    CART: 'cart',
    REVIEWS: 'reviews',
    RATINGS: 'ratings',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    AFFILIATE: 'affiliate',
    CAMPAIGN: 'campaign',
    ANALYTICS: 'analytics',
    TRENDING_NOW: 'trending_now',
    SEASONAL_TRENDS: 'seasonal_trends',
    MARKET_TRENDS: 'market_trends',
    EXPERT_CURATION: 'expert_curation',
    AI_MODEL: 'ai_model',
  } as const,

  // Recommendation Purposes
  PURPOSES: {
    DISCOVERY: 'discovery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    CROSS_SELL: 'cross_sell',
    UP_SELL: 'up_sell',
    LIFETIME_VALUE: 'lifetime_value',
    SATISFACTION: 'satisfaction',
    LOYALTY: 'loyalty',
    BRAND_AWARENESS: 'brand_awareness',
    INCREASE_AOV: 'increase_aov',
    REDUCE_BOUNCE: 'reduce_bounce',
    ABANDONMENT_RECOVERY: 'abandonment_recovery',
    REPURCHASE_INCENTIVE: 'repurchase_incentive',
    CUSTOMER_ACQUISITION: 'customer_acquisition',
    CUSTOMER_RETENTION: 'customer_retention',
  } as const,
} as const;

export type AIRecommendationTypeType =
  (typeof AI_RECOMMENDATION_TYPE.TYPES)[keyof typeof AI_RECOMMENDATION_TYPE.TYPES];
export type AIRecommendationCategory =
  (typeof AI_RECOMMENDATION_TYPE.CATEGORIES)[keyof typeof AI_RECOMMENDATION_TYPE.CATEGORIES];
export type AIRecommendationSubType =
  (typeof AI_RECOMMENDATION_TYPE.SUB_TYPES)[keyof typeof AI_RECOMMENDATION_TYPE.SUB_TYPES];
export type AIRecommendationSource =
  (typeof AI_RECOMMENDATION_TYPE.SOURCES)[keyof typeof AI_RECOMMENDATION_TYPE.SOURCES];
export type AIRecommendationPurpose =
  (typeof AI_RECOMMENDATION_TYPE.PURPOSES)[keyof typeof AI_RECOMMENDATION_TYPE.PURPOSES];

export function getAiRecommendationTypeLabel(type: AIRecommendationTypeType): string {
  const labels: Record<AIRecommendationTypeType, string> = {
    [AI_RECOMMENDATION_TYPE.TYPES.PERSONALIZED]: 'Personalized',
    [AI_RECOMMENDATION_TYPE.TYPES.BEHAVIORAL]: 'Behavioral',
    [AI_RECOMMENDATION_TYPE.TYPES.SESSION_BASED]: 'Session Based',
    [AI_RECOMMENDATION_TYPE.TYPES.SEQUENTIAL]: 'Sequential',
    [AI_RECOMMENDATION_TYPE.TYPES.POPULAR]: 'Popular',
    [AI_RECOMMENDATION_TYPE.TYPES.TRENDING]: 'Trending',
    [AI_RECOMMENDATION_TYPE.TYPES.BESTSELLER]: 'Bestseller',
    [AI_RECOMMENDATION_TYPE.TYPES.MOST_VIEWED]: 'Most Viewed',
    [AI_RECOMMENDATION_TYPE.TYPES.CONTEXTUAL]: 'Contextual',
    [AI_RECOMMENDATION_TYPE.TYPES.SEASONAL]: 'Seasonal',
    [AI_RECOMMENDATION_TYPE.TYPES.LOCATION_BASED]: 'Location Based',
    [AI_RECOMMENDATION_TYPE.TYPES.TIME_BASED]: 'Time Based',
    [AI_RECOMMENDATION_TYPE.TYPES.CONTENT_BASED]: 'Content Based',
    [AI_RECOMMENDATION_TYPE.TYPES.CATEGORY_BASED]: 'Category Based',
    [AI_RECOMMENDATION_TYPE.TYPES.BRAND_BASED]: 'Brand Based',
    [AI_RECOMMENDATION_TYPE.TYPES.SOCIAL]: 'Social',
    [AI_RECOMMENDATION_TYPE.TYPES.COLLABORATIVE]: 'Collaborative',
    [AI_RECOMMENDATION_TYPE.TYPES.COMMUNITY]: 'Community',
    [AI_RECOMMENDATION_TYPE.TYPES.EDITORIAL]: 'Editorial',
    [AI_RECOMMENDATION_TYPE.TYPES.CURATED]: 'Curated',
    [AI_RECOMMENDATION_TYPE.TYPES.PROMOTIONAL]: 'Promotional',
    [AI_RECOMMENDATION_TYPE.TYPES.CROSS_SELLING]: 'Cross Selling',
    [AI_RECOMMENDATION_TYPE.TYPES.UP_SELLING]: 'Up Selling',
    [AI_RECOMMENDATION_TYPE.TYPES.PRE_PURCHASE]: 'Pre Purchase',
    [AI_RECOMMENDATION_TYPE.TYPES.POST_PURCHASE]: 'Post Purchase',
    [AI_RECOMMENDATION_TYPE.TYPES.CART_ABANDONMENT]: 'Cart Abandonment',
    [AI_RECOMMENDATION_TYPE.TYPES.REPURCHASE]: 'Repurchase',
    [AI_RECOMMENDATION_TYPE.TYPES.HYBRID]: 'Hybrid',
    [AI_RECOMMENDATION_TYPE.TYPES.ENSEMBLE]: 'Ensemble',
    [AI_RECOMMENDATION_TYPE.TYPES.REINFORCEMENT]: 'Reinforcement',
    [AI_RECOMMENDATION_TYPE.TYPES.EXPLORE_EXPLOIT]: 'Explore Exploit',
  };
  return labels[type] || 'Unknown';
}

export function getAiRecommendationCategoryLabel(category: AIRecommendationCategory): string {
  const labels: Record<AIRecommendationCategory, string> = {
    [AI_RECOMMENDATION_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.CONTENT]: 'Content',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.CATEGORY]: 'Category',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.BRAND]: 'Brand',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.COLLECTION]: 'Collection',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.DEAL]: 'Deal',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.PROMOTION]: 'Promotion',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.SERVICE]: 'Service',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.BLOG]: 'Blog',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.VIDEO]: 'Video',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.TUTORIAL]: 'Tutorial',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.ARTICLE]: 'Article',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.REVIEW]: 'Review',
    [AI_RECOMMENDATION_TYPE.CATEGORIES.TESTIMONIAL]: 'Testimonial',
  };
  return labels[category] || 'Unknown';
}

export function getAiRecommendationSourceLabel(source: AIRecommendationSource): string {
  const labels: Record<AIRecommendationSource, string> = {
    [AI_RECOMMENDATION_TYPE.SOURCES.USER_HISTORY]: 'User History',
    [AI_RECOMMENDATION_TYPE.SOURCES.USER_PROFILE]: 'User Profile',
    [AI_RECOMMENDATION_TYPE.SOURCES.USER_PREFERENCES]: 'User Preferences',
    [AI_RECOMMENDATION_TYPE.SOURCES.USER_SESSION]: 'User Session',
    [AI_RECOMMENDATION_TYPE.SOURCES.BROWSE_HISTORY]: 'Browse History',
    [AI_RECOMMENDATION_TYPE.SOURCES.PURCHASE_HISTORY]: 'Purchase History',
    [AI_RECOMMENDATION_TYPE.SOURCES.SEARCH_HISTORY]: 'Search History',
    [AI_RECOMMENDATION_TYPE.SOURCES.WISHLIST]: 'Wishlist',
    [AI_RECOMMENDATION_TYPE.SOURCES.CART]: 'Cart',
    [AI_RECOMMENDATION_TYPE.SOURCES.REVIEWS]: 'Reviews',
    [AI_RECOMMENDATION_TYPE.SOURCES.RATINGS]: 'Ratings',
    [AI_RECOMMENDATION_TYPE.SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [AI_RECOMMENDATION_TYPE.SOURCES.EMAIL]: 'Email',
    [AI_RECOMMENDATION_TYPE.SOURCES.AFFILIATE]: 'Affiliate',
    [AI_RECOMMENDATION_TYPE.SOURCES.CAMPAIGN]: 'Campaign',
    [AI_RECOMMENDATION_TYPE.SOURCES.ANALYTICS]: 'Analytics',
    [AI_RECOMMENDATION_TYPE.SOURCES.TRENDING_NOW]: 'Trending Now',
    [AI_RECOMMENDATION_TYPE.SOURCES.SEASONAL_TRENDS]: 'Seasonal Trends',
    [AI_RECOMMENDATION_TYPE.SOURCES.MARKET_TRENDS]: 'Market Trends',
    [AI_RECOMMENDATION_TYPE.SOURCES.EXPERT_CURATION]: 'Expert Curation',
    [AI_RECOMMENDATION_TYPE.SOURCES.AI_MODEL]: 'AI Model',
  };
  return labels[source] || 'Unknown';
}

export function getAiRecommendationPurposeLabel(purpose: AIRecommendationPurpose): string {
  const labels: Record<AIRecommendationPurpose, string> = {
    [AI_RECOMMENDATION_TYPE.PURPOSES.DISCOVERY]: 'Discovery',
    [AI_RECOMMENDATION_TYPE.PURPOSES.ENGAGEMENT]: 'Engagement',
    [AI_RECOMMENDATION_TYPE.PURPOSES.CONVERSION]: 'Conversion',
    [AI_RECOMMENDATION_TYPE.PURPOSES.RETENTION]: 'Retention',
    [AI_RECOMMENDATION_TYPE.PURPOSES.CROSS_SELL]: 'Cross Sell',
    [AI_RECOMMENDATION_TYPE.PURPOSES.UP_SELL]: 'Up Sell',
    [AI_RECOMMENDATION_TYPE.PURPOSES.LIFETIME_VALUE]: 'Lifetime Value',
    [AI_RECOMMENDATION_TYPE.PURPOSES.SATISFACTION]: 'Satisfaction',
    [AI_RECOMMENDATION_TYPE.PURPOSES.LOYALTY]: 'Loyalty',
    [AI_RECOMMENDATION_TYPE.PURPOSES.BRAND_AWARENESS]: 'Brand Awareness',
    [AI_RECOMMENDATION_TYPE.PURPOSES.INCREASE_AOV]: 'Increase AOV',
    [AI_RECOMMENDATION_TYPE.PURPOSES.REDUCE_BOUNCE]: 'Reduce Bounce',
    [AI_RECOMMENDATION_TYPE.PURPOSES.ABANDONMENT_RECOVERY]: 'Abandonment Recovery',
    [AI_RECOMMENDATION_TYPE.PURPOSES.REPURCHASE_INCENTIVE]: 'Repurchase Incentive',
    [AI_RECOMMENDATION_TYPE.PURPOSES.CUSTOMER_ACQUISITION]: 'Customer Acquisition',
    [AI_RECOMMENDATION_TYPE.PURPOSES.CUSTOMER_RETENTION]: 'Customer Retention',
  };
  return labels[purpose] || 'Unknown';
}

export function getAiRecommendationDefaultCountByPurpose(purpose: AIRecommendationPurpose): number {
  const counts: Record<AIRecommendationPurpose, number> = {
    [AI_RECOMMENDATION_TYPE.PURPOSES.DISCOVERY]: 20,
    [AI_RECOMMENDATION_TYPE.PURPOSES.ENGAGEMENT]: 15,
    [AI_RECOMMENDATION_TYPE.PURPOSES.CONVERSION]: 5,
    [AI_RECOMMENDATION_TYPE.PURPOSES.RETENTION]: 10,
    [AI_RECOMMENDATION_TYPE.PURPOSES.CROSS_SELL]: 3,
    [AI_RECOMMENDATION_TYPE.PURPOSES.UP_SELL]: 2,
    [AI_RECOMMENDATION_TYPE.PURPOSES.LIFETIME_VALUE]: 5,
    [AI_RECOMMENDATION_TYPE.PURPOSES.SATISFACTION]: 5,
    [AI_RECOMMENDATION_TYPE.PURPOSES.LOYALTY]: 5,
    [AI_RECOMMENDATION_TYPE.PURPOSES.BRAND_AWARENESS]: 10,
    [AI_RECOMMENDATION_TYPE.PURPOSES.INCREASE_AOV]: 3,
    [AI_RECOMMENDATION_TYPE.PURPOSES.REDUCE_BOUNCE]: 8,
    [AI_RECOMMENDATION_TYPE.PURPOSES.ABANDONMENT_RECOVERY]: 3,
    [AI_RECOMMENDATION_TYPE.PURPOSES.REPURCHASE_INCENTIVE]: 3,
    [AI_RECOMMENDATION_TYPE.PURPOSES.CUSTOMER_ACQUISITION]: 10,
    [AI_RECOMMENDATION_TYPE.PURPOSES.CUSTOMER_RETENTION]: 10,
  };
  return counts[purpose] || 10;
}
