/**
 * SEO স্ট্র্যাটেজি ডিফল্ট ফোকাস
 */
export const SEO_STRATEGY_DEFAULT_FOCUS = 'organic-traffic' as const;

/**
 * ন্যূনতম গোল সংখ্যা
 */
export const SEO_STRATEGY_MIN_GOALS = 1 as const;

/**
 * সর্বোচ্চ গোল সংখ্যা
 */
export const SEO_STRATEGY_MAX_GOALS = 10 as const;

/**
 * ডিফল্ট টাইমফ্রেম (৩০ দিন)
 */
export const SEO_STRATEGY_DEFAULT_TIMEFRAME = 30 as const; // 30 days

/**
 * SEO স্ট্র্যাটেজি ফোকাস এনাম
 */
export const SEO_STRATEGY_FOCUS = {
  ORGANIC_TRAFFIC: 'organic-traffic',
  KEYWORD_RANKINGS: 'keyword-rankings',
  CONVERSION_RATE: 'conversion-rate',
  BRAND_VISIBILITY: 'brand-visibility',
  CONTENT_ENGAGEMENT: 'content-engagement',
  BACKLINK_GROWTH: 'backlink-growth',
  LOCAL_SEO: 'local-seo',
  TECHNICAL_SEO: 'technical-seo',
} as const;

/**
 * SEO_STRATEGY_FOCUS থেকে টাইপ
 */
export type SEOStrategyFocus = (typeof SEO_STRATEGY_FOCUS)[keyof typeof SEO_STRATEGY_FOCUS];

/**
 * SEO স্ট্র্যাটেজি ফোকাস লেবেল
 */
export const SEO_STRATEGY_FOCUS_LABELS: Record<SEOStrategyFocus, string> = {
  [SEO_STRATEGY_FOCUS.ORGANIC_TRAFFIC]: 'Organic Traffic',
  [SEO_STRATEGY_FOCUS.KEYWORD_RANKINGS]: 'Keyword Rankings',
  [SEO_STRATEGY_FOCUS.CONVERSION_RATE]: 'Conversion Rate',
  [SEO_STRATEGY_FOCUS.BRAND_VISIBILITY]: 'Brand Visibility',
  [SEO_STRATEGY_FOCUS.CONTENT_ENGAGEMENT]: 'Content Engagement',
  [SEO_STRATEGY_FOCUS.BACKLINK_GROWTH]: 'Backlink Growth',
  [SEO_STRATEGY_FOCUS.LOCAL_SEO]: 'Local SEO',
  [SEO_STRATEGY_FOCUS.TECHNICAL_SEO]: 'Technical SEO',
} as const;

/**
 * SEO স্ট্র্যাটেজি ফোকাস বিবরণ
 */
export const SEO_STRATEGY_FOCUS_DESCRIPTIONS: Record<SEOStrategyFocus, string> = {
  [SEO_STRATEGY_FOCUS.ORGANIC_TRAFFIC]: 'Focus on increasing overall organic search traffic',
  [SEO_STRATEGY_FOCUS.KEYWORD_RANKINGS]: 'Focus on improving keyword rankings for target terms',
  [SEO_STRATEGY_FOCUS.CONVERSION_RATE]: 'Focus on improving conversion rates from organic traffic',
  [SEO_STRATEGY_FOCUS.BRAND_VISIBILITY]: 'Focus on increasing brand visibility and awareness',
  [SEO_STRATEGY_FOCUS.CONTENT_ENGAGEMENT]: 'Focus on improving content engagement metrics',
  [SEO_STRATEGY_FOCUS.BACKLINK_GROWTH]: 'Focus on building high-quality backlinks',
  [SEO_STRATEGY_FOCUS.LOCAL_SEO]: 'Focus on local search optimization',
  [SEO_STRATEGY_FOCUS.TECHNICAL_SEO]: 'Focus on technical SEO improvements',
} as const;

/**
 * SEO স্ট্র্যাটেজি ফোকাস আইকন
 */
export const SEO_STRATEGY_FOCUS_ICONS: Record<SEOStrategyFocus, string> = {
  [SEO_STRATEGY_FOCUS.ORGANIC_TRAFFIC]: '📊',
  [SEO_STRATEGY_FOCUS.KEYWORD_RANKINGS]: '🎯',
  [SEO_STRATEGY_FOCUS.CONVERSION_RATE]: '📈',
  [SEO_STRATEGY_FOCUS.BRAND_VISIBILITY]: '🏷️',
  [SEO_STRATEGY_FOCUS.CONTENT_ENGAGEMENT]: '💬',
  [SEO_STRATEGY_FOCUS.BACKLINK_GROWTH]: '🔗',
  [SEO_STRATEGY_FOCUS.LOCAL_SEO]: '📍',
  [SEO_STRATEGY_FOCUS.TECHNICAL_SEO]: '⚙️',
} as const;

/**
 * SEO স্ট্র্যাটেজি গোল
 */
export interface SEOStrategyGoal {
  id: string;
  title: string;
  description?: string;
  focus: SEOStrategyFocus;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  priority: number;
}

/**
 * SEO স্ট্র্যাটেজি কনফিগারেশন
 */
export interface SEOStrategyConfig {
  name: string;
  description?: string;
  focus: SEOStrategyFocus;
  goals: SEOStrategyGoal[];
  timeframe: number; // days
  budget?: number;
  teamSize?: number;
  startDate: Date;
  endDate: Date;
}

/**
 * SEO স্ট্র্যাটেজি রেসপন্স
 */
export interface SEOStrategyResponse {
  id: string;
  config: SEOStrategyConfig;
  status: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * SEO স্ট্র্যাটেজি ফিল্টার
 */
export interface SEOStrategyFilter {
  focus?: SEOStrategyFocus;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * SEO স্ট্র্যাটেজি ডিফল্ট কনফিগারেশন
 */
export const SEO_STRATEGY_DEFAULT_CONFIG: Partial<SEOStrategyConfig> = {
  timeframe: SEO_STRATEGY_DEFAULT_TIMEFRAME,
  goals: [],
} as const;

/**
 * SEO স্ট্র্যাটেজি ফোকাস গ্রুপ
 */
export const SEO_STRATEGY_FOCUS_GROUPS = {
  TRAFFIC: [SEO_STRATEGY_FOCUS.ORGANIC_TRAFFIC, SEO_STRATEGY_FOCUS.KEYWORD_RANKINGS] as const,
  CONVERSION: [SEO_STRATEGY_FOCUS.CONVERSION_RATE, SEO_STRATEGY_FOCUS.CONTENT_ENGAGEMENT] as const,
  AUTHORITY: [SEO_STRATEGY_FOCUS.BACKLINK_GROWTH, SEO_STRATEGY_FOCUS.BRAND_VISIBILITY] as const,
  TECHNICAL: [SEO_STRATEGY_FOCUS.TECHNICAL_SEO, SEO_STRATEGY_FOCUS.LOCAL_SEO] as const,
} as const;

/**
 * SEO স্ট্র্যাটেজি ফোকাস গ্রুপ লেবেল
 */
export const SEO_STRATEGY_FOCUS_GROUP_LABELS = {
  TRAFFIC: 'Traffic & Visibility',
  CONVERSION: 'Conversion & Engagement',
  AUTHORITY: 'Authority & Trust',
  TECHNICAL: 'Technical & Local',
} as const;
