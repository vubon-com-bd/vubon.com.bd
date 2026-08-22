/**
 * SEO Keyword Constants
 * Configuration for keyword research, analysis, and optimization
 */

export const SEO_KEYWORD = {
  // Keyword Types
  TYPES: {
    HEAD: 'head',
    BODY: 'body',
    LONG_TAIL: 'long_tail',
    SHORT_TAIL: 'short_tail',
    SEASONAL: 'seasonal',
    TRENDING: 'trending',
    COMPETITOR: 'competitor',
    LSI: 'lsi',
    BRANDED: 'branded',
    NON_BRANDED: 'non_branded',
    PRODUCT: 'product',
    SERVICE: 'service',
    LOCATION: 'location',
    QUESTION: 'question',
    FEATURED_SNIPPET: 'featured_snippet',
  } as const,

  // Keyword Status
  STATUS: {
    DISCOVERED: 'discovered',
    RESEARCHING: 'researching',
    ANALYZING: 'analyzing',
    PRIORITIZED: 'prioritized',
    IN_PROGRESS: 'in_progress',
    OPTIMIZED: 'optimized',
    MONITORING: 'monitoring',
    SUCCESSFUL: 'successful',
    FAILED: 'failed',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,

  // Keyword Difficulty Levels
  DIFFICULTY: {
    VERY_EASY: 'very_easy',
    EASY: 'easy',
    MODERATE: 'moderate',
    HARD: 'hard',
    VERY_HARD: 'very_hard',
    COMPETITIVE: 'competitive',
  } as const,

  // Keyword Intent
  INTENT: {
    INFORMATIONAL: 'informational',
    NAVIGATIONAL: 'navigational',
    COMMERCIAL: 'commercial',
    TRANSACTIONAL: 'transactional',
    LOCAL: 'local',
    INVESTIGATIONAL: 'investigational',
  } as const,

  // Keyword Volume Ranges
  VOLUME_RANGES: {
    ZERO: [0, 0],
    VERY_LOW: [1, 50],
    LOW: [51, 200],
    MEDIUM: [201, 1000],
    HIGH: [1001, 5000],
    VERY_HIGH: [5001, 20000],
    EXTREME: [20001, Infinity],
  } as const,

  // Keyword Competition Levels
  COMPETITION: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // Keyword Priority Scores
  PRIORITY_SCORES: {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4,
    CRITICAL: 5,
  } as const,

  // Keyword Groups
  GROUPS: {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
    SUPPORTING: 'supporting',
    RELATED: 'related',
  } as const,

  // Keyword Match Types
  MATCH_TYPES: {
    EXACT: 'exact',
    PHRASE: 'phrase',
    BROAD: 'broad',
    MODIFIED_BROAD: 'modified_broad',
    BMM: 'bmm',
  } as const,

  // Keyword Research Sources
  SOURCES: {
    GOOGLE_KEYWORD_PLANNER: 'google_keyword_planner',
    SEMRUSH: 'semrush',
    AHREFS: 'ahrefs',
    MOZ: 'moz',
    UBERSUGGEST: 'ubersuggest',
    ANSWER_THE_PUBLIC: 'answer_the_public',
    GOOGLE_TRENDS: 'google_trends',
    GOOGLE_AUTOCOMPLETE: 'google_autocomplete',
    RELATED_SEARCHES: 'related_searches',
    COMPETITOR_ANALYSIS: 'competitor_analysis',
    SOCIAL_MEDIA: 'social_media',
    FORUMS: 'forums',
    Q_A_SITES: 'qa_sites',
  } as const,

  // Keyword Length Categories
  LENGTH_CATEGORIES: {
    SHORT: 'short', // 1-2 words
    MEDIUM: 'medium', // 3-4 words
    LONG: 'long', // 5-6 words
    VERY_LONG: 'very_long', // 7+ words
  } as const,

  // Keyword Value Metrics
  VALUE_METRICS: {
    SEARCH_VOLUME: 'search_volume',
    CPC: 'cpc',
    COMPETITION: 'competition',
    DIFFICULTY: 'difficulty',
    RELEVANCE: 'relevance',
    OPPORTUNITY: 'opportunity',
    EASE: 'ease',
    EFFICIENCY: 'efficiency',
  } as const,

  // Keyword Performance Metrics
  PERFORMANCE_METRICS: {
    IMPRESSIONS: 'impressions',
    CLICKS: 'clicks',
    CTR: 'ctr',
    AVERAGE_POSITION: 'average_position',
    CONVERSIONS: 'conversions',
    REVENUE: 'revenue',
    ROI: 'roi',
  } as const,
} as const;

// Keyword Types
export type SEOKeywordType = (typeof SEO_KEYWORD.TYPES)[keyof typeof SEO_KEYWORD.TYPES];

// Keyword Status
export type SEOKeywordStatus = (typeof SEO_KEYWORD.STATUS)[keyof typeof SEO_KEYWORD.STATUS];

// Keyword Difficulty
export type SEOKeywordDifficulty =
  (typeof SEO_KEYWORD.DIFFICULTY)[keyof typeof SEO_KEYWORD.DIFFICULTY];

// Keyword Intent
export type SEOKeywordIntent = (typeof SEO_KEYWORD.INTENT)[keyof typeof SEO_KEYWORD.INTENT];

// Keyword Volume Range
export type SEOKeywordVolumeRange =
  (typeof SEO_KEYWORD.VOLUME_RANGES)[keyof typeof SEO_KEYWORD.VOLUME_RANGES];

// Keyword Competition
export type SEOKeywordCompetition =
  (typeof SEO_KEYWORD.COMPETITION)[keyof typeof SEO_KEYWORD.COMPETITION];

// Keyword Priority Score
export type SEOKeywordPriorityScore =
  (typeof SEO_KEYWORD.PRIORITY_SCORES)[keyof typeof SEO_KEYWORD.PRIORITY_SCORES];

// Keyword Groups
export type SEOKeywordGroup = (typeof SEO_KEYWORD.GROUPS)[keyof typeof SEO_KEYWORD.GROUPS];

// Keyword Match Types
export type SEOKeywordMatchType =
  (typeof SEO_KEYWORD.MATCH_TYPES)[keyof typeof SEO_KEYWORD.MATCH_TYPES];

// Keyword Sources
export type SEOKeywordSource = (typeof SEO_KEYWORD.SOURCES)[keyof typeof SEO_KEYWORD.SOURCES];

// Keyword Length Categories
export type SEOKeywordLengthCategory =
  (typeof SEO_KEYWORD.LENGTH_CATEGORIES)[keyof typeof SEO_KEYWORD.LENGTH_CATEGORIES];

// Keyword Value Metrics
export type SEOKeywordValueMetric =
  (typeof SEO_KEYWORD.VALUE_METRICS)[keyof typeof SEO_KEYWORD.VALUE_METRICS];

// Keyword Performance Metrics
export type SEOKeywordPerformanceMetric =
  (typeof SEO_KEYWORD.PERFORMANCE_METRICS)[keyof typeof SEO_KEYWORD.PERFORMANCE_METRICS];

// Utility Functions
export function getSEOKeywordTypeLabel(type: SEOKeywordType): string {
  const labels: Record<SEOKeywordType, string> = {
    [SEO_KEYWORD.TYPES.HEAD]: 'Head Keyword',
    [SEO_KEYWORD.TYPES.BODY]: 'Body Keyword',
    [SEO_KEYWORD.TYPES.LONG_TAIL]: 'Long-tail Keyword',
    [SEO_KEYWORD.TYPES.SHORT_TAIL]: 'Short-tail Keyword',
    [SEO_KEYWORD.TYPES.SEASONAL]: 'Seasonal Keyword',
    [SEO_KEYWORD.TYPES.TRENDING]: 'Trending Keyword',
    [SEO_KEYWORD.TYPES.COMPETITOR]: 'Competitor Keyword',
    [SEO_KEYWORD.TYPES.LSI]: 'LSI Keyword',
    [SEO_KEYWORD.TYPES.BRANDED]: 'Branded Keyword',
    [SEO_KEYWORD.TYPES.NON_BRANDED]: 'Non-branded Keyword',
    [SEO_KEYWORD.TYPES.PRODUCT]: 'Product Keyword',
    [SEO_KEYWORD.TYPES.SERVICE]: 'Service Keyword',
    [SEO_KEYWORD.TYPES.LOCATION]: 'Location-based Keyword',
    [SEO_KEYWORD.TYPES.QUESTION]: 'Question Keyword',
    [SEO_KEYWORD.TYPES.FEATURED_SNIPPET]: 'Featured Snippet Keyword',
  };
  return labels[type] || 'Unknown Keyword Type';
}

export function getSEOKeywordStatusLabel(status: SEOKeywordStatus): string {
  const labels: Record<SEOKeywordStatus, string> = {
    [SEO_KEYWORD.STATUS.DISCOVERED]: 'Discovered',
    [SEO_KEYWORD.STATUS.RESEARCHING]: 'Researching',
    [SEO_KEYWORD.STATUS.ANALYZING]: 'Analyzing',
    [SEO_KEYWORD.STATUS.PRIORITIZED]: 'Prioritized',
    [SEO_KEYWORD.STATUS.IN_PROGRESS]: 'In Progress',
    [SEO_KEYWORD.STATUS.OPTIMIZED]: 'Optimized',
    [SEO_KEYWORD.STATUS.MONITORING]: 'Monitoring',
    [SEO_KEYWORD.STATUS.SUCCESSFUL]: 'Successful',
    [SEO_KEYWORD.STATUS.FAILED]: 'Failed',
    [SEO_KEYWORD.STATUS.DEPRECATED]: 'Deprecated',
    [SEO_KEYWORD.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOKeywordDifficultyLabel(difficulty: SEOKeywordDifficulty): string {
  const labels: Record<SEOKeywordDifficulty, string> = {
    [SEO_KEYWORD.DIFFICULTY.VERY_EASY]: 'Very Easy',
    [SEO_KEYWORD.DIFFICULTY.EASY]: 'Easy',
    [SEO_KEYWORD.DIFFICULTY.MODERATE]: 'Moderate',
    [SEO_KEYWORD.DIFFICULTY.HARD]: 'Hard',
    [SEO_KEYWORD.DIFFICULTY.VERY_HARD]: 'Very Hard',
    [SEO_KEYWORD.DIFFICULTY.COMPETITIVE]: 'Competitive',
  };
  return labels[difficulty] || 'Unknown Difficulty';
}

export function getSEOKeywordIntentLabel(intent: SEOKeywordIntent): string {
  const labels: Record<SEOKeywordIntent, string> = {
    [SEO_KEYWORD.INTENT.INFORMATIONAL]: 'Informational',
    [SEO_KEYWORD.INTENT.NAVIGATIONAL]: 'Navigational',
    [SEO_KEYWORD.INTENT.COMMERCIAL]: 'Commercial',
    [SEO_KEYWORD.INTENT.TRANSACTIONAL]: 'Transactional',
    [SEO_KEYWORD.INTENT.LOCAL]: 'Local',
    [SEO_KEYWORD.INTENT.INVESTIGATIONAL]: 'Investigational',
  };
  return labels[intent] || 'Unknown Intent';
}

export function getSEOKeywordCompetitionLabel(competition: SEOKeywordCompetition): string {
  const labels: Record<SEOKeywordCompetition, string> = {
    [SEO_KEYWORD.COMPETITION.VERY_LOW]: 'Very Low Competition',
    [SEO_KEYWORD.COMPETITION.LOW]: 'Low Competition',
    [SEO_KEYWORD.COMPETITION.MEDIUM]: 'Medium Competition',
    [SEO_KEYWORD.COMPETITION.HIGH]: 'High Competition',
    [SEO_KEYWORD.COMPETITION.VERY_HIGH]: 'Very High Competition',
  };
  return labels[competition] || 'Unknown Competition';
}

export function getSEOKeywordGroupLabel(group: SEOKeywordGroup): string {
  const labels: Record<SEOKeywordGroup, string> = {
    [SEO_KEYWORD.GROUPS.PRIMARY]: 'Primary Keywords',
    [SEO_KEYWORD.GROUPS.SECONDARY]: 'Secondary Keywords',
    [SEO_KEYWORD.GROUPS.TERTIARY]: 'Tertiary Keywords',
    [SEO_KEYWORD.GROUPS.SUPPORTING]: 'Supporting Keywords',
    [SEO_KEYWORD.GROUPS.RELATED]: 'Related Keywords',
  };
  return labels[group] || 'Unknown Group';
}

export function getSEOKeywordSourceLabel(source: SEOKeywordSource): string {
  const labels: Record<SEOKeywordSource, string> = {
    [SEO_KEYWORD.SOURCES.GOOGLE_KEYWORD_PLANNER]: 'Google Keyword Planner',
    [SEO_KEYWORD.SOURCES.SEMRUSH]: 'SEMrush',
    [SEO_KEYWORD.SOURCES.AHREFS]: 'Ahrefs',
    [SEO_KEYWORD.SOURCES.MOZ]: 'Moz',
    [SEO_KEYWORD.SOURCES.UBERSUGGEST]: 'Ubersuggest',
    [SEO_KEYWORD.SOURCES.ANSWER_THE_PUBLIC]: 'Answer the Public',
    [SEO_KEYWORD.SOURCES.GOOGLE_TRENDS]: 'Google Trends',
    [SEO_KEYWORD.SOURCES.GOOGLE_AUTOCOMPLETE]: 'Google Autocomplete',
    [SEO_KEYWORD.SOURCES.RELATED_SEARCHES]: 'Related Searches',
    [SEO_KEYWORD.SOURCES.COMPETITOR_ANALYSIS]: 'Competitor Analysis',
    [SEO_KEYWORD.SOURCES.SOCIAL_MEDIA]: 'Social Media',
    [SEO_KEYWORD.SOURCES.FORUMS]: 'Forums',
    [SEO_KEYWORD.SOURCES.Q_A_SITES]: 'Q&A Sites',
  };
  return labels[source] || 'Unknown Source';
}

export function getSEOKeywordLengthCategory(keyword: string): SEOKeywordLengthCategory {
  const wordCount = keyword.trim().split(/\s+/).length;

  if (wordCount <= 2) return SEO_KEYWORD.LENGTH_CATEGORIES.SHORT;
  if (wordCount <= 4) return SEO_KEYWORD.LENGTH_CATEGORIES.MEDIUM;
  if (wordCount <= 6) return SEO_KEYWORD.LENGTH_CATEGORIES.LONG;
  return SEO_KEYWORD.LENGTH_CATEGORIES.VERY_LONG;
}

export function getSEOKeywordDifficultyScore(difficulty: SEOKeywordDifficulty): number {
  const scores: Record<SEOKeywordDifficulty, number> = {
    [SEO_KEYWORD.DIFFICULTY.VERY_EASY]: 10,
    [SEO_KEYWORD.DIFFICULTY.EASY]: 30,
    [SEO_KEYWORD.DIFFICULTY.MODERATE]: 50,
    [SEO_KEYWORD.DIFFICULTY.HARD]: 70,
    [SEO_KEYWORD.DIFFICULTY.VERY_HARD]: 85,
    [SEO_KEYWORD.DIFFICULTY.COMPETITIVE]: 95,
  };
  return scores[difficulty] || 50;
}

export function getSEOKeywordPriority(
  volume: number,
  difficulty: SEOKeywordDifficulty,
  competition: SEOKeywordCompetition
): SEOKeywordPriorityScore {
  let priority = SEO_KEYWORD.PRIORITY_SCORES.MEDIUM;

  // Volume factor
  if (volume >= 5000) priority += 1;
  else if (volume >= 1000) priority += 0.5;

  // Difficulty factor
  const difficultyScore = getSEOKeywordDifficultyScore(difficulty);
  if (difficultyScore <= 30) priority += 1;
  else if (difficultyScore <= 50) priority += 0.5;
  else if (difficultyScore >= 70) priority -= 1;

  // Competition factor
  if (
    competition === SEO_KEYWORD.COMPETITION.VERY_LOW ||
    competition === SEO_KEYWORD.COMPETITION.LOW
  ) {
    priority += 1;
  } else if (competition === SEO_KEYWORD.COMPETITION.VERY_HIGH) {
    priority -= 1;
  }

  // Clamp to valid range
  const clampedPriority = Math.max(1, Math.min(5, Math.round(priority)));
  return clampedPriority as SEOKeywordPriorityScore;
}

export function isKeywordActive(status: SEOKeywordStatus): boolean {
  const activeStatuses: SEOKeywordStatus[] = [
    SEO_KEYWORD.STATUS.PRIORITIZED,
    SEO_KEYWORD.STATUS.IN_PROGRESS,
    SEO_KEYWORD.STATUS.OPTIMIZED,
    SEO_KEYWORD.STATUS.MONITORING,
  ];
  return activeStatuses.includes(status);
}

export function isKeywordSuccessful(status: SEOKeywordStatus): boolean {
  return status === SEO_KEYWORD.STATUS.SUCCESSFUL;
}

export function getKeywordStatusColor(status: SEOKeywordStatus): string {
  const colors: Record<SEOKeywordStatus, string> = {
    [SEO_KEYWORD.STATUS.DISCOVERED]: '#9E9E9E',
    [SEO_KEYWORD.STATUS.RESEARCHING]: '#2196F3',
    [SEO_KEYWORD.STATUS.ANALYZING]: '#FF9800',
    [SEO_KEYWORD.STATUS.PRIORITIZED]: '#4CAF50',
    [SEO_KEYWORD.STATUS.IN_PROGRESS]: '#00BCD4',
    [SEO_KEYWORD.STATUS.OPTIMIZED]: '#8BC34A',
    [SEO_KEYWORD.STATUS.MONITORING]: '#3F51B5',
    [SEO_KEYWORD.STATUS.SUCCESSFUL]: '#4CAF50',
    [SEO_KEYWORD.STATUS.FAILED]: '#F44336',
    [SEO_KEYWORD.STATUS.DEPRECATED]: '#FF9800',
    [SEO_KEYWORD.STATUS.ARCHIVED]: '#9E9E9E',
  };
  return colors[status] || '#9E9E9E';
}
