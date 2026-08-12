/**
 * ডিফল্ট টুইটার কার্ড টাইপ
 */
export const SEO_TWITTER_CARD_DEFAULT_TYPE = 'summary_large_image' as const;

/**
 * সর্বোচ্চ ইমেজ সাইজ (৫MB)
 */
export const SEO_TWITTER_CARD_MAX_IMAGE_SIZE = 5 as const; // 5 MB

/**
 * ইমেজ রেশিও
 */
export const SEO_TWITTER_CARD_IMAGE_RATIO = 1.91 as const;

/**
 * টুইটার কার্ড টাইপ এনাম
 */
export const SEO_TWITTER_CARD_TYPE = {
  SUMMARY: 'summary',
  SUMMARY_LARGE_IMAGE: 'summary_large_image',
  APP: 'app',
  PLAYER: 'player',
} as const;

/**
 * SEO_TWITTER_CARD_TYPE থেকে টাইপ
 */
export type SEOTwitterCardType = (typeof SEO_TWITTER_CARD_TYPE)[keyof typeof SEO_TWITTER_CARD_TYPE];

/**
 * টুইটার কার্ড টাইপ লেবেল
 */
export const SEO_TWITTER_CARD_TYPE_LABELS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 'Summary Card',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: 'Summary Card with Large Image',
  [SEO_TWITTER_CARD_TYPE.APP]: 'App Card',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 'Player Card',
} as const;

/**
 * টুইটার কার্ড টাইপ বিবরণ
 */
export const SEO_TWITTER_CARD_TYPE_DESCRIPTIONS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 'Standard card with title, description, and small thumbnail',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]:
    'Card with title, description, and prominent large image',
  [SEO_TWITTER_CARD_TYPE.APP]: 'Card for mobile app promotion with download links',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 'Card for video and audio content with media player',
} as const;

/**
 * টুইটার কার্ড টাইপ আইকন
 */
export const SEO_TWITTER_CARD_TYPE_ICONS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: '📋',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: '🖼️',
  [SEO_TWITTER_CARD_TYPE.APP]: '📱',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: '▶️',
} as const;

/**
 * টুইটার কার্ড টাইপ কালার (হেক্স কোড)
 */
export const SEO_TWITTER_CARD_TYPE_COLORS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: '#3b82f6', // Blue-500
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: '#22c55e', // Green-500
  [SEO_TWITTER_CARD_TYPE.APP]: '#ec4899', // Pink-500
  [SEO_TWITTER_CARD_TYPE.PLAYER]: '#8b5cf6', // Violet-500
} as const;

/**
 * টুইটার কার্ড টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_TWITTER_CARD_TYPE_PRIORITY: Record<SEOTwitterCardType, number> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 3,
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: 1,
  [SEO_TWITTER_CARD_TYPE.APP]: 2,
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 4,
} as const;

/**
 * টুইটার কার্ড টাইপ ক্যাটাগরি
 */
export const SEO_TWITTER_CARD_CATEGORY = {
  STANDARD: 'standard',
  MEDIA: 'media',
  APP: 'app',
} as const;

/**
 * SEO_TWITTER_CARD_CATEGORY থেকে টাইপ
 */
export type SEOTwitterCardCategory =
  (typeof SEO_TWITTER_CARD_CATEGORY)[keyof typeof SEO_TWITTER_CARD_CATEGORY];

/**
 * টুইটার কার্ড ক্যাটাগরি লেবেল
 */
export const SEO_TWITTER_CARD_CATEGORY_LABELS: Record<SEOTwitterCardCategory, string> = {
  [SEO_TWITTER_CARD_CATEGORY.STANDARD]: 'Standard',
  [SEO_TWITTER_CARD_CATEGORY.MEDIA]: 'Media',
  [SEO_TWITTER_CARD_CATEGORY.APP]: 'App',
} as const;

/**
 * টুইটার কার্ড ক্যাটাগরি ম্যাপিং
 */
export const SEO_TWITTER_CARD_CATEGORY_MAP: Record<SEOTwitterCardType, SEOTwitterCardCategory> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: SEO_TWITTER_CARD_CATEGORY.STANDARD,
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: SEO_TWITTER_CARD_CATEGORY.STANDARD,
  [SEO_TWITTER_CARD_TYPE.APP]: SEO_TWITTER_CARD_CATEGORY.APP,
  [SEO_TWITTER_CARD_TYPE.PLAYER]: SEO_TWITTER_CARD_CATEGORY.MEDIA,
} as const;

/**
 * টুইটার কার্ড কনফিগারেশন
 */
export interface SEOTwitterCardConfig {
  defaultType: SEOTwitterCardType;
  maxImageSize: number; // MB
  imageRatio: number;
  enableSummary: boolean;
  enableSummaryLargeImage: boolean;
  enableApp: boolean;
  enablePlayer: boolean;
}

/**
 * টুইটার কার্ড ডিফল্ট কনফিগারেশন
 */
export const SEO_TWITTER_CARD_DEFAULT_CONFIG: SEOTwitterCardConfig = {
  defaultType: SEO_TWITTER_CARD_DEFAULT_TYPE as SEOTwitterCardType,
  maxImageSize: SEO_TWITTER_CARD_MAX_IMAGE_SIZE,
  imageRatio: SEO_TWITTER_CARD_IMAGE_RATIO,
  enableSummary: true,
  enableSummaryLargeImage: true,
  enableApp: false,
  enablePlayer: false,
} as const;

/**
 * টুইটার কার্ড ডেটা
 */
export interface SEOTwitterCardData {
  card: SEOTwitterCardType;
  site: string;
  creator?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  appId?: string;
  appStoreId?: string;
  googlePlayId?: string;
  playerUrl?: string;
  playerWidth?: number;
  playerHeight?: number;
  playerStream?: string;
}

/**
 * টুইটার কার্ড ফিল্টার
 */
export interface SEOTwitterCardFilter {
  cardType?: SEOTwitterCardType;
  category?: SEOTwitterCardCategory;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * টুইটার কার্ড স্ট্যাটাস
 */
export const SEO_TWITTER_CARD_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UPDATING: 'updating',
} as const;

/**
 * SEO_TWITTER_CARD_STATUS থেকে টাইপ
 */
export type SEOTwitterCardStatus =
  (typeof SEO_TWITTER_CARD_STATUS)[keyof typeof SEO_TWITTER_CARD_STATUS];

/**
 * টুইটার কার্ড স্ট্যাটাস লেবেল
 */
export const SEO_TWITTER_CARD_STATUS_LABELS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: 'Draft',
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: 'Active',
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: 'Inactive',
  [SEO_TWITTER_CARD_STATUS.UPDATING]: 'Updating',
} as const;

/**
 * টুইটার কার্ড স্ট্যাটাস কালার
 */
export const SEO_TWITTER_CARD_STATUS_COLORS: Record<SEOTwitterCardStatus, string> = {
  [SEO_TWITTER_CARD_STATUS.DRAFT]: '#94a3b8', // Slate-400
  [SEO_TWITTER_CARD_STATUS.ACTIVE]: '#22c55e', // Green-500
  [SEO_TWITTER_CARD_STATUS.INACTIVE]: '#f59e0b', // Amber-500
  [SEO_TWITTER_CARD_STATUS.UPDATING]: '#3b82f6', // Blue-500
} as const;
