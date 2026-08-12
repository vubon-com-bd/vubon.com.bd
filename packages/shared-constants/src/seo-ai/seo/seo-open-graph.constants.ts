/**
 * ডিফল্ট ওপেন গ্রাফ টাইপ
 */
export const SEO_OPEN_GRAPH_DEFAULT_TYPE = 'website' as const;

/**
 * সর্বোচ্চ ইমেজ সাইজ (৫MB)
 */
export const SEO_OPEN_GRAPH_MAX_IMAGE_SIZE = 5 as const; // 5 MB

/**
 * ইমেজ রেশিও (১.৯১:১)
 */
export const SEO_OPEN_GRAPH_IMAGE_RATIO = 1.91 as const;

/**
 * Open Graph টাইপ এনাম
 */
export const SEO_OPEN_GRAPH_TYPE = {
  WEBSITE: 'website',
  ARTICLE: 'article',
  BOOK: 'book',
  PROFILE: 'profile',
  MUSIC_SONG: 'music.song',
  MUSIC_ALBUM: 'music.album',
  MUSIC_PLAYLIST: 'music.playlist',
  MUSIC_RADIO_STATION: 'music.radio_station',
  VIDEO_MOVIE: 'video.movie',
  VIDEO_EPISODE: 'video.episode',
  VIDEO_TV_SHOW: 'video.tv_show',
  VIDEO_OTHER: 'video.other',
  PRODUCT: 'product',
  PRODUCT_GROUP: 'product.group',
  PRODUCT_ITEM: 'product.item',
} as const;

/**
 * SEO_OPEN_GRAPH_TYPE থেকে টাইপ
 */
export type SEOOpenGraphType = (typeof SEO_OPEN_GRAPH_TYPE)[keyof typeof SEO_OPEN_GRAPH_TYPE];

/**
 * Open Graph টাইপ লেবেল
 */
export const SEO_OPEN_GRAPH_TYPE_LABELS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: 'Website',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: 'Article',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: 'Book',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: 'Profile',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_SONG]: 'Music Song',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_ALBUM]: 'Music Album',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_PLAYLIST]: 'Music Playlist',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_RADIO_STATION]: 'Music Radio Station',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_MOVIE]: 'Video Movie',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_EPISODE]: 'Video Episode',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_TV_SHOW]: 'Video TV Show',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_OTHER]: 'Video Other',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: 'Product',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_GROUP]: 'Product Group',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_ITEM]: 'Product Item',
} as const;

/**
 * Open Graph টাইপ বিবরণ
 */
export const SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: 'Standard website or landing page',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: 'News article or blog post',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: 'Book or publication',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: 'Person profile or author page',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_SONG]: 'Individual music track',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_ALBUM]: 'Music album collection',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_PLAYLIST]: 'Curated music playlist',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_RADIO_STATION]: 'Radio station or broadcast',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_MOVIE]: 'Full-length movie',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_EPISODE]: 'Single TV episode',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_TV_SHOW]: 'TV show series',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_OTHER]: 'Other video content',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: 'Single product',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_GROUP]: 'Product category or collection',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_ITEM]: 'Individual product item with variations',
} as const;

/**
 * Open Graph টাইপ আইকন
 */
export const SEO_OPEN_GRAPH_TYPE_ICONS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: '🌐',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: '📄',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: '📚',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: '👤',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_SONG]: '🎵',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_ALBUM]: '💿',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_PLAYLIST]: '📋',
  [SEO_OPEN_GRAPH_TYPE.MUSIC_RADIO_STATION]: '📻',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_MOVIE]: '🎬',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_EPISODE]: '📺',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_TV_SHOW]: '📺',
  [SEO_OPEN_GRAPH_TYPE.VIDEO_OTHER]: '🎥',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: '🛒',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_GROUP]: '📂',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_ITEM]: '🏷️',
} as const;

/**
 * Open Graph টাইপ কালার (হেক্স কোড)
 */
export const SEO_OPEN_GRAPH_TYPE_COLORS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: '#3b82f6', // Blue-500
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: '#8b5cf6', // Violet-500
  [SEO_OPEN_GRAPH_TYPE.BOOK]: '#f59e0b', // Amber-500
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: '#22c55e', // Green-500
  [SEO_OPEN_GRAPH_TYPE.MUSIC_SONG]: '#ec4899', // Pink-500
  [SEO_OPEN_GRAPH_TYPE.MUSIC_ALBUM]: '#f472b6', // Pink-400
  [SEO_OPEN_GRAPH_TYPE.MUSIC_PLAYLIST]: '#fbbf24', // Yellow-400
  [SEO_OPEN_GRAPH_TYPE.MUSIC_RADIO_STATION]: '#f97316', // Orange-500
  [SEO_OPEN_GRAPH_TYPE.VIDEO_MOVIE]: '#dc2626', // Red-600
  [SEO_OPEN_GRAPH_TYPE.VIDEO_EPISODE]: '#f87171', // Red-400
  [SEO_OPEN_GRAPH_TYPE.VIDEO_TV_SHOW]: '#fca5a5', // Red-300
  [SEO_OPEN_GRAPH_TYPE.VIDEO_OTHER]: '#fecaca', // Red-200
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: '#22c55e', // Green-500
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_GROUP]: '#86efac', // Green-300
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_ITEM]: '#4ade80', // Green-400
} as const;

/**
 * Open Graph ক্যাটাগরি
 */
export const SEO_OPEN_GRAPH_CATEGORY = {
  GENERAL: 'general',
  MEDIA: 'media',
  COMMERCE: 'commerce',
} as const;

/**
 * SEO_OPEN_GRAPH_CATEGORY থেকে টাইপ
 */
export type SEOOpenGraphCategory =
  (typeof SEO_OPEN_GRAPH_CATEGORY)[keyof typeof SEO_OPEN_GRAPH_CATEGORY];

/**
 * Open Graph ক্যাটাগরি লেবেল
 */
export const SEO_OPEN_GRAPH_CATEGORY_LABELS: Record<SEOOpenGraphCategory, string> = {
  [SEO_OPEN_GRAPH_CATEGORY.GENERAL]: 'General',
  [SEO_OPEN_GRAPH_CATEGORY.MEDIA]: 'Media',
  [SEO_OPEN_GRAPH_CATEGORY.COMMERCE]: 'Commerce',
} as const;

/**
 * Open Graph ক্যাটাগরি ম্যাপিং
 */
export const SEO_OPEN_GRAPH_CATEGORY_MAP: Record<SEOOpenGraphType, SEOOpenGraphCategory> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: SEO_OPEN_GRAPH_CATEGORY.GENERAL,
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: SEO_OPEN_GRAPH_CATEGORY.GENERAL,
  [SEO_OPEN_GRAPH_TYPE.BOOK]: SEO_OPEN_GRAPH_CATEGORY.GENERAL,
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: SEO_OPEN_GRAPH_CATEGORY.GENERAL,
  [SEO_OPEN_GRAPH_TYPE.MUSIC_SONG]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.MUSIC_ALBUM]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.MUSIC_PLAYLIST]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.MUSIC_RADIO_STATION]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.VIDEO_MOVIE]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.VIDEO_EPISODE]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.VIDEO_TV_SHOW]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.VIDEO_OTHER]: SEO_OPEN_GRAPH_CATEGORY.MEDIA,
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: SEO_OPEN_GRAPH_CATEGORY.COMMERCE,
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_GROUP]: SEO_OPEN_GRAPH_CATEGORY.COMMERCE,
  [SEO_OPEN_GRAPH_TYPE.PRODUCT_ITEM]: SEO_OPEN_GRAPH_CATEGORY.COMMERCE,
} as const;

/**
 * Open Graph কনফিগারেশন
 */
export interface SEOOpenGraphConfig {
  defaultType: SEOOpenGraphType;
  maxImageSize: number; // MB
  imageRatio: number;
  enableTwitterCard: boolean;
  enableFacebook: boolean;
  enableLinkedIn: boolean;
}

/**
 * Open Graph ডিফল্ট কনফিগারেশন
 */
export const SEO_OPEN_GRAPH_DEFAULT_CONFIG: SEOOpenGraphConfig = {
  defaultType: SEO_OPEN_GRAPH_DEFAULT_TYPE as SEOOpenGraphType,
  maxImageSize: SEO_OPEN_GRAPH_MAX_IMAGE_SIZE,
  imageRatio: SEO_OPEN_GRAPH_IMAGE_RATIO,
  enableTwitterCard: true,
  enableFacebook: true,
  enableLinkedIn: true,
} as const;

/**
 * Open Graph ডেটা
 */
export interface SEOOpenGraphData {
  type: SEOOpenGraphType;
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
  locale?: string;
  updatedTime?: Date;
  publishedTime?: Date;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Twitter Card টাইপ
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
 * Twitter Card টাইপ লেবেল
 */
export const SEO_TWITTER_CARD_TYPE_LABELS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 'Summary',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: 'Summary with Large Image',
  [SEO_TWITTER_CARD_TYPE.APP]: 'App Card',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 'Player Card',
} as const;

/**
 * Twitter Card টাইপ ডিফল্ট
 */
export const SEO_TWITTER_CARD_DEFAULT: SEOTwitterCardType =
  SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE;

/**
 * Open Graph ফিল্টার
 */
export interface SEOOpenGraphFilter {
  type?: SEOOpenGraphType;
  category?: SEOOpenGraphCategory;
  search?: string;
  page?: number;
  limit?: number;
}
