/**
 * SEO র‍্যাঙ্কিং টাইপ এনাম
 */
export const SEO_RANKING_TYPE = {
  ORGANIC: 'organic',
  LOCAL: 'local',
  MOBILE: 'mobile',
  VOICE: 'voice',
  VIDEO: 'video',
  IMAGE: 'image',
  NEWS: 'news',
  SHOPPING: 'shopping',
} as const;

/**
 * SEO_RANKING_TYPE থেকে টাইপ
 */
export type SEORankingType = (typeof SEO_RANKING_TYPE)[keyof typeof SEO_RANKING_TYPE];

/**
 * SEO র‍্যাঙ্কিং টাইপ লেবেল
 */
export const SEO_RANKING_TYPE_LABELS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: 'Organic Ranking',
  [SEO_RANKING_TYPE.LOCAL]: 'Local Ranking',
  [SEO_RANKING_TYPE.MOBILE]: 'Mobile Ranking',
  [SEO_RANKING_TYPE.VOICE]: 'Voice Search Ranking',
  [SEO_RANKING_TYPE.VIDEO]: 'Video Ranking',
  [SEO_RANKING_TYPE.IMAGE]: 'Image Ranking',
  [SEO_RANKING_TYPE.NEWS]: 'News Ranking',
  [SEO_RANKING_TYPE.SHOPPING]: 'Shopping Ranking',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ বিবরণ
 */
export const SEO_RANKING_TYPE_DESCRIPTIONS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: 'Standard organic search engine results ranking',
  [SEO_RANKING_TYPE.LOCAL]: 'Local search results with location-based relevance',
  [SEO_RANKING_TYPE.MOBILE]: 'Mobile-specific search results ranking',
  [SEO_RANKING_TYPE.VOICE]: 'Voice search results for virtual assistants',
  [SEO_RANKING_TYPE.VIDEO]: 'Video content ranking in search results',
  [SEO_RANKING_TYPE.IMAGE]: 'Image search results ranking',
  [SEO_RANKING_TYPE.NEWS]: 'News content ranking in search results',
  [SEO_RANKING_TYPE.SHOPPING]: 'Product and shopping listing rankings',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ আইকন
 */
export const SEO_RANKING_TYPE_ICONS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: '🔍',
  [SEO_RANKING_TYPE.LOCAL]: '📍',
  [SEO_RANKING_TYPE.MOBILE]: '📱',
  [SEO_RANKING_TYPE.VOICE]: '🎤',
  [SEO_RANKING_TYPE.VIDEO]: '🎬',
  [SEO_RANKING_TYPE.IMAGE]: '🖼️',
  [SEO_RANKING_TYPE.NEWS]: '📰',
  [SEO_RANKING_TYPE.SHOPPING]: '🛒',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ কালার (হেক্স কোড)
 */
export const SEO_RANKING_TYPE_COLORS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: '#22c55e', // Green-500
  [SEO_RANKING_TYPE.LOCAL]: '#3b82f6', // Blue-500
  [SEO_RANKING_TYPE.MOBILE]: '#ec4899', // Pink-500
  [SEO_RANKING_TYPE.VOICE]: '#8b5cf6', // Violet-500
  [SEO_RANKING_TYPE.VIDEO]: '#dc2626', // Red-600
  [SEO_RANKING_TYPE.IMAGE]: '#f59e0b', // Amber-500
  [SEO_RANKING_TYPE.NEWS]: '#f97316', // Orange-500
  [SEO_RANKING_TYPE.SHOPPING]: '#06b6d4', // Cyan-500
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_RANKING_TYPE_PRIORITY: Record<SEORankingType, number> = {
  [SEO_RANKING_TYPE.ORGANIC]: 1,
  [SEO_RANKING_TYPE.LOCAL]: 3,
  [SEO_RANKING_TYPE.MOBILE]: 4,
  [SEO_RANKING_TYPE.VOICE]: 6,
  [SEO_RANKING_TYPE.VIDEO]: 5,
  [SEO_RANKING_TYPE.IMAGE]: 7,
  [SEO_RANKING_TYPE.NEWS]: 8,
  [SEO_RANKING_TYPE.SHOPPING]: 2,
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ সের্চ ভলিউম (১ = কম, ৫ = বেশি)
 */
export const SEO_RANKING_TYPE_VOLUME: Record<SEORankingType, number> = {
  [SEO_RANKING_TYPE.ORGANIC]: 5,
  [SEO_RANKING_TYPE.LOCAL]: 4,
  [SEO_RANKING_TYPE.MOBILE]: 5,
  [SEO_RANKING_TYPE.VOICE]: 3,
  [SEO_RANKING_TYPE.VIDEO]: 4,
  [SEO_RANKING_TYPE.IMAGE]: 3,
  [SEO_RANKING_TYPE.NEWS]: 2,
  [SEO_RANKING_TYPE.SHOPPING]: 4,
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ কনফিগারেশন
 */
export interface SEORankingTypeConfig {
  type: SEORankingType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  volume: number;
  isMobile: boolean;
  isLocal: boolean;
  isVoice: boolean;
  order: number;
}

/**
 * SEO র‍্যাঙ্কিং টাইপ মেটাডেটা
 */
export const SEO_RANKING_TYPE_METADATA: Record<SEORankingType, SEORankingTypeConfig> = {
  [SEO_RANKING_TYPE.ORGANIC]: {
    type: SEO_RANKING_TYPE.ORGANIC,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.ORGANIC],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.ORGANIC],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.ORGANIC],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.ORGANIC],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.ORGANIC],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.ORGANIC],
    isMobile: false,
    isLocal: false,
    isVoice: false,
    order: 0,
  },
  [SEO_RANKING_TYPE.LOCAL]: {
    type: SEO_RANKING_TYPE.LOCAL,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.LOCAL],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.LOCAL],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.LOCAL],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.LOCAL],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.LOCAL],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.LOCAL],
    isMobile: false,
    isLocal: true,
    isVoice: false,
    order: 1,
  },
  [SEO_RANKING_TYPE.MOBILE]: {
    type: SEO_RANKING_TYPE.MOBILE,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.MOBILE],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.MOBILE],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.MOBILE],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.MOBILE],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.MOBILE],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.MOBILE],
    isMobile: true,
    isLocal: false,
    isVoice: false,
    order: 2,
  },
  [SEO_RANKING_TYPE.VOICE]: {
    type: SEO_RANKING_TYPE.VOICE,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.VOICE],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.VOICE],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.VOICE],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.VOICE],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.VOICE],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.VOICE],
    isMobile: false,
    isLocal: false,
    isVoice: true,
    order: 3,
  },
  [SEO_RANKING_TYPE.VIDEO]: {
    type: SEO_RANKING_TYPE.VIDEO,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.VIDEO],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.VIDEO],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.VIDEO],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.VIDEO],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.VIDEO],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.VIDEO],
    isMobile: false,
    isLocal: false,
    isVoice: false,
    order: 4,
  },
  [SEO_RANKING_TYPE.IMAGE]: {
    type: SEO_RANKING_TYPE.IMAGE,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.IMAGE],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.IMAGE],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.IMAGE],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.IMAGE],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.IMAGE],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.IMAGE],
    isMobile: false,
    isLocal: false,
    isVoice: false,
    order: 5,
  },
  [SEO_RANKING_TYPE.NEWS]: {
    type: SEO_RANKING_TYPE.NEWS,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.NEWS],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.NEWS],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.NEWS],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.NEWS],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.NEWS],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.NEWS],
    isMobile: false,
    isLocal: false,
    isVoice: false,
    order: 6,
  },
  [SEO_RANKING_TYPE.SHOPPING]: {
    type: SEO_RANKING_TYPE.SHOPPING,
    label: SEO_RANKING_TYPE_LABELS[SEO_RANKING_TYPE.SHOPPING],
    description: SEO_RANKING_TYPE_DESCRIPTIONS[SEO_RANKING_TYPE.SHOPPING],
    icon: SEO_RANKING_TYPE_ICONS[SEO_RANKING_TYPE.SHOPPING],
    color: SEO_RANKING_TYPE_COLORS[SEO_RANKING_TYPE.SHOPPING],
    priority: SEO_RANKING_TYPE_PRIORITY[SEO_RANKING_TYPE.SHOPPING],
    volume: SEO_RANKING_TYPE_VOLUME[SEO_RANKING_TYPE.SHOPPING],
    isMobile: false,
    isLocal: false,
    isVoice: false,
    order: 7,
  },
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ গ্রুপ
 */
export const SEO_RANKING_TYPE_GROUPS = {
  SEARCH: [SEO_RANKING_TYPE.ORGANIC, SEO_RANKING_TYPE.LOCAL, SEO_RANKING_TYPE.MOBILE] as const,
  EMERGING: [SEO_RANKING_TYPE.VOICE] as const,
  MEDIA: [SEO_RANKING_TYPE.VIDEO, SEO_RANKING_TYPE.IMAGE] as const,
  SPECIALIZED: [SEO_RANKING_TYPE.NEWS, SEO_RANKING_TYPE.SHOPPING] as const,
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ গ্রুপ লেবেল
 */
export const SEO_RANKING_TYPE_GROUP_LABELS = {
  SEARCH: 'Search Engine Results',
  EMERGING: 'Emerging Search',
  MEDIA: 'Media Search',
  SPECIALIZED: 'Specialized Search',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ গ্রুপ কালার
 */
export const SEO_RANKING_TYPE_GROUP_COLORS = {
  SEARCH: '#22c55e',
  EMERGING: '#8b5cf6',
  MEDIA: '#dc2626',
  SPECIALIZED: '#f59e0b',
} as const;
