/**
 * SEO Ranking Type Constants
 * Types and classifications for SEO rankings
 */

export const SEO_RANKING_TYPE = {
  // Ranking Categories
  CATEGORIES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    LOCAL: 'local',
    MOBILE: 'mobile',
    DESKTOP: 'desktop',
    VOICE: 'voice',
    VISUAL: 'visual',
    VIDEO: 'video',
    NEWS: 'news',
    SHOPPING: 'shopping',
  } as const,

  // Ranking Sub-types
  SUB_TYPES: {
    // Organic
    WEB: 'web',
    IMAGE: 'image',
    VIDEO: 'video',
    NEWS: 'news',
    SHOPPING: 'shopping',
    BOOKS: 'books',
    SCHOLAR: 'scholar',
    PATENTS: 'patents',

    // Local
    LOCAL_PACK: 'local_pack',
    LOCAL_KNOWLEDGE: 'local_knowledge',
    LOCAL_LISTINGS: 'local_listings',
    LOCAL_REVIEWS: 'local_reviews',

    // Mobile
    APP: 'app',
    MOBILE_WEB: 'mobile_web',
    AMP: 'amp',
  } as const,

  // Ranking SERP Features
  SERP_FEATURES: {
    FEATURED_SNIPPET: 'featured_snippet',
    PEOPLE_ALSO_ASK: 'people_also_ask',
    LOCAL_PACK: 'local_pack',
    KNOWLEDGE_PANEL: 'knowledge_panel',
    SITELINKS: 'sitelinks',
    REVIEW_SNIPPET: 'review_snippet',
    VIDEO_CAROUSEL: 'video_carousel',
    IMAGE_PACK: 'image_pack',
    NEWS_PACK: 'news_pack',
    SHOPPING_CAROUSEL: 'shopping_carousel',
    TOP_STORIES: 'top_stories',
    TWITTER_CAROUSEL: 'twitter_carousel',
    JOB_LISTINGS: 'job_listings',
    EVENT_LISTINGS: 'event_listings',
    RECIPE_CAROUSEL: 'recipe_carousel',
    Q_A: 'q_a',
  } as const,

  // Ranking Device Types
  DEVICE_TYPES: {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet',
    SMART_TV: 'smart_tv',
    SMART_SPEAKER: 'smart_speaker',
    WEARABLE: 'wearable',
  } as const,

  // Ranking Algorithm Types
  ALGORITHM_TYPES: {
    PAGE_RANK: 'page_rank',
    BERT: 'bert',
    RANK_BRAIN: 'rank_brain',
    HUMMINGBIRD: 'hummingbird',
    PANDA: 'panda',
    PENGUIN: 'penguin',
    COLOSSUS: 'colossus',
    POSSUM: 'possum',
    FRED: 'fred',
    E_EAT: 'e_eat',
    HELPUL_CONTENT: 'helpful_content',
  } as const,

  // Ranking Quality Types
  QUALITY_TYPES: {
    HIGH_QUALITY: 'high_quality',
    MEDIUM_QUALITY: 'medium_quality',
    LOW_QUALITY: 'low_quality',
    POOR_QUALITY: 'poor_quality',
  } as const,

  // Ranking Stability Types
  STABILITY_TYPES: {
    STABLE: 'stable',
    VOLATILE: 'volatile',
    SEASONAL: 'seasonal',
    TRENDING: 'trending',
    EMERGING: 'emerging',
    DECLINING: 'declining',
  } as const,
} as const;

// Ranking Categories
export type SEORankingTypeCategory =
  (typeof SEO_RANKING_TYPE.CATEGORIES)[keyof typeof SEO_RANKING_TYPE.CATEGORIES];

// Ranking Sub-types
export type SEORankingTypeSubType =
  (typeof SEO_RANKING_TYPE.SUB_TYPES)[keyof typeof SEO_RANKING_TYPE.SUB_TYPES];

// SERP Features
export type SEORankingTypeSERPFeature =
  (typeof SEO_RANKING_TYPE.SERP_FEATURES)[keyof typeof SEO_RANKING_TYPE.SERP_FEATURES];

// Device Types
export type SEORankingTypeDevice =
  (typeof SEO_RANKING_TYPE.DEVICE_TYPES)[keyof typeof SEO_RANKING_TYPE.DEVICE_TYPES];

// Algorithm Types
export type SEORankingTypeAlgorithm =
  (typeof SEO_RANKING_TYPE.ALGORITHM_TYPES)[keyof typeof SEO_RANKING_TYPE.ALGORITHM_TYPES];

// Quality Types
export type SEORankingTypeQuality =
  (typeof SEO_RANKING_TYPE.QUALITY_TYPES)[keyof typeof SEO_RANKING_TYPE.QUALITY_TYPES];

// Stability Types
export type SEORankingTypeStability =
  (typeof SEO_RANKING_TYPE.STABILITY_TYPES)[keyof typeof SEO_RANKING_TYPE.STABILITY_TYPES];

// Utility Functions
export function getSEORankingCategoryLabel(category: SEORankingTypeCategory): string {
  const labels: Record<SEORankingTypeCategory, string> = {
    [SEO_RANKING_TYPE.CATEGORIES.ORGANIC]: 'Organic Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.PAID]: 'Paid Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.LOCAL]: 'Local Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.MOBILE]: 'Mobile Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.DESKTOP]: 'Desktop Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.VOICE]: 'Voice Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.VISUAL]: 'Visual Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.VIDEO]: 'Video Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.NEWS]: 'News Rankings',
    [SEO_RANKING_TYPE.CATEGORIES.SHOPPING]: 'Shopping Rankings',
  };
  return labels[category] || 'Unknown Category';
}

export function getSEORankingSubTypeLabel(subType: SEORankingTypeSubType): string {
  const labels: Record<SEORankingTypeSubType, string> = {
    // Organic
    [SEO_RANKING_TYPE.SUB_TYPES.WEB]: 'Web Search',
    [SEO_RANKING_TYPE.SUB_TYPES.IMAGE]: 'Image Search',
    [SEO_RANKING_TYPE.SUB_TYPES.VIDEO]: 'Video Search',
    [SEO_RANKING_TYPE.SUB_TYPES.NEWS]: 'News Search',
    [SEO_RANKING_TYPE.SUB_TYPES.SHOPPING]: 'Shopping Search',
    [SEO_RANKING_TYPE.SUB_TYPES.BOOKS]: 'Books Search',
    [SEO_RANKING_TYPE.SUB_TYPES.SCHOLAR]: 'Scholar Search',
    [SEO_RANKING_TYPE.SUB_TYPES.PATENTS]: 'Patents Search',

    // Local
    [SEO_RANKING_TYPE.SUB_TYPES.LOCAL_PACK]: 'Local Pack',
    [SEO_RANKING_TYPE.SUB_TYPES.LOCAL_KNOWLEDGE]: 'Local Knowledge',
    [SEO_RANKING_TYPE.SUB_TYPES.LOCAL_LISTINGS]: 'Local Listings',
    [SEO_RANKING_TYPE.SUB_TYPES.LOCAL_REVIEWS]: 'Local Reviews',

    // Mobile
    [SEO_RANKING_TYPE.SUB_TYPES.APP]: 'App Rankings',
    [SEO_RANKING_TYPE.SUB_TYPES.MOBILE_WEB]: 'Mobile Web',
    [SEO_RANKING_TYPE.SUB_TYPES.AMP]: 'AMP Rankings',
  };
  return labels[subType] || 'Unknown Sub-type';
}

export function getSEORankingSERPFeatureLabel(feature: SEORankingTypeSERPFeature): string {
  const labels: Record<SEORankingTypeSERPFeature, string> = {
    [SEO_RANKING_TYPE.SERP_FEATURES.FEATURED_SNIPPET]: 'Featured Snippet',
    [SEO_RANKING_TYPE.SERP_FEATURES.PEOPLE_ALSO_ASK]: 'People Also Ask',
    [SEO_RANKING_TYPE.SERP_FEATURES.LOCAL_PACK]: 'Local Pack',
    [SEO_RANKING_TYPE.SERP_FEATURES.KNOWLEDGE_PANEL]: 'Knowledge Panel',
    [SEO_RANKING_TYPE.SERP_FEATURES.SITELINKS]: 'Sitelinks',
    [SEO_RANKING_TYPE.SERP_FEATURES.REVIEW_SNIPPET]: 'Review Snippet',
    [SEO_RANKING_TYPE.SERP_FEATURES.VIDEO_CAROUSEL]: 'Video Carousel',
    [SEO_RANKING_TYPE.SERP_FEATURES.IMAGE_PACK]: 'Image Pack',
    [SEO_RANKING_TYPE.SERP_FEATURES.NEWS_PACK]: 'News Pack',
    [SEO_RANKING_TYPE.SERP_FEATURES.SHOPPING_CAROUSEL]: 'Shopping Carousel',
    [SEO_RANKING_TYPE.SERP_FEATURES.TOP_STORIES]: 'Top Stories',
    [SEO_RANKING_TYPE.SERP_FEATURES.TWITTER_CAROUSEL]: 'Twitter Carousel',
    [SEO_RANKING_TYPE.SERP_FEATURES.JOB_LISTINGS]: 'Job Listings',
    [SEO_RANKING_TYPE.SERP_FEATURES.EVENT_LISTINGS]: 'Event Listings',
    [SEO_RANKING_TYPE.SERP_FEATURES.RECIPE_CAROUSEL]: 'Recipe Carousel',
    [SEO_RANKING_TYPE.SERP_FEATURES.Q_A]: 'Q&A',
  };
  return labels[feature] || 'Unknown SERP Feature';
}

export function getSEORankingDeviceLabel(device: SEORankingTypeDevice): string {
  const labels: Record<SEORankingTypeDevice, string> = {
    [SEO_RANKING_TYPE.DEVICE_TYPES.DESKTOP]: 'Desktop',
    [SEO_RANKING_TYPE.DEVICE_TYPES.MOBILE]: 'Mobile',
    [SEO_RANKING_TYPE.DEVICE_TYPES.TABLET]: 'Tablet',
    [SEO_RANKING_TYPE.DEVICE_TYPES.SMART_TV]: 'Smart TV',
    [SEO_RANKING_TYPE.DEVICE_TYPES.SMART_SPEAKER]: 'Smart Speaker',
    [SEO_RANKING_TYPE.DEVICE_TYPES.WEARABLE]: 'Wearable',
  };
  return labels[device] || 'Unknown Device';
}

export function getSEORankingAlgorithmLabel(algorithm: SEORankingTypeAlgorithm): string {
  const labels: Record<SEORankingTypeAlgorithm, string> = {
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.PAGE_RANK]: 'PageRank',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.BERT]: 'BERT',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.RANK_BRAIN]: 'RankBrain',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.HUMMINGBIRD]: 'Hummingbird',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.PANDA]: 'Panda',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.PENGUIN]: 'Penguin',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.COLOSSUS]: 'Colossus',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.POSSUM]: 'Possum',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.FRED]: 'Fred',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.E_EAT]: 'E-E-A-T',
    [SEO_RANKING_TYPE.ALGORITHM_TYPES.HELPUL_CONTENT]: 'Helpful Content',
  };
  return labels[algorithm] || 'Unknown Algorithm';
}

export function getSEORankingQualityLabel(quality: SEORankingTypeQuality): string {
  const labels: Record<SEORankingTypeQuality, string> = {
    [SEO_RANKING_TYPE.QUALITY_TYPES.HIGH_QUALITY]: 'High Quality',
    [SEO_RANKING_TYPE.QUALITY_TYPES.MEDIUM_QUALITY]: 'Medium Quality',
    [SEO_RANKING_TYPE.QUALITY_TYPES.LOW_QUALITY]: 'Low Quality',
    [SEO_RANKING_TYPE.QUALITY_TYPES.POOR_QUALITY]: 'Poor Quality',
  };
  return labels[quality] || 'Unknown Quality';
}

export function getSEORankingStabilityLabel(stability: SEORankingTypeStability): string {
  const labels: Record<SEORankingTypeStability, string> = {
    [SEO_RANKING_TYPE.STABILITY_TYPES.STABLE]: 'Stable',
    [SEO_RANKING_TYPE.STABILITY_TYPES.VOLATILE]: 'Volatile',
    [SEO_RANKING_TYPE.STABILITY_TYPES.SEASONAL]: 'Seasonal',
    [SEO_RANKING_TYPE.STABILITY_TYPES.TRENDING]: 'Trending',
    [SEO_RANKING_TYPE.STABILITY_TYPES.EMERGING]: 'Emerging',
    [SEO_RANKING_TYPE.STABILITY_TYPES.DECLINING]: 'Declining',
  };
  return labels[stability] || 'Unknown Stability';
}
