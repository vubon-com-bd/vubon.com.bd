/**
 * রিভিউ মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// রিভিউ স্ট্যাটাস
export const ReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FLAGGED: 'FLAGGED',
  SPAM: 'SPAM',
  DELETED: 'DELETED',
} as const;

export type ReviewStatusType = (typeof ReviewStatus)[keyof typeof ReviewStatus];

// রেটিং স্কেল
export const RATING_SCALE = {
  MIN: 1,
  MAX: 5,
  STEP: 0.5,
} as const;

// রিভিউ টাইপ
export const ReviewType = {
  PRODUCT: 'PRODUCT',
  SELLER: 'SELLER',
  SERVICE: 'SERVICE',
  DELIVERY: 'DELIVERY',
  PACKAGING: 'PACKAGING',
} as const;

export type ReviewTypeType = (typeof ReviewType)[keyof typeof ReviewType];

// ডিফল্ট রিভিউ সর্টিং
export const DefaultReviewSort = {
  MOST_RECENT: 'MOST_RECENT',
  HIGHEST_RATING: 'HIGHEST_RATING',
  LOWEST_RATING: 'LOWEST_RATING',
  MOST_HELPFUL: 'MOST_HELPFUL',
  MOST_CRITICAL: 'MOST_CRITICAL',
  MOST_POSITIVE: 'MOST_POSITIVE',
} as const;

export type DefaultReviewSortType = (typeof DefaultReviewSort)[keyof typeof DefaultReviewSort];

// রিভিউ লেন্থের সীমা
export const REVIEW_TITLE_MIN_LENGTH = 3;
export const REVIEW_TITLE_MAX_LENGTH = 200;
export const REVIEW_CONTENT_MIN_LENGTH = 10;
export const REVIEW_CONTENT_MAX_LENGTH = 5000;

// হেল্পফুল ভোটের থ্রেশহোল্ড
export const HELPFUL_VOTE_THRESHOLD = 10;

// রিভিউ মডারেশন নিয়ম
export const ReviewModerationRules = {
  MIN_WORDS: 5,
  MAX_WORDS: 1000,
  ALLOWED_HTML_TAGS: ['b', 'i', 'strong', 'em', 'p', 'br'],
  FORBIDDEN_WORDS: ['spam', 'advertisement', 'promotion'],
  MAX_IMAGES: 5,
  MAX_VIDEOS: 2,
  MIN_RATING_FOR_APPROVAL: 2,
  FLAG_THRESHOLD: 5,
  AUTO_APPROVE_AFTER_DAYS: 7,
} as const;

// ডিফল্ট রিভিউ ভ্যালু
export const DEFAULT_REVIEW_STATUS = ReviewStatus.PENDING;
export const DEFAULT_REVIEW_TYPE = ReviewType.PRODUCT;
export const DEFAULT_REVIEW_SORT = DefaultReviewSort.MOST_RECENT;

// রিভিউ রেটিং কনস্ট্যান্ট
export const REVIEW_RATING_MIN = RATING_SCALE.MIN;
export const REVIEW_RATING_MAX = RATING_SCALE.MAX;
export const REVIEW_RATING_STEP = RATING_SCALE.STEP;

// রিভিউ ইমেজ কনস্ট্যান্ট
export const MAX_REVIEW_IMAGES = 5;
export const REVIEW_IMAGE_MIN_SIZE = 50; // কিলোবাইট
export const REVIEW_IMAGE_MAX_SIZE = 2048; // কিলোবাইট
export const REVIEW_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// রিভিউ ভিডিও কনস্ট্যান্ট
export const MAX_REVIEW_VIDEOS = 2;
export const REVIEW_VIDEO_MAX_SIZE = 10240; // কিলোবাইট (10MB)
export const REVIEW_VIDEO_ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
export const REVIEW_VIDEO_MAX_DURATION_SECONDS = 60;

// রিভিউ ভোট কনস্ট্যান্ট
export const REVIEW_VOTE_MIN = 0;
export const REVIEW_VOTE_MAX = 1000;

// রিভিউ ফ্ল্যাগ কনস্ট্যান্ট
export const REVIEW_FLAG_REASONS = [
  'INAPPROPRIATE',
  'OFFENSIVE',
  'SPAM',
  'FAKE_REVIEW',
  'HATE_SPEECH',
  'VIOLENCE',
  'HARASSMENT',
  'MISINFORMATION',
  'COPYRIGHT',
] as const;

export type ReviewFlagReasonType = (typeof REVIEW_FLAG_REASONS)[number];

// রিভিউ সোর্ট অপশন
export const ReviewSortOption = {
  CREATED_AT_ASC: 'CREATED_AT_ASC',
  CREATED_AT_DESC: 'CREATED_AT_DESC',
  RATING_ASC: 'RATING_ASC',
  RATING_DESC: 'RATING_DESC',
  HELPFUL_ASC: 'HELPFUL_ASC',
  HELPFUL_DESC: 'HELPFUL_DESC',
  UPDATED_AT_ASC: 'UPDATED_AT_ASC',
  UPDATED_AT_DESC: 'UPDATED_AT_DESC',
} as const;

export type ReviewSortOptionType = (typeof ReviewSortOption)[keyof typeof ReviewSortOption];

// ডিফল্ট রিভিউ পেজিনেশন
export const DEFAULT_REVIEW_PAGE_SIZE = 20;
export const MAX_REVIEW_PAGE_SIZE = 100;

// রিভিউ ফিল্টার কনস্ট্যান্ট
export const ReviewFilterOptions = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  WITH_IMAGES: 'WITH_IMAGES',
  WITH_VIDEOS: 'WITH_VIDEOS',
  VERIFIED_PURCHASE: 'VERIFIED_PURCHASE',
  RECENT_DAYS: 30,
} as const;

// রিভিউ মেটাডাটা কনস্ট্যান্ট
export const MAX_REVIEW_META_FIELDS = 20;
export const REVIEW_META_KEY_MAX_LENGTH = 100;
export const REVIEW_META_VALUE_MAX_LENGTH = 1000;

// রিভিউ হিস্টোরি কনস্ট্যান্ট
export const REVIEW_HISTORY_MAX_DAYS = 365;
export const REVIEW_HISTORY_MAX_ENTRIES = 10000;

// রিভিউ বাল্ক অপারেশন কনস্ট্যান্ট
export const MAX_REVIEWS_PER_BULK_OPERATION = 100;

// রিভিউ অ্যানালিটিক্স কনস্ট্যান্ট
export const REVIEW_ANALYTICS_DAYS = 30;
export const REVIEW_ANALYTICS_MIN_REVIEWS = 10;

// রিভিউ নোটিফিকেশন কনস্ট্যান্ট
export const REVIEW_NOTIFICATION_RESPONSE_DAYS = 3;
export const REVIEW_NOTIFICATION_REMINDER_DAYS = 7;

// রিভিউ রেসপন্স কনস্ট্যান্ট
export const REVIEW_RESPONSE_MAX_LENGTH = 1000;
export const REVIEW_RESPONSE_MIN_LENGTH = 10;
export const REVIEW_RESPONSE_AUTO_APPROVE = true;

// রিভিউ ভারিফিকেশন কনস্ট্যান্ট
export const REVIEW_VERIFICATION_REQUIRED = true;
export const REVIEW_VERIFICATION_METHODS = ['EMAIL', 'PHONE', 'PURCHASE'] as const;

export type ReviewVerificationMethodType = (typeof REVIEW_VERIFICATION_METHODS)[number];
