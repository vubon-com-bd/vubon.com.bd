/**
 * ডিফল্ট রেকমেন্ডেশন সংখ্যা
 */
export const AI_RECOMMENDATION_DEFAULT_LIMIT = 10 as const;

/**
 * ন্যূনতম স্কোর (0.0)
 */
export const AI_RECOMMENDATION_MIN_SCORE = 0.0 as const;

/**
 * সর্বোচ্চ স্কোর (1.0)
 */
export const AI_RECOMMENDATION_MAX_SCORE = 1.0 as const;

/**
 * ডিফল্ট রেকমেন্ডেশন স্ট্র্যাটেজি
 */
export const AI_RECOMMENDATION_DEFAULT_STRATEGY = 'hybrid' as const;

/**
 * রেকমেন্ডেশনের ফ্রেশনেস সময় (7 দিন)
 */
export const AI_RECOMMENDATION_FRESHNESS = 7 as const; // 7 days

/**
 * ডাইভার্সিটি ফ্যাক্টর (0.3)
 * 0.0 = কম ডাইভার্সিটি, 1.0 = বেশি ডাইভার্সিটি
 */
export const AI_RECOMMENDATION_DIVERSITY = 0.3 as const;

/**
 * পার্সোনালাইজেশন ওয়েট (0.6)
 * 0.0 = কম পার্সোনালাইজেশন, 1.0 = বেশি পার্সোনালাইজেশন
 */
export const AI_RECOMMENDATION_PERSONALIZATION_WEIGHT = 0.6 as const;

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি এনাম
 */
export const AI_RECOMMENDATION_STRATEGY = {
  CONTENT_BASED: 'content-based',
  COLLABORATIVE: 'collaborative',
  HYBRID: 'hybrid',
  POPULARITY: 'popularity',
  TRENDING: 'trending',
  PERSONALIZED: 'personalized',
  DIVERSIFIED: 'diversified',
  EXPLORATION: 'exploration',
} as const;

/**
 * AI_RECOMMENDATION_STRATEGY থেকে টাইপ
 */
export type AIRecommendationStrategy =
  (typeof AI_RECOMMENDATION_STRATEGY)[keyof typeof AI_RECOMMENDATION_STRATEGY];

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি লেবেল
 */
export const AI_RECOMMENDATION_STRATEGY_LABELS: Record<AIRecommendationStrategy, string> = {
  [AI_RECOMMENDATION_STRATEGY.CONTENT_BASED]: 'Content-Based',
  [AI_RECOMMENDATION_STRATEGY.COLLABORATIVE]: 'Collaborative',
  [AI_RECOMMENDATION_STRATEGY.HYBRID]: 'Hybrid',
  [AI_RECOMMENDATION_STRATEGY.POPULARITY]: 'Popularity',
  [AI_RECOMMENDATION_STRATEGY.TRENDING]: 'Trending',
  [AI_RECOMMENDATION_STRATEGY.PERSONALIZED]: 'Personalized',
  [AI_RECOMMENDATION_STRATEGY.DIVERSIFIED]: 'Diversified',
  [AI_RECOMMENDATION_STRATEGY.EXPLORATION]: 'Exploration',
} as const;

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি বিবরণ
 */
export const AI_RECOMMENDATION_STRATEGY_DESCRIPTIONS: Record<AIRecommendationStrategy, string> = {
  [AI_RECOMMENDATION_STRATEGY.CONTENT_BASED]:
    'Recommends items similar to user preferences based on content features',
  [AI_RECOMMENDATION_STRATEGY.COLLABORATIVE]:
    'Recommends items based on user behavior and similarity with other users',
  [AI_RECOMMENDATION_STRATEGY.HYBRID]:
    'Combines content-based and collaborative approaches for better recommendations',
  [AI_RECOMMENDATION_STRATEGY.POPULARITY]: 'Recommends most popular items across all users',
  [AI_RECOMMENDATION_STRATEGY.TRENDING]: 'Recommends currently trending or rising items',
  [AI_RECOMMENDATION_STRATEGY.PERSONALIZED]:
    'Highly personalized recommendations based on individual user preferences',
  [AI_RECOMMENDATION_STRATEGY.DIVERSIFIED]: 'Emphasizes diversity to avoid filter bubbles',
  [AI_RECOMMENDATION_STRATEGY.EXPLORATION]: 'Encourages exploration of new or less-known items',
} as const;

/**
 * AI রেকমেন্ডেশন কনফিগারেশন
 */
export interface AIRecommendationConfig {
  limit: number;
  minScore: number;
  maxScore: number;
  strategy: AIRecommendationStrategy;
  freshness: number; // days
  diversity: number;
  personalizationWeight: number;
  enableContentBased: boolean;
  enableCollaborative: boolean;
  enableHybrid: boolean;
  enablePopularity: boolean;
  enableTrending: boolean;
  enablePersonalized: boolean;
  enableDiversified: boolean;
  enableExploration: boolean;
}

/**
 * AI রেকমেন্ডেশন ডিফল্ট কনফিগারেশন
 */
export const AI_RECOMMENDATION_DEFAULT_CONFIG: AIRecommendationConfig = {
  limit: AI_RECOMMENDATION_DEFAULT_LIMIT,
  minScore: AI_RECOMMENDATION_MIN_SCORE,
  maxScore: AI_RECOMMENDATION_MAX_SCORE,
  strategy: AI_RECOMMENDATION_DEFAULT_STRATEGY as AIRecommendationStrategy,
  freshness: AI_RECOMMENDATION_FRESHNESS,
  diversity: AI_RECOMMENDATION_DIVERSITY,
  personalizationWeight: AI_RECOMMENDATION_PERSONALIZATION_WEIGHT,
  enableContentBased: true,
  enableCollaborative: true,
  enableHybrid: true,
  enablePopularity: false,
  enableTrending: true,
  enablePersonalized: true,
  enableDiversified: true,
  enableExploration: false,
} as const;

/**
 * AI রেকমেন্ডেশন ফিল্টার
 */
export interface AIRecommendationFilter {
  strategy?: AIRecommendationStrategy;
  minScore?: number;
  maxScore?: number;
  limit?: number;
  offset?: number;
  categories?: string[];
  excludeIds?: string[];
  freshness?: number;
  diversity?: number;
  personalizationWeight?: number;
}

/**
 * AI রেকমেন্ডেশন আইটেম
 */
export interface AIRecommendationItem {
  id: string;
  title: string;
  description?: string;
  score: number;
  category: string;
  tags: string[];
  metadata: Record<string, unknown>;
  recommendedAt: Date;
  expiresAt?: Date;
}

/**
 * AI রেকমেন্ডেশন রেসপন্স
 */
export interface AIRecommendationResponse {
  items: AIRecommendationItem[];
  total: number;
  strategy: AIRecommendationStrategy;
  limit: number;
  offset: number;
  hasMore: boolean;
  nextOffset?: number;
}

/**
 * রেকমেন্ডেশন স্কোর রেঞ্জ
 */
export const AI_RECOMMENDATION_SCORE_RANGE = {
  min: AI_RECOMMENDATION_MIN_SCORE,
  max: AI_RECOMMENDATION_MAX_SCORE,
} as const;

/**
 * রেকমেন্ডেশন স্কোর থ্রেশহোল্ড
 */
export const AI_RECOMMENDATION_SCORE_THRESHOLDS = {
  LOW: 0.3,
  MEDIUM: 0.6,
  HIGH: 0.8,
  EXCELLENT: 0.9,
} as const;

/**
 * রেকমেন্ডেশন স্কোর থ্রেশহোল্ড টাইপ
 */
export type AIRecommendationScoreThreshold =
  (typeof AI_RECOMMENDATION_SCORE_THRESHOLDS)[keyof typeof AI_RECOMMENDATION_SCORE_THRESHOLDS];

/**
 * রেকমেন্ডেশন স্কোর ক্যাটাগরি
 */
export const AI_RECOMMENDATION_SCORE_CATEGORIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  EXCELLENT: 'excellent',
} as const;

/**
 * রেকমেন্ডেশন স্কোর ক্যাটাগরি টাইপ
 */
export type AIRecommendationScoreCategory =
  (typeof AI_RECOMMENDATION_SCORE_CATEGORIES)[keyof typeof AI_RECOMMENDATION_SCORE_CATEGORIES];

/**
 * রেকমেন্ডেশন স্কোর ক্যাটাগরি লেবেল
 */
export const AI_RECOMMENDATION_SCORE_CATEGORY_LABELS: Record<
  AIRecommendationScoreCategory,
  string
> = {
  [AI_RECOMMENDATION_SCORE_CATEGORIES.LOW]: 'Low',
  [AI_RECOMMENDATION_SCORE_CATEGORIES.MEDIUM]: 'Medium',
  [AI_RECOMMENDATION_SCORE_CATEGORIES.HIGH]: 'High',
  [AI_RECOMMENDATION_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
} as const;

/**
 * রেকমেন্ডেশন স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const AI_RECOMMENDATION_SCORE_CATEGORY_THRESHOLDS: Record<
  AIRecommendationScoreCategory,
  number
> = {
  [AI_RECOMMENDATION_SCORE_CATEGORIES.LOW]: AI_RECOMMENDATION_SCORE_THRESHOLDS.LOW,
  [AI_RECOMMENDATION_SCORE_CATEGORIES.MEDIUM]: AI_RECOMMENDATION_SCORE_THRESHOLDS.MEDIUM,
  [AI_RECOMMENDATION_SCORE_CATEGORIES.HIGH]: AI_RECOMMENDATION_SCORE_THRESHOLDS.HIGH,
  [AI_RECOMMENDATION_SCORE_CATEGORIES.EXCELLENT]: AI_RECOMMENDATION_SCORE_THRESHOLDS.EXCELLENT,
} as const;
