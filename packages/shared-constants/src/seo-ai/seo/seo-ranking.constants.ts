/**
 * সর্বোচ্চ পজিশন (১০০)
 */
export const SEO_RANKING_MAX_POSITION = 100 as const;

/**
 * ট্র্যাকিং ইন্টারভাল (১ দিন)
 */
export const SEO_RANKING_TRACKING_INTERVAL = 1 as const; // 1 day

/**
 * ইমপ্রুভমেন্ট থ্রেশহোল্ড (৩ পজিশন)
 */
export const SEO_RANKING_IMPROVEMENT_THRESHOLD = 3 as const; // 3 positions

/**
 * SEO র‍্যাঙ্কিং টাইপ এনাম
 */
export const SEO_RANKING_TYPE = {
  ORGANIC: 'organic',
  PAID: 'paid',
  LOCAL: 'local',
  VIDEO: 'video',
  NEWS: 'news',
  IMAGE: 'image',
  SHOPPING: 'shopping',
  FEATURED_SNIPPET: 'featured-snippet',
  PEOPLE_ALSO_ASK: 'people-also-ask',
  KNOWLEDGE_PANEL: 'knowledge-panel',
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
  [SEO_RANKING_TYPE.PAID]: 'Paid Ranking',
  [SEO_RANKING_TYPE.LOCAL]: 'Local Ranking',
  [SEO_RANKING_TYPE.VIDEO]: 'Video Ranking',
  [SEO_RANKING_TYPE.NEWS]: 'News Ranking',
  [SEO_RANKING_TYPE.IMAGE]: 'Image Ranking',
  [SEO_RANKING_TYPE.SHOPPING]: 'Shopping Ranking',
  [SEO_RANKING_TYPE.FEATURED_SNIPPET]: 'Featured Snippet',
  [SEO_RANKING_TYPE.PEOPLE_ALSO_ASK]: 'People Also Ask',
  [SEO_RANKING_TYPE.KNOWLEDGE_PANEL]: 'Knowledge Panel',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ বিবরণ
 */
export const SEO_RANKING_TYPE_DESCRIPTIONS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: 'Standard organic search engine ranking',
  [SEO_RANKING_TYPE.PAID]: 'Paid advertisement ranking position',
  [SEO_RANKING_TYPE.LOCAL]: 'Local search results ranking',
  [SEO_RANKING_TYPE.VIDEO]: 'Video content ranking in search results',
  [SEO_RANKING_TYPE.NEWS]: 'News content ranking in search results',
  [SEO_RANKING_TYPE.IMAGE]: 'Image ranking in search results',
  [SEO_RANKING_TYPE.SHOPPING]: 'Shopping and product listing ranking',
  [SEO_RANKING_TYPE.FEATURED_SNIPPET]: 'Featured snippet position in search',
  [SEO_RANKING_TYPE.PEOPLE_ALSO_ASK]: 'People Also Ask box position',
  [SEO_RANKING_TYPE.KNOWLEDGE_PANEL]: 'Knowledge panel presence ranking',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ আইকন
 */
export const SEO_RANKING_TYPE_ICONS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: '🔍',
  [SEO_RANKING_TYPE.PAID]: '💰',
  [SEO_RANKING_TYPE.LOCAL]: '📍',
  [SEO_RANKING_TYPE.VIDEO]: '🎬',
  [SEO_RANKING_TYPE.NEWS]: '📰',
  [SEO_RANKING_TYPE.IMAGE]: '🖼️',
  [SEO_RANKING_TYPE.SHOPPING]: '🛒',
  [SEO_RANKING_TYPE.FEATURED_SNIPPET]: '📌',
  [SEO_RANKING_TYPE.PEOPLE_ALSO_ASK]: '❓',
  [SEO_RANKING_TYPE.KNOWLEDGE_PANEL]: '📋',
} as const;

/**
 * SEO র‍্যাঙ্কিং টাইপ কালার (হেক্স কোড)
 */
export const SEO_RANKING_TYPE_COLORS: Record<SEORankingType, string> = {
  [SEO_RANKING_TYPE.ORGANIC]: '#22c55e', // Green-500
  [SEO_RANKING_TYPE.PAID]: '#f59e0b', // Amber-500
  [SEO_RANKING_TYPE.LOCAL]: '#3b82f6', // Blue-500
  [SEO_RANKING_TYPE.VIDEO]: '#ec4899', // Pink-500
  [SEO_RANKING_TYPE.NEWS]: '#dc2626', // Red-600
  [SEO_RANKING_TYPE.IMAGE]: '#8b5cf6', // Violet-500
  [SEO_RANKING_TYPE.SHOPPING]: '#f97316', // Orange-500
  [SEO_RANKING_TYPE.FEATURED_SNIPPET]: '#06b6d4', // Cyan-500
  [SEO_RANKING_TYPE.PEOPLE_ALSO_ASK]: '#6366f1', // Indigo-500
  [SEO_RANKING_TYPE.KNOWLEDGE_PANEL]: '#94a3b8', // Slate-400
} as const;

/**
 * SEO র‍্যাঙ্কিং ক্যাটাগরি
 */
export const SEO_RANKING_CATEGORY = {
  TOP: 'top',
  FIRST_PAGE: 'first-page',
  SECOND_PAGE: 'second-page',
  THIRD_PAGE: 'third-page',
  BEYOND: 'beyond',
} as const;

/**
 * SEO_RANKING_CATEGORY থেকে টাইপ
 */
export type SEORankingCategory = (typeof SEO_RANKING_CATEGORY)[keyof typeof SEO_RANKING_CATEGORY];

/**
 * SEO র‍্যাঙ্কিং ক্যাটাগরি লেবেল
 */
export const SEO_RANKING_CATEGORY_LABELS: Record<SEORankingCategory, string> = {
  [SEO_RANKING_CATEGORY.TOP]: 'Top 3',
  [SEO_RANKING_CATEGORY.FIRST_PAGE]: 'First Page',
  [SEO_RANKING_CATEGORY.SECOND_PAGE]: 'Second Page',
  [SEO_RANKING_CATEGORY.THIRD_PAGE]: 'Third Page',
  [SEO_RANKING_CATEGORY.BEYOND]: 'Beyond Third Page',
} as const;

/**
 * SEO র‍্যাঙ্কিং ক্যাটাগরি থ্রেশহোল্ড
 */
export const SEO_RANKING_CATEGORY_THRESHOLDS: Record<SEORankingCategory, number> = {
  [SEO_RANKING_CATEGORY.TOP]: 3,
  [SEO_RANKING_CATEGORY.FIRST_PAGE]: 10,
  [SEO_RANKING_CATEGORY.SECOND_PAGE]: 20,
  [SEO_RANKING_CATEGORY.THIRD_PAGE]: 30,
  [SEO_RANKING_CATEGORY.BEYOND]: 31,
} as const;

/**
 * SEO র‍্যাঙ্কিং ট্রেন্ড
 */
export const SEO_RANKING_TREND = {
  IMPROVING: 'improving',
  DECLINING: 'declining',
  STABLE: 'stable',
  VOLATILE: 'volatile',
} as const;

/**
 * SEO_RANKING_TREND থেকে টাইপ
 */
export type SEORankingTrend = (typeof SEO_RANKING_TREND)[keyof typeof SEO_RANKING_TREND];

/**
 * SEO র‍্যাঙ্কিং ট্রেন্ড লেবেল
 */
export const SEO_RANKING_TREND_LABELS: Record<SEORankingTrend, string> = {
  [SEO_RANKING_TREND.IMPROVING]: 'Improving',
  [SEO_RANKING_TREND.DECLINING]: 'Declining',
  [SEO_RANKING_TREND.STABLE]: 'Stable',
  [SEO_RANKING_TREND.VOLATILE]: 'Volatile',
} as const;

/**
 * SEO র‍্যাঙ্কিং ট্রেন্ড আইকন
 */
export const SEO_RANKING_TREND_ICONS: Record<SEORankingTrend, string> = {
  [SEO_RANKING_TREND.IMPROVING]: '📈',
  [SEO_RANKING_TREND.DECLINING]: '📉',
  [SEO_RANKING_TREND.STABLE]: '➡️',
  [SEO_RANKING_TREND.VOLATILE]: '📊',
} as const;

/**
 * SEO র‍্যাঙ্কিং ট্রেন্ড কালার
 */
export const SEO_RANKING_TREND_COLORS: Record<SEORankingTrend, string> = {
  [SEO_RANKING_TREND.IMPROVING]: '#22c55e', // Green-500
  [SEO_RANKING_TREND.DECLINING]: '#dc2626', // Red-600
  [SEO_RANKING_TREND.STABLE]: '#3b82f6', // Blue-500
  [SEO_RANKING_TREND.VOLATILE]: '#f59e0b', // Amber-500
} as const;

/**
 * SEO র‍্যাঙ্কিং কনফিগারেশন
 */
export interface SEORankingConfig {
  maxPosition: number;
  trackingInterval: number; // days
  improvementThreshold: number; // positions
  enableTracking: boolean;
  enableAlerts: boolean;
  enableHistory: boolean;
}

/**
 * SEO র‍্যাঙ্কিং ডিফল্ট কনফিগারেশন
 */
export const SEO_RANKING_DEFAULT_CONFIG: SEORankingConfig = {
  maxPosition: SEO_RANKING_MAX_POSITION,
  trackingInterval: SEO_RANKING_TRACKING_INTERVAL,
  improvementThreshold: SEO_RANKING_IMPROVEMENT_THRESHOLD,
  enableTracking: true,
  enableAlerts: true,
  enableHistory: true,
} as const;

/**
 * SEO র‍্যাঙ্কিং ডেটা
 */
export interface SEORankingData {
  keyword: string;
  position: number;
  previousPosition?: number;
  type: SEORankingType;
  category: SEORankingCategory;
  trend: SEORankingTrend;
  url: string;
  trackedAt: Date;
}

/**
 * SEO র‍্যাঙ্কিং হিস্টোরি
 */
export interface SEORankingHistory {
  keyword: string;
  positions: Array<{
    position: number;
    trackedAt: Date;
  }>;
  averagePosition: number;
  bestPosition: number;
  worstPosition: number;
  trend: SEORankingTrend;
}

/**
 * SEO র‍্যাঙ্কিং ফিল্টার
 */
export interface SEORankingFilter {
  keyword?: string;
  type?: SEORankingType;
  category?: SEORankingCategory;
  trend?: SEORankingTrend;
  minPosition?: number;
  maxPosition?: number;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * SEO র‍্যাঙ্কিং রেসপন্স
 */
export interface SEORankingResponse {
  data: SEORankingData[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
