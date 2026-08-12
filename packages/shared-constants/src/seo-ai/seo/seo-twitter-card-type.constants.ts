/**
 * SEO টুইটার কার্ড টাইপ এনাম
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
 * SEO টুইটার কার্ড টাইপ লেবেল
 */
export const SEO_TWITTER_CARD_TYPE_LABELS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 'Summary Card',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: 'Summary Card with Large Image',
  [SEO_TWITTER_CARD_TYPE.APP]: 'App Card',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 'Player Card',
} as const;

/**
 * SEO টুইটার কার্ড টাইপ বিবরণ
 */
export const SEO_TWITTER_CARD_TYPE_DESCRIPTIONS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]:
    'Standard card with title, description, and small thumbnail image',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]:
    'Card with title, description, and prominent large featured image',
  [SEO_TWITTER_CARD_TYPE.APP]: 'Card for promoting mobile apps with download links',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 'Card for video and audio content with embedded media player',
} as const;

/**
 * SEO টুইটার কার্ড টাইপ আইকন
 */
export const SEO_TWITTER_CARD_TYPE_ICONS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: '📋',
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: '🖼️',
  [SEO_TWITTER_CARD_TYPE.APP]: '📱',
  [SEO_TWITTER_CARD_TYPE.PLAYER]: '▶️',
} as const;

/**
 * SEO টুইটার কার্ড টাইপ কালার (হেক্স কোড)
 */
export const SEO_TWITTER_CARD_TYPE_COLORS: Record<SEOTwitterCardType, string> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: '#3b82f6', // Blue-500
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: '#22c55e', // Green-500
  [SEO_TWITTER_CARD_TYPE.APP]: '#ec4899', // Pink-500
  [SEO_TWITTER_CARD_TYPE.PLAYER]: '#8b5cf6', // Violet-500
} as const;

/**
 * SEO টুইটার কার্ড টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_TWITTER_CARD_TYPE_PRIORITY: Record<SEOTwitterCardType, number> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: 3,
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: 1,
  [SEO_TWITTER_CARD_TYPE.APP]: 2,
  [SEO_TWITTER_CARD_TYPE.PLAYER]: 4,
} as const;

/**
 * SEO টুইটার কার্ড টাইপ ক্যাটাগরি
 */
export const SEO_TWITTER_CARD_TYPE_CATEGORY = {
  STANDARD: 'standard',
  MEDIA: 'media',
  APP: 'app',
} as const;

/**
 * SEO_TWITTER_CARD_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOTwitterCardTypeCategory =
  (typeof SEO_TWITTER_CARD_TYPE_CATEGORY)[keyof typeof SEO_TWITTER_CARD_TYPE_CATEGORY];

/**
 * SEO টুইটার কার্ড টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_TWITTER_CARD_TYPE_CATEGORY_LABELS: Record<SEOTwitterCardTypeCategory, string> = {
  [SEO_TWITTER_CARD_TYPE_CATEGORY.STANDARD]: 'Standard',
  [SEO_TWITTER_CARD_TYPE_CATEGORY.MEDIA]: 'Media',
  [SEO_TWITTER_CARD_TYPE_CATEGORY.APP]: 'App',
} as const;

/**
 * SEO টুইটার কার্ড টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_TWITTER_CARD_TYPE_CATEGORY_MAP: Record<
  SEOTwitterCardType,
  SEOTwitterCardTypeCategory
> = {
  [SEO_TWITTER_CARD_TYPE.SUMMARY]: SEO_TWITTER_CARD_TYPE_CATEGORY.STANDARD,
  [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: SEO_TWITTER_CARD_TYPE_CATEGORY.STANDARD,
  [SEO_TWITTER_CARD_TYPE.APP]: SEO_TWITTER_CARD_TYPE_CATEGORY.APP,
  [SEO_TWITTER_CARD_TYPE.PLAYER]: SEO_TWITTER_CARD_TYPE_CATEGORY.MEDIA,
} as const;

/**
 * SEO টুইটার কার্ড টাইপ কনফিগারেশন
 */
export interface SEOTwitterCardTypeConfig {
  type: SEOTwitterCardType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEOTwitterCardTypeCategory;
  requiredProperties: string[];
  recommendedProperties: string[];
  maxImageSize: number; // MB
  imageRatio: number;
  order: number;
}

/**
 * SEO টুইটার কার্ড টাইপ মেটাডেটা
 */
export const SEO_TWITTER_CARD_TYPE_METADATA: Record<SEOTwitterCardType, SEOTwitterCardTypeConfig> =
  {
    [SEO_TWITTER_CARD_TYPE.SUMMARY]: {
      type: SEO_TWITTER_CARD_TYPE.SUMMARY,
      label: SEO_TWITTER_CARD_TYPE_LABELS[SEO_TWITTER_CARD_TYPE.SUMMARY],
      description: SEO_TWITTER_CARD_TYPE_DESCRIPTIONS[SEO_TWITTER_CARD_TYPE.SUMMARY],
      icon: SEO_TWITTER_CARD_TYPE_ICONS[SEO_TWITTER_CARD_TYPE.SUMMARY],
      color: SEO_TWITTER_CARD_TYPE_COLORS[SEO_TWITTER_CARD_TYPE.SUMMARY],
      priority: SEO_TWITTER_CARD_TYPE_PRIORITY[SEO_TWITTER_CARD_TYPE.SUMMARY],
      category: SEO_TWITTER_CARD_TYPE_CATEGORY_MAP[SEO_TWITTER_CARD_TYPE.SUMMARY],
      requiredProperties: ['title', 'description', 'image'],
      recommendedProperties: ['site', 'creator', 'image_alt'],
      maxImageSize: 5,
      imageRatio: 1.91,
      order: 0,
    },
    [SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE]: {
      type: SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE,
      label: SEO_TWITTER_CARD_TYPE_LABELS[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      description: SEO_TWITTER_CARD_TYPE_DESCRIPTIONS[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      icon: SEO_TWITTER_CARD_TYPE_ICONS[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      color: SEO_TWITTER_CARD_TYPE_COLORS[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      priority: SEO_TWITTER_CARD_TYPE_PRIORITY[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      category: SEO_TWITTER_CARD_TYPE_CATEGORY_MAP[SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE],
      requiredProperties: ['title', 'description', 'image'],
      recommendedProperties: ['site', 'creator', 'image_alt'],
      maxImageSize: 5,
      imageRatio: 1.91,
      order: 1,
    },
    [SEO_TWITTER_CARD_TYPE.APP]: {
      type: SEO_TWITTER_CARD_TYPE.APP,
      label: SEO_TWITTER_CARD_TYPE_LABELS[SEO_TWITTER_CARD_TYPE.APP],
      description: SEO_TWITTER_CARD_TYPE_DESCRIPTIONS[SEO_TWITTER_CARD_TYPE.APP],
      icon: SEO_TWITTER_CARD_TYPE_ICONS[SEO_TWITTER_CARD_TYPE.APP],
      color: SEO_TWITTER_CARD_TYPE_COLORS[SEO_TWITTER_CARD_TYPE.APP],
      priority: SEO_TWITTER_CARD_TYPE_PRIORITY[SEO_TWITTER_CARD_TYPE.APP],
      category: SEO_TWITTER_CARD_TYPE_CATEGORY_MAP[SEO_TWITTER_CARD_TYPE.APP],
      requiredProperties: ['title', 'description', 'app_id'],
      recommendedProperties: ['app_store_id', 'google_play_id', 'image'],
      maxImageSize: 5,
      imageRatio: 1.91,
      order: 2,
    },
    [SEO_TWITTER_CARD_TYPE.PLAYER]: {
      type: SEO_TWITTER_CARD_TYPE.PLAYER,
      label: SEO_TWITTER_CARD_TYPE_LABELS[SEO_TWITTER_CARD_TYPE.PLAYER],
      description: SEO_TWITTER_CARD_TYPE_DESCRIPTIONS[SEO_TWITTER_CARD_TYPE.PLAYER],
      icon: SEO_TWITTER_CARD_TYPE_ICONS[SEO_TWITTER_CARD_TYPE.PLAYER],
      color: SEO_TWITTER_CARD_TYPE_COLORS[SEO_TWITTER_CARD_TYPE.PLAYER],
      priority: SEO_TWITTER_CARD_TYPE_PRIORITY[SEO_TWITTER_CARD_TYPE.PLAYER],
      category: SEO_TWITTER_CARD_TYPE_CATEGORY_MAP[SEO_TWITTER_CARD_TYPE.PLAYER],
      requiredProperties: ['title', 'description', 'image', 'player_url'],
      recommendedProperties: ['player_width', 'player_height', 'player_stream'],
      maxImageSize: 5,
      imageRatio: 1.91,
      order: 3,
    },
  } as const;

/**
 * SEO টুইটার কার্ড টাইপ গ্রুপ
 */
export const SEO_TWITTER_CARD_TYPE_GROUPS = {
  STANDARD: [SEO_TWITTER_CARD_TYPE.SUMMARY, SEO_TWITTER_CARD_TYPE.SUMMARY_LARGE_IMAGE] as const,
  MEDIA: [SEO_TWITTER_CARD_TYPE.PLAYER] as const,
  APP: [SEO_TWITTER_CARD_TYPE.APP] as const,
} as const;

/**
 * SEO টুইটার কার্ড টাইপ গ্রুপ লেবেল
 */
export const SEO_TWITTER_CARD_TYPE_GROUP_LABELS = {
  STANDARD: 'Standard Cards',
  MEDIA: 'Media Cards',
  APP: 'App Cards',
} as const;

/**
 * SEO টুইটার কার্ড টাইপ গ্রুপ কালার
 */
export const SEO_TWITTER_CARD_TYPE_GROUP_COLORS = {
  STANDARD: '#3b82f6',
  MEDIA: '#8b5cf6',
  APP: '#ec4899',
} as const;
