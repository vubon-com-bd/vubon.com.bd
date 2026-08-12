/**
 * ডিফল্ট কীওয়ার্ড সংখ্যা
 */
export const SEO_DEFAULT_KEYWORD_LIMIT = 10 as const;

/**
 * কীওয়ার্ডের সর্বোচ্চ দৈর্ঘ্য (৫০ ক্যারেক্টার)
 */
export const SEO_MAX_KEYWORD_LENGTH = 50 as const;

/**
 * মেটা টাইটেলের সর্বোচ্চ দৈর্ঘ্য (৬০ ক্যারেক্টার)
 */
export const SEO_MAX_META_TITLE_LENGTH = 60 as const;

/**
 * মেটা বিবরণের সর্বোচ্চ দৈর্ঘ্য (১৬০ ক্যারেক্টার)
 */
export const SEO_MAX_META_DESCRIPTION_LENGTH = 160 as const;

/**
 * ডিফল্ট ভাষা
 */
export const SEO_DEFAULT_LANGUAGE = 'en' as const;

/**
 * ক্রল ডেল (১ সেকেন্ড)
 */
export const SEO_CRAWL_DELAY = 1000 as const; // 1 second in milliseconds

/**
 * ন্যূনতম স্কোর (০)
 */
export const SEO_SCORE_MIN = 0 as const;

/**
 * সর্বোচ্চ স্কোর (১০০)
 */
export const SEO_SCORE_MAX = 100 as const;

/**
 * ভালো স্কোর থ্রেশহোল্ড (৮০)
 */
export const SEO_SCORE_GOOD = 80 as const;

/**
 * গড় স্কোর থ্রেশহোল্ড (৫০)
 */
export const SEO_SCORE_AVERAGE = 50 as const;

/**
 * SEO সিস্টেমের কনফিগারেশন
 */
export interface SEOConfig {
  defaultKeywordLimit: number;
  maxKeywordLength: number;
  maxMetaTitleLength: number;
  maxMetaDescriptionLength: number;
  defaultLanguage: string;
  crawlDelay: number;
  enableAutoGenerate: boolean;
  enableKeywordSuggestions: boolean;
  enableMetaOptimization: boolean;
}

/**
 * SEO ডিফল্ট কনফিগারেশন
 */
export const SEO_DEFAULT_CONFIG: SEOConfig = {
  defaultKeywordLimit: SEO_DEFAULT_KEYWORD_LIMIT,
  maxKeywordLength: SEO_MAX_KEYWORD_LENGTH,
  maxMetaTitleLength: SEO_MAX_META_TITLE_LENGTH,
  maxMetaDescriptionLength: SEO_MAX_META_DESCRIPTION_LENGTH,
  defaultLanguage: SEO_DEFAULT_LANGUAGE,
  crawlDelay: SEO_CRAWL_DELAY,
  enableAutoGenerate: true,
  enableKeywordSuggestions: true,
  enableMetaOptimization: true,
} as const;

/**
 * SEO মেটা ট্যাগ
 */
export interface SEOMetaTags {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

/**
 * SEO কীওয়ার্ড
 */
export interface SEOKeyword {
  keyword: string;
  score: number;
  volume?: number;
  competition?: number;
  suggestions?: string[];
}

/**
 * SEO পেজ অপটিমাইজেশন
 */
export interface SEOOptimization {
  url: string;
  title: string;
  description: string;
  keywords: SEOKeyword[];
  score: number;
  suggestions: string[];
  issues: string[];
}

/**
 * SEO ক্রল ডেটা
 */
export interface SEOCrawlData {
  url: string;
  statusCode: number;
  responseTime: number;
  title: string;
  description: string;
  keywords: string[];
  headings: string[];
  images: string[];
  links: string[];
  crawledAt: Date;
}

/**
 * SEO পেজিনেশন কনফিগারেশন
 */
export interface SEOPaginationConfig {
  pageSize: number;
  maxPages: number;
  includeNoFollow: boolean;
  includeNoIndex: boolean;
}

/**
 * SEO ডিফল্ট পেজিনেশন কনফিগারেশন
 */
export const SEO_DEFAULT_PAGINATION_CONFIG: SEOPaginationConfig = {
  pageSize: 20,
  maxPages: 100,
  includeNoFollow: false,
  includeNoIndex: false,
} as const;

/**
 * SEO রোবট কনফিগারেশন
 */
export interface SEORobotsConfig {
  userAgent: string;
  allow: string[];
  disallow: string[];
  sitemap?: string;
  crawlDelay?: number;
}

/**
 * SEO ডিফল্ট রোবট কনফিগারেশন
 */
export const SEO_DEFAULT_ROBOTS_CONFIG: SEORobotsConfig = {
  userAgent: '*',
  allow: ['/'],
  disallow: ['/admin', '/private', '/api'],
  crawlDelay: SEO_CRAWL_DELAY,
} as const;

/**
 * SEO সাইটম্যাপ কনফিগারেশন
 */
export interface SEOSitemapConfig {
  url: string;
  lastModified?: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * SEO ডিফল্ট সাইটম্যাপ কনফিগারেশন
 */
export const SEO_DEFAULT_SITEMAP_CONFIG: SEOSitemapConfig = {
  url: '',
  changeFrequency: 'weekly',
  priority: 0.5,
} as const;

/**
 * SEO স্কোর থ্রেশহোল্ড
 */
export const SEO_SCORE_THRESHOLDS = {
  POOR: 0,
  FAIR: 40,
  GOOD: 60,
  EXCELLENT: 80,
  PERFECT: 90,
} as const;

/**
 * SEO স্কোর থ্রেশহোল্ড টাইপ
 */
export type SEOScoreThreshold = (typeof SEO_SCORE_THRESHOLDS)[keyof typeof SEO_SCORE_THRESHOLDS];

/**
 * SEO স্কোর ক্যাটাগরি
 */
export const SEO_SCORE_CATEGORIES = {
  POOR: 'poor',
  FAIR: 'fair',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO স্কোর ক্যাটাগরি টাইপ
 */
export type SEOScoreCategory = (typeof SEO_SCORE_CATEGORIES)[keyof typeof SEO_SCORE_CATEGORIES];

/**
 * SEO স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_SCORE_CATEGORY_LABELS: Record<SEOScoreCategory, string> = {
  [SEO_SCORE_CATEGORIES.POOR]: 'Poor',
  [SEO_SCORE_CATEGORIES.FAIR]: 'Fair',
  [SEO_SCORE_CATEGORIES.GOOD]: 'Good',
  [SEO_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [SEO_SCORE_CATEGORIES.PERFECT]: 'Perfect',
} as const;

/**
 * SEO স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const SEO_SCORE_CATEGORY_THRESHOLDS: Record<SEOScoreCategory, number> = {
  [SEO_SCORE_CATEGORIES.POOR]: SEO_SCORE_THRESHOLDS.POOR,
  [SEO_SCORE_CATEGORIES.FAIR]: SEO_SCORE_THRESHOLDS.FAIR,
  [SEO_SCORE_CATEGORIES.GOOD]: SEO_SCORE_THRESHOLDS.GOOD,
  [SEO_SCORE_CATEGORIES.EXCELLENT]: SEO_SCORE_THRESHOLDS.EXCELLENT,
  [SEO_SCORE_CATEGORIES.PERFECT]: SEO_SCORE_THRESHOLDS.PERFECT,
} as const;
