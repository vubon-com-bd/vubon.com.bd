/**
 * সর্বোচ্চ সাজেশন সংখ্যা (১০)
 */
export const SEO_CONTENT_OPTIMIZATION_MAX_SUGGESTIONS = 10 as const;

/**
 * ন্যূনতম অপটিমাইজেশন স্কোর (০.৫)
 */
export const SEO_CONTENT_OPTIMIZATION_MIN_SCORE = 0.5 as const;

/**
 * ডিফল্ট প্রায়োরিটি
 */
export const SEO_CONTENT_OPTIMIZATION_DEFAULT_PRIORITY = 'medium' as const;

/**
 * কন্টেন্ট অপটিমাইজেশন টাইপ এনাম
 */
export const SEO_CONTENT_OPTIMIZATION_TYPE = {
  KEYWORD_INSERTION: 'keyword-insertion',
  KEYWORD_REPLACEMENT: 'keyword-replacement',
  META_TITLE: 'meta-title',
  META_DESCRIPTION: 'meta-description',
  HEADING_OPTIMIZATION: 'heading-optimization',
  CONTENT_LENGTH: 'content-length',
  READABILITY: 'readability',
  INTERNAL_LINKS: 'internal-links',
  EXTERNAL_LINKS: 'external-links',
  IMAGE_OPTIMIZATION: 'image-optimization',
  URL_OPTIMIZATION: 'url-optimization',
  STRUCTURED_DATA: 'structured-data',
} as const;

/**
 * SEO_CONTENT_OPTIMIZATION_TYPE থেকে টাইপ
 */
export type SEOContentOptimizationType =
  (typeof SEO_CONTENT_OPTIMIZATION_TYPE)[keyof typeof SEO_CONTENT_OPTIMIZATION_TYPE];

/**
 * কন্টেন্ট অপটিমাইজেশন টাইপ লেবেল
 */
export const SEO_CONTENT_OPTIMIZATION_TYPE_LABELS: Record<SEOContentOptimizationType, string> = {
  [SEO_CONTENT_OPTIMIZATION_TYPE.KEYWORD_INSERTION]: 'Keyword Insertion',
  [SEO_CONTENT_OPTIMIZATION_TYPE.KEYWORD_REPLACEMENT]: 'Keyword Replacement',
  [SEO_CONTENT_OPTIMIZATION_TYPE.META_TITLE]: 'Meta Title',
  [SEO_CONTENT_OPTIMIZATION_TYPE.META_DESCRIPTION]: 'Meta Description',
  [SEO_CONTENT_OPTIMIZATION_TYPE.HEADING_OPTIMIZATION]: 'Heading Optimization',
  [SEO_CONTENT_OPTIMIZATION_TYPE.CONTENT_LENGTH]: 'Content Length',
  [SEO_CONTENT_OPTIMIZATION_TYPE.READABILITY]: 'Readability',
  [SEO_CONTENT_OPTIMIZATION_TYPE.INTERNAL_LINKS]: 'Internal Links',
  [SEO_CONTENT_OPTIMIZATION_TYPE.EXTERNAL_LINKS]: 'External Links',
  [SEO_CONTENT_OPTIMIZATION_TYPE.IMAGE_OPTIMIZATION]: 'Image Optimization',
  [SEO_CONTENT_OPTIMIZATION_TYPE.URL_OPTIMIZATION]: 'URL Optimization',
  [SEO_CONTENT_OPTIMIZATION_TYPE.STRUCTURED_DATA]: 'Structured Data',
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন টাইপ আইকন
 */
export const SEO_CONTENT_OPTIMIZATION_TYPE_ICONS: Record<SEOContentOptimizationType, string> = {
  [SEO_CONTENT_OPTIMIZATION_TYPE.KEYWORD_INSERTION]: '🔑',
  [SEO_CONTENT_OPTIMIZATION_TYPE.KEYWORD_REPLACEMENT]: '🔄',
  [SEO_CONTENT_OPTIMIZATION_TYPE.META_TITLE]: '📋',
  [SEO_CONTENT_OPTIMIZATION_TYPE.META_DESCRIPTION]: '📝',
  [SEO_CONTENT_OPTIMIZATION_TYPE.HEADING_OPTIMIZATION]: '📊',
  [SEO_CONTENT_OPTIMIZATION_TYPE.CONTENT_LENGTH]: '📏',
  [SEO_CONTENT_OPTIMIZATION_TYPE.READABILITY]: '📖',
  [SEO_CONTENT_OPTIMIZATION_TYPE.INTERNAL_LINKS]: '🔗',
  [SEO_CONTENT_OPTIMIZATION_TYPE.EXTERNAL_LINKS]: '🌐',
  [SEO_CONTENT_OPTIMIZATION_TYPE.IMAGE_OPTIMIZATION]: '🖼️',
  [SEO_CONTENT_OPTIMIZATION_TYPE.URL_OPTIMIZATION]: '🔗',
  [SEO_CONTENT_OPTIMIZATION_TYPE.STRUCTURED_DATA]: '📊',
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন প্রায়োরিটি এনাম
 */
export const SEO_CONTENT_OPTIMIZATION_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * SEO_CONTENT_OPTIMIZATION_PRIORITY থেকে টাইপ
 */
export type SEOContentOptimizationPriority =
  (typeof SEO_CONTENT_OPTIMIZATION_PRIORITY)[keyof typeof SEO_CONTENT_OPTIMIZATION_PRIORITY];

/**
 * কন্টেন্ট অপটিমাইজেশন প্রায়োরিটি লেবেল
 */
export const SEO_CONTENT_OPTIMIZATION_PRIORITY_LABELS: Record<
  SEOContentOptimizationPriority,
  string
> = {
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.LOW]: 'Low',
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.MEDIUM]: 'Medium',
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.HIGH]: 'High',
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.CRITICAL]: 'Critical',
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন প্রায়োরিটি কালার
 */
export const SEO_CONTENT_OPTIMIZATION_PRIORITY_COLORS: Record<
  SEOContentOptimizationPriority,
  string
> = {
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.LOW]: '#22c55e', // Green-500
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.MEDIUM]: '#f59e0b', // Amber-500
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.HIGH]: '#f97316', // Orange-500
  [SEO_CONTENT_OPTIMIZATION_PRIORITY.CRITICAL]: '#dc2626', // Red-600
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন স্কোর ক্যাটাগরি
 */
export const SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES = {
  POOR: 'poor',
  FAIR: 'fair',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES থেকে টাইপ
 */
export type SEOContentOptimizationScoreCategory =
  (typeof SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES)[keyof typeof SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES];

/**
 * কন্টেন্ট অপটিমাইজেশন স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORY_LABELS: Record<
  SEOContentOptimizationScoreCategory,
  string
> = {
  [SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES.POOR]: 'Poor',
  [SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES.FAIR]: 'Fair',
  [SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES.GOOD]: 'Good',
  [SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [SEO_CONTENT_OPTIMIZATION_SCORE_CATEGORIES.PERFECT]: 'Perfect',
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন স্কোর থ্রেশহোল্ড
 */
export const SEO_CONTENT_OPTIMIZATION_SCORE_THRESHOLDS = {
  POOR: 0.0,
  FAIR: 0.3,
  GOOD: 0.5,
  EXCELLENT: 0.7,
  PERFECT: 0.9,
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন কনফিগারেশন
 */
export interface SEOContentOptimizationConfig {
  maxSuggestions: number;
  minScore: number;
  defaultPriority: SEOContentOptimizationPriority;
  enableAutoOptimize: boolean;
  enableBatchOptimize: boolean;
  enableSuggestionFeedback: boolean;
}

/**
 * কন্টেন্ট অপটিমাইজেশন ডিফল্ট কনফিগারেশন
 */
export const SEO_CONTENT_OPTIMIZATION_DEFAULT_CONFIG: SEOContentOptimizationConfig = {
  maxSuggestions: SEO_CONTENT_OPTIMIZATION_MAX_SUGGESTIONS,
  minScore: SEO_CONTENT_OPTIMIZATION_MIN_SCORE,
  defaultPriority: SEO_CONTENT_OPTIMIZATION_DEFAULT_PRIORITY as SEOContentOptimizationPriority,
  enableAutoOptimize: false,
  enableBatchOptimize: true,
  enableSuggestionFeedback: true,
} as const;

/**
 * কন্টেন্ট অপটিমাইজেশন সাজেশন
 */
export interface SEOContentOptimizationSuggestion {
  id: string;
  type: SEOContentOptimizationType;
  title: string;
  description: string;
  priority: SEOContentOptimizationPriority;
  currentValue?: string;
  suggestedValue?: string;
  impact: number;
  score: number;
  implemented: boolean;
}

/**
 * কন্টেন্ট অপটিমাইজেশন রেজাল্ট
 */
export interface SEOContentOptimizationResult {
  contentId: string;
  score: number;
  suggestions: SEOContentOptimizationSuggestion[];
  implementedCount: number;
  totalCount: number;
  optimizedAt: Date;
}

/**
 * কন্টেন্ট অপটিমাইজেশন ফিল্টার
 */
export interface SEOContentOptimizationFilter {
  type?: SEOContentOptimizationType;
  priority?: SEOContentOptimizationPriority;
  minScore?: number;
  maxScore?: number;
  implemented?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
