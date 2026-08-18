/**
 * নলেজ বেস সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * নলেজ বেস আইডি প্রিফিক্স
 */
export const KNOWLEDGE_BASE_ID_PREFIX = 'KB';

/**
 * নলেজ বেস নম্বর ফরম্যাট
 */
export const KNOWLEDGE_BASE_NUMBER_FORMAT = 'KB-{category}-{sequence}';

/**
 * ডিফল্ট ল্যাঙ্গুয়েজ
 */
export const KNOWLEDGE_BASE_DEFAULT_LANGUAGE = 'bn';

/**
 * কন্টেন্ট ফরম্যাট
 */
export const KNOWLEDGE_BASE_CONTENT_FORMATS = {
  MARKDOWN: 'markdown',
  HTML: 'html',
  PLAIN: 'plain',
  RICH_TEXT: 'rich_text',
} as const;

/**
 * সার্চ টাইপ
 */
export const KNOWLEDGE_BASE_SEARCH_TYPES = {
  FULL_TEXT: 'full_text',
  TITLE_ONLY: 'title_only',
  TAGS: 'tags',
  CATEGORY: 'category',
  SEMANTIC: 'semantic',
  HYBRID: 'hybrid',
} as const;

/**
 * আর্টিকেল পার পেজ (ডিফল্ট)
 */
export const KNOWLEDGE_BASE_ARTICLES_PER_PAGE = 20;

/**
 * আর্টিকেল রেটিং থ্রেশহোল্ড (%)
 */
export const KNOWLEDGE_BASE_ARTICLE_RATING_THRESHOLD = 60;

/**
 * নলেজ বেস আর্টিকেল স্ট্যাটাস
 */
export const KNOWLEDGE_BASE_ARTICLE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  PENDING_REVIEW: 'pending_review',
  REJECTED: 'rejected',
  NEEDS_UPDATE: 'needs_update',
  DEPRECATED: 'deprecated',
} as const;

/**
 * নলেজ বেস আর্টিকেল টাইপ
 */
export const KNOWLEDGE_BASE_ARTICLE_TYPES = {
  TUTORIAL: 'tutorial',
  HOW_TO: 'how_to',
  REFERENCE: 'reference',
  FAQ: 'faq',
  TROUBLESHOOTING: 'troubleshooting',
  CONCEPT: 'concept',
  GLOSSARY: 'glossary',
  RELEASE_NOTES: 'release_notes',
  BEST_PRACTICE: 'best_practice',
  SECURITY: 'security',
} as const;

/**
 * নলেজ বেস ক্যাটাগরি
 */
export const KNOWLEDGE_BASE_CATEGORIES = {
  GETTING_STARTED: 'getting_started',
  ACCOUNT: 'account',
  BILLING: 'billing',
  TECHNICAL: 'technical',
  PRODUCT: 'product',
  SERVICE: 'service',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  INTEGRATION: 'integration',
  API: 'api',
  TROUBLESHOOTING: 'troubleshooting',
  FEATURES: 'features',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  GENERAL: 'general',
} as const;

/**
 * নলেজ বেস ক্যাটাগরির ডিসপ্লে নাম
 */
export const KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES = {
  [KNOWLEDGE_BASE_CATEGORIES.GETTING_STARTED]: 'শুরু করা',
  [KNOWLEDGE_BASE_CATEGORIES.ACCOUNT]: 'অ্যাকাউন্ট',
  [KNOWLEDGE_BASE_CATEGORIES.BILLING]: 'বিলিং',
  [KNOWLEDGE_BASE_CATEGORIES.TECHNICAL]: 'প্রযুক্তিগত',
  [KNOWLEDGE_BASE_CATEGORIES.PRODUCT]: 'পণ্য',
  [KNOWLEDGE_BASE_CATEGORIES.SERVICE]: 'সার্ভিস',
  [KNOWLEDGE_BASE_CATEGORIES.SECURITY]: 'সিকিউরিটি',
  [KNOWLEDGE_BASE_CATEGORIES.PRIVACY]: 'প্রাইভেসি',
  [KNOWLEDGE_BASE_CATEGORIES.INTEGRATION]: 'ইন্টিগ্রেশন',
  [KNOWLEDGE_BASE_CATEGORIES.API]: 'এপিআই',
  [KNOWLEDGE_BASE_CATEGORIES.TROUBLESHOOTING]: 'ট্রাবলশুটিং',
  [KNOWLEDGE_BASE_CATEGORIES.FEATURES]: 'ফিচারসমূহ',
  [KNOWLEDGE_BASE_CATEGORIES.MOBILE]: 'মোবাইল',
  [KNOWLEDGE_BASE_CATEGORIES.DESKTOP]: 'ডেস্কটপ',
  [KNOWLEDGE_BASE_CATEGORIES.GENERAL]: 'সাধারণ',
} as const;

/**
 * নলেজ বেস সার্চ অপশন
 */
export const KNOWLEDGE_BASE_SEARCH_OPTIONS = {
  CASE_SENSITIVE: 'case_sensitive',
  FUZZY: 'fuzzy',
  EXACT: 'exact',
  BOOLEAN: 'boolean',
} as const;

/**
 * নলেজ বেস সর্ট অপশন
 */
export const KNOWLEDGE_BASE_SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  DATE: 'date',
  TITLE: 'title',
  VIEWS: 'views',
  RATING: 'rating',
  POPULARITY: 'popularity',
} as const;

/**
 * নলেজ বেস ডিফল্ট সেটিংস
 */
export const KNOWLEDGE_BASE_DEFAULT_SETTINGS = {
  defaultLanguage: KNOWLEDGE_BASE_DEFAULT_LANGUAGE,
  defaultContentFormat: KNOWLEDGE_BASE_CONTENT_FORMATS.MARKDOWN,
  articlesPerPage: KNOWLEDGE_BASE_ARTICLES_PER_PAGE,
  ratingThreshold: KNOWLEDGE_BASE_ARTICLE_RATING_THRESHOLD,
  searchType: KNOWLEDGE_BASE_SEARCH_TYPES.HYBRID,
  searchOptions: KNOWLEDGE_BASE_SEARCH_OPTIONS,
  enableComments: true,
  enableRatings: true,
  enableVersioning: true,
  autoSaveInterval: 30,
} as const;

/**
 * নলেজ বেস ভ্যালিডেশন রুলস
 */
export const KNOWLEDGE_BASE_VALIDATION_RULES = {
  title: {
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  content: {
    minLength: 50,
    maxLength: 100000,
    required: true,
  },
  summary: {
    minLength: 0,
    maxLength: 500,
    required: false,
  },
  tags: {
    maxTags: 15,
    minTagLength: 2,
    maxTagLength: 30,
  },
} as const;

/**
 * নলেজ বেস ইভেন্ট টাইপ
 */
export const KNOWLEDGE_BASE_EVENT_TYPES = {
  ARTICLE_CREATED: 'article_created',
  ARTICLE_UPDATED: 'article_updated',
  ARTICLE_PUBLISHED: 'article_published',
  ARTICLE_ARCHIVED: 'article_archived',
  ARTICLE_VIEWED: 'article_viewed',
  ARTICLE_RATED: 'article_rated',
  ARTICLE_COMMENTED: 'article_commented',
  ARTICLE_SEARCHED: 'article_searched',
  ARTICLE_VERSIONED: 'article_versioned',
  ARTICLE_RESTORED: 'article_restored',
} as const;

/**
 * নলেজ বেস মেট্রিক্স
 */
export const KNOWLEDGE_BASE_METRICS = {
  TOTAL_ARTICLES: 'total_articles',
  PUBLISHED_ARTICLES: 'published_articles',
  DRAFT_ARTICLES: 'draft_articles',
  TOTAL_VIEWS: 'total_views',
  TOTAL_SEARCHES: 'total_searches',
  AVERAGE_RATING: 'average_rating',
  HELPFUL_RATE: 'helpful_rate',
  POPULAR_ARTICLES: 'popular_articles',
  RECENT_ARTICLES: 'recent_articles',
  CATEGORY_COUNT: 'category_count',
} as const;

export type KnowledgeBaseIdPrefix = typeof KNOWLEDGE_BASE_ID_PREFIX;
export type KnowledgeBaseContentFormat =
  (typeof KNOWLEDGE_BASE_CONTENT_FORMATS)[keyof typeof KNOWLEDGE_BASE_CONTENT_FORMATS];
export type KnowledgeBaseSearchType =
  (typeof KNOWLEDGE_BASE_SEARCH_TYPES)[keyof typeof KNOWLEDGE_BASE_SEARCH_TYPES];
export type KnowledgeBaseArticleStatus =
  (typeof KNOWLEDGE_BASE_ARTICLE_STATUS)[keyof typeof KNOWLEDGE_BASE_ARTICLE_STATUS];
export type KnowledgeBaseArticleType =
  (typeof KNOWLEDGE_BASE_ARTICLE_TYPES)[keyof typeof KNOWLEDGE_BASE_ARTICLE_TYPES];
export type KnowledgeBaseCategory =
  (typeof KNOWLEDGE_BASE_CATEGORIES)[keyof typeof KNOWLEDGE_BASE_CATEGORIES];
export type KnowledgeBaseSearchOption =
  (typeof KNOWLEDGE_BASE_SEARCH_OPTIONS)[keyof typeof KNOWLEDGE_BASE_SEARCH_OPTIONS];
export type KnowledgeBaseSortOption =
  (typeof KNOWLEDGE_BASE_SORT_OPTIONS)[keyof typeof KNOWLEDGE_BASE_SORT_OPTIONS];
export type KnowledgeBaseEventType =
  (typeof KNOWLEDGE_BASE_EVENT_TYPES)[keyof typeof KNOWLEDGE_BASE_EVENT_TYPES];
export type KnowledgeBaseMetric =
  (typeof KNOWLEDGE_BASE_METRICS)[keyof typeof KNOWLEDGE_BASE_METRICS];

export interface KnowledgeBaseDefaultSettings {
  defaultLanguage: string;
  defaultContentFormat: KnowledgeBaseContentFormat;
  articlesPerPage: number;
  ratingThreshold: number;
  searchType: KnowledgeBaseSearchType;
  searchOptions: typeof KNOWLEDGE_BASE_SEARCH_OPTIONS;
  enableComments: boolean;
  enableRatings: boolean;
  enableVersioning: boolean;
  autoSaveInterval: number;
}

export interface KnowledgeBaseValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  content: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  summary: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  tags: {
    maxTags: number;
    minTagLength: number;
    maxTagLength: number;
  };
}

export interface KnowledgeBaseArticleMetadata {
  id: string;
  title: string;
  content: string;
  summary?: string;
  category: KnowledgeBaseCategory;
  type: KnowledgeBaseArticleType;
  status: KnowledgeBaseArticleStatus;
  language: string;
  tags: string[];
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  rating: number;
  version: number;
  publishedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeBaseSearchOptions {
  query: string;
  searchType?: KnowledgeBaseSearchType;
  category?: KnowledgeBaseCategory;
  type?: KnowledgeBaseArticleType;
  status?: KnowledgeBaseArticleStatus;
  language?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  sortBy?: KnowledgeBaseSortOption;
  sortOrder?: 'asc' | 'desc';
}

export interface KnowledgeBaseRating {
  id: string;
  articleId: string;
  helpful: boolean;
  userId?: string;
  sessionId: string;
  feedback?: string;
  createdAt: Date;
}

export interface KnowledgeBaseComment {
  id: string;
  articleId: string;
  content: string;
  userId?: string;
  sessionId: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeBaseVersion {
  id: string;
  articleId: string;
  version: number;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  changes: string;
}

export interface KnowledgeBaseAnalytics {
  articleId: string;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  rating: number;
  searchImpressions: number;
  commentCount: number;
  averageTimeOnPage?: number;
  bounceRate?: number;
  period: string;
}

/**
 * নলেজ বেস ক্যাটাগরি কনফিগারেশন
 */
export const KNOWLEDGE_BASE_CATEGORY_CONFIGS: Record<
  KnowledgeBaseCategory,
  {
    category: KnowledgeBaseCategory;
    displayName: string;
    icon: string;
    color: string;
    order: number;
  }
> = {
  [KNOWLEDGE_BASE_CATEGORIES.GETTING_STARTED]: {
    category: KNOWLEDGE_BASE_CATEGORIES.GETTING_STARTED,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.GETTING_STARTED],
    icon: 'rocket',
    color: '#3498db',
    order: 1,
  },
  [KNOWLEDGE_BASE_CATEGORIES.ACCOUNT]: {
    category: KNOWLEDGE_BASE_CATEGORIES.ACCOUNT,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.ACCOUNT],
    icon: 'user',
    color: '#9b59b6',
    order: 2,
  },
  [KNOWLEDGE_BASE_CATEGORIES.BILLING]: {
    category: KNOWLEDGE_BASE_CATEGORIES.BILLING,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.BILLING],
    icon: 'credit-card',
    color: '#2ecc71',
    order: 3,
  },
  [KNOWLEDGE_BASE_CATEGORIES.TECHNICAL]: {
    category: KNOWLEDGE_BASE_CATEGORIES.TECHNICAL,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.TECHNICAL],
    icon: 'cpu',
    color: '#e74c3c',
    order: 4,
  },
  [KNOWLEDGE_BASE_CATEGORIES.PRODUCT]: {
    category: KNOWLEDGE_BASE_CATEGORIES.PRODUCT,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.PRODUCT],
    icon: 'package',
    color: '#e67e22',
    order: 5,
  },
  [KNOWLEDGE_BASE_CATEGORIES.SERVICE]: {
    category: KNOWLEDGE_BASE_CATEGORIES.SERVICE,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.SERVICE],
    icon: 'briefcase',
    color: '#1abc9c',
    order: 6,
  },
  [KNOWLEDGE_BASE_CATEGORIES.SECURITY]: {
    category: KNOWLEDGE_BASE_CATEGORIES.SECURITY,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.SECURITY],
    icon: 'lock',
    color: '#c0392b',
    order: 7,
  },
  [KNOWLEDGE_BASE_CATEGORIES.PRIVACY]: {
    category: KNOWLEDGE_BASE_CATEGORIES.PRIVACY,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.PRIVACY],
    icon: 'eye-off',
    color: '#7f8c8d',
    order: 8,
  },
  [KNOWLEDGE_BASE_CATEGORIES.INTEGRATION]: {
    category: KNOWLEDGE_BASE_CATEGORIES.INTEGRATION,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.INTEGRATION],
    icon: 'link',
    color: '#16a085',
    order: 9,
  },
  [KNOWLEDGE_BASE_CATEGORIES.API]: {
    category: KNOWLEDGE_BASE_CATEGORIES.API,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.API],
    icon: 'code',
    color: '#2980b9',
    order: 10,
  },
  [KNOWLEDGE_BASE_CATEGORIES.TROUBLESHOOTING]: {
    category: KNOWLEDGE_BASE_CATEGORIES.TROUBLESHOOTING,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.TROUBLESHOOTING],
    icon: 'wrench',
    color: '#e67e22',
    order: 11,
  },
  [KNOWLEDGE_BASE_CATEGORIES.FEATURES]: {
    category: KNOWLEDGE_BASE_CATEGORIES.FEATURES,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.FEATURES],
    icon: 'star',
    color: '#f1c40f',
    order: 12,
  },
  [KNOWLEDGE_BASE_CATEGORIES.MOBILE]: {
    category: KNOWLEDGE_BASE_CATEGORIES.MOBILE,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.MOBILE],
    icon: 'smartphone',
    color: '#d35400',
    order: 13,
  },
  [KNOWLEDGE_BASE_CATEGORIES.DESKTOP]: {
    category: KNOWLEDGE_BASE_CATEGORIES.DESKTOP,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.DESKTOP],
    icon: 'monitor',
    color: '#34495e',
    order: 14,
  },
  [KNOWLEDGE_BASE_CATEGORIES.GENERAL]: {
    category: KNOWLEDGE_BASE_CATEGORIES.GENERAL,
    displayName: KNOWLEDGE_BASE_CATEGORY_DISPLAY_NAMES[KNOWLEDGE_BASE_CATEGORIES.GENERAL],
    icon: 'help-circle',
    color: '#95a5a6',
    order: 15,
  },
};

/**
 * নলেজ বেস কনফিগারেশন
 */
export const KNOWLEDGE_BASE_CONFIG = {
  idPrefix: KNOWLEDGE_BASE_ID_PREFIX,
  numberFormat: KNOWLEDGE_BASE_NUMBER_FORMAT,
  defaultSettings: KNOWLEDGE_BASE_DEFAULT_SETTINGS,
  validationRules: KNOWLEDGE_BASE_VALIDATION_RULES,
  contentFormats: KNOWLEDGE_BASE_CONTENT_FORMATS,
  searchTypes: KNOWLEDGE_BASE_SEARCH_TYPES,
  articleStatus: KNOWLEDGE_BASE_ARTICLE_STATUS,
  articleTypes: KNOWLEDGE_BASE_ARTICLE_TYPES,
  categories: KNOWLEDGE_BASE_CATEGORIES,
} as const;
