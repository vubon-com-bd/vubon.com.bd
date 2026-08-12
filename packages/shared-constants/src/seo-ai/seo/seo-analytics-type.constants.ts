/**
 * SEO অ্যানালিটিক্স টাইপ এনাম
 */
export const SEO_ANALYTICS_TYPE = {
  TRAFFIC: 'traffic',
  RANKING: 'ranking',
  CONVERSION: 'conversion',
  ENGAGEMENT: 'engagement',
  BACKLINK: 'backlink',
  KEYWORD: 'keyword',
  CONTENT: 'content',
  TECHNICAL: 'technical',
  COMPETITOR: 'competitor',
} as const;

/**
 * SEO_ANALYTICS_TYPE থেকে টাইপ
 */
export type SEOAnalyticsType = (typeof SEO_ANALYTICS_TYPE)[keyof typeof SEO_ANALYTICS_TYPE];

/**
 * SEO অ্যানালিটিক্স টাইপ লেবেল
 */
export const SEO_ANALYTICS_TYPE_LABELS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: 'Traffic Analytics',
  [SEO_ANALYTICS_TYPE.RANKING]: 'Ranking Analytics',
  [SEO_ANALYTICS_TYPE.CONVERSION]: 'Conversion Analytics',
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: 'Engagement Analytics',
  [SEO_ANALYTICS_TYPE.BACKLINK]: 'Backlink Analytics',
  [SEO_ANALYTICS_TYPE.KEYWORD]: 'Keyword Analytics',
  [SEO_ANALYTICS_TYPE.CONTENT]: 'Content Analytics',
  [SEO_ANALYTICS_TYPE.TECHNICAL]: 'Technical Analytics',
  [SEO_ANALYTICS_TYPE.COMPETITOR]: 'Competitor Analytics',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ বিবরণ
 */
export const SEO_ANALYTICS_TYPE_DESCRIPTIONS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]:
    'Website traffic analysis including visitors, sessions, and page views',
  [SEO_ANALYTICS_TYPE.RANKING]: 'Search engine ranking analysis for target keywords',
  [SEO_ANALYTICS_TYPE.CONVERSION]: 'Conversion rate and goal completion analysis',
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: 'User engagement metrics like bounce rate and session duration',
  [SEO_ANALYTICS_TYPE.BACKLINK]: 'Backlink profile analysis including quality and quantity',
  [SEO_ANALYTICS_TYPE.KEYWORD]: 'Keyword performance analysis including volume and difficulty',
  [SEO_ANALYTICS_TYPE.CONTENT]: 'Content performance analysis including views and engagement',
  [SEO_ANALYTICS_TYPE.TECHNICAL]: 'Technical SEO metrics including site speed and crawlability',
  [SEO_ANALYTICS_TYPE.COMPETITOR]: 'Competitor analysis and market positioning',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ আইকন
 */
export const SEO_ANALYTICS_TYPE_ICONS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: '📊',
  [SEO_ANALYTICS_TYPE.RANKING]: '🎯',
  [SEO_ANALYTICS_TYPE.CONVERSION]: '💰',
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: '💬',
  [SEO_ANALYTICS_TYPE.BACKLINK]: '🔗',
  [SEO_ANALYTICS_TYPE.KEYWORD]: '🔑',
  [SEO_ANALYTICS_TYPE.CONTENT]: '📝',
  [SEO_ANALYTICS_TYPE.TECHNICAL]: '⚙️',
  [SEO_ANALYTICS_TYPE.COMPETITOR]: '🏁',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ কালার (হেক্স কোড)
 */
export const SEO_ANALYTICS_TYPE_COLORS: Record<SEOAnalyticsType, string> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: '#3b82f6', // Blue-500
  [SEO_ANALYTICS_TYPE.RANKING]: '#8b5cf6', // Violet-500
  [SEO_ANALYTICS_TYPE.CONVERSION]: '#22c55e', // Green-500
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: '#f59e0b', // Amber-500
  [SEO_ANALYTICS_TYPE.BACKLINK]: '#06b6d4', // Cyan-500
  [SEO_ANALYTICS_TYPE.KEYWORD]: '#ec4899', // Pink-500
  [SEO_ANALYTICS_TYPE.CONTENT]: '#f97316', // Orange-500
  [SEO_ANALYTICS_TYPE.TECHNICAL]: '#dc2626', // Red-600
  [SEO_ANALYTICS_TYPE.COMPETITOR]: '#6366f1', // Indigo-500
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ প্রায়োরিটি (১ = সর্বোচ্চ)
 */
export const SEO_ANALYTICS_TYPE_PRIORITY: Record<SEOAnalyticsType, number> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: 1,
  [SEO_ANALYTICS_TYPE.RANKING]: 2,
  [SEO_ANALYTICS_TYPE.CONVERSION]: 3,
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: 4,
  [SEO_ANALYTICS_TYPE.BACKLINK]: 5,
  [SEO_ANALYTICS_TYPE.KEYWORD]: 6,
  [SEO_ANALYTICS_TYPE.CONTENT]: 7,
  [SEO_ANALYTICS_TYPE.TECHNICAL]: 8,
  [SEO_ANALYTICS_TYPE.COMPETITOR]: 9,
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ ক্যাটাগরি
 */
export const SEO_ANALYTICS_TYPE_CATEGORY = {
  PERFORMANCE: 'performance',
  TRAFFIC: 'traffic',
  QUALITY: 'quality',
  TECHNICAL: 'technical',
  MARKET: 'market',
} as const;

/**
 * SEO_ANALYTICS_TYPE_CATEGORY থেকে টাইপ
 */
export type SEOAnalyticsTypeCategory =
  (typeof SEO_ANALYTICS_TYPE_CATEGORY)[keyof typeof SEO_ANALYTICS_TYPE_CATEGORY];

/**
 * SEO অ্যানালিটিক্স টাইপ ক্যাটাগরি লেবেল
 */
export const SEO_ANALYTICS_TYPE_CATEGORY_LABELS: Record<SEOAnalyticsTypeCategory, string> = {
  [SEO_ANALYTICS_TYPE_CATEGORY.PERFORMANCE]: 'Performance',
  [SEO_ANALYTICS_TYPE_CATEGORY.TRAFFIC]: 'Traffic',
  [SEO_ANALYTICS_TYPE_CATEGORY.QUALITY]: 'Quality',
  [SEO_ANALYTICS_TYPE_CATEGORY.TECHNICAL]: 'Technical',
  [SEO_ANALYTICS_TYPE_CATEGORY.MARKET]: 'Market',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ ক্যাটাগরি ম্যাপিং
 */
export const SEO_ANALYTICS_TYPE_CATEGORY_MAP: Record<SEOAnalyticsType, SEOAnalyticsTypeCategory> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: SEO_ANALYTICS_TYPE_CATEGORY.TRAFFIC,
  [SEO_ANALYTICS_TYPE.RANKING]: SEO_ANALYTICS_TYPE_CATEGORY.PERFORMANCE,
  [SEO_ANALYTICS_TYPE.CONVERSION]: SEO_ANALYTICS_TYPE_CATEGORY.PERFORMANCE,
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: SEO_ANALYTICS_TYPE_CATEGORY.QUALITY,
  [SEO_ANALYTICS_TYPE.BACKLINK]: SEO_ANALYTICS_TYPE_CATEGORY.QUALITY,
  [SEO_ANALYTICS_TYPE.KEYWORD]: SEO_ANALYTICS_TYPE_CATEGORY.TRAFFIC,
  [SEO_ANALYTICS_TYPE.CONTENT]: SEO_ANALYTICS_TYPE_CATEGORY.QUALITY,
  [SEO_ANALYTICS_TYPE.TECHNICAL]: SEO_ANALYTICS_TYPE_CATEGORY.TECHNICAL,
  [SEO_ANALYTICS_TYPE.COMPETITOR]: SEO_ANALYTICS_TYPE_CATEGORY.MARKET,
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ কনফিগারেশন
 */
export interface SEOAnalyticsTypeConfig {
  type: SEOAnalyticsType;
  label: string;
  description: string;
  icon: string;
  color: string;
  priority: number;
  category: SEOAnalyticsTypeCategory;
  requiresData: boolean;
  requiresHistoricalData: boolean;
  updateFrequency: number; // hours
  order: number;
}

/**
 * SEO অ্যানালিটিক্স টাইপ মেটাডেটা
 */
export const SEO_ANALYTICS_TYPE_METADATA: Record<SEOAnalyticsType, SEOAnalyticsTypeConfig> = {
  [SEO_ANALYTICS_TYPE.TRAFFIC]: {
    type: SEO_ANALYTICS_TYPE.TRAFFIC,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.TRAFFIC],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.TRAFFIC],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.TRAFFIC],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.TRAFFIC],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.TRAFFIC],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.TRAFFIC],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 0,
  },
  [SEO_ANALYTICS_TYPE.RANKING]: {
    type: SEO_ANALYTICS_TYPE.RANKING,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.RANKING],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.RANKING],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.RANKING],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.RANKING],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.RANKING],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.RANKING],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 1,
  },
  [SEO_ANALYTICS_TYPE.CONVERSION]: {
    type: SEO_ANALYTICS_TYPE.CONVERSION,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.CONVERSION],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.CONVERSION],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.CONVERSION],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.CONVERSION],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.CONVERSION],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.CONVERSION],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 2,
  },
  [SEO_ANALYTICS_TYPE.ENGAGEMENT]: {
    type: SEO_ANALYTICS_TYPE.ENGAGEMENT,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.ENGAGEMENT],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 3,
  },
  [SEO_ANALYTICS_TYPE.BACKLINK]: {
    type: SEO_ANALYTICS_TYPE.BACKLINK,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.BACKLINK],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.BACKLINK],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.BACKLINK],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.BACKLINK],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.BACKLINK],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.BACKLINK],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 168,
    order: 4,
  },
  [SEO_ANALYTICS_TYPE.KEYWORD]: {
    type: SEO_ANALYTICS_TYPE.KEYWORD,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.KEYWORD],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.KEYWORD],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.KEYWORD],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.KEYWORD],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.KEYWORD],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.KEYWORD],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 5,
  },
  [SEO_ANALYTICS_TYPE.CONTENT]: {
    type: SEO_ANALYTICS_TYPE.CONTENT,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.CONTENT],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.CONTENT],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.CONTENT],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.CONTENT],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.CONTENT],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.CONTENT],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 6,
  },
  [SEO_ANALYTICS_TYPE.TECHNICAL]: {
    type: SEO_ANALYTICS_TYPE.TECHNICAL,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.TECHNICAL],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.TECHNICAL],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.TECHNICAL],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.TECHNICAL],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.TECHNICAL],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.TECHNICAL],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 24,
    order: 7,
  },
  [SEO_ANALYTICS_TYPE.COMPETITOR]: {
    type: SEO_ANALYTICS_TYPE.COMPETITOR,
    label: SEO_ANALYTICS_TYPE_LABELS[SEO_ANALYTICS_TYPE.COMPETITOR],
    description: SEO_ANALYTICS_TYPE_DESCRIPTIONS[SEO_ANALYTICS_TYPE.COMPETITOR],
    icon: SEO_ANALYTICS_TYPE_ICONS[SEO_ANALYTICS_TYPE.COMPETITOR],
    color: SEO_ANALYTICS_TYPE_COLORS[SEO_ANALYTICS_TYPE.COMPETITOR],
    priority: SEO_ANALYTICS_TYPE_PRIORITY[SEO_ANALYTICS_TYPE.COMPETITOR],
    category: SEO_ANALYTICS_TYPE_CATEGORY_MAP[SEO_ANALYTICS_TYPE.COMPETITOR],
    requiresData: true,
    requiresHistoricalData: true,
    updateFrequency: 168,
    order: 8,
  },
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ গ্রুপ
 */
export const SEO_ANALYTICS_TYPE_GROUPS = {
  PERFORMANCE: [SEO_ANALYTICS_TYPE.RANKING, SEO_ANALYTICS_TYPE.CONVERSION] as const,
  TRAFFIC: [SEO_ANALYTICS_TYPE.TRAFFIC, SEO_ANALYTICS_TYPE.KEYWORD] as const,
  QUALITY: [
    SEO_ANALYTICS_TYPE.ENGAGEMENT,
    SEO_ANALYTICS_TYPE.BACKLINK,
    SEO_ANALYTICS_TYPE.CONTENT,
  ] as const,
  TECHNICAL: [SEO_ANALYTICS_TYPE.TECHNICAL] as const,
  MARKET: [SEO_ANALYTICS_TYPE.COMPETITOR] as const,
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ গ্রুপ লেবেল
 */
export const SEO_ANALYTICS_TYPE_GROUP_LABELS = {
  PERFORMANCE: 'Performance Metrics',
  TRAFFIC: 'Traffic Metrics',
  QUALITY: 'Quality Metrics',
  TECHNICAL: 'Technical Metrics',
  MARKET: 'Market Metrics',
} as const;

/**
 * SEO অ্যানালিটিক্স টাইপ গ্রুপ কালার
 */
export const SEO_ANALYTICS_TYPE_GROUP_COLORS = {
  PERFORMANCE: '#22c55e',
  TRAFFIC: '#3b82f6',
  QUALITY: '#f59e0b',
  TECHNICAL: '#dc2626',
  MARKET: '#6366f1',
} as const;
