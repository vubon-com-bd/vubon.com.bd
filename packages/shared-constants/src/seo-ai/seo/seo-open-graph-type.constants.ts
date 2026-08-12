/**
 * SEO Open Graph টাইপ এনাম
 */
export const SEO_OPEN_GRAPH_TYPE = {
  WEBSITE: 'website',
  ARTICLE: 'article',
  PRODUCT: 'product',
  VIDEO: 'video',
  MUSIC: 'music',
  BOOK: 'book',
  PROFILE: 'profile',
  PLACE: 'place',
} as const;

/**
 * SEO_OPEN_GRAPH_TYPE থেকে টাইপ
 */
export type SEOOpenGraphType = (typeof SEO_OPEN_GRAPH_TYPE)[keyof typeof SEO_OPEN_GRAPH_TYPE];

/**
 * SEO Open Graph টাইপ লেবেল
 */
export const SEO_OPEN_GRAPH_TYPE_LABELS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: 'Website',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: 'Article',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: 'Product',
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: 'Video',
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: 'Music',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: 'Book',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: 'Profile',
  [SEO_OPEN_GRAPH_TYPE.PLACE]: 'Place',
} as const;

/**
 * SEO Open Graph টাইপ বিবরণ
 */
export const SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: 'Standard website or landing page',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: 'News article, blog post, or editorial content',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: 'Product page with pricing and availability',
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: 'Video content including movies, shows, and clips',
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: 'Music content including songs, albums, and playlists',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: 'Book, ebook, or publication',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: 'Person profile, author, or user page',
  [SEO_OPEN_GRAPH_TYPE.PLACE]: 'Location, venue, or business address',
} as const;

/**
 * SEO Open Graph টাইপ আইকন
 */
export const SEO_OPEN_GRAPH_TYPE_ICONS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: '🌐',
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: '📄',
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: '🛒',
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: '🎬',
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: '🎵',
  [SEO_OPEN_GRAPH_TYPE.BOOK]: '📚',
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: '👤',
  [SEO_OPEN_GRAPH_TYPE.PLACE]: '📍',
} as const;

/**
 * SEO Open Graph টাইপ কালার (হেক্স কোড)
 */
export const SEO_OPEN_GRAPH_TYPE_COLORS: Record<SEOOpenGraphType, string> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: '#3b82f6', // Blue-500
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: '#8b5cf6', // Violet-500
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: '#22c55e', // Green-500
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: '#dc2626', // Red-600
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: '#ec4899', // Pink-500
  [SEO_OPEN_GRAPH_TYPE.BOOK]: '#f59e0b', // Amber-500
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: '#f97316', // Orange-500
  [SEO_OPEN_GRAPH_TYPE.PLACE]: '#06b6d4', // Cyan-500
} as const;

/**
 * SEO Open Graph টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_OPEN_GRAPH_TYPE_PRIORITY: Record<SEOOpenGraphType, number> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: 1,
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: 2,
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: 3,
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: 4,
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: 5,
  [SEO_OPEN_GRAPH_TYPE.BOOK]: 6,
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: 7,
  [SEO_OPEN_GRAPH_TYPE.PLACE]: 8,
} as const;

/**
 * SEO Open Graph টাইপ ক্যাটাগরি
 */
export const SEO_OPEN_GRAPH_TYPE_CATEGORY = {
  GENERAL: 'general',
  MEDIA: 'media',
  COMMERCE: 'commerce',
  PERSONAL: 'personal',
} as const;

/**
 * SEO_OPEN_GRAPH_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOOpenGraphTypeCategory =
  (typeof SEO_OPEN_GRAPH_TYPE_CATEGORY)[keyof typeof SEO_OPEN_GRAPH_TYPE_CATEGORY];

/**
 * SEO Open Graph টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_OPEN_GRAPH_TYPE_CATEGORY_LABELS: Record<SEOOpenGraphTypeCategory, string> = {
  [SEO_OPEN_GRAPH_TYPE_CATEGORY.GENERAL]: 'General',
  [SEO_OPEN_GRAPH_TYPE_CATEGORY.MEDIA]: 'Media',
  [SEO_OPEN_GRAPH_TYPE_CATEGORY.COMMERCE]: 'Commerce',
  [SEO_OPEN_GRAPH_TYPE_CATEGORY.PERSONAL]: 'Personal',
} as const;

/**
 * SEO Open Graph টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP: Record<SEOOpenGraphType, SEOOpenGraphTypeCategory> =
  {
    [SEO_OPEN_GRAPH_TYPE.WEBSITE]: SEO_OPEN_GRAPH_TYPE_CATEGORY.GENERAL,
    [SEO_OPEN_GRAPH_TYPE.ARTICLE]: SEO_OPEN_GRAPH_TYPE_CATEGORY.GENERAL,
    [SEO_OPEN_GRAPH_TYPE.PRODUCT]: SEO_OPEN_GRAPH_TYPE_CATEGORY.COMMERCE,
    [SEO_OPEN_GRAPH_TYPE.VIDEO]: SEO_OPEN_GRAPH_TYPE_CATEGORY.MEDIA,
    [SEO_OPEN_GRAPH_TYPE.MUSIC]: SEO_OPEN_GRAPH_TYPE_CATEGORY.MEDIA,
    [SEO_OPEN_GRAPH_TYPE.BOOK]: SEO_OPEN_GRAPH_TYPE_CATEGORY.MEDIA,
    [SEO_OPEN_GRAPH_TYPE.PROFILE]: SEO_OPEN_GRAPH_TYPE_CATEGORY.PERSONAL,
    [SEO_OPEN_GRAPH_TYPE.PLACE]: SEO_OPEN_GRAPH_TYPE_CATEGORY.PERSONAL,
  } as const;

/**
 * SEO Open Graph টাইপ কনফিগারেশন
 */
export interface SEOOpenGraphTypeConfig {
  type: SEOOpenGraphType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEOOpenGraphTypeCategory;
  requiredProperties: string[];
  recommendedProperties: string[];
  order: number;
}

/**
 * SEO Open Graph টাইপ মেটাডেটা
 */
export const SEO_OPEN_GRAPH_TYPE_METADATA: Record<SEOOpenGraphType, SEOOpenGraphTypeConfig> = {
  [SEO_OPEN_GRAPH_TYPE.WEBSITE]: {
    type: SEO_OPEN_GRAPH_TYPE.WEBSITE,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.WEBSITE],
    requiredProperties: ['title', 'description', 'url'],
    recommendedProperties: ['image', 'site_name', 'locale'],
    order: 0,
  },
  [SEO_OPEN_GRAPH_TYPE.ARTICLE]: {
    type: SEO_OPEN_GRAPH_TYPE.ARTICLE,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.ARTICLE],
    requiredProperties: ['title', 'description', 'url', 'published_time'],
    recommendedProperties: ['image', 'author', 'section', 'tags'],
    order: 1,
  },
  [SEO_OPEN_GRAPH_TYPE.PRODUCT]: {
    type: SEO_OPEN_GRAPH_TYPE.PRODUCT,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.PRODUCT],
    requiredProperties: ['title', 'description', 'url', 'price'],
    recommendedProperties: ['image', 'availability', 'currency', 'brand'],
    order: 2,
  },
  [SEO_OPEN_GRAPH_TYPE.VIDEO]: {
    type: SEO_OPEN_GRAPH_TYPE.VIDEO,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.VIDEO],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.VIDEO],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.VIDEO],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.VIDEO],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.VIDEO],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.VIDEO],
    requiredProperties: ['title', 'description', 'url', 'video_url'],
    recommendedProperties: ['image', 'duration', 'upload_date', 'thumbnail'],
    order: 3,
  },
  [SEO_OPEN_GRAPH_TYPE.MUSIC]: {
    type: SEO_OPEN_GRAPH_TYPE.MUSIC,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.MUSIC],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.MUSIC],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.MUSIC],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.MUSIC],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.MUSIC],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.MUSIC],
    requiredProperties: ['title', 'description', 'url'],
    recommendedProperties: ['image', 'album', 'artist', 'release_date'],
    order: 4,
  },
  [SEO_OPEN_GRAPH_TYPE.BOOK]: {
    type: SEO_OPEN_GRAPH_TYPE.BOOK,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.BOOK],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.BOOK],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.BOOK],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.BOOK],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.BOOK],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.BOOK],
    requiredProperties: ['title', 'description', 'url', 'isbn'],
    recommendedProperties: ['image', 'author', 'publisher', 'pages'],
    order: 5,
  },
  [SEO_OPEN_GRAPH_TYPE.PROFILE]: {
    type: SEO_OPEN_GRAPH_TYPE.PROFILE,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.PROFILE],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.PROFILE],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.PROFILE],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.PROFILE],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.PROFILE],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.PROFILE],
    requiredProperties: ['title', 'url'],
    recommendedProperties: ['image', 'bio', 'location', 'website'],
    order: 6,
  },
  [SEO_OPEN_GRAPH_TYPE.PLACE]: {
    type: SEO_OPEN_GRAPH_TYPE.PLACE,
    label: SEO_OPEN_GRAPH_TYPE_LABELS[SEO_OPEN_GRAPH_TYPE.PLACE],
    description: SEO_OPEN_GRAPH_TYPE_DESCRIPTIONS[SEO_OPEN_GRAPH_TYPE.PLACE],
    icon: SEO_OPEN_GRAPH_TYPE_ICONS[SEO_OPEN_GRAPH_TYPE.PLACE],
    color: SEO_OPEN_GRAPH_TYPE_COLORS[SEO_OPEN_GRAPH_TYPE.PLACE],
    priority: SEO_OPEN_GRAPH_TYPE_PRIORITY[SEO_OPEN_GRAPH_TYPE.PLACE],
    category: SEO_OPEN_GRAPH_TYPE_CATEGORY_MAP[SEO_OPEN_GRAPH_TYPE.PLACE],
    requiredProperties: ['title', 'description', 'url', 'latitude', 'longitude'],
    recommendedProperties: ['image', 'address', 'phone', 'website'],
    order: 7,
  },
} as const;

/**
 * SEO Open Graph টাইপ গ্রুপ
 */
export const SEO_OPEN_GRAPH_TYPE_GROUPS = {
  GENERAL: [SEO_OPEN_GRAPH_TYPE.WEBSITE, SEO_OPEN_GRAPH_TYPE.ARTICLE] as const,
  MEDIA: [SEO_OPEN_GRAPH_TYPE.VIDEO, SEO_OPEN_GRAPH_TYPE.MUSIC, SEO_OPEN_GRAPH_TYPE.BOOK] as const,
  COMMERCE: [SEO_OPEN_GRAPH_TYPE.PRODUCT] as const,
  PERSONAL: [SEO_OPEN_GRAPH_TYPE.PROFILE, SEO_OPEN_GRAPH_TYPE.PLACE] as const,
} as const;

/**
 * SEO Open Graph টাইপ গ্রুপ লেবেল
 */
export const SEO_OPEN_GRAPH_TYPE_GROUP_LABELS = {
  GENERAL: 'General',
  MEDIA: 'Media',
  COMMERCE: 'Commerce',
  PERSONAL: 'Personal',
} as const;

/**
 * SEO Open Graph টাইপ গ্রুপ কালার
 */
export const SEO_OPEN_GRAPH_TYPE_GROUP_COLORS = {
  GENERAL: '#3b82f6',
  MEDIA: '#ec4899',
  COMMERCE: '#22c55e',
  PERSONAL: '#f59e0b',
} as const;
