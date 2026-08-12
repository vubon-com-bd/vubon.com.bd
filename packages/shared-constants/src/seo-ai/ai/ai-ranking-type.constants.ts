/**
 * AI র্যাঙ্কিং টাইপ এনাম
 */
export const AI_RANKING_TYPE = {
  RELEVANCE: 'relevance',
  POPULARITY: 'popularity',
  ENGAGEMENT: 'engagement',
  FRESHNESS: 'freshness',
  DIVERSITY: 'diversity',
  PERSONALIZED: 'personalized',
  TRENDING: 'trending',
  TOP: 'top',
  RECOMMENDED: 'recommended',
} as const;

/**
 * AI_RANKING_TYPE থেকে টাইপ
 */
export type AIRankingTypeType = (typeof AI_RANKING_TYPE)[keyof typeof AI_RANKING_TYPE];

/**
 * র্যাঙ্কিং টাইপ লেবেল
 */
export const AI_RANKING_TYPE_LABELS: Record<AIRankingTypeType, string> = {
  [AI_RANKING_TYPE.RELEVANCE]: 'Relevance',
  [AI_RANKING_TYPE.POPULARITY]: 'Popularity',
  [AI_RANKING_TYPE.ENGAGEMENT]: 'Engagement',
  [AI_RANKING_TYPE.FRESHNESS]: 'Freshness',
  [AI_RANKING_TYPE.DIVERSITY]: 'Diversity',
  [AI_RANKING_TYPE.PERSONALIZED]: 'Personalized',
  [AI_RANKING_TYPE.TRENDING]: 'Trending',
  [AI_RANKING_TYPE.TOP]: 'Top',
  [AI_RANKING_TYPE.RECOMMENDED]: 'Recommended',
} as const;

/**
 * র্যাঙ্কিং টাইপ বিবরণ
 */
export const AI_RANKING_TYPE_DESCRIPTIONS: Record<AIRankingTypeType, string> = {
  [AI_RANKING_TYPE.RELEVANCE]: 'Ranks items based on relevance to the query or context',
  [AI_RANKING_TYPE.POPULARITY]: 'Ranks items based on overall popularity and user interest',
  [AI_RANKING_TYPE.ENGAGEMENT]: 'Ranks items based on user engagement metrics',
  [AI_RANKING_TYPE.FRESHNESS]: 'Ranks items based on recency and timeliness',
  [AI_RANKING_TYPE.DIVERSITY]: 'Ranks items to ensure diversity in results',
  [AI_RANKING_TYPE.PERSONALIZED]: 'Ranks items based on individual user preferences',
  [AI_RANKING_TYPE.TRENDING]: 'Ranks items based on trending signals and momentum',
  [AI_RANKING_TYPE.TOP]: 'Ranks top-performing items across all metrics',
  [AI_RANKING_TYPE.RECOMMENDED]: 'Ranks items based on recommendation algorithms',
} as const;

/**
 * র্যাঙ্কিং টাইপ আইকন
 */
export const AI_RANKING_TYPE_ICONS: Record<AIRankingTypeType, string> = {
  [AI_RANKING_TYPE.RELEVANCE]: '🎯',
  [AI_RANKING_TYPE.POPULARITY]: '⭐',
  [AI_RANKING_TYPE.ENGAGEMENT]: '💬',
  [AI_RANKING_TYPE.FRESHNESS]: '🆕',
  [AI_RANKING_TYPE.DIVERSITY]: '🌈',
  [AI_RANKING_TYPE.PERSONALIZED]: '👤',
  [AI_RANKING_TYPE.TRENDING]: '📈',
  [AI_RANKING_TYPE.TOP]: '🏆',
  [AI_RANKING_TYPE.RECOMMENDED]: '💡',
} as const;

/**
 * র্যাঙ্কিং টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_RANKING_TYPE_COMPLEXITY: Record<AIRankingTypeType, number> = {
  [AI_RANKING_TYPE.RELEVANCE]: 3,
  [AI_RANKING_TYPE.POPULARITY]: 1,
  [AI_RANKING_TYPE.ENGAGEMENT]: 2,
  [AI_RANKING_TYPE.FRESHNESS]: 1,
  [AI_RANKING_TYPE.DIVERSITY]: 3,
  [AI_RANKING_TYPE.PERSONALIZED]: 4,
  [AI_RANKING_TYPE.TRENDING]: 3,
  [AI_RANKING_TYPE.TOP]: 2,
  [AI_RANKING_TYPE.RECOMMENDED]: 4,
} as const;

/**
 * র্যাঙ্কিং টাইপ পারফরম্যান্স স্কোর (০-১০০)
 */
export const AI_RANKING_TYPE_PERFORMANCE: Record<AIRankingTypeType, number> = {
  [AI_RANKING_TYPE.RELEVANCE]: 88,
  [AI_RANKING_TYPE.POPULARITY]: 75,
  [AI_RANKING_TYPE.ENGAGEMENT]: 80,
  [AI_RANKING_TYPE.FRESHNESS]: 70,
  [AI_RANKING_TYPE.DIVERSITY]: 78,
  [AI_RANKING_TYPE.PERSONALIZED]: 92,
  [AI_RANKING_TYPE.TRENDING]: 82,
  [AI_RANKING_TYPE.TOP]: 85,
  [AI_RANKING_TYPE.RECOMMENDED]: 90,
} as const;

/**
 * র্যাঙ্কিং টাইপ কনফিগারেশন
 */
export interface AIRankingTypeConfig {
  type: AIRankingTypeType;
  label: string;
  description: string;
  icon: string;
  complexity: number;
  performance: number;
  requiresUserData: boolean;
  requiresContext: boolean;
  isRealTime: boolean;
  updateFrequency: string;
}

/**
 * র্যাঙ্কিং টাইপ মেটাডেটা
 */
export const AI_RANKING_TYPE_METADATA: Record<AIRankingTypeType, AIRankingTypeConfig> = {
  [AI_RANKING_TYPE.RELEVANCE]: {
    type: AI_RANKING_TYPE.RELEVANCE,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.RELEVANCE],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.RELEVANCE],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.RELEVANCE],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.RELEVANCE],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.RELEVANCE],
    requiresUserData: false,
    requiresContext: true,
    isRealTime: true,
    updateFrequency: 'realtime',
  },
  [AI_RANKING_TYPE.POPULARITY]: {
    type: AI_RANKING_TYPE.POPULARITY,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.POPULARITY],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.POPULARITY],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.POPULARITY],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.POPULARITY],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.POPULARITY],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: false,
    updateFrequency: 'daily',
  },
  [AI_RANKING_TYPE.ENGAGEMENT]: {
    type: AI_RANKING_TYPE.ENGAGEMENT,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.ENGAGEMENT],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.ENGAGEMENT],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.ENGAGEMENT],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.ENGAGEMENT],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.ENGAGEMENT],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: false,
    updateFrequency: 'hourly',
  },
  [AI_RANKING_TYPE.FRESHNESS]: {
    type: AI_RANKING_TYPE.FRESHNESS,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.FRESHNESS],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.FRESHNESS],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.FRESHNESS],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.FRESHNESS],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.FRESHNESS],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: true,
    updateFrequency: 'realtime',
  },
  [AI_RANKING_TYPE.DIVERSITY]: {
    type: AI_RANKING_TYPE.DIVERSITY,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.DIVERSITY],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.DIVERSITY],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.DIVERSITY],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.DIVERSITY],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.DIVERSITY],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: false,
    updateFrequency: 'daily',
  },
  [AI_RANKING_TYPE.PERSONALIZED]: {
    type: AI_RANKING_TYPE.PERSONALIZED,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.PERSONALIZED],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.PERSONALIZED],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.PERSONALIZED],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.PERSONALIZED],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.PERSONALIZED],
    requiresUserData: true,
    requiresContext: true,
    isRealTime: true,
    updateFrequency: 'realtime',
  },
  [AI_RANKING_TYPE.TRENDING]: {
    type: AI_RANKING_TYPE.TRENDING,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.TRENDING],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.TRENDING],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.TRENDING],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.TRENDING],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.TRENDING],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: true,
    updateFrequency: 'hourly',
  },
  [AI_RANKING_TYPE.TOP]: {
    type: AI_RANKING_TYPE.TOP,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.TOP],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.TOP],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.TOP],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.TOP],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.TOP],
    requiresUserData: false,
    requiresContext: false,
    isRealTime: false,
    updateFrequency: 'weekly',
  },
  [AI_RANKING_TYPE.RECOMMENDED]: {
    type: AI_RANKING_TYPE.RECOMMENDED,
    label: AI_RANKING_TYPE_LABELS[AI_RANKING_TYPE.RECOMMENDED],
    description: AI_RANKING_TYPE_DESCRIPTIONS[AI_RANKING_TYPE.RECOMMENDED],
    icon: AI_RANKING_TYPE_ICONS[AI_RANKING_TYPE.RECOMMENDED],
    complexity: AI_RANKING_TYPE_COMPLEXITY[AI_RANKING_TYPE.RECOMMENDED],
    performance: AI_RANKING_TYPE_PERFORMANCE[AI_RANKING_TYPE.RECOMMENDED],
    requiresUserData: true,
    requiresContext: false,
    isRealTime: false,
    updateFrequency: 'daily',
  },
} as const;

/**
 * র্যাঙ্কিং টাইপ গ্রুপ
 */
export const AI_RANKING_TYPE_GROUPS = {
  CONTENT_BASED: [AI_RANKING_TYPE.RELEVANCE, AI_RANKING_TYPE.FRESHNESS] as const,
  POPULARITY_BASED: [
    AI_RANKING_TYPE.POPULARITY,
    AI_RANKING_TYPE.TOP,
    AI_RANKING_TYPE.TRENDING,
  ] as const,
  ENGAGEMENT_BASED: [AI_RANKING_TYPE.ENGAGEMENT] as const,
  USER_CENTRIC: [AI_RANKING_TYPE.PERSONALIZED, AI_RANKING_TYPE.RECOMMENDED] as const,
  QUALITY_BASED: [AI_RANKING_TYPE.DIVERSITY] as const,
} as const;

/**
 * র্যাঙ্কিং টাইপ গ্রুপ লেবেল
 */
export const AI_RANKING_TYPE_GROUP_LABELS = {
  CONTENT_BASED: 'Content Based',
  POPULARITY_BASED: 'Popularity Based',
  ENGAGEMENT_BASED: 'Engagement Based',
  USER_CENTRIC: 'User Centric',
  QUALITY_BASED: 'Quality Based',
} as const;
