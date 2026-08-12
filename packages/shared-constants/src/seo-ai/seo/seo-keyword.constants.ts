/**
 * কীওয়ার্ডের সর্বোচ্চ দৈর্ঘ্য (৫০ ক্যারেক্টার)
 */
export const SEO_KEYWORD_MAX_LENGTH = 50 as const;

/**
 * ন্যূনতম সার্চ ভলিউম (১০০)
 */
export const SEO_KEYWORD_MIN_VOLUME = 100 as const;

/**
 * সর্বোচ্চ কম্পিটিশন (১.০)
 */
export const SEO_KEYWORD_MAX_COMPETITION = 1.0 as const;

/**
 * ডিফল্ট ডিফিকাল্টি (০.৫)
 */
export const SEO_KEYWORD_DEFAULT_DIFFICULTY = 0.5 as const;

/**
 * SEO কীওয়ার্ড ডিফিকাল্টি লেভেল
 */
export const SEO_KEYWORD_DIFFICULTY = {
  VERY_EASY: 'very-easy',
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'very-hard',
} as const;

/**
 * SEO_KEYWORD_DIFFICULTY থেকে টাইপ
 */
export type SEOKeywordDifficulty =
  (typeof SEO_KEYWORD_DIFFICULTY)[keyof typeof SEO_KEYWORD_DIFFICULTY];

/**
 * SEO কীওয়ার্ড ডিফিকাল্টি লেবেল
 */
export const SEO_KEYWORD_DIFFICULTY_LABELS: Record<SEOKeywordDifficulty, string> = {
  [SEO_KEYWORD_DIFFICULTY.VERY_EASY]: 'Very Easy',
  [SEO_KEYWORD_DIFFICULTY.EASY]: 'Easy',
  [SEO_KEYWORD_DIFFICULTY.MEDIUM]: 'Medium',
  [SEO_KEYWORD_DIFFICULTY.HARD]: 'Hard',
  [SEO_KEYWORD_DIFFICULTY.VERY_HARD]: 'Very Hard',
} as const;

/**
 * SEO কীওয়ার্ড ডিফিকাল্টি থ্রেশহোল্ড
 */
export const SEO_KEYWORD_DIFFICULTY_THRESHOLDS: Record<SEOKeywordDifficulty, number> = {
  [SEO_KEYWORD_DIFFICULTY.VERY_EASY]: 0.0,
  [SEO_KEYWORD_DIFFICULTY.EASY]: 0.2,
  [SEO_KEYWORD_DIFFICULTY.MEDIUM]: 0.4,
  [SEO_KEYWORD_DIFFICULTY.HARD]: 0.6,
  [SEO_KEYWORD_DIFFICULTY.VERY_HARD]: 0.8,
} as const;

/**
 * SEO কীওয়ার্ড কম্পিটিশন লেভেল
 */
export const SEO_KEYWORD_COMPETITION = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

/**
 * SEO_KEYWORD_COMPETITION থেকে টাইপ
 */
export type SEOKeywordCompetition =
  (typeof SEO_KEYWORD_COMPETITION)[keyof typeof SEO_KEYWORD_COMPETITION];

/**
 * SEO কীওয়ার্ড কম্পিটিশন লেবেল
 */
export const SEO_KEYWORD_COMPETITION_LABELS: Record<SEOKeywordCompetition, string> = {
  [SEO_KEYWORD_COMPETITION.LOW]: 'Low',
  [SEO_KEYWORD_COMPETITION.MEDIUM]: 'Medium',
  [SEO_KEYWORD_COMPETITION.HIGH]: 'High',
} as const;

/**
 * SEO কীওয়ার্ড কম্পিটিশন থ্রেশহোল্ড
 */
export const SEO_KEYWORD_COMPETITION_THRESHOLDS: Record<SEOKeywordCompetition, number> = {
  [SEO_KEYWORD_COMPETITION.LOW]: 0.0,
  [SEO_KEYWORD_COMPETITION.MEDIUM]: 0.3,
  [SEO_KEYWORD_COMPETITION.HIGH]: 0.6,
} as const;

/**
 * SEO কীওয়ার্ড ভলিউম ক্যাটাগরি
 */
export const SEO_KEYWORD_VOLUME = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  VERY_HIGH: 'very-high',
} as const;

/**
 * SEO_KEYWORD_VOLUME থেকে টাইপ
 */
export type SEOKeywordVolume = (typeof SEO_KEYWORD_VOLUME)[keyof typeof SEO_KEYWORD_VOLUME];

/**
 * SEO কীওয়ার্ড ভলিউম লেবেল
 */
export const SEO_KEYWORD_VOLUME_LABELS: Record<SEOKeywordVolume, string> = {
  [SEO_KEYWORD_VOLUME.LOW]: 'Low',
  [SEO_KEYWORD_VOLUME.MEDIUM]: 'Medium',
  [SEO_KEYWORD_VOLUME.HIGH]: 'High',
  [SEO_KEYWORD_VOLUME.VERY_HIGH]: 'Very High',
} as const;

/**
 * SEO কীওয়ার্ড ভলিউম থ্রেশহোল্ড
 */
export const SEO_KEYWORD_VOLUME_THRESHOLDS: Record<SEOKeywordVolume, number> = {
  [SEO_KEYWORD_VOLUME.LOW]: 0,
  [SEO_KEYWORD_VOLUME.MEDIUM]: 100,
  [SEO_KEYWORD_VOLUME.HIGH]: 1000,
  [SEO_KEYWORD_VOLUME.VERY_HIGH]: 10000,
} as const;

/**
 * SEO কীওয়ার্ড ক্যাটাগরি
 */
export const SEO_KEYWORD_CATEGORY = {
  SHORT_TAIL: 'short-tail',
  MID_TAIL: 'mid-tail',
  LONG_TAIL: 'long-tail',
} as const;

/**
 * SEO_KEYWORD_CATEGORY থেকে টাইপ
 */
export type SEOKeywordCategory = (typeof SEO_KEYWORD_CATEGORY)[keyof typeof SEO_KEYWORD_CATEGORY];

/**
 * SEO কীওয়ার্ড ক্যাটাগরি লেবেল
 */
export const SEO_KEYWORD_CATEGORY_LABELS: Record<SEOKeywordCategory, string> = {
  [SEO_KEYWORD_CATEGORY.SHORT_TAIL]: 'Short Tail',
  [SEO_KEYWORD_CATEGORY.MID_TAIL]: 'Mid Tail',
  [SEO_KEYWORD_CATEGORY.LONG_TAIL]: 'Long Tail',
} as const;

/**
 * SEO কীওয়ার্ড ক্যাটাগরি ওয়ার্ড কাউন্ট
 */
export const SEO_KEYWORD_CATEGORY_WORD_COUNT: Record<SEOKeywordCategory, number> = {
  [SEO_KEYWORD_CATEGORY.SHORT_TAIL]: 2,
  [SEO_KEYWORD_CATEGORY.MID_TAIL]: 3,
  [SEO_KEYWORD_CATEGORY.LONG_TAIL]: 4,
} as const;

/**
 * SEO কীওয়ার্ড কনফিগারেশন
 */
export interface SEOKeywordConfig {
  maxLength: number;
  minVolume: number;
  maxCompetition: number;
  defaultDifficulty: number;
}

/**
 * SEO কীওয়ার্ড ডিফল্ট কনফিগারেশন
 */
export const SEO_KEYWORD_DEFAULT_CONFIG: SEOKeywordConfig = {
  maxLength: SEO_KEYWORD_MAX_LENGTH,
  minVolume: SEO_KEYWORD_MIN_VOLUME,
  maxCompetition: SEO_KEYWORD_MAX_COMPETITION,
  defaultDifficulty: SEO_KEYWORD_DEFAULT_DIFFICULTY,
} as const;

/**
 * SEO কীওয়ার্ড ডেটা
 */
export interface SEOKeywordData {
  keyword: string;
  volume: number;
  difficulty: number;
  competition: number;
  category: SEOKeywordCategory;
  suggested: boolean;
  score?: number;
}

/**
 * SEO কীওয়ার্ড রিসার্চ রেজাল্ট
 */
export interface SEOKeywordResearchResult {
  keywords: SEOKeywordData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

/**
 * SEO কীওয়ার্ড ফিল্টার
 */
export interface SEOKeywordFilter {
  search?: string;
  category?: SEOKeywordCategory;
  minVolume?: number;
  maxVolume?: number;
  minDifficulty?: number;
  maxDifficulty?: number;
  minCompetition?: number;
  maxCompetition?: number;
  suggested?: boolean;
  page?: number;
  limit?: number;
}

/**
 * SEO কীওয়ার্ড স্কোর থ্রেশহোল্ড
 */
export const SEO_KEYWORD_SCORE_THRESHOLDS = {
  POOR: 0,
  FAIR: 40,
  GOOD: 60,
  EXCELLENT: 80,
  PERFECT: 90,
} as const;

/**
 * SEO কীওয়ার্ড স্কোর ক্যাটাগরি
 */
export const SEO_KEYWORD_SCORE_CATEGORIES = {
  POOR: 'poor',
  FAIR: 'fair',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO_KEYWORD_SCORE_CATEGORIES থেকে টাইপ
 */
export type SEOKeywordScoreCategory =
  (typeof SEO_KEYWORD_SCORE_CATEGORIES)[keyof typeof SEO_KEYWORD_SCORE_CATEGORIES];

/**
 * SEO কীওয়ার্ড স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_KEYWORD_SCORE_CATEGORY_LABELS: Record<SEOKeywordScoreCategory, string> = {
  [SEO_KEYWORD_SCORE_CATEGORIES.POOR]: 'Poor',
  [SEO_KEYWORD_SCORE_CATEGORIES.FAIR]: 'Fair',
  [SEO_KEYWORD_SCORE_CATEGORIES.GOOD]: 'Good',
  [SEO_KEYWORD_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [SEO_KEYWORD_SCORE_CATEGORIES.PERFECT]: 'Perfect',
} as const;

/**
 * SEO কীওয়ার্ড স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const SEO_KEYWORD_SCORE_CATEGORY_THRESHOLDS: Record<SEOKeywordScoreCategory, number> = {
  [SEO_KEYWORD_SCORE_CATEGORIES.POOR]: SEO_KEYWORD_SCORE_THRESHOLDS.POOR,
  [SEO_KEYWORD_SCORE_CATEGORIES.FAIR]: SEO_KEYWORD_SCORE_THRESHOLDS.FAIR,
  [SEO_KEYWORD_SCORE_CATEGORIES.GOOD]: SEO_KEYWORD_SCORE_THRESHOLDS.GOOD,
  [SEO_KEYWORD_SCORE_CATEGORIES.EXCELLENT]: SEO_KEYWORD_SCORE_THRESHOLDS.EXCELLENT,
  [SEO_KEYWORD_SCORE_CATEGORIES.PERFECT]: SEO_KEYWORD_SCORE_THRESHOLDS.PERFECT,
} as const;
