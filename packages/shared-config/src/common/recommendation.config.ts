/**
 * Recommendation Configuration
 * রেকমেন্ডেশন কনফিগারেশন
 */
export interface RecommendationConfig {
  enabled: boolean;
  algorithms: {
    collaborative: boolean;
    contentBased: boolean;
    popularity: boolean;
    hybrid: boolean;
  };
  sources: {
    userHistory: boolean;
    userPreferences: boolean;
    similarUsers: boolean;
    similarItems: boolean;
    trending: boolean;
  };
  filters: {
    minScore: number;
    maxResults: number;
    excludeViewed: boolean;
    excludePurchased: boolean;
  };
  cache: {
    enabled: boolean;
    ttl: number;
  };
}

export const createRecommendationConfig = (): RecommendationConfig => ({
  enabled: true,
  algorithms: {
    collaborative: true,
    contentBased: true,
    popularity: true,
    hybrid: true,
  },
  sources: {
    userHistory: true,
    userPreferences: true,
    similarUsers: true,
    similarItems: true,
    trending: true,
  },
  filters: {
    minScore: 0.5,
    maxResults: 50,
    excludeViewed: true,
    excludePurchased: true,
  },
  cache: {
    enabled: true,
    ttl: 60 * 60 * 1000, // 1 hour
  },
});
