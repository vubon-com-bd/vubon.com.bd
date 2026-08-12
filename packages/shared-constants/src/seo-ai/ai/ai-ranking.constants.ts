/**
 * ডিফল্ট র্যাঙ্কিং ফলাফল
 */
export const AI_RANKING_DEFAULT_LIMIT = 50 as const;

/**
 * ন্যূনতম স্কোর (0.0)
 */
export const AI_RANKING_MIN_SCORE = 0.0 as const;

/**
 * সর্বোচ্চ স্কোর (1.0)
 */
export const AI_RANKING_MAX_SCORE = 1.0 as const;

/**
 * র্যাঙ্কিং ফ্যাক্টরসমূহ
 */
export const AI_RANKING_FACTORS = {
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  RECENCY: 'recency',
  ENGAGEMENT: 'engagement',
  QUALITY: 'quality',
  AUTHORITY: 'authority',
  USER_PREFERENCE: 'user-preference',
  CONTEXT: 'context',
} as const;

/**
 * AI_RANKING_FACTORS থেকে টাইপ
 */
export type AIRankingFactor = (typeof AI_RANKING_FACTORS)[keyof typeof AI_RANKING_FACTORS];

/**
 * র্যাঙ্কিং ফ্যাক্টর লেবেল
 */
export const AI_RANKING_FACTOR_LABELS: Record<AIRankingFactor, string> = {
  [AI_RANKING_FACTORS.RELEVANCE]: 'Relevance',
  [AI_RANKING_FACTORS.POPULARITY]: 'Popularity',
  [AI_RANKING_FACTORS.RECENCY]: 'Recency',
  [AI_RANKING_FACTORS.ENGAGEMENT]: 'Engagement',
  [AI_RANKING_FACTORS.QUALITY]: 'Quality',
  [AI_RANKING_FACTORS.AUTHORITY]: 'Authority',
  [AI_RANKING_FACTORS.USER_PREFERENCE]: 'User Preference',
  [AI_RANKING_FACTORS.CONTEXT]: 'Context',
} as const;

/**
 * ডিফল্ট ওয়েটেজ (প্রতিটি ফ্যাক্টরের জন্য ওয়েট)
 */
export const AI_RANKING_DEFAULT_WEIGHTS: Record<AIRankingFactor, number> = {
  [AI_RANKING_FACTORS.RELEVANCE]: 0.35,
  [AI_RANKING_FACTORS.POPULARITY]: 0.1,
  [AI_RANKING_FACTORS.RECENCY]: 0.1,
  [AI_RANKING_FACTORS.ENGAGEMENT]: 0.1,
  [AI_RANKING_FACTORS.QUALITY]: 0.15,
  [AI_RANKING_FACTORS.AUTHORITY]: 0.05,
  [AI_RANKING_FACTORS.USER_PREFERENCE]: 0.1,
  [AI_RANKING_FACTORS.CONTEXT]: 0.05,
} as const;

/**
 * র্যাঙ্কিং ফ্যাক্টর ক্যাটাগরি
 */
export const AI_RANKING_FACTOR_CATEGORIES = {
  CONTENT_BASED: [AI_RANKING_FACTORS.RELEVANCE, AI_RANKING_FACTORS.QUALITY] as const,
  USER_BASED: [AI_RANKING_FACTORS.USER_PREFERENCE, AI_RANKING_FACTORS.ENGAGEMENT] as const,
  POPULARITY_BASED: [AI_RANKING_FACTORS.POPULARITY] as const,
  TIME_BASED: [AI_RANKING_FACTORS.RECENCY] as const,
  CONTEXT_BASED: [AI_RANKING_FACTORS.CONTEXT, AI_RANKING_FACTORS.AUTHORITY] as const,
} as const;

/**
 * র্যাঙ্কিং ফ্যাক্টর ক্যাটাগরি লেবেল
 */
export const AI_RANKING_FACTOR_CATEGORY_LABELS = {
  CONTENT_BASED: 'Content Based',
  USER_BASED: 'User Based',
  POPULARITY_BASED: 'Popularity Based',
  TIME_BASED: 'Time Based',
  CONTEXT_BASED: 'Context Based',
} as const;

/**
 * র্যাঙ্কিং মোড
 */
export const AI_RANKING_MODE = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
  PERSONALIZED: 'personalized',
  CONTEXTUAL: 'contextual',
} as const;

/**
 * AI_RANKING_MODE থেকে টাইপ
 */
export type AIRankingMode = (typeof AI_RANKING_MODE)[keyof typeof AI_RANKING_MODE];

/**
 * র্যাঙ্কিং মোড লেবেল
 */
export const AI_RANKING_MODE_LABELS: Record<AIRankingMode, string> = {
  [AI_RANKING_MODE.STATIC]: 'Static',
  [AI_RANKING_MODE.DYNAMIC]: 'Dynamic',
  [AI_RANKING_MODE.PERSONALIZED]: 'Personalized',
  [AI_RANKING_MODE.CONTEXTUAL]: 'Contextual',
} as const;

/**
 * র্যাঙ্কিং মোড বিবরণ
 */
export const AI_RANKING_MODE_DESCRIPTIONS: Record<AIRankingMode, string> = {
  [AI_RANKING_MODE.STATIC]: 'Uses fixed weights and factors for ranking',
  [AI_RANKING_MODE.DYNAMIC]: 'Adjusts weights dynamically based on performance',
  [AI_RANKING_MODE.PERSONALIZED]: 'Personalizes ranking based on user preferences',
  [AI_RANKING_MODE.CONTEXTUAL]: 'Adapts ranking based on contextual signals',
} as const;

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি
 */
export const AI_RANKING_STRATEGY = {
  LINEAR: 'linear',
  LOGARITHMIC: 'logarithmic',
  EXPONENTIAL: 'exponential',
  SIGMOID: 'sigmoid',
  HYBRID: 'hybrid',
} as const;

/**
 * AI_RANKING_STRATEGY থেকে টাইপ
 */
export type AIRankingStrategy = (typeof AI_RANKING_STRATEGY)[keyof typeof AI_RANKING_STRATEGY];

/**
 * র্যাঙ্কিং স্ট্র্যাটেজি লেবেল
 */
export const AI_RANKING_STRATEGY_LABELS: Record<AIRankingStrategy, string> = {
  [AI_RANKING_STRATEGY.LINEAR]: 'Linear',
  [AI_RANKING_STRATEGY.LOGARITHMIC]: 'Logarithmic',
  [AI_RANKING_STRATEGY.EXPONENTIAL]: 'Exponential',
  [AI_RANKING_STRATEGY.SIGMOID]: 'Sigmoid',
  [AI_RANKING_STRATEGY.HYBRID]: 'Hybrid',
} as const;

/**
 * র্যাঙ্কিং কনফিগারেশন
 */
export interface AIRankingConfig {
  limit: number;
  minScore: number;
  maxScore: number;
  weights: Record<AIRankingFactor, number>;
  mode: AIRankingMode;
  strategy: AIRankingStrategy;
  enablePersonalization: boolean;
  enableContextAdaptation: boolean;
  enableLearning: boolean;
  decayRate: number;
}

/**
 * র্যাঙ্কিং ডিফল্ট কনফিগারেশন
 */
export const AI_RANKING_DEFAULT_CONFIG: AIRankingConfig = {
  limit: AI_RANKING_DEFAULT_LIMIT,
  minScore: AI_RANKING_MIN_SCORE,
  maxScore: AI_RANKING_MAX_SCORE,
  weights: AI_RANKING_DEFAULT_WEIGHTS,
  mode: AI_RANKING_MODE.DYNAMIC,
  strategy: AI_RANKING_STRATEGY.HYBRID,
  enablePersonalization: true,
  enableContextAdaptation: true,
  enableLearning: true,
  decayRate: 0.1,
} as const;

/**
 * র্যাঙ্কিং ফিল্টার
 */
export interface AIRankingFilter {
  factors?: AIRankingFactor[];
  minScore?: number;
  maxScore?: number;
  limit?: number;
  offset?: number;
  categories?: string[];
  tags?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

/**
 * র্যাঙ্কিং রেসপন্স
 */
export interface AIRankingResponse<T = unknown> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  scores: Record<string, number>;
  weights: Record<AIRankingFactor, number>;
  mode: AIRankingMode;
  strategy: AIRankingStrategy;
  hasMore: boolean;
  nextOffset?: number;
}

/**
 * র্যাঙ্কিং স্কোর থ্রেশহোল্ড
 */
export const AI_RANKING_SCORE_THRESHOLDS = {
  POOR: 0.2,
  AVERAGE: 0.4,
  GOOD: 0.6,
  EXCELLENT: 0.8,
  OUTSTANDING: 0.9,
} as const;

/**
 * র্যাঙ্কিং স্কোর ক্যাটাগরি
 */
export const AI_RANKING_SCORE_CATEGORIES = {
  POOR: 'poor',
  AVERAGE: 'average',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  OUTSTANDING: 'outstanding',
} as const;

/**
 * AI_RANKING_SCORE_CATEGORIES থেকে টাইপ
 */
export type AIRankingScoreCategory =
  (typeof AI_RANKING_SCORE_CATEGORIES)[keyof typeof AI_RANKING_SCORE_CATEGORIES];

/**
 * র্যাঙ্কিং স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const AI_RANKING_SCORE_CATEGORY_THRESHOLDS: Record<AIRankingScoreCategory, number> = {
  [AI_RANKING_SCORE_CATEGORIES.POOR]: AI_RANKING_SCORE_THRESHOLDS.POOR,
  [AI_RANKING_SCORE_CATEGORIES.AVERAGE]: AI_RANKING_SCORE_THRESHOLDS.AVERAGE,
  [AI_RANKING_SCORE_CATEGORIES.GOOD]: AI_RANKING_SCORE_THRESHOLDS.GOOD,
  [AI_RANKING_SCORE_CATEGORIES.EXCELLENT]: AI_RANKING_SCORE_THRESHOLDS.EXCELLENT,
  [AI_RANKING_SCORE_CATEGORIES.OUTSTANDING]: AI_RANKING_SCORE_THRESHOLDS.OUTSTANDING,
} as const;

/**
 * র্যাঙ্কিং স্কোর ক্যাটাগরি লেবেল
 */
export const AI_RANKING_SCORE_CATEGORY_LABELS: Record<AIRankingScoreCategory, string> = {
  [AI_RANKING_SCORE_CATEGORIES.POOR]: 'Poor',
  [AI_RANKING_SCORE_CATEGORIES.AVERAGE]: 'Average',
  [AI_RANKING_SCORE_CATEGORIES.GOOD]: 'Good',
  [AI_RANKING_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [AI_RANKING_SCORE_CATEGORIES.OUTSTANDING]: 'Outstanding',
} as const;
