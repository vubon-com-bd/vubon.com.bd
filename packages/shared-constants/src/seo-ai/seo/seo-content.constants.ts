/**
 * ন্যূনতম শব্দ সংখ্যা (৩০০)
 */
export const SEO_CONTENT_MIN_WORDS = 300 as const;

/**
 * সর্বোচ্চ শব্দ সংখ্যা (৫০০০)
 */
export const SEO_CONTENT_MAX_WORDS = 5000 as const;

/**
 * আদর্শ শব্দ সংখ্যা (১৫০০)
 */
export const SEO_CONTENT_OPTIMAL_WORDS = 1500 as const;

/**
 * রিডিং লেভেল (৮ম গ্রেড)
 */
export const SEO_CONTENT_READING_LEVEL = 8 as const;

/**
 * কীওয়ার্ড ডেনসিটি রেঞ্জ (১-৩%)
 */
export const SEO_CONTENT_KEYWORD_DENSITY = {
  MIN: 1,
  MAX: 3,
  OPTIMAL: 2,
} as const;

/**
 * SEO কন্টেন্ট টাইপ এনাম
 */
export const SEO_CONTENT_TYPE = {
  BLOG_POST: 'blog-post',
  PRODUCT_DESCRIPTION: 'product-description',
  CATEGORY_DESCRIPTION: 'category-description',
  LANDING_PAGE: 'landing-page',
  ARTICLE: 'article',
  REVIEW: 'review',
  COMPARISON: 'comparison',
  GUIDE: 'guide',
  TUTORIAL: 'tutorial',
  CASE_STUDY: 'case-study',
  WHITE_PAPER: 'white-paper',
  EBOOK: 'ebook',
} as const;

/**
 * SEO_CONTENT_TYPE থেকে টাইপ
 */
export type SEOContentType = (typeof SEO_CONTENT_TYPE)[keyof typeof SEO_CONTENT_TYPE];

/**
 * SEO কন্টেন্ট টাইপ লেবেল
 */
export const SEO_CONTENT_TYPE_LABELS: Record<SEOContentType, string> = {
  [SEO_CONTENT_TYPE.BLOG_POST]: 'Blog Post',
  [SEO_CONTENT_TYPE.PRODUCT_DESCRIPTION]: 'Product Description',
  [SEO_CONTENT_TYPE.CATEGORY_DESCRIPTION]: 'Category Description',
  [SEO_CONTENT_TYPE.LANDING_PAGE]: 'Landing Page',
  [SEO_CONTENT_TYPE.ARTICLE]: 'Article',
  [SEO_CONTENT_TYPE.REVIEW]: 'Review',
  [SEO_CONTENT_TYPE.COMPARISON]: 'Comparison',
  [SEO_CONTENT_TYPE.GUIDE]: 'Guide',
  [SEO_CONTENT_TYPE.TUTORIAL]: 'Tutorial',
  [SEO_CONTENT_TYPE.CASE_STUDY]: 'Case Study',
  [SEO_CONTENT_TYPE.WHITE_PAPER]: 'White Paper',
  [SEO_CONTENT_TYPE.EBOOK]: 'E-book',
} as const;

/**
 * SEO কন্টেন্ট টাইপ বিবরণ
 */
export const SEO_CONTENT_TYPE_DESCRIPTIONS: Record<SEOContentType, string> = {
  [SEO_CONTENT_TYPE.BLOG_POST]: 'Standard blog post with informational content',
  [SEO_CONTENT_TYPE.PRODUCT_DESCRIPTION]: 'Description of a product or service',
  [SEO_CONTENT_TYPE.CATEGORY_DESCRIPTION]: 'Description for a product category page',
  [SEO_CONTENT_TYPE.LANDING_PAGE]: 'Dedicated landing page for marketing campaigns',
  [SEO_CONTENT_TYPE.ARTICLE]: 'In-depth article on a specific topic',
  [SEO_CONTENT_TYPE.REVIEW]: 'Review of a product, service, or experience',
  [SEO_CONTENT_TYPE.COMPARISON]: 'Comparison between multiple products or services',
  [SEO_CONTENT_TYPE.GUIDE]: 'Comprehensive guide on a topic',
  [SEO_CONTENT_TYPE.TUTORIAL]: 'Step-by-step tutorial on how to do something',
  [SEO_CONTENT_TYPE.CASE_STUDY]: 'Case study showing results and outcomes',
  [SEO_CONTENT_TYPE.WHITE_PAPER]: 'Authoritative white paper on a topic',
  [SEO_CONTENT_TYPE.EBOOK]: 'Long-form e-book on a specific subject',
} as const;

/**
 * SEO কন্টেন্ট টাইপ আইকন
 */
export const SEO_CONTENT_TYPE_ICONS: Record<SEOContentType, string> = {
  [SEO_CONTENT_TYPE.BLOG_POST]: '📝',
  [SEO_CONTENT_TYPE.PRODUCT_DESCRIPTION]: '🛍️',
  [SEO_CONTENT_TYPE.CATEGORY_DESCRIPTION]: '📂',
  [SEO_CONTENT_TYPE.LANDING_PAGE]: '🎯',
  [SEO_CONTENT_TYPE.ARTICLE]: '📄',
  [SEO_CONTENT_TYPE.REVIEW]: '⭐',
  [SEO_CONTENT_TYPE.COMPARISON]: '⚖️',
  [SEO_CONTENT_TYPE.GUIDE]: '📖',
  [SEO_CONTENT_TYPE.TUTORIAL]: '🎓',
  [SEO_CONTENT_TYPE.CASE_STUDY]: '📊',
  [SEO_CONTENT_TYPE.WHITE_PAPER]: '📋',
  [SEO_CONTENT_TYPE.EBOOK]: '📚',
} as const;

/**
 * SEO কন্টেন্ট ফরম্যাট এনাম
 */
export const SEO_CONTENT_FORMAT = {
  LONG_FORM: 'long-form',
  SHORT_FORM: 'short-form',
  LISTICLE: 'listicle',
  HOW_TO: 'how-to',
  NEWS: 'news',
  OPINION: 'opinion',
  INTERVIEW: 'interview',
  INFOGRAPHIC: 'infographic',
  VIDEO: 'video',
  PODCAST: 'podcast',
} as const;

/**
 * SEO_CONTENT_FORMAT থেকে টাইপ
 */
export type SEOContentFormat = (typeof SEO_CONTENT_FORMAT)[keyof typeof SEO_CONTENT_FORMAT];

/**
 * SEO কন্টেন্ট ফরম্যাট লেবেল
 */
export const SEO_CONTENT_FORMAT_LABELS: Record<SEOContentFormat, string> = {
  [SEO_CONTENT_FORMAT.LONG_FORM]: 'Long Form',
  [SEO_CONTENT_FORMAT.SHORT_FORM]: 'Short Form',
  [SEO_CONTENT_FORMAT.LISTICLE]: 'Listicle',
  [SEO_CONTENT_FORMAT.HOW_TO]: 'How-To',
  [SEO_CONTENT_FORMAT.NEWS]: 'News',
  [SEO_CONTENT_FORMAT.OPINION]: 'Opinion',
  [SEO_CONTENT_FORMAT.INTERVIEW]: 'Interview',
  [SEO_CONTENT_FORMAT.INFOGRAPHIC]: 'Infographic',
  [SEO_CONTENT_FORMAT.VIDEO]: 'Video',
  [SEO_CONTENT_FORMAT.PODCAST]: 'Podcast',
} as const;

/**
 * SEO কন্টেন্ট কনফিগারেশন
 */
export interface SEOContentConfig {
  type: SEOContentType;
  format: SEOContentFormat;
  minWords: number;
  maxWords: number;
  optimalWords: number;
  readingLevel: number;
  keywordDensity: {
    min: number;
    max: number;
    optimal: number;
  };
  includesImages: boolean;
  includesVideo: boolean;
  includesCTA: boolean;
}

/**
 * SEO কন্টেন্ট ডিফল্ট কনফিগারেশন
 */
export const SEO_CONTENT_DEFAULT_CONFIG: SEOContentConfig = {
  type: SEO_CONTENT_TYPE.BLOG_POST,
  format: SEO_CONTENT_FORMAT.LONG_FORM,
  minWords: SEO_CONTENT_MIN_WORDS,
  maxWords: SEO_CONTENT_MAX_WORDS,
  optimalWords: SEO_CONTENT_OPTIMAL_WORDS,
  readingLevel: SEO_CONTENT_READING_LEVEL,
  keywordDensity: {
    min: SEO_CONTENT_KEYWORD_DENSITY.MIN,
    max: SEO_CONTENT_KEYWORD_DENSITY.MAX,
    optimal: SEO_CONTENT_KEYWORD_DENSITY.OPTIMAL,
  },
  includesImages: true,
  includesVideo: false,
  includesCTA: true,
} as const;

/**
 * SEO কন্টেন্ট স্কোর থ্রেশহোল্ড
 */
export const SEO_CONTENT_SCORE_THRESHOLDS = {
  POOR: 0,
  FAIR: 40,
  GOOD: 60,
  EXCELLENT: 80,
  PERFECT: 90,
} as const;

/**
 * SEO কন্টেন্ট স্কোর ক্যাটাগরি
 */
export const SEO_CONTENT_SCORE_CATEGORIES = {
  POOR: 'poor',
  FAIR: 'fair',
  GOOD: 'good',
  EXCELLENT: 'excellent',
  PERFECT: 'perfect',
} as const;

/**
 * SEO_CONTENT_SCORE_CATEGORIES থেকে টাইপ
 */
export type SEOContentScoreCategory =
  (typeof SEO_CONTENT_SCORE_CATEGORIES)[keyof typeof SEO_CONTENT_SCORE_CATEGORIES];

/**
 * SEO কন্টেন্ট স্কোর ক্যাটাগরি লেবেল
 */
export const SEO_CONTENT_SCORE_CATEGORY_LABELS: Record<SEOContentScoreCategory, string> = {
  [SEO_CONTENT_SCORE_CATEGORIES.POOR]: 'Poor',
  [SEO_CONTENT_SCORE_CATEGORIES.FAIR]: 'Fair',
  [SEO_CONTENT_SCORE_CATEGORIES.GOOD]: 'Good',
  [SEO_CONTENT_SCORE_CATEGORIES.EXCELLENT]: 'Excellent',
  [SEO_CONTENT_SCORE_CATEGORIES.PERFECT]: 'Perfect',
} as const;

/**
 * SEO কন্টেন্ট স্কোর ক্যাটাগরি থ্রেশহোল্ড ম্যাপিং
 */
export const SEO_CONTENT_SCORE_CATEGORY_THRESHOLDS: Record<SEOContentScoreCategory, number> = {
  [SEO_CONTENT_SCORE_CATEGORIES.POOR]: SEO_CONTENT_SCORE_THRESHOLDS.POOR,
  [SEO_CONTENT_SCORE_CATEGORIES.FAIR]: SEO_CONTENT_SCORE_THRESHOLDS.FAIR,
  [SEO_CONTENT_SCORE_CATEGORIES.GOOD]: SEO_CONTENT_SCORE_THRESHOLDS.GOOD,
  [SEO_CONTENT_SCORE_CATEGORIES.EXCELLENT]: SEO_CONTENT_SCORE_THRESHOLDS.EXCELLENT,
  [SEO_CONTENT_SCORE_CATEGORIES.PERFECT]: SEO_CONTENT_SCORE_THRESHOLDS.PERFECT,
} as const;
