/**
 * SEO Ranking Constants
 * Configuration for SEO rankings, positions, and tracking
 */

export const SEO_RANKING = {
  // Ranking Types
  TYPES: {
    ORGANIC: 'organic',
    PAID: 'paid',
    LOCAL: 'local',
    VIDEO: 'video',
    IMAGE: 'image',
    NEWS: 'news',
    SHOPPING: 'shopping',
    FEATURED_SNIPPET: 'featured_snippet',
    PEOPLE_ALSO_ASK: 'people_also_ask',
    LOCAL_PACK: 'local_pack',
    KNOWLEDGE_PANEL: 'knowledge_panel',
    SITELINKS: 'sitelinks',
    REVIEW_SNIPPET: 'review_snippet',
    VIDEO_CAROUSEL: 'video_carousel',
    IMAGE_PACK: 'image_pack',
    NEWS_PACK: 'news_pack',
  } as const,

  // Ranking Status
  STATUS: {
    TRACKING: 'tracking',
    NOT_TRACKING: 'not_tracking',
    IMPROVING: 'improving',
    DECLINING: 'declining',
    STABLE: 'stable',
    VOLATILE: 'volatile',
    NEW: 'new',
    LOST: 'lost',
    ARCHIVED: 'archived',
    PAUSED: 'paused',
  } as const,

  // Ranking Positions
  POSITIONS: {
    POSITION_1: 1,
    POSITION_2: 2,
    POSITION_3: 3,
    POSITION_4: 4,
    POSITION_5: 5,
    POSITION_6: 6,
    POSITION_7: 7,
    POSITION_8: 8,
    POSITION_9: 9,
    POSITION_10: 10,
    POSITION_11_20: '11-20',
    POSITION_21_50: '21-50',
    POSITION_51_100: '51-100',
    POSITION_100_PLUS: '100+',
    NOT_RANKING: 'not_ranking',
  } as const,

  // Ranking Position Categories
  POSITION_CATEGORIES: {
    TOP_3: 'top_3',
    TOP_5: 'top_5',
    TOP_10: 'top_10',
    FIRST_PAGE: 'first_page',
    SECOND_PAGE: 'second_page',
    THIRD_PAGE: 'third_page',
    BEYOND: 'beyond',
  } as const,

  // Ranking Score Ranges
  SCORE_RANGES: {
    POOR: [0, 20],
    FAIR: [21, 40],
    GOOD: [41, 60],
    EXCELLENT: [61, 80],
    OUTSTANDING: [81, 100],
  } as const,

  // Ranking Factors
  FACTORS: {
    DOMAIN_AUTHORITY: 'domain_authority',
    PAGE_AUTHORITY: 'page_authority',
    BACKLINK_COUNT: 'backlink_count',
    REFERRING_DOMAINS: 'referring_domains',
    CONTENT_QUALITY: 'content_quality',
    KEYWORD_RELEVANCE: 'keyword_relevance',
    USER_EXPERIENCE: 'user_experience',
    PAGE_SPEED: 'page_speed',
    MOBILE_FRIENDLY: 'mobile_friendly',
    HTTPS: 'https',
    SOCIAL_SIGNALS: 'social_signals',
    BRAND_AUTHORITY: 'brand_authority',
    CONTENT_FRESHNESS: 'content_freshness',
    USER_ENGAGEMENT: 'user_engagement',
    CLICK_THROUGH_RATE: 'click_through_rate',
    BOUNCE_RATE: 'bounce_rate',
    DWELL_TIME: 'dwell_time',
  } as const,

  // Ranking Difficulty
  DIFFICULTY: {
    VERY_EASY: 'very_easy',
    EASY: 'easy',
    MODERATE: 'moderate',
    HARD: 'hard',
    VERY_HARD: 'very_hard',
    COMPETITIVE: 'competitive',
  } as const,

  // Ranking Velocity
  VELOCITY: {
    FAST_UP: 'fast_up',
    SLOW_UP: 'slow_up',
    STABLE: 'stable',
    SLOW_DOWN: 'slow_down',
    FAST_DOWN: 'fast_down',
    VOLATILE: 'volatile',
  } as const,

  // Ranking Metrics
  METRICS: {
    AVERAGE_POSITION: 'average_position',
    BEST_POSITION: 'best_position',
    WORST_POSITION: 'worst_position',
    POSITION_CHANGE: 'position_change',
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    CLICK_THROUGH_RATE: 'click_through_rate',
    SEARCH_VOLUME: 'search_volume',
    COMPETITION: 'competition',
    ESTIMATED_TRAFFIC: 'estimated_traffic',
    ESTIMATED_VALUE: 'estimated_value',
    VISIBILITY: 'visibility',
    SHARE_OF_VOICE: 'share_of_voice',
  } as const,

  // Ranking Sources
  SOURCES: {
    GOOGLE: 'google',
    BING: 'bing',
    YANDEX: 'yandex',
    BAIDU: 'baidu',
    YAHOO: 'yahoo',
    DUCKDUCKGO: 'duckduckgo',
    ECOSIA: 'ecosia',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    GOOGLE_SEARCH_CONSOLE: 'google_search_console',
  } as const,

  // Ranking Frequency
  FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    REAL_TIME: 'real_time',
    ON_DEMAND: 'on_demand',
  } as const,
} as const;

// Ranking Types
export type SEORankingType = (typeof SEO_RANKING.TYPES)[keyof typeof SEO_RANKING.TYPES];

// Ranking Status
export type SEORankingStatus = (typeof SEO_RANKING.STATUS)[keyof typeof SEO_RANKING.STATUS];

// Ranking Positions
export type SEORankingPosition = (typeof SEO_RANKING.POSITIONS)[keyof typeof SEO_RANKING.POSITIONS];

// Position Categories
export type SEORankingPositionCategory =
  (typeof SEO_RANKING.POSITION_CATEGORIES)[keyof typeof SEO_RANKING.POSITION_CATEGORIES];

// Score Ranges
export type SEORankingScoreRange =
  (typeof SEO_RANKING.SCORE_RANGES)[keyof typeof SEO_RANKING.SCORE_RANGES];

// Ranking Factors
export type SEORankingFactor = (typeof SEO_RANKING.FACTORS)[keyof typeof SEO_RANKING.FACTORS];

// Ranking Difficulty
export type SEORankingDifficulty =
  (typeof SEO_RANKING.DIFFICULTY)[keyof typeof SEO_RANKING.DIFFICULTY];

// Ranking Velocity
export type SEORankingVelocity = (typeof SEO_RANKING.VELOCITY)[keyof typeof SEO_RANKING.VELOCITY];

// Ranking Metrics
export type SEORankingMetric = (typeof SEO_RANKING.METRICS)[keyof typeof SEO_RANKING.METRICS];

// Ranking Sources
export type SEORankingSource = (typeof SEO_RANKING.SOURCES)[keyof typeof SEO_RANKING.SOURCES];

// Ranking Frequency
export type SEORankingFrequency =
  (typeof SEO_RANKING.FREQUENCY)[keyof typeof SEO_RANKING.FREQUENCY];

// Utility Functions
export function getSEORankingTypeLabel(type: SEORankingType): string {
  const labels: Record<SEORankingType, string> = {
    [SEO_RANKING.TYPES.ORGANIC]: 'Organic Ranking',
    [SEO_RANKING.TYPES.PAID]: 'Paid Ranking',
    [SEO_RANKING.TYPES.LOCAL]: 'Local Ranking',
    [SEO_RANKING.TYPES.VIDEO]: 'Video Ranking',
    [SEO_RANKING.TYPES.IMAGE]: 'Image Ranking',
    [SEO_RANKING.TYPES.NEWS]: 'News Ranking',
    [SEO_RANKING.TYPES.SHOPPING]: 'Shopping Ranking',
    [SEO_RANKING.TYPES.FEATURED_SNIPPET]: 'Featured Snippet',
    [SEO_RANKING.TYPES.PEOPLE_ALSO_ASK]: 'People Also Ask',
    [SEO_RANKING.TYPES.LOCAL_PACK]: 'Local Pack',
    [SEO_RANKING.TYPES.KNOWLEDGE_PANEL]: 'Knowledge Panel',
    [SEO_RANKING.TYPES.SITELINKS]: 'Sitelinks',
    [SEO_RANKING.TYPES.REVIEW_SNIPPET]: 'Review Snippet',
    [SEO_RANKING.TYPES.VIDEO_CAROUSEL]: 'Video Carousel',
    [SEO_RANKING.TYPES.IMAGE_PACK]: 'Image Pack',
    [SEO_RANKING.TYPES.NEWS_PACK]: 'News Pack',
  };
  return labels[type] || 'Unknown Ranking Type';
}

export function getSEORankingStatusLabel(status: SEORankingStatus): string {
  const labels: Record<SEORankingStatus, string> = {
    [SEO_RANKING.STATUS.TRACKING]: 'Tracking',
    [SEO_RANKING.STATUS.NOT_TRACKING]: 'Not Tracking',
    [SEO_RANKING.STATUS.IMPROVING]: 'Improving',
    [SEO_RANKING.STATUS.DECLINING]: 'Declining',
    [SEO_RANKING.STATUS.STABLE]: 'Stable',
    [SEO_RANKING.STATUS.VOLATILE]: 'Volatile',
    [SEO_RANKING.STATUS.NEW]: 'New',
    [SEO_RANKING.STATUS.LOST]: 'Lost',
    [SEO_RANKING.STATUS.ARCHIVED]: 'Archived',
    [SEO_RANKING.STATUS.PAUSED]: 'Paused',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEORankingPositionLabel(position: SEORankingPosition): string {
  const labels: Record<SEORankingPosition, string> = {
    [SEO_RANKING.POSITIONS.POSITION_1]: '#1',
    [SEO_RANKING.POSITIONS.POSITION_2]: '#2',
    [SEO_RANKING.POSITIONS.POSITION_3]: '#3',
    [SEO_RANKING.POSITIONS.POSITION_4]: '#4',
    [SEO_RANKING.POSITIONS.POSITION_5]: '#5',
    [SEO_RANKING.POSITIONS.POSITION_6]: '#6',
    [SEO_RANKING.POSITIONS.POSITION_7]: '#7',
    [SEO_RANKING.POSITIONS.POSITION_8]: '#8',
    [SEO_RANKING.POSITIONS.POSITION_9]: '#9',
    [SEO_RANKING.POSITIONS.POSITION_10]: '#10',
    [SEO_RANKING.POSITIONS.POSITION_11_20]: '11-20',
    [SEO_RANKING.POSITIONS.POSITION_21_50]: '21-50',
    [SEO_RANKING.POSITIONS.POSITION_51_100]: '51-100',
    [SEO_RANKING.POSITIONS.POSITION_100_PLUS]: '100+',
    [SEO_RANKING.POSITIONS.NOT_RANKING]: 'Not Ranking',
  };
  return labels[position] || 'Unknown Position';
}

export function getSEORankingPositionCategory(position: number): SEORankingPositionCategory {
  if (position <= 3) return SEO_RANKING.POSITION_CATEGORIES.TOP_3;
  if (position <= 5) return SEO_RANKING.POSITION_CATEGORIES.TOP_5;
  if (position <= 10) return SEO_RANKING.POSITION_CATEGORIES.TOP_10;
  if (position <= 10) return SEO_RANKING.POSITION_CATEGORIES.FIRST_PAGE;
  if (position <= 20) return SEO_RANKING.POSITION_CATEGORIES.SECOND_PAGE;
  if (position <= 30) return SEO_RANKING.POSITION_CATEGORIES.THIRD_PAGE;
  return SEO_RANKING.POSITION_CATEGORIES.BEYOND;
}

export function getSEORankingDifficultyLabel(difficulty: SEORankingDifficulty): string {
  const labels: Record<SEORankingDifficulty, string> = {
    [SEO_RANKING.DIFFICULTY.VERY_EASY]: 'Very Easy',
    [SEO_RANKING.DIFFICULTY.EASY]: 'Easy',
    [SEO_RANKING.DIFFICULTY.MODERATE]: 'Moderate',
    [SEO_RANKING.DIFFICULTY.HARD]: 'Hard',
    [SEO_RANKING.DIFFICULTY.VERY_HARD]: 'Very Hard',
    [SEO_RANKING.DIFFICULTY.COMPETITIVE]: 'Competitive',
  };
  return labels[difficulty] || 'Unknown Difficulty';
}

export function getSEORankingVelocityLabel(velocity: SEORankingVelocity): string {
  const labels: Record<SEORankingVelocity, string> = {
    [SEO_RANKING.VELOCITY.FAST_UP]: 'Fast Upward',
    [SEO_RANKING.VELOCITY.SLOW_UP]: 'Slow Upward',
    [SEO_RANKING.VELOCITY.STABLE]: 'Stable',
    [SEO_RANKING.VELOCITY.SLOW_DOWN]: 'Slow Downward',
    [SEO_RANKING.VELOCITY.FAST_DOWN]: 'Fast Downward',
    [SEO_RANKING.VELOCITY.VOLATILE]: 'Volatile',
  };
  return labels[velocity] || 'Unknown Velocity';
}

export function getSEORankingScoreLabel(score: number): string {
  if (score >= 81) return 'Outstanding';
  if (score >= 61) return 'Excellent';
  if (score >= 41) return 'Good';
  if (score >= 21) return 'Fair';
  return 'Poor';
}

export function getSEORankingScoreColor(score: number): string {
  if (score >= 81) return '#4CAF50';
  if (score >= 61) return '#8BC34A';
  if (score >= 41) return '#FFC107';
  if (score >= 21) return '#FF9800';
  return '#F44336';
}

export function getSEORankingSourceLabel(source: SEORankingSource): string {
  const labels: Record<SEORankingSource, string> = {
    [SEO_RANKING.SOURCES.GOOGLE]: 'Google',
    [SEO_RANKING.SOURCES.BING]: 'Bing',
    [SEO_RANKING.SOURCES.YANDEX]: 'Yandex',
    [SEO_RANKING.SOURCES.BAIDU]: 'Baidu',
    [SEO_RANKING.SOURCES.YAHOO]: 'Yahoo',
    [SEO_RANKING.SOURCES.DUCKDUCKGO]: 'DuckDuckGo',
    [SEO_RANKING.SOURCES.ECOSIA]: 'Ecosia',
    [SEO_RANKING.SOURCES.SEMRUSH]: 'SEMrush',
    [SEO_RANKING.SOURCES.AHREFS]: 'Ahrefs',
    [SEO_RANKING.SOURCES.MOZ]: 'Moz',
    [SEO_RANKING.SOURCES.GOOGLE_SEARCH_CONSOLE]: 'Google Search Console',
  };
  return labels[source] || 'Unknown Source';
}

export function getSEORankingFrequencyLabel(frequency: SEORankingFrequency): string {
  const labels: Record<SEORankingFrequency, string> = {
    [SEO_RANKING.FREQUENCY.DAILY]: 'Daily',
    [SEO_RANKING.FREQUENCY.WEEKLY]: 'Weekly',
    [SEO_RANKING.FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
    [SEO_RANKING.FREQUENCY.MONTHLY]: 'Monthly',
    [SEO_RANKING.FREQUENCY.QUARTERLY]: 'Quarterly',
    [SEO_RANKING.FREQUENCY.REAL_TIME]: 'Real-Time',
    [SEO_RANKING.FREQUENCY.ON_DEMAND]: 'On-Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function getRankingStatusColor(status: SEORankingStatus): string {
  const colors: Record<SEORankingStatus, string> = {
    [SEO_RANKING.STATUS.TRACKING]: '#4CAF50',
    [SEO_RANKING.STATUS.NOT_TRACKING]: '#9E9E9E',
    [SEO_RANKING.STATUS.IMPROVING]: '#8BC34A',
    [SEO_RANKING.STATUS.DECLINING]: '#F44336',
    [SEO_RANKING.STATUS.STABLE]: '#2196F3',
    [SEO_RANKING.STATUS.VOLATILE]: '#FF9800',
    [SEO_RANKING.STATUS.NEW]: '#00BCD4',
    [SEO_RANKING.STATUS.LOST]: '#D32F2F',
    [SEO_RANKING.STATUS.ARCHIVED]: '#9E9E9E',
    [SEO_RANKING.STATUS.PAUSED]: '#FFC107',
  };
  return colors[status] || '#9E9E9E';
}

export function isRankingImproving(status: SEORankingStatus): boolean {
  return status === SEO_RANKING.STATUS.IMPROVING || status === SEO_RANKING.STATUS.TRACKING;
}

export function isRankingDeclining(status: SEORankingStatus): boolean {
  return status === SEO_RANKING.STATUS.DECLINING || status === SEO_RANKING.STATUS.LOST;
}

export function getPositionChange(pos1: number, pos2: number): number {
  return pos1 - pos2;
}
