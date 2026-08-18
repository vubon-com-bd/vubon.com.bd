/**
 * নলেজ বেস আর্টিকেল সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * আর্টিকেল আইডি প্রিফিক্স
 */
export const ARTICLE_ID_PREFIX = 'ART';

/**
 * আর্টিকেল নম্বর ফরম্যাট
 */
export const ARTICLE_NUMBER_FORMAT = 'ART-{category}-{sequence}';

/**
 * আর্টিকেল টাইটেল ম্যাক্স লেন্থ (অক্ষরে)
 */
export const ARTICLE_TITLE_MAX_LENGTH = 200;

/**
 * আর্টিকেল টাইটেল মিন লেন্থ (অক্ষরে)
 */
export const ARTICLE_TITLE_MIN_LENGTH = 5;

/**
 * আর্টিকেল কন্টেন্ট ম্যাক্স লেন্থ (অক্ষরে)
 */
export const ARTICLE_CONTENT_MAX_LENGTH = 100000;

/**
 * আর্টিকেল কন্টেন্ট মিন লেন্থ (অক্ষরে)
 */
export const ARTICLE_CONTENT_MIN_LENGTH = 50;

/**
 * আর্টিকেল সামারি ম্যাক্স লেন্থ (অক্ষরে)
 */
export const ARTICLE_SUMMARY_MAX_LENGTH = 500;

/**
 * আর্টিকেল ভার্সনিং ফরম্যাট
 */
export const ARTICLE_VERSIONING_FORMAT = 'v{version}.{subversion}';

/**
 * ডিফল্ট আর্টিকেল অথর
 */
export const DEFAULT_ARTICLE_AUTHOR = 'system';

/**
 * আর্টিকেল রিভিউ পিরিয়ড (দিনে)
 */
export const ARTICLE_REVIEW_PERIOD = 180;

/**
 * আর্টিকেল আর্কাইভ পিরিয়ড (দিনে)
 */
export const ARTICLE_ARCHIVE_PERIOD = 365;

/**
 * আর্টিকেল স্লাগ ফরম্যাট
 */
export const ARTICLE_SLUG_FORMAT = '{title}-{id}';

/**
 * আর্টিকেল ট্যাগ ম্যাক্স কাউন্ট
 */
export const ARTICLE_TAG_MAX_COUNT = 15;

/**
 * আর্টিকেল ট্যাগ মিন লেন্থ (অক্ষরে)
 */
export const ARTICLE_TAG_MIN_LENGTH = 2;

/**
 * আর্টিকেল ট্যাগ ম্যাক্স লেন্থ (অক্ষরে)
 */
export const ARTICLE_TAG_MAX_LENGTH = 30;

/**
 * আর্টিকেল ভার্সন ম্যাক্স কাউন্ট
 */
export const ARTICLE_VERSION_MAX_COUNT = 50;

/**
 * আর্টিকেল রিলেটেড আর্টিকেল ম্যাক্স কাউন্ট
 */
export const ARTICLE_RELATED_ARTICLES_MAX_COUNT = 10;

/**
 * আর্টিকেল অ্যাটাচমেন্ট ম্যাক্স কাউন্ট
 */
export const ARTICLE_ATTACHMENTS_MAX_COUNT = 20;

/**
 * আর্টিকেল ইমেজ ম্যাক্স সাইজ (এমবি)
 */
export const ARTICLE_IMAGE_MAX_SIZE_MB = 10;

/**
 * আর্টিকেল ফাইল ম্যাক্স সাইজ (এমবি)
 */
export const ARTICLE_FILE_MAX_SIZE_MB = 25;

/**
 * আর্টিকেল ভিউ ট্র্যাকিং পিরিয়ড (দিনে)
 */
export const ARTICLE_VIEW_TRACKING_PERIOD = 90;

/**
 * আর্টিকেল রেটিং ট্র্যাকিং পিরিয়ড (দিনে)
 */
export const ARTICLE_RATING_TRACKING_PERIOD = 90;

/**
 * আর্টিকেল সার্চ রেজাল্ট লিমিট
 */
export const ARTICLE_SEARCH_RESULT_LIMIT = 100;

/**
 * আর্টিকেল পার পেজ (ডিফল্ট)
 */
export const ARTICLE_ITEMS_PER_PAGE = 20;

/**
 * আর্টিকেল ডিফল্ট সেটিংস
 */
export const ARTICLE_DEFAULT_SETTINGS = {
  titleMaxLength: ARTICLE_TITLE_MAX_LENGTH,
  titleMinLength: ARTICLE_TITLE_MIN_LENGTH,
  contentMaxLength: ARTICLE_CONTENT_MAX_LENGTH,
  contentMinLength: ARTICLE_CONTENT_MIN_LENGTH,
  summaryMaxLength: ARTICLE_SUMMARY_MAX_LENGTH,
  defaultAuthor: DEFAULT_ARTICLE_AUTHOR,
  reviewPeriod: ARTICLE_REVIEW_PERIOD,
  archivePeriod: ARTICLE_ARCHIVE_PERIOD,
  versioningFormat: ARTICLE_VERSIONING_FORMAT,
  slugFormat: ARTICLE_SLUG_FORMAT,
  maxTags: ARTICLE_TAG_MAX_COUNT,
  tagMinLength: ARTICLE_TAG_MIN_LENGTH,
  tagMaxLength: ARTICLE_TAG_MAX_LENGTH,
  maxVersions: ARTICLE_VERSION_MAX_COUNT,
  maxRelatedArticles: ARTICLE_RELATED_ARTICLES_MAX_COUNT,
  maxAttachments: ARTICLE_ATTACHMENTS_MAX_COUNT,
  imageMaxSizeMB: ARTICLE_IMAGE_MAX_SIZE_MB,
  fileMaxSizeMB: ARTICLE_FILE_MAX_SIZE_MB,
  viewTrackingPeriod: ARTICLE_VIEW_TRACKING_PERIOD,
  ratingTrackingPeriod: ARTICLE_RATING_TRACKING_PERIOD,
  searchResultLimit: ARTICLE_SEARCH_RESULT_LIMIT,
  itemsPerPage: ARTICLE_ITEMS_PER_PAGE,
} as const;

/**
 * আর্টিকেল রিভিউ স্ট্যাটাস
 */
export const ARTICLE_REVIEW_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
  NEEDS_CHANGES: 'needs_changes',
} as const;

/**
 * আর্টিকেল রিভিউ টাইপ
 */
export const ARTICLE_REVIEW_TYPES = {
  PEER: 'peer',
  EDITORIAL: 'editorial',
  TECHNICAL: 'technical',
  SECURITY: 'security',
  LEGAL: 'legal',
} as const;

/**
 * আর্টিকেল পাবলিশ টাইপ
 */
export const ARTICLE_PUBLISH_TYPES = {
  IMMEDIATE: 'immediate',
  SCHEDULED: 'scheduled',
  MANUAL: 'manual',
} as const;

/**
 * আর্টিকেল চেঞ্জ টাইপ
 */
export const ARTICLE_CHANGE_TYPES = {
  CREATED: 'created',
  UPDATED: 'updated',
  REVISED: 'revised',
  RESTORED: 'restored',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  REVIEWED: 'reviewed',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type ArticleIdPrefix = typeof ARTICLE_ID_PREFIX;
export type ArticleReviewStatus =
  (typeof ARTICLE_REVIEW_STATUS)[keyof typeof ARTICLE_REVIEW_STATUS];
export type ArticleReviewType = (typeof ARTICLE_REVIEW_TYPES)[keyof typeof ARTICLE_REVIEW_TYPES];
export type ArticlePublishType = (typeof ARTICLE_PUBLISH_TYPES)[keyof typeof ARTICLE_PUBLISH_TYPES];
export type ArticleChangeType = (typeof ARTICLE_CHANGE_TYPES)[keyof typeof ARTICLE_CHANGE_TYPES];

export interface ArticleDefaultSettings {
  titleMaxLength: number;
  titleMinLength: number;
  contentMaxLength: number;
  contentMinLength: number;
  summaryMaxLength: number;
  defaultAuthor: string;
  reviewPeriod: number;
  archivePeriod: number;
  versioningFormat: string;
  slugFormat: string;
  maxTags: number;
  tagMinLength: number;
  tagMaxLength: number;
  maxVersions: number;
  maxRelatedArticles: number;
  maxAttachments: number;
  imageMaxSizeMB: number;
  fileMaxSizeMB: number;
  viewTrackingPeriod: number;
  ratingTrackingPeriod: number;
  searchResultLimit: number;
  itemsPerPage: number;
}

export interface ArticleMetadata {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  category: string;
  type: string;
  status: string;
  language: string;
  tags: string[];
  author: string;
  contributors?: string[];
  version: string;
  versionHistory: {
    version: string;
    changes: string;
    author: string;
    createdAt: Date;
  }[];
  reviewStatus: ArticleReviewStatus;
  reviewHistory?: {
    reviewer: string;
    status: ArticleReviewStatus;
    comments?: string;
    createdAt: Date;
  }[];
  publishType: ArticlePublishType;
  publishedAt?: Date;
  scheduledPublishAt?: Date;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  rating: number;
  attachments: {
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  relatedArticles: string[];
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ArticleSearchFilters {
  category?: string;
  type?: string;
  status?: string;
  language?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

export interface ArticleSortOptions {
  field: 'title' | 'views' | 'rating' | 'createdAt' | 'updatedAt' | 'publishedAt';
  order: 'asc' | 'desc';
}

export interface ArticleVersion {
  id: string;
  articleId: string;
  version: string;
  title: string;
  content: string;
  summary?: string;
  tags: string[];
  changes: string;
  author: string;
  createdAt: Date;
  isCurrent: boolean;
}

export interface ArticleReview {
  id: string;
  articleId: string;
  reviewer: string;
  status: ArticleReviewStatus;
  type: ArticleReviewType;
  comments?: string;
  suggestions?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface ArticleAnalytics {
  articleId: string;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  rating: number;
  averageTimeOnPage?: number;
  bounceRate?: number;
  searchImpressions: number;
  searchClicks: number;
  period: string;
}

/**
 * আর্টিকেল কনফিগারেশন
 */
export const ARTICLE_CONFIG = {
  idPrefix: ARTICLE_ID_PREFIX,
  numberFormat: ARTICLE_NUMBER_FORMAT,
  defaultSettings: ARTICLE_DEFAULT_SETTINGS,
  reviewStatus: ARTICLE_REVIEW_STATUS,
  reviewTypes: ARTICLE_REVIEW_TYPES,
  publishTypes: ARTICLE_PUBLISH_TYPES,
  changeTypes: ARTICLE_CHANGE_TYPES,
} as const;

/**
 * আর্টিকেল স্ট্যাটাস ট্রানজিশন রুলস
 */
export const ARTICLE_STATUS_TRANSITIONS = {
  draft: ['pending_review', 'published', 'archived'],
  pending_review: ['review', 'needs_changes', 'rejected'],
  review: ['approved', 'rejected', 'needs_changes'],
  approved: ['published', 'scheduled'],
  scheduled: ['published', 'draft'],
  published: ['archived', 'deprecated', 'needs_update'],
  needs_update: ['pending_review', 'draft'],
  needs_changes: ['draft', 'pending_review'],
  rejected: ['draft', 'needs_changes'],
  deprecated: ['archived'],
  archived: ['draft', 'published'],
} as const;

/**
 * আর্টিকেল ট্যাগ প্রস্তাবিত তালিকা
 */
export const ARTICLE_SUGGESTED_TAGS = [
  'tutorial',
  'how-to',
  'guide',
  'reference',
  'api',
  'security',
  'performance',
  'optimization',
  'troubleshooting',
  'debugging',
  'configuration',
  'setup',
  'installation',
  'migration',
  'upgrade',
  'integration',
  'automation',
  'workflow',
  'best-practice',
  'tips',
] as const;

export type ArticleSuggestedTag = (typeof ARTICLE_SUGGESTED_TAGS)[number];
